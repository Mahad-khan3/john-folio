import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./about.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------- shared animation strings (same values as original HTML) ---------- */
const CARD_FROM = "{'y': '10%', 'opacity': 0, 'scale': 0.6}";
const CARD_TO =
  "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}";
const NUM_TO =
  "{'duration': 1.5, 'stagger': 0.1, 'delay': 0.2, 'ease': 'expo.out'}";
const LINES_FROM = "{'yPercent': 100}";
const H3_TO =
  "{'yPercent': 0,  'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'expo.out'}";
const P_TO =
  "{'yPercent': 0,  'duration': 0.6, 'stagger': 0.1, 'delay': 0.4, 'ease': 'expo.out'}";
const BTN_FROM = "{'opacity': 0}";
const BTN_TO =
  "{'opacity': 1,  'duration': 1.4,  'delay': 0.8, 'ease': 'expo.out'}";
const LINE_FROM = "{'clipPath':'inset(100% 0% % 0%)'}";
const LINE_TO =
  "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }";
const HEAD_TO =
  "{'width':'auto',   'opacity':1,   'duration':0.7,   'ease':'expo.inOut' }";
const HEAD_FROM = "{'width':'0vw','opacity':0}";
const INTRO_TO =
  "{'yPercent': 0,  'duration': 0.6, 'stagger': 0.1, 'delay': 0.3, 'ease': 'power2.out'}";
const TIMELINE_TO =
  "{   'keyframes': [     { 'height': '14%', 'duration': 2 },     { 'height': '28%', 'duration': 1 },     { 'height': '42%', 'duration': 1.5 },     { 'height': '56%', 'duration': 2 },     { 'height': '70%', 'duration': 1 },     { 'height': '84%', 'duration': 1.5 },     { 'height': '100%', 'duration': 2 }   ],   'ease': 'none' }";

/* ---------- SVG paths ---------- */
const PATH_A =
  "M568.583 2156.04C577.972 2158.27 587.663 2160.56 597.845 2162.95L597.349 2165.06C587.182 2162.67 577.504 2160.39 568.127 2158.17L568.583 2156.04Z";
const PATH_B =
  "M516.754 2143.51C525.171 2145.59 533.538 2147.63 542.014 2149.68L541.558 2151.81C533.082 2149.76 524.714 2147.72 516.297 2145.64L516.754 2143.51Z";
const PATH_MAIN =
  "M1113.37 7.05273C857.638 75.0405 691.252 130.525 419.75 240.01C265.135 302.359 160.718 349.057 94.9395 399.803C62.0738 425.157 38.8986 451.491 23.9316 481.25C8.96604 511.006 2.17188 544.259 2.17188 583.504C2.17194 613.853 8.02461 640.901 24.0537 666.256C40.0935 691.627 66.381 715.394 107.409 739.066C189.501 786.431 330.303 833.25 565.114 891.842C812.778 953.64 932.075 1019.04 989.682 1079.82C1047.39 1140.71 1043.09 1196.89 1044.1 1239.48V1239.52C1043.79 1259.24 1039.25 1277.68 1027.51 1295.61C1015.79 1313.52 996.931 1330.86 968.091 1348.46C910.437 1383.65 812.64 1420.07 651.411 1464.25L650.62 1464.46C508.96 1503.28 357.819 1544.7 242.087 1602.3C126.305 1659.92 46.4043 1733.52 46.4043 1836.5C46.4043 1888.17 60.2488 1929.16 84.1621 1962.42C108.086 1995.69 142.136 2021.3 182.644 2042.12C263.71 2083.78 370.327 2106.11 472.759 2132.43C478.709 2133.96 484.522 2135.44 490.242 2136.89L489.785 2139.01C484.038 2137.56 478.197 2136.07 472.218 2134.53C369.967 2108.26 262.999 2085.86 181.651 2044.05C140.952 2023.13 106.587 1997.33 82.3984 1963.68C58.199 1930.02 44.2324 1888.59 44.2324 1836.5C44.2324 1732.18 125.209 1658.04 241.119 1600.35C357.079 1542.64 508.446 1501.17 650.046 1462.37L658.348 1460.08C815.096 1416.84 910.487 1381.08 966.959 1346.61C995.63 1329.11 1014.21 1311.97 1025.7 1294.42C1037.17 1276.89 1041.62 1258.87 1041.92 1239.51C1040.92 1196.85 1045.16 1141.52 988.105 1081.32C930.944 1021 812.164 955.726 564.589 893.949C329.796 835.362 188.714 788.484 106.324 740.947C65.112 717.169 38.5092 693.184 22.2188 667.416C5.91787 641.632 6.28439e-05 614.154 0 583.504C0 543.999 6.8414 510.397 21.9912 480.274C37.1399 450.154 60.5607 423.582 93.6133 398.083C159.672 347.122 264.384 300.321 418.938 237.996C690.517 128.481 856.987 72.9653 1112.81 4.95312L1113.37 7.05273Z";

