// cinelanka-extras.js
// Combined add-on file for CineLanka:
//  1) "Watch Trailer" -> streaming platform redirect popup
//  2) Real movie posters fetched from TMDB
//
// This is a separate file, loaded with one <script> tag.
// It does NOT require editing or deleting any existing code in index.html,
// except adding one script tag near the end of the file (before </body>).

(function () {
  /* ---------- PART 1: Watch Trailer -> Streaming Links ---------- */

  function getWatchLinks(movie) {
    var q = encodeURIComponent(movie.title + ' ' + movie.year);
    if (movie.type === 'srilanka') {
      return [
        { name: 'Search on YouTube', icon: '▶️', url: 'https://www.youtube.com/results?search_query=' + q + ' full movie' },
        { name: 'Search on PEOTV', icon: '📺', url: 'https://www.google.com/search?q=' + q + ' site:peotv.com' },
        { name: 'Find Cinema Tickets', icon: '🎟️', url: 'https://www.google.com/search?q=' + q + ' cinema tickets sri lanka' }
      ];
    }
    return [
      { name: 'Watch on Netflix', icon: '🔴', url: 'https://www.netflix.com/search?q=' + q },
      { name: 'Watch on Prime Video', icon: '🔵', url: 'https://www.amazon.com/s?k=' + q + '&i=instant-video' },
      { name: 'Watch on Disney+', icon: '⭐', url: 'https://www.disneyplus.com/search?q=' + q },
      { name: 'Search YouTube Trailer', icon: '▶️', url: 'https://www.youtube.com/results?search_query=' + q + ' trailer' }
    ];
  }

  function buildOverlay(movie) {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '16px';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.backdropFilter = 'blur(6px)';

    var box = document.createElement('div');
    box.style.background = '#18181b';
    box.style.border = '1px solid rgba(255,255,255,0.1)';
    box.style.borderRadius = '16px';
    box.style.padding = '28px';
    box.style.width = '100%';
    box.style.maxWidth = '340px';
    box.style.fontFamily = '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif';
    box.style.color = '#fff';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.float = 'right';
    closeBtn.style.color = '#71717a';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = function () { document.body.removeChild(overlay); };

    var title = document.createElement('div');
    title.textContent = 'Where to Watch';
    title.style.fontSize = '20px';
    title.style.fontWeight = '800';
    title.style.marginBottom = '14px';
    title.style.clear = 'both';
    title.style.paddingTop = '4px';

    box.appendChild(closeBtn);
    box.appendChild(title);

    var linksWrap = document.createElement('div');
    linksWrap.style.display = 'flex';
    linksWrap.style.flexDirection = 'column';
    linksWrap.style.gap = '8px';

    getWatchLinks(movie).forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = l.icon + '  ' + l.name;
      a.style.display = 'flex';
      a.style.alignItems = 'center';
      a.style.gap = '8px';
      a.style.padding = '10px 16px';
      a.style.borderRadius = '8px';
      a.style.border = '1px solid rgba(255,255,255,0.1)';
      a.style.color = '#fff';
      a.style.textDecoration = 'none';
      a.style.fontSize = '13px';
      a.style.fontWeight = '600';
      linksWrap.appendChild(a);
    });

    box.appendChild(linksWrap);

    var note = document.createElement('p');
    note.textContent = "You'll be redirected to the streaming platform. Availability depends on your region and subscription.";
    note.style.fontSize = '11px';
    note.style.color = '#71717a';
    note.style.marginTop = '14px';
    box.appendChild(note);

    overlay.appendChild(box);
    overlay.onclick = function (e) { if (e.target === overlay) document.body.removeChild(overlay); };
    document.body.appendChild(overlay);
  }

  window.showWatchLinks = function (movie) {
    buildOverlay(movie);
  };

  /* ---------- PART 2: TMDB Real Movie Posters ---------- */

  var TMDB_API_KEY = "7b4c9174531b7e8770e7b887ce7de165";
  var TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
  var TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";

  var posterCache = {};

  function fetchPoster(title, year) {
    var key = title + "_" + year;
    if (posterCache[key] !== undefined) return Promise.resolve(posterCache[key]);

    var url = TMDB_SEARCH_URL + "?api_key=" + TMDB_API_KEY +
      "&query=" + encodeURIComponent(title) +
      (year ? "&year=" + year : "");

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var posterPath = (data.results && data.results[0] && data.results[0].poster_path) || null;
        var fullUrl = posterPath ? TMDB_IMG_BASE + posterPath : null;
        posterCache[key] = fullUrl;
        return fullUrl;
      })
      .catch(function () { return null; });
  }

  function extractTitleYear(card) {
    var titleEl = card.querySelector(".poster-title, .card-title, .modal-title, .hero-title");
    var yearEl = card.querySelector(".poster-year, .card-sub");
    var title = titleEl ? titleEl.textContent.trim() : null;
    var year = null;
    if (yearEl) {
      var match = yearEl.textContent.match(/\d{4}/);
      if (match) year = match[0];
    }
    return { title: title, year: year };
  }

  function applyPosterToBox(box, url) {
    if (!url || box.dataset.posterApplied) return;
    box.style.backgroundImage = "url('" + url + "')";
    box.style.backgroundSize = "cover";
    box.style.backgroundPosition = "center";
    var emojiLayer = box.querySelector(":scope > div");
    if (emojiLayer) emojiLayer.style.opacity = "0";
    box.dataset.posterApplied = "true";
  }

  function processCard(card) {
    var box = card.querySelector(".poster-bg, .modal-hero, .hero-bg");
    if (!box || box.dataset.posterRequested) return;
    box.dataset.posterRequested = "true";

    var info = extractTitleYear(card);
    if (!info.title) return;

    fetchPoster(info.title, info.year).then(function (url) {
      if (url) applyPosterToBox(box, url);
    });
  }

  function scanAndApplyPosters() {
    document.querySelectorAll(".card, .modal, .hero").forEach(processCard);
  }

  setTimeout(scanAndApplyPosters, 800);
  setInterval(scanAndApplyPosters, 1500);
})();
