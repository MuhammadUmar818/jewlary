/* =====================================================
   MH Collection - script.js
   1. Settings   2. Data   3. Product artwork   4. Helpers
   5. Pages      6. Cart   7. Checkout   8. Search & account
   9. Events     10. Start
   ===================================================== */
'use strict';

/* ---------- 1. SETTINGS (edit these) ---------- */
const CONFIG = {
  brand: 'MH Collection',
  whatsapp: '923001234567',            // your number, country code first, no + or spaces
  whatsappDisplay: '+92 300 1234567',
  email: 'hello@mhcollection.pk',
  currency: 'Rs.',
  freeShippingOver: 2000,
  shippingFee: 200,
  announcements: [
    'Free delivery on orders above Rs.2,000',
    '1 year colour warranty on every piece',
    'Cash on delivery available all over Pakistan',
    'Order or ask anything on WhatsApp'
  ]
};

/* ---------- 2. DATA ---------- */
const CATEGORIES = ['Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Anklets', 'Jewellery Sets'];

const METALS = {
  gold:   { name: 'Gold',      a: '#f6dc86', b: '#cf9c22', c: '#8a6410', sw: '#d4a63c' },
  silver: { name: 'Silver',    a: '#f5f7fa', b: '#b9bec6', c: '#7b818b', sw: '#c3c8cf' },
  rose:   { name: 'Rose Gold', a: '#f8d3c8', b: '#d99d8b', c: '#a16453', sw: '#dea08f' }
};

const DESCRIPTIONS = {
  Earrings: 'Lightweight earrings with sparkling cubic zirconia that catch the light from every angle. Comfortable for all-day wear.',
  Necklaces: 'A delicate chain necklace with hand-set stones. Sits gracefully on the collarbone and layers well with other pieces.',
  Bracelets: 'A fine chain bracelet with an adjustable extender and a secure lobster clasp. Fits most wrist sizes.',
  Rings: 'A sparkling ring with a comfortable band. Adjustable sizing so it fits a range of fingers.',
  Anklets: 'A dainty anklet with an adjustable extender chain. Made for summer, beach days and dressing up sandals.',
  'Jewellery Sets': 'A matching set that comes ready to gift. Coordinated pieces so you can wear them together for weddings and parties.'
};

const PRODUCTS = [];
function addProduct(name, cat, type, price, old, flags, rating, reviews, metals, v, stock) {
  PRODUCTS.push({
    id: PRODUCTS.length + 1, name, cat, type, price, old,
    isNew: flags.includes('n'), best: flags.includes('b'),
    rating, reviews, metals: metals || ['gold', 'silver', 'rose'],
    v: v || 0, stock: stock !== false, img: null   // set img: 'images/file.jpg' to use a real photo
  });
}
//          name                      category          art      price old    flags rating reviews metals             v  stock
addProduct('Norrie Bracelet',         'Bracelets',      'bracelet',  439,  999, 'nb', 5.0,  1, ['gold','silver'],       0);
addProduct('Luna Clover Bracelet',    'Bracelets',      'bracelet',  499, 1099, 'b',  4.8, 42, null,                    1);
addProduct('Aria Tennis Bracelet',    'Bracelets',      'bracelet',  649, 1399, 'b',  4.9, 67, ['gold','silver'],       2);
addProduct('Zoya Charm Bracelet',     'Bracelets',      'bracelet',  549, 1199, 'n',  4.7, 12, ['gold','rose'],         2);
addProduct('Mira Drop Earrings',      'Earrings',       'drop',      399,  899, 'nb', 4.8, 58, null,                    0);
addProduct('Sofia Crystal Studs',     'Earrings',       'stud',      299,  699, 'b',  4.9, 91, null,                    0);
addProduct('Hana Hoops',              'Earrings',       'hoop',      349,  799, 'n',  4.6, 23, ['gold','silver'],       0);
addProduct('Nora Crystal Danglers',   'Earrings',       'drop',      429,  949, '',   4.7, 30, ['gold','silver'],       1, false);
addProduct('Ivy Huggies',             'Earrings',       'hoop',      379,  849, 'b',  4.8, 74, null,                    1);
addProduct('Ayla Star Studs',         'Earrings',       'stud',      279,  649, 'n',  4.5,  9, ['gold','rose'],         1);
addProduct('Elara Solitaire Necklace','Necklaces',      'necklace',  599, 1299, 'b',  4.9, 88, null,                    0);
addProduct('Celine Clover Necklace',  'Necklaces',      'necklace',  649, 1399, 'n',  4.8, 15, ['gold','silver'],       1);
addProduct('Mahnoor Layered Necklace','Necklaces',      'necklace',  799, 1699, 'b',  4.7, 52, ['gold','rose'],         2);
addProduct('Sana Drop Pendant',       'Necklaces',      'necklace',  499, 1099, '',   4.6, 34, null,                    2);
addProduct('Freya Dainty Necklace',   'Necklaces',      'necklace',  549, 1199, 'n',  4.8, 11, null,                    0);
addProduct('Ruby Halo Ring',          'Rings',          'ring',      349,  799, 'n',  4.7, 19, ['gold','silver'],       0);
addProduct('Iris Eternity Ring',      'Rings',          'ring',      399,  899, 'b',  4.9, 63, ['gold','silver','rose'],2);
addProduct('Dua Adjustable Ring',     'Rings',          'ring',      299,  699, '',   4.5, 27, null,                    1);
addProduct('Vera Twin Stone Ring',    'Rings',          'ring',      329,  749, 'n',  4.6,  8, ['gold','rose'],         1);
addProduct('Kiara Anklet',            'Anklets',        'anklet',    399,  899, '',   4.6, 21, ['gold','silver'],       0);
addProduct('Noor Heart Anklet',       'Anklets',        'anklet',    449,  999, 'nb', 4.8, 36, null,                    1);
addProduct('Amber Bridal Set',        'Jewellery Sets', 'set',      1499, 3299, 'b',  4.9, 45, ['gold','rose'],         0);
addProduct('Zara Everyday Set',       'Jewellery Sets', 'set',       999, 2199, 'n',  4.7, 17, ['gold','silver'],       1);
addProduct('Sitara Party Set',        'Jewellery Sets', 'set',      1299, 2799, 'b',  4.8, 39, null,                    2);

