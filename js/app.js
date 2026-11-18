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

// ===== Profil guru (credit) =====
function initProf() { const U = window.MCH_UI, b = $('#profBtn'), f = U.prof(S.set, 'foto'); if (f) { b.style.backgroundImage = `url("${f.replace(/"/g, '%22')}")`; b.textContent = ''; } else b.textContent = U.ini(U.prof(S.set, 'nama')); }
function showProfile() { $('#sheet').innerHTML = window.MCH_UI.profileHTML(S.set); $('#modal').hidden = false; }
$('#profBtn').onclick = $('#profName').onclick = showProfile; $('#profName').style.cursor = 'pointer';
// ===== Siswa =====
async function boot() {
  let d; if (!LIVE) d = DEMO; else { try { const j = await (await fetch(CFG.GAS_URL + '?action=boot')).json(); if (!j.success) throw Error(j.message); d = j.data; } catch (e) { $('#grid').innerHTML = `<p>Gagal memuat: ${esc(e.message)}</p>`; return; } }
  S.media = d.media; S.set = d.setting; initProf(); S.per = `${d.setting.tahun_ajaran}|${d.setting.semester}`;
  if (d.setting.sambutan) $('#sambutan').textContent = d.setting.sambutan; $('#periode').textContent = `Tahun Ajaran ${d.setting.tahun_ajaran} · Semester ${d.setting.semester}`;
  if (d.setting.kontak_wa) $('#kontak').innerHTML = `Butuh bantuan? <a href="https://wa.me/${esc(d.setting.kontak_wa)}" target="_blank" rel="noopener">WhatsApp Guru</a>`;
  $('#heroSlides').outerHTML = slides(['img/maskot.jpg', 'img/math.jpg', 'img/ai.jpg', 'img/sains.jpg']).replace('class="slides"', 'class="slides hero-img" id="heroSlides"');
  const GI = { 7: ['Fondasi Berhitung', 'Bilangan, bentuk, logika dasar & Scratch'], 8: ['Aljabar & Python', 'Fungsi, persamaan linear & logika cabang'], 9: ['AI & Geometri Lanjut', 'Transformasi, statistika & kecerdasan artifisial'] }, GS = {7: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>', 8: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', 9: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>'};
  $('#grades').innerHTML = [7, 8, 9].map(k => `<button class="g g${k} rv" style="--d:${(k - 7) * 100}ms" data-k="${k}"><span class="gn">${k}</span><span class="gtop"><span class="gi">${GS[k]}</span><span class="gcnt"><b>${S.media.filter(m => m.kelas == k).length}</b> media</span></span><b>Kelas ${k}</b><em>${GI[k][0]}</em><small>${GI[k][1]}</small><span class="gar"><span>Lihat media</span><i>→</i></span></button>`).join('');
  const cn = f => S.media.filter(f).length; $('#hs1').dataset.n = S.media.length; $('#hs2').dataset.n = cn(m => m.mapel === 'Matematika'); $('#hs3').dataset.n = cn(m => m.mapel !== 'Matematika'); window.MCH_UI?.count($('#hstats'));
  const pers = [...new Set([S.per, ...S.media.map(m => `${m.ta}|${m.sem}`)])]; $('#per').innerHTML = pers.map(p => `<option value="${esc(p)}" ${p === S.per ? 'selected' : ''}>${esc(p.replace('|', ' · Sem. '))}</option>`).join('');
  $('#mapel').innerHTML = ['', 'Matematika', 'Koding & KA'].map(m => `<button class="chip ${m ? '' : 'on'}" data-m="${esc(m)}">${m || 'Semua'}</button>`).join('');
  render(); ensureMe(false); log('laman');
}
function render() {
  const q = S.q.toLowerCase(), l = S.media.filter(m => (!S.kelas || m.kelas == S.kelas) && (!S.mapel || m.mapel === S.mapel) && `${m.ta}|${m.sem}` === S.per && (`${m.nama} ${m.deskripsi} ${m.topik}`).toLowerCase().includes(q));
  $$('.chip[data-m]').forEach(c => { const mp = c.dataset.m, n = S.media.filter(x => `${x.ta}|${x.sem}` === S.per && (!S.kelas || x.kelas == S.kelas) && (!mp || x.mapel === mp)).length; c.innerHTML = `${mp || 'Semua'} <em class="cc">${n}</em>`; }); $('#rc').textContent = `${l.length} media ditemukan`;
  $('#grid').innerHTML = l.length ? l.map((m, i) => `<article class="card rv" style="--d:${i * 70}ms" data-id="${esc(m.id)}"><div class="inner"><div class="face front"><div class="cimg">${slides(imgs(m))}<span class="ov l"><i class="dot"></i>${esc(m.mapel)}</span><span class="ov r">Kelas ${m.kelas}</span></div><div class="body"><small class="tp">${esc(m.topik || 'Media interaktif')} · ${esc(m.sem)} ${esc(m.ta)}</small><h3>${esc(m.nama)}</h3><p>${esc(m.deskripsi)}</p><a class="btn glow wide" href="${esc(m.url)}" target="_blank" rel="noopener" data-open>Buka Media <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg></a><div class="two"><button class="btn ghost" data-flip><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> Cara Login</button><button class="btn ghost" data-det><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> Detail</button></div></div></div><div class="face back"><h4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> Cara Login</h4>${steps(m.petunjuk)}<button class="btn" data-flip>← Kembali</button></div></div></article>`).join('') : '<p class="muted">Belum ada media untuk pilihan ini.</p>';
}
const steps = p => { const a = String(p || '').split('\n').map(x => x.trim()).filter(Boolean); return a.length ? `<ol class="stl">${a.map((t, i) => `<li><b>${i + 1}</b><span>${esc(t)}</span></li>`).join('')}</ol>` : '<p class="muted" style="flex:1">Tidak perlu login — langsung buka media.</p>'; };
function findM(el) { return S.media.find(m => m.id === el.closest('.card')?.dataset.id); }
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-flip],[data-det],[data-open],.g,.chip,[data-close]'); if (!t) { if (e.target.id === 'modal') $('#modal').hidden = true; return; }
  if (t.matches('.g')) { S.kelas = S.kelas == t.dataset.k ? 0 : +t.dataset.k; $$('.g').forEach(g => g.classList.toggle('on', g.dataset.k == S.kelas)); render(); $('#katalog').scrollIntoView(); }
  else if (t.matches('.chip[data-m]')) { S.mapel = t.dataset.m; $$('.chip[data-m]').forEach(c => c.classList.toggle('on', c === t)); render(); }
  else if (t.matches('[data-flip]')) t.closest('.card').classList.toggle('flip');
  else if (t.matches('[data-close]')) $('#modal').hidden = true;
  else if (t.matches('[data-open]')) { e.preventDefault(); const m = findM(t); await ensureMe(true); log('media', m); window.open(m.url, '_blank', 'noopener'); }
  else if (t.matches('[data-det]')) { const m = findM(t); $('#sheet').innerHTML = `<button class="btn ghost x" data-close>✕</button>${slides(imgs(m))}<span class="badge p${m.kelas}">Kelas ${m.kelas} · ${esc(m.mapel)}</span><h2>${esc(m.nama)}</h2><p>${esc(m.deskripsi)}</p><h4>Cara Login</h4>${steps(m.petunjuk)}<div class="card" data-id="${esc(m.id)}" style="height:auto"><a class="btn glow" href="${esc(m.url)}" data-open target="_blank" rel="noopener">Buka Media</a></div>`; $('#modal').hidden = false; }
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

route(); boot();
})();
