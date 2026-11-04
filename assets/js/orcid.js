// Pulls public works from ORCID (pub.orcid.org supports CORS, no key needed).
// Activated automatically once profile.yml has an `orcid` value.
(function () {
  var box = document.getElementById('orcid-works');
  if (!box) return;
  var id = box.getAttribute('data-orcid');
  fetch('https://pub.orcid.org/v3.0/' + id + '/works', { headers: { Accept: 'application/json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var groups = data.group || [];
      if (!groups.length) { var sec = box.closest('section'); if (sec) sec.hidden = true; return; }
      box.innerHTML = '';
      groups.forEach(function (g) {
        var s = g['work-summary'][0];
        var title = s.title && s.title.title ? s.title.title.value : 'Untitled';
        var year = s['publication-date'] && s['publication-date'].year ? s['publication-date'].year.value : '';
        var venue = s['journal-title'] ? s['journal-title'].value : '';
        var doi = ((s['external-ids'] || {})['external-id'] || []).filter(function (x) { return x['external-id-type'] === 'doi'; })[0];
        var el = document.createElement('article');
        el.className = 'pub';
        var body = document.createElement('div'); body.className = 'pub-body';
        var meta = document.createElement('p'); meta.className = 'meta'; meta.textContent = (s.type || '').replace(/-/g, ' ') + (year ? ' · ' + year : '');
        var h = document.createElement('h3'); h.className = 'pub-title'; h.textContent = title;
        body.appendChild(meta); body.appendChild(h);
        if (venue) { var v = document.createElement('p'); v.className = 'venue'; v.textContent = venue; body.appendChild(v); }
        if (doi) {
          var a = document.createElement('a'); a.className = 'doi-badge'; a.href = 'https://doi.org/' + doi['external-id-value'];
          a.innerHTML = '<span>DOI</span>'; a.appendChild(document.createTextNode(doi['external-id-value']));
          var p = document.createElement('p'); p.className = 'actions'; p.appendChild(a); body.appendChild(p);
        }
        el.appendChild(body); box.appendChild(el);
      });
    })
    .catch(function () { var sec = box.closest('section'); if (sec) sec.hidden = true; });
})();
