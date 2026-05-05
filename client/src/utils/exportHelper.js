// export const exportToHTML = (data) => {
//   const {
//     hero, about, skillCategories, projects, achievements,
//     education, statistics, testimonials, contact, socials, theme, resumeUrl
//   } = data;

//   const primary = theme?.primaryColor || "#6366f1";
//   const isDark = theme?.mode === "dark";
//   const font = theme?.fontFamily || "Inter";
//   const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
//     : theme?.buttonStyle === "sharp" ? "0px" : "8px";

//   const bg = isDark ? "#0f172a" : "#ffffff";
//   const cardBg = isDark ? "#1e293b" : "#f8fafc";
//   const text = isDark ? "#f1f5f9" : "#111827";
//   const textMuted = isDark ? "#94a3b8" : "#6b7280";
//   const border = isDark ? "#334155" : "#e5e7eb";

//   const skillsHTML = skillCategories?.length
//     ? skillCategories.map((cat) => `
//         <div class="skill-category">
//           <h3 class="skill-cat-title">${cat.category}</h3>
//           ${cat.skills?.map((s) => `
//             <div class="skill-item">
//               <div class="skill-header">
//                 <span>${s.name}</span>
//                 <span class="accent">${s.level}%</span>
//               </div>
//               <div class="skill-bar-bg">
//                 <div class="skill-bar" style="width:${s.level}%"></div>
//               </div>
//             </div>`).join("")}
//         </div>`).join("") : "";

//   const projectsHTML = projects?.length
//     ? projects.map((p) => `
//         <div class="card project-card">
//           ${p.image ? `<img src="${p.image}" alt="${p.title}" class="project-img" />` : ""}
//           <div class="card-body">
//             <h3 class="card-title">${p.title || ""}
//               ${p.featured ? `<span class="badge-featured">⭐ Featured</span>` : ""}
//             </h3>
//             <p class="muted">${p.description || ""}</p>
//             ${p.techStack?.length ? `<div class="tags">${p.techStack.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
//             ${(p.caseStudy?.problem || p.caseStudy?.solution || p.caseStudy?.result) ? `
//               <div class="case-study">
//                 <p class="case-label">CASE STUDY</p>
//                 ${p.caseStudy.problem ? `<p><strong>Problem:</strong> ${p.caseStudy.problem}</p>` : ""}
//                 ${p.caseStudy.solution ? `<p><strong>Solution:</strong> ${p.caseStudy.solution}</p>` : ""}
//                 ${p.caseStudy.result ? `<p><strong>Result:</strong> ${p.caseStudy.result}</p>` : ""}
//               </div>` : ""}
//             <div class="links">
//               ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn-primary">🔗 Live Demo</a>` : ""}
//               ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="btn-outline">💻 GitHub</a>` : ""}
//             </div>
//           </div>
//         </div>`).join("") : "";

//   const achievementsHTML = achievements?.length
//     ? achievements.map((a) => `
//         <div class="card">
//           <div class="ach-icon">${a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div>
//           <h3 class="card-title">${a.title}</h3>
//           <p class="accent">${a.issuer}</p>
//           <p class="muted small">${a.date}</p>
//           ${a.link ? `<a href="${a.link}" target="_blank" class="accent small">View Certificate →</a>` : ""}
//         </div>`).join("") : "";

//   const educationHTML = education?.length
//     ? education.map((e) => `
//         <div class="card edu-card">
//           <div class="edu-icon">🎓</div>
//           <div>
//             <h3 class="card-title">${e.institution}</h3>
//             <p class="accent">${e.degree}${e.field ? ` in ${e.field}` : ""}</p>
//             <p class="muted small">${e.year}${e.grade ? ` · ${e.grade}` : ""}</p>
//             ${e.description ? `<p class="muted">${e.description}</p>` : ""}
//           </div>
//         </div>`).join("") : "";

//   const statsHTML = statistics?.length
//     ? statistics.map((s) => `
//         <div class="stat-item">
//           <div class="stat-icon">${s.icon}</div>
//           <div class="stat-value">${s.value}${s.suffix}</div>
//           <div class="stat-label">${s.label}</div>
//         </div>`).join("") : "";

//   const testimonialsHTML = testimonials?.length
//     ? testimonials.map((t) => `
//         <div class="card">
//           <div class="stars">${"★".repeat(t.rating || 5)}</div>
//           <p class="muted quote">"${t.message}"</p>
//           <p class="bold">${t.name}</p>
//           <p class="muted small">${t.role}${t.company ? ` · ${t.company}` : ""}</p>
//         </div>`).join("") : "";

