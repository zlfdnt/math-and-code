(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)], nf = n => Number(n).toLocaleString('id-ID');
const hdr = $('.top'), bar = $('#prog'), btt = $('#btt');
const onS = () => { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? y / h * 100 : 0) + '%'; hdr.classList.toggle('sm', y > 40); btt.classList.toggle('on', y > 600); };
addEventListener('scroll', onS, { passive: true }); onS(); btt.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
$('#burger').onclick = () => hdr.classList.toggle('open'); hdr.addEventListener('click', e => { if (e.target.closest('nav a')) hdr.classList.remove('open'); });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const t = e.target; t.classList.add('in'); io.unobserve(t); setTimeout(() => t.classList.remove('rv', 'in'), 1300); } }), { threshold: .12 });
const scan = () => $$('.rv:not(.in)').forEach(el => { if (!el._o) { el._o = 1; io.observe(el); } }); scan(); new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
const W = ['Matematika', 'Koding', 'Kecerdasan Artifisial', 'Logika & Algoritma'], tw = $('#tw'); let wi = 0, ci = 0, del = false;
(function tick() { const w = W[wi]; tw.textContent = w.slice(0, ci); if (!del && ci === w.length) { del = true; return setTimeout(tick, 1400); } if (del && ci === 0) { del = false; wi = (wi + 1) % W.length; } ci += del ? -1 : 1; setTimeout(tick, del ? 40 : 85); })();
document.addEventListener('pointermove', e => { const g = e.target.closest?.('.g'); if (!g) return; const r = g.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; g.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`; });
document.addEventListener('pointerout', e => { const g = e.target.closest?.('.g'); if (g && !g.contains(e.relatedTarget)) g.style.transform = ''; });
addEventListener('pointermove', e => { const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5; $$('.fl').forEach((f, i) => { const k = (i % 3 + 1) * 14; f.style.translate = `${dx * k}px ${dy * k}px`; }); });
const PD = { nama: 'Zulfa Dianti, S.Pd., M.Pd., Gr.', jabatan: 'Guru Pengampu Mata Pelajaran Matematika serta Koding dan Kecerdasan Artifisial', bio: 'Guru Matematika di SMP Maitreyawira Bintan Center, Tanjungpinang. Mengampu Matematika serta Koding dan Kecerdasan Artifisial, dan mengembangkan Math & Code Hub agar siswa mudah menemukan media belajar interaktif dalam satu tempat.', tags: 'Matematika, Koding, Kecerdasan Artifisial' };
const e2 = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const prof = (s, k) => String(s['prof_' + k] ?? '').trim() || PD[k] || '';
const ini = n => n.replace(/[.,]/g, '').split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join('') || 'GU';
function profileHTML(s, pre) {
  const nama = prof(s, 'nama'), foto = prof(s, 'foto'), tags = prof(s, 'tags').split(',').map(x => x.trim()).filter(Boolean), wa = prof(s, 'wa').replace(/\D/g, ''), em = prof(s, 'email'), ln = /^https?:\/\//i.test(prof(s, 'tautan')) ? prof(s, 'tautan') : '';
  return `<div class="pf">${pre ? '' : '<button class="x2" data-close aria-label="Tutup">✕</button>'}<div class="pcov"></div><div class="pav" style="${foto ? `background-image:url(&quot;${e2(foto)}&quot;)` : ''}">${foto ? '' : e2(ini(nama))}</div><h3>${e2(nama)}</h3><p class="pj">${e2(prof(s, 'jabatan'))}</p><p class="pbio">${e2(prof(s, 'bio'))}</p>${tags.length ? `<div class="ptg">${tags.map(t => `<span>${e2(t)}</span>`).join('')}</div>` : ''}<div class="pac">${wa ? `<a class="btn glow" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${em ? `<a class="btn ghost" href="mailto:${e2(em)}">Email</a>` : ''}${ln ? `<a class="btn ghost" href="${e2(ln)}" target="_blank" rel="noopener">Tautan</a>` : ''}</div><small class="pfn">SMP Maitreyawira Bintan Center</small></div>`;
}
document.addEventListener('pointermove', e => { const g = e.target.closest?.('.g'); if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--gx', e.clientX - r.left + 'px'); g.style.setProperty('--gy', e.clientY - r.top + 'px'); } });
addEventListener('keydown', e => { if (e.key === 'Escape') { const m = $('#modal'); if (m) m.hidden = true; } });
window.MCH_UI = { PD, prof, ini, profileHTML, count(root) { $$('[data-n]', root).forEach(el => { const to = +el.dataset.n; let t0; const st = ts => { t0 = t0 || ts; const p = Math.min(1, (ts - t0) / 900); el.textContent = nf(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }); } };
})();
