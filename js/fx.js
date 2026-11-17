// Kursor "Precision Select" (+ kecil) dengan efek partikel hidup
(() => {
const cv = document.getElementById('fx'), pl = document.getElementById('plus'); if (!cv) return;
const fine = matchMedia('(pointer:fine)').matches, red = matchMedia('(prefers-reduced-motion:reduce)').matches; if (red) { cv.remove(); pl.remove(); return; }
const x = cv.getContext('2d'); let W, H; const dpr = Math.min(2, devicePixelRatio || 1);
const rs = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; x.setTransform(dpr, 0, 0, dpr, 0, 0); }; rs(); addEventListener('resize', rs);
const COL = ['#5B4FE9', '#FBC7D8', '#FFD166', '#06D6A0', '#8a7dff', '#7fc4ff'], P = []; let mx = -99, my = -99, px = -99, py = -99, on = false, fr = 0;
function spawn(x0, y0, vx, vy, n, burst) { for (let i = 0; i < n && P.length < 240; i++) { const a = Math.random() * 6.283, s = burst ? 1 + Math.random() * 3.6 : Math.random() * .9; P.push({ x: x0, y: y0, vx: Math.cos(a) * s - vx * .06, vy: Math.sin(a) * s - vy * .06 - (burst ? 0 : .15), l: 1, d: (burst ? .017 : .024) + Math.random() * .02, r: 1 + Math.random() * (burst ? 3 : 2.2), c: COL[Math.random() * COL.length | 0], tw: Math.random() * 6, sp: Math.random() < .2 }); } }
if (fine) {
  document.documentElement.classList.add('has-fx');
  addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; mx = e.clientX; my = e.clientY; on = true; pl.style.opacity = 1; pl.style.transform = `translate(${mx}px,${my}px)`; pl.classList.toggle('hov', !!e.target.closest('a,button,select,label,summary,.card,.g,.chip')); const d = Math.hypot(mx - px, my - py); if (px > -90 && d > 2) spawn(mx, my, mx - px, my - py, Math.min(4, 1 + (d / 14 | 0))); px = mx; py = my; });
  document.addEventListener('mouseleave', () => { pl.style.opacity = 0; on = false; });
  addEventListener('pointerdown', e => { pl.classList.add('dn'); spawn(e.clientX, e.clientY, 0, 0, 26, true); }); addEventListener('pointerup', () => pl.classList.remove('dn'));
} else addEventListener('pointerdown', e => spawn(e.clientX, e.clientY, 0, 0, 18, true));
(function f() {
  x.clearRect(0, 0, W, H); fr++; if (on && fr % 7 === 0) spawn(mx + (Math.random() - .5) * 16, my + (Math.random() - .5) * 16, 0, 0, 1);
  for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.x += p.vx; p.y += p.vy; p.vx *= .96; p.vy = p.vy * .96 + .012; p.l -= p.d; if (p.l <= 0) { P.splice(i, 1); continue; }
    x.globalAlpha = p.l; x.fillStyle = p.c;
    if (p.sp) { const s = p.r * 1.9 * (.6 + .4 * Math.sin(p.tw += .3)); x.fillRect(p.x - s, p.y - .5, s * 2, 1); x.fillRect(p.x - .5, p.y - s, 1, s * 2); } else { x.shadowBlur = 8; x.shadowColor = p.c; x.beginPath(); x.arc(p.x, p.y, p.r * p.l + .3, 0, 6.283); x.fill(); x.shadowBlur = 0; } }
  x.globalAlpha = 1; requestAnimationFrame(f);
})();
})();
