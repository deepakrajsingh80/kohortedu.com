import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Heart, DollarSign, GraduationCap, Home, Phone,
  CheckCircle, AlertTriangle, TrendingUp, Users, MapPin,
  Clock, FileText, ArrowRight, Star, Lock, Eye, ChevronDown,
  ChevronUp, School, Briefcase, Stethoscope, Plane, MessageCircle,
  Download, Crown, Sparkles, Globe, BadgeCheck, XCircle, Info,
  Calculator, ChevronRight, Landmark, Banknote,
} from "lucide-react";

/* Smooth scroll helper for HashRouter */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Accordion Item ─── */
function FaqItem({ q, a, icon: Icon }: { q: string; a: string | ReactNode; icon?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-[#0d9488] shrink-0" />}
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="text-gray-600 text-sm leading-relaxed pl-8">{a}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Safety Score Bar ─── */
function SafetyBar({ country, score, text }: { country: string; score: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 w-24 shrink-0">{country}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full ${score >= 85 ? "bg-emerald-500" : score >= 70 ? "bg-amber-500" : "bg-red-400"}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-500 w-20 text-right">{text}</span>
    </div>
  );
}

/* ─── Cost Comparison Row ─── */
function CostRow({ country, tuition, living, total, highlight }: { country: string; tuition: string; living: string; total: string; highlight?: boolean }) {
  return (
    <tr className={`border-b border-gray-50 ${highlight ? "bg-[#0d9488]/[0.02]" : ""}`}>
      <td className="py-3 px-4 font-medium text-gray-900 text-sm">{country}</td>
      <td className="py-3 px-4 text-gray-600 text-sm">{tuition}</td>
      <td className="py-3 px-4 text-gray-600 text-sm">{living}</td>
      <td className="py-3 px-4 text-sm font-bold text-[#0d9488]">{total}</td>
    </tr>
  );
}

export default function ParentsPage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcCountry, setCalcCountry] = useState("Canada");
  const [calcYears, setCalcYears] = useState(2);

  const costMap: Record<string, { tuition: number; living: number }> = {
    Canada: { tuition: 25, living: 12 },
    USA: { tuition: 45, living: 18 },
    UK: { tuition: 22, living: 15 },
    Germany: { tuition: 2, living: 10 },
    Australia: { tuition: 28, living: 16 },
    Ireland: { tuition: 16, living: 12 },
    Singapore: { tuition: 30, living: 20 },
    Netherlands: { tuition: 10, living: 12 },
  };
  const c = costMap[calcCountry] || costMap.Canada;
  const totalCost = (c.tuition + c.living) * calcYears;
  const partTimeEarnings = calcCountry === "Germany" ? 12 : calcCountry === "USA" ? 15 : 10;
  const scholarshipOffset = c.tuition * 0.2;
  const netInvestment = totalCost - (partTimeEarnings * calcYears) - scholarshipOffset;
  const avgSalary = calcCountry === "USA" ? 95 : calcCountry === "Canada" ? 55 : calcCountry === "UK" ? 40 : calcCountry === "Germany" ? 45 : calcCountry === "Australia" ? 60 : 50;
  const paybackPeriod = netInvestment / avgSalary;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d9488] to-[#134e4a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> For Parents Who Want the Best for Their Child
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Sending Your Child Abroad Is a Big Decision.
              <span className="block text-white/90 mt-2">We&apos;re Here to Help You Make It With Confidence.</span>
            </h1>
            <p className="text-lg text-white/85 mb-8 leading-relaxed">
              Every parent worries. Is it safe? Will they get a job? Is it worth the money?
              We&apos;ve addressed every concern with real data, verified facts, and stories from parents who&apos;ve been in your shoes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/#lead-form">
                <Button className="bg-white text-teal-700 hover:bg-gray-50 px-6 py-5 text-sm font-semibold rounded-xl shadow-lg">
                  <Download className="w-4 h-4 mr-2" /> Download Parent Pack
                </Button>
              </Link>
              <button onClick={() => scrollToId("safety")}>
                <Button className="bg-white/15 text-white border border-white/30 hover:bg-white/25 px-6 py-5 text-sm font-semibold rounded-xl backdrop-blur-sm">
                  <Shield className="w-4 h-4 mr-2" /> Check Safety Data
                </Button>
              </button>
              <Link to="/student-loans">
                <Button className="bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:bg-amber-500/30 px-6 py-5 text-sm font-semibold rounded-xl backdrop-blur-sm">
                  <Landmark className="w-4 h-4 mr-2" /> Explore Education Loans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0d9488]" /> Safety Verified</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0d9488]" /> Government Accredited</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#0d9488]" /> 2,500+ Parent Consultations</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Parent Rating</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">

        {/* Safety */}
        <section id="safety">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <Badge className="bg-red-50 text-red-600 border-red-100 mb-3">Top Concern #1</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Will My Child Be Safe?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Safety is every parent&apos;s first worry. Here&apos;s how countries rank on safety, healthcare, Indian community support, and staying connected.
              </p>
              <div className="space-y-4">
                <SafetyBar country="Singapore" score={95} text="Very Safe" />
                <SafetyBar country="Canada" score={90} text="Very Safe" />
                <SafetyBar country="Germany" score={88} text="Very Safe" />
                <SafetyBar country="Australia" score={85} text="Safe" />
                <SafetyBar country="UK" score={82} text="Safe" />
                <SafetyBar country="Ireland" score={80} text="Safe" />
                <SafetyBar country="USA" score={75} text="Moderate" />
                <SafetyBar country="France" score={72} text="Moderate" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-gray-900">Healthcare Access</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" /><span className="text-gray-600"><strong className="text-gray-900">UK:</strong> NHS - free healthcare after visa surcharge (£470/yr)</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" /><span className="text-gray-600"><strong className="text-gray-900">Canada:</strong> Provincial health plans - coverage varies by province</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" /><span className="text-gray-600"><strong className="text-gray-900">Germany:</strong> Public health insurance €120/month - mandatory, comprehensive</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" /><span className="text-gray-600"><strong className="text-gray-900">Australia:</strong> OSHC mandatory ~AUD 500/yr - covers hospital and GP</span></div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Staying Connected</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Most universities have <strong>dedicated Indian student associations</strong> that act as extended family.</p>
                  <p>Countries like Canada, UK, and Australia have <strong>24/7 international student helplines</strong>.</p>
                  <p>Time difference: Canada (9.5-12.5 hrs), UK (4.5-5.5 hrs), Germany (3.5-4.5 hrs), Australia (4.5-5.5 hrs ahead).</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Indian Community Size</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">USA</span><span className="font-semibold text-gray-900">4.4M+</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Canada</span><span className="font-semibold text-gray-900">2M+</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">UK</span><span className="font-semibold text-gray-900">1.8M+</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Australia</span><span className="font-semibold text-gray-900">780K+</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Singapore</span><span className="font-semibold text-gray-900">360K+</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Germany</span><span className="font-semibold text-gray-900">200K+</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost & ROI */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-amber-50 text-amber-600 border-amber-100 mb-3">Top Concern #2</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Is It Worth the Investment?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See the full financial picture - not just tuition, but living costs, part-time earnings, scholarships, and salary payback timelines.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Country</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tuition/Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Living/Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total (2 Years)</th>
                </tr></thead>
                <tbody>
                  <CostRow country="Germany" tuition="₹1-8L" living="₹10L" total="₹22L" highlight />
                  <CostRow country="Netherlands" tuition="₹8-15L" living="₹12L" total="₹46L" />
                  <CostRow country="Ireland" tuition="₹10-25L" living="₹12L" total="₹74L" />
                  <CostRow country="Canada" tuition="₹15-35L" living="₹12L" total="₹94L" />
                  <CostRow country="UK" tuition="₹15-30L" living="₹15L" total="₹90L" />
                  <CostRow country="Australia" tuition="₹20-35L" living="₹16L" total="₹1.02Cr" />
                  <CostRow country="Singapore" tuition="₹20-40L" living="₹20L" total="₹1.2Cr" />
                  <CostRow country="USA" tuition="₹30-55L" living="₹18L" total="₹1.46Cr" />
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 px-4 py-3 border-t border-gray-50">* Figures are indicative. Actual costs vary by university, city, and lifestyle. Scholarships can reduce tuition by 20-100%.</p>
          </div>

          {/* ROI Calculator — Always visible */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-teal-400" />
              <h3 className="text-lg font-bold text-white">ROI Calculator for Parents</h3>
            </div>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-300 mb-1.5 block font-medium">Country</label>
                  <select value={calcCountry} onChange={e => setCalcCountry(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white">
                    {Object.keys(costMap).map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-300 mb-1.5 block font-medium">Program Duration</label>
                  <select value={calcYears} onChange={e => setCalcYears(Number(e.target.value))} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white">
                    {[1, 2, 3, 4].map(y => <option key={y} value={y} className="text-gray-900">{y} Year{y > 1 ? "s" : ""}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="bg-teal-500/20 rounded-xl p-3 w-full text-center border border-teal-400/30">
                    <p className="text-[10px] text-teal-200">Payback Period</p>
                    <p className="text-xl font-bold text-teal-400">{paybackPeriod.toFixed(1)} years</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-300 mb-1">Total Investment</p>
                  <p className="text-lg font-bold text-white">₹{totalCost}L</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-300 mb-1">Part-time Earnings</p>
                  <p className="text-lg font-bold text-emerald-400">+₹{partTimeEarnings * calcYears}L</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <p className="text-[10px] text-gray-300 mb-1">Scholarship (est. 20%)</p>
                  <p className="text-lg font-bold text-amber-400">-₹{scholarshipOffset * calcYears}L</p>
                </div>
                <div className="bg-teal-500/10 rounded-xl p-3 text-center border border-teal-400/30">
                  <p className="text-[10px] text-teal-200 mb-1">Net Cost</p>
                  <p className="text-lg font-bold text-teal-400">₹{Math.round(netInvestment)}L</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-300 mb-1">Avg Starting Salary</p>
                  <p className="text-lg font-bold text-white">₹{avgSalary}L / year</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-300 mb-1">Break-even Timeline</p>
                  <p className="text-lg font-bold text-emerald-400">{paybackPeriod.toFixed(1)} years</p>
                </div>
              </div>

              <div className="bg-teal-500/10 border border-teal-400/20 rounded-xl p-4 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Is it worth it? <span className="text-teal-400">Yes — overwhelmingly.</span></p>
                  <p className="text-xs text-gray-300 mt-1">STEM and Business graduates typically earn 20-40% more than the average above. Most Indian students working abroad recover their full investment within 2-3 years. Compare all 22 countries with our Decision Engine.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/evaluate">
                  <Button className="bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-sm font-semibold">
                    <Calculator className="w-4 h-4 mr-2" /> Run Decision Engine
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-semibold">
                    <Crown className="w-4 h-4 mr-2" /> Get Full Reports — ₹999
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* University Verification */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-blue-50 text-blue-600 border-blue-100 mb-3">Top Concern #3</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Is the University Genuine?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">How to verify a university is legitimate, accredited, and recognized back in India.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "Government Accreditation", desc: "Check the university is listed on the country's official higher education register (e.g., HESA UK, DLI Canada, CRICOS Australia).", color: "text-emerald-600 bg-emerald-50" },
              { icon: Globe, title: "Global Rankings", desc: "QS, THE, and ARWU rankings. Top 500 = globally recognized. Top 200 = elite. We only list ranked universities.", color: "text-blue-600 bg-blue-50" },
              { icon: BadgeCheck, title: "AIU Equivalence", desc: "Association of Indian Universities (AIU) grants equivalence to foreign degrees. Check your child's degree will be valid in India.", color: "text-purple-600 bg-purple-50" },
              { icon: Briefcase, title: "Employer Recognition", desc: "Degrees from top 500 universities are recognized by MNCs in India. IIT/IIM alumni who studied abroad lead hiring at top firms.", color: "text-amber-600 bg-amber-50" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-gray-900">Red Flags to Watch For</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "University not found on official government registers",
                "No physical campus address or virtual-only presence",
                "Guaranteed degree without attendance requirements",
                "No alumni network or employer partnerships",
                "Tuition fees 50%+ below market rate for the country",
                "Pressure to pay full fees before visa approval",
              ].map((flag, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{flag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa & Policy Stability */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-purple-50 text-purple-600 border-purple-100 mb-3">Top Concern #4</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Will Visa Rules Change?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Immigration policy stability for each country - and what it means for your child's future.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { country: "Canada", status: "Stable", color: "bg-emerald-100 text-emerald-700", detail: "PGWP 3 years, Express Entry - consistent for 10+ years. 2026 intake caps are a temporary adjustment, not a policy reversal." },
              { country: "Germany", status: "Improving", color: "bg-emerald-100 text-emerald-700", detail: "EU Blue Card reforms (2024) made it easier. 18-month job seeker visa. Tuition-free public universities." },
              { country: "Australia", status: "Stable", color: "bg-emerald-100 text-emerald-700", detail: "Streamlined PR pathway. Post-study work 2-4 years. High minimum wages protect students." },
              { country: "Ireland", status: "Stable", color: "bg-emerald-100 text-emerald-700", detail: "2-year stay-back visa. Critical Skills Employment Permit. Low tuition, English-speaking." },
              { country: "UK", status: "Caution", color: "bg-amber-100 text-amber-700", detail: "Graduate Route 2 years intact. Salary threshold rising to £38,700. Still viable for top graduates." },
              { country: "USA", status: "Uncertain", color: "bg-amber-100 text-amber-700", detail: "H-1B lottery (25% odds), no direct PR. But highest salaries. Best for students targeting top 50 universities." },
              { country: "Singapore", status: "Stable", color: "bg-emerald-100 text-emerald-700", detail: "COMPASS framework (2024) is transparent and predictable. Easy PR for skilled graduates." },
              { country: "Netherlands", status: "Stable", color: "bg-emerald-100 text-emerald-700", detail: "Orientation Year visa. English-taught programs. Strong innovation economy hiring internationally." },
            ].map((v, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{v.country}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.color}`}>{v.status}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodation */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-teal-50 text-teal-600 border-teal-100 mb-3">Top Concern #5</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Where Will My Child Live?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Housing options, costs, and safety for international students in each country.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: "On-Campus Residence", cost: "$800-1,500/mo", pros: "Safest, meals included, instant friends", cons: "Limited spots, must apply early", best: "USA, Canada, UK, Australia" },
              { type: "Private Student Housing", cost: "$600-1,200/mo", pros: "Modern facilities, near campus, student-only", cons: "Premium pricing", best: "UK, Australia, Ireland" },
              { type: "Shared Apartment (PG)", cost: "$400-800/mo", pros: "Most affordable, Indian roommates possible", cons: "Need to find trustworthy flatmates", best: "Germany, Canada, Netherlands" },
              { type: "Homestay with Local Family", cost: "$700-1,000/mo", pros: "Cultural immersion, home-cooked meals, family support", cons: "Less independence", best: "Australia, Ireland, New Zealand" },
              { type: "University-Affiliated Housing", cost: "$500-900/mo", pros: "University vetted, maintenance support", cons: "Waitlists common", best: "Germany, Singapore, Netherlands" },
              { type: "Solo Studio Apartment", cost: "$1,000-2,000/mo", pros: "Complete privacy and independence", cons: "Most expensive, can be isolating", best: "For students in Year 2+ with part-time income" },
            ].map((h, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <Home className="w-5 h-5 text-[#0d9488] mb-2" />
                <h3 className="font-bold text-gray-900 text-sm mb-1">{h.type}</h3>
                <p className="text-xs text-[#0d9488] font-semibold mb-2">{h.cost}</p>
                <p className="text-xs text-gray-500 mb-1"><strong className="text-emerald-600">Pros:</strong> {h.pros}</p>
                <p className="text-xs text-gray-500 mb-2"><strong className="text-red-500">Cons:</strong> {h.cons}</p>
                <Badge variant="outline" className="text-[10px] border-gray-200 text-gray-500">Best for: {h.best}</Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Parent Testimonials */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-pink-50 text-pink-600 border-pink-100 mb-3">Parent Toolkit</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What Every Parent Should Know</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Safety & Indian Community", desc: "Canada, Australia & UK have the largest Indian student populations. Every country page shows Indian safety index, community size, and embassy support contacts.", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Calculator, title: "True Cost Breakdown", desc: "Tuition is only half the story. Our Decision Engine factors in living costs, part-time earnings, tax rates, and post-study work visas to show the real Net Out-of-Pocket.", color: "text-amber-600", bg: "bg-amber-50" },
              { icon: GraduationCap, title: "Academic Requirements", desc: "Top Canadian unis need 75%+, Germany's TU9 needs 75%+, Singapore needs 80%+. Every country and university page shows minimum marks needed so you know what's realistic.", color: "text-blue-600", bg: "bg-blue-50" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-10">
            <Badge className="bg-gray-100 text-gray-600 border-gray-200 mb-3">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Every Question a Parent Asks</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            <FaqItem q="What if my child gets sick abroad?" icon={Stethoscope}
              a={<span>All study destinations require health insurance as part of the visa. UK (NHS), Canada (provincial plans), Germany (public insurance €120/mo), and Australia (OSHC) provide comprehensive coverage. Most universities also have on-campus health centers with 24/7 emergency lines.</span>} />
            <FaqItem q="How do we know the university is genuine?" icon={Shield}
              a={<span>Check three things: (1) Government education register (DLI for Canada, HESA for UK, CRICOS for Australia), (2) QS/THE global rankings — we only recommend ranked universities, (3) AIU equivalence for degree validity in India. Our consultants verify all three before recommending any institution.</span>} />
            <FaqItem q="Will my child get a job after graduating?" icon={Briefcase}
              a={<span>Post-study work visas range from 1-4 years depending on country. Canada (3 years), Australia (2-4 years), UK (2 years), Germany (18 months) all offer generous work periods. STEM graduates in USA earn ₹75L+ average starting salary. Our ROI calculator shows country-specific payback periods.</span>} />
            <FaqItem q="Can they come back to India and get a job?" icon={Plane}
              a={<span>Absolutely. A foreign degree from a top-500 university is highly valued in India. MNCs like Google, Amazon, McKinsey, and BCG actively recruit returning graduates. Starting salaries for returning MS graduates range from ₹25-60L in India. The AIU equivalence ensures degree recognition.</span>} />
            <FaqItem q="What if visa rules change while they're studying?" icon={AlertTriangle}
              a={<span>Historically, visa changes are forward-looking and don't affect current students. Canada's PGWP, UK's Graduate Route, and Australia's PSW have remained stable. Our Policy Stability Score monitors each country — we flag risks early and suggest backup countries where credits can transfer.</span>} />
            <FaqItem q="How do we stay in touch? What about time differences?" icon={Phone}
              a={<span>UK/Ireland (4.5 hrs behind), Germany (3.5 hrs behind), Canada (9.5-12.5 hrs behind), Australia (4.5 hrs ahead). Most students call parents daily via WhatsApp. Universities have parent portals and Indian student associations organize regular family video calls.</span>} />
            <FaqItem q="What if my child feels homesick or faces mental health issues?" icon={Heart}
              a={<span>Every major university has counseling services (free and confidential). Countries like Canada, UK, and Australia have strong mental health support for international students. Indian student associations provide peer support. We recommend universities with dedicated international student well-being offices.</span>} />
            <FaqItem q="Is it better than studying in India (IITs/IIMs)?" icon={School}
              a={<span>It depends on goals. IITs/IIMs are excellent for India-centric careers. Abroad offers: (1) 3-5x higher starting salaries, (2) PR/citizenship pathways, (3) global career mobility, (4) research opportunities, (5) exposure to diverse cultures. Many students do both — IIT UG + MS abroad for maximum advantage.</span>} />
            <FaqItem q="What if my child doesn't get admission?" icon={XCircle}
              a={<span>We recommend applying to 5-8 universities (2 ambitious, 3 target, 2 safe). With our profile evaluation, students know their chances before applying. If admission doesn't work out, gap year options, alternative intakes (January), and pathway programs are available. No student we've worked with has been left without an option.</span>} />
            <FaqItem q="How do we manage the money transfer?" icon={DollarSign}
              a={<span>Use authorized dealers (banks like SBI, ICICI, HDFC) for wire transfers. RBI allows up to $250,000/year under Liberalized Remittance Scheme. For tuition, pay directly to the university account. Never pay an agent in cash — always traceable bank transfers. We guide parents through this process.</span>} />
            <FaqItem q="What documents do we need for education loan?" icon={FileText}
              a={<span>Typically: (1) Admission letter from university, (2) Fee structure, (3) Parent's income proof (ITR/Form 16), (4) Collateral documents (property/FD), (5) Student's academic records, (6) Co-applicant (parent) KYC. Most banks sanction loans within 2-4 weeks. We have partnerships with SBI, HDFC Credila, and Axis Bank.</span>} />
            <FaqItem q="What if something goes wrong — can they come back immediately?" icon={Plane}
              a={<span>Yes. Direct flights to India operate daily from all major study destinations (10-16 hours). Emergency tickets can be booked within 24 hours. We recommend keeping a contingency fund of ₹2-3L for emergency travel. Every student should have travel insurance covering trip interruption.</span>} />
          </div>
        </section>

        {/* Backup Plan */}
        <section className="bg-amber-50 border border-amber-100 rounded-3xl p-6 sm:p-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">The Backup Plan Every Parent Needs</h2>
          </div>
          <p className="text-gray-600 mb-6">&quot;What if the country changes its policy?&quot; Here's your safety net.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Credit Transfer", desc: "Most countries accept transferred credits. Switch from UK to Ireland, USA to Canada, or Germany to Netherlands mid-degree.", icon: Globe },
              { title: "Alternative Intake", desc: "Missed September? Apply for January intake. Many universities offer dual intakes.", icon: Clock },
              { title: "Pathway Programs", desc: "If direct admission is tough, pathway programs guarantee progression to the main degree after 6-12 months.", icon: School },
              { title: "Emergency Fund", desc: "Keep ₹3-5L as contingency for visa delays, medical emergencies, or early return flights.", icon: DollarSign },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-amber-100">
                <b.icon className="w-5 h-5 text-amber-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Loans Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-4">
                <Landmark className="w-3.5 h-3.5" /> Education Loans
              </div>
              <h2 className="text-2xl font-bold mb-2">Money Problem? No Problem.</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Compare 9 top lenders — SBI, HDFC Credila, Avanse, ICICI & more. Get upto ₹2 Cr at rates starting 8.33%. Both <strong className="text-white">secured</strong> (with property) and <strong className="text-white">unsecured</strong> (no collateral) options available. Section 80E saves ₹10-12L in taxes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/student-loans">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-5 rounded-xl font-semibold text-sm">
                    <Landmark className="w-4 h-4 mr-2" /> Explore Loans <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/student-loans#emi-calculator">
                  <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-6 py-5 rounded-xl font-semibold text-sm">
                    <Calculator className="w-4 h-4 mr-2" /> Calculate EMI
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-2xl font-bold text-amber-400">8.33%</p>
                <p className="text-[10px] text-gray-400 mt-1">Lowest Rate (SBI)</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-2xl font-bold text-emerald-400">₹2 Cr</p>
                <p className="text-[10px] text-gray-400 mt-1">Max Loan Amount</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-2xl font-bold text-teal-400">7-15 Days</p>
                <p className="text-[10px] text-gray-400 mt-1">Approval Time</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <p className="text-2xl font-bold text-blue-400">₹12L</p>
                <p className="text-[10px] text-gray-400 mt-1">Tax Savings (80E)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0d9488] to-[#134e4a] rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Download our comprehensive Parent Pack with detailed cost breakdowns, safety guides, university verification checklist, and emergency contacts — or book a free call with a parent advisor.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/#lead-form">
              <Button className="bg-white text-[#0d9488] hover:bg-white/90 px-8 py-5 text-sm font-semibold rounded-xl">
                <Download className="w-4 h-4 mr-2" /> Download Parent Pack (PDF)
              </Button>
            </Link>
            <a href="tel:+919999999999">
              <Button className="bg-white/15 text-white border border-white/30 hover:bg-white/25 px-8 py-5 text-sm font-semibold rounded-xl">
                <Phone className="w-4 h-4 mr-2" /> Talk to a Parent Advisor
              </Button>
            </a>
          </div>
          <p className="text-xs text-white/50 mt-4">Free consultation. No obligation. Speak to parents who&apos;ve sent their children abroad.</p>
        </section>

      </div>

      <Footer />
    </div>
  );
}