const REVIEWS = [
  { name: 'Ayesha K.', city: 'Lahore',    text: 'The shine is exactly like the pictures and it has not faded after two months of daily wear.' },
  { name: 'Hina M.',   city: 'Karachi',   text: 'Delivered in three days and packed so nicely that I gifted it without re-wrapping.' },
  { name: 'Fatima R.', city: 'Islamabad', text: 'No skin irritation at all, which is rare for me. I have already ordered a second bracelet.' }
];

const INFO = {
  shipping: { title: 'Shipping and delivery', html: `
    <p>We deliver all over Pakistan.</p>
    <ul><li>Orders above ${'Rs.2,000'} ship free. Below that, delivery is Rs.200.</li>
    <li>Delivery takes 2 to 5 working days.</li>
    <li>We confirm every order on WhatsApp before dispatch.</li>
    <li>Cash on delivery is available.</li></ul>` },
  warranty: { title: '1 year colour warranty', html: `
    <p>If the colour of your piece fades within one year of purchase under normal use, message us on WhatsApp with your order details and a photo. We will repair or replace it.</p>
    <p>Normal use means wearing it and cleaning it as described in our care guide. Damage from chemicals, perfume or swimming in chlorine is not covered.</p>` },
  returns: { title: 'Returns and exchanges', html: `
    <p>You can exchange or return an unused piece within 7 days of delivery.</p>
    <ul><li>Keep the item in its original packaging.</li><li>Message us on WhatsApp with your order details.</li><li>Refunds go back to you in the same way you paid.</li></ul>` },
  care: { title: 'Jewellery care', html: `
    <ul><li>Put jewellery on after perfume, lotion and makeup.</li><li>Take it off before swimming, bathing and workouts.</li>
    <li>Wipe with a soft dry cloth after wearing.</li><li>Store each piece in its pouch, away from moisture.</li></ul>` },
  about: { title: 'About MH Collection', html: `
    <p>MH Collection makes everyday jewellery that looks like fine jewellery and costs a fraction of it. Every piece is anti-tarnish, nickel free and backed by a one year colour warranty.</p>` },
  privacy: { title: 'Privacy', html: `
    <p>We only use your name, phone number and address to deliver your order and to reply to you on WhatsApp. We never sell your details.</p>` }
};

/* ---------- 3. PRODUCT ARTWORK (SVG, no image files needed) ---------- */
let artUid = 0;
function art(type, metal, v) {
  const m = METALS[metal] || METALS.gold;
  const id = 'g' + (++artUid);
  const G = `url(#${id})`;
  v = (v || 0) % 3;

  const stone = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r + 4}" fill="${G}"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f7fbff" stroke="#c9d3df" stroke-width="1"/><path d="M${x - r * .55} ${y - r * .15}L${x} ${y - r * .75}L${x + r * .55} ${y - r * .15}L${x} ${y + r * .65}Z" fill="#fff" opacity=".9"/><circle cx="${x - r * .35}" cy="${y - r * .4}" r="${r * .18}" fill="#fff"/>`;
  const clover = (x, y, s) => [[-9, -9], [9, -9], [-9, 9], [9, 9]].map(d => stone(x + d[0] * s, y + d[1] * s, 7 * s)).join('') + `<circle cx="${x}" cy="${y}" r="${3.5 * s}" fill="${G}"/>`;
  const marquise = (x, y, s) => `<path d="M${x} ${y - 20 * s}C${x + 17 * s} ${y - 6 * s} ${x + 15 * s} ${y + 14 * s} ${x} ${y + 22 * s}C${x - 15 * s} ${y + 14 * s} ${x - 17 * s} ${y - 6 * s} ${x} ${y - 20 * s}Z" fill="#f7fbff" stroke="${G}" stroke-width="${5 * s}" stroke-linejoin="round"/><path d="M${x} ${y - 14 * s}L${x + 7 * s} ${y}L${x} ${y + 14 * s}L${x - 7 * s} ${y}Z" fill="#fff" opacity=".9"/>`;
  const focal = (x, y, s) => v === 1 ? clover(x, y, s) : v === 2 ? marquise(x, y, s) : stone(x, y, 12 * s);
  const chain = (d, w) => `<path d="${d}" fill="none" stroke="${G}" stroke-width="${w || 5}" stroke-linecap="round" stroke-dasharray="7 2.5"/>`;
  const heart = (x, y, s) => `<path d="M${x} ${y + 15 * s}C${x - 26 * s} ${y - 4 * s} ${x - 10 * s} ${y - 24 * s} ${x} ${y - 8 * s}C${x + 10 * s} ${y - 24 * s} ${x + 26 * s} ${y - 4 * s} ${x} ${y + 15 * s}Z" fill="${G}"/>`;

  const necklace = () => chain('M60 90Q200 330 340 90', 4) + stone(130, 180, 7) + stone(270, 180, 7) +
    `<circle cx="200" cy="211" r="5" fill="${G}"/><path d="M200 214V222" stroke="${G}" stroke-width="4"/>` + focal(200, 246, 1.15);

  const earringPair = (kind) => [140, 260].map(x => {
    const hook = `<path d="M${x} 60v22" stroke="${G}" stroke-width="5" stroke-linecap="round"/>`;
    if (kind === 'stud') return `<circle cx="${x}" cy="180" r="34" fill="${G}"/>` + stone(x, 180, 22) + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<circle cx="${x + Math.cos(a) * 33}" cy="${180 + Math.sin(a) * 33}" r="3.5" fill="#f7fbff"/>`; }).join('');
    if (kind === 'hoop') return hook.replace('M' + x + ' 60v22', 'M' + x + ' 96v0') + `<circle cx="${x}" cy="180" r="62" fill="none" stroke="${G}" stroke-width="10"/><circle cx="${x}" cy="180" r="62" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" transform="translate(-2 -2)"/>` + stone(x, 118, 9);
    return hook + stone(x, 100, 10) + `<path d="M${x} 116v26" stroke="${G}" stroke-width="5"/>` + marquise(x, 178, 1.6);
  }).join('');

  const bracelet = () => `<ellipse cx="200" cy="215" rx="145" ry="76" fill="none" stroke="${G}" stroke-width="5" stroke-dasharray="7 2.5"/>` +
    `<ellipse cx="160" cy="146" rx="15" ry="9" fill="${G}" transform="rotate(-14 160 146)"/><circle cx="76" cy="170" r="10" fill="${G}"/>` +
    (v === 2 ? [70, 135, 200, 265, 330].map(x => stone(x, 215 + Math.sqrt(1 - Math.pow((x - 200) / 145, 2)) * 76, 8)).join('') :
      stone(55, 215, 10) + stone(345, 215, 10) + stone(200, 291, 11) + (v === 1 ? clover(122, 277, 1.2) + clover(278, 277, 1.2) : stone(122, 277, 8) + stone(278, 277, 8)));

  const ring = () => `<circle cx="200" cy="262" r="84" fill="none" stroke="${G}" stroke-width="16"/><circle cx="200" cy="262" r="76" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2"/>` +
    stone(139, 210, 7) + stone(261, 210, 7) + `<path d="M172 190h56l-8 -30h-40Z" fill="${G}"/>` + focal(200, 145, 1.7);

  const anklet = () => chain('M30 150Q200 330 370 150', 4) + heart(200, 250, 1.1) + heart(115, 222, .8) + heart(285, 222, .8) +
    stone(160, 214, 6) + stone(240, 214, 6) + stone(72, 178, 5) + stone(328, 178, 5);

  let body;
  switch (type) {
    case 'necklace': body = necklace(); break;
    case 'drop': case 'stud': case 'hoop': body = earringPair(type); break;
    case 'ring': body = ring(); break;
    case 'anklet': body = anklet(); break;
    case 'set': body = `<g transform="translate(80 8) scale(.6)">${necklace()}</g><g transform="translate(100 236) scale(.5)">${earringPair('drop')}</g>`; break;
    default: body = bracelet();
  }
  const sparkle = (x, y, s) => `<path d="M${x} ${y - 12 * s}l${3 * s} ${9 * s} ${9 * s} ${3 * s} -${9 * s} ${3 * s} -${3 * s} ${9 * s} -${3 * s} -${9 * s} -${9 * s} -${3 * s} ${9 * s} -${3 * s}z" fill="${m.a}" opacity=".9"/>`;
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${type} illustration"><defs>` +
    `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m.a}"/><stop offset=".5" stop-color="${m.b}"/><stop offset="1" stop-color="${m.c}"/></linearGradient>` +
    `<radialGradient id="${id}b" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3ede8"/></radialGradient></defs>` +
    `<rect width="400" height="400" fill="url(#${id}b)"/>${sparkle(338, 62, 1.3)}${sparkle(58, 330, 1)}${body}</svg>`;
}
function media(p, metal, v) {
  return p.img ? `<img src="${p.img}" alt="${esc(p.name)}" loading="lazy">` : art(p.type, metal || p.metals[0], v === undefined ? p.v : v);
}

