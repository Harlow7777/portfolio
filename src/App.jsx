import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["skills", "projects", "experience", "contact"];

const SKILLS = [
  {
    category: "Cloud & DevOps",
    color: "#0ea5e9",
    lightBg: "#f0f9ff",
    darkBg: "#0c1e2e",
    tags: ["AWS (EC2, S3, SageMaker, IAM)", "Snowflake", "Terraform", "Docker", "OpenShift 3/4", "GitHub Actions", "Splunk", "ElasticSearch/Kibana", "UrbanCode"],
  },
  {
    category: "Languages",
    color: "#8b5cf6",
    lightBg: "#f5f3ff",
    darkBg: "#1a1528",
    tags: ["Java", "Python", "JavaScript", "Jython", "Bash/Shell", "HTML/CSS", "SOAP/REST"],
  },
  {
    category: "Frameworks & Libraries",
    color: "#10b981",
    lightBg: "#f0fdf4",
    darkBg: "#0c2018",
    tags: ["Spring Boot", "Spring Framework", "Node.js", "React", "DBT", "Maven", "Gradle"],
  },
  {
    category: "Tools & Platforms",
    color: "#f59e0b",
    lightBg: "#fffbeb",
    darkBg: "#221a08",
    tags: ["Jira", "Confluence", "GitLab", "GitHub", "IntelliJ", "VSCode", "JFrog Artifactory", "Oracle Identity Manager"],
  },
];

const PROJECTS = [
  {
    title: "Inductive Automation Ignition Custom MES",
    desc: "Ignition project addressing customer needs and providing data visualization dashboards, work order management, quality test management and shift and crew scheduling.",
    stack: ["Python", "Jython", "Ignition", "CSS", "Java"],
    icon: "◈",
    color: "#0ea5e9",
    lightBg: "#f0f9ff",
    darkBg: "#0c1e2e",
    type: "Full Stack",
    github: "https://github.com/Harlow7777/ignition-dashboard",
    note: "Reference implementation — core logic demonstrated, proprietary client data excluded."
  },
  {
    title: "Change Request Workflow",
    desc: "Client-facing intake form that automatically creates a Jira ticket, sends a confirmation email to the client, and notifies the engineer.",
    stack: ["Node.js", "Express", "React", "Jira API", "Nodemailer"],
    icon: "⬡",
    color: "#8b5cf6",
    lightBg: "#f5f3ff",
    darkBg: "#1a1528",
    type: "Full Stack",
    github: "https://github.com/Harlow7777/change-request",
    note: "Portfolio build — demonstrates REST API design, third-party API integration, and automated email workflows."
  },
  {
    title: "AWS ML Platform",
    desc: "Cloud infrastructure for Bank Machine Learning and Data Science workloads. Terraform-managed provisioning of EC2, S3, SageMaker, and IAM policies.",
    stack: ["AWS", "Terraform", "SageMaker", "EC2", "S3", "IAM"],
    icon: "△",
    color: "#f59e0b",
    lightBg: "#fffbeb",
    darkBg: "#221a08",
    type: "Cloud / Backend",
    github: "https://github.com/Harlow7777/aws-rest-api",
    note: "Portfolio build — demonstrates AWS architecture, Terraform IaC, and multi-database patterns."
  },
  {
    title: "Enterprise User Provisioning",
    desc: "Identity management system interfacing with 5,000+ UNIX servers and 27 IBM Mainframes via OIM, LDAP, and ActiveMQ for account lifecycle management.",
    stack: ["Java", "Spring", "LDAP", "OIM", "ActiveMQ", "JDBC"],
    icon: "◎",
    color: "#10b981",
    lightBg: "#f0fdf4",
    darkBg: "#0c2018",
    type: "Backend",
  },
  {
    title: "RAG Document Assistant",
    desc: "Local RAG pipeline that ingests PDFs, redacts PII before indexing, and answers natural language questions with source citations. Features prompt versioning, per-request trace logging, and a real-time observability panel.",
    stack: ["Python", "FastAPI", "React", "Ollama", "ChromaDB", "Presidio"],
    icon: "⬢",
    color: "#10b981",
    lightBg: "#f0fdf4",
    darkBg: "#0c2018",
    type: "AI / Backend",
    github: "https://github.com/Harlow7777/rag-assistant",
    note: "Local implementation using Ollama + llama3.1:8b. Architecture is designed to swap to AWS Bedrock for production deployment."
  },
];

