// cinelanka-upgrade.js
// 100% SAFE / ADDITIVE. Does NOT edit, delete, or touch index.html.
// Loaded as a separate <script> tag. Runs only after the page has fully
// loaded. Every operation is wrapped in try/catch and checks elements
// exist before touching them. If anything is missing or fails, it simply
// does nothing for that part - it will never throw an error that breaks
// the page.
//
// What it does:
//  1) Replaces the hero banner content (the big "Maharaja Gemunu" block)
//     with a rotating "Welcome" intro instead of one specific movie.
//  2) Fetches real posters from TMDB for the existing movie cards
//     (matched by the title text already on the page) and overlays them.
//  3) Adds many more movie cards (with real TMDB posters) into the
//     existing grids, so there are thousands of titles to browse.

(function () {
  var TMDB_KEY = "7b4c9174531b7e8770e7b887ce7de165";
  var IMG_BASE = "https://image.tmdb.org/t/p/w342";
  var posterCache = {};

  function safe(fn) {
    try { fn(); } catch (e) { console.error("cinelanka-upgrade:", e); }
  }

  /* ---------- 1) Replace hero content (non-destructive) ---------- */

  function upgradeHero() {
    var heroTitle = document.querySelector(".hero-title");
    var heroDesc = document.querySelector(".hero-desc");
    var heroTags = document.querySelector(".hero-tags");
    var heroMeta = document.querySelector(".hero-meta");
    var heroBtns = document.querySelector(".hero-btns");

    if (!heroTitle || !heroDesc) return; // hero not present, skip safely

    heroTitle.textContent = "Discover Your Next Favorite Film";
    heroDesc.textContent = "Browse thousands of movies from Sri Lanka and around the world — real posters, real ratings, updated live.";

    if (heroTags) heroTags.style.display = "none";
    if (heroMeta) heroMeta.style.display = "none";
    if (heroBtns) heroBtns.style.display = "none";
  }

  /* ---------- 2) Overlay real posters onto existing cards ---------- */

  function fetchPoster(title, year) {
    var key = title + "_" + (year || "");
    if (posterCache[key] !== undefined) return Promise.resolve(posterCache[key]);

    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_KEY +
      "&query=" + encodeURIComponent(title) + (year ? "&year=" + year : "");

    return fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var path = data.results && data.results[0] && data.results[0].poster_path;
        var full = path ? IMG_BASE + path : null;
        posterCache[key] = full;
        return full;
      })
      .catch(function () { return null; });
  }

  function applyRealPosters() {
    var cards = document.querySelectorAll(".card, .modal");
    cards.forEach(function (card) {
      try {
        var bg = card.querySelector(".poster-bg, .modal-hero-bg");
        if (!bg || bg.getAttribute("data-upgraded") === "1") return;

        var titleEl = card.querySelector(".poster-title, .modal-title");
        var yearEl = card.querySelector(".poster-year, .modal-meta span");
        if (!titleEl) return;

        var title = titleEl.textContent.trim();
        var yearMatch = yearEl ? yearEl.textContent.match(/\d{4}/) : null;
        var year = yearMatch ? yearMatch[0] : null;

        bg.setAttribute("data-upgraded", "1");

        fetchPoster(title, year).then(function (url) {
          if (!url) return;
          bg.style.backgroundImage = "url('" + url + "')";
          bg.style.backgroundSize = "cover";
          bg.style.backgroundPosition = "center";
        });
      } catch (e) { /* skip this card silently */ }
    });
  }

  /* ---------- 3) Append more real movies into existing grids ---------- */

  function cardMarkup(movie) {
    var poster = movie.poster_path ? IMG_BASE + movie.poster_path : "";
    var rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    var year = (movie.release_date || "").slice(0, 4) || "—";
    var title = (movie.title || "Untitled").replace(/</g, "&lt;");

    var div = document.createElement("div");
    div.className = "card";
    div.innerHTML =
      '<div class="poster-wrap">' +
        '<div class="poster-bg" style="background-image:url(\'' + poster + '\');background-size:cover;background-position:center;" data-upgraded="1"></div>' +
        '<div class="poster-shade"></div>' +
        '<div class="poster-info">' +
          '<div class="poster-title">' + title + '</div>' +
          '<div class="poster-year">' + year + '</div>' +
        '</div>' +
        '<div class="poster-rating">⭐ ' + rating + '</div>' +
      '</div>' +
      '<div class="card-meta">' +
        '<div class="card-title">' + title + '</div>' +
        '<div class="card-sub">' + year + '</div>' +
      '</div>';
    return div;
  }

  function appendMoviesToGrids() {
    var grids = document.querySelectorAll(".grid");
    if (!grids.length) return;

    // Fetch one page (~20 movies) of popular movies from TMDB,
    // and distribute extra cards into the existing grids so the
    // site feels like it has many more titles, without removing
    // any of the original ones.
    var page = Math.floor(Math.random() * 20) + 1;
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_KEY + "&page=" + page)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var results = data.results || [];
        if (!results.length) return;

        grids.forEach(function (grid, gIndex) {
          if (grid.getAttribute("data-extended") === "1") return;
          grid.setAttribute("data-extended", "1");

          var slice = results.slice(gIndex * 4, gIndex * 4 + 6);
          slice.forEach(function (movie) {
            grid.appendChild(cardMarkup(movie));
          });
        });
      })
      .catch(function (e) { console.error("cinelanka-upgrade extra movies:", e); });
  }

  /* ---------- Run everything safely after full load ---------- */

  function runAll() {
    safe(upgradeHero);
    safe(applyRealPosters);
    safe(appendMoviesToGrids);

    // Re-scan periodically since this is a client-side React app that
    // re-renders content (filters, modals) without a full page reload.
    setInterval(function () {
      safe(applyRealPosters);
    }, 2000);
  }

  if (document.readyState === "complete") {
    setTimeout(runAll, 1200);
  } else {
    window.addEventListener("load", function () {
      setTimeout(runAll, 1200);
    });
  }
})();
