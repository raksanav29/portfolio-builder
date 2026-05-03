// import { usePortfolio } from "../../context/PortfolioContext";

// export default function LivePreview() {
//   const { portfolioData } = usePortfolio();

//   if (!portfolioData) return null;

//   const { hero, skills, projects, experience, education, theme, template } = portfolioData;

//   const isDark = theme?.mode === "dark";
//   const primary = theme?.primaryColor || "#6366f1";
//   const font = theme?.fontFamily || "Inter";
//   const btnStyle = theme?.buttonStyle || "rounded";

//   const btnRadius = btnStyle === "pill" ? "9999px" : btnStyle === "sharp" ? "0px" : "8px";

//   const bg = isDark ? "#0f172a" : "#ffffff";
//   const cardBg = isDark ? "#1e293b" : "#f8fafc";
//   const textPrimary = isDark ? "#f1f5f9" : "#0f172a";
//   const textSecondary = isDark ? "#94a3b8" : "#64748b";
//   const borderColor = isDark ? "#334155" : "#e2e8f0";

//   return (
//     <div
//       className="h-full overflow-y-auto text-sm"
//       style={{ backgroundColor: bg, color: textPrimary, fontFamily: font }}
//     >
//       {/* Hero Section */}
//       <div style={{ borderBottom: `1px solid ${borderColor}`, padding: "40px 32px" }}>
//         <div style={{ marginBottom: "8px" }}>
//           <h1 style={{ fontSize: "28px", fontWeight: "700", color: textPrimary, marginBottom: "6px" }}>
//             {hero?.name || "Your Name"}
//           </h1>
//           <p style={{ fontSize: "16px", color: primary, fontWeight: "500", marginBottom: "12px" }}>
//             {hero?.tagline || "Your Tagline"}
//           </p>
//           <p style={{ color: textSecondary, lineHeight: "1.6", marginBottom: "16px", maxWidth: "500px" }}>
//             {hero?.bio || "Your bio will appear here..."}
//           </p>
//           {/* Contact info */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
//             {hero?.location && (
//               <span style={{ color: textSecondary, fontSize: "13px" }}>📍 {hero.location}</span>
//             )}
//             {hero?.email && (
//               <span style={{ color: textSecondary, fontSize: "13px" }}>✉️ {hero.email}</span>
//             )}
//           </div>
//           {/* Social links */}
//           <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//             {portfolioData?.socials?.github && (
//               <span style={{ padding: "4px 12px", borderRadius: btnRadius, border: `1px solid ${primary}`, color: primary, fontSize: "12px" }}>
//                 GitHub
//               </span>
//             )}
//             {portfolioData?.socials?.linkedin && (
//               <span style={{ padding: "4px 12px", borderRadius: btnRadius, border: `1px solid ${primary}`, color: primary, fontSize: "12px" }}>
//                 LinkedIn
//               </span>
//             )}
//             {portfolioData?.socials?.twitter && (
//               <span style={{ padding: "4px 12px", borderRadius: btnRadius, border: `1px solid ${primary}`, color: primary, fontSize: "12px" }}>
//                 Twitter
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Skills Section */}
//       {skills?.length > 0 && (
//         <div style={{ padding: "28px 32px", borderBottom: `1px solid ${borderColor}` }}>
//           <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: textPrimary }}>
//             Skills
//           </h2>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//             {skills.map((skill) => (
//               <span key={skill}
//                 style={{
//                   padding: "4px 12px", borderRadius: btnRadius,
//                   backgroundColor: `${primary}20`, color: primary,
//                   fontSize: "12px", fontWeight: "500",
//                 }}>
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Projects Section */}
//       {projects?.length > 0 && (
//         <div style={{ padding: "28px 32px", borderBottom: `1px solid ${borderColor}` }}>
//           <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: textPrimary }}>
//             Projects
//           </h2>
//           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//             {projects.map((project, i) => (
//               <div key={i} style={{ padding: "16px", borderRadius: "10px", backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
//                 <h3 style={{ fontWeight: "600", marginBottom: "4px", color: textPrimary }}>{project.title || "Project Title"}</h3>
//                 <p style={{ color: textSecondary, fontSize: "12px", marginBottom: "8px" }}>{project.description}</p>
//                 {project.techStack?.length > 0 && (
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//                     {project.techStack.map((tech) => (
//                       <span key={tech} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", backgroundColor: `${primary}15`, color: primary }}>
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Experience Section */}
//       {experience?.length > 0 && (
//         <div style={{ padding: "28px 32px", borderBottom: `1px solid ${borderColor}` }}>
//           <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: textPrimary }}>
//             Experience
//           </h2>
//           {experience.map((exp, i) => (
//             <div key={i} style={{ marginBottom: "16px", paddingLeft: "12px", borderLeft: `2px solid ${primary}` }}>
//               <h3 style={{ fontWeight: "600", color: textPrimary }}>{exp.role}</h3>
//               <p style={{ color: primary, fontSize: "13px" }}>{exp.company}</p>
//               <p style={{ color: textSecondary, fontSize: "12px", marginBottom: "4px" }}>{exp.duration}</p>
//               <p style={{ color: textSecondary, fontSize: "12px" }}>{exp.description}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Education Section */}
//       {education?.length > 0 && (
//         <div style={{ padding: "28px 32px" }}>
//           <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: textPrimary }}>
//             Education
//           </h2>
//           {education.map((edu, i) => (
//             <div key={i} style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid ${primary}` }}>
//               <h3 style={{ fontWeight: "600", color: textPrimary }}>{edu.institution}</h3>
//               <p style={{ color: textSecondary, fontSize: "13px" }}>{edu.degree}</p>
//               <p style={{ color: textSecondary, fontSize: "12px" }}>{edu.year}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { usePortfolio } from "../../context/PortfolioContext";
import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";

export default function LivePreview() {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;

  const template = portfolioData?.template || "minimal";

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={portfolioData} />;
      case "creative":
        return <CreativeTemplate data={portfolioData} />;
      default:
        return <MinimalTemplate data={portfolioData} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderTemplate()}
    </div>
  );
}