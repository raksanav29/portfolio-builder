import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import portfolioService from "../services/portfolioService";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import MinimalTemplate from "../components/templates/MinimalTemplate";
import ModernTemplate from "../components/templates/ModernTemplate";
import CreativeTemplate from "../components/templates/CreativeTemplate";
import AdvancedTemplate from "../components/templates/AdvancedTemplate";

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
      case "modern":   return <ModernTemplate data={portfolio} />;
      case "creative": return <CreativeTemplate data={portfolio} />;
      case "advanced": return <AdvancedTemplate data={portfolio} />;
      default:         return <MinimalTemplate data={portfolio} />;
    }
  };

  return <div className="min-h-screen">{renderTemplate()}</div>;
}