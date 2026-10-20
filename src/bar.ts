const cashEl = document.getElementById('barCash') as HTMLElement | null;
const orderEl = document.getElementById('orderText') as HTMLElement | null;
const liquidEl = document.getElementById('liquid') as HTMLElement | null;
const lineEl = document.getElementById('line') as HTMLElement | null;
const streamEl = document.getElementById('stream') as HTMLElement | null;
const msgEl = document.getElementById('barMsg') as HTMLElement | null;
const faceEl = document.getElementById('customerFace') as HTMLElement | null;
const pourBtn = document.getElementById('pourBtn') as HTMLButtonElement | null;
const coinsEl = document.getElementById('coins') as HTMLElement | null;

let cash = Number(localStorage.getItem('cash'));
if (localStorage.getItem('cash') === null) cash = 100;
if (cashEl) cashEl.textContent = `$${cash}`;

const SPEED = 55; // % por segundo
let target = 0;
let fill = 0;
let pouring = false;
let playing = true;
let last = 0;
let raf = 0;

function setCash(value: number) {
  cash = value;
  localStorage.setItem('cash', String(cash));
  if (cashEl) cashEl.textContent = `$${cash}`;
}

function newRound() {
  target = 35 + Math.round(Math.random() * 45); // 35% a 80%
  fill = 0;
  playing = true;
  if (lineEl) lineEl.style.bottom = `${target}%`;
  if (liquidEl) liquidEl.style.height = '0%';
  if (orderEl) orderEl.textContent = `${target}% de whiskey`;
  if (msgEl) msgEl.textContent = 'Serví con cuidado.';
  if (faceEl) faceEl.textContent = '🤠';
}

function tick(now: number) {
  if (!pouring) return;
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  fill = Math.min(100, fill + dt * SPEED);
  if (liquidEl) liquidEl.style.height = `${fill}%`;
  if (fill >= 100) {
    stopPour();
    return;
  }
  raf = requestAnimationFrame(tick);
}

function startPour() {
  if (!playing || pouring) return;
  pouring = true;
  last = 0;
  if (streamEl) streamEl.classList.add('stream--on');
  if (pourBtn) pourBtn.classList.add('pour-btn--on');
  raf = requestAnimationFrame(tick);
}

function stopPour() {
  if (!pouring) return;
  pouring = false;
  cancelAnimationFrame(raf);
  if (streamEl) streamEl.classList.remove('stream--on');
  if (pourBtn) pourBtn.classList.remove('pour-btn--on');
  evaluate();
}

function evaluate() {
  playing = false;
  const diff = Math.abs(fill - target);
  let reward: number;
  let msg: string;
  let face = '🤠';

  if (diff <= 3) {
    reward = 50;
    msg = '¡Perfecto! Propina de $50.';
    face = '🤩';
  } else if (diff <= 8) {
    reward = 25;
    msg = 'Bien servido. Propina de $25.';
    face = '😃';
  } else if (diff <= 15) {
    reward = 10;
    msg = 'Aceptable. Propina de $10.';
    face = '🙂';
  } else {
    reward = -10;
    msg = fill > target ? '¡Se derramó! Perdiste $10.' : 'Muy corto. Perdiste $10.';
    face = '😠';
  }

  setCash(cash + reward);
  if (msgEl) msgEl.textContent = msg;
  if (faceEl) faceEl.textContent = face;

  if (coinsEl) {
    const coin = document.createElement('span');
    coin.className = reward > 0 ? 'coin coin--up' : 'coin coin--down';
    coin.textContent = reward > 0 ? `+$${reward}` : `-$${Math.abs(reward)}`;
    coinsEl.appendChild(coin);
    setTimeout(() => coin.remove(), 1200);
  }

  setTimeout(newRound, 1600);
}

pourBtn?.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  startPour();
});
window.addEventListener('pointerup', stopPour);
window.addEventListener('pointercancel', stopPour);
window.addEventListener('blur', stopPour);
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    startPour();
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') stopPour();
});

newRound();
