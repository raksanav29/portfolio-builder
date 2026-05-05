import { useEffect, useRef } from "react";

// Animated counter hook
function useCounter(target, duration = 2000) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseInt(target) || 0;
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { el.textContent = num; clearInterval(timer); }
      else el.textContent = Math.floor(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return ref;
}

function StatCounter({ stat, primary }) {
  const ref = useCounter(stat.value);
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{stat.icon}</div>
      <div className="text-2xl font-bold" style={{ color: primary }}>
        <span ref={ref}>0</span>{stat.suffix}
      </div>
      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
    </div>
  );
}

export default function MinimalTemplate({ data }) {
  const {
    hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl
  } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
    : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";
  const text = isDark ? "#f1f5f9" : "#111827";
  const textMuted = isDark ? "#94a3b8" : "#6b7280";
  const border = isDark ? "#334155" : "#e5e7eb";

  const Section = ({ title, children, id }) => (
    <section id={id} style={{ marginBottom: "56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: text }}>{title}</h2>
        <div style={{ flex: 1, height: "1px", backgroundColor: border }} />
      </div>
      {children}
    </section>
  );

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: bg, borderBottom: `1px solid ${border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "700", color: primary, fontSize: "18px" }}>{hero?.name?.split(" ")[0] || "Portfolio"}</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontSize: "13px", color: textMuted, textDecoration: "none", fontWeight: "500" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 32px" }}>

        {/* Hero */}
        <section id="hero" style={{ marginBottom: "64px", display: "flex", gap: "40px", alignItems: "center" }}>
          {hero?.profileImage && (
            <img src={hero.profileImage} alt={hero.name}
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: `3px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div>
            <p style={{ fontSize: "14px", color: primary, fontWeight: "600", marginBottom: "6px", letterSpacing: "0.05em" }}>
              Hello, I'm
            </p>
            <h1 style={{ fontSize: "40px", fontWeight: "800", color: text, lineHeight: "1.1", marginBottom: "8px" }}>
              {hero?.name || "Your Name"}
            </h1>
            <p style={{ fontSize: "18px", color: primary, fontWeight: "500", marginBottom: "12px" }}>
              {hero?.role || hero?.tagline}
            </p>
            <p style={{ color: textMuted, lineHeight: "1.7", fontSize: "15px", maxWidth: "480px", marginBottom: "24px" }}>
              {hero?.bio}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {hero?.ctaText && (
                <a href={hero.ctaLink || "#projects"}
                  style={{ padding: "10px 24px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                  {hero.ctaText}
                </a>
              )}
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noreferrer"
                  style={{ padding: "10px 24px", borderRadius: btnRadius, border: `2px solid ${primary}`, color: primary, fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                  {hero?.ctaSecondaryText || "Download Resume"}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Statistics */}
        {statistics?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(statistics.length, 4)}, 1fr)`, gap: "24px", padding: "28px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}`, marginBottom: "56px" }}>
            {statistics.map((stat, i) => <StatCounter key={i} stat={stat} primary={primary} />)}
          </div>
        )}

        {/* About */}
        {about?.description && (
          <Section title="About Me" id="about">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
              <div>
                <p style={{ color: textMuted, lineHeight: "1.8", fontSize: "15px" }}>{about.description}</p>
                {about.highlights?.length > 0 && (
                  <ul style={{ marginTop: "16px", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {about.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: textMuted, fontSize: "14px" }}>
                        <span style={{ color: primary, marginTop: "2px" }}>▸</span> {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {hero?.location && <div style={{ display: "flex", gap: "8px", color: textMuted, fontSize: "14px" }}><span>📍</span>{hero.location}</div>}
                {hero?.email && <div style={{ display: "flex", gap: "8px", color: textMuted, fontSize: "14px" }}><span>✉️</span>{hero.email}</div>}
                {hero?.phone && <div style={{ display: "flex", gap: "8px", color: textMuted, fontSize: "14px" }}><span>📞</span>{hero.phone}</div>}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                  {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noreferrer"
                      style={{ padding: "6px 14px", borderRadius: btnRadius, backgroundColor: `${primary}15`, color: primary, fontSize: "12px", fontWeight: "600", textDecoration: "none", textTransform: "capitalize" }}>
                      {key}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Skills */}
        {skillCategories?.length > 0 && (
          <Section title="Skills" id="skills">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {skillCategories.map((cat, i) => (
                <div key={i} style={{ padding: "20px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", color: text, marginBottom: "14px" }}>{cat.category}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {cat.skills?.map((skill, j) => (
                      <div key={j}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "13px", color: textMuted }}>{skill.name}</span>
                          <span style={{ fontSize: "12px", color: primary, fontWeight: "600" }}>{skill.level}%</span>
                        </div>
                        <div style={{ height: "6px", borderRadius: "9999px", backgroundColor: `${primary}20`, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: "9999px", backgroundColor: primary, width: `${skill.level}%`, transition: "width 1s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <Section title="Projects" id="projects">
            <div style={{ display: "grid", gap: "20px" }}>
              {projects.map((p, i) => (
                <div key={i} style={{ borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}`, overflow: "hidden" }}>
                  {p.image && (
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <h3 style={{ fontWeight: "700", fontSize: "16px", color: text }}>{p.title}</h3>
                      {p.featured && <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "9999px", backgroundColor: "#fef3c7", color: "#d97706" }}>⭐ Featured</span>}
                    </div>
                    <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.6", marginBottom: "12px" }}>{p.description}</p>
                    {p.techStack?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                        {p.techStack.map((t) => (
                          <span key={t} style={{ padding: "3px 10px", borderRadius: "4px", backgroundColor: `${primary}15`, color: primary, fontSize: "12px", fontWeight: "500" }}>{t}</span>
                        ))}
                      </div>
                    )}
                    {/* Case Study */}
                    {(p.caseStudy?.problem || p.caseStudy?.solution || p.caseStudy?.result) && (
                      <div style={{ marginBottom: "12px", padding: "12px", borderRadius: "8px", backgroundColor: isDark ? "#0f172a" : "#f0f9ff", border: `1px solid ${isDark ? "#1e3a5f" : "#bae6fd"}` }}>
                        <p style={{ fontSize: "11px", fontWeight: "700", color: "#0284c7", marginBottom: "6px" }}>CASE STUDY</p>
                        {p.caseStudy.problem && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Problem:</strong> {p.caseStudy.problem}</p>}
                        {p.caseStudy.solution && <p style={{ fontSize: "12px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Solution:</strong> {p.caseStudy.solution}</p>}
                        {p.caseStudy.result && <p style={{ fontSize: "12px", color: textMuted }}><strong style={{ color: text }}>Result:</strong> {p.caseStudy.result}</p>}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "12px" }}>
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ padding: "6px 16px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>🔗 Live Demo</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ padding: "6px 16px", borderRadius: btnRadius, border: `1px solid ${border}`, color: textMuted, fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>💻 GitHub</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <Section title="Achievements & Certifications" id="achievements">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ fontSize: "20px", marginBottom: "8px" }}>
                    {a.type === "certification" ? "🎓" : a.type === "award" ? "🏆" : "⭐"}
                  </div>
                  <h3 style={{ fontWeight: "600", fontSize: "14px", color: text, marginBottom: "4px" }}>{a.title}</h3>
                  <p style={{ color: primary, fontSize: "12px", marginBottom: "4px" }}>{a.issuer}</p>
                  <p style={{ color: textMuted, fontSize: "11px", marginBottom: "6px" }}>{a.date}</p>
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: primary, textDecoration: "none", fontWeight: "600" }}>View Certificate →</a>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <Section title="Education" id="education">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {education.map((edu, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", padding: "20px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: `${primary}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>🎓</div>
                  <div>
                    <h3 style={{ fontWeight: "700", fontSize: "15px", color: text, marginBottom: "2px" }}>{edu.institution}</h3>
                    <p style={{ color: primary, fontSize: "13px", marginBottom: "2px" }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <p style={{ color: textMuted, fontSize: "12px" }}>{edu.year} {edu.grade && `· ${edu.grade}`}</p>
                    {edu.description && <p style={{ color: textMuted, fontSize: "13px", marginTop: "6px", lineHeight: "1.5" }}>{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Testimonials */}
        {testimonials?.length > 0 && (
          <Section title="Testimonials" id="testimonials">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: "20px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    {"★".repeat(t.rating || 5).split("").map((s, j) => (
                      <span key={j} style={{ color: "#f59e0b", fontSize: "14px" }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ color: textMuted, fontSize: "13px", lineHeight: "1.6", marginBottom: "14px", fontStyle: "italic" }}>"{t.message}"</p>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "13px", color: text }}>{t.name}</p>
                    <p style={{ color: textMuted, fontSize: "12px" }}>{t.role}{t.company && ` · ${t.company}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Contact */}
        <Section title="Contact" id="contact">
          <div style={{ padding: "32px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}`, textAlign: "center" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: text, marginBottom: "8px" }}>Let's Work Together</h3>
            <p style={{ color: textMuted, marginBottom: "24px", fontSize: "14px" }}>{contact?.availability || "Open to opportunities"}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              {(contact?.email || hero?.email) && (
                <a href={`mailto:${contact?.email || hero?.email}`}
                  style={{ padding: "12px 28px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                  ✉️ Send Email
                </a>
              )}
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noreferrer"
                  style={{ padding: "12px 28px", borderRadius: btnRadius, border: `2px solid ${primary}`, color: primary, fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                  📄 Download Resume
                </a>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
              {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noreferrer"
                  style={{ padding: "6px 16px", borderRadius: btnRadius, border: `1px solid ${border}`, color: textMuted, fontSize: "12px", fontWeight: "500", textDecoration: "none", textTransform: "capitalize" }}>
                  {key}
                </a>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}