// Features.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Features.module.css";

// SVG Icons
const Icons = {
  inventory: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <path d="M8 12h8" />
      <path d="M8 16h6" />
    </svg>
  ),
  sales: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2 2 4-4" />
      <path d="M12 8v8" />
    </svg>
  ),
  reporting: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 12v-2a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v2" />
      <circle cx="12" cy="16" r="5" />
      <path d="M12 11v5" />
      <path d="M9 16l3 3 3-3" />
    </svg>
  ),
  sparkle: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
    </svg>
  ),
  arrow: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
};

function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: Icons.inventory,
      title: "Inventory Management",
      subtitle: "Know exactly what's on your shelves",
      description:
        "Track stock levels in real-time, get expiry alerts, and never run out of essential medications again.",
      details: [
        "Real-time stock tracking",
        "Expiry date alerts",
        "Batch number tracking",
        "Low stock notifications",
      ],
      stat: "98%",
      statLabel: "inventory accuracy",
      color: "#1B4F5C",
    },
    {
      id: 2,
      icon: Icons.sales,
      title: "Sales & POS",
      subtitle: "Fast checkout, accurate every time",
      description:
        "Process sales quickly at the counter. Inventory updates instantly with every transaction — no manual counting.",
      details: [
        "Fast point of sale",
        "Automatic inventory updates",
        "Receipt generation",
        "Sales history",
      ],
      stat: "40%",
      statLabel: "faster checkout",
      color: "#3F8C6E",
    },
    {
      id: 3,
      icon: Icons.reporting,
      title: "Reporting & Analytics",
      subtitle: "See your business clearly",
      description:
        "Daily and weekly summaries show you what's selling, what's not, and where your money is going.",
      details: [
        "Daily sales reports",
        "Stock movement analytics",
        "Profit & loss tracking",
        "Expiry forecasts",
      ],
      stat: "2hrs",
      statLabel: "saved daily on reporting",
      color: "#C97A2B",
    },
  ];

  return (
    <section id="product" className={styles.features} ref={sectionRef}>
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>
      <div className={styles.bgPattern}></div>
      <div className={styles.ledgerTape}></div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeIcon}>{Icons.sparkle}</span>
            <span className={styles.badge}>Core Features</span>
          </div>
          <h2>
            <span className={styles.titleLine}>Everything you need,</span>
            <span className={styles.titleLine}>
              <span className={styles.highlight}>all in one place</span>
            </span>
          </h2>
          <p className={styles.subhead}>
            Inventory, sales, and reporting working together — so you can focus
            on your patients, not your paperwork.
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={styles.featureCard}
              style={{
                "--card-color": feature.color,
                animationDelay: `${index * 0.15}s`,
              }}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardTop}>
                <div
                  className={styles.cardIcon}
                  style={{
                    background: `${feature.color}10`,
                    color: feature.color,
                  }}>
                  {feature.icon}
                </div>
                <span className={styles.cardNumber}>0{feature.id}</span>
              </div>

              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardSubtitle}>{feature.subtitle}</p>
              <p className={styles.cardDesc}>{feature.description}</p>

              <ul className={styles.cardList}>
                {feature.details.map((detail, i) => (
                  <li key={i}>
                    <span
                      className={styles.cardCheck}
                      style={{ color: feature.color }}>
                      ✓
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>

              <div className={styles.cardBottom}>
                <div className={styles.cardStat}>
                  <span
                    className={styles.statValue}
                    style={{ color: feature.color }}>
                    {feature.stat}
                  </span>
                  <span className={styles.statLabel}>{feature.statLabel}</span>
                </div>
                <div
                  className={styles.cardArrow}
                  style={{ color: feature.color }}>
                  {Icons.arrow}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${styles.bottomCta} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.ctaDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>All three. One system.</span>
            <span className={styles.dividerLine}></span>
          </div>
          <button className={styles.ctaBtn}>
            Book a Demo
            <span className={styles.ctaBtnArrow}>{Icons.arrow}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;
