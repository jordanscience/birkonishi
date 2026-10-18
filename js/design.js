// ============================================================================
//  Birkonishi — données de design : polices, thèmes, textures, mises en page
//  (couverture, pages libres) et modèles de texte. Aucune logique d'éditeur.
//  Unités : la page logique mesure 640 × 640 px (14,8 cm à l'impression).
// ============================================================================
(function () {
  'use strict';

  // ------------------------------------------------------------ Polices ----
  //  he:true → la police contient l'hébreu ET le niqqoud (vérifié), utilisable
  //  pour le texte vocalisé. Les autres servent aux titres latins / textes libres.
  const FONTS = [
    // he:'body' → hébreu + niqqoud correctement positionné (qamats qatan inclus) : texte des chants
    { id: 'frank',      label: 'Frank Ruhl Libre',  css: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif", he: 'body' },
    { id: 'david',      label: 'David Libre',       css: "'David Libre', 'Frank Ruhl Libre', serif", he: 'body' },
    { id: 'notoserif',  label: 'Noto Serif Hebrew', css: "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif", he: 'body' },
    { id: 'notosans',   label: 'Noto Sans Hebrew',  css: "'Noto Sans Hebrew', 'Noto Serif Hebrew', sans-serif", he: 'body' },
    { id: 'alef',       label: 'Alef',              css: "'Alef', 'Noto Sans Hebrew', sans-serif", he: 'body' },
    { id: 'heebo',      label: 'Heebo',             css: "'Heebo', 'Noto Sans Hebrew', sans-serif", he: 'body' },
    { id: 'assistant',  label: 'Assistant',         css: "'Assistant', 'Noto Sans Hebrew', sans-serif", he: 'body' },
    { id: 'miriam',     label: 'Miriam Libre',      css: "'Miriam Libre', 'Noto Sans Hebrew', sans-serif", he: 'body' },
    { id: 'rubik',      label: 'Rubik',             css: "'Rubik', 'Noto Sans Hebrew', sans-serif", he: 'body' },
    // he:'title' → hébreu correct mais réservé aux titres et textes courts
    { id: 'suez',       label: 'Suez One',          css: "'Suez One', 'Frank Ruhl Libre', serif", he: 'title' },
    { id: 'secular',    label: 'Secular One',       css: "'Secular One', 'Noto Sans Hebrew', sans-serif", he: 'title' },
    { id: 'bellefair',  label: 'Bellefair',         css: "'Bellefair', 'Frank Ruhl Libre', serif", he: 'title' },
    { id: 'karantina',  label: 'Karantina',         css: "'Karantina', 'Noto Sans Hebrew', sans-serif", he: 'title' },
    { id: 'amatic',     label: 'Amatic SC',         css: "'Amatic SC', 'Noto Sans Hebrew', cursive", he: 'title' },
    // Latin seulement : titres latins, phonétique, traduction, textes libres
    { id: 'cormorant',  label: 'Cormorant',         css: "'Cormorant Garamond', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'ebgaramond', label: 'EB Garamond',       css: "'EB Garamond', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'playfair',   label: 'Playfair Display',  css: "'Playfair Display', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'lora',       label: 'Lora',              css: "'Lora', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'marcellus',  label: 'Marcellus',         css: "'Marcellus', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'cinzel',     label: 'Cinzel',            css: "'Cinzel', 'Frank Ruhl Libre', Georgia, serif" },
    { id: 'josefin',    label: 'Josefin Sans',      css: "'Josefin Sans', 'Noto Sans Hebrew', sans-serif" },
    { id: 'greatvibes', label: 'Great Vibes',       css: "'Great Vibes', 'Frank Ruhl Libre', cursive" },
  ];
  // Familles chargées depuis Google Fonts (poids utiles seulement).
  const FONT_URL = 'https://fonts.googleapis.com/css2?' + [
    'family=Frank+Ruhl+Libre:wght@400;500;700',
    'family=David+Libre:wght@400;500;700',
    'family=Noto+Serif+Hebrew:wght@400;600;700',
    'family=Noto+Sans+Hebrew:wght@400;600;700',
    'family=Alef:wght@400;700',
    'family=Heebo:wght@400;600;700',
    'family=Assistant:wght@400;600;700',
    'family=Miriam+Libre:wght@400;700',
    'family=Suez+One', 'family=Secular+One', 'family=Karantina:wght@400;700', 'family=Amatic+SC:wght@400;700',
    'family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400',
    'family=EB+Garamond:ital,wght@0,400;0,600;1,400',
    'family=Playfair+Display:ital,wght@0,400;0,700;1,400',
    'family=Lora:ital,wght@0,400;0,600;1,400',
    'family=Marcellus',
    'family=Cinzel:wght@400;600',
    'family=Josefin+Sans:ital,wght@0,400;0,600;1,400',
    'family=Great+Vibes',
  ].join('&') + '&display=swap';

  // ------------------------------------------------------------- Thèmes ----
  //  paper/ink : feuille et encre · accent : titres · gold : second ton
  //  he : police hébraïque · latin : titres latins, phonétique, traduction
  //  frame : cadre de page · titleStyle : présentation des titres de chants
  //  sep : séparateur sous le titre · texture : fond de page
  const THEMES = {
    royal:     { label: 'Royal',          paper: '#fbf7ef', ink: '#221a14', accent: '#7b1e3b', gold: '#b8893a', he: 'frank',     latin: 'cormorant',  frame: 'double',  titleStyle: 'classique', sep: 'rule', texture: 'none' },
    fes:       { label: 'Fès',            paper: '#f8f6f0', ink: '#16202e', accent: '#1d4e89', gold: '#c49a3c', he: 'david',     latin: 'marcellus',  frame: 'zellige', titleStyle: 'bandeau',   sep: 'orn',  texture: 'none' },
    desert:    { label: 'Désert',         paper: '#fbf3e4', ink: '#2b1d10', accent: '#9a5a1c', gold: '#c58b3a', he: 'david',     latin: 'lora',       frame: 'arche',   titleStyle: 'classique', sep: 'orn',  texture: 'papier' },
    jerusalem: { label: 'Jérusalem',      paper: '#f5efe2', ink: '#2a241b', accent: '#7d6232', gold: '#b59a5a', he: 'notoserif', latin: 'cinzel',     frame: 'or',      titleStyle: 'cadre',     sep: 'rule', texture: 'papier' },
    olivier:   { label: 'Olivier',        paper: '#f7f8f1', ink: '#1e2416', accent: '#4d6b2f', gold: '#a99248', he: 'frank',     latin: 'ebgaramond', frame: 'filet',   titleStyle: 'aligne',    sep: 'rule', texture: 'none' },
    grenade:   { label: 'Grenade',        paper: '#fff8f5', ink: '#2a1416', accent: '#a3233a', gold: '#d08a3c', he: 'frank',     latin: 'playfair',   frame: 'coins',   titleStyle: 'classique', sep: 'orn',  texture: 'none' },
    ocean:     { label: 'Océan',          paper: '#f3f8fb', ink: '#122330', accent: '#1e5a7b', gold: '#5e9bb5', he: 'notoserif', latin: 'josefin',    frame: 'filet',   titleStyle: 'bandeau',   sep: 'rule', texture: 'none' },
    nuit:      { label: 'Nuit de Chabbat', paper: '#18213a', ink: '#f1ead8', accent: '#e2b75a', gold: '#e2b75a', he: 'frank',    latin: 'cormorant',  frame: 'or',      titleStyle: 'classique', sep: 'orn',  texture: 'points' },
    classique: { label: 'Classique',      paper: '#ffffff', ink: '#1a1a1a', accent: '#2c2c2c', gold: '#8c8c8c', he: 'notoserif', latin: 'ebgaramond', frame: 'none',    titleStyle: 'classique', sep: 'rule', texture: 'none' },
  };
  // Réglages communs à tous les thèmes (modifiables ensuite dans « Style »)
  const THEME_BASE = { size: 1, lead: 1, margin: 'normal', pageNumbers: true, bgImg: null, bgOp: 0.25 };

  // ------------------------------------------------------------ Couleurs ---
  const PAPER_SWATCHES  = ['#ffffff', '#fbf7ef', '#f5efe2', '#fbf3e4', '#f8f6f0', '#f7f8f1', '#f3f8fb', '#fff8f5', '#f6f0fa', '#18213a', '#1f2a20', '#2b1518'];
  const ACCENT_SWATCHES = ['#7b1e3b', '#a3233a', '#9a5a1c', '#b8893a', '#e2b75a', '#4d6b2f', '#0f7a62', '#1e5a7b', '#1d4e89', '#5b3a8c', '#2c2c2c', '#ffffff'];

  // ------------------------------------------------------------ Textures ---
  const hexA = (hex, a) => {
    const h = String(hex || '#000').replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h.slice(0, 6), 16) || 0;
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const svgUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  const TEXTURES = [
    { id: 'none',     label: 'Uni',       css: () => ({ image: 'none', size: 'auto' }) },
    { id: 'papier',   label: 'Papier',    css: (c, g) => ({
      image: `radial-gradient(circle at 100% 0, ${hexA(g, .14)}, transparent 42%), radial-gradient(circle at 0 100%, ${hexA(c, .07)}, transparent 48%)`,
      size: '100% 100%' }) },
    { id: 'points',   label: 'Points',    css: (c) => ({ image: `radial-gradient(${hexA(c, .16)} 1.1px, transparent 1.4px)`, size: '18px 18px' }) },
    { id: 'lignes',   label: 'Lignes',    css: (c) => ({ image: `repeating-linear-gradient(0deg, ${hexA(c, .09)} 0 1px, transparent 1px 24px)`, size: 'auto' }) },
    { id: 'rayures',  label: 'Rayures',   css: (c) => ({ image: `repeating-linear-gradient(45deg, ${hexA(c, .06)} 0 10px, transparent 10px 20px)`, size: 'auto' }) },
    { id: 'losanges', label: 'Losanges',  css: (c) => ({
      image: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 2 26 14 14 26 2 14z" fill="none" stroke="${hexA(c, .16)}" stroke-width="1"/></svg>`), size: '28px 28px' }) },
    { id: 'zellige',  label: 'Zellige',   css: (c) => ({
      image: svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" stroke="${hexA(c, .15)}" stroke-width="1"><path d="M24 6 29 19 42 24 29 29 24 42 19 29 6 24 19 19z"/><rect x="15" y="15" width="18" height="18" transform="rotate(45 24 24)"/></g></svg>`), size: '48px 48px' }) },
    { id: 'vignette', label: 'Halo',      css: (c, g) => ({ image: `radial-gradient(ellipse at center, transparent 55%, ${hexA(g, .22)} 100%)`, size: '100% 100%' }) },
  ];

  // ----------------------------------------------- Modèles de texte libre --
  //  font : 'he' / 'latin' = police du thème ; sinon id de FONTS.
  //  color : 'accent' / 'ink' / 'gold' = couleur du thème ; sinon #hex.
  const TEXT_PRESETS = [
    { id: 'titre',     label: 'Titre',            text: 'Chabbat Chalom',     font: 'latin', size: 40, color: 'accent', weight: 600, w: 440 },
    { id: 'titre-he',  label: 'Titre en hébreu',  text: 'שַׁבָּת שָׁלוֹם',     font: 'he',    size: 46, color: 'accent', weight: 700, w: 420 },
    { id: 'sous-titre',label: 'Sous-titre',       text: 'Famille Cohen · 5787', font: 'latin', size: 20, color: 'ink', italic: true, w: 420 },
    { id: 'paragraphe',label: 'Paragraphe',       text: 'Écrivez ici un mot d’accueil, une dédicace ou une explication.', font: 'latin', size: 15, color: 'ink', w: 420, align: 'left', lead: 1.5 },
    { id: 'dedicace',  label: 'Dédicace',         text: 'לְעִלּוּי נִשְׁמַת', font: 'he', size: 26, color: 'accent', w: 360 },
    { id: 'legende',   label: 'Légende',          text: 'Légende de la photo', font: 'latin', size: 12, color: 'ink', italic: true, w: 300 },
    { id: 'calli',     label: 'Calligraphie',     text: 'Mazal Tov', font: 'greatvibes', size: 54, color: 'gold', w: 440 },
  ];

  // ------------------------------------------------------- Couverture ------
  //  Chaque mise en page renvoie la liste des éléments libres de la couverture.
  //  role:'title' / 'subtitle' : textes reliés aux champs « Titre / Sous-titre ».
  const COVER_LAYOUTS = [
    { id: 'centre', label: 'Classique', build: (t, s) => [
      { type: 'orn', orn: 'magen-david', x: 280, y: 132, w: 80, h: 80, color: 'accent' },
      { type: 'text', role: 'title', text: t, font: 'latin', size: 50, color: 'accent', weight: 600, x: 70, y: 250, w: 500 },
      { type: 'text', role: 'subtitle', text: s, font: 'latin', size: 20, color: 'ink', italic: true, x: 100, y: 340, w: 440 },
      { type: 'orn', orn: 'sep-diamond', x: 200, y: 400, w: 240, h: 32, color: 'gold' },
    ] },
    { id: 'photo', label: 'Grande photo', build: (t, s) => [
      { type: 'image', x: 0, y: 0, w: 640, h: 400, fit: 'cover' },
      { type: 'text', role: 'title', text: t, font: 'latin', size: 46, color: 'accent', weight: 600, x: 60, y: 440, w: 520 },
      { type: 'text', role: 'subtitle', text: s, font: 'latin', size: 19, color: 'ink', italic: true, x: 90, y: 520, w: 460 },
    ] },
    { id: 'arche', label: 'Arche', build: (t, s) => [
      { type: 'image', x: 190, y: 70, w: 260, h: 320, fit: 'cover', shape: 'arch', border: 6, borderColor: 'gold' },
      { type: 'text', role: 'title', text: t, font: 'latin', size: 44, color: 'accent', weight: 600, x: 70, y: 420, w: 500 },
      { type: 'text', role: 'subtitle', text: s, font: 'latin', size: 18, color: 'ink', italic: true, x: 100, y: 500, w: 440 },
    ] },
    { id: 'typo', label: 'Hébreu', build: (t, s) => [
      { type: 'text', text: 'בִּרְכּוֹן', font: 'he', size: 120, color: 'accent', weight: 700, x: 60, y: 140, w: 520 },
      { type: 'orn', orn: 'sep-star', x: 200, y: 330, w: 240, h: 32, color: 'gold' },
      { type: 'text', role: 'title', text: t, font: 'latin', size: 34, color: 'ink', weight: 600, x: 70, y: 380, w: 500 },
      { type: 'text', role: 'subtitle', text: s, font: 'latin', size: 18, color: 'ink', italic: true, x: 100, y: 440, w: 440 },
    ] },
    { id: 'medaillon', label: 'Médaillon', build: (t, s) => [
      { type: 'image', x: 220, y: 90, w: 200, h: 200, fit: 'cover', shape: 'circle', border: 5, borderColor: 'gold' },
      { type: 'text', role: 'title', text: t, font: 'latin', size: 46, color: 'accent', weight: 600, x: 70, y: 330, w: 500 },
      { type: 'orn', orn: 'sep-diamond', x: 220, y: 408, w: 200, h: 28, color: 'gold' },
      { type: 'text', role: 'subtitle', text: s, font: 'latin', size: 19, color: 'ink', italic: true, x: 100, y: 450, w: 440 },
    ] },
  ];

  // ------------------------------------------------------ Pages libres -----
  const PAGE_LAYOUTS = [
    { id: 'vide',   label: 'Page vierge', build: () => [] },
    { id: 'photo1', label: '1 photo', build: () => [
      { type: 'image', x: 60, y: 60, w: 520, h: 520, fit: 'cover', radius: 6 } ] },
    { id: 'photo2', label: '2 photos', build: () => [
      { type: 'image', x: 50, y: 120, w: 260, h: 400, fit: 'cover', radius: 6 },
      { type: 'image', x: 330, y: 120, w: 260, h: 400, fit: 'cover', radius: 6 } ] },
    { id: 'photo4', label: '4 photos', build: () => [
      { type: 'image', x: 56, y: 56, w: 258, h: 258, fit: 'cover', radius: 6 },
      { type: 'image', x: 326, y: 56, w: 258, h: 258, fit: 'cover', radius: 6 },
      { type: 'image', x: 56, y: 326, w: 258, h: 258, fit: 'cover', radius: 6 },
      { type: 'image', x: 326, y: 326, w: 258, h: 258, fit: 'cover', radius: 6 } ] },
    { id: 'photoTexte', label: 'Photo + texte', build: () => [
      { type: 'image', x: 60, y: 60, w: 520, h: 340, fit: 'cover', radius: 6 },
      { type: 'text', text: 'Un souvenir, une pensée…', font: 'latin', size: 24, color: 'accent', weight: 600, x: 70, y: 430, w: 500 },
      { type: 'text', text: 'Écrivez ici quelques lignes.', font: 'latin', size: 15, color: 'ink', x: 90, y: 480, w: 460, lead: 1.5 } ] },
    { id: 'dedicace', label: 'Dédicace', build: () => [
      { type: 'orn', orn: 'magen-david', x: 285, y: 150, w: 70, h: 70, color: 'gold' },
      { type: 'text', text: 'לְעִלּוּי נִשְׁמַת', font: 'he', size: 34, color: 'accent', weight: 700, x: 120, y: 250, w: 400 },
      { type: 'text', text: 'Prénom fils / fille de …', font: 'latin', size: 22, color: 'ink', italic: true, x: 120, y: 320, w: 400 },
      { type: 'orn', orn: 'sep-diamond', x: 220, y: 380, w: 200, h: 28, color: 'gold' } ] },
    { id: 'arche', label: 'Arche', build: () => [
      { type: 'image', x: 170, y: 60, w: 300, h: 400, fit: 'cover', shape: 'arch', border: 6, borderColor: 'gold' },
      { type: 'text', text: 'Légende', font: 'latin', size: 20, color: 'accent', italic: true, x: 120, y: 490, w: 400 } ] },
  ];

  // Formes simples (fonds de titre, bandeaux, cercles)
  const SHAPES = [
    { id: 'rect',   label: 'Rectangle', w: 300, h: 120, radius: 0 },
    { id: 'round',  label: 'Arrondi',   w: 300, h: 120, radius: 24 },
    { id: 'circle', label: 'Cercle',    w: 180, h: 180, radius: 999 },
    { id: 'band',   label: 'Bandeau',   w: 640, h: 90,  radius: 0 },
    { id: 'line',   label: 'Trait',     w: 300, h: 3,   radius: 0 },
  ];

  window.BK_DESIGN = { FONTS, FONT_URL, THEMES, THEME_BASE, PAPER_SWATCHES, ACCENT_SWATCHES, TEXTURES, TEXT_PRESETS, COVER_LAYOUTS, PAGE_LAYOUTS, SHAPES, hexA };
})();
