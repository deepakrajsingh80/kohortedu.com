import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinations } from "@/data/destinations";
import { getConsultantsForCountry } from "@/data/consultants";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { StudentsCorner } from "@/components/StudentsCorner";
import { useCart } from "@/context/CartContext";
import { SEO } from "@/components/SEO";
import { ACADEMIC_THRESHOLD } from "@/data/decisionEngine";
import { COURSE_REQUIREMENTS } from "@/data/courseRequirements";
import {
  Globe, TrendingUp, Banknote, GraduationCap, Star,
  CheckCircle, ArrowRight, MapPin, Briefcase, Shield,
  Zap, Target, Heart, Sun, Thermometer, Stethoscope, Clock,
  DollarSign, BookOpen, Award, Sparkles, Calendar, Users,
  Phone, Mail, MessageCircle, Lock, Crown, ChevronRight,
  Lightbulb, Eye, TrendingUp as TrendingUpIcon, ShoppingCart,
  AlertTriangle, Home, Info, BookmarkPlus, X, Route,
  CloudSun, Landmark, BarChart3, FlaskConical, HeartPulse,
  Pill, Dna, Shirt, Utensils, Newspaper, Clapperboard, Microscope,
} from "lucide-react";

/* Helper: Convert currency string like "$20K-60K/yr" to INR range */
function toINR(value: string, rate: number): string {
  if (!value || !rate) return "";
  const matches = value.match(/(\d+(?:\.\d+)?)\s*([KM]?)/gi);
  if (!matches) return "";
  const parts: string[] = [];
  for (const m of matches) {
    const n = parseFloat(m);
    const suffix = m.replace(/[\d.]/g, "").toUpperCase();
    let multiplier = 1;
    if (suffix === "K") multiplier = 1000;
    if (suffix === "M") multiplier = 1000000;
    const inr = Math.round(n * multiplier * rate / 100000);
    if (inr > 0) parts.push(`₹${inr}L`);
  }
  return parts.length > 0 ? parts.join(" - ") : "";
}

/* ═════════════════════════════════════════════════════════════════
   PER-DESTINATION SEO — Unique title, description & keywords
   ═════════════════════════════════════════════════════════════════ */
const destinationSEO: Record<string, { title: string; desc: string; keywords: string }> = {
  usa: {
    title: "Study in USA for Indian Students — Complete 2026 Guide",
    desc: "Study in USA: Tuition $20K-60K/yr, 12-36 months OPT, 4000+ universities. Visa process, scholarships, STEM courses, H1B pathway & living costs for Indian students.",
    keywords: "study in usa, study in usa for indian students, ms in usa, mba in usa, usa student visa, opt extension usa, stem courses usa, study abroad consultants for usa",
  },
  canada: {
    title: "Study in Canada for Indian Students — PR-Friendly Guide 2026",
    desc: "Study in Canada: CAD 15K-35K/yr tuition, 3-year PGWP, direct PR pathway. Apply for SDS stream, scholarships, co-op programs & settle permanently after graduation.",
    keywords: "study in canada, study in canada for indian students, canada pr after study, pgwp canada, study abroad consultants for canada, best consultancy for canada study permit",
  },
  uk: {
    title: "Study in UK for Indian Students — PSW & Graduate Route 2026",
    desc: "Study in UK: £1-2L/yr tuition, 2-year Graduate Route (PSW), top Russell Group universities. Learn about UK student visa, scholarships, Tier 4 requirements & living costs.",
    keywords: "study in uk, study in uk for indian students, psw uk, graduate route uk, ms in uk, mba in uk, study abroad consultants for uk, best consultancy for uk student visa",
  },
  australia: {
    title: "Study in Australia for Indian Students — PR Pathway Guide 2026",
    desc: "Study in Australia: AUD 20K-45K/yr tuition, post-study work visa, strong PR pathway. Explore Group of Eight universities, scholarships, skilled occupation list & settlement options.",
    keywords: "study in australia, study in australia for indian students, pr courses in australia, study abroad consultants for australia, best consultancy for australia pr",
  },
  germany: {
    title: "Study in Germany for Indian Students — Free Tuition Guide 2026",
    desc: "Study in Germany: Free public university tuition, blocked account ₹11L/yr, 18-month job seeker visa. Learn about DAAD scholarships, German language requirements & permanent residency.",
    keywords: "study in germany, study in germany for indian students, blocked account germany, tuition free universities germany, ms in germany, study abroad consultants for germany",
  },
  ireland: {
    title: "Study in Ireland for Indian Students — 2-Year Stay Back 2026",
    desc: "Study in Ireland: EUR 10K-25K/yr tuition, 2-year stay back visa, EU's fastest growing economy. Top tech companies, scholarships, low cost of living & PR pathway guide.",
    keywords: "study in ireland, study in ireland for indian students, ireland student visa, stay back visa ireland, study abroad consultants for ireland",
  },
  dubai: {
    title: "Study in Dubai for Indian Students — Cost, Visa & Universities 2026",
    desc: "Study in Dubai: AED 30K-80K/yr tuition, student visa, tax-free salaries post-graduation. Explore UAE universities, scholarship programs, part-time work rules & living costs.",
    keywords: "study in dubai, study in dubai for indian students, dubai student visa, universities in dubai, study abroad consultants for dubai, cost of studying in dubai",
  },
  singapore: {
    title: "Study in Singapore for Indian Students — Top Universities 2026",
    desc: "Study in Singapore: SGD 20K-50K/yr tuition, NUS & NTU ranked top 20 globally, strong tech industry. Learn about tuition grants, student pass, scholarships & job prospects.",
    keywords: "study in singapore, study in singapore for indian students, mba in singapore, nus singapore, study abroad consultants for singapore",
  },
  france: {
    title: "Study in France for Indian Students — Low Cost & Scholarships 2026",
    desc: "Study in France: EUR 200-3K/yr public tuition, 2-year APS visa, world-class business schools. Explore Campus France process, Eiffel scholarships, INSEAD & living costs.",
    keywords: "study in france, study in france for indian students, mba in france, campus france, eiffel scholarship, study abroad consultants for france",
  },
  portugal: {
    title: "Study in Portugal for Indian Students — Affordable EU Education 2026",
    desc: "Study in Portugal: EUR 3K-12K/yr tuition, Golden Visa pathway, warm climate & affordable living. Explore universities in Lisbon, Porto, scholarships & EU job opportunities.",
    keywords: "study in portugal, study in portugal for indian students, portugal golden visa, affordable universities europe, study abroad consultants for portugal",
  },
  spain: {
    title: "Study in Spain for Indian Students — Low Tuition EU Guide 2026",
    desc: "Study in Spain: EUR 1K-4K/yr public tuition, warm climate, post-study job search visa. Explore top Spanish universities, MBA programs, scholarships & living in Spain.",
    keywords: "study in spain, study in spain for indian students, mba in spain, spanish universities, study abroad consultants for spain",
  },
  newzealand: {
    title: "Study in New Zealand for Indian Students — PR-Friendly Guide 2026",
    desc: "Study in New Zealand: NZD 22K-35K/yr tuition, 3-year post-study work visa, straightforward PR pathway. Explore 8 universities, skilled migrant category & scholarships.",
    keywords: "study in new zealand, study in new zealand for indian students, pr courses in new zealand, study abroad consultants for new zealand",
  },
  "south-korea": {
    title: "Study in South Korea for Indian Students — Scholarships & KLI 2026",
    desc: "Study in South Korea: KRW 4M-12M/yr tuition, GKS full scholarship available, booming tech industry. Learn about Korean language programs, student visa D-2 & part-time work.",
    keywords: "study in south korea, study in south korea for indian students, gks scholarship, korean universities, study abroad consultants for south korea",
  },
  malaysia: {
    title: "Study in Malaysia for Indian Students — Affordable & High Quality 2026",
    desc: "Study in Malaysia: MYR 15K-50K/yr tuition, multicultural environment, branch campuses of UK/Australian universities. Explore MIS scholarship, student pass & low living costs.",
    keywords: "study in malaysia, study in malaysia for indian students, mis scholarship malaysia, affordable study abroad, study abroad consultants for malaysia",
  },
};

