// 1. Dynamic CSS Styles - Video eke thiyena 3D Film Reel & Floating Strips look eka hadanna
const style = document.createElement('style');
style.textContent = `
    /* Main Background Container */
    .cinema-premium-3d-bg {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: -9999 !important; /* Content okkomata yatata danna */
        background-color: #060608 !important;
        background: radial-gradient(circle at 30% 30%, #22070d 0%, #060608 85%) !important;
        overflow: hidden !important;
        pointer-events: none !important;
    }

    /* Ambient Glow (Video eke thiyena wage lassanata nivi nivi paththu wena light effect eka) */
    .ambient-glow-light {
        position: absolute;
        width: 120vw;
        height: 120vh;
        top: -10%;
        left: -10%;
        background: radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.04) 0%, transparent 60%),
                    radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.02) 0%, transparent 50%);
        filter: blur(50px);
        animation: cinematicPulse 12s infinite alternate ease-in-out;
    }

    /* 3D Film Reel - Left Side (Video eke wage paththakin karakena loku reel eka) */
    .film-reel-3d {
        position: absolute;
        bottom: -100px;
        left: -150px;
        width: 550px;
        height: 550px;
        border: 18px solid rgba(255, 255, 255, 0.015);
        border-radius: 50%;
        background: radial-gradient(circle, transparent 25%, rgba(0, 0, 0, 0.5) 26%, transparent 70%);
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6);
        opacity: 0.12;
        transform-style: preserve-3d;
        animation: spinTheReel 90s linear infinite;
    }

    /* Reel spokes (Reel eke meda thiyena rawum hitala thiyena thawa kootu) */
    .film-reel-3d::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 50%;
        background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 35deg,
            rgba(255, 255, 255, 0.02) 36deg,
            rgba(255, 255, 255, 0.02) 50deg
        );
    }

    /* Floating Film Strips - (Reel eken badila udata floating wela yana film pti 2ka) */
    .floating-strip {
        position: absolute;
        width: 160vw;
        height: 160px;
        background: rgba(0, 0, 0, 0.75);
        border-top: 4px dashed rgba(255, 255, 255, 0.15);
        border-bottom: 4px dashed rgba(255, 255, 255, 0.15);
        opacity: 0.08;
    }

    .strip-wave-1 {
        top: 15%;
        left: -10%;
        transform: rotate(-12deg);
        animation: floatWaveOne 25s infinite alternate ease-in-out;
    }

    .strip-wave-2 {
        bottom: 25%;
        left: -20%;
        transform: rotate(15deg);
        animation: floatWaveTwo 30s infinite alternate ease-in-out;
    }

    /* Animations - Video eke wage hugaak slow eke float wenna container animations */
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

    /* FORCE TRANSPARENT - Parana thada kalu paata backgrounds ain karanna meka aniwarayenma one */
    html, body, #app, main, section, .hero, .movies-container, .container, .wrapper, [class*="bg-"], [class*="background"] {
        background: transparent !important;
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Elements Injection - DOM eka ready unama safe widihata inject kirima
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

        // Body eke mulatama set karanna
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
}

// Safe execute checks
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCinemaAnimation);
} else {
    injectCinemaAnimation();
}