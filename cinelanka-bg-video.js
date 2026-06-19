// cinelanka-bg-video.js
// 100% SAFE / ADDITIVE. Does NOT touch, edit, or delete index.html.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  var YOUTUBE_VIDEO_ID = "f_7JcXeQOdM"; 

  function injectBackgroundVideo() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    // සයිට් එකේ කන්ටෙන්ට් මතු කරන සහ පරණ බැක්ග්‍රවුන්ඩ් අයින් කරන CSS
    var style = document.createElement('style');
    style.textContent = `
      html, body {
        background: #060608 !important;
      }
      #app, main, section, .hero, .movies-container, .container, .wrapper {
        background: transparent !important;
        background-color: transparent !important;
      }
      .movie-card, .card, .trending-now, .top-rated, .movie-grid {
        background-color: rgba(10, 10, 14, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
      }
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

    // 🛠️ FIX: ක්ලිපර් එක 100% ක් මුළු ස්ක්‍රීන් එකම වසන සේ නැවත හැදුවා (දැන් වීඩියෝ එක අනිවාර්යයෙන්ම පේනවා)
    var clipper = document.createElement("div");
    clipper.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";

    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID +
      "?autoplay=1&mute=1&loop=1&playlist=" + YOUTUBE_VIDEO_ID +
      "&controls=0&unmute=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1";
    iframe.title = "Background";
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.setAttribute("tabindex", "-1");
    
    // 🛠️ වීඩියෝ එක මුළු ස්ක්‍රීන් එකටම ලස්සනට ෆිට් කර, ඕනෑම ක්ලික් එකක් බ්ලොක් කර අයිකන්ස් නැති කිරීම
    iframe.style.cssText =
      "position:absolute;top:50%;left:50%;" +
      "width:100vw;height:56.25vw;min-height:100vh;min-width:177.78vh;" + 
      "transform:translate(-50%,-50%) scale(1.3);border:none;pointer-events:none;" +
      "opacity: 0.15 !important;"; 

    // මූවිස් ලස්සනට පේන්න වීඩියෝව උඩින් දමන Dark Red / Black Overlay එක
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background: radial-gradient(circle at center, rgba(35, 7, 12, 0.45) 0%, rgba(6, 6, 8, 0.96) 80%) !important;" +
      "z-index:2;pointer-events:none;";

    // 🛠️ යූටියුබ් එකේ බටන්ස් උඩින් ක්ලික් වීම වැළැක්වීමට දමන ආරක්ෂිත තට්ටුව (Click Blocker Layer)
    var clickBlocker = document.createElement("div");
    clickBlocker.style.cssText = "position:absolute;inset:0;z-index:5;background:transparent;pointer-events:all;";

    clipper.appendChild(iframe);
    wrap.appendChild(clipper);
    wrap.appendChild(overlay);
    wrap.appendChild(clickBlocker);
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
    setTimeout(start, 800);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 800); });
  }
})();