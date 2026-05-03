import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import portfolioService from "../services/portfolioService";
import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => { fetchPortfolios(); }, []);

  const fetchPortfolios = async () => {
    try {
      const data = await portfolioService.getMyPortfolios();
      setPortfolios(data.portfolios);
    } catch (error) { toast.error("Failed to load portfolios"); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) { toast.error("Please enter a title"); return; }
    setCreating(true);
    try {
      const data = await portfolioService.createPortfolio(newTitle.trim());
      toast.success("Portfolio created!");
      setShowModal(false); setNewTitle("");
      navigate(`/editor/${data.portfolio._id}`);
    } catch (error) { toast.error("Failed to create"); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio?")) return;
    try {
      await portfolioService.deletePortfolio(id);
      setPortfolios(portfolios.filter((p) => p._id !== id));
      toast.success("Deleted!");
    } catch { toast.error("Failed to delete"); }
  };

  const handleTogglePublish = async (id) => {
    try {
      const data = await portfolioService.togglePublish(id);
      setPortfolios(portfolios.map((p) => p._id === id ? { ...p, isPublished: data.isPublished } : p));
      toast.success(data.message);
    } catch { toast.error("Failed to update"); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Portfolios</h1>
            <p className="text-gray-500 mt-1">{portfolios.length === 0 ? "No portfolios yet." : `${portfolios.length} portfolio(s)`}</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ New Portfolio</Button>
        </div>

        {portfolios.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-5xl mb-4">📁</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No portfolios yet</h3>
            <p className="text-gray-400 mb-6">Create your first portfolio and start building</p>
            <Button onClick={() => setShowModal(true)}>Create Portfolio</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio._id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full capitalize">{portfolio.template}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${portfolio.isPublished ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {portfolio.isPublished ? "● Published" : "○ Draft"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{portfolio.title}</h3>
                <p className="text-xs text-gray-400 mb-5">Updated {new Date(portfolio.updatedAt).toLocaleDateString()}</p>
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="sm" className="w-full" onClick={() => navigate(`/editor/${portfolio._id}`)}>Edit Portfolio</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleTogglePublish(portfolio._id)}>
                      {portfolio.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(portfolio._id)}>Delete</Button>
                  </div>
                  {portfolio.isPublished && (
                    <a href={`/p/${portfolio.slug}`} target="_blank" rel="noopener noreferrer" className="text-center text-xs text-indigo-500 hover:underline mt-1">
                      View public link →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">New Portfolio</h2>
            <p className="text-sm text-gray-500 mb-4">Give your portfolio a name</p>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="e.g. My Developer Portfolio" autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => { setShowModal(false); setNewTitle(""); }}>Cancel</Button>
              <Button className="flex-1" loading={creating} onClick={handleCreate}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}