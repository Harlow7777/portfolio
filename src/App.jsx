import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["skills", "projects", "experience", "contact"];

const SKILLS = [
  {
    category: "Cloud & DevOps",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    tags: ["AWS (EC2, S3, SageMaker, IAM)", "Snowflake", "Terraform", "Docker", "OpenShift 3/4", "GitHub Actions", "Splunk", "ElasticSearch/Kibana", "UrbanCode"],
  },
  {
    category: "Languages",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    tags: ["Java", "Python", "JavaScript", "Jython", "Bash/Shell", "HTML/CSS", "SOAP/REST"],
  },
  {
    category: "Frameworks & Libraries",
    color: "#10b981",
    bg: "#f0fdf4",
    tags: ["Spring Boot", "Spring Framework", "Node.js", "React", "DBT", "Maven", "Gradle"],
  },
  {
    category: "Tools & Platforms",
    color: "#f59e0b",
    bg: "#fffbeb",
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
    bg: "#f0f9ff",
    type: "Full Stack",
  },
  {
    title: "Change Request Workflow",
    desc: "Jira + Confluence integration providing structured client intake for change requests with automated routing, SLA tracking, and status notifications.",
    stack: ["Node.js", "React", "Jira API", "Confluence API"],
    icon: "⬡",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    type: "Full Stack",
  },
  {
    title: "AWS ML Platform",
    desc: "Cloud infrastructure for Bank Machine Learning and Data Science workloads. Terraform-managed provisioning of EC2, S3, SageMaker, and IAM policies.",
    stack: ["AWS", "Terraform", "SageMaker", "EC2", "S3", "IAM"],
    icon: "△",
    color: "#f59e0b",
    bg: "#fffbeb",
    type: "Cloud / Backend",
  },
  {
    title: "Enterprise User Provisioning",
    desc: "Identity management system interfacing with 5,000+ UNIX servers and 27 IBM Mainframes via OIM, LDAP, and ActiveMQ for account lifecycle management.",
    stack: ["Java", "Spring", "LDAP", "OIM", "ActiveMQ", "JDBC"],
    icon: "◎",
    color: "#10b981",
    bg: "#f0fdf4",
    type: "Backend",
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", ...NAV_LINKS];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf8", minHeight: "100vh", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e6e0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 2rem", height: "56px",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#666", letterSpacing: "0.02em" }}>
          jacob.harlow
        </span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              fontSize: "13px", fontFamily: "inherit",
              color: activeSection === link ? "#1a1a1a" : "#999",
              fontWeight: activeSection === link ? "500" : "400",
              borderBottom: activeSection === link ? "1px solid #1a1a1a" : "1px solid transparent",
              transition: "all 0.2s",
            }}>
              {link}
            </button>
          ))}
          <a href="mailto:Harlow_Jacob@outlook.com" style={{
            background: "#1a1a1a", color: "#fafaf8", fontSize: "12px",
            padding: "7px 16px", borderRadius: "6px", textDecoration: "none",
            fontWeight: "500", letterSpacing: "0.01em",
          }}>
            Hire me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 2rem", paddingTop: "56px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#f0f9ff", border: "1px solid #bae6fd",
            borderRadius: "100px", padding: "4px 12px", marginBottom: "2rem",
            fontSize: "12px", color: "#0ea5e9", fontFamily: "'DM Mono', monospace",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
            Available for new opportunities
          </div>
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 80px)", fontWeight: "300", lineHeight: "1.05",
            letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#0f0f0d",
          }}>
            Jacob S. Harlow<br />
            <em style={{ fontStyle: "italic", color: "#999", fontWeight: "300" }}>Software Architect</em>
          </h1>
          <p style={{
            fontSize: "17px", color: "#666", lineHeight: "1.7", maxWidth: "560px",
            marginBottom: "2.5rem", fontWeight: "300",
          }}>
            10+ years designing scalable cloud and enterprise systems — from AWS data platforms to industrial automation. Currently at Global Process Automation, previously USAA and CenturyLink.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")} style={{
              background: "#1a1a1a", color: "#fafaf8", border: "none", cursor: "pointer",
              padding: "12px 24px", borderRadius: "8px", fontSize: "14px",
              fontFamily: "inherit", fontWeight: "500", letterSpacing: "0.01em",
              transition: "transform 0.15s, background 0.15s",
            }}
              onMouseEnter={e => e.target.style.background = "#333"}
              onMouseLeave={e => e.target.style.background = "#1a1a1a"}
            >
              View projects →
            </button>
            <a href="#" style={{
              background: "transparent", color: "#1a1a1a", border: "1px solid #d4d0c8",
              cursor: "pointer", padding: "12px 24px", borderRadius: "8px", fontSize: "14px",
              fontFamily: "inherit", fontWeight: "400", textDecoration: "none",
              display: "inline-flex", alignItems: "center",
            }}>
              Download resume
            </a>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["10+", "years experience"], ["5+", "cloud platforms"], ["27", "mainframes integrated"], ["5000+", "servers managed"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "28px", fontWeight: "500", letterSpacing: "-0.02em", color: "#0f0f0d" }}>{num}</div>
                <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "6rem 2rem", background: "#fff", borderTop: "1px solid #e8e6e0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>02 / Skills</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: "#0f0f0d" }}>
              Full stack<br />
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {SKILLS.map((group, i) => (
              <FadeIn key={group.category} delay={i * 0.1}>
                <div style={{
                  background: group.bg, borderRadius: "12px", padding: "1.5rem",
                  border: `1px solid ${group.color}22`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: group.color }} />
                    <span style={{ fontSize: "12px", fontWeight: "500", color: group.color, letterSpacing: "0.02em" }}>{group.category}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "12px", padding: "3px 10px", borderRadius: "100px",
                        background: "#fff", border: `1px solid ${group.color}33`,
                        color: "#444",
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
      <section id="projects" style={{ padding: "6rem 2rem", background: "#fafaf8", borderTop: "1px solid #e8e6e0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>03 / Projects</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: "#0f0f0d" }}>
              Selected work
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={{
                  background: "#fff", borderRadius: "12px", padding: "1.5rem",
                  border: "1px solid #e8e6e0", display: "flex", flexDirection: "column", gap: "12px",
                  transition: "transform 0.2s, box-shadow 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "10px",
                      background: p.bg, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "18px", color: p.color,
                      fontFamily: "monospace",
                    }}>{p.icon}</div>
                    <span style={{
                      fontSize: "10px", padding: "3px 8px", borderRadius: "100px",
                      background: p.bg, color: p.color, fontWeight: "500",
                      fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em",
                    }}>{p.type}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "6px" }}>{p.title}</div>
                    <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{p.desc}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto" }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#f5f4f0", color: "#666", fontFamily: "'DM Mono', monospace" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: "6rem 2rem", background: "#fff", borderTop: "1px solid #e8e6e0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>04 / Experience</div>
            <h2 style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "-0.02em", marginBottom: "3rem", color: "#0f0f0d" }}>
              Career timeline
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.role + exp.company} delay={i * 0.1}>
                <div style={{ display: "flex", gap: "1.5rem", paddingBottom: i < EXPERIENCE.length - 1 ? "0" : "0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: i === 0 ? "#1a1a1a" : "#d4d0c8",
                      border: "2px solid " + (i === 0 ? "#1a1a1a" : "#d4d0c8"),
                      marginTop: "4px", flexShrink: 0,
                    }} />
                    {i < EXPERIENCE.length - 1 && <div style={{ width: "1px", background: "#e8e6e0", flex: 1, marginTop: "4px", minHeight: "40px" }} />}
                  </div>
                  <div style={{ paddingBottom: "2rem", flex: 1 }}>
                    <button onClick={() => setExpandedExp(expandedExp === i ? -1 : i)} style={{
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                      textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    }}>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "500", color: "#0f0f0d" }}>{exp.role}</div>
                        <div style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>{exp.company} · {exp.location}</div>
                        <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px", fontFamily: "'DM Mono', monospace" }}>{exp.period}</div>
                      </div>
                      <span style={{ fontSize: "18px", color: "#ccc", paddingTop: "2px", transition: "transform 0.2s", transform: expandedExp === i ? "rotate(45deg)" : "none" }}>+</span>
                    </button>
                    {expandedExp === i && (
                      <ul style={{ marginTop: "1rem", paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {exp.bullets.map(b => (
                          <li key={b} style={{ fontSize: "13px", color: "#555", lineHeight: "1.6", display: "flex", gap: "8px" }}>
                            <span style={{ color: "#ccc", flexShrink: 0 }}>—</span>
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
            <div style={{ marginTop: "1rem", padding: "1.5rem", background: "#f5f4f0", borderRadius: "10px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "4px" }}>Louisiana Tech University</div>
              <div style={{ fontSize: "12px", color: "#666" }}>B.S. Computer Science · Minor: Economics · November 2014</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "#0f0f0d", borderTop: "1px solid #222" }}>
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
              <span href="tel:2108234846" style={{
                background: "transparent", color: "#fafaf8", padding: "12px 24px",
                borderRadius: "8px", textDecoration: "none", fontSize: "14px",
                border: "1px solid #333",
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
