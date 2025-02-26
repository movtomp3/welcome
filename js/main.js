// Yandex.Metrika counter
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(100067712, "init", {
     clickmap:true,
     trackLinks:true,
     accurateTrackBounce:true
});

// Create noscript fallback for Yandex.Metrika
const noscriptYandex = document.createElement('noscript');
const divYandex = document.createElement('div');
const imgYandex = document.createElement('img');
imgYandex.src = "https://mc.yandex.ru/watch/100067712";
imgYandex.style = "position:absolute; left:-9999px;";
imgYandex.alt = "";
divYandex.appendChild(imgYandex);
noscriptYandex.appendChild(divYandex);
document.body.appendChild(noscriptYandex);

// Microsoft Clarity
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "qfx1a64him");

// Track SPA page views for analytics
function trackPageView(pageId) {
    // Yandex.Metrika virtual page view
    if (typeof ym !== 'undefined') {
        ym(100067712, 'hit', '#' + pageId);
    }
    
    // Microsoft Clarity - mark navigation as a page view
    if (typeof clarity !== 'undefined') {
        clarity("set", "page_view", true);
        clarity("set", "page_path", '#' + pageId);
    }
}

// Theme toggling
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
}

// Immediate execution to set default theme
(function() {
    // Set light theme as default if not already specified
    const currentHtmlTheme = html.getAttribute('data-theme');
    if (!currentHtmlTheme) {
        setTheme('light');
    }
})();

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    // Update active link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });
    
    // Track page view in analytics
    trackPageView(pageId);
}

// Handle navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
        // Update URL without page reload
        history.pushState(null, '', link.getAttribute('href'));
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const pageId = location.hash.substring(1) || 'home';
    showPage(pageId);
});

// Show initial page based on URL hash
const initialPage = location.hash.substring(1) || 'home';
showPage(initialPage);

// Add click handler for welcome link
document.querySelector('.welcome-link').addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = 'welcome';
    showPage(pageId);
    // Update URL without page reload
    history.pushState(null, '', '#welcome');
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const body = document.body;

mobileMenuToggle.addEventListener('click', () => {
    body.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        body.classList.remove('mobile-menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && body.classList.contains('mobile-menu-open')) {
        body.classList.remove('mobile-menu-open');
    }
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isOpen = accordionItem.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-icon').textContent = '+';
        });
        
        // Open clicked item if it wasn't open
        if (!isOpen) {
            accordionItem.classList.add('active');
            button.querySelector('.accordion-icon').textContent = '−';
        }
    });
});
