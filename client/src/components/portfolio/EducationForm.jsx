import { usePortfolio } from "../../context/PortfolioContext";

const emptyEdu = { institution: "", degree: "", year: "" };

export default function EducationForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const education = portfolioData?.education || [];

  const updateEducation = (updated) => {
    setPortfolioData((prev) => ({ ...prev, education: updated }));
  };

  const addEdu = () => updateEducation([...education, { ...emptyEdu }]);
  const removeEdu = (index) => updateEducation(education.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    updateEducation(education.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Education</h3>
          <p className="text-sm text-gray-500">Your academic background</p>
        </div>
        <button onClick={addEdu}
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

      {education.map((edu, index) => (
        <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Education {index + 1}</span>
            <button onClick={() => removeEdu(index)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
            <input type="text" value={edu.institution} onChange={(e) => handleChange(index, "institution", e.target.value)}
              placeholder="MIT"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
              <input type="text" value={edu.degree} onChange={(e) => handleChange(index, "degree", e.target.value)}
                placeholder="B.Sc Computer Science"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
              <input type="text" value={edu.year} onChange={(e) => handleChange(index, "year", e.target.value)}
                placeholder="2019 - 2023"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}