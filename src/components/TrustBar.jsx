import React, { useState, useEffect } from "react";
import styles from "../styles/TrustBar.module.css";

const Icons = {
  stockouts: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 2v4M12 22v-4M4 12H2M6 12H4M20 12h-2M22 12h-2M19.07 4.93l-2.83 2.83M4.93 19.07l2.83-2.83M19.07 19.07l-2.83-2.83M4.93 4.93l2.83 2.83" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16v-4" />
    </svg>
  ),
  clock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  target: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function TrustBar() {
  const [activeStat, setActiveStat] = useState(0);

  const clients = [
    { name: "MedPlus Pharmacy", initials: "MP" },
    { name: "HealthCare Chemists", initials: "HC" },
    { name: "City Pharmacy", initials: "CP" },
    { name: "Family Care Pharmacy", initials: "FC" },
    { name: "PrimeMed", initials: "PM" },
  ];

  const stats = [
    { value: "40%", label: "reduction in stockouts", icon: Icons.stockouts },
    { value: "2hrs", label: "saved daily on reporting", icon: Icons.clock },
    { value: "99.9%", label: "inventory accuracy", icon: Icons.target },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stats.length]);

  return (
    <section className={styles.trustBar}>
      <div className={styles.decorLine}></div>
      <div className={styles.decorDot}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>Trusted by</span>
          <span className={styles.headerNumber}>
            200+
            <span className={styles.numberPulse}></span>
          </span>
          <span className={styles.headerLabel}>pharmacies across Nigeria</span>
        </div>

        <div className={styles.logos}>
          {clients.map((client, index) => (
            <div key={index} className={styles.logo}>
              <div className={styles.logoCircle}>
                <span>{client.initials}</span>
              </div>
              <span className={styles.logoName}>{client.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.statsWrapper}>
          <div className={styles.statsBadge}>
            <span className={styles.badgeLine}></span>
            <span className={styles.badgeText}>✦ Real Results</span>
            <span className={styles.badgeLine}></span>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${styles.statItem} ${activeStat === index ? styles.active : ""}`}
                onMouseEnter={() => setActiveStat(index)}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.statDots}>
            {stats.map((_, index) => (
              <button
                key={index}
                className={`${styles.statDot} ${activeStat === index ? styles.active : ""}`}
                onClick={() => setActiveStat(index)}
                aria-label={`View stat ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.floatingBadge}>
          <span className={styles.badgeIcon}>{Icons.star}</span>
          <span className={styles.badgeText}>4.9/5 average rating</span>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
