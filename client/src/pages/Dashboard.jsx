import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import portfolioService from "../services/portfolioService";
import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchPortfolios(); }, []);

  const fetchPortfolios = async () => {
    try {
      const data = await portfolioService.getMyPortfolios();
      setPortfolios(data.portfolios);
    } catch { toast.error("Failed to load portfolios"); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) { toast.error("Please enter a title"); return; }
    setCreating(true);
    try {
      const data = await portfolioService.createPortfolio(newTitle.trim());
      toast.success("Portfolio created! 🎉");
      setShowModal(false);
      setNewTitle("");
      navigate(`/editor/${data.portfolio._id}`);
    } catch { toast.error("Failed to create"); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await portfolioService.deletePortfolio(id);
      setPortfolios(portfolios.filter((p) => p._id !== id));
      toast.success("Portfolio deleted");
    } catch { toast.error("Failed to delete"); }
    finally { setDeletingId(null); }
  };

  const handleTogglePublish = async (id) => {
    try {
      const data = await portfolioService.togglePublish(id);
      setPortfolios(portfolios.map((p) =>
        p._id === id ? { ...p, isPublished: data.isPublished } : p
      ));
      toast.success(data.message);
    } catch { toast.error("Failed to update"); }
  };

  const templateColors = {
    minimal: "bg-gray-100 text-gray-600",
    modern: "bg-blue-50 text-blue-600",
    creative: "bg-purple-50 text-purple-600",
    advanced: "bg-indigo-50 text-indigo-600",
  };

  const templateIcons = {
    minimal: "⬜", modern: "🔷", creative: "🎨", advanced: "⚡"
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Portfolios</h1>
            <p className="text-gray-500 mt-1">
              {portfolios.length === 0
                ? "Create your first portfolio to get started"
                : `${portfolios.length} portfolio${portfolios.length > 1 ? "s" : ""} ·`}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => setShowModal(true)} size="md" className="shadow-md shadow-indigo-200">
              + New Portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Empty state */}
        {portfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Start building your portfolio</h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Create a professional portfolio in minutes with our easy editor
            </p>
            <Button onClick={() => setShowModal(true)} size="lg">
              Create First Portfolio
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {portfolios.map((portfolio, i) => (
                <motion.div
                  key={portfolio._id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -4, shadow: "lg" }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-gray-200/60 transition-shadow cursor-pointer group"
                >
                  {/* Card top color bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${templateColors[portfolio.template] || "bg-gray-100 text-gray-600"}`}>
                        {templateIcons[portfolio.template]} {portfolio.template}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        portfolio.isPublished
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {portfolio.isPublished ? "● Live" : "○ Draft"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-lg mb-1 truncate group-hover:text-indigo-600 transition-colors">
                      {portfolio.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-5">
                      Updated {new Date(portfolio.updatedAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button variant="primary" size="sm" className="w-full"
                          onClick={() => navigate(`/editor/${portfolio._id}`)}>
                          ✏️ Edit Portfolio
                        </Button>
                      </motion.div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1"
                          onClick={() => handleTogglePublish(portfolio._id)}>
                          {portfolio.isPublished ? "Unpublish" : "🚀 Publish"}
                        </Button>
                        <Button variant="danger" size="sm"
                          loading={deletingId === portfolio._id}
                          onClick={() => handleDelete(portfolio._id)}>
                          🗑
                        </Button>
                      </div>

                      {portfolio.isPublished && (
                        <motion.a
                          whileHover={{ scale: 1.01 }}
                          href={`/p/${portfolio.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center text-xs text-indigo-500 hover:text-indigo-700 font-medium transition py-1"
                        >
                          🔗 View Public Link →
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="text-3xl mb-3">✨</div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">New Portfolio</h2>
              <p className="text-sm text-gray-500 mb-5">Give your portfolio a name to get started</p>

              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="e.g. My Developer Portfolio"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition mb-4"
              />

              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1"
                  onClick={() => { setShowModal(false); setNewTitle(""); }}>
                  Cancel
                </Button>
                <Button className="flex-1" loading={creating} onClick={handleCreate}>
                  Create →
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}