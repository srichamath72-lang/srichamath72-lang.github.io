// cinelanka-bg-video.js
// 100% MOBILE SAFE & HIGH QUALITY. 
// Uses Premium Cinematic Background Grid Overlay instead of easily-blocked videos.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  // පළමු පින්තූරයේ වගේම ෆිල්ම් රීල් සහ ටේප් තියෙන ලස්සන සිනමා පසුබිම් පින්තූරයක්
  var CINEMATIC_IMAGE_URL = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920";

  function injectStaticCinematicBackground() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    // සයිට් එකේ පරණ තද කළු backgrounds බලෙන්ම ඉවත් කර විනිවිද පෙනෙන්න සලස්වන කොටස
    var style = document.createElement('style');
    style.textContent = `
      html, body, #root, #app, #__next, main, .min-h-screen, 
      [class*="bg-background"], [class*="bg-neutral"], [class*="bg-black"] {
        background: transparent !important;
        background-color: transparent !important;
      }
      
      html {
        background-color: #060608 !important; /* Base Color */
      }

      /* මූවි කාඩ්ස් වල පෙනුම සහ අකුරු සුපිරියටම මතු කර පෙන්වීම */
      .movie-card, .card {
        background-color: rgba(15, 15, 20, 0.75) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.6) !important;
      }

      /* අකුරු වලට Shadow එකක් දී කියවීමේ පහසුව වැඩි කිරීම */
      h1, h2, h3, h4, p, span, a, .trending-now {
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9) !important;
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.id = "cl-bg-video-wrap";
    wrap.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:-9999 !important;overflow:hidden;pointer-events:none;";

    // 🛠️ IMAGE LAYER: වීඩියෝ වෙනුවට බ්ලොක් නොවී 100%ක්ම පෙනෙන සිනමා පසුබිම
    var bgImage = document.createElement("div");
    bgImage.style.cssText =
      "position:absolute;inset:0;" +
      "background-image: url('" + CINEMATIC_IMAGE_URL + "') !important;" +
      "background-size: cover !important;" +
      "background-position: center !important;" +
      "background-repeat: no-repeat !important;" +
      "opacity: 0.18 !important;" + // මූවිස් පේන්න පසුබිම සියුම්ව (Subtle) තැබීම
      "transform: scale(1.05);";

    // 🛠️ CINEMATIC OVERLAY: පළමු පින්තූරයේ වගේම මැදින් තද රතු සහ වටේට කළු සිනමා Gradient එකක් දීම
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background: radial-gradient(circle at center, rgba(45, 8, 15, 0.45) 0%, rgba(6, 6, 8, 0.98) 85%) !important;" +
      "z-index:2;";

    wrap.appendChild(bgImage);
    wrap.appendChild(overlay);
    document.body.appendChild(wrap);
  }

  // සයිට් එකේ Navbar එකත් ලස්සනට Transparent කිරීම
  function makeMainBgTransparent() {
    var bgEl = document.querySelector(".navbar") || document.querySelector("header");
    if (bgEl && bgEl.getAttribute("data-bg-tweaked") !== "1") {
      bgEl.setAttribute("data-bg-tweaked", "1");
      bgEl.style.setProperty("background", "rgba(6, 6, 8, 0.8)", "important");
      bgEl.style.setProperty("backdrop-filter", "blur(12px)", "important");
    }
  }

  function start() {
    safe(injectStaticCinematicBackground, "inject-bg");
    setInterval(function () { safe(makeMainBgTransparent, "navbar-bg"); }, 1000);
  }

  if (document.readyState === "complete") {
    setTimeout(start, 200);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 200); });
  }
})();