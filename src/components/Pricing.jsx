import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Pricing.module.css";

const Icons = {
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
  arrowLeft: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  arrowRight: (
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
  lock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  refresh: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  gift: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  ),
};

function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

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

  useEffect(() => {
    if (isVisible && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isVisible, isPaused, activeIndex]);

  const plans = [
    {
      id: 1,
      name: "Essential",
      tagline: "Start managing smarter",
      price: { monthly: "₦45,000", yearly: "₦450,000" },
      features: [
        "Inventory management",
        "Sales & POS",
        "Basic reporting",
        "Expiry tracking",
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "#1B4F5C",
    },
    {
      id: 2,
      name: "Professional",
      tagline: "Grow with confidence",
      price: { monthly: "₦85,000", yearly: "₦850,000" },
      features: [
        "Everything in Essential",
        "Advanced reporting",
        "Advanced analytics",
        "Multi-branch support",
        "Priority support",
      ],
      cta: "Book a Demo",
      popular: true,
      color: "#3F8C6E",
    },
    {
      id: 3,
      name: "Enterprise",
      tagline: "Built for scale",
      price: { monthly: "Custom", yearly: "Custom" },
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "Custom reporting",
        "API access",
        "White-label options",
      ],
      cta: "Talk to Sales",
      popular: false,
      color: "#C97A2B",
    },
  ];

  const getPrice = (plan) => {
    if (plan.price.monthly === "Custom") return "Custom";
    return plan.price[billing];
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % plans.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + plans.length) % plans.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="pricing" className={styles.pricing} ref={sectionRef}>
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
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeIcon}>{Icons.sparkle}</span>
            <span className={styles.badge}>Pricing</span>
          </div>
          <h2>
            <span className={styles.titleLine}>Choose the right</span>
            <span className={styles.titleLine}>
              <span className={styles.highlight}>plan</span>
              <span className={styles.titleSuffix}> for your pharmacy</span>
            </span>
          </h2>
          <p className={styles.subhead}>
            All plans include a 14-day free trial. No credit card required.
          </p>

          <div className={styles.billingToggle}>
            <button
              className={`${styles.toggleBtn} ${billing === "monthly" ? styles.active : ""}`}
              onClick={() => setBilling("monthly")}>
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${billing === "yearly" ? styles.active : ""}`}
              onClick={() => setBilling("yearly")}>
              Yearly <span className={styles.saveBadge}>Save 15%</span>
            </button>
          </div>
        </div>

        <div
          className={`${styles.showcase} ${isVisible ? styles.visible : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div className={styles.dots}>
            {plans.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${activeIndex === index ? styles.active : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${plans[index].name}`}
              />
            ))}
          </div>

          <div className={styles.carouselWrapper}>
            <button
              className={`${styles.arrowBtn} ${styles.arrowLeft}`}
              onClick={prevSlide}
              aria-label="Previous plan"
              disabled={isAnimating}>
              {Icons.arrowLeft}
            </button>

            <div className={styles.cardsContainer}>
              {plans.map((plan, index) => {
                const isActive = activeIndex === index;
                const isPrev = activeIndex === (index + 1) % plans.length;
                const isNext =
                  activeIndex === (index - 1 + plans.length) % plans.length;

                return (
                  <div
                    key={plan.id}
                    className={`
                      ${styles.card} 
                      ${isActive ? styles.active : ""} 
                      ${isPrev ? styles.prev : ""} 
                      ${isNext ? styles.next : ""}
                      ${plan.popular ? styles.popular : ""}
                    `}
                    style={{ "--card-color": plan.color }}>
                    {plan.popular && (
                      <div className={styles.popularBadge}>
                        <span>✦</span> Most Popular
                      </div>
                    )}

                    <div className={styles.cardContent}>
                      <div className={styles.cardTop}>
                        <div
                          className={styles.planDot}
                          style={{ background: plan.color }}
                        />
                        <h3 className={styles.planName}>{plan.name}</h3>
                        <p className={styles.planTagline}>{plan.tagline}</p>
                      </div>

                      <div className={styles.planPrice}>
                        <span className={styles.priceAmount}>
                          {getPrice(plan)}
                        </span>
                        {getPrice(plan) !== "Custom" && (
                          <span className={styles.pricePeriod}>
                            /{billing === "monthly" ? "month" : "year"}
                          </span>
                        )}
                      </div>

                      <ul className={styles.featureList}>
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className={styles.featureItem}>
                            <span className={styles.featureCheck}>
                              {Icons.check}
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`${styles.ctaBtn} ${plan.popular ? styles.primary : styles.secondary}`}>
                        {plan.cta}
                        <span className={styles.ctaArrow}>{Icons.arrow}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className={`${styles.arrowBtn} ${styles.arrowRight}`}
              onClick={nextSlide}
              aria-label="Next plan"
              disabled={isAnimating}>
              {Icons.arrowRight}
            </button>
          </div>

          <div className={styles.autoPlayIndicator}>
            <div className={styles.autoPlayBar}>
              <div className={styles.autoPlayProgress} />
            </div>
          </div>
        </div>

        <div className={`${styles.trust} ${isVisible ? styles.visible : ""}`}>
          <span className={styles.trustItem}>
            <span className={styles.trustIcon}>{Icons.lock}</span>
            No hidden fees
          </span>
          <span className={styles.trustDivider}>•</span>
          <span className={styles.trustItem}>
            <span className={styles.trustIcon}>{Icons.refresh}</span>
            Cancel anytime
          </span>
          <span className={styles.trustDivider}>•</span>
          <span className={styles.trustItem}>
            <span className={styles.trustIcon}>{Icons.gift}</span>
            14-day free trial
          </span>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
