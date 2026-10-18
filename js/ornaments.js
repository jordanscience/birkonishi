// ============================================================================
//  Birkonishi — bibliothèque d'ornements SVG (symboles, motifs, séparateurs,
//  coins, cadres photo) et cadres de page (640×640).
//  Couleur principale = currentColor ; couleur secondaire (or) = classes
//  .g2 (remplissage) / .s2 (trait). Aucune couleur codée en dur.
// ============================================================================
(function () {
  'use strict';

  // ---------- helpers ----------
  const f = (n) => Math.round(n * 100) / 100;
  const rad = (d) => d * Math.PI / 180;
  const P = (pts) => pts.map((p) => f(p[0]) + ',' + f(p[1])).join(' ');
  // stroke attrs (accent / gold)
  const S = (w) => `fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  const G = (w) => `class="s2" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  const F = 'fill="currentColor"';
  const GF = 'class="g2" fill="currentColor"';
  const mirrorX = (w, s) => `<g transform="matrix(-1 0 0 1 ${w} 0)">${s}</g>`;

  // star polygon: n branches, outer R, inner r, first tip pointing up (+rot°)
  function starPts(cx, cy, R, r, n, rot) {
    const out = [];
    for (let i = 0; i < 2 * n; i++) {
      const a = rad(-90 + (rot || 0) + i * 180 / n);
      const rr = i % 2 ? r : R;
      out.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
    }
    return P(out);
  }
  // 8-point star made of two squares ({8/2}) or sharper ({8/3})
  const star8 = (cx, cy, R, rot, sharp) => starPts(cx, cy, R, R * (sharp ? 0.541 : 0.765), 8, rot);
  function hexagram(cx, cy, R, attrs) {
    const tri = (a0) => P([0, 120, 240].map((a) => [cx + R * Math.cos(rad(a0 + a)), cy + R * Math.sin(rad(a0 + a))]));
    return `<polygon points="${tri(-90)}" ${attrs}/><polygon points="${tri(90)}" ${attrs}/>`;
  }
  // leaf from (x,y) pointing at angle a (deg), length l, half-width w
  function leaf(x, y, a, l, w, attrs) {
    return `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})" d="M0 0C${f(l * .3)} ${f(-w)} ${f(l * .72)} ${f(-w)} ${f(l)} 0C${f(l * .72)} ${f(w)} ${f(l * .3)} ${f(w)} 0 0Z" ${attrs}/>`;
  }
  function bez(p, t) {
    const u = 1 - t;
    const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
    const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
    const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
    const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
    return { x, y, a: Math.atan2(dy, dx) * 180 / Math.PI };
  }
  const bezD = (p) => `M${P([p[0]])}C${P([p[1], p[2], p[3]])}`;
  const diamond = (cx, cy, rx, ry) => P([[cx, cy - ry], [cx + rx, cy], [cx, cy + ry], [cx - rx, cy]]);

  // ======================= SYMBOLES =======================

  // Maguen David : double filet
  const magen = hexagram(50, 52, 45, S(4.2).replace('stroke-linejoin="round"', 'stroke-linejoin="miter"')) +
    hexagram(50, 52, 35, G(1.6).replace('stroke-linejoin="round"', 'stroke-linejoin="miter"')) +
    `<circle cx="50" cy="52" r="3" ${GF}/>`;

  // Menorah
  const menorah = (() => {
    let s = `<path d="M50 24V82" ${S(3.6)}/>`;
    [10, 20, 30].forEach((r) => {
      s += `<path d="M${50 - r} 24A${r} ${r} 0 0 0 ${50 + r} 24" ${S(3.6)}/>`;
    });
    // knobs on stem / arms
    [[50, 34], [50, 44], [50, 54], [50, 66]].forEach((p) => { s += `<ellipse cx="${p[0]}" cy="${p[1]}" rx="3.4" ry="2.2" ${F}/>`; });
    [-30, -20, -10, 0, 10, 20, 30].forEach((dx) => {
      const x = 50 + dx;
      s += `<path d="M${x - 4.6} 20.5H${x + 4.6}L${x + 2.4} 25H${x - 2.4}Z" ${F}/>`;
      s += `<path d="M${x} 6.5C${x + 3.6} 10.5 ${x + 3.4} 16 ${x} 18C${x - 3.4} 16 ${x - 3.6} 10.5 ${x} 6.5Z" ${GF}/>`;
    });
    s += `<path d="M44 82H56L60 88H40Z" ${F}/><path d="M33 94H67L64 89H36Z" ${F}/>`;
    return s;
  })();

  // 'Hamsa
  const hamsaHalf = 'M50 93C40 93 30 90 26 82C22 76 15 71 12.5 61C10.5 54 11.5 47 15.5 45.5C20 44 23.5 48 25.5 53C27 56 29 58 31 58V23.5A5.5 5.5 0 0 1 42 23.5V45Q43.25 47.5 44.5 45V16.5A5.5 5.5 0 0 1 50 11';
  const hamsa = `<path d="${hamsaHalf}" ${S(3.2)}/>` + mirrorX(100, `<path d="${hamsaHalf}" ${S(3.2)}/>`) +
    `<path d="M33 71Q50 56 67 71Q50 86 33 71Z" ${S(2.6)}/>` +
    `<circle cx="50" cy="71" r="6" ${GF}/><circle cx="50" cy="71" r="2.4" ${F}/>` +
    `<path d="M36.5 34V40M50 27V33M63.5 34V40" ${G(1.8)}/>` +
    `<circle cx="50" cy="51" r="2" ${GF}/><circle cx="43" cy="53.5" r="1.5" ${GF}/><circle cx="57" cy="53.5" r="1.5" ${GF}/>`;

  // Couronne de Torah
  const keter = `<path d="M21 74L13 38L24 56L32 28L41 50L50 17L59 50L68 28L76 56L87 38L79 74Z" ${S(3)}/>` +
    `<rect x="18" y="74" width="64" height="11" rx="2.5" ${S(3)}/>` +
    [13, 32, 50, 68, 87].map((x, i) => `<circle cx="${x}" cy="${[38, 28, 17, 28, 38][i] - 4.5}" r="3.8" ${GF} stroke="currentColor" stroke-width="1.6"/>`).join('') +
    [28, 39.5, 50, 60.5, 72].map((x, i) => i % 2 ? `<polygon points="${diamond(x, 79.5, 3, 3)}" ${GF}/>` : `<circle cx="${x}" cy="79.5" r="2.4" ${GF}/>`).join('') +
    `<path d="M24 66H76" ${G(1.6)}/><polygon points="${diamond(50, 36, 2.6, 4.2)}" ${GF}/>` +
    `<path d="M30 85V91M50 85V93M70 85V91" ${S(2)}/><circle cx="30" cy="92" r="2" ${F}/><circle cx="50" cy="94.5" r="2" ${F}/><circle cx="70" cy="92" r="2" ${F}/>`;

  // Coupe de Kiddouch
  const kiddush = `<path d="M31 29H69C67.5 44 59 51 50 51C41 51 32.5 44 31 29Z" ${GF}/>` +
    `<path d="M26 16H74C74 40 63 55 50 55C37 55 26 40 26 16Z" ${S(3.2)}/>` +
    `<path d="M29 23H71" ${S(1.6)}/>` +
    `<path d="M50 55V80" ${S(3.4)}/><ellipse cx="50" cy="66" rx="5" ry="3.2" ${F}/>` +
    `<path d="M50 80C44 82 36 85 32 90H68C64 85 56 82 50 80Z" ${S(3)}/>` +
    `<path d="M38 36Q40 43 45 46" ${S(1.6)}/>`;

  // Bougies de Chabbat
  const candles = [33, 67].map((x) =>
    `<path d="M${x} 6C${x + 4.5} 11 ${x + 4.2} 18 ${x} 21C${x - 4.2} 18 ${x - 4.5} 11 ${x} 6Z" ${GF}/>` +
    `<path d="M${x} 13C${x + 1.6} 15.5 ${x + 1.4} 18.5 ${x} 19.6C${x - 1.4} 18.5 ${x - 1.6} 15.5 ${x} 13Z" ${F}/>` +
    `<path d="M${x} 21V24" ${S(1.4)}/>` +
    `<rect x="${x - 5}" y="24" width="10" height="27" rx="1.2" ${S(2.6)}/>` +
    `<path d="M${x - 10} 51H${x + 10}C${x + 9} 56 ${x + 5} 58 ${x} 58C${x - 5} 58 ${x - 9} 56 ${x - 10} 51Z" ${S(2.6)}/>` +
    `<path d="M${x} 58V82" ${S(3.2)}/><ellipse cx="${x}" cy="66" rx="4" ry="2.6" ${F}/><ellipse cx="${x}" cy="75" rx="3" ry="2" ${F}/>` +
    `<path d="M${x} 82C${x - 4} 84 ${x - 10} 86 ${x - 12} 91H${x + 12}C${x + 10} 86 ${x + 4} 84 ${x} 82Z" ${S(2.6)}/>` +
    `<path d="M${x - 9} 9L${x - 12} 6.5M${x + 9} 9L${x + 12} 6.5M${x - 10} 17H${x - 13.5}M${x + 10} 17H${x + 13.5}" ${G(1.4)}/>`
  ).join('');

  // Tables de la Loi
  const tablet = (x0, letters) => {
    const w = 30, r = w / 2, cx = x0 + r;
    let s = `<path d="M${x0} 88V34A${r} ${r} 0 0 1 ${x0 + w} 34V88Z" ${S(3)}/>`;
    s += `<path d="M${x0 + 4} 84V35A${r - 4} ${r - 4} 0 0 1 ${x0 + w - 4} 35V84Z" ${G(1.2)}/>`;
    letters.forEach((l, i) => {
      s += `<text x="${cx}" y="${38 + i * 10.6}" text-anchor="middle" font-family="'Frank Ruhl Libre','David',serif" font-size="9.5" font-weight="700" ${F}>${l}</text>`;
    });
    return s;
  };
  const tablets = tablet(19, ['ו', 'ז', 'ח', 'ט', 'י']) + tablet(51, ['א', 'ב', 'ג', 'ד', 'ה']);

  // Grenade
  const grenade = `<path d="M40 31C22 35 14 50 17 65C20 81 34 91 50 91C66 91 80 81 83 65C86 50 78 35 60 31" ${S(3.2)}/>` +
    `<path d="M40 31L36 15L44 22L50 11L56 22L64 15L60 31" ${S(3)}/>` +
    `<path d="M41 31Q50 35 59 31" ${S(2)}/>` +
    `<path d="M26 56C25 71 35 81 47 83" ${G(2.2)}/><path d="M44 35C36 48 35 70 44 89M56 35C64 48 65 70 56 89" ${S(1.3)}/>` +
    leaf(62, 22, -25, 22, 5.5, F) + `<path d="M64 21.5L80 14" ${G(1)}/>`;

  // Branche d'olivier
  const olive = (() => {
    const c = [[16, 88], [30, 70], [52, 40], [84, 14]];
    let s = `<path d="${bezD(c)}" ${S(2.8)}/>`;
    const ts = [0.16, 0.27, 0.38, 0.49, 0.6, 0.71, 0.82, 0.92];
    ts.forEach((t, i) => {
      const b = bez(c, t);
      const side = i % 2 ? 1 : -1;
      s += leaf(b.x, b.y, b.a + side * 42, 17 - t * 4, 4.3, F);
      s += `<path transform="translate(${f(b.x)} ${f(b.y)}) rotate(${f(b.a + side * 42)})" d="M2 0H${f(13 - t * 4)}" class="s2" fill="none" stroke="currentColor" stroke-width=".8"/>`;
    });
    const e = bez(c, 1);
    s += leaf(e.x, e.y, e.a, 13, 3.8, F);
    [[0.33, 1], [0.55, -1], [0.75, 1]].forEach((o) => {
      const b = bez(c, o[0]);
      const a = rad(b.a + o[1] * 90);
      const ox = b.x + 9 * Math.cos(a), oy = b.y + 9 * Math.sin(a);
      s += `<path d="M${f(b.x)} ${f(b.y)}L${f(ox)} ${f(oy)}" ${S(1.2)}/><ellipse cx="${f(ox + 3 * Math.cos(a))}" cy="${f(oy + 3 * Math.sin(a))}" rx="4" ry="5.2" transform="rotate(${f(b.a)} ${f(ox + 3 * Math.cos(a))} ${f(oy + 3 * Math.sin(a))})" ${GF} stroke="currentColor" stroke-width="1.2"/>`;
    });
    return s;
  })();

  // Colombe (avec rameau d'olivier)
  const colombe = `<path d="M39 50C41 34 50 19 68 9C66 17 69 18 75 14C73 22 77 24 84 22C78 36 67 47 55 51Z" ${F}/>` +
    `<path d="M44 49C38 38 36 27 39 15C45 25 51 35 54 47Z" ${GF}/>` +
    `<path d="M9 46L19 42.5C21 35 29 32.5 34 37.5C38 43 44 48 56 48C67 48 78 45 92 38L86 48L95 50L82 57C72 64 59 68 47 68C35 68 26 61 21.5 50Z" ${F}/>` +
    `<circle cx="26" cy="40.5" r="1.8" ${GF}/>` +
    `<path d="M47 59C55 62 64 61 72 57" ${G(1.4)}/>` +
    `<path d="M13 46.5Q11 54 13 63" ${G(1.6)}/>` + leaf(12, 51, 195, 8, 2.6, GF) + leaf(12, 55, 20, 8, 2.6, GF) + leaf(12.5, 59.5, 200, 7.5, 2.4, GF) + leaf(13, 63, 70, 6, 2.2, GF);

  // Chofar
  const chofar = (() => {
    const c = [[12, 62], [22, 96], [88, 92], [76, 22]];
    const N = 40, L = [], R = [];
    const hw = (t) => 1.6 + 9.5 * Math.pow(t, 1.5);
    for (let i = 0; i <= N; i++) {
      const t = i / N, b = bez(c, t), a = rad(b.a + 90), h = hw(t);
      L.push([b.x + h * Math.cos(a), b.y + h * Math.sin(a)]);
      R.push([b.x - h * Math.cos(a), b.y - h * Math.sin(a)]);
    }
    let s = `<path d="M${P(L)} ${P(R.reverse())}Z" ${F} stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>`;
    s += `<circle cx="${c[0][0]}" cy="${c[0][1]}" r="2.2" ${F}/>`;
    [0.3, 0.45, 0.6, 0.72, 0.84].forEach((t) => {
      const b = bez(c, t), a = rad(b.a + 90), h = hw(t) - 0.6;
      s += `<path d="M${f(b.x + h * Math.cos(a))} ${f(b.y + h * Math.sin(a))}Q${f(b.x + 2.5 * Math.cos(rad(b.a)))} ${f(b.y + 2.5 * Math.sin(rad(b.a)))} ${f(b.x - h * Math.cos(a))} ${f(b.y - h * Math.sin(a))}" ${G(1.3)}/>`;
    });
    const e = bez(c, 1), h = hw(1);
    s += `<ellipse cx="${f(e.x)}" cy="${f(e.y)}" rx="${f(h)}" ry="${f(h * .38)}" transform="rotate(${f(e.a + 90)} ${f(e.x)} ${f(e.y)})" ${GF} stroke="currentColor" stroke-width="1.6"/>`;
    return s;
  })();

  // Rouleau de Torah
  const torah = (() => {
    let s = '';
    [23, 77].forEach((x) => {
      s += `<path d="M${x} 6V22M${x} 78V94" ${S(3)}/>`;
      s += `<path d="M${x} 3C${x + 3} 5 ${x + 3} 9 ${x} 10C${x - 3} 9 ${x - 3} 5 ${x} 3Z" ${GF}/>`;
      s += `<rect x="${x - 10}" y="18" width="20" height="4" rx="2" ${F}/><rect x="${x - 10}" y="78" width="20" height="4" rx="2" ${F}/>`;
      s += `<rect x="${x - 7.5}" y="22" width="15" height="56" rx="4" ${S(2.6)}/>`;
      s += `<path d="M${x - 3} 27V73" ${G(1.4)}/>`;
      s += `<circle cx="${x}" cy="95" r="2.4" ${F}/>`;
    });
    s += `<path d="M30.5 27H69.5M30.5 73H69.5" ${S(2.4)}/>`;
    [[35, 47], [53, 65]].forEach((col) => {
      for (let y = 33; y <= 67; y += 5.5) s += `<path d="M${col[0]} ${y}H${col[1]}" ${S(1.6)}/>`;
    });
    return s;
  })();

  // 'Hallot : deux pains tressés (vue de dessus)
  const loaf = (cx, cy, L, H) => {
    const n = 9, sp = L / (n + 1);
    let s = `<ellipse cx="${f(cx - L / 2 + sp * .55)}" cy="${cy}" rx="${f(sp * .9)}" ry="${f(H * .2)}" ${GF} stroke="currentColor" stroke-width="1.8"/>`;
    s += `<ellipse cx="${f(cx + L / 2 - sp * .55)}" cy="${cy}" rx="${f(sp * .9)}" ry="${f(H * .2)}" ${GF} stroke="currentColor" stroke-width="1.8"/>`;
    for (let i = 0; i < n; i++) {
      const x = cx - L / 2 + sp * (i + 1), u = (x - cx) / (L / 2);
      const sc = 0.5 + 0.5 * Math.sqrt(Math.max(0, 1 - u * u));
      const top = i % 2 === 0, y = cy + (top ? -1 : 1) * H * 0.2 * sc;
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(H * .36 * sc)}" ry="${f(H * .21 * sc)}" transform="rotate(${top ? 48 : -48} ${f(x)} ${f(y)})" ${GF} stroke="currentColor" stroke-width="1.8"/>`;
    }
    return s;
  };
  const hallot = loaf(50, 36, 68, 26) + loaf(50, 62, 80, 30) +
    `<path d="M8 84Q50 92 92 84" ${S(2.6)}/><path d="M18 91Q50 97 82 91" ${G(1.4)}/>`;

  // Lune & étoiles
  const lune = (() => {
    const c1 = [44, 54], r1 = 34, c2 = [60, 40], r2 = 29;
    const dx = c2[0] - c1[0], dy = c2[1] - c1[1], d = Math.hypot(dx, dy);
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(r1 * r1 - a * a);
    const mx = c1[0] + a * dx / d, my = c1[1] + a * dy / d;
    const p1 = [mx + h * dy / d, my - h * dx / d], p2 = [mx - h * dy / d, my + h * dx / d];
    let s = `<path d="M${P([p1])}A${r1} ${r1} 0 1 0 ${P([p2])}A${r2} ${r2} 0 0 1 ${P([p1])}Z" ${F}/>`;
    s += `<polygon points="${starPts(68, 34, 7, 2.8, 5, 0)}" ${GF}/>`;
    s += `<polygon points="${starPts(86, 20, 5, 2, 5, 15)}" ${GF}/>`;
    s += `<polygon points="${starPts(87, 54, 4.5, 1.8, 5, -10)}" ${GF}/>`;
    s += `<path d="M76 10V16M73 13H79" ${G(1.4)}/><circle cx="92" cy="38" r="1.4" ${GF}/>`;
    return s;
  })();

  // ======================= MOTIFS =======================

  const zellige = `<circle cx="50" cy="50" r="47" ${S(1.4)}/><circle cx="50" cy="50" r="43.5" ${G(1)}/>` +
    `<polygon points="${star8(50, 50, 41, 0)}" ${S(2.8)}/>` +
    `<polygon points="${star8(50, 50, 29, 22.5, true)}" ${GF}/>` +
    `<polygon points="${starPts(50, 50, 31.4, 31.4 * 0.924, 8, 22.5)}" ${S(1.4)}/>` +
    `<polygon points="${star8(50, 50, 14, 0, true)}" ${F}/><circle cx="50" cy="50" r="3" ${GF}/>` +
    Array.from({ length: 8 }, (_, i) => {
      const a = rad(-90 + i * 45);
      return `<circle cx="${f(50 + 45.2 * Math.cos(a))}" cy="${f(50 + 45.2 * Math.sin(a))}" r="1.6" ${F}/>`;
    }).join('');

  const etoile8 = `<polygon points="${star8(50, 50, 46, 0)}" ${F}/>` +
    `<polygon points="${star8(50, 50, 34, 0)}" ${G(1.6)}/>` +
    `<polygon points="${star8(50, 50, 17, 22.5, true)}" ${GF}/><circle cx="50" cy="50" r="4" ${F}/>`;

  const arabesqueHalf = `<path d="M50 50C40 47 31 38 33 25C41 30 47 39 50 50Z" ${GF} stroke="currentColor" stroke-width="1.6"/>` +
    `<path d="M50 84C37 86 20 80 16 64C13 52 21 43 30 46C38 49 37 60 29 59C24 58 24 53 27 52" ${S(2.6)}/>` +
    `<path d="M46 72C38 70 34 64 37 58" ${S(1.8)}/>` +
    leaf(22, 76, 150, 14, 4, F) + leaf(16, 58, -110, 12, 3.6, GF) + leaf(38, 82, 200, 10, 3, GF) +
    `<path d="M50 90C44 95 36 95 31 92C37 89 44 88 50 90Z" ${F}/>` +
    `<circle cx="34" cy="14" r="2" ${GF}/>`;
  const arabesque = arabesqueHalf + mirrorX(100, arabesqueHalf) +
    `<path d="M50 90V50" ${S(2.6)}/>` +
    `<path d="M50 14C58 24 60 38 50 50C40 38 42 24 50 14Z" ${F}/>` +
    `<path d="M50 24C53 30 53 38 50 44C47 38 47 30 50 24Z" ${GF}/>` +
    `<circle cx="50" cy="8" r="2.4" ${GF}/><circle cx="50" cy="62" r="3" ${GF}/>`;

  const laurier = (() => {
    const branch = () => {
      let s = `<path d="M${f(50 + 36 * Math.cos(rad(100)))} ${f(50 + 36 * Math.sin(rad(100)))}A36 36 0 0 1 ${f(50 + 36 * Math.cos(rad(255)))} ${f(50 + 36 * Math.sin(rad(255)))}" ${S(2.2)}/>`;
      let k = 0;
      for (let a = 108; a <= 248; a += 14, k++) {
        const x = 50 + 36 * Math.cos(rad(a)), y = 50 + 36 * Math.sin(rad(a));
        const tan = a + 90;
        s += leaf(x, y, tan - 38, 14, 4.2, k % 3 === 2 ? GF : F);
        s += leaf(x, y, tan + 38, 14, 4.2, k % 3 === 0 ? GF : F);
      }
      const ex = 50 + 36 * Math.cos(rad(255)), ey = 50 + 36 * Math.sin(rad(255));
      s += leaf(ex, ey, 255 + 90, 13, 4, F);
      return s;
    };
    return branch() + mirrorX(100, branch()) +
      `<path d="M50 86C44 80 38 82 40 87C42 92 48 89 50 86C52 89 58 92 60 87C62 82 56 80 50 86Z" ${GF} stroke="currentColor" stroke-width="1.4"/>` +
      `<path d="M48.5 87L42 97M51.5 87L58 97" ${G(2)}/><circle cx="50" cy="86.5" r="2.2" ${F}/>`;
  })();

  const medaillon = (() => {
    let d = '';
    const n = 16, R = 44;
    for (let i = 0; i <= n; i++) {
      const a = rad(-90 + i * 360 / n);
      const x = 50 + R * Math.cos(a), y = 50 + R * Math.sin(a);
      d += i === 0 ? `M${f(x)} ${f(y)}` : `A9.5 9.5 0 0 1 ${f(x)} ${f(y)}`;
    }
    let s = `<path d="${d}Z" ${S(2.4)}/><circle cx="50" cy="50" r="38" ${G(1.4)}/><circle cx="50" cy="50" r="34" ${S(2.4)}/>`;
    for (let i = 0; i < 16; i++) {
      const a = rad(-90 + 11.25 + i * 22.5);
      s += `<circle cx="${f(50 + 41.5 * Math.cos(a))}" cy="${f(50 + 41.5 * Math.sin(a))}" r="1.3" ${F}/>`;
    }
    for (let i = 0; i < 8; i++) s += leaf(50, 50, -90 + i * 45, 24, 6.5, i % 2 ? GF : F);
    s += `<circle cx="50" cy="50" r="6" ${F}/><circle cx="50" cy="50" r="2.6" ${GF}/>`;
    for (let i = 0; i < 8; i++) {
      const a = rad(-90 + 22.5 + i * 45);
      s += `<circle cx="${f(50 + 21 * Math.cos(a))}" cy="${f(50 + 21 * Math.sin(a))}" r="1.8" ${GF}/>`;
    }
    return s;
  })();

  // ======================= SÉPARATEURS (300×40) =======================

  const sepMagen = `<path d="M14 20Q74 16.6 130 20Q74 23.4 14 20Z" ${F}/><path d="M170 20Q226 16.6 286 20Q226 23.4 170 20Z" ${F}/>` +
    hexagram(150, 20.5, 14, S(2.2)) + `<circle cx="150" cy="20.5" r="2.4" ${GF}/>` +
    `<polygon points="${diamond(8, 20, 3, 3)}" ${GF}/><polygon points="${diamond(292, 20, 3, 3)}" ${GF}/>` +
    `<circle cx="126" cy="25" r="1.3" ${GF}/><circle cx="174" cy="25" r="1.3" ${GF}/>`;

  const sepZellige = `<polygon points="${star8(150, 20, 15, 0)}" ${F}/><polygon points="${star8(150, 20, 7, 22.5, true)}" ${GF}/>` +
    `<path d="M24 17.5H124M176 17.5H276" ${S(1.4)}/><path d="M36 22.5H124M176 22.5H264" ${G(1.4)}/>` +
    `<polygon points="${diamond(129, 20, 3.5, 3.5)}" ${GF}/><polygon points="${diamond(171, 20, 3.5, 3.5)}" ${GF}/>` +
    `<polygon points="${star8(16, 17.5, 4.5, 0, true)}" ${F}/><polygon points="${star8(284, 17.5, 4.5, 0, true)}" ${F}/>`;

  const sepLosange = `<path d="M26 20H134M166 20H274" ${S(1.5)}/>` +
    `<polygon points="${diamond(150, 20, 9, 9)}" ${GF} stroke="currentColor" stroke-width="1.6"/><circle cx="150" cy="20" r="2" ${F}/>` +
    `<polygon points="${diamond(137, 20, 3, 3)}" ${F}/><polygon points="${diamond(163, 20, 3, 3)}" ${F}/>` +
    `<circle cx="19" cy="20" r="2.2" ${GF}/><circle cx="281" cy="20" r="2.2" ${GF}/>`;

  const voluteHalf = `<path d="M144 23C128 31 112 30 104 22C97 15 103 7 111 9.5C118 12 116 21 109 19.5C105 18.5 106 14 109 14.5" ${S(2.2)}/>` +
    `<path d="M104 24C90 33 70 33 56 25C46 19 34 18 18 20" ${S(1.6)}/>` +
    leaf(84, 30.5, 200, 12, 3.4, F) + leaf(66, 29, 160, 11, 3.2, GF) + leaf(44, 20, 195, 10, 3, F) +
    leaf(124, 27.5, -140, 9, 2.8, GF) + `<circle cx="14" cy="20.5" r="2" ${GF}/>`;
  const sepVolute = voluteHalf + mirrorX(300, voluteHalf) +
    `<path d="M150 6C155 11 155 18 150 22C145 18 145 11 150 6Z" ${F}/>` +
    `<path d="M150 22C156 22 161 26 162 32C156 31 152 28 150 22ZM150 22C144 22 139 26 138 32C144 31 148 28 150 22Z" ${GF}/>`;

  const sepPerles = (() => {
    let s = `<path d="M10 20H290" ${G(1)}/>`;
    s += `<circle cx="150" cy="20" r="6" ${F}/><circle cx="150" cy="20" r="2.4" ${GF}/>`;
    for (let k = 1; k <= 9; k++) {
      const dx = 10 + k * 14, r = 3.8 - k * 0.3;
      [150 - dx, 150 + dx].forEach((x) => {
        s += k % 2 ? `<polygon points="${diamond(x, 20, r * 0.9, r * 1.2)}" ${GF}/>` : `<circle cx="${x}" cy="20" r="${f(r)}" ${F}/>`;
      });
    }
    return s;
  })();

  // ======================= COINS (haut-gauche, 100×100) =======================

  // coin à volutes : symétrique par rapport à la diagonale
  const coinVoluteHalf = `<path d="M6 94V6" ${S(2.4)}/><path d="M12 70V12" ${G(1.2)}/>` +
    `<path d="M28 28C22 38 20 52 24 62C27 70 36 70 37 63C38 57 31 55 29.5 60" ${S(2.2)}/>` +
    leaf(23, 64, 115, 12, 3.4, GF) + leaf(12, 74, 90, 14, 3, F) + `<circle cx="6" cy="96" r="2" ${F}/>`;
  const coinVolute = coinVoluteHalf + `<g transform="matrix(0 1 1 0 0 0)">${coinVoluteHalf}</g>` +
    leaf(10, 10, 45, 24, 6.5, F) + `<path d="M14 14L27 27" ${G(1.2)}/>` +
    `<circle cx="36" cy="36" r="2.8" ${GF}/><circle cx="43" cy="43" r="1.6" ${F}/>`;

  // coin zellige : étoile à 8 branches + filets
  const coinZelligeHalf = `<path d="M40 21H93" ${S(2.4)}/><path d="M44 14.5H84M44 27.5H84" ${G(1.2)}/>` +
    `<polygon points="${diamond(96, 21, 3.4, 3.4)}" ${GF}/><circle cx="88" cy="14.5" r="1.4" ${F}/><circle cx="88" cy="27.5" r="1.4" ${F}/>`;
  const coinZellige = coinZelligeHalf + `<g transform="matrix(0 1 1 0 0 0)">${coinZelligeHalf}</g>` +
    `<polygon points="${star8(21, 21, 18, 0)}" ${F}/><polygon points="${star8(21, 21, 11, 22.5, true)}" ${GF}/><circle cx="21" cy="21" r="2.6" ${F}/>` +
    `<polygon points="${diamond(42, 42, 3.2, 3.2)}" ${GF}/>`;

  // coin éventail : palmette en quart de cercle
  const coinEventailHalf = `<path d="M50 6H94" ${S(2.4)}/><path d="M54 12H86" ${G(1.2)}/><polygon points="${diamond(97, 6, 2.6, 2.6)}" ${GF}/>`;
  const coinEventail = coinEventailHalf + `<g transform="matrix(0 1 1 0 0 0)">${coinEventailHalf}</g>` +
    `<path d="M6 50V6H50" ${S(2.4)}/><path d="M48 8A40 40 0 0 1 8 48" ${S(2)}/>` +
    Array.from({ length: 7 }, (_, i) => {
      const a = rad(7 + i * 12.67);
      return `<circle cx="${f(8 + 46 * Math.cos(a))}" cy="${f(8 + 46 * Math.sin(a))}" r="1.7" ${GF}/>`;
    }).join('') +
    [[12, 24, F], [28, 29, GF], [45, 34, F], [62, 29, GF], [78, 24, F]].map((l) => leaf(8, 8, l[0], l[1], l[1] * .2, l[2])).join('') +
    `<circle cx="8" cy="8" r="4.5" ${F}/><circle cx="8" cy="8" r="1.8" ${GF}/>`;

  // ======================= CADRES PHOTO =======================

  // Arche marocaine (alfiz rectangulaire + arc outrepassé)
  const arche = (() => {
    const cx = 50, cy = 54, r = 41, jx = 38;
    const archP = (rr, jj, yb) => {
      const yj = cy + Math.sqrt(rr * rr - jj * jj);
      return `M${cx - jj} ${yb}V${f(yj)}A${rr} ${rr} 0 1 1 ${cx + jj} ${f(yj)}V${yb}`;
    };
    let s = `<path d="M2 2H98V138H2Z${archP(r, jx, 133)}Z" ${F} fill-rule="evenodd"/>`;
    s += `<path d="${archP(r + 3.2, jx + 3.2, 135)}" ${G(1.1)}/>`;
    s += `<path d="M5.5 5.5H94.5V135.5H5.5Z" ${G(.9)}/>`;
    s += `<path d="${archP(r - 3, jx - 3, 133)}" ${G(.9)}/>`;
    s += `<polygon points="${star8(12, 13, 4.6, 0)}" ${GF}/><polygon points="${star8(88, 13, 4.6, 0)}" ${GF}/>`;
    s += `<circle cx="12" cy="13" r="1.3" ${F}/><circle cx="88" cy="13" r="1.3" ${F}/>`;
    return s;
  })();

  const ovale = (() => {
    let s = `<path d="M50 6A44 59 0 1 1 49.99 6ZM50 12A38 53 0 1 0 50.01 12Z" ${F} fill-rule="evenodd"/>`;
    s += `<ellipse cx="50" cy="65" rx="35.5" ry="50.5" ${G(1.2)}/>`;
    for (let i = 0; i < 36; i++) {
      const a = rad(i * 10);
      s += `<circle cx="${f(50 + 41 * Math.cos(a))}" cy="${f(65 + 56 * Math.sin(a))}" r="1.1" ${GF}/>`;
    }
    s += `<path d="M50 9C44 1 36 2 38 7C40 12 47 10 50 9C53 10 60 12 62 7C64 2 56 1 50 9Z" ${GF} stroke="currentColor" stroke-width="1.4"/><circle cx="50" cy="9" r="2.4" ${F}/>`;
    s += leaf(48, 124, 200, 18, 4.2, F) + leaf(52, 124, -20, 18, 4.2, F) + leaf(46, 122, 235, 12, 3, GF) + leaf(54, 122, -55, 12, 3, GF);
    s += `<circle cx="50" cy="124" r="3" ${GF} stroke="currentColor" stroke-width="1.2"/>`;
    return s;
  })();

  const fleuriCorner = `<path d="M4 34V4H34" ${S(2.2)}/><path d="M9 26V9H26" ${G(1.2)}/>` +
    leaf(6, 6, 45, 20, 5, F) + leaf(9, 9, 15, 15, 3.6, GF) + leaf(9, 9, 75, 15, 3.6, GF) + `<circle cx="22" cy="22" r="2" ${GF}/>`;
  const cadreFleuri = `<rect x="4" y="4" width="132" height="92" ${S(1.6)}/><rect x="9" y="9" width="122" height="82" ${G(1)}/>` +
    fleuriCorner + mirrorX(140, fleuriCorner) +
    `<g transform="matrix(1 0 0 -1 0 100)">${fleuriCorner}${mirrorX(140, fleuriCorner)}</g>` +
    [4, 96].map((y) => `<polygon points="${diamond(70, y, 6, 3.4)}" ${GF} stroke="currentColor" stroke-width="1.2"/>` + leaf(64, y, 180, 12, 2.6, F) + leaf(76, y, 0, 12, 2.6, F)).join('') +
    [4, 136].map((x) => `<polygon points="${diamond(x, 50, 3.4, 6)}" ${GF} stroke="currentColor" stroke-width="1.2"/>`).join('');

  // ======================= LISTE =======================

  window.ORNAMENTS = [
    { id: 'magen-david', label: 'Maguen David', cat: 'symboles', vb: '0 0 100 100', svg: magen },
    { id: 'menorah', label: 'Menorah', cat: 'symboles', vb: '0 0 100 100', svg: menorah },
    { id: 'hamsa', label: '’Hamsa', cat: 'symboles', vb: '0 0 100 100', svg: hamsa },
    { id: 'keter', label: 'Couronne de Torah', cat: 'symboles', vb: '0 0 100 100', svg: keter },
    { id: 'kiddouch', label: 'Coupe de Kiddouch', cat: 'symboles', vb: '0 0 100 100', svg: kiddush },
    { id: 'bougies', label: 'Bougies de Chabbat', cat: 'symboles', vb: '0 0 100 100', svg: candles },
    { id: 'tables-loi', label: 'Tables de la Loi', cat: 'symboles', vb: '0 0 100 100', svg: tablets },
    { id: 'grenade', label: 'Grenade', cat: 'symboles', vb: '0 0 100 100', svg: grenade },
    { id: 'olivier', label: 'Branche d’olivier', cat: 'symboles', vb: '0 0 100 100', svg: olive },
    { id: 'colombe', label: 'Colombe', cat: 'symboles', vb: '0 0 100 100', svg: colombe },
    { id: 'chofar', label: 'Chofar', cat: 'symboles', vb: '0 0 100 100', svg: chofar },
    { id: 'sefer-torah', label: 'Rouleau de Torah', cat: 'symboles', vb: '0 0 100 100', svg: torah },
    { id: 'hallot', label: '’Hallot', cat: 'symboles', vb: '0 0 100 100', svg: hallot },
    { id: 'lune-etoiles', label: 'Lune & étoiles', cat: 'symboles', vb: '0 0 100 100', svg: lune },

    { id: 'rosace-zellige', label: 'Rosace zellige', cat: 'motifs', vb: '0 0 100 100', svg: zellige },
    { id: 'etoile-8', label: 'Étoile à 8 branches', cat: 'motifs', vb: '0 0 100 100', svg: etoile8 },
    { id: 'arabesque', label: 'Arabesque florale', cat: 'motifs', vb: '0 0 100 100', svg: arabesque },
    { id: 'laurier', label: 'Couronne de laurier', cat: 'motifs', vb: '0 0 100 100', svg: laurier },
    { id: 'medaillon', label: 'Médaillon', cat: 'motifs', vb: '0 0 100 100', svg: medaillon },

    { id: 'sep-maguen', label: 'Filet & Maguen David', cat: 'separateurs', vb: '0 0 300 40', svg: sepMagen },
    { id: 'sep-star', label: 'Filet zellige', cat: 'separateurs', vb: '0 0 300 40', svg: sepZellige },
    { id: 'sep-diamond', label: 'Filet & losange', cat: 'separateurs', vb: '0 0 300 40', svg: sepLosange },
    { id: 'sep-volute', label: 'Volutes fleuries', cat: 'separateurs', vb: '0 0 300 40', svg: sepVolute },
    { id: 'sep-perles', label: 'Chapelet de perles', cat: 'separateurs', vb: '0 0 300 40', svg: sepPerles },

    { id: 'coin-volute', label: 'Coin à volutes', cat: 'coins', vb: '0 0 100 100', svg: coinVolute },
    { id: 'coin-zellige', label: 'Coin zellige', cat: 'coins', vb: '0 0 100 100', svg: coinZellige },
    { id: 'coin-eventail', label: 'Coin éventail', cat: 'coins', vb: '0 0 100 100', svg: coinEventail },

    { id: 'cadre-arche', label: 'Arche marocaine', cat: 'cadres', vb: '0 0 100 140', svg: arche },
    { id: 'cadre-ovale', label: 'Médaillon ovale', cat: 'cadres', vb: '0 0 100 130', svg: ovale },
    { id: 'cadre-fleuri', label: 'Cadre fleuri', cat: 'cadres', vb: '0 0 140 100', svg: cadreFleuri }
  ];
  // ar = largeur / hauteur de la viewBox
  window.ORNAMENTS.forEach((o) => { const v = o.vb.split(' ').map(Number); o.ar = Math.round(v[2] / v[3] * 1000) / 1000; });

  // ======================= CADRES DE PAGE (640×640) =======================

  const W = 640;
  const frameCorner = (s) => s + mirrorX(W, s) + `<g transform="matrix(1 0 0 -1 0 ${W})">${s}${mirrorX(W, s)}</g>`;

  const zelligeBand = (() => {
    let s = `<rect x="14" y="14" width="612" height="612" ${S(1.4)}/><rect x="34" y="34" width="572" height="572" ${S(1.4)}/>`;
    const step = 612 / 18; // 34 px
    for (let i = 1; i < 18; i++) {
      const c = 14 + i * step;
      [[c, 24], [c, 616], [24, c], [616, c]].forEach((p) => {
        s += i % 2 ? `<polygon points="${star8(p[0], p[1], 7.5, 0)}" ${F}/>` : `<polygon points="${diamond(p[0], p[1], 4, 4)}" ${GF}/>`;
      });
    }
    [[24, 24], [616, 24], [24, 616], [616, 616]].forEach((p) => {
      s += `<polygon points="${star8(p[0], p[1], 9, 0)}" ${GF}/><circle cx="${p[0]}" cy="${p[1]}" r="2.4" ${F}/>`;
    });
    return s;
  })();

  const coinsFrame = frameCorner(
    `<polygon points="${star8(24, 24, 10, 0)}" ${F}/><polygon points="${star8(24, 24, 6, 22.5, true)}" ${GF}/>` +
    ['', 'matrix(0 1 1 0 0 0)'].map((t) => `<g transform="${t}">` +
      `<path d="M37 17H170" ${S(1.8)}/><path d="M37 24H120" ${G(1.2)}/><path d="M37 31H86" ${S(1)}/>` +
      leaf(170, 17, 0, 14, 3, F) + leaf(120, 24, 0, 11, 2.6, GF) + `<circle cx="90" cy="31" r="1.8" ${GF}/>` +
      `<polygon points="${diamond(140, 24, 3, 3)}" ${F}/>` + `</g>`).join('')
  );

  const archeHalf = `<path d="M28 618V128C28 114 18 106 18 88C18 44 170 30 320 15" ${S(2.4)}/>` +
    `<path d="M34 612V130C34 117 26 110 26 92C26 54 174 40 320 25" ${G(1.2)}/>` +
    `<path d="M18 618H320" ${S(2.4)}/><path d="M26 610H320" ${G(1.2)}/>` +
    `<polygon points="${star8(26, 26, 7, 0)}" ${GF}/><circle cx="23" cy="117" r="2.2" ${F}/>`;
  const archeFrame = archeHalf + mirrorX(W, archeHalf) +
    `<polygon points="${star8(320, 15, 8, 0)}" ${F}/><circle cx="320" cy="15" r="2.4" ${GF}/>`;

  const orFrame = `<rect x="18" y="18" width="604" height="604" ${G(2.4)}/><rect x="27" y="27" width="586" height="586" ${G(1)}/>` +
    [[22.5, 22.5], [617.5, 22.5], [22.5, 617.5], [617.5, 617.5]].map((p) =>
      `<polygon points="${diamond(p[0], p[1], 9, 9)}" ${GF}/><polygon points="${diamond(p[0], p[1], 3.5, 3.5)}" ${F}/>`).join('') +
    [[320, 22.5], [320, 617.5], [22.5, 320], [617.5, 320]].map((p) => `<polygon points="${diamond(p[0], p[1], 5, 5)}" ${GF}/>`).join('');

  window.FRAMES = [
    { id: 'filet', label: 'Filet simple', svg: `<rect x="24" y="24" width="592" height="592" ${S(1.5)}/>` },
    { id: 'double', label: 'Double filet', svg: `<rect x="19" y="19" width="602" height="602" ${S(4)}/><rect x="29" y="29" width="582" height="582" ${S(1.2)}/>` },
    { id: 'coins', label: 'Coins ornés', svg: coinsFrame },
    { id: 'arche', label: 'Arche marocaine', svg: archeFrame },
    { id: 'zellige', label: 'Bande zellige', svg: zelligeBand },
    { id: 'pointille', label: 'Pointillés', svg: `<rect x="24" y="24" width="592" height="592" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 9.25"/><rect x="31" y="31" width="578" height="578" ${G(.8)}/>` },
    { id: 'or', label: 'Filet doré', svg: orFrame }
  ];
})();
