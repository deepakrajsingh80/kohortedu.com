import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Crown,
  FileText,
  User,
  Star,
  Lock,
  Unlock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  GraduationCap,
  Shield,
  ChevronRight,
  Calculator,
  Globe,
  BookOpen,
  Target,
  Percent,
  Award,
  Sparkles,
  ArrowRight,
  Upload,
  Download,
  Eye,
  HelpCircle,
  Lightbulb,
  X,
  Calendar,
  Users,
  Heart,
  Route,
  BookmarkPlus,
  Info,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";

/* ─── Types ─── */
interface Application {
  id: string;
  university: string;
  course: string;
  destination: string;
  status: string;
  deadline: string;
  progress: number;
}

interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  status: "pending" | "uploaded" | "verified" | "missing";
  category: string;
}

interface ConsultantMatch {
  id: string;
  name: string;
  initials: string;
  title: string;
  specialization: string;
  matchScore: number;
  studentsHelped: number;
  successRate: string;
  responseTime: string;
  phone: string;
  whatsapp: string;
  email: string;
  verified: boolean;
}

/* ─── Demo Data ─── */
const destinationLabels: Record<string, string> = {
  usa: "USA", canada: "Canada", uk: "UK", australia: "Australia",
  germany: "Germany", ireland: "Ireland", newzealand: "New Zealand",
  france: "France", dubai: "Dubai", singapore: "Singapore",
  other: "Other",
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  researching: { label: "Researching", color: "text-slate-600", bg: "bg-slate-100" },
  shortlisted: { label: "Shortlisted", color: "text-blue-600", bg: "bg-blue-100" },
  applied: { label: "Applied", color: "text-yellow-600", bg: "bg-yellow-100" },
  documents_submitted: { label: "Docs Sent", color: "text-purple-600", bg: "bg-purple-100" },
  interview_scheduled: { label: "Interview", color: "text-pink-600", bg: "bg-pink-100" },
  offer_received: { label: "Offer!", color: "text-green-600", bg: "bg-green-100" },
  accepted: { label: "Accepted", color: "text-teal-600", bg: "bg-teal-100" },
  rejected: { label: "Rejected", color: "text-red-600", bg: "bg-red-100" },
};

const defaultApplications: Application[] = [
  { id: "a1", university: "University of Toronto", course: "MS Computer Science", destination: "canada", status: "shortlisted", deadline: "Dec 15, 2026", progress: 25 },
  { id: "a2", university: "TU Munich", course: "MSc Data Engineering", destination: "germany", status: "researching", deadline: "May 31, 2026", progress: 10 },
  { id: "a3", university: "University of Melbourne", course: "MBA", destination: "australia", status: "applied", deadline: "Oct 1, 2026", progress: 45 },
];

const defaultDocuments: DocumentItem[] = [
  { id: "d1", name: "Passport (Front & Back)", required: true, status: "uploaded", category: "Identity" },
  { id: "d2", name: "Academic Transcripts (10th & 12th)", required: true, status: "uploaded", category: "Academic" },
  { id: "d3", name: "Bachelor's Degree & Marksheets", required: true, status: "pending", category: "Academic" },
  { id: "d4", name: "IELTS/TOEFL Scorecard", required: true, status: "pending", category: "Test" },
  { id: "d5", name: "GRE/GMAT Scorecard", required: false, status: "pending", category: "Test" },
  { id: "d6", name: "Statement of Purpose (SOP)", required: true, status: "missing", category: "Essays" },
  { id: "d7", name: "Letters of Recommendation (2)", required: true, status: "missing", category: "Essays" },
  { id: "d8", name: "Resume / CV", required: true, status: "pending", category: "Profile" },
  { id: "d9", name: "Work Experience Certificates", required: false, status: "pending", category: "Profile" },
  { id: "d10", name: "Bank Statements (6 months)", required: true, status: "missing", category: "Financial" },
  { id: "d11", name: "Affidavit of Support", required: true, status: "missing", category: "Financial" },
  { id: "d12", name: "Passport-size Photographs", required: true, status: "pending", category: "Identity" },
];

const defaultConsultants: ConsultantMatch[] = [
  { id: "c1", name: "Priya Sharma", initials: "PS", title: "Senior Canada Immigration Consultant", specialization: "Express Entry, Study Permits, PGWP, PR Pathways", matchScore: 96, studentsHelped: 2400, successRate: "97%", responseTime: "< 2 hours", phone: "+91-98765-43201", whatsapp: "+91-98765-43201", email: "priya.s@kohortconnect.com", verified: true },
  { id: "c3", name: "Dr. Anand Krishnan", initials: "AK", title: "US Graduate Admissions Specialist", specialization: "MS/PhD Admissions, STEM OPT, Research Assistantships", matchScore: 91, studentsHelped: 3200, successRate: "92%", responseTime: "< 4 hours", phone: "+91-99887-65403", whatsapp: "+91-99887-65403", email: "anand.k@kohortconnect.com", verified: true },
  { id: "c8", name: "Lisa Mueller", initials: "LM", title: "German Education Specialist", specialization: "Blocked Account, APS, DAAD Scholarships, TU9", matchScore: 88, studentsHelped: 1900, successRate: "94%", responseTime: "< 3 hours", phone: "+91-90909-80805", whatsapp: "+91-90909-80805", email: "lisa.m@kohortconnect.com", verified: true },
];

