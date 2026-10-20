const horses = [
  { el: document.getElementById('SlowDancer'), pos: 2, label: 'Slow Dancer' },
  { el: document.getElementById('Valkyrie'), pos: 2, label: 'Valkyrie' },
  { el: document.getElementById('SilverBullet'), pos: 2, label: 'Silver Bullet' },
  { el: document.getElementById('HeyYa'), pos: 2, label: 'Hey! Ya!' },
];

const timer = setInterval(() => {
  let anyMoved = false;
  for (const h of horses) {
    if (!h.el) continue;
    h.pos = Math.min(h.pos + Math.random() * 2, 93);
    h.el.style.setProperty('--pos', h.pos + '%');
    anyMoved = true;
    if (h.pos >= 93) {
      clearInterval(timer);
      const winnerLabel = h.label;
      localStorage.setItem('raceWinner', winnerLabel);
      
      // Calcular resultado de la apuesta
      const betHorse = localStorage.getItem('betHorse');
      const betAmount = Number(localStorage.getItem('betAmount')) || 0;
      const cashVal = Number(localStorage.getItem('cash')) || 100;
      
      let resultMsg = '';
      if (betHorse === winnerLabel.split('(')[0].trim()) {
        const winnings = betAmount * 2; // pago fijo 2x por simplicidad
        localStorage.setItem('cash', (cashVal + winnings).toString());
        resultMsg = `🏆 Ganaste $${winnings}! Dinero: $${cashVal + winnings}`;
      } else {
        resultMsg = `🤠 Perdiste. Ganador: ${winnerLabel}. Dinero: $${cashVal}`;
      }
      alert(resultMsg);
      localStorage.setItem('betResultMsg', resultMsg);
      
      // Volver al hipódromo con cash actualizado
      window.location.href = 'index.html';
    }
  }
  if (!anyMoved) return;
}, 300);