/* ═════════════════════════════════════════════════════════════════
   SUPPLEMENTARY COUNTRY DATA — "Real Talk" features
   ═════════════════════════════════════════════════════════════════ */
const countryRealTalk: Record<string, {
  partTimeHours: string;
  pswDuration: string;
  indianCommunity: string;
  policyStatus: "Stable" | "Improving" | "Caution" | "Uncertain";
  policyAlert?: string;
  bestFor: string[];
  accommodation: { type: string; cost: string; pros: string; cons: string; best: string }[];
  peerComparison: { profile: string; topChoice: string; percentage: string }[];
  reality2026: string;
}> = {
  "canada": {
    partTimeHours: "24 hrs/week",
    pswDuration: "Up to 3 years",
    indianCommunity: "2M+ strong",
    policyStatus: "Stable",
    policyAlert: "2026 intake caps are a temporary adjustment — PGWP and Express Entry remain unchanged. Apply early for Sept 2026.",
    bestFor: ["Tech", "Healthcare", "Business", "Engineering"],
    accommodation: [
      { type: "On-Campus", cost: "$800-1,200/mo", pros: "Safest, meal plans included", cons: "Limited spots, apply early", best: "Year 1 students" },
      { type: "Shared Apartment", cost: "$500-800/mo", pros: "Most affordable, Indian roommates", cons: "Find trustworthy flatmates", best: "Budget-conscious" },
      { type: "Private Student Housing", cost: "$700-1,000/mo", pros: "Modern, near campus", cons: "Premium price", best: "Convenience seekers" },
      { type: "Basement Suite", cost: "$400-700/mo", pros: "Cheapest option, independent", cons: "Can be isolating", best: "Students with part-time jobs" },
    ],
    peerComparison: [
      { profile: "PCM, 85%, Budget ₹20L", topChoice: "Germany", percentage: "42%" },
      { profile: "Commerce, 80%, Budget ₹35L", topChoice: "Canada", percentage: "38%" },
      { profile: "Bio, 75%, Budget ₹25L", topChoice: "Germany", percentage: "35%" },
      { profile: "Any, 90%+, Budget ₹60L+", topChoice: "USA", percentage: "45%" },
    ],
    reality2026: "Express Entry draws have stabilized at 500+ CRS. PGWP remains 3 years for programs over 2 years. New study permit cap for 2026 — apply by December 2025 for Sept 2026 intake.",
  },
  "usa": {
    partTimeHours: "20 hrs/week (on-campus)",
    pswDuration: "12-36 months (OPT)",
    indianCommunity: "4.4M+ (largest)",
    policyStatus: "Uncertain",
    policyAlert: "H-1B lottery has ~25% odds. No direct PR pathway. Best for students targeting top 50 universities with high-paying STEM careers.",
    bestFor: ["Tech", "Finance", "Research", "Medicine"],
    accommodation: [
      { type: "On-Campus", cost: "$1,000-1,500/mo", pros: "Safest, includes meal plan", cons: "Expensive, limited spots", best: "Year 1 students" },
      { type: "Shared Apartment", cost: "$600-1,000/mo", pros: "Affordable in groups", cons: "Lease paperwork complex", best: "Students with SSN" },
      { type: "Private Dorms", cost: "$900-1,400/mo", pros: "Near campus, student events", cons: "Pricey", best: "Social students" },
    ],
    peerComparison: [
      { profile: "CS, 90%+, Budget ₹70L+", topChoice: "USA", percentage: "52%" },
      { profile: "Any, 90%+, Budget ₹60L+", topChoice: "USA", percentage: "45%" },
      { profile: "Finance, 85%, Budget ₹50L", topChoice: "USA", percentage: "40%" },
    ],
    reality2026: "STEM OPT remains 36 months. H-1B registration starts March 2026. New H-1B modernization rules benefit students with advanced degrees. Premium processing available for $2,500.",
  },
  "uk": {
    partTimeHours: "20 hrs/week",
    pswDuration: "2 years (Graduate Route)",
    indianCommunity: "1.8M+ strong",
    policyStatus: "Caution",
    policyAlert: "Salary threshold rising to £38,700 for Skilled Worker visa. Graduate Route remains 2 years. Still excellent for 1-year masters.",
    bestFor: ["Finance", "Law", "Business", "1-Year Masters"],
    accommodation: [
      { type: "University Hall", cost: "£600-900/mo", pros: "All-inclusive, social", cons: "Premium in London", best: "Year 1 students" },
      { type: "Private Student Housing", cost: "£500-800/mo", pros: "Modern en-suite rooms", cons: "Contract binding", best: "All years" },
      { type: "Shared House (HMO)", cost: "£350-600/mo", pros: "Cheapest option", cons: "Bills extra, variable quality", best: "Budget students" },
    ],
    peerComparison: [
      { profile: "Commerce, 80%, Budget ₹35L", topChoice: "UK", percentage: "28%" },
      { profile: "Law, 85%, Budget ₹40L", topChoice: "UK", percentage: "35%" },
      { profile: "Any, 88%, Budget ₹30L", topChoice: "UK", percentage: "25%" },
    ],
    reality2026: "Graduate Route review ongoing — no changes announced for 2026. Skilled Worker salary threshold £38,700 from April 2026. London living costs rise 8% YoY — budget £1,200/mo minimum.",
  },
  "germany": {
    partTimeHours: "120 full days/year (≈20 hrs/wk)",
    pswDuration: "18 months (Job Seeker)",
    indianCommunity: "200K+ growing",
    policyStatus: "Improving",
    policyAlert: "EU Blue Card reforms (2024) made it significantly easier. 18-month job seeker visa is one of the most generous in Europe.",
    bestFor: ["Engineering", "Research", "Manufacturing", "IT"],
    accommodation: [
      { type: "Student Residence (WG)", cost: "€250-400/mo", pros: "Cheapest, social", cons: "High demand, apply 6 months early", best: "Budget students" },
      { type: "Shared Flat (WG)", cost: "€350-550/mo", pros: "Common, easy to find", cons: "Shared kitchen/bath", best: "Most students" },
      { type: "Private Apartment", cost: "€500-800/mo", pros: "Privacy, independence", cons: "Expensive, deposit required", best: "Working students" },
    ],
    peerComparison: [
      { profile: "PCM, 85%, Budget ₹20L", topChoice: "Germany", percentage: "42%" },
      { profile: "Bio, 75%, Budget ₹25L", topChoice: "Germany", percentage: "35%" },
      { profile: "Engineering, 80%, Budget ₹15L", topChoice: "Germany", percentage: "48%" },
    ],
    reality2026: "TU9 universities remain tuition-free. EU Blue Card salary threshold reduced to €43,800. Chance Card (Opportunity Card) launched 2024 — job seeker visa without prior job offer. German language B1 gives PR fast-track.",
  },
  "australia": {
    partTimeHours: "24 hrs/week (fortnightly cap: 48)",
    pswDuration: "2-4 years (Temporary Graduate)",
    indianCommunity: "780K+ strong",
    policyStatus: "Stable",
    policyAlert: "Streamlined PR pathway. High minimum wage ($23.23/hr) protects student workers well. Living costs are high in Sydney/Melbourne.",
    bestFor: ["Healthcare", "Engineering", "Hospitality", "IT"],
    accommodation: [
      { type: "On-Campus", cost: "AUD 800-1,200/mo", pros: "Convenient, safe", cons: "Limited, expensive", best: "Year 1 students" },
      { type: "Shared House", cost: "AUD 600-900/mo", pros: "Social, affordable", cons: "Shared spaces", best: "Most students" },
      { type: "Homestay", cost: "AUD 900-1,100/mo", pros: "Family environment, meals", cons: "Less independence", best: "Under 21 students" },
    ],
    peerComparison: [
      { profile: "Nursing, 78%, Budget ₹35L", topChoice: "Australia", percentage: "40%" },
      { profile: "Hospitality, 70%, Budget ₹30L", topChoice: "Australia", percentage: "38%" },
      { profile: "Engineering, 82%, Budget ₹40L", topChoice: "Australia", percentage: "30%" },
    ],
    reality2026: "Temporary Graduate visa (subclass 485) extended to 4 years for select degrees. Minimum wage increased to $23.23/hr. PR processing time reduced for healthcare and engineering occupations.",
  },
  "ireland": {
    partTimeHours: "20 hrs/week (40 in holidays)",
    pswDuration: "2 years (1+1 stay-back)",
    indianCommunity: "50K+ growing fast",
    policyStatus: "Stable",
    bestFor: ["Pharma", "Tech", "Business", "Data Science"],
    accommodation: [
      { type: "Student Residence", cost: "€600-900/mo", pros: "All-inclusive, social", cons: "Dublin housing crisis", best: "Year 1 students" },
      { type: "Shared Apartment", cost: "€500-750/mo", pros: "Affordable outside Dublin", cons: "Commute", best: "Budget students" },
      { type: "Homestay", cost: "€700-900/mo", pros: "Family feel, meals included", cons: "Rules to follow", best: "Younger students" },
    ],
    peerComparison: [
      { profile: "Bio, 75%, Budget ₹25L", topChoice: "Ireland", percentage: "30%" },
      { profile: "Data Science, 80%, Budget ₹30L", topChoice: "Ireland", percentage: "32%" },
    ],
    reality2026: "2-year stay-back visa (Third Level Graduate Scheme) extended to all honours degree holders. Critical Skills Employment Permit list expanded. Dublin rent cap legislation in effect.",
  },
};

