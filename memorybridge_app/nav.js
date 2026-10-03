/* MemoryBridge prototype navigation.
   Makes elements carrying data-goto="screen.html" tappable, and wires the
   five-tab bar by its label. Inside the prototype viewer it asks the parent
   frame to switch screens; opened on its own it just follows the link. */
(function () {
  var TABS = {
    Circle: 'circle.html',
    Books: 'book.html',
    Add: 'add.html',
    Review: 'review.html',
    Me: 'privacy.html'
  };

  function go(screen) {
    if (!screen) return;
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ mb: 'goto', screen: screen }, '*');
        return;
      }
    } catch (e) { /* cross-origin parent, fall through */ }
    window.location.href = screen;
  }

  function targetFor(el) {
    var n = el;
    while (n && n !== document.body) {
      if (n.dataset && n.dataset.goto) return n.dataset.goto;
      if (n.classList && n.classList.contains('tab')) {
        var word = (n.textContent || '').trim().split(/\s+/)[0] || '';
        for (var k in TABS) {
          if (word.indexOf(k) === 0) return TABS[k];
        }
      }
      n = n.parentElement;
    }
    return null;
  }

  document.addEventListener('click', function (e) {
    var t = targetFor(e.target);
    if (t) { e.preventDefault(); go(t); }
  });

  var st = document.createElement('style');
  st.textContent =
    '[data-goto],.tab{cursor:pointer}' +
    '[data-goto]:active{filter:brightness(.95)}' +
    'html.mb-hot [data-goto],html.mb-hot .tab{outline:2px solid rgba(14,107,116,.8);outline-offset:2px;border-radius:8px}' +
    'html.mb-hot [data-goto]{position:relative}';
  document.head.appendChild(st);

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.mb === 'hotspots') {
      document.documentElement.classList.toggle('mb-hot', !!d.on);
    }
  });
})();
