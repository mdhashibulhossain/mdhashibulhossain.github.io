// Live GitHub stats for every <article class="repo" data-repo="owner/name">.
// Uses the public REST API (no token, 60 requests/hour per visitor) and caches
// responses for 1 hour in sessionStorage. Falls back silently to the YAML text.
(function () {
  var cards = document.querySelectorAll('.repo[data-repo]');
  if (!cards.length) return;
  var TTL = 3600 * 1000, failed = 0;

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }); }
    catch (e) { return iso.slice(0, 10); }
  }
  function fill(card, d) {
    var set = function (k, v) { var el = card.querySelector('[data-field="' + k + '"]'); if (el && v != null && v !== '') el.textContent = v; };
    set('stars', d.stargazers_count);
    set('forks', d.forks_count);
    set('updated', fmtDate(d.pushed_at));
    set('language', d.language);
    if (d.description) set('description', d.description);
  }
  function get(repo) {
    var key = 'gh:' + repo;
    try {
      var c = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (c && Date.now() - c.t < TTL) return Promise.resolve(c.d);
    } catch (e) {}
    return fetch('https://api.github.com/repos/' + repo, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} return d; });
  }
  cards.forEach(function (card) {
    get(card.getAttribute('data-repo')).then(function (d) { fill(card, d); }).catch(function () {
      failed++;
      var note = document.querySelector('.api-note');
      if (note && failed === cards.length) note.hidden = false;
    });
  });
})();
