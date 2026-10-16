// ============================================================================
//  Birkonishi — translittération automatique de l'hébreu vocalisé
// ----------------------------------------------------------------------------
//  Prononciation séfarade, orthographe pensée pour un lecteur francophone :
//    שׁ → ch · ח → 'h · כ (sans daguech) → kh · צ → ts · וּ/ֻ → ou
//    tséré / ségol → é · chva prononcé → e · daguech fort → consonne doublée
//  Le qamats qatan (ׇ) se lit « o » ; « כָּל » se lit toujours « kol ».
//  Le Nom divin (יְיָ, ה׳) se lit « Adonaï ».
// ============================================================================
(function () {
  'use strict';

  const P = {
    SHVA: 'ְ', HSEGOL: 'ֱ', HPATAH: 'ֲ', HQAMATS: 'ֳ', HIRIK: 'ִ',
    TSERE: 'ֵ', SEGOL: 'ֶ', PATAH: 'ַ', QAMATS: 'ָ', HOLAM: 'ֹ',
    HOLAM_V: 'ֺ', QUBUTS: 'ֻ', DAGESH: 'ּ', SHIN: 'ׁ', SIN: 'ׂ',
    QATAN: 'ׇ',
  };
  const VOWEL = {
    [P.QAMATS]: ['a', true], [P.QATAN]: ['o', false], [P.PATAH]: ['a', false],
    [P.HPATAH]: ['a', false], [P.HQAMATS]: ['o', false], [P.HSEGOL]: ['é', false],
    [P.TSERE]: ['é', true], [P.SEGOL]: ['é', false], [P.HIRIK]: ['i', false],
    [P.HOLAM]: ['o', true], [P.HOLAM_V]: ['o', true], [P.QUBUTS]: ['ou', false],
  };
  const isLetter = (c) => c >= 'א' && c <= 'ת';
  const isMark = (c) => c >= '֑' && c <= 'ׇ' && c !== '־' && c !== '׀' && c !== '׃' && c !== '׆';
  const SINGLE = /^[a-z]$/;

  function clusters(word) {
    const out = [];
    for (const ch of word) {
      if (isLetter(ch)) out.push({ l: ch, m: new Set() });
      else if (isMark(ch) && out.length) out[out.length - 1].m.add(ch);
    }
    out.forEach((c) => {
      c.dagesh = c.m.has(P.DAGESH);
      c.v = null; c.long = false;
      for (const k of c.m) if (VOWEL[k]) { c.v = VOWEL[k][0]; c.long = VOWEL[k][1]; }
      if (c.m.has(P.SHVA)) c.v = 'shva';
      c.out = null;          // rendu forcé (null = calculé)
      c.skip = false;
    });
    return out;
  }

  function consonant(c) {
    const d = c.dagesh;
    switch (c.l) {
      case 'א': case 'ע': return '';
      case 'ב': return d ? 'b' : 'v';
      case 'ג': return 'g';
      case 'ד': return 'd';
      case 'ה': return 'h';
      case 'ו': return 'v';
      case 'ז': return 'z';
      case 'ח': return "'h";
      case 'ט': case 'ת': return 't';
      case 'י': return 'y';
      case 'כ': case 'ך': return d ? 'k' : 'kh';
      case 'ל': return 'l';
      case 'מ': case 'ם': return 'm';
      case 'נ': case 'ן': return 'n';
      case 'ס': return 's';
      case 'פ': case 'ף': return d ? 'p' : 'f';
      case 'צ': case 'ץ': return 'ts';
      case 'ק': return 'k';
      case 'ר': return 'r';
      case 'ש': return c.m.has(P.SIN) ? 's' : 'ch';
      default: return '';
    }
  }

  function word(w) {
    const bare = w.replace(/[^א-ת]/g, '');
    if (bare === 'יי' || bare === 'ה' && /׳|'/.test(w)) return 'Adonaï';
    const C = clusters(w);
    if (!C.length) return w;
    const last = C.length - 1;

    // « kol » : כָּל en fin de mot
    C.forEach((c, i) => {
      if (c.l === 'כ' && (c.m.has(P.QAMATS) || c.m.has(P.QATAN)) && i === last - 1 && C[last].l === 'ל' && C[last].v === null) {
        c.v = 'o'; c.long = false;
      }
    });

    // Lettres-voyelles (matres lectionis)
    for (let i = 0; i < C.length; i++) {
      const c = C[i], prev = C[i - 1];
      if (c.l === 'ו' && c.v === 'o' && !c.dagesh) {           // וֹ
        if (prev && prev.v === null && !prev.skip) { prev.v = 'o'; prev.long = true; c.skip = true; }
        else if (!prev) { c.out = 'o'; }
      } else if (c.l === 'ו' && c.dagesh && c.v === null) {     // וּ
        if (prev && prev.v === null && !prev.skip) { prev.v = 'ou'; prev.long = true; c.skip = true; }
        else { c.out = 'ou'; c.initialU = !prev; c.long = true; c.v = 'ou'; }
      } else if (c.l === 'י' && c.v === null && !c.dagesh && prev) {
        // voyelle qui précède (en sautant un א muet : יוֹחַאי → Yo'haï)
        const pv = (prev.l === 'א' && prev.v === null && C[i - 2]) ? C[i - 2].v : prev.v;
        if (pv === 'i' || pv === 'é') { prev.long = true; c.skip = true; }
        else if (i === last - 1 && C[last].l === 'ו' && C[last].v === null && pv === 'a') {
          c.skip = true; C[last].out = 'v';                      // ָיו → av
        } else if (i === last && pv) { c.out = 'ï'; }             // ַי → aï
      } else if ((c.l === 'א' || c.l === 'ע') && c.v === null) {
        c.out = '';
      } else if (c.l === 'ה' && i === last && c.v === null) {
        c.out = c.dagesh ? 'h' : '';                              // mappiq
      }
    }

    const live = C.filter((c) => !c.skip);

    // Patah furtif (רוּחַ → roua'h, מָשִׁיחַ → machia'h)
    const L = live[live.length - 1], BL = live[live.length - 2];
    if (L.v === 'a' && (L.l === 'ח' || L.l === 'ע' || (L.l === 'ה' && L.dagesh)) && BL && BL.v && BL.v !== 'shva') {
      L.furtive = true;
    }

    // Chva : prononcé (na) ou muet (na'h) — décidé sur l'état d'origine
    const wasShva = live.map((c) => c.v === 'shva');
    live.forEach((c, k) => {
      if (!wasShva[k]) return;
      const prev = live[k - 1];
      let na;
      if (k === live.length - 1) na = false;
      else if (!prev) na = true;
      else if (prev.initialU) na = false;                         // וּבְ… → ouv…
      else if (wasShva[k - 1]) na = k - 1 > 0;                    // 2ᵉ de deux chva
      else if (c.dagesh && prev.v) na = true;                     // daguech fort
      else na = !!prev.long;
      c.v = na ? 'e' : '';
    });

    // Syllabe fermée : é → e (מֶלֶךְ → mélekh, עֲלֵיכֶם → alékhem)
    const silent = (c) => c.out === '' || ((c.l === 'א' || c.l === 'ע') && !c.v);
    live.forEach((c, k) => {
      if (c.v !== 'é' || c.m.has(P.HSEGOL)) return;
      const n = live[k + 1];
      if (n && !silent(n) && (n.v === '' || n.v === null) && !n.furtive && n.out !== 'ï') c.v = 'e';
    });

    // Assemblage
    let s = '';
    live.forEach((c, k) => {
      if (c.out !== null && c.out !== undefined && c.l !== 'א' && c.l !== 'ע') { s += c.out; return; }
      let cons = consonant(c);
      const prev = live[k - 1];
      const hazak = c.dagesh && prev && prev.v && prev.v !== 'e' && prev.v !== '' && c.l !== 'ה' && c.l !== 'ו';
      if (hazak && SINGLE.test(cons)) cons += cons;
      const v = c.v === null ? '' : c.v;
      if (c.furtive) { s += v + cons; return; }
      // coup de glotte : א/ע prononcés (avec voyelle), ou ע fermant une syllabe
      if (!cons && s && (v || (c.l === 'ע' && c.v === '' && /[aeéiouï]$/.test(s)))) s += "'";
      s += cons + v;
    });
    return s.replace(/''+/g, "'").replace(/'$/, '');
  }

  // Sigles avec guerchayim (יַ״ג, לֵ״ב, יָ״הּ…) : lus lettre par lettre.
  const ACRO = {
    'יג': 'yod-guimel', 'ביג': 'biyod-guimel', 'לב': 'lamed-beit', 'יה': 'Yah', 'ביה': 'beYah',
    'שין': 'chin', 'יוד': 'yod',
  };
  const W = '(?:[א-ת][֑-ׇ]*)+';
  const ACRO_RE = new RegExp('(' + W + ')[״"](' + W + ')', 'g');

  function line(he) {
    let out = he
      .replace(ACRO_RE, (m, x, y) => {
        const bare = (x + y).replace(/[^א-ת]/g, '');
        return (ACRO[bare] || word(x + y));
      })
      .replace(/[־]/g, '-')
      .replace(/([א-ת][֑-ׇ]*)+/g, (w) => word(w));
    out = out.replace(/\s+/g, ' ').trim();
    // Majuscule en début de chaque vers
    return out.split(' / ').map((seg) => seg.replace(/^([^a-zA-Zéèï]*)([a-zéèï])/, (m, a, b) => a + b.toUpperCase())).join(' / ');
  }

  if (typeof window !== 'undefined') window.transliterate = line;
  if (typeof module !== 'undefined') module.exports = { transliterate: line };
})();
