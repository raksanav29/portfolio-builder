import { usePortfolio } from "../../context/PortfolioContext";

const emptyCategory = { category: "", skills: [] };
const emptySkill = { name: "", level: 80 };

export default function SkillsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const skillCategories = portfolioData?.skillCategories || [];

  const updateCategories = (updated) => {
    setPortfolioData((prev) => ({ ...prev, skillCategories: updated }));
  };

  const addCategory = () => updateCategories([...skillCategories, { ...emptyCategory, skills: [] }]);
  const removeCategory = (ci) => updateCategories(skillCategories.filter((_, i) => i !== ci));

  const updateCategoryName = (ci, value) => {
    updateCategories(skillCategories.map((c, i) => i === ci ? { ...c, category: value } : c));
  };

  const addSkill = (ci) => {
    updateCategories(skillCategories.map((c, i) =>
      i === ci ? { ...c, skills: [...c.skills, { ...emptySkill }] } : c
    ));
  };

  const removeSkill = (ci, si) => {
    updateCategories(skillCategories.map((c, i) =>
      i === ci ? { ...c, skills: c.skills.filter((_, j) => j !== si) } : c
    ));
  };

  const updateSkill = (ci, si, field, value) => {
    updateCategories(skillCategories.map((c, i) =>
      i === ci ? {
        ...c,
        skills: c.skills.map((s, j) =>
          j === si ? { ...s, [field]: value } : s
        )
      } : c
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Skills</h3>
          <p className="text-sm text-gray-500">Group your skills by category</p>
        </div>
        <button onClick={addCategory}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Category
        </button>
      </div>

      {skillCategories.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-sm text-gray-400">No skill categories yet</p>
          <p className="text-xs text-gray-400">e.g. Frontend, Backend, Tools</p>
        </div>
      )}

      {skillCategories.map((category, ci) => (
        <div key={ci} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          {/* Category Header */}
          <div className="flex items-center gap-2">
            <input type="text" value={category.category}
              onChange={(e) => updateCategoryName(ci, e.target.value)}
              placeholder="Category name (e.g. Frontend)"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            <button onClick={() => removeCategory(ci)}
              className="text-red-400 hover:text-red-600 text-sm px-2 transition">✕</button>
          </div>

          {/* Skills in this category */}
          <div className="space-y-2">
            {category.skills.map((skill, si) => (
              <div key={si} className="flex items-center gap-2">
                <input type="text" value={skill.name}
                  onChange={(e) => updateSkill(ci, si, "name", e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
                <div className="flex items-center gap-1 w-28">
                  <input type="range" min="0" max="100" value={skill.level}
                    onChange={(e) => updateSkill(ci, si, "level", parseInt(e.target.value))}
                    className="flex-1 accent-indigo-600" />
                  <span className="text-xs text-gray-500 w-8 text-right">{skill.level}%</span>
                </div>
                <button onClick={() => removeSkill(ci, si)}
                  className="text-red-400 hover:text-red-600 text-sm transition">✕</button>
              </div>
            ))}
          </div>

          <button onClick={() => addSkill(ci)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
            + Add Skill
          </button>
        </div>
      ))}
    </div>
  );
}