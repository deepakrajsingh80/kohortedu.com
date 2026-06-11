import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2, MapPin, Globe, GraduationCap, Users, Star,
  ChevronRight, CheckCircle, Clock, DollarSign, BookOpen,
  Trophy, Calendar, FileText, User, Award,
  TrendingUp, Heart, Utensils, Home, Bus, Shield, Thermometer,
  Landmark, ArrowRight, X, Sparkles, Percent, Wallet,
  Briefcase, Award as AwardIcon, Target, Zap,
  Check, Info, Send, Play, BarChart3, MessageCircle,
  Menu, XCircle, Camera, MapPinned,
  Dumbbell, Music, Palmtree, Database, Phone, Coffee,
  Download, Lock, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUniversityBySlug } from "@/data/universities";
import type { University } from "@/data/universities";
import { ACADEMIC_THRESHOLD } from "@/data/decisionEngine";

/* ─── Country → video mapping ─── */
function getCountryVideo(country: string): string {
  const map: Record<string, string> = {
    "USA": "/videos/campus-usa.mp4",
    "United States": "/videos/campus-usa.mp4",
    "UK": "/videos/campus-uk.mp4",
    "United Kingdom": "/videos/campus-uk.mp4",
    "Ireland": "/videos/campus-uk.mp4",
    "Germany": "/videos/campus-germany.mp4",
    "Netherlands": "/videos/campus-germany.mp4",
    "France": "/videos/campus-germany.mp4",
    "Sweden": "/videos/campus-germany.mp4",
    "Italy": "/videos/campus-germany.mp4",
    "Poland": "/videos/campus-germany.mp4",
    "Australia": "/videos/campus-australia.mp4",
    "New Zealand": "/videos/campus-australia.mp4",
    "Singapore": "/videos/campus-australia.mp4",
    "Malaysia": "/videos/campus-australia.mp4",
    "Canada": "/videos/campus-canada.mp4",
  };
  return map[country] || "/videos/campus-generic.mp4";
}

