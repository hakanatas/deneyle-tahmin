/* SAHNE 1 — RAPTİYE (0–10 s)  Point up or on its side?
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut, lerp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;
  const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');

  /* ── a seeded experiment: running count of successes after each throw ── */
  function mb(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function run(seed, p) { const r = mb(seed); let c = 0; const out = [], hit = []; for (let i = 1; i <= 1000; i++) { const h = r() < p; if (h) c++; out.push(c); hit.push(h); } return { c: out, hit }; }
  const TACK = run(1558, 0.62), COIN = run(88, 0.5);

  /** a thumbtack: up = point up (head on the ground), otherwise lying on its side */
  function tack(ctx, x, y, rot, s, a) {
    if (a <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.fillStyle = amber(0.85 * a); ctx.beginPath(); ctx.ellipse(0, 0, 24, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = ink(a); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 24, 8, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = amber(a); ctx.beginPath(); ctx.ellipse(0, -8, 11, 6, 0, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, -52); ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();
  }
  const UP = 0, SIDE = 1.9;

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Raptiye atınca ucu yukarı mı gelir, yan mı düşer?'],
      [10.6, 27.8, 'Deney yapalım: 10 atış'],
      [28.4, 45.8, 'Deneme sayısını artıralım: 1000 atış'],
      [46.4, 63.8, 'Olasılığını bildiğimiz bir deneyle karşılaştıralım: madeni para'],
      [64.4, 79.8, 'Göreli sıklık, olasılığı tahmin etmek için kullanılabilir mi?'],
    ]);
  }

  function throws(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t);
    // one big throw
    const b = win(t, 4.4, 10.4) * a;
    if (b > 0) {
      const k = seg(t, 4.8, 7.0), y = L.BIG[1] - 110 * Math.sin(Math.PI * k), rot = k < 1 ? k * Math.PI * 5 : UP;
      tack(ctx, L.BIG[0], y, rot, 2.2, b);
      Ink.path(ctx, [[L.BIG[0] - 160, L.BIG[1] + 20], [L.BIG[0] + 160, L.BIG[1] + 20]], { w: 3, alpha: b * 0.5, seed: 3400, taper: [0.1, 0.1] });
    }
    // ten throws in a row
    const r = win(t, 10.8, 27.8) * a, TK = L.TK;
    if (r > 0) for (let i = 0; i < 10; i++) {
      const k = seg(t, 11.0 + i * 0.4, 11.4 + i * 0.4); if (k <= 0) continue;
      const up = TACK.hit[i], x = TK.x0 + i * TK.dx;
      tack(ctx, x, TK.y + (up ? 0 : 20), up ? UP : SIDE, 1.1 * TK.s, r * k);
      f.T(ctx, up ? 'yukarı' : 'yan', x, TK.y + 64, Object.assign({ size: L.G.s * 0.62, alpha: r * k }, up ? f.AMB : {}));
    }
  }

  function graph(ctx, env, t) {
    const L = KD.L(env), P = L.GP, f = F(), a = win(t, 28.6, 79.8) * END(t); if (a <= 0) return;
    const X = (n) => P.x0 + Math.log10(n) / 3 * P.w, Y = (v) => P.y0 + P.h - v * P.h;
    Ink.path(ctx, [[P.x0, P.y0 + P.h], [P.x0 + P.w + 20, P.y0 + P.h]], { w: 4, alpha: a, seed: 3410, taper: [0, 0] });
    Ink.path(ctx, [[P.x0, P.y0 + P.h], [P.x0, P.y0 - 20]], { w: 4, alpha: a, seed: 3411, taper: [0, 0] });
    [[0, '0'], [0.5, '0,5'], [1, '1']].forEach(([v, s]) => { f.T(ctx, s, P.x0 - 16, Y(v), { size: L.G.s * 0.55, alpha: a, align: 'right' }); if (v > 0) { ctx.strokeStyle = ink(0.15 * a); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(P.x0, Y(v)); ctx.lineTo(P.x0 + P.w, Y(v)); ctx.stroke(); ctx.setLineDash([]); } });
    [1, 10, 100, 1000].forEach((n) => f.T(ctx, String(n), X(n), P.y0 + P.h + 30, { size: L.G.s * 0.55, alpha: a }));
    f.T(ctx, 'atış sayısı', P.x0 + P.w - 40, P.y0 + P.h + 66, { size: L.G.s * 0.5, alpha: a });
    f.T(ctx, 'göreli sıklık', P.x0 + 10, P.y0 - 44, { size: L.G.s * 0.5, alpha: a, align: 'left' });
    const curve = (R, prog, col, w, alpha, seed) => {
      if (prog <= 0) return;
      const nmax = Math.max(1, Math.round(Math.pow(10, 3 * prog))), pts = [];
      for (let n = 1; n <= nmax; n++) pts.push([X(n), Y(R.c[n - 1] / n)]);
      if (pts.length > 1) Ink.path(ctx, pts, { w, alpha, seed, color: col, taper: [0, 0], wob: 0 });
      const n = nmax, v = R.c[n - 1] / n;
      ctx.fillStyle = col ? amber(alpha) : ink(alpha); ctx.beginPath(); ctx.arc(X(n), Y(v), 7, 0, Math.PI * 2); ctx.fill();
      return { n, c: R.c[n - 1], v };
    };
    const kT = seg(t, 29.4, 38.0), kC = seg(t, 47.0, 54.0);
    const tk = curve(TACK, kT, LI.AMBER_RGB, 5, a * (t > 46.4 && t < 64 ? 0.55 : 1), 3420);
    const ck = curve(COIN, kC, undefined, 4, a * win(t, 46.8, 79.8), 3421);
    if (tk && t < 46.4) f.T(ctx, `${tk.n} atış · ${tk.c} kez yukarı · ${dec(tk.v)}`, P.x0 + P.w / 2, P.y0 - 44, Object.assign({ size: L.G.s * 0.62, alpha: a * win(t, 29.4, 46.0), halo: true }, f.AMB));
    if (ck && t < 64.4) f.T(ctx, `${ck.n} atış · ${ck.c} kez yazı · ${dec(ck.v)}`, P.x0 + P.w / 2, P.y0 - 44, { size: L.G.s * 0.62, alpha: a * win(t, 47.0, 64.0), halo: true });
    if (t > 64.4) {
      f.T(ctx, 'raptiye 0,62', X(1000) + 16, Y(0.618) - 22, Object.assign({ size: L.G.s * 0.55, alpha: a, align: 'right', halo: true }, f.AMB));
      f.T(ctx, 'para 0,50', X(1000) + 16, Y(0.502) + 28, { size: L.G.s * 0.55, alpha: a, align: 'right', halo: true });
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W, u = TACK.c[9];
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'İki durum var ama eşit şanslı değil: hesaplayamayız'], [15.4, 27.8, `Ucu yukarı: ${u} · yan: ${10 - u}`],
      [30.4, 45.8, 'Az denemede göreli sıklık çok değişiyor'], [47.4, 63.8, 'Yazı gelme olasılığını biliyoruz: 1/2 = 0,5'],
      [65.0, 79.8, 'Çok denemeyle: evet, raptiye için yaklaşık 0,62']]);
    exprs(ctx, t, at(W, 1), [[17.4, 27.8, 'Göreli sıklık = olayın gerçekleşme sayısı ÷ deneme sayısı'],
      [35.0, 45.8, `1000 atışta ${TACK.c[999]} kez ucu yukarı: ${dec(TACK.c[999] / 1000)}`],
      [51.4, 63.8, `İlk 10 atışta ${dec(COIN.c[9] / 10, 1)} ama 1000 atışta ${dec(COIN.c[999] / 1000)}`],
      [69.0, 79.8, 'Az denemeyle güvenilmez: 10 atışta sonuç çok değişebilir']]);
    exprs(ctx, t, at(W, 2), [[20.4, 27.8, `${u} ÷ 10 = ${dec(u / 10, 1)}: olasılığın ilk tahmini`, true],
      [39.0, 45.8, 'Tekrar sayısı arttıkça göreli sıklık bir değere yerleşiyor', true],
      [55.4, 63.8, 'Göreli sıklık, gerçek olasılığa yaklaşıyor', true],
      [73.0, 79.8, 'Tahmin kesin değer değil; deneme arttıkça daha güvenilir', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Göreli sıklık = olay sayısı ÷ deneme sayısı', 80.6], ['Az deneme: çok değişken', 81.6], ['Çok deneme: olasılığa yaklaşır', 82.6], ['Olasılığı deneyle tahmin et!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); throws(ctx, env, t); graph(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };
  void lerp; void inOut;

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A thumbtack', nameTr: 'Raptiye', concept: 'Point up or on its side?', conceptTr: 'Ucu yukarı mı, yan mı?', render });
})(window.LI = window.LI || {});
