import { autoScroll } from "./autoScroll";
import { q, type Env } from "./types";

/** Pattern G: every H2 reveals word by word from a mask (never the H1).
 *  Headings with a gradient word split by line instead, so the gradient's
 *  background-clip stays on the span that owns the text. */
export function revealHeadings({ gsap, SplitText, root }: Env) {
  q(root, "[data-ev-reveal]").forEach((el) => {
    const byLine = !!el.querySelector(".ev-glow");
    SplitText.create(el, {
      type: byLine ? "lines" : "words",
      mask: byLine ? "lines" : "words",
      wordsClass: "ev-w",
      linesClass: "ev-l",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(byLine ? self.lines : self.words, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: byLine ? 0.1 : 0.06,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        }),
    });
  });
}

/** Generic block entrances, batched so lists stagger. Elements already on
 *  screen when this runs animate at once; nothing is hidden for long. */
export function rises({ gsap, ScrollTrigger, root }: Env) {
  const els = q(root, ".ev-rise");
  if (!els.length) return;
  gsap.set(els, { y: 28, autoAlpha: 0 });
  ScrollTrigger.batch(els, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: (batch[0] as HTMLElement)?.classList.contains("ev-rise--slow") ? 1.3 : 1.1,
        ease: "expo.out",
        stagger: 0.07,
        overwrite: true,
      }),
  });
}

/** Signature moment 5: three-depth parallax in the arch, the treatment
 *  menu revealing from masks, and the D'Vash capture scrolling. */
export function medspa({ gsap, ScrollTrigger, root, desktop }: Env) {
  const scene = root.querySelector<HTMLElement>(".ev-arch-scene");
  if (!scene) return;
  if (desktop) {
    const st = { trigger: scene, start: "top bottom", end: "bottom top", scrub: true };
    gsap.fromTo(scene.querySelector(".ev-arch"), { y: 40 }, { y: -40, ease: "none", scrollTrigger: st });
    gsap.fromTo(scene.querySelector(".ev-arch-browser"), { y: 60 }, { y: -80, ease: "none", scrollTrigger: { ...st } });
    gsap.fromTo(scene.querySelector(".ev-arch-glow"), { y: -40 }, { y: 60, ease: "none", scrollTrigger: { ...st } });
  }
  const menu = root.querySelector<HTMLElement>(".ev-menu");
  if (menu) {
    gsap.from(q(menu, ".ev-mask > span"), {
      yPercent: 105,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: menu, start: "top 82%", once: true },
    });
    gsap.from(q(menu, ".ev-menu-leader"), {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: { trigger: menu, start: "top 82%", once: true },
    });
    gsap.from(q(menu, ".ev-menu-plan, .ev-menu-body"), {
      y: 14,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.06,
      delay: 0.25,
      scrollTrigger: { trigger: menu, start: "top 82%", once: true },
    });
  }
  scrollingScreens({ gsap, ScrollTrigger, scope: scene });
}

/** Auto-scroll for browser frames marked .ev-autoscroll in a scope. */
function scrollingScreens({ gsap, ScrollTrigger, scope }: Pick<Env, "gsap" | "ScrollTrigger"> & { scope: HTMLElement }) {
  q(scope, ".ev-autoscroll").forEach((frame) => {
    const screen = frame.querySelector<HTMLElement>(".ev-screen");
    const img = screen?.querySelector<HTMLElement>("img");
    if (!screen || !img) return;
    const tl = autoScroll(gsap, img, screen);
    ScrollTrigger.create({
      trigger: screen,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => (s.isActive ? tl.play() : tl.pause()),
      onRefresh: () => tl.invalidate(),
    });
  });
}

/** Bento: staggered rise, cursor spotlight (desktop), live capture in the
 *  Website cell (desktop). */
export function capabilities({ gsap, ScrollTrigger, root, desktop, onCleanup }: Env) {
  const bento = root.querySelector<HTMLElement>(".ev-bento");
  if (!bento) return;
  const cells = q(bento, ".ev-bento-cell");
  gsap.set(cells, { y: 48, autoAlpha: 0 });
  ScrollTrigger.batch(cells, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out", stagger: 0.06, overwrite: true }),
  });
  if (!desktop) return;
  scrollingScreens({ gsap, ScrollTrigger, scope: bento });
  const onMove = (e: PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".ev-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  bento.addEventListener("pointermove", onMove);
  onCleanup(() => bento.removeEventListener("pointermove", onMove));
}

