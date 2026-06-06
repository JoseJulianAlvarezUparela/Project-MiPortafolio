const header = document.querySelector(".site-header");
const nav = document.querySelector(".navegation");
const logo = document.querySelector(".logo");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const magneticIcon = document.querySelector(".linkedin-magnet");
const menuToggle = document.querySelector(".menu-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lastScrollY = window.scrollY;
let ticking = false;

function buildRollingText(link) {
    const label = link.dataset.text || link.textContent.trim();
    const createLayer = (layerClass) => {
        const layer = document.createElement("span");
        layer.className = `rolling-layer ${layerClass}`;
        layer.setAttribute("aria-hidden", "true");

        [...label].forEach((char, index) => {
            const span = document.createElement("span");
            span.className = char === " " ? "char space" : "char";
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.transitionDelay = `${index * 28}ms`;
            layer.appendChild(span);
        });

        return layer;
    };

    link.textContent = "";

    const rollingText = document.createElement("span");
    rollingText.className = "rolling-text";

    rollingText.appendChild(createLayer("rolling-layer--main"));
    rollingText.appendChild(createLayer("rolling-layer--shadow"));

    const srOnly = document.createElement("span");
    srOnly.className = "sr-only";
    srOnly.textContent = label;

    link.appendChild(rollingText);
    link.appendChild(srOnly);
}

function setActiveLink(id) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function handleScrollState() {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const beyondThreshold = currentScrollY > 24;

    header.classList.toggle("is-scrolled", beyondThreshold);

    if (currentScrollY > 180 && scrollingDown) {
        header.classList.add("is-hidden");
    } else {
        header.classList.remove("is-hidden");
    }

    if (logo && !prefersReducedMotion) {
        const translateY = Math.min(currentScrollY * -0.04, 10);
        const rotation = Math.min(currentScrollY * 0.008, 2);
        logo.style.transform = `translateY(${translateY}px) rotate(${rotation}deg) scale(1)`;
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(handleScrollState);
        ticking = true;
    }
}

function enableMagneticEffect(element) {
    if (!element || prefersReducedMotion) {
        return;
    }

    element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        element.style.transform = `translate3d(${offsetX * 0.16}px, ${offsetY * 0.16}px, 0) rotateY(${offsetX * 0.18}deg) rotateX(${offsetY * -0.18}deg)`;
    });

    element.addEventListener("mouseleave", () => {
        element.style.transform = "";
    });
}

function initSectionObserver() {
    if (!sections.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries[0]) {
                setActiveLink(visibleEntries[0].target.id);
            }
        },
        {
            threshold: [0.25, 0.5, 0.7],
            rootMargin: "-20% 0px -45% 0px",
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("menu-open");
        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("menu-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function initHeaderExperience() {
    navLinks.forEach(buildRollingText);
    initSectionObserver();
    initMobileMenu();
    enableMagneticEffect(magneticIcon);

    if (!prefersReducedMotion) {
        requestAnimationFrame(() => {
            document.body.classList.add("is-ready");
        });
    } else {
        document.body.classList.add("is-ready");
    }

    setActiveLink("inicio");
    handleScrollState();
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("load", initHeaderExperience);
