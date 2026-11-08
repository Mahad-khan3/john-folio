import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./services.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- reads the same data-tl-* attributes as the original build ---------- */
const parseObj = (s) => JSON.parse(s.replace(/'/g, '"'));

function useTlAnimations(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    let ctx;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        root.querySelectorAll('[data-tl-type="trigger"]').forEach((el) => {
          const trigger = document.querySelector(el.dataset.tlTrigger);
          if (!trigger) return;

          if (el.dataset.tlSplit === "lines") {
            const lines = SplitText.create(el, { type: "lines", mask: "lines" }).lines;
            gsap.set(lines, parseObj(el.dataset.tlFrom));
            gsap.to(lines, {
              ...parseObj(el.dataset.tlTo),
              scrollTrigger: {
                trigger,
                start: el.dataset.tlStart,
                toggleActions: "play none none reverse",
              },
            });
            return;
          }

          gsap.set(el, parseObj(el.dataset.tlFrom));
          gsap.to(el, {
            ...parseObj(el.dataset.tlTo),
            scrollTrigger: {
              trigger,
              start: el.dataset.tlStart,
              toggleActions: "play none none reverse",
            },
          });
        });
      }, root);
      ScrollTrigger.refresh();
    };

    document.fonts.ready.then(init);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      if (ctx) ctx.revert();
    };
  }, [rootRef]);
}

/* ---------- icons ---------- */
const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 42 42" fill="none" className="service-card-icon">
    <rect width="41.5299" height="41.5299" rx="9.96716" fill="#00a896" />
    <path d="M20.7656 16.1932C20.7656 18.7145 18.7187 20.7614 16.1974 20.7614C13.6762 20.7614 11.6292 18.7145 11.6292 16.1932V11.625H16.1974C18.7187 11.625 20.7656 13.6719 20.7656 16.1932Z" fill="currentColor" />
    <path d="M25.3302 20.7656C22.809 20.7656 20.762 18.7187 20.762 16.1974C20.762 13.6762 22.809 11.6292 25.3302 11.6292H29.8984V16.1974C29.8984 18.7187 27.8515 20.7656 25.3302 20.7656Z" fill="currentColor" />
    <path d="M20.7656 25.3381C20.7656 22.8168 22.8126 20.7699 25.3338 20.7699C27.8551 20.7699 29.902 22.8168 29.902 25.3381V29.9062H25.3338C22.8126 29.9062 20.7656 27.8593 20.7656 25.3381Z" fill="currentColor" />
    <path d="M16.1932 20.7656C18.7145 20.7656 20.7614 22.8126 20.7614 25.3338C20.7614 27.8551 18.7145 29.902 16.1932 29.902H11.625V25.3338C11.625 22.8126 13.6719 20.7656 16.1932 20.7656Z" fill="currentColor" />
  </svg>
);

const StarterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 44 42" fill="none" className="service-card-icon">
    <rect width="43.191" height="41.5299" rx="9.96716" fill="#00a896" />
    <path d="M21.5783 11.6519L12.4512 20.7983V29.9091L21.5783 20.7627V11.6519Z" fill="currentColor" />
    <path d="M21.5918 20.7829V29.8939L30.7191 20.7473V11.6363L21.5918 20.7829Z" fill="currentColor" />
  </svg>
);

const CustomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 42 42" fill="none" className="service-card-icon">
    <rect width="41.5299" height="41.5299" rx="9.96716" fill="#00a896" />
    <path fillRule="evenodd" clipRule="evenodd" d="M29.9264 16.8302C29.9264 15.7569 29.113 14.8984 28.0963 14.8984C27.0795 14.8984 26.2661 15.7569 26.2661 16.8302C26.2661 17.5278 26.2661 20.2109 26.2661 20.9085C26.2661 21.9817 25.4527 22.8403 24.436 22.8403C23.4192 22.8403 22.6059 21.9817 22.6059 20.9085C22.6059 20.2109 22.6059 14.2544 22.6059 13.5568C22.6059 12.4836 21.7925 11.625 20.7757 11.625C19.759 11.625 18.9456 12.4836 18.9456 13.5568C18.9456 14.2544 18.9456 20.2109 18.9456 20.9085C18.9456 21.9817 18.1322 22.8403 17.1154 22.8403C16.0987 22.8403 15.2853 21.9817 15.2853 20.9085C15.2853 20.2109 15.2853 17.5278 15.2853 16.8302C15.2853 15.7569 14.4719 14.8984 13.4551 14.8984C12.4384 14.8984 11.625 15.7569 11.625 16.8302V26.5966C11.625 28.4211 12.9976 29.8699 14.7261 29.8699H26.6728C28.4013 29.8699 29.7739 28.4211 29.7739 26.5966L29.9264 16.8302Z" fill="currentColor" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 22 23" fill="none" className="services-tooltip-icon">
    <path d="M11.1846 5.16699C14.5029 5.18253 17.1537 7.85043 17.1777 11.1299C17.2021 14.438 14.5506 17.1168 11.292 17.1768C7.89133 17.2395 5.201 14.5009 5.16699 11.2363C5.13341 7.98119 7.74996 5.17702 11.1846 5.16699Z" stroke="currentColor" strokeWidth="1.58333" />
    <rect x="10.3281" y="7.38281" width="1.67711" height="1.67711" rx="0.838555" fill="currentColor" />
    <rect x="10.3281" y="9.90234" width="1.67711" height="5.03133" rx="0.838555" fill="currentColor" />
  </svg>
);

