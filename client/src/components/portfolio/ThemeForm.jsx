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
];

const FONTS = ["Inter", "Roboto", "Poppins", "Playfair Display", "Fira Code"];

export default function ThemeForm() {
  const { portfolioData, updateSection, setPortfolioData } = usePortfolio();
  const theme = portfolioData?.theme || {};
  const template = portfolioData?.template || "minimal";

  const handleTheme = (field, value) => {
    updateSection("theme", { [field]: value });
  };

  const handleTemplate = (value) => {
    setPortfolioData((prev) => ({ ...prev, template: value }));
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Template</h3>
        <div className="grid grid-cols-3 gap-3">
          {["minimal", "modern", "creative"].map((t) => (
            <button key={t} onClick={() => handleTemplate(t)}
              className={`py-3 px-2 rounded-xl border-2 text-sm font-medium capitalize transition ${
                template === t
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}>
              {t === "minimal" && "⬜"} {t === "modern" && "🔷"} {t === "creative" && "🎨"}
              <div className="mt-1">{t}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Mode</h3>
        <div className="flex gap-3">
          {["light", "dark"].map((mode) => (
            <button key={mode} onClick={() => handleTheme("mode", mode)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition ${
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
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button key={color.value} onClick={() => handleTheme("primaryColor", color.value)}
              title={color.label}
              className={`w-8 h-8 rounded-full border-2 transition ${
                theme.primaryColor === color.value ? "border-gray-800 scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color.value }} />
          ))}
          {/* Custom color picker */}
          <div className="relative">
            <input type="color" value={theme.primaryColor || "#6366f1"}
              onChange={(e) => handleTheme("primaryColor", e.target.value)}
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200" title="Custom color" />
          </div>
        </div>
      </div>

      {/* Font */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Font Family</h3>
        <select value={theme.fontFamily || "Inter"} onChange={(e) => handleTheme("fontFamily", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {FONTS.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      {/* Button Style */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Button Style</h3>
        <div className="flex gap-3">
          {["rounded", "sharp", "pill"].map((style) => (
            <button key={style} onClick={() => handleTheme("buttonStyle", style)}
              className={`flex-1 py-2 text-sm font-medium border-2 transition capitalize ${
                style === "rounded" ? "rounded-lg" : style === "pill" ? "rounded-full" : "rounded-none"
              } ${
                theme.buttonStyle === style
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}>
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}