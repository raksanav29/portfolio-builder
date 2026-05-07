import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import PublicPortfolio from "./pages/PublicPortfolio";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import PageTransition from "./components/shared/PageTransition";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={
        <PublicOnlyRoute><PageTransition><Login /></PageTransition></PublicOnlyRoute>
      } />
      <Route path="/signup" element={
        <PublicOnlyRoute><PageTransition><Signup /></PageTransition></PublicOnlyRoute>
      } />
      <Route path="/forgot-password" element={
        <PageTransition><ForgotPassword /></PageTransition>
      } />
      <Route path="/reset-password/:token" element={
        <PageTransition><ResetPassword /></PageTransition>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>
      } />
      <Route path="/editor/:id" element={
        <ProtectedRoute><Editor /></ProtectedRoute>
      } />
      <Route path="/p/:slug" element={<PublicPortfolio />} />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-8xl font-black text-gray-100 mb-4">404</h1>
            <p className="text-gray-500 text-lg">Page not found</p>
          </div>
        </div>
      } />
    </Routes>
  );
}