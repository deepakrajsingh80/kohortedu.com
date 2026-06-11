import { useState, useMemo, type ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Landmark, Shield, Unlock, TrendingUp, Calculator, CheckCircle,
  ArrowRight, Wallet, Percent, Clock, FileText, AlertTriangle,
  ChevronDown, IndianRupee, Building2, GraduationCap, UserCheck,
  Banknote, Receipt, Crown, Sparkles, CircleDollarSign, ChevronRight,
} from "lucide-react";

/* ─── Navbar offset scroll helper ─── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 80; // sticky navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── LENDER DATA ─── */
const lenders = [
  { name: "SBI Global Ed-Vantage", type: "Public Bank", unsecured: "₹50L", secured: "₹1.5Cr", rateUn: "9.15-9.65%", rateSec: "8.33-9.15%", tenure: "15 yr", processing: "0.5-1%", bestFor: "Top 100 universities, lowest rates" },
  { name: "HDFC Credila", type: "NBFC", unsecured: "₹75L", secured: "No Limit", rateUn: "11.75-13%", rateSec: "10.15-10.75%", tenure: "12 yr", processing: "1-1.25%", bestFor: "Wide university coverage, fast processing" },
  { name: "Avanse", type: "NBFC", unsecured: "₹1Cr", secured: "₹80L", rateUn: "10.5-13%", rateSec: "10.5-11.5%", tenure: "15 yr", processing: "1-2%", bestFor: "Flexible eligibility, mid-tier universities" },
  { name: "ICICI Bank", type: "Private Bank", unsecured: "₹1Cr", secured: "₹2Cr", rateUn: "11.25-12.75%", rateSec: "10.25%", tenure: "10 yr", processing: "0.5-1%", bestFor: "High loan amounts, premium universities" },
  { name: "Axis Bank", type: "Private Bank", unsecured: "₹1Cr", secured: "₹2Cr", rateUn: "10.5-12.5%", rateSec: "9.75-10.5%", tenure: "15 yr", processing: "0.5-1%", bestFor: "Quick approval, GRE-based funding" },
  { name: "InCred", type: "NBFC", unsecured: "₹80L", secured: "₹80L", rateUn: "11.85-13%", rateSec: "10.5%", tenure: "15 yr", processing: "1-2%", bestFor: "CIBIL 650+ accepted, digital process" },
  { name: "Auxilo", type: "NBFC", unsecured: "₹1Cr", secured: "₹1Cr", rateUn: "11.3-13%", rateSec: "10.5%", tenure: "10 yr", processing: "1-2%", bestFor: "100% funding option available" },
  { name: "Prodigy Finance", type: "International", unsecured: "$220K", secured: "N/A", rateUn: "11.5-15%", rateSec: "N/A", tenure: "7-20 yr", processing: "Up to 5%", bestFor: "No co-applicant, 1,733 schools" },
  { name: "MPOWER Financing", type: "International", unsecured: "$100K", secured: "N/A", rateUn: "12.99-15.99%", rateSec: "N/A", tenure: "10 yr", processing: "5%", bestFor: "Fixed rate, US/Canada only" },
];

