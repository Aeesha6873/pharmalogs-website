import React, { useState, useEffect } from "react";
import styles from "../styles/HowItWorks.module.css";

const icons = {
  stockIn: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 2v4M12 22v-4M4 12H2M6 12H4M20 12h-2M22 12h-2M19.07 4.93l-2.83 2.83M4.93 19.07l2.83-2.83M19.07 19.07l-2.83-2.83M4.93 4.93l2.83 2.83" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16v-4" />
    </svg>
  ),
  sell: (
    <svg
      width="28"
      height="28"
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
  track: (
    <svg
      width="28"
      height="28"
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
  reorder: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 12v-2a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v2" />
      <circle cx="12" cy="16" r="5" />
      <path d="M12 14v4" />
      <path d="M10 16l2 2 2-2" />
      <path d="M4 12v4a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5v-4" />
    </svg>
  ),
};

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Stock In",
      icon: icons.stockIn,
      description:
        "Receive and log new inventory as it arrives. Track expiry dates and batch numbers automatically.",
      detail: "No more manual data entry or lost paperwork.",
    },
    {
      number: "02",
      title: "Sell",
      icon: icons.sell,
      description:
        "Fast checkout at the counter. Sales update your inventory in real-time — no manual counting.",
      detail: "Your inventory updates instantly with every sale.",
    },
    {
      number: "03",
      title: "Track",
      icon: icons.track,
      description:
        "See what's selling, what's not, and what's about to expire. Know your business at a glance.",
      detail: "Real-time visibility into your entire operation.",
    },
    {
      number: "04",
      title: "Reorder",
      icon: icons.reorder,
      description:
        "Get alerted when stock runs low. Reorder what you need, when you need it.",
      detail: "Never run out of essential medications again.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="workflow" className={styles.howItWorks}>
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

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>How it works</span>
          <h2>The daily rhythm of your pharmacy</h2>
          <p className={styles.subhead}>
            A complete operational cycle — all in one system.
          </p>
        </div>

        <div className={styles.flow}>
          <div className={styles.flowLine}>
            <div
              className={styles.flowLineProgress}
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          <div className={styles.flowSteps}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.flowStep} ${index === activeStep ? styles.active : ""} ${index < activeStep ? styles.completed : ""}`}
                onClick={() => setActiveStep(index)}>
                <div className={styles.flowStepCircle}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <span className={styles.stepNumber}>{step.number}</span>
                </div>
                <div className={styles.flowStepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className={styles.stepDetail}>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.nav}>
          <button
            className={styles.navDot}
            onClick={() => setActiveStep(0)}
            aria-label="Go to step 1">
            <span className={activeStep === 0 ? styles.active : ""}></span>
          </button>
          <button
            className={styles.navDot}
            onClick={() => setActiveStep(1)}
            aria-label="Go to step 2">
            <span className={activeStep === 1 ? styles.active : ""}></span>
          </button>
          <button
            className={styles.navDot}
            onClick={() => setActiveStep(2)}
            aria-label="Go to step 3">
            <span className={activeStep === 2 ? styles.active : ""}></span>
          </button>
          <button
            className={styles.navDot}
            onClick={() => setActiveStep(3)}
            aria-label="Go to step 4">
            <span className={activeStep === 3 ? styles.active : ""}></span>
          </button>
        </div>

        <div className={styles.loop}>
          <span className={styles.loopLine}></span>
          <span className={styles.loopLabel}>↻ The cycle continues</span>
          <span className={styles.loopLine}></span>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
