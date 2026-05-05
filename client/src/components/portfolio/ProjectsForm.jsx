// import { useState } from "react";
// import { usePortfolio } from "../../context/PortfolioContext";
// import portfolioService from "../../services/portfolioService";
// import toast from "react-hot-toast";
// import { uploadImageToCloudinary } from "../../services/uploadService";

// const emptyProject = {
//   title: "", description: "", techStack: [], image: "",
//   liveUrl: "", githubUrl: "", featured: false,
//   caseStudy: { problem: "", solution: "", result: "" },
// };

// export default function ProjectsForm() {
//   const { portfolioData, setPortfolioData } = usePortfolio();
//   const projects = portfolioData?.projects || [];
//   const [uploadingIndex, setUploadingIndex] = useState(null);
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const updateProjects = (updated) => {
//     setPortfolioData((prev) => ({ ...prev, projects: updated }));
//   };

//   const addProject = () => {
//     updateProjects([...projects, { ...emptyProject, caseStudy: { problem: "", solution: "", result: "" } }]);
//     setExpandedIndex(projects.length);
//   };

//   const removeProject = (index) => updateProjects(projects.filter((_, i) => i !== index));

//   const handleChange = (index, field, value) => {
//     updateProjects(projects.map((p, i) => i === index ? { ...p, [field]: value } : p));
//   };

//   const handleCaseStudy = (index, field, value) => {
//     updateProjects(projects.map((p, i) =>
//       i === index ? { ...p, caseStudy: { ...p.caseStudy, [field]: value } } : p
//     ));
//   };

//   const handleTechStack = (index, value) => {
//     const tech = value.split(",").map((t) => t.trim()).filter(Boolean);
//     handleChange(index, "techStack", tech);
//   };
// const handleImageUpload = async (index, e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

//   setUploadingIndex(index);
//   try {
//     const data = await uploadImageToCloudinary(file, "projects");
//     handleChange(index, "image", data.url);
//     toast.success("Image uploaded! ✓");
//   } catch (error) {
//     toast.error("Upload failed: " + error.message);
//   } finally {
//     setUploadingIndex(null); 
//   }
// };

//   const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-base font-semibold text-gray-800">Projects</h3>
//           <p className="text-sm text-gray-500">Showcase your best work</p>
//         </div>
//         <button onClick={addProject}
//           className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
//           + Add Project
//         </button>
//       </div>

//       {projects.length === 0 && (
//         <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
//           <div className="text-3xl mb-2">💼</div>
//           <p className="text-sm text-gray-400">No projects yet</p>
//         </div>
//       )}

//       {projects.map((project, index) => (
//         <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
//           {/* Project Header */}
//           <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
//             onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-semibold text-gray-700">
//                 {project.title || `Project ${index + 1}`}
//               </span>
//               {project.featured && (
//                 <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⭐ Featured</span>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={(e) => { e.stopPropagation(); removeProject(index); }}
//                 className="text-red-400 hover:text-red-600 text-sm transition">Remove</button>
//               <span className="text-gray-400 text-sm">{expandedIndex === index ? "▲" : "▼"}</span>
//             </div>
//           </div>

//           {/* Project Form */}
//           {expandedIndex === index && (
//             <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-3">
//               {/* Image Upload */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Project Image</label>
//                 {project.image && (
//                   <img src={project.image} alt="Project" className="w-full h-32 object-cover rounded-lg mb-2" />
//                 )}
//                 <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-lg border border-indigo-200 hover:bg-indigo-100 transition">
//                   {uploadingIndex === index ? "Uploading..." : "Upload Image"}
//                   <input type="file" accept="image/*" className="hidden"
//                     onChange={(e) => handleImageUpload(index, e)}
//                     disabled={uploadingIndex === index} />
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
//                 <input type="text" value={project.title}
//                   onChange={(e) => handleChange(index, "title", e.target.value)}
//                   placeholder="My Awesome Project" className={inputClass} />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
//                 <textarea value={project.description}
//                   onChange={(e) => handleChange(index, "description", e.target.value)}
//                   placeholder="What does this project do?" rows={3}
//                   className={`${inputClass} resize-none`} />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1">Tech Stack (comma separated)</label>
//                 <input type="text" value={project.techStack?.join(", ") || ""}
//                   onChange={(e) => handleTechStack(index, e.target.value)}
//                   placeholder="React, Node.js, MongoDB" className={inputClass} />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Live URL</label>
//                   <input type="url" value={project.liveUrl}
//                     onChange={(e) => handleChange(index, "liveUrl", e.target.value)}
//                     placeholder="https://..." className={inputClass} />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">GitHub URL</label>
//                   <input type="url" value={project.githubUrl}
//                     onChange={(e) => handleChange(index, "githubUrl", e.target.value)}
//                     placeholder="https://github.com/..." className={inputClass} />
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <input type="checkbox" id={`featured-${index}`} checked={project.featured}
//                   onChange={(e) => handleChange(index, "featured", e.target.checked)}
//                   className="accent-indigo-600" />
//                 <label htmlFor={`featured-${index}`} className="text-sm text-gray-600">Mark as featured project</label>
//               </div>

//               {/* Case Study */}
//               <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
//                 <h4 className="text-sm font-semibold text-gray-700">📋 Case Study</h4>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Problem</label>
//                   <textarea value={project.caseStudy?.problem || ""}
//                     onChange={(e) => handleCaseStudy(index, "problem", e.target.value)}
//                     placeholder="What problem does this project solve?" rows={2}
//                     className={`${inputClass} resize-none`} />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Solution</label>
//                   <textarea value={project.caseStudy?.solution || ""}
//                     onChange={(e) => handleCaseStudy(index, "solution", e.target.value)}
//                     placeholder="How did you solve it?" rows={2}
//                     className={`${inputClass} resize-none`} />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Result</label>
//                   <textarea value={project.caseStudy?.result || ""}
//                     onChange={(e) => handleCaseStudy(index, "result", e.target.value)}
//                     placeholder="What was the outcome?" rows={2}
//                     className={`${inputClass} resize-none`} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import portfolioService from "../../services/portfolioService";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../services/uploadService";

const emptyProject = {
  title: "", description: "", techStack: [], image: "",
  liveUrl: "", githubUrl: "", featured: false,
  caseStudy: { problem: "", solution: "", result: "" },
};

// ✅ ADDED: TechStackInput component
function TechStackInput({ value = [], onChange }) {
  const [input, setInput] = useState("");

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      if (input.trim()) addTag(input);
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag));

  return (
    <div className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 flex flex-wrap gap-1.5 items-center">
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-200">
          {tag}
          <button type="button" onClick={() => removeTag(tag)}
            className="text-indigo-400 hover:text-indigo-700 text-sm font-bold">×</button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input.trim() && addTag(input)}
        placeholder={value.length === 0 ? "Type tech and press Enter..." : "Add more..."}
        className="flex-1 outline-none text-sm text-gray-700 bg-transparent min-w-[120px]"
      />
    </div>
  );
}