/* ---------- card data ---------- */
const CARDS = [
  {
    id: "ac-1",
    connect: "step-1",
    origin: "bottom right",
    ac: "ac-1",
    start: "-45% top",
    pointAfter: true,
    inContainer: false,
    num: "22",
    year: "2022",
    heading: "Started My Journey",
    short:
      "Started my journey in technology in 2022, building a strong interest in web development and software development. What began with learning the fundamentals gradually turned into hands-on experience with real projects, modern technologies, and problem-solving.",
    btn: "Read more about my journey",
    aria: "Read more about my journey",
    text: "My journey into technology started in 2022, when I began exploring web development and software development. I started by learning the fundamentals of programming, web technologies, and problem-solving, then gradually moved toward building real-world projects. With every project, I gained practical experience, improved my coding skills, and learned how to turn ideas into functional digital products. What started as learning soon became a serious passion for creating websites, applications, and software solutions.",
  },
  {
    connect: "step-2",
    origin: "bottom left",
    ac: "ac-2",
    start: "-25% top",
    inContainer: true,
    num: "23",
    year: "2023",
    heading: "Built My Foundation",
    short:
      "Learned the fundamentals properly: HTML, CSS, JavaScript, responsive design, and how a website actually works in the browser.",
    btn: "Read more about my foundation",
    aria: "Read more about my foundation",
    text: "I focused on learning the fundamentals properly instead of jumping ahead. HTML, CSS, and JavaScript came first, followed by responsive design and accessibility so my work looked right on every screen. Small personal projects taught me how a page is structured, how layouts break under real content, and how much attention to detail actually needs. That base is still what I build on today.",
  },
  {
    connect: "step-3",
    origin: "bottom left",
    ac: "ac-3",
    start: "-5% top",
    inContainer: true,
    num: "24",
    year: "2024",
    heading: "Went Full Stack",
    short:
      "Moved into the MERN stack, building real applications with React on the frontend and Node.js, Express, and MongoDB on the backend.",
    btn: "Read more about my stack",
    aria: "Read more about my full stack work",
    text: "This is where things became practical. I moved into the MERN stack and started building full applications instead of static pages: React for interfaces, Node.js and Express for the backend, and MongoDB for real data. I learned authentication, API design, and how to connect a frontend to a live database. Every bug taught me something about data flow that no tutorial could have shown me.",
  },
  {
    connect: "step-4",
    origin: "bottom right",
    ac: "ac-4",
    start: "15% top",
    inContainer: true,
    num: "25",
    year: "2025",
    heading: "Shipping Real Products",
    short:
      "Shipped real client work across business websites, web applications, and e-commerce, taking projects from requirements to launch.",
    btn: "Read more about my work",
    aria: "Read more about shipped products",
    text: "I started shipping real products. Working directly with clients, I took projects from requirements to launch: business websites, web applications, and e-commerce builds on Shopify. I learned to write clean, maintainable code, to communicate progress clearly, and to handle feedback without losing momentum. Seeing a project go live and actually being used is what confirmed this was the right path.",
  },
  {
    connect: "step-5",
    origin: "bottom left",
    ac: "ac-5",
    start: "35% top",
    inContainer: true,
    withImage: true,
    num: "26",
    year: "2026",
    heading: "Software Development & Engineering",
    short:
      "In 2026, my focus is software development with the MERN Stack and Python — building scalable web applications, powerful backend systems, and practical software solutions. This is where I’m sharpening my skills and turning ideas into real-world products.",
    btn: "Read more about my focus",
    aria: "Read more about my current focus",
    text:
      "In 2026, my focus is software development with the MERN Stack and Python — building scalable web applications, powerful backend systems, and practical software solutions. This is where I’m sharpening my skills and turning ideas into real-world products.",
  },
];

