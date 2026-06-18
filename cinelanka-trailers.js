// cinelanka-trailers.js
// 100% LEGAL, SAFE, ADDITIVE. Does NOT touch index.html.
//
// Plays official movie trailers from YouTube directly inside a popup
// on the site. This is legal because:
//   - Trailers are released publicly by studios/distributors for promotion
//   - YouTube's embed player is used (not downloading/rehosting video files)
//   - No full movies are ever shown - trailers only
//
// This REPLACES the behavior of the "Watch Trailer" button: instead of
// only showing streaming links, it now also offers a "Play Trailer"
// option that opens an embedded YouTube player.

(function () {
  var TMDB_KEY = "7b4c9174531b7e8770e7b887ce7de165";

  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-trailers [" + label + "]:", e); }
  }

  function fetchTrailerKey(title, year) {
    var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_KEY +
      "&query=" + encodeURIComponent(title) + (year ? "&year=" + year : "");

    return fetch(searchUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var movie = data.results && data.results[0];
        if (!movie) return null;
        var videosUrl = "https://api.themoviedb.org/3/movie/" + movie.id + "/videos?api_key=" + TMDB_KEY;
        return fetch(videosUrl).then(function (r2) { return r2.json(); });
      })
      .then(function (videoData) {
        if (!videoData || !videoData.results) return null;
        var trailer = videoData.results.find(function (v) {
          return v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser");
        });
        return trailer ? trailer.key : null;
      })
      .catch(function (e) {
        console.error("Trailer fetch failed:", e);
        return null;
      });
  }

  function openTrailerPlayer(youtubeKey, title) {
    var existing = document.getElementById("cl-trailer-overlay");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var overlay = document.createElement("div");
    overlay.id = "cl-trailer-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.92);";

    var box = document.createElement("div");
    box.style.cssText = "width:100%;max-width:720px;background:#000;border-radius:12px;overflow:hidden;position:relative;";

    var closeBtn = document.createElement("button");
    closeBtn.textContent = "✕ Close";
    closeBtn.style.cssText = "position:absolute;top:-40px;right:0;background:rgba(255,255,255,0.1);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-size:13px;cursor:pointer;";
    closeBtn.onclick = function () { overlay.remove(); };

    var iframeWrap = document.createElement("div");
    iframeWrap.style.cssText = "position:relative;width:100%;padding-top:56.25%;"; // 16:9 ratio

    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + youtubeKey + "?autoplay=1&rel=0";
    iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;";
    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "true");

    iframeWrap.appendChild(iframe);
    box.appendChild(closeBtn);
    box.appendChild(iframeWrap);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  function showNoTrailerMessage(title) {
    alert("No official trailer found for \"" + title + "\" on YouTube. Try the streaming links instead.");
  }

  function playTrailerForMovie(title, year) {
    var origIcon = null;
    fetchTrailerKey(title, year).then(function (key) {
      if (key) {
        openTrailerPlayer(key, title);
      } else {
        showNoTrailerMessage(title || "this movie");
      }
    });
  }

  // ---- Add a circular play-button overlay on top of movie poster images ----

  function addPlayOverlayToHero() {
    document.querySelectorAll(".modal-hero").forEach(function (hero) {
      try {
        if (hero.getAttribute("data-play-overlay") === "1") return;
        var titleEl = hero.querySelector(".modal-title");
        if (!titleEl) return;
        hero.setAttribute("data-play-overlay", "1");

        var title = titleEl.textContent.trim();
        var metaEl = hero.parentElement ? hero.parentElement.querySelector(".modal-meta") : null;
        var year = metaEl ? (metaEl.textContent.match(/\d{4}/) || [])[0] : null;

        var playBtn = document.createElement("button");
        playBtn.innerHTML = "▶";
        playBtn.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.9);color:#000;font-size:20px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;box-shadow:0 4px 16px rgba(0,0,0,0.4);";
        hero.style.position = hero.style.position || "relative";

        playBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          playBtn.innerHTML = "...";
          playTrailerForMovie(title, year);
          setTimeout(function () { playBtn.innerHTML = "▶"; }, 1500);
        });

        hero.appendChild(playBtn);
      } catch (e) { console.error("addPlayOverlayToHero error:", e); }
    });
  }

  function addPlayOverlayToCards() {
    document.querySelectorAll(".poster-wrap").forEach(function (wrap) {
      try {
        if (wrap.getAttribute("data-play-overlay") === "1") return;
        var titleEl = wrap.querySelector(".poster-title");
        if (!titleEl) return;
        wrap.setAttribute("data-play-overlay", "1");

        var existingPlay = wrap.querySelector(".poster-play");
        if (existingPlay) {
          // Repurpose the existing hover play icon to actually play the trailer
          existingPlay.style.cursor = "pointer";
          existingPlay.addEventListener("click", function (e) {
            e.stopPropagation();
            var title = titleEl.textContent.trim();
            var yearEl = wrap.querySelector(".poster-year");
            var year = yearEl ? (yearEl.textContent.match(/\d{4}/) || [])[0] : null;
            playTrailerForMovie(title, year);
          });
        }
      } catch (e) { console.error("addPlayOverlayToCards error:", e); }
    });
  }

  setInterval(function () {
    try { addPlayOverlayToHero(); } catch (e) {}
    try { addPlayOverlayToCards(); } catch (e) {}
  }, 1500);

  // Override / extend the existing showWatchLinks popup to add a
  // "Play Trailer" button at the top, above the streaming links.
  var originalShowWatchLinks = window.showWatchLinks;

  window.showWatchLinks = function (movie) {
    // Call the original popup first (streaming links), then inject
    // a "Play Trailer" button into it.
    if (typeof originalShowWatchLinks === "function") {
      originalShowWatchLinks(movie);
    }

    safe(function () {
      var overlay = document.getElementById("cl-watch-overlay");
      if (!overlay) return;
      var box = overlay.querySelector("div");
      if (!box) return;

      if (box.querySelector("#cl-play-trailer-btn")) return; // already added

      var playBtn = document.createElement("button");
      playBtn.id = "cl-play-trailer-btn";
      playBtn.textContent = "▶️  Play Official Trailer";
      playBtn.style.cssText = "display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 16px;border-radius:8px;background:linear-gradient(90deg,#a855f7,#ec4899);color:#fff;font-weight:700;font-size:14px;border:none;cursor:pointer;margin-bottom:12px;";

      playBtn.addEventListener("click", function () {
        playBtn.textContent = "Loading trailer...";
        playBtn.disabled = true;
        fetchTrailerKey(movie.title, movie.year).then(function (key) {
          if (key) {
            overlay.remove();
            openTrailerPlayer(key, movie.title);
          } else {
            playBtn.textContent = "▶️  Play Official Trailer";
            playBtn.disabled = false;
            showNoTrailerMessage(movie.title || "this movie");
          }
        });
      });

      var titleRow = box.querySelector("div"); // the "Where to Watch" header row
      if (titleRow && titleRow.nextSibling) {
        box.insertBefore(playBtn, titleRow.nextSibling);
      } else {
        box.appendChild(playBtn);
      }
    }, "inject-play-button");
  };
})();
