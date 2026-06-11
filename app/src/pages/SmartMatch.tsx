import { useState, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Globe, PiggyBank, Gamepad2, ShieldCheck,
  Building2, Landmark, ChevronRight, ChevronLeft,
  GraduationCap, BookOpen, TrendingUp, DollarSign,
  Sparkles, Star, CheckCircle, AlertTriangle, Info,
  MapPin, Briefcase, Users, Award, ArrowRight,
  Lightbulb, X, BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const archetypes = [
  {
    id: "career",
    emoji: "\uD83D\uDE80",
    title: "The Career Climber",
    hook: "Land a ₹50L+ job at Google",
    wants: ["Post-study work rights", "Internship access", "Employability stats", "Strong alumni networks"],
    color: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50 border-blue-200",
  },
  {
    id: "global",
    emoji: "\uD83C\uDF0F",
    title: "The Global Citizen",
    hook: "Live in 3 countries before 25",
    wants: ["Multi-country mobility", "EU access", "Schengen visa benefits", "International exposure"],
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "smart",
    emoji: "\uD83D\uDCB0",
    title: "The Smart Investor",
    hook: "World-class degree at 1/4th the cost",
    wants: ["Tuition-free options", "Scholarship radar", "ROI calculator", "Low living costs"],
    color: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50 border-amber-200",
  },
  {
    id: "explorer",
    emoji: "\uD83C\uDFAE",
    title: "The Experience Seeker",
    hook: "Study by day, explore by night",
    wants: ["Part-time work hours", "City life", "Travel access", "Vibrant student culture"],
    color: "from-purple-500 to-pink-600",
    lightBg: "bg-purple-50 border-purple-200",
  },
  {
    id: "safe",
    emoji: "\uD83C\uDFE0",
    title: "The Safe Bet",
    hook: "PR in 2 years, not 10",
    wants: ["Clear immigration pathways", "Policy stability", "Indian community size", "Guaranteed outcomes"],
    color: "from-rose-500 to-red-600",
    lightBg: "bg-rose-50 border-rose-200",
  },
];

const budgetTiers = [
  { id: "under10", label: "Under ₹10 Lakhs", icon: "\uD83D\uDCB0", desc: "Very tight — Govt + Scholarship needed", range: [0, 10] },
  { id: "10to20", label: "₹10 - ₹20 Lakhs", icon: "\uD83D\uDCB0", desc: "Budget-friendly options available", range: [10, 20] },
  { id: "20to40", label: "₹20 - ₹40 Lakhs", icon: "\uD83D\uDCB0", desc: "Good range for most countries", range: [20, 40] },
  { id: "40to60", label: "₹40 - ₹60 Lakhs", icon: "\uD83D\uDCB0", desc: "Premium destinations accessible", range: [40, 60] },
  { id: "above60", label: "₹60 Lakhs+", icon: "\uD83D\uDCB0", desc: "All destinations open", range: [60, 999] },
];

const streams = [
  { id: "pcm", label: "PCM (Physics, Chem, Math)", icon: "\uD83D\uDD22", bestFor: ["Engineering", "Data Science", "AI", "Robotics", "Architecture"] },
  { id: "pcb", label: "PCB (Physics, Chem, Bio)", icon: "\uD83E\uDDEC", bestFor: ["Medicine", "Pharmacy", "Biotech", "Nursing", "Public Health"] },
  { id: "commerce", label: "Commerce", icon: "\uD83D\uDCC8", bestFor: ["Finance", "Accounting", "MBA", "Economics", "Marketing"] },
  { id: "arts", label: "Arts/Humanities", icon: "\uD83C\uDFA8", bestFor: ["Design", "Psychology", "Journalism", "Liberal Arts", "Law"] },
  { id: "notsure", label: "Not Sure Yet", icon: "\u2753", bestFor: ["Explore all options"] },
];

const scores = [
  { id: "above90", label: "90% and above", tier: "elite" },
  { id: "80to90", label: "80% - 90%", tier: "strong" },
  { id: "70to80", label: "70% - 80%", tier: "good" },
  { id: "below70", label: "Below 70%", tier: "average" },
  { id: "notyet", label: "Haven't appeared yet", tier: "unknown" },
];

/* ─── Result recommendations ─── */
function getRecommendations(archetype: string, institutionType: string, budgetId: string, streamId: string, scoreId: string) {
  const budgetLow = budgetId === "under10" || budgetId === "10to20";
  const budgetMid = budgetId === "20to40";
  const budgetHigh = budgetId === "40to60" || budgetId === "above60";
  const scoreHigh = scoreId === "above90" || scoreId === "80to90";

  type Rec = { country: string; program: string; why: string; roi: string; prEase: string; flag: string };
  const recs: Rec[] = [];

  // Career Climber
  if (archetype === "career") {
    if (budgetHigh && scoreHigh) {
      recs.push({ country: "USA", program: "MS in CS/Data Science", why: "Highest salaries ($120K+ avg). 36-month STEM OPT. Top employers: Google, Amazon, Meta.", roi: "₹95L starting salary", prEase: "Hard — H-1B lottery", flag: "\uD83C\uDDFA\uD83C\uDDF8" });
    }
    if (budgetMid || budgetHigh) {
      recs.push({ country: "Canada", program: "PG Diploma / MS", why: "3-year PGWP. Strong tech job market. Express Entry PR pathway. Indian community 2M+.", roi: "₹55L starting salary", prEase: "Easy — Express Entry", flag: "\uD83C\uDDE8\uD83C\uDDE6" });
      recs.push({ country: "UK", program: "MSc Data Science / AI", why: "2-year Graduate Route. London fintech hub. Strong employability stats.", roi: "₹40L starting salary", prEase: "Medium — Skilled Worker visa", flag: "\uD83C\uDDEC\uD83C\uDDE7" });
    }
    if (budgetLow) {
      recs.push({ country: "Germany", program: "MSc Engineering (TU9)", why: "Tuition-free public uni. ₹11L blocked account required (your money, released monthly). 18-month job seeker. EU Blue Card.", roi: "₹45L starting salary", prEase: "Easy — EU Blue Card", flag: "\uD83C\uDDE9\uD83C\uDDEA" });
      if (institutionType === "government") {
        recs.push({ country: "India + MS Abroad", program: "IIT UG → Germany/Canada MS", why: "IIT gives brand + Germany MS tuition-free. Budget ₹11L/yr blocked account for Germany.", roi: "₹50L+ combined advantage", prEase: "Best of both worlds", flag: "\uD83C\uDDEE\uD83C\uDDF3" });
      }
    }
  }

  // Global Citizen
  if (archetype === "global") {
    recs.push({ country: "Germany", program: "MS (any STEM)", why: "Tuition-free public uni. ₹11L/yr blocked account (Sperrkonto) required — your own money for living. 18-month job seeker. Schengen access.", roi: "₹45L starting salary", prEase: "Easy — EU Blue Card", flag: "\uD83C\uDDE9\uD83C\uDDEA" });
    recs.push({ country: "Netherlands", program: "MSc Engineering/Tech", why: "Orientation Year visa. 100% English programs. EU hub. High innovation economy.", roi: "₹35L starting salary", prEase: "Easy — Search Year visa", flag: "\uD83C\uDDF3\uD83C\uDDF1" });
    if (budgetHigh) {
      recs.push({ country: "Singapore", program: "MSc Business/Tech", why: "Gateway to Asia. Multi-cultural. Easy travel to 10+ countries. Strong finance hub.", roi: "₹40L starting salary", prEase: "Medium — Employment Pass", flag: "\uD83C\uDDF8\uD83C\uDDEC" });
    }
  }

  // Smart Investor
  if (archetype === "smart") {
    recs.push({ country: "Germany", program: "MS / MBA", why: "Tuition-free at public universities. ₹11L/yr blocked account required (your money released at ~₹90K/month). Best ROI globally.", roi: "₹45L salary, ~₹23L total cost", prEase: "Easy — EU Blue Card", flag: "\uD83C\uDDE9\uD83C\uDDEA" });
    if (institutionType === "government" || budgetLow) {
      recs.push({ country: "India (IIT/NIT) + Abroad MS", program: "IIT UG → Germany MS", why: "IIT is nearly free + Germany MS tuition-free. Budget ₹11L/yr blocked account for living. Total under ₹35L for both.", roi: "₹50L+ with IIT brand", prEase: "IIT brand opens doors everywhere", flag: "\uD83C\uDDEE\uD83C\uDDF3" });
    }
    recs.push({ country: "Ireland", program: "MSc Data Science / Pharma", why: "2-year stay-back visa. Lower tuition than UK. English-speaking. EU access.", roi: "₹38L starting salary", prEase: "Easy — 2-year stay back", flag: "\uD83C\uDDEE\uD83C\uDDEA" });
    if (budgetMid || budgetHigh) {
      recs.push({ country: "Canada", program: "PG Diploma / MS", why: "Affordable compared to USA. 3-year PGWP. Strong PR pathway. Part-time earnings offset costs.", roi: "₹55L salary, ₹94L total cost", prEase: "Easy — Express Entry", flag: "\uD83C\uDDE8\uD83C\uDDE6" });
    }
  }

  // Experience Seeker
  if (archetype === "explorer") {
    recs.push({ country: "Australia", program: "MS / MBA", why: "24 hrs/week part-time. Great weather. Vibrant cities. 2-4 year PSW. Beach + study lifestyle.", roi: "₹60L starting salary", prEase: "Medium — Points system", flag: "\uD83C\uDDE6\uD83C\uDDFA" });
    if (budgetMid || budgetHigh) {
      recs.push({ country: "UK (London)", program: "MSc / MA", why: "World's most vibrant student city. 2-year Graduate Route. Travel Europe on weekends.", roi: "₹40L starting salary", prEase: "Medium — Skilled Worker", flag: "\uD83C\uDDEC\uD83C\uDDE7" });
    }
    recs.push({ country: "Netherlands", program: "MSc (English-taught)", why: "Bike-friendly cities. International student hub. Orientation Year visa. Central Europe base.", roi: "₹35L starting salary", prEase: "Easy — Search Year visa", flag: "\uD83C\uDDF3\uD83C\uDDF1" });
  }

  // Safe Bet
  if (archetype === "safe") {
    recs.push({ country: "Canada", program: "MS / PG Diploma", why: "Fastest PR pathway. 3-year PGWP. Express Entry. 2M+ Indian community. Most predictable outcome.", roi: "₹55L salary, PR in 18 months", prEase: "Very Easy — Express Entry", flag: "\uD83C\uDDE8\uD83C\uDDE6" });
    recs.push({ country: "Germany", program: "MS Engineering", why: "EU Blue Card reforms (2024) lowered salary thresholds. Tuition-free public uni. ₹11L/yr blocked account required. 18-month job seeker.", roi: "₹45L salary, PR in 27 months", prEase: "Easy — EU Blue Card", flag: "\uD83C\uDDE9\uD83C\uDDEA" });
    recs.push({ country: "Ireland", program: "MSc (any)", why: "2-year stay-back visa. Critical Skills Employment Permit. Low tuition. English-speaking. Safe EU option.", roi: "₹38L salary, Stamp 4 in 2 years", prEase: "Easy — Stay-back visa", flag: "\uD83C\uDDEE\uD83C\uDDEA" });
    if (budgetHigh) {
      recs.push({ country: "Australia", program: "MS / MBA", why: "Streamlined PR for healthcare, engineering, IT. 4-year PSW for select degrees. High quality of life.", roi: "₹60L salary, PR in 3 years", prEase: "Medium — Points system", flag: "\uD83C\uDDE6\uD83C\uDDFA" });
    }
  }

  // Stream-specific adjustments
  if (streamId === "pcb") {
    const medRecs = recs.filter(r => ["Canada", "Germany", "UK", "Australia"].includes(r.country));
    if (medRecs.length === 0) medRecs.push(recs[0]);
    medRecs.forEach(r => { if (!r.program.includes("Medicine") && !r.program.includes("Nursing") && !r.program.includes("Pharma")) r.program = r.program.replace(/MS|MSc/, "MSc Biotech / Nursing"); });
    return medRecs.slice(0, 3);
  }

  if (streamId === "commerce") {
    recs.forEach(r => { if (!r.program.includes("MBA") && !r.program.includes("Finance")) r.program = r.program.replace(/MS|MSc/, "MBA / MS Finance"); });
  }

  if (streamId === "arts") {
    recs.forEach(r => { if (!r.program.includes("Design") && !r.program.includes("Arts")) r.program = "MA / MSc (subject-based)"; });
  }

  // If budget is low and they chose private, suggest government
  if (budgetLow && institutionType === "private" && recs.length < 3) {
    recs.push({ country: "India + Abroad", program: "Government UG + Scholarship MS", why: "Government college UG costs under ₹2L. Use savings for a top MS abroad. Best budget strategy.", roi: "₹40L+ with minimal debt", prEase: "Smart two-step approach", flag: "\uD83C\uDDEE\uD83C\uDDF3" });
  }

  return recs.slice(0, 3);
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function SmartMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    archetype: "",
    institutionType: "private",
    budget: "",
    stream: "",
    score: "",
  });
  const [showGovtPrompt, setShowGovtPrompt] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getRecommendations> | null>(null);

  const set = useCallback((key: string, value: string) => {
    setAnswers(a => ({ ...a, [key]: value }));
  }, []);

  const saveToEvaluate = useCallback(() => {
    const budgetMap: Record<string, number> = { under10: 10, "10to20": 20, "20to40": 35, "40to60": 50, above60: 80 };
    const streamMap: Record<string, string> = { pcm: "STEM", pcb: "Medicine", commerce: "Mgmt", arts: "Arts", notsure: "STEM" };
    const archetypePrMap: Record<string, string> = { career: "Low", global: "Low", smart: "Med", explorer: "Low", safe: "High" };
    localStorage.setItem("kc_smartmatch_data", JSON.stringify({
      archetype: answers.archetype,
      institutionType: answers.institutionType,
      budget: budgetMap[answers.budget] || 30,
      major: streamMap[answers.stream] || "STEM",
      prPriority: archetypePrMap[answers.archetype] || "Med",
      track: answers.institutionType === "private" ? "Private" : "Govt",
      level: answers.score === "above90" || answers.score === "80to90" ? "PG" : "UG",
    }));
  }, [answers]);

  const next = useCallback(() => {
    // If budget is low and institution is private, prompt for government
    if (step === 2 && answers.budget === "under10" && answers.institutionType === "private") {
      setShowGovtPrompt(true);
      return;
    }
    setShowGovtPrompt(false);
    if (step === 5) {
      const recs = getRecommendations(answers.archetype, answers.institutionType, answers.budget, answers.stream, answers.score);
      setResult(recs);
      saveToEvaluate();
    }
    setStep(s => s + 1);
  }, [step, answers, saveToEvaluate]);

  const prev = useCallback(() => { setStep(s => Math.max(0, s - 1)); setShowGovtPrompt(false); }, []);

  const selectArchetype = (id: string) => {
    set("archetype", id);
    setStep(1);
  };

  const steps = [
    "Your Vibe",
    "Institution Type",
    "Budget",
    "Stream",
    "Academic Score",
    "Your Results",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar />

      {/* Progress Bar */}
      {step < 6 && (
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              {steps.slice(0, 6).map((s, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? "bg-[#0d9488]" : "bg-gray-200"}`} />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Step {step + 1} of 6: <span className="font-semibold text-gray-900">{steps[step]}</span></p>
              {step > 0 && <button onClick={prev} className="text-xs text-[#0d9488] font-medium flex items-center gap-1 hover:underline"><ChevronLeft className="w-3 h-3" /> Back</button>}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">

          {/* ══════ STEP 0: ARCHETYPE ══════ */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/20 text-[#0d9488] text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" /> Smart Match Engine
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What&apos;s Your Vibe?</h1>
                <p className="text-gray-500 max-w-lg mx-auto">Pick the student type that sounds most like you. We&apos;ll match you to the perfect country and program.</p>
              </div>

              <div className="space-y-3">
                {archetypes.map(a => (
                  <button key={a.id} onClick={() => selectArchetype(a.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all hover:shadow-md group ${a.lightBg}`}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{a.emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">{a.title}</h3>
                        <p className="text-sm text-gray-600 italic mb-2">&ldquo;{a.hook}&rdquo;</p>
                        <div className="flex flex-wrap gap-1">
                          {a.wants.map(w => <span key={w} className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">{w}</span>)}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0d9488] shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════ STEP 1: INSTITUTION TYPE ══════ */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Private or Government?</h2>
                <p className="text-gray-500">This helps us find the right strategy for your budget and goals.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <button onClick={() => set("institutionType", "private")}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${answers.institutionType === "private" ? "border-[#0d9488] bg-[#0d9488]/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                  <Building2 className={`w-8 h-8 mb-3 ${answers.institutionType === "private" ? "text-[#0d9488]" : "text-gray-400"}`} />
                  <h3 className="font-bold text-gray-900 mb-1">Private Institution</h3>
                  <p className="text-sm text-gray-500">Premium colleges, better infrastructure, direct placement support. Higher fees but faster outcomes.</p>
                  {answers.institutionType === "private" && <Badge className="mt-3 bg-[#0d9488] text-white">Selected</Badge>}
                </button>
                <button onClick={() => set("institutionType", "government")}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${answers.institutionType === "government" ? "border-[#0d9488] bg-[#0d9488]/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                  <Landmark className={`w-8 h-8 mb-3 ${answers.institutionType === "government" ? "text-[#0d9488]" : "text-gray-400"}`} />
                  <h3 className="font-bold text-gray-900 mb-1">Government Institution</h3>
                  <p className="text-sm text-gray-500">Low-cost, high credibility (IITs, NITs, state universities). Best ROI. Great for budget-conscious students.</p>
                  {answers.institutionType === "government" && <Badge className="mt-3 bg-[#0d9488] text-white">Selected</Badge>}
                </button>
              </div>

              {answers.institutionType && (
                <div className="text-center">
                  <Button onClick={next} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-8 py-5 text-sm font-semibold">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* ══════ STEP 2: BUDGET ══════ */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What&apos;s Your Budget?</h2>
                <p className="text-gray-500">Total budget for the entire degree (tuition + living costs)</p>
              </div>

              {/* Government prompt if applicable */}
              {answers.institutionType === "government" && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-700">Great choice! Government institutions like IITs and NITs cost under ₹2-5L for the full degree. This gives you massive savings for a future MS abroad.</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {budgetTiers.map(bt => (
                  <button key={bt.id} onClick={() => set("budget", bt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers.budget === bt.id ? "border-[#0d9488] bg-[#0d9488]/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DollarSign className={`w-5 h-5 ${answers.budget === bt.id ? "text-[#0d9488]" : "text-gray-400"}`} />
                        <div>
                          <p className="font-semibold text-gray-900">{bt.label}</p>
                          <p className="text-xs text-gray-500">{bt.desc}</p>
                        </div>
                      </div>
                      {answers.budget === bt.id && <CheckCircle className="w-5 h-5 text-[#0d9488]" />}
                    </div>
                  </button>
                ))}
              </div>

              {answers.budget && (
                <div className="text-center">
                  <Button onClick={next} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-8 py-5 text-sm font-semibold">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Government recommendation prompt */}
              <AnimatePresence>
                {showGovtPrompt && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        <h3 className="text-lg font-bold text-gray-900">Smart Suggestion</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        With a budget under ₹10L, a <strong>Private institution abroad</strong> will be very tight. Most countries need ₹15L+ minimum.
                      </p>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                        <p className="text-sm text-amber-800 font-medium mb-1">Consider this strategy:</p>
                        <p className="text-sm text-amber-700">Government college in India (₹2-5L) → Save money → Germany MS (tuition-free, budget ₹11L/yr blocked account) or Canada with scholarship</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => { set("institutionType", "government"); setShowGovtPrompt(false); setStep(3); }}
                          className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl">
                          Switch to Government — Smart Move
                        </Button>
                        <Button onClick={() => { setShowGovtPrompt(false); next(); }} variant="outline"
                          className="w-full rounded-xl border-gray-200">
                          Stick with Private — Show me options
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ══════ STEP 3: STREAM ══════ */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What Did You Study?</h2>
                <p className="text-gray-500">Your 12th grade stream helps us find the best programs</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {streams.map(s => (
                  <button key={s.id} onClick={() => { set("stream", s.id); setStep(4); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm ${answers.stream === s.id ? "border-[#0d9488] bg-[#0d9488]/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{s.label}</p>
                        <p className="text-[10px] text-gray-500">Best for: {s.bestFor.join(", ")}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════ STEP 4: ACADEMIC SCORE ══════ */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Academic Performance?</h2>
                <p className="text-gray-500">This helps us suggest realistic target universities</p>
              </div>

              <div className="space-y-3 mb-6">
                {scores.map(sc => (
                  <button key={sc.id} onClick={() => { set("score", sc.id); const recs = getRecommendations(answers.archetype, answers.institutionType, answers.budget, answers.stream, sc.id); setResult(recs); setStep(5); }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers.score === sc.id ? "border-[#0d9488] bg-[#0d9488]/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          sc.tier === "elite" ? "bg-purple-100 text-purple-700" :
                          sc.tier === "strong" ? "bg-blue-100 text-blue-700" :
                          sc.tier === "good" ? "bg-emerald-100 text-emerald-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {sc.label[0]}
                        </div>
                        <p className="font-semibold text-gray-900">{sc.label}</p>
                      </div>
                      {answers.score === sc.id && <CheckCircle className="w-5 h-5 text-[#0d9488]" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════ STEP 5: RESULTS ══════ */}
          {step === 5 && result && (
            <motion.div key="s5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                  <BadgeCheck className="w-4 h-4" /> Your Smart Match Results
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {archetypes.find(a => a.id === answers.archetype)?.emoji} {archetypes.find(a => a.id === answers.archetype)?.title}
                </h2>
                <p className="text-gray-500">Based on your profile, here are your top recommendations</p>
              </div>

              {/* Summary badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                <Badge className="bg-blue-100 text-blue-700">{answers.institutionType === "private" ? "Private" : "Government"}</Badge>
                <Badge className="bg-amber-100 text-amber-700">{budgetTiers.find(b => b.id === answers.budget)?.label}</Badge>
                <Badge className="bg-purple-100 text-purple-700">{streams.find(s => s.id === answers.stream)?.label}</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">{scores.find(s => s.id === answers.score)?.label}</Badge>
              </div>

              {/* Results cards */}
              <div className="space-y-4 mb-8">
                {result.map((rec, i) => (
                  <div key={i} className={`bg-white rounded-2xl border-2 p-5 shadow-sm ${i === 0 ? "border-[#0d9488]" : "border-gray-100"}`}>
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{rec.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {i === 0 && <Badge className="bg-[#0d9488] text-white text-[10px]">Top Pick</Badge>}
                          <h3 className="font-bold text-gray-900">{rec.country}</h3>
                        </div>
                        <p className="text-sm font-semibold text-[#0d9488] mb-2">{rec.program}</p>
                        <p className="text-sm text-gray-600 mb-3">{rec.why}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {rec.roi}
                          </span>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> PR: {rec.prEase}
                          </span>
                        </div>
                        <Link
                          to="/universities"
                          onClick={() => sessionStorage.setItem("uni_filter_country", rec.country)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100"
                        >
                          <Building2 className="w-3 h-3" /> View Universities in {rec.country}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategy box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold">Your Strategy</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  As a <strong className="text-white">{archetypes.find(a => a.id === answers.archetype)?.title}</strong> with a <strong className="text-white">{budgetTiers.find(b => b.id === answers.budget)?.label}</strong> budget, your best path is:
                </p>
                <ol className="mt-3 space-y-2 text-sm text-white/80">
                  {answers.institutionType === "government" ? (
                    <>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">1.</span> Complete your degree at a government institution (under ₹5L)</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">2.</span> Build your profile with internships and projects</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">3.</span> Apply for MS abroad with your savings + part-time earnings</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">4.</span> Target Germany (free) or Canada (PR pathway) for your masters</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">1.</span> Apply to 5-8 universities (2 ambitious + 3 target + 2 safe)</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">2.</span> Secure scholarship to reduce costs by 20-50%</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">3.</span> Work part-time (20-24 hrs/week) to offset living costs</li>
                      <li className="flex items-start gap-2"><span className="text-[#0d9488] font-bold">4.</span> Use post-study work visa to gain experience and apply for PR</li>
                    </>
                  )}
                </ol>
              </div>

              {/* ══════ WHY GO DEEPER? ══════ */}
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-gray-900">This is Just a Preview — Here&apos;s What You&apos;re Missing</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Smart Match (Free Preview)</p>
                    <div className="space-y-1.5">
                      {["3 rough country ideas", "Based on 5 questions", "General program suggestions", "Estimated salary ranges"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Deep Dive Evaluation (Detailed)</p>
                    <div className="space-y-1.5">
                      {["Ranked scores across ALL 22 countries", "50+ data points analyzed", "IELTS, safety, ROI, employability scores", "Personalized consultant matching", "Exact programs with admission chances"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-800">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">Your Smart Match answers are already transferred. The Deep Dive will use them as a starting point and give you much more detailed, data-driven recommendations.</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/evaluate">
                  <Button className="bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0f766e] hover:to-[#0d9488] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-[#0d9488]/20">
                    <Sparkles className="w-5 h-5 mr-2" /> Unlock Full Deep Dive
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/#lead-form">
                  <Button variant="outline" className="border-gray-200 rounded-xl px-6 py-6 text-sm font-semibold">
                    <Users className="w-4 h-4 mr-2" /> Talk to an Expert
                  </Button>
                </Link>
                <button onClick={() => { setStep(0); setResult(null); setAnswers({ archetype: "", institutionType: "private", budget: "", stream: "", score: "" }); }}>
                  <Button variant="ghost" className="text-gray-400 hover:text-gray-600 rounded-xl px-6 py-6 text-sm">
                    Start Over
                  </Button>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
