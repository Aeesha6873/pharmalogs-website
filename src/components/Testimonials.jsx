import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Testimonials.module.css";

const Icons = {
  quote: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4zm-8 6h-4v-4h4v4zm8 0h-4v-4h4v4z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  starEmpty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
};

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Adebayo Ogunlesi",
      pharmacy: "MedPlus Pharmacy",
      location: "Lagos, Nigeria",
      quote:
        "PharmaLogs cut our stockouts by 40% in the first month. We finally have visibility into what's actually on our shelves. The expiry tracking alone has saved us thousands.",
      result: "40% reduction in stockouts",
      rating: 5,
      initials: "AO",
    },
    {
      id: 2,
      name: "Pharmacist Chioma Nwachukwu",
      pharmacy: "Family Care Pharmacy",
      location: "Abuja, Nigeria",
      quote:
        "We used to spend 2 hours every day on manual reconciliation. Now it's automated. I can actually leave on time and trust that my numbers are right.",
      result: "2hrs saved daily",
      rating: 5,
      initials: "CN",
    },
    {
      id: 3,
      name: "Mr. Emeka Okonkwo",
      pharmacy: "City Pharmacy",
      location: "Port Harcourt, Nigeria",
      quote:
        "The reporting feature showed me which products were losing money. I cut 5 slow-moving items and increased profit by 25% in two months.",
      result: "25% profit increase",
      rating: 5,
      initials: "EO",
    },
  ];

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
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${i < rating ? styles.filled : styles.empty}`}>
        {i < rating ? Icons.star : Icons.starEmpty}
      </span>
    ));
  };

  return (
    <section id="clients" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>
      <div className={styles.bgPattern}></div>

      <div className={styles.ledgerTape}></div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeIcon}>{Icons.sparkle}</span>
            <span className={styles.badge}>Testimonials</span>
          </div>
          <h2>
            <span className={styles.titleLine}>What our</span>
            <span className={styles.titleLine}>
              <span className={styles.highlight}>pharmacy partners</span>
              <span className={styles.titleSuffix}> say</span>
            </span>
          </h2>
          <p className={styles.subhead}>
            Real results from real pharmacies across Nigeria.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.stats} ${isVisible ? styles.visible : ""}`}>
            <div className={`${styles.statCard} ${styles.statCard1}`}>
              <div className={styles.statNumber}>
                200+
                <span className={styles.statPulse}></span>
              </div>
              <div className={styles.statLabel}>Pharmacies Trust Us</div>
            </div>
            <div className={`${styles.statCard} ${styles.statCard2}`}>
              <div className={styles.statNumber}>
                4.9
                <span className={styles.statStars}>{renderStars(5)}</span>
              </div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
            <div className={`${styles.statCard} ${styles.statCard3}`}>
              <div className={styles.statNumber}>
                98%
                <span className={styles.statTrend}>↑</span>
              </div>
              <div className={styles.statLabel}>Would Recommend</div>
            </div>
          </div>

          <div
            className={`${styles.carousel} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.carouselTrack}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`${styles.slide} ${activeIndex === index ? styles.active : ""} ${isAnimating && activeIndex === index ? styles.animating : ""}`}>
                  <div className={styles.slideInner}>
                    <div className={styles.slideHeader}>
                      <div className={styles.avatar}>
                        <span>{testimonial.initials}</span>
                        <div className={styles.avatarPulse}></div>
                      </div>
                      <div className={styles.author}>
                        <div className={styles.name}>{testimonial.name}</div>
                        <div className={styles.detail}>
                          {testimonial.pharmacy}
                        </div>
                        <div className={styles.location}>
                          {testimonial.location}
                        </div>
                      </div>
                    </div>

                    <div className={styles.stars}>
                      {renderStars(testimonial.rating)}
                    </div>

                    <div className={styles.quoteWrapper}>
                      <div className={styles.quoteIcon}>{Icons.quote}</div>
                      <div className={styles.quote}>{testimonial.quote}</div>
                    </div>

                    <div className={styles.result}>
                      <span className={styles.resultLabel}>Key Result</span>
                      <span className={styles.resultValue}>
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.nav}>
              <button
                className={styles.navBtn}
                onClick={() =>
                  goToSlide(
                    (activeIndex - 1 + testimonials.length) %
                      testimonials.length,
                  )
                }
                aria-label="Previous">
                {Icons.arrowLeft}
              </button>
              <div className={styles.dots}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${activeIndex === index ? styles.active : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                className={styles.navBtn}
                onClick={() =>
                  goToSlide((activeIndex + 1) % testimonials.length)
                }
                aria-label="Next">
                {Icons.arrowRight}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
