import { usePortfolio } from "../../context/PortfolioContext";

const COLORS = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Orange", value: "#f97316" },
  { label: "Green", value: "#22c55e" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Yellow", value: "#eab308" },
];

const FONTS = ["Inter", "Roboto", "Poppins", "Playfair Display", "Fira Code", "Lato", "Montserrat"];

const TEMPLATES = [
  { id: "minimal", label: "Minimal", icon: "⬜", desc: "Clean & simple" },
  { id: "modern", label: "Modern", icon: "🔷", desc: "Sidebar layout" },
  { id: "creative", label: "Creative", icon: "🎨", desc: "Bold & artistic" },
  { id: "advanced", label: "Advanced", icon: "⚡", desc: "Premium & gradient" },
];

export default function ThemeForm() {
  const { portfolioData, updateSection, setPortfolioData } = usePortfolio();
  const theme = portfolioData?.theme || {};
  const template = portfolioData?.template || "minimal";

  const handleTheme = (field, value) => updateSection("theme", { [field]: value });
  const handleTemplate = (value) => setPortfolioData((prev) => ({ ...prev, template: value }));

  return (
    <div className="space-y-6">
      {/* Template */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Template</h3>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => handleTemplate(t.id)}
              className={`py-4 px-3 rounded-xl border-2 text-left transition ${
                template === t.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className={`text-sm font-semibold ${template === t.id ? "text-indigo-700" : "text-gray-700"}`}>{t.label}</div>
              <div className="text-xs text-gray-400">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Color Mode</h3>
        <div className="flex gap-3">
          {["light", "dark"].map((mode) => (
            <button key={mode} onClick={() => handleTheme("mode", mode)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition ${
                theme.mode === mode
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}>
              {mode === "light" ? "☀️ Light" : "🌙 Dark"}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Primary Color</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {COLORS.map((color) => (
            <button key={color.value} onClick={() => handleTheme("primaryColor", color.value)} title={color.label}
              className={`w-8 h-8 rounded-full border-2 transition hover:scale-110 ${
                theme.primaryColor === color.value ? "border-gray-800 scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color.value }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={theme.primaryColor || "#6366f1"}
            onChange={(e) => handleTheme("primaryColor", e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
          <span className="text-xs text-gray-500">Custom color</span>
          <span className="text-xs font-mono text-gray-600">{theme.primaryColor || "#6366f1"}</span>
        </div>
      </div>

      {/* Secondary Color (for Advanced template) */}
      {template === "advanced" && (
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-3">Secondary Color <span className="text-xs text-indigo-500">(Advanced template)</span></h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {COLORS.map((color) => (
              <button key={color.value} onClick={() => handleTheme("secondaryColor", color.value)} title={color.label}
                className={`w-8 h-8 rounded-full border-2 transition hover:scale-110 ${
                  theme.secondaryColor === color.value ? "border-gray-800 scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color.value }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input type="color" value={theme.secondaryColor || "#8b5cf6"}
              onChange={(e) => handleTheme("secondaryColor", e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
            <span className="text-xs text-gray-500">Custom secondary color</span>
          </div>
        </div>
      )}

      {/* Font */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Font Family</h3>
        <select value={theme.fontFamily || "Inter"} onChange={(e) => handleTheme("fontFamily", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
        </select>
        <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: theme.fontFamily }}>
          Preview: The quick brown fox jumps over the lazy dog.
        </p>
      </div>

      {/* Button Style */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Button Style</h3>
        <div className="flex gap-3">
          {[
            { id: "rounded", label: "Rounded", radius: "8px" },
            { id: "sharp", label: "Sharp", radius: "0px" },
            { id: "pill", label: "Pill", radius: "9999px" },
          ].map((style) => (
            <button key={style.id} onClick={() => handleTheme("buttonStyle", style.id)}
              className={`flex-1 py-2.5 text-sm font-medium border-2 transition ${
                theme.buttonStyle === style.id
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={{ borderRadius: style.radius }}>
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}