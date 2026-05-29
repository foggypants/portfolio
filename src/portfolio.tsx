import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "SQL"] },
  { category: "Frontend", items: ["React.js", "HTML", "CSS"] },
  { category: "CS Fundamentals", items: ["DSA"] },
];

const PROJECTS = [
  {
    title: "Pomodoro Timer",
    description: "A clean productivity timer app built on the Pomodoro technique, featuring work/break intervals, session tracking, and customizable durations.",
    tags: ["React.js", "CSS", "JavaScript"],
    year: "2024",
  },
  {
    title: "Sudoku",
    description: "A fully playable Sudoku game with puzzle generation, difficulty levels, hint system, and real-time validation.",
    tags: ["JavaScript", "HTML", "CSS"],
    year: "2024",
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/foggypants" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashish-kumar-666a48385/" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const styles = {
    root: {
      background: "#0a0a0a",
      color: "#e8e6e0",
      minHeight: "100vh",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      overflowX: "hidden",
    },
    cursor: {
      position: "fixed",
      left: cursorPos.x - 10,
      top: cursorPos.y - 10,
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: `1.5px solid ${hovering ? "#c8f542" : "#e8e6e0"}`,
      pointerEvents: "none",
      zIndex: 9999,
      transition: "border-color 0.2s, transform 0.15s",
      transform: hovering ? "scale(1.8)" : "scale(1)",
      mixBlendMode: "difference",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.2rem 2.5rem",
      borderBottom: "0.5px solid #1e1e1e",
      background: "rgba(10,10,10,0.92)",
      backdropFilter: "blur(12px)",
    },
    logo: {
      fontSize: "0.8rem",
      letterSpacing: "0.2em",
      color: "#c8f542",
      textTransform: "uppercase",
      fontWeight: 500,
    },
    navLinks: {
      display: "flex",
      gap: "2.5rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (active) => ({
      fontSize: "0.72rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: active ? "#c8f542" : "#888",
      cursor: "pointer",
      transition: "color 0.2s",
      background: "none",
      border: "none",
      fontFamily: "inherit",
      padding: 0,
    }),
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 2.5rem 5rem",
      position: "relative",
      overflow: "hidden",
    },
    heroGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(200,245,66,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,245,66,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    },
    heroNumber: {
      fontSize: "clamp(6rem, 18vw, 15rem)",
      fontWeight: 700,
      color: "#111",
      lineHeight: 1,
      letterSpacing: "-0.04em",
      position: "absolute",
      right: "-0.02em",
      bottom: "-0.1em",
      userSelect: "none",
      fontFamily: "'DM Mono', monospace",
    },
    heroSubtitle: {
      fontSize: "0.72rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "#c8f542",
      marginBottom: "1rem",
    },
    heroTitle: {
      fontSize: "clamp(2.8rem, 7vw, 6rem)",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      margin: 0,
      color: "#e8e6e0",
    },
    heroDesc: {
      maxWidth: 480,
      color: "#666",
      fontSize: "0.9rem",
      lineHeight: 1.8,
      marginTop: "1.5rem",
    },
    heroCta: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      marginTop: "2.5rem",
      padding: "0.85rem 2rem",
      border: "0.5px solid #333",
      background: "transparent",
      color: "#e8e6e0",
      fontFamily: "inherit",
      fontSize: "0.72rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "border-color 0.2s, color 0.2s, background 0.2s",
    },
    section: {
      padding: "7rem 2.5rem",
      maxWidth: 1100,
      margin: "0 auto",
    },
    sectionLabel: {
      fontSize: "0.68rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "#c8f542",
      marginBottom: "0.5rem",
    },
    sectionTitle: {
      fontSize: "clamp(2rem, 4vw, 3.2rem)",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      margin: "0 0 3rem",
      color: "#e8e6e0",
    },
    divider: {
      height: "0.5px",
      background: "#1a1a1a",
      margin: 0,
    },
    aboutText: {
      fontSize: "1.1rem",
      lineHeight: 1.9,
      color: "#888",
      maxWidth: 680,
    },
    aboutHighlight: {
      color: "#e8e6e0",
    },
    statsRow: {
      display: "flex",
      gap: "3rem",
      marginTop: "3rem",
      flexWrap: "wrap",
    },
    statItem: {
      borderLeft: "1px solid #c8f542",
      paddingLeft: "1rem",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#e8e6e0",
      letterSpacing: "-0.04em",
    },
    statLabel: {
      fontSize: "0.72rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#555",
      marginTop: "0.2rem",
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1px",
      background: "#1a1a1a",
      border: "0.5px solid #1a1a1a",
    },
    skillCard: {
      background: "#0a0a0a",
      padding: "2rem",
    },
    skillCategory: {
      fontSize: "0.68rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#c8f542",
      marginBottom: "1.2rem",
    },
    skillTag: {
      display: "inline-block",
      padding: "0.3rem 0.7rem",
      border: "0.5px solid #252525",
      fontSize: "0.78rem",
      color: "#666",
      margin: "0 0.35rem 0.5rem 0",
      letterSpacing: "0.05em",
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1px",
      background: "#1a1a1a",
    },
    projectCard: (hov) => ({
      background: hov ? "#0f0f0f" : "#0a0a0a",
      padding: "2rem",
      cursor: "default",
      transition: "background 0.2s",
      position: "relative",
      overflow: "hidden",
    }),
    projectYear: {
      fontSize: "0.68rem",
      letterSpacing: "0.15em",
      color: "#444",
      marginBottom: "0.75rem",
    },
    projectTitle: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#e8e6e0",
      marginBottom: "0.75rem",
      letterSpacing: "-0.02em",
    },
    projectDesc: {
      fontSize: "0.82rem",
      color: "#555",
      lineHeight: 1.75,
      marginBottom: "1.5rem",
    },
    projectTag: {
      display: "inline-block",
      fontSize: "0.65rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#c8f542",
      border: "0.5px solid #1e2e00",
      padding: "0.2rem 0.5rem",
      marginRight: "0.4rem",
      marginBottom: "0.3rem",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "start",
    },
    contactInfo: {},
    contactDesc: {
      fontSize: "0.9rem",
      color: "#555",
      lineHeight: 1.85,
      marginBottom: "2rem",
    },
    contactEmail: {
      fontSize: "1rem",
      color: "#c8f542",
      letterSpacing: "0.03em",
      display: "block",
      marginBottom: "2rem",
    },
    socialLinks: {
      display: "flex",
      gap: "1.5rem",
    },
    socialLink: {
      fontSize: "0.72rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#444",
      cursor: "pointer",
      textDecoration: "none",
      transition: "color 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    formLabel: {
      display: "block",
      fontSize: "0.68rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#444",
      marginBottom: "0.5rem",
    },
    formInput: {
      width: "100%",
      background: "transparent",
      border: "0.5px solid #222",
      color: "#e8e6e0",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.85rem",
      padding: "0.75rem 1rem",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    formTextarea: {
      width: "100%",
      background: "transparent",
      border: "0.5px solid #222",
      color: "#e8e6e0",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.85rem",
      padding: "0.75rem 1rem",
      outline: "none",
      resize: "vertical",
      minHeight: 120,
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    submitBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.85rem 2rem",
      background: "#c8f542",
      border: "none",
      color: "#0a0a0a",
      fontFamily: "inherit",
      fontSize: "0.72rem",
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "opacity 0.2s",
    },
    footer: {
      borderTop: "0.5px solid #1a1a1a",
      padding: "2rem 2.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    },
    footerText: {
      fontSize: "0.7rem",
      letterSpacing: "0.1em",
      color: "#333",
    },
  };

  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.root}>
        {/* Custom cursor */}
        <div style={styles.cursor} />

        {/* Nav */}
        <nav style={styles.nav}>
          <span style={styles.logo}>AK</span>
          <ul style={styles.navLinks}>
            {NAV_LINKS.map((n) => (
              <li key={n}>
                <button
                  style={styles.navLink(activeSection === n)}
                  onClick={() => scrollTo(n)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hero */}
        <section id="hero" style={styles.hero}>
          <div style={styles.heroGrid} />
          <div style={styles.heroNumber}>01</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <FadeIn delay={0.1}>
              <p style={styles.heroSubtitle}>Available for work · 2025</p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h1 style={styles.heroTitle}>
                Ashish<br />Kumar
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p style={styles.heroDesc}>
                Full-stack developer crafting thoughtful digital experiences —
                clean code, considered design, meaningful products.
              </p>
            </FadeIn>
            <FadeIn delay={0.55}>
              <button
                style={styles.heroCta}
                onClick={() => scrollTo("Projects")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8f542";
                  e.currentTarget.style.color = "#c8f542";
                  setHovering(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = "#e8e6e0";
                  setHovering(false);
                }}
              >
                View work <span style={{ fontSize: "1rem" }}>↓</span>
              </button>
            </FadeIn>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* About */}
        <section id="about" style={{ ...styles.section, position: "relative" }}>
          <FadeIn>
            <p style={styles.sectionLabel}>01 / About</p>
            <h2 style={styles.sectionTitle}>Building things<br />that matter.</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={styles.aboutText}>
              I'm a{" "}
              <span style={styles.aboutHighlight}>full-stack developer</span>{" "}
              with a deep interest in building{" "}
              <span style={styles.aboutHighlight}>
                performant, accessible, and beautiful
              </span>{" "}
              web experiences. I care about the craft — from architecture to
              the smallest interaction detail. When I'm not building products,
              I'm exploring new tools, contributing to open source, or writing
              about software.
            </p>
          </FadeIn>

        </section>

        <hr style={styles.divider} />

        {/* Skills */}
        <section id="skills" style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>02 / Skills</p>
            <h2 style={styles.sectionTitle}>Tools of<br />the trade.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={styles.skillsGrid}>
              {SKILLS.map((s) => (
                <div key={s.category} style={styles.skillCard}>
                  <p style={styles.skillCategory}>{s.category}</p>
                  <div>
                    {s.items.map((item) => (
                      <span key={item} style={styles.skillTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <hr style={styles.divider} />

        {/* Projects */}
        <section id="projects" style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>03 / Projects</p>
            <h2 style={styles.sectionTitle}>Selected<br />work.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={styles.projectsGrid}>
              {PROJECTS.map((p, i) => (
                <div
                  key={p.title}
                  style={styles.projectCard(hoveredProject === i)}
                  onMouseEnter={() => { setHoveredProject(i); setHovering(true); }}
                  onMouseLeave={() => { setHoveredProject(null); setHovering(false); }}
                >
                  <p style={styles.projectYear}>{p.year}</p>
                  <p style={styles.projectTitle}>{p.title}</p>
                  <p style={styles.projectDesc}>{p.description}</p>
                  <div>
                    {p.tags.map((t) => (
                      <span key={t} style={styles.projectTag}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <hr style={styles.divider} />

        {/* Contact */}
        <section id="contact" style={styles.section}>
          <FadeIn>
            <p style={styles.sectionLabel}>04 / Contact</p>
            <h2 style={styles.sectionTitle}>Let's work<br />together.</h2>
          </FadeIn>
          <div style={styles.contactGrid}>
            <FadeIn delay={0.1}>
              <div style={styles.contactInfo}>
                <p style={styles.contactDesc}>
                  Have a project in mind? Looking for a developer to join
                  your team? I'm currently open to new opportunities and
                  would love to hear from you.
                </p>
                <a
                  href="mailto:ashish@example.com"
                  style={styles.contactEmail}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  ashish@example.com
                </a>
                <div style={styles.socialLinks}>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.socialLink}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#c8f542";
                        setHovering(true);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#444";
                        setHovering(false);
                      }}
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              {sent ? (
                <div
                  style={{
                    padding: "3rem 2rem",
                    border: "0.5px solid #1e2e00",
                    background: "#0c1200",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#c8f542",
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Message received — I'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Name</label>
                    <input
                      required
                      style={styles.formInput}
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((f) => ({ ...f, name: e.target.value }))
                      }
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#c8f542")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#222")
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label>
                    <input
                      required
                      type="email"
                      style={styles.formInput}
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((f) => ({ ...f, email: e.target.value }))
                      }
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#c8f542")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#222")
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Message</label>
                    <textarea
                      required
                      style={styles.formTextarea}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((f) => ({ ...f, message: e.target.value }))
                      }
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#c8f542")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#222")
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    style={styles.submitBtn}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.85")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                  >
                    Send message →
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <span style={styles.footerText}>
            © 2025 Ashish Kumar — All rights reserved
          </span>
          <span style={styles.footerText}>
            Built with React · Dark & Minimal
          </span>
        </footer>
      </div>
    </>
  );
}
