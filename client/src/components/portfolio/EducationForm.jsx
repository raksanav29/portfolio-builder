import { usePortfolio } from "../../context/PortfolioContext";

const emptyEdu = { institution: "", degree: "", field: "", year: "", grade: "", description: "" };

export default function EducationForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const education = portfolioData?.education || [];

  const update = (updated) => setPortfolioData((prev) => ({ ...prev, education: updated }));
  const add = () => update([...education, { ...emptyEdu }]);
  const remove = (i) => update(education.filter((_, j) => j !== i));
  const handleChange = (i, field, value) => {
    update(education.map((e, j) => j === i ? { ...e, [field]: value } : e));
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Education</h3>
          <p className="text-sm text-gray-500">Your academic background</p>
        </div>
        <button onClick={add}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Education
        </button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">🎓</div>
          <p className="text-sm text-gray-400">No education added yet</p>
        </div>
      )}

      {education.map((edu, i) => (
        <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {edu.institution || `Education ${i + 1}`}
            </span>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
            <input type="text" value={edu.institution} onChange={(e) => handleChange(i, "institution", e.target.value)}
              placeholder="MIT" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
              <input type="text" value={edu.degree} onChange={(e) => handleChange(i, "degree", e.target.value)}
                placeholder="Bachelor's" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Field of Study</label>
              <input type="text" value={edu.field} onChange={(e) => handleChange(i, "field", e.target.value)}
                placeholder="Computer Science" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
              <input type="text" value={edu.year} onChange={(e) => handleChange(i, "year", e.target.value)}
                placeholder="2019 - 2023" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Grade / GPA</label>
              <input type="text" value={edu.grade} onChange={(e) => handleChange(i, "grade", e.target.value)}
                placeholder="3.8 GPA" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={edu.description} onChange={(e) => handleChange(i, "description", e.target.value)}
              placeholder="Activities, achievements, relevant coursework..." rows={2}
              className={`${inputClass} resize-none`} />
          </div>
        </div>
      ))}
    </div>
  );
}