/** Process: the sunset line draws itself and lights each step on arrival. */
export function processLine({ gsap, root, desktop }: Env) {
  const wrap = root.querySelector<HTMLElement>(".ev-steps-wrap");
  if (!wrap) return;
  const steps = q(wrap, ".ev-step");
  const horizontal = window.matchMedia("(min-width: 768px)").matches;
  const lit = (p: number) =>
    steps.forEach((s, i) => s.classList.toggle("is-lit", p >= (steps.length > 1 ? i / (steps.length - 1) : 0) - 0.001));
  steps.forEach((s) => s.classList.remove("is-lit"));
  gsap.fromTo(
    wrap.querySelector(".ev-track-fill"),
    horizontal ? { scaleX: 0 } : { scaleY: 0 },
    {
      ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: desktop ? "top 75%" : "top 80%",
        end: desktop ? "bottom 55%" : "bottom 60%",
        scrub: true,
        onUpdate: (s) => lit(s.progress),
        onLeaveBack: () => steps.forEach((s) => s.classList.remove("is-lit")),
      },
    },
  );
  gsap.from(steps, {
    y: 30,
    autoAlpha: 0,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.1,
    scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
  });
}

/** Pattern H: the staircase rises and prices slide up out of their masks.
 *  No count-up: the only number ever shown is the real price. */
export function plans({ gsap, root, desktop }: Env) {
  const ladder = root.querySelector<HTMLElement>(".ev-ladder");
  if (!ladder) return;
  const st = { trigger: ladder, start: "top 82%", once: true };
  gsap.from(q(ladder, ".ev-plan"), { y: desktop ? 140 : 60, autoAlpha: 0, duration: 1.4, ease: "expo.out", stagger: 0.12, scrollTrigger: st });
  gsap.from(q(ladder, ".ev-price-num"), { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.25, scrollTrigger: { ...st } });
}

/** AI section: the example thread reveals once, in sequence. */
export function aiThread({ gsap, root }: Env) {
  const thread = root.querySelector<HTMLElement>(".ev-thread");
  if (!thread) return;
  gsap.from(thread, { y: 40, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: thread, start: "top 85%", once: true } });
  gsap.from(q(thread, ".ev-bubble"), {
    y: 12,
    autoAlpha: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.35,
    delay: 0.35,
    scrollTrigger: { trigger: thread, start: "top 80%", once: true },
  });
}

/** Final CTA: the sun rises again behind the founders. */
export function finalSun({ gsap, root }: Env) {
  const sun = root.querySelector<HTMLElement>(".ev-final-sun");
  const final = root.querySelector<HTMLElement>(".ev-final");
  if (!sun || !final) return;
  gsap.fromTo(sun, { yPercent: 60, scale: 0.8 }, { yPercent: 0, scale: 1, ease: "none", scrollTrigger: { trigger: final, start: "top bottom", end: "center center", scrub: true } });
}

/** Pattern I: magnetic primary CTAs (desktop). */
export function magnetic({ gsap, root, desktop, onCleanup }: Env) {
  if (!desktop) return;
  const nav = document.querySelector<HTMLElement>('nav[data-variant="island"] .rg-nav-cta');
  const btns = [...q(root, ".ev-btn--primary"), ...(nav ? [nav] : [])];
  btns.forEach((btn) => {
    const icon = btn.querySelector<HTMLElement>(".ev-btn-icon");
    const bx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "elastic.out(1,.45)" });
    const by = gsap.quickTo(btn, "y", { duration: 0.6, ease: "elastic.out(1,.45)" });
    const ix = icon ? gsap.quickTo(icon, "x", { duration: 0.6, ease: "power3" }) : null;
    const iy = icon ? gsap.quickTo(icon, "y", { duration: 0.6, ease: "power3" }) : null;
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2;
      const dy = e.clientY - r.top - r.height / 2;
      bx(dx * 0.22);
      by(dy * 0.3);
      ix?.(dx * 0.1);
      iy?.(dy * 0.14);
    };
    const leave = () => {
      bx(0);
      by(0);
      ix?.(0);
      iy?.(0);
    };
    btn.addEventListener("pointermove", move);
    btn.addEventListener("pointerleave", leave);
    onCleanup(() => {
      btn.removeEventListener("pointermove", move);
      btn.removeEventListener("pointerleave", leave);
    });
  });
}

/** CSS loops (halo, tape sheen, plan ring, orb) pause while off screen. */
export function pauseOffscreen({ root, onCleanup }: Env) {
  if (!("IntersectionObserver" in window)) return;
  const targets = q(root, ".ev-hero, .ev-proof, .ev-plans, .ev-ai");
  const io = new IntersectionObserver((entries) =>
    entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
  );
  targets.forEach((t) => io.observe(t));
  onCleanup(() => {
    io.disconnect();
    targets.forEach((t) => t.classList.remove("is-offscreen"));
  });
}
