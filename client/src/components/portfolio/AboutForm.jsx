import { usePortfolio } from "../../context/PortfolioContext";

export default function AboutForm() {
  const { portfolioData, updateSection, setPortfolioData } = usePortfolio();
  const about = portfolioData?.about || {};
  const highlights = about.highlights || [];

  const handleAbout = (e) => updateSection("about", { [e.target.name]: e.target.value });

  const addHighlight = () => {
    updateSection("about", { highlights: [...highlights, ""] });
  };

  const updateHighlight = (index, value) => {
    const updated = highlights.map((h, i) => i === index ? value : h);
    updateSection("about", { highlights: updated });
  };

  const removeHighlight = (index) => {
    updateSection("about", { highlights: highlights.filter((_, i) => i !== index) });
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">About Me</h3>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Section Title</label>
            <input type="text" name="title" value={about.title || ""} onChange={handleAbout}
              placeholder="About Me" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={about.description || ""} onChange={handleAbout} rows={5}
              placeholder="Write a detailed description about yourself, your passion, and what drives you..."
              className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Years of Experience</label>
              <input type="text" name="yearsOfExperience" value={about.yearsOfExperience || ""}
                onChange={handleAbout} placeholder="3+" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Projects Completed</label>
              <input type="text" name="projectsCompleted" value={about.projectsCompleted || ""}
                onChange={handleAbout} placeholder="20+" className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Key Highlights</h3>
            <p className="text-xs text-gray-500">Bullet points shown in About section</p>
          </div>
          <button onClick={addHighlight}
            className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition">
            + Add
          </button>
        </div>

        {highlights.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-400">No highlights added yet</p>
          </div>
        )}

        <div className="space-y-2">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <input type="text" value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder={`Highlight ${index + 1}`}
                className={inputClass} />
              <button onClick={() => removeHighlight(index)}
                className="px-3 py-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}