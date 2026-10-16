let cashText = document.getElementById('cashText') as HTMLElement | null;
let betForm = document.getElementById('bet-form') as HTMLFormElement | null;
let betAmount = document.getElementById('bet-amount') as HTMLInputElement | null;
let betResult = document.getElementById('bet-result');

function updateCash(cash: number) {
  if (cashText) cashText.textContent = `Dinero: $${cash}`;
}

updateCash(100);

betForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = Number(betAmount?.value);
  if (!amount || amount <= 0) {
    if (betResult) betResult.textContent = 'Tenés que apostar al menos 1 dólar, forastero.';
    return;
  }
  window.location.href = 'carrera.html';
});
