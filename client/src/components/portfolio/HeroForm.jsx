// import { useState } from "react";
// import { usePortfolio } from "../../context/PortfolioContext";
// import portfolioService from "../../services/portfolioService";
// import toast from "react-hot-toast";

// export default function HeroForm() {
//   const { portfolioData, updateSection, setPortfolioData } = usePortfolio();
//   const hero = portfolioData?.hero || {};
//   const socials = portfolioData?.socials || {};
//   const [uploading, setUploading] = useState(false);

//   const handleHero = (e) => updateSection("hero", { [e.target.name]: e.target.value });
//   const handleSocial = (e) => updateSection("socials", { [e.target.name]: e.target.value });

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

//     setUploading(true);
//     try {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64 = reader.result;
//         const data = await portfolioService.uploadImage(base64, "profiles");
//         updateSection("hero", { profileImage: data.url });
//         toast.success("Profile image uploaded!");
//       };
//       reader.readAsDataURL(file);
//     } catch { toast.error("Upload failed"); }
//     finally { setUploading(false); }
//   };

//   const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
//   const labelClass = "block text-sm font-medium text-gray-700 mb-1";

//   return (
//     <div className="space-y-6">
//       {/* Profile Image */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-800 mb-3">Profile Image</h3>
//         <div className="flex items-center gap-4">
//           <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200 flex-shrink-0">
//             {hero.profileImage
//               ? <img src={hero.profileImage} alt="Profile" className="w-full h-full object-cover" />
//               : <span className="text-3xl text-indigo-400">👤</span>}
//           </div>
//           <div className="flex-1">
//             <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg border border-indigo-200 hover:bg-indigo-100 transition">
//               {uploading ? "Uploading..." : "Upload Photo"}
//               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
//             </label>
//             <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
//           </div>
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-800 mb-3">Basic Info</h3>
//         <div className="space-y-3">
//           <div>
//             <label className={labelClass}>Full Name</label>
//             <input type="text" name="name" value={hero.name || ""} onChange={handleHero} placeholder="John Doe" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Role / Title</label>
//             <input type="text" name="role" value={hero.role || ""} onChange={handleHero} placeholder="Full Stack Developer" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Tagline</label>
//             <input type="text" name="tagline" value={hero.tagline || ""} onChange={handleHero} placeholder="I build things for the web" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Short Bio</label>
//             <textarea name="bio" value={hero.bio || ""} onChange={handleHero} rows={3}
//               placeholder="A brief intro about yourself..."
//               className={`${inputClass} resize-none`} />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Location</label>
//               <input type="text" name="location" value={hero.location || ""} onChange={handleHero} placeholder="New York, USA" className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Email</label>
//               <input type="email" name="email" value={hero.email || ""} onChange={handleHero} placeholder="john@example.com" className={inputClass} />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Phone</label>
//             <input type="text" name="phone" value={hero.phone || ""} onChange={handleHero} placeholder="+1 234 567 8900" className={inputClass} />
//           </div>
//         </div>
//       </div>

//       {/* CTA Buttons */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-800 mb-3">CTA Buttons</h3>
//         <div className="space-y-3">
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelClass}>Primary Button Text</label>
//               <input type="text" name="ctaText" value={hero.ctaText || ""} onChange={handleHero} placeholder="View My Work" className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Primary Button Link</label>
//               <input type="text" name="ctaLink" value={hero.ctaLink || ""} onChange={handleHero} placeholder="#projects" className={inputClass} />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Secondary Button Text</label>
//             <input type="text" name="ctaSecondaryText" value={hero.ctaSecondaryText || ""} onChange={handleHero} placeholder="Download Resume" className={inputClass} />
//           </div>
//         </div>
//       </div>

