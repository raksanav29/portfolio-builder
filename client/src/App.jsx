
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Editor from "./pages/Editor";
// import PublicPortfolio from "./pages/PublicPortfolio";
// import LoadingSpinner from "./components/shared/LoadingSpinner";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   if (loading) return <LoadingSpinner />;
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// };

// const PublicOnlyRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   if (loading) return <LoadingSpinner />;
//   if (user) return <Navigate to="/dashboard" replace />;
//   return children;
// };

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
//       <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
//       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//       <Route path="/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
//       <Route path="/p/:slug" element={<PublicPortfolio />} />
//       <Route path="*" element={
//         <div className="min-h-screen flex items-center justify-center text-gray-500">
//           <div className="text-center">
//             <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
//             <p className="text-lg">Page not found</p>
//           </div>
//         </div>
//       } />
//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import PublicPortfolio from "./pages/PublicPortfolio";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import PageTransition from "./components/shared/PageTransition";

/* ================= PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <PageTransition>{children}</PageTransition>;
};

/* ================= PUBLIC ONLY ROUTE ================= */
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;

  return <PageTransition>{children}</PageTransition>;
};

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editor/:id"
        element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        }
      />

      {/* Public Portfolio */}
      <Route path="/p/:slug" element={<PublicPortfolio />} />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-8xl font-black text-gray-100 mb-4">404</h1>
              <p className="text-gray-500 text-lg">Page not found</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}