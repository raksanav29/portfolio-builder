// Converts portfolio data into a downloadable HTML file
export const exportToHTML = (portfolioData) => {
  const { hero, skills, projects, experience, education, socials, theme } = portfolioData;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px" : theme?.buttonStyle === "sharp" ? "0px" : "8px";

  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";
  const text = isDark ? "#f1f5f9" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const border = isDark ? "#334155" : "#e2e8f0";

  const skillsHTML = skills?.length
    ? skills.map((s) => `<span class="tag">${s}</span>`).join("")
    : "";

  const projectsHTML = projects?.length
    ? projects.map((p) => `
        <div class="card">
          <h3 class="card-title">${p.title || ""}</h3>
          <p class="muted">${p.description || ""}</p>
          ${p.techStack?.length ? `<div class="tags">${p.techStack.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>` : ""}
          <div class="links">
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank">🔗 Live Demo</a>` : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">💻 GitHub</a>` : ""}
          </div>
        </div>`).join("")
    : "";

  const experienceHTML = experience?.length
    ? experience.map((e) => `
        <div class="timeline-item">
          <div class="exp-role">${e.role || ""}</div>
          <div class="exp-company">${e.company || ""}</div>
          <div class="exp-duration">${e.duration || ""}</div>
          <div class="muted">${e.description || ""}</div>
        </div>`).join("")
    : "";

  const educationHTML = education?.length
    ? education.map((e) => `
        <div class="edu-item">
          <div class="edu-institution">${e.institution || ""}</div>
          <div class="muted">${e.degree || ""}</div>
          <div class="accent">${e.year || ""}</div>
        </div>`).join("")
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${font.replace(" ", "+")}:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: '${font}', sans-serif; background: ${bg}; color: ${text}; line-height: 1.6; }
    .container { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
    .hero { margin-bottom: 40px; }
    .hero h1 { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
    .hero .tagline { font-size: 18px; color: ${primary}; font-weight: 500; margin-bottom: 14px; }
    .hero .bio { color: ${textMuted}; font-size: 15px; margin-bottom: 16px; }
    .contact-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
    .contact-row span { color: ${textMuted}; font-size: 14px; }
    .social-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .social-row a { padding: 6px 16px; border-radius: ${btnRadius}; border: 1.5px solid ${primary}; color: ${primary}; font-size: 13px; text-decoration: none; font-weight: 500; }
    .section { margin-bottom: 40px; }
    .section-title { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${textMuted}; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid ${border}; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { padding: 5px 14px; border-radius: ${btnRadius}; background: ${primary}18; color: ${primary}; font-size: 13px; font-weight: 500; }
    .tech-tag { padding: 2px 10px; border-radius: 4px; background: ${primary}12; color: ${primary}; font-size: 11px; display: inline-block; margin: 0 4px 4px 0; }
    .card { padding: 20px; border-radius: 12px; background: ${cardBg}; border: 1px solid ${border}; margin-bottom: 14px; }
    .card-title { font-weight: 700; font-size: 16px; margin-bottom: 6px; }
    .links { display: flex; gap: 12px; margin-top: 10px; }
    .links a { color: ${primary}; text-decoration: none; font-size: 13px; font-weight: 500; }
    .timeline-item { padding-left: 16px; border-left: 2px solid ${primary}; margin-bottom: 24px; }
    .exp-role { font-weight: 700; font-size: 15px; }
    .exp-company { color: ${primary}; font-size: 14px; }
    .exp-duration { color: ${textMuted}; font-size: 13px; margin-bottom: 6px; }
    .edu-item { margin-bottom: 16px; }
    .edu-institution { font-weight: 700; font-size: 15px; }
    .muted { color: ${textMuted}; font-size: 14px; }
    .accent { color: ${primary}; font-size: 13px; }
    @media (max-width: 600px) { .hero h1 { font-size: 28px; } .container { padding: 32px 16px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1>${hero?.name || "Your Name"}</h1>
      <div class="tagline">${hero?.tagline || ""}</div>
      <div class="bio">${hero?.bio || ""}</div>
      <div class="contact-row">
        ${hero?.location ? `<span>📍 ${hero.location}</span>` : ""}
        ${hero?.email ? `<span>✉️ ${hero.email}</span>` : ""}
      </div>
      <div class="social-row">
        ${socials?.github ? `<a href="${socials.github}" target="_blank">GitHub</a>` : ""}
        ${socials?.linkedin ? `<a href="${socials.linkedin}" target="_blank">LinkedIn</a>` : ""}
        ${socials?.twitter ? `<a href="${socials.twitter}" target="_blank">Twitter</a>` : ""}
        ${socials?.website ? `<a href="${socials.website}" target="_blank">Website</a>` : ""}
      </div>
    </div>
    ${skillsHTML ? `<div class="section"><div class="section-title">Skills</div><div class="tags">${skillsHTML}</div></div>` : ""}
    ${projectsHTML ? `<div class="section"><div class="section-title">Projects</div>${projectsHTML}</div>` : ""}
    ${experienceHTML ? `<div class="section"><div class="section-title">Experience</div>${experienceHTML}</div>` : ""}
    ${educationHTML ? `<div class="section"><div class="section-title">Education</div>${educationHTML}</div>` : ""}
  </div>
</body>
</html>`;

  // Trigger browser download
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${hero?.name || "portfolio"}-portfolio.html`;
  a.click();
  URL.revokeObjectURL(url);
};