// 1. Dynamic CSS Styles Fix
const style = document.createElement('style');
style.textContent = `
    /* Absolute Base Layer for Custom Animation */
    .cinema-premium-3d-bg {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: -999 !important; /* Content ekata yatatama thallu kirima */
        background-color: #060608 !important;
        background: radial-gradient(circle at 30% 30%, #1f050b 0%, #060608 90%) !important;
        overflow: hidden !important;
        pointer-events: none !important;
    }

    /* Ambient Lighting effect (Pulse Animation) */
    .ambient-glow-light {
        position: absolute !important;
        width: 120vw !important;
        height: 120vh !important;
        top: -10% !important;
        left: -10% !important;
        background: radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.04) 0%, transparent 60%) !important;
        filter: blur(50px) !important;
        animation: cinematicPulse 12s infinite alternate ease-in-out !important;
    }

    /* 3D Film Reel Layout - Left Side Positioned */
    .film-reel-3d {
        position: absolute !important;
        bottom: -80px !important;
        left: -120px !important;
        width: 500px !important;
        height: 500px !important;
        border: 15px solid rgba(255, 255, 255, 0.02) !important;
        border-radius: 50% !important;
        background: radial-gradient(circle, transparent 25%, rgba(0, 0, 0, 0.6) 26%, transparent 70%) !important;
        box-shadow: inset 0 0 60px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7) !important;
        opacity: 0.18 !important;
        animation: spinTheReel 90s linear infinite !important;
    }

    .film-reel-3d::before {
        content: "" !important;
        position: absolute !important;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 50% !important;
        background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 35deg,
            rgba(255, 255, 255, 0.02) 36deg,
            rgba(255, 255, 255, 0.02) 50deg
        ) !important;
    }

    /* Floating Film Strips - YouTube Shorts Vibe */
    .floating-strip {
        position: absolute !important;
        width: 160vw !important;
        height: 140px !important;
        background: rgba(0, 0, 0, 0.7) !important;
        border-top: 4px dashed rgba(255, 255, 255, 0.2) !important;
        border-bottom: 4px dashed rgba(255, 255, 255, 0.2) !important;
        opacity: 0.12 !important;
    }

    .strip-wave-1 {
        top: 20% !important;
        left: -10% !important;
        transform: rotate(-10deg) !important;
        animation: floatWaveOne 25s infinite alternate ease-in-out !important;
    }

    .strip-wave-2 {
        bottom: 30% !important;
        left: -15% !important;
        transform: rotate(12deg) !important;
        animation: floatWaveTwo 30s infinite alternate ease-in-out !important;
    }

    /* Animations Frames */
    @keyframes spinTheReel { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes floatWaveOne { 0% { transform: rotate(-10deg) translateY(0px); } 100% { transform: rotate(-8deg) translateY(-15px); } }
    @keyframes floatWaveTwo { 0% { transform: rotate(12deg) translateY(0px); } 100% { transform: rotate(14deg) translateY(20px); } }
    @keyframes cinematicPulse { 0% { opacity: 0.5; } 100% { opacity: 1; } }

    /* SAFE OVERRIDE FIX: Mulu site ekama Black wena eka nawattha, content cards bera gatha yuthuyi */
    html, body {
        background-color: #060608 !important; /* Base black set kirima */
    }

    /* Cards saha Main navigation block ekata transparent dark color thathwayak dhigha kirima */
    main, section, .hero, .movies-container, .container, .wrapper {
        background: transparent !important;
        background-color: transparent !important;
    }

    /* Oyage site eke cards/sections thiyena components walata black layer ekak dimen content eka safe wei */
    .trending-now, .top-rated, .movie-card, .card {
        background-color: rgba(15, 15, 20, 0.6) !important; /* Cards lassanata mathu wenna */
        backdrop-filter: blur(5px);
        border-radius: 8px;
    }
`;
document.head.appendChild(style);

// 2. DOM Ready Controller for Safe Execution
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

        // Body eke mulatama safe insertion kirima
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCinemaAnimation);
} else {
    injectCinemaAnimation();
}