export default function ProjectsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const projects = portfolioData?.projects || [];
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const updateProjects = (updated) => {
    setPortfolioData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    updateProjects([...projects, { ...emptyProject, caseStudy: { problem: "", solution: "", result: "" } }]);
    setExpandedIndex(projects.length);
  };

  const removeProject = (index) => updateProjects(projects.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    updateProjects(projects.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const handleCaseStudy = (index, field, value) => {
    updateProjects(projects.map((p, i) =>
      i === index ? { ...p, caseStudy: { ...p.caseStudy, [field]: value } } : p
    ));
  };

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setUploadingIndex(index);
    try {
      const data = await uploadImageToCloudinary(file, "projects");
      handleChange(index, "image", data.url);
      toast.success("Image uploaded! ✓");
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploadingIndex(null); 
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

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

      {projects.map((project, index) => (
        <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="flex justify-between px-4 py-3 cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
            <span>{project.title || `Project ${index + 1}`}</span>
            <button onClick={(e) => { e.stopPropagation(); removeProject(index); }} className="text-red-500">
              Remove
            </button>
          </div>

          {expandedIndex === index && (
            <div className="p-4 space-y-3">

              {/* Image */}
              {project.image && (
                <img src={project.image} className="w-full h-32 object-cover rounded" />
              )}

              <input type="file" onChange={(e) => handleImageUpload(index, e)} />

              <input type="text" value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Title" className={inputClass} />

              <textarea value={project.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                placeholder="Description" className={inputClass} />

              {/* ✅ UPDATED TECH STACK */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Tech Stack
                </label>
                <TechStackInput
                  value={project.techStack || []}
                  onChange={(tags) => handleChange(index, "techStack", tags)}
                />
              </div>

              {/* Case Study remains SAME */}
              <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">📋 Case Study</h4>

                <textarea value={project.caseStudy?.problem || ""}
                  onChange={(e) => handleCaseStudy(index, "problem", e.target.value)}
                  placeholder="Problem" className={inputClass} />

                <textarea value={project.caseStudy?.solution || ""}
                  onChange={(e) => handleCaseStudy(index, "solution", e.target.value)}
                  placeholder="Solution" className={inputClass} />

                <textarea value={project.caseStudy?.result || ""}
                  onChange={(e) => handleCaseStudy(index, "result", e.target.value)}
                  placeholder="Result" className={inputClass} />
              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}