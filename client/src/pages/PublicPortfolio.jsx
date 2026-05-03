// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import portfolioService from "../services/portfolioService";
// import LoadingSpinner from "../components/shared/LoadingSpinner";

// export default function PublicPortfolio() {
//   const { slug } = useParams();
//   const [portfolio, setPortfolio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await portfolioService.getPublicPortfolio(slug);
//         setPortfolio(data.portfolio);
//       } catch { setNotFound(true); }
//       finally { setLoading(false); }
//     };
//     fetch();
//   }, [slug]);

//   if (loading) return <LoadingSpinner />;
//   if (notFound) return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="text-5xl mb-4">🔍</div>
//         <h2 className="text-xl font-bold text-gray-800 mb-2">Portfolio not found</h2>
//         <p className="text-gray-500">This portfolio doesn't exist or isn't published.</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-3xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">{portfolio.hero?.name || portfolio.title}</h1>
//         <p className="text-xl text-indigo-600 mb-4">{portfolio.hero?.tagline}</p>
//         <p className="text-gray-600">{portfolio.hero?.bio}</p>
//         <p className="text-sm text-gray-400 mt-8">Full template rendering coming in Step 6 ✨</p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import portfolioService from "../services/portfolioService";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import MinimalTemplate from "../components/templates/MinimalTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";
import CreativeTemplate from "../components/templates/CreativeTemplate";

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await portfolioService.getPublicPortfolio(slug);
        setPortfolio(data.portfolio);
      } catch { setNotFound(true); }
      finally { setLoading(false); }
    };
    fetch();
  }, [slug]);

  if (loading) return <LoadingSpinner />;

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Portfolio not found</h2>
        <p className="text-gray-500">This portfolio doesn't exist or isn't published.</p>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (portfolio.template) {
      case "modern": return <ModernTemplate data={portfolio} />;
      case "creative": return <CreativeTemplate data={portfolio} />;
      default: return <MinimalTemplate data={portfolio} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderTemplate()}
    </div>
  );
}