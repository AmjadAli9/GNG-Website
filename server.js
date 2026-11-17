require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const ROOT = __dirname;
const UPLOAD_DIR = path.join(ROOT, 'uploads');
const DATA_DIR = path.join(ROOT, 'data');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(ROOT, 'public')));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api/orders', rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: true, legacyHeaders: false }));

const SHOP = {
  name: process.env.SHOP_NAME || 'GNG Exotic Collections',
  email: process.env.SHOP_EMAIL || 'goldnglowexoticcollection01@gmail.com',
  whatsapp: process.env.SHOP_WHATSAPP || '919700811131',
  upi: process.env.UPI_ID || 'Q055134754@ybl',
  shipping: Number(process.env.SHIPPING_FEE || 60),
  freeShippingAbove: Number(process.env.FREE_SHIPPING_ABOVE || 1300)
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(5).toString('hex')}${path.extname(file.originalname).toLowerCase()}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('Upload a JPG, PNG or WEBP image.'), ok);
  }
});

app.get('/api/config', (_req, res) => res.json({
  shopName: SHOP.name, email: SHOP.email, whatsapp: SHOP.whatsapp, upi: SHOP.upi,
  shipping: SHOP.shipping, freeShippingAbove: SHOP.freeShippingAbove
}));

app.post('/api/orders', upload.single('paymentScreenshot'), async (req, res) => {
  try {
    const body = req.body;
    const required = ['name', 'phone', 'address', 'city', 'state', 'pincode', 'transactionId', 'items', 'subtotal', 'shipping', 'total'];
    for (const key of required) if (!body[key]) return res.status(400).json({ error: `Missing required field: ${key}` });
    if (!req.file) return res.status(400).json({ error: 'Payment screenshot is required.' });
    let items;
    try { items = JSON.parse(body.items); } catch { return res.status(400).json({ error: 'Invalid cart data.' }); }
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'Your cart is empty.' });
    const cleanItems = items.map(x => ({ name: String(x.name || '').slice(0, 120), colour: String(x.colour || '').slice(0, 60), qty: Math.max(1, Math.min(50, Number(x.qty) || 1)), price: Math.max(0, Number(x.price) || 0) }));
    const subtotal = cleanItems.reduce((s, x) => s + x.qty * x.price, 0);
    const shipping = subtotal >= SHOP.freeShippingAbove ? 0 : SHOP.shipping;
    const total = subtotal + shipping;
    if (Math.abs(total - Number(body.total)) > 1) return res.status(400).json({ error: 'Order total mismatch. Please refresh your cart and try again.' });

    const orderId = `GNG-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const order = {
      orderId, status: 'AWAITING_MANUAL_PAYMENT_VERIFICATION', createdAt: new Date().toISOString(),
      customer: { name: String(body.name).slice(0,100), phone: String(body.phone).slice(0,20), email: String(body.customerEmail || '').slice(0,160), address: String(body.address).slice(0,300), landmark: String(body.landmark || '').slice(0,150), city: String(body.city).slice(0,100), state: String(body.state).slice(0,100), pincode: String(body.pincode).slice(0,12) },
      items: cleanItems, subtotal, shipping, total, transactionId: String(body.transactionId).slice(0,100), screenshot: req.file.filename
    };
    const ordersFile = path.join(DATA_DIR, 'orders.json');
    const orders = fs.existsSync(ordersFile) ? JSON.parse(fs.readFileSync(ordersFile, 'utf8')) : [];
    orders.push(order);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    let emailSent = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'YOUR_GMAIL_APP_PASSWORD') {
      const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: String(process.env.SMTP_SECURE || 'true') === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
      const itemLines = cleanItems.map(x => `${x.name} | ${x.colour} | Qty ${x.qty} | ₹${x.price * x.qty}`).join('\n');
      await transporter.sendMail({
        from: `GNG Website <${process.env.SMTP_USER}>`, to: SHOP.email, subject: `New order ${orderId} - ${order.customer.name}`,
        text: `New order: ${orderId}\nStatus: Awaiting manual payment verification\n\nCustomer: ${order.customer.name}\nPhone: ${order.customer.phone}\nEmail: ${order.customer.email}\nAddress: ${order.customer.address}, ${order.customer.landmark}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\nItems:\n${itemLines}\n\nSubtotal: ₹${subtotal}\nShipping: ₹${shipping}\nTotal: ₹${total}\nTransaction ID: ${order.transactionId}\n\nPlease verify the payment in your UPI merchant app before fulfilling the order.`,
        attachments: [{ filename: req.file.originalname || 'payment-proof', path: req.file.path }]
      });
      emailSent = true;
    }
    res.status(201).json({ ok: true, orderId, emailSent, whatsapp: SHOP.whatsapp, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to submit the order. Please try again or contact us on WhatsApp.' });
  }
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'Screenshot must be 5 MB or smaller.' : err.message });
  res.status(400).json({ error: err.message || 'Request failed.' });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`${SHOP.name} running at http://localhost:${port}`));
