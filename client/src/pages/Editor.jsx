import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import portfolioService from "../services/portfolioService";
import { usePortfolio } from "../context/PortfolioContext";
import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import HeroForm from "../components/portfolio/HeroForm";
import AboutForm from "../components/portfolio/AboutForm";
import SkillsForm from "../components/portfolio/SkillsForm";
import ProjectsForm from "../components/portfolio/ProjectsForm";
import AchievementsForm from "../components/portfolio/AchievementsForm";
import EducationForm from "../components/portfolio/EducationForm";
import StatisticsForm from "../components/portfolio/StatisticsForm";
import TestimonialsForm from "../components/portfolio/TestimonialsForm";
import ContactForm from "../components/portfolio/ContactForm";
import ThemeForm from "../components/portfolio/ThemeForm";
import LivePreview from "../components/preview/LivePreview";
import { exportToHTML } from "../utils/exportHelper";
import toast from "react-hot-toast";

const SECTIONS = [
  { id: "hero",         label: "👤 Hero" },
  { id: "about",        label: "🙋 About" },
  { id: "skills",       label: "⚡ Skills" },
  { id: "projects",     label: "💼 Projects" },
  { id: "achievements", label: "🏆 Achievements" },
  { id: "education",    label: "🎓 Education" },
  { id: "statistics",   label: "📊 Stats" },
  { id: "testimonials", label: "💬 Reviews" },
  { id: "contact",      label: "📞 Contact" },
  { id: "theme",        label: "🎨 Theme" },
];

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { portfolioData, loadPortfolio, clearPortfolio, activeSection, setActiveSection } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolioById(id);
        loadPortfolio(data.portfolio);
      } catch {
        toast.error("Failed to load portfolio");
        navigate("/dashboard");
      } finally { setLoading(false); }
    };
    fetchPortfolio();
    return () => clearPortfolio();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await portfolioService.updatePortfolio(id, portfolioData);
      toast.success("Portfolio saved! ✓");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleExport = () => {
    if (!portfolioData) return;
    exportToHTML(portfolioData);
    toast.success("HTML downloaded! 🎉");
  };

  const renderForm = () => {
    switch (activeSection) {
      case "hero":         return <HeroForm />;
      case "about":        return <AboutForm />;
      case "skills":       return <SkillsForm />;
      case "projects":     return <ProjectsForm />;
      case "achievements": return <AchievementsForm />;
      case "education":    return <EducationForm />;
      case "statistics":   return <StatisticsForm />;
      case "testimonials": return <TestimonialsForm />;
      case "contact":      return <ContactForm />;
      case "theme":        return <ThemeForm />;
      default:             return <HeroForm />;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>← Back</Button>
          <span className="text-gray-300 hidden sm:block">|</span>
          <h2 className="font-semibold text-gray-800 text-sm truncate max-w-[150px] hidden sm:block">
            {portfolioData?.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="lg:hidden"
            onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "✏️ Edit" : "👁 Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>⬇ Export</Button>
          <Button size="sm" loading={saving} onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 112px)" }}>
        {/* LEFT — Tabs + Form */}
        <div className={`flex flex-col w-full lg:w-[420px] flex-shrink-0 border-r border-gray-200 bg-white ${showPreview ? "hidden lg:flex" : "flex"}`}>
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 scrollbar-hide">
            {SECTIONS.map((section) => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`px-3 py-3 text-xs font-medium whitespace-nowrap transition border-b-2 ${
                  activeSection === section.id
                    ? "border-indigo-500 text-indigo-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}>
                {section.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5">{renderForm()}</div>
        </div>

        {/* RIGHT — Live Preview */}
        <div className={`flex-1 bg-gray-100 ${showPreview ? "flex" : "hidden lg:flex"} flex-col`}>
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              Live Preview — <span className="capitalize">{portfolioData?.template || "minimal"}</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <LivePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}