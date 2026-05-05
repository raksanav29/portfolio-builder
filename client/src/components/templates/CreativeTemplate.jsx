import { useEffect, useRef } from "react";

function StatCounter({ stat, primary, isDark }) {
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
    <div style={{ textAlign: "center", padding: "20px 16px" }}>
      <div style={{ fontSize: "28px", marginBottom: "6px" }}>{stat.icon}</div>
      <div style={{ fontSize: "28px", fontWeight: "900", color: primary }}>
        <span ref={ref}>0</span>{stat.suffix}
      </div>
      <div style={{ fontSize: "12px", color: isDark ? "#888" : "#666", marginTop: "4px" }}>{stat.label}</div>
    </div>
  );
}

export default function CreativeTemplate({ data }) {
  const {
    hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl
  } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
    : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0a0a0a" : "#fafafa";
  const cardBg = isDark ? "#141414" : "#ffffff";
  const text = isDark ? "#ffffff" : "#111111";
  const textMuted = isDark ? "#888888" : "#666666";
  const border = isDark ? "#222222" : "#eeeeee";

  const SectionTitle = ({ children }) => (
    <div style={{ marginBottom: "28px" }}>
      <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: primary, marginBottom: "6px" }}>
        ── {children}
      </p>
    </div>
  );

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${primary}25 0%, transparent 60%)`, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px", position: "relative" }}>
        <div style={{ maxWidth: "680px" }}>
          {hero?.profileImage && (
            <img src={hero.profileImage} alt={hero.name}
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "24px", border: `3px solid ${primary}` }} />
          )}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "9999px", backgroundColor: `${primary}20`, marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: primary, display: "inline-block" }}></span>
            <span style={{ fontSize: "12px", color: primary, fontWeight: "600" }}>{contact?.availability || "Available for work"}</span>
          </div>
          <h1 style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1.05", marginBottom: "16px", color: text }}>
            {hero?.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "22px", color: primary, fontWeight: "600", marginBottom: "20px" }}>
            {hero?.role || hero?.tagline}
          </p>
          <p style={{ color: textMuted, fontSize: "16px", lineHeight: "1.7", maxWidth: "520px", marginBottom: "32px" }}>
            {hero?.bio}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {hero?.ctaText && (
              <a href={hero.ctaLink || "#projects"}
                style={{ padding: "14px 32px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                {hero.ctaText}
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer"
                style={{ padding: "14px 32px", borderRadius: btnRadius, border: `2px solid ${border}`, color: textMuted, fontSize: "15px", fontWeight: "700", textDecoration: "none" }}>
                📄 {hero?.ctaSecondaryText || "Resume"}
              </a>
            )}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
            {Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer"
                style={{ fontSize: "13px", color: textMuted, textDecoration: "none", textTransform: "capitalize", fontWeight: "500" }}>
                {key} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 48px" }}>

        {/* Statistics */}
        {statistics?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(statistics.length, 4)}, 1fr)`, gap: "0", borderRadius: "20px", border: `1px solid ${border}`, overflow: "hidden", marginBottom: "80px", backgroundColor: cardBg }}>
            {statistics.map((stat, i) => (
              <div key={i} style={{ borderRight: i < statistics.length - 1 ? `1px solid ${border}` : "none" }}>
                <StatCounter stat={stat} primary={primary} isDark={isDark} />
              </div>
            ))}
          </div>
        )}

        {/* About */}
        {(about?.description || about?.highlights?.length > 0) && (
          <section style={{ marginBottom: "80px" }}>
            <SectionTitle>About Me</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "48px", alignItems: "start" }}>
              <div>
                <p style={{ color: textMuted, fontSize: "16px", lineHeight: "1.8" }}>{about?.description || hero?.bio}</p>
              </div>
              <div>
                {about?.highlights?.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: primary, fontWeight: "700", fontSize: "16px", marginTop: "-1px" }}>→</span>
                    <span style={{ color: textMuted, fontSize: "14px", lineHeight: "1.5" }}>{h}</span>
                  </div>
                ))}
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {hero?.email && <span style={{ fontSize: "13px", color: textMuted }}>✉️ {hero.email}</span>}
                  {hero?.location && <span style={{ fontSize: "13px", color: textMuted }}>📍 {hero.location}</span>}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skillCategories?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <SectionTitle>Tech Stack</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {skillCategories.map((cat, i) => (
                <div key={i} style={{ padding: "24px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <h3 style={{ fontWeight: "700", color: text, marginBottom: "16px", fontSize: "15px" }}>{cat.category}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {cat.skills?.map((skill, j) => (
                      <div key={j}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "13px", color: textMuted }}>{skill.name}</span>
                          <span style={{ fontSize: "12px", color: primary, fontWeight: "600" }}>{skill.level}%</span>
                        </div>
                        <div style={{ height: "5px", borderRadius: "9999px", backgroundColor: `${primary}20` }}>
                          <div style={{ height: "100%", borderRadius: "9999px", backgroundColor: primary, width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <SectionTitle>Selected Work</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {projects.map((p, i) => (
                <div key={i} style={{ borderRadius: "20px", backgroundColor: cardBg, border: `1px solid ${border}`, overflow: "hidden", position: "relative" }}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", height: "240px", objectFit: "cover" }} />}
                  <div style={{ position: "absolute", top: "16px", left: "0", width: "4px", height: "60px", backgroundColor: primary, borderRadius: "0 4px 4px 0" }} />
                  <div style={{ padding: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <h3 style={{ fontWeight: "800", fontSize: "20px", color: text }}>{p.title}</h3>
                      {p.featured && <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "9999px", backgroundColor: `${primary}20`, color: primary, fontWeight: "600" }}>Featured</span>}
                    </div>
                    <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "14px" }}>{p.description}</p>
                    {p.techStack?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                        {p.techStack.map((t) => <span key={t} style={{ padding: "4px 12px", borderRadius: btnRadius, border: `1px solid ${border}`, color: textMuted, fontSize: "12px" }}>{t}</span>)}
                      </div>
                    )}
                    {(p.caseStudy?.problem || p.caseStudy?.solution) && (
                      <div style={{ padding: "14px 16px", borderRadius: "10px", backgroundColor: isDark ? "#1a1a1a" : "#f8f8f8", marginBottom: "16px" }}>
                        <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: primary, marginBottom: "8px" }}>CASE STUDY</p>
                        {p.caseStudy.problem && <p style={{ fontSize: "13px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Problem —</strong> {p.caseStudy.problem}</p>}
                        {p.caseStudy.solution && <p style={{ fontSize: "13px", color: textMuted, marginBottom: "4px" }}><strong style={{ color: text }}>Solution —</strong> {p.caseStudy.solution}</p>}
                        {p.caseStudy.result && <p style={{ fontSize: "13px", color: textMuted }}><strong style={{ color: text }}>Result —</strong> {p.caseStudy.result}</p>}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "12px" }}>
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ padding: "8px 20px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>Live →</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ padding: "8px 20px", borderRadius: btnRadius, border: `1px solid ${border}`, color: textMuted, fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>GitHub →</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements + Education side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "80px" }}>
          {achievements?.length > 0 && (
            <section>
              <SectionTitle>Achievements</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{ padding: "16px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>{a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div>
                    <h3 style={{ fontWeight: "700", color: text, fontSize: "14px", marginBottom: "3px" }}>{a.title}</h3>
                    <p style={{ color: primary, fontSize: "12px" }}>{a.issuer}</p>
                    <p style={{ color: textMuted, fontSize: "11px" }}>{a.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education?.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ padding: "16px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>🎓</div>
                    <h3 style={{ fontWeight: "700", color: text, fontSize: "14px" }}>{edu.institution}</h3>
                    <p style={{ color: primary, fontSize: "12px" }}>{edu.degree} {edu.field && `· ${edu.field}`}</p>
                    <p style={{ color: textMuted, fontSize: "11px" }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Testimonials */}
        {testimonials?.length > 0 && (
          <section style={{ marginBottom: "80px" }}>
            <SectionTitle>Testimonials</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: "24px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <div style={{ fontSize: "32px", color: primary, fontWeight: "900", lineHeight: "1", marginBottom: "12px" }}>"</div>
                  <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>{t.message}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: `${primary}20`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, fontWeight: "700", fontSize: "14px" }}>
                      {t.name?.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", color: text, fontSize: "13px" }}>{t.name}</p>
                      <p style={{ color: textMuted, fontSize: "12px" }}>{t.role}{t.company && ` · ${t.company}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ textAlign: "center", padding: "60px 40px", borderRadius: "24px", background: `linear-gradient(135deg, ${primary}20, transparent)`, border: `1px solid ${border}` }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: text, marginBottom: "12px" }}>Let's build something great</h2>
          <p style={{ color: textMuted, fontSize: "16px", marginBottom: "32px" }}>{contact?.availability || "Open to new opportunities"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            {(contact?.email || hero?.email) && (
              <a href={`mailto:${contact?.email || hero?.email}`}
                style={{ padding: "14px 36px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                ✉️ Get in Touch
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer"
                style={{ padding: "14px 36px", borderRadius: btnRadius, border: `2px solid ${border}`, color: textMuted, fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                📄 Resume
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}