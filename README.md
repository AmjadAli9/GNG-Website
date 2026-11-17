# GNG Exotic Collections — ecommerce starter

A responsive purple-and-white storefront with a product catalogue, colour/stock selection, local cart, checkout form, static PhonePe QR display, UPI deep link with cart amount, mandatory transaction ID and payment screenshot, order storage, optional SMTP email with screenshot attachment, and WhatsApp order-summary link.

## 1. Requirements
- Node.js 18 or newer
- npm

## 2. Run locally
```bash
npm install
cp .env.example .env
npm start
```
Open http://localhost:3000

## 3. Configure email
Edit `.env` and set SMTP credentials. For Gmail, enable 2-Step Verification and create a Google App Password. Put that app password in `SMTP_PASS`. Never put SMTP credentials in browser JavaScript or commit `.env` to a public repository.

When SMTP is not configured, orders are still written to `data/orders.json` and the UI tells the customer email is not configured. The payment screenshot is saved in `uploads/`.

## 4. Edit products
Edit `public/catalog.js`. The included products, prices and stock values are demonstration values only. Replace them with real catalogue details. Add product images under `public/images/products/` and add an `image: '/images/products/filename.jpg'` property to a product. Stock values in this starter are display/cart limits; production stock must be validated and decremented server-side to prevent overselling.

## 5. Shop settings
Edit `.env`:
- `SHOP_EMAIL`: destination inbox
- `SHOP_WHATSAPP`: international format, digits only; India example `919700811131`
- `UPI_ID`: `Q055134754@ybl`
- `SHIPPING_FEE` and `FREE_SHIPPING_ABOVE`: verify before launch

The supplied PhonePe QR image is included at `public/images/phonepe-qr.jpeg`. The static QR may not contain the live cart amount. The UPI app link requests the cart total, but support varies by device/app. Customer must verify payee and amount inside their UPI app.

## 6. Important before public launch
This is a functional starter, not a complete audited production commerce platform. It accepts payment proof uploads but does **not** verify UPI payments automatically. Always verify the transaction in your merchant/bank app before dispatching. The order endpoint currently stores JSON files locally; use persistent storage/object storage and a database on production hosting. Add server-side product/stock/price validation, admin authentication/order dashboard, HTTPS, backups, privacy/retention policy, and proper deployment secrets. Do not deploy to serverless hosting without adapting file storage to persistent services.

The customer must press Send in WhatsApp and manually attach the screenshot there if desired. Email is sent only after SMTP is configured and successfully connected.
