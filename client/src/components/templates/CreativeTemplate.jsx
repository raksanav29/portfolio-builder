export default function CreativeTemplate({ data }) {
  const { hero, skills, projects, experience, education, socials, theme } = data;

  const primary = theme?.primaryColor || "#6366f1";
  const isDark = theme?.mode === "dark";
  const font = theme?.fontFamily || "Inter";
  const btnRadius =
    theme?.buttonStyle === "pill"
      ? "9999px"
      : theme?.buttonStyle === "sharp"
      ? "0px"
      : "8px";

  const bg = isDark ? "#0a0a0a" : "#fafafa";
  const cardBg = isDark ? "#141414" : "#ffffff";
  const text = isDark ? "#ffffff" : "#111111";
  const textMuted = isDark ? "#888888" : "#666666";
  const border = isDark ? "#222222" : "#eeeeee";

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: font, minHeight: "100vh" }}>
      
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${primary}22 0%, ${bg} 60%)`,
          padding: "60px 40px 40px",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: btnRadius,
              backgroundColor: `${primary}22`,
              color: primary,
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "16px",
              letterSpacing: "0.05em",
            }}
          >
            Available for work
          </div>

          <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "16px" }}>
            {hero?.name || "Your Name"}
          </h1>

          <p style={{ fontSize: "20px", color: primary, marginBottom: "16px" }}>
            {hero?.tagline || "Your Tagline"}
          </p>

          <p style={{ color: textMuted, marginBottom: "24px" }}>
            {hero?.bio}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            {projects.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  backgroundColor: cardBg,
                  border: `1px solid ${border}`,
                  marginBottom: "16px",   // ✅ FIXED HERE
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}