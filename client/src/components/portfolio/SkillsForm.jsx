import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function SkillsForm() {
  const { portfolioData, updateSection } = usePortfolio();
  const skills = portfolioData?.skills || [];
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) { setInput(""); return; }
    updateSection("skills", [...skills, trimmed]);
    setInput("");
  };

  const removeSkill = (skill) => {
    updateSection("skills", skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); }
  };

  // Note: for skills, updateSection works differently — it replaces the array
  // We need to handle this at the context level
  // Override: directly set the skills array
  const { setPortfolioData } = usePortfolio() || {};

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">Skills</h3>
        <p className="text-sm text-gray-500 mb-4">Press Enter or comma to add a skill</p>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React, Node.js, MongoDB"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={addSkill}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
            Add
          </button>
        </div>
      </div>

      {/* Skills tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-200">
              {skill}
              <button onClick={() => removeSkill(skill)}
                className="text-indigo-400 hover:text-indigo-700 leading-none text-base font-medium">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-sm text-gray-400">No skills added yet</p>
        </div>
      )}
    </div>
  );
}