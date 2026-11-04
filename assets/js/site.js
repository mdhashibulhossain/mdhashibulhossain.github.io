// Small progressive enhancements. The site works without JavaScript.
(function () {
  var root = document.documentElement;

  // Theme toggle (auto → opposite of current → remembered per browser)
  var tt = document.querySelector('.theme-toggle');
  if (tt) tt.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var nt = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
  if (nt && nav) nt.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    nt.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Publication filter
  var filters = document.querySelectorAll('.filter');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { var on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
      document.querySelectorAll('.pub, [data-track-item]').forEach(function (p) {
        var t = p.getAttribute('data-track-item') || p.getAttribute('data-track');
        p.classList.toggle('is-hidden', f !== 'all' && t !== f);
      });
    });
  });

  // Copy email
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy email'; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
