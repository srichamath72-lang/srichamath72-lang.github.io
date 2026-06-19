// cinelanka-bg-video.js
// 100% SAFE / ADDITIVE. Does NOT touch, edit, or delete index.html.
// Native HTML5 Video - 100% Free from YouTube Play Buttons & Overlays.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  // CDN එකකින් සෘජුවම ලෝඩ් වන High-Quality Premium Cinematic Video Link එකක්
  var NATIVE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-vintage-film-projector-in-dark-room-42867-large.mp4";

  function injectBackgroundVideo() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    // සයිට් එකේ කන්ටෙන්ට් සහ මූවි කාඩ්ස් සුපිරියටම මතු කරවන CSS Styles
    var style = document.createElement('style');
    style.textContent = `
      html, body {
        background: #060608 !important;
      }
      /* සයිට් එකේ ප්‍රධාන containers වල පරණ backgrounds ඉවත් කිරීම */
      #app, main, section, .hero, .movies-container, .container, .wrapper {
        background: transparent !important;
        background-color: transparent !important;
      }
      /* මූවි කාඩ්ස් තවදුරටත් කැපී පෙනෙන්න පසුබිම තද කළු කිරීම (Solid blur effect) */
      .movie-card, .card, .trending-now, .top-rated, .movie-grid {
        background-color: rgba(10, 10, 14, 0.82) !important;
        backdrop-filter: blur(12px) !important;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
      }
      /* ටෙක්ස්ට් ඔක්කොම සුදු පාටින් ලස්සනට පේන්න සැලැස්වීම */
      h1, h2, h3, h4, p, span, a {
        text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.id = "cl-bg-video-wrap";
    wrap.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:-9999 !important;overflow:hidden;pointer-events:none;background:#060608;";

    var clipper = document.createElement("div");
    clipper.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";

    // 🛠️ NO MORE YOUTUBE: කෙලින්ම HTML5 Native Video Tag එකක් භාවිතය (කිසිම බටන් එකක් එන්නේ නැත)
    var video = document.createElement("video");
    video.src = NATIVE_VIDEO_URL;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    
    // වීඩියෝව ස්ක්‍රීන් එකට Cover වන සේ සැකසීම සහ බ්‍රයිට්නස් එක (Opacity 0.14) අඩු කිරීම
    video.style.cssText =
      "position:absolute;top:50%;left:50%;" +
      "min-width:100%;min-height:100%;width:auto;height:auto;" +
      "transform:translate(-50%,-50%) scale(1.1);object-fit:cover;border:none;pointer-events:none;" +
      "opacity: 0.14 !important;"; 

    // මූවිස් ලස්සනට පේන්න වීඩියෝව උඩින් දමන Dark Red / Black Overlay එක
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background: radial-gradient(circle at center, rgba(35, 7, 12, 0.4) 0%, rgba(6, 6, 8, 0.97) 85%) !important;" +
      "z-index:2;pointer-events:none;";

    clipper.appendChild(video);
    wrap.appendChild(clipper);
    wrap.appendChild(overlay);
    document.body.appendChild(wrap);

    document.body.style.background = "transparent";
  }

  function makeMainBgTransparent() {
    var bgEl = document.querySelector(".navbar");
    if (bgEl && bgEl.getAttribute("data-bg-tweaked") !== "1") {
      bgEl.setAttribute("data-bg-tweaked", "1");
      bgEl.style.background = "rgba(6, 6, 8, 0.85)";
      bgEl.style.backdropFilter = "blur(12px)";
    }
  }

  function start() {
    safe(injectBackgroundVideo, "inject-video");
    setInterval(function () { safe(makeMainBgTransparent, "navbar-bg"); }, 1500);
  }

  if (document.readyState === "complete") {
    setTimeout(start, 500);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 500); });
  }
})();