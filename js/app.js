// ============================================================================
//  Birkonishi — atelier de mise en page du livret (façon album photo)
// ----------------------------------------------------------------------------
//  Le livret = une couverture + un « fil » de chants et de paragraphes paginé
//  automatiquement + des pages libres. Sur chaque page, des calques libres
//  (textes, photos, décors, formes) se placent, se redimensionnent et
//  tournent à la souris ou au doigt. Page logique : 640 × 640.
// ============================================================================
(function () {
  'use strict';

  const D = window.BK_DESIGN;
  const ORN = window.ORNAMENTS || [];
  const FRAMES = window.FRAMES || [];
  const STORAGE_KEY = 'bikonim.project.v1';   // clé historique : garde les livrets existants
  const UI_KEY = 'birkonishi.ui';
  const LOGICAL = 640;

  const FONT_BY_ID = Object.fromEntries(D.FONTS.map((f) => [f.id, f]));
  const ORN_BY_ID = Object.fromEntries(ORN.map((o) => [o.id, o]));
  const FRAME_BY_ID = Object.fromEntries(FRAMES.map((f) => [f.id, f]));
  const songById = (id) => SONGS.find((s) => s.id === id);

  // -------------------------------------------------------- Raccourcis ----
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const svg = (name, size) => (window.icon ? window.icon(name, size) : '');
  const HEB = /[א-ת]/;
  const translit = (he) => (window.transliterate ? window.transliterate(he) : '');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const round1 = (v) => Math.round(v * 10) / 10;
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  let idSeq = 0;
  const newId = (p) => (p || 'e') + Date.now().toString(36) + (idSeq++).toString(36) + Math.floor(Math.random() * 1296).toString(36);
  const deep = (o) => JSON.parse(JSON.stringify(o));
  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  // Recherche tolérante : sans accents, sans niqqoud, sans apostrophes.
  const fold = (s) => String(s || '').normalize('NFD')
    .replace(/[̀-֑ͯ-ׇ]/g, '')
    .replace(/[’'`´ʼ\-]/g, '').toLowerCase();

  const CAT_COLORS = { prieres: '#5b3a8c', chabbat: '#1e7b5a', fetes: '#0f766e', maroc: '#7c1d3f', babasale: '#b07a1e', ashkenaz: '#1e5a7b', hassidique: '#c2410c', habad: '#2f5fb0' };
  const ORN_CATS = [
    ['symboles', 'Symboles'], ['motifs', 'Motifs'], ['separateurs', 'Séparateurs'],
    ['coins', 'Coins'], ['cadres', 'Cadres photo'],
  ];
  const MARGINS = { etroite: [30, 34, 40], normale: [40, 46, 50], large: [54, 60, 62] };
  const TITLE_STYLES = [['classique', 'Classique'], ['bandeau', 'Bandeau'], ['cadre', 'Cadre'], ['aligne', 'Aligné']];
  const SEPS = [['rule', 'Filet'], ['orn', 'Ornement'], ['none', 'Aucun']];
  const FILTERS = [['none', 'Original'], ['nb', 'N & B'], ['sepia', 'Sépia'], ['doux', 'Doux'], ['vif', 'Vif']];
  const FILTER_CSS = { none: '', nb: 'grayscale(1)', sepia: 'sepia(.7) contrast(.95)', doux: 'saturate(.8) brightness(1.05) contrast(.92)', vif: 'saturate(1.3) contrast(1.06)' };

  // ================================================================ État ===
  function freshTheme(id) {
    const t = D.THEMES[id] || D.THEMES.royal;
    const th = Object.assign({}, D.THEME_BASE, t, { id: D.THEMES[id] ? id : 'royal' });
    delete th.label;
    return th;
  }
  function buildCover(layoutId, title, subtitle) {
    const L = D.COVER_LAYOUTS.find((l) => l.id === layoutId) || D.COVER_LAYOUTS[0];
    return L.build(title, subtitle).map((e) => withDefaults(Object.assign({ id: newId() }, e)));
  }
  function withDefaults(e) {
    if (e.type === 'text') return Object.assign({ align: 'center', lead: 1.25, weight: 400, rot: 0 }, e);
    if (e.type === 'image') return Object.assign({ fit: 'cover', shape: 'rect', radius: 0, border: 0, borderColor: 'gold', px: 50, py: 50, zoom: 1, filter: 'none', rot: 0 }, e);
    if (e.type === 'orn') return Object.assign({ color: 'accent', rot: 0 }, e);
    if (e.type === 'shape') return Object.assign({ fill: 'accent', op: 0.15, rot: 0, radius: 0 }, e);
    return e;
  }
  function defaultState() {
    const cover = { title: 'Mon Birkon', subtitle: 'Chants du Chabbat', layout: 'centre' };
    return {
      v: 2, name: 'Mon birkon', theme: freshTheme('royal'), cover,
      phonetic: true, translation: false, zoom: 0.94,
      blocks: [], overlays: { cover: buildCover('centre', cover.title, cover.subtitle) }, pageStyles: {},
    };
  }
  // Charge et migre un livret enregistré (v1 : template + blocs seulement).
  function loadState() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { s = null; }
    const base = defaultState();
    if (!s || typeof s !== 'object') return base;
    if (!s.v) {
      const map = { royal: 'royal', desert: 'desert', ocean: 'ocean', classic: 'classique' };
      const cover = Object.assign({ layout: 'centre' }, base.cover, s.cover || {});
      s = {
        v: 2, name: 'Mon birkon', theme: freshTheme(map[s.template] || 'royal'), cover,
        phonetic: s.phonetic !== false, translation: !!(s.translation || s.lang === 'fr'),
        zoom: base.zoom, blocks: Array.isArray(s.blocks) ? s.blocks : [],
        overlays: { cover: buildCover('centre', cover.title, cover.subtitle) }, pageStyles: {},
      };
    }
    s = Object.assign(base, s);
    s.theme = Object.assign(freshTheme(s.theme && s.theme.id), s.theme || {});
    if (!Array.isArray(s.blocks)) s.blocks = [];
    s.blocks = s.blocks.filter((b) => b && b.uid && b.type);
    if (!s.overlays || typeof s.overlays !== 'object') s.overlays = {};
    if (!s.pageStyles || typeof s.pageStyles !== 'object') s.pageStyles = {};
    if (typeof s.zoom !== 'number' || !isFinite(s.zoom)) s.zoom = base.zoom;
    return s;
  }
  let state = loadState();

  let ui = { tab: 'modeles', panel: true };
  try { ui = Object.assign(ui, JSON.parse(localStorage.getItem(UI_KEY)) || {}); } catch (e) { /* défaut */ }
  const saveUi = () => { try { localStorage.setItem(UI_KEY, JSON.stringify(ui)); } catch (e) { /* rien */ } };

  let sel = null;            // { kind:'el', key, id } | { kind:'block', uid } | { kind:'page', key }
  let currentPage = 0;
  let curZ = 0.8;
  let searchQuery = '', catFilter = 'all';
  let bgScope = 'page';
  let editing = null;        // texte en cours d'édition directe
  let photos = [];           // { id, url, w, h, name }
  const photoUrl = {};       // id → URL utilisable

  // ========================================================= Historique ===
  const undoStack = [], redoStack = [];
  let lastTag = null, lastTagAt = 0;
  const snapshot = () => { const c = Object.assign({}, state); delete c.zoom; return JSON.stringify(c); };
  function pushHistory(tag) {
    const now = Date.now();
    if (tag && tag === lastTag && now - lastTagAt < 1500) { lastTagAt = now; return; }
    lastTag = tag || null; lastTagAt = now;
    undoStack.push(snapshot());
    if (undoStack.length > 80) undoStack.shift();
    redoStack.length = 0;
    syncUndo();
  }
  function restore(json) {
    const z = state.zoom;
    state = Object.assign(JSON.parse(json), { zoom: z });
    if (sel && sel.kind === 'el' && !findEl(sel.key, sel.id)) sel = null;
    if (sel && sel.kind === 'block' && !blockByUid(sel.uid)) sel = null;
    lastTag = null;
    syncControls(); renderAll(); save();
  }
  function undo() { if (!undoStack.length) return; redoStack.push(snapshot()); restore(undoStack.pop()); syncUndo(); }
  function redo() { if (!redoStack.length) return; undoStack.push(snapshot()); restore(redoStack.pop()); syncUndo(); }
  function syncUndo() { $('#undoBtn').disabled = !undoStack.length; $('#redoBtn').disabled = !redoStack.length; }

  // ======================================================== Persistance ===
  let saveTimer = null;
  function save() {
    $('#saveState').textContent = 'Enregistrement…';
    $('#saveState').classList.add('busy');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        $('#saveState').textContent = 'Enregistré';
      } catch (e) {
        $('#saveState').textContent = 'Non enregistré';
        toast('Sauvegarde impossible : le livret est trop volumineux.');
      }
      $('#saveState').classList.remove('busy');
    }, 350);
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2800);
  }
  function confirmBox(msg, yes) {
    return new Promise((res) => {
      const m = $('#confirmModal');
      $('#confirmMsg').textContent = msg;
      $('#confirmYes').textContent = yes || 'Confirmer';
      m.hidden = false; $('#confirmYes').focus();
      const done = (v) => { m.hidden = true; $('#confirmYes').onclick = $('#confirmNo').onclick = m.onclick = null; res(v); };
      $('#confirmYes').onclick = () => done(true);
      $('#confirmNo').onclick = () => done(false);
      m.onclick = (e) => { if (e.target === m) done(false); };
    });
  }

  // ===================================================== Photos (IndexedDB) =
  //  Les photos restent dans le navigateur (jamais envoyées) : IndexedDB pour
  //  ne pas saturer localStorage ; le livret ne garde que leur identifiant.
  const IDB = {
    db: null,
    open() {
      return new Promise((res) => {
        try {
          const r = indexedDB.open('birkonishi', 1);
          r.onupgradeneeded = () => r.result.createObjectStore('photos', { keyPath: 'id' });
          r.onsuccess = () => { IDB.db = r.result; res(true); };
          r.onerror = () => res(false);
        } catch (e) { res(false); }
      });
    },
    tx(mode) { return IDB.db.transaction('photos', mode).objectStore('photos'); },
    all() {
      return new Promise((res) => {
        if (!IDB.db) return res([]);
        const r = IDB.tx('readonly').getAll();
        r.onsuccess = () => res(r.result || []); r.onerror = () => res([]);
      });
    },
    put(rec) { return new Promise((res) => { if (!IDB.db) return res(false); const r = IDB.tx('readwrite').put(rec); r.onsuccess = () => res(true); r.onerror = () => res(false); }); },
    del(id) { return new Promise((res) => { if (!IDB.db) return res(false); const r = IDB.tx('readwrite').delete(id); r.onsuccess = () => res(true); r.onerror = () => res(false); }); },
  };
  async function loadPhotos() {
    const ok = await IDB.open();
    const recs = ok ? await IDB.all() : [];
    recs.sort((a, b) => (a.at || 0) - (b.at || 0));
    photos = recs.map((r) => {
      const url = URL.createObjectURL(r.blob);
      photoUrl[r.id] = url;
      return { id: r.id, url, w: r.w, h: r.h, name: r.name };
    });
  }
  const srcUrl = (src) => (!src ? '' : /^(data:|blob:|https?:)/.test(src) ? src : (photoUrl[src] || ''));

  function readImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const max = 1800, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((blob) => blob ? res({ blob, w: c.width, h: c.height }) : rej(new Error('blob')), 'image/jpeg', 0.86);
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image')); };
      img.src = url;
    });
  }
  async function addPhotoFiles(files) {
    const list = Array.from(files || []).filter((f) => /^image\//.test(f.type));
    if (!list.length) return [];
    const added = [];
    for (const f of list) {
      try {
        const { blob, w, h } = await readImage(f);
        const id = newId('p');
        const rec = { id, blob, w, h, name: f.name.replace(/\.[^.]+$/, ''), at: Date.now() };
        const stored = await IDB.put(rec);
        const url = URL.createObjectURL(blob);
        photoUrl[id] = url;
        const p = { id, url, w, h, name: rec.name };
        photos.push(p); added.push(p);
        if (!stored) toast('Photo ajoutée pour cette session seulement (stockage du navigateur indisponible).');
      } catch (e) { toast('Image illisible : ' + f.name); }
    }
    renderPhotoGrids();
    if (added.length > 1) toast(added.length + ' photos ajoutées');
    return added;
  }
  async function deletePhoto(id) {
    const used = allEls().some(({ el }) => el.src === id) || state.theme.bgImg === id ||
      Object.values(state.pageStyles).some((p) => p.bgImg === id);
    if (used && !(await confirmBox('Cette photo est utilisée dans le livret. La supprimer quand même ?', 'Supprimer'))) return;
    await IDB.del(id);
    photos = photos.filter((p) => p.id !== id);
    renderPhotoGrids();
    if (used) renderAll();
  }

  // ===================================================== Accès au modèle ===
  const blockByUid = (uid) => state.blocks.find((b) => b.uid === uid);
  const elsOf = (key) => state.overlays[key] || (state.overlays[key] = []);
  const findEl = (key, id) => (state.overlays[key] || []).find((e) => e.id === id) || null;
  function allEls() {
    const out = [];
    Object.entries(state.overlays).forEach(([key, arr]) => (arr || []).forEach((el) => out.push({ key, el })));
    return out;
  }
  function pageStyle(key) {
    const t = state.theme, o = state.pageStyles[key] || {};
    const get = (k) => (o[k] !== undefined ? o[k] : t[k]);
    return { paper: get('paper'), texture: get('texture'), frame: get('frame'), bgImg: get('bgImg'), bgOp: get('bgOp') };
  }
  const fontCss = (f) => f === 'he' ? 'var(--f-he)' : f === 'latin' ? 'var(--f-latin)' : (FONT_BY_ID[f] ? FONT_BY_ID[f].css : 'var(--f-latin)');
  const colorCss = (c) => c === 'accent' ? 'var(--accent)' : c === 'ink' ? 'var(--ink)' : c === 'gold' ? 'var(--gold)' : c === 'paper' ? 'var(--paper)' : (c || 'var(--ink)');
  function luminance(hex) {
    const h = String(hex || '#fff').replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h.slice(0, 6), 16) || 0;
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  const resolveColor = (c) => c === 'accent' ? state.theme.accent : c === 'ink' ? state.theme.ink : c === 'gold' ? state.theme.gold : c === 'paper' ? state.theme.paper : c;

  // ============================================================= Thème ====
  function applyTheme() {
    const t = state.theme, book = $('#book').style;
    book.setProperty('--f-he', (FONT_BY_ID[t.he] || FONT_BY_ID.frank).css);
    book.setProperty('--f-latin', (FONT_BY_ID[t.latin] || FONT_BY_ID.cormorant).css);
    book.setProperty('--ink', t.ink); book.setProperty('--accent', t.accent);
    book.setProperty('--gold', t.gold); book.setProperty('--paper', t.paper);
    book.setProperty('--fs', t.size || 1); book.setProperty('--lh', t.lead || 1);
  }

  // ======================================================= Rendu du fil ===
  function heHtml(s) {
    return escapeHtml(s)
      .replace(/ · /g, ' <span class="sep">׀</span> ')
      .replace(/(הַמְזַמֵּן|הַמְסֻבִּים):/g, '<span class="who">$1 :</span>');
  }
  function trHtml(s) {
    return escapeHtml(s)
      .replace(/^(Hamzammén|Hamsoubbim):/g, '<span class="who">$1 :</span>')
      .replace(/ (Hamzammén|Hamsoubbim):/g, ' <span class="who">$1 :</span>');
  }
  const bareLen = (s) => s.replace(/[^א-ת ]/g, '').length;
  const twoColCache = {};
  function twoColumns(songId) {
    if (songId in twoColCache) return twoColCache[songId];
    const s = songById(songId);
    const stanzas = s ? s.lines.map((l) => l.he.split(' / ')).filter((ls) => ls.length > 1) : [];
    return (twoColCache[songId] = stanzas.length > 0 &&
      stanzas.every((ls) => ls.length % 2 === 0 && ls.every((x) => bareLen(x) <= 30)));
  }
  const showPhon = (b) => (b.phon === 'on' ? true : b.phon === 'off' ? false : state.phonetic);
  const showTrans = (b) => (b.trans === 'on' ? true : b.trans === 'off' ? false : state.translation);
  function sepHtml() {
    const sp = state.theme.sep;
    if (sp === 'none') return '';
    if (sp === 'orn' && ORN_BY_ID['sep-diamond']) {
      const o = ORN_BY_ID['sep-diamond'];
      return `<span class="head-sep orn"><svg viewBox="${o.vb}" preserveAspectRatio="xMidYMid meet">${o.svg}</svg></span>`;
    }
    return '<span class="head-sep rule"></span>';
  }
  function flowItem(cls, block) {
    const el = document.createElement('div');
    el.className = 'flow-item ' + cls;
    el.dataset.uid = block.uid;
    el.draggable = true;
    if (block.size && block.size !== 1) el.style.setProperty('--k', block.size);
    return el;
  }
  function songHeadEl(block, cont) {
    const s = songById(block.songId) || {};
    const ts = block.titleStyle || state.theme.titleStyle || 'classique';
    const el = flowItem('song-head ts-' + ts + (cont ? ' cont' : ''), block);
    el.innerHTML = `<div class="song-title-row">
        <span class="song-heb">${s.hebrew || ''}</span>
        <span class="song-lat">${escapeHtml(s.title || '')}${cont ? ' <em>(suite)</em>' : ''}</span>
      </div>
      ${(!cont && s.author && block.showAuthor !== false) ? `<p class="song-author">${escapeHtml(s.author)}</p>` : ''}
      ${!cont && ts !== 'bandeau' && ts !== 'aligne' ? sepHtml() : ''}`;
    return el;
  }
  function verseEl(block, ln) {
    const hasHeb = HEB.test(ln.he);
    const trText = showPhon(block) && hasHeb ? (ln.tr || translit(ln.he)) : '';
    const showFr = showTrans(block) && ln.fr;
    const heLines = ln.he.split(' / ');
    const trLines = trText ? trText.split(' / ') : [];
    const poem = heLines.length > 1;
    const el = flowItem('verse' + (poem ? ' is-poem' : ' is-prose') + (ln.r ? ' refrain' : ''), block);
    let body;
    if (poem) {
      const cols = block.cols || 'auto';
      const two = cols === '2' || (cols === 'auto' && twoColumns(block.songId));
      body = `<div class="poem${two ? ' two' : ''}">${heLines.map((h, i) => `
          <div class="ln"><div class="he">${heHtml(h)}</div>${trText ? `<div class="tr">${trHtml(trLines[i] || '')}</div>` : ''}</div>`).join('')}
        </div>`;
    } else {
      body = `<div class="prose"><div class="he">${heHtml(ln.he)}</div>
        ${trText ? `<div class="tr">${trHtml(trText)}</div>` : ''}</div>`;
    }
    el.innerHTML = `${ln.r ? '<span class="refrain-tag">Refrain</span>' : ''}${body}
      ${showFr ? `<div class="xl">${escapeHtml(ln.fr)}</div>` : ''}`;
    return el;
  }
  function freeBlockEl(block) {
    const el = flowItem('block block-' + block.type, block);
    if (block.type === 'text') {
      if (block.align) el.style.textAlign = block.align;
      el.innerHTML = `${block.title ? `<h3 class="free-title">${escapeHtml(block.title)}</h3>` : ''}
        <div class="free-body" dir="auto">${escapeHtml(block.body || '')}</div>`;
    } else if (block.type === 'image') {
      el.innerHTML = `<img class="free-img" src="${escapeHtml(srcUrl(block.src))}" alt="" />
        ${block.caption ? `<p class="free-cap">${escapeHtml(block.caption)}</p>` : ''}`;
    }
    return el;
  }

  // ---------------------------------------------------------- Pages ------
  function makePage(book, kind, key, firstUid) {
    const p = document.createElement('div');
    p.className = 'page page-' + kind;
    p.dataset.key = key;
    if (firstUid) p.dataset.first = firstUid;
    const ps = pageStyle(key);
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    // Papier propre à la page : on inverse l'encre si le papier change de clarté.
    if (ps.paper !== state.theme.paper) {
      sheet.style.setProperty('--paper', ps.paper);
      const darkPage = luminance(ps.paper) < 0.3, darkTheme = luminance(state.theme.paper) < 0.3;
      if (darkPage !== darkTheme) sheet.style.setProperty('--ink', darkPage ? '#f1ead8' : '#1d1813');
    }
    const tex = D.TEXTURES.find((t) => t.id === ps.texture) || D.TEXTURES[0];
    const tc = texCss(tex);
    const fr = FRAME_BY_ID[ps.frame];
    const m = MARGINS[state.theme.margin] || MARGINS.normale;
    const padT = fr ? Math.max(m[0], 44) : m[0], padX = fr ? Math.max(m[1], 48) : m[1], padB = fr ? Math.max(m[2], 52) : m[2];
    sheet.style.setProperty('--pad', `${padT}px ${padX}px ${padB}px`);
    sheet.innerHTML = `<div class="bg" style="background-image:${tc.image};background-size:${tc.size}"></div>
      ${ps.bgImg && srcUrl(ps.bgImg) ? `<div class="bg-photo" style="background-image:url('${srcUrl(ps.bgImg)}');opacity:${ps.bgOp}"></div>` : ''}
      <div class="layers back"></div>
      ${fr ? `<svg class="frame" viewBox="0 0 640 640" aria-hidden="true">${fr.svg}</svg>` : ''}
      <div class="page-inner"></div>
      <div class="layers front"></div>
      <div class="guides"></div>`;
    p.appendChild(sheet);
    book.appendChild(p);
    return { page: p, inner: $('.page-inner', sheet), sheet, padX, padT, padB };
  }

  // Les motifs SVG sont des url("…") : guillemets simples pour l'attribut style.
  function texCss(tex) {
    const c = tex.css(state.theme.accent, state.theme.gold);
    return { image: String(c.image).replace(/"/g, "'"), size: c.size };
  }
  function renderBook() {
    applyTheme();
    const book = $('#book');
    book.innerHTML = '';
    applyZoom();
    makePage(book, 'cover', 'cover');

    // Pagination réelle du fil : on remplit chaque page jusqu'au débordement.
    const parts = {};
    let cur = null;
    const newFlowPage = (uid) => {
      const n = parts[uid] || 0; parts[uid] = n + 1;
      cur = makePage(book, 'flow', uid + '#' + n, uid);
      cur.limit = cur.inner.clientHeight - parseFloat(getComputedStyle(cur.inner).paddingBottom || 0);
      return cur;
    };
    const overflow = () => {
      const last = cur.inner.lastElementChild;
      return !!last && last.offsetTop + last.offsetHeight > cur.limit + 0.5;
    };
    const fitAlone = (el) => { if (overflow() && cur.inner.childElementCount <= 2) el.classList.add('dense'); };
    let headEl = null, headUid = null, versesOnPage = 0;

    state.blocks.forEach((b) => {
      if (b.type === 'page') {
        cur = null; headEl = null; headUid = null;
        makePage(book, 'free', b.uid, b.uid);
        return;
      }
      if (b.type === 'song') {
        if (b.newPage && cur && cur.inner.childElementCount) cur = null;
        if (!cur) newFlowPage(b.uid);
        const s = songById(b.songId);
        const lines = s && s.lines ? s.lines : [{ he: 'Chant introuvable.', fr: '' }];
        const head = songHeadEl(b, false);
        cur.inner.appendChild(head);
        if (overflow() && cur.inner.childElementCount > 1) {
          cur.inner.removeChild(head);
          newFlowPage(b.uid);
          cur.inner.appendChild(head);
        }
        headEl = head; headUid = b.uid; versesOnPage = 0;
        lines.forEach((ln) => {
          const el = verseEl(b, ln);
          cur.inner.appendChild(el);
          if (overflow() && cur.inner.childElementCount > 1) {
            cur.inner.removeChild(el);
            const orphan = versesOnPage === 0 && headUid === b.uid && headEl &&
              headEl.parentNode === cur.inner && headEl === cur.inner.lastElementChild;
            if (orphan) cur.inner.removeChild(headEl);
            newFlowPage(b.uid);
            headEl = orphan ? headEl : songHeadEl(b, true);
            cur.inner.appendChild(headEl);
            headUid = b.uid; versesOnPage = 0;
            cur.inner.appendChild(el);
            fitAlone(el);
          }
          versesOnPage++;
        });
        return;
      }
      if (!cur) newFlowPage(b.uid);
      const el = freeBlockEl(b);
      cur.inner.appendChild(el);
      if (overflow() && cur.inner.childElementCount > 1) {
        cur.inner.removeChild(el);
        newFlowPage(b.uid);
        cur.inner.appendChild(el);
      }
      fitAlone(el);
      headEl = null; headUid = null; versesOnPage = 0;
    });

    // Dernier bloc présent sur chaque page (pour insérer « après cette page »).
    $$('.page', book).forEach((p) => {
      const items = $$('.flow-item', p);
      p.dataset.last = items.length ? items[items.length - 1].dataset.uid : (p.dataset.first || '');
    });

    if (!state.blocks.length) {
      const g = document.createElement('div');
      g.className = 'page page-ghost no-print';
      g.innerHTML = `<div class="ghost-inner">
          <span class="ghost-mark">${svg('book', 34)}</span>
          <strong>Votre livret est vide</strong>
          <p>Partez d'une composition toute prête ou ajoutez vos chants un par un.</p>
          <div class="ghost-actions">
            <button class="btn btn-primary" data-open="modeles">${svg('layout', 18)} Compositions</button>
            <button class="btn btn-soft" data-open="chants">${svg('music', 18)} Chants</button>
          </div></div>`;
      book.appendChild(g);
    }

    // Numéros de page (couverture non numérotée)
    pageEls().forEach((p, i) => { p.dataset.n = i ? 'Page ' + i : 'Couverture'; });
    if (state.theme.pageNumbers) {
      $$('.page:not(.page-ghost)', book).forEach((p, i) => {
        if (!i) return;
        const n = document.createElement('span');
        n.className = 'page-num';
        n.textContent = i;
        $('.sheet', p).appendChild(n);
      });
    }

    renderAllLayers();
    markBlockSelection();
    const total = pageEls().length;
    if (currentPage >= total) currentPage = total - 1;
    if (currentPage < 0) currentPage = 0;
    updatePageIndicator();
    scheduleFit();
  }

  // ------------------------------------------------------ Calques libres ---
  function elNode(el, key) {
    const d = document.createElement('div');
    d.className = 'el el-' + el.type + (el.lock ? ' locked' : '');
    d.dataset.id = el.id; d.dataset.k = key;
    const st = d.style;
    st.left = el.x + 'px'; st.top = el.y + 'px'; st.width = el.w + 'px';
    if (el.type !== 'text') st.height = el.h + 'px';
    if (el.rot) st.transform = `rotate(${el.rot}deg)`;
    if (el.op != null && el.op < 1 && el.type !== 'shape') st.opacity = el.op;

    if (el.type === 'text') {
      const tx = document.createElement('div');
      tx.className = 'tx'; tx.dir = 'auto';
      Object.assign(tx.style, {
        fontFamily: fontCss(el.font), fontSize: el.size + 'px', color: colorCss(el.color),
        fontWeight: el.weight || 400, fontStyle: el.italic ? 'italic' : 'normal',
        textAlign: el.align || 'center', lineHeight: el.lead || 1.25, letterSpacing: (el.ls || 0) + 'px',
      });
      tx.textContent = el.text || '';
      if (!el.text) tx.dataset.empty = 'Double-cliquez pour écrire';
      d.appendChild(tx);
    } else if (el.type === 'image') {
      const ph = document.createElement('div');
      ph.className = 'ph';
      ph.style.borderRadius = el.shape === 'circle' ? '50%' : el.shape === 'arch' ? `${el.w / 2}px ${el.w / 2}px ${el.radius || 0}px ${el.radius || 0}px` : (el.radius || 0) + 'px';
      if (el.border) ph.style.boxShadow = `inset 0 0 0 ${el.border}px ${colorCss(el.borderColor)}`;
      const url = srcUrl(el.src);
      if (url) {
        const fx = el.flipH ? ' scaleX(-1)' : '';
        ph.innerHTML = `<img alt="" draggable="false" src="${escapeHtml(url)}" style="object-fit:${el.fit || 'cover'};object-position:${el.px}% ${el.py}%;transform-origin:${el.px}% ${el.py}%;transform:scale(${el.zoom || 1})${fx};filter:${FILTER_CSS[el.filter] || 'none'}" />`;
        if (el.border) ph.insertAdjacentHTML('beforeend', `<span class="ph-border" style="border-radius:inherit;box-shadow:inset 0 0 0 ${el.border}px ${colorCss(el.borderColor)}"></span>`);
      } else {
        d.classList.add('empty');
        ph.innerHTML = `<span class="ph-empty">${svg('image', 28)}<span>Glissez une photo ici</span></span>`;
      }
      d.appendChild(ph);
    } else if (el.type === 'orn') {
      const o = ORN_BY_ID[el.orn];
      if (o) {
        const fx = el.flipH ? -1 : 1, fy = el.flipV ? -1 : 1;
        const g2 = el.color2 && el.color2 !== 'gold' ? `--gold:${colorCss(el.color2)};` : '';
        d.innerHTML = `<svg viewBox="${o.vb}" preserveAspectRatio="xMidYMid meet" style="color:${colorCss(el.color)};${g2}transform:scale(${fx},${fy})">${o.svg}</svg>`;
      }
    } else if (el.type === 'shape') {
      const s = document.createElement('div');
      s.className = 'shp';
      Object.assign(s.style, {
        background: colorCss(el.fill), opacity: el.op == null ? 1 : el.op,
        borderRadius: (el.radius >= 999 ? '50%' : (el.radius || 0) + 'px'),
      });
      d.appendChild(s);
      if (el.border) {
        const b = document.createElement('div');
        b.className = 'shp-border';
        Object.assign(b.style, { borderRadius: s.style.borderRadius, boxShadow: `inset 0 0 0 ${el.border}px ${colorCss(el.borderColor)}` });
        d.appendChild(b);
      }
    }
    if (sel && sel.kind === 'el' && sel.id === el.id) decorate(d, el);
    return d;
  }
  function decorate(d, el) {
    d.classList.add('selected');
    if (el.lock) { d.insertAdjacentHTML('beforeend', `<span class="lock-badge">${svg('lock', 12)}</span>`); return; }
    const hs = el.type === 'text' ? ['nw', 'ne', 'sw', 'se', 'e', 'w'] : ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    hs.forEach((h) => d.insertAdjacentHTML('beforeend', `<span class="h h-${h}" data-h="${h}"></span>`));
    d.insertAdjacentHTML('beforeend', `<span class="h h-rot" data-h="rot" title="Faire pivoter">${svg('rotate', 12)}</span>`);
  }

  // Les calques d'une clé s'affichent sur la page de même clé ; si la page a
  // disparu (chant raccourci, traduction masquée…), sur la dernière page du
  // même bloc — sans rien modifier, ils retrouvent leur page ensuite.
  function pageForKey(key) {
    const exact = $(`#book .page[data-key="${CSS.escape(key)}"]`);
    if (exact) return exact;
    const m = /^(.*)#\d+$/.exec(key);
    if (!m) return null;
    const same = $$(`#book .page[data-first="${CSS.escape(m[1])}"]`);
    return same.length ? same[same.length - 1] : null;
  }
  function renderAllLayers() {
    $$('#book .layers').forEach((l) => { l.innerHTML = ''; });
    Object.keys(state.overlays).forEach((key) => {
      const arr = state.overlays[key];
      if (!arr || !arr.length) return;
      const p = pageForKey(key);
      if (!p) {
        if (key !== 'cover' && !blockByUid(key.replace(/#\d+$/, ''))) delete state.overlays[key];
        return;
      }
      arr.forEach((el) => $(`.layers.${el.back ? 'back' : 'front'}`, p).appendChild(elNode(el, key)));
    });
  }
  function refreshEl(key, id) {
    const el = findEl(key, id);
    const old = $(`#book .el[data-id="${id}"]`);
    if (!el) { if (old) old.remove(); return; }
    const node = elNode(el, key);
    const p = pageForKey(key);
    const layer = p && $(`.layers.${el.back ? 'back' : 'front'}`, p);
    if (old && old.parentNode === layer) old.replaceWith(node);
    else { if (old) old.remove(); if (!layer) return; reorderInto(layer, key, node, el); }
    scheduleThumbs();
  }
  function reorderInto(layer, key, node, el) {
    const arr = elsOf(key);
    const after = arr.slice(arr.indexOf(el) + 1).find((x) => !!x.back === !!el.back && $(`.el[data-id="${x.id}"]`, layer));
    if (after) layer.insertBefore(node, $(`.el[data-id="${after.id}"]`, layer)); else layer.appendChild(node);
  }
  function refreshPageLayers(key) {
    const p = pageForKey(key);
    if (!p) return;
    $$(`.el[data-k="${CSS.escape(key)}"]`, p).forEach((n) => n.remove());
    elsOf(key).forEach((el) => $(`.layers.${el.back ? 'back' : 'front'}`, p).appendChild(elNode(el, key)));
    scheduleThumbs();
  }

  // ================================================= Mise à l'échelle ======
  function fitScale() {
    const reader = $('#reader');
    const w = reader.clientWidth, h = reader.clientHeight;
    const avail = Math.min(w || 320, h || 320);
    return Math.max(0.2, (avail - (isMobile() ? 16 : 40)) / LOGICAL);
  }
  function applyZoom() {
    if (isOverview()) return;
    const z = (state.zoom || 0.94) * fitScale();
    if (!isFinite(z) || z <= 0) return;
    curZ = z;
    $('#book').style.setProperty('--z', z.toFixed(4));
    $('#zoomFit').textContent = Math.round((state.zoom || 0.94) / 0.94 * 100) + ' %';
  }
  function scheduleFit() {
    [40, 160, 400].forEach((d) => setTimeout(() => {
      if (isOverview()) return;
      applyZoom();
      gotoPage(currentPage);
    }, d));
  }
  function setZoom(z) {
    state.zoom = clamp(Math.round(z * 100) / 100, 0.3, 3);
    toggleOverview(false);
    applyZoom(); save();
    setTimeout(() => gotoPage(currentPage), 20);
  }

  // ======================================================= Feuilleteur =====
  const pageEls = () => $$('#book .page:not(.page-ghost)');
  const isOverview = () => $('#reader').classList.contains('overview');
  let navLock = false, navTimer = null;
  function gotoPage(i) {
    const pages = $$('#book .page');
    if (!pages.length) return;
    currentPage = clamp(i, 0, Math.max(0, pageEls().length - 1));
    updatePageIndicator();
    if (isOverview()) return;
    const reader = $('#reader');
    const target = pages[currentPage];
    const rr = reader.getBoundingClientRect(), pr = target.getBoundingClientRect();
    const delta = (pr.left + pr.width / 2) - (rr.left + rr.width / 2);
    const max = reader.scrollWidth - reader.clientWidth;
    navLock = true; clearTimeout(navTimer);
    reader.scrollLeft = clamp(reader.scrollLeft + delta, 0, max);
    navTimer = setTimeout(() => { navLock = false; }, 300);
    markCurrentThumb();
  }
  function updatePageIndicator() {
    const total = pageEls().length || 1;
    $('#pageIndicator').textContent = currentPage === 0 ? 'Couverture' : `Page ${currentPage} / ${total - 1}`;
    $('#prevPage').disabled = currentPage <= 0;
    $('#nextPage').disabled = currentPage >= total - 1;
    updateBgScopeHint();
  }
  function syncCurrentFromScroll() {
    if (navLock || isOverview()) return;
    const reader = $('#reader');
    const rr = reader.getBoundingClientRect(), center = rr.left + rr.width / 2;
    let best = 0, bestDist = Infinity;
    pageEls().forEach((p, i) => {
      const pr = p.getBoundingClientRect();
      const d = Math.abs((pr.left + pr.width / 2) - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best !== currentPage) { currentPage = best; updatePageIndicator(); markCurrentThumb(); if (bgPaneOpen()) renderBgPane(); }
  }
  function toggleOverview(force) {
    const reader = $('#reader');
    const cur = isOverview();
    const on = force !== undefined ? force : !cur;
    if (on === cur) return;
    reader.classList.toggle('overview', on);
    $('#overviewBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) { select(null); $('#book').style.setProperty('--z', isMobile() ? 0.22 : 0.27); curZ = isMobile() ? 0.22 : 0.27; }
    else { applyZoom(); setTimeout(() => gotoPage(currentPage), 20); }
  }
  const currentKey = () => { const p = pageEls()[currentPage]; return p ? p.dataset.key : 'cover'; };
  const currentPageEl = () => pageEls()[currentPage] || null;
  function goToKey(key) {
    setTimeout(() => {
      const p = pageForKey(key);
      const idx = p ? pageEls().indexOf(p) : -1;
      if (idx >= 0) { toggleOverview(false); gotoPage(idx); }
    }, 60);
  }
  function goToBlock(uid) {
    setTimeout(() => {
      const p = $(`#book .page[data-first="${CSS.escape(uid)}"]`) || ($(`#book .flow-item[data-uid="${CSS.escape(uid)}"]`) || {}).closest?.('.page');
      const idx = p ? pageEls().indexOf(p) : -1;
      if (idx >= 0) { toggleOverview(false); gotoPage(idx); }
    }, 60);
  }

  // ======================================================== Pellicule ======
  let thumbTimer = null;
  function scheduleThumbs() { clearTimeout(thumbTimer); thumbTimer = setTimeout(renderFilmstrip, 260); }
  function renderFilmstrip() {
    const fs = $('#filmstrip');
    if (getComputedStyle(fs).display === 'none') return;
    const scroll = fs.scrollLeft;
    fs.innerHTML = '';
    pageEls().forEach((p, i) => {
      const t = document.createElement('button');
      t.className = 'thumb' + (p.classList.contains('page-free') ? ' is-free' : '');
      t.dataset.i = i;
      t.title = i ? 'Page ' + i : 'Couverture';
      const box = document.createElement('div');
      box.className = 'thumb-page';
      const clone = $('.sheet', p).cloneNode(true);
      $$('.h, .lock-badge, .guides', clone).forEach((n) => n.remove());
      $$('[draggable]', clone).forEach((n) => n.removeAttribute('draggable'));
      $$('.selected, .is-selected', clone).forEach((n) => n.classList.remove('selected', 'is-selected'));
      clone.setAttribute('inert', '');
      box.appendChild(clone);
      t.appendChild(box);
      t.insertAdjacentHTML('beforeend', `<span class="thumb-n">${i ? i : 'Couv.'}</span>`);
      t.onclick = () => { toggleOverview(false); gotoPage(i); };
      fs.appendChild(t);
    });
    const add = document.createElement('button');
    add.className = 'thumb-add';
    add.title = 'Ajouter une page libre après la page affichée';
    add.innerHTML = `${svg('page-plus', 22)}<span>Page</span>`;
    add.onclick = () => addFreePage('vide');
    fs.appendChild(add);
    fs.style.setProperty('--tz', (72 / LOGICAL).toFixed(4));
    fs.scrollLeft = scroll;
    markCurrentThumb();
  }
  function markCurrentThumb() {
    const t = $$('#filmstrip .thumb');
    t.forEach((x, i) => x.classList.toggle('current', i === currentPage));
    const c = t[currentPage];
    if (c) {
      const fs = $('#filmstrip');
      const l = c.offsetLeft - fs.clientWidth / 2 + c.offsetWidth / 2;
      if (Math.abs(fs.scrollLeft - l) > fs.clientWidth / 2 - 60) fs.scrollLeft = l;
    }
  }

  function renderAll() {
    renderBook();
    renderSongList();
    renderInspector();
    scheduleThumbs();
    if (bgPaneOpen()) renderBgPane();
    if (ui.tab === 'style') renderStylePane();
  }

  // ========================================================== Sélection ===
  function select(s) {
    if (editing) editing.blur();
    const prev = sel;
    sel = s;
    if (prev && prev.kind === 'el') decorateInPlace(prev.key, prev.id, false);
    if (s && s.kind === 'el') decorateInPlace(s.key, s.id, true);
    markBlockSelection();
    renderInspector();
  }
  function refreshElQuiet(key, id) {
    const el = findEl(key, id), old = $(`#book .el[data-id="${id}"]`);
    if (el && old) old.replaceWith(elNode(el, key));
  }
  // Sélection : on décore le nœud existant (le remplacer casserait le clic en cours).
  function decorateInPlace(key, id, on) {
    const el = findEl(key, id), node = $(`#book .el[data-id="${id}"]`);
    if (!node) return;
    node.classList.remove('selected');
    $$(':scope > .h, :scope > .lock-badge', node).forEach((h) => h.remove());
    if (on && el) decorate(node, el);
  }
  function markBlockSelection() {
    $$('#book .is-selected').forEach((n) => n.classList.remove('is-selected'));
    $$('#book .page.page-selected').forEach((n) => n.classList.remove('page-selected'));
    if (sel && sel.kind === 'block') $$(`#book .flow-item[data-uid="${CSS.escape(sel.uid)}"]`).forEach((n) => n.classList.add('is-selected'));
    if (sel && sel.kind === 'page') { const p = pageForKey(sel.key); if (p) p.classList.add('page-selected'); }
  }

  // ============================================================ Ajouts =====
  function placeEl(el, key, at) {
    key = key || currentKey();
    if (!pageForKey(key)) key = 'cover';
    el = withDefaults(Object.assign({ id: newId() }, el));
    const h = el.type === 'text' ? (el.size || 20) * 1.4 : el.h;
    if (at) { el.x = Math.round(at.x - el.w / 2); el.y = Math.round(at.y - h / 2); }
    else {
      el.x = Math.round((LOGICAL - el.w) / 2); el.y = Math.round((LOGICAL - h) / 2);
      while (elsOf(key).some((o) => Math.abs(o.x - el.x) < 4 && Math.abs(o.y - el.y) < 4)) { el.x += 18; el.y += 18; }
    }
    pushHistory();
    elsOf(key).push(el);
    save();
    refreshEl(key, el.id);
    goToKey(key);
    select({ kind: 'el', key, id: el.id });
    if (isMobile()) closePanel();
    return el;
  }
  function addTextPreset(pid, key, at) {
    const p = D.TEXT_PRESETS.find((x) => x.id === pid) || D.TEXT_PRESETS[0];
    const el = { type: 'text', text: p.text, font: p.font, size: p.size, color: p.color, weight: p.weight || 400, italic: !!p.italic, align: p.align || 'center', lead: p.lead || 1.25, w: p.w || 400 };
    return placeEl(el, key, at);
  }
  function addOrnament(oid, key, at) {
    const o = ORN_BY_ID[oid];
    if (!o) return;
    let w, h;
    if (o.cat === 'separateurs') { w = 260; h = Math.round(260 / o.ar); }
    else if (o.cat === 'cadres') { h = 300; w = Math.round(300 * o.ar); if (w > 420) { w = 420; h = Math.round(420 / o.ar); } }
    else if (o.cat === 'coins') { w = h = 110; }
    else { w = h = 96; }
    const el = { type: 'orn', orn: oid, w, h, color: o.cat === 'separateurs' || o.cat === 'coins' ? 'gold' : 'accent' };
    if (o.cat === 'coins' && !at) { const placed = placeEl(el, key, { x: 24 + w / 2, y: 24 + h / 2 }); return placed; }
    return placeEl(el, key, at);
  }
  function addShape(sid, key, at) {
    const s = D.SHAPES.find((x) => x.id === sid) || D.SHAPES[0];
    const el = { type: 'shape', w: s.w, h: s.h, radius: s.radius, fill: s.id === 'line' ? 'gold' : 'accent', op: s.id === 'line' ? 1 : 0.14, back: s.id !== 'line' };
    if (s.id === 'band' && !at) return placeEl(el, key, { x: 320, y: 90 });
    return placeEl(el, key, at);
  }
  function addPhotoEl(pid, key, at) {
    const p = photos.find((x) => x.id === pid);
    const ar = p ? p.w / p.h : 1.33;
    const w = ar >= 1 ? 380 : Math.round(380 * ar), h = ar >= 1 ? Math.round(380 / ar) : 380;
    return placeEl({ type: 'image', src: pid, w, h, radius: 4 }, key, at);
  }
  function fillImage(key, id, pid) {
    const el = findEl(key, id);
    if (!el) return;
    pushHistory();
    el.src = pid; el.px = 50; el.py = 50; el.zoom = 1;
    save(); refreshEl(key, id);
    select({ kind: 'el', key, id });
  }

  // Blocs du fil ---------------------------------------------------------
  // Position d'insertion : après le dernier bloc de la page affichée.
  function insertIndexAfterCurrent() {
    const p = currentPageEl();
    if (!p || p.dataset.key === 'cover') return 0;
    const last = p.dataset.last;
    const i = state.blocks.findIndex((b) => b.uid === last);
    return i >= 0 ? i + 1 : state.blocks.length;
  }
  function insertBlock(block, beforeUid) {
    pushHistory();
    const i = beforeUid ? state.blocks.findIndex((b) => b.uid === beforeUid) : -1;
    if (i >= 0) state.blocks.splice(i, 0, block); else state.blocks.push(block);
    renderAll(); save();
    goToBlock(block.uid);
  }
  function addSong(songId, beforeUid) {
    const s = songById(songId);
    insertBlock({ uid: newId('b'), type: 'song', songId }, beforeUid);
    if (s) toast('« ' + s.title + ' » ajouté au livret');
    if (isMobile()) closePanel();
  }
  function addFreePage(layoutId) {
    const L = D.PAGE_LAYOUTS.find((l) => l.id === layoutId) || D.PAGE_LAYOUTS[0];
    pushHistory();
    const uid = newId('b');
    state.blocks.splice(insertIndexAfterCurrent(), 0, { uid, type: 'page' });
    state.overlays[uid] = L.build().map((e) => withDefaults(Object.assign({ id: newId() }, e)));
    renderAll(); save();
    goToKey(uid);
    toast('Page « ' + L.label + ' » ajoutée');
    if (isMobile()) closePanel();
  }
  function removeBlock(uid) {
    pushHistory();
    state.blocks = state.blocks.filter((b) => b.uid !== uid);
    Object.keys(state.overlays).forEach((k) => { if (k === uid || k.startsWith(uid + '#')) delete state.overlays[k]; });
    Object.keys(state.pageStyles).forEach((k) => { if (k === uid || k.startsWith(uid + '#')) delete state.pageStyles[k]; });
    if (sel && (sel.uid === uid || (sel.key && (sel.key === uid || sel.key.startsWith(uid + '#'))))) sel = null;
    renderAll(); save();
    toast('Retiré du livret — Ctrl+Z pour annuler');
  }
  function shiftBlock(uid, dir) {
    const arr = state.blocks, i = arr.findIndex((b) => b.uid === uid), j = i + dir;
    if (i < 0 || j < 0 || j >= arr.length) return;
    pushHistory();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    renderAll(); save();
    goToBlock(uid);
  }
  function moveBlock(fromUid, toUid) {
    if (fromUid === toUid) return;
    const arr = state.blocks, from = arr.findIndex((b) => b.uid === fromUid);
    if (from < 0 || arr.findIndex((b) => b.uid === toUid) < 0) return;
    pushHistory();
    const [item] = arr.splice(from, 1);
    arr.splice(arr.findIndex((b) => b.uid === toUid), 0, item);
    renderAll(); save();
    goToBlock(item.uid);
  }
  function duplicatePage(uid) {
    const i = state.blocks.findIndex((b) => b.uid === uid);
    if (i < 0) return;
    pushHistory();
    const nu = newId('b');
    state.blocks.splice(i + 1, 0, { uid: nu, type: 'page' });
    state.overlays[nu] = deep(elsOf(uid)).map((e) => Object.assign(e, { id: newId() }));
    if (state.pageStyles[uid]) state.pageStyles[nu] = deep(state.pageStyles[uid]);
    renderAll(); save();
    goToKey(nu);
  }

  async function applyPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    if (state.blocks.length && !(await confirmBox('Remplacer le contenu du livret par « ' + p.label + ' » ? Vos photos et la couverture sont conservées.', 'Remplacer'))) return;
    pushHistory();
    state.cover.title = p.cover.title; state.cover.subtitle = p.cover.subtitle;
    elsOf('cover').forEach((e) => { if (e.role === 'title') e.text = p.cover.title; if (e.role === 'subtitle') e.text = p.cover.subtitle; });
    const keep = state.blocks.filter((b) => b.type === 'page');
    Object.keys(state.overlays).forEach((k) => { if (k !== 'cover' && !keep.some((b) => b.uid === k)) delete state.overlays[k]; });
    state.blocks = p.blocks.map((b) => typeof b === 'string' ? { uid: newId('b'), type: 'song', songId: b } : Object.assign({ uid: newId('b') }, b)).concat(keep);
    sel = null; currentPage = 0;
    syncControls(); renderAll(); save();
    setTimeout(() => gotoPage(1), 80);
    toast('Composition « ' + p.label + ' » chargée');
    if (isMobile()) closePanel();
  }
  function applyCoverLayout(id) {
    pushHistory();
    const old = elsOf('cover');
    const photo = (old.find((e) => e.type === 'image' && e.src) || {}).src;
    state.cover.layout = id;
    state.overlays.cover = buildCover(id, state.cover.title, state.cover.subtitle);
    if (photo) { const im = state.overlays.cover.find((e) => e.type === 'image'); if (im) im.src = photo; }
    sel = null;
    renderAll(); save();
    goToKey('cover');
    renderCoverLayouts();
  }
  function syncCoverRoles(el) {
    if (el.role === 'title') { state.cover.title = el.text; $('#coverTitle').value = el.text; }
    if (el.role === 'subtitle') { state.cover.subtitle = el.text; $('#coverSubtitle').value = el.text; }
  }

  // ============================================== Opérations sur un calque =
  function updateEl(key, id, patch, tag) {
    const el = findEl(key, id);
    if (!el) return;
    pushHistory(tag ? id + ':' + tag : null);
    const wasBack = !!el.back;
    Object.assign(el, patch);
    if ('text' in patch) syncCoverRoles(el);
    save();
    if (wasBack !== !!el.back) refreshPageLayers(key); else refreshEl(key, id);
  }
  function removeEl(key, id) {
    pushHistory();
    state.overlays[key] = elsOf(key).filter((e) => e.id !== id);
    if (sel && sel.id === id) sel = null;
    save(); refreshEl(key, id); renderInspector();
  }
  function duplicateEl(key, id) {
    const el = findEl(key, id);
    if (!el) return;
    pushHistory();
    const c = Object.assign(deep(el), { id: newId(), x: el.x + 18, y: el.y + 18, lock: false });
    delete c.role;
    const arr = elsOf(key);
    arr.splice(arr.indexOf(el) + 1, 0, c);
    save(); refreshPageLayers(key);
    select({ kind: 'el', key, id: c.id });
  }
  function orderEl(key, id, how) {
    const arr = elsOf(key), i = arr.findIndex((e) => e.id === id);
    if (i < 0) return;
    pushHistory();
    const [el] = arr.splice(i, 1);
    if (how === 'front') arr.push(el);
    else if (how === 'back') arr.unshift(el);
    else if (how === 'up') arr.splice(Math.min(arr.length, i + 1), 0, el);
    else arr.splice(Math.max(0, i - 1), 0, el);
    save(); refreshPageLayers(key);
  }
  function cornersEl(key, id) {
    const el = findEl(key, id);
    if (!el) return;
    pushHistory();
    const m = 22;
    el.x = m; el.y = m; el.flipH = false; el.flipV = false; el.rot = 0;
    const arr = elsOf(key);
    [[true, false], [false, true], [true, true]].forEach(([fh, fv]) => {
      arr.push(Object.assign(deep(el), { id: newId(), flipH: fh, flipV: fv, x: fh ? LOGICAL - m - el.w : m, y: fv ? LOGICAL - m - el.h : m }));
    });
    save(); refreshPageLayers(key);
    toast('Décor placé dans les 4 coins');
  }

  // ======================================== Glisser / redimensionner / pivoter
  let gesture = null;
  let suppressClick = false;   // le clic qui suit un appui sur un calque ne doit pas sélectionner la page
  function snapTargets(key, id, pageEl) {
    const sheet = $('.sheet', pageEl);
    const pad = (getComputedStyle(sheet).getPropertyValue('--pad') || '40px 46px 50px').trim().split(/\s+/).map(parseFloat);
    const xs = [0, pad[1], LOGICAL / 2, LOGICAL - pad[1], LOGICAL], ys = [0, pad[0], LOGICAL / 2, LOGICAL - pad[2], LOGICAL];
    $$('.el', pageEl).forEach((n) => {
      if (n.dataset.id === id) return;
      const x = n.offsetLeft, y = n.offsetTop, w = n.offsetWidth, h = n.offsetHeight;
      xs.push(x, x + w / 2, x + w); ys.push(y, y + h / 2, y + h);
    });
    return { xs, ys };
  }
  function snap1(pos, size, targets, thr) {
    let best = null;
    [0, size / 2, size].forEach((off) => targets.forEach((t) => {
      const d = t - (pos + off);
      if (Math.abs(d) <= thr && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, line: t };
    }));
    return best;
  }
  function showGuides(pageEl, gx, gy) {
    const g = $('.guides', pageEl);
    if (!g) return;
    g.innerHTML = (gx != null ? `<span class="guide v" style="left:${gx}px"></span>` : '') +
      (gy != null ? `<span class="guide hz" style="top:${gy}px"></span>` : '');
  }
  function onPointerDown(e) {
    suppressClick = false;
    if (e.button > 0 || isOverview()) return;
    const node = e.target.closest('.el');
    if (!node) return;
    const hnd = e.target.closest('.h');
    if (node.classList.contains('editing') && !hnd) return;
    const key = node.dataset.k, id = node.dataset.id;
    const el = findEl(key, id);
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    suppressClick = true;
    const pageEl = node.closest('.page');
    const h0 = el.type === 'text' ? node.offsetHeight : el.h;
    if (!(sel && sel.kind === 'el' && sel.id === id)) select({ kind: 'el', key, id });
    if (el.lock) return;
    gesture = {
      mode: hnd ? hnd.dataset.h : 'move', key, id, pageEl, sx: e.clientX, sy: e.clientY,
      start: Object.assign({}, el, { h: h0 }), moved: false, targets: snapTargets(key, id, pageEl),
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }
  function onPointerMove(e) {
    const g = gesture;
    if (!g) return;
    if (!g.moved) {
      if (Math.hypot(e.clientX - g.sx, e.clientY - g.sy) < 3) return;
      g.moved = true; pushHistory();
      document.body.classList.add('gesturing');
    }
    const el = findEl(g.key, g.id);
    if (!el) return;
    const s = g.start, z = curZ;
    const dx = (e.clientX - g.sx) / z, dy = (e.clientY - g.sy) / z;
    const node = $(`#book .el[data-id="${g.id}"]`);
    if (g.mode === 'move') {
      let nx = s.x + dx, ny = s.y + dy, gx = null, gy = null;
      if (!e.altKey) {
        const thr = 6 / z;
        const bx = snap1(nx, s.w, g.targets.xs, thr), by = snap1(ny, s.h, g.targets.ys, thr);
        if (bx) { nx += bx.d; gx = bx.line; }
        if (by) { ny += by.d; gy = by.line; }
      }
      el.x = Math.round(nx); el.y = Math.round(ny);
      if (node) { node.style.left = el.x + 'px'; node.style.top = el.y + 'px'; }
      showGuides(g.pageEl, gx, gy);
      return;
    }
    if (g.mode === 'rot') {
      const r = $('.sheet', g.pageEl).getBoundingClientRect();
      const cx = r.left + (s.x + s.w / 2) * z, cy = r.top + (s.y + s.h / 2) * z;
      let a = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
      if (a > 180) a -= 360;
      if (e.shiftKey) a = Math.round(a / 15) * 15;
      else { const n45 = Math.round(a / 45) * 45; if (Math.abs(a - n45) < 4) a = n45; }
      el.rot = Math.round(a);
      if (node) node.style.transform = el.rot ? `rotate(${el.rot}deg)` : '';
      return;
    }
    // Redimensionnement dans le repère de l'élément (gère la rotation).
    const H = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0], ne: [1, -1], nw: [-1, -1], se: [1, 1], sw: [-1, 1] }[g.mode];
    if (!H) return;
    const th = (s.rot || 0) * Math.PI / 180, cos = Math.cos(th), sin = Math.sin(th);
    const lx = dx * cos + dy * sin, ly = -dx * sin + dy * cos;
    let nw = s.w + H[0] * lx, nh = s.h + H[1] * ly;
    const corner = H[0] && H[1];
    if (el.type === 'text') {
      nw = Math.max(30, nw);
      if (corner) { el.size = round1(clamp(s.size * nw / s.w, 6, 300)); nh = s.h * nw / s.w; } else nh = s.h;
    } else {
      const keep = corner && ((el.type !== 'shape') !== !!e.shiftKey);
      if (keep) { const k = Math.max(nw / s.w, nh / s.h); nw = s.w * k; nh = s.h * k; }
      nw = Math.max(12, nw); nh = Math.max(el.type === 'shape' ? 2 : 12, nh);
    }
    const ax = -H[0] * s.w / 2, ay = -H[1] * s.h / 2;
    const cx0 = s.x + s.w / 2, cy0 = s.y + s.h / 2;
    const awx = cx0 + ax * cos - ay * sin, awy = cy0 + ax * sin + ay * cos;
    const bx = -H[0] * nw / 2, by = -H[1] * nh / 2;
    const ncx = awx - (bx * cos - by * sin), ncy = awy - (bx * sin + by * cos);
    el.w = Math.round(nw); if (el.type !== 'text') el.h = Math.round(nh);
    el.x = Math.round(ncx - nw / 2); el.y = Math.round(ncy - nh / 2);
    refreshElQuiet(g.key, g.id);
  }
  function onPointerUp() {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    const g = gesture; gesture = null;
    document.body.classList.remove('gesturing');
    if (!g) return;
    showGuides(g.pageEl, null, null);
    if (g.moved) { save(); refreshEl(g.key, g.id); renderInspector(); }
  }

  // Édition directe d'un texte (double-clic)
  function startTextEdit(key, id) {
    const el = findEl(key, id);
    if (!el || el.lock) return;
    if (!(sel && sel.id === id)) select({ kind: 'el', key, id });
    const node = $(`#book .el[data-id="${id}"]`);
    const tx = node && $('.tx', node);
    if (!tx) return;
    pushHistory();
    node.classList.add('editing');
    tx.contentEditable = 'true';
    tx.spellcheck = false;
    delete tx.dataset.empty;
    tx.focus();
    const r = document.createRange(); r.selectNodeContents(tx);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    editing = tx;
    tx.oninput = () => { el.text = tx.innerText.replace(/\n$/, ''); syncCoverRoles(el); };
    tx.onpaste = (ev) => { ev.preventDefault(); document.execCommand('insertText', false, (ev.clipboardData || window.clipboardData).getData('text/plain')); };
    tx.onkeydown = (ev) => { if (ev.key === 'Escape') { ev.preventDefault(); tx.blur(); } ev.stopPropagation(); };
    tx.onblur = () => {
      editing = null;
      tx.contentEditable = 'false';
      node.classList.remove('editing');
      el.text = tx.innerText.replace(/\n$/, '');
      syncCoverRoles(el);
      save(); refreshEl(key, id); renderInspector();
    };
  }

  // ======================================================= Glisser-déposer
  //  Depuis les panneaux : chants (dans le fil), photos, décors, textes,
  //  formes (sur la page, à l'endroit du dépôt). Fichiers du disque acceptés.
  let payload = null;          // { kind, id }
  let dragUid = null;          // bloc du fil en cours de déplacement
  function makeDraggable(node, data) {
    node.draggable = true;
    node.addEventListener('dragstart', (e) => {
      payload = data; dragUid = null;
      node.classList.add('dragging');
      document.body.classList.add('dragging-' + data.kind);
      e.dataTransfer.effectAllowed = 'copy';
      try { e.dataTransfer.setData('text/plain', data.kind + ':' + data.id); } catch (_) { /* rien */ }
    });
    node.addEventListener('dragend', () => {
      payload = null;
      node.classList.remove('dragging');
      document.body.className = document.body.className.replace(/\bdragging-\w+/g, '').trim();
      clearDragMarks();
    });
  }
  function clearDragMarks() { $$('.drag-over').forEach((b) => b.classList.remove('drag-over')); $('#reader').classList.remove('drop-target'); }
  function logicalPoint(pageEl, e) {
    const r = $('.sheet', pageEl).getBoundingClientRect();
    return { x: (e.clientX - r.left) / curZ, y: (e.clientY - r.top) / curZ };
  }
  function initDnD() {
    const book = $('#book'), reader = $('#reader');
    book.addEventListener('dragstart', (e) => {
      const it = e.target.closest && e.target.closest('.flow-item');
      if (!it) return;
      dragUid = it.dataset.uid; payload = null;
      $$(`#book .flow-item[data-uid="${CSS.escape(dragUid)}"]`).forEach((x) => x.classList.add('dragging'));
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', 'block:' + dragUid); } catch (_) { /* rien */ }
    });
    book.addEventListener('dragend', () => { dragUid = null; $$('#book .dragging').forEach((x) => x.classList.remove('dragging')); clearDragMarks(); });

    reader.addEventListener('dragover', (e) => {
      const files = e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files');
      if (!payload && !dragUid && !files) return;
      e.preventDefault();
      clearDragMarks();
      const it = e.target.closest('.flow-item');
      const img = e.target.closest('.el-image');
      if ((payload && payload.kind === 'song') || dragUid) {
        if (it && it.dataset.uid !== dragUid) it.classList.add('drag-over');
        else reader.classList.add('drop-target');
        e.dataTransfer.dropEffect = dragUid ? 'move' : 'copy';
      } else {
        if (img && ((payload && payload.kind === 'photo') || files)) img.classList.add('drag-over');
        else { const p = e.target.closest('.page:not(.page-ghost)'); if (p) p.classList.add('drag-over'); else reader.classList.add('drop-target'); }
        e.dataTransfer.dropEffect = 'copy';
      }
    });
    reader.addEventListener('dragleave', (e) => { if (!reader.contains(e.relatedTarget)) clearDragMarks(); });
    reader.addEventListener('drop', async (e) => {
      const files = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length ? e.dataTransfer.files : null;
      if (!payload && !dragUid && !files) return;
      e.preventDefault();
      clearDragMarks();
      const it = e.target.closest('.flow-item');
      const pageEl = e.target.closest('.page:not(.page-ghost)') || currentPageEl();
      if (dragUid) {
        const target = it ? it.dataset.uid : null;
        if (target && target !== dragUid) moveBlock(dragUid, target);
        dragUid = null; return;
      }
      if (payload && payload.kind === 'song') {
        let before = it ? it.dataset.uid : null;
        if (!before && pageEl && pageEl.dataset.key !== 'cover') {
          const i = state.blocks.findIndex((b) => b.uid === pageEl.dataset.last);
          before = i >= 0 && state.blocks[i + 1] ? state.blocks[i + 1].uid : null;
        } else if (!before && pageEl && pageEl.dataset.key === 'cover' && state.blocks[0]) before = state.blocks[0].uid;
        addSong(payload.id, before);
        payload = null; return;
      }
      if (!pageEl) return;
      const key = pageEl.dataset.key, at = logicalPoint(pageEl, e);
      const imgNode = e.target.closest('.el-image');
      let pid = payload && payload.kind === 'photo' ? payload.id : null;
      if (files) { const added = await addPhotoFiles(files); pid = added[0] ? added[0].id : null; if (!pid) return; }
      if (pid && imgNode) { fillImage(imgNode.dataset.k, imgNode.dataset.id, pid); payload = null; return; }
      if (pid) addPhotoEl(pid, key, at);
      else if (payload.kind === 'orn') addOrnament(payload.id, key, at);
      else if (payload.kind === 'text') addTextPreset(payload.id, key, at);
      else if (payload.kind === 'shape') addShape(payload.id, key, at);
      payload = null;
    });
  }

  // ============================================================ Panneaux ===
  const TAB_TITLES = { modeles: 'Modèles', chants: 'Chants', textes: 'Textes', photos: 'Photos', decors: 'Décors', fonds: 'Fonds', style: 'Style' };
  function openTab(tab) {
    ui.tab = tab; ui.panel = true; saveUi();
    $$('#rail .rail-btn').forEach((b) => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('active', on);
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    $$('#panel .pane').forEach((p) => { p.hidden = p.dataset.pane !== tab; });
    $('#panelTitle').textContent = TAB_TITLES[tab] || '';
    document.body.classList.remove('panel-closed');
    document.body.classList.add('panel-open');
    if (isMobile() && sel) select(null);
    if (tab === 'fonds') renderBgPane();
    if (tab === 'style') renderStylePane();
    if (tab === 'modeles') renderCoverLayouts();
    $('#panelBody').scrollTop = 0;
    setTimeout(() => { applyZoom(); gotoPage(currentPage); }, 260);
  }
  function closePanel() {
    ui.panel = false; saveUi();
    document.body.classList.add('panel-closed');
    document.body.classList.remove('panel-open');
    $$('#rail .rail-btn').forEach((b) => { b.classList.remove('active'); b.removeAttribute('aria-current'); });
    setTimeout(() => { applyZoom(); gotoPage(currentPage); }, 260);
  }
  const bgPaneOpen = () => ui.panel && ui.tab === 'fonds';

  // Vignette schématique d'une mise en page (couverture / page libre)
  function layoutThumb(els) {
    const parts = els.map((e) => {
      const h = e.type === 'text' ? Math.max(10, e.size * 1.15) : e.h;
      if (e.type === 'image') return `<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="${e.shape === 'circle' ? e.w / 2 : e.shape === 'arch' ? 0 : 8}" class="lt-img"/>` +
        (e.shape === 'arch' ? `<path d="M${e.x} ${e.y + e.w / 2}A${e.w / 2} ${e.w / 2} 0 0 1 ${e.x + e.w} ${e.y + e.w / 2}" class="lt-arch"/>` : '');
      if (e.type === 'orn') return `<circle cx="${e.x + e.w / 2}" cy="${e.y + e.h / 2}" r="${Math.min(e.w, e.h) / 2.4}" class="lt-orn"/>`;
      const tw = Math.min(e.w, (e.text || '').length * e.size * 0.5);
      return `<rect x="${e.x + (e.w - tw) / 2}" y="${e.y + h * 0.2}" width="${tw}" height="${h * 0.6}" rx="${h * 0.3}" class="${e.role === 'title' || e.size > 30 ? 'lt-title' : 'lt-text'}"/>`;
    }).join('');
    return `<svg viewBox="0 0 640 640" class="lt" aria-hidden="true"><rect width="640" height="640" class="lt-bg"/>${parts}</svg>`;
  }
  function renderCoverLayouts() {
    const g = $('#coverLayouts');
    g.innerHTML = '';
    D.COVER_LAYOUTS.forEach((L) => {
      const b = document.createElement('button');
      b.className = 'layout-tile' + (state.cover.layout === L.id ? ' active' : '');
      b.innerHTML = `${layoutThumb(L.build('Titre du livret', 'Sous-titre'))}<span>${escapeHtml(L.label)}</span>`;
      b.onclick = () => applyCoverLayout(L.id);
      g.appendChild(b);
    });
  }
  function renderStaticPanes() {
    // Compositions de départ
    const pg = $('#presetGrid');
    pg.innerHTML = '';
    Object.entries(PRESETS).forEach(([key, p]) => {
      const b = document.createElement('button');
      b.className = 'preset-row';
      b.innerHTML = `<span class="preset-ic">${svg(p.blocks.length ? 'book' : 'file', 18)}</span>
        <span class="preset-txt"><strong>${escapeHtml(p.label)}</strong><small>${p.blocks.length ? p.blocks.length + ' chants et prières' : 'Page blanche'}</small></span>
        <span class="preset-go">${svg('chevron-right', 16)}</span>`;
      b.onclick = () => applyPreset(key);
      pg.appendChild(b);
    });
    // Pages libres
    const pl = $('#pageLayouts');
    pl.innerHTML = '';
    D.PAGE_LAYOUTS.forEach((L) => {
      const b = document.createElement('button');
      b.className = 'layout-tile';
      b.innerHTML = `${layoutThumb(L.build())}<span>${escapeHtml(L.label)}</span>`;
      b.onclick = () => addFreePage(L.id);
      pl.appendChild(b);
    });
    renderCoverLayouts();

    // Catégories de chants
    const chips = $('#catChips');
    chips.innerHTML = '';
    [{ key: 'all', label: 'Tous' }].concat(CATEGORIES).forEach((c) => {
      const b = document.createElement('button');
      b.className = 'chip' + (catFilter === c.key ? ' on' : '');
      b.textContent = c.key === 'all' ? 'Tous' : c.label.replace(/\s*\(.*\)/, '');
      b.setAttribute('aria-pressed', catFilter === c.key ? 'true' : 'false');
      b.onclick = () => { catFilter = c.key; renderStaticPanesChips(); renderSongList(); };
      chips.appendChild(b);
    });

    // Modèles de texte
    const tp = $('#textPresets');
    tp.innerHTML = '';
    D.TEXT_PRESETS.forEach((p) => {
      const b = document.createElement('button');
      b.className = 'text-preset';
      const st = `font-family:${fontCss(p.font).replace('var(--f-he)', FONT_BY_ID[state.theme.he].css).replace('var(--f-latin)', FONT_BY_ID[state.theme.latin].css).replace(/"/g, "'")};` +
        `font-size:${clamp(p.size * 0.55, 13, 30)}px;font-weight:${p.weight || 400};font-style:${p.italic ? 'italic' : 'normal'};color:${resolveColor(p.color)}`;
      b.innerHTML = `<span class="tp-sample" dir="auto" style="${st}">${escapeHtml(p.text)}</span><small>${escapeHtml(p.label)}</small>`;
      b.onclick = () => addTextPreset(p.id);
      makeDraggable(b, { kind: 'text', id: p.id });
      tp.appendChild(b);
    });

    // Décors
    const og = $('#ornGroups');
    og.innerHTML = '';
    ORN_CATS.forEach(([cat, label]) => {
      const items = ORN.filter((o) => o.cat === cat);
      if (!items.length) return;
      const grp = document.createElement('div');
      grp.className = 'group';
      grp.innerHTML = `<h3>${label}</h3><div class="orn-grid${cat === 'separateurs' ? ' wide' : ''}"></div>`;
      const grid = $('.orn-grid', grp);
      items.forEach((o) => {
        const b = document.createElement('button');
        b.className = 'orn-tile';
        b.title = o.label;
        b.setAttribute('aria-label', o.label);
        b.innerHTML = `<svg viewBox="${o.vb}" preserveAspectRatio="xMidYMid meet">${o.svg}</svg>`;
        b.onclick = () => addOrnament(o.id);
        makeDraggable(b, { kind: 'orn', id: o.id });
        grid.appendChild(b);
      });
      og.appendChild(grp);
    });
    const sg = $('#shapeGrid');
    sg.innerHTML = '';
    D.SHAPES.forEach((s) => {
      const b = document.createElement('button');
      b.className = 'orn-tile shape-tile';
      b.title = s.label;
      const r = s.radius >= 999 ? '50%' : Math.min(s.radius, 10) + 'px';
      const ar = s.w / s.h;
      b.innerHTML = `<span class="shape-sample" style="border-radius:${r};aspect-ratio:${ar > 5 ? 8 : ar};${s.id === 'line' ? 'height:3px;' : ''}${ar > 5 && s.id !== 'line' ? 'width:100%;' : ''}"></span><small>${escapeHtml(s.label)}</small>`;
      b.onclick = () => addShape(s.id);
      makeDraggable(b, { kind: 'shape', id: s.id });
      sg.appendChild(b);
    });

    // Thèmes
    const tg = $('#themeGrid');
    tg.innerHTML = '';
    Object.entries(D.THEMES).forEach(([id, t]) => {
      const b = document.createElement('button');
      b.className = 'theme-tile';
      b.dataset.theme = id;
      const fr = FRAME_BY_ID[t.frame];
      b.innerHTML = `<span class="theme-sw" style="background:${t.paper};color:${t.accent};--gold:${t.gold}">
          ${fr ? `<svg class="theme-frame" viewBox="0 0 640 640">${fr.svg}</svg>` : ''}
          <span class="theme-he" style="font-family:${FONT_BY_ID[t.he].css.replace(/"/g, "'")}">שַׁבָּת</span>
          <span class="theme-lat" style="font-family:${FONT_BY_ID[t.latin].css.replace(/"/g, "'")};color:${t.ink}">Chalom</span>
        </span><span class="theme-name">${escapeHtml(t.label)}</span>`;
      b.onclick = () => applyThemePreset(id);
      tg.appendChild(b);
    });
    markTheme();
  }
  function renderStaticPanesChips() {
    $$('#catChips .chip').forEach((b, i) => {
      const key = i === 0 ? 'all' : CATEGORIES[i - 1].key;
      b.classList.toggle('on', key === catFilter);
      b.setAttribute('aria-pressed', key === catFilter ? 'true' : 'false');
    });
  }
  function markTheme() {
    $$('#themeGrid .theme-tile').forEach((b) => b.classList.toggle('active', b.dataset.theme === state.theme.id));
  }
  function applyThemePreset(id) {
    pushHistory();
    const keep = { size: state.theme.size, lead: state.theme.lead, margin: state.theme.margin, pageNumbers: state.theme.pageNumbers, bgImg: state.theme.bgImg, bgOp: state.theme.bgOp };
    state.theme = Object.assign(freshTheme(id), keep);
    Object.values(state.pageStyles).forEach((p) => { delete p.paper; delete p.texture; delete p.frame; });
    markTheme();
    renderAll(); save();
    renderStaticPanes();
    toast('Thème « ' + D.THEMES[id].label + ' » appliqué');
  }

  // ---------------------------------------------------------- Chants -----
  function renderSongList() {
    const list = $('#songList');
    list.innerHTML = '';
    const q = fold(searchQuery.trim());
    const inBook = new Set(state.blocks.filter((b) => b.type === 'song').map((b) => b.songId));
    CATEGORIES.forEach((cat) => {
      if (catFilter !== 'all' && catFilter !== cat.key) return;
      const songs = SONGS.filter((s) => s.category === cat.key &&
        (!q || [s.title, s.hebrew, s.author].some((f) => fold(f).includes(q))));
      if (!songs.length) return;
      const group = document.createElement('div');
      group.className = 'cat-group';
      group.innerHTML = `<p class="cat-title"><span class="cat-dot" style="background:${CAT_COLORS[cat.key] || '#555'}"></span>${escapeHtml(cat.label)}<span class="cat-count">${songs.length}</span></p>`;
      songs.forEach((s) => {
        const card = document.createElement('div');
        const added = inBook.has(s.id);
        card.className = 'song-card' + (added ? ' in-book' : '');
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ajouter ${s.title} au livret`);
        card.title = s.author || '';
        const listen = s.audio && s.audio.url
          ? `<a class="listen-btn" href="${escapeHtml(s.audio.url)}" target="_blank" rel="noopener" draggable="false" title="Écouter l’air (YouTube)" aria-label="Écouter ${escapeHtml(s.title)}">${svg('play', 14)}</a>` : '';
        card.innerHTML = `<div class="meta">
            <div class="name">${escapeHtml(s.title)}${added ? `<span class="added" title="Déjà dans le livret">${svg('check', 12)}</span>` : ''}</div>
            <div class="heb">${s.hebrew || ''}</div></div>
          <div class="card-actions">${listen}<span class="add-btn" aria-hidden="true">${svg('plus', 16)}</span></div>`;
        card.onclick = (e) => { if (!e.target.closest('.listen-btn')) addSong(s.id); };
        card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addSong(s.id); } };
        makeDraggable(card, { kind: 'song', id: s.id });
        group.appendChild(card);
      });
      list.appendChild(group);
    });
    if (!list.children.length) list.innerHTML = '<p class="no-result">Aucun chant trouvé.</p>';
  }

  // ---------------------------------------------------------- Photos -----
  function renderPhotoGrids() {
    const g = $('#photoGrid');
    g.innerHTML = '';
    if (!photos.length) g.innerHTML = '<p class="hint empty-photos">Aucune photo pour l’instant.</p>';
    photos.slice().reverse().forEach((p) => {
      const t = document.createElement('div');
      t.className = 'photo-tile';
      t.tabIndex = 0;
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', 'Ajouter la photo ' + (p.name || ''));
      t.innerHTML = `<img src="${p.url}" alt="" draggable="false" /><button class="photo-del" title="Supprimer la photo" aria-label="Supprimer la photo">${svg('x', 14)}</button>`;
      t.onclick = (e) => {
        if (e.target.closest('.photo-del')) { deletePhoto(p.id); return; }
        if (sel && sel.kind === 'el') { const el = findEl(sel.key, sel.id); if (el && el.type === 'image') { fillImage(sel.key, sel.id, p.id); if (isMobile()) closePanel(); return; } }
        addPhotoEl(p.id);
      };
      t.onkeydown = (e) => { if (e.key === 'Enter') t.click(); };
      makeDraggable(t, { kind: 'photo', id: p.id });
      g.appendChild(t);
    });
    if (bgPaneOpen()) renderBgPane();
  }

  // ----------------------------------------------------------- Fonds -----
  function bgTargetKey() { return currentKey(); }
  function updateBgScopeHint() {
    const h = $('#bgScopeHint');
    if (!h) return;
    h.textContent = bgScope === 'page'
      ? 'Modifie seulement ' + (currentPage === 0 ? 'la couverture' : 'la page ' + currentPage) + '.'
      : 'S’applique à toutes les pages du livret.';
  }
  function setBg(prop, value) {
    pushHistory(bgScope + ':' + prop);
    if (bgScope === 'all') {
      state.theme[prop] = value;
      Object.values(state.pageStyles).forEach((p) => { delete p[prop]; });
    } else {
      const k = bgTargetKey();
      const ps = state.pageStyles[k] || (state.pageStyles[k] = {});
      ps[prop] = value;
    }
    save(); renderBook(); scheduleThumbs(); renderBgPane();
    if (prop === 'paper') renderInspector();
  }
  function renderBgPane() {
    $$('#bgScope button').forEach((b) => b.classList.toggle('on', b.dataset.scope === bgScope));
    updateBgScopeHint();
    const cur = bgScope === 'all' ? state.theme : pageStyle(bgTargetKey());
    const sw = $('#bgSwatches');
    sw.innerHTML = '';
    D.PAPER_SWATCHES.forEach((c) => {
      const b = document.createElement('button');
      b.className = 'swatch' + (String(cur.paper).toLowerCase() === c ? ' on' : '');
      b.style.background = c; b.title = c; b.setAttribute('aria-label', 'Papier ' + c);
      b.onclick = () => setBg('paper', c);
      sw.appendChild(b);
    });
    const custom = document.createElement('label');
    custom.className = 'swatch swatch-custom';
    custom.title = 'Autre couleur';
    custom.innerHTML = `${svg('plus', 14)}<input type="color" value="${/^#[0-9a-f]{6}$/i.test(cur.paper) ? cur.paper : '#ffffff'}" aria-label="Autre couleur de papier" />`;
    $('input', custom).oninput = (e) => setBg('paper', e.target.value);
    sw.appendChild(custom);

    const tg = $('#textureGrid');
    tg.innerHTML = '';
    D.TEXTURES.forEach((t) => {
      const css = texCss(t);
      const b = document.createElement('button');
      b.className = 'tex-tile' + (cur.texture === t.id ? ' on' : '');
      b.innerHTML = `<span class="tex-sample" style="background-color:${cur.paper};background-image:${css.image};background-size:${css.size}"></span><small>${t.label}</small>`;
      b.onclick = () => setBg('texture', t.id);
      tg.appendChild(b);
    });

    const fg = $('#frameGrid');
    fg.innerHTML = '';
    [{ id: 'none', label: 'Aucun', svg: '' }].concat(FRAMES).forEach((f) => {
      const b = document.createElement('button');
      b.className = 'frame-tile' + ((cur.frame || 'none') === f.id ? ' on' : '');
      b.innerHTML = `<span class="frame-sample" style="background:${cur.paper};color:${state.theme.accent};--gold:${state.theme.gold}">${f.svg ? `<svg viewBox="0 0 640 640">${f.svg}</svg>` : ''}</span><small>${f.label}</small>`;
      b.onclick = () => setBg('frame', f.id);
      fg.appendChild(b);
    });

    const pg = $('#bgPhotoGrid');
    pg.innerHTML = '';
    if (!photos.length) pg.innerHTML = '<p class="hint">Ajoutez d’abord des photos dans l’onglet « Photos ».</p>';
    photos.slice().reverse().forEach((p) => {
      const b = document.createElement('button');
      b.className = 'photo-tile sm' + (cur.bgImg === p.id ? ' on' : '');
      b.innerHTML = `<img src="${p.url}" alt="" />`;
      b.onclick = () => setBg('bgImg', p.id);
      pg.appendChild(b);
    });
    $('#bgOp').value = cur.bgOp;
    $('#bgOpOut').textContent = Math.round(cur.bgOp * 100) + ' %';
    $('#bgPhotoClear').disabled = !cur.bgImg;
  }

  // ----------------------------------------------------------- Style -----
  function renderStylePane() {
    markTheme();
    const t = state.theme, f = $('#styleForm');
    f.innerHTML = '<h3>Réglages du thème</h3>';
    const set = (k, v, tag) => { pushHistory('theme:' + (tag || k)); state.theme[k] = v; save(); renderBook(); scheduleThumbs(); };
    f.appendChild(selectField('Police hébraïque (chants)', D.FONTS.filter((x) => x.he === 'body').map((x) => [x.id, x.label]), t.he, (v) => { set('he', v); renderStaticPanes(); }, true));
    f.appendChild(selectField('Police latine (titres, phonétique)', D.FONTS.map((x) => [x.id, x.label]), t.latin, (v) => { set('latin', v); renderStaticPanes(); }, true));
    const colors = document.createElement('div');
    colors.className = 'color-quad';
    [['paper', 'Papier'], ['ink', 'Texte'], ['accent', 'Titres'], ['gold', 'Ornements']].forEach(([k, label]) => {
      const l = document.createElement('label');
      l.className = 'color-pick';
      l.innerHTML = `<input type="color" value="${t[k]}" /><span>${label}</span>`;
      $('input', l).oninput = (e) => { set(k, e.target.value); if (k === 'paper') Object.values(state.pageStyles).forEach((p) => delete p.paper); };
      $('input', l).onchange = () => { renderStaticPanes(); };
      colors.appendChild(l);
    });
    f.appendChild(fieldWrap('Couleurs', colors));
    f.appendChild(rangeField('Taille du texte', t.size, 0.8, 1.3, 0.02, (v) => Math.round(v * 100) + ' %', (v) => set('size', v)));
    f.appendChild(rangeField('Interligne', t.lead, 0.85, 1.35, 0.01, (v) => Math.round(v * 100) + ' %', (v) => set('lead', v)));
    f.appendChild(segField('Marges', [['etroite', 'Étroites'], ['normale', 'Normales'], ['large', 'Larges']], t.margin, (v) => set('margin', v)));
    f.appendChild(segField('Titres des chants', TITLE_STYLES, t.titleStyle, (v) => set('titleStyle', v)));
    f.appendChild(segField('Sous le titre', SEPS, t.sep, (v) => set('sep', v)));
    f.appendChild(toggleField('Numéros de page', !!t.pageNumbers, (v) => set('pageNumbers', v)));
  }

  // ======================================================= Formulaires =====
  function fieldWrap(label, control, cls) {
    const w = document.createElement('div');
    w.className = 'ifield' + (cls ? ' ' + cls : '');
    if (label) w.innerHTML = `<span class="ilabel">${escapeHtml(label)}</span>`;
    w.appendChild(control);
    return w;
  }
  function rangeField(label, value, min, max, step, fmt, onInput) {
    const w = document.createElement('label');
    w.className = 'ifield range-field';
    w.innerHTML = `<span class="ilabel">${escapeHtml(label)} <output>${fmt(value)}</output></span>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" />`;
    const inp = $('input', w), out = $('output', w);
    inp.oninput = () => { const v = +inp.value; out.textContent = fmt(v); onInput(v); };
    return w;
  }
  function segField(label, opts, value, onChange) {
    const s = document.createElement('div');
    s.className = 'seg seg-wide';
    s.setAttribute('role', 'group');
    opts.forEach(([v, l, ic]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = String(value) === String(v) ? 'on' : '';
      b.setAttribute('aria-pressed', String(value) === String(v) ? 'true' : 'false');
      b.innerHTML = ic ? svg(ic, 16) : escapeHtml(l);
      if (ic) { b.title = l; b.setAttribute('aria-label', l); }
      b.onclick = () => { $$('button', s).forEach((x) => { x.className = ''; x.setAttribute('aria-pressed', 'false'); }); b.className = 'on'; b.setAttribute('aria-pressed', 'true'); onChange(v); };
      s.appendChild(b);
    });
    return fieldWrap(label, s);
  }
  function selectField(label, opts, value, onChange, fontPreview) {
    const s = document.createElement('select');
    s.className = 'iselect';
    opts.forEach((o) => {
      if (o.group) { const g = document.createElement('optgroup'); g.label = o.group; o.items.forEach(([v, l]) => g.appendChild(new Option(l, v, false, v === value))); s.appendChild(g); return; }
      s.appendChild(new Option(o[1], o[0], false, o[0] === value));
    });
    s.value = value;
    if (fontPreview) {
      const upd = () => { const f = FONT_BY_ID[s.value]; s.style.fontFamily = f ? f.css : ''; };
      upd(); s.addEventListener('change', upd);
    }
    s.onchange = () => onChange(s.value);
    return fieldWrap(label, s);
  }
  function toggleField(label, on, onChange) {
    const w = document.createElement('label');
    w.className = 'ifield toggle-field';
    w.innerHTML = `<span class="ilabel">${escapeHtml(label)}</span><span class="switch"><input type="checkbox" ${on ? 'checked' : ''} /><span></span></span>`;
    $('input', w).onchange = (e) => onChange(e.target.checked);
    return w;
  }
  function colorField(label, value, onChange, tokens) {
    const box = document.createElement('div');
    box.className = 'swatches swatches-sm';
    const opts = (tokens || ['accent', 'ink', 'gold']).map((t) => [t, resolveColor(t), { accent: 'Couleur des titres', ink: 'Couleur du texte', gold: 'Couleur des ornements', paper: 'Couleur du papier' }[t]])
      .concat(D.ACCENT_SWATCHES.map((c) => [c, c, c]));
    const seen = new Set();
    opts.forEach(([v, c, title]) => {
      if (seen.has(v)) return; seen.add(v);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch' + (String(value).toLowerCase() === String(v).toLowerCase() ? ' on' : '') + (/^[a-z]+$/.test(v) ? ' token' : '');
      b.style.background = c; b.title = title; b.setAttribute('aria-label', title);
      b.onclick = () => { $$('.swatch', box).forEach((x) => x.classList.remove('on')); b.classList.add('on'); onChange(v); };
      box.appendChild(b);
    });
    const custom = document.createElement('label');
    custom.className = 'swatch swatch-custom';
    custom.title = 'Autre couleur';
    const cur = resolveColor(value);
    custom.innerHTML = `${svg('plus', 13)}<input type="color" value="${/^#[0-9a-f]{6}$/i.test(cur) ? cur : '#7b1e3b'}" aria-label="Autre couleur" />`;
    $('input', custom).oninput = (e) => onChange(e.target.value);
    box.appendChild(custom);
    return fieldWrap(label, box);
  }
  function actionRow(actions) {
    const r = document.createElement('div');
    r.className = 'act-row';
    actions.forEach(([ic, label, fn, cls]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'act' + (cls ? ' ' + cls : '');
      b.title = label; b.setAttribute('aria-label', label);
      b.innerHTML = `${svg(ic, 17)}<span>${escapeHtml(label)}</span>`;
      b.onclick = fn;
      r.appendChild(b);
    });
    return r;
  }
  function fontOptions() {
    const groups = [
      { group: 'Polices du thème', items: [['he', 'Hébreu du thème (' + FONT_BY_ID[state.theme.he].label + ')'], ['latin', 'Latine du thème (' + FONT_BY_ID[state.theme.latin].label + ')']] },
      { group: 'Hébreu vocalisé', items: D.FONTS.filter((f) => f.he === 'body').map((f) => [f.id, f.label]) },
      { group: 'Titres hébreu', items: D.FONTS.filter((f) => f.he === 'title').map((f) => [f.id, f.label]) },
      { group: 'Latin', items: D.FONTS.filter((f) => !f.he).map((f) => [f.id, f.label]) },
    ];
    return groups;
  }

  // ========================================================= Inspecteur ====
  function renderInspector() {
    const insp = $('#inspector'), body = $('#inspBody');
    let show = !!sel;
    if (sel && sel.kind === 'page' && isMobile()) show = false;
    insp.hidden = !show;
    document.body.classList.toggle('insp-open', show);
    if (!show) { body.innerHTML = ''; return; }
    const scroll = body.scrollTop;
    body.innerHTML = '';
    if (sel.kind === 'el') inspectEl(body);
    else if (sel.kind === 'block') inspectBlock(body);
    else inspectPage(body);
    body.scrollTop = scroll;
  }
  function inspectEl(body) {
    const { key, id } = sel;
    const el = findEl(key, id);
    if (!el) { sel = null; renderInspector(); return; }
    const up = (patch, tag) => updateEl(key, id, patch, tag);
    const titles = { text: 'Texte', image: 'Photo', orn: (ORN_BY_ID[el.orn] || {}).label || 'Décor', shape: 'Forme' };
    $('#inspTitle').textContent = titles[el.type];

    if (el.type === 'text') {
      const ta = document.createElement('textarea');
      ta.className = 'itext'; ta.rows = 3; ta.dir = 'auto'; ta.value = el.text || '';
      ta.oninput = () => { pushHistory(id + ':text'); el.text = ta.value; syncCoverRoles(el); save(); refreshEl(key, id); };
      body.appendChild(fieldWrap(el.role === 'title' ? 'Titre du livret' : el.role === 'subtitle' ? 'Sous-titre' : 'Contenu', ta));
      body.appendChild(selectField('Police', fontOptions(), el.font, (v) => up({ font: v }), false));
      const sf = $('select', body.lastChild);
      const pv = () => { sf.style.fontFamily = fontCss(sf.value).replace('var(--f-he)', FONT_BY_ID[state.theme.he].css).replace('var(--f-latin)', FONT_BY_ID[state.theme.latin].css); };
      pv(); sf.addEventListener('change', pv);
      body.appendChild(rangeField('Taille', el.size, 6, 200, 1, (v) => Math.round(v) + ' px', (v) => up({ size: v }, 'size')));
      body.appendChild(colorField('Couleur', el.color, (v) => up({ color: v }, 'color')));
      const fmt = document.createElement('div');
      fmt.className = 'fmt-row';
      const tg = (ic, label, on, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'tbtn' + (on ? ' on' : ''); b.innerHTML = svg(ic, 16); b.title = label; b.setAttribute('aria-label', label); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.onclick = fn; return b; };
      fmt.appendChild(tg('bold', 'Gras', (el.weight || 400) >= 600, () => up({ weight: (el.weight || 400) >= 600 ? 400 : 700 })));
      fmt.appendChild(tg('italic', 'Italique', !!el.italic, () => up({ italic: !el.italic })));
      fmt.appendChild(document.createElement('i'));
      [['left', 'align-left', 'Aligner à gauche'], ['center', 'align-center', 'Centrer'], ['right', 'align-right', 'Aligner à droite'], ['justify', 'align-justify', 'Justifier']]
        .forEach(([v, ic, l]) => fmt.appendChild(tg(ic, l, (el.align || 'center') === v, () => up({ align: v }))));
      body.appendChild(fieldWrap('Mise en forme', fmt));
      body.appendChild(rangeField('Interligne', el.lead || 1.25, 0.8, 2.4, 0.05, (v) => v.toFixed(2), (v) => up({ lead: v }, 'lead')));
      body.appendChild(rangeField('Espacement des lettres', el.ls || 0, -2, 12, 0.5, (v) => v + ' px', (v) => up({ ls: v }, 'ls')));
    }

    if (el.type === 'image') {
      body.appendChild(actionRow([
        ['image', el.src ? 'Changer de photo' : 'Choisir une photo', () => { openTab('photos'); toast('Cliquez une photo pour la placer dans ce cadre.'); }],
        ['maximize', 'Pleine page', () => up({ x: 0, y: 0, w: LOGICAL, h: LOGICAL, rot: 0 })],
      ]));
      body.appendChild(segField('Forme', [['rect', 'Rectangle'], ['circle', 'Rond'], ['arch', 'Arche']], el.shape || 'rect', (v) => up({ shape: v })));
      if (el.shape !== 'circle') body.appendChild(rangeField('Coins arrondis', el.radius || 0, 0, 120, 1, (v) => Math.round(v) + ' px', (v) => up({ radius: v }, 'radius')));
      body.appendChild(segField('Remplissage', [['cover', 'Remplir'], ['contain', 'Entière']], el.fit || 'cover', (v) => up({ fit: v })));
      if (el.src) {
        body.appendChild(rangeField('Zoom dans la photo', el.zoom || 1, 1, 3, 0.05, (v) => Math.round(v * 100) + ' %', (v) => up({ zoom: v }, 'zoom')));
        body.appendChild(rangeField('Cadrage horizontal', el.px, 0, 100, 1, (v) => Math.round(v) + ' %', (v) => up({ px: v }, 'px')));
        body.appendChild(rangeField('Cadrage vertical', el.py, 0, 100, 1, (v) => Math.round(v) + ' %', (v) => up({ py: v }, 'py')));
        body.appendChild(segField('Filtre', FILTERS, el.filter || 'none', (v) => up({ filter: v })));
      }
      body.appendChild(rangeField('Bordure', el.border || 0, 0, 24, 1, (v) => v + ' px', (v) => up({ border: v }, 'border')));
      if (el.border) body.appendChild(colorField('Couleur de la bordure', el.borderColor || 'gold', (v) => up({ borderColor: v }, 'bc'), ['gold', 'accent', 'ink', 'paper']));
    }

    if (el.type === 'orn') {
      body.appendChild(colorField('Couleur principale', el.color, (v) => up({ color: v }, 'color')));
      body.appendChild(colorField('Couleur secondaire', el.color2 || 'gold', (v) => up({ color2: v }, 'color2'), ['gold', 'accent', 'ink']));
      const o = ORN_BY_ID[el.orn];
      if (o && o.cat === 'coins') body.appendChild(actionRow([['frame', 'Placer dans les 4 coins', () => cornersEl(key, id)]]));
    }

    if (el.type === 'shape') {
      body.appendChild(colorField('Couleur', el.fill, (v) => up({ fill: v }, 'fill'), ['accent', 'gold', 'ink', 'paper']));
      body.appendChild(rangeField('Coins arrondis', Math.min(el.radius || 0, 200), 0, 200, 1, (v) => v >= 200 ? 'Rond' : Math.round(v) + ' px', (v) => up({ radius: v >= 200 ? 999 : v }, 'radius')));
      body.appendChild(rangeField('Contour', el.border || 0, 0, 16, 1, (v) => v + ' px', (v) => up({ border: v }, 'border')));
      if (el.border) body.appendChild(colorField('Couleur du contour', el.borderColor || 'gold', (v) => up({ borderColor: v }, 'bc'), ['gold', 'accent', 'ink', 'paper']));
    }

    // Commun : opacité, rotation, miroir, position, plans, verrou
    body.appendChild(rangeField('Opacité', el.op == null ? 1 : el.op, 0.05, 1, 0.05, (v) => Math.round(v * 100) + ' %', (v) => up({ op: v }, 'op')));
    body.appendChild(rangeField('Rotation', el.rot || 0, -180, 180, 1, (v) => Math.round(v) + '°', (v) => up({ rot: v }, 'rot')));
    if (el.type === 'image' || el.type === 'orn') {
      const flips = [['flip-h', 'Miroir horizontal', () => up({ flipH: !el.flipH })]];
      if (el.type === 'orn') flips.push(['flip-v', 'Miroir vertical', () => up({ flipV: !el.flipV })]);
      body.appendChild(fieldWrap('Retourner', actionRow(flips)));
    }
    const h = el.type === 'text' ? ($(`#book .el[data-id="${id}"]`) || {}).offsetHeight || 40 : el.h;
    body.appendChild(fieldWrap('Position sur la page', actionRow([
      ['pos-left', 'À gauche', () => up({ x: Math.round(pageStyleMarginX()) })],
      ['pos-center', 'Centrer', () => up({ x: Math.round((LOGICAL - el.w) / 2) })],
      ['pos-right', 'À droite', () => up({ x: Math.round(LOGICAL - pageStyleMarginX() - el.w) })],
      ['move', 'Milieu de la page', () => up({ x: Math.round((LOGICAL - el.w) / 2), y: Math.round((LOGICAL - h) / 2) })],
    ]), 'pos'));
    body.appendChild(fieldWrap('Plans', actionRow([
      ['front', 'Premier plan', () => orderEl(key, id, 'front')],
      ['back', 'Arrière-plan', () => orderEl(key, id, 'back')],
    ])));
    body.appendChild(toggleField('Derrière le texte des chants', !!el.back, (v) => up({ back: v })));
    body.appendChild(toggleField('Verrouiller', !!el.lock, (v) => up({ lock: v })));
    body.appendChild(actionRow([
      ['copy', 'Dupliquer', () => duplicateEl(key, id)],
      ['trash', 'Supprimer', () => removeEl(key, id), 'danger'],
    ]));
    body.insertAdjacentHTML('beforeend', '<p class="hint kbd-hint">Glisser pour déplacer · poignées pour agrandir · Maj = proportions libres · Alt = sans aimantation · Suppr pour effacer</p>');
  }
  function pageStyleMarginX() { const m = MARGINS[state.theme.margin] || MARGINS.normale; return m[1]; }

  function inspectBlock(body) {
    const b = blockByUid(sel.uid);
    if (!b) { sel = null; renderInspector(); return; }
    const set = (patch, tag) => { pushHistory(tag ? b.uid + ':' + tag : null); Object.assign(b, patch); save(); renderBook(); scheduleThumbs(); renderSongList(); };
    const idx = state.blocks.indexOf(b);
    if (b.type === 'song') {
      const s = songById(b.songId) || {};
      $('#inspTitle').textContent = 'Chant';
      body.insertAdjacentHTML('beforeend', `<div class="insp-song"><span class="insp-he">${s.hebrew || ''}</span><strong>${escapeHtml(s.title || '')}</strong>${s.author ? `<small>${escapeHtml(s.author)}</small>` : ''}</div>`);
      body.appendChild(rangeField('Taille du texte', b.size || 1, 0.7, 1.5, 0.02, (v) => Math.round(v * 100) + ' %', (v) => set({ size: v }, 'size')));
      body.appendChild(segField('Disposition des vers', [['auto', 'Auto'], ['1', '1 colonne'], ['2', '2 colonnes']], b.cols || 'auto', (v) => set({ cols: v })));
      body.appendChild(segField('Titre', [['', 'Thème']].concat(TITLE_STYLES), b.titleStyle || '', (v) => set({ titleStyle: v || undefined })));
      body.appendChild(segField('Phonétique', [['', 'Livret'], ['on', 'Oui'], ['off', 'Non']], b.phon || '', (v) => set({ phon: v || undefined })));
      body.appendChild(segField('Traduction', [['', 'Livret'], ['on', 'Oui'], ['off', 'Non']], b.trans || '', (v) => set({ trans: v || undefined })));
      body.appendChild(toggleField('Afficher l’auteur', b.showAuthor !== false, (v) => set({ showAuthor: v })));
      body.appendChild(toggleField('Commencer sur une nouvelle page', !!b.newPage, (v) => set({ newPage: v })));
      if (s.audio && s.audio.url) body.insertAdjacentHTML('beforeend', `<a class="listen-link" href="${escapeHtml(s.audio.url)}" target="_blank" rel="noopener">${svg('play', 14)} Écouter l’air</a>`);
    } else if (b.type === 'text') {
      $('#inspTitle').textContent = 'Paragraphe';
      const ti = document.createElement('input'); ti.className = 'iinput'; ti.value = b.title || ''; ti.placeholder = 'Titre (facultatif)';
      ti.oninput = () => set({ title: ti.value }, 'title');
      body.appendChild(fieldWrap('Titre', ti));
      const ta = document.createElement('textarea'); ta.className = 'itext'; ta.rows = 6; ta.dir = 'auto'; ta.value = b.body || '';
      ta.oninput = () => set({ body: ta.value }, 'body');
      body.appendChild(fieldWrap('Texte', ta));
      body.appendChild(rangeField('Taille du texte', b.size || 1, 0.7, 1.6, 0.02, (v) => Math.round(v * 100) + ' %', (v) => set({ size: v }, 'size')));
      body.appendChild(segField('Alignement', [['left', 'Gauche', 'align-left'], ['center', 'Centre', 'align-center'], ['right', 'Droite', 'align-right'], ['justify', 'Justifié', 'align-justify']], b.align || 'left', (v) => set({ align: v })));
    } else {
      $('#inspTitle').textContent = 'Image';
      const ci = document.createElement('input'); ci.className = 'iinput'; ci.value = b.caption || '';
      ci.oninput = () => set({ caption: ci.value }, 'cap');
      body.appendChild(fieldWrap('Légende', ci));
    }
    body.appendChild(fieldWrap('Place dans le livret', actionRow([
      ['chevron-up', 'Monter', () => shiftBlock(b.uid, -1)],
      ['chevron-down', 'Descendre', () => shiftBlock(b.uid, 1)],
    ])));
    $$('.act', body.lastChild).forEach((x, i) => { x.disabled = i === 0 ? idx <= 0 : idx >= state.blocks.length - 1; });
    body.appendChild(actionRow([['trash', 'Retirer du livret', () => removeBlock(b.uid), 'danger']]));
    body.insertAdjacentHTML('beforeend', '<p class="hint kbd-hint">Astuce : glissez n’importe quelle ligne du chant pour le déplacer dans le livret.</p>');
  }
  function inspectPage(body) {
    const key = sel.key;
    const p = pageForKey(key);
    if (!p) { sel = null; renderInspector(); return; }
    const n = pageEls().indexOf(p);
    $('#inspTitle').textContent = n === 0 ? 'Couverture' : 'Page ' + n;
    body.appendChild(actionRow([
      ['palette', 'Fond et cadre', () => { bgScope = 'page'; openTab('fonds'); }],
      ['type', 'Ajouter un texte', () => addTextPreset('titre', key)],
      ['image', 'Ajouter une photo', () => openTab('photos')],
      ['sparkles', 'Ajouter un décor', () => openTab('decors')],
    ]));
    if (p.classList.contains('page-free')) {
      const uid = key, idx = state.blocks.findIndex((b) => b.uid === uid);
      body.appendChild(fieldWrap('Page libre', actionRow([
        ['chevron-left', 'Avancer', () => shiftBlock(uid, -1)],
        ['chevron-right', 'Reculer', () => shiftBlock(uid, 1)],
        ['copy', 'Dupliquer', () => duplicatePage(uid)],
      ])));
      $$('.act', body.lastChild).forEach((x, i) => { if (i === 0) x.disabled = idx <= 0; if (i === 1) x.disabled = idx >= state.blocks.length - 1; });
      body.appendChild(actionRow([['trash', 'Supprimer la page', () => removeBlock(uid), 'danger']]));
    } else if (key !== 'cover') {
      body.appendChild(actionRow([['page-plus', 'Insérer une page libre après', () => addFreePage('vide')]]));
    }
    if ((state.overlays[key] || []).length) body.insertAdjacentHTML('beforeend', `<p class="hint">${state.overlays[key].length} élément(s) libre(s) sur cette page.</p>`);
  }

  // ======================================================= Contrôles =======
  function syncControls() {
    $('#docName').value = state.name || '';
    $('#coverTitle').value = state.cover.title || '';
    $('#coverSubtitle').value = state.cover.subtitle || '';
    $$('#optToggles button[data-opt]').forEach((b) => {
      const on = !!state[b.dataset.opt];
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    syncUndo();
  }
  function setCoverField(role, value) {
    pushHistory('cover:' + role);
    state.cover[role] = value;
    elsOf('cover').forEach((e) => { if (e.role === role) { e.text = value; refreshEl('cover', e.id); } });
    save();
  }
  function initControls() {
    $('#docName').oninput = (e) => { state.name = e.target.value; save(); };
    $('#coverTitle').oninput = (e) => setCoverField('title', e.target.value);
    $('#coverSubtitle').oninput = (e) => setCoverField('subtitle', e.target.value);
    $('#coverTitle').onfocus = $('#coverSubtitle').onfocus = () => goToKey('cover');

    $('#optToggles').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-opt]');
      if (!b) return;
      pushHistory();
      state[b.dataset.opt] = !state[b.dataset.opt];
      syncControls(); renderBook(); scheduleThumbs(); save();
    });

    $('#rail').addEventListener('click', (e) => {
      const b = e.target.closest('.rail-btn');
      if (!b) return;
      if (ui.panel && ui.tab === b.dataset.tab && !document.body.classList.contains('panel-closed')) closePanel();
      else openTab(b.dataset.tab);
    });
    $('#panelClose').onclick = closePanel;
    $('#inspClose').onclick = () => select(null);

    $('#songSearch').oninput = (e) => { searchQuery = e.target.value; renderSongList(); };
    $('#imageInput').onchange = async (e) => {
      const files = e.target.files; const added = await addPhotoFiles(files); e.target.value = '';
      if (added.length === 1) {
        if (sel && sel.kind === 'el') { const el = findEl(sel.key, sel.id); if (el && el.type === 'image') { fillImage(sel.key, sel.id, added[0].id); return; } }
        addPhotoEl(added[0].id);
      }
    };
    const dz = $('#dropzone');
    dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('over'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('over'));
    dz.addEventListener('drop', (e) => { e.preventDefault(); dz.classList.remove('over'); addPhotoFiles(e.dataTransfer.files); });

    // Fonds
    $('#bgScope').addEventListener('click', (e) => { const b = e.target.closest('button[data-scope]'); if (!b) return; bgScope = b.dataset.scope; renderBgPane(); });
    $('#bgOp').oninput = (e) => { $('#bgOpOut').textContent = Math.round(e.target.value * 100) + ' %'; setBg('bgOp', +e.target.value); };
    $('#bgPhotoClear').onclick = () => setBg('bgImg', null);

    // Paragraphe dans le fil
    $('#addFlowText').onclick = () => { $('#textModalTitle').value = ''; $('#textModalBody').value = ''; $('#textModal').hidden = false; $('#textModalTitle').focus(); };
    $('#textModalCancel').onclick = () => { $('#textModal').hidden = true; };
    $('#textModal').addEventListener('click', (e) => { if (e.target.id === 'textModal') $('#textModal').hidden = true; });
    $('#textModalSave').onclick = () => {
      const title = $('#textModalTitle').value.trim(), body = $('#textModalBody').value.trim();
      $('#textModal').hidden = true;
      if (!title && !body) return;
      const i = insertIndexAfterCurrent();
      insertBlock({ uid: newId('b'), type: 'text', title, body }, state.blocks[i] ? state.blocks[i].uid : null);
      if (isMobile()) closePanel();
    };

    $('#clearBtn').onclick = async () => {
      if (!state.blocks.length) return;
      if (!(await confirmBox('Vider le livret ? Les chants, paragraphes et pages libres seront retirés (la couverture est conservée).', 'Vider'))) return;
      pushHistory();
      state.blocks = [];
      Object.keys(state.overlays).forEach((k) => { if (k !== 'cover') delete state.overlays[k]; });
      Object.keys(state.pageStyles).forEach((k) => { if (k !== 'cover') delete state.pageStyles[k]; });
      sel = null; currentPage = 0;
      renderAll(); save();
    };

    // Navigation et zoom
    $('#prevPage').onclick = () => { toggleOverview(false); gotoPage(currentPage - 1); };
    $('#nextPage').onclick = () => { toggleOverview(false); gotoPage(currentPage + 1); };
    $('#zoomIn').onclick = () => setZoom((state.zoom || 0.94) * 1.2);
    $('#zoomOut').onclick = () => setZoom((state.zoom || 0.94) / 1.2);
    $('#zoomFit').onclick = () => setZoom(0.94);
    $('#overviewBtn').onclick = () => toggleOverview();

    const reader = $('#reader'), book = $('#book');
    let st;
    reader.addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(syncCurrentFromScroll, 90); });
    reader.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      setZoom((state.zoom || 0.94) * (e.deltaY < 0 ? 1.1 : 1 / 1.1));
    }, { passive: false });
    book.addEventListener('pointerdown', onPointerDown);
    book.addEventListener('dblclick', (e) => {
      const n = e.target.closest('.el-text');
      if (n) { e.preventDefault(); startTextEdit(n.dataset.k, n.dataset.id); return; }
      const im = e.target.closest('.el-image.empty');
      if (im) openTab('photos');
    });
    book.addEventListener('click', (e) => {
      const ghost = e.target.closest('[data-open]');
      if (ghost) { openTab(ghost.dataset.open); return; }
      const page = e.target.closest('.page');
      if (isOverview()) {
        if (!page) return;
        const idx = pageEls().indexOf(page);
        toggleOverview(false);
        setTimeout(() => gotoPage(idx), 30);
        return;
      }
      if (suppressClick || e.target.closest('.el')) { suppressClick = false; return; }
      const it = e.target.closest('.flow-item');
      if (it) {
        const idx = pageEls().indexOf(page);
        if (idx >= 0 && idx !== currentPage) gotoPage(idx);
        select({ kind: 'block', uid: it.dataset.uid });
        return;
      }
      if (page && !page.classList.contains('page-ghost')) {
        const idx = pageEls().indexOf(page);
        if (idx !== currentPage) gotoPage(idx);
        select(isMobile() ? null : { kind: 'page', key: page.dataset.key });
        if (bgPaneOpen()) renderBgPane();
        return;
      }
      if (e.target === reader || e.target === book) select(null);
    });
    reader.addEventListener('click', (e) => { if (e.target === reader) select(null); });

    // Clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#textModal').hidden) { $('#textModal').hidden = true; return; }
        if (!$('#confirmModal').hidden) { $('#confirmNo').click(); return; }
        if (document.body.classList.contains('preview-mode')) { togglePreview(false); return; }
        if (sel) { select(null); return; }
        if (isMobile() && ui.panel) closePanel();
        return;
      }
      const t = e.target;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || '') || t.isContentEditable;
      if (typing || !$('#textModal').hidden || !$('#confirmModal').hidden) return;
      const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
      if (mod && k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (mod && (k === 'y' || (k === 'z' && e.shiftKey))) { e.preventDefault(); redo(); return; }
      if (mod && k === 'p') { e.preventDefault(); exportPdf(); return; }
      if (sel && sel.kind === 'el') {
        const el = findEl(sel.key, sel.id);
        if (!el) return;
        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); removeEl(sel.key, sel.id); return; }
        if (mod && k === 'd') { e.preventDefault(); duplicateEl(sel.key, sel.id); return; }
        if (e.key === 'Enter' && el.type === 'text') { e.preventDefault(); startTextEdit(sel.key, sel.id); return; }
        const step = e.shiftKey ? 10 : 1;
        const mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
        if (mv && !el.lock) { e.preventDefault(); updateEl(sel.key, sel.id, { x: el.x + mv[0], y: el.y + mv[1] }, 'nudge'); return; }
      }
      if (sel && sel.kind === 'block' && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); removeBlock(sel.uid); return; }
      if (t.closest && t.closest('.song-card, .panel, .inspector')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); toggleOverview(false); gotoPage(currentPage + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); toggleOverview(false); gotoPage(currentPage - 1); }
    });

    $('#undoBtn').onclick = undo;
    $('#redoBtn').onclick = redo;
    $('#exportBtn').onclick = exportPdf;
    $('#previewToggle').onclick = () => togglePreview();
    window.addEventListener('beforeprint', () => { if (editing) editing.blur(); toggleOverview(false); document.body.classList.add('printing'); });
    window.addEventListener('afterprint', () => { document.body.classList.remove('printing'); });

    // Feuille du bas (mobile) : glisser la poignée vers le bas pour fermer.
    $$('.sheet-grab').forEach((g) => {
      let y0 = null;
      g.addEventListener('pointerdown', (e) => { y0 = e.clientY; g.setPointerCapture(e.pointerId); });
      g.addEventListener('pointerup', (e) => {
        if (y0 != null && e.clientY - y0 > 40) { if (g.closest('#inspector')) select(null); else closePanel(); }
        y0 = null;
      });
      g.addEventListener('click', () => { if (g.closest('#inspector')) select(null); else closePanel(); });
    });
  }
  function togglePreview(force) {
    const on = force !== undefined ? force : !document.body.classList.contains('preview-mode');
    document.body.classList.toggle('preview-mode', on);
    $('#previewToggle').setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) select(null);
    setTimeout(() => { applyZoom(); gotoPage(currentPage); }, 60);
  }
  function exportPdf() {
    if (editing) editing.blur();
    select(null);
    toggleOverview(false);
    const empties = $$('#book .el-image.empty').length;
    toast(empties ? 'Les cadres photo vides ne seront pas imprimés. Choisissez « Enregistrer au format PDF ».'
      : 'Choisissez « Enregistrer au format PDF » comme imprimante.');
    setTimeout(() => window.print(), 450);
  }

  // ======================================================== Démarrage ======
  async function start() {
    if (window.hydrateIcons) window.hydrateIcons();
    $('#bookFonts').href = D.FONT_URL;
    await loadPhotos();
    syncControls();
    renderStaticPanes();
    renderSongList();
    renderPhotoGrids();
    initControls();
    initDnD();
    renderBook();
    if (ui.panel && !isMobile()) openTab(ui.tab || 'modeles');
    else { closePanel(); $$('#panel .pane').forEach((p) => { p.hidden = p.dataset.pane !== (ui.tab || 'modeles'); }); }
    renderInspector();
    scheduleThumbs();
    // La pagination dépend des polices : on la refait quand elles arrivent.
    let fontTimer;
    const refont = () => { clearTimeout(fontTimer); fontTimer = setTimeout(() => { if (!gesture && !editing) { renderBook(); scheduleThumbs(); } }, 120); };
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(refont);
      document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', refont);
    }
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        if (isOverview()) return;
        const before = curZ;
        applyZoom();
        if (curZ !== before) gotoPage(currentPage);
      }).observe($('#reader'));
    } else {
      window.addEventListener('resize', () => { applyZoom(); gotoPage(currentPage); });
    }
    window.matchMedia('(max-width: 767px)').addEventListener('change', () => { renderInspector(); scheduleThumbs(); });
  }
  start();
})();
