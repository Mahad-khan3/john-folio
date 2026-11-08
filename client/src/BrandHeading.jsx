import "./brandheading.css";

export default function BrandHeading() {
  return (
    <section id="brand-heading" className="brand_section">
      <h2 className="brand_heading" aria-label="Johnsmith">
        <span className="brand_name">JOHNSMITH</span>
        <span className="brand_mark" aria-hidden="true">
          K
        </span>
      </h2>
    </section>
  );
}