/* ---------- 4. HELPERS ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const app = $('#app');
const fmt = n => CONFIG.currency + Number(n).toLocaleString('en-US') + '.00';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = id => PRODUCTS.find(p => p.id === Number(id));
const pct = p => Math.round((1 - p.price / p.old) * 100);
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
};

const ICON = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  drop: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5Z"/>'
};
const ic = (name, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.4 16.8L2 22l5.3-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.6 14.6 0 0 0 5.6 4.9c2.1.9 2.9.9 3.9.8a3.3 3.3 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.3Z"/></svg>';
function hydrateIcons(root) { $$('[data-ic]', root).forEach(el => { el.innerHTML = ic(el.dataset.ic); el.removeAttribute('data-ic'); el.style.display = 'contents'; }); }

const stars = p => `<span class="stars" style="--p:${(p.rating / 5 * 100).toFixed(0)}%" aria-label="${p.rating} out of 5">★★★★★</span>`;
const priceHtml = (p, withBadge) => `<div class="price"><s>${fmt(p.old)}</s><b>${fmt(p.price)}</b>${withBadge ? `<span class="save">Save ${fmt(p.old - p.price)}</span>` : ''}</div>`;

let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
function openPanel(id) {
  closeAll();
  $('#' + id).classList.add('open'); $('#overlay').classList.add('show'); document.body.classList.add('lock');
  if (id === 'cartDrawer') renderCart();
  if (id === 'authModal') renderAuth();
  if (id === 'searchModal') { const i = $('#searchInput'); setTimeout(() => i.focus(), 120); runSearch(i.value); }
}
function closeAll() {
  $$('.panel.open').forEach(p => p.classList.remove('open'));
  $('#overlay').classList.remove('show'); document.body.classList.remove('lock');
}
function showInfo(key) {
  const i = INFO[key]; if (!i) return;
  $('#infoTitle').textContent = i.title; $('#infoBody').innerHTML = i.html; openPanel('infoModal');
}

/* ---------- 5. PAGES ---------- */
function card(p) {
  return `<article class="card">
    <a class="card-media" href="#/product/${p.id}" aria-label="${esc(p.name)}">${media(p)}
      <span class="tags">${p.stock ? '' : '<span class="tag dark">Sold out</span>'}${p.isNew ? '<span class="tag">New</span>' : ''}${p.old > p.price ? `<span class="tag sale">Save ${pct(p)}%</span>` : ''}</span>
    </a>
    <div class="card-body">
      <a class="card-title" href="#/product/${p.id}">${esc(p.name)}</a>
      <div class="rate">${stars(p)}<span>${p.reviews} ${p.reviews === 1 ? 'review' : 'reviews'}</span></div>
      ${priceHtml(p)}
      <button class="btn btn-outline btn-sm" data-add="${p.id}" ${p.stock ? '' : 'disabled'}>${p.stock ? 'Add to cart' : 'Sold out'}</button>
    </div></article>`;
}

function trustStrip() {
  return `<section class="trust"><div class="container trust-in">
    <div class="trust-item">${ic('shield')}<div><b>1 Year Color Warranty</b><span>Guaranteed long-lasting shine</span></div></div>
    <div class="trust-item">${ic('drop')}<div><b>Skin-Friendly Material</b><span>Nickel free</span></div></div>
    <div class="trust-item">${ic('truck')}<div><b>Free Delivery</b><span>On orders above ${fmt(CONFIG.freeShippingOver).replace('.00', '')}</span></div></div>
    <div class="trust-item">${ic('cash')}<div><b>Cash on Delivery</b><span>Pay when it reaches you</span></div></div>
  </div></section>`;
}

