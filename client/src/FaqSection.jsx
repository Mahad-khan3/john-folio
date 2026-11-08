import React, { useState } from "react";
import "./faq.css";

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" className="faq-plus-icon">
    <path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" className="faq-minus-icon">
    <path d="M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const FAQS = [
  {
    q: "Do you build custom web applications?",
    a: "Yes. I build full custom applications with React on the frontend and Node.js, Express, and MongoDB on the backend, including authentication, databases, and third-party integrations.",
  },
  {
    q: "How long does it take?",
    a: "A landing page takes one to two weeks. Most marketing sites run three to five weeks from kickoff to launch.",
  },
  {
    q: "What do you need from me?",
    a: "Ideally a Figma file, final copy, and brand assets. Content is the biggest factor in schedule.",
  },
  {
    q: "Do you work with WordPress sites?",
    a: "Yes. I can rebuild on a cleaner stack, or work inside WordPress when your team publishes regularly.",
  },
  {
    q: "What tech do you build with?",
    a: "Mostly React and Next.js on the front end, with Node.js and MongoDB on the back end whenever real application logic or data is needed.",
  },
  {
    q: "What happens after launch?",
    a: "Every build includes a handover period to fix issues and answer questions, plus optional ongoing support.",
  },
  {
    q: "Do you offer support plans?",
    a: "Yes. A monthly plan gives you a set number of development hours each month for updates and fixes.",
  },
  {
    q: "Can you help with SEO?",
    a: "Technical SEO, Core Web Vitals, and page speed are part of every build, not an add-on.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="faq_section">
      <div className="faq-panel">
        <div id="faq_column" className="column">
          <div className="label">FAQ</div>
          <h2 className="h2-style">Have Any Questions?</h2>
        </div>

        <div className="faq-grid">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <article className={`faq-card ${isOpen ? "is-open" : ""}`} key={item.q}>
                <h3 className="faq-card-title">
                  <button
                    type="button"
                    className="faq-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`faq-body-${i}`}
                    aria-label={isOpen ? `Close ${item.q}` : `Open ${item.q}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq-card-title-text">{item.q}</span>
                    <span className="faq-icon">
                      <MinusIcon />
                      <PlusIcon />
                    </span>
                  </button>
                </h3>

                <div className="faq-card-body-wrap" id={`faq-body-${i}`}>
                  <p className="faq-card-body">{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
