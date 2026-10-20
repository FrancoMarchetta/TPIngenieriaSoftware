// Dinero persistente entre recargas y carreras
const savedCash = localStorage.getItem('cash');
let cash: number = savedCash === null ? 100 : Number(savedCash);
localStorage.setItem('cash', cash.toString());

function updateCash(amount: number) {
  const display = document.getElementById('cashText');
  if (display) display.textContent = `Dinero: $${amount}`;
}
updateCash(cash);

// Leer resultado de carrera anterior si existe y mostrarlo
document.addEventListener('DOMContentLoaded', () => {
  const prevWinner = localStorage.getItem('raceWinner');
  const prevBet = localStorage.getItem('betResultMsg');
  if (prevWinner && prevBet) {
    const existing = document.getElementById('bet-result');
    if (existing) {
      existing.textContent = prevBet;
      existing.style.display = 'block';
    }
    // Limpiar para próxima corrida
    localStorage.removeItem('raceWinner');
    localStorage.removeItem('betResultMsg');
  }
});

// Formulario de apuesta
const betForm = document.getElementById('bet-form') as HTMLFormElement | null;
const betAmount = document.getElementById('bet-amount') as HTMLInputElement | null;
const betHorse = document.getElementById('bet-horse') as HTMLSelectElement | null;
const betResult = document.getElementById('bet-result');

betForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const selHorse = betHorse?.value;
  const amount = Number(betAmount?.value);
  if (!selHorse || !amount || amount <= 0) {
    if (betResult) betResult.textContent = 'Tenés que apostar al menos 1 dólar,.';
    return;
  }
  const stored = localStorage.getItem('cash');
  const cashVal = stored === null ? 100 : Number(stored);
  if (amount > cashVal) {
    if (betResult) betResult.textContent = 'No tenés suficiente plata .';
    return;
  }
  // Guardar datos de la apuesta
  localStorage.setItem('betHorse', selHorse);
  localStorage.setItem('betAmount', amount.toString());
  // Descontar dinero al apostar
  localStorage.setItem('cash', (cashVal - amount).toString());
  updateCash(cashVal - amount);
  window.location.href = 'carrera.html';
});
