// ============================================================================
//  Birkonishi — logique de l'éditeur de livret
// ============================================================================
(function () {
  'use strict';

  const STORAGE_KEY = 'bikonim.project.v1';     // clé conservée : garde les livrets existants

  // -------------------------------------------------------------- État ------
  const DEFAULT_STATE = {
    template: 'royal',
    cover: { title: 'Mon Birkon', subtitle: 'Chants du Chabbat' },
    phonetic: true,               // afficher la translittération (phonétique)
    translation: false,           // afficher la traduction française
    zoom: 0.92,                   // fraction de la taille « ajustée » (0.3–1)
    blocks: [],                   // { uid, type:'song'|'text'|'image', ... }
  };
  // Fusionne avec les valeurs par défaut : un état sauvegardé par une ancienne
  // version (sans `zoom`, etc.) ne doit pas produire de champ manquant.
  let state = Object.assign({}, DEFAULT_STATE, load() || {});
  if (typeof state.zoom !== 'number' || !isFinite(state.zoom)) state.zoom = 0.92;
  if (!state.cover) state.cover = Object.assign({}, DEFAULT_STATE.cover);
  if (!Array.isArray(state.blocks)) state.blocks = [];
  if (!TEMPLATES[state.template]) state.template = 'royal';
  // Migration depuis l'ancien champ `lang` (none | fr)
  if (state.lang !== undefined) {
    if (typeof state.translation !== 'boolean') state.translation = state.lang === 'fr';
    if (typeof state.phonetic !== 'boolean') state.phonetic = true;
    delete state.lang;
  }
  let currentPage = 0;            // index de page affiché dans le feuilleteur
  let navLock = false;            // ignore le suivi au scroll pendant une navigation
  let navTimer = null;
  let searchQuery = '';
  const history = [];             // pile pour l'annulation

  // ---------------------------------------------------------- Raccourcis ----
  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const songById = (id) => SONGS.find((s) => s.id === id);
  const svg = (name, size) => (window.icon ? window.icon(name, size) : '');
  const HEB = /[א-ת]/;
  const translit = (he) => (window.transliterate ? window.transliterate(he) : '');

  // Couleur de pastille par catégorie
  const CAT_COLORS = { prieres: '#5b3a8c', chabbat: '#1e7b5a', fetes: '#0f766e', maroc: '#7c1d3f', babasale: '#b07a1e', ashkenaz: '#1e5a7b', hassidique: '#c2410c', habad: '#2f5fb0' };
  const uid = () => 'b' + Math.floor(performance.now() * 1000) + Math.floor(Math.random() * 1e6);

  // Recherche tolérante : sans accents, sans niqqoud, sans apostrophes.
  const fold = (s) => String(s || '').normalize('NFD')
    .replace(/[̀-֑ͯ-ׇ]/g, '')
    .replace(/[’'`´ʼ\-]/g, '').toLowerCase();

  // ============================================================ Persistance =
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { toast('Sauvegarde impossible : le livret est trop volumineux (images ?).'); }
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }
  function pushHistory() {
    history.push(JSON.stringify(state));
    if (history.length > 50) history.shift();
    $('#undoBtn').disabled = false;
  }
  function undo() {
    if (!history.length) return;
    state = JSON.parse(history.pop());
    $('#undoBtn').disabled = !history.length;
    syncControls(); renderBook(); save();
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }

  // ============================================================ Bibliothèque =
  function renderLibrary() {
    // Compositions de départ
    const pg = $('#presetGrid');
    pg.innerHTML = '';
    Object.entries(PRESETS).forEach(([key, p]) => {
      const b = document.createElement('button');
      b.className = 'preset-tile';
      b.innerHTML = `<span>${escapeHtml(p.label)}</span>
        <small>${p.blocks.length ? p.blocks.length + ' éléments' : 'Page blanche'}</small>`;
      b.onclick = () => applyPreset(key);
      pg.appendChild(b);
    });

    // Styles graphiques (pastilles)
    const tg = $('#templateGrid');
    tg.innerHTML = '';
    Object.entries(TEMPLATES).forEach(([key, t]) => {
      const b = document.createElement('button');
      b.className = 'tpl-tile';
      b.dataset.tpl = key;
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = `<span class="tpl-swatch" style="background:${t.paper};color:${t.accent};font-family:${t.font.replace(/"/g, "'")}">שַׁבָּת</span>
        <span class="tpl-name">${escapeHtml(t.label)}</span>`;
      b.onclick = () => { if (state.template === key) return; pushHistory(); state.template = key; syncControls(); renderBook(); save(); };
      tg.appendChild(b);
    });

    renderSongList();
  }

  function renderSongList() {
    const list = $('#songList');
    list.innerHTML = '';
    const q = fold(searchQuery.trim());
    const inBook = new Set(state.blocks.filter((b) => b.type === 'song').map((b) => b.songId));

    CATEGORIES.forEach((cat) => {
      const songs = SONGS.filter((s) => s.category === cat.key &&
        (!q || [s.title, s.hebrew, s.author].some((f) => fold(f).includes(q))));
      if (!songs.length) return;

      const group = document.createElement('div');
      group.className = 'cat-group';
      const color = CAT_COLORS[cat.key] || 'var(--primary)';
      group.innerHTML = `<p class="cat-title">
        <span class="cat-dot" style="background:${color}">${svg('music', 13)}</span>${escapeHtml(cat.label)}
        <span class="cat-count">${songs.length}</span></p>`;

      songs.forEach((s) => {
        const card = document.createElement('div');
        const added = inBook.has(s.id);
        card.className = 'song-card' + (added ? ' in-book' : '');
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ajouter ${s.title} au livret`);
        card.title = s.author || '';
        const listenBtn = s.audio && s.audio.url
          ? `<a class="listen-btn" href="${s.audio.url}" target="_blank" rel="noopener"
                title="Écouter l’air (YouTube)" aria-label="Écouter ${escapeHtml(s.title)}">${svg('play', 15)}</a>`
          : '';
        card.innerHTML = `
          <div class="meta">
            <div class="name">${escapeHtml(s.title)}${added ? `<span class="added" title="Déjà dans le livret">${svg('check', 13)}</span>` : ''}</div>
            <div class="heb">${s.hebrew || ''}</div>
          </div>
          <div class="card-actions">
            ${listenBtn}
            <button class="add-btn" tabindex="-1" title="Ajouter au livret" aria-hidden="true">${svg('plus', 16)}</button>
          </div>`;
        card.onclick = (e) => { if (!e.target.closest('.listen-btn')) addSong(s.id); };
        card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addSong(s.id); } };
        wireLibraryDrag(card, s.id);
        group.appendChild(card);
      });
      list.appendChild(group);
    });

    if (!list.children.length) {
      list.innerHTML = '<p class="no-result">Aucune chanson trouvée.</p>';
    }
  }

  // ============================================================ Mutations ====
  function applyPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    if (state.blocks.length && !confirm('Remplacer le contenu actuel du livret par « ' + p.label + ' » ?')) return;
    pushHistory();
    state.cover = { ...p.cover };
    state.blocks = p.blocks.map((b) => typeof b === 'string'
      ? { uid: uid(), type: 'song', songId: b }
      : { uid: uid(), ...b });
    currentPage = 0;
    syncControls(); renderBook(); save();
    setTimeout(() => gotoPage(0), 60);
  }

  // Insère un bloc avant `beforeUid` (ou à la fin si absent), puis navigue
  // vers la page qui le contient.
  function insertBlock(block, beforeUid) {
    pushHistory();
    const arr = state.blocks;
    const i = beforeUid ? arr.findIndex((b) => b.uid === beforeUid) : -1;
    if (i >= 0) arr.splice(i, 0, block); else arr.push(block);
    renderBook(); save();
    goToBlockPage(block.uid);
  }

  function addSong(songId, beforeUid) {
    const s = songById(songId);
    insertBlock({ uid: uid(), type: 'song', songId }, beforeUid);
    if (s) toast('« ' + s.title + ' » ajouté au livret');
  }
  function addText(title, body)       { insertBlock({ uid: uid(), type: 'text', title, body }, null); }
  function addImage(dataUrl, caption) { insertBlock({ uid: uid(), type: 'image', src: dataUrl, caption: caption || '' }, null); }

  function removeBlock(uidVal) {
    pushHistory();
    state.blocks = state.blocks.filter((b) => b.uid !== uidVal);
    renderBook(); save();
    toast('Élément retiré — Ctrl+Z pour annuler');
  }

  function moveBlock(fromUid, toUid) {
    if (fromUid === toUid) return;
    const arr = state.blocks;
    const from = arr.findIndex((b) => b.uid === fromUid);
    const to   = arr.findIndex((b) => b.uid === toUid);
    if (from < 0 || to < 0) return;
    pushHistory();
    const [item] = arr.splice(from, 1);
    arr.splice(arr.findIndex((b) => b.uid === toUid), 0, item);   // avant la cible
    renderBook(); save();
    goToBlockPage(item.uid);
  }

  // Déplacement d'un cran (boutons ↑ ↓ — utile au doigt et au clavier)
  function shiftBlock(uidVal, dir) {
    const arr = state.blocks;
    const i = arr.findIndex((b) => b.uid === uidVal);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= arr.length) return;
    pushHistory();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    renderBook(); save();
    goToBlockPage(uidVal);
  }

  // Amène le feuilleteur sur la page contenant un bloc donné.
  function goToBlockPage(blockUid) {
    setTimeout(() => {
      const el = $(`#book [data-uid="${blockUid}"]`);
      const page = el && el.closest('.page');
      const idx = page ? pageEls().indexOf(page) : pageEls().length - 1;
      if (idx >= 0) { toggleOverview(false); gotoPage(idx); }
    }, 70);
  }

  // ============================================================ Rendu bloc ===
  //  Le contenu est aplati en « items » de flux (en-tête de chanson, strophe,
  //  bloc libre) pour permettre à une chanson longue de se poursuivre sur la
  //  page suivante. « Écouter » n'apparaît PAS dans le livret (uniquement dans
  //  la bibliothèque) : on ne peut ni écouter dans un livre, ni à l'impression.
  function flattenBlocks(blocks) {
    const items = [];
    blocks.forEach((b) => {
      if (b.type === 'song') {
        const s = songById(b.songId);
        items.push({ kind: 'songHead', block: b });
        if (s && s.lines) s.lines.forEach((line) => items.push({ kind: 'verse', block: b, line }));
        else items.push({ kind: 'verse', block: b, line: { he: 'Chanson introuvable.', fr: '' } });
      } else {
        items.push({ kind: 'free', block: b });
      }
    });
    return items;
  }

  function toolsHtml() {
    return `<div class="block-tools no-print">
        <button class="up" title="Monter" aria-label="Monter">${svg('chevron-up', 15)}</button>
        <button class="down" title="Descendre" aria-label="Descendre">${svg('chevron-down', 15)}</button>
        <button class="drag-handle" title="Glisser pour déplacer" aria-label="Déplacer">${svg('grip', 15)}</button>
        <button class="del" title="Retirer du livret" aria-label="Retirer du livret">${svg('trash', 15)}</button>
      </div>`;
  }
  function wireTools(el, blockUid) {
    el.querySelector('.del').onclick  = (e) => { e.stopPropagation(); removeBlock(blockUid); };
    el.querySelector('.up').onclick   = (e) => { e.stopPropagation(); shiftBlock(blockUid, -1); };
    el.querySelector('.down').onclick = (e) => { e.stopPropagation(); shiftBlock(blockUid, 1); };
  }

  function songHeadEl(block, cont) {
    const s = songById(block.songId) || {};
    const el = document.createElement('div');
    el.className = 'song-head' + (cont ? ' cont' : '');
    el.dataset.uid = block.uid;
    el.draggable = true;
    el.innerHTML = `
      <div class="song-title-row">
        <span class="song-heb">${s.hebrew || ''}</span>
        <span class="song-lat">${escapeHtml(s.title || '')}${cont ? ' <em>(suite)</em>' : ''}</span>
      </div>
      ${(!cont && s.author) ? `<p class="song-author">${escapeHtml(s.author)}</p>` : ''}
      ${toolsHtml()}`;
    wireTools(el, block.uid);
    wireDrag(el);
    return el;
  }

  // Texte hébreu → HTML : « · » devient un séparateur discret, les indications
  // de rôle (« le meneur : », « les convives : ») sont mises en valeur.
  function heHtml(s) {
    return escapeHtml(s)
      .replace(/ · /g, ' <span class="sep">׀</span> ')
      .replace(/(הַמְזַמֵּן|הַמְסֻבִּים):/g, '<span class="who">$1 :</span>');
  }
  function trHtml(s) {
    return escapeHtml(s).replace(/ · /g, ' · ')
      .replace(/^(Hamzammén|Hamsoubbim):/g, '<span class="who">$1 :</span>')
      .replace(/ (Hamzammén|Hamsoubbim):/g, ' <span class="who">$1 :</span>');
  }
  const bareLen = (s) => s.replace(/[^א-ת ]/g, '').length;
  // Mise en page décidée pour toute la chanson (homogène d'une strophe à
  // l'autre) : deux colonnes si tous les vers sont courts et vont par paires.
  const twoColCache = {};
  function twoColumns(songId) {
    if (songId in twoColCache) return twoColCache[songId];
    const s = songById(songId);
    const stanzas = s ? s.lines.map((l) => l.he.split(' / ')).filter((ls) => ls.length > 1) : [];
    return (twoColCache[songId] = stanzas.length > 0 &&
      stanzas.every((ls) => ls.length % 2 === 0 && ls.every((x) => bareLen(x) <= 30)));
  }

  // Une strophe : vers (« / ») disposés sur deux colonnes quand ils sont
  // courts (comme dans les birkonim imprimés), phonétique sous chaque vers,
  // traduction sous la strophe. Une prière (sans « / ») est un paragraphe.
  function verseEl(item) {
    const ln = item.line;
    const hasHeb = HEB.test(ln.he);
    const trText = state.phonetic && hasHeb ? (ln.tr || translit(ln.he)) : '';
    const showFr = state.translation && ln.fr;
    const heLines = ln.he.split(' / ');
    const trLines = trText ? trText.split(' / ') : [];
    const el = document.createElement('div');
    el.dataset.uid = item.block.uid;               // permet de glisser depuis n'importe quelle ligne
    el.draggable = true;

    let body;
    if (heLines.length > 1) {
      const two = twoColumns(item.block.songId);
      body = `<div class="poem${two ? ' two' : ''}">${heLines.map((h, i) => `
          <div class="ln"><div class="he">${heHtml(h)}</div>${trText ? `<div class="tr">${trHtml(trLines[i] || '')}</div>` : ''}</div>`).join('')}
        </div>`;
    } else {
      body = `<div class="prose"><div class="he">${heHtml(ln.he)}</div>
        ${trText ? `<div class="tr">${trHtml(trText)}</div>` : ''}</div>`;
    }
    el.className = 'verse' + (heLines.length > 1 ? ' is-poem' : ' is-prose') + (ln.r ? ' refrain' : '');
    el.innerHTML = `${ln.r ? '<span class="refrain-tag">Refrain</span>' : ''}${body}
      ${showFr ? `<div class="xl">${escapeHtml(ln.fr)}</div>` : ''}`;
    wireDrag(el);                                    // glisser une strophe = déplacer/insérer sa chanson
    return el;
  }

  function freeBlockEl(block) {
    const el = document.createElement('div');
    el.className = 'block';
    el.dataset.uid = block.uid;
    el.draggable = true;
    let inner = '';
    if (block.type === 'text') {
      inner = `${block.title ? `<h3 class="free-title">${escapeHtml(block.title)}</h3>` : ''}
        <div class="free-body">${escapeHtml(block.body || '')}</div>`;
    } else if (block.type === 'image') {
      inner = `<img class="free-img" src="${block.src}" alt="" />
        ${block.caption ? `<p class="free-cap">${escapeHtml(block.caption)}</p>` : ''}`;
    }
    el.innerHTML = `${inner}${toolsHtml()}`;
    wireTools(el, block.uid);
    wireDrag(el);
    return el;
  }

  // ====================================================== Rendu du livret ====
  //  Pagination réelle : on remplit chaque page jusqu'au débordement.
  // Taille « ajustée » : échelle à laquelle une page carrée remplit le
  // lecteur (dimension la plus courte). state.zoom est une fraction de ça,
  // ce qui rend l'aperçu responsive à toute taille d'écran.
  const LOGICAL = 640;
  function fitScale() {
    const reader = $('#reader');
    const w = reader.clientWidth, h = reader.clientHeight || reader.getBoundingClientRect().height;
    const avail = Math.min(w || 320, h || 320);
    return Math.max(0.2, (avail - 24) / LOGICAL);
  }
  function applyZoom() {
    if ($('#reader').classList.contains('overview')) return;   // vignettes = échelle fixe
    const z = (state.zoom || 0.92) * fitScale();
    if (!isFinite(z) || z <= 0) return;                        // jamais de --z invalide
    $('#book').style.setProperty('--z', z.toFixed(3));
  }

  // Recalcule l'échelle à plusieurs instants (le temps que polices/flex se
  // stabilisent), puis recentre. Robuste quel que soit l'environnement.
  function scheduleFit() {
    [50, 180, 420].forEach((d) => setTimeout(() => {
      if ($('#reader').classList.contains('overview')) return;
      applyZoom();
      gotoPage(currentPage, false);
    }, d));
  }

  function renderBook() {
    applyTemplate();
    const book = $('#book');
    applyZoom();
    book.innerHTML = '';
    $('#emptyHint').hidden = state.blocks.length > 0;

    // Page de couverture
    const cover = newPage(book, 'cover');
    cover.querySelector('.page-inner').innerHTML = `
      <div class="cover-orn-top">${svg('star', 34)}</div>
      <h2 class="cover-title">${escapeHtml(state.cover.title || '')}</h2>
      <p class="cover-sub">${escapeHtml(state.cover.subtitle || '')}</p>
      <div class="cover-rule"></div>`;

    // Pages de contenu (pagination fine sur le contenu logique 640×640).
    // Une chanson trop longue se poursuit sur la page suivante avec « (suite) ».
    const items = flattenBlocks(state.blocks);
    let inner = newPage(book).querySelector('.page-inner');
    // Débordement : bas du dernier élément au-delà de la zone de contenu.
    // (scrollHeight ne compte pas la marge basse d'un conteneur flex sous Chrome.)
    const limitOf = (el) => el.clientHeight - parseFloat(getComputedStyle(el).paddingBottom || 0);
    const limit = limitOf(inner);
    const overflow = () => {
      const last = inner.lastElementChild;
      return !!last && last.offsetTop + last.offsetHeight > limit + 0.5;
    };
    // Un élément seul trop haut pour une page : on le resserre plutôt que de le couper.
    const fitAlone = (el) => { if (overflow() && inner.childElementCount <= 2) el.classList.add('dense'); };
    let headEl = null, headUid = null, versesOnPage = 0;

    items.forEach((item) => {
      if (item.kind === 'songHead') {
        const el = songHeadEl(item.block, false);
        inner.appendChild(el);
        if (overflow() && inner.childElementCount > 1) {
          inner.removeChild(el);
          inner = newPage(book).querySelector('.page-inner');
          inner.appendChild(el);
        }
        headEl = el; headUid = item.block.uid; versesOnPage = 0;
      } else if (item.kind === 'verse') {
        const el = verseEl(item);
        inner.appendChild(el);
        if (overflow() && inner.childElementCount > 1) {
          inner.removeChild(el);
          // en-tête orphelin (aucune strophe placée) → on le déplace au lieu d'en recréer un
          const orphan = versesOnPage === 0 && headUid === item.block.uid &&
                         headEl && headEl.parentNode === inner && headEl === inner.lastElementChild;
          if (orphan) inner.removeChild(headEl);
          inner = newPage(book).querySelector('.page-inner');
          headEl = orphan ? headEl : songHeadEl(item.block, true);
          inner.appendChild(headEl);
          headUid = item.block.uid; versesOnPage = 0;
          inner.appendChild(el);
          fitAlone(el);
        }
        versesOnPage++;
      } else {
        const el = freeBlockEl(item.block);
        inner.appendChild(el);
        if (overflow() && inner.childElementCount > 1) {
          inner.removeChild(el);
          inner = newPage(book).querySelector('.page-inner');
          inner.appendChild(el);
        }
        fitAlone(el);
        headEl = null; headUid = null; versesOnPage = 0;
      }
    });

    // Numéros de page (la couverture n'est pas numérotée)
    const pages = book.querySelectorAll('.page');
    pages.forEach((p, i) => {
      if (!i) return;
      const n = document.createElement('span');
      n.className = 'page-num';
      n.textContent = i;
      p.querySelector('.page-inner').appendChild(n);
    });

    $('#pageCount').textContent = pages.length + (pages.length > 1 ? ' pages' : ' page') +
      ' · format carré 14,8 cm';
    if (currentPage >= pages.length) currentPage = pages.length - 1;
    if (currentPage < 0) currentPage = 0;
    updatePageIndicator();
    renderSongList();     // met à jour les coches « déjà dans le livret »
    scheduleFit();        // réajuste l'échelle une fois la mise en page stabilisée
  }

  function newPage(book, cls) {
    const p = document.createElement('div');
    p.className = 'page' + (cls ? ' ' + cls : '');
    const inner = document.createElement('div');
    inner.className = 'page-inner';
    p.appendChild(inner);
    book.appendChild(p);
    return p;
  }

  // ------------------------------------------------------- Feuilleteur -------
  function pageEls() { return $$('#book .page'); }

  function gotoPage(i) {
    const pages = pageEls();
    if (!pages.length) return;
    currentPage = Math.max(0, Math.min(i, pages.length - 1));
    const reader = $('#reader');
    if (reader.classList.contains('overview')) { updatePageIndicator(); return; }
    const rr = reader.getBoundingClientRect();
    const pr = pages[currentPage].getBoundingClientRect();
    const delta = (pr.left + pr.width / 2) - (rr.left + rr.width / 2);
    scrollReaderTo(reader.scrollLeft + delta);
    updatePageIndicator();
  }

  // Défilement horizontal : position posée directement (fiable partout).
  function scrollReaderTo(left) {
    const reader = $('#reader');
    const max = reader.scrollWidth - reader.clientWidth;
    left = Math.max(0, Math.min(left, max));
    navLock = true; clearTimeout(navTimer);
    reader.scrollLeft = left;
    navTimer = setTimeout(() => { navLock = false; }, 300);
  }

  function updatePageIndicator() {
    const total = pageEls().length || 1;
    $('#pageIndicator').textContent = (currentPage + 1) + ' / ' + total;
    $('#prevPage').disabled = currentPage <= 0;
    $('#nextPage').disabled = currentPage >= total - 1;
  }

  // Recalcule la page courante d'après la position de défilement horizontal.
  function syncCurrentFromScroll() {
    const reader = $('#reader');
    if (navLock || reader.classList.contains('overview')) return;
    const rr = reader.getBoundingClientRect();
    const center = rr.left + rr.width / 2;
    let best = 0, bestDist = Infinity;
    pageEls().forEach((p, i) => {
      const pr = p.getBoundingClientRect();
      const d = Math.abs((pr.left + pr.width / 2) - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best !== currentPage) { currentPage = best; updatePageIndicator(); }
  }

  function setZoom(z) {
    state.zoom = Math.max(0.3, Math.min(1, Math.round(z * 100) / 100));
    applyZoom();
    $('#zoom').value = state.zoom;
    save();
    // garde la page courante centrée après le changement d'échelle
    setTimeout(() => gotoPage(currentPage), 20);
  }

  function toggleOverview(force) {
    const reader = $('#reader');
    const cur = reader.classList.contains('overview');
    const on = force !== undefined ? force : !cur;
    if (on === cur) return;                      // pas de changement → ne rien faire
    reader.classList.toggle('overview', on);
    $('#overviewBtn').classList.toggle('btn-primary', on);
    $('#overviewBtn').classList.toggle('btn-ghost', !on);
    $('#overviewBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      $('#book').style.setProperty('--z', 0.28);
    } else {
      applyZoom();
      setTimeout(() => gotoPage(currentPage), 20);
    }
  }

  function applyTemplate() {
    const t = TEMPLATES[state.template] || TEMPLATES.royal;
    const root = document.documentElement.style;
    root.setProperty('--accent', t.accent);
    root.setProperty('--paper', t.paper);
    root.setProperty('--book-font', t.font);
  }

  // ============================================================ Drag & drop ==
  let dragUid = null;       // bloc existant en cours de déplacement
  let dragNewSong = null;   // chanson glissée depuis la bibliothèque
  function clearDragMarks() { $$('.drag-over').forEach((b) => b.classList.remove('drag-over')); }

  // Rend un bloc du livret déplaçable et cible de dépôt (réordonner / insérer).
  function wireDrag(el) {
    el.addEventListener('dragstart', (e) => {
      dragUid = el.dataset.uid; dragNewSong = null;
      $$(`#book [data-uid="${dragUid}"]`).forEach((x) => x.classList.add('dragging'));
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', 'block:' + dragUid); } catch (_) {}
    });
    el.addEventListener('dragend', () => { dragUid = null; $$('#book .dragging').forEach((x) => x.classList.remove('dragging')); clearDragMarks(); });
    el.addEventListener('dragover', (e) => {
      if (dragNewSong || (dragUid && dragUid !== el.dataset.uid)) {
        e.preventDefault();
        e.dataTransfer.dropEffect = dragNewSong ? 'copy' : 'move';
        el.classList.add('drag-over');
      }
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', (e) => {
      e.preventDefault(); e.stopPropagation();        // évite le double-dépôt sur le lecteur
      el.classList.remove('drag-over');
      $('#reader').classList.remove('drop-target');
      if (dragNewSong) addSong(dragNewSong, el.dataset.uid);              // insère la chanson AVANT ce bloc
      else if (dragUid && dragUid !== el.dataset.uid) moveBlock(dragUid, el.dataset.uid);
    });
  }

  // Rend une carte de la bibliothèque glissable vers le livret.
  function wireLibraryDrag(card, songId) {
    card.draggable = true;
    card.addEventListener('dragstart', (e) => {
      dragNewSong = songId; dragUid = null;
      card.classList.add('dragging');
      document.body.classList.add('dragging-song');
      e.dataTransfer.effectAllowed = 'copy';
      try { e.dataTransfer.setData('text/plain', 'newsong:' + songId); } catch (_) {}
    });
    card.addEventListener('dragend', () => {
      dragNewSong = null;
      card.classList.remove('dragging');
      document.body.classList.remove('dragging-song');
      $('#reader').classList.remove('drop-target');
      clearDragMarks();
    });
  }

  // ============================================================ Contrôles ====
  function syncControls() {
    $('#coverTitle').value = state.cover.title || '';
    $('#coverSubtitle').value = state.cover.subtitle || '';
    $$('#templateGrid .tpl-tile').forEach((b) => {
      const on = b.dataset.tpl === state.template;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $$('#optToggles .opt-btn').forEach((b) => {
      const on = !!state[b.dataset.opt];
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $('#undoBtn').disabled = !history.length;
  }

  function initControls() {
    // Couverture
    $('#coverTitle').oninput   = (e) => { state.cover.title = e.target.value; updateCoverLive(); save(); };
    $('#coverSubtitle').oninput = (e) => { state.cover.subtitle = e.target.value; updateCoverLive(); save(); };

    // Interrupteurs Phonétique / Traduction (indépendants)
    $('#optToggles').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-opt]');
      if (!b) return;
      const key = b.dataset.opt;
      state[key] = !state[key];
      syncControls(); renderBook(); save();
    });

    // Recherche
    $('#songSearch').oninput = (e) => { searchQuery = e.target.value; renderSongList(); };

    // Ajouts
    $$('.add-tile').forEach((t) => t.addEventListener('click', () => {
      if (t.dataset.add === 'text') openTextModal();
      if (t.dataset.add === 'image') $('#imageInput').click();
    }));
    $('#imageInput').onchange = handleImage;

    // Modale texte
    $('#textModalCancel').onclick = closeTextModal;
    $('#textModal').addEventListener('click', (e) => { if (e.target.id === 'textModal') closeTextModal(); });
    $('#textModalSave').onclick = () => {
      const title = $('#textModalTitle').value.trim();
      const body  = $('#textModalBody').value.trim();
      if (title || body) addText(title, body);
      closeTextModal();
    };

    // Zone de dépôt : glisser une chanson depuis la bibliothèque vers le livret.
    // (Les dépôts précis sur un bloc sont gérés par wireDrag, qui stoppe la
    //  propagation ; ici on gère le dépôt « dans le vide » → ajout à la fin.)
    const reader = $('#reader');
    reader.addEventListener('dragover', (e) => {
      if (dragNewSong) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; reader.classList.add('drop-target'); }
    });
    reader.addEventListener('dragleave', (e) => {
      if (!reader.contains(e.relatedTarget)) reader.classList.remove('drop-target');
    });
    reader.addEventListener('drop', (e) => {
      if (!dragNewSong) return;
      e.preventDefault();
      reader.classList.remove('drop-target');
      addSong(dragNewSong, null);      // ajout à la fin
    });

    // Feuilleteur : navigation horizontale
    $('#prevPage').onclick = () => { toggleOverview(false); gotoPage(currentPage - 1); };
    $('#nextPage').onclick = () => { toggleOverview(false); gotoPage(currentPage + 1); };

    // Zoom
    $('#zoom').value = state.zoom;
    $('#zoom').oninput = (e) => { toggleOverview(false); setZoom(+e.target.value); };

    // Vue d'ensemble
    $('#overviewBtn').onclick = () => toggleOverview();

    // Suivi de la page courante au défilement + clic sur une vignette
    let st;
    reader.addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(syncCurrentFromScroll, 80); });
    reader.addEventListener('click', (e) => {
      if (!reader.classList.contains('overview')) return;
      const p = e.target.closest('.page');
      if (!p) return;
      const idx = pageEls().indexOf(p);
      currentPage = idx;
      toggleOverview(false);
      setTimeout(() => gotoPage(idx), 30);
    });

    // Clavier : flèches (hors saisie), Échap, Ctrl+Z
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#textModal').hidden) closeTextModal();
        else document.body.classList.remove('sidebar-open', 'preview-mode');
        return;
      }
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''));
      if (typing || !$('#textModal').hidden) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); return; }
      if (e.target.closest && e.target.closest('.song-card')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); toggleOverview(false); gotoPage(currentPage + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); toggleOverview(false); gotoPage(currentPage - 1); }
    });

    // Vider le livret
    $('#clearBtn').onclick = () => {
      if (!state.blocks.length) return;
      if (!confirm('Vider le livret ? Toutes les chansons ajoutées seront retirées.')) return;
      pushHistory();
      state.blocks = [];
      renderBook(); save();
    };

    // Actions
    $('#undoBtn').onclick = undo;
    $('#exportBtn').onclick = exportPdf;
    window.addEventListener('beforeprint', () => toggleOverview(false));
    $('#previewToggle').onclick = () => {
      document.body.classList.toggle('preview-mode');
      $('#previewToggle').setAttribute('aria-pressed', document.body.classList.contains('preview-mode'));
    };

    // Menu latéral (mobile) : ouvre/ferme la bibliothèque en tiroir
    $('#menuToggle').onclick = (e) => { e.stopPropagation(); document.body.classList.toggle('sidebar-open'); };
    $('#library').addEventListener('click', (e) => {
      if (e.target.closest('.preset-tile, .add-tile, .song-card') && !e.target.closest('.listen-btn') &&
          window.innerWidth <= 768) {
        document.body.classList.remove('sidebar-open');
      }
    });
    // Ferme le tiroir en cliquant en dehors (fond)
    document.addEventListener('click', (e) => {
      if (document.body.classList.contains('sidebar-open') &&
          !e.target.closest('.sidebar') && !e.target.closest('#menuToggle')) {
        document.body.classList.remove('sidebar-open');
      }
    });
  }

  // Export : la boîte d'impression du navigateur, réglée sur des pages
  // carrées de 14,8 cm (voir @page dans styles.css) → « Enregistrer en PDF ».
  function exportPdf() {
    toggleOverview(false);
    if (!state.blocks.length) { toast('Ajoutez au moins une chanson avant d’exporter.'); return; }
    toast('Choisissez « Enregistrer au format PDF » comme imprimante.');
    setTimeout(() => window.print(), 400);
  }

  function updateCoverLive() {
    const c = $('#book .cover');
    if (!c) return;
    c.querySelector('.cover-title').textContent = state.cover.title || '';
    c.querySelector('.cover-sub').textContent = state.cover.subtitle || '';
  }

  // -------- Modale texte
  function openTextModal() {
    $('#textModalTitle').value = ''; $('#textModalBody').value = '';
    $('#textModal').hidden = false; $('#textModalTitle').focus();
  }
  function closeTextModal() { $('#textModal').hidden = true; }

  // -------- Image : réduite (1200 px max, JPEG) pour rester légère dans le
  //          navigateur ; rien n'est envoyé sur Internet.
  function handleImage(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const caption = file.name.replace(/\.[^.]+$/, '');
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1200, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        addImage(c.toDataURL('image/jpeg', 0.85), caption);
      };
      img.onerror = () => toast('Image illisible.');
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // -------- Utilitaire
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ============================================================ Démarrage ====
  if (window.hydrateIcons) window.hydrateIcons();   // remplit les [data-icon] statiques
  renderLibrary();
  initControls();
  syncControls();
  renderBook();
  // La pagination dépend des métriques des polices : on la refait une fois
  // les polices web chargées (sinon des pages peuvent déborder).
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => renderBook());

  // Ajuste l'échelle dès que la taille réelle du lecteur est connue, puis à
  // chaque changement de taille. Le contenu logique (640×640) ne change pas :
  // inutile de re-paginer, seule l'échelle d'affichage varie.
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if ($('#reader').classList.contains('overview')) return;
      const before = $('#book').style.getPropertyValue('--z');
      applyZoom();
      if ($('#book').style.getPropertyValue('--z') !== before) gotoPage(currentPage);
    });
    ro.observe($('#reader'));
  } else {
    window.addEventListener('resize', () => { applyZoom(); gotoPage(currentPage); });
  }
})();
