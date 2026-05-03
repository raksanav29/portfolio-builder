export default function ModernTemplate({ data }) {
  const { hero, skills, projects, experience, education, socials, theme } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px" : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0f172a" : "#f1f5f9";
  const sidebarBg = isDark ? "#1e293b" : primary;
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const text = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const border = isDark ? "#334155" : "#e2e8f0";
  const sidebarText = "#ffffff";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: font, backgroundColor: bg }}>

      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0, backgroundColor: sidebarBg, padding: "40px 24px", color: sidebarText }}>
        {/* Avatar */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "800", marginBottom: "16px", color: "#fff" }}>
          {hero?.name?.charAt(0) || "?"}
        </div>

        <h1 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px", color: sidebarText }}>
          {hero?.name || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", opacity: 0.85, marginBottom: "24px" }}>
          {hero?.tagline || "Your Tagline"}
        </p>

        {/* Contact */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "10px" }}>Contact</p>
          {hero?.email && <p style={{ fontSize: "12px", marginBottom: "6px", opacity: 0.9 }}>✉️ {hero.email}</p>}
          {hero?.location && <p style={{ fontSize: "12px", marginBottom: "6px", opacity: 0.9 }}>📍 {hero.location}</p>}
        </div>

        {/* Social links */}
        {(socials?.github || socials?.linkedin || socials?.twitter || socials?.website) && (
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "10px" }}>Links</p>
            {["github", "linkedin", "twitter", "website"].map((s) =>
              socials?.[s] ? (
                <a key={s} href={socials[s]} target="_blank" rel="noreferrer"
                  style={{ display: "block", fontSize: "12px", marginBottom: "6px", opacity: 0.9, color: sidebarText, textDecoration: "none", textTransform: "capitalize" }}>
                  → {s}
                </a>
              ) : null
            )}
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: "10px" }}>Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((skill) => (
                <span key={skill} style={{ padding: "3px 10px", borderRadius: btnRadius, backgroundColor: "rgba(255,255,255,0.2)", fontSize: "11px", color: sidebarText }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px 32px", overflowY: "auto" }}>

        {/* Bio */}
        {hero?.bio && (
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "12px" }}>About</h2>
            <p style={{ color: textMuted, lineHeight: "1.7", fontSize: "14px" }}>{hero.bio}</p>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Projects</h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {projects.map((p, i) => (
                <div key={i} style={{ padding: "18px", borderRadius: "10px", backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <h3 style={{ fontWeight: "700", fontSize: "15px", color: text, marginBottom: "6px" }}>{p.title}</h3>
                  <p style={{ color: textMuted, fontSize: "13px", lineHeight: "1.6", marginBottom: "10px" }}>{p.description}</p>
                  {p.techStack?.length > 0 && (
                    <div style={{ marginBottom: "8px" }}>
                      {p.techStack.map((t) => (
                        <span key={t} style={{ display: "inline-block", padding: "2px 8px", borderRadius: "4px", backgroundColor: `${primary}15`, color: primary, fontSize: "11px", marginRight: "4px", marginBottom: "4px" }}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "12px" }}>
                    {p.liveUrl && <a href={p.liveUrl} style={{ color: primary, fontSize: "12px", textDecoration: "none", fontWeight: "500" }} target="_blank" rel="noreferrer">🔗 Live</a>}
                    {p.githubUrl && <a href={p.githubUrl} style={{ color: primary, fontSize: "12px", textDecoration: "none", fontWeight: "500" }} target="_blank" rel="noreferrer">💻 Code</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: `${primary}20`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, fontWeight: "700", fontSize: "14px", flexShrink: 0 }}>
                  {exp.company?.charAt(0) || "?"}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: text, fontSize: "15px" }}>{exp.role}</div>
                  <div style={{ color: primary, fontSize: "13px" }}>{exp.company}</div>
                  <div style={{ color: textMuted, fontSize: "12px", marginBottom: "4px" }}>{exp.duration}</div>
                  <div style={{ color: textMuted, fontSize: "13px", lineHeight: "1.6" }}>{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: primary, marginBottom: "16px" }}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: "8px", backgroundColor: cardBg, border: `1px solid ${border}`, marginBottom: "10px" }}>
                <div style={{ fontWeight: "700", color: text }}>{edu.institution}</div>
                <div style={{ color: textMuted, fontSize: "13px" }}>{edu.degree}</div>
                <div style={{ color: primary, fontSize: "12px" }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}