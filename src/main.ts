// Dinero persistente entre recargas y carreras
let cash: number = Number(localStorage.getItem('cash')) || 100;
localStorage.setItem('cash', cash.toString());
function updateCash(cash: number) {
  const display = document.getElementById('cashText');
  if (display) display.textContent = `Dinero: $${cash}`;
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
let betForm = document.getElementById('bet-form') as HTMLFormElement | null;
let betAmount = document.getElementById('bet-amount') as HTMLInputElement | null;
let betHorse = document.getElementById('bet-horse') as HTMLSelectElement | null;
let betResult = document.getElementById('bet-result');

betForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const selHorse = betHorse?.value;
  const amount = Number(betAmount?.value);
  if (!selHorse || !amount || amount <= 0) {
    if (betResult) betResult.textContent = 'Tenés que apostar al menos 1 dólar, forastero.';
    return;
  }
  const cashVal = Number(localStorage.getItem('cash')) || 100;
  if (amount > cashVal) {
    if (betResult) betResult.textContent = 'No tenés suficiente plata, forastero.';
    return;
  }
  // Guardar datos de la apuesta en localStorage antes de navegar
  localStorage.setItem('betHorse', selHorse);
  localStorage.setItem('betAmount', amount.toString());
  // Descontar dinero al apostar
  localStorage.setItem('cash', (cashVal - amount).toString());
  updateCash(Number(localStorage.getItem('cash')));
  window.location.href = 'carrera.html';
});