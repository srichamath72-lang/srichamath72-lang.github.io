// 1. CSS Styles - Background එක සහ Movie Tape එක 100%ක්ම උඩට මතු කර පෙන්වීම
const style = document.createElement('style');
style.textContent = `
    /* Main Background Container */
    .cinema-premium-bg-wall {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: -9999 !important; /* හැමදේටම යටින් තැබීමට */
        background-color: #050507 !important;
        background: radial-gradient(circle at center, #250a10 0%, #050507 80%) !important;
        overflow: hidden !important;
        pointer-events: none !important;
    }

    /* Film Strip පටිය */
    .moving-film-strip-wrapper {
        position: absolute !important;
        top: 35% !important;
        left: 0 !important;
        width: 300vw !important;
        display: flex !important;
        gap: 20px !important;
        padding: 15px 0 !important;
        background: rgba(0, 0, 0, 0.85) !important;
        border-top: 6px dashed rgba(255, 255, 255, 0.25) !important;
        border-bottom: 6px dashed rgba(255, 255, 255, 0.25) !important;
        transform: rotate(-7deg) scale(1.1) !important;
        animation: moveFilmTape 25s linear infinite !important;
    }

    /* Film එක ඇතුලේ තියෙන චූටි මූවි ක්ලිප් කොටස් (Boxes) */
    .animated-movie-box {
        width: 280px !important;
        height: 160px !important;
        border-radius: 6px !important;
        background-size: cover !important;
        background-position: center !important;
        box-shadow: inset 0 0 30px rgba(0,0,0,0.8) !important;
        opacity: 0.25 !important; /* Content කියවන්න ලේසි වෙන්න තරමක් විනිවිද පෙනේ */
    }

    /* Film පටිය වමට ඇදී යන සුපිරි ඇනිමේෂන් එක */
    @keyframes moveFilmTape {
        0% { transform: rotate(-7deg) translateX(0) !important; }
        100% { transform: rotate(-7deg) translateX(-100vw) !important; }
    }

    /* 🚨 CRITICAL FORCE FIX: සයිට් එකේ පසුබිම වසාගෙන ඇති සියලුම Layers විනිවිද පෙනෙන (Transparent) කිරීම */
    html, body, #app, main, section, .hero, .movies-container, .container, .wrapper, [class*="bg-"], [class*="background"] {
        background: transparent !important;
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Elements ටික Page එක ලෝඩ් වෙද්දීම ආරක්ෂිතව ඇතුලත් කිරීම
function initCinemaBackground() {
    if (!document.querySelector('.cinema-premium-bg-wall')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-premium-bg-wall';

        // බ්ලොක් නොවී වේගයෙන් ලෝඩ් වන High-Quality සිනමා පින්තූර ලින්ක්ස්
        bgContainer.innerHTML = `
            <div class="moving-film-strip-wrapper">
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1478720143023-154ed96bcbd9?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1542204172-e7052809f852?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400');"></div>
                <div class="animated-movie-box" style="background-image: url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400');"></div>
            </div>
        `;

        // Body එකේ මුලටම (යටින්ම හිටින සේ) ආරක්ෂිතව ඇතුල් කිරීම
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
}

// සයිට් එකේ DOM එක ලෝඩ් වුණු වහාම ක්‍රියාත්මක කරවීම (Safe Execution)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinemaBackground);
} else {
    initCinemaBackground();
}