import React from "react";

/* The frozen "last screen" of the About journey. Lives inside .pin-wrap and
   stays pinned underneath the Work section while it slides in from the right.
   Uses the same design language as the About cards (about.css). */
export default function AboutLast() {
  return (
    <section className="about-last" aria-hidden="true">
      <div className="about-last-inner">
        <p className="about-card-year">
          {'\u0027'}
          <span>26</span>
        </p>
        <h3 className="about-card-heading">Software Development &amp; Engineering</h3>
        <p className="op80">
          In 2026, my focus is software development with the MERN Stack and
          Python — building scalable web applications, powerful backend systems,
          and practical software solutions. This is where I’m sharpening my
          skills and turning ideas into real-world products.
        </p>
        <div className="about-card-bottom-layout">
          <div className="about-card-bottom-layout-left">
            <p className="about-card-bottom-text">
              @johnsmith
              <br />
              ready for the next build
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}