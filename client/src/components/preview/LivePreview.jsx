import { usePortfolio } from "../../context/PortfolioContext";
import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import AdvancedTemplate from "../templates/AdvancedTemplate";

export default function LivePreview() {
  const { portfolioData } = usePortfolio();
  if (!portfolioData) return null;

  const template = portfolioData?.template || "minimal";

  const renderTemplate = () => {
    switch (template) {
      case "modern":   return <ModernTemplate data={portfolioData} />;
      case "creative": return <CreativeTemplate data={portfolioData} />;
      case "advanced": return <AdvancedTemplate data={portfolioData} />;
      default:         return <MinimalTemplate data={portfolioData} />;
    }
  };

  return <div className="h-full overflow-y-auto">{renderTemplate()}</div>;
}