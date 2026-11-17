(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const CFG = window.APP_CONFIG || {}, LIVE = CFG.GAS_URL && !/GANTI|XXXX/.test(CFG.GAS_URL);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const FALL = { 'Matematika': ['img/math.jpg', 'img/sains.jpg'], 'Koding & KA': ['img/ai.jpg', 'img/maskot.jpg'] };
const DEMO = { setting: { judul: 'Math & Code Hub', sambutan: 'Mode contoh: isi GAS_URL di js/config.js untuk data asli.', tahun_ajaran: '2026/2027', semester: 'Ganjil', kontak_wa: '' }, media: [
  { id: 'D1', nama: 'Simulasi Teorema Pythagoras', deskripsi: 'Eksplorasi visual luas persegi pada sisi segitiga siku-siku.', kelas: 8, mapel: 'Matematika', topik: 'Geometri', url: 'https://www.geogebra.org', petunjuk: 'Pilih "Masuk dengan Google" lalu pakai email sekolah.', gambar: '', ta: '2026/2027', sem: 'Ganjil' },
  { id: 'D2', nama: 'Python & Logika Cabang', deskripsi: 'Latihan if-else di notebook interaktif.', kelas: 8, mapel: 'Koding & KA', topik: 'Python', url: 'https://colab.research.google.com', petunjuk: 'Buka Colab, klik Salin ke Drive.', gambar: '', ta: '2026/2027', sem: 'Ganjil' },
  { id: 'D3', nama: 'Algoritma Labirin Scratch', deskripsi: 'Konsep sekuensial dan sensor.', kelas: 7, mapel: 'Koding & KA', topik: 'Scratch', url: 'https://scratch.mit.edu', petunjuk: 'Tanpa akun, langsung buka.', gambar: '', ta: '2026/2027', sem: 'Ganjil' }] };
const S = { media: [], set: {}, kelas: 0, mapel: '', q: '', per: '', me: JSON.parse(localStorage.mch_me || 'null'), tok: sessionStorage.mch_tok || '' };

async function post(action, data) {
  const r = await fetch(CFG.GAS_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, token: S.tok, data: data || {} }) });
  const j = await r.json(); if (j.code === 'AUTH') { S.tok = ''; sessionStorage.removeItem('mch_tok'); admin(); } return j;
}
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); };
const imgs = m => (String(m.gambar || '').split(',').map(s => s.trim()).filter(Boolean).length ? String(m.gambar).split(',').map(s => s.trim()).filter(Boolean) : FALL[m.mapel] || FALL['Matematika']);
const slides = a => `<div class="slides">${a.map((u, i) => `<img src="${esc(u)}" alt="" loading="lazy" class="${i ? '' : 'on'}">`).join('')}<div class="dots">${a.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div></div>`;
setInterval(() => $$('.slides').forEach(s => { const im = $$('img', s), d = $$('i', s); if (im.length < 2) return; let k = im.findIndex(x => x.classList.contains('on')); im[k].classList.remove('on'); d[k]?.classList.remove('on'); k = (k + 1) % im.length; im[k].classList.add('on'); d[k]?.classList.add('on'); }), 3800);

