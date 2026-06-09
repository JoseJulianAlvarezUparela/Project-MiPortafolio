gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelector(".cards");

if (cards) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 901px)", () => {
    const tween = gsap.to(cards, {
      x: () => {
        const distance = cards.scrollWidth - window.innerWidth;
        return distance > 0 ? -distance : 0;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".Proyectos",
        start: "top top",
        end: () => `+=${cards.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.kill();
      gsap.set(cards, { clearProps: "transform" });
    };
  });
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
