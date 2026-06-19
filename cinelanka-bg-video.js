// 1. CSS Styles - Image එක බැක්ග්‍රවුන්ඩ් එකට දමා සයිට් එකේ අනෙක් කොටස් Transparent කිරීම
const style = document.createElement('style');
style.textContent = `
    /* Main Background Container */
    .cinema-premium-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -9999; /* හැමදේටම යටින් තැබීමට */
        background-color: #060608;
        /* මම ඔයා වෙනුවෙන්ම හදපු ඔරිජිනල් බැක්ග්‍රවුන්ඩ් ඉමේජ් එක */
        background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
    }

    /* රූපයේ තියෙන විදිහට Dark Red & Black Vibe එක දීමට Overlay එකක් */
    .cinema-premium-bg::before {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(circle at center, rgba(61, 20, 29, 0.4) 0%, rgba(7, 7, 8, 0.95) 90%);
        z-index: 1;
    }

    /* සයිට් එකේ Content එක උඩින් ලස්සනට කියවන්න පුළුවන් වෙන්න දාන Glow එකක් */
    .cinema-premium-bg::after {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(to bottom, transparent 0%, rgba(7, 7, 8, 0.4) 50%, #070708 100%);
        z-index: 2;
    }

    /* CRITICAL FIX: සයිට් එකේ දැනට තියෙන Elements වල background එක නිසා මේක වැහෙන එක වැළැක්වීම */
    body, html {
        background-color: transparent !important;
        background: transparent !important;
    }

    /* ඔයාගේ සයිට් එකේ containers/sections කළු පාට වැඩි නම් ඒවා තරමක් transparent කිරීම */
    main, section, .content-wrapper, .container {
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);

// 2. HTML Element එක සේෆ් විදිහට Page එකට එකතු කිරීම
document.addEventListener('DOMContentLoaded', () => {
    // දැනටමත් නැත්නම් විතරක් බැක්ග්‍රවුන්ඩ් එක හදන්න
    if (!document.querySelector('.cinema-premium-bg')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cinema-premium-bg';
        
        // Body එකේ මුලටම (යටින්ම හිටින්න) ඇතුල් කරනවා
        document.body.insertBefore(bgContainer, document.body.firstChild);
    }
});