// ===== Siswa =====
async function boot() {
  let d; if (!LIVE) d = DEMO; else { try { const j = await (await fetch(CFG.GAS_URL + '?action=boot')).json(); if (!j.success) throw Error(j.message); d = j.data; } catch (e) { $('#grid').innerHTML = `<p>Gagal memuat: ${esc(e.message)}</p>`; return; } }
  S.media = d.media; S.set = d.setting; S.per = `${d.setting.tahun_ajaran}|${d.setting.semester}`;
  if (d.setting.sambutan) $('#sambutan').textContent = d.setting.sambutan; $('#periode').textContent = `Tahun Ajaran ${d.setting.tahun_ajaran} · Semester ${d.setting.semester}`;
  if (d.setting.kontak_wa) $('#kontak').innerHTML = `Butuh bantuan? <a href="https://wa.me/${esc(d.setting.kontak_wa)}" target="_blank" rel="noopener">WhatsApp Guru</a>`;
  $('#heroSlides').outerHTML = slides(['img/maskot.jpg', 'img/math.jpg', 'img/ai.jpg', 'img/sains.jpg']).replace('class="slides"', 'class="slides hero-img" id="heroSlides"');
  $('#grades').innerHTML = [7, 8, 9].map(k => `<button class="g g${k}" data-k="${k}">Kelas ${k}<small>${S.media.filter(m => m.kelas == k).length} media</small></button>`).join('');
  const pers = [...new Set([S.per, ...S.media.map(m => `${m.ta}|${m.sem}`)])]; $('#per').innerHTML = pers.map(p => `<option value="${esc(p)}" ${p === S.per ? 'selected' : ''}>${esc(p.replace('|', ' · Sem. '))}</option>`).join('');
  $('#mapel').innerHTML = ['', 'Matematika', 'Koding & KA'].map(m => `<button class="chip ${m ? '' : 'on'}" data-m="${esc(m)}">${m || 'Semua'}</button>`).join('');
  render(); ensureMe(false); log('laman');
}
function render() {
  const q = S.q.toLowerCase(), l = S.media.filter(m => (!S.kelas || m.kelas == S.kelas) && (!S.mapel || m.mapel === S.mapel) && `${m.ta}|${m.sem}` === S.per && (`${m.nama} ${m.deskripsi} ${m.topik}`).toLowerCase().includes(q));
  $('#grid').innerHTML = l.length ? l.map(m => `<article class="card" data-id="${esc(m.id)}"><div class="inner"><div class="face front">${slides(imgs(m))}<div class="body"><span class="badge p${m.kelas}">Kelas ${m.kelas} · ${esc(m.mapel)}</span><h3>${esc(m.nama)}</h3><p>${esc(m.deskripsi)}</p><div class="row"><a class="btn glow" href="${esc(m.url)}" target="_blank" rel="noopener" data-open>Buka Media</a><button class="btn ghost" data-flip>Cara Login</button><button class="btn ghost" data-det>Detail</button></div></div></div><div class="face back"><h4>🔑 Cara Login</h4><div class="guide-t">${esc(m.petunjuk || 'Tidak perlu login — langsung buka media.')}</div><button class="btn" data-flip>Kembali</button></div></div></article>`).join('') : '<p class="muted">Belum ada media untuk pilihan ini.</p>';
}
function findM(el) { return S.media.find(m => m.id === el.closest('.card')?.dataset.id); }
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-flip],[data-det],[data-open],.g,.chip,[data-close]'); if (!t) { if (e.target.id === 'modal') $('#modal').hidden = true; return; }
  if (t.matches('.g')) { S.kelas = S.kelas == t.dataset.k ? 0 : +t.dataset.k; $$('.g').forEach(g => g.classList.toggle('on', g.dataset.k == S.kelas)); render(); $('#katalog').scrollIntoView(); }
  else if (t.matches('.chip[data-m]')) { S.mapel = t.dataset.m; $$('.chip[data-m]').forEach(c => c.classList.toggle('on', c === t)); render(); }
  else if (t.matches('[data-flip]')) t.closest('.card').classList.toggle('flip');
  else if (t.matches('[data-close]')) $('#modal').hidden = true;
  else if (t.matches('[data-open]')) { e.preventDefault(); const m = findM(t); await ensureMe(true); log('media', m); window.open(m.url, '_blank', 'noopener'); }
  else if (t.matches('[data-det]')) { const m = findM(t); $('#sheet').innerHTML = `<button class="btn ghost x" data-close>✕</button>${slides(imgs(m))}<span class="badge p${m.kelas}">Kelas ${m.kelas} · ${esc(m.mapel)}</span><h2>${esc(m.nama)}</h2><p>${esc(m.deskripsi)}</p><h4>🔑 Cara Login</h4><p style="white-space:pre-line">${esc(m.petunjuk || 'Tidak perlu login.')}</p><div class="card" data-id="${esc(m.id)}" style="height:auto"><a class="btn glow" href="${esc(m.url)}" data-open target="_blank" rel="noopener">Buka Media</a></div>`; $('#modal').hidden = false; }
});
$('#q').oninput = e => { S.q = e.target.value; render(); }; $('#per').onchange = e => { S.per = e.target.value; render(); };
// kartu: sorot mengikuti kursor + flip otomatis bergantian
document.addEventListener('pointermove', e => { const c = e.target.closest?.('.card'); if (c) { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px'); } });
setInterval(() => { if (document.hidden || $('#student').hidden || !$('#modal').hidden) return; const cs = $$('.card').filter(c => !c.matches(':hover')); if (!cs.length) return; const c = cs[Math.floor(Math.random() * cs.length)]; c.classList.add('flip'); setTimeout(() => c.classList.remove('flip'), 2600); }, 7000);

// identitas ringan + log
function ensureMe(force) {
  return new Promise(res => {
    if (S.me) return res(S.me); if (!force) return res(null);
    $('#sheet').innerHTML = `<h2>Halo! 👋 Siapa namamu?</h2><form class="f" id="meF"><label>Nama lengkap (sesuai absen)<input name="n" required maxlength="60"></label><label>Kelas<select name="k" required><option value="">Pilih kelas</option><option>7</option><option>8</option><option>9</option></select></label><button class="btn glow">Simpan & Lanjut</button></form>`; $('#modal').hidden = false;
    $('#meF').onsubmit = ev => { ev.preventDefault(); const f = new FormData(ev.target); S.me = { nama: f.get('n').trim(), kelas: +f.get('k') }; localStorage.mch_me = JSON.stringify(S.me); $('#modal').hidden = true; res(S.me); };
  });
}
function log(jenis, m) { if (!LIVE || !S.me) return; post('log', { ...S.me, jenis, id: m?.id, nm: m?.nama }).catch(() => {}); }

// ===== Admin (modul terpisah: js/admin.js) =====
function admin() {
  const v = $('#adminView'); $('#student').hidden = true; v.hidden = false;
  const ctx = { LIVE, post, toast, modal: h => { $('#sheet').innerHTML = h; $('#modal').hidden = false; }, close: () => $('#modal').hidden = true, logout: () => { S.tok = ''; sessionStorage.removeItem('mch_tok'); location.hash = ''; } };
  if (LIVE && !S.tok) { document.body.classList.remove('is-admin'); v.innerHTML = `<div class="login"><h2>Login Guru</h2><form class="f panel" id="lg"><label>Kata sandi admin<input type="password" name="s" autocomplete="off" required></label><button class="btn glow">Masuk</button><a href="#">← Beranda siswa</a></form></div>`;
    $('#lg').onsubmit = async e => { e.preventDefault(); const j = await post('admin.login', { sandi: e.target.s.value }); if (j.success) { S.tok = j.token; sessionStorage.mch_tok = j.token; admin(); } else toast(j.message); }; return; }
  window.MCH_ADMIN.open(ctx);
}
function route() { if (location.hash.startsWith('#admin')) admin(); else { window.MCH_ADMIN?.leave(); $('#adminView').hidden = true; $('#adminView').innerHTML = ''; $('#student').hidden = false; } }
addEventListener('hashchange', route);

// ===== Kursor lup hidup =====
const L = $('#loupe');
if (matchMedia('(pointer:fine)').matches) {
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, ang = 0;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; L.style.opacity = 1; L.classList.toggle('big', !!e.target.closest('a,button,select,input,.card,.g')); });
  addEventListener('pointerdown', () => L.classList.add('click')); addEventListener('pointerup', () => L.classList.remove('click'));
  document.addEventListener('mouseleave', () => L.style.opacity = 0);
  const pp = $$('.pp', L); (function f() { const vx = (tx - x) * .16, vy = (ty - y) * .16; x += vx; y += vy; ang += (Math.max(-30, Math.min(30, vx * 2)) - ang) * .2;
    L.style.transform = `translate(${x + 12}px,${y + 12}px) rotate(${ang}deg)`;
    const dx = Math.max(-2.5, Math.min(2.5, (tx - x) / 10)), dy = Math.max(-2.5, Math.min(2.5, (ty - y) / 10)); pp.forEach(p => p.style.transform = `translate(${dx}px,${dy}px)`); requestAnimationFrame(f); })();
} else L.remove();

route(); boot();
})();