const matchingFactors = [
  { icon: Target, label: "Profile Scoring", desc: "Your academics, budget, and goals are scored against 50+ data points" },
  { icon: Globe, label: "Destination Fit", desc: "We match consultants who specialize in YOUR top-ranked countries" },
  { icon: Award, label: "Track Record", desc: "Only consultants with 90%+ success rates and 500+ students placed" },
  { icon: Zap, label: "Response Time", desc: "Priority matching with consultants who respond within 4 hours" },
  { icon: Shield, label: "Verified Only", desc: "Every consultant is ID-verified, credential-checked, and rated by students" },
  { icon: MessageSquare, label: "Language Match", desc: "We pair you with consultants who speak your preferred language" },
];

/* ─── Storage Helpers ─── */
function getStoredApps(): Application[] {
  try { const raw = localStorage.getItem("kc_applications"); return raw ? JSON.parse(raw) : defaultApplications; }
  catch { return defaultApplications; }
}
function getStoredDocs(): DocumentItem[] {
  try { const raw = localStorage.getItem("kc_documents"); return raw ? JSON.parse(raw) : defaultDocuments; }
  catch { return defaultDocuments; }
}
function getStoredConsultants(): ConsultantMatch[] {
  try { const raw = localStorage.getItem("kc_consultants"); return raw ? JSON.parse(raw) : defaultConsultants; }
  catch { return defaultConsultants; }
}