/* ─── FAQ DATA ─── */
const faqs = [
  { q: "How much education loan can I get without collateral?", a: "Up to ₹50L from public banks (SBI, UBI) and up to ₹1Cr from private banks (ICICI, Axis) and NBFCs (Credila, Avanse). International lenders like Prodigy offer up to $220K without collateral or co-applicant." },
  { q: "What is the interest rate for education loans in 2025?", a: "Secured (with collateral): 8.33-10.5%. Unsecured (no collateral): 10-15%. International lenders: 12-16%. SBI offers the lowest at 9.15% for girls admitted to premier universities." },
  { q: "Can I get a loan if my university is not in the top 100?", a: "Yes. NBFCs like Avanse, InCred, and Auxilo fund mid-tier universities. They look at course employability rather than just university ranking. Private banks also have expanded approved lists." },
  { q: "What documents are needed for an education loan?", a: "Student: Admission letter, academic marksheets, passport. Co-applicant: Income proof (ITR/Form 16), bank statements (6 months), KYC. For secured loans: Property documents or FD receipts." },
  { q: "What is the moratorium period?", a: "Typically course duration + 6 months (or 3 months after getting a job). During this period, you don't pay EMI. Simple interest accrues but most lenders allow you to pay only interest during studies." },
  { q: "Are there tax benefits on education loans?", a: "Yes! Under Section 80E, the entire interest paid is deductible from taxable income with no upper limit. For a ₹50L loan at 11% over 10 years, you can save ₹10-12L in taxes if you're in the 30% bracket." },
  { q: "What is margin money and do I need to pay it?", a: "Public banks require 15% margin (you pay ₹7.5L upfront on a ₹50L loan). Private banks and NBFCs offer 0% margin. Scholarships count toward margin — a ₹5L scholarship reduces your margin requirement." },
  { q: "What if my loan application gets rejected?", a: "Most common reasons: high FOIR (>50%), low CIBIL (<650), university not on approved list. Fix: Try a different lender tier (public → private → NBFC), add a salaried co-applicant, or consider international lenders." },
];

