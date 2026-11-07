// Fills every .wave element with deterministic bars. data-n = bar count, data-seed, data-played = 0..1
document.querySelectorAll('.wave').forEach(function (el) {
  var n = +el.dataset.n || 40, seed = +el.dataset.seed || 7, played = +el.dataset.played || 0;
  var h = el.clientHeight || 40;
  for (var i = 0; i < n; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    var r = seed / 233280, env = 0.45 + 0.55 * Math.sin(Math.PI * (i + 1) / (n + 1));
    var b = document.createElement('i');
    b.style.height = Math.max(4, Math.round(h * env * (0.35 + 0.65 * r))) + 'px';
    if (i / n >= played && played > 0) b.style.opacity = '.3';
    el.appendChild(b);
  }
});
