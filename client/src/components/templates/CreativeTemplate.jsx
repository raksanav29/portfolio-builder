export default function CreativeTemplate({ data }) {
  const { hero, skills, projects, experience, education, socials, theme } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px" : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0a0a0a" : "#fafafa";
  const cardBg = isDark ? "#141414" : "#ffffff";
  const text = isDark ? "#ffffff" : "#111111";
  const textMuted = isDark ? "#888888" : "#666666";
  const border = isDark ? "#222222" : "#eeeeee";

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh" }}>

      {/* Hero — Big bold section */}
      <div style={{ background: `linear-gradient(135deg, ${primary}22 0%, ${bg} 60%)`, padding: "60px 40px 40px", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: "700px" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: btnRadius, backgroundColor: `${primary}22`, color: primary, fontSize: "12px", fontWeight: "600", marginBottom: "16px", letterSpacing: "0.05em" }}>
            Available for work
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "900", lineHeight: "1.1", marginBottom: "16px", color: text }}>
            {hero?.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "20px", color: primary, fontWeight: "600", marginBottom: "16px" }}>
            {hero?.tagline || "Your Tagline"}
          </p>
          <p style={{ color: textMuted, fontSize: "15px", lineHeight: "1.7", maxWidth: "500px", marginBottom: "24px" }}>
            {hero?.bio}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {socials?.github && (
              <a href={socials.github} target="_blank" rel="noreferrer"
                style={{ padding: "10px 22px", borderRadius: btnRadius, backgroundColor: primary, color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                GitHub
              </a>
            )}
            {socials?.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noreferrer"
                style={{ padding: "10px 22px", borderRadius: btnRadius, border: `1.5px solid ${primary}`, color: primary, fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                LinkedIn
              </a>
            )}
            {hero?.email && (
              <a href={`mailto:${hero.email}`}
                style={{ padding: "10px 22px", borderRadius: btnRadius, border: `1.5px solid ${border}`, color: textMuted, fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                ✉️ {hero.email}
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Skills — Horizontal scroll bar */}
        {skills?.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: textMuted, marginBottom: "16px" }}>
              Tech Stack
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map((skill) => (
                <span key={skill} style={{ padding: "8px 18px", borderRadius: btnRadius, border: `1px solid ${border}`, backgroundColor: cardBg, color: text, fontSize: "13px", fontWeight: "500" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects — big cards */}
        {projects?.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: textMuted, marginBottom: "20px" }}>
              Selected Work
            </h2>
            {projects.map((p, i) => (
              <div key={i} style={{ padding: "28px", borderRadius: "16px", backgroundColor: cardBg, border: `1px solid ${border}`, marginBottom: "16px`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: primary }} />
                <h3 style={{ fontWeight: "800", fontSize: "18px", color: text, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ color: textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "14px" }}>{p.description}</p>
                {p.techStack?.length > 0 && (
                  <div style={{ marginBottom: "14px" }}>
                    {p.techStack.map((t) => (
                      <span key={t} style={{ display: "inline-block", padding: "3px 10px", borderRadius: "4px", backgroundColor: `${primary}18`, color: primary, fontSize: "12px", marginRight: "6px", marginBottom: "6px" }}>{t}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", gap: "16px" }}>
                  {p.liveUrl && <a href={p.liveUrl} style={{ color: primary, fontWeight: "600", fontSize: "13px", textDecoration: "none" }} target="_blank" rel="noreferrer">Live →</a>}
                  {p.githubUrl && <a href={p.githubUrl} style={{ color: textMuted, fontWeight: "600", fontSize: "13px", textDecoration: "none" }} target="_blank" rel="noreferrer">GitHub →</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience & Education side by side */}
        <div style={{ display: "grid", gridTemplateColumns: experience?.length && education?.length ? "1fr 1fr" : "1fr", gap: "32px" }}>
          {experience?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: textMuted, marginBottom: "16px" }}>Experience</h2>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ fontWeight: "700", color: text, fontSize: "14px" }}>{exp.role}</div>
                  <div style={{ color: primary, fontSize: "13px", marginBottom: "2px" }}>{exp.company}</div>
                  <div style={{ color: textMuted, fontSize: "12px", marginBottom: "6px" }}>{exp.duration}</div>
                  <div style={{ color: textMuted, fontSize: "13px", lineHeight: "1.6" }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: textMuted, marginBottom: "16px" }}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ fontWeight: "700", color: text, fontSize: "14px" }}>{edu.institution}</div>
                  <div style={{ color: textMuted, fontSize: "13px" }}>{edu.degree}</div>
                  <div style={{ color: primary, fontSize: "12px" }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}