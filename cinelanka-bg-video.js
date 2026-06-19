// 1. CSS Styles - සයිට් එකේ උඩින්ම ඇනිමේෂන් එක මතු කර පෙන්වීම සඳහා වන Force Override එක
const style = document.createElement('style');
style.textContent = `
    /* Main Background Container */
    .cinema-premium-3d-bg {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        /* සයිට් එකේ අනිත් හැමදේටම යටින්, නමුත් background එකට උඩින් සිටින සේ z-index එක සකස් කිරීම */
        z-index: -1 !important; 
        background-color: #060608 !important;
        background: radial-gradient(circle at 30% 30%, #22070d 0%, #060608 85%) !important;
        overflow: hidden !important;
        pointer-events: none !important;
    }

    /* Ambient Glow (ලස්සනට නිවෙමින් පත්තුවන ආලෝකය) */
    .ambient-glow-light {
        position: absolute !important;
        width: 120vw !important;
        height: 120vh !important;
        top: -10% !important;
        left: -10% !important;
        background: radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.05) 0%, transparent 60%),
                    radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.02) 0%, transparent 50%) !important;
        filter: blur(50px) !important;
        animation: cinematicPulse 12s infinite alternate ease-in-out !important;
    }

    /* 3D Film Reel - Left Side (වීඩියෝ එකේ වගේ පැත්තකින් කැරකෙන ලොකු රීල් එක) */
    .film-reel-3d {
        position: absolute !important;
        bottom: -100px !important;
        left: -150px !important;
        width: 550px !important;
        height: 550px !important;
        border: 18px solid rgba(255, 255, 255, 0.015) !important;
        border-radius: 50% !important;
        background: radial-gradient(circle, transparent 25%, rgba(0, 0, 0, 0.5) 26%, transparent 70%) !important;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6) !important;
        opacity: 0.15 !important;
        animation: spinTheReel 90s linear infinite !important;
    }

    /* Reel Spokes (රීල් එක මැද තියෙන කූරු) */
    .film-reel-3d::before {
        content: "" !important;
        position: absolute !important;
        top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
        border-radius: 50% !important;
        background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 35deg,
            rgba(255, 255, 255, 0.02) 36deg,
            rgba(255, 255, 255, 0.02) 50deg
        ) !important;
    }

    /* Floating Film Strips (රීල් එකෙන් මිදී උඩට පාවී යන ෆිල්ම් පටි) */
    .floating-strip {
        position: absolute !important;
        width: 160vw !important;
        height: 160px !important;
        background: rgba(0, 0, 0, 0.75) !important;
        border-top: 4px dashed rgba(255, 255, 255, 0.15) !important;
        border-bottom: 4px dashed rgba(255, 255, 255, 0.15) !important;
        opacity: 0.1 !important;
    }

    .strip-wave-1 {
        top: 15% !important;
        left: -10% !important;
        transform: rotate(-12deg) !important;
        animation: floatWaveOne 25s infinite alternate ease-in-out !important;
    }

    .strip-wave-2 {
        bottom: 25% !important;
        left: -20% !important;
        transform: rotate(15deg) !important;
        animation: floatWaveTwo 30s infinite alternate ease-in-out !important;
    }

    /* Animations Keyframes */
    @keyframes spinTheReel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes floatWaveOne {
        0% { transform: rotate(-12deg) translateY(0px) translateX(0px); }
        100% { transform: rotate(-10deg) translateY(-20px) translateX(-30px); }
    }
    @keyframes floatWaveTwo {
        0% { transform: rotate(15deg) translateY(0px); }
        100% { transform: rotate(17deg) translateY(25px); }
    }
    @keyframes cinematicPulse {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.08); }
    }

    /* 🚨 100%ක්ම වැඩ කරවන ප්‍රධානතම කොටස (FORCE OVERRIDE) 🚨
       සයිට් එකේ බැක්ග්‍රවුන්ඩ් එක වසාගෙන ඇති සියලුම දේ විනිවිද පෙනෙන ලෙස සකස් කිරීම */
    html, body, #app, main, section, .hero, .movies-container, .container, .wrapper, 
    div[class*="bg-"], div[class*="background"], section[class*="bg-"], main[class*="bg-"] {
        background: transparent !important;
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Elements Injection - ඉතාම ආරක්ෂිතව ඇතුලත් කිරීම
function injectCinemaAnimation() {
    if (!document.querySelector('.cinema-premium-3d-bg')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-premium-3d-bg';

        bgContainer.innerHTML = `
            <div class="ambient-glow-light"></div>
            <div class="floating-strip strip-wave-1"></div>
            <div class="floating-strip strip-wave-2"></div>
            <div class="film-reel-3d"></div>
        `;

        // Body එකේ මුලටම (යටින්ම හිටින සේ) ආරක්ෂිතව ඇතුල් කිරීම
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
}

// Safe execution checks
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCinemaAnimation);
} else {
    injectCinemaAnimation();
}