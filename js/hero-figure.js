/* hero-figure.js — Galton board: individual differences arriving one
 * observation at a time. Dots drop through a peg triangle, stack into
 * teal bins, fitted normal in orange. Static bell under reduced motion.
 * Pauses off-screen. No dependencies.
 */
(function () {
  'use strict';
  var cv = document.getElementById('heroFigure');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ROWS = 6, TOP = 58, GAP = 26, PEG_R = 2.5, BALL_R = 4;
  var BINS = 13, BIN_W = 22, LEFT = (W - BINS * BIN_W) / 2;
  var BASE = H - 10, BAR_MAX = 52, WINDOW = 90;

  var pegs = [];
  for (var r = 0; r < ROWS; r++) {
    var y = TOP + r * 24;
    var count = 3 + r;
    var w = (count - 1) * GAP;
    for (var p = 0; p < count; p++) pegs.push({ x: W / 2 - w / 2 + p * GAP, y: y });
  }

  var history = [];
  var balls = [];
  var visible = true;
  var lastSpawn = 0;

  function spawn() {
    balls.push({ x: W / 2 + (Math.random() - 0.5) * 4, y: 26, vy: 1.6, row: 0 });
  }

  function stepBall(b) {
    b.y += b.vy;
    b.vy = Math.min(b.vy + 0.18, 3.2);
    if (b.row < ROWS && b.y >= TOP + b.row * 24) {
      var count = 3 + b.row;
      var w = (count - 1) * GAP;
      var x0 = W / 2 - w / 2;
      var idx = Math.round((b.x - x0) / GAP);
      idx = Math.max(0, Math.min(count - 1, idx));
      var px = x0 + idx * GAP;
      if (Math.abs(b.x - px) < GAP / 2) b.x += (Math.random() < 0.5 ? -1 : 1) * GAP / 2;
      b.row++;
      b.vy = 1.4;
    }
    if (b.row >= ROWS && b.y >= BASE - 6) {
      var bin = Math.max(0, Math.min(BINS - 1, Math.floor((b.x - LEFT) / BIN_W)));
      history.push(bin);
      if (history.length > WINDOW) history.shift();
      return false;
    }
    return true;
  }

  function counts() {
    var c = [];
    for (var i = 0; i < BINS; i++) c.push(0);
    history.forEach(function (b) { c[b]++; });
    return c;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // drop funnel
    ctx.strokeStyle = '#1C1A14';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 14, 30);
    ctx.lineTo(W / 2 - 4, 44);
    ctx.moveTo(W / 2 + 14, 30);
    ctx.lineTo(W / 2 + 4, 44);
    ctx.stroke();
    // pegs
    ctx.fillStyle = '#1C1A14';
    pegs.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, PEG_R, 0, 6.29);
      ctx.fill();
    });
    // bins (sliding window histogram)
    var c = counts();
    var max = 1;
    c.forEach(function (v) { max = Math.max(max, v); });
    ctx.fillStyle = 'rgba(23, 121, 127, 0.85)';
    for (var i = 0; i < BINS; i++) {
      var h = (c[i] / max) * BAR_MAX;
      ctx.fillRect(LEFT + i * BIN_W + 2, BASE - h, BIN_W - 4, h);
    }
    // fitted normal
    var sigma = 52;
    ctx.strokeStyle = '#E8541E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var x = 0; x <= W; x += 6) {
      var y = BASE - Math.exp(-((x - W / 2) * (x - W / 2)) / (2 * sigma * sigma)) * BAR_MAX;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // falling balls
    ctx.fillStyle = '#E8541E';
    balls.forEach(function (b) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, BALL_R, 0, 6.29);
      ctx.fill();
    });
  }

  function tick(now) {
    if (visible) {
      if (now - lastSpawn > 480 && balls.length < 3) {
        spawn();
        lastSpawn = now;
      }
      balls = balls.filter(stepBall);
      draw();
    }
    requestAnimationFrame(tick);
  }

  if (reduce) {
    // static: pre-fill a bell so the figure still communicates
    for (var i = 0; i < WINDOW; i++) {
      var s = 0;
      for (var j = 0; j < 4; j++) s += Math.floor(Math.random() * BINS);
      history.push(Math.min(BINS - 1, Math.round(s / 4)));
    }
    draw();
  } else {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0.05 }).observe(cv);
    }
    requestAnimationFrame(tick);
  }
})();