/* ---------- timeline circles: [cx, cy, start, connect-attr-name, connect-value] ---------- */
const CIRCLES = [
  [1111.09, 6.5, "-30% top", "data-connec", "step-1"], // attribute name kept exactly as in original HTML
  [186.086, 341.5, "-17% top", "data-connect", "step-2"],
  [105.086, 739.5, "-1% top", "data-connect", "step-3"],
  [998.086, 1092.5, "13% top", "data-connect", "step-4"],
  [582.086, 1482.5, "29% top", "data-connect", "step-5"],
];
const STATIC_CIRCLES = CIRCLES.map(([cx, cy]) => [cx, cy]);

const MOBILE_CIRCLES = [
  [7, 49.5, 5.5],
  [7, 508, 6],
  [7.5, 968, 6],
  [7.5, 1428, 6],
  [7.5, 1888, 6],
  [7.5, 2348, 6],
];

/* ---------- small pieces ---------- */
function PointWrap({ start }) {
  return (
    <div className="about-card-point-wrap">
      <div className="about-card-point-line-wrap">
        <div
          data-tl-desktop=""
          data-tl-type="trigger"
          data-tl-trigger=".about-card-container"
          data-tl-start={start}
          data-tl-from={LINE_FROM}
          data-tl-to={LINE_TO}
          className="about-card-point-line"
        ></div>
      </div>
      <div className="about-card-point-circle"></div>
    </div>
  );
}