/* ─── Blur Overlay Component ─── */
function BlurOverlay({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="blur-[6px] opacity-40 pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-dashed border-amber-300 p-6 sm:p-8 text-center shadow-xl max-w-sm mx-4"
        >
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-600 font-bold">Premium</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
          <p className="text-sm text-slate-600 mb-4">{subtitle}</p>
          <Link to="/premium">
            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 shadow-lg shadow-amber-500/25">
              <Crown className="w-3.5 h-3.5 mr-1.5" /> Unlock Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Progress Ring ─── */
function ProgressRing({ value, size = 48, stroke = 4, color = "#0d9488" }: { value: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="text-[10px] font-bold fill-slate-700" style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
        {value}%
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════ DASHBOARD ═══════════════════════════════════ */
export default function Dashboard() {
  const { user, isLoading, isAuthenticated, login, logout } = useLocalAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [activeTab, setActiveTab] = useState("applications");

  /* Load stored data */
  const [applications] = useState<Application[]>(getStoredApps());
  const [documents] = useState<DocumentItem[]>(getStoredDocs());
  const [consultants] = useState<ConsultantMatch[]>(getStoredConsultants());

  /* Vibe + Shortlist data */
  const [savedVibe] = useState(() => { try { return JSON.parse(localStorage.getItem("kc_vibe") || "{}"); } catch { return {}; } });
  const [shortlist, setShortlist] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("kc_shortlist") || "[]"); } catch { return []; } });
  const [showVibeSection, setShowVibeSection] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [showAffordability, setShowAffordability] = useState(false);

  const isPremium = user?.isPremium ?? false;

  /* Profile completion calculation */
  const profileCompletion = useMemo(() => {
    if (!user) return 0;
    let score = 30; // base for login
    if (user.name && user.name !== user.email.split("@")[0]) score += 20;
    score += 25; // destination selected
    score += 25; // course selected
    return Math.min(100, score);
  }, [user]);

  /* Document stats */
  const docStats = useMemo(() => {
    const total = documents.length;
    const uploaded = documents.filter(d => d.status === "uploaded").length;
    const verified = documents.filter(d => d.status === "verified").length;
    const missing = documents.filter(d => d.status === "missing").length;
    const completion = Math.round(((uploaded + verified) / total) * 100);
    return { total, uploaded, verified, missing, completion };
  }, [documents]);

  /* Handle login */
  const handleLogin = () => {
    if (!loginEmail.trim()) return;
    login(loginEmail, loginName);
    setShowLogin(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
      </div>
    );
  }

  /* ─── GUEST VIEW ─── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        {/* Hero — Login Prompt */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4" />
                Student Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Your Study Abroad Command Center</h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto">
                Track applications, manage documents, and connect with verified consultants — all in one place.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">Create Free Account</h3>
                <p className="text-sm text-slate-600 mb-4">Get started with basic profile and 1 application slot.</p>
                <div className="space-y-2 mb-5">
                  {["Profile dashboard", "1 application tracker", "Basic document list", "Community access"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Button onClick={() => setShowLogin(true)} className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl">
                  <User className="w-4 h-4 mr-2" /> Sign Up Free
                </Button>
              </motion.div>

              {/* Premium Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-amber-400/30 p-6 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Premium Bundle</h3>
                </div>
                <p className="text-sm text-slate-300 mb-4">Full control. Unlimited tracking. Verified consultants.</p>
                <div className="space-y-2 mb-5">
                  {["Unlimited applications", "Full document checklist", "3 AI-matched consultants", "Decision Engine access", "Priority WhatsApp support"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-200">
                      <Star className="w-4 h-4 text-amber-400 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link to="/premium" className="block">
                  <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-300 font-bold rounded-xl">
                    <Crown className="w-4 h-4 mr-2" /> Get Premium — ₹999
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Preview Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700">Dashboard Preview</span>
                  <Badge variant="outline" className="text-[10px] ml-auto">Read-only</Badge>
                </div>
                <div className="blur-[5px] opacity-40 pointer-events-none p-6">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-100 rounded-xl" />)}
                  </div>
                  <div className="h-40 bg-slate-100 rounded-xl mb-4" />
                  <div className="h-60 bg-slate-100 rounded-xl" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
                  <Button onClick={() => setShowLogin(true)} variant="outline" className="bg-white shadow-lg">
                    <Unlock className="w-4 h-4 mr-2" /> Unlock Your Dashboard
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Login Modal ─── */}
        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowLogin(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Welcome to Kohort</h3>
                      <p className="text-xs text-slate-500">Create your student dashboard</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowLogin(false)}><X className="w-4 h-4" /></Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email *</label>
                    <input
                      type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name</label>
                    <input
                      type="text" value={loginName} onChange={e => setLoginName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                    />
                  </div>
                  <Button onClick={handleLogin} className="w-full bg-teal-600 hover:bg-teal-700 rounded-xl mt-2">
                    <User className="w-4 h-4 mr-2" /> Create Account
                  </Button>
                  <p className="text-xs text-slate-500 text-center">No password needed. We&apos;ll remember you on this device.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ═══════════════════════════════ AUTHENTICATED VIEW ═══════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ─── Profile Header ─── */}
      <header className="pt-20 pb-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold text-white ${isPremium ? "bg-gradient-to-br from-amber-400 to-amber-600 ring-4 ring-amber-100" : "bg-gradient-to-br from-teal-500 to-teal-600"}`}>
                  {user.name?.charAt(0)?.toUpperCase() ?? "S"}
                </div>
                {isPremium && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                    <Crown className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name ?? "Student"}</h1>
                  {isPremium ? (
                    <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold border-0">
                      <Crown className="w-3 h-3 mr-1" /> PREMIUM
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-500 border-slate-200">
                      Free Plan
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isPremium && (
                <Link to="/premium">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 rounded-xl shadow-lg shadow-amber-500/20">
                    <Crown className="w-4 h-4 mr-1.5" /> Upgrade — ₹999
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="sm" onClick={() => logout()} className="rounded-xl text-slate-600">
                Logout
              </Button>
            </div>
          </div>

          {/* ─── Profile Completion Bar ─── */}
          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-slate-600 font-medium flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-teal-600" /> Profile Completion
                </span>
                <span className="font-bold text-teal-700">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2.5" />
            </div>
            {!isPremium && (
              <Link to="/premium" className="hidden sm:block">
                <Button size="sm" variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50 rounded-lg text-xs">
                  <Zap className="w-3.5 h-3.5 mr-1" /> Boost
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-32">

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Applications</p>
                  <p className="text-2xl font-bold text-slate-900">{applications.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span>{applications.filter(a => a.progress >= 50).length} in progress</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Documents</p>
                  <p className="text-2xl font-bold text-slate-900">{docStats.completion}%</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span>{docStats.uploaded + docStats.verified} of {docStats.total} uploaded</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Consultants</p>
                  <p className="text-2xl font-bold text-slate-900">{isPremium ? consultants.length : "—"}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px]">
                {isPremium ? (
                  <><Shield className="w-3 h-3 text-teal-500" /><span className="text-teal-600">All contacts unlocked</span></>
                ) : (
                  <><Lock className="w-3 h-3 text-amber-500" /><span className="text-amber-600">Unlock with Premium</span></>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className={`border shadow-sm hover:shadow-md transition-shadow ${isPremium ? "border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/30" : "border-slate-200"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Plan</p>
                  <p className={`text-lg font-bold ${isPremium ? "text-amber-700" : "text-slate-900"}`}>
                    {isPremium ? "Premium" : "Free"}
                  </p>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isPremium ? "bg-amber-100" : "bg-slate-100"}`}>
                  {isPremium ? <Crown className="h-5 w-5 text-amber-600" /> : <Zap className="h-5 w-5 text-slate-500" />}
                </div>
              </div>
              <div className="mt-2">
                {!isPremium ? (
                  <Link to="/premium" className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 hover:underline">
                    Upgrade Now <ChevronRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <span className="text-[10px] text-teal-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Full Access
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* My Vibe Card */}
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">My Vibe</p>
                  <p className="text-lg font-bold text-slate-900">
                    {savedVibe?.archetype ? (savedVibe.archetype === "career" ? "Career Climber" : savedVibe.archetype === "smart" ? "Smart Investor" : savedVibe.archetype === "explorer" ? "Experience Seeker" : savedVibe.archetype === "safe" ? "Safe Bet" : "Global Citizen") : "Not Set"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-pink-50 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
              </div>
              <div className="mt-2">
                {savedVibe?.archetype ? (
                  <button onClick={() => setShowVibeSection(!showVibeSection)} className="text-[10px] text-pink-600 font-semibold flex items-center gap-1 hover:underline">
                    View Full Vibe <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <Link to="/" className="text-[10px] text-pink-600 font-semibold flex items-center gap-1 hover:underline">
                    Take Vibe Quiz <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ═══════════════════════════════════════════════
            MY VIBE DETAIL SECTION (expandable)
            ═══════════════════════════════════════════════ */}
        {showVibeSection && savedVibe?.archetype && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Heart className="w-5 h-5 text-pink-500" /> Your Vibe Profile</h3>
              <button onClick={() => setShowVibeSection(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Archetype", value: savedVibe.archetype === "career" ? "Career Climber 🚀" : savedVibe.archetype === "smart" ? "Smart Investor 💰" : savedVibe.archetype === "explorer" ? "Experience Seeker 🎮" : savedVibe.archetype === "safe" ? "Safe Bet 🏠" : "Global Citizen 🌍", color: "bg-purple-100 text-purple-700" },
                { label: "City Energy", value: savedVibe.cityEnergy === "metro" ? "Big City 🌃" : savedVibe.cityEnergy === "calm" ? "Calm & Green 🌿" : savedVibe.cityEnergy ? "Best of Both ⚡" : "Not set", color: "bg-cyan-100 text-cyan-700" },
                { label: "Food Scene", value: savedVibe.foodScene === "desi" ? "Desi First 🍛" : savedVibe.foodScene === "global-food" ? "Global Explorer 🍜" : savedVibe.foodScene ? "Balanced 🍽️" : "Not set", color: "bg-amber-100 text-amber-700" },
                { label: "Work Style", value: savedVibe.workStyle === "side-hustle" ? "Side Hustle 💼" : savedVibe.workStyle === "study-focus" ? "Study Focus 📚" : savedVibe.workStyle ? "Internship Track 🎯" : "Not set", color: "bg-emerald-100 text-emerald-700" },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
                  <p className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full inline-block ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
              <Info className="w-3 h-3" />
              <span>Your vibe helps us recommend the best countries, courses, and consultants for your personality and goals.</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            MY JOURNEY — Study → Work → PR Visualizer
            ═══════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <button onClick={() => setShowJourney(!showJourney)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#0d9488]/10 flex items-center justify-center"><Route className="w-5 h-5 text-[#0d9488]" /></div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-sm">My Journey to PR</h3>
                <p className="text-xs text-gray-500">Track your progress: Study → Work → Permanent Residency</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showJourney ? "rotate-90" : ""}`} />
          </button>
          {showJourney && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="relative">
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0d9488] via-[#0d9488] to-amber-400 hidden sm:block" />
                <div className="space-y-3">
                  {[
                    { label: "Complete Profile", desc: "Fill your student profile with academic details", done: !!user, time: "Now" },
                    { label: "Choose Destination", desc: "Pick your target country and course", done: !!savedVibe?.archetype, time: "Step 2" },
                    { label: "Apply to Universities", desc: "Submit applications (2 ambitious + 3 target + 2 safe)", done: applications.length > 0, time: "Step 3" },
                    { label: "Secure Admission", desc: "Receive offer letter and pay deposit", done: applications.some((a: any) => a.status === "Accepted" || a.status === "admitted"), time: "Step 4" },
                    { label: "Visa Approval", desc: "Apply for student visa with all documents", done: applications.some((a: any) => a.status === "visa-approved"), time: "Step 5" },
                    { label: "Fly & Study", desc: "Begin your degree program abroad", done: false, time: "Step 6" },
                    { label: "Post-Study Work", desc: "Secure PSW and gain work experience", done: false, time: "After Graduation" },
                    { label: "Apply for PR", desc: "Submit PR application through skilled worker route", done: false, time: "Final Step" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 ${
                        step.done ? "bg-[#0d9488] text-white" : i === 0 ? "bg-[#0d9488] text-white" : "bg-slate-100 border-2 border-slate-300 text-slate-400"
                      }`}>
                        {step.done ? <CheckCircle className="w-5 h-5" /> : i + 1}
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold text-sm ${step.done ? "text-[#0d9488]" : "text-gray-900"}`}>{step.label}</span>
                          <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">{step.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            CAN I AFFORD THIS? — Budget Calculator
            ═══════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <button onClick={() => setShowAffordability(!showAffordability)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Calculator className="w-5 h-5 text-amber-600" /></div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-sm">Can I Afford This?</h3>
                <p className="text-xs text-gray-500">Quick budget check for your dream destination</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showAffordability ? "rotate-90" : ""}`} />
          </button>
          {showAffordability && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              <AffordabilityCalculator />
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            DECISION ENGINE CTA — Primary Action
            ═══════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-[#0f766e] rounded-2xl p-5 sm:p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="relative flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <h3 className="text-lg font-bold text-white">Run Decision Engine</h3>
                <Badge className="bg-amber-400/20 text-amber-200 border-amber-400/30 text-[10px]">RECOMMENDED</Badge>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Analyse 22 countries across tuition, living costs, earnings, safety, visa & PR pathways.
                Get your top 3 destinations ranked by fit score in 90 seconds.
              </p>
            </div>
            <Link to="/evaluate" className="shrink-0">
              <Button className="bg-white text-teal-700 hover:bg-gray-100 rounded-xl font-bold px-6 py-3 h-auto shadow-lg">
                <Zap className="w-4 h-4 mr-2" /> Start Engine <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            POLICY ALERTS
            ═══════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-gray-900 text-sm">Policy Alerts</h3>
            <Badge className="bg-red-100 text-red-600 text-[10px]">Live Updates</Badge>
          </div>
          <div className="space-y-2">
            {[
              { country: "Canada", alert: "2026 study permit cap expected. Apply by Dec 2025 for Sept 2026.", severity: "high", date: "May 2025" },
              { country: "UK", alert: "Skilled Worker salary threshold rising to £38,700 from April 2026.", severity: "medium", date: "April 2025" },
              { country: "Germany", alert: "EU Blue Card reforms active. Reduced salary thresholds.", severity: "positive", date: "Jan 2025" },
              { country: "USA", alert: "H-1B registration opens March 2026. Premium processing $2,500.", severity: "medium", date: "May 2025" },
            ].map((alert, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.severity === "high" ? "bg-red-500" : alert.severity === "medium" ? "bg-amber-500" : "bg-emerald-500"}`} />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900">{alert.country} — {alert.alert}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 h-12 w-full sm:w-auto">
            <TabsTrigger value="applications" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-lg text-sm gap-2">
              <FileText className="h-4 w-4" /> Applications
              {applications.length > 0 && (
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{applications.length}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-lg text-sm gap-2">
              <Upload className="h-4 w-4" /> Documents
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${docStats.missing > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {docStats.missing > 0 ? `${docStats.missing} missing` : "OK"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="consultants" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-lg text-sm gap-2">
              <Users className="h-4 w-4" /> Consultants
              {isPremium && <Crown className="w-3 h-3 text-amber-500" />}
            </TabsTrigger>
          </TabsList>

          {/* ═══ APPLICATIONS TAB ═══ */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Application Tracker</h2>
                <p className="text-sm text-slate-500">Monitor every stage of your university applications</p>
              </div>
              {!isPremium && applications.length >= 1 && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                  <Lock className="w-3 h-3 mr-1" /> 1 of 3 shown
                </Badge>
              )}
            </div>

            {!isPremium ? (
              <>
                {/* Free: Show 1 application + locked rest */}
                <ApplicationCard app={applications[0]} isPremium={false} />
                {applications.length > 1 && (
                  <BlurOverlay title="Unlock Full Tracker" subtitle={`Track all ${applications.length} applications with deadline alerts and progress analytics`}>
                    <div className="space-y-3">
                      {applications.slice(1).map(app => (
                        <div key={app.id} className="h-32 bg-slate-100 rounded-xl" />
                      ))}
                    </div>
                  </BlurOverlay>
                )}
                {/* Free: Teaser feature list */}
                <PremiumFeatureTeaser
                  features={[
                    { icon: Clock, text: "Deadline reminders for all applications" },
                    { icon: TrendingUp, text: "Progress analytics and predictions" },
                    { icon: MessageSquare, text: "Consultant notes per application" },
                    { icon: Download, text: "Export application summary as PDF" },
                  ]}
                />
              </>
            ) : (
              /* Premium: Show all */
              <div className="space-y-3">
                {applications.map(app => (
                  <ApplicationCard key={app.id} app={app} isPremium={true} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══ DOCUMENTS TAB ═══ */}
          <TabsContent value="documents" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Document Checklist</h2>
                <p className="text-sm text-slate-500">Organize and track all required documents</p>
              </div>
              <div className="flex items-center gap-2">
                <ProgressRing value={docStats.completion} size={44} />
              </div>
            </div>

            {!isPremium ? (
              <>
                {/* Free: Show partial list */}
                <div className="space-y-2">
                  {documents.slice(0, 4).map(doc => (
                    <DocumentRow key={doc.id} doc={doc} isPremium={false} />
                  ))}
                </div>
                <BlurOverlay title="Complete Checklist" subtitle={`${documents.length} documents with upload tracking, verification status, and consultant review`}>
                  <div className="space-y-2">
                    {documents.slice(4).map(d => (
                      <div key={d.id} className="h-12 bg-slate-100 rounded-lg" />
                    ))}
                  </div>
                </BlurOverlay>
                <PremiumFeatureTeaser
                  features={[
                    { icon: Upload, text: "Upload and store documents securely" },
                    { icon: Shield, text: "Consultant verification & feedback" },
                    { icon: Download, text: "Download document templates (SOP, LOR)" },
                    { icon: AlertCircle, text: "Missing document alerts before deadlines" },
                  ]}
                />
              </>
            ) : (
              <>
                {/* Category grouping for premium */}
                {["Identity", "Academic", "Test", "Essays", "Profile", "Financial"].map(cat => {
                  const catDocs = documents.filter(d => d.category === cat);
                  if (!catDocs.length) return null;
                  return (
                    <div key={cat}>
                      <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-teal-600" /> {cat}
                      </h3>
                      <div className="space-y-2">
                        {catDocs.map(doc => (
                          <DocumentRow key={doc.id} doc={doc} isPremium={true} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </TabsContent>

          {/* ═══ CONSULTANTS TAB ═══ */}
          <TabsContent value="consultants" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">AI-Matched Consultants</h2>
                <p className="text-sm text-slate-500">Verified experts matched to your profile and goals</p>
              </div>
              {!isPremium && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                  <Lock className="w-3 h-3 mr-1" /> Contacts Hidden
                </Badge>
              )}
            </div>

            {/* Matching explanation — always visible */}
            <MatchingExplainer isPremium={isPremium} />

            <div className="grid gap-4">
              {consultants.map(c => (
                <ConsultantCard key={c.id} consultant={c} isPremium={isPremium} />
              ))}
            </div>

            {!isPremium && (
              <PremiumFeatureTeaser
                features={[
                  { icon: Phone, text: "Direct WhatsApp & phone numbers" },
                  { icon: MessageSquare, text: "Priority messaging within platform" },
                  { icon: Star, text: "Read 200+ student reviews per consultant" },
                  { icon: Calendar, text: "Book free consultation calls" },
                ]}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* ─── ROI & Time Saving Section ─── */}
        <ROISection isPremium={isPremium} />

      </main>

      {/* ─── Sticky Premium Bar ─── */}
      {!isPremium && <StickyPremiumBar />}
    </div>
  );
}

/* ════════════════════════════ SUB-COMPONENTS ════════════════════════════ */

/* ─── Application Card ─── */
function ApplicationCard({ app, isPremium }: { app: Application; isPremium: boolean }) {
  const status = statusConfig[app.status] ?? statusConfig.researching;
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900">{app.university}</h3>
              <Badge className={`${status.bg} ${status.color} border-0 text-xs`}>{status.label}</Badge>
              {isPremium && app.status === "offer_received" && (
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                  <Award className="w-3 h-3 mr-1" /> Offer!
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-1">{app.course} &middot; {destinationLabels[app.destination] ?? app.destination}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Deadline: {app.deadline}</span>
              {isPremium && (
                <span className="flex items-center gap-1 text-teal-600 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" /> {app.progress}% complete
                </span>
              )}
            </div>
          </div>
          {isPremium && (
            <div className="w-full sm:w-48">
              <Progress value={app.progress} className="h-2" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Progress</span>
                <span>{app.progress}%</span>
              </div>
            </div>
          )}
        </div>
        {isPremium && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            {Object.entries(statusConfig).slice(0, -1).map(([key, s], idx) => {
              const appIdx = Object.keys(statusConfig).indexOf(app.status);
              const isActive = idx <= appIdx;
              const isCurrent = key === app.status;
              return (
                <div key={key} className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] whitespace-nowrap ${isActive ? "bg-teal-50 text-teal-700" : "bg-slate-50 text-slate-400"} ${isCurrent ? "ring-1 ring-teal-400 font-bold" : ""}`}>
                  {isActive ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                  {s.label}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Document Row ─── */
function DocumentRow({ doc, isPremium }: { doc: DocumentItem; isPremium: boolean }) {
  const statusIcons = {
    uploaded: <CheckCircle2 className="w-4 h-4 text-blue-500" />,
    verified: <Shield className="w-4 h-4 text-teal-500" />,
    pending: <Clock className="w-4 h-4 text-amber-500" />,
    missing: <AlertCircle className="w-4 h-4 text-red-500" />,
  };
  const statusLabels = {
    uploaded: "Uploaded", verified: "Verified", pending: "Pending", missing: "Missing",
  };
  const statusBg = {
    uploaded: "bg-blue-50 border-blue-200",
    verified: "bg-teal-50 border-teal-200",
    pending: "bg-amber-50 border-amber-200",
    missing: "bg-red-50 border-red-200",
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${statusBg[doc.status]} transition-all hover:shadow-sm`}>
      <div className="flex items-center gap-3">
        {statusIcons[doc.status]}
        <div>
          <p className={`text-sm font-medium ${doc.status === "missing" ? "text-red-700" : "text-slate-800"}`}>
            {doc.name}
            {doc.required && <span className="text-red-400 ml-1">*</span>}
          </p>
          {isPremium && (
            <p className="text-[10px] text-slate-500">{doc.category} &middot; {statusLabels[doc.status]}</p>
          )}
        </div>
      </div>
      {isPremium ? (
        <Button size="sm" variant="ghost" className="h-8 text-xs gap-1">
          {doc.status === "missing" || doc.status === "pending" ? (
            <><Upload className="w-3.5 h-3.5" /> Upload</>
          ) : (
            <><Eye className="w-3.5 h-3.5" /> View</>
          )}
        </Button>
      ) : (
        <span className="text-[10px] text-slate-400">{statusLabels[doc.status]}</span>
      )}
    </div>
  );
}

/* ─── Consultant Card ─── */
function ConsultantCard({ consultant, isPremium }: { consultant: ConsultantMatch; isPremium: boolean }) {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {consultant.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900">{consultant.name}</h3>
                  {consultant.verified && (
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-[10px]">
                      <Shield className="w-2.5 h-2.5 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{consultant.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{consultant.specialization}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <ProgressRing value={consultant.matchScore} size={42} stroke={3} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Match Score</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center bg-slate-50 rounded-lg p-2">
              <p className="text-sm font-bold text-slate-900">{consultant.successRate}</p>
              <p className="text-[10px] text-slate-500">Success Rate</p>
            </div>
            <div className="text-center bg-slate-50 rounded-lg p-2">
              <p className="text-sm font-bold text-slate-900">{consultant.studentsHelped.toLocaleString()}</p>
              <p className="text-[10px] text-slate-500">Students Helped</p>
            </div>
            <div className="text-center bg-slate-50 rounded-lg p-2">
              <p className="text-sm font-bold text-slate-900">{consultant.responseTime}</p>
              <p className="text-[10px] text-slate-500">Response</p>
            </div>
          </div>
        </div>

        {/* Contact section — locked for free */}
        <div className={`border-t border-slate-100 ${!isPremium ? "bg-amber-50/50" : "bg-teal-50/30"}`}>
          {!isPremium ? (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Phone, WhatsApp & Email hidden</span>
              </div>
              <Link to="/premium">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs">
                  <Crown className="w-3 h-3 mr-1" /> Unlock
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-4 flex flex-wrap items-center gap-3">
              <a href={`tel:${consultant.phone}`} className="inline-flex items-center gap-1.5 text-sm text-teal-700 bg-teal-100 px-3 py-1.5 rounded-lg hover:bg-teal-200 transition-colors">
                <Phone className="w-3.5 h-3.5" /> {consultant.phone}
              </a>
              <a href={`https://wa.me/${consultant.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-100 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a href={`mailto:${consultant.email}`} className="inline-flex items-center gap-1.5 text-sm text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Matching Explainer ─── */
function MatchingExplainer({ isPremium }: { isPremium: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="border border-teal-100 bg-gradient-to-br from-teal-50/50 to-white shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">How AI Matching Works</h3>
              <p className="text-[10px] text-slate-500">Powered by 50+ data points across 22 countries</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs h-8">
            {expanded ? "Less" : "Learn More"} <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${expanded ? "rotate-90" : ""}`} />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(expanded ? matchingFactors : matchingFactors.slice(0, 3)).map(f => (
            <div key={f.label} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-md bg-white border border-teal-100 flex items-center justify-center shrink-0">
                <f.icon className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{f.label}</p>
                {expanded && <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{f.desc}</p>}
              </div>
            </div>
          ))}
        </div>

        {expanded && isPremium && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-teal-100">
            <div className="bg-white rounded-xl p-4 border border-teal-100">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-teal-600" /> Your Matching Score Breakdown
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Academic Profile Match", score: 92, desc: "Your 8.5 GPA aligns with top university requirements" },
                  { label: "Destination Preference Fit", score: 96, desc: "Canada & Germany are your top-ranked destinations" },
                  { label: "Budget Compatibility", score: 88, desc: "Your budget fits well with public university options" },
                  { label: "Consultant Availability", score: 94, desc: "All 3 matched consultants are currently accepting students" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-24 shrink-0">
                      <p className="text-[10px] text-slate-600 leading-tight">{item.label}</p>
                    </div>
                    <div className="flex-1">
                      <Progress value={item.score} className="h-1.5" />
                    </div>
                    <span className="text-xs font-bold text-teal-700 w-8 text-right">{item.score}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-3 italic">
                Scores are recalculated every time you update your profile or run the Decision Engine.
              </p>
            </div>
          </motion.div>
        )}

        {expanded && !isPremium && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-teal-100">
            <Link to="/premium">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-800 font-medium">See your detailed matching scores</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </div>
            </Link>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── ROI Section ─── */
function ROISection({ isPremium }: { isPremium: boolean }) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Your ROI with Kohort</h2>
          <p className="text-sm text-slate-500">The real cost of going alone vs. using Kohort Premium</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Clock, label: "Research Time Saved", free: "200+ hours", premium: "Save 180 hrs", color: "blue" },
          { icon: Percent, label: "Avoid Wrong Choices", free: "Self-risk", premium: "92% accuracy", color: "purple" },
          { icon: TrendingUp, label: "Avg. Scholarship Found", free: "₹0", premium: "₹3.5L found", color: "green" },
          { icon: Shield, label: "Visa Success Rate", free: "70% avg", premium: "94% avg", color: "teal" },
        ].map(item => (
          <Card key={item.label} className="border border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                  <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                </div>
                <p className="text-xs font-medium text-slate-600">{item.label}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">{isPremium ? item.premium.split(" ")[0] : item.free.split(" ")[0]}</span>
                <span className={`text-xs ${isPremium ? "text-teal-600 font-semibold" : "text-slate-500"}`}>
                  {isPremium ? item.premium.split(" ").slice(1).join(" ") : item.free.split(" ").slice(1).join(" ")}
                </span>
              </div>
              {!isPremium && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600">
                  <ArrowRight className="w-3 h-3" />
                  <span>Unlock with Premium</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="mt-4 border border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
            <div className="p-3">Feature</div>
            <div className="p-3 text-center">Free Plan</div>
            <div className="p-3 text-center bg-amber-50/50 text-amber-700">Premium</div>
          </div>
          {[
            ["Decision Engine Results", "Rank #3 only", "All 22 countries ranked"],
            ["Application Tracker", "1 application", "Unlimited + alerts"],
            ["Document Checklist", "4 items visible", "Full 12-item tracker"],
            ["Consultant Contacts", "Hidden", "WhatsApp, Phone, Email"],
            ["Priority Support", "Community", "< 2hr WhatsApp response"],
            ["Country Playbooks", "Teaser", "Full visa + SOP guides"],
            ["ROI Calculator", "Read-only", "Interactive + personalized"],
          ].map(([feature, free, premium]) => (
            <div key={feature} className="grid grid-cols-3 border-b border-slate-100 last:border-0 text-sm">
              <div className="p-3 text-slate-700 font-medium">{feature}</div>
              <div className="p-3 text-center text-slate-500 text-xs">{free}</div>
              <div className="p-3 text-center bg-amber-50/30 text-xs font-semibold text-teal-700 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {premium}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

/* ─── Premium Feature Teaser ─── */
function PremiumFeatureTeaser({ features }: { features: { icon: React.ComponentType<{ className?: string }>; text: string }[] }) {
  return (
    <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-800">Premium Features</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-amber-900">
              <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {f.text}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Link to="/premium" className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 hover:text-amber-800">
            Unlock all features <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-amber-600">for just ₹999</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Sticky Premium Bar ─── */
function StickyPremiumBar() {
  return (
    <motion.div
      initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-amber-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Upgrade to Premium</p>
            <p className="text-xs text-slate-500 hidden sm:block">Unlock consultants, full tracker &amp; decision engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-amber-700 hidden sm:inline">₹999</span>
          <Link to="/premium">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 rounded-xl shadow-lg shadow-amber-500/20 font-semibold">
              <Crown className="w-4 h-4 mr-1.5" /> Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
