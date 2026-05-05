import { useEffect, useRef } from "react";

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
    <div style={{ textAlign: "center", padding: "16px" }}>
      <div style={{ fontSize: "24px", marginBottom: "4px" }}>{stat.icon}</div>
      <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>
        <span ref={ref}>0</span>{stat.suffix}
      </div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>{stat.label}</div>
    </div>
  );
}

export default function ModernTemplate({ data }) {
  const {
    hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl
  } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
    : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0f172a" : "#f8fafc";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const sidebarBg = primary;
  const text = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const border = isDark ? "#334155" : "#e2e8f0";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: font, backgroundColor: bg }}>

      {/* Sidebar */}
      <div style={{ width: "280px", flexShrink: 0, backgroundColor: sidebarBg, position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Profile */}
        <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
          {hero?.profileImage ? (
            <img src={hero.profileImage} alt={hero.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(255,255,255,0.3)", marginBottom: "14px" }} />
          ) : (
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "14px", margin: "0 auto 14px" }}>
              {hero?.name?.charAt(0) || "?"}
            </div>
          )}
          <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>{hero?.name || "Your Name"}</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>{hero?.role || hero?.tagline}</p>
          {contact?.availability && (
            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.2)", fontSize: "11px", color: "#fff" }}>
              ● {contact.availability}
            </span>
          )}
        </div>

        {/* Stats in sidebar */}
        {statistics?.length > 0 && (
          <div style={{ backgroundColor: "rgba(0,0,0,0.15)", padding: "12px 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              {statistics.slice(0, 4).map((stat, i) => <StatCounter key={i} stat={stat} primary={primary} />)}
            </div>
          </div>
        )}

        {/* Contact info */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>Contact</p>
          {hero?.email && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", marginBottom: "8px", wordBreak: "break-all" }}>✉️ {hero.email}</p>}
          {hero?.phone && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", marginBottom: "8px" }}>📞 {hero.phone}</p>}
          {hero?.location && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", marginBottom: "8px" }}>📍 {hero.location}</p>}
        </div>

        {/* Social links */}
        {Object.values(socials || {}).some(Boolean) && (
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>Links</p>
            {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer"
                style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.85)", textDecoration: "none", marginBottom: "8px", textTransform: "capitalize", fontWeight: "500" }}>
                → {key}
              </a>
            ))}
          </div>
        )}

        {/* Skills */}
        {skillCategories?.length > 0 && (
          <div style={{ padding: "20px 24px", flex: 1 }}>
            <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>Skills</p>
            {skillCategories.map((cat, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}>{cat.category}</p>
                {cat.skills?.map((skill, j) => (
                  <div key={j} style={{ marginBottom: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>{skill.name}</span>
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "4px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.2)" }}>
                      <div style={{ height: "100%", borderRadius: "9999px", backgroundColor: "#fff", width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Resume download */}
        {resumeUrl && (
          <div style={{ padding: "16px 24px" }}>
            <a href={resumeUrl} target="_blank" rel="noreferrer"
              style={{ display: "block", textAlign: "center", padding: "10px", borderRadius: btnRadius, backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
              📄 Download Resume
            </a>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px 36px" }}>

        {/* Bio */}
        {(hero?.bio || about?.description) && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>About</h2>
            <p style={{ color: textMuted, lineHeight: "1.8", fontSize: "15px", marginBottom: "12px" }}>{about?.description || hero?.bio}</p>
            {about?.highlights?.length > 0 && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                {about.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", gap: "8px", color: textMuted, fontSize: "14px" }}>
                    <span style={{ color: primary }}>▸</span> {h}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "20px" }}>Projects</h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {projects.map((p, i) => (
                <div key={i} style={{ borderRadius: "14px", backgroundColor: cardBg, border: `1px solid ${border}`, overflow: "hidden" }}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />}
                  <div style={{ padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <h3 style={{ fontWeight: "700", color: text, fontSize: "15px" }}>{p.title}</h3>
                      {p.featured && <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "9999px", backgroundColor: "#fef3c7", color: "#d97706" }}>Featured</span>}
                    </div>
                    <p style={{ color: textMuted, fontSize: "13px", lineHeight: "1.6", marginBottom: "10px" }}>{p.description}</p>
                    {p.techStack?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
                        {p.techStack.map((t) => <span key={t} style={{ padding: "2px 8px", borderRadius: "4px", backgroundColor: `${primary}15`, color: primary, fontSize: "11px", fontWeight: "500" }}>{t}</span>)}
                      </div>
                    )}
                    {(p.caseStudy?.problem || p.caseStudy?.solution) && (
                      <div style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: isDark ? "#0f172a" : "#f0f9ff", marginBottom: "10px", borderLeft: `3px solid ${primary}` }}>
                        {p.caseStudy.problem && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "3px" }}><strong style={{ color: text }}>Problem:</strong> {p.caseStudy.problem}</p>}
                        {p.caseStudy.solution && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "3px" }}><strong style={{ color: text }}>Solution:</strong> {p.caseStudy.solution}</p>}
                        {p.caseStudy.result && <p style={{ fontSize: "12px", color: textMuted }}><strong style={{ color: text }}>Result:</strong> {p.caseStudy.result}</p>}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "10px" }}>
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ padding: "6px 14px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>🔗 Live</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ padding: "6px 14px", borderRadius: btnRadius, border: `1px solid ${border}`, color: textMuted, fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>💻 Code</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Achievements</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ padding: "14px", borderRadius: "10px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>{a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div>
                  <h3 style={{ fontWeight: "600", fontSize: "13px", color: text, marginBottom: "3px" }}>{a.title}</h3>
                  <p style={{ color: primary, fontSize: "11px", marginBottom: "2px" }}>{a.issuer}</p>
                  <p style={{ color: textMuted, fontSize: "11px" }}>{a.date}</p>
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: primary, textDecoration: "none", fontWeight: "600" }}>View →</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", padding: "16px", borderRadius: "10px", backgroundColor: cardBg, border: `1px solid ${border}`, marginBottom: "10px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: `${primary}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🎓</div>
                <div>
                  <h3 style={{ fontWeight: "700", color: text, fontSize: "14px", marginBottom: "2px" }}>{edu.institution}</h3>
                  <p style={{ color: primary, fontSize: "12px", marginBottom: "2px" }}>{edu.degree} {edu.field && `· ${edu.field}`}</p>
                  <p style={{ color: textMuted, fontSize: "11px" }}>{edu.year} {edu.grade && `· ${edu.grade}`}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Testimonials */}
        {testimonials?.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Testimonials</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    {"★".repeat(t.rating || 5).split("").map((s, j) => <span key={j} style={{ color: "#f59e0b" }}>{s}</span>)}
                  </div>
                  <p style={{ color: textMuted, fontSize: "13px", fontStyle: "italic", lineHeight: "1.6", marginBottom: "12px" }}>"{t.message}"</p>
                  <p style={{ fontWeight: "600", fontSize: "13px", color: text }}>{t.name}</p>
                  <p style={{ color: textMuted, fontSize: "12px" }}>{t.role}{t.company && ` · ${t.company}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ padding: "28px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}`, textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: text, marginBottom: "8px" }}>Get In Touch</h2>
          <p style={{ color: textMuted, marginBottom: "20px", fontSize: "14px" }}>{contact?.availability || "Open to opportunities"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {(contact?.email || hero?.email) && (
              <a href={`mailto:${contact?.email || hero?.email}`}
                style={{ padding: "10px 24px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                ✉️ Email Me
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer"
                style={{ padding: "10px 24px", borderRadius: btnRadius, border: `2px solid ${primary}`, color: primary, fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                📄 Resume
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}