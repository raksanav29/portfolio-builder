import { usePortfolio } from "../../context/PortfolioContext";

const emptyExp = { company: "", role: "", duration: "", description: "" };

export default function ExperienceForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const experience = portfolioData?.experience || [];

  const updateExperience = (updated) => {
    setPortfolioData((prev) => ({ ...prev, experience: updated }));
  };

  const addExp = () => updateExperience([...experience, { ...emptyExp }]);
  const removeExp = (index) => updateExperience(experience.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    updateExperience(experience.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Experience</h3>
          <p className="text-sm text-gray-500">Your work history</p>
        </div>
        <button onClick={addExp}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">💼</div>
          <p className="text-sm text-gray-400">No experience added yet</p>
        </div>
      )}

      {experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Experience {index + 1}</span>
            <button onClick={() => removeExp(index)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
              <input type="text" value={exp.company} onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="Google"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
              <input type="text" value={exp.role} onChange={(e) => handleChange(index, "role", e.target.value)}
                placeholder="Software Engineer"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
            <input type="text" value={exp.duration} onChange={(e) => handleChange(index, "duration", e.target.value)}
              placeholder="Jan 2022 - Present"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={exp.description} onChange={(e) => handleChange(index, "description", e.target.value)}
              placeholder="What did you do here?" rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none" />
          </div>
        </div>
      ))}
    </div>
  );
}