document.addEventListener('DOMContentLoaded', () => {
    const refreshIcons = () => {
        if (window.lucide) lucide.createIcons();
    };

    refreshIcons();

    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 60
        });
    }


    // branding slider 
    //this change for use dynamic banners if flutter sends
    function initializeBrandingSwiper() {

        // Destroy previous instance if it exists
        if (window.brandingSwiperInstance) {
            window.brandingSwiperInstance.destroy(true, true);
        }

        // Initialize Swiper
        window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
            loop: true,
            speed: 900,
            effect: 'fade',
            autoHeight: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev'
            }
        });
    }

    // Initial load (static banners)
    initializeBrandingSwiper();

    // Called by widgets-core.js after Flutter replaces the banners
    window.onBannerImagesLoaded = function () {
        initializeBrandingSwiper();
    };


    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const drawerOverlay = document.getElementById('drawerOverlay');

    if (!menuBtn || !mobileMenu || !drawerOverlay) {
        console.error('Drawer elements not found.');
        return;
    }

    let savedScrollY = 0;
    let drawerOpen = false;

    const lockPageScroll = () => {
        savedScrollY = window.scrollY || window.pageYOffset;

        document.documentElement.style.overflow = 'hidden';

        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    };

    const unlockPageScroll = () => {
        document.documentElement.style.overflow = '';

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        window.scrollTo(0, savedScrollY);
    };

    const setMenuState = (open) => {
        drawerOpen = open;

        mobileMenu.classList.toggle('hidden', !open);
        drawerOverlay.classList.toggle('hidden', !open);

        menuBtn.setAttribute('aria-expanded', String(open));

        menuBtn.innerHTML = open
            ? '<i data-lucide="x" class="h-6 w-6"></i>'
            : '<i data-lucide="menu" class="h-6 w-6"></i>';

        if (open) {
            lockPageScroll();
        } else {
            unlockPageScroll();
        }

        refreshIcons();
    };

    menuBtn.addEventListener('click', () => {
        setMenuState(!drawerOpen);
    });

    drawerOverlay.addEventListener('click', () => {
        setMenuState(false);
    });

    // Event delegation works with dynamically rendered drawer links.
    mobileMenu.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;

        setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && drawerOpen) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && drawerOpen) {
            setMenuState(false);
        }
    });
});
