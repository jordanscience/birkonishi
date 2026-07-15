// ============================================================================
//  BikoNim — icônes SVG (style Lucide, trait 2px, currentColor)
//  Remplace les emojis (règle "no emojis as icons" de la checklist pro).
// ============================================================================
(function () {
  'use strict';

  // inner = contenu du SVG ; fill:true pour les glyphes pleins.
  const ICONS = {
    printer: { inner: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>' },
    type:    { inner: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>' },
    image:   { inner: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>' },
    trash:   { inner: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>' },
    grip:    { fill: true, inner: '<circle cx="9" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="18" r="1.5"/>' },
    play:    { fill: true, inner: '<path d="M7 4v16l13-8z"/>' },
    search:  { inner: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>' },
    undo:    { inner: '<path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/>' },
    plus:    { inner: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' },
    maximize:{ inner: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>' },
    book:    { inner: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>' },
    music:   { inner: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' },
    languages:{ inner: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>' },
    star:    { inner: '<path d="M12 2.5 20.5 18h-17z"/><path d="M12 21.5 3.5 6h17z"/>' },
    check:   { inner: '<polyline points="20 6 9 17 4 12"/>' },
    x:       { inner: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' },
    'chevron-left':  { inner: '<polyline points="15 18 9 12 15 6"/>' },
    'chevron-right': { inner: '<polyline points="9 18 15 12 9 6"/>' },
    grid:    { inner: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>' },
    'zoom-in':  { inner: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>' },
    'zoom-out': { inner: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>' },
    menu:    { inner: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>' },
  };

  function icon(name, size) {
    const it = ICONS[name];
    if (!it) return '';
    const s = size || 20;
    const stroke = it.fill
      ? 'fill="currentColor" stroke="none"'
      : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return `<svg class="icn" width="${s}" height="${s}" viewBox="0 0 24 24" ${stroke} aria-hidden="true">${it.inner}</svg>`;
  }

  // Remplit tous les éléments [data-icon] présents dans le HTML statique.
  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      el.innerHTML = icon(el.dataset.icon, el.dataset.iconSize ? +el.dataset.iconSize : undefined);
    });
  }

  window.icon = icon;
  window.hydrateIcons = hydrateIcons;
})();
