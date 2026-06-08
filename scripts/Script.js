gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelector(".cards");

const horizontalScroll =
    cards.scrollWidth - window.innerWidth;

gsap.to(cards, {
    x: -horizontalScroll,
    ease: "none",

    scrollTrigger: {
        trigger: ".Proyectos",

        start: "top top",

        end: () => "+=" + cards.scrollWidth,

        pin: true,

        scrub: 1,

        invalidateOnRefresh: true
    }
});