function renderHome() {
  document.title = 'MH Collection | Artificial Jewellery in Pakistan';
  const fresh = PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const best = PRODUCTS.filter(p => p.best).sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  app.innerHTML = `
  <section class="hero"><div class="container hero-in">
    <div class="rise">
      <h1>Jewellery that shines like gold and costs a fraction of it</h1>
      <p>Anti-tarnish, nickel-free pieces for every day and every occasion, with a 1 year colour warranty on all of them.</p>
      <div class="hero-cta">
        <a class="btn btn-maroon" href="#/new-arrivals">Shop new arrivals</a>
        <a class="btn btn-wa" href="${waLink('Hi MH Collection, I need help choosing jewellery.')}" target="_blank" rel="noopener">${WA_SVG.replace('<svg', '<svg width="20" height="20"')} Chat on WhatsApp</a>
      </div>
      <ul class="hero-points"><li>${ic('shield')}1 year colour warranty</li><li>${ic('drop')}Nickel free</li><li>${ic('cash')}Cash on delivery</li></ul>
    </div>
    <div class="hero-art rise" aria-hidden="true">
      <div class="ha ha1">${art('necklace', 'gold', 1)}</div>
      <div class="ha ha2">${art('bracelet', 'gold', 0)}</div>
      <div class="ha ha3">${art('drop', 'rose', 0)}</div>
    </div>
  </div></section>

  ${trustStrip()}

  <section class="section"><div class="container">
    <div class="section-head"><div><h2>Shop by category</h2><p>Find your next favourite piece.</p></div><a class="link-line" href="#/all-products">View all products</a></div>
    <div class="cats">${CATEGORIES.map(c => {
      const list = PRODUCTS.filter(p => p.cat === c);
      return `<a class="cat" href="#/category/${encodeURIComponent(c)}"><div class="cat-img">${media(list[0], list[0].metals[0])}</div><b>${c}</b><span>${list.length} pieces</span></a>`;
    }).join('')}</div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="container">
    <div class="section-head"><div><h2>New arrivals</h2><p>Just landed this month.</p></div><a class="link-line" href="#/new-arrivals">View all</a></div>
    <div class="grid">${fresh.map(card).join('')}</div>
  </div></section>

  <section class="promo"><div class="container promo-in">
    <div><h2>Up to 56% off on selected pieces</h2><p>Prices are already reduced. Add your favourites to the cart and order in a minute on WhatsApp or with cash on delivery.</p></div>
    <a class="btn" href="#/all-products?sort=discount">Shop the sale</a>
  </div></section>

  <section class="section"><div class="container">
    <div class="section-head"><div><h2>Best sellers</h2><p>The pieces our customers reorder most.</p></div><a class="link-line" href="#/best-sellers">View all</a></div>
    <div class="grid">${best.map(card).join('')}</div>
  </div></section>

  <section class="section" style="padding-top:0"><div class="container">
    <div class="section-head"><div><h2>What customers say</h2></div></div>
    <div class="reviews">${REVIEWS.map(r => `<figure class="review" style="margin:0"><span class="stars" style="--p:100%">★★★★★</span><p>${esc(r.text)}</p><small>${esc(r.name)}, ${esc(r.city)}</small></figure>`).join('')}</div>
  </div></section>

  <section class="section contact-band"><div class="container contact-in">
    <div>
      <h2>Talk to us on WhatsApp</h2>
      <p>Not sure about a size, a colour or a gift? Send us a message and we reply within a few hours.</p>
      <ul class="contact-lines"><li>WhatsApp: <a href="${waLink('Hi MH Collection!')}" target="_blank" rel="noopener"><b>${CONFIG.whatsappDisplay}</b></a></li><li>Email: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li></ul>
    </div>
    <form data-form="contact">
      <div class="field"><label for="cName">Your name</label><input id="cName" required placeholder="Ayesha"></div>
      <div class="field"><label for="cMsg">Your message</label><textarea id="cMsg" rows="4" required placeholder="I would like to know if the Luna bracelet comes in silver."></textarea></div>
      <button class="btn btn-wa btn-block" type="submit">${WA_SVG.replace('<svg', '<svg width="20" height="20"')} Send on WhatsApp</button>
    </form>
  </div></section>`;
}

/* Listing page used by All Products, New Arrivals, Best Sellers and categories */
const SORTS = [['featured', 'Featured'], ['popular', 'Best selling'], ['newest', 'Newest'], ['price-asc', 'Price, low to high'], ['price-desc', 'Price, high to low'], ['discount', 'Biggest discount']];
function renderListing(cfg) {
  document.title = `${cfg.title} | MH Collection`;
  const maxP = Math.max.apply(null, cfg.list.map(p => p.price));
  const st = { cat: cfg.cat || '', sort: cfg.sort || 'featured', max: maxP, stock: false, q: cfg.q || '' };
  app.innerHTML = `
  <section class="page-banner"><h1>${esc(cfg.title)}</h1><p>${esc(cfg.sub)}</p></section>
  <div class="container listing">
    <div class="chips" id="chips"></div>
    <div class="toolbar">
      <span id="count" class="muted"></span>
      <div class="tools">
        <label><input type="checkbox" id="fStock"> In stock only</label>
        <label>Up to <input type="range" id="fPrice" min="200" max="${maxP}" step="50" value="${maxP}"><output id="fOut">${fmt(maxP).replace('.00', '')}</output></label>
        <label>Sort <select id="fSort">${SORTS.map(s => `<option value="${s[0]}" ${s[0] === st.sort ? 'selected' : ''}>${s[1]}</option>`).join('')}</select></label>
      </div>
    </div>
    <div class="grid" id="grid"></div>
  </div>`;

  const chips = $('#chips'), grid = $('#grid');
  function draw() {
    chips.innerHTML = ['', ...CATEGORIES].map(c => {
      const n = c ? cfg.list.filter(p => p.cat === c).length : cfg.list.length;
      return n || !c ? `<button class="chip ${st.cat === c ? 'on' : ''}" data-cat="${esc(c)}">${c || 'All'} (${n})</button>` : '';
    }).join('');
    let list = cfg.list.filter(p => (!st.cat || p.cat === st.cat) && p.price <= st.max && (!st.stock || p.stock) &&
      (!st.q || (p.name + ' ' + p.cat + ' ' + p.type).toLowerCase().includes(st.q.toLowerCase())));
    const sorters = {
      popular: (a, b) => b.reviews - a.reviews, newest: (a, b) => b.id - a.id,
      'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price,
      discount: (a, b) => pct(b) - pct(a), featured: (a, b) => a.id - b.id
    };
    list.sort(sorters[st.sort] || sorters.featured);
    $('#count').textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'}${st.q ? ` for "${st.q}"` : ''}`;
    grid.innerHTML = list.length ? list.map(card).join('') :
      `<div class="empty" style="grid-column:1/-1"><h3>Nothing matches these filters</h3><p class="muted">Try another category or raise the price limit.</p><button class="btn btn-maroon" id="reset">Clear filters</button></div>`;
    const r = $('#reset');
    if (r) r.onclick = () => { st.cat = ''; st.q = ''; st.stock = false; st.max = maxP; $('#fStock').checked = false; $('#fPrice').value = maxP; $('#fOut').textContent = fmt(maxP).replace('.00', ''); draw(); };
  }
  chips.addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { st.cat = b.dataset.cat; draw(); } });
  $('#fStock').onchange = e => { st.stock = e.target.checked; draw(); };
  $('#fPrice').oninput = e => { st.max = Number(e.target.value); $('#fOut').textContent = fmt(st.max).replace('.00', ''); draw(); };
  $('#fSort').onchange = e => { st.sort = e.target.value; draw(); };
  draw();
}

