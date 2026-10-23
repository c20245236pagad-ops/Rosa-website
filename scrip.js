gsap.registerPlugin(ScrollTrigger);

const html = document.documentElement;
const darkModeToggle = document.querySelector("#darkModeToggle");
const toggleDark = document.querySelector("#toggledark");

function updateThemeButtons() {
    const isDark = html.classList.contains("dark");

    darkModeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    toggleDark.textContent = isDark ? "☀ Light Theme" : "🌙 Dark Theme";
}

function toggleTheme() {
    html.classList.toggle("dark");
    updateThemeButtons();
}
<button id="darkModeToggle" type="button">Dark Mode</button>

updateThemeButtons();


const introTimeline = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.7,
        ease: "power3.out"
    }
});

introTimeline
    .from(".hero-item", {
        y: 45,
        opacity: 0,
        stagger: 0.18
    })
    .from("nav", {
        y: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"

    }, "-=0.4")
    .from("#replayBtn", {
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.5)"

    }, "-=0.3");

introTimeline.play();

document.querySelector("#replayBtn").addEventListener("click", () => {
    introTimeline.restart();
});

const media = gsap.matchMedia();

media.add(
    {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {
        const { reduceMotion, normalMotion } = context.conditions;

        if (reduceMotion) {
            gsap.set(".reveal", {
                autoAlpha: 1,
                clearProps: "transform"
            });

            gsap.set("#progressBar", {
                scaleX: 1
            });

            return;
        }

        if (normalMotion) {

            gsap.utils.toArray(".reveal").forEach((section) => {
                gsap.fromTo(
                    section,
                    {
                        y: 40,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            gsap.to("#progressBar", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3
                }
            });
        }
    }
);

document.querySelector("#contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    document.querySelector("#formStatus").textContent =
        "Thank you! Your inquiry has been recorded in this demo.";

    event.target.reset();
});
