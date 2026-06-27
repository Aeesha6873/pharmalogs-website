import React, { useState, useEffect } from "react";
import styles from "../styles/ProblemSection.module.css";

const Icons = {
  stockouts: (
    <svg
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
  reconciliation: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
      <path d="M16 15l2 2 4-4" />
    </svg>
  ),
  visibility: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9v3l1.5 1.5" />
    </svg>
  ),
};

function ProblemSection() {
  const [activeCard, setActiveCard] = useState(null);

  const problems = [
    {
      id: 1,
      number: "01",
      title: "Stockouts",
      icon: Icons.stockouts,
      description:
        "Running out of medication when patients need it most — losing sales and trust.",
      impact: "Lost revenue & patient trust",
      color: "#C97A2B",
    },
    {
      id: 2,
      number: "02",
      title: "Manual reconciliation",
      icon: Icons.reconciliation,
      description:
        "Counting stock and matching sales to inventory at the end of every day.",
      impact: "Hours wasted daily",
      color: "#1B4F5C",
    },
    {
      id: 3,
      number: "03",
      title: "No visibility",
      icon: Icons.visibility,
      description:
        "Not knowing what's selling, what's expiring, or where your money is going.",
      impact: "Decisions made in the dark",
      color: "#3F8C6E",
    },
  ];

  return (
    <section className={styles.problem}>
      <div className={styles.decorLine}></div>
      <div className={styles.decorDot}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>The problem</span>
          <h2>
            Running a pharmacy shouldn't feel like{" "}
            <span className={styles.highlight}>guesswork</span>
          </h2>
          <p className={styles.subhead}>
            Without the right tools, you're spending more time on admin than on
            patients.
          </p>
        </div>

        <div className={styles.grid}>
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className={`${styles.card} ${activeCard === problem.id ? styles.active : ""}`}
              onMouseEnter={() => setActiveCard(problem.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}>
              <div
                className={styles.cardGlow}
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${problem.color}12, transparent 70%)`,
                }}
              />

              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.iconWrapper}
                    style={{ borderColor: `${problem.color}20` }}>
                    <span
                      className={styles.icon}
                      style={{ color: problem.color }}>
                      {problem.icon}
                    </span>
                  </div>
                  <span className={styles.number}>{problem.number}</span>
                </div>

                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <p className={styles.cardDesc}>{problem.description}</p>

                <div className={styles.cardBottom}>
                  <span
                    className={styles.impact}
                    style={{
                      color: problem.color,
                      background: `${problem.color}08`,
                    }}>
                    {problem.impact}
                  </span>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.statWrapper}>
          <div className={styles.statContent}>
            <span className={styles.statLine}></span>
            <div className={styles.statTextWrapper}>
              <span className={styles.statIcon}>⚕</span>
              <span className={styles.statText}>
                Pharmacies lose an average of <strong>15%</strong> of revenue to
                stockouts and inefficiency
              </span>
            </div>
            <span className={styles.statLine}></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