//   const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>${hero?.name || "Portfolio"}</title>
//   <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
//   <style>
//     *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
//     html{scroll-behavior:smooth;}
//     body{font-family:'${font}',sans-serif;background:${bg};color:${text};line-height:1.6;}
//     a{color:inherit;text-decoration:none;}
//     .container{max-width:760px;margin:0 auto;padding:48px 24px;}
//     /* Nav */
//     nav{position:sticky;top:0;z-index:50;background:${bg};border-bottom:1px solid ${border};padding:0 24px;}
//     .nav-inner{max-width:760px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between;}
//     .nav-logo{font-weight:800;color:${primary};font-size:18px;}
//     .nav-links{display:flex;gap:24px;}
//     .nav-links a{font-size:13px;color:${textMuted};font-weight:500;}
//     /* Hero */
//     .hero{display:flex;gap:32px;align-items:center;margin-bottom:56px;}
//     .hero-img{width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid ${primary};flex-shrink:0;}
//     .hero-badge{font-size:13px;color:${primary};font-weight:600;margin-bottom:6px;}
//     .hero-name{font-size:36px;font-weight:800;margin-bottom:6px;}
//     .hero-role{font-size:18px;color:${primary};font-weight:500;margin-bottom:12px;}
//     .hero-bio{color:${textMuted};font-size:15px;margin-bottom:18px;max-width:480px;}
//     .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
//     .contact-row{display:flex;gap:14px;flex-wrap:wrap;}
//     .contact-item{color:${textMuted};font-size:13px;}
//     /* Buttons */
//     .btn-primary{padding:10px 24px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:13px;font-weight:600;display:inline-block;text-decoration:none;}
//     .btn-outline{padding:10px 24px;border-radius:${btnRadius};border:2px solid ${primary};color:${primary};font-size:13px;font-weight:600;display:inline-block;}
//     /* Stats */
//     .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0;border-radius:14px;background:${cardBg};border:1px solid ${border};margin-bottom:48px;overflow:hidden;}
//     .stat-item{text-align:center;padding:20px 16px;border-right:1px solid ${border};}
//     .stat-item:last-child{border-right:none;}
//     .stat-icon{font-size:22px;margin-bottom:6px;}
//     .stat-value{font-size:24px;font-weight:800;color:${primary};}
//     .stat-label{font-size:11px;color:${textMuted};margin-top:3px;}
//     /* Section */
//     .section{margin-bottom:48px;}
//     .section-header{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
//     .section-title{font-size:20px;font-weight:700;color:${text};}
//     .section-line{flex:1;height:1px;background:${border};}
//     /* Cards */
//     .card{padding:20px;border-radius:12px;background:${cardBg};border:1px solid ${border};margin-bottom:14px;}
//     .card-title{font-weight:700;font-size:15px;color:${text};margin-bottom:6px;}
//     .card-body{padding:20px;}
//     /* Skills */
//     .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
//     .skill-category{padding:20px;border-radius:12px;background:${cardBg};border:1px solid ${border};}
//     .skill-cat-title{font-size:14px;font-weight:700;color:${text};margin-bottom:14px;}
//     .skill-item{margin-bottom:10px;}
//     .skill-header{display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;color:${textMuted};}
//     .skill-bar-bg{height:6px;border-radius:9999px;background:${primary}25;}
//     .skill-bar{height:100%;border-radius:9999px;background:${primary};}
//     /* Projects */
//     .project-img{width:100%;height:180px;object-fit:cover;}
//     .project-card{padding:0;overflow:hidden;}
//     /* Achievements */
//     .ach-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
//     .ach-icon{font-size:24px;margin-bottom:8px;}
//     /* Education */
//     .edu-card{display:flex;gap:14px;align-items:flex-start;}
//     .edu-icon{font-size:24px;margin-top:2px;flex-shrink:0;}
//     /* Testimonials */
//     .test-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
//     .stars{color:#f59e0b;font-size:14px;margin-bottom:8px;}
//     .quote{font-style:italic;margin-bottom:12px;}
//     /* Tags */
//     .tags{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0;}
//     .tag{padding:3px 10px;border-radius:4px;background:${primary}18;color:${primary};font-size:12px;font-weight:500;}
//     /* Links */
//     .links{display:flex;gap:10px;margin-top:12px;}
//     /* Case study */
//     .case-study{padding:12px;border-radius:8px;background:${isDark ? "#0f172a" : "#f0f9ff"};border-left:3px solid ${primary};margin:10px 0;font-size:13px;color:${textMuted};}
//     .case-label{font-size:10px;font-weight:700;color:${primary};letter-spacing:0.1em;margin-bottom:6px;}
//     /* Contact */
//     .contact-section{padding:36px;border-radius:16px;background:${cardBg};border:1px solid ${border};text-align:center;}
//     .contact-title{font-size:22px;font-weight:700;margin-bottom:8px;}
//     .contact-btns{display:flex;justify-content:center;gap:12px;margin-top:20px;flex-wrap:wrap;}
//     .socials{display:flex;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap;}
//     .social-link{padding:6px 14px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;font-weight:500;text-transform:capitalize;}
//     /* Helpers */
//     .accent{color:${primary};}
//     .muted{color:${textMuted};}
//     .bold{font-weight:700;}
//     .small{font-size:12px;}
//     .badge-featured{font-size:11px;padding:2px 8px;border-radius:9999px;background:#fef3c7;color:#d97706;margin-left:8px;font-weight:600;}
//     /* Responsive */
//     @media(max-width:600px){
//       .hero{flex-direction:column;text-align:center;}
//       .hero-name{font-size:28px;}
//       .skills-grid,.ach-grid,.test-grid{grid-template-columns:1fr;}
//       .container{padding:32px 16px;}
//     }
//   </style>
// </head>
// <body>
//   <nav>
//     <div class="nav-inner">
//       <span class="nav-logo">${hero?.name?.split(" ")[0] || "Portfolio"}</span>
//       <div class="nav-links">
//         <a href="#about">About</a>
//         <a href="#skills">Skills</a>
//         <a href="#projects">Projects</a>
//         <a href="#contact">Contact</a>
//       </div>
//     </div>
//   </nav>
//   <div class="container">
//     <!-- Hero -->
//     <div class="hero" id="hero">
//       ${hero?.profileImage ? `<img src="${hero.profileImage}" alt="${hero.name}" class="hero-img" />` : ""}
//       <div>
//         <div class="hero-badge">Hello, I'm</div>
//         <h1 class="hero-name">${hero?.name || "Your Name"}</h1>
//         <p class="hero-role">${hero?.role || hero?.tagline || ""}</p>
//         <p class="hero-bio">${hero?.bio || ""}</p>
//         <div class="hero-btns">
//           ${hero?.ctaText ? `<a href="${hero.ctaLink || "#projects"}" class="btn-primary">${hero.ctaText}</a>` : ""}
//           ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">${hero?.ctaSecondaryText || "Download Resume"}</a>` : ""}
//         </div>
//         <div class="contact-row">
//           ${hero?.location ? `<span class="contact-item">📍 ${hero.location}</span>` : ""}
//           ${hero?.email ? `<span class="contact-item">✉️ ${hero.email}</span>` : ""}
//           ${hero?.phone ? `<span class="contact-item">📞 ${hero.phone}</span>` : ""}
//         </div>
//       </div>
//     </div>
//     ${statsHTML ? `<div class="stats-grid">${statsHTML}</div>` : ""}
//     ${about?.description ? `
//     <div class="section" id="about">
//       <div class="section-header"><h2 class="section-title">About Me</h2><div class="section-line"></div></div>
//       <p class="muted" style="line-height:1.8;font-size:15px;">${about.description}</p>
//       ${about.highlights?.length ? `<ul style="margin-top:14px;list-style:none;display:flex;flex-direction:column;gap:8px;">
//         ${about.highlights.map((h) => `<li style="display:flex;gap:8px;color:${textMuted};font-size:14px;"><span style="color:${primary}">▸</span>${h}</li>`).join("")}
//       </ul>` : ""}
//     </div>` : ""}
//     ${skillsHTML ? `<div class="section" id="skills"><div class="section-header"><h2 class="section-title">Skills</h2><div class="section-line"></div></div><div class="skills-grid">${skillsHTML}</div></div>` : ""}
//     ${projectsHTML ? `<div class="section" id="projects"><div class="section-header"><h2 class="section-title">Projects</h2><div class="section-line"></div></div>${projectsHTML}</div>` : ""}
//     ${achievementsHTML ? `<div class="section"><div class="section-header"><h2 class="section-title">Achievements</h2><div class="section-line"></div></div><div class="ach-grid">${achievementsHTML}</div></div>` : ""}
//     ${educationHTML ? `<div class="section" id="education"><div class="section-header"><h2 class="section-title">Education</h2><div class="section-line"></div></div>${educationHTML}</div>` : ""}
//     ${testimonialsHTML ? `<div class="section"><div class="section-header"><h2 class="section-title">Testimonials</h2><div class="section-line"></div></div><div class="test-grid">${testimonialsHTML}</div></div>` : ""}
//     <div class="contact-section" id="contact">
//       <h2 class="contact-title">Let's Work Together</h2>
//       <p class="muted">${contact?.availability || "Open to opportunities"}</p>
//       <div class="contact-btns">
//         ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" class="btn-primary">✉️ Send Email</a>` : ""}
//         ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">📄 Resume</a>` : ""}
//       </div>
//       <div class="socials">
//         ${Object.entries(socials || {}).filter(([, v]) => v).map(([key, url]) =>
//           `<a href="${url}" target="_blank" class="social-link">${key}</a>`).join("")}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`;

//   const blob = new Blob([html], { type: "text/html" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${(hero?.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

export const exportToHTML = (data) => {
  const { template } = data;

  // Route to correct export based on template
  switch (template) {
    case "modern":   return exportModern(data);
    case "creative": return exportCreative(data);
    case "advanced": return exportAdvanced(data);
    default:         return exportMinimal(data);
  }
};

// ── Shared helpers ────────────────────────────
const getTheme = (theme, isDarkOverride) => {
  const isDark = theme?.mode === "dark";
  const primary = theme?.primaryColor || "#6366f1";
  const secondary = theme?.secondaryColor || "#8b5cf6";
  const font = theme?.fontFamily || "Inter";
  const btnRadius = theme?.buttonStyle === "pill" ? "9999px"
    : theme?.buttonStyle === "sharp" ? "0px" : "8px";
  const bg = isDark ? "#0f172a" : "#ffffff";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";
  const text = isDark ? "#f1f5f9" : "#111827";
  const textMuted = isDark ? "#94a3b8" : "#6b7280";
  const border = isDark ? "#334155" : "#e5e7eb";
  return { isDark, primary, secondary, font, btnRadius, bg, cardBg, text, textMuted, border };
};

const downloadHTML = (html, name, template) => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-${template}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const fontLink = (font) =>
  `<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />`;

