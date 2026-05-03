import { usePortfolio } from "../../context/PortfolioContext";

const emptyProject = { title: "", description: "", techStack: [], liveUrl: "", githubUrl: "" };

export default function ProjectsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const projects = portfolioData?.projects || [];

  const updateProjects = (updated) => {
    setPortfolioData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => updateProjects([...projects, { ...emptyProject }]);

  const removeProject = (index) => updateProjects(projects.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    updateProjects(updated);
  };

  const handleTechStack = (index, value) => {
    // Convert comma-separated string to array
    const tech = value.split(",").map((t) => t.trim()).filter(Boolean);
    handleChange(index, "techStack", tech);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Projects</h3>
          <p className="text-sm text-gray-500">Showcase your best work</p>
        </div>
        <button onClick={addProject}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">💼</div>
          <p className="text-sm text-gray-400">No projects yet. Add your first one!</p>
        </div>
      )}

      {projects.map((project, index) => (
        <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Project {index + 1}</span>
            <button onClick={() => removeProject(index)}
              className="text-red-400 hover:text-red-600 text-sm transition">Remove</button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Project Title</label>
            <input type="text" value={project.title} onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="My Awesome Project"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={project.description} onChange={(e) => handleChange(index, "description", e.target.value)}
              placeholder="What does this project do?" rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tech Stack (comma separated)</label>
            <input type="text" value={project.techStack?.join(", ") || ""}
              onChange={(e) => handleTechStack(index, e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Live URL</label>
              <input type="url" value={project.liveUrl} onChange={(e) => handleChange(index, "liveUrl", e.target.value)}
                placeholder="https://myproject.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GitHub URL</label>
              <input type="url" value={project.githubUrl} onChange={(e) => handleChange(index, "githubUrl", e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}