/* ---------- data ---------- */
const SERVICES = [
  {
    id: "support",
    icon: <SupportIcon />,
    heading: "Ongoing Support",
    price: "$1,500",
    hours: "/ 30 hours",
    description:
      "Your dedicated development partner, providing 30 hours of focused support each month. Whatever your website needs, handled. Minimum 3-month commitment.",
    features: [
      "New pages, sections, and features",
      "Campaign-driven updates, content blocks, and assets",
      "Maintenance, bug fixes, and content updates",
      "Technical SEO and performance optimization",
      "Unused hours roll over (up to 3 months)",
    ],
    note: "For brands that need continuous growth, reliable development, and long-term collaboration.",
  },
  {
    id: "starter",
    icon: <StarterIcon />,
    heading: "Starter Build",
    price: "$2,000",
    hours: "",
    description:
      "A clean, responsive build developed from your existing designs and ready to launch in one to two weeks.",
    features: [
      "Up to 6 pages",
      "Design-to-development build",
      "CMS setup and dynamic content",
      "Responsive development",
      "Custom interactions and animations",
      "Technical SEO implementation",
      "CMS & editor setup",
      "Launch support",
    ],
    note: "For brands with ready-to-build designs that need a clean, reliable development handoff.",
  },
  {
    id: "custom",
    icon: <CustomIcon />,
    heading: "Custom Project",
    price: "Book a Call",
    hours: "",
    description:
      "Advanced development for complex websites that need custom functionality, scalable architecture, and tailored solutions.",
    features: [
      "Advanced interactions & animations",
      "Custom CMS architecture",
      "Modular components & dynamic content",
      "API & third-party integrations",
      "Performance optimization",
      "14 days post-launch support",
    ],
    note: "For complex projects that need more than standard development.",
  },
];

const ServiceCard = ({ service, start }) => (
  <article
    className="service-card"
    data-tl-type="trigger"
    data-tl-trigger="#services_column"
    data-tl-start={start}
    data-tl-from='{"y": "10%", "opacity": 0, "scale": 0.6}'
    data-tl-to='{"y": "0%", "opacity": 1, "scale": 1, "duration": 1.1, "delay": 0.3, "ease": "expo.out"}'
  >
    <div className="service-top-content">
      <div className="service-card-top-item">
        {service.icon}
        <h3 className="service-card-heading">{service.heading}</h3>
      </div>

      <div className="service-price-item">
        <p>{service.price}</p>
        {service.hours ? (
          <div className="services-hours-text">
            <p>{service.hours}</p>
          </div>
        ) : null}
      </div>

      <p className="service-description">{service.description}</p>

      <div className="service-list">
        {service.features.map((feature) => (
          <div className="service-list-item" key={feature}>
            <div className="service-list-bullet-icon" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="service-bottom-content">
      <InfoIcon />
      <p>{service.note}</p>
    </div>
  </article>
);

export default function ServicesSection() {
  const rootRef = useRef(null);
  useTlAnimations(rootRef);

  const starts = ["-20% top", "-14% top", "-8% top"];

  return (
    <section id="services" ref={rootRef} className="sevice_section">
      <div className="container">
        <div id="services_column" className="column">
          <div
            className="label"
            data-tl-to='{"clipPath":"inset(0% 0% 0% 0%)","opacity":1,"duration":0.8,"ease":"expo.inOut"}'
            data-tl-type="trigger"
            data-tl-trigger="#services_column"
            data-tl-start="top 90%"
            data-tl-from='{"clipPath":"inset(0% 100% 0% 0%)","opacity":0}'
          >
            SERVICES
          </div>
          <h2
            className="h2-style margin-bottom-s"
            data-tl-to='{"yPercent": 0, "duration": 0.6, "stagger": 0.1, "delay": 0.3, "ease": "power2.out"}'
            data-tl-type="trigger"
            data-tl-trigger="#services_column"
            data-tl-start="top 90%"
            data-tl-split="lines"
            data-tl-from='{"yPercent": 100}'
          >
            Solutions <br /> Built to Perform
          </h2>
          <p
            className="max-width-389"
            data-tl-to='{"yPercent": 0, "duration": 0.6, "stagger": 0.1, "delay": 0.3, "ease": "power2.out"}'
            data-tl-type="trigger"
            data-tl-trigger="#services_column"
            data-tl-start="top 90%"
            data-tl-split="lines"
            data-tl-from='{"yPercent": 100}'
          >
            Same attention to detail. Same commitment to quality. The difference is
            simply the scale of your project and what you need right now.
          </p>
        </div>

        <div className="service-wrap">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} start={starts[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