// ── Minimal Export ────────────────────────────
const exportMinimal = (data) => {
  const { hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl } = data;
  const { isDark, primary, font, btnRadius, bg, cardBg, text, textMuted, border } = getTheme(theme);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"} - Minimal</title>
  ${fontLink(font)}
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'${font}',sans-serif;background:${bg};color:${text};line-height:1.6;}
    .container{max-width:760px;margin:0 auto;padding:48px 24px;}
    nav{position:sticky;top:0;background:${bg};border-bottom:1px solid ${border};padding:0 24px;z-index:50;}
    .nav-inner{max-width:760px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between;}
    .nav-logo{font-weight:800;color:${primary};font-size:18px;}
    .nav-links{display:flex;gap:24px;}
    .nav-links a{font-size:13px;color:${textMuted};text-decoration:none;font-weight:500;}
    .hero{display:flex;gap:32px;align-items:center;margin-bottom:56px;}
    .hero-img{width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid ${primary};flex-shrink:0;}
    h1{font-size:36px;font-weight:800;margin-bottom:6px;}
    .role{font-size:18px;color:${primary};font-weight:500;margin-bottom:12px;}
    .bio{color:${textMuted};font-size:15px;margin-bottom:18px;max-width:480px;}
    .btn-primary{padding:10px 24px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:13px;font-weight:600;display:inline-block;text-decoration:none;margin-right:10px;}
    .btn-outline{padding:10px 24px;border-radius:${btnRadius};border:2px solid ${primary};color:${primary};font-size:13px;font-weight:600;display:inline-block;text-decoration:none;}
    .section{margin-bottom:48px;}
    .section-header{display:flex;align-items:center;gap:12px;margin-bottom:24px;}
    .section-title{font-size:20px;font-weight:700;}
    .divider{flex:1;height:1px;background:${border};}
    .card{padding:20px;border-radius:12px;background:${cardBg};border:1px solid ${border};margin-bottom:14px;}
    .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    .skill-bar-bg{height:6px;border-radius:9999px;background:${primary}25;margin-top:4px;}
    .skill-bar{height:100%;border-radius:9999px;background:${primary};}
    .tag{display:inline-block;padding:3px 10px;border-radius:4px;background:${primary}18;color:${primary};font-size:12px;font-weight:500;margin:2px;}
    .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));border-radius:14px;background:${cardBg};border:1px solid ${border};margin-bottom:48px;overflow:hidden;}
    .stat-item{text-align:center;padding:20px 16px;border-right:1px solid ${border};}
    .stat-value{font-size:24px;font-weight:800;color:${primary};}
    .stat-label{font-size:11px;color:${textMuted};margin-top:3px;}
    .project-img{width:100%;height:180px;object-fit:cover;border-radius:12px 12px 0 0;}
    .muted{color:${textMuted};}
    .accent{color:${primary};}
    .contact-box{padding:36px;border-radius:16px;background:${cardBg};border:1px solid ${border};text-align:center;}
    .social-link{display:inline-block;padding:6px 14px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;margin:4px;text-decoration:none;text-transform:capitalize;}
    .case-study{padding:12px;border-radius:8px;background:${isDark ? "#0f172a" : "#f0f9ff"};border-left:3px solid ${primary};margin:10px 0;font-size:13px;}
    .stars{color:#f59e0b;font-size:14px;margin-bottom:8px;}
    @media(max-width:600px){.hero{flex-direction:column;}.skills-grid{grid-template-columns:1fr;}.container{padding:24px 16px;}}
  </style>
</head>
<body>
  <nav><div class="nav-inner">
    <span class="nav-logo">${hero?.name?.split(" ")[0] || "Portfolio"}</span>
    <div class="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
  </div></nav>
  <div class="container">
    <div class="hero" id="hero">
      ${hero?.profileImage ? `<img src="${hero.profileImage}" class="hero-img" alt="${hero.name}" />` : ""}
      <div>
        <h1>${hero?.name || "Your Name"}</h1>
        <div class="role">${hero?.role || hero?.tagline || ""}</div>
        <p class="bio">${hero?.bio || ""}</p>
        <div style="margin-bottom:14px;">
          ${hero?.ctaText ? `<a href="${hero.ctaLink || "#projects"}" class="btn-primary">${hero.ctaText}</a>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">${hero?.ctaSecondaryText || "Download Resume"}</a>` : ""}
        </div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          ${hero?.location ? `<span class="muted" style="font-size:13px;">📍 ${hero.location}</span>` : ""}
          ${hero?.email ? `<span class="muted" style="font-size:13px;">✉️ ${hero.email}</span>` : ""}
        </div>
      </div>
    </div>
    ${statistics?.length ? `<div class="stats-grid">${statistics.map(s => `<div class="stat-item"><div style="font-size:22px;">${s.icon}</div><div class="stat-value">${s.value}${s.suffix}</div><div class="stat-label">${s.label}</div></div>`).join("")}</div>` : ""}
    ${about?.description ? `<div class="section" id="about"><div class="section-header"><h2 class="section-title">About Me</h2><div class="divider"></div></div><p class="muted" style="line-height:1.8;">${about.description}</p>${about.highlights?.length ? `<ul style="margin-top:14px;list-style:none;">${about.highlights.map(h => `<li style="display:flex;gap:8px;color:${textMuted};font-size:14px;margin-bottom:6px;"><span style="color:${primary};">▸</span>${h}</li>`).join("")}</ul>` : ""}</div>` : ""}
    ${skillCategories?.length ? `<div class="section" id="skills"><div class="section-header"><h2 class="section-title">Skills</h2><div class="divider"></div></div><div class="skills-grid">${skillCategories.map(cat => `<div class="card"><h3 style="font-size:14px;font-weight:700;margin-bottom:14px;">${cat.category}</h3>${cat.skills?.map(s => `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:13px;color:${textMuted};margin-bottom:4px;"><span>${s.name}</span><span style="color:${primary};">${s.level}%</span></div><div class="skill-bar-bg"><div class="skill-bar" style="width:${s.level}%;"></div></div></div>`).join("")}</div>`).join("")}</div></div>` : ""}
    ${projects?.length ? `<div class="section" id="projects"><div class="section-header"><h2 class="section-title">Projects</h2><div class="divider"></div></div>${projects.map(p => `<div class="card" style="padding:0;overflow:hidden;">${p.image ? `<img src="${p.image}" class="project-img" alt="${p.title}" />` : ""}<div style="padding:20px;"><h3 style="font-weight:700;font-size:16px;margin-bottom:6px;">${p.title || ""}${p.featured ? `<span style="font-size:11px;background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:9999px;margin-left:8px;">⭐ Featured</span>` : ""}</h3><p class="muted" style="font-size:14px;margin-bottom:10px;">${p.description || ""}</p>${p.techStack?.length ? `<div style="margin-bottom:10px;">${p.techStack.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}${(p.caseStudy?.problem || p.caseStudy?.solution) ? `<div class="case-study"><p style="font-size:10px;font-weight:700;color:${primary};margin-bottom:6px;">CASE STUDY</p>${p.caseStudy.problem ? `<p style="font-size:12px;color:${textMuted};margin-bottom:3px;"><strong style="color:${text};">Problem:</strong> ${p.caseStudy.problem}</p>` : ""}${p.caseStudy.solution ? `<p style="font-size:12px;color:${textMuted};margin-bottom:3px;"><strong style="color:${text};">Solution:</strong> ${p.caseStudy.solution}</p>` : ""}${p.caseStudy.result ? `<p style="font-size:12px;color:${textMuted};"><strong style="color:${text};">Result:</strong> ${p.caseStudy.result}</p>` : ""}</div>` : ""}<div style="display:flex;gap:10px;margin-top:12px;">${p.liveUrl ? `<a href="${p.liveUrl}" class="btn-primary" style="padding:6px 16px;font-size:12px;" target="_blank">🔗 Live Demo</a>` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" class="btn-outline" style="padding:6px 16px;font-size:12px;" target="_blank">💻 GitHub</a>` : ""}</div></div></div>`).join("")}</div>` : ""}
    ${achievements?.length ? `<div class="section"><div class="section-header"><h2 class="section-title">Achievements</h2><div class="divider"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">${achievements.map(a => `<div class="card"><div style="font-size:24px;margin-bottom:8px;">${a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div><h3 style="font-weight:600;font-size:14px;margin-bottom:4px;">${a.title}</h3><p class="accent" style="font-size:12px;">${a.issuer}</p><p class="muted" style="font-size:11px;">${a.date}</p>${a.link ? `<a href="${a.link}" target="_blank" class="accent" style="font-size:11px;text-decoration:none;font-weight:600;">View Certificate →</a>` : ""}</div>`).join("")}</div></div>` : ""}
    ${education?.length ? `<div class="section" id="education"><div class="section-header"><h2 class="section-title">Education</h2><div class="divider"></div></div>${education.map(e => `<div class="card" style="display:flex;gap:14px;"><div style="font-size:28px;flex-shrink:0;">🎓</div><div><h3 style="font-weight:700;font-size:15px;">${e.institution}</h3><p class="accent" style="font-size:13px;">${e.degree}${e.field ? ` in ${e.field}` : ""}</p><p class="muted" style="font-size:12px;">${e.year}${e.grade ? ` · ${e.grade}` : ""}</p></div></div>`).join("")}</div>` : ""}
    ${testimonials?.length ? `<div class="section"><div class="section-header"><h2 class="section-title">Testimonials</h2><div class="divider"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">${testimonials.map(t => `<div class="card"><div class="stars">${"★".repeat(t.rating || 5)}</div><p class="muted" style="font-style:italic;font-size:13px;margin-bottom:12px;">"${t.message}"</p><p style="font-weight:600;font-size:13px;">${t.name}</p><p class="muted" style="font-size:12px;">${t.role}${t.company ? ` · ${t.company}` : ""}</p></div>`).join("")}</div></div>` : ""}
    <div class="contact-box" id="contact">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:8px;">Let's Work Together</h2>
      <p class="muted">${contact?.availability || "Open to opportunities"}</p>
      <div style="margin-top:20px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
        ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" class="btn-primary">✉️ Send Email</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">📄 Resume</a>` : ""}
      </div>
      <div style="margin-top:14px;">${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank" class="social-link">${k}</a>`).join("")}</div>
    </div>
  </div>
