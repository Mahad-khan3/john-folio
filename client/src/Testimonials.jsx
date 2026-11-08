import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    title: ["Trusted", "long-term collaborator."],
    body: "Johnsmith has been a fantastic partner to work with and continues to be an essential part of our team. He communicates clearly and promptly, and his work consistently exceeds expectations. He solves technical problems quickly and efficiently, always showing real skill, reliability, and a strong commitment to quality.",
  },
  {
    title: ["Thinks through", "the entire build."],
    body: "Johnsmith doesn't just write code \u2014 he thinks through the whole product. Architecture, performance, and the user experience all line up with genuine technical excellence. The result is software that feels fast, complete, and intentional. A true partner in execution. No gaps, no compromises.",
  },
  {
    title: ["Reliable, skilled,", "and easy to work with."],
    body: "Johnsmith was great to work with! He delivered our web applications on schedule, gave our design team useful guidance, and suggested smarter solutions that clearly improved the final results. Super reliable and easy to collaborate with \u2014 highly recommend!",
  },
  {
    title: ["The details that", "set him apart."],
    body: "I've worked with Johnsmith for a few years now, and he still surprises me with the speed and quality of his work. His attention to the small details, the ones most developers overlook, makes all the difference for a great product. He's reliable, fun to collaborate with, and consistently delivers beyond expectations. As long as he wants to work with us, we'll keep building together.",
  },
  {
    title: ["Full-stack thinking,", "reliable delivery."],
    body: "We've hired Johnsmith for several projects, and working with him has always been effortless thanks to his strong understanding of both design and development. He handles everything from the interface down to the backend, and he's dedicated to getting each delivery right for our clients.",
  },
];

const Arrow = ({ dir }) => (
  <svg
    className="drag-tri"
    viewBox="0 0 10 10"
    aria-hidden="true"
    style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
  >
    <path d="M7.6 1 2.6 5l5 4V1z" />
  </svg>
);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef(null);
  const stRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!section || !wrap || !track) return;

    const cards = cardRefs.current.filter(Boolean);

    /* travel = how far the track must move until the last card is fully visible.
       measured from the viewport's clip edge (the left edge of the fade strip) to the
       right edge of the screen, so the extra gap + fade do not eat into the distance */
    const getTravel = () => {
      const clipLeft = wrap.getBoundingClientRect().left;
      const visible = window.innerWidth - clipLeft;
      return Math.max(0, track.scrollWidth - visible);
    };

    /* the active bullet = the last card whose left edge reached the content edge */
    const updateActive = () => {
      const left = wrap.getBoundingClientRect().left;
      let index = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].getBoundingClientRect().left <= left + 2) index = i;
      }
      setActive((prev) => (prev === index ? prev : index));
    };

    const mm = gsap.matchMedia();

    /* ---------- desktop + tablet: pinned horizontal scrub ---------- */
    mm.add("(min-width: 768px)", () => {
      const tween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getTravel(),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: updateActive,
          onUpdate: updateActive,
        },
      });

      stRef.current = tween.scrollTrigger;
      updateActive();

      return () => {
        stRef.current = null;
      };
    });

    /* ---------- mobile: no pin, native scroll snap ---------- */
    mm.add("(max-width: 767px)", () => {
      const onScroll = () => {
        const center = wrap.scrollLeft + wrap.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        cards.forEach((card, i) => {
          const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive((prev) => (prev === best ? prev : best));
      };

      wrap.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        wrap.removeEventListener("scroll", onScroll);
      };
    });

    /* ---------- decorative drag cursor, pointer devices only ---------- */
    mm.add("(min-width: 768px) and (hover: hover) and (pointer: fine)", () => {
      if (!drag) return;

      gsap.set(drag, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

      const xTo = gsap.quickTo(drag, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(drag, "y", { duration: 0.45, ease: "power3" });

      const onMove = (event) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const onEnter = () => {
        gsap.to(drag, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3" });
      };
      const onLeave = () => {
        gsap.to(drag, { autoAlpha: 0, scale: 0, duration: 0.3, ease: "power2.in" });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerenter", onEnter);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  /* ---------- remeasure once fonts / images have settled ---------- */
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    const pending = [...(trackRef.current?.querySelectorAll("img") ?? [])]
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
      );
    if (pending.length) Promise.all(pending).then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  /* ---------- bullet click ---------- */
  const step = (card) => {
    const track = trackRef.current;
    if (!card || !track) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
  };

  const goToCard = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const st = stRef.current;
    if (st) {
      /* scroll position where card i sits at the content's left edge, capped at the pin end */
      const target = Math.min(st.start + index * step(card), st.end);
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }

    const wrap = wrapRef.current;
    if (!wrap) return;
    const left = index * step(card) + (wrap.clientWidth - card.offsetWidth) / 2;
    wrap.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <section id="testimonials" ref={sectionRef} className="testimonial_section">
      <div className="container">
        <div className="column">
          <div className="label">Testimonials</div>

          <div className="testimonial_header">
            <h2 className="h2-style">
              <span>What People</span>
              <span>Say About My Work</span>
            </h2>

            <div className="swiper-pagination" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.title.join("-")}
                  type="button"
                  role="tab"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={active === i}
                  className={`swiper-bullet ${active === i ? "is-active" : ""}`}
                  onClick={() => goToCard(i)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="drag-wrap" ref={wrapRef}>
          <div className="testimonial_track" ref={trackRef}>
            {TESTIMONIALS.map((item, i) => (
              <article
                className="swiper-card"
                key={item.title.join("-")}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <div className="swiper-card-top">
                  <h3 className="swiper-heading">
                    <span>{item.title[0]}</span>
                    <span>{item.title[1]}</span>
                  </h3>

                  <span className="swiper-quote-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 17h3l2-4V7H5v6h3zM14 17h3l2-4V7h-6v6h3z" />
                    </svg>
                  </span>
                </div>

                <p className="swiper-card-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="drag-circle" ref={dragRef} aria-hidden="true">
        <Arrow dir="left" />
        <span className="drag-circle-text">Drag</span>
        <Arrow dir="right" />
      </div>
    </section>
  );
}