/* ─── EMI CALCULATOR ─── */
function EMICalculator() {
  const [amount, setAmount] = useState(50);
  const [rate, setRate] = useState(11);
  const [years, setYears] = useState(10);
  const [moratorium, setMoratorium] = useState(2);

  const emi = useMemo(() => {
    const P = amount * 100000;
    const r = rate / 12 / 100;
    const n = years * 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, rate, years]);

  const totalPayable = emi * years * 12;
  const totalInterest = totalPayable - amount * 100000;
  const taxSaved = totalInterest * 0.30;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-bold">EMI Calculator</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Loan Amount: ₹{amount} Lakhs</label>
            <input type="range" min="10" max="200" value={amount} onChange={e => setAmount(+e.target.value)} className="w-full accent-teal-400" />
            <div className="flex justify-between text-[10px] text-gray-500"><span>₹10L</span><span>₹200L</span></div>
          </div>
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Interest Rate: {rate}%</label>
            <input type="range" min="8" max="16" step="0.25" value={rate} onChange={e => setRate(+e.target.value)} className="w-full accent-teal-400" />
            <div className="flex justify-between text-[10px] text-gray-500"><span>8%</span><span>16%</span></div>
          </div>
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Tenure: {years} Years</label>
            <input type="range" min="5" max="15" value={years} onChange={e => setYears(+e.target.value)} className="w-full accent-teal-400" />
            <div className="flex justify-between text-[10px] text-gray-500"><span>5 yr</span><span>15 yr</span></div>
          </div>
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Moratorium: {moratorium} Years (course + grace)</label>
            <input type="range" min="0" max="5" value={moratorium} onChange={e => setMoratorium(+e.target.value)} className="w-full accent-teal-400" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
            <p className="text-[10px] text-gray-300 uppercase">Monthly EMI</p>
            <p className="text-2xl font-bold text-teal-400">₹{Math.round(emi).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-gray-300">Total Interest</p>
              <p className="text-sm font-bold text-amber-400">₹{(totalInterest / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-gray-300">Total Repayment</p>
              <p className="text-sm font-bold text-white">₹{(totalPayable / 100000).toFixed(1)}L</p>
            </div>
          </div>
          <div className="bg-teal-500/10 border border-teal-400/20 rounded-xl p-3">
            <p className="text-[10px] text-teal-200">Section 80E Tax Savings (30% bracket)</p>
            <p className="text-lg font-bold text-teal-400">₹{(taxSaved / 100000).toFixed(1)}L saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ACCORDION ─── */
function AccordionItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button onClick={onClick} className="w-full flex items-center justify-between p-4 text-left">
        <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function StudentLoans() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"secured" | "unsecured">("unsecured");

  const steps = [
    { step: 1, title: "Check Eligibility", desc: "Use our calculator to estimate your loan amount and EMI. Compare secured vs unsecured options.", icon: Calculator },
    { step: 2, title: "Choose Lender", desc: "We match you with 3 best lenders based on your university, course, and co-applicant profile.", icon: Building2 },
    { step: 3, title: "Submit Documents", desc: "Upload admission letter, marksheets, co-applicant income proof, and collateral docs (if secured).", icon: FileText },
    { step: 4, title: "Get Sanctioned", desc: "Approval in 7-15 days. Funds disbursed directly to your university account.", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative bg-gradient-to-br from-[#0d9488] to-[#134e4a] text-white overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-6">
              <Landmark className="w-4 h-4" /> Education Loans for Abroad
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  Fund Your <span className="text-amber-300">Dream University</span> Without Breaking the Bank
                </h1>
                <p className="text-lg text-white/80 mb-6 max-w-lg">
                  Compare 9 top lenders — SBI, HDFC Credila, Avanse, ICICI, Axis & more. Get upto ₹2 Cr at rates starting 8.33%. No collateral options available.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => scrollToSection("emi-section")} className="bg-white text-teal-700 hover:bg-gray-50 px-6 py-5 rounded-xl font-semibold shadow-lg">
                    <Calculator className="w-4 h-4 mr-2" /> Calculate My EMI
                  </Button>
                  <Button onClick={() => scrollToSection("lenders-section")} className="bg-white/15 text-white border border-white/30 hover:bg-white/25 px-6 py-5 rounded-xl font-semibold">
                    <Building2 className="w-4 h-4 mr-2" /> Compare Lenders
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> No hidden charges</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> Section 80E tax benefit</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> 7-15 day approval</span>
                </div>
              </div>
              <div>
                <EMICalculator />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: "₹96,847Cr", label: "Education loan market (2025)" },
              { val: "7.5L+", label: "Indian students abroad (2024-25)" },
              { val: "8.33%", label: "Lowest interest rate (SBI)" },
              { val: "₹12L", label: "Max tax savings under 80E" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-xl sm:text-2xl font-bold text-teal-700">{s.val}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECURED vs UNSECURED ═══════ */}
      <section className="py-20 bg-white" id="emi-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><Shield className="mr-1.5 h-3.5 w-3.5" /> Loan Types</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Secured vs Unsecured — What's Right for You?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose based on your collateral availability, urgency, and cost sensitivity.</p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 rounded-xl p-1 flex">
              <button onClick={() => setActiveTab("unsecured")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "unsecured" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}>
                <Unlock className="w-4 h-4 inline mr-1.5" /> Unsecured (No Collateral)
              </button>
              <button onClick={() => setActiveTab("secured")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "secured" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}>
                <Shield className="w-4 h-4 inline mr-1.5" /> Secured (With Collateral)
              </button>
            </div>
          </div>

          {activeTab === "unsecured" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: Unlock, title: "No Property Needed", desc: "Get funded without pledging house, land, or FD. Perfect if your family doesn't own property.", color: "text-blue-600 bg-blue-50" },
                { icon: Clock, title: "Faster Approval", desc: "7-15 days processing vs 3-4 weeks for secured. No property valuation or legal verification needed.", color: "text-emerald-600 bg-emerald-50" },
                { icon: AlertTriangle, title: "Higher Rate (10-15%)", desc: "Lenders charge 2-4% more because they take more risk. On a ₹50L loan, you pay ₹6-7L extra over 10 years.", color: "text-amber-600 bg-amber-50" },
                { icon: IndianRupee, title: "Up to ₹1 Crore", desc: "Private banks (ICICI, Axis) and NBFCs (Credila, Avanse) offer up to ₹1Cr unsecured for premier universities.", color: "text-teal-600 bg-teal-50" },
                { icon: UserCheck, title: "Co-Applicant Required", desc: "Parent, spouse, or sibling with stable income needed. Their CIBIL (700+) and FOIR (<50%) determine approval.", color: "text-violet-600 bg-violet-50" },
                { icon: GraduationCap, title: "University Matters", desc: "Top 100 universities get best rates. Mid-tier universities still approved by NBFCs at slightly higher rates.", color: "text-rose-600 bg-rose-50" },
              ].map((card, i) => (
                <Card key={i} className="border border-slate-100 hover:shadow-lg transition-shadow"><CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}><card.icon className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </CardContent></Card>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: Shield, title: "Lower Rate (8.33-10.5%)", desc: "Save ₹5-7L on a ₹50L loan vs unsecured. Property-backed loans are seen as lower risk by lenders.", color: "text-emerald-600 bg-emerald-50" },
                { icon: IndianRupee, title: "Up to ₹2 Crore", desc: "Loan amount based on collateral value. Fund 100% of tuition + living + travel with no upper cap.", color: "text-teal-600 bg-teal-50" },
                { icon: Clock, title: "Longer Tenure (15 yr)", desc: "Spread repayment over 15 years for smaller EMIs. Public banks offer the longest tenures.", color: "text-blue-600 bg-blue-50" },
                { icon: Landmark, title: "Collateral Options", desc: "Residential/commercial property, Fixed Deposits, Life Insurance policies, Government bonds, or land.", color: "text-violet-600 bg-violet-50" },
                { icon: Wallet, title: "0% Margin (Some)", desc: "Private banks offer 0% margin money. Public banks need 15% — but scholarships count toward it.", color: "text-amber-600 bg-amber-50" },
                { icon: Receipt, title: "Tax Benefit + TCS Save", desc: "Section 80E saves ₹10-12L. Plus 0.5% TCS vs 5% without loan — save ₹1L+ on remittances.", color: "text-rose-600 bg-rose-50" },
              ].map((card, i) => (
                <Card key={i} className="border border-slate-100 hover:shadow-lg transition-shadow"><CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}><card.icon className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </CardContent></Card>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════ LENDER COMPARISON ═══════ */}
      <section className="py-20 bg-slate-50" id="lenders-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-amber-100 text-amber-700 mb-3 px-4 py-1.5"><Building2 className="mr-1.5 h-3.5 w-3.5" /> Compare</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">9 Top Lenders Compared</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Find the best lender for your profile. Rates updated May 2026.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-900 text-white">
                {["Lender", "Type", "Unsecured", "Secured", "Rate (Un)", "Rate (Sec)", "Tenure", "Processing", "Best For"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-mono tracking-wider uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {lenders.map((l, i) => (
                  <tr key={i} className="border-b border-slate-200 hover:bg-white transition-colors">
                    <td className="px-3 py-3 font-semibold text-slate-900 whitespace-nowrap">{l.name}</td>
                    <td className="px-3 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.type === "Public Bank" ? "bg-emerald-100 text-emerald-700" : l.type === "Private Bank" ? "bg-blue-100 text-blue-700" : l.type === "NBFC" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>{l.type}</span></td>
                    <td className="px-3 py-3 font-mono text-slate-600 whitespace-nowrap">{l.unsecured}</td>
                    <td className="px-3 py-3 font-mono text-slate-600 whitespace-nowrap">{l.secured}</td>
                    <td className="px-3 py-3 font-mono text-amber-600 font-semibold whitespace-nowrap">{l.rateUn}</td>
                    <td className="px-3 py-3 font-mono text-emerald-600 whitespace-nowrap">{l.rateSec}</td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{l.tenure}</td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{l.processing}</td>
                    <td className="px-3 py-3 text-slate-500 text-xs max-w-[200px]">{l.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ TAX BENEFIT ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge className="bg-emerald-100 text-emerald-700 mb-3 px-4 py-1.5"><Receipt className="mr-1.5 h-3.5 w-3.5" /> Tax Savings</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Section 80E Saves You ₹10-12 Lakhs</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The entire interest paid on your education loan is deductible from taxable income under Section 80E — with no upper limit. This applies for up to 8 years from when repayment starts.
              </p>
              <div className="space-y-3">
                {[
                  "Full interest deduction — no cap",
                  "Claim for 8 years from repayment start",
                  "Available for loans from any Indian bank/NBFC",
                  "Applicable to loans for self, spouse, or children",
                  "0.5% TCS on remittances vs 5% without loan — save ₹1L+",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">{item}</p></div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"><CardContent className="p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tax Savings Example</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-slate-600">Loan Amount</span><span className="font-semibold text-slate-900">₹50 Lakhs</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-600">Interest Rate</span><span className="font-semibold text-slate-900">11% p.a.</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-600">Tenure</span><span className="font-semibold text-slate-900">10 years</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-600">Total Interest Paid</span><span className="font-semibold text-amber-600">₹34.4 Lakhs</span></div>
                  <div className="h-px bg-emerald-200 my-2" />
                  <div className="flex justify-between text-sm"><span className="text-slate-600">Tax Bracket</span><span className="font-semibold text-slate-900">30%</span></div>
                  <div className="flex justify-between text-base"><span className="font-semibold text-slate-900">Total Tax Saved</span><span className="font-bold text-emerald-600">₹10.3 Lakhs</span></div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-100 text-xs text-slate-600">
                  <strong>Pro tip:</strong> Even if you have the cash, taking a loan saves TCS. On ₹30L remittance: 5% TCS = ₹1.5L without loan vs 0.5% = ₹15K with loan. Net savings: ₹1.35L.
                </div>
              </CardContent></Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ APPLICATION STEPS ═══════ */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-3 px-4 py-1.5"><Clock className="mr-1.5 h-3.5 w-3.5" /> Process</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">4 Steps to Your Loan</h2>
            <p className="text-slate-600">From check to cash in your university account — typically 7-15 days</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border border-slate-200 h-full hover:shadow-lg transition-shadow"><CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-3"><s.icon className="w-6 h-6 text-white" /></div>
                  <div className="text-xs font-mono text-teal-600 font-bold mb-1">STEP {s.step}</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ELIGIBILITY ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-violet-100 text-violet-700 mb-3 px-4 py-1.5"><UserCheck className="mr-1.5 h-3.5 w-3.5" /> Eligibility</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What Lenders Actually Check</h2>
            <p className="text-slate-600">40% of applications get rejected. Here's how to be in the 60% that get approved.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Co-Applicant Income", desc: "Minimum ₹25,000/month net income. Salaried co-applicants have higher approval rates than self-employed.", icon: Wallet, color: "text-blue-600 bg-blue-50" },
              { title: "FOIR < 50%", desc: "Fixed Obligation to Income Ratio — existing EMIs must be less than 50% of monthly income. This is the #1 hidden rejection reason.", icon: Percent, color: "text-red-600 bg-red-50" },
              { title: "CIBIL Score 650+", desc: "Public banks want 750+. Private banks accept 700+. NBFCs accept 650+. One rejection makes the next harder.", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
              { title: "University Tier", desc: "Public banks fund top 100 only. Private banks expand to top 200. NBFCs fund any accredited university.", icon: GraduationCap, color: "text-amber-600 bg-amber-50" },
              { title: "Course Employability", desc: "STEM, MBA, and Healthcare get best rates. Arts and general courses may face higher scrutiny.", icon: Sparkles, color: "text-violet-600 bg-violet-50" },
              { title: "Age 18-35", desc: "Student must be 18-35 years. Co-applicant typically parent (max 60 at loan maturity) or sibling.", icon: Clock, color: "text-teal-600 bg-teal-50" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="border border-slate-100 hover:shadow-md transition-shadow"><CardContent className="p-5 flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center shrink-0`}><item.icon className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-amber-100 text-amber-700 mb-3 px-4 py-1.5"><FileText className="mr-1.5 h-3.5 w-3.5" /> FAQ</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 bg-gradient-to-br from-[#0d9488] to-[#134e4a] text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"><Landmark className="h-8 w-8 text-white" /></div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Finance Your Study Abroad?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Talk to our loan advisors who'll match you with the best lender based on your university, course, and financial profile. Free consultation, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#lead-form">
                <Button className="bg-white text-teal-700 hover:bg-gray-50 px-8 py-6 rounded-xl font-semibold text-base shadow-lg">
                  <ArrowRight className="mr-2 h-5 w-5" /> Talk to a Loan Advisor
                </Button>
              </Link>
              <Button onClick={() => scrollToSection("emi-section")} className="bg-white/15 text-white border border-white/30 hover:bg-white/25 px-8 py-6 rounded-xl font-semibold text-base">
                <Calculator className="mr-2 h-5 w-5" /> Calculate My EMI First
              </Button>
            </div>
            <p className="text-xs text-white/50 mt-4">Free consultation. No obligation. We don't charge students — lenders pay us.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