function getRealTalk(id: string) {
  return countryRealTalk[id] || {
    partTimeHours: "20 hrs/week",
    pswDuration: "Varies",
    indianCommunity: "Growing",
    policyStatus: "Stable" as const,
    bestFor: ["Multiple fields"],
    accommodation: [],
    peerComparison: [],
    reality2026: "Check latest policy updates for 2026 intake.",
  };
}

/* ═════════════════════════════════════════════════════════════════
   JOURNEY VISUALIZER COMPONENT — Study → Work → PR
   ═════════════════════════════════════════════════════════════════ */
function JourneyVisualizer({ countryId, countryName }: { countryId: string; countryName: string }) {
  const journeys: Record<string, { steps: { label: string; desc: string; duration: string }[] }> = {
    canada: { steps: [
      { label: "Study", desc: "Complete degree at DLI", duration: "2 years" },
      { label: "PGWP", desc: "3-year open work permit", duration: "3 years" },
      { label: "Work", desc: "Gain Canadian experience", duration: "1 year" },
      { label: "Express Entry", desc: "CRS 500+ gets ITA", duration: "6 months" },
      { label: "PR", desc: "Permanent Resident", duration: "Lifetime" },
    ]},
    usa: { steps: [
      { label: "Study", desc: "Complete STEM degree", duration: "2 years" },
      { label: "OPT", desc: "36-month work authorization", duration: "3 years" },
      { label: "H-1B", desc: "Employer sponsorship lottery", duration: "3-6 years" },
      { label: "Green Card", desc: "EB-2/EB-3 employer sponsored", duration: "2-3 years" },
      { label: "Citizenship", desc: "After 5 years as GC holder", duration: "Lifetime" },
    ]},
    uk: { steps: [
      { label: "Study", desc: "Complete degree", duration: "1-2 years" },
      { label: "Graduate Route", desc: "2-year work visa", duration: "2 years" },
      { label: "Skilled Worker", desc: "Job with licensed sponsor", duration: "5 years" },
      { label: "ILR", desc: "Indefinite Leave to Remain", duration: "Lifetime" },
      { label: "Citizenship", desc: "After 1 year ILR", duration: "Lifetime" },
    ]},
    germany: { steps: [
      { label: "Study", desc: "Tuition-free degree", duration: "2 years" },
      { label: "Job Seeker", desc: "18 months to find work", duration: "18 months" },
      { label: "EU Blue Card", desc: "Work visa for graduates", duration: "4 years" },
      { label: "PR", desc: "After 27 months (21 with B1)", duration: "Lifetime" },
      { label: "Citizenship", desc: "After 8 years residence", duration: "Lifetime" },
    ]},
    australia: { steps: [
      { label: "Study", desc: "Complete degree", duration: "2 years" },
      { label: "Grad Visa", desc: "Temporary Graduate 485", duration: "2-4 years" },
      { label: "Skills Assessment", desc: "Positive skills assessment", duration: "3 months" },
      { label: "PR Visa", desc: "189/190/491 skilled visa", duration: "Lifetime" },
      { label: "Citizenship", desc: "After 4 years as PR", duration: "Lifetime" },
    ]},
    ireland: { steps: [
      { label: "Study", desc: "Honours degree or higher", duration: "1-2 years" },
      { label: "Stay-Back", desc: "2 years (1+1 scheme)", duration: "2 years" },
      { label: "Critical Skills", desc: "Employment permit", duration: "2 years" },
      { label: "Stamp 4", desc: "Residence permission", duration: "Lifetime" },
      { label: "Citizenship", desc: "After 5 years", duration: "Lifetime" },
    ]},
  };
  const journey = journeys[countryId] || journeys.canada;

  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Route className="w-4 h-4 text-[#0d9488]" />
        <h3 className="font-bold text-gray-900 text-sm">5-Year Journey: Study → Work → PR in {countryName}</h3>
      </div>
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0d9488] via-[#0d9488] to-amber-400 hidden sm:block" />
        <div className="space-y-2">
          {journey.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                i === 0 ? "bg-[#0d9488] text-white" :
                i === journey.steps.length - 1 ? "bg-amber-500 text-white" :
                "bg-white border-2 border-[#0d9488] text-[#0d9488]"
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-xs">{step.label}</span>
                  <Badge className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0">{step.duration}</Badge>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-2.5 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-600 leading-relaxed">Timeline is indicative. Actual duration depends on individual circumstances, job market, and immigration policy.</p>
      </div>
    </div>
  );
}

