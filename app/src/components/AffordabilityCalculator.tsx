import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function AffordabilityCalculator() {
  const [country, setCountry] = useState("Canada");
  const [budget, setBudget] = useState(30);
  const [years, setYears] = useState(2);

  const costs: Record<string, { tuition: number; living: number }> = {
    Canada: { tuition: 25, living: 12 },
    USA: { tuition: 45, living: 18 },
    UK: { tuition: 22, living: 15 },
    Germany: { tuition: 3, living: 10 },
    Australia: { tuition: 28, living: 16 },
    Ireland: { tuition: 16, living: 12 },
  };
  const c = costs[country] || costs.Canada;
  const totalCost = (c.tuition + c.living) * years;
  const partTimeIncome = (country === "Germany" ? 12 : country === "USA" ? 15 : 10) * years;
  const scholarship = c.tuition * 0.2 * years;
  const netCost = totalCost - partTimeIncome - scholarship;
  const affordable = budget >= netCost;
  const gap = Math.abs(budget - netCost);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Destination</label>
          <select value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-900">
            {Object.keys(costs).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Total Budget (₹ Lakhs)</label>
          <div className="flex items-center gap-2">
            <input type="range" min="10" max="100" value={budget} onChange={e => setBudget(Number(e.target.value))} className="flex-1 accent-[#0d9488]" />
            <span className="text-sm font-bold w-12 text-right">₹{budget}L</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Duration</label>
          <div className="flex gap-1">
            {[1, 2, 3].map(y => (
              <button key={y} onClick={() => setYears(y)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${years === y ? "bg-[#0d9488] text-white" : "bg-slate-100 text-gray-600 hover:bg-slate-200"}`}>
                {y} Year{y > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={`rounded-xl p-4 border ${affordable ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">Net Cost (after part-time + scholarship)</span>
          <span className="text-lg font-bold text-gray-900">₹{Math.round(netCost)}L</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div><p className="text-[10px] text-gray-500">Total Cost</p><p className="text-sm font-bold">₹{totalCost}L</p></div>
          <div><p className="text-[10px] text-gray-500">Part-time Earnings</p><p className="text-sm font-bold text-emerald-600">₹{partTimeIncome}L</p></div>
          <div><p className="text-[10px] text-gray-500">Scholarship (est.)</p><p className="text-sm font-bold text-amber-600">₹{Math.round(scholarship)}L</p></div>
        </div>
        <div className={`text-sm font-semibold flex items-center gap-2 ${affordable ? "text-emerald-700" : "text-red-700"}`}>
          {affordable ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {affordable ? `Within budget! Surplus: ₹${Math.round(gap)}L` : `Need ₹${Math.round(gap)}L more. Consider Germany (₹${costs.Germany.tuition + costs.Germany.living * years}L total) or scholarships.`}
        </div>
      </div>
    </div>
  );
}
