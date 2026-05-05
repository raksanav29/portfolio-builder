import { useEffect, useRef, useState } from "react";

function StatCounter({ stat, primary }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseInt(stat.value) || 0;
    let start = 0;
    const step = num / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { el.textContent = num; clearInterval(timer); }
      else el.textContent = Math.floor(start);
    }, 16);
    return () => clearInterval(timer);
  }, [stat.value]);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "22px", marginBottom: "4px" }}>{stat.icon}</div>
      <div style={{ fontSize: "26px", fontWeight: "900", color: "#fff" }}>
        <span ref={ref}>0</span>{stat.suffix}
      </div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "3px" }}>{stat.label}</div>
    </div>
  );
}

export default function AdvancedTemplate({ data }) {
  const {
    hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl
  } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const secondary = theme?.secondaryColor || "#8b5cf6";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
    : theme?.buttonStyle === "sharp" ? "0px" : "10px";

  const bg = isDark ? "#080b14" : "#ffffff";
  const cardBg = isDark ? "#0f1629" : "#f8faff";
  const cardBorder = isDark ? "#1e2d4a" : "#e0e7ff";
  const text = isDark ? "#e8edf8" : "#0d1117";
  const textMuted = isDark ? "#8892a4" : "#5a6478";
  const navBg = isDark ? "rgba(8,11,20,0.95)" : "rgba(255,255,255,0.95)";

  const gradient = `linear-gradient(135deg, ${primary}, ${secondary})`;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh" }}>

      {/* Sticky Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: navBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${cardBorder}`, padding: "0 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {hero?.profileImage && (
              <img src={hero.profileImage} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
            )}
            <span style={{ fontWeight: "800", fontSize: "16px", background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {hero?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontSize: "13px", fontWeight: "500", color: textMuted, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noreferrer"
              style={{ padding: "8px 18px", borderRadius: btnRadius, background: gradient, color: "#fff", fontSize: "12px", fontWeight: "700", textDecoration: "none" }}>
              Resume ↓
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "80px 40px" }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${primary}25, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${secondary}20, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: "60px", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }}></span>
              <span style={{ fontSize: "12px", color: primary, fontWeight: "600" }}>{contact?.availability || "Available for work"}</span>
            </div>

            <h1 style={{ fontSize: "60px", fontWeight: "900", lineHeight: "1.05", marginBottom: "16px" }}>
              <span style={{ color: text }}>Hi, I'm </span>
              <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {hero?.name || "Your Name"}
              </span>
            </h1>

            <p style={{ fontSize: "22px", color: textMuted, fontWeight: "500", marginBottom: "20px" }}>
              {hero?.role || hero?.tagline}
            </p>

            <p style={{ color: textMuted, fontSize: "16px", lineHeight: "1.8", maxWidth: "540px", marginBottom: "36px" }}>
              {hero?.bio}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "36px" }}>
              {hero?.ctaText && (
                <a href={hero.ctaLink || "#projects"}
                  style={{ padding: "14px 32px", borderRadius: btnRadius, background: gradient, color: "#fff", fontSize: "15px", fontWeight: "700", textDecoration: "none", boxShadow: `0 8px 24px ${primary}40` }}>
                  {hero.ctaText} →
                </a>
              )}
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noreferrer"
                  style={{ padding: "14px 32px", borderRadius: btnRadius, border: `2px solid ${cardBorder}`, color: textMuted, fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                  📄 {hero?.ctaSecondaryText || "Download Resume"}
                </a>
              )}
            </div>

            {/* Socials row */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noreferrer"
                  style={{ padding: "8px 16px", borderRadius: btnRadius, border: `1px solid ${cardBorder}`, color: textMuted, fontSize: "12px", fontWeight: "600", textDecoration: "none", textTransform: "capitalize" }}>
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          {hero?.profileImage && (
            <div style={{ position: "relative" }}>
              <div style={{ width: "280px", height: "280px", borderRadius: "30px", overflow: "hidden", border: `3px solid ${cardBorder}`, boxShadow: `0 24px 60px ${primary}30` }}>
                <img src={hero.profileImage} alt={hero.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "38px", border: `2px dashed ${primary}40`, animation: "spin 20s linear infinite", pointerEvents: "none" }} />
            </div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      {statistics?.length > 0 && (
        <div style={{ background: gradient, padding: "36px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${Math.min(statistics.length, 4)}, 1fr)`, gap: "0" }}>
            {statistics.map((stat, i) => (
              <div key={i} style={{ borderRight: i < statistics.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none", padding: "0 16px" }}>
                <StatCounter stat={stat} primary={primary} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>

        {/* About */}
        {(about?.description || hero?.bio) && (
          <section id="about" style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>About Me</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "60px", alignItems: "start" }}>
              <div>
                <h2 style={{ fontSize: "36px", fontWeight: "800", color: text, lineHeight: "1.2", marginBottom: "20px" }}>
                  Passionate about building{" "}
                  <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    great experiences
                  </span>
                </h2>
                <p style={{ color: textMuted, fontSize: "15px", lineHeight: "1.8" }}>{about?.description || hero?.bio}</p>
              </div>
              <div>
                {about?.highlights?.length > 0 && (
                  <div style={{ padding: "24px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                    <p style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Highlights</p>
                    {about.highlights.map((h, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: primary, marginTop: "7px", flexShrink: 0 }}></span>
                        <span style={{ color: textMuted, fontSize: "14px", lineHeight: "1.5" }}>{h}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${cardBorder}` }}>
                      {hero?.email && <p style={{ fontSize: "13px", color: textMuted, marginBottom: "6px" }}>✉️ {hero.email}</p>}
                      {hero?.location && <p style={{ fontSize: "13px", color: textMuted }}>📍 {hero.location}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skillCategories?.length > 0 && (
          <section id="skills" style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>Skills</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: text, marginBottom: "36px" }}>My Tech Stack</h2>

            {/* Tab selector */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
              {skillCategories.map((cat, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  style={{ padding: "8px 20px", borderRadius: "9999px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s",
                    background: activeTab === i ? gradient : cardBg,
                    color: activeTab === i ? "#fff" : textMuted,
                    boxShadow: activeTab === i ? `0 4px 14px ${primary}40` : "none",
                  }}>
                  {cat.category}
                </button>
              ))}
            </div>

            {skillCategories[activeTab] && (
              <div style={{ padding: "28px", borderRadius: "20px", backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {skillCategories[activeTab].skills?.map((skill, j) => (
                    <div key={j} style={{ padding: "14px 16px", borderRadius: "12px", backgroundColor: isDark ? "#080b14" : "#fff", border: `1px solid ${cardBorder}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: text }}>{skill.name}</span>
                        <span style={{ fontSize: "13px", fontWeight: "700", background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: "6px", borderRadius: "9999px", backgroundColor: `${primary}15` }}>
                        <div style={{ height: "100%", borderRadius: "9999px", background: gradient, width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section id="projects" style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>Projects</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: text, marginBottom: "36px" }}>Featured Work</h2>
            <div style={{ display: "grid", gap: "24px" }}>
              {projects.map((p, i) => (
                <div key={i} style={{ borderRadius: "20px", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, overflow: "hidden", display: "grid", gridTemplateColumns: p.image ? "2fr 3fr" : "1fr", gap: "0" }}>
                  {p.image && (
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "200px" }} />
                  )}
                  <div style={{ padding: "28px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
                      <h3 style={{ fontWeight: "800", fontSize: "18px", color: text }}>{p.title}</h3>
                      {p.featured && (
                        <span style={{ fontSize: "10px", padding: "3px 10px", borderRadius: "9999px", background: gradient, color: "#fff", fontWeight: "700" }}>★ Featured</span>
                      )}
                    </div>
                    <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "12px" }}>{p.description}</p>
                    {p.techStack?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                        {p.techStack.map((t) => <span key={t} style={{ padding: "3px 10px", borderRadius: btnRadius, background: `${primary}15`, color: primary, fontSize: "11px", fontWeight: "600" }}>{t}</span>)}
                      </div>
                    )}
                    {(p.caseStudy?.problem || p.caseStudy?.solution || p.caseStudy?.result) && (
                      <div style={{ padding: "14px", borderRadius: "12px", background: `${primary}08`, border: `1px solid ${primary}20`, marginBottom: "14px" }}>
                        <p style={{ fontSize: "10px", fontWeight: "700", color: primary, letterSpacing: "0.1em", marginBottom: "8px" }}>CASE STUDY</p>
                        {p.caseStudy.problem && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Problem —</strong> {p.caseStudy.problem}</p>}
                        {p.caseStudy.solution && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Solution —</strong> {p.caseStudy.solution}</p>}
                        {p.caseStudy.result && <p style={{ fontSize: "12px", color: textMuted }}><strong style={{ color: text }}>Result —</strong> {p.caseStudy.result}</p>}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "10px" }}>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer"
                          style={{ padding: "8px 20px", borderRadius: btnRadius, background: gradient, color: "#fff", fontSize: "13px", fontWeight: "700", textDecoration: "none", boxShadow: `0 4px 12px ${primary}30` }}>
                          🔗 Live Demo
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer"
                          style={{ padding: "8px 20px", borderRadius: btnRadius, border: `1px solid ${cardBorder}`, color: textMuted, fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
                          💻 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>Achievements</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: text, marginBottom: "28px" }}>Certifications</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ padding: "22px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", borderRadius: "0 0 0 80px", background: `${primary}10` }} />
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div>
                  <h3 style={{ fontWeight: "700", fontSize: "14px", color: text, marginBottom: "4px", lineHeight: "1.3" }}>{a.title}</h3>
                  <p style={{ color: primary, fontSize: "12px", marginBottom: "2px" }}>{a.issuer}</p>
                  <p style={{ color: textMuted, fontSize: "11px", marginBottom: "8px" }}>{a.date}</p>
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", fontWeight: "700", color: primary, textDecoration: "none" }}>View Certificate →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>Education</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: text, marginBottom: "28px" }}>Academic Background</h2>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "22px", top: 0, bottom: 0, width: "2px", background: gradient }} />
              {education.map((edu, i) => (
                <div key={i} style={{ display: "flex", gap: "24px", marginBottom: "24px", position: "relative" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, zIndex: 1, boxShadow: `0 4px 12px ${primary}40` }}>🎓</div>
                  <div style={{ flex: 1, padding: "20px", borderRadius: "14px", backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                    <h3 style={{ fontWeight: "800", color: text, fontSize: "16px", marginBottom: "4px" }}>{edu.institution}</h3>
                    <p style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p style={{ color: textMuted, fontSize: "13px" }}>{edu.year} {edu.grade && `· GPA: ${edu.grade}`}</p>
                    {edu.description && <p style={{ color: textMuted, fontSize: "13px", marginTop: "8px", lineHeight: "1.5" }}>{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "9999px", background: `${primary}15`, border: `1px solid ${primary}30`, marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: primary, letterSpacing: "0.1em", textTransform: "uppercase" }}>Testimonials</span>
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: text, marginBottom: "28px" }}>What People Say</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: "28px", borderRadius: "20px", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, position: "relative" }}>
                  <div style={{ position: "absolute", top: "20px", right: "20px", fontSize: "40px", opacity: 0.1, fontWeight: "900", color: primary, lineHeight: 1 }}>"</div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {"★".repeat(t.rating || 5).split("").map((s, j) => (
                      <span key={j} style={{ color: "#f59e0b", fontSize: "14px" }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic" }}>"{t.message}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "16px" }}>
                      {t.name?.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", color: text, fontSize: "14px" }}>{t.name}</p>
                      <p style={{ color: textMuted, fontSize: "12px" }}>{t.role}{t.company && ` · ${t.company}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ padding: "60px 48px", borderRadius: "28px", position: "relative", overflow: "hidden", background: gradient, textAlign: "center" }}>
          <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#fff", marginBottom: "12px", position: "relative", zIndex: 1 }}>
            Let's Work Together
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "32px", position: "relative", zIndex: 1 }}>
            {contact?.availability || "Open to new opportunities"}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            {(contact?.email || hero?.email) && (
              <a href={`mailto:${contact?.email || hero?.email}`}
                style={{ padding: "14px 36px", borderRadius: btnRadius, backgroundColor: "#fff", color: primary, fontWeight: "800", fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
                ✉️ Get in Touch
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer"
                style={{ padding: "14px 36px", borderRadius: btnRadius, border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                📄 Download Resume
              </a>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer"
                style={{ padding: "6px 14px", borderRadius: btnRadius, backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "12px", fontWeight: "600", textDecoration: "none", textTransform: "capitalize" }}>
                {key}
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}