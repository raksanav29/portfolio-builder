export default function MinimalTemplate({ data }) {
  const { hero, skills, projects, experience, education, socials, theme } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px" : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";
  const text = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const border = isDark ? "#334155" : "#e2e8f0";

  const s = {
    wrap: { backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh", padding: "0" },
    container: { maxWidth: "720px", margin: "0 auto", padding: "48px 24px" },
    heroName: { fontSize: "36px", fontWeight: "800", marginBottom: "8px", color: text },
    heroTagline: { fontSize: "18px", color: primary, fontWeight: "500", marginBottom: "16px" },
    heroBio: { color: textMuted, lineHeight: "1.7", marginBottom: "20px", fontSize: "15px" },
    contactRow: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" },
    contactItem: { color: textMuted, fontSize: "14px" },
    socialRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
    socialBtn: { padding: "6px 16px", borderRadius: btnRadius, border: `1.5px solid ${primary}`, color: primary, fontSize: "13px", textDecoration: "none", fontWeight: "500" },
    sectionTitle: { fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, marginBottom: "16px", paddingBottom: "8px", borderBottom: `1px solid ${border}` },
    section: { marginBottom: "40px" },
    skillTag: { display: "inline-block", padding: "5px 14px", borderRadius: btnRadius, backgroundColor: `${primary}18`, color: primary, fontSize: "13px", fontWeight: "500", margin: "0 6px 6px 0" },
    projectCard: { padding: "20px", borderRadius: "12px", backgroundColor: cardBg, border: `1px solid ${border}`, marginBottom: "14px" },
    projectTitle: { fontWeight: "700", fontSize: "16px", marginBottom: "6px", color: text },
    projectDesc: { color: textMuted, fontSize: "14px", lineHeight: "1.6", marginBottom: "10px" },
    techTag: { display: "inline-block", padding: "2px 10px", borderRadius: "4px", backgroundColor: `${primary}12`, color: primary, fontSize: "11px", margin: "0 4px 4px 0" },
    projectLinks: { display: "flex", gap: "10px", marginTop: "10px" },
    link: { fontSize: "13px", color: primary, textDecoration: "none", fontWeight: "500" },
    expItem: { paddingLeft: "16px", borderLeft: `2px solid ${primary}`, marginBottom: "24px" },
    expRole: { fontWeight: "700", fontSize: "15px", color: text },
    expCompany: { color: primary, fontSize: "14px", marginBottom: "2px" },
    expDuration: { color: textMuted, fontSize: "13px", marginBottom: "6px" },
    expDesc: { color: textMuted, fontSize: "14px", lineHeight: "1.6" },
    eduItem: { marginBottom: "16px" },
    eduInstitution: { fontWeight: "700", fontSize: "15px", color: text },
    eduDegree: { color: textMuted, fontSize: "14px" },
    eduYear: { color: primary, fontSize: "13px" },
  };

  return (
    <div style={s.wrap}>
      <div style={s.container}>

        {/* Hero */}
        <div style={s.section}>
          <h1 style={s.heroName}>{hero?.name || "Your Name"}</h1>
          <p style={s.heroTagline}>{hero?.tagline || "Your Tagline"}</p>
          <p style={s.heroBio}>{hero?.bio}</p>
          <div style={s.contactRow}>
            {hero?.location && <span style={s.contactItem}>📍 {hero.location}</span>}
            {hero?.email && <span style={s.contactItem}>✉️ {hero.email}</span>}
          </div>
          <div style={s.socialRow}>
            {socials?.github && <a href={socials.github} style={s.socialBtn} target="_blank" rel="noreferrer">GitHub</a>}
            {socials?.linkedin && <a href={socials.linkedin} style={s.socialBtn} target="_blank" rel="noreferrer">LinkedIn</a>}
            {socials?.twitter && <a href={socials.twitter} style={s.socialBtn} target="_blank" rel="noreferrer">Twitter</a>}
            {socials?.website && <a href={socials.website} style={s.socialBtn} target="_blank" rel="noreferrer">Website</a>}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Skills</h2>
            <div>{skills.map((skill) => <span key={skill} style={s.skillTag}>{skill}</span>)}</div>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Projects</h2>
            {projects.map((p, i) => (
              <div key={i} style={s.projectCard}>
                <h3 style={s.projectTitle}>{p.title}</h3>
                <p style={s.projectDesc}>{p.description}</p>
                {p.techStack?.length > 0 && (
                  <div>{p.techStack.map((t) => <span key={t} style={s.techTag}>{t}</span>)}</div>
                )}
                <div style={s.projectLinks}>
                  {p.liveUrl && <a href={p.liveUrl} style={s.link} target="_blank" rel="noreferrer">🔗 Live Demo</a>}
                  {p.githubUrl && <a href={p.githubUrl} style={s.link} target="_blank" rel="noreferrer">💻 GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={s.expItem}>
                <div style={s.expRole}>{exp.role}</div>
                <div style={s.expCompany}>{exp.company}</div>
                <div style={s.expDuration}>{exp.duration}</div>
                <div style={s.expDesc}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={s.eduItem}>
                <div style={s.eduInstitution}>{edu.institution}</div>
                <div style={s.eduDegree}>{edu.degree}</div>
                <div style={s.eduYear}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}