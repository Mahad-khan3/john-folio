import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* wdth.css carries the width axis (62-125%) — with index.css/wght.css only the
   word would come out narrow */
import "@fontsource-variable/archivo/wdth.css";
import "./hero.css";

// npm i gsap   (Tailwind CSS must already be set up in your project)
gsap.registerPlugin(ScrollTrigger);

// set your image path here
const PHOTO = "/photo.avif";

const EMAIL = "johnsmith@gmail.com";
const MAIL = EMAIL;
const ROLES = ["Software Developer", "Web Developer"];

/* hrefs point at the ids that actually exist in App.jsx
   (projects = #crafted, clients = #testimonials). There is no #services
   section on the page — ServicesSection.jsx is never imported, the cards live
   in #overview — so both rows point there and only the first one lights up as
   active. Same for Projects / Explore More: both go to #crafted, so only
   Projects is ever the active pill when that section is in view. */
const LINKS = [
  { id: "home", label: "Home", href: "#hero", icon: "M12 2.6 2.5 11.1H5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8.9h2.5Z" },
  { id: "about", label: "About Me", href: "#about", icon: "M12 3.4a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm0 9.3c-3.7 0-6.7 2.5-6.7 5.5v1.4h13.4v-1.4c0-3-3-5.5-6.7-5.5Z" },
  { id: "projects", label: "Projects", href: "#crafted", icon: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" },
  { id: "bring", label: "What I Bring", href: "#overview", icon: "M12 2.3 14.7 8l5.9.6-4.7 4.4 1.2 5.6L12 15.5 6.9 18.6 8.1 13 3.4 8.6 9.3 8Z" },
  { id: "services", label: "Services", href: "#overview", icon: "M7.7 4.6 2.3 12l5.4 7.4 1.9-1.5L6.1 12l3.5-5.9Zm8.6 0-1.9 1.5L18 12l-3.6 5.9 1.9 1.5 5.4-7.4Z" },
  { id: "clients", label: "Clients", href: "#testimonials", icon: "M8.2 3.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 8.6c-3.4 0-6.2 2.3-6.2 5.2v1.4h12.4v-1.4c0-2.9-2.8-5.2-6.2-5.2Zm8.3-.2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm.3 7.6c-1.3 0-2.4.3-3.3.9 1.6 1 2.1 1.7 2.1 3.1v1.4h6v-1.4c0-2.2-2.2-4-4.8-4Z" },
  { id: "faq", label: "FAQ", href: "#faq", icon: "M4.5 3.5h15A2.5 2.5 0 0 1 22 6v9a2.5 2.5 0 0 1-2.5 2.5h-8.6L7 21v-3.5H4.5A2.5 2.5 0 0 1 2 15V6a2.5 2.5 0 0 1 2.5-2.5ZM12 6.2a2.4 2.4 0 0 0-2.4 2.4h1.7a.7.7 0 1 1 1.4 0c0 .4-.3.6-.9 1-.7.5-1.3 1-1.3 1.9v.2h2v-.1c0-.3.1-.5.7-.9.7-.4 1.5-1.1 1.5-2.1A2.4 2.4 0 0 0 12 6.2Zm.8 7.3h-1.7v1.7h1.7Z" },
];
const SKILLS_TITLE = "Full-Stack Development";
const SKILLS = [
  { mark: "◇", label: "MERN Stack" },
  { mark: "◇", label: "React & Node.js" },
  { mark: "◇", label: "Shopify" },
  /* the one accent item — the lightning gets the warm colour instead of teal */
  { mark: "⚡", label: "Problem Solving", accent: true },
];

const WORD = "JOHNSMITH";

/* One <g><text> per letter. SVG <tspan>s can't take transform / clip-path, so
   the per-letter slide-in needs real elements. The hidden ".h-logo-measure"
   text is a ruler: layoutLogo() reads each glyph's natural advance from it and
   places the letters, stretched to fill the same 1288-unit box as before. */
const Logo = () => (
  <svg viewBox="0 0 1288 338" fill="none" className="h-logo-svg block w-full" role="img" aria-label={WORD}>
    <defs>
      {WORD.split("").map((_, i) => (
        <clipPath key={i} id={`h-lc-${i}`} clipPathUnits="userSpaceOnUse">
          <rect className="h-logo-clip" x="0" y="0" width="1288" height="338" />
        </clipPath>
      ))}
    </defs>
    <text className="h-logo-measure" x="0" y="330" fontSize="474" fill="currentColor" aria-hidden="true">{WORD}</text>
    {WORD.split("").map((ch, i) => (
      <g key={i} className="h-logo-letter" clipPath={`url(#h-lc-${i})`}>
        <text x="0" y="330" fontSize="474" fill="currentColor" lengthAdjust="spacingAndGlyphs" style={{ letterSpacing: 0 }}>{ch}</text>
      </g>
    ))}
  </svg>
);

/* canonical React mark: filled nucleus + three stroked ellipses */
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.232 23 20.463" className="w-full" role="img" aria-label="React">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

/* the year count in the portrait stat card — Syne ExtraBold (webfont, loaded in
   index.html) rather than the UI stack, so it reads as display type instead of a
   stray bold digit. It keeps the plain .h-num class on purpose: fitStatInner
   looks that up by name to re-size it when the card lands in the panel, so
   dropping it would leave the numeral stuck at its hero size.
   Sized in vw and re-scaled by fitStatInner on scroll. */
const StatNum = ({ n }) => <span className="h-num h-stat-years-num">{n}</span>;

/* solid/filled icons (Phosphor-style fills) — paths are 24x24 solid shapes */
const LineIcon = ({ d, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);

const CopyIcon = ({ ok }) => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    {ok ? (
      <path fill="currentColor" d="M9.5 15.1 5.3 10.9 3.9 12.3l5.6 5.6L20.1 7.4l-1.4-1.4Z" />
    ) : (
      <g fill="currentColor">
        <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12z" />
        <path d="M9 5h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      </g>
    )}
  </svg>
);

export default function Hero({
  photo = PHOTO,          // set your image path here
  photoMobile = PHOTO,    // set your image path here (mobile version)
}) {
  const root = useRef(null);
  const copyTimer = useRef(0);
  const [copied, setCopied] = useState(false);
  const [archivoReady, setArchivoReady] = useState(false);

  /* The logo is live text now, so Archivo has to be in before *anything* is
     measured or animated: with the fallback font the word has a different
     width and height, which would leave the fly-to-panel landing in the wrong
     place — and the swap itself would be visible, because the letters are
     already on screen. So the whole hero waits for this flag. */
  useEffect(() => {
    let dead = false;
    const done = () => { if (!dead) setArchivoReady(true); };
    const fonts = document.fonts;
    if (!fonts) { done(); return undefined; }
    Promise.all([
      fonts.load('900 100px "Archivo Variable"'),
      /* 125% has to be asked for by keyword — FontFaceSet rejects percentages */
      fonts.load('extra-expanded 900 100px "Archivo Variable"'),
      /* the years numeral is Syne and is measured mid-intro, so it belongs in the
         same gate — otherwise the card paints in the fallback stack first */
      fonts.load('800 100px Syne'),
    ]).catch(() => {}).then(() => fonts.ready).then(done, done);
    return () => { dead = true; };
  }, []);

  useLayoutEffect(() => {
    if (!archivoReady) return;
    let raf = 0;
    let timer = 0;
    let headerEl = null;

    /* deltas are measured from layout, so every resize / late font+image load
       has to re-measure — ScrollTrigger.refresh() re-runs the function based
       values below because the timeline uses invalidateOnRefresh */
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    const q = (s) => root.current.querySelector(s);
    const qa = (s) => gsap.utils.toArray(s, root.current);
    const mobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* place the 5 letters: natural advances from the ruler, scaled so the
       word fills exactly 1288 units (same look as the old textLength word).
       Each Logo() svg carries its own hidden measure ruler, so every ruler lays
       out only the letters inside its own svg — the mobile chip is a second
       Logo(), and mixing its letters with the flying word's ruler (or vice
       versa) makes getExtentOfChar index past the ruler's bounds. */
    const layoutLogo = () => {
      qa(".h-logo-measure").forEach((ruler) => {
        const svg = ruler.ownerSVGElement;
        if (svg.getBoundingClientRect().width === 0) return;
        const gs = [...svg.querySelectorAll(".h-logo-letter")];
        const clips = [...svg.querySelectorAll(".h-logo-clip")];
        if (!gs.length) return;
        const ext = gs.map((_, i) => ruler.getExtentOfChar(i));
        const first = ext[0].x;
        const last = ext[ext.length - 1];
        const sx = 1288 / (last.x + last.width - first);
        gs.forEach((g, i) => {
          const x = (ext[i].x - first) * sx;
          const w = ext[i].width * sx;
          const t = g.querySelector("text");
          t.setAttribute("x", x);
          t.setAttribute("textLength", w);
          clips[i].setAttribute("x", x - 24);
          clips[i].setAttribute("width", w + 48);
        });
      });
    };

    /* ---------- scroll lock while the intro plays ----------
       There is no lenis in this project, and overflow:hidden on <html> would
       take the scrollbar away — which shifts every fixed hero layer sideways
       for a frame when it comes back. So the lock only swallows the input and
       snaps whatever slips through back to the top, where the intro started. */
    let locked = false;
    const swallow = (e) => e.preventDefault();
    const swallowKeys = (e) => {
      if (e.key === " " || e.key === "Home" || e.key === "End" || e.key === "PageUp" || e.key === "PageDown" || e.key.startsWith("Arrow")) e.preventDefault();
    };
    const holdTop = () => { if (locked && window.scrollY !== 0) window.scrollTo(0, 0); };
    const lockScroll = () => {
      locked = true;
      window.addEventListener("wheel", swallow, { passive: false });
      window.addEventListener("touchmove", swallow, { passive: false });
      window.addEventListener("keydown", swallowKeys);
      window.addEventListener("scroll", holdTop, { passive: true });
    };
    const unlockScroll = () => {
      locked = false;
      window.removeEventListener("wheel", swallow);
      window.removeEventListener("touchmove", swallow);
      window.removeEventListener("keydown", swallowKeys);
      window.removeEventListener("scroll", holdTop);
    };

    /* The scroll timeline lives in its own function because it may only be built
       once the intro is over: every delta below is measured from layout, so the
       slots and the flyers all have to sit in their final positions when it runs
       (and the intro clears its own transforms before it hands over). */
    /* phones skip this entirely: the panel and its slots are sized in vw against a
         1920px design, so on a 390px screen they would be 56px wide with 2px type.
         Rather than rescale the sidebar, the hero below is one static screen and
         scrolling just takes it away. */
    const buildScroll = () => {
      if (mobile) return; // mobile: statik layout (scroll animation sirf desktop par)

      /* ---------- measurement ----------
         Both boxes are measured with the transform neutralised, so the delta is
         always taken from the element's *natural* layout position. Measuring the
         already-animated rect is what used to leave the cards stuck outside the
         panel: mid-flight scale/translate was baked into the delta. */
      const naturalBox = (el) => {
        const keep = {
          x: gsap.getProperty(el, "x") || 0,
          y: gsap.getProperty(el, "y") || 0,
          scaleX: gsap.getProperty(el, "scaleX") || 1,
          scaleY: gsap.getProperty(el, "scaleY") || 1,
        };
        gsap.set(el, { x: 0, y: 0, scaleX: 1, scaleY: 1 });
        const r = el.getBoundingClientRect();
        gsap.set(el, keep);
        return r;
      };

      /* hero position -> panel slot.
         transform-origin is top-left on every flyer, so translate = slot - natural,
         and a uniform scale = slot.width / natural.width fits the slot width
         while keeping the aspect ratio (no stretched text). */
      const delta = (el, slot, { fitWidth = false, centerY = false } = {}) => {
        const a = naturalBox(el);
        const b = slot.getBoundingClientRect();
        const scale = fitWidth && a.width ? b.width / a.width : 1;
        return {
          x: b.left - a.left,
          /* a scaled box is shorter than its natural box, so centring has to
             use the scaled height — with the natural one, every centred flyer
             lands about half a scale too high */
          y: b.top + (centerY ? (b.height - a.height * scale) / 2 : 0) - a.top,
          scale,
        };
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: q(".h-spacer"),
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const fly = (id, at, dur, opts) => {
        const el = q(`[data-fly="${id}"]`);
        const slot = q(`[data-slot="${id}"]`);
        if (!el || !slot) return;
        /* the CTA slot is full width but much shorter than the hero button, so
           a uniform scale would land it twice as tall and let it hang out of
           the panel. For that one, tween the box itself (width / height) so it
           fills the slot exactly and the label never gets stretched. */
        const o = opts || {};
        const place = {
          x: () => delta(el, slot, o).x,
          y: () => delta(el, slot, o).y,
        };
        if (o.fitBox) {
          tl.to(el, {
            ...place,
            width: () => slot.getBoundingClientRect().width,
            height: () => slot.getBoundingClientRect().height,
            ...(o.end || {}),
            duration: dur,
            ease: "power2.inOut",
          }, at);
          return;
        }
        /* the logo ends up as a chip with a real radius + padding, and a uniform
           scale would shrink those away with it — so tween its width instead and
           let the svg inside keep its aspect ratio */
        if (o.fitWidthBox) {
          tl.to(el, {
            ...place,
            width: () => slot.getBoundingClientRect().width,
            ...(o.end || {}),
            duration: dur,
            ease: "power2.inOut",
          }, at);
          return;
        }
        tl.to(el, {
          transformOrigin: "0 0",
          ...place,
          ...(o.fitWidth ? { scale: () => delta(el, slot, o).scale } : {}),
          duration: dur,
          ease: "power2.inOut",
        }, at);
      };

      /* ScrollTrigger maps 0 - 100% of the hero scroll onto 0 - D of this
         timeline, and D is 0.7 because the photo blur is the longest tween.
         So a raw timeline position of 0.34 is really 48.6% of the scroll, not
         34%. `sp()` converts a real scroll percentage into a timeline
         position and `dur()` converts a scroll percentage into a duration. */
      const D = 0.7;
      const sp = (pctScroll) => pctScroll * D;
      const dur = (pctScroll) => pctScroll * D;

      // photo blur + fade  (0 - 70%)
      tl.to(".h-photo-img", { filter: "blur(90px)", opacity: 0.3, duration: 0.7 }, 0)
        // hero-only texts slide up and are gone by 10% of the scroll — they
        // belong to the hero state only, the panel has its own copies
        .to(".h-side-text", { yPercent: -100, autoAlpha: 0, duration: dur(0.05) }, sp(0.05))
        .to(".h-heading", { yPercent: -60, autoAlpha: 0, duration: 0.3 }, 0.02)
        .to(".h-traits", { scale: 0.3, autoAlpha: 0, x: "-25vw", y: "-5vw", duration: 0.15 }, 0.05)
        // the hero "About Me" button just fades out
        .to(".h-cta-hero", { autoAlpha: 0, duration: 0.08 }, 0)
        // the ® belongs to the logo chip, so it settles in with it
        .fromTo(".h-reg", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 0.215)
        /* the panel is a stack of separate blocks: their surfaces fade in at
           30-38% of the scroll (opacity only — scaling them would shrink the
           slots inside and every flyer would land off), the small content
           inside the blocks at 34-42% */
        .fromTo(".h-block", { autoAlpha: 0 }, { autoAlpha: 1, duration: dur(0.05), stagger: dur(0.006) }, sp(0.3))
        .fromTo(".h-panel-fade", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: dur(0.05), stagger: dur(0.01) }, sp(0.34))
        // the little menu icons pop in just before the labels land
        .fromTo(".h-nav-icon", { autoAlpha: 0, scale: 0.2 }, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%", duration: dur(0.06), stagger: dur(0.004) }, sp(0.29));

      /* as the logo lands it turns into a small teal chip with dark letters —
         the colour tween finishes exactly when the logo touches down at 0.25 */
      tl.fromTo('[data-fly="logo"]',
        { backgroundColor: "rgba(0,168,150,0)", color: "#00a896" },
        { backgroundColor: "#00a896", color: "#111", duration: 0.04 }, 0.21);

      /* the logo flies into the panel chip — the only fly left. The stat cards,
         the Explore button and the About Me button are now static (stats and
         CTA are rendered in the panel directly), so their hero copies just
         dissolve with the rest of the hero content. */
      fly("logo", 0, 0.25, { fitWidthBox: true });
      tl.to('[data-fly="stat-projects"], [data-fly="stat-years"], [data-fly="cta"]',
        { autoAlpha: 0, scale: 0.4, x: "8vw", y: "6vw", duration: dur(0.09) }, sp(0.04));

      /* the panel has to stay above every page section once the hero is done.
         driven off the timeline progress instead of a zero duration tween, so
         it flips the moment the playhead passes 53% */
      const header = q(".h-header");
      headerEl = header;
      tl.eventCallback("onUpdate", () => {
        header.style.zIndex = tl.progress() >= 0.53 ? "100" : "2";
      });
    };

    const ctx = gsap.context(() => {
      /* position the five letters before anything is measured or animated */
      layoutLogo();

      /* ---------- anchor scroll ----------
         Straight to the section, in one beat — no ride down the 450vh hero.
         Both beats are INSTANT, which is the point: the old handler finished on
         a smooth scroll, so crossing 450vh + the About section read as a frozen
         page and the button looked dead.

         It still has to be two moves. #crafted pins its track (CraftSection.jsx
         has pin: true) and a pin only swaps in its .pin-spacer once the trigger
         is actually reached, so coordinates taken before the pin exists are
         stale and a single move lands short. Move, refresh to re-measure with
         the spacer in place, move again to the corrected offset — and once more
         a frame later, because the refresh's own layout writes land async. */
      const jumpTo = (el) => {
        /* the intro holds the page at scrollY 0 and snaps back anything that gets
           through, so a click inside those first ~3.4s would undo itself */
        if (locked) unlockScroll();

        const go = () => {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          ScrollTrigger.refresh();
          window.scrollTo({
            top: window.scrollY + el.getBoundingClientRect().top,
            behavior: "auto",
          });
        };

        go();
        requestAnimationFrame(go);
      };

      qa('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          const target = document.querySelector(a.getAttribute("href"));
          if (!target) return;
          e.preventDefault();
          /* keep these real links: the URL now carries the section, so the link
             is shareable and survives a reload. replaceState and not
             location.hash, because assigning the hash jumps the page again. */
          history.replaceState(null, "", a.getAttribute("href"));
          jumpTo(target);
        })
      );

      /* ---------- phones: fade the hero out ----------
         .h-header is position:fixed, so it never scrolls away by itself — it just
         sits on top of the next section forever. On desktop the fly timeline owns
         that layer and hands it to the panel; on phones there is no timeline, so
         the hero has to be dismissed by hand. Scrubbed across the hero spacer
         (100vh on mobile, see the media query) so it is gone exactly as the next
         section arrives, in both scroll directions. */
      if (mobile) {
        gsap.to(q(".h-header"), {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: q(".h-spacer"),
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      /* reduced motion: no intro at all — the stylesheet already paints the
         finished hero, so we go straight to the scroll timeline */
      if (reduced) {
        buildScroll();
        raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      /* ---------- page-load intro ----------
         One timeline, absolute positions, so the stages play like a storyboard
         (~3.4s in total):

           0.00-0.30   empty #efefef screen — every element the intro touches is
                       already hidden in CSS, so nothing has to fade out first
           0.30-1.55   M A H A D shoot in from the right, squeezed flat and
                       clipped from the bottom so each glyph grows upward into its
                       full shape, fully opaque the whole way
1.20-1.90   the finished word rises from the middle of the screen into
                        its hero slot
           1.50-2.60   the photo resolves out of a 30px blur
           1.90-2.99   heading lines rise out of their overflow:hidden masks
           2.20-2.85   the two stat cards
           2.60-3.40   buttons, traits card, then the two small texts

         Start states are written here, in the same frame the hero mounts, so the
         browser never paints the finished hero first. The ® and the whole left
         panel are deliberately not in here — they belong to the scroll. */
      /* x is in svg units here (the letters are <g> elements): 60vw of the
         94vw-wide logo = (60 / 94) * 1288 units. The clip rects start at zero
         height, so each glyph is cut off at the bottom and grows upward. */
      gsap.set(".h-logo-letter", { autoAlpha: 1, x: (60 / 94) * 1288, scaleX: 0.55, transformOrigin: "0% 50%" });
      gsap.set(".h-logo-clip", { attr: { y: 0, height: 0 } });
      gsap.set(".h-logo-lift", { y: "15vh" });
      gsap.set(".h-photo", { autoAlpha: 0, filter: "blur(30px)", y: 60, scale: 1.05 });
      gsap.set(".h-heading-line", { autoAlpha: 0, yPercent: 110, filter: "blur(8px)" });
      gsap.set(".h-stat, .h-btn-fly, .h-cta-hero, .h-traits, .h-side-text", { autoAlpha: 0 });
      gsap.set(".h-side-text", { y: 20 });
      gsap.set(".h-btn-fly, .h-cta-hero", { y: 30 });
      gsap.set(".h-stat", { scale: 0.85, filter: "blur(10px)" });
      gsap.set(".h-traits", { scale: 0.9 });

      lockScroll();

      gsap.timeline({ defaults: { ease: "expo.out" } })
        /* STAGE 1 — the five letters, each one clipped open from the bottom */
        .to(".h-logo-letter", { x: 0, scaleX: 1, duration: 0.85, stagger: 0.1, clearProps: "transform" }, 0.3)
        .to(".h-logo-clip", { attr: { height: 338 }, duration: 0.85, stagger: 0.1 }, 0.3)
        /* STAGE 2 — the word rises from the middle of the screen. On .h-logo-lift,
           never on [data-fly="logo"], so the scroll fly keeps sole ownership of
           that element's x / y / scale */
        .to(".h-logo-lift", { y: 0, duration: 0.7, ease: "expo.inOut", clearProps: "transform" }, 1.2)
        /* STAGE 3 — the photo resolves. Tweened on the wrapper, so the img keeps
           the CSS transform that positions it, and the scroll blur (blur 90px on
           .h-photo-img) gets a clean filter to work with afterwards */
        .fromTo(".h-photo",
          { autoAlpha: 0, filter: "blur(30px)", y: 60, scale: 1.05 },
          { autoAlpha: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 1.1, ease: "power3.out", clearProps: "transform,filter" },
          1.5)
        /* STAGE 4 — heading lines rise out of their masks */
        .to(".h-heading-line", {
          autoAlpha: 1, yPercent: 0, filter: "blur(0px)",
          duration: 0.85, stagger: 0.12, clearProps: "transform,filter",
        }, 1.9)
        /* STAGE 5 — the two stat cards */
        .to(".h-stat", {
          autoAlpha: 1, scale: 1, filter: "blur(0px)",
          duration: 0.65, stagger: 0.12, clearProps: "transform,filter",
        }, 2.2)
        /* STAGE 6 — buttons, traits card, then the two small texts */
        .to(".h-btn-fly, .h-cta-hero", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, clearProps: "transform" }, 2.6)
        .to(".h-traits", { autoAlpha: 1, scale: 1, duration: 0.6, clearProps: "transform" }, 2.65)
        .to(".h-side-text", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, clearProps: "transform" }, 2.7)
        .eventCallback("onComplete", () => {
          /* the clip is only needed for the reveal — drop it so nothing can
             ever crop the letters later */
          qa(".h-logo-letter").forEach((g) => g.removeAttribute("clip-path"));
          unlockScroll();
          /* built outside the context's synchronous run, so it is added by hand
             to still be reverted together with the hero */
          ctx.add(buildScroll);
          ScrollTrigger.refresh();
        });
    }, root);

    /* Active nav row: read the live rects on scroll instead of one
       ScrollTrigger per section. The sections below the hero change height
       late (swiper, faq accordion, webfonts), which leaves trigger
       start/end values stale and the highlight pointing at the wrong row.
       Same 40% mark as the mobile menu in App.jsx. */
    const rows = qa(".h-nav-row");
    let ticking = false;
    const paintActive = () => {
      ticking = false;
      const mark = window.innerHeight * 0.4;
      let current = null;
      for (const row of rows) {
        const target = document.querySelector(row.dataset.href);
        if (target && target.getBoundingClientRect().top <= mark) current = row.dataset.href;
      }
      const lit = new Set();
      rows.forEach((row) => {
        const on = row.dataset.href === current && !lit.has(row.dataset.href);
        if (on) lit.add(row.dataset.href);
        row.classList.toggle("is-current", on);
      });
    };
    const onScrollActive = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paintActive);
    };
    paintActive();
    window.addEventListener("scroll", onScrollActive, { passive: true });
    window.addEventListener("resize", onScrollActive);

    /* the scroll timeline refreshes itself: once right after it is built (see
       buildScroll's caller), then on every resize / late font+image load */
    window.addEventListener("resize", onResize);
    window.addEventListener("load", ScrollTrigger.refresh);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(copyTimer.current);
      unlockScroll();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", ScrollTrigger.refresh);
      window.removeEventListener("scroll", onScrollActive);
      window.removeEventListener("resize", onScrollActive);
      if (headerEl) headerEl.style.zIndex = "";
      ctx.revert();
    };
  }, [archivoReady]);

  const copyMail = () => {
    navigator.clipboard?.writeText(MAIL)?.catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1200);
  };

  /* hero-side nav rows are gone — the menu is panel-only (see .h-nav-row) */

  return (
    <div ref={root} className="hero-root">

      {/* ===== page background: always the bottom layer, so the transparent
           sections below the hero still show it ===== */}
      <div className="h-bg fixed inset-0 z-0" aria-hidden="true" />

      {/* ===== scroll length (transparent, part of the z-20 main layer) =====
          pointer-events-none is load-bearing, not decoration. This spacer is
          450vh of real page at z-20, i.e. ABOVE .h-header (z-2) where every
          button lives — so without it it swallowed the clicks and the whole
          header layer (hero buttons AND the panel's nav rows, social, email)
          was dead. It only exists to make the page tall. */}
      <section id="hero" className="h-spacer pointer-events-none relative z-[20] h-[450vh]" />

      {/* ===== HEADER LAYER (z-2, jumps to z-100 at 53%): logo, photo,
           stat cards, nav links, left panel

           z order inside it — panel 2 < logo 3 < photo 4 < stat cards / CTA 5.
           The logo has to clear the panel (z-3 before): it flies into the
           panel's logo chip, and at z-1 the panel's own block surface was
           painting over the word, so it only showed through the translucent
           grey. It still sits under the photo, which was the point of z-1. */}
      <header className="h-header fixed inset-0 z-[2] overflow-hidden pointer-events-none">

        {/* logo sits BEHIND the photo but ABOVE the left panel. no h-in here: the
            container is there from the first frame, only its 5 letters are on
            stage 1 of the intro. .h-logo-lift is an inner wrapper so the intro
            can lift the word from the middle of the screen without touching the
            x/y/scale that the scroll fly writes on [data-fly="logo"]. 4vh keeps
            the word clear of the viewport edge — it is ~44vh tall at this width,
            so it now ends right where the heading starts (50vh). */}
        <div data-fly="logo" className="h-logo-fly absolute left-[2.5vw] top-[4vh] w-[94vw] z-[3]">
          <div className="h-logo-lift"><Logo /></div>
        </div>

        {/* photo sits OVER the logo. 93vh + the .h-photo-img transform puts the
            top of the head at ~7vh; the heading lives in .h-main at z-20, so
            the photo (z-4) can never cover it */}
        <div className="h-photo absolute inset-x-0 bottom-0 z-[4] flex justify-center">
          <img src={photo} alt="Saif Ali" className="h-photo-img hidden sm:block h-[93vh] w-auto max-w-none object-contain object-bottom" />
          <img src={photoMobile} alt="Saif Ali" className="h-photo-img block sm:hidden h-[93vh] w-auto max-w-none object-contain object-bottom" />
        </div>

{/* ===== LEFT PANEL (end state) — always in layout (opacity only)
             so every slot below can be measured while it is there.
             14.5vw wide stack of separate blocks (gap .7vw), each with its own
             rgba(200,200,200,.45) + blur surface — no card behind it all except
             the CTA / email pills which paint their own surfaces.
             h-fit + top-0/bottom-0/my-auto: the stack is ~2/3 of the viewport
             tall, so it is centred and the leftover space is split evenly.
             Hidden below 768px (hidden md:flex): the vw sizes are a 1920px
             design and unusable on a phone, so mobile gets the static hero
             only — no sidebar. */}
<aside className="h-panel absolute left-[1vw] top-[0.9vw] bottom-[0.9vw] my-auto z-[2] w-[14.5vw] h-fit max-h-[calc(100vh-1.8vw)] overflow-y-auto overflow-x-hidden hidden md:flex flex-col gap-[0.6vw] py-[0.8vw]">

          {/* block 1 — logo chip (the flying logo lands here) + paragraph + linkedin */}
          <div className="h-block relative p-[0.6vw]">
            <div className="flex items-start justify-between gap-[0.6vw]">
              {/* the JOHNSMITH chip's slot. The flying logo is tweened to this
                  slot's WIDTH (fly("logo", ..., { fitWidthBox: true })), and its
                  height is then the svg's own 1288:338 ratio plus the pill's
                  fixed 6px 14px padding — the padding no longer scales, so the
                  slot height is tuned to the px math at the 1920px design width
                  (5.6vw ≈ 107.5px wide → svg ≈ 79.5px → 20.9px tall → chip
                  ≈ 32.9px ≈ 1.71vw). The panel only exists on md+ (hidden on
                  mobile). */}
              <div className="h-logo-slot relative w-[5.6vw] h-[1.71vw] shrink-0">
                <div data-slot="logo" className="w-full h-full" />
                <span className="h-reg">r</span>
              </div>
              <a href="https://www.linkedin.com/in/mahad-khan-1a26a637b/" target="_blank" rel="noreferrer" className="h-panel-fade h-social pointer-events-auto shrink-0" aria-label="linkedin">in</a>
            </div>
            <p className="h-panel-fade h-panel-text">Working closely with your team to create Webflow experiences that blend creative thinking, technical precision, and lasting impact.</p>
          </div>

          {/* block 2 — STATS CARD: static flat row. The two hero stat cards
               dissolve on scroll (see buildScroll), so this panel copy is the
               only one that stays after the hero has gone. */}
          <div className="h-block h-stats">
            <div className="h-panel-fade h-stat-item">
              <span className="h-stat-num">10+</span>
              <span className="h-stat-label">Projects</span>
            </div>
            <div className="h-stat-divider" aria-hidden="true" />
            <div className="h-panel-fade h-stat-item">
              <span className="h-stat-num">3+</span>
              <span className="h-stat-label">Years of Experience</span>
            </div>
          </div>

          {/* block 3 — menu. it only ever exists here, never in the hero: each
               row is the real link, so the label is rendered directly instead of
               being flown in from a hero copy */}
          <nav className="h-block flex flex-col gap-[5px] p-[10px]">
            {LINKS.map((l) => (
              <a key={l.id} href={l.href} data-href={l.href} className="h-nav-row pointer-events-auto">
                <span className="h-nav-icon" aria-hidden="true">
                  <LineIcon d={l.icon} />
                </span>
                <span className="h-panel-fade h-nav-label">{l.label}</span>
              </a>
            ))}
          </nav>

          {/* block 4 — marquee strip. ROLES, not PROJECTS: the old keyframes
              ended on translateX(-100%), which slides a copy off its own left
              edge — with two copies that just left a gap and a right-to-left
              scroll. One track holds identical back-to-back copies and slides
              exactly -50%, i.e. one copy width, so it loops seamlessly. */}
          <div className="h-block h-marquee">
            <div className="h-marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="h-marquee-group" aria-hidden={k === 1}>
                  {ROLES.map((r) => <span key={r + k}>{r}</span>)}
                </div>
              ))}
            </div>
          </div>

          {/* block 5 — email row, click copies the full address */}
          <button type="button" className="h-block h-email pointer-events-auto" onClick={copyMail} title={MAIL}>
            <span className="h-email-text">{EMAIL}</span>
            <span className="h-email-copy" aria-hidden="true"><CopyIcon ok={copied} /></span>
          </button>

          {/* block 6 — CTA: full width teal, pinned to the panel bottom */}
          <a href="#crafted" className="h-block h-cta pointer-events-auto">Explore</a>
        </aside>