function renderProduct(id) {
  const p = byId(id);
  if (!p) return renderNotFound();
  document.title = `${p.name} | MH Collection`;
  const pdp = { metal: p.metals[0], v: p.v };
  const vs = [p.v, (p.v + 1) % 3, (p.v + 2) % 3];
  const related = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat).concat(PRODUCTS.filter(x => x.id !== p.id && x.cat !== p.cat)).slice(0, 4);
  app.innerHTML = `
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/home">Home</a> / <a href="#/category/${encodeURIComponent(p.cat)}">${p.cat}</a> / ${esc(p.name)}</nav>
    <section class="pdp">
      <div class="gallery">
        <div class="gal-main" id="galMain">${media(p, pdp.metal, pdp.v)}</div>
        <div class="gal-thumbs" id="galThumbs">${vs.map((v, i) => `<button class="thumb ${i === 0 ? 'on' : ''}" data-thumb="${v}" aria-label="View ${i + 1}">${media(p, pdp.metal, v)}</button>`).join('')}</div>
      </div>
      <div class="pinfo">
        <h1>${esc(p.name)}</h1>
        <div class="rate">${stars(p)}<span>${p.reviews} ${p.reviews === 1 ? 'review' : 'reviews'}</span></div>
        ${priceHtml(p, true)}
        <p class="stock-note ${p.stock ? '' : 'out'}">${p.stock ? 'In stock and ready to ship' : 'Sold out at the moment'}</p>
        <span class="opt-label">Colour: <b id="metalName">${METALS[pdp.metal].name}</b></span>
        <div class="swatches" id="swatches">${p.metals.map(m => `<button class="sw ${m === pdp.metal ? 'on' : ''}" data-swatch="${m}" style="--c:${METALS[m].sw}" title="${METALS[m].name}" aria-label="${METALS[m].name}"></button>`).join('')}</div>
        <span class="opt-label">Quantity</span>
        <div class="qty"><button data-pqty="-1" aria-label="Decrease">−</button><input id="pQty" type="number" min="1" max="10" value="1" aria-label="Quantity"><button data-pqty="1" aria-label="Increase">+</button></div>
        <div class="buy-stack">
          <button class="btn btn-outline btn-block" id="pAdd" ${p.stock ? '' : 'disabled'}>Add to cart</button>
          <button class="btn btn-maroon btn-block" id="pBuy" ${p.stock ? '' : 'disabled'}>Buy it now</button>
          <a class="btn btn-wa btn-block" id="pWa" href="#" target="_blank" rel="noopener">${WA_SVG.replace('<svg', '<svg width="20" height="20"')} Order on WhatsApp</a>
        </div>
        <div class="badges">
          <div>${ic('shield')}<b>1 Year Color Warranty</b><span>Guaranteed Long-Lasting Shine</span></div>
          <div>${ic('drop')}<b>Skin-Friendly Material</b><span>Nickel Free</span></div>
          <div>${ic('lock')}<b>Secure Payment</b><span>Safe &amp; Protected Checkout</span></div>
        </div>
        <div class="acc">
          <details open><summary>Description</summary><p>${DESCRIPTIONS[p.cat]}</p></details>
          <details><summary>Material and care</summary><ul><li>18K plated stainless steel with cubic zirconia stones</li><li>Anti-tarnish and water resistant</li><li>Wipe dry after wearing and store in the pouch</li></ul></details>
          <details><summary>Shipping and returns</summary><p>Free delivery above Rs.2,000, otherwise Rs.200. Delivery in 2 to 5 working days. Unused items can be exchanged within 7 days. <a href="#" data-info="shipping" style="color:var(--maroon);text-decoration:underline">Read the full policy</a>.</p></details>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:20px">
      <div class="section-head"><h2>Customer reviews</h2></div>
      <div class="reviews">${REVIEWS.map(r => `<figure class="review" style="margin:0"><span class="stars" style="--p:100%">★★★★★</span><p>${esc(r.text)}</p><small>${esc(r.name)}, ${esc(r.city)}</small></figure>`).join('')}</div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="section-head"><h2>You may also like</h2></div>
      <div class="grid">${related.map(card).join('')}</div>
    </section>
  </div>`;

  const qtyEl = $('#pQty');
  const getQty = () => Math.min(10, Math.max(1, parseInt(qtyEl.value, 10) || 1));
  const paintMain = () => {
    $('#galMain').innerHTML = media(p, pdp.metal, pdp.v);
    $$('#galThumbs .thumb').forEach(t => { t.innerHTML = media(p, pdp.metal, Number(t.dataset.thumb)); t.classList.toggle('on', Number(t.dataset.thumb) === pdp.v); });
    $('#metalName').textContent = METALS[pdp.metal].name;
    $$('#swatches .sw').forEach(s => s.classList.toggle('on', s.dataset.swatch === pdp.metal));
    updateWa();
  };
  const updateWa = () => { $('#pWa').href = waLink(`Hi MH Collection, I want to order:\n${p.name} (${METALS[pdp.metal].name}) x ${getQty()}\nPrice: ${fmt(p.price)} each\n${location.href}`); };
  $('#swatches').onclick = e => { const b = e.target.closest('[data-swatch]'); if (b) { pdp.metal = b.dataset.swatch; paintMain(); } };
  $('#galThumbs').onclick = e => { const b = e.target.closest('[data-thumb]'); if (b) { pdp.v = Number(b.dataset.thumb); paintMain(); } };
  document.querySelectorAll('[data-pqty]').forEach(b => b.onclick = () => { qtyEl.value = Math.min(10, Math.max(1, getQty() + Number(b.dataset.pqty))); updateWa(); });
  qtyEl.oninput = updateWa;
  $('#pAdd').onclick = () => addToCart(p.id, getQty(), pdp.metal);
  $('#pBuy').onclick = () => openCheckout([{ id: p.id, metal: pdp.metal, qty: getQty() }], false);
  updateWa();
}

