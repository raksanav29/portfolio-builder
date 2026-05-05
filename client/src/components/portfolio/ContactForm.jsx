import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import portfolioService from "../../services/portfolioService";
import toast from "react-hot-toast";
import { uploadResumeToCloudinary } from "../../services/uploadService";


export default function ContactForm() {
  const { portfolioData, updateSection, setPortfolioData } = usePortfolio();
  const contact = portfolioData?.contact || {};
  const [uploading, setUploading] = useState(false);

  const handleContact = (e) =>
    updateSection("contact", { [e.target.name]: e.target.value });

  const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowed = ["application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowed.includes(file.type)) {
    toast.error("Only PDF or Word files allowed");
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    toast.error("File must be under 10MB");
    return;
  }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const data = await portfolioService.uploadResume(reader.result);
          setPortfolioData((prev) => ({ ...prev, resumeUrl: data.url }));
          toast.success("Resume uploaded! ✓");
        } catch (err) {
          toast.error("Upload failed. Try again.");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Could not read file");
      setUploading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Contact Info</h3>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={contact.email || ""}
              onChange={handleContact} placeholder="john@example.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="text" name="phone" value={contact.phone || ""}
              onChange={handleContact} placeholder="+1 234 567 8900" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" name="location" value={contact.location || ""}
              onChange={handleContact} placeholder="New York, USA" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Availability Status</label>
            <input type="text" name="availability" value={contact.availability || ""}
              onChange={handleContact} placeholder="Open to opportunities" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Resume Upload */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">Resume / CV</h3>
        <p className="text-xs text-gray-400 mb-3">PDF or Word · Max 10MB</p>

        <div className={`rounded-xl border-2 border-dashed p-5 text-center transition ${
          uploading ? "border-indigo-300 bg-indigo-50" : "border-gray-300 hover:border-indigo-300"
        }`}>
          {portfolioData?.resumeUrl ? (
            <div className="space-y-3">
              <div className="text-3xl">📄</div>
              <p className="text-sm font-semibold text-green-600">✓ Resume Uploaded</p>
              <a href={portfolioData.resumeUrl} target="_blank" rel="noreferrer"
                className="text-xs text-indigo-500 hover:underline block">
                View Uploaded Resume ↗
              </a>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg border hover:bg-gray-200 transition">
                {uploading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : "Replace File"}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={handleResumeUpload} disabled={uploading} />
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">📄</div>
              <p className="text-sm text-gray-600 font-medium">Upload your Resume</p>
              <p className="text-xs text-gray-400">PDF or Word document</p>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition mt-2">
                {uploading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : "Choose File"}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={handleResumeUpload} disabled={uploading} />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}