/* ─── Scroll-to-section helper ─── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Fade-in-on-scroll wrapper ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

const RETURN_URL_KEY = "kc_premium_source_url";

/* ─── Premium-gated Admission Guide Download ─── */
function DownloadAdmissionGuide({ slug, name }: { slug: string; name: string }) {
  const pdfUrl = `/university-guides/${slug}-guide.pdf`;
  // Match the app's actual localStorage keys (kc_user, kc_premium)
  const userDataRaw = localStorage.getItem("kc_user");
  const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
  const isPremium = localStorage.getItem("kc_premium") === "true" || userData?.isPremium === true;

  const [showModal, setShowModal] = useState(false);

  // Premium user: direct download
  if (isPremium) {
    return (
      <a href={pdfUrl} download={`${slug}-admission-guide.pdf`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105">
        <Download className="w-4 h-4" /> Download Admission Guide (PDF)
      </a>
    );
  }

  // Non-premium: show lock with modal
  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-all hover:scale-105">
        <Lock className="w-4 h-4" /> Download Admission Guide
        <Badge className="bg-amber-500 text-white text-[9px] ml-1 px-2 py-0.5">Premium</Badge>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Premium Feature</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 mb-4">
                The <strong>{name}</strong> Admission Guide PDF includes programs, fees, scholarships, placement data, campus life details, and a complete document checklist — everything you need to apply.
              </p>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> Complete program details & curriculum
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> Fee breakdown & scholarship info
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> Placement stats & salary data
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> Document checklist with checkboxes
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" /> 194 university guides included
                </div>
              </div>

              <Link
                to="/premium"
                onClick={() => {
                  setShowModal(false);
                  // Save current URL so Premium page can redirect back after purchase
                  localStorage.setItem(RETURN_URL_KEY, window.location.hash);
                }}
              >
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl py-5 font-bold text-sm">
                  <Crown className="w-4 h-4 mr-2" /> Unlock Premium — Rs 999
                </Button>
              </Link>
              <p className="text-xs text-slate-500 text-center mt-3">One-time payment. No subscription.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Lead Capture Modal ─── */
function LeadCaptureModal({ open, onClose, title, context }: { open: boolean; onClose: () => void; title: string; context: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", courseInterest: "" });
  useEffect(() => { if (open) { setSubmitted(false); setForm({ name: "", email: "", phone: "", courseInterest: "" }); } }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        {!submitted ? (
            <>
              <div className="flex items-center gap-2 mb-1"><Sparkles className="w-5 h-5 text-amber-400" /><h3 className="text-xl font-bold text-white">{title}</h3></div>
              <p className="text-sm text-slate-400 mb-5">{context}</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
                <div><label className="text-xs font-medium text-slate-300 mb-1 block">Full Name *</label><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none" placeholder="Your name" /></div>
                <div><label className="text-xs font-medium text-slate-300 mb-1 block">Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none" placeholder="your@email.com" /></div>
                <div><label className="text-xs font-medium text-slate-300 mb-1 block">Phone *</label><input required type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none" placeholder="+91-XXXXXXXXXX" /></div>
                <div><label className="text-xs font-medium text-slate-300 mb-1 block">Course Interest</label><input value={form.courseInterest} onChange={(e) => setForm({...form, courseInterest: e.target.value})} className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none" placeholder="e.g. MS Computer Science" /></div>
                <Button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl py-5 text-sm font-bold mt-2">
                  <Send className="w-4 h-4 mr-2" /> Submit Application
                </Button>
                <p className="text-[10px] text-slate-500 text-center">Our counselor will contact you within 24 hours. 100% free service.</p>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#0d9488]/20 flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-[#0d9488]" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-sm text-slate-400 mb-4">Our study abroad counselor will contact you within 24 hours with personalized guidance for {context}.</p>
              <Button onClick={onClose} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-6">Close</Button>
            </div>
          )}
        </div>
      </div>
  );
}

/* ─── Floating Sticky CTA ─── */
function StickyCTA({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900/95 to-slate-950/95 backdrop-blur-lg border-t border-slate-700/50 p-3 sm:p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block"><p className="text-sm font-bold text-white">Need help with your application?</p><p className="text-xs text-slate-400">Get free expert guidance</p></div>
        <Button onClick={onClick} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-6 py-5 text-sm font-bold flex-1 sm:flex-none">
          <Zap className="w-4 h-4 mr-2" /> {label}
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Floating TOC Sidebar ─── */
const SECTIONS = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "programs", label: "Programs", icon: GraduationCap },
  { id: "admissions", label: "Admissions", icon: FileText },
  { id: "scholarships", label: "Scholarships", icon: Award },
  { id: "career", label: "Career", icon: TrendingUp },
  { id: "placements", label: "Placements", icon: BarChart3 },
  { id: "campus", label: "Campus Life", icon: Landmark },
];

function FloatingTOC({ activeSection }: { activeSection: string }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end">
      {collapsed ? (
        <button onClick={() => setCollapsed(false)}
          className="w-10 h-10 rounded-full bg-slate-800/90 border border-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all shadow-lg">
          <Menu className="w-4 h-4" />
        </button>
      ) : (
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-2xl p-2 shadow-2xl">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jump to</span>
            <button onClick={() => setCollapsed(true)} className="text-slate-400 hover:text-white transition-colors"><XCircle className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeSection === s.id ? "bg-[#0d9488]/20 text-[#0d9488]" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}>
                <s.icon className="w-3 h-3" />{s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Section Divider ─── */
function SectionDivider({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <FadeIn className="mb-8">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-[#0d9488]/10 border border-[#0d9488]/20 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#0d9488]" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-[#0d9488]/30 via-slate-700/50 to-transparent mt-4" />
    </FadeIn>
  );
}

/* ─── Info Card ─── */
function InfoCard({ icon: Icon, label, value, color = "text-[#0d9488]", bg = "bg-[#0d9488]/10" }: { icon: any; label: string; value: string; color?: string; bg?: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}><Icon className={`w-4 h-4 ${color}`} /></div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}

/* ─── Lead Banner ─── */
function LeadBanner({ icon: Icon, title, desc, cta, onClick, color = "from-[#0d9488]/20 to-amber-500/10", borderColor = "border-[#0d9488]/30" }: any) {
  return (
    <FadeIn>
      <div className={`bg-gradient-to-r ${color} border ${borderColor} rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color.includes("purple") ? "bg-purple-500/20" : color.includes("emerald") ? "bg-emerald-500/20" : color.includes("amber") ? "bg-amber-500/20" : "bg-[#0d9488]/20"}`}>
            <Icon className={`w-6 h-6 ${color.includes("purple") ? "text-purple-400" : color.includes("emerald") ? "text-emerald-400" : color.includes("amber") ? "text-amber-400" : "text-[#0d9488]"}`} />
          </div>
          <div><p className="text-sm font-bold text-white">{title}</p><p className="text-xs text-slate-400">{desc}</p></div>
        </div>
        <Button onClick={onClick} size="sm" className="rounded-xl text-xs font-bold shrink-0 px-5 py-4">
          {cta}
        </Button>
      </div>
    </FadeIn>
  );
}

/* ─── Image Gallery Card ─── */
function ImageGalleryCard({ src, title, subtitle }: { src: string; title: string; subtitle?: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
      <img src={src} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm font-bold text-white">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-300 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ─── MAIN COMPONENT ─── */
/* ═══════════════════════════════════════════ */
export default function UniversityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const uni = getUniversityBySlug(slug || "");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [leadModal, setLeadModal] = useState({ open: false, title: "", context: "" });
  const [activeSection, setActiveSection] = useState("overview");

  const openLead = useCallback((title: string, context: string) => setLeadModal({ open: true, title, context }), []);

  /* ─── Intersection Observer for active section ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [slug]);

  /* ─── SEO ─── */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (uni) {
      const title = `${uni.name} — Programs, Admissions, Scholarships & Placements | Kohortconnect`;
      const desc = `Explore ${uni.name} (${uni.qsRanking}) in ${uni.city}, ${uni.country}. Programs, admission requirements, academic criteria, ${uni.placementData?.overallPlacementRate} placement rate, scholarships, campus life. ${uni.indianStudents} Indian students enrolled.`;
      const keywords = `${uni.name}, ${uni.slug.replace(/-/g, ' ')}, study in ${uni.country}, ${uni.city} university, Indian students ${uni.name}, ${uni.name} admission, ${uni.name} scholarships, ${uni.name} placements, study abroad consultants`;
      document.title = title;
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) metaDesc.content = desc;
      else { const m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m); }
      let metaKw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (metaKw) metaKw.content = keywords;
      else { const m = document.createElement('meta'); m.name = 'keywords'; m.content = keywords; document.head.appendChild(m); }
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (ogTitle) ogTitle.content = title;
      let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (ogDesc) ogDesc.content = desc;
    }
  }, [slug, uni]);

  if (!uni) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">University Not Found</h1>
          <p className="text-slate-400 mb-4">The university you're looking for doesn't exist in our database.</p>
          <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl" onClick={() => window.location.href = '/universities'}>View All Universities</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <FloatingTOC activeSection={activeSection} />

      {/* ═══════ HERO WITH VIDEO BACKGROUND ═══════ */}
      <section className="relative pt-20 pb-12 overflow-hidden min-h-[60vh] flex items-center">
        {/* Background image (video removed for stability) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${uni.heroImage})` }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-[#0d9488]/20 text-[#0d9488] border-[#0d9488]/30 text-xs backdrop-blur-sm"><MapPin className="w-3 h-3 mr-1" />{uni.city}, {uni.country}</Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs backdrop-blur-sm"><Star className="w-3 h-3 mr-1" />QS {uni.qsRanking}</Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs backdrop-blur-sm">{uni.type}</Badge>
              {uni.founded > 0 && <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/30 text-xs backdrop-blur-sm">Est. {uni.founded}</Badge>}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">{uni.name}</h1>
            <p className="text-lg text-[#0d9488] font-semibold mb-3">{uni.tagline}</p>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed mb-6">{uni.description}</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => openLead("Get Admission Details", uni.name)} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-6 py-5 text-sm font-bold shadow-lg shadow-teal-600/25">
                <Zap className="w-4 h-4 mr-2" /> Get Admission Details
              </Button>
              <Button onClick={() => openLead("Scholarship Eligibility Check", uni.name)} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6 py-5 text-sm font-bold shadow-lg shadow-amber-500/25">
                <Award className="w-4 h-4 mr-2" /> Check Scholarships
              </Button>
              <a href={`https://${uni.website}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-slate-700/80 hover:bg-slate-600 text-white rounded-xl px-6 py-5 text-sm font-bold backdrop-blur-sm"><Globe className="w-4 h-4 mr-2" /> Official Website</Button>
              </a>
              <DownloadAdmissionGuide slug={uni.slug} name={uni.name} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ QUICK STATS ═══════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <InfoCard icon={Star} label="QS Ranking" value={uni.qsRanking} color="text-amber-400" bg="bg-amber-500/10" />
            <InfoCard icon={Percent} label="Acceptance" value={uni.acceptanceRate} color="text-blue-400" bg="bg-blue-500/10" />
            <InfoCard icon={Users} label="Indian Students" value={uni.indianStudents} color="text-orange-400" bg="bg-orange-500/10" />
            <InfoCard icon={GraduationCap} label="Graduation Rate" value={uni.graduationRate} color="text-emerald-400" bg="bg-emerald-500/10" />
            <InfoCard icon={Users} label="Student-Faculty" value={uni.studentFacultyRatio} color="text-purple-400" bg="bg-purple-500/10" />
            <InfoCard icon={Wallet} label="Avg Tuition" value={uni.programs[0]?.tuition?.split("/")[0] || "Varies"} color="text-pink-400" bg="bg-pink-500/10" />
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1: OVERVIEW                        */}
      {/* ═══════════════════════════════════════════ */}
      <section id="overview" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-24">
        <SectionDivider icon={BookOpen} title="Overview" subtitle={`Why ${uni.name} is a top choice for Indian students`} />

        <FadeIn delay={0.1}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-[#0d9488]" /> Why {uni.name}?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {uni.whyThisUni.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-700/40 hover:border-[#0d9488]/30 transition-all">
                  <CheckCircle className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" /><span className="text-sm text-slate-300">{w}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-3 gap-3 mb-10">
            <ImageGalleryCard src={uni.heroImage} title="Campus Overview" />
            <ImageGalleryCard src={uni.campusImage} title="Campus Life" />
            <ImageGalleryCard src={uni.campusImage} title="Student Facilities" subtitle={uni.campusLife?.campusFacilities?.[0]} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-[#0d9488]" /> Cost of Living Breakdown</h3>
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2 pr-4">Category</th><th className="text-left py-2">Annual Cost</th></tr></thead>
                <tbody>{uni.costOfLiving.map((c, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0"><td className="py-3 pr-4 text-slate-300">{c.category}</td><td className="py-3 text-[#0d9488] font-semibold">{c.cost}</td></tr>
                ))}</tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm text-amber-400 font-semibold flex items-center gap-2"><Info className="w-4 h-4" /> Pro Tip for Indian Students</p>
              <p className="text-xs text-amber-300/80 mt-1">{uni.country === "Germany" ? "Open a Blocked Account with €11,208 before applying for a visa. This is mandatory." : uni.country === "Canada" ? "Show CAD 20,635 in GIC (Guaranteed Investment Certificate) for SDS stream visa." : uni.country === "UK" ? "Maintenance funds: £9,207 (London) or £7,603 (outside London) for 28 days." : uni.country === "Australia" ? "Show AUD 24,505 in a bank account for your student visa application." : uni.country === "Ireland" ? "Show EUR 10,000 in your bank account as proof of funds for the visa." : "Show liquid funds covering tuition + $15K living expenses for I-20."}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-pink-400" /> Indian Student Reviews</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {uni.reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#0d9488]/20 flex items-center justify-center"><User className="w-4 h-4 text-[#0d9488]" /></div>
                    <div><p className="text-sm font-bold text-white">{r.name}</p><p className="text-[10px] text-slate-400">{r.course} &middot; {r.year}</p></div>
                    <div className="ml-auto flex">{Array.from({ length: 5 }).map((_, si) => <Star key={si} className={`w-3 h-3 ${si < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />)}</div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">&ldquo;{r.review}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        <LeadBanner icon={Phone} title={`Want personalized guidance for ${uni.name}?`} desc={`Talk to our counselor who specializes in ${uni.country} admissions`}
          cta={<><Phone className="w-4 h-4 mr-2" /> Talk to Counselor</>}
          onClick={() => openLead(`Speak to ${uni.country} Counselor`, uni.name)} />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: PROGRAMS                        */}
      {/* ═══════════════════════════════════════════ */}
      <section id="programs" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={GraduationCap} title="Programs" subtitle={`${uni.programs.length} programs available for international students`} />

        {/* First 3 programs visible to all, rest login-gated */}
        <div className="space-y-3">
          {uni.programs.slice(0, 3).map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-800/30 hover:border-[#0d9488]/30 transition-all">
                <button onClick={() => setExpandedProgram(expandedProgram === `${idx}` ? null : `${idx}`)}
                  className="w-full p-5 flex items-start gap-4 text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.level === "UG" ? "bg-blue-500/20 text-blue-400" : p.level === "PG" ? "bg-[#0d9488]/20 text-[#0d9488]" : "bg-amber-500/20 text-amber-400"}`}>
                    <span className="text-xs font-bold">{p.level}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white">{p.name}</h3>
                      <Badge className="text-[9px] bg-slate-700 text-slate-300 border-slate-600">{p.level}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                      <span className="text-[10px] text-[#0d9488] font-semibold flex items-center gap-1"><DollarSign className="w-3 h-3" />{p.tuition}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${expandedProgram === `${idx}` ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {expandedProgram === `${idx}` && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-slate-700/30 pt-4 space-y-3">
                        <p className="text-sm text-slate-300">{p.description}</p>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Requirements</p>
                          <ul className="space-y-1">{p.requirements.map((req, ri) => <li key={ri} className="text-xs text-slate-300 flex items-start gap-1.5"><Check className="w-3 h-3 text-[#0d9488] shrink-0 mt-0.5" />{req}</li>)}</ul>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[10px] text-slate-500 font-medium mr-1">Intakes:</span>
                          {p.intakes.map((int, ii) => <Badge key={ii} className="text-[9px] bg-slate-700 text-slate-300 border-slate-600">{int}</Badge>)}
                        </div>
                        <Button onClick={() => openLead(`Apply for ${p.name}`, uni.name)} size="sm" className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-lg text-xs mt-1">
                          <Send className="w-3 h-3 mr-1" /> Get Application Help
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
          {uni.programs.length > 3 && uni.programs.slice(3).map((p, idx) => (
            <FadeIn key={idx + 3} delay={(idx + 3) * 0.05}>
              <div className="border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-800/30 hover:border-[#0d9488]/30 transition-all">
                <button onClick={() => setExpandedProgram(expandedProgram === `${idx + 3}` ? null : `${idx + 3}`)}
                  className="w-full p-5 flex items-start gap-4 text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.level === "UG" ? "bg-blue-500/20 text-blue-400" : p.level === "PG" ? "bg-[#0d9488]/20 text-[#0d9488]" : "bg-amber-500/20 text-amber-400"}`}>
                    <span className="text-xs font-bold">{p.level}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white">{p.name}</h3>
                      <Badge className="text-[9px] bg-slate-700 text-slate-300 border-slate-600">{p.level}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                      <span className="text-[10px] text-[#0d9488] font-semibold flex items-center gap-1"><DollarSign className="w-3 h-3" />{p.tuition}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${expandedProgram === `${idx + 3}` ? "rotate-90" : ""}`} />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3: ADMISSIONS                      */}
      {/* ═══════════════════════════════════════════ */}
      <section id="admissions" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={FileText} title="Admissions" subtitle="Requirements, documents, deadlines & application tips" />

        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              { label: "Minimum Marks", value: (() => { const at = ACADEMIC_THRESHOLD[uni.country]; return at ? `${at.minimum}% (${at.competitive}% for competitive)` : uni.admissionReq?.gpa; })(), icon: Target },
              { label: "GRE", value: uni.admissionReq?.gre || "Not required", icon: FileText },
              { label: "GMAT", value: uni.admissionReq?.gmat || "Not required", icon: FileText },
              { label: "IELTS", value: uni.admissionReq?.ielts, icon: BookOpen },
              { label: "TOEFL", value: uni.admissionReq?.toefl, icon: BookOpen },
              { label: "Work Experience", value: uni.admissionReq?.workExp || "Not required", icon: Briefcase },
              { label: "LORs", value: uni.admissionReq?.lor, icon: Users },
              { label: "SOP", value: uni.admissionReq?.sop, icon: FileText },
              { label: "Resume/CV", value: uni.admissionReq?.resume, icon: FileText },
              { label: "Interview", value: uni.admissionReq?.interview, icon: Phone },
              { label: "Application Fee", value: uni.admissionReq?.applicationFee, icon: DollarSign },
              ...(uni.admissionReq?.sat ? [{ label: "SAT", value: uni.admissionReq?.sat, icon: FileText }] : []),
              ...(uni.admissionReq?.pte ? [{ label: "PTE", value: uni.admissionReq?.pte, icon: FileText }] : []),
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/40">
                <req.icon className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">{req.label}</p><p className="text-sm font-semibold text-white">{req.value}</p></div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#0d9488]" /> Required Documents</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {uni.admissionReq?.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" /><span className="text-sm text-slate-300">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#0d9488]" /> Application Deadlines</h3>
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2 pr-4">Intake</th><th className="text-left py-2 pr-4">Deadline</th><th className="text-left py-2">Decision By</th></tr></thead>
                <tbody>{uni.deadlines.map((d, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0"><td className="py-3 pr-4 text-white font-medium">{d.intake}</td><td className="py-3 pr-4 text-amber-400">{d.deadline}</td><td className="py-3 text-slate-300">{d.decisionDate}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <LeadBanner icon={Send} title={`Need help with your application to ${uni.name}?`} desc="Get SOP review, LOR guidance, and document checklist"
          cta={<><Send className="w-4 h-4 mr-2" /> Get Free Application Help</>}
          onClick={() => openLead("Application Assistance", uni.name)}
          color="from-[#0d9488]/10 to-blue-500/10" borderColor="border-[#0d9488]/20" />
        </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: SCHOLARSHIPS                    */}
      {/* ═══════════════════════════════════════════ */}
      <section id="scholarships" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={Award} title="Scholarships" subtitle="Merit-based and need-based funding opportunities for Indian students" />

        <div className="space-y-3 mb-8">
          {uni.scholarships.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 hover:border-amber-500/30 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div><h3 className="text-sm font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">{s.amount}</p></div>
                  <Badge className={`text-[9px] shrink-0 ${s.type === "Merit" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : s.type === "Need" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-purple-500/20 text-purple-400 border-purple-500/30"}`}>{s.type}</Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400">
                  <p><span className="text-slate-500">Eligibility:</span> {s.eligibility}</p>
                  <p><span className="text-slate-500">Deadline:</span> {s.deadline}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <LeadBanner icon={Award} title="Not sure which scholarship you qualify for?" desc="Our counselors will match you with the best scholarships"
          cta={<><Sparkles className="w-4 h-4 mr-2" /> Find My Scholarships</>}
          onClick={() => openLead("Scholarship Matching", uni.name)}
          color="from-amber-500/10 to-orange-500/10" borderColor="border-amber-500/20" />
        </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: CAREER OUTCOMES                 */}
      {/* ═══════════════════════════════════════════ */}
      <section id="career" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={TrendingUp} title="Career Outcomes" subtitle={`Salary data, top employers & notable alumni from ${uni.name}`} />

        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <InfoCard icon={DollarSign} label="Average Salary" value={uni.careerOutcomes?.avgSalary} color="text-emerald-400" bg="bg-emerald-500/10" />
            <InfoCard icon={Percent} label="Placement Rate" value={uni.careerOutcomes?.placementRate} color="text-blue-400" bg="bg-blue-500/10" />
            <InfoCard icon={Briefcase} label="Work Visa" value={uni.careerOutcomes?.workVisaDuration} color="text-purple-400" bg="bg-purple-500/10" />
            <InfoCard icon={Target} label="PR Pathway" value={uni.careerOutcomes?.prPathway} color="text-amber-400" bg="bg-amber-500/10" />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-[#0d9488]" /> Top Employers</h3>
            <div className="flex flex-wrap gap-2">
              {uni.careerOutcomes?.topEmployers.map((emp, i) => <Badge key={i} className="bg-slate-700 text-slate-300 border-slate-600 text-xs px-3 py-1">{emp}</Badge>)}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Briefcase className="w-5 h-5 text-[#0d9488]" /> Internships</h3>
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4">
              <p className="text-sm text-slate-300">{uni.careerOutcomes?.internships}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><AwardIcon className="w-5 h-5 text-amber-400" /> Notable Alumni</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {uni.notableAlumni.map((al, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 text-center hover:border-amber-500/30 transition-all">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3"><Star className="w-6 h-6 text-amber-400" /></div>
                  <p className="text-sm font-bold text-white">{al.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{al.achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <LeadBanner icon={TrendingUp} title={`Want to know your salary potential after ${uni.name}?`} desc="Get personalized career roadmap and salary insights"
          cta={<><TrendingUp className="w-4 h-4 mr-2" /> Get Career Roadmap</>}
          onClick={() => openLead("Career Roadmap", uni.name)}
          color="from-emerald-500/10 to-[#0d9488]/10" borderColor="border-emerald-500/20" />
        </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: PLACEMENTS                      */}
      {/* ═══════════════════════════════════════════ */}
      <section id="placements" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={BarChart3} title="Placements" subtitle={`${uni.placementData?.overallPlacementRate} students placed &middot; ${uni.placementData?.totalCompanies} companies visited`} />

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <InfoCard icon={Percent} label="Placement Rate" value={uni.placementData?.overallPlacementRate} color="text-emerald-400" bg="bg-emerald-500/10" />
            <InfoCard icon={DollarSign} label="Average Salary" value={uni.placementData?.avgSalary} color="text-[#0d9488]" bg="bg-[#0d9488]/10" />
            <InfoCard icon={TrendingUp} label="Highest Salary" value={uni.placementData?.highestSalary} color="text-amber-400" bg="bg-amber-500/10" />
            <InfoCard icon={Building2} label="Companies" value={uni.placementData?.totalCompanies} color="text-purple-400" bg="bg-purple-500/10" />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-[#0d9488]" /> Where Graduates Work</h3>
            <p className="text-xs text-slate-400 mb-4">Hiring companies and roles vary significantly by course. Select your course below to see course-specific career outcomes.</p>
            <div className="space-y-3">
              {uni.placementData?.courseWise.slice(0, 4).map((c, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{c.course}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-emerald-400 font-bold">{c.placementRate} placed</span>
                      <span className="text-[10px] text-[#0d9488] font-bold">{c.avgSalary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.topRoles.map((r, ri) => (
                      <span key={ri} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/30">{r}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-[#0d9488]" /> Course-wise Placement Stats</h3>
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2 pr-4">Course</th><th className="text-left py-2 pr-4">Placement</th><th className="text-left py-2 pr-4">Avg Salary</th><th className="text-left py-2">Top Roles</th></tr></thead>
                <tbody>{uni.placementData?.courseWise.map((c, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0">
                    <td className="py-3 pr-4 text-white font-medium text-xs">{c.course}</td>
                    <td className="py-3 pr-4"><Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">{c.placementRate}</Badge></td>
                    <td className="py-3 pr-4 text-[#0d9488] font-bold text-xs">{c.avgSalary}</td>
                    <td className="py-3"><div className="flex flex-wrap gap-1">{c.topRoles.map((r, ri) => <span key={ri} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{r}</span>)}</div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* ─── Data Sources ─── */}
        {uni.placementData?.dataSources && uni.placementData?.dataSources.length > 0 && (
          <FadeIn delay={0.25}>
            <div className="mt-8 p-5 bg-slate-800/30 border border-slate-700/40 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Database className="w-4 h-4 text-blue-400" /></div>
                <div>
                  <h4 className="text-sm font-bold text-white">Data Sources</h4>
                  <p className="text-[10px] text-slate-400">Placement and salary data compiled from verified sources</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {uni.placementData?.dataSources.map((src, i) => (
                  <Badge key={i} className="bg-slate-700/50 text-slate-300 border-slate-600 text-[10px] px-3 py-1.5 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-colors cursor-default">
                    {src}
                  </Badge>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-3">Figures are indicative and based on graduating class surveys. Actual salaries vary by role, location, and individual profile. Data updated {uni.placementData?.year}.</p>
            </div>
          </FadeIn>
        )}

        <LeadBanner icon={TrendingUp} title={`Want these placement stats in your inbox?`} desc="Get detailed salary report + recruiter contacts"
          cta={<><TrendingUp className="w-4 h-4 mr-2" /> Get Placement Report</>}
          onClick={() => openLead(`Placement Report - ${uni.name}`, uni.name)}
          color="from-emerald-500/10 to-[#0d9488]/10" borderColor="border-emerald-500/20" />
        </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: CAMPUS LIFE (includes Videos)   */}
      {/* ═══════════════════════════════════════════ */}
      <section id="campus" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24 border-t border-slate-800/50">
        <SectionDivider icon={Landmark} title="Campus Life" subtitle={`A day in the life, student vibes, clubs, videos & what makes ${uni.name} special`} />

        {/* ─── Photo Gallery Strip ─── */}
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <ImageGalleryCard src={uni.campusImage} title="Main Campus" subtitle={uni.city} />
            <ImageGalleryCard src={uni.heroImage} title="Student Life" subtitle={uni.campusLife?.festivals?.[0] || "Student Events"} />
            <ImageGalleryCard src={uni.campusImage} title="Indian Community" subtitle={uni.campusLife.indianAssoc} />
            <ImageGalleryCard src={uni.heroImage} title="City Life" subtitle={uni.city} />
          </div>
        </FadeIn>

        {/* ─── Videos (merged from Videos section) ─── */}
        {uni.videos?.length > 0 && (
          <FadeIn delay={0.07}>
            <div className="mb-10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-[#0d9488]" /> Videos</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {uni.videos?.map((v, i) => (
                  <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl overflow-hidden group hover:border-[#0d9488]/30 transition-all">
                    <div className="relative aspect-video bg-slate-900 cursor-pointer" onClick={() => window.open(v.embedUrl, '_blank')}>
                      <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#0d9488]/80 flex items-center justify-center group-hover:bg-[#0d9488] group-hover:scale-110 transition-all">
                          <Play className="w-7 h-7 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white font-mono">{v.duration}</div>
                      <Badge className="absolute top-2 left-2 bg-slate-900/80 text-slate-200 border-slate-700 text-[9px]">{v.category}</Badge>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-white group-hover:text-[#0d9488] transition-colors">{v.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* ─── Day in the Life Timeline ─── */}
        <FadeIn delay={0.1}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2"><Clock className="w-5 h-5 text-[#0d9488]" /> A Day in the Life</h3>
            <div className="relative pl-8 border-l-2 border-slate-700/50 space-y-5">
              {(uni.campusLife?.dayInLife ?? []).map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
                  <div className="absolute -left-[39px] w-8 h-8 rounded-full bg-[#0d9488]/20 border-2 border-[#0d9488] flex items-center justify-center">
                    <span className="text-sm">{item.emoji}</span>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
                    <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider">{item.time}</span>
                    <p className="text-sm text-slate-300 mt-1">{item.activity}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ─── Vibe Check: Academic + Social ─── */}
        <FadeIn delay={0.15}>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-gradient-to-br from-[#0d9488]/10 to-blue-500/5 border border-[#0d9488]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-xl bg-[#0d9488]/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-[#0d9488]" /></div><h3 className="text-base font-bold text-white">Academic Vibe</h3></div>
              <p className="text-sm text-slate-300 leading-relaxed">{uni.campusLife.academicVibe}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-slate-700/50 text-slate-300 text-[10px]"><Users className="w-2.5 h-2.5 mr-1" />{uni.campusLife.genderRatio}</Badge>
                <Badge className="bg-slate-700/50 text-slate-300 text-[10px]"><Globe className="w-2.5 h-2.5 mr-1" />{uni.campusLife.intlStudentPercent} international</Badge>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Heart className="w-5 h-5 text-purple-400" /></div><h3 className="text-base font-bold text-white">Social Vibe</h3></div>
              <p className="text-sm text-slate-300 leading-relaxed">{uni.campusLife.socialVibe}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-slate-700/50 text-slate-300 text-[10px]">{uni.indianStudents} Indians</Badge>
                <Badge className="bg-slate-700/50 text-slate-300 text-[10px]">{uni.totalStudents} total students</Badge>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Student Quotes ─── */}
        <FadeIn delay={0.2}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-amber-400" /> What Students Say</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {(uni.campusLife?.studentQuotes ?? []).map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 relative">
                  <span className="absolute top-2 right-3 text-2xl text-slate-600 font-serif">&ldquo;</span>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3 italic">{q.quote}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0d9488]/20 flex items-center justify-center"><User className="w-3.5 h-3.5 text-[#0d9488]" /></div>
                    <p className="text-xs font-semibold text-white">{q.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ─── Clubs & Activities ─── */}
        <FadeIn delay={0.25}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#0d9488]" /> Clubs & Activities</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {(uni.campusLife?.clubs ?? []).map((club, i) => (
                <Badge key={i} className={`text-[10px] px-3 py-1.5 ${
                  club.category === "Cultural" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                  club.category === "Tech" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                  club.category === "Sports" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  club.category === "Professional" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                  club.category === "Engineering" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                  club.category === "Entrepreneurship" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-slate-700 text-slate-300 border-slate-600"
                }`}>{club.name}</Badge>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2"><Dumbbell className="w-4 h-4 text-green-400" /><p className="text-[10px] text-slate-500 uppercase tracking-wider">Sports</p></div>
                <div className="flex flex-wrap gap-1">{(uni.campusLife?.sports ?? []).map((s, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{s}</span>)}</div>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2"><Music className="w-4 h-4 text-purple-400" /><p className="text-[10px] text-slate-500 uppercase tracking-wider">Nightlife</p></div>
                <p className="text-xs text-slate-300">{uni.campusLife.nightlife}</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2"><Palmtree className="w-4 h-4 text-amber-400" /><p className="text-[10px] text-slate-500 uppercase tracking-wider">Weekend Hangouts</p></div>
                <div className="flex flex-wrap gap-1">{(uni.campusLife?.weekendSpots ?? []).map((w, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{w}</span>)}</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Campus Facilities ─── */}
        <FadeIn delay={0.3}>
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#0d9488]" /> Campus Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(uni.campusLife?.campusFacilities ?? []).map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-[#0d9488]/30 transition-all">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0d9488] shrink-0" /><span className="text-xs text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ─── Indian Community ─── */}
        <FadeIn delay={0.35}>
          <div className="mb-10">
            <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/15 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-orange-400" /> Indian Community</h3>
              <p className="text-sm text-slate-300 mb-3">{uni.campusLife.indianAssoc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(uni.campusLife?.festivals ?? []).map((f, i) => <span key={i} className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">{f}</span>)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(uni.campusLife?.indianClubs ?? []).map((c, i) => <Badge key={i} className="text-[10px] bg-slate-700/50 text-slate-300 border-slate-600">{c}</Badge>)}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Campus Amenities Grid ─── */}
        <FadeIn delay={0.4}>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { icon: Home, label: "Accommodation", value: uni.campusLife.accommodation, color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Wallet, label: "Avg Rent", value: uni.campusLife.avgRent, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Utensils, label: "Indian Food", value: uni.campusLife.indianFood, color: "text-orange-400", bg: "bg-orange-500/10" },
              { icon: Thermometer, label: "Weather", value: uni.campusLife.weather, color: "text-red-400", bg: "bg-red-500/10" },
              { icon: Bus, label: "Transport", value: uni.campusLife.transport, color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: Shield, label: "Safety", value: uni.campusLife.safety, color: "text-green-400", bg: "bg-green-500/10" },
              { icon: Heart, label: "Healthcare", value: uni.campusLife.healthcare, color: "text-pink-400", bg: "bg-pink-500/10" },
              { icon: Coffee, label: "Food Options", value: uni.campusLife.foodOptions, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-700/40 hover:border-slate-600 transition-all">
                <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}><item.icon className={`w-4 h-4 ${item.color}`} /></div>
                <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p><p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.value}</p></div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ─── Nearby Attractions ─── */}
        <FadeIn delay={0.45}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MapPinned className="w-5 h-5 text-[#0d9488]" /> Nearby Attractions</h3>
            <div className="flex flex-wrap gap-2">
              {(uni.campusLife?.nearbyAttractions ?? []).map((a, i) => <Badge key={i} className="bg-slate-700 text-slate-300 border-slate-600 text-xs px-3 py-1">{a}</Badge>)}
            </div>
          </div>
        </FadeIn>

        <LeadBanner icon={Camera} title={`Want a virtual campus tour of ${uni.name}?`} desc="Get photos, videos, and live Q&A with current students"
          cta={<><Camera className="w-4 h-4 mr-2" /> Request Virtual Tour</>}
          onClick={() => openLead("Virtual Campus Tour", uni.name)}
          color="from-purple-500/10 to-pink-500/10" borderColor="border-purple-500/20" />
      </section>

      <Footer />

      {/* ─── Modals & Overlays ─── */}
      <LeadCaptureModal open={leadModal.open} onClose={() => setLeadModal({ ...leadModal, open: false })} title={leadModal.title} context={leadModal.context} />
      <StickyCTA onClick={() => openLead("Get Admission Details", uni.name)} label={`Apply to ${uni.name}`} />
      <div className="h-20" />
    </div>
  );
}