function Popup({ year, heading, text }) {
  return (
    <div className="popup-card-wrap">
      <div className="popup-card-item">
        <div className="popup-card">
          <div className="popup-card-top-item">
            <div>{year}</div>
            <div className="popup-close">
              <div className="popup-close-icon">
                <div className="popup-close-path-1"></div>
                <div className="popup-close-path-2"></div>
              </div>
            </div>
          </div>
          <div className="popup-card-bottom-item">
            <div className="about-card-img-wrap">
              <h4 className="popup-heading">{heading}</h4>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadMoreButton({ start, aria, label }) {
  return (
    <button
      data-tl-type="trigger"
      data-tl-trigger=".about-card-container"
      data-tl-start={start}
      data-tl-from={BTN_FROM}
      data-tl-to={BTN_TO}
      data-tl-desktop=""
      aria-label={aria}
      className="about-card-button"
    >
      <p className="paragraph">{label}</p>
    </button>
  );
}

function Card({ c }) {
  const wrapProps = {
    "data-connect": c.connect,
    "data-origin": c.origin,
    "data-desktop": "",
    className: `about-card-wrap ${c.ac}`,
  };
  if (c.id) wrapProps.id = c.id;

  const cardBox = (
    <div
      data-tl-desktop=""
      data-tl-type="trigger"
      data-tl-trigger=".about-card-container"
      data-tl-start={c.start}
      data-tl-from={CARD_FROM}
      data-tl-to={CARD_TO}
      className="about-card"
    >
      <p className="about-card-year">
        {"'"}
        <span
          data-tl-desktop=""
          data-number-count={c.num}
          data-tl-trigger=".about-card-container"
          data-tl-start={c.start}
          data-tl-to={NUM_TO}
        >
          {c.num}
        </span>
      </p>
      <h3
        data-tl-desktop=""
        data-tl-type="trigger"
        data-tl-trigger=".about-card-container"
        data-tl-start={c.start}
        data-tl-split="lines"
        data-tl-from={LINES_FROM}
        data-tl-to={H3_TO}
        className="about-card-heading"
      >
        {c.heading}
      </h3>
      <p
        data-tl-desktop=""
        data-tl-type="trigger"
        data-tl-trigger=".about-card-container"
        data-tl-start={c.start}
        data-tl-split="lines"
        data-tl-from={LINES_FROM}
        data-tl-to={P_TO}
        className="op80"
      >
        {c.short}
      </p>

      <div className="about-card-bottom-layout">
        {c.withImage && (
          <div className="about-card-bottom-layout-left">
            <p
              data-tl-desktop=""
              data-tl-type="trigger"
              data-tl-trigger=".about-card-container"
              data-tl-start={c.start}
              data-tl-split="lines"
              data-tl-from={LINES_FROM}
              data-tl-to="{'yPercent': 0,  'duration': 0.4, 'stagger': 0.1, 'delay': 0.6, 'ease': 'expo.out'}"
              className="about-card-bottom-text"
            >
              @johnsmith
              <br />
              2hours ago
            </p>
          </div>
        )}
        <ReadMoreButton start={c.start} aria={c.aria} label={c.btn} />
        <Popup
          year={c.year}
          heading={c.heading}
          text={c.text}
        />
      </div>
    </div>
  );

  const point = <PointWrap start={c.start} />;

  return (
    <div {...wrapProps}>
      {c.pointAfter ? (
        <>
          {cardBox}
          {point}
        </>
      ) : (
        <>
          {point}
          {cardBox}
        </>
      )}
    </div>
  );
}

function Gradients({ suffix = "" }) {
  return (
    <defs>
      {[0, 1, 2].map((i) => (
        <linearGradient
          key={i}
          id={`paint${i}_linear_4101_214${suffix}`}
          x1="568.737"
          y1="380.366"
          x2="568.737"
          y2="1766.67"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.201923" stopColor="#00a896"></stop>
          <stop offset="0.240385" stopColor="#00a896" stopOpacity="0"></stop>
        </linearGradient>
      ))}
    </defs>
  );
}

function TimelinePaths({ className }) {
  return (
    <>
      <path d={PATH_A} fill="currentColor" className={className}></path>
      <path d={PATH_A} fill="currentColor" className={className}></path>
      <path d={PATH_B} fill="currentColor" className={className}></path>
      <path d={PATH_B} fill="currentColor" className={className}></path>
      <path d={PATH_MAIN} fill="currentColor" className={className}></path>
      <path d={PATH_MAIN} fill="currentColor" className={className}></path>
    </>
  );
}

/* ---------- data-tl-* animation engine (GSAP + ScrollTrigger + SplitText) ---------- */
const parseObj = (s) => JSON.parse(s.replace(/'/g, '"'));

function useTlAnimations(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    let ctx;
    let cancelled = false;

    const setup = (desktop) => {
      // 1) generic data-tl-type="trigger" | "scroll" elements
      root.querySelectorAll("[data-tl-type]").forEach((el) => {
        if (!desktop && el.hasAttribute("data-tl-desktop")) return;
        const trigger = document.querySelector(el.dataset.tlTrigger);
        if (!trigger) return;

        const from = parseObj(el.dataset.tlFrom);
        const to = parseObj(el.dataset.tlTo);

        let targets = el;
        if (el.dataset.tlSplit === "lines") {
          targets = SplitText.create(el, { type: "lines", mask: "lines" }).lines;
        }

        const scrollTrigger =
          el.dataset.tlType === "scroll"
            ? { trigger, start: el.dataset.tlStart, end: el.dataset.tlEnd, scrub: true }
            : { trigger, start: el.dataset.tlStart, toggleActions: "play none none reverse" };

        gsap.set(targets, from);
        gsap.to(targets, { ...to, scrollTrigger });
      });

      // 2) number count-up ('19 → '26)
      if (desktop) {
        root.querySelectorAll("[data-number-count]").forEach((el) => {
          const n = parseInt(el.dataset.numberCount, 10);
          const to = parseObj(el.dataset.tlTo);
          const trigger = document.querySelector(el.dataset.tlTrigger);
          const o = { v: 0 };
          el.textContent = "00";
          gsap.to(o, {
            v: n,
            duration: to.duration,
            delay: to.delay,
            ease: to.ease,
            onUpdate: () => {
              el.textContent = String(Math.round(o.v)).padStart(2, "0");
            },
            scrollTrigger: {
              trigger,
              start: el.dataset.tlStart,
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    };

    const init = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 992px)", () => setup(true));
        mm.add("(max-width: 991px)", () => setup(false));
      }, root);
      ScrollTrigger.refresh();
    };

    document.fonts.ready.then(init);

    // layout can shift after images / sidebar / route render -> recalc trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const box = root.querySelector(".about-card-container");
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    if (box) ro.observe(box);
    const t = setTimeout(refresh, 800);

    return () => {
      cancelled = true;
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("load", refresh);
      if (ctx) ctx.revert();
    };
  }, [rootRef]);
}

/* ---------- main component ---------- */
export default function AboutSection() {
  const [first, ...rest] = CARDS;
  const rootRef = useRef(null);
  useTlAnimations(rootRef);

  // popup open / close (class toggling, so React never fights GSAP's DOM edits)
  const closeAll = (root) =>
    root
      .querySelectorAll(".about-card-wrap.is-open")
      .forEach((w) => w.classList.remove("is-open"));

  const onClick = (e) => {
    const root = e.currentTarget;
    const openBtn = e.target.closest(".about-card-button");
    const closeBtn = e.target.closest(".popup-close");
    if (openBtn) {
      closeAll(root);
      openBtn.closest(".about-card-wrap")?.classList.add("is-open");
    } else if (closeBtn) {
      closeBtn.closest(".about-card-wrap")?.classList.remove("is-open");
    } else if (!e.target.closest(".popup-card")) {
      closeAll(root);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && rootRef.current) closeAll(rootRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="about" className="about-section about-main" ref={rootRef} onClick={onClick}>
      <div className="container">
        <div className="column">
          <div
            data-tl-to={HEAD_TO}
            data-tl-type="trigger"
            data-tl-trigger=".about-section"
            data-tl-start="top 90%"
            data-tl-from={HEAD_FROM}
            className="label"
          >
            Start Small. Scale Big.
          </div>
          <h2
            data-tl-to={INTRO_TO}
            data-tl-type="trigger"
            data-tl-trigger=".about-section"
            data-tl-start="top 90%"
            data-tl-split="lines"
            data-tl-from={LINES_FROM}
            className="h2-style margin-bottom-s"
          >
            Behind the Build (&amp;) <br />
            My Journey
          </h2>
          <p
            data-tl-to={INTRO_TO}
            data-tl-type="trigger"
            data-tl-trigger=".about-section"
            data-tl-start="top 90%"
            data-tl-split="lines"
            data-tl-from={LINES_FROM}
            className="max-width-389"
          >
            Three years of shipping real projects, and I’m just getting started.
          </p>
        </div>

        <div className="about-wrap">
          <Card c={first} />

          <div className="about-card-container">
            {rest.map((c) => (
              <Card key={c.connect} c={c} />
            ))}

            <div className="about-timeline-wrap">
              <div
                data-tl-desktop=""
                data-tl-type="scroll"
                data-tl-trigger=".about-card-container"
                data-tl-start="top 90%"
                data-tl-end="bottom 80%"
                data-tl-from="{'height' : '0%'}"
                data-tl-to={TIMELINE_TO}
                className="about-timeline-overflow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 1118 1520"
                  fill="none"
                  className="about-timeline"
                >
                  <TimelinePaths />
                  {STATIC_CIRCLES.map(([cx, cy]) => (
                    <circle
                      key={cx}
                      cx={cx}
                      cy={cy}
                      r="5.5"
                      fill="#00a896"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="op-0"
                    ></circle>
                  ))}
                  <Gradients />
                </svg>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 1118 1520"
                fill="none"
                className="about-timeline-position"
              >
                <TimelinePaths className="op-0" />
                {CIRCLES.map(([cx, cy, start, attr, val]) => {
                  const connectProp = { [attr]: val };
                  return (
                    <circle
                      key={cx}
                      cx={cx}
                      cy={cy}
                      r="5.5"
                      fill="#00a896"
                      stroke="currentColor"
                      strokeWidth="2"
                      data-tl-type="trigger"
                      data-tl-trigger=".about-card-container"
                      data-tl-start={start}
                      data-tl-from="{'opacity' : 0}"
                      data-tl-to="{'opacity': 1, 'duration': 0.6}"
                      {...connectProp}
                    ></circle>
                  );
                })}
                <Gradients suffix="_b" />
              </svg>
            </div>
          </div>

          <div className="mobile-timeline-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 15 2421"
              fill="none"
              className="mobile-timeline-icon"
            >
              <path
                d="M8.5 2421H5.5V2412H8.5V2421ZM8.5 2401H5.5V2392H8.5V2401ZM8.5 2381H5.5V0H8.5V2381Z"
                fill="currentColor"
              ></path>
              {MOBILE_CIRCLES.map(([cx, cy, r]) => (
                <circle
                  key={cy}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#00a896"
                  stroke="currentColor"
                  strokeWidth="3"
                ></circle>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