//       {/* Social Links */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-800 mb-3">Social Links</h3>
//         <div className="space-y-3">
//           {[
//             { name: "github", label: "GitHub", placeholder: "https://github.com/username" },
//             { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
//             { name: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
//             { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
//             { name: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
//             { name: "website", label: "Website", placeholder: "https://yourwebsite.com" },
//           ].map((s) => (
//             <div key={s.name}>
//               <label className={labelClass}>{s.label}</label>
//               <input type="url" name={s.name} value={socials[s.name] || ""} onChange={handleSocial}
//                 placeholder={s.placeholder} className={inputClass} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import portfolioService from "../../services/portfolioService";
import toast from "react-hot-toast";

export default function HeroForm() {
  const { portfolioData, updateSection } = usePortfolio();
  const hero = portfolioData?.hero || {};
  const socials = portfolioData?.socials || {};
  const [uploading, setUploading] = useState(false);

  const handleHero = (e) =>
    updateSection("hero", { [e.target.name]: e.target.value });

  const handleSocial = (e) =>
    updateSection("socials", { [e.target.name]: e.target.value });

  // ✅ FIXED IMAGE UPLOAD FUNCTION
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // ✅ Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64 = reader.result;

          // 🚨 Make sure your API URL is correct in portfolioService
          const data = await portfolioService.uploadImage(
            base64,
            "profiles"
          );

          if (!data || !data.url) {
            throw new Error("Invalid response from server");
          }

          updateSection("hero", { profileImage: data.url });
          toast.success("Profile photo uploaded! ✓");
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Upload failed. Check backend / API URL.");
        } finally {
          setUploading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("File read error:", error);
      toast.error("Could not read file");
      setUploading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-6">
      {/* Profile Image */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Profile Image
        </h3>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200 flex-shrink-0">
            {hero.profileImage ? (
              <img
                src={hero.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-indigo-400">👤</span>
            )}
          </div>

          <div className="flex-1">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg border border-indigo-200 hover:bg-indigo-100 transition">
              {uploading ? "Uploading..." : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>

            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Basic Info
        </h3>

        <div className="space-y-3">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              value={hero.name || ""}
              onChange={handleHero}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Role / Title</label>
            <input
              type="text"
              name="role"
              value={hero.role || ""}
              onChange={handleHero}
              placeholder="Full Stack Developer"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tagline</label>
            <input
              type="text"
              name="tagline"
              value={hero.tagline || ""}
              onChange={handleHero}
              placeholder="I build things for the web"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Short Bio</label>
            <textarea
              name="bio"
              value={hero.bio || ""}
              onChange={handleHero}
              rows={3}
              placeholder="A brief intro about yourself..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                name="location"
                value={hero.location || ""}
                onChange={handleHero}
                placeholder="New York, USA"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={hero.email || ""}
                onChange={handleHero}
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="text"
              name="phone"
              value={hero.phone || ""}
              onChange={handleHero}
              placeholder="+1 234 567 8900"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          CTA Buttons
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Primary Button Text</label>
              <input
                type="text"
                name="ctaText"
                value={hero.ctaText || ""}
                onChange={handleHero}
                placeholder="View My Work"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Primary Button Link</label>
              <input
                type="text"
                name="ctaLink"
                value={hero.ctaLink || ""}
                onChange={handleHero}
                placeholder="#projects"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Secondary Button Text</label>
            <input
              type="text"
              name="ctaSecondaryText"
              value={hero.ctaSecondaryText || ""}
              onChange={handleHero}
              placeholder="Download Resume"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Social Links
        </h3>

        <div className="space-y-3">
          {[
            { name: "github", label: "GitHub", placeholder: "https://github.com/username" },
            { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
            { name: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
            { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
            { name: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
            { name: "website", label: "Website", placeholder: "https://yourwebsite.com" },
          ].map((s) => (
            <div key={s.name}>
              <label className={labelClass}>{s.label}</label>
              <input
                type="url"
                name={s.name}
                value={socials[s.name] || ""}
                onChange={handleSocial}
                placeholder={s.placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}