const EXPERIENCE = [
  {
    role: "Software Architect",
    company: "Global Process Automation (GPA)",
    location: "Ruston, LA",
    period: "March 2024 – April 2026",
    bullets: [
      "Led multi-project delivery ensuring consistent progress toward clearly defined goals",
      "Mentored developers to improve team efficiency and code quality",
      "Built a Jira/Confluence change request system for structured client intake",
      "Standardized documentation and processes for organized, predictable delivery",
      "Deployed and configured the system across 5 client sites",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "USAA",
    location: "San Antonio, TX",
    period: "Jan 2022 – March 2024",
    bullets: [
      "Tech Lead for data engineering team automating migration to Snowflake via Python and DBT",
      "Led team to streamline agile workflows, mentor juniors, and manage developer workloads",
      "Developed new AWS cloud platform for Bank Machine Learning and Data Science",
      "Regularly collaborated with architects on system design across the organization",
    ],
  },
  {
    role: "Software Engineer I",
    company: "USAA",
    location: "San Antonio, TX",
    period: "May 2019 – Jan 2022",
    bullets: [
      "Integrated a document controls solution within Bank Risk and Business Controls",
      "Migrated legacy applications to modern tech stack and new datacenter",
    ],
  },
  {
    role: "Software Developer",
    company: "CenturyLink",
    location: "Monroe, LA",
    period: "Jan 2015 – May 2019",
    bullets: [
      "Built connectors and schedulers with Java using Oracle Identity Manager API",
      "Managed users across 5,000+ UNIX servers via Oracle's UNIX Connector",
      "Created interface for 27 IBM Mainframes using Apache ActiveMQ and JMS",
      "Interfaced with multiple AD domains via LDAP for unified user data management",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedExp, setExpandedExp] = useState(0);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const toggleDark = () => {
    setDarkMode(prev => {
      localStorage.setItem("darkMode", String(!prev));
      return !prev;
    });
  };

  const theme = {
    bg:            darkMode ? "#0f0f0d" : "#fafaf8",
    bgAlt:         darkMode ? "#1a1a18" : "#ffffff",
    bgCard:        darkMode ? "#1f1f1d" : "#ffffff",
    bgSubtle:      darkMode ? "#242420" : "#f5f4f0",
    text:          darkMode ? "#fafaf8" : "#1a1a1a",
    textMuted:     darkMode ? "#888"    : "#666",
    textFaint:     darkMode ? "#555"    : "#999",
    textVeryFaint: darkMode ? "#3a3a38" : "#aaa",
    border:        darkMode ? "#2a2a28" : "#e8e6e0",
    borderSubtle:  darkMode ? "#222"    : "#f0efe8",
    navBg:         darkMode ? "rgba(15,15,13,0.92)" : "rgba(250,250,248,0.92)",
    heroDot:       darkMode ? "#1a1a18" : "#d4d0c8",
    stackTag:      darkMode ? "#2a2a28" : "#f5f4f0",
    expBulletDash: darkMode ? "#444"    : "#ccc",
    hireBtn:       darkMode ? "#fafaf8" : "#1a1a1a",
    hireBtnText:   darkMode ? "#0f0f0d" : "#fafaf8",
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", ...NAV_LINKS];
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 10) {
        setActiveSection("contact");
        return;
      }

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: theme.bg, minHeight: "100vh", color: theme.text, transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: theme.navBg, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 1.5rem", height: "56px", transition: "background 0.3s, border-color 0.3s",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: theme.textMuted, letterSpacing: "0.02em" }}>
          jacob.harlow
        </span>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                fontSize: "13px", fontFamily: "inherit",
                color: activeSection === link ? theme.text : theme.textFaint,
                fontWeight: activeSection === link ? "500" : "400",
                borderBottom: activeSection === link ? `1px solid ${theme.text}` : "1px solid transparent",
                transition: "all 0.2s",
              }}>
                {link}
              </button>
            ))}
            <button onClick={toggleDark} style={{
              background: "none", border: `1px solid ${theme.border}`, cursor: "pointer",
              padding: "6px 10px", borderRadius: "6px", fontSize: "13px",
              color: theme.textMuted, fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {darkMode ? "☀ light" : "☾ dark"}
            </button>
            <a href="mailto:Harlow_Jacob@outlook.com" style={{
              background: theme.hireBtn, color: theme.hireBtnText, fontSize: "12px",
              padding: "7px 16px", borderRadius: "6px", textDecoration: "none",
              fontWeight: "500", letterSpacing: "0.01em", transition: "background 0.3s, color 0.3s",
            }}>
              Hire me
            </a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", color: theme.text, fontSize: "20px",
            fontFamily: "inherit", lineHeight: 1,
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div style={{
            position: "fixed", top: "56px", left: 0, right: 0,
            background: theme.navBg, backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex", flexDirection: "column", padding: "1rem 1.5rem", gap: "0",
            zIndex: 99,
          }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                background: "none", border: "none", borderBottom: `1px solid ${theme.border}`,
                cursor: "pointer", padding: "14px 0",
                fontSize: "15px", fontFamily: "inherit", textAlign: "left",
                color: activeSection === link ? theme.text : theme.textMuted,
                fontWeight: activeSection === link ? "500" : "400",
              }}>
                {link}
              </button>
            ))}
            <div style={{ display: "flex", gap: "10px", paddingTop: "14px" }}>
              <button onClick={toggleDark} style={{
                background: "none", border: `1px solid ${theme.border}`, cursor: "pointer",
                padding: "8px 12px", borderRadius: "6px", fontSize: "13px",
                color: theme.textMuted, fontFamily: "inherit",
              }}>
                {darkMode ? "☀ light" : "☾ dark"}
              </button>
              <a href="mailto:Harlow_Jacob@outlook.com" style={{
                background: theme.hireBtn, color: theme.hireBtnText, fontSize: "13px",
                padding: "8px 16px", borderRadius: "6px", textDecoration: "none",
                fontWeight: "500",
              }}>
                Hire me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2rem", paddingTop: "56px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: darkMode ? "#0c1e2e" : "#f0f9ff",
            border: `1px solid ${darkMode ? "#0ea5e944" : "#bae6fd"}`,
            borderRadius: "100px", padding: "4px 12px", marginBottom: "2rem",
            fontSize: "12px", color: "#0ea5e9", fontFamily: "'DM Mono', monospace",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
            Available for new opportunities
          </div>
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 80px)", fontWeight: "300", lineHeight: "1.05",
            letterSpacing: "-0.03em", marginBottom: "1.5rem", color: theme.text,
          }}>
            Jacob S. Harlow<br />
            <em style={{ fontStyle: "italic", color: theme.textFaint, fontWeight: "300" }}>Software Architect</em>
          </h1>
          <p style={{
            fontSize: "17px", color: theme.textMuted, lineHeight: "1.7", maxWidth: "560px",
            marginBottom: "2.5rem", fontWeight: "300",
          }}>
            10+ years designing scalable cloud and enterprise systems — from AWS data platforms to industrial automation. Previously at Global Process Automation, USAA and CenturyLink.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")} style={{
              background: theme.text, color: theme.bg, border: "none", cursor: "pointer",
              padding: "12px 24px", borderRadius: "8px", fontSize: "14px",
              fontFamily: "inherit", fontWeight: "500", letterSpacing: "0.01em",
              transition: "opacity 0.15s",
            }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              View projects →
            </button>
            <a href="https://drive.google.com/uc?export=download&id=1hO55PU0iUmFj-c3iJJ8z7NKI0dcwc5At" target="_blank" rel="noreferrer" style={{
              background: "transparent", color: theme.text, border: `1px solid ${theme.border}`,
              cursor: "pointer", padding: "12px 24px", borderRadius: "8px", fontSize: "14px",
              fontFamily: "inherit", fontWeight: "400", textDecoration: "none",
              display: "inline-flex", alignItems: "center", transition: "border-color 0.2s",
            }}>
              Download resume
            </a>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["10+", "years experience"], ["5+", "cloud platforms"], ["27", "mainframes integrated"], ["5000+", "servers managed"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "28px", fontWeight: "500", letterSpacing: "-0.02em", color: theme.text }}>{num}</div>
                <div style={{ fontSize: "12px", color: theme.textFaint, marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "6rem 2rem", background: theme.bgAlt, borderTop: `1px solid ${theme.border}`, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: theme.textFaint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>02 / Skills</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: theme.text }}>
              Full stack
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {SKILLS.map((group, i) => (
              <FadeIn key={group.category} delay={i * 0.1}>
                <div style={{
                  background: darkMode ? group.darkBg : group.lightBg,
                  borderRadius: "12px", padding: "1.5rem",
                  border: `1px solid ${group.color}22`,
                  transition: "background 0.3s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: group.color }} />
                    <span style={{ fontSize: "12px", fontWeight: "500", color: group.color, letterSpacing: "0.02em" }}>{group.category}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "12px", padding: "3px 10px", borderRadius: "100px",
                        background: darkMode ? "#1f1f1d" : "#fff",
                        border: `1px solid ${group.color}33`,
                        color: darkMode ? "#ccc" : "#444",
                        transition: "background 0.3s",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "6rem 2rem", background: theme.bg, borderTop: `1px solid ${theme.border}`, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: theme.textFaint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>03 / Projects</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: theme.text }}>
              Selected work
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={{
                  background: theme.bgCard, borderRadius: "12px", padding: "1.5rem",
                  border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", gap: "12px",
                  transition: "transform 0.2s, box-shadow 0.2s, background 0.3s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = darkMode ? "0 8px 24px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "10px",
                      background: darkMode ? p.darkBg : p.lightBg,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "18px", color: p.color,
                      fontFamily: "monospace", transition: "background 0.3s",
                    }}>{p.icon}</div>
                    <span style={{
                      fontSize: "10px", padding: "3px 8px", borderRadius: "100px",
                      background: darkMode ? p.darkBg : p.lightBg,
                      color: p.color, fontWeight: "500",
                      fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em",
                      transition: "background 0.3s",
                    }}>{p.type}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "6px", color: theme.text }}>{p.title}</div>
                    <div style={{ fontSize: "13px", color: theme.textMuted, lineHeight: "1.6" }}>{p.desc}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto" }}>
                    {p.stack.map(s => (
                      <span key={s} style={{
                        fontSize: "11px", padding: "2px 8px", borderRadius: "4px",
                        background: theme.stackTag, color: theme.textMuted,
                        fontFamily: "'DM Mono', monospace", transition: "background 0.3s",
                      }}>{s}</span>
                    ))}
                  </div>
                  {(p.github || p.demo) && (
                    <div style={{ display: "flex", gap: "8px", paddingTop: "4px", borderTop: `1px solid ${theme.borderSubtle}` }}>
                      {p.github && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: p.color, textDecoration: "none", fontWeight: "500" }}>
                            GitHub →
                          </a>
                          {p.note && (
                            <span style={{ fontSize: "11px", color: theme.textFaint, fontStyle: "italic", lineHeight: "1.4" }}>
                              {p.note}
                            </span>
                          )}
                        </div>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: theme.textFaint, textDecoration: "none" }}>
                          Live demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: "6rem 2rem", background: theme.bgAlt, borderTop: `1px solid ${theme.border}`, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: theme.textFaint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>04 / Experience</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: theme.text }}>
              Career timeline
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.role + exp.company} delay={i * 0.1}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: i === 0 ? theme.text : theme.heroDot,
                      border: `2px solid ${i === 0 ? theme.text : theme.heroDot}`,
                      marginTop: "4px", flexShrink: 0, transition: "background 0.3s",
                    }} />
                    {i < EXPERIENCE.length - 1 && <div style={{ width: "1px", background: theme.border, flex: 1, marginTop: "4px", minHeight: "40px", transition: "background 0.3s" }} />}
                  </div>
                  <div style={{ paddingBottom: "2rem", flex: 1 }}>
                    <button onClick={() => setExpandedExp(expandedExp === i ? -1 : i)} style={{
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                      textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    }}>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "500", color: theme.text }}>{exp.role}</div>
                        <div style={{ fontSize: "13px", color: theme.textMuted, marginTop: "2px" }}>{exp.company} · {exp.location}</div>
                        <div style={{ fontSize: "12px", color: theme.textVeryFaint, marginTop: "2px", fontFamily: "'DM Mono', monospace" }}>{exp.period}</div>
                      </div>
                      <span style={{ fontSize: "18px", color: theme.textVeryFaint, paddingTop: "2px", transition: "transform 0.2s", transform: expandedExp === i ? "rotate(45deg)" : "none" }}>+</span>
                    </button>
                    {expandedExp === i && (
                      <ul style={{ marginTop: "1rem", paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {exp.bullets.map(b => (
                          <li key={b} style={{ fontSize: "13px", color: theme.textMuted, lineHeight: "1.6", display: "flex", gap: "8px" }}>
                            <span style={{ color: theme.expBulletDash, flexShrink: 0 }}>—</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ marginTop: "1rem", padding: "1.5rem", background: theme.bgSubtle, borderRadius: "10px", transition: "background 0.3s" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: theme.text }}>Louisiana Tech University</div>
              <div style={{ fontSize: "12px", color: theme.textMuted }}>B.S. Computer Science · Minor: Economics · November 2014</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "6rem 2rem", background: darkMode ? "#000" : "#0f0f0d", borderTop: "1px solid #222" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>05 / Contact</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "300", letterSpacing: "-0.03em", color: "#fafaf8", lineHeight: "1.1", marginBottom: "2rem" }}>
              Let's build<br /><em style={{ color: "#555", fontStyle: "italic" }}>something great</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href="mailto:Harlow_Jacob@outlook.com" style={{
                background: "#fafaf8", color: "#0f0f0d", padding: "12px 24px",
                borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "500",
              }}>
                Harlow_Jacob@outlook.com →
              </a>
              <span style={{
                background: "transparent", color: "#fafaf8", padding: "12px 24px",
                borderRadius: "8px", fontSize: "14px", border: "1px solid #333",
                display: "inline-block",
              }}>
                210.823.4846
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ borderTop: "1px solid #222", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#444" }}>
                © 2026 Jacob S. Harlow · Built with React
              </span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <a href="https://github.com/Harlow7777" style={{ fontSize: "12px", color: "#555", textDecoration: "none" }}>GitHub</a>
                <a href="https://www.linkedin.com/in/jacob-harlow-a9315651/" style={{ fontSize: "12px", color: "#555", textDecoration: "none" }}>LinkedIn</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
