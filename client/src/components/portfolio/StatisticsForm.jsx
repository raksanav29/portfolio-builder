import { usePortfolio } from "../../context/PortfolioContext";

const emptyStats = { label: "", value: "", suffix: "+", icon: "⭐" };
const ICONS = ["⭐", "🚀", "💼", "🏆", "👥", "☕", "💻", "📦", "🌍", "❤️"];

export default function StatisticsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const statistics = portfolioData?.statistics || [];

  const update = (updated) => setPortfolioData((prev) => ({ ...prev, statistics: updated }));
  const add = () => update([...statistics, { ...emptyStats }]);
  const remove = (i) => update(statistics.filter((_, j) => j !== i));
  const handleChange = (i, field, value) => {
    update(statistics.map((s, j) => j === i ? { ...s, [field]: value } : s));
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Statistics</h3>
          <p className="text-sm text-gray-500">Animated counters shown on your portfolio</p>
        </div>
        <button onClick={add}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Stat
        </button>
      </div>

      {statistics.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">📊</div>
          <p className="text-sm text-gray-400">No statistics added yet</p>
          <p className="text-xs text-gray-400 mt-1">e.g. 50+ Projects, 3+ Years, 100% Clients</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {statistics.map((stat, i) => (
          <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Stat {i + 1}</span>
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
            </div>

            {/* Icon picker */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon) => (
                  <button key={icon} onClick={() => handleChange(i, "icon", icon)}
                    className={`w-8 h-8 text-lg rounded-lg border-2 transition ${
                      stat.icon === icon ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                    }`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <input type="text" value={stat.value} onChange={(e) => handleChange(i, "value", e.target.value)}
                  placeholder="50" className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Suffix</label>
                <input type="text" value={stat.suffix} onChange={(e) => handleChange(i, "suffix", e.target.value)}
                  placeholder="+" className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => handleChange(i, "label", e.target.value)}
                  placeholder="Projects" className={inputClass} />
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-indigo-600">{stat.value || "0"}{stat.suffix}</div>
              <div className="text-xs text-gray-500">{stat.label || "Label"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}