{/* ===== flying elements (start state = hero positions) =====
             the stat cards carry the shared .info-card surface (warm greige +
             blur, see hero.css) — translucent enough that the photo still reads
             through them, but no longer borderless. Their aspect ratios are
             mirrored in the panel slots — projects is landscape 13x7.8vw (1.67:1,
             slot 6x3.6vw) and years is portrait 7x9vw (0.78:1, slot 3.5x4.5vw) — so
             each card's width-based fly scale lands it exactly on its slot.

             Both sit on the right, overlapping the photo. The photo's visible
             right edge works out to ~75.6vw on 16:9: the img is centred, h-93vh,
             1:1 source and scaled 1.15, and its opaque pixels only span 7.2%-94.9%
             of the canvas. Both cards start at 68.5vw, so they line up, and over
             half of each one sits on the photo. They stay at z-5 (panel 2, logo 3,
             photo 4) so they read on top of both.

             The portrait years card is 9vw = ~16vh tall, so it runs 75->91vh. The
             landscape projects card above it is 7.8vw = ~13.9vh and starts at
             56vh, so it ends 69.9vh and leaves a 5.1vh gap. Years cannot move
             (91vh is the viewport floor), so projects is what absorbs any
             further lift. Clear of the heading too: its longest line ends at
             63.8vw, well left of the cards' 68.5vw edge. That is also why the
             side paragraph on the right is narrowed to 20vw and inset only
             0.5vw, so it starts at 79.5vw — a clear 4vw off the years card's
             75.5vw edge, which is what stopped its label spilling into this copy.
             0.5vw is as far as this goes: the next step is right-0, i.e. the
             copy hard against the viewport edge.

             Projects is .h-stat-row: icon left, then "10+ / Projects" stacked.
             Years keeps the default centred column — it is portrait 7x9vw and
             has no icon at all, so a row would only shrink its numeral. */}
        <div data-fly="stat-projects" className="h-stat glass-card info-card h-stat-row h-in absolute left-[68.5vw] top-[56vh] z-[5] w-[13vw] h-[7.8vw]">
          <div className="h-stat-icon w-[6vw]"><ReactIcon /></div>
          <p className="h-stat-text"><span className="h-num">10+</span><br />Projects</p>
        </div>
        <div data-fly="stat-years" className="h-stat glass-card info-card h-stat-years h-in absolute left-[68.5vw] top-[75vh] z-[5] w-[7vw] h-[9vw]">
          <StatNum n="3" />
          <p className="h-stat-text">Years of<br />Experience</p>
        </div>

        {/* under the "Your Web Expert. Johnsmith." line (88vh, one line = ~2.4vh), so the
            row starts at 92vh and ends ~97.7vh. It stops at ~23vw, just short of
            the photo's visible left edge (~24.2vw). The Explore button is the one
            that flies into the panel's full-width CTA slot. */}
        <div className="h-cta-row absolute left-[3.5vw] top-[92vh] z-[5] flex gap-[0.8vw] pointer-events-auto">
          <a href="#crafted" data-fly="cta" className="h-btn h-btn-main h-btn-fly h-in">Explore</a>
          <a href="#about" className="h-btn h-btn-light h-cta-hero h-in">About Me</a>
        </div>

        </header>

      {/* ===== MAIN LAYER (z-20): heading + side texts + traits card.
           Everything else on the page (the spacer above and the sections in
           App.jsx) also lives at z-20, and comes later in the DOM. ===== */}
      <div className="h-main fixed inset-0 z-[20] pointer-events-none">
        {/* the heading sits at z-20 (this layer) while the photo lives in the
            header at z-2, so the photo can never cover it; 53vh keeps the
            whole heading clear of the photo's chest area. The three lines run
            59-90.4vh (each 10.45vh) and are split so none of them runs into the
            stat cards on the right: lines 2-3 end around 58-64vw, well clear of
            the cards' 68.5vw edge, and line 1 stays above the projects card. */}
        <h1 className="h-heading absolute left-[28vw] top-[59vh]">
          {["Full Stack Web", "& Software", "Developer"].map((t) => (
            <span key={t} className="block overflow-hidden"><span className="h-heading-line block">{t}</span></span>
          ))}
        </h1>

        <p className="h-side-text h-in absolute left-[3.5vw] top-[88vh] w-[14vw]">Your Web Expert. Johnsmith.</p>
        <p className="h-side-text h-in absolute right-[0.5vw] top-[85vh] w-[20vw]">
I&rsquo;m a Web &amp; Software Developer with 3+ years of experience building modern websites, web applications, e-commerce solutions, and software products.
        </p>

        {/* skills card — left side of the hero, gone by the time the panel lands */}
        <div className="h-traits glass-card info-card h-in absolute left-[3.5vw] top-[56vh]">
          <p className="h-traits-title">{SKILLS_TITLE}</p>
          {SKILLS.map((s) => (
            <div key={s.label} className="flex items-center gap-[0.6vw]">
              <i className={`h-mark${s.accent ? " h-mark-accent" : ""}`}>{s.mark}</i>{s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
