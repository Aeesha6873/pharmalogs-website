import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLinkClick = (path) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = isMobile && open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, open]);

  const navItems = [
    { path: "/product", label: "Product" },
    { path: "/how-it-works", label: "How it works" },
    { path: "/clients", label: "Clients" },
    { path: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="banner">
      <div className={styles.ledgerLine} aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo} aria-label="PharmaLogs Home">
          <div className={styles.logoMark}>
            <span>PL</span>
            <div className={styles.logoPulse}></div>
          </div>
          <div className={styles.logoText}>
            <span>Pharma</span>
            <span>Logs</span>
          </div>
        </Link>

        <div className={styles.navCenter}>
          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onMouseEnter={() => setHoveredLink(item.path)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => handleLinkClick(item.path)}>
                <span className={styles.linkText}>{item.label}</span>
                <span className={styles.linkUnderline}></span>
                <span className={styles.linkDot}></span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.navRight}>
          <Link to="/login" className={styles.loginBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M8 2V9M8 9L6 7M8 9L10 7" />
              <path d="M2 10V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V10" />
            </svg>
            Log in
          </Link>
          <button className={styles.ctaBtn}>
            <span className={styles.ctaGlow}></span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M8 2V14M8 14L5 11M8 14L11 11" />
              <path d="M2 6H14" />
            </svg>
            Book a Demo
          </button>
        </div>

        <button
          className={`${styles.menuBtn} ${open ? styles.open : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          disabled={!isMobile}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileDecor}>
            <span className={styles.mobileDecorLine}></span>
            <span className={styles.mobileDecorText}>✦ Navigation</span>
            <span className={styles.mobileDecorLine}></span>
          </div>

          <nav className={styles.mobileNavLinks}>
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => handleLinkClick(item.path)}
                style={{ animationDelay: `${index * 0.08}s` }}>
                <span className={styles.mobileLinkIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.mobileLinkText}>{item.label}</span>
                <span className={styles.mobileLinkArrow}>→</span>
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileDivider}></div>

          <div className={styles.mobileActions}>
            <Link to="/login" className={styles.mobileLoginBtn}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M8 2V9M8 9L6 7M8 9L10 7" />
                <path d="M2 10V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V10" />
              </svg>
              Log in
            </Link>
            <button className={styles.mobileCtaBtn}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M8 2V14M8 14L5 11M8 14L11 11" />
                <path d="M2 6H14" />
              </svg>
              Book a Demo
            </button>
          </div>

          <div className={styles.mobileLedger}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
