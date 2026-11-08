import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./cta.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Cta() {
  const sectionRef = useRef(null);
  const columnRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const chatRef = useRef(null);
  const typingRef = useRef(null);
  const bubbleRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const headingLines = SplitText.create(".cta_heading .cta-line, .cta_heading .cta-span-heading", {
          type: "lines",
          mask: "lines",
          linesClass: "cta-split-line",
        });

        const paragraphLines = SplitText.create(".cta_paragraph", {
          type: "lines",
          mask: "lines",
          linesClass: "cta-split-line",
        });

        gsap.from(headingLines.lines, {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnRef.current,
            start: "top 90%",
            once: true,
          },
        });

        gsap.from(paragraphLines.lines, {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnRef.current,
            start: "top 65%",
            once: true,
          },
        });

        /* ---------- chat sequence ---------- */
        gsap.set([typingRef.current, bubbleRef.current, buttonRef.current], { autoAlpha: 0 });

        const chat = gsap.timeline({
          scrollTrigger: {
            trigger: chatRef.current,
            start: "top 85%",
            once: true,
          },
        });

        chat
          .fromTo(
            typingRef.current,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" },
            0.15
          )
          .to(typingRef.current, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power2.in" }, "+=1.2")
          .fromTo(
            bubbleRef.current,
            { autoAlpha: 0, scale: 0.8 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }
          )
          .fromTo(
            buttonRef.current,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* ---------- remeasure once fonts have settled ---------- */
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="cta_section">
      <div className="container">
        <div className="column cta-column" ref={columnRef}>
          <h2 className="cta_heading" ref={headingRef}>
            <span className="cta-line">Elevate Your</span>
            <span className="cta-line">Digital</span>
            <span className="cta-span-heading">Experience</span>
          </h2>

          <p className="cta_paragraph" ref={paragraphRef}>
            Every website and software product has room to improve. Get a clearer
            view of what&apos;s working, what&apos;s holding you back, and how to
            build something faster, cleaner, and easier to grow.
          </p>

          <div className="cta_chat" ref={chatRef}>
            <div className="cta_chat_row">
              <div className="cta_bubble_col">
                <div className="cta-chat-typing-wrap" ref={typingRef} aria-hidden="true">
                  <span className="cta-typing-dot" />
                  <span className="cta-typing-dot" />
                  <span className="cta-typing-dot" />
                </div>

                <div className="cta-chat-bubble" ref={bubbleRef}>
                  Have a project in mind?
                </div>

                <button
                  type="button"
                  className="cta-button"
                  ref={buttonRef}
                >
                  <svg
                    className="cta-button-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span className="cta-button-label">Let’s Talk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
