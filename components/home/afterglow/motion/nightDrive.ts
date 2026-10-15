import { autoScroll } from "./autoScroll";
import { q, type Env } from "./types";

/**
 * Signature moment 6, "Night Drive" (#work).
 * Desktop: pattern F, a pinned horizontal pan. Each site's desktop capture
 * scrolls its full length inside the laptop while its slide crosses the
 * screen, the phone scrolls to 85%, the devices swing in 3D and the client
 * name passes behind in outline type. Index chips + a progress line follow
 * along; focusing a link (or clicking a chip) scrolls to that slide.
 * Touch / narrow: the native scroll-snap strip; each phone auto-scrolls
 * only while its slide is at least half visible.
 */
export function nightDrive(env: Env) {
  const { root } = env;
  const section = root.querySelector<HTMLElement>("#work");
  const track = section?.querySelector<HTMLElement>(".ev-nd-track");
  if (!section || !track) return;
  const slides = q(track, ".ev-nd-slide");
  const chips = q<HTMLAnchorElement>(section, ".ev-nd-chip");
  const setActive = (i: number) =>
    chips.forEach((c, n) => (n === i ? c.setAttribute("aria-current", "true") : c.removeAttribute("aria-current")));

  if (env.desktop) pinned(env, section, track, slides, chips, setActive);
  else strip(env, section, track, slides, chips, setActive);
}

function eagerImages(section: HTMLElement, sel: string) {
  q<HTMLImageElement>(section, sel).forEach((img) => {
    if (img.loading === "lazy") img.loading = "eager";
  });
}

function pinned(
  { gsap, ScrollTrigger, onCleanup }: Env,
  section: HTMLElement,
  track: HTMLElement,
  slides: HTMLElement[],
  chips: HTMLAnchorElement[],
  setActive: (i: number) => void,
) {
  const pin = section.querySelector<HTMLElement>(".ev-nd-pin")!;
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  // Load the captures before the pan reaches them (lazy loading can't see
  // slides parked off to the right of a pinned track).
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom+=60%",
    once: true,
    onEnter: () => {
      eagerImages(section, ".ev-laptop img, .ev-phone--mini img");
      const first = section.querySelector<HTMLImageElement>(".ev-laptop img");
      first?.decode().then(() => ScrollTrigger.refresh()).catch(() => {});
    },
  });

  const pan = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => "+=" + distance(),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  slides.forEach((slide, i) => {
    const shot = slide.querySelector<HTMLElement>(".ev-laptop img");
    const scr = slide.querySelector<HTMLElement>(".ev-laptop .ev-screen");
    const ph = slide.querySelector<HTMLElement>(".ev-phone--mini img");
    const phs = slide.querySelector<HTMLElement>(".ev-phone--mini .ev-screen");
    const st = { containerAnimation: pan, trigger: slide, start: "left 85%", end: "right 15%", scrub: true };
    if (shot && scr) gsap.to(shot, { y: () => -Math.max(0, shot.offsetHeight - scr.clientHeight), ease: "none", scrollTrigger: st });
    if (ph && phs) gsap.to(ph, { y: () => -Math.max(0, ph.offsetHeight - phs.clientHeight) * 0.85, ease: "none", scrollTrigger: { ...st } });
    gsap.fromTo(slide.querySelector(".ev-devices"), { rotationY: -14, rotationX: 4 }, { rotationY: 12, rotationX: -2, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } });
    gsap.fromTo(slide.querySelector(".ev-ghost"), { xPercent: 14 }, { xPercent: -22, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } });
    gsap.from(slide.querySelector(".ev-nd-copy"), {
      x: 120,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: { containerAnimation: pan, trigger: slide, start: "left 95%", end: "left 40%", scrub: true },
    });
    ScrollTrigger.create({
      containerAnimation: pan,
      trigger: slide,
      start: "left center",
      end: "right center",
      onToggle: (s) => s.isActive && setActive(i),
    });
  });

  gsap.fromTo(
    section.querySelector(".ev-nd-progress"),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + distance(), scrub: true },
    },
  );

  const scrollToSlide = (i: number) => {
    const st = pan.scrollTrigger;
    if (!st) return;
    const n = slides.length;
    const top = st.start + (st.end - st.start) * (i / Math.max(1, n - 1));
    window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  };

  const onFocus = (e: FocusEvent) => {
    const slide = (e.target as HTMLElement).closest<HTMLElement>(".ev-nd-slide");
    if (!slide) return;
    // Undo the browser's own attempt to scroll the clipped track.
    pin.scrollLeft = 0;
    scrollToSlide(slides.indexOf(slide));
  };
  const onChip = (e: MouseEvent) => {
    const chip = (e.currentTarget as HTMLElement).dataset.index;
    if (chip === undefined) return;
    e.preventDefault();
    const st = pan.scrollTrigger;
    if (!st) return;
    const i = Number(chip);
    const top = st.start + (st.end - st.start) * (i / Math.max(1, slides.length - 1));
    window.scrollTo({ top, behavior: "smooth" });
  };
  section.addEventListener("focusin", onFocus);
  chips.forEach((c) => c.addEventListener("click", onChip));
  onCleanup(() => {
    section.removeEventListener("focusin", onFocus);
    chips.forEach((c) => c.removeEventListener("click", onChip));
  });
}

function strip(
  { gsap, onCleanup }: Env,
  section: HTMLElement,
  track: HTMLElement,
  slides: HTMLElement[],
  chips: HTMLAnchorElement[],
  setActive: (i: number) => void,
) {
  if (!("IntersectionObserver" in window)) return;
  const timelines = new Map<Element, gsap.core.Timeline>();
  slides.forEach((slide) => {
    const img = slide.querySelector<HTMLElement>(".ev-phone--mini img");
    const screen = slide.querySelector<HTMLElement>(".ev-phone--mini .ev-screen");
    if (img && screen) timelines.set(slide, autoScroll(gsap, img, screen, 0.85));
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        const tl = timelines.get(e.target);
        if (e.isIntersecting) {
          tl?.invalidate().play();
          setActive(slides.indexOf(e.target as HTMLElement));
        } else tl?.pause();
      }),
    { root: track, threshold: 0.5 },
  );
  // Only animate while the strip itself is on screen.
  const outer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) slides.forEach((s) => io.observe(s));
    else {
      io.disconnect();
      timelines.forEach((tl) => tl.pause());
    }
  });
  outer.observe(track);

  const onChip = (e: MouseEvent) => {
    const i = Number((e.currentTarget as HTMLElement).dataset.index);
    const slide = slides[i];
    if (!slide) return;
    e.preventDefault();
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
  };
  chips.forEach((c) => c.addEventListener("click", onChip));
  onCleanup(() => {
    io.disconnect();
    outer.disconnect();
    chips.forEach((c) => c.removeEventListener("click", onChip));
  });
}
