import { autoScroll } from "./autoScroll";
import { q, type Env } from "./types";

/**
 * Signature moments 1 to 3: the sun sinks from the hero to the end of the
 * medspa band, a violet dusk rolls in by the time #work reaches the top,
 * the ticker drifts, the H1 lines pull apart (desktop), the hero phones
 * swap their posters for full-length captures and scroll them, and the rig
 * tilts toward the cursor (desktop).
 */
export function heroScroll({ gsap, root, desktop }: Env) {
  const hero = root.querySelector<HTMLElement>(".ev-hero");
  if (!hero) return;

  gsap.to(root.querySelector(".ev-sun"), {
    yPercent: 150,
    scale: 0.7,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", endTrigger: "#medspas", end: "bottom center", scrub: true },
  });
  gsap.to(root.querySelector(".ev-dusk"), {
    opacity: 1,
    ease: "none",
    scrollTrigger: { trigger: "#work", start: "top bottom", end: "top top", scrub: true },
  });
  gsap.to(root.querySelector(".ev-ticker-track"), {
    xPercent: -28,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
  });
  if (desktop) {
    const [l1, l2] = q(hero, ".ev-h1-line");
    const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    if (l1) gsap.to(l1, { xPercent: -6, ease: "none", scrollTrigger: st });
    if (l2) gsap.to(l2, { xPercent: 9, ease: "none", scrollTrigger: { ...st } });
    gsap.to(root.querySelector(".ev-rig-wrap"), {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
}

export function heroPointer({ gsap, root, desktop, onCleanup }: Env) {
  if (!desktop) return;
  const hero = root.querySelector<HTMLElement>(".ev-hero");
  const rig = root.querySelector<HTMLElement>(".ev-rig");
  const sky = root.querySelector<HTMLElement>(".ev-sky-pan");
  if (!hero || !rig || !sky) return;
  const ry = gsap.quickTo(rig, "rotationY", { duration: 1.2, ease: "power3" });
  const rx = gsap.quickTo(rig, "rotationX", { duration: 1.2, ease: "power3" });
  const sx = gsap.quickTo(sky, "x", { duration: 1.6, ease: "power3" });
  const sy = gsap.quickTo(sky, "y", { duration: 1.6, ease: "power3" });
  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    ry(nx * 10);
    rx(-ny * 6);
    sx(nx * -40);
    sy(ny * -24);
  };
  hero.addEventListener("pointermove", onMove);
  onCleanup(() => hero.removeEventListener("pointermove", onMove));
}

/** LCP-safe phones: poster first, tall capture swapped in on idle. */
export function heroPhones({ gsap, ScrollTrigger, root, later, onCleanup }: Env) {
  q(root, ".ev-hero .ev-screen--poster").forEach((screen) => {
    const tall = screen.querySelector<HTMLImageElement>("img.ev-tall");
    if (!tall) return;
    // The back phone is hidden on phones: never download it there.
    if (screen.offsetParent === null) return;
    const start = () =>
      later(() => {
        screen.classList.add("is-tall");
        const tl = autoScroll(gsap, tall, screen);
        ScrollTrigger.create({
          trigger: screen,
          start: "top bottom",
          end: "bottom top",
          onToggle: (s) => (s.isActive ? tl.play() : tl.pause()),
          onRefresh: () => tl.invalidate(),
        });
      });
    const swap = () => {
      if (tall.dataset.srcset && !tall.getAttribute("src")) {
        tall.srcset = tall.dataset.srcset;
        tall.src = tall.dataset.src ?? "";
      }
      tall
        .decode()
        .then(start)
        .catch(() => {
          /* decode failed (offline, aborted): keep the poster as a still frame */
        });
    };
    // Swap on the visitor's first interaction (scroll, wheel, touch, key,
    // click). Browsers stop recording LCP at that moment, so the tall capture
    // can never become a late LCP candidate, and it never competes with
    // first-paint resources. Without interaction the poster stays as a still.
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      events.forEach((ev) => window.removeEventListener(ev, go));
      swap();
    };
    events.forEach((ev) => window.addEventListener(ev, go, { once: true, passive: true }));
    onCleanup(() => events.forEach((ev) => window.removeEventListener(ev, go)));
  });
}
