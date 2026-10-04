const cart = [];
const cartPanel = document.querySelector('.cart-panel');
const overlay = document.querySelector('.overlay');
const cartItems = document.querySelector('.cart-items');
const toast = document.querySelector('.toast');

const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';

function renderCart() {
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.querySelector('.cart-button b').textContent = count;
  document.querySelector('.cart-total-count').textContent = count;
  document.querySelector('.cart-total').textContent = money(total);
  cartItems.innerHTML = count ? cart.map((item, index) => `
    <div class="cart-line"><div><h3>${item.name}</h3><p>${money(item.price)}</p></div><button class="remove" data-index="${index}">Убрать</button></div>`).join('') : '<p class="empty">Пока здесь пусто.<br />Самое время выбрать настроение.</p>';
  cartItems.querySelectorAll('.remove').forEach(button => button.addEventListener('click', () => { cart.splice(button.dataset.index, 1); renderCart(); }));
}

function openCart() { cartPanel.classList.add('open'); overlay.classList.add('show'); cartPanel.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartPanel.classList.remove('open'); overlay.classList.remove('show'); cartPanel.setAttribute('aria-hidden', 'true'); }

document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => {
  const product = button.closest('.product');
  cart.push({ name: product.dataset.name, price: Number(product.dataset.price) });
  renderCart();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}));

document.querySelector('.cart-button').addEventListener('click', openCart);
document.querySelector('.close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  document.querySelectorAll('.product').forEach(product => product.classList.toggle('is-hidden', filter.dataset.filter !== 'all' && product.dataset.kind !== filter.dataset.filter));
}));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', isOpen); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

document.querySelector('.checkout').addEventListener('click', () => { if (cart.length) { alert('Это демонстрационный магазин для портфолио — оформление заказа не подключено.'); } });