/* ─── covered contact helpers ─── */
function CoveredPhone({ phone }: { phone: string }) {
  const prefix = phone.slice(0, -5);
  return (
    <div className="flex items-center gap-2">
      <Phone className="w-4 h-4 text-teal-600" />
      <span className="text-sm font-mono text-slate-900">{prefix}<span className="inline-flex items-center gap-1 ml-1"><span className="text-slate-400 tracking-widest">••••</span><Lock className="w-3 h-3 text-amber-500" /></span></span>
    </div>
  );
}
function CoveredEmail({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <div className="flex items-center gap-2">
      <Mail className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-mono text-slate-900">{user.slice(0,3)}•••@•••{domain.slice(domain.lastIndexOf("."))}<Lock className="w-3 h-3 text-amber-500 ml-1 inline" /></span>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHead({ badge, badgeIcon: BIcon, title, subtitle, dark }: { badge: string; badgeIcon: any; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center mb-6">
      <Badge className={dark ? "bg-white/10 text-white mb-2 px-3 py-1 border border-white/20 text-xs" : "bg-teal-100 text-teal-700 mb-2 px-3 py-1 text-xs"}>
        <BIcon className="mr-1 h-3 w-3" />{badge}
      </Badge>
      <h2 className={`text-2xl font-bold lg:text-3xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {subtitle && <p className={`mt-1.5 max-w-2xl mx-auto text-sm ${dark ? "text-gray-400" : "text-slate-600"}`}>{subtitle}</p>}
    </div>
  );
}

function StepCard({ s, isLast }: { s: { step: number; title: string; desc: string }; isLast?: boolean }) {
  return (
    <div className="relative flex gap-3 items-start">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow">{s.step}</div>
        {!isLast && <div className="w-0.5 h-full min-h-[24px] bg-slate-200 mt-1" />}
      </div>
      <div className="pb-5">
        <h4 className="font-bold text-slate-900 text-sm leading-tight">{s.title}</h4>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
export default function DestinationLanding() {
  const { destId } = useParams<{ destId: string }>();
  const dest = destinations.find((d) => d.id === destId);
  const consultants = dest ? getConsultantsForCountry(dest.id) : [];
  const { isAuthenticated } = useLocalAuth();
  const isPremium = false; // Will use useAccessControl once backend is live
  const featuredConsultant = consultants.find(c => c.featured) || consultants[0];

  if (!dest) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Destination not found</p></div>;

  const accent = dest.accentColor || "#0d9488";
  const salaries = dest.salariesByStream || { STEM: "—", Medicine: "—", Mgmt: "—", Arts: "—", Accts: "—" };
  const rt = getRealTalk(dest.id);

  // Resolve SEO config for this destination
  const seo = destinationSEO[dest.id] || {
    title: `Study in ${dest.name} for Indian Students — Complete Guide`,
    desc: `Study in ${dest.name}: tuition, living costs, visa process, scholarships, PR pathway & career options for Indian students.`,
    keywords: `study in ${dest.name.toLowerCase()}, study abroad consultants, study in ${dest.name.toLowerCase()} for indian students`,
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO title={seo.title} description={seo.desc} keywords={seo.keywords} />
      <Navbar />

      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-end">
        {dest.heroImage && <div className="absolute inset-0"><img src={dest.heroImage} alt={`${dest.name}`} className="w-full h-full object-cover" /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 relative w-full">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white border border-white/30 backdrop-blur-sm text-base px-4 py-1.5"><Globe className="mr-2 h-4 w-4" /> {dest.name}</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm"><TrendingUp className="h-3 w-3 mr-1" />{dest.visaSuccess} Visa Success</Badge>
              {dest.safetyIndex && <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm"><Shield className="h-3 w-3 mr-1" />{dest.safetyIndex}</Badge>}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
              Study in <span className="text-amber-400">{dest.name}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl">{dest.tagline}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              {[{ icon: GraduationCap, label: "Min GPA", value: dest.minGpa }, { icon: Star, label: "IELTS", value: dest.minIelts }, { icon: Banknote, label: "Consultation", value: dest.fees }].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1"><s.icon className="h-4 w-4 text-white/60" /><span className="text-xs text-white/60 font-mono uppercase tracking-wider">{s.label}</span></div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Interactive Info Widgets */}
            <div className="flex flex-wrap gap-3 mt-6">
              {dest.weather && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2">
                  <CloudSun className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-white/60 font-mono uppercase">Weather</span>
                  <span className="text-xs font-bold text-white">{dest.weather.split(".")[0]}</span>
                </div>
              )}
              {dest.currencyRate && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-white/60 font-mono uppercase">1 {dest.flag === "US" ? "USD" : dest.flag === "CA" ? "CAD" : dest.flag === "UK" ? "GBP" : dest.flag === "DE" ? "EUR" : dest.flag === "AU" ? "AUD" : "Unit"} = </span>
                  <span className="text-xs font-bold text-emerald-300">₹{dest.currencyRate}</span>
                </div>
              )}
              {dest.indianDiaspora && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-white/60 font-mono uppercase">Indian Community</span>
                  <span className="text-xs font-bold text-white">{dest.indianDiaspora.split("(")[0].trim()}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/#lead-form"><Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-xl">Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link to="/evaluate"><Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-6 text-base font-semibold rounded-xl"><Zap className="mr-2 h-5 w-5" />Compare Countries</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ REAL TALK DATA CARDS ═══════════════════ */}
      <section className="bg-slate-900 py-6 border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Tuition */}
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#0d9488]" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Tuition</span>
              </div>
              <p className="text-sm font-bold text-white">{dest.tuition || "Varies"}</p>
              {dest.currencyRate && <p className="text-[10px] text-amber-400 font-semibold mt-0.5">{toINR(dest.tuition, dest.currencyRate)}</p>}
            </div>
            {/* Part-time Work */}
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Part-time</span>
              </div>
              <p className="text-sm font-bold text-white">{rt.partTimeHours}</p>
            </div>
            {/* PSW */}
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">PSW</span>
              </div>
              <p className="text-sm font-bold text-white">{rt.pswDuration}</p>
            </div>
            {/* Indian Community */}
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Indians</span>
              </div>
              <p className="text-sm font-bold text-white">{dest.indianDiaspora || rt.indianCommunity}</p>
            </div>
            {/* Currency */}
            {dest.currencyRate && (
              <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Exchange</span>
                </div>
                <p className="text-sm font-bold text-white">₹{dest.currencyRate}</p>
              </div>
            )}
            {/* Policy Status */}
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className={`w-3.5 h-3.5 ${rt.policyStatus === "Stable" || rt.policyStatus === "Improving" ? "text-emerald-400" : rt.policyStatus === "Caution" ? "text-amber-400" : "text-red-400"}`} />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Policy</span>
              </div>
              <p className={`text-sm font-bold ${rt.policyStatus === "Stable" || rt.policyStatus === "Improving" ? "text-emerald-400" : rt.policyStatus === "Caution" ? "text-amber-400" : "text-red-400"}`}>{rt.policyStatus}</p>
            </div>
          </div>
          {/* Best For tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {rt.bestFor.map(bf => (
              <span key={bf} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d9488]/20 text-[#0d9488] border border-[#0d9488]/30">{bf}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ STUDENTS CORNER ═══════════════════ */}
      <StudentsCorner countryId={dest.id} />

      {/* ═══════════════════ POLICY ALERT BANNER ═══════════════════ */}
      {rt.policyAlert && (
        <section className={`py-3 ${rt.policyStatus === "Uncertain" ? "bg-red-50 border-b border-red-100" : rt.policyStatus === "Caution" ? "bg-amber-50 border-b border-amber-100" : "bg-emerald-50 border-b border-emerald-100"}`}>
          <div className="mx-auto max-w-7xl px-6 flex items-start gap-3">
            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${rt.policyStatus === "Uncertain" ? "text-red-500" : rt.policyStatus === "Caution" ? "text-amber-500" : "text-emerald-500"}`} />
            <div>
              <p className={`text-sm font-semibold ${rt.policyStatus === "Uncertain" ? "text-red-700" : rt.policyStatus === "Caution" ? "text-amber-700" : "text-emerald-700"}`}>
                {dest.name} Policy Alert — {rt.policyStatus}
              </p>
              <p className="text-xs text-gray-600">{rt.policyAlert}</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ WHY STUDY (FREE) ═══════════════════ */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge={`Why ${dest.name}`} badgeIcon={Zap} title={`Top Reasons to Choose ${dest.name}`} />
          {/* Free: First 2 reasons */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-4xl mx-auto mb-6">
            {dest.whyStudy.slice(0, 2).map((reason, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                <Card className="border border-gray-100 hover:shadow-sm transition-shadow h-full">
                  <CardContent className="p-3 flex items-start gap-2.5">
                    <div className="h-7 w-7 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${accent}15` }}>
                      <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <p className="text-gray-700 text-sm leading-snug">{reason}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* Premium: Remaining reasons locked */}
          {dest.whyStudy.length > 2 && (
            <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-4xl mx-auto">
                {dest.whyStudy.slice(2).map((reason, idx) => (
                  <Card key={idx} className="border border-gray-100"><CardContent className="p-3 flex items-start gap-2.5">
                    <div className="h-7 w-7 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${accent}15` }}><CheckCircle className="h-4 w-4" style={{ color: accent }} /></div>
                    <p className="text-gray-700 text-sm leading-snug">{reason}</p>
                  </CardContent></Card>
                ))}
              </div>
            )}
        </div>
      </section>

      {/* ═══════════════════ COST BREAKDOWN (FREE) ═══════════════════ */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge="Cost Breakdown" badgeIcon={Banknote} title="What It Costs (in INR)" subtitle="Transparent pricing with currency conversion so you can plan accurately" />
          <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-4xl mx-auto">
            {[{ icon: GraduationCap, label: "Tuition", value: dest.tuition, inr: dest.currencyRate ? toINR(dest.tuition, dest.currencyRate) : "", color: "text-blue-600 bg-blue-50" }, { icon: HomeIcon, label: "Living", value: dest.living, inr: dest.currencyRate ? toINR(dest.living, dest.currencyRate) : "", color: "text-emerald-600 bg-emerald-50" }, { icon: Banknote, label: "Our Fee", value: dest.fees, inr: "", color: "text-teal-600 bg-teal-50" }].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                <Card className="border border-gray-200 text-center hover:shadow-sm transition-shadow"><CardContent className="p-4">
                  <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center mx-auto mb-2`}><item.icon className="h-5 w-5" /></div>
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  {item.inr && <p className="text-xs font-bold text-amber-600 mt-0.5">~ {item.inr}/yr</p>}
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
          {/* Premium: Currency conversion detail locked */}
          {dest.currencyRate && (
            <div className="mt-4 max-w-md mx-auto">
              <div className="p-3 text-center"><p className="text-sm text-slate-600">Complete cost breakdown with ₹{dest.currencyRate} conversion rate</p></div>
              </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ COURSE-SPECIFIC ACADEMIC REQUIREMENTS ═══════════════════ */}
      <section className="py-10 md:py-12 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-[#0d9488]" />
            <h3 className="font-bold text-gray-900 text-lg md:text-xl">Admission Requirements by Course Type</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6 md:mb-8">Specific entry criteria for Indian students — broken down by course stream and level (UG / PG / Diploma)</p>

          {(() => {
            const reqs = COURSE_REQUIREMENTS[dest.name];
            if (!reqs || reqs.length === 0) {
              // Fallback to generic if no course-specific data yet
              const at = ACADEMIC_THRESHOLD[dest.name];
              if (!at) return <p className="text-sm text-gray-500">Detailed requirement data coming soon for this country.</p>;
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 max-w-4xl">
                  <Card className="border-emerald-200 bg-emerald-50"><CardContent className="p-4 md:p-5"><div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Competitive</span></div><p className="text-2xl md:text-3xl font-bold text-emerald-700">{at.competitive}%+</p><p className="text-xs text-emerald-600 mt-1">Top universities</p></CardContent></Card>
                  <Card className="border-amber-200 bg-amber-50"><CardContent className="p-4 md:p-5"><div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-amber-600" /><span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Minimum</span></div><p className="text-2xl md:text-3xl font-bold text-amber-700">{at.minimum}%+</p><p className="text-xs text-amber-600 mt-1">Mid-tier universities</p></CardContent></Card>
                  <Card className="border-blue-200 bg-blue-50"><CardContent className="p-4 md:p-5"><div className="flex items-center gap-2 mb-2"><Info className="w-4 h-4 text-blue-600" /><span className="text-xs font-bold text-blue-800 uppercase tracking-wider">IELTS</span></div><p className="text-2xl md:text-3xl font-bold text-blue-700">{dest.minIelts}+</p><p className="text-xs text-blue-600 mt-1">Required for most</p></CardContent></Card>
                </div>
              );
            }

            // Group by stream
            const byStream: Record<string, typeof reqs> = {};
            for (const r of reqs) {
              if (!byStream[r.stream]) byStream[r.stream] = [];
              byStream[r.stream].push(r);
            }

            /* ═── 16 New Majors from Decision Engine ─── */
            const streamOrder = ["CS & IT", "Data Science", "Engineering", "MBBS", "MD / MS", "MDS", "Nursing", "Pharmacy", "Biotechnology", "Management", "Accounting", "Arts", "Fashion", "Hotel Management", "Journalism", "Films & Media"];
            const streamColors: Record<string, string> = {
              "CS & IT": "#2563eb", "Data Science": "#7c3aed", "Engineering": "#ea580c",
              "MBBS": "#dc2626", "MD / MS": "#e11d48", "MDS": "#0891b2",
              "Nursing": "#ec4899", "Pharmacy": "#10b981", "Biotechnology": "#14b8a6",
              "Management": "#475569", "Accounting": "#d97706", "Arts": "#db2777",
              "Fashion": "#c026d3", "Hotel Management": "#0284c7", "Journalism": "#ca8a04", "Films & Media": "#9333ea",
            };
            const levelBadge = (level: string) => {
              if (level === "UG") return "bg-emerald-100 text-emerald-700";
              if (level === "PG") return "bg-blue-100 text-blue-700";
              return "bg-amber-100 text-amber-700";
            };

            return (
              <div className="space-y-6">
                {streamOrder.filter(s => byStream[s]).map(stream => {
                  const rows = byStream[stream];
                  const color = streamColors[stream] || "#0d9488";
                  return (
                    <div key={stream} className="border border-gray-200 rounded-xl overflow-hidden">
                      {/* Stream header */}
                      <div className="px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-2" style={{ backgroundColor: `${color}10`, borderBottom: `2px solid ${color}30` }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                        <h4 className="font-bold text-sm md:text-base" style={{ color }}>{stream}</h4>
                        <span className="text-xs text-gray-400 ml-auto">{rows.length} levels</span>
                      </div>

                      {/* Desktop table */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 text-left">
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-16">Level</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Min GPA / Qualification</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-24">IELTS</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-24">TOEFL</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-28">GRE / GMAT</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-24">Work Exp</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Special Requirements</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider w-32">Tuition</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {rows.map((r, i) => (
                              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${levelBadge(r.level)}`}>{r.level}</span></td>
                                <td className="px-4 py-3 text-gray-800 font-medium">{r.minGpa}</td>
                                <td className="px-4 py-3 text-gray-600">{r.ielts}</td>
                                <td className="px-4 py-3 text-gray-600">{r.toefl}</td>
                                <td className="px-4 py-3 text-gray-600">{r.gre !== "Not required" ? r.gre : "—"} <span className="text-gray-300">|</span> {r.gmat !== "Not required" ? r.gmat : "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{r.workExp}</td>
                                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs">{r.extras}</td>
                                <td className="px-4 py-3 text-gray-700 font-medium text-xs">{r.tuition}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile cards */}
                      <div className="md:hidden divide-y divide-gray-100">
                        {rows.map((r, i) => (
                          <div key={i} className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${levelBadge(r.level)}`}>{r.level}</span>
                              <span className="text-xs text-gray-400">{r.tuition}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div><span className="text-gray-400">Min GPA:</span> <span className="text-gray-700 font-medium">{r.minGpa}</span></div>
                              <div><span className="text-gray-400">IELTS:</span> <span className="text-gray-700">{r.ielts}</span></div>
                              <div><span className="text-gray-400">TOEFL:</span> <span className="text-gray-700">{r.toefl}</span></div>
                              <div><span className="text-gray-400">GRE/GMAT:</span> <span className="text-gray-700">{r.gre !== "Not required" ? r.gre : "—"} / {r.gmat !== "Not required" ? r.gmat : "—"}</span></div>
                              <div><span className="text-gray-400">Work Exp:</span> <span className="text-gray-700">{r.workExp}</span></div>
                            </div>
                            {r.extras && <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">{r.extras}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Top universities footer */}
                      <div className="px-4 py-2.5 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-500">
                        <span className="font-medium text-gray-600">Top universities:</span> {rows.map(r => r.topUnis).filter((v, i, a) => a.indexOf(v) === i).join(" | ")}
                      </div>
                    </div>
                  );
                })}

                {/* Generic fallback note */}
                {(() => {
                  const at = ACADEMIC_THRESHOLD[dest.name];
                  if (!at) return null;
                  return (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed"><span className="font-semibold text-gray-800">General note:</span> {at.label} These are indicative requirements — always verify with your target university's latest admission bulletin.</p>
                    </div>
                  );
                })()}
              </div>
            );
          })()}
          </div>
      </section>

      {/* ═══════════════════ LIFE IN COUNTRY (PREMIUM) ═══════════════════ */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge={`Life in ${dest.name}`} badgeIcon={Heart} title="What's It Actually Like?" />
          {dest.lifeInCountry ? (
            <div className="grid lg:grid-cols-5 gap-4 items-start p-4">
                <div className="lg:col-span-2">
                  <p className="text-slate-600 text-sm leading-relaxed">{dest.lifeInCountry}</p>
                </div>
                <div className="lg:col-span-3 grid grid-cols-4 gap-2">
                  {[{ icon: Thermometer, label: "Weather", value: dest.weather?.split(".")[0], color: "bg-orange-50 text-orange-600" }, { icon: Shield, label: "Safety", value: dest.safetyIndex, color: "bg-emerald-50 text-emerald-600" }, { icon: Stethoscope, label: "Healthcare", value: dest.healthcare?.slice(0,40)+"...", color: "bg-rose-50 text-rose-600" }, { icon: Clock, label: "Work Week", value: dest.workLifeBalance?.hoursPerWeek + " hrs", color: "bg-blue-50 text-blue-600" }].filter(x => x.value).map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-center">
                    <div className={`w-8 h-8 rounded-md ${item.color} flex items-center justify-center mx-auto mb-1.5`}><item.icon className="w-4 h-4" /></div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">{item.label}</p>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">{item.value}</p>
                  </div>
                ))}
                </div>
              </div>
            ) : (
            <div className="text-center text-slate-500 py-6 text-sm">Coming soon</div>
          )}
        </div>
      </section>

      {/* ═══════════════════ STARTING SALARIES (PREMIUM) ═══════════════════ */}
      <section className="py-10 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${accent}40, transparent 70%)` }} />
        <div className="mx-auto max-w-7xl px-6 relative">
          <SectionHead badge="Salary Guide" badgeIcon={DollarSign} title="Starting Salaries by Stream" subtitle="Annual gross salaries in local currency — compare ROI across streams" dark />
          {dest.salariesByStream ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 max-w-6xl mx-auto p-3">
                {[
                  { stream: "CS & IT", key: "CS_IT", icon: Zap, color: "from-blue-500 to-indigo-600" },
                  { stream: "DataSci", key: "DataScience", icon: BarChart3, color: "from-violet-500 to-purple-600" },
                  { stream: "Engg", key: "Engineering", icon: FlaskConical, color: "from-orange-500 to-red-600" },
                  { stream: "MBBS", key: "MBBS", icon: HeartPulse, color: "from-red-500 to-rose-600" },
                  { stream: "MD/MS", key: "MD_MS", icon: Stethoscope, color: "from-rose-500 to-pink-600" },
                  { stream: "MDS", key: "MDS", icon: Microscope, color: "from-cyan-500 to-teal-600" },
                  { stream: "Nursing", key: "Nursing", icon: HeartPulse, color: "from-pink-500 to-rose-600" },
                  { stream: "Pharma", key: "Pharmacy", icon: Pill, color: "from-emerald-500 to-teal-600" },
                  { stream: "Biotech", key: "Biotech", icon: Dna, color: "from-teal-500 to-green-600" },
                  { stream: "Mgmt", key: "Mgmt", icon: Briefcase, color: "from-slate-500 to-gray-600" },
                  { stream: "Accts", key: "Accts", icon: Banknote, color: "from-amber-500 to-yellow-600" },
                  { stream: "Arts", key: "Arts", icon: BookOpen, color: "from-fuchsia-500 to-pink-600" },
                  { stream: "Fashion", key: "Fashion", icon: Shirt, color: "from-purple-500 to-indigo-600" },
                  { stream: "Hotel", key: "Hotel", icon: Utensils, color: "from-sky-500 to-blue-600" },
                  { stream: "Journal", key: "Journalism", icon: Newspaper, color: "from-yellow-500 to-amber-600" },
                  { stream: "Media", key: "Media", icon: Clapperboard, color: "from-indigo-500 to-violet-600" },
                ].filter(s => salaries[s.key]).map((s, i) => (
                  <div key={s.key} className="bg-white/5 rounded-xl border border-white/10 p-2.5 text-center"><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-1.5`}><s.icon className="w-4 h-4 text-white" /></div><p className="text-gray-400 text-[9px] uppercase font-mono mb-0.5">{s.stream}</p><p className="text-sm font-bold text-white">{salaries[s.key]}</p></div>
                ))}
              </div>
            ) : (
            <div className="text-center text-gray-500 py-6 text-sm">Coming soon</div>
          )}
        </div>
      </section>

      {/* ═══════════════════ STUDENT OPPORTUNITIES (PREMIUM) ═══════════════════ */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge="Student Opportunities" badgeIcon={Sparkles} title="Unique Opportunities for Indian Students" />
          {dest.studentOpportunities ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 p-3">
                {dest.studentOpportunities.map((opp, idx) => (
                  <Card key={idx} className="border border-gray-100"><CardContent className="p-3">
                    <div className="w-8 h-8 rounded-md bg-teal-50 flex items-center justify-center mb-2"><Award className="w-4 h-4 text-teal-600" /></div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1 leading-tight">{opp.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{opp.desc}</p>
                  </CardContent></Card>
                ))}
              </div>
            ) : (
            <div className="text-center text-slate-500 py-6 text-sm">Coming soon</div>
          )}
        </div>
      </section>

      {/* ═══════════════════ WORK LIFE BALANCE (PREMIUM) ═══════════════════ */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge="Work Culture" badgeIcon={Clock} title="Work-Life Balance" />
          {dest.workLifeBalance ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto p-3">
                {[{ icon: Clock, label: "Work Week", value: dest.workLifeBalance.hoursPerWeek + " hours" }, { icon: Calendar, label: "Annual Leave", value: dest.workLifeBalance.annualLeave }, { icon: HomeIcon, label: "Remote Work", value: dest.workLifeBalance.remoteWork }, { icon: Heart, label: "Culture", value: dest.workLifeBalance.culture }].map((item, idx) => (
                  <Card key={idx} className="border border-gray-100 text-center"><CardContent className="p-3">
                    <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-2"><item.icon className="w-4 h-4 text-teal-600" /></div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </CardContent></Card>
                ))}
              </div>
            ) : (
            <div className="text-center text-slate-500 py-6 text-sm">Coming soon</div>
          )}
        </div>
      </section>


      {/* ═══════════════════ PR PATHWAY + JOURNEY ═══════════════════ */}
      {dest.prSteps && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHead badge="PR Pathway" badgeIcon={MapPin} title={`Road to Permanent Residency in ${dest.name}`} subtitle="Step-by-step guide from student visa to PR" />
            {/* Compact horizontal step flow */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-start justify-center gap-2 md:gap-0">
                {dest.prSteps.map((s, i) => (
                  <div key={s.step} className="flex items-center">
                    <div className="flex flex-col items-center text-center w-28 md:w-32">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        i === 0 ? "bg-[#0d9488] text-white" :
                        i === dest.prSteps!.length - 1 ? "bg-amber-500 text-white" :
                        "bg-white border-2 border-[#0d9488] text-[#0d9488]"
                      }`}>
                        {s.step}
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs mt-2 leading-tight">{s.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                    {i < dest.prSteps.length - 1 && (
                      <div className="hidden md:block w-6 lg:w-10 h-0.5 bg-slate-200 mt-4 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Visualizer merged here */}
            <div className="mt-8 max-w-3xl mx-auto">
              <JourneyVisualizer countryId={dest.id} countryName={dest.name} />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ WORK PERMIT & PR SUMMARY ═══════════════════ */}
      <section className="py-10 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${accent}40, transparent 70%)` }} />
        <div className="mx-auto max-w-7xl px-6 relative">
          <SectionHead badge="After Graduation" badgeIcon={Shield} title="Work Permit & PR Pathway" dark />
          <div className="grid gap-3 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="bg-white/5 border-white/10 text-white"><CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}25` }}><Briefcase className="h-5 w-5" style={{ color: accent }} /></div>
                <div>
                  <h3 className="text-base font-bold mb-0.5">Work Permit</h3>
                  <p className="text-sm font-medium" style={{ color: accent }}>{dest.workPermit}</p>
                  <p className="text-gray-400 text-xs mt-1">Work full-time after completing your studies.</p>
                </div>
              </div>
            </CardContent></Card>
            <Card className="bg-white/5 border-white/10 text-white"><CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-amber-500" /></div>
                <div>
                  <h3 className="text-base font-bold mb-0.5">PR Pathway</h3>
                  <p className="text-amber-500 text-sm font-medium">{dest.prPathway}</p>
                  <p className="text-gray-400 text-xs mt-1">Clear pathways from student visa to PR.</p>
                </div>
              </div>
            </CardContent></Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHERE YOU'LL LIVE ═══════════════════ */}
      {rt.accommodation.length > 0 && (
        <section className="py-10 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHead badge="Accommodation" badgeIcon={Home} title={`Where You'll Live in ${dest.name}`} subtitle="Housing options, costs, and what students actually choose" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {rt.accommodation.map((acc, i) => (
                <Card key={i} className="border-gray-100 hover:shadow-sm transition-shadow">
                  <CardContent className="p-3">
                    <Home className="w-4 h-4 text-[#0d9488] mb-1.5" />
                    <h3 className="font-bold text-gray-900 text-xs mb-0.5">{acc.type}</h3>
                    <p className="text-[11px] text-[#0d9488] font-semibold mb-1.5">{acc.cost}</p>
                    <p className="text-[11px] text-gray-500 mb-0.5 leading-snug"><strong className="text-emerald-600">Pros:</strong> {acc.pros}</p>
                    <p className="text-[11px] text-gray-500 mb-1.5 leading-snug"><strong className="text-red-500">Cons:</strong> {acc.cons}</p>
                    <Badge variant="outline" className="text-[10px] border-gray-200 text-gray-500">{acc.best}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════ 2026 REALITY CHECK ═══════════════════ */}
      <section className="py-10 bg-gradient-to-br from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-amber-600" />
            <h2 className="text-lg font-bold text-gray-900">2026 Reality Check — {dest.name}</h2>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <p className="text-gray-700 text-sm leading-relaxed">{rt.reality2026}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} Update</Badge>
              <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">Policy Verified</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONSULTANT LISTINGS ═══════════════════ */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead badge="Verified Consultants" badgeIcon={Users} title={`${dest.name} Education Consultants`} subtitle="Meet verified experts who specialize in ${dest.name}. View their profiles free — unlock contact details with Premium." />
          {consultants.length > 0 ? (
            <div className="space-y-6">
              {/* Featured Consultant — FREE profile, PREMIUM contacts */}
              {featuredConsultant && (
                <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4 relative">
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">Featured</div>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-xl font-bold text-white shrink-0">{featuredConsultant.initials}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-xl font-bold text-slate-900">{featuredConsultant.name}</h3>
                        {featuredConsultant.verified && <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>}
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{featuredConsultant.title} · {featuredConsultant.experience} exp · {featuredConsultant.successRate} success rate</p>
                      <p className="text-sm text-slate-600 mb-3">{featuredConsultant.about}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredConsultant.specialization.map(sp => <span key={sp} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600">{sp}</span>)}
                      </div>
                      {/* Contact details — PREMIUM only */}
                      {isPremium ? (
                        <div className="space-y-2 p-3 bg-white/80 rounded-xl border border-dashed border-amber-300">
                          <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-teal-600" /><span className="text-sm font-mono text-slate-900">{featuredConsultant.phone}</span></div>
                          <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-600" /><span className="text-sm font-mono text-slate-900">{featuredConsultant.whatsapp}</span></div>
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-600" /><span className="text-sm font-mono text-slate-900">{featuredConsultant.email}</span></div>
                        </div>
                      ) : (
                        <div className="p-3 bg-white/60 rounded-xl border border-dashed border-slate-300">
                          <p className="text-xs text-slate-500 mb-2">Contact details unlocked with Premium</p>
                          <div className="flex items-center gap-3">
                            <Link to="/premium">
                              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-semibold">
                                <Crown className="w-3 h-3 mr-1" /> Unlock Contacts — ₹999
                              </Button>
                            </Link>
                            <span className="text-[10px] text-slate-400">{consultants.length} consultants available</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* Other Consultants — FREE profile, PREMIUM contacts */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {consultants.filter(c => c.id !== featuredConsultant?.id).map(c => (
                  <Card key={c.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex gap-4 items-start">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-lg font-bold text-white shrink-0">{c.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                            {c.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          </div>
                          <p className="text-xs text-slate-500 mb-1">{c.title} · {c.experience}</p>
                          <p className="text-xs text-slate-600 mb-2 line-clamp-2">{c.about}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {c.specialization.slice(0,3).map(sp => <span key={sp} className="text-[10px] bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-slate-500">{sp}</span>)}
                          </div>
                          {isPremium ? (
                            <div className="space-y-1 p-2 bg-slate-50 rounded-lg">
                              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-teal-600" /><span className="text-xs font-mono text-slate-900">{c.phone}</span></div>
                              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-600" /><span className="text-xs font-mono text-slate-900">{c.email}</span></div>
                            </div>
                          ) : (
                            <Link to="/premium" className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 px-2 py-1 rounded-lg transition-colors">
                              <Lock className="w-3 h-3" /> Unlock contact — Premium
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8">Consultants coming soon for {dest.name}</div>
          )}
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}><Globe className="h-6 w-6 text-white" /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Study in {dest.name}?</h2>
          <p className="text-slate-600 mb-6 text-sm">Get matched with verified consultants who specialize in {dest.name} admissions. Free consultation, no obligation.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/#lead-form"><Button size="lg" className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-5 rounded-xl text-sm">Get Matched Free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/evaluate"><Button size="lg" variant="outline" className="border-slate-300 text-slate-700 px-6 py-5 rounded-xl hover:bg-slate-100 text-sm"><Zap className="mr-2 h-4 w-4" />Compare Countries</Button></Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STICKY PREMIUM BAR ═══════════════════ */}
      <StickyPremiumBar destName={dest.name} />

      <div className="pb-16"><Footer /></div>
    </div>
  );
}

/* Sticky Premium Bar */
const PREMIUM_BUNDLE = {
  id: "premium-bundle",
  name: "Premium Bundle",
  subtitle: "Full Access — 17 Countries, 16 Consultants, All Reports",
  price: 999,
  originalPrice: 2499,
  icon: "Crown",
};

function StickyPremiumBar({ destName }: { destName: string }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PREMIUM_BUNDLE.id);
  const { isAuthenticated } = useLocalAuth();

  // Don't show for authenticated users (simplified for static deploy)
  if (isAuthenticated) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/10 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"><Crown className="w-4 h-4 text-white" /></div>
          <div>
            <p className="text-sm font-bold text-white">Unlock full {destName} guide with Premium</p>
            <p className="text-xs text-gray-400">Salaries · Life details · Work culture · Consultant contacts · All opportunities</p>
          </div>
        </div>
        {!inCart ? (
          <Button
            size="sm"
            onClick={() => addItem(PREMIUM_BUNDLE)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart — ₹999
          </Button>
        ) : (
          <Link to="/checkout" onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-400 text-sm"
            >
              <ArrowRight className="w-4 h-4 mr-1.5" /> Go to Checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

/* Helper icon */
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
