// 1. CSS Styles - වීඩියෝව පසුබිමට දමා අනෙක් Layers විනිවිද පෙනෙන (Transparent) කිරීම
const style = document.createElement('style');
style.textContent = `
    /* Video Container එක මුළු Screen එකටම සෙට් කිරීම */
    .cinema-video-bg-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -9999; /* හැමදේටම යටින් තැබීමට */
        overflow: hidden;
        background-color: #060608;
    }

    /* වීඩියෝවේ ප්‍රමාණය සහ Stretch වීම වැළැක්වීම */
    .cinema-video-bg-container video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-50%, -50%);
        object-fit: cover;
        opacity: 0.18; /* වීඩියෝව Semi-Transparent (විනිවිද පෙනෙන) කිරීමට */
    }

    /* රූපයේ තිබූ Dark Red & Black Vibe එක දීමට Overlay එකක් */
    .cinema-video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(61, 20, 29, 0.45) 0%, rgba(7, 7, 8, 0.95) 90%);
        z-index: 1;
    }

    /* Content එක කියවීමට පහසු කරවන Bottom Shadow/Glow එක */
    .cinema-video-overlay::after {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(to bottom, transparent 0%, rgba(7, 7, 8, 0.3) 50%, #070708 100%);
    }

    /* CRITICAL FIX: සයිට් එකේ පරණ Backgrounds ඉවත් කර වීඩියෝව මතු කර පෙන්වීම */
    body, html {
        background-color: transparent !important;
        background: transparent !important;
    }

    /* සයිට් එකේ අනෙකුත් කොටස් Transparent කිරීම */
    main, section, .content-wrapper, .container {
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Video elements ටික සේෆ් විදිහට Page එකට එකතු කිරීම
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.cinema-video-bg-container')) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'cinema-video-bg-container';

        // High-Quality Cinematic Film Reel Video එක (Loop වෙන, සෙමින් චලනය වන එකක්)
        videoContainer.innerHTML = `
            <div class="cinema-video-overlay"></div>
            <video autoplay loop muted playsinline poster="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-vintage-film-projector-in-dark-room-42867-large.mp4" type="video/mp4">
            </video>
        `;

        // Body එකේ මුලටම සේෆ් විදිහට ඉන්ජෙක්ට් කිරීම
        document.body.insertBefore(videoContainer, document.body.firstChild);
    }
});