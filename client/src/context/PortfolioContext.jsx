// import { createContext, useContext, useState } from "react";

// const PortfolioContext = createContext();

// export const PortfolioProvider = ({ children }) => {
//   const [portfolioData, setPortfolioData] = useState(null);
//   const [activeSection, setActiveSection] = useState("hero");

//   const updateSection = (section, data) => {
//     setPortfolioData((prev) => ({
//       ...prev,
//       [section]: { ...prev?.[section], ...data },
//     }));
//   };

//   const loadPortfolio = (data) => setPortfolioData(data);
//   const clearPortfolio = () => {
//     setPortfolioData(null);
//     setActiveSection("hero");
//   };

//   return (
//     <PortfolioContext.Provider value={{
//       portfolioData, activeSection, setActiveSection,
//       updateSection, loadPortfolio, clearPortfolio,
//     }}>
//       {children}
//     </PortfolioContext.Provider>
//   );
// };

// export const usePortfolio = () => {
//   const context = useContext(PortfolioContext);
//   if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
//   return context;
// };

import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  const updateSection = (section, data) => {
    setPortfolioData((prev) => ({
      ...prev,
      [section]: Array.isArray(data) ? data : { ...prev?.[section], ...data },
    }));
  };

  const loadPortfolio = (data) => setPortfolioData(data);

  const clearPortfolio = () => {
    setPortfolioData(null);
    setActiveSection("hero");
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      setPortfolioData,
      activeSection,
      setActiveSection,
      updateSection,
      loadPortfolio,
      clearPortfolio,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};