</body>
</html>`;

  downloadHTML(html, hero?.name, "minimal");
};

// ── Modern Export ─────────────────────────────
const exportModern = (data) => {
  const { hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl } = data;
  const { isDark, primary, font, btnRadius, bg, cardBg, text, textMuted, border } = getTheme(theme);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"} - Modern</title>
  ${fontLink(font)}
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'${font}',sans-serif;background:${bg};display:flex;min-height:100vh;}
    .sidebar{width:280px;flex-shrink:0;background:${primary};min-height:100vh;padding:32px 24px;color:#fff;position:sticky;top:0;height:100vh;overflow-y:auto;}
    .avatar{width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;margin-bottom:14px;}
    .avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
    .sidebar h1{font-size:20px;font-weight:800;margin-bottom:4px;}
    .sidebar-section{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.15);}
    .sidebar-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;opacity:0.6;margin-bottom:10px;}
    .sidebar a{display:block;font-size:12px;color:rgba(255,255,255,0.85);text-decoration:none;margin-bottom:6px;text-transform:capitalize;font-weight:500;}
    .skill-bar-bg{height:4px;border-radius:9999px;background:rgba(255,255,255,0.2);margin-top:3px;}
    .skill-bar{height:100%;border-radius:9999px;background:#fff;}
    .stat-box{text-align:center;padding:12px 8px;}
    .stat-val{font-size:20px;font-weight:800;}
    .stat-lbl{font-size:10px;opacity:0.7;}
    .main{flex:1;padding:40px 36px;overflow-y:auto;}
    .section{margin-bottom:36px;}
    .section-label{font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${primary};margin-bottom:14px;}
    .card{padding:18px;border-radius:12px;background:${cardBg};border:1px solid ${border};margin-bottom:12px;}
    .tag{display:inline-block;padding:2px 8px;border-radius:4px;background:${primary}15;color:${primary};font-size:11px;font-weight:500;margin:2px;}
    .btn-primary{padding:6px 14px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:12px;font-weight:600;text-decoration:none;display:inline-block;margin-right:8px;}
    .btn-outline{padding:6px 14px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;font-weight:600;text-decoration:none;display:inline-block;}
    .muted{color:${textMuted};}
    .accent{color:${primary};}
    .resume-btn{display:block;text-align:center;padding:10px;border-radius:${btnRadius};background:rgba(255,255,255,0.2);color:#fff;font-size:13px;font-weight:600;text-decoration:none;margin-top:12px;}
    .contact-box{padding:28px;border-radius:16px;background:${cardBg};border:1px solid ${border};text-align:center;}
    .stars{color:#f59e0b;font-size:13px;}
    .project-img{width:100%;height:150px;object-fit:cover;border-radius:10px 10px 0 0;}
    .case-study{padding:10px 12px;border-radius:8px;background:${isDark ? "#0f172a" : "#f0f9ff"};border-left:3px solid ${primary};margin:8px 0;font-size:12px;}
    @media(max-width:768px){body{flex-direction:column;}.sidebar{width:100%;position:static;height:auto;}}
  </style>
</head>
<body>
  <div class="sidebar">
    <div class="sidebar-section" style="text-align:center;">
      <div class="avatar">${hero?.profileImage ? `<img src="${hero.profileImage}" alt="${hero.name}" />` : (hero?.name?.charAt(0) || "?")}</div>
      <h1>${hero?.name || "Your Name"}</h1>
      <p style="font-size:13px;opacity:0.85;margin-bottom:8px;">${hero?.role || hero?.tagline || ""}</p>
      ${contact?.availability ? `<span style="display:inline-block;padding:3px 10px;border-radius:9999px;background:rgba(255,255,255,0.2);font-size:11px;">● ${contact.availability}</span>` : ""}
    </div>
    ${statistics?.length ? `<div class="sidebar-section"><div style="display:grid;grid-template-columns:1fr 1fr;">${statistics.slice(0, 4).map(s => `<div class="stat-box"><div style="font-size:18px;">${s.icon}</div><div class="stat-val">${s.value}${s.suffix}</div><div class="stat-lbl">${s.label}</div></div>`).join("")}</div></div>` : ""}
    <div class="sidebar-section">
      <div class="sidebar-label">Contact</div>
      ${hero?.email ? `<p style="font-size:12px;opacity:0.9;margin-bottom:6px;word-break:break-all;">✉️ ${hero.email}</p>` : ""}
      ${hero?.phone ? `<p style="font-size:12px;opacity:0.9;margin-bottom:6px;">📞 ${hero.phone}</p>` : ""}
      ${hero?.location ? `<p style="font-size:12px;opacity:0.9;">📍 ${hero.location}</p>` : ""}
    </div>
    ${Object.values(socials || {}).some(Boolean) ? `<div class="sidebar-section"><div class="sidebar-label">Links</div>${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank">→ ${k}</a>`).join("")}</div>` : ""}
    ${skillCategories?.length ? `<div class="sidebar-section"><div class="sidebar-label">Skills</div>${skillCategories.map(cat => `<p style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);margin-bottom:8px;">${cat.category}</p>${cat.skills?.map(s => `<div style="margin-bottom:6px;"><div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.85);margin-bottom:2px;"><span>${s.name}</span><span>${s.level}%</span></div><div class="skill-bar-bg"><div class="skill-bar" style="width:${s.level}%;"></div></div></div>`).join("")}`).join("")}</div>` : ""}
    ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="resume-btn">📄 Download Resume</a>` : ""}
  </div>
  <div class="main">
    ${about?.description ? `<div class="section"><div class="section-label">About</div><p class="muted" style="line-height:1.8;font-size:15px;">${about.description}</p></div>` : ""}
    ${projects?.length ? `<div class="section"><div class="section-label">Projects</div>${projects.map(p => `<div class="card" style="padding:0;overflow:hidden;">${p.image ? `<img src="${p.image}" class="project-img" alt="${p.title}" />` : ""}<div style="padding:18px;"><h3 style="font-weight:700;font-size:15px;margin-bottom:6px;">${p.title || ""}${p.featured ? `<span style="font-size:10px;background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:9999px;margin-left:8px;">Featured</span>` : ""}</h3><p class="muted" style="font-size:13px;margin-bottom:8px;">${p.description || ""}</p>${p.techStack?.length ? `<div style="margin-bottom:8px;">${p.techStack.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}${(p.caseStudy?.problem || p.caseStudy?.solution) ? `<div class="case-study"><p style="font-size:10px;font-weight:700;color:${primary};margin-bottom:5px;">CASE STUDY</p>${p.caseStudy.problem ? `<p style="color:${textMuted};margin-bottom:3px;"><strong style="color:${text};">Problem:</strong> ${p.caseStudy.problem}</p>` : ""}${p.caseStudy.solution ? `<p style="color:${textMuted};margin-bottom:3px;"><strong style="color:${text};">Solution:</strong> ${p.caseStudy.solution}</p>` : ""}${p.caseStudy.result ? `<p style="color:${textMuted};"><strong style="color:${text};">Result:</strong> ${p.caseStudy.result}</p>` : ""}</div>` : ""}<div style="display:flex;gap:8px;">${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn-primary">🔗 Live</a>` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="btn-outline">💻 Code</a>` : ""}</div></div></div>`).join("")}</div>` : ""}
    ${achievements?.length ? `<div class="section"><div class="section-label">Achievements</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">${achievements.map(a => `<div class="card"><div style="font-size:20px;margin-bottom:6px;">${a.type === "award" ? "🏆" : "🎓"}</div><h3 style="font-weight:600;font-size:13px;margin-bottom:3px;">${a.title}</h3><p class="accent" style="font-size:11px;">${a.issuer}</p><p class="muted" style="font-size:11px;">${a.date}</p>${a.link ? `<a href="${a.link}" target="_blank" class="accent" style="font-size:11px;text-decoration:none;font-weight:600;">View →</a>` : ""}</div>`).join("")}</div></div>` : ""}
    ${education?.length ? `<div class="section"><div class="section-label">Education</div>${education.map(e => `<div class="card" style="display:flex;gap:12px;"><div style="font-size:24px;flex-shrink:0;">🎓</div><div><h3 style="font-weight:700;font-size:14px;">${e.institution}</h3><p class="accent" style="font-size:12px;">${e.degree}${e.field ? ` · ${e.field}` : ""}</p><p class="muted" style="font-size:11px;">${e.year}${e.grade ? ` · ${e.grade}` : ""}</p></div></div>`).join("")}</div>` : ""}
    ${testimonials?.length ? `<div class="section"><div class="section-label">Testimonials</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">${testimonials.map(t => `<div class="card"><div class="stars">${"★".repeat(t.rating || 5)}</div><p class="muted" style="font-style:italic;font-size:13px;margin-bottom:10px;">"${t.message}"</p><p style="font-weight:700;font-size:13px;">${t.name}</p><p class="muted" style="font-size:12px;">${t.role}${t.company ? ` · ${t.company}` : ""}</p></div>`).join("")}</div></div>` : ""}
    <div class="contact-box">
      <h2 style="font-size:20px;font-weight:700;margin-bottom:8px;">Get In Touch</h2>
      <p class="muted" style="margin-bottom:16px;">${contact?.availability || "Open to opportunities"}</p>
      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
        ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" class="btn-primary" style="padding:10px 24px;">✉️ Email Me</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline" style="padding:10px 24px;">📄 Resume</a>` : ""}
      </div>
    </div>
  </div>
</body>
</html>`;

  downloadHTML(html, hero?.name, "modern");
};

