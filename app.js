const $ = (s) => document.querySelector(s);
const money = (n) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(Number(n)||0);
let config = { shopName:'GNG Exotic Collections', email:'goldnglowexoticcollection01@gmail.com', whatsapp:'919700811131', upi:'Q055134754@ybl', shipping:60, freeShippingAbove:1300 };
let activeFilter = 'All';
let cart = JSON.parse(localStorage.getItem('gngCart') || '[]');
const categories = [
  {name:'Hijabs',mark:'H',desc:'Everyday & occasion styles'},
  {name:'Niqab',mark:'N',desc:'Thoughtful face coverings'},
  {name:'Accessories',mark:'A',desc:'Clutches, bags & essentials'},
  {name:'All',mark:'✦',desc:'Explore the full collection'}
];
function saveCart(){localStorage.setItem('gngCart',JSON.stringify(cart));renderCart();}
function productById(id){return PRODUCTS.find(p=>p.id===id)}
function cartQty(){return cart.reduce((s,x)=>s+x.qty,0)}
function subtotal(){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
function shipping(){return subtotal() >= config.freeShippingAbove ? 0 : (cart.length ? config.shipping : 0)}
function total(){return subtotal()+shipping()}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2400)}
function renderCategories(){
  $('#categoryGrid').innerHTML=categories.map(c=>`<button class="category-tile" data-category="${c.name}" data-mark="${c.mark}"><span>${c.desc}</span><b>${c.name==='All'?'Shop everything':c.name}</b><i>↗</i></button>`).join('');
  $('#categoryGrid').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.category)));
}
function renderFilters(){
  const names=['All','Hijabs','Niqab','Accessories'];
  $('#filterPills').innerHTML=names.map(n=>`<button class="filter-pill ${activeFilter===n?'active':''}" data-filter="${n}">${n}</button>`).join('');
  $('#filterPills').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
}
function setFilter(value){activeFilter=value;renderFilters();renderProducts();$('#shop').scrollIntoView({behavior:'smooth'});}
function renderProducts(){
  const q=$('#searchInput').value.trim().toLowerCase(); const sort=$('#sortSelect').value;
  let list=PRODUCTS.filter(p=>(activeFilter==='All'||p.category===activeFilter)&&(!q||`${p.name} ${p.type} ${p.description}`.toLowerCase().includes(q)));
  if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
  $('#productGrid').innerHTML=list.length?list.map(p=>{
    const options=p.colours.map((c,i)=>`<option value="${i}" ${c[2]<=0?'disabled':''}>${c[0]}${c[2]<=0?' — Sold out':''}</option>`).join('');
    const firstAvailable=p.colours.findIndex(c=>c[2]>0);
    return `<article class="product-card" data-product="${p.id}"><div class="product-visual" style="--swatch:${p.colours[Math.max(firstAvailable,0)][1]}"><span class="product-tag">${p.category.toUpperCase()}</span><span class="product-monogram">GNG</span>${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy">`:''}</div><div class="product-info"><span class="product-type">${p.type}</span><h3>${p.name}</h3><p class="product-desc">${p.description}</p><div class="product-price">${money(p.price)}</div><div class="product-selects"><select class="colour-select" aria-label="Choose colour" ${firstAvailable<0?'disabled':''}>${options}</select><button class="add-btn" ${firstAvailable<0?'disabled':''}>${firstAvailable<0?'Sold out':'Add to bag +'}</button></div></div></article>`;
  }).join(''):'<p class="empty-cart">No products found. Try another search or category.</p>';
  $('#productGrid').querySelectorAll('.product-card').forEach(card=>{
    const p=productById(card.dataset.product), select=card.querySelector('select'), visual=card.querySelector('.product-visual');
    if(select&&p){if(p.colours.findIndex(c=>c[2]>0)>=0)select.value=String(p.colours.findIndex(c=>c[2]>0));select.addEventListener('change',()=>{visual.style.setProperty('--swatch',p.colours[Number(select.value)][1]);});}
    card.querySelector('.add-btn')?.addEventListener('click',()=>{const c=p.colours[Number(select.value)];if(!c||c[2]<=0)return toast('That colour is sold out.');const key=`${p.id}-${c[0]}`;const existing=cart.find(x=>x.key===key);const inCart=existing?.qty||0;if(inCart>=c[2])return toast('Available sample stock limit reached.');if(existing)existing.qty++;else cart.push({key,id:p.id,name:p.name,colour:c[0],price:p.price,qty:1,stock:c[2]});saveCart();toast(`${p.name} added to your bag.`);});
  });
}
function renderCart(){
  $('#cartCount').textContent=cartQty();$('#drawerCount').textContent=`(${cartQty()})`;
  $('#cartSubtotal').textContent=money(subtotal());$('#cartShipping').textContent=shipping()===0?'FREE':money(shipping());$('#cartTotal').textContent=money(total());
  $('#shippingHint').textContent=subtotal()>=config.freeShippingAbove?'You have unlocked free delivery.':`Add ${money(config.freeShippingAbove-subtotal())} more for free delivery.`;
  $('#cartItems').innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><div class="cart-thumb">G</div><div><h4>${x.name}</h4><small>${x.colour} · ${money(x.price)}</small><div class="qty-control"><button data-action="minus" data-key="${x.key}">−</button><b>${x.qty}</b><button data-action="plus" data-key="${x.key}">+</button></div><button class="remove-btn" data-action="remove" data-key="${x.key}">Remove</button></div><div class="cart-line-price">${money(x.price*x.qty)}</div></div>`).join(''):'<div class="empty-cart">Your bag is waiting for something lovely.<br><br><a class="text-link" href="#shop" id="emptyShop">Explore the collection →</a></div>';
  $('#cartItems').querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    const item=cart.find(x=>x.key===b.dataset.key);if(!item)return;
    if(b.dataset.action==='minus')item.qty--;if(b.dataset.action==='plus'){if(item.qty>=item.stock)return toast('Sample stock limit reached.');item.qty++;}if(b.dataset.action==='remove')item.qty=0;
    cart=cart.filter(x=>x.qty>0);saveCart();
  }));
  $('#checkoutButton').disabled=!cart.length;
}
function openCart(){ $('#overlay').classList.add('show');$('#cartDrawer').classList.add('open');$('#cartDrawer').setAttribute('aria-hidden','false'); }
function closeCart(){ $('#overlay').classList.remove('show');$('#cartDrawer').classList.remove('open');$('#cartDrawer').setAttribute('aria-hidden','true'); }
function renderCheckout(){
  $('#checkoutItems').innerHTML=cart.map(x=>`<div class="checkout-item"><span>${x.name}<small>${x.colour} · Qty ${x.qty}</small></span><b>${money(x.price*x.qty)}</b></div>`).join('');
  $('#checkoutSubtotal').textContent=money(subtotal());$('#checkoutShipping').textContent=shipping()===0?'FREE':money(shipping());$('#checkoutTotal').textContent=money(total());$('#amountDue').textContent=money(total());
  $('#upiId').textContent=config.upi;
  const upiUrl=`upi://pay?pa=${encodeURIComponent(config.upi)}&pn=${encodeURIComponent(config.shopName)}&am=${encodeURIComponent(total().toFixed(2))}&cu=INR&tn=${encodeURIComponent('GNG order payment')}`;
  $('#upiAppButton').href=upiUrl;
}
function openCheckout(){if(!cart.length)return;closeCart();renderCheckout();$('#checkoutModal').classList.add('show');$('#checkoutModal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeCheckout(){ $('#checkoutModal').classList.remove('show');$('#checkoutModal').setAttribute('aria-hidden','true');document.body.style.overflow=''; }
function checkReady(){const f=$('#checkoutForm');const file=$('#paymentScreenshot').files[0];const tx=f.elements.transactionId.value.trim();$('#placeOrder').disabled=!(f.checkValidity()&&file&&tx&&$('#confirmPayment').checked&&cart.length);}
$('#openCart').addEventListener('click',openCart);$('#closeCart').addEventListener('click',closeCart);$('#overlay').addEventListener('click',closeCart);$('#checkoutButton').addEventListener('click',openCheckout);$('#closeCheckout').addEventListener('click',closeCheckout);
$('#searchInput').addEventListener('input',renderProducts);$('#sortSelect').addEventListener('change',renderProducts);
$('#copyUpi').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(config.upi);toast('UPI ID copied.');}catch{toast(`UPI ID: ${config.upi}`);}});
$('#paymentScreenshot').addEventListener('change',()=>{const f=$('#paymentScreenshot').files[0];$('#fileName').textContent=f?f.name:'No file selected';if(f&&f.size>5*1024*1024){$('#paymentScreenshot').value='';$('#fileName').textContent='File is larger than 5 MB';toast('Screenshot must be 5 MB or smaller.');}checkReady();});
$('#checkoutForm').addEventListener('input',checkReady);$('#confirmPayment').addEventListener('change',checkReady);
$('#checkoutForm').addEventListener('submit',async(e)=>{
  e.preventDefault();const form=e.currentTarget;$('#formError').textContent='';checkReady();if($('#placeOrder').disabled||!form.reportValidity())return;
  const fd=new FormData(form);fd.append('items',JSON.stringify(cart.map(x=>({name:x.name,colour:x.colour,qty:x.qty,price:x.price}))));fd.append('subtotal',String(subtotal()));fd.append('shipping',String(shipping()));fd.append('total',String(total()));
  $('#placeOrder').disabled=true;$('#placeOrder').textContent='Submitting order…';
  try{
    const response=await fetch('/api/orders',{method:'POST',body:fd});const data=await response.json();if(!response.ok)throw new Error(data.error||'Order could not be submitted.');
    const order=data.order;const lines=order.items.map(x=>`• ${x.name} | ${x.colour} | Qty ${x.qty} | ${money(x.price*x.qty)}`).join('\n');
    const message=`Hello ${config.shopName}, I have placed an order.\nOrder ID: ${data.orderId}\nName: ${order.customer.name}\nPhone: ${order.customer.phone}\nAddress: ${order.customer.address}, ${order.customer.landmark}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\nItems:\n${lines}\n\nSubtotal: ${money(order.subtotal)}\nDelivery: ${money(order.shipping)}\nTotal paid: ${money(order.total)}\nUPI transaction ID: ${order.transactionId}\n\nI will attach my payment screenshot here. Please verify my payment.`;
    $('#successOrderId').textContent=data.orderId;$('#emailStatus').textContent=data.emailSent?'Order email and payment screenshot sent to the store email.':'Order saved on the website server. Store email is not configured yet; please also send the order through WhatsApp.';
    $('#whatsappOrder').href=`https://wa.me/${data.whatsapp}?text=${encodeURIComponent(message)}`;
    $('#successModal').classList.add('show');$('#successModal').setAttribute('aria-hidden','false');cart=[];saveCart();form.reset();$('#fileName').textContent='No file selected';closeCheckout();
  }catch(err){$('#formError').textContent=err.message;}
  finally{$('#placeOrder').textContent='Submit order';checkReady();}
});
$('#closeSuccess').addEventListener('click',()=>{$('#successModal').classList.remove('show');$('#successModal').setAttribute('aria-hidden','true');});
document.querySelectorAll('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>setFilter(a.dataset.filterLink)));
$('#footerWhatsApp').addEventListener('click',(e)=>{e.preventDefault();window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hello GNG Exotic Collections, I would like some help with your products.')}`,'_blank','noopener');});
$('#year').textContent=new Date().getFullYear();
renderCategories();renderFilters();renderProducts();renderCart();
fetch('/api/config').then(r=>r.json()).then(c=>{config={...config,...c};$('#upiId').textContent=config.upi;$('#footerWhatsApp').href=`https://wa.me/${config.whatsapp}`;}).catch(()=>{});

/* ==============================
   GNG OFFER POPUP FUNCTIONALITY
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("offerPopup");
  const closeButton = document.getElementById("closeOffer");
  const shopButton = document.getElementById("offerShopNow");

  if (!popup || !closeButton || !shopButton) return;

  // Show once per browser session
  if (!sessionStorage.getItem("gngOfferSeen")) {
    setTimeout(() => {
      popup.classList.add("show");
      popup.setAttribute("aria-hidden", "false");
      sessionStorage.setItem("gngOfferSeen", "true");
    }, 1800);
  }

  function closePopup() {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
  }

  closeButton.addEventListener("click", closePopup);

  shopButton.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });

});
