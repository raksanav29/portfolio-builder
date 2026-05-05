import { usePortfolio } from "../../context/PortfolioContext";

const emptyTestimonial = { name: "", role: "", company: "", message: "", rating: 5 };

export default function TestimonialsForm() {
  const { portfolioData, setPortfolioData } = usePortfolio();
  const testimonials = portfolioData?.testimonials || [];

  const update = (updated) => setPortfolioData((prev) => ({ ...prev, testimonials: updated }));
  const add = () => update([...testimonials, { ...emptyTestimonial }]);
  const remove = (i) => update(testimonials.filter((_, j) => j !== i));
  const handleChange = (i, field, value) => {
    update(testimonials.map((t, j) => j === i ? { ...t, [field]: value } : t));
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Testimonials</h3>
          <p className="text-sm text-gray-500">What others say about you</p>
        </div>
        <button onClick={add}
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
          + Add
        </button>
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="text-3xl mb-2">💬</div>
          <p className="text-sm text-gray-400">No testimonials added yet</p>
        </div>
      )}

      {testimonials.map((t, i) => (
        <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t.name || `Testimonial ${i + 1}`}</span>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input type="text" value={t.name} onChange={(e) => handleChange(i, "name", e.target.value)}
                placeholder="Jane Smith" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
              <input type="text" value={t.role} onChange={(e) => handleChange(i, "role", e.target.value)}
                placeholder="CEO" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
            <input type="text" value={t.company} onChange={(e) => handleChange(i, "company", e.target.value)}
              placeholder="Tech Corp" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
            <textarea value={t.message} onChange={(e) => handleChange(i, "message", e.target.value)}
              placeholder="What did they say about your work?" rows={3}
              className={`${inputClass} resize-none`} />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleChange(i, "rating", star)}
                  className={`text-2xl transition ${star <= t.rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}