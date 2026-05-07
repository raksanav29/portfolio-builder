import { usePortfolio } from "../../context/PortfolioContext";

const emptyAchievement = {
  title: "", issuer: "", date: "",
  description: "", link: "", type: "certification",
};

export default function AchievementsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const achievements = portfolioData?.achievements || [];

  const update = (updated) =>
    setPortfolioData((prev) => ({ ...prev, achievements: updated }));
  const add = () => update([...achievements, { ...emptyAchievement }]);
  const remove = (i) => update(achievements.filter((_, j) => j !== i));
  const handleChange = (i, field, value) =>
    update(achievements.map((a, j) => j === i ? { ...a, [field]: value } : a));

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Achievements & Certifications</h3>
          <p className="text-sm text-gray-500">Certifications and accomplishments</p>
        </div>
        <button onClick={add}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add
        </button>
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-sm text-gray-400">No achievements added yet</p>
        </div>
      )}

      {achievements.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {item.title || `Achievement ${i + 1}`}
            </span>
            <button onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>

          {/* Only 2 types — no award */}
          <div className="flex gap-2">
            {[
              { id: "certification", label: "🎓 Certification" },
              { id: "achievement", label: "⭐ Achievement" },
            ].map((type) => (
              <button key={type.id} onClick={() => handleChange(i, "type", type.id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border-2 transition ${
                  item.type === type.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}>
                {type.label}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
            <input type="text" value={item.title}
              onChange={(e) => handleChange(i, "title", e.target.value)}
              placeholder="AWS Certified Developer" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Issuer / Organization
              </label>
              <input type="text" value={item.issuer}
                onChange={(e) => handleChange(i, "issuer", e.target.value)}
                placeholder="Amazon Web Services" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input type="text" value={item.date}
                onChange={(e) => handleChange(i, "date", e.target.value)}
                placeholder="Dec 2023" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={item.description}
              onChange={(e) => handleChange(i, "description", e.target.value)}
              placeholder="Brief description..." rows={2}
              className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Certificate Link</label>
            <input type="url" value={item.link}
              onChange={(e) => handleChange(i, "link", e.target.value)}
              placeholder="https://certificate-link.com" className={inputClass} />
          </div>
        </div>
      ))}
    </div>
  );
}