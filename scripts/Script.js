gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelector(".cards");

if (cards) {
  const getScrollDistance = () => {
    const viewportWidth = document.documentElement.clientWidth;
    return Math.max(0, cards.scrollWidth - viewportWidth);
  };

  gsap.to(cards, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: ".Proyectos",
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

const btn = document.getElementById("panel-btn");
const panel = document.getElementById("panel");
const links = panel ? panel.querySelectorAll("a") : [];

if (btn && panel) {
  btn.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-active");
    btn.setAttribute("aria-expanded", isOpen.toString());
    document.body.classList.toggle("no-scroll", isOpen);
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      panel.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });
}
