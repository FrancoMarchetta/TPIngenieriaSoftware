const horses = [
    { el: document.getElementById('SlowDancer'), pos: 2, label: 'Slow Dancer (Johnny Joestar)' },
    { el: document.getElementById('Valkyrie'), pos: 2, label: 'Valkyrie (Gyro Zeppeli)' },
    { el: document.getElementById('SilverBullet'), pos: 2, label: 'Silver Bullet (Diego Brando)' },
    { el: document.getElementById('HeyYa'), pos: 2, label: 'Hey! Ya! (Pocoloco)' },
];

const timer = setInterval(() => {
    for (const h of horses) {
        if (!h.el) continue;
        h.pos = Math.min(h.pos + Math.random() * 2, 93);
        h.el.style.setProperty('--pos', h.pos + '%');
        if (h.pos >= 93) {
            clearInterval(timer);
            const note = document.querySelector('.race__note');
            if (note) note.textContent = `🏆 Gana ${h.label}.`;
            break;
        }
    }
}, 300);
