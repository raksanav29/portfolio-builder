export const exportToHTML = (data) => {
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

  const skillsHTML = skillCategories?.length
    ? skillCategories.map((cat) => `
        <div class="skill-category">
          <h3 class="skill-cat-title">${cat.category}</h3>
          ${cat.skills?.map((s) => `
            <div class="skill-item">
              <div class="skill-header">
                <span>${s.name}</span>
                <span class="accent">${s.level}%</span>
              </div>
              <div class="skill-bar-bg">
                <div class="skill-bar" style="width:${s.level}%"></div>
              </div>
            </div>`).join("")}
        </div>`).join("") : "";

  const projectsHTML = projects?.length
    ? projects.map((p) => `
        <div class="card project-card">
          ${p.image ? `<img src="${p.image}" alt="${p.title}" class="project-img" />` : ""}
          <div class="card-body">
            <h3 class="card-title">${p.title || ""}
              ${p.featured ? `<span class="badge-featured">⭐ Featured</span>` : ""}
            </h3>
            <p class="muted">${p.description || ""}</p>
            ${p.techStack?.length ? `<div class="tags">${p.techStack.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
            ${(p.caseStudy?.problem || p.caseStudy?.solution || p.caseStudy?.result) ? `
              <div class="case-study">
                <p class="case-label">CASE STUDY</p>
                ${p.caseStudy.problem ? `<p><strong>Problem:</strong> ${p.caseStudy.problem}</p>` : ""}
                ${p.caseStudy.solution ? `<p><strong>Solution:</strong> ${p.caseStudy.solution}</p>` : ""}
                ${p.caseStudy.result ? `<p><strong>Result:</strong> ${p.caseStudy.result}</p>` : ""}
              </div>` : ""}
            <div class="links">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn-primary">🔗 Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="btn-outline">💻 GitHub</a>` : ""}
            </div>
          </div>
        </div>`).join("") : "";

  const achievementsHTML = achievements?.length
    ? achievements.map((a) => `
        <div class="card">
          <div class="ach-icon">${a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div>
          <h3 class="card-title">${a.title}</h3>
          <p class="accent">${a.issuer}</p>
          <p class="muted small">${a.date}</p>
          ${a.link ? `<a href="${a.link}" target="_blank" class="accent small">View Certificate →</a>` : ""}
        </div>`).join("") : "";

  const educationHTML = education?.length
    ? education.map((e) => `
        <div class="card edu-card">
          <div class="edu-icon">🎓</div>
          <div>
            <h3 class="card-title">${e.institution}</h3>
            <p class="accent">${e.degree}${e.field ? ` in ${e.field}` : ""}</p>
            <p class="muted small">${e.year}${e.grade ? ` · ${e.grade}` : ""}</p>
            ${e.description ? `<p class="muted">${e.description}</p>` : ""}
          </div>
        </div>`).join("") : "";

  const statsHTML = statistics?.length
    ? statistics.map((s) => `
        <div class="stat-item">
          <div class="stat-icon">${s.icon}</div>
          <div class="stat-value">${s.value}${s.suffix}</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join("") : "";

  const testimonialsHTML = testimonials?.length
    ? testimonials.map((t) => `
        <div class="card">
          <div class="stars">${"★".repeat(t.rating || 5)}</div>
          <p class="muted quote">"${t.message}"</p>
          <p class="bold">${t.name}</p>
          <p class="muted small">${t.role}${t.company ? ` · ${t.company}` : ""}</p>
        </div>`).join("") : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'${font}',sans-serif;background:${bg};color:${text};line-height:1.6;}
    a{color:inherit;text-decoration:none;}
    .container{max-width:760px;margin:0 auto;padding:48px 24px;}
    /* Nav */
    nav{position:sticky;top:0;z-index:50;background:${bg};border-bottom:1px solid ${border};padding:0 24px;}
    .nav-inner{max-width:760px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between;}
    .nav-logo{font-weight:800;color:${primary};font-size:18px;}
    .nav-links{display:flex;gap:24px;}
    .nav-links a{font-size:13px;color:${textMuted};font-weight:500;}
    /* Hero */
    .hero{display:flex;gap:32px;align-items:center;margin-bottom:56px;}
    .hero-img{width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid ${primary};flex-shrink:0;}
    .hero-badge{font-size:13px;color:${primary};font-weight:600;margin-bottom:6px;}
    .hero-name{font-size:36px;font-weight:800;margin-bottom:6px;}
    .hero-role{font-size:18px;color:${primary};font-weight:500;margin-bottom:12px;}
    .hero-bio{color:${textMuted};font-size:15px;margin-bottom:18px;max-width:480px;}
    .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
    .contact-row{display:flex;gap:14px;flex-wrap:wrap;}
    .contact-item{color:${textMuted};font-size:13px;}
    /* Buttons */
    .btn-primary{padding:10px 24px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:13px;font-weight:600;display:inline-block;text-decoration:none;}
    .btn-outline{padding:10px 24px;border-radius:${btnRadius};border:2px solid ${primary};color:${primary};font-size:13px;font-weight:600;display:inline-block;}
    /* Stats */
    .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0;border-radius:14px;background:${cardBg};border:1px solid ${border};margin-bottom:48px;overflow:hidden;}
    .stat-item{text-align:center;padding:20px 16px;border-right:1px solid ${border};}
    .stat-item:last-child{border-right:none;}
    .stat-icon{font-size:22px;margin-bottom:6px;}
    .stat-value{font-size:24px;font-weight:800;color:${primary};}
    .stat-label{font-size:11px;color:${textMuted};margin-top:3px;}
    /* Section */
    .section{margin-bottom:48px;}
    .section-header{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
    .section-title{font-size:20px;font-weight:700;color:${text};}
    .section-line{flex:1;height:1px;background:${border};}
    /* Cards */
    .card{padding:20px;border-radius:12px;background:${cardBg};border:1px solid ${border};margin-bottom:14px;}
    .card-title{font-weight:700;font-size:15px;color:${text};margin-bottom:6px;}
    .card-body{padding:20px;}
    /* Skills */
    .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    .skill-category{padding:20px;border-radius:12px;background:${cardBg};border:1px solid ${border};}
    .skill-cat-title{font-size:14px;font-weight:700;color:${text};margin-bottom:14px;}
    .skill-item{margin-bottom:10px;}
    .skill-header{display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;color:${textMuted};}
    .skill-bar-bg{height:6px;border-radius:9999px;background:${primary}25;}
    .skill-bar{height:100%;border-radius:9999px;background:${primary};}
    /* Projects */
    .project-img{width:100%;height:180px;object-fit:cover;}
    .project-card{padding:0;overflow:hidden;}
    /* Achievements */
    .ach-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
    .ach-icon{font-size:24px;margin-bottom:8px;}
    /* Education */
    .edu-card{display:flex;gap:14px;align-items:flex-start;}
    .edu-icon{font-size:24px;margin-top:2px;flex-shrink:0;}
    /* Testimonials */
    .test-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .stars{color:#f59e0b;font-size:14px;margin-bottom:8px;}
    .quote{font-style:italic;margin-bottom:12px;}
    /* Tags */
    .tags{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0;}
    .tag{padding:3px 10px;border-radius:4px;background:${primary}18;color:${primary};font-size:12px;font-weight:500;}
    /* Links */
    .links{display:flex;gap:10px;margin-top:12px;}
    /* Case study */
    .case-study{padding:12px;border-radius:8px;background:${isDark ? "#0f172a" : "#f0f9ff"};border-left:3px solid ${primary};margin:10px 0;font-size:13px;color:${textMuted};}
    .case-label{font-size:10px;font-weight:700;color:${primary};letter-spacing:0.1em;margin-bottom:6px;}
    /* Contact */
    .contact-section{padding:36px;border-radius:16px;background:${cardBg};border:1px solid ${border};text-align:center;}
    .contact-title{font-size:22px;font-weight:700;margin-bottom:8px;}
    .contact-btns{display:flex;justify-content:center;gap:12px;margin-top:20px;flex-wrap:wrap;}
    .socials{display:flex;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap;}
    .social-link{padding:6px 14px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;font-weight:500;text-transform:capitalize;}
    /* Helpers */
    .accent{color:${primary};}
    .muted{color:${textMuted};}
    .bold{font-weight:700;}
    .small{font-size:12px;}
    .badge-featured{font-size:11px;padding:2px 8px;border-radius:9999px;background:#fef3c7;color:#d97706;margin-left:8px;font-weight:600;}
    /* Responsive */
    @media(max-width:600px){
      .hero{flex-direction:column;text-align:center;}
      .hero-name{font-size:28px;}
      .skills-grid,.ach-grid,.test-grid{grid-template-columns:1fr;}
      .container{padding:32px 16px;}
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-inner">
      <span class="nav-logo">${hero?.name?.split(" ")[0] || "Portfolio"}</span>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>
  <div class="container">
    <!-- Hero -->
    <div class="hero" id="hero">
      ${hero?.profileImage ? `<img src="${hero.profileImage}" alt="${hero.name}" class="hero-img" />` : ""}
      <div>
        <div class="hero-badge">Hello, I'm</div>
        <h1 class="hero-name">${hero?.name || "Your Name"}</h1>
        <p class="hero-role">${hero?.role || hero?.tagline || ""}</p>
        <p class="hero-bio">${hero?.bio || ""}</p>
        <div class="hero-btns">
          ${hero?.ctaText ? `<a href="${hero.ctaLink || "#projects"}" class="btn-primary">${hero.ctaText}</a>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">${hero?.ctaSecondaryText || "Download Resume"}</a>` : ""}
        </div>
        <div class="contact-row">
          ${hero?.location ? `<span class="contact-item">📍 ${hero.location}</span>` : ""}
          ${hero?.email ? `<span class="contact-item">✉️ ${hero.email}</span>` : ""}
          ${hero?.phone ? `<span class="contact-item">📞 ${hero.phone}</span>` : ""}
        </div>
      </div>
    </div>
    ${statsHTML ? `<div class="stats-grid">${statsHTML}</div>` : ""}
    ${about?.description ? `
    <div class="section" id="about">
      <div class="section-header"><h2 class="section-title">About Me</h2><div class="section-line"></div></div>
      <p class="muted" style="line-height:1.8;font-size:15px;">${about.description}</p>
      ${about.highlights?.length ? `<ul style="margin-top:14px;list-style:none;display:flex;flex-direction:column;gap:8px;">
        ${about.highlights.map((h) => `<li style="display:flex;gap:8px;color:${textMuted};font-size:14px;"><span style="color:${primary}">▸</span>${h}</li>`).join("")}
      </ul>` : ""}
    </div>` : ""}
    ${skillsHTML ? `<div class="section" id="skills"><div class="section-header"><h2 class="section-title">Skills</h2><div class="section-line"></div></div><div class="skills-grid">${skillsHTML}</div></div>` : ""}
    ${projectsHTML ? `<div class="section" id="projects"><div class="section-header"><h2 class="section-title">Projects</h2><div class="section-line"></div></div>${projectsHTML}</div>` : ""}
    ${achievementsHTML ? `<div class="section"><div class="section-header"><h2 class="section-title">Achievements</h2><div class="section-line"></div></div><div class="ach-grid">${achievementsHTML}</div></div>` : ""}
    ${educationHTML ? `<div class="section" id="education"><div class="section-header"><h2 class="section-title">Education</h2><div class="section-line"></div></div>${educationHTML}</div>` : ""}
    ${testimonialsHTML ? `<div class="section"><div class="section-header"><h2 class="section-title">Testimonials</h2><div class="section-line"></div></div><div class="test-grid">${testimonialsHTML}</div></div>` : ""}
    <div class="contact-section" id="contact">
      <h2 class="contact-title">Let's Work Together</h2>
      <p class="muted">${contact?.availability || "Open to opportunities"}</p>
      <div class="contact-btns">
        ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" class="btn-primary">✉️ Send Email</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">📄 Resume</a>` : ""}
      </div>
      <div class="socials">
        ${Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) =>
          `<a href="${url}" target="_blank" class="social-link">${key}</a>`).join("")}
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(hero?.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};