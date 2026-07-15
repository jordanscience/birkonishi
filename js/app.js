// ============================================================================
//  BikoNim — logique de l'éditeur de livret
// ============================================================================
(function () {
  'use strict';

  const STORAGE_KEY = 'bikonim.project.v1';

  // -------------------------------------------------------------- État ------
  const DEFAULT_STATE = {
    template: 'royal',
    cover: { title: 'Mon Birkon', subtitle: 'Chansons du Chabbat' },
    lang: 'none',                 // none | fr | en
    zoom: 0.92,                   // fraction de la taille « ajustée » (0.3–1)
    blocks: [],                   // { uid, type:'song'|'text'|'image', ... }
  };
  // Fusionne avec les valeurs par défaut : un état sauvegardé par une ancienne
  // version (sans `zoom`, etc.) ne doit pas produire de champ manquant.
  let state = Object.assign({}, DEFAULT_STATE, load() || {});
  if (typeof state.zoom !== 'number' || !isFinite(state.zoom)) state.zoom = 0.92;
  if (!state.cover) state.cover = Object.assign({}, DEFAULT_STATE.cover);
  if (!Array.isArray(state.blocks)) state.blocks = [];
  let currentPage = 0;            // index de page affiché dans le feuilleteur
  let navLock = false;            // ignore le suivi au scroll pendant une navigation
  let navTimer = null;
  const history = [];             // pile pour l'annulation

  // ---------------------------------------------------------- Raccourcis ----
  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const songById = (id) => SONGS.find((s) => s.id === id);
  const svg = (name, size) => (window.icon ? window.icon(name, size) : '');

  // Couleur de pastille par catégorie
  const CAT_COLORS = { prieres: '#5b3a8c', chabbat: '#1e7b5a', maroc: '#7c1d3f', babasale: '#b07a1e', ashkenaz: '#1e5a7b', hassidique: '#c2410c', habad: '#2f5fb0' };
  const uid = () => 'b' + Math.floor(performance.now() * 1000) + Math.floor(Math.random() * 1e6);

  // ============================================================ Persistance =
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }
  function pushHistory() { history.push(JSON.stringify(state)); if (history.length > 50) history.shift(); }
  function undo() {
    if (!history.length) return;
    state = JSON.parse(history.pop());
    syncControls(); renderBook(); save();
  }

  // ============================================================ Bibliothèque =
  function renderLibrary() {
    // Compositions de départ
    const pg = $('#presetGrid');
    pg.innerHTML = '';
    Object.entries(PRESETS).forEach(([key, p]) => {
      const b = document.createElement('button');
      b.className = 'preset-tile';
      b.textContent = p.label;
      b.onclick = () => applyPreset(key);
      pg.appendChild(b);
    });

    renderSongList('');
  }

  function renderSongList(query) {
    const list = $('#songList');
    list.innerHTML = '';
    const q = query.trim().toLowerCase();

    CATEGORIES.forEach((cat) => {
      const songs = SONGS.filter((s) =>
        s.category === cat.key &&
        (!q || s.title.toLowerCase().includes(q) || (s.hebrew || '').includes(q)));
      if (!songs.length) return;

      const group = document.createElement('div');
      group.className = 'cat-group';
      const color = CAT_COLORS[cat.key] || 'var(--primary)';
      group.innerHTML = `<p class="cat-title">
        <span class="cat-dot" style="background:${color}">${svg('music', 13)}</span>${cat.label}</p>`;

      songs.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        const listenBtn = s.audio && s.audio.url
          ? `<a class="listen-btn" href="${s.audio.url}" target="_blank" rel="noopener"
                title="Écouter l’air" aria-label="Écouter ${s.title}">${svg('play', 15)}</a>`
          : '';
        card.innerHTML = `
          <div class="meta">
            <div class="name">${s.title}</div>
            <div class="heb">${s.hebrew || ''}</div>
          </div>
          <div class="card-actions">
            ${listenBtn}
            <button class="add-btn" title="Ajouter au livret" aria-label="Ajouter ${s.title}">${svg('plus', 16)}</button>
          </div>`;
        card.querySelector('.add-btn').onclick = (e) => { e.stopPropagation(); addSong(s.id); };
        card.onclick = (e) => { if (!e.target.closest('.card-actions')) addSong(s.id); };
        wireLibraryDrag(card, s.id);
        group.appendChild(card);
      });
      list.appendChild(group);
    });

    if (!list.children.length) {
      list.innerHTML = '<p style="color:#6b7280;font-size:13px">Aucune chanson trouvée.</p>';
    }
  }

  // ============================================================ Mutations ====
  function applyPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    pushHistory();
    state.cover = { ...p.cover };
    state.blocks = p.blocks.map((b) => ({ uid: uid(), ...b }));
    syncControls(); renderBook(); save();
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

  function addSong(songId, beforeUid) { insertBlock({ uid: uid(), type: 'song', songId }, beforeUid); }
  function addText(title, body)       { insertBlock({ uid: uid(), type: 'text', title, body }, null); }
  function addImage(dataUrl, caption) { insertBlock({ uid: uid(), type: 'image', src: dataUrl, caption: caption || '' }, null); }

  function removeBlock(uidVal) {
    pushHistory();
    state.blocks = state.blocks.filter((b) => b.uid !== uidVal);
    renderBook(); save();
  }

  function moveBlock(fromUid, toUid) {
    if (fromUid === toUid) return;
    pushHistory();
    const arr = state.blocks;
    const from = arr.findIndex((b) => b.uid === fromUid);
    const to   = arr.findIndex((b) => b.uid === toUid);
    if (from < 0 || to < 0) return;
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    renderBook(); save();
    goToBlockPage(item.uid);
  }

  // Amène le feuilleteur sur la page contenant un bloc donné.
  function goToBlockPage(blockUid) {
    setTimeout(() => {
      const el = $(`#book [data-uid="${blockUid}"]`);
      const page = el && el.closest('.page');
      const idx = page ? pageEls().indexOf(page) : pageEls().length - 1;
      if (idx >= 0) gotoPage(idx);
    }, 70);
  }

  // ============================================================ Rendu bloc ===
  //  Le contenu est aplati en « items » de flux (en-tête de chanson, verset,
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
        else items.push({ kind: 'verse', block: b, line: { he: 'Chanson introuvable.', tr: '', fr: '' } });
      } else {
        items.push({ kind: 'free', block: b });
      }
    });
    return items;
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
      <div class="block-tools no-print">
        <button class="drag-handle" title="Déplacer" aria-label="Déplacer">${svg('grip', 16)}</button>
        <button class="del" title="Supprimer" aria-label="Supprimer">${svg('trash', 16)}</button>
      </div>`;
    el.querySelector('.del').onclick = (e) => { e.stopPropagation(); removeBlock(block.uid); };
    wireDrag(el);
    return el;
  }

  function verseEl(item) {
    const ln = item.line;
    const xl = state.lang === 'fr' ? ln.fr : '';
    const el = document.createElement('div');
    el.className = 'verse';
    el.innerHTML = `
      <div class="he">${ln.he}</div>
      ${ln.tr ? `<div class="tr">${escapeHtml(ln.tr)}</div>` : ''}
      ${xl ? `<div class="xl">${escapeHtml(xl)}</div>` : ''}`;
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
    el.innerHTML = `${inner}
      <div class="block-tools no-print">
        <button class="drag-handle" title="Déplacer" aria-label="Déplacer">${svg('grip', 16)}</button>
        <button class="del" title="Supprimer" aria-label="Supprimer">${svg('trash', 16)}</button>
      </div>`;
    el.querySelector('.del').onclick = (e) => { e.stopPropagation(); removeBlock(block.uid); };
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
    $('#emptyHint').style.display = state.blocks.length ? 'none' : 'block';

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
    const overflow = () => inner.scrollHeight > inner.clientHeight;
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
          // en-tête orphelin (aucun verset placé) → on le déplace au lieu d'en recréer un
          const orphan = versesOnPage === 0 && headUid === item.block.uid &&
                         headEl && headEl.parentNode === inner && headEl === inner.lastElementChild;
          if (orphan) inner.removeChild(headEl);
          inner = newPage(book).querySelector('.page-inner');
          headEl = orphan ? headEl : songHeadEl(item.block, true);
          inner.appendChild(headEl);
          headUid = item.block.uid; versesOnPage = 0;
          inner.appendChild(el);
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
        headEl = null; headUid = null; versesOnPage = 0;
      }
    });

    const pages = book.querySelectorAll('.page').length;
    $('#pageCount').textContent = pages + (pages > 1 ? ' pages' : ' page');
    if (currentPage >= pages) currentPage = pages - 1;
    if (currentPage < 0) currentPage = 0;
    updatePageIndicator();
    scheduleFit();   // réajuste l'échelle une fois la mise en page stabilisée
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

  function gotoPage(i, smooth) {
    const pages = pageEls();
    if (!pages.length) return;
    currentPage = Math.max(0, Math.min(i, pages.length - 1));
    const reader = $('#reader');
    const rr = reader.getBoundingClientRect();
    const pr = pages[currentPage].getBoundingClientRect();
    const delta = (pr.left + pr.width / 2) - (rr.left + rr.width / 2);
    scrollReaderTo(reader.scrollLeft + delta);
    updatePageIndicator();
  }

  // Défilement horizontal : position posée directement (fiable partout) ;
  // le lissage est assuré par `scroll-behavior: smooth` en CSS (vrais
  // navigateurs) et désactivé sous prefers-reduced-motion.
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
    setTimeout(() => gotoPage(currentPage, false), 20);
  }

  function toggleOverview(force) {
    const reader = $('#reader');
    const cur = reader.classList.contains('overview');
    const on = force !== undefined ? force : !cur;
    if (on === cur) return;                      // pas de changement → ne rien faire
    reader.classList.toggle('overview', on);
    $('#overviewBtn').classList.toggle('btn-primary', on);
    $('#overviewBtn').classList.toggle('btn-ghost', !on);
    if (on) {
      $('#book').style.setProperty('--z', 0.28);
    } else {
      applyZoom();
      setTimeout(() => gotoPage(currentPage, false), 20);
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
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', 'block:' + dragUid); } catch (_) {}
    });
    el.addEventListener('dragend', () => { dragUid = null; el.classList.remove('dragging'); clearDragMarks(); });
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
    $('#templateSelect').value = state.template;
    $$('#langToggle button').forEach((b) => b.classList.toggle('active', b.dataset.lang === state.lang));
  }

  function initControls() {
    // Modèles
    const sel = $('#templateSelect');
    Object.entries(TEMPLATES).forEach(([key, t]) => {
      const o = document.createElement('option');
      o.value = key; o.textContent = t.label; sel.appendChild(o);
    });
    sel.onchange = () => { pushHistory(); state.template = sel.value; renderBook(); save(); };

    // Couverture
    $('#coverTitle').oninput   = (e) => { state.cover.title = e.target.value; updateCoverLive(); save(); };
    $('#coverSubtitle').oninput = (e) => { state.cover.subtitle = e.target.value; updateCoverLive(); save(); };

    // Traduction
    $('#langToggle').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-lang]');
      if (!b) return;
      state.lang = b.dataset.lang;
      syncControls(); renderBook(); save();
    });

    // Recherche
    $('#songSearch').oninput = (e) => renderSongList(e.target.value);

    // Ajouts
    $$('.add-tile').forEach((t) => t.addEventListener('click', () => {
      if (t.dataset.add === 'text') openTextModal();
      if (t.dataset.add === 'image') $('#imageInput').click();
    }));
    $('#imageInput').onchange = handleImage;

    // Modale texte
    $('#textModalCancel').onclick = closeTextModal;
    $('#textModal').addEventListener('click', (e) => { if (e.target.id === 'textModal') closeTextModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#textModal').hidden) closeTextModal(); });
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
    $('#reader').addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(syncCurrentFromScroll, 80); });
    $('#reader').addEventListener('click', (e) => {
      const reader = $('#reader');
      if (!reader.classList.contains('overview')) return;
      const p = e.target.closest('.page');
      if (!p) return;
      const idx = pageEls().indexOf(p);
      currentPage = idx;
      toggleOverview(false);
      setTimeout(() => gotoPage(idx, false), 30);
    });

    // Flèches clavier (hors saisie de texte)
    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''));
      if (typing || !$('#textModal').hidden) return;
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
    $('#exportBtn').onclick = () => { toggleOverview(false); setTimeout(() => window.print(), 60); };
    $('#previewToggle').onclick = () => document.body.classList.toggle('preview-mode');

    // Menu latéral (mobile) : ouvre/ferme la bibliothèque en tiroir
    $('#menuToggle').onclick = (e) => { e.stopPropagation(); document.body.classList.toggle('sidebar-open'); };
    $('#library').addEventListener('click', (e) => {
      if (e.target.closest('.preset-tile, .add-tile, .song-card') && window.innerWidth <= 768) {
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

    // Ré-paginer + réajuster le zoom si la fenêtre change (responsive)
    let rt; window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { renderBook(); setTimeout(() => gotoPage(currentPage, false), 30); }, 150);
    });
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

  // -------- Image (encodée en base64, reste dans le navigateur)
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => addImage(reader.result, file.name.replace(/\.[^.]+$/, ''));
    reader.readAsDataURL(file);
    e.target.value = '';
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

  // Ajuste l'échelle dès que la taille réelle du lecteur est connue,
  // puis à chaque changement de taille (fiable, indépendant des polices).
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if ($('#reader').classList.contains('overview')) return;
      // applyZoom ne modifie pas la taille du lecteur → pas de boucle.
      const before = $('#book').style.getPropertyValue('--z');
      applyZoom();
      if ($('#book').style.getPropertyValue('--z') !== before) gotoPage(currentPage, false);
    });
    ro.observe($('#reader'));
  }
})();
