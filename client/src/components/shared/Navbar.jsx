import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              P
            </div>
            <span className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
              PortfolioBuilder
            </span>
          </Link>

          {/* Right */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-gray-500">
                Hi, <span className="font-semibold text-gray-800">{user.name}</span>
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-indigo-300 transition-shadow"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-1 w-44 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                        📁 Dashboard
                      </Link>
                      <button
                        onClick={() => { setShowMenu(false); handleLogout(); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        🚪 Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}