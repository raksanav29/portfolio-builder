import { usePortfolio } from "../../context/PortfolioContext";

const emptyExp = {
  company: "", role: "", duration: "",
  description: "", location: "", type: "full-time",
};

export default function ExperienceForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const experience = portfolioData?.experience || [];

  const update = (updated) =>
    setPortfolioData((prev) => ({ ...prev, experience: updated }));
  const add = () => update([...experience, { ...emptyExp }]);
  const remove = (i) => update(experience.filter((_, j) => j !== i));
  const handleChange = (i, field, value) =>
    update(experience.map((e, j) => j === i ? { ...e, [field]: value } : e));

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  const jobTypes = ["full-time", "part-time", "contract", "freelance", "internship"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Work Experience</h3>
          <p className="text-sm text-gray-500">Your professional history</p>
        </div>
        <button onClick={add}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">🏢</div>
          <p className="text-sm text-gray-400">No experience added yet</p>
          <p className="text-xs text-gray-400 mt-1">Add your work history</p>
        </div>
      )}

      {experience.map((exp, i) => (
        <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {exp.company ? `${exp.role || "Role"} @ ${exp.company}` : `Experience ${i + 1}`}
            </span>
            <button onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 text-sm transition">Remove</button>
          </div>

          {/* Job Type */}
          <div className="flex gap-2 flex-wrap">
            {jobTypes.map((type) => (
              <button key={type} onClick={() => handleChange(i, "type", type)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full border transition capitalize ${
                  exp.type === type
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}>
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
              <input type="text" value={exp.company}
                onChange={(e) => handleChange(i, "company", e.target.value)}
                placeholder="Google" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Role / Position</label>
              <input type="text" value={exp.role}
                onChange={(e) => handleChange(i, "role", e.target.value)}
                placeholder="Software Engineer" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
              <input type="text" value={exp.duration}
                onChange={(e) => handleChange(i, "duration", e.target.value)}
                placeholder="Jan 2022 - Present" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input type="text" value={exp.location || ""}
                onChange={(e) => handleChange(i, "location", e.target.value)}
                placeholder="Remote / New York" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={exp.description}
              onChange={(e) => handleChange(i, "description", e.target.value)}
              placeholder="What did you work on? Key achievements, responsibilities..."
              rows={3} className={`${inputClass} resize-none`} />
          </div>
        </div>
      ))}
    </div>
  );
}