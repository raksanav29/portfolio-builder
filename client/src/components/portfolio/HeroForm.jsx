import { usePortfolio } from "../../context/PortfolioContext";

export default function HeroForm() {
  const { portfolioData, updateSection } = usePortfolio();
  const hero = portfolioData?.hero || {};
  const socials = portfolioData?.socials || {};

  const handleHero = (e) => {
    updateSection("hero", { [e.target.name]: e.target.value });
  };

  const handleSocial = (e) => {
    updateSection("socials", { [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Basic Info</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" value={hero.name || ""} onChange={handleHero}
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input type="text" name="tagline" value={hero.tagline || ""} onChange={handleHero}
              placeholder="Full Stack Developer & UI Designer"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea name="bio" value={hero.bio || ""} onChange={handleHero} rows={4}
              placeholder="Tell visitors about yourself..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" name="location" value={hero.location || ""} onChange={handleHero}
                placeholder="New York, USA"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={hero.email || ""} onChange={handleHero}
                placeholder="john@example.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Social Links</h3>
        <div className="space-y-3">
          {[
            { name: "github", placeholder: "https://github.com/username", label: "GitHub" },
            { name: "linkedin", placeholder: "https://linkedin.com/in/username", label: "LinkedIn" },
            { name: "twitter", placeholder: "https://twitter.com/username", label: "Twitter" },
            { name: "website", placeholder: "https://yourwebsite.com", label: "Website" },
          ].map((social) => (
            <div key={social.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{social.label}</label>
              <input type="url" name={social.name} value={socials[social.name] || ""} onChange={handleSocial}
                placeholder={social.placeholder}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}