// ── Creative Export ───────────────────────────
const exportCreative = (data) => {
  const { hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl } = data;
  const { isDark, primary, font, btnRadius, bg, cardBg, text, textMuted, border } = getTheme(theme);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"} - Creative</title>
  ${fontLink(font)}
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'${font}',sans-serif;background:${bg};color:${text};}
    .hero-section{background:linear-gradient(135deg,${primary}25 0%,transparent 60%);min-height:100vh;display:flex;align-items:center;padding:60px 48px;}
    .hero-inner{max-width:680px;}
    .hero-img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:24px;border:3px solid ${primary};}
    .badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:9999px;background:${primary}20;margin-bottom:20px;}
    .badge-dot{width:6px;height:6px;border-radius:50%;background:${primary};display:inline-block;}
    .badge span{font-size:12px;color:${primary};font-weight:600;}
    h1{font-size:52px;font-weight:900;line-height:1.05;margin-bottom:16px;}
    .role{font-size:20px;color:${primary};font-weight:600;margin-bottom:16px;}
    .bio{color:${textMuted};font-size:15px;line-height:1.7;max-width:520px;margin-bottom:28px;}
    .btn-primary{padding:14px 32px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:14px;font-weight:700;text-decoration:none;display:inline-block;margin-right:10px;}
    .btn-outline{padding:14px 32px;border-radius:${btnRadius};border:2px solid ${border};color:${textMuted};font-size:14px;font-weight:700;text-decoration:none;display:inline-block;}
    .main{max-width:900px;margin:0 auto;padding:80px 48px;}
    .stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));border-radius:20px;border:1px solid ${border};background:${cardBg};overflow:hidden;margin-bottom:80px;}
    .stat-item{text-align:center;padding:24px 16px;border-right:1px solid ${border};}
    .stat-val{font-size:28px;font-weight:900;color:${primary};}
    .stat-lbl{font-size:12px;color:${textMuted};margin-top:4px;}
    .section{margin-bottom:80px;}
    .section-tag{display:inline-block;padding:4px 14px;border-radius:9999px;background:${primary}15;border:1px solid ${primary}30;margin-bottom:16px;}
    .section-tag span{font-size:11px;font-weight:700;color:${primary};letter-spacing:0.1em;text-transform:uppercase;}
    .card{padding:28px;border-radius:20px;background:${cardBg};border:1px solid ${border};margin-bottom:16px;position:relative;overflow:hidden;}
    .card-stripe{position:absolute;top:0;left:0;width:4px;height:100%;background:${primary};}
    .tag{display:inline-block;padding:4px 12px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;margin:2px;}
    .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
    .skill-bar-bg{height:5px;border-radius:9999px;background:${primary}20;margin-top:4px;}
    .skill-bar{height:100%;border-radius:9999px;background:${primary};}
    .project-img{width:100%;height:220px;object-fit:cover;}
    .muted{color:${textMuted};}
    .accent{color:${primary};}
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:48px;}
    .case-study{padding:14px 16px;border-radius:10px;background:${isDark ? "#1a1a1a" : "#f8f8f8"};margin:12px 0;font-size:13px;}
    .case-label{font-size:10px;font-weight:700;letter-spacing:0.1em;color:${primary};margin-bottom:6px;}
    .contact-section{padding:60px 40px;border-radius:24px;background:linear-gradient(135deg,${primary}20,transparent);border:1px solid ${border};text-align:center;}
    .social-link{display:inline-block;padding:8px 16px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;font-weight:600;text-decoration:none;margin:4px;text-transform:capitalize;}
    .stars{color:#f59e0b;font-size:14px;}
    @media(max-width:768px){h1{font-size:36px;}.two-col{grid-template-columns:1fr;}.skills-grid{grid-template-columns:1fr;}.main{padding:40px 24px;}.hero-section{padding:40px 24px;}}
  </style>
</head>
<body>
  <div class="hero-section">
    <div class="hero-inner">
      ${hero?.profileImage ? `<img src="${hero.profileImage}" class="hero-img" alt="${hero.name}" />` : ""}
      <div class="badge"><span class="badge-dot"></span><span>${contact?.availability || "Available for work"}</span></div>
      <h1>${hero?.name || "Your Name"}</h1>
      <div class="role">${hero?.role || hero?.tagline || ""}</div>
      <p class="bio">${hero?.bio || ""}</p>
      <div style="margin-bottom:24px;">
        ${hero?.ctaText ? `<a href="${hero.ctaLink || "#projects"}" class="btn-primary">${hero.ctaText}</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">📄 ${hero?.ctaSecondaryText || "Resume"}</a>` : ""}
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        ${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank" style="color:${textMuted};font-size:13px;font-weight:500;text-decoration:none;text-transform:capitalize;">${k} ↗</a>`).join("")}
      </div>
    </div>
  </div>
  <div class="main">
    ${statistics?.length ? `<div class="stats-row">${statistics.map((s, i) => `<div class="stat-item" style="${i === statistics.length - 1 ? "border-right:none;" : ""}"><div style="font-size:24px;">${s.icon}</div><div class="stat-val">${s.value}${s.suffix}</div><div class="stat-lbl">${s.label}</div></div>`).join("")}</div>` : ""}
    ${(about?.description || about?.highlights?.length) ? `<div class="section"><div class="section-tag"><span>About Me</span></div><div style="display:grid;grid-template-columns:3fr 2fr;gap:48px;"><div><p class="muted" style="font-size:16px;line-height:1.8;">${about?.description || ""}</p></div><div>${about?.highlights?.map(h => `<div style="display:flex;gap:10px;margin-bottom:10px;"><span style="color:${primary};font-weight:700;">→</span><span class="muted" style="font-size:14px;">${h}</span></div>`).join("") || ""}${hero?.email ? `<p class="muted" style="font-size:13px;margin-top:14px;">✉️ ${hero.email}</p>` : ""}${hero?.location ? `<p class="muted" style="font-size:13px;margin-top:6px;">📍 ${hero.location}</p>` : ""}</div></div></div>` : ""}
    ${skillCategories?.length ? `<div class="section"><div class="section-tag"><span>Tech Stack</span></div><div class="skills-grid">${skillCategories.map(cat => `<div class="card" style="position:static;"><h3 style="font-weight:700;margin-bottom:16px;font-size:15px;">${cat.category}</h3>${cat.skills?.map(s => `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:13px;color:${textMuted};margin-bottom:4px;"><span>${s.name}</span><span style="color:${primary};font-weight:600;">${s.level}%</span></div><div class="skill-bar-bg"><div class="skill-bar" style="width:${s.level}%;"></div></div></div>`).join("")}</div>`).join("")}</div></div>` : ""}
    ${projects?.length ? `<div class="section"><div class="section-tag"><span>Selected Work</span></div>${projects.map(p => `<div class="card">${p.image ? `<img src="${p.image}" class="project-img" style="border-radius:12px;margin-bottom:16px;" alt="${p.title}" />` : ""}<div class="card-stripe"></div><h3 style="font-weight:800;font-size:18px;margin-bottom:8px;">${p.title || ""}${p.featured ? `<span style="font-size:11px;background:${primary}20;color:${primary};padding:3px 10px;border-radius:9999px;margin-left:8px;font-weight:600;">Featured</span>` : ""}</h3><p class="muted" style="font-size:14px;line-height:1.7;margin-bottom:12px;">${p.description || ""}</p>${p.techStack?.length ? `<div style="margin-bottom:12px;">${p.techStack.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}${(p.caseStudy?.problem || p.caseStudy?.solution) ? `<div class="case-study"><p class="case-label">CASE STUDY</p>${p.caseStudy.problem ? `<p class="muted" style="margin-bottom:3px;"><strong style="color:${text};">Problem —</strong> ${p.caseStudy.problem}</p>` : ""}${p.caseStudy.solution ? `<p class="muted" style="margin-bottom:3px;"><strong style="color:${text};">Solution —</strong> ${p.caseStudy.solution}</p>` : ""}${p.caseStudy.result ? `<p class="muted"><strong style="color:${text};">Result —</strong> ${p.caseStudy.result}</p>` : ""}</div>` : ""}<div style="display:flex;gap:12px;">${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" style="padding:8px 20px;border-radius:${btnRadius};background:${primary};color:#fff;font-size:13px;font-weight:700;text-decoration:none;">Live →</a>` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="padding:8px 20px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:13px;font-weight:700;text-decoration:none;">GitHub →</a>` : ""}</div></div>`).join("")}</div>` : ""}
    <div class="two-col">
      ${achievements?.length ? `<div><div class="section-tag"><span>Achievements</span></div><div style="margin-top:16px;">${achievements.map(a => `<div class="card" style="margin-bottom:12px;"><div style="font-size:22px;margin-bottom:6px;">${a.type === "award" ? "🏆" : "🎓"}</div><h3 style="font-weight:700;font-size:14px;">${a.title}</h3><p class="accent" style="font-size:12px;">${a.issuer}</p><p class="muted" style="font-size:11px;">${a.date}</p></div>`).join("")}</div></div>` : ""}
      ${education?.length ? `<div><div class="section-tag"><span>Education</span></div><div style="margin-top:16px;">${education.map(e => `<div class="card" style="margin-bottom:12px;"><div style="font-size:22px;margin-bottom:6px;">🎓</div><h3 style="font-weight:700;font-size:14px;">${e.institution}</h3><p class="accent" style="font-size:12px;">${e.degree}${e.field ? ` · ${e.field}` : ""}</p><p class="muted" style="font-size:11px;">${e.year}</p></div>`).join("")}</div></div>` : ""}
    </div>
    ${testimonials?.length ? `<div class="section" style="margin-top:48px;"><div class="section-tag"><span>Testimonials</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;">${testimonials.map(t => `<div class="card"><div class="stars" style="margin-bottom:10px;">${"★".repeat(t.rating || 5)}</div><p class="muted" style="font-size:14px;line-height:1.7;margin-bottom:14px;">${t.message}</p><p style="font-weight:700;font-size:13px;">${t.name}</p><p class="muted" style="font-size:12px;">${t.role}${t.company ? ` · ${t.company}` : ""}</p></div>`).join("")}</div></div>` : ""}
    <div class="contact-section">
      <h2 style="font-size:32px;font-weight:900;margin-bottom:12px;">Let's build something great</h2>
      <p class="muted" style="font-size:16px;margin-bottom:28px;">${contact?.availability || "Open to new opportunities"}</p>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
        ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" style="padding:14px 36px;border-radius:${btnRadius};background:${primary};color:#fff;font-weight:700;font-size:15px;text-decoration:none;">✉️ Get in Touch</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" style="padding:14px 36px;border-radius:${btnRadius};border:2px solid ${border};color:${textMuted};font-weight:700;font-size:15px;text-decoration:none;">📄 Resume</a>` : ""}
      </div>
      <div style="margin-top:20px;">${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank" class="social-link">${k}</a>`).join("")}</div>
    </div>
  </div>
</body>
</html>`;

  downloadHTML(html, hero?.name, "creative");
};

// ── Advanced Export ───────────────────────────
const exportAdvanced = (data) => {
  const { hero, about, skillCategories, projects, achievements,
    education, statistics, testimonials, contact, socials, theme, resumeUrl } = data;
  const { isDark, primary, secondary, font, btnRadius, bg, cardBg, text, textMuted, border } = getTheme(theme);
  const gradient = `linear-gradient(135deg, ${primary}, ${secondary})`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${hero?.name || "Portfolio"} - Advanced</title>
  ${fontLink(font)}
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'${font}',sans-serif;background:${bg};color:${text};}
    nav{position:sticky;top:0;z-index:100;background:${isDark ? "rgba(8,11,20,0.95)" : "rgba(255,255,255,0.95)"};backdrop-filter:blur(12px);border-bottom:1px solid ${border};padding:0 40px;}
    .nav-inner{max-width:1100px;margin:0 auto;height:60px;display:flex;align-items:center;justify-content:space-between;}
    .nav-logo{font-weight:800;font-size:16px;background:${gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .nav-links{display:flex;gap:28px;}
    .nav-links a{font-size:13px;font-weight:500;color:${textMuted};text-decoration:none;}
    .hero-section{min-height:100vh;display:flex;align-items:center;padding:80px 40px;position:relative;overflow:hidden;}
    .hero-bg{position:absolute;top:-20%;right:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,${primary}25,transparent 70%);pointer-events:none;}
    .hero-bg2{position:absolute;bottom:-10%;left:-5%;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,${secondary}20,transparent 70%);pointer-events:none;}
    .hero-inner{max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center;position:relative;z-index:1;}
    .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:9999px;background:${primary}15;border:1px solid ${primary}30;margin-bottom:24px;}
    .badge-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;box-shadow:0 0 6px #22c55e;}
    .badge-text{font-size:12px;color:${primary};font-weight:600;}
    h1{font-size:56px;font-weight:900;line-height:1.05;margin-bottom:16px;}
    .gradient-text{background:${gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .role{font-size:22px;color:${textMuted};font-weight:500;margin-bottom:20px;}
    .bio{color:${textMuted};font-size:16px;line-height:1.8;max-width:540px;margin-bottom:32px;}
    .hero-img{width:280px;height:280px;border-radius:30px;object-fit:cover;border:3px solid ${border};box-shadow:0 24px 60px ${primary}30;}
    .btn-primary{padding:14px 32px;border-radius:${btnRadius};background:${gradient};color:#fff;font-size:15px;font-weight:700;text-decoration:none;display:inline-block;margin-right:10px;box-shadow:0 8px 24px ${primary}40;}
    .btn-outline{padding:14px 32px;border-radius:${btnRadius};border:2px solid ${border};color:${textMuted};font-size:15px;font-weight:700;text-decoration:none;display:inline-block;}
    .social-link{display:inline-block;padding:8px 16px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:12px;font-weight:600;text-decoration:none;margin:4px;text-transform:capitalize;}
    .stats-bar{background:${gradient};padding:36px 40px;}
    .stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0;}
    .stat-item{text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,0.2);}
    .stat-item:last-child{border-right:none;}
    .stat-val{font-size:26px;font-weight:900;color:#fff;}
    .stat-lbl{font-size:11px;color:rgba(255,255,255,0.65);margin-top:3px;}
    .main{max-width:1100px;margin:0 auto;padding:80px 40px;}
    .section{margin-bottom:80px;}
    .section-badge{display:inline-block;padding:4px 14px;border-radius:9999px;background:${primary}15;border:1px solid ${primary}30;margin-bottom:14px;}
    .section-badge span{font-size:12px;font-weight:700;color:${primary};letter-spacing:0.1em;text-transform:uppercase;}
    .section-title{font-size:32px;font-weight:800;margin-bottom:28px;}
    .card{padding:22px;border-radius:16px;background:${cardBg};border:1px solid ${border};margin-bottom:14px;}
    .tag{display:inline-block;padding:3px 10px;border-radius:${btnRadius};background:${primary}15;color:${primary};font-size:11px;font-weight:600;margin:2px;}
    .skill-bar-bg{height:6px;border-radius:9999px;background:${primary}15;}
    .skill-bar{height:100%;border-radius:9999px;background:${gradient};}
    .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .project-grid{display:grid;gap:24px;}
    .project-card{border-radius:20px;background:${cardBg};border:1px solid ${border};overflow:hidden;display:grid;grid-template-columns:2fr 3fr;}
    .project-img{width:100%;height:100%;object-fit:cover;min-height:200px;}
    .project-body{padding:28px;}
    .edu-timeline{position:relative;}
    .edu-timeline::before{content:"";position:absolute;left:22px;top:0;bottom:0;width:2px;background:${gradient};}
    .edu-item{display:flex;gap:24px;margin-bottom:24px;position:relative;}
    .edu-icon{width:44px;height:44px;border-radius:50%;background:${gradient};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;z-index:1;box-shadow:0 4px 12px ${primary}40;}
    .ach-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
    .test-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    .stars{color:#f59e0b;font-size:14px;}
    .case-study{padding:14px;border-radius:12px;background:${primary}08;border:1px solid ${primary}20;margin:12px 0;}
    .case-label{font-size:10px;font-weight:700;color:${primary};letter-spacing:0.1em;margin-bottom:6px;}
    .contact-section{padding:60px 48px;border-radius:28px;background:${gradient};text-align:center;}
    .muted{color:${textMuted};}
    .accent{color:${primary};}
    @media(max-width:900px){.hero-inner{grid-template-columns:1fr;}.hero-img{display:none;}.project-card{grid-template-columns:1fr;}.ach-grid{grid-template-columns:1fr 1fr;}.skills-grid{grid-template-columns:1fr;}.main{padding:40px 24px;}.hero-section{padding:60px 24px;}}
  </style>
</head>
<body>
  <nav><div class="nav-inner">
    <span class="nav-logo">${hero?.name?.split(" ")[0] || "Portfolio"}</span>
    <div class="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
    ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" style="padding:8px 18px;border-radius:${btnRadius};background:${gradient};color:#fff;font-size:12px;font-weight:700;text-decoration:none;">Resume ↓</a>` : ""}
  </div></nav>
  <div class="hero-section">
    <div class="hero-bg"></div><div class="hero-bg2"></div>
    <div class="hero-inner">
      <div>
        <div class="hero-badge"><span class="badge-dot"></span><span class="badge-text">${contact?.availability || "Available for work"}</span></div>
        <h1>Hi, I'm <span class="gradient-text">${hero?.name || "Your Name"}</span></h1>
        <div class="role">${hero?.role || hero?.tagline || ""}</div>
        <p class="bio">${hero?.bio || ""}</p>
        <div style="margin-bottom:28px;">
          ${hero?.ctaText ? `<a href="${hero.ctaLink || "#projects"}" class="btn-primary">${hero.ctaText} →</a>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" class="btn-outline">📄 ${hero?.ctaSecondaryText || "Resume"}</a>` : ""}
        </div>
        <div>${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank" class="social-link">${k}</a>`).join("")}</div>
      </div>
      ${hero?.profileImage ? `<div><img src="${hero.profileImage}" class="hero-img" alt="${hero.name}" /></div>` : ""}
    </div>
  </div>
  ${statistics?.length ? `<div class="stats-bar"><div class="stats-inner">${statistics.map(s => `<div class="stat-item"><div style="font-size:22px;margin-bottom:4px;">${s.icon}</div><div class="stat-val">${s.value}${s.suffix}</div><div class="stat-lbl">${s.label}</div></div>`).join("")}</div></div>` : ""}
  <div class="main">
    ${(about?.description) ? `<div class="section" id="about"><div class="section-badge"><span>About Me</span></div><div style="display:grid;grid-template-columns:3fr 2fr;gap:60px;"><div><h2 class="section-title">Passionate about building <span class="gradient-text">great experiences</span></h2><p class="muted" style="font-size:15px;line-height:1.8;">${about.description}</p></div><div class="card">${about?.highlights?.length ? `<p style="font-size:12px;font-weight:700;color:${primary};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;">Highlights</p>${about.highlights.map(h => `<div style="display:flex;gap:10px;margin-bottom:8px;"><span style="width:6px;height:6px;border-radius:50%;background:${primary};margin-top:7px;flex-shrink:0;"></span><span class="muted" style="font-size:14px;">${h}</span></div>`).join("")}` : ""}${hero?.email ? `<p class="muted" style="font-size:13px;margin-top:14px;padding-top:14px;border-top:1px solid ${border};">✉️ ${hero.email}</p>` : ""}${hero?.location ? `<p class="muted" style="font-size:13px;margin-top:6px;">📍 ${hero.location}</p>` : ""}</div></div></div>` : ""}
    ${skillCategories?.length ? `<div class="section" id="skills"><div class="section-badge"><span>Skills</span></div><h2 class="section-title">My Tech Stack</h2><div class="skills-grid">${skillCategories.map(cat => `<div class="card"><h3 style="font-weight:700;margin-bottom:14px;font-size:15px;">${cat.category}</h3>${cat.skills?.map(s => `<div style="padding:12px;border-radius:10px;background:${isDark ? bg : "#fff"};border:1px solid ${border};margin-bottom:8px;"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:14px;font-weight:600;">${s.name}</span><span style="font-size:13px;font-weight:700;background:${gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${s.level}%</span></div><div class="skill-bar-bg"><div class="skill-bar" style="width:${s.level}%;"></div></div></div>`).join("")}</div>`).join("")}</div></div>` : ""}
    ${projects?.length ? `<div class="section" id="projects"><div class="section-badge"><span>Projects</span></div><h2 class="section-title">Featured Work</h2><div class="project-grid">${projects.map(p => `<div class="project-card">${p.image ? `<img src="${p.image}" class="project-img" alt="${p.title}" />` : ""}<div class="project-body"><h3 style="font-weight:800;font-size:18px;margin-bottom:8px;">${p.title || ""}${p.featured ? `<span style="font-size:10px;background:${gradient};color:#fff;padding:3px 10px;border-radius:9999px;margin-left:8px;font-weight:700;">★ Featured</span>` : ""}</h3><p class="muted" style="font-size:14px;line-height:1.7;margin-bottom:12px;">${p.description || ""}</p>${p.techStack?.length ? `<div style="margin-bottom:12px;">${p.techStack.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}${(p.caseStudy?.problem || p.caseStudy?.solution) ? `<div class="case-study"><p class="case-label">CASE STUDY</p>${p.caseStudy.problem ? `<p class="muted" style="font-size:12px;margin-bottom:3px;"><strong style="color:${text};">Problem —</strong> ${p.caseStudy.problem}</p>` : ""}${p.caseStudy.solution ? `<p class="muted" style="font-size:12px;margin-bottom:3px;"><strong style="color:${text};">Solution —</strong> ${p.caseStudy.solution}</p>` : ""}${p.caseStudy.result ? `<p class="muted" style="font-size:12px;"><strong style="color:${text};">Result —</strong> ${p.caseStudy.result}</p>` : ""}</div>` : ""}<div style="display:flex;gap:10px;">${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" style="padding:8px 20px;border-radius:${btnRadius};background:${gradient};color:#fff;font-size:13px;font-weight:700;text-decoration:none;box-shadow:0 4px 12px ${primary}30;">🔗 Live Demo</a>` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="padding:8px 20px;border-radius:${btnRadius};border:1px solid ${border};color:${textMuted};font-size:13px;font-weight:700;text-decoration:none;">💻 GitHub</a>` : ""}</div></div></div>`).join("")}</div></div>` : ""}
    ${achievements?.length ? `<div class="section"><div class="section-badge"><span>Achievements</span></div><h2 class="section-title">Certifications</h2><div class="ach-grid">${achievements.map(a => `<div class="card" style="position:relative;overflow:hidden;"><div style="position:absolute;top:0;right:0;width:80px;height:80px;border-radius:0 0 0 80px;background:${primary}10;"></div><div style="font-size:28px;margin-bottom:10px;">${a.type === "award" ? "🏆" : a.type === "achievement" ? "⭐" : "🎓"}</div><h3 style="font-weight:700;font-size:14px;margin-bottom:4px;">${a.title}</h3><p class="accent" style="font-size:12px;">${a.issuer}</p><p class="muted" style="font-size:11px;margin-bottom:8px;">${a.date}</p>${a.link ? `<a href="${a.link}" target="_blank" style="font-size:11px;font-weight:700;color:${primary};text-decoration:none;">View Certificate →</a>` : ""}</div>`).join("")}</div></div>` : ""}
    ${education?.length ? `<div class="section" id="education"><div class="section-badge"><span>Education</span></div><h2 class="section-title">Academic Background</h2><div class="edu-timeline">${education.map(e => `<div class="edu-item"><div class="edu-icon">🎓</div><div class="card" style="flex:1;"><h3 style="font-weight:800;font-size:16px;margin-bottom:4px;">${e.institution}</h3><p style="font-size:14px;font-weight:600;background:${gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px;">${e.degree}${e.field ? ` in ${e.field}` : ""}</p><p class="muted" style="font-size:13px;">${e.year}${e.grade ? ` · GPA: ${e.grade}` : ""}</p>${e.description ? `<p class="muted" style="font-size:13px;margin-top:8px;">${e.description}</p>` : ""}</div></div>`).join("")}</div></div>` : ""}
    ${testimonials?.length ? `<div class="section"><div class="section-badge"><span>Testimonials</span></div><h2 class="section-title">What People Say</h2><div class="test-grid">${testimonials.map(t => `<div class="card" style="position:relative;"><div style="position:absolute;top:16px;right:16px;font-size:40px;opacity:0.08;font-weight:900;color:${primary};line-height:1;">"</div><div class="stars" style="margin-bottom:10px;">${"★".repeat(t.rating || 5)}</div><p class="muted" style="font-size:14px;font-style:italic;line-height:1.7;margin-bottom:16px;">"${t.message}"</p><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:50%;background:${gradient};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px;">${t.name?.charAt(0) || "?"}</div><div><p style="font-weight:700;font-size:14px;">${t.name}</p><p class="muted" style="font-size:12px;">${t.role}${t.company ? ` · ${t.company}` : ""}</p></div></div></div>`).join("")}</div></div>` : ""}
    <div class="contact-section" id="contact">
      <h2 style="font-size:36px;font-weight:900;color:#fff;margin-bottom:12px;">Let's Work Together</h2>
      <p style="color:rgba(255,255,255,0.8);font-size:16px;margin-bottom:32px;">${contact?.availability || "Open to new opportunities"}</p>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
        ${(contact?.email || hero?.email) ? `<a href="mailto:${contact?.email || hero?.email}" style="padding:14px 36px;border-radius:${btnRadius};background:#fff;color:${primary};font-weight:800;font-size:15px;text-decoration:none;">✉️ Get in Touch</a>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" style="padding:14px 36px;border-radius:${btnRadius};border:2px solid rgba(255,255,255,0.5);color:#fff;font-weight:700;font-size:15px;text-decoration:none;">📄 Resume</a>` : ""}
      </div>
      <div style="margin-top:20px;">${Object.entries(socials || {}).filter(([, v]) => v).map(([k, url]) => `<a href="${url}" target="_blank" style="display:inline-block;padding:6px 14px;border-radius:${btnRadius};background:rgba(255,255,255,0.15);color:#fff;font-size:12px;font-weight:600;text-decoration:none;margin:4px;text-transform:capitalize;">${k}</a>`).join("")}</div>
    </div>
  </div>
</body>
</html>`;

  downloadHTML(html, hero?.name, "advanced");
};