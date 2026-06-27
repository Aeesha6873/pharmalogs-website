import React, { useEffect, useRef } from "react";
import styles from "../styles/CTASection.module.css";

const Icons = {
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

function CTASection() {
  const [isVisible, setIsVisible] = React.useState(false);
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

  return (
    <section className={styles.cta} ref={sectionRef}>
      <div className={styles.ledgerLine} aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.bgGlow}></div>

      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeIcon}>{Icons.sparkle}</span>
            <span className={styles.badge}>Get Started</span>
          </div>

          <h2>
            <span className={styles.titleLine}>Ready to see</span>
            <span className={styles.titleLine}>
              PharmaLogs in{" "}
              <span className={styles.highlight}>your pharmacy</span>?
            </span>
          </h2>

          <p className={styles.subhead}>
            Join 200+ pharmacies across Nigeria already using PharmaLogs to
            manage inventory, sales, and reporting — all in one place.
          </p>

          <div className={styles.actions}>
            <button className={styles.primary}>
              Book a Demo
              <span className={styles.btnArrow}>{Icons.arrow}</span>
            </button>
            <button className={styles.secondary}>Contact Sales</button>
          </div>

          <div className={styles.trust}>
            <span className={styles.trustItem}>
              <span className={styles.trustIcon}>{Icons.check}</span>
              No credit card required
            </span>
            <span className={styles.divider}>•</span>
            <span className={styles.trustItem}>
              <span className={styles.trustIcon}>{Icons.check}</span>
              14-day free trial
            </span>
            <span className={styles.divider}>•</span>
            <span className={styles.trustItem}>
              <span className={styles.trustIcon}>{Icons.check}</span>
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
