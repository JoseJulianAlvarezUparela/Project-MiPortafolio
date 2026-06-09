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








const btn = document.getElementById("panel-btn");
const panel = document.getElementById("panel");
const links = panel.querySelectorAll("a");

btn.addEventListener("click", () => {
  panel.classList.toggle("is-active");
  document.body.classList.toggle("no-scroll");
});

// cerrar menú al dar clic en un link
links.forEach(link => {
  link.addEventListener("click", () => {
    panel.classList.remove("is-active");
    document.body.classList.remove("no-scroll");
  });
});