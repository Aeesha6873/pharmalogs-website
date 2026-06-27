// Hero.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/Hero.module.css";

// SVG Icons
const Icons = {
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
  play: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" />
    </svg>
  ),
  ledger: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  ),
};

function Hero() {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [activeStat, setActiveStat] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sampleEntries = React.useMemo(
    () => [
      {
        id: 1,
        drug: "Amoxicillin 500mg",
        qty: "142",
        status: "In Stock",
        trend: "+12%",
      },
      {
        id: 2,
        drug: "Lisinopril 10mg",
        qty: "87",
        status: "In Stock",
        trend: "+5%",
      },
      {
        id: 3,
        drug: "Metformin 850mg",
        qty: "23",
        status: "Low Stock",
        trend: "-8%",
      },
      {
        id: 4,
        drug: "Atorvastatin 20mg",
        qty: "156",
        status: "In Stock",
        trend: "+23%",
      },
      {
        id: 5,
        drug: "Levothyroxine 50mcg",
        qty: "45",
        status: "In Stock",
        trend: "+3%",
      },
      {
        id: 6,
        drug: "Omeprazole 20mg",
        qty: "12",
        status: "Reorder",
        trend: "-15%",
      },
    ],
    [],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setLedgerEntries(sampleEntries);
      setIsLoading(false);
      return;
    }

    let currentIndex = 0;
    setLedgerEntries([]);
    setIsLoading(true);

    const interval = setInterval(() => {
      if (currentIndex < sampleEntries.length) {
        setLedgerEntries((prev) => {
          const newEntry = sampleEntries[currentIndex];
          if (newEntry && newEntry.drug) {
            return [...prev, newEntry];
          }
          return prev;
        });
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearInterval(interval);
      setIsLoading(false);
    };
  }, [sampleEntries]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderLedgerEntries = () => {
    if (!ledgerEntries || ledgerEntries.length === 0) {
      return (
        <div className={styles.ledgerLoading}>
          <span className={styles.loadingDot}></span>
          <span className={styles.loadingDot}></span>
          <span className={styles.loadingDot}></span>
          <span>Loading entries...</span>
        </div>
      );
    }

    return ledgerEntries.map((entry) => {
      if (!entry || !entry.drug) return null;

      return (
        <div key={entry.id || Math.random()} className={styles.ledgerRow}>
          <span className={styles.drugName}>
            <span className={styles.drugDot}></span>
            {entry.drug}
          </span>
          <span className={styles.drugQty}>{entry.qty || "0"}</span>
          <span
            className={`${styles.drugStatus} ${
              entry.status === "Low Stock" ? styles.statusLow
              : entry.status === "Reorder" ? styles.statusReorder
              : styles.statusInStock
            }`}>
            <span className={styles.statusDot}></span>
            {entry.status || "Unknown"}
          </span>
          <span
            className={`${styles.drugTrend} ${
              entry.trend && entry.trend.startsWith("+") ?
                styles.trendUp
              : styles.trendDown
            }`}>
            {entry.trend || "0%"}
          </span>
        </div>
      );
    });
  };

  return (
    <section className={styles.hero}>
      {/* Animated background elements */}
      <div className={styles.bgOrb}></div>
      <div className={styles.bgOrb2}></div>
      <div className={styles.bgGrid}></div>

      <div className={styles.heroContainer}>
        {/* LEFT COLUMN */}
        <div className={styles.heroContent}>
          <div className={styles.trustBadge}>
            <span className={styles.badgeDot}></span>
            <span>
              Trusted by <strong>200+</strong> pharmacies
            </span>
          </div>

          <h1 className={styles.title}>
            <span>All your pharmacy</span>
            <span>operations</span>
            <span className={styles.titleHighlight}>in one place</span>
          </h1>

          <p className={styles.subhead}>
            Intelligent inventory, seamless sales, and real-time reporting
            <br />
            <span className={styles.subheadHighlight}>
              — all working together.
            </span>
          </p>

          <div className={styles.actions}>
            <button className={styles.ctaPrimary}>
              Start Free Trial
              <span className={styles.ctaArrow}>{Icons.arrow}</span>
            </button>
            <button className={styles.ctaSecondary}>
              <span className={styles.ctaIcon}>{Icons.play}</span>
              Watch Demo
            </button>
          </div>

          <div className={styles.stats}>
            <div
              className={`${styles.stat} ${activeStat === 0 ? styles.active : ""}`}>
              <span className={styles.statNumber}>
                40%
                <span className={styles.statTrend}>↓</span>
              </span>
              <span className={styles.statLabel}>reduction in stockouts</span>
            </div>
            <div className={styles.statDivider}></div>
            <div
              className={`${styles.stat} ${activeStat === 1 ? styles.active : ""}`}>
              <span className={styles.statNumber}>
                2hrs
                <span className={styles.statTrend}>↑</span>
              </span>
              <span className={styles.statLabel}>saved daily on reporting</span>
            </div>
            <div className={styles.statDivider}></div>
            <div
              className={`${styles.stat} ${activeStat === 2 ? styles.active : ""}`}>
              <span className={styles.statNumber}>
                99.9%
                <span className={styles.statTrend}>✓</span>
              </span>
              <span className={styles.statLabel}>inventory accuracy</span>
            </div>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              <div className={styles.avatarPlaceholder}>A</div>
              <div className={styles.avatarPlaceholder}>B</div>
              <div className={styles.avatarPlaceholder}>C</div>
              <div className={styles.avatarPlaceholder}>D</div>
              <div className={styles.avatarPlaceholder}>E</div>
              <span className={styles.avatarMore}>+127</span>
            </div>
            <span className={styles.proofText}>
              <strong>Pharmacy owners</strong> love us
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN - LEDGER */}
        <div className={styles.heroVisual}>
          <div className={styles.ledger}>
            <div className={styles.ledgerHeader}>
              <span className={styles.ledgerTitle}>
                <span className={styles.ledgerIcon}>{Icons.ledger}</span>
                Stock Ledger
              </span>
              <span className={styles.ledgerLive}>
                <span className={styles.liveDot}></span>
                LIVE
              </span>
            </div>

            <div className={styles.ledgerBody}>
              <div className={styles.ledgerRowHeader}>
                <span>Drug</span>
                <span>Qty</span>
                <span>Status</span>
                <span>Trend</span>
              </div>
              {renderLedgerEntries()}
            </div>

            <div className={styles.ledgerFooter}>
              <span>{ledgerEntries.length} items</span>
              <span>
                <span className={styles.footerDot}></span>
                Updated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
