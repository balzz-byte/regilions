const header = document.getElementById("header");
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{
    // Header Blur Effect
    if(window.scrollY > 80){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }
});

// Scroll Spy (Active Menu Highlighter) menggunakan IntersectionObserver
const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0
};

let isClickScrolling = false; // flag: user baru saja klik link

const observer = new IntersectionObserver((entries) => {
    // Kalau user baru klik link, abaikan observer dulu
    if (isClickScrolling) return;

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach((section) => {
    observer.observe(section);
});

// ==========================
// MOBILE MENU LOGIC
// ==========================
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Set link yang diklik langsung aktif, tanpa nunggu observer
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Freeze observer sementara supaya tidak override saat scroll animasi
        isClickScrolling = true;
        setTimeout(() => { isClickScrolling = false; }, 1200);

        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// ==========================
// MODAL LOGIC
// ==========================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active");
        // Disable body scroll when modal is open
        document.body.style.overflow = "hidden";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
        // Enable body scroll again
        document.body.style.overflow = "auto";
        
        // If closing video modal, stop the youtube video by resetting src
        if (modalId === 'modal-video') {
            const iframe = document.getElementById('youtube-video');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src; // Reloads the iframe, stopping the video
            }
        }
    }
}

// Optional: Close modal on Escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});