function renderNotFound() {
  document.title = 'Page not found | MH Collection';
  app.innerHTML = `<div class="container empty"><h1>We could not find that page</h1><p class="muted">The link may be old. Head back to the shop to keep browsing.</p><a class="btn btn-maroon" href="#/all-products">Go to all products</a></div>`;
}

/* ---------- Router: #/home, #/all-products, #/new-arrivals, #/best-sellers, #/category/X, #/product/ID ---------- */
function router() {
  const raw = location.hash.replace(/^#\/?/, '') || 'home';
  const bits = raw.split('?');
  const parts = bits[0].split('/');
  const params = new URLSearchParams(bits[1] || '');
  const page = parts[0] || 'home';
  closeAll();
  switch (page) {
    case 'home': renderHome(); break;
    case 'all-products':
      renderListing({ title: 'All Products', sub: 'Every earring, necklace, bracelet, ring, anklet and set in one place.', list: PRODUCTS, cat: params.get('cat') || '', q: params.get('q') || '', sort: params.get('sort') || 'featured' }); break;
    case 'new-arrivals':
      renderListing({ title: 'New Arrivals', sub: 'The latest pieces to join the collection.', list: PRODUCTS.filter(p => p.isNew), sort: 'newest' }); break;
    case 'best-sellers':
      renderListing({ title: 'Best Sellers', sub: 'Most loved by our customers, reordered again and again.', list: PRODUCTS.filter(p => p.best), sort: 'popular' }); break;
    case 'category': {
      const c = decodeURIComponent(parts[1] || '');
      renderListing({ title: CATEGORIES.includes(c) ? c : 'All Products', sub: `Browse our ${c.toLowerCase()} collection.`, list: PRODUCTS, cat: CATEGORIES.includes(c) ? c : '' }); break;
    }
    case 'product': renderProduct(parts[1]); break;
    default: renderNotFound();
  }
  $$('.nav a[data-nav], .mobile-links a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === (page === 'category' || page === 'product' ? 'all-products' : page)));
  window.scrollTo(0, 0);
}

/* ---------- 6. CART ---------- */
let cart = store.get('mh_cart', []).filter(i => byId(i.id));
function saveCart() { store.set('mh_cart', cart); updateCartBadge(); if ($('#cartDrawer').classList.contains('open')) renderCart(); }
function updateCartBadge() {
  const n = cart.reduce((s, i) => s + i.qty, 0), b = $('#cartCount');
  b.textContent = n; b.classList.toggle('show', n > 0);
}
function addToCart(id, qty, metal) {
  const p = byId(id); if (!p || !p.stock) return;
  metal = metal || p.metals[0];
  const line = cart.find(i => i.id === p.id && i.metal === metal);
  if (line) line.qty = Math.min(10, line.qty + qty); else cart.push({ id: p.id, metal, qty });
  saveCart(); toast(`${p.name} added to your cart`); openPanel('cartDrawer');
}
function totals(items) {
  const sub = items.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const ship = !items.length || sub >= CONFIG.freeShippingOver ? 0 : CONFIG.shippingFee;
  return { sub, ship, total: sub + ship };
}
function renderCart() {
  const body = $('#cartBody'), foot = $('#cartFoot');
  if (!cart.length) {
    body.innerHTML = `<div class="empty" style="padding:40px 0"><h3>Your cart is empty</h3><p class="muted">Add a piece you love and it will show up here.</p><a class="btn btn-maroon" href="#/all-products" data-close>Start shopping</a></div>`;
    foot.style.display = 'none'; return;
  }
  foot.style.display = '';
  body.innerHTML = cart.map((i, idx) => {
    const p = byId(i.id);
    return `<div class="ci"><a class="ci-img" href="#/product/${p.id}">${media(p, i.metal)}</a>
      <div><b>${esc(p.name)}</b><small>${METALS[i.metal].name} · ${fmt(p.price)}</small>
        <div class="ci-row"><div class="qty"><button data-cq="${idx}:-1" aria-label="Decrease">−</button><input value="${i.qty}" readonly aria-label="Quantity"><button data-cq="${idx}:1" aria-label="Increase">+</button></div>
        <button class="rm" data-rm="${idx}">Remove</button></div></div></div>`;
  }).join('');
  const t = totals(cart), left = Math.max(0, CONFIG.freeShippingOver - t.sub);
  foot.innerHTML = `
    <div class="ship-msg">${left ? `Add ${fmt(left).replace('.00', '')} more for free delivery` : 'You have free delivery'}</div>
    <div class="ship-bar"><i style="width:${Math.min(100, t.sub / CONFIG.freeShippingOver * 100)}%"></i></div>
    <div class="sum-row"><span>Subtotal</span><span>${fmt(t.sub)}</span></div>
    <div class="sum-row"><span>Delivery</span><span>${t.ship ? fmt(t.ship) : 'Free'}</span></div>
    <div class="sum-row total"><span>Total</span><span>${fmt(t.total)}</span></div>
    <button class="btn btn-maroon btn-block" style="margin-top:14px" data-checkout-cart>Checkout</button>`;
}

/* ---------- 7. CHECKOUT (order goes to WhatsApp) ---------- */
let checkoutState = { items: [], fromCart: false };
function openCheckout(items, fromCart) {
  if (!items.length) return;
  checkoutState = { items, fromCart };
  const t = totals(items), user = store.get('mh_user', null);
  $('#checkoutBody').innerHTML = `
  <div class="co-grid">
    <form data-form="checkout">
      <div class="form-grid">
        <div class="field"><label for="coName">Full name</label><input id="coName" required autocomplete="name" value="${user ? esc(user.name) : ''}"></div>
        <div class="field"><label for="coPhone">Phone number</label><input id="coPhone" required inputmode="tel" pattern="[0-9+\\s\\-]{10,15}" title="Enter a phone number with 10 to 15 digits" placeholder="0300 1234567" autocomplete="tel"></div>
      </div>
      <div class="field"><label for="coCity">City</label><input id="coCity" required autocomplete="address-level2"></div>
      <div class="field"><label for="coAddr">Full address</label><textarea id="coAddr" rows="2" required autocomplete="street-address"></textarea></div>
      <div class="field"><label for="coNote">Order note (optional)</label><input id="coNote" placeholder="Gift wrap, call before delivery..."></div>
      <div class="pay">
        <label><input type="radio" name="pay" value="Cash on delivery" checked> Cash on delivery</label>
        <label><input type="radio" name="pay" value="Bank or Easypaisa/JazzCash transfer"> Bank or Easypaisa/JazzCash (we send details on WhatsApp)</label>
      </div>
      <button class="btn btn-wa btn-block" type="submit">${WA_SVG.replace('<svg', '<svg width="20" height="20"')} Place order on WhatsApp</button>
      <p class="muted" style="font-size:.85rem;margin:10px 0 0">Your order opens in WhatsApp so we can confirm it with you before dispatch.</p>
    </form>
    <div class="co-sum">
      <h3>Order summary</h3>
      ${items.map(i => { const p = byId(i.id); return `<div class="co-line"><span>${esc(p.name)} (${METALS[i.metal].name}) × ${i.qty}</span><span>${fmt(p.price * i.qty)}</span></div>`; }).join('')}
      <div class="sum-row" style="margin-top:12px"><span>Subtotal</span><span>${fmt(t.sub)}</span></div>
      <div class="sum-row"><span>Delivery</span><span>${t.ship ? fmt(t.ship) : 'Free'}</span></div>
      <div class="sum-row total"><span>Total</span><span>${fmt(t.total)}</span></div>
    </div>
  </div>`;
  openPanel('checkoutModal');
}
function submitCheckout() {
  const items = checkoutState.items, t = totals(items);
  const lines = items.map((i, n) => { const p = byId(i.id); return `${n + 1}. ${p.name} (${METALS[i.metal].name}) x ${i.qty} - ${fmt(p.price * i.qty)}`; }).join('\n');
  const pay = ($('input[name=pay]:checked') || {}).value || 'Cash on delivery';
  const msg = `*New order - ${CONFIG.brand}*\n\nName: ${$('#coName').value.trim()}\nPhone: ${$('#coPhone').value.trim()}\nCity: ${$('#coCity').value.trim()}\nAddress: ${$('#coAddr').value.trim()}\nPayment: ${pay}\n${$('#coNote').value.trim() ? 'Note: ' + $('#coNote').value.trim() + '\n' : ''}\n*Items*\n${lines}\n\nSubtotal: ${fmt(t.sub)}\nDelivery: ${t.ship ? fmt(t.ship) : 'Free'}\n*Total: ${fmt(t.total)}*`;
  const orders = store.get('mh_orders', []); orders.push({ date: new Date().toISOString(), items, total: t.total }); store.set('mh_orders', orders);
  window.open(waLink(msg), '_blank', 'noopener');
  if (checkoutState.fromCart) { cart = []; saveCart(); }
  closeAll(); toast('Your order is ready in WhatsApp. Press send to confirm.');
}

/* ---------- 8. SEARCH & ACCOUNT ---------- */
function runSearch(q) {
  const box = $('#searchResults'); q = (q || '').trim().toLowerCase();
  const list = q ? PRODUCTS.filter(p => (p.name + ' ' + p.cat + ' ' + p.type).toLowerCase().includes(q)) : PRODUCTS.filter(p => p.best).slice(0, 5);
  box.innerHTML = (q ? '' : '<p class="muted" style="margin:6px 8px">Popular right now</p>') +
    (list.length ? list.slice(0, 6).map(p => `<a class="sr" href="#/product/${p.id}"><span class="sr-img">${media(p, p.metals[0])}</span><span><b>${esc(p.name)}</b><small>${p.cat}</small></span><span>${fmt(p.price)}</span></a>`).join('') +
      (q ? `<a class="sr-all" href="#/all-products?q=${encodeURIComponent(q)}">See all results for "${esc(q)}"</a>` : '')
      : `<p class="muted" style="margin:14px 8px">No products match "${esc(q)}". Try "bracelet" or "earrings".</p>`);
}

async function sha(s) {
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch (e) { return btoa(unescape(encodeURIComponent(s))); }
}
function renderAuth(tab) {
  const user = store.get('mh_user', null), body = $('#authBody');
  if (user) {
    $('#authTitle').textContent = 'My account';
    const orders = store.get('mh_orders', []).length;
    body.innerHTML = `<p>Hello, <b>${esc(user.name)}</b>.</p><p class="muted">${esc(user.email)}<br>Orders placed on this device: ${orders}</p>
      <button class="btn btn-block" data-logout>Log out</button>`; return;
  }
  tab = tab || 'login';
  $('#authTitle').textContent = tab === 'login' ? 'Log in' : 'Create account';
  body.innerHTML = `<div class="tabs"><button class="${tab === 'login' ? 'on' : ''}" data-tab="login">Log in</button><button class="${tab === 'register' ? 'on' : ''}" data-tab="register">Create account</button></div>` +
    (tab === 'login'
      ? `<form data-form="login"><div class="field"><label for="lEmail">Email</label><input id="lEmail" type="email" required autocomplete="email"></div>
         <div class="field"><label for="lPass">Password</label><input id="lPass" type="password" required autocomplete="current-password"></div><p class="error" id="authErr"></p>
         <button class="btn btn-maroon btn-block" type="submit">Log in</button></form>`
      : `<form data-form="register"><div class="field"><label for="rName">Full name</label><input id="rName" required autocomplete="name"></div>
         <div class="field"><label for="rEmail">Email</label><input id="rEmail" type="email" required autocomplete="email"></div>
         <div class="field"><label for="rPass">Password (6 characters or more)</label><input id="rPass" type="password" minlength="6" required autocomplete="new-password"></div><p class="error" id="authErr"></p>
         <button class="btn btn-maroon btn-block" type="submit">Create account</button></form>`);
}

/* ---------- Chrome: header menus, footer, WhatsApp button ---------- */
function renderChrome() {
  $('#catMenu').innerHTML = CATEGORIES.map(c => `<a href="#/category/${encodeURIComponent(c)}">${c}<small>${PRODUCTS.filter(p => p.cat === c).length}</small></a>`).join('');
  $('#mobileLinks').innerHTML = `
    <a href="#/home" data-nav="home">Home</a><a href="#/all-products" data-nav="all-products">All Products</a>
    <a href="#/new-arrivals" data-nav="new-arrivals">New Arrivals</a><a href="#/best-sellers" data-nav="best-sellers">Best Sellers</a>
    <p class="muted" style="margin:18px 0 6px">Shop by category</p>
    ${CATEGORIES.map(c => `<a href="#/category/${encodeURIComponent(c)}">${c}</a>`).join('')}`;
  $('#waFloat').innerHTML = WA_SVG;
  $('#waFloat').href = waLink('Hi MH Collection! I have a question.');
  $('#footer').innerHTML = `
  <div class="container footer-in">
    <div><a href="#/home" class="logo"><span class="logo-mh">MH</span><span class="logo-col">collection</span></a>
      <p>Anti-tarnish, skin-friendly jewellery with a 1 year colour warranty. Delivered all over Pakistan.</p>
      <p>WhatsApp: <a href="${waLink('Hi MH Collection!')}" target="_blank" rel="noopener">${CONFIG.whatsappDisplay}</a><br>Email: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p></div>
    <div><h4>Shop</h4><ul><li><a href="#/all-products">All products</a></li><li><a href="#/new-arrivals">New arrivals</a></li><li><a href="#/best-sellers">Best sellers</a></li>${CATEGORIES.slice(0, 3).map(c => `<li><a href="#/category/${encodeURIComponent(c)}">${c}</a></li>`).join('')}</ul></div>
    <div><h4>Help</h4><ul><li><a href="#" data-info="shipping">Shipping and delivery</a></li><li><a href="#" data-info="warranty">Colour warranty</a></li><li><a href="#" data-info="returns">Returns and exchanges</a></li><li><a href="#" data-info="care">Jewellery care</a></li><li><a href="#" data-info="about">About us</a></li></ul></div>
    <div><h4>Get offers first</h4><p>Join our list for new arrivals and discounts.</p>
      <form class="news" data-form="newsletter"><input type="email" required placeholder="Your email" aria-label="Email address"><button type="submit">Join</button></form></div>
  </div>
  <div class="container footer-bottom"><span>© <span id="year"></span> ${CONFIG.brand}. All rights reserved.</span><a href="#" data-info="privacy">Privacy</a></div>`;
  $('#year').textContent = new Date().getFullYear();
  hydrateIcons(document);
}

/* ---------- 9. EVENTS ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-close],[data-add],[data-cq],[data-rm],[data-checkout-cart],[data-info],[data-tab],[data-logout]');
  if (!t) { if (e.target.id === 'overlay') closeAll(); return; }
  const d = t.dataset;
  if (d.info) { e.preventDefault(); showInfo(d.info); }
  else if (d.open) openPanel(d.open);
  else if (d.close !== undefined) closeAll();
  else if (d.add) addToCart(Number(d.add), 1);
  else if (d.cq) { const a = d.cq.split(':'), i = cart[Number(a[0])]; if (i) { i.qty += Number(a[1]); if (i.qty < 1) cart.splice(Number(a[0]), 1); i.qty = Math.min(10, i.qty); saveCart(); } }
  else if (d.rm) { cart.splice(Number(d.rm), 1); saveCart(); }
  else if (d.checkoutCart !== undefined) openCheckout(cart.slice(), true);
  else if (d.tab) renderAuth(d.tab);
  else if (d.logout !== undefined) { localStorage.removeItem('mh_user'); renderAuth(); toast('You are logged out'); }
});
$('#overlay').addEventListener('click', closeAll);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
$('#searchInput').addEventListener('input', e => runSearch(e.target.value));
$('#searchInput').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.value.trim()) location.hash = '#/all-products?q=' + encodeURIComponent(e.target.value.trim()); });
$('#searchResults').addEventListener('click', e => { if (e.target.closest('a')) closeAll(); });
$('#mobileLinks').addEventListener('click', e => { if (e.target.closest('a')) closeAll(); });

document.addEventListener('submit', async e => {
  const f = e.target.closest('form[data-form]'); if (!f) return;
  e.preventDefault();
  const kind = f.dataset.form;
  if (kind === 'checkout') return submitCheckout();
  if (kind === 'contact') { window.open(waLink(`Hi MH Collection, this is ${$('#cName').value.trim()}.\n${$('#cMsg').value.trim()}`), '_blank', 'noopener'); f.reset(); return; }
  if (kind === 'newsletter') { const list = store.get('mh_news', []); list.push(f.querySelector('input').value); store.set('mh_news', list); f.reset(); toast('Thanks for joining. Watch your inbox.'); return; }
  const err = $('#authErr');
  if (kind === 'register') {
    const users = store.get('mh_users', []), email = $('#rEmail').value.trim().toLowerCase();
    if (users.some(u => u.email === email)) { err.textContent = 'An account with this email already exists. Log in instead.'; return; }
    const u = { name: $('#rName').value.trim(), email, pass: await sha($('#rPass').value) };
    users.push(u); store.set('mh_users', users); store.set('mh_user', { name: u.name, email }); renderAuth(); toast(`Welcome, ${u.name}`);
  }
  if (kind === 'login') {
    const email = $('#lEmail').value.trim().toLowerCase(), h = await sha($('#lPass').value);
    const u = store.get('mh_users', []).find(x => x.email === email && x.pass === h);
    if (!u) { err.textContent = 'Email or password is not correct. Check them and try again.'; return; }
    store.set('mh_user', { name: u.name, email }); renderAuth(); toast(`Welcome back, ${u.name}`);
  }
});

/* ---------- 10. START ---------- */
(function start() {
  hydrateIcons(document);
  renderChrome();
  updateCartBadge();
  let a = 0; const ann = $('#announceText');
  const tick = () => { ann.style.animation = 'none'; void ann.offsetWidth; ann.style.animation = ''; ann.textContent = CONFIG.announcements[a++ % CONFIG.announcements.length]; };
  tick(); setInterval(tick, 4000);
  window.addEventListener('hashchange', router);
  router();
})();
