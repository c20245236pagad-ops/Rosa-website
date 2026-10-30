gsap.registerPlugin(ScrollTrigger);

const darkModeToggle = document.getElementById("darkModeToggle");
const toggledark = document.getElementById("toggledark");

function updateTheme() {
    const isDark = document.documentElement.classList.contains("dark");

    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    toggledark.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

    darkModeToggle.setAttribute("aria-pressed", isDark);
    toggledark.setAttribute("aria-pressed", isDark);
}

function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    updateTheme();
}

darkModeToggle.addEventListener("click", toggleTheme);
toggledark.addEventListener("click", toggleTheme);

updateTheme();

const introTimeline = gsap.timeline({
    defaults: {
        duration: 1,
        ease: "power3.out"
    }
});

introTimeline
    .from("#hero h1", {
        y: 60,
        opacity: 0
    })
    .from("#hero p", {
        y: 30,
        opacity: 0
    }, "-=0.5")
    .from("#hero img", {
        scale: 0.8,
        opacity: 0
    }, "-=0.5");



    introTimeline.restart();

gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",

        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});


gsap.to("#progressBar", {
    scaleX: 1,
    ease: "none",

    scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("formStatus").textContent =
        "Thank you! Your inquiry has been received.";

    contactForm.reset();
});