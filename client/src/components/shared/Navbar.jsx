import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">P</span>
            PortfolioBuilder
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-600">
                Hi, <span className="font-semibold text-gray-800">{user.name}</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}