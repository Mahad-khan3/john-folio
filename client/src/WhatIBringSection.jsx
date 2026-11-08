import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./whatIBring.css";

gsap.registerPlugin(ScrollTrigger);

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
const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-11.5 -10.232 23 20.463" fill="none" data-var-hover="1.34" data-var-hover-mobile="2.04" className="react-icon">
    <circle r="2.05" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 48 45" fill="none" data-var-hover="1.47" data-var-hover-mobile="2.111" className="capa-settings-icon">
    <path d="M16.4166 0C17.3918 0.0647366 18.1497 0.478258 18.7597 1.21811C19.9888 2.70969 21.5687 3.50503 23.4941 3.51824C25.3607 3.53145 26.9197 2.79689 28.1605 1.38986C29.4053 -0.0198176 30.3844 -0.258946 32.1149 0.42277C34.4147 1.32908 36.509 2.5855 38.4136 4.16693C39.5144 5.08117 39.8416 6.25171 39.3782 7.61646C38.0837 11.428 40.2395 15.1774 44.1454 15.908C45.5997 16.1802 46.4165 17.0165 46.6874 18.4658C47.1888 21.1543 47.1521 23.8389 46.6495 26.5209C46.4073 27.813 45.4426 28.7351 44.1271 28.9386C40.0838 29.5609 37.7997 33.4913 39.2343 37.3596C39.75 38.7495 39.4319 39.961 38.301 40.8977C36.4724 42.4131 34.4605 43.6219 32.2706 44.5296C30.9499 45.0765 29.6658 44.7357 28.7627 43.6061C26.0557 40.2173 21.4679 40.2741 18.8513 43.7316C17.9442 44.9299 16.6771 45.2958 15.287 44.7581C12.9374 43.8505 10.7816 42.6046 8.82471 41.0034C7.59823 39.9993 7.28015 38.7839 7.8862 37.3134C9.04855 34.4888 8.15322 31.3788 5.69501 29.7141C4.92535 29.1923 4.08239 28.8606 3.15958 28.7338C1.36762 28.4881 0.541674 27.6914 0.257632 25.8735C-0.148143 23.2761 -0.0669882 20.684 0.447429 18.1091C0.721 16.7417 1.6713 15.9028 3.08889 15.7112C7.16627 15.1603 9.51453 11.2562 8.12312 7.34298C7.61132 5.90425 7.96342 4.68878 9.15981 3.74944C11.0277 2.28164 13.0723 1.13091 15.287 0.294618C15.6483 0.158539 16.0383 0.100408 16.4153 0.00528449L16.4166 0ZM31.3714 22.4993C31.3793 18.1831 27.8608 14.612 23.591 14.6027C19.2322 14.5935 15.6941 18.121 15.6915 22.4781C15.6889 26.871 19.1811 30.4143 23.5216 30.4249C27.8503 30.4355 31.3635 26.8882 31.3727 22.4993H31.3714Z" fill="currentColor"></path>
  </svg>
);

const SeoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 46 45" fill="none" data-var-hover="1.41" data-var-hover-mobile="2.11" className="capa-seo-icon">
    <path d="M32.6862 27.8665C31.2976 27.8665 30.1719 26.7408 30.1719 25.3522V2.51429C30.1719 1.12568 31.2976 0 32.6862 0H42.7433C44.1319 0 45.2576 1.12568 45.2576 2.51429V25.3522C45.2576 26.7408 44.1319 27.8665 42.7433 27.8665H32.6862Z" fill="currentColor"></path>
    <path d="M2.51428 44.679C1.12568 44.679 0 43.5533 0 42.1647V32.2213C0 30.8327 1.12568 29.707 2.51429 29.707H25.1429C26.5315 29.707 27.6571 30.8327 27.6571 32.2213V42.1647C27.6571 43.5533 26.5315 44.679 25.1429 44.679H2.51428Z" fill="currentColor"></path>
    <path d="M30.1719 32.1588C30.1719 30.7702 31.2976 29.6445 32.6862 29.6445H42.7433C44.1319 29.6445 45.2576 30.7702 45.2576 32.1588V42.2262C45.2576 43.6148 44.1319 44.7405 42.7433 44.7405H32.6862C31.2976 44.7405 30.1719 43.6148 30.1719 42.2262V32.1588Z" fill="currentColor"></path>
    <rect x="12.5703" y="12.0469" width="15.0857" height="15.0857" rx="2.51429" fill="currentColor"></rect>
  </svg>
);

const GsapIcon = () => (
  <div data-var-hover="3.68" className="capa-gsap-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 106 39" fill="none" data-var-hover="1" data-var-hover-mobile="2.06" className="gsap-icon">
      <path d="M30.892 18.2177V18.2346L29.4972 24.3004C29.422 24.6436 29.0795 24.8945 28.6851 24.8945H26.9997C26.939 24.8948 26.8799 24.9146 26.8313 24.9512C26.7827 24.9877 26.7471 25.0389 26.7298 25.0973C25.1755 30.3805 23.0711 34.0114 20.2921 36.1915C17.9282 38.0479 15.0142 38.9137 11.1206 38.9137C7.62278 38.9137 5.26408 37.7866 3.26346 35.561C0.619323 32.6204 -0.473103 27.8052 0.18858 22.0046C1.3822 11.1145 7.01948 0.125585 17.8737 0.125585C21.1756 0.0969848 23.7678 1.11748 25.5713 3.15458C27.4785 5.30998 28.4463 8.55478 28.4515 12.8032C28.4468 12.9894 28.3697 13.1664 28.2367 13.2966C28.1036 13.4267 27.9252 13.4997 27.7392 13.5H19.7861C19.6467 13.4957 19.5143 13.438 19.4161 13.3389C19.3178 13.2398 19.2613 13.1066 19.258 12.967C19.1932 10.029 18.3239 8.59898 16.5957 8.59898C13.5468 8.59898 11.7486 12.746 10.795 15.0444C9.46252 18.2554 8.78397 21.7433 8.9176 25.2169C8.98118 26.8341 9.24066 29.1078 10.7729 30.0503C12.1313 30.8849 14.0696 30.3311 15.2438 29.4068C16.4167 28.4812 17.3612 26.8809 17.7582 25.421C17.814 25.2182 17.8179 25.0609 17.7647 24.9907C17.7089 24.9179 17.5545 24.901 17.4364 24.901H15.3943C15.2862 24.9013 15.1794 24.878 15.0812 24.8326C14.983 24.7873 14.896 24.721 14.826 24.6384C14.7724 24.5739 14.7343 24.4979 14.7147 24.4163C14.6951 24.3347 14.6946 24.2496 14.7132 24.1678L16.1092 18.0916C16.178 17.7809 16.4595 17.5456 16.8059 17.504V17.4884H30.2082C30.2394 17.4884 30.2718 17.4884 30.3016 17.4949C30.6493 17.5404 30.8946 17.8641 30.8881 18.2177H30.892Z" fill="currentColor" className="gsap-icon-first-letter"></path>
      <path d="M53.9637 11.245C53.9577 11.4299 53.8801 11.6051 53.7474 11.7337C53.6147 11.8623 53.4373 11.9341 53.2527 11.934H45.9275C45.4475 11.934 45.0466 11.544 45.0466 11.0695C45.0466 8.9284 44.307 7.8858 42.7943 7.8858C41.2815 7.8858 40.3058 8.8166 40.2773 10.4429C40.2448 12.2564 41.2685 13.9048 44.1825 16.7362C48.019 20.3424 49.5564 23.5365 49.4824 27.7589C49.3618 34.5865 44.7287 39 37.6785 39C34.0782 39 31.3277 38.0354 29.4983 36.1322C27.6417 34.1991 26.7906 31.3625 26.9684 27.7017C26.9744 27.5166 27.0522 27.3412 27.1851 27.2126C27.3181 27.0839 27.4958 27.0123 27.6806 27.0127H35.2576C35.3631 27.0144 35.4669 27.0395 35.5616 27.0863C35.6563 27.133 35.7394 27.2003 35.8051 27.2831C35.8623 27.3516 35.9042 27.4316 35.928 27.5177C35.9517 27.6039 35.9567 27.6941 35.9426 27.7823C35.8583 29.1031 36.0879 30.0898 36.6069 30.6358C36.939 30.9894 37.4022 31.1688 37.9795 31.1688C39.3795 31.1688 40.1994 30.1782 40.2306 28.4518C40.2565 26.9594 39.7855 25.6516 37.2193 23.0061C33.9043 19.7613 30.932 16.4086 31.0241 11.1371C31.0786 8.0795 32.2904 5.2832 34.4376 3.263C36.7081 1.1284 39.8128 0 43.417 0C47.0277 0.026 49.764 1.0582 51.5505 3.068C53.2424 4.9725 54.0558 7.7233 53.9663 11.245H53.9637Z" fill="currentColor" className="gsap-icon-letter"></path>
      <path d="M76.6661 37.7168L76.7141 1.40386C76.7155 1.31292 76.6987 1.22262 76.6648 1.13827C76.6308 1.05392 76.5804 0.97721 76.5165 0.912658C76.4525 0.848106 76.3763 0.79701 76.2924 0.762373C76.2085 0.727735 76.1185 0.710254 76.0277 0.710958H64.6909C64.3095 0.710958 64.1421 1.03986 64.0331 1.25696L47.6182 37.4945V37.501L47.6117 37.5101C47.4301 37.956 47.7752 38.4331 48.2565 38.4331H56.1811C56.6093 38.4331 56.8934 38.3031 57.0322 38.0327L58.606 34.2432C58.7993 33.7375 58.8357 33.6907 59.3858 33.6907H66.9575C67.4842 33.6907 67.4946 33.7011 67.4868 34.2172L67.3169 37.7402C67.3155 37.831 67.3322 37.9212 67.3661 38.0054C67.3999 38.0897 67.4502 38.1664 67.514 38.2309C67.5778 38.2954 67.6539 38.3465 67.7376 38.3813C67.8214 38.416 67.9113 38.4336 68.0019 38.4331H76.0083C76.1074 38.4343 76.2056 38.4137 76.2959 38.3728C76.3862 38.332 76.4665 38.2718 76.5311 38.1965C76.5869 38.131 76.6278 38.0542 76.6511 37.9714C76.6744 37.8886 76.6795 37.8017 76.6661 37.7168ZM62.641 25.593C62.5812 25.5933 62.5215 25.5911 62.4619 25.5865C62.4342 25.5842 62.4072 25.5758 62.3831 25.5619C62.3589 25.5481 62.338 25.5291 62.3219 25.5063C62.3058 25.4835 62.2949 25.4574 62.29 25.43C62.285 25.4025 62.2862 25.3743 62.2933 25.3473C62.3088 25.2953 62.3309 25.2238 62.3633 25.1367L68.0408 11.0603C68.0919 10.9214 68.1508 10.7855 68.2173 10.6534C68.3094 10.4636 68.421 10.4506 68.456 10.591C68.4858 10.708 67.8047 25.0444 67.8047 25.0444C67.7515 25.5813 67.7269 25.6034 67.1988 25.6476L62.6462 25.5956H62.6358L62.641 25.593Z" fill="currentColor" className="gsap-icon-letter"></path>
      <path d="M92.8219 0.714838H86.8032C86.4854 0.714838 86.1286 0.883838 86.0455 1.26344L77.6694 37.7024C77.6511 37.7846 77.6519 37.8699 77.6717 37.9517C77.6915 38.0335 77.7298 38.1097 77.7836 38.1743C77.8534 38.2567 77.9403 38.3228 78.0382 38.3682C78.1361 38.4135 78.2427 38.437 78.3506 38.4369H85.873C86.2778 38.4369 86.5541 38.238 86.6294 37.8935L87.5428 33.7634C87.6076 33.441 87.4961 33.1914 87.208 33.0406C87.0729 32.9709 86.9379 32.9007 86.8032 32.83L85.4993 32.1501L84.2019 31.4715L83.6998 31.2102C83.659 31.1898 83.6247 31.1582 83.6011 31.1191C83.5774 31.08 83.5653 31.035 83.5662 30.9892C83.5679 30.9215 83.596 30.8572 83.6445 30.81C83.693 30.7629 83.7581 30.7367 83.8257 30.737L87.9476 30.7552C89.1801 30.7617 90.4139 30.6746 91.627 30.451C100.164 28.8715 105.834 22.0205 105.997 12.6982C106.137 4.74224 101.705 0.710938 92.8284 0.710938L92.8219 0.714838ZM90.7733 22.3988H90.6124C90.2505 22.3988 90.1869 22.3598 90.1765 22.3468C90.17 22.3377 92.5534 11.8519 92.5547 11.8376C92.6157 11.5347 92.6131 11.3605 92.4262 11.2578C92.1875 11.1252 88.7078 9.28704 88.7078 9.28704C88.6674 9.26572 88.6336 9.23348 88.6105 9.19397C88.5873 9.15446 88.5757 9.10924 88.5768 9.06344C88.5785 8.99665 88.6062 8.93317 88.6539 8.88653C88.7017 8.8399 88.7657 8.81382 88.8324 8.81384H94.3347C96.0473 8.86584 97.0022 10.4011 96.9568 13.0232C96.8777 17.5615 94.724 22.2389 90.7733 22.3988Z" fill="currentColor" className="gsap-icon-letter"></path>
    </svg>
  </div>
);

const PerformanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 51 44" fill="none" data-var-hover="1.46" data-var-hover-mobile="2.16" className="capa-performance-icon">
    <path d="M0 26.9766H9.30749C9.63687 28.3004 9.87726 29.5724 10.273 30.7938C11.0155 33.0862 12.2984 35.07 13.9838 36.7917C14.4513 37.2693 14.6758 37.8122 14.4274 38.4615C14.3358 38.7009 14.1724 38.9311 13.9918 39.1147C12.5561 40.5663 11.1124 42.0099 9.66343 43.4495C8.91171 44.1959 8.0564 44.176 7.30999 43.4136C3.42789 39.4487 1.07578 34.7174 0.224453 29.2371C0.139453 28.6849 0.0743749 28.1288 0 27.574C0 27.3744 0 27.1761 0 26.9766Z" fill="currentColor"></path>
    <path d="M0 23.3928C0.166015 22.3497 0.292187 21.2972 0.504687 20.2634C1.39851 15.918 3.33094 12.0835 6.2382 8.73598C6.29265 8.67344 6.33249 8.5976 6.37234 8.53906C8.61288 10.7889 10.8123 12.9949 13.0435 15.2355C10.9916 17.7408 9.77234 20.6453 9.42835 23.9902H0C0 23.7906 0 23.5924 0 23.3928Z" fill="currentColor"></path>
    <path d="M50.9985 23.9886H41.5728C41.2288 20.689 40.0322 17.7752 37.9922 15.2845C40.2168 13.0532 42.4228 10.8393 44.6448 8.60938C46.0765 10.2007 47.3103 12.0168 48.3091 13.9939C49.7434 16.8345 50.6147 19.8388 50.9135 23.0081C50.9255 23.1371 50.9693 23.2635 50.9985 23.3912V23.9886Z" fill="currentColor"></path>
    <path d="M50.9997 27.574C50.8323 28.6344 50.7102 29.7041 50.491 30.7539C49.4644 35.6528 47.1654 39.8758 43.6605 43.4455C42.9393 44.1799 42.084 44.176 41.3416 43.4562C40.8674 42.9971 40.384 42.5474 39.8594 42.0498C40.0586 41.9274 40.1648 41.8596 40.2724 41.7944C42.3895 40.4865 43.0628 37.8108 41.7891 35.6674C41.2566 34.7706 40.6602 33.9098 40.1144 33.0197C40.0294 32.88 39.9895 32.6325 40.0546 32.4942C40.8674 30.7672 41.3641 28.9563 41.566 26.9766H50.9983V27.574H50.9997Z" fill="currentColor"></path>
    <path d="M20.8125 25.8916C20.8152 23.5752 21.9972 21.8482 23.8021 21.1417C25.5898 20.4419 27.6988 20.8623 28.938 22.3604C30.3298 24.0449 31.6473 25.8025 32.8812 27.6066C35.0075 30.7133 37.0435 33.8799 39.1194 37.0212C39.4886 37.5814 39.5749 38.1615 39.2097 38.7496C38.8816 39.2778 38.3823 39.5133 37.7687 39.4294C37.5309 39.3975 37.2786 39.3084 37.0794 39.174C32.5863 36.1391 28.0959 33.1003 23.6188 30.0414C23.061 29.6609 22.5537 29.1912 22.0795 28.7083C21.2162 27.8275 20.8258 26.7365 20.8138 25.8916H20.8125Z" fill="currentColor"></path>
    <path d="M42.4164 6.36379C40.1851 8.59504 37.9818 10.7983 35.7479 13.0323C33.2364 10.9766 30.3265 9.76588 27.0234 9.42793V0C32.8977 0.393828 38.019 2.52396 42.4164 6.36512V6.36379Z" fill="currentColor"></path>
    <path d="M23.9761 0V9.42527C20.7089 9.76455 17.7777 10.962 15.2569 13.0323C13.0297 10.8023 10.829 8.5977 8.59375 6.36113C12.9699 2.52396 18.0951 0.408464 23.9761 0Z" fill="currentColor"></path>
  </svg>
);

const CardArrow = () => (
  <div data-var-hover="1" data-var-hover-mobile="5.507" className="capa-card-arrow-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 8 7" fill="none" className="capa-card-arrow">
      <path d="M4.21716 6.12347C3.95528 6.57706 3.30058 6.57706 3.0387 6.12346L0.0925457 1.02058C-0.169335 0.566986 0.158016 -7.19718e-07 0.681777 -6.73929e-07L6.57409 -1.58807e-07C7.09785 -1.13018e-07 7.4252 0.566987 7.16331 1.02058L4.21716 6.12347Z" fill="currentColor"></path>
    </svg>
  </div>
);

/* ---------- card data (same order, connect keys and scroll triggers as the original) ---------- */
const CARDS = [
  {
    key: "w",
    attrs: {
      "data-connect-mobile": "w-mobile",
      "data-connect": "w",
      "data-origin": "center left",
      "data-anchor-pos": "left center",
    },
    start: "top 80%",
    Icon: ReactIcon,
    heading: "Web Development",
    text: "Fast, scalable sites with clean code and CMS you control.",
  },
  {
    key: "i",
    attrs: {
      "data-connect-mobile": "i-mobile",
      "data-connect": "i",
      "data-origin": "left center",
      "data-anchor-pos": "left center",
    },
    start: "top 47%",
    Icon: SettingsIcon,
    heading: "Custom Integrations",
    text: "APIs, third-party tools, and custom functionality.",
  },
  {
    key: "seo",
    attrs: {
      "data-origin-mobile": "center left",
      "data-connect": "seo",
      "data-connect-mobile": "seo-mobile",
      "data-origin": "center center",
      "data-anchor-pos-mobile": "left center",
      "data-offset": "0, 16%",
      "data-offset-mobile": "5%, 0%",
      "data-anchor-pos": "center center",
    },
    start: "top 63%",
    Icon: SeoIcon,
    heading: "SEO-Ready Setup",
    text: "Optimized structure, speed, and on-page SEO for better rankings.",
  },
  {
    key: "gsap",
    attrs: {
      "data-connect-mobile": "gsap-mobile",
      "data-connect": "gsap",
      "data-origin": "center center",
      "data-anchor-pos": "center center",
    },
    start: "top 39%",
    Icon: GsapIcon,
    heading: "Creative & Interactive Motion",
    text: "GSAP-powered animations and interactive experiences.",
  },
  {
    key: "p",
    attrs: {
      "data-connect-mobile": "p-mobile",
      "data-connect": "p",
      "data-origin": "left center",
      "data-anchor-pos": "left center",
    },
    start: "top 25%",
    Icon: PerformanceIcon,
    heading: "Performance Optimization",
    text: "Speed, SEO, and best practices built in.",
  },
];

const CARD_FROM = "{'scale' : 0.5, 'opacity' : 0}";
const CARD_TO = "{'scale' : 1, 'opacity' : 1}";

/* ---------- component ---------- */
export default function WhatIBring() {
  const rootRef = useRef(null);
  useTlAnimations(rootRef);

  return (
    <section id="overview" className="what_you_get_section" ref={rootRef}>
      <div className="container">
        <div className="column flex-center text-center">
          <h2 className="h2-big h2-style">
            What <br />I Bring
          </h2>

          <div
            data-tl-to="{   'width':'auto',   'opacity':1,   'duration':0.7,   'ease':'expo.inOut' }"
            data-tl-type="trigger"
            data-tl-trigger=".what_you_get-text"
            data-tl-start="top 100%"
            data-tl-from="{'width':'0vw','opacity':0}"
            className="label"
          >
            Core Expertise
          </div>

          <p className="what_you_get-text">
            Where strategy meets precision and development — transforming your
            vision into a powerful digital experience that performs effortlessly.
          </p>
          <p className="what_you_get-text-mobile">
            Where strategy meets precision and <br />
            development — transforming your vision into a powerful digital
            experience that performs effortlessly.
          </p>

          <br />

          <div className="capa-cards-wrap">
            {CARDS.map(({ key, attrs, start, Icon, heading, text }) => (
              <div key={key} className="capa-card" {...attrs}>
                <div
                  data-tl-to={CARD_TO}
                  data-tl-type="trigger"
                  data-tl-trigger=".what_you_get-text"
                  data-tl-start={start}
                  data-tl-from={CARD_FROM}
                  className="capa-card-item"
                >
                  <div className="capa-card-top-item">
                    <Icon />
                    <CardArrow />
                  </div>
                  <div className="capa-card-bottom">
                    <div className="capa-card-bottom-layout">
                      <h3 className="capa-card-heading">{heading}</h3>
                      <p className="capa-card-text">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
