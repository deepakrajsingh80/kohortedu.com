import { useState, useMemo } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ALL_EXAMS,
  EXAMS_BY_CATEGORY,
  CATEGORY_INFO,
  DESTINATION_EXAMS,
  EXAM_STATS,
  type Exam,
  type ExamCategory,
} from "@/data/exams";
import {
  Languages, School, Cpu, BriefcaseBusiness, Stethoscope,
  Scale, MapPin, Shield, Search, ChevronDown, ChevronUp,
  Clock, DollarSign, Calendar, Target, BookOpen, Globe,
  Award, AlertTriangle, CheckCircle2, ExternalLink, FileText,
  GraduationCap, TrendingUp, Users, ArrowRight, Filter,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Languages, School, Cpu, BriefcaseBusiness, Stethoscope,
  Scale, MapPin, Shield,
};

const CATEGORY_ORDER: ExamCategory[] = [
  "English Proficiency",
  "UG Entrance",
  "PG Entrance - STEM",
  "PG Entrance - Business",
  "Medical",
  "Law",
  "Germany Specific",
  "India Mandatory",
];

// ─── Exam Detail Card ───
function ExamCard({ exam, index }: { exam: Exam; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const info = CATEGORY_INFO[exam.category];
  const Icon = CATEGORY_ICONS[info.icon] || BookOpen;

  return (
    <div
      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${info.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: info.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-900 text-sm">{exam.name}</h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
              {exam.level}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{exam.fullName}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {exam.duration}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {exam.cost}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {exam.frequency}
            </span>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Target className="w-3 h-3" /> Scoring: {exam.scoring.split(".")[0]}
            </span>
          </div>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          {/* Purpose */}
          <p className="text-xs text-slate-600 leading-relaxed">{exam.purpose}</p>

          {/* Min / Avg Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exam.minScore && (
              <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">Minimum Score</p>
                <p className="text-xs text-amber-900">{exam.minScore}</p>
              </div>
            )}
            {exam.avgScore && (
              <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">Average for Admits</p>
                <p className="text-xs text-emerald-900">{exam.avgScore}</p>
              </div>
            )}
          </div>

          {/* Destinations */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Accepted In</p>
            <div className="flex flex-wrap gap-1.5">
              {exam.destinations.map((d) => (
                <span key={d} className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-slate-600 border border-gray-200">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Test Sections</p>
            <div className="space-y-1.5">
              {exam.sections.map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-slate-800">{s.name}</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] text-slate-500">{s.duration}</span>
                      <span className="text-[10px] text-slate-500">{s.questions} Qs</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation + When to Take */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Preparation
              </p>
              <p className="text-xs text-blue-900">{exam.preparation}</p>
            </div>
            <div className="bg-violet-50 rounded-lg p-2.5 border border-violet-100">
              <p className="text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> When to Take
              </p>
              <p className="text-xs text-violet-900">{exam.whenToTake}</p>
            </div>
          </div>

          {/* Important Notes */}
          {exam.importantNotes && (
            <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">{exam.importantNotes}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-2 pt-1 flex-wrap">
            <Link
              to={`/exams/${exam.id}`}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-[#0d9488] hover:bg-[#0f766e] px-3 py-1.5 rounded-lg transition-colors"
            >
              <BookOpen className="w-3 h-3" /> Full Exam Guide
            </Link>
            <a
              href={exam.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0d9488] hover:text-[#0f766e] bg-[#0d9488]/5 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> Official
            </a>
            <a
              href={exam.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-slate-800 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <FileText className="w-3 h-3" /> Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Destination Quick Reference Card ───
function DestRefCard({ dest, data }: { dest: string; data: { required: string[]; recommended: string[] } }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-[#0d9488]" />
        <h4 className="font-bold text-slate-900 text-sm">{dest}</h4>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Required</p>
          {data.required.map((r, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-700">{r}</span>
            </div>
          ))}
        </div>
        {data.recommended.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended</p>
            {data.recommended.map((r, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <Award className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-600">{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───
export default function ExamHub() {
  const [activeCategory, setActiveCategory] = useState<ExamCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = useMemo(() => {
    let exams = ALL_EXAMS;
    if (activeCategory !== "All") {
      exams = EXAMS_BY_CATEGORY[activeCategory] || [];
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      exams = exams.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.fullName.toLowerCase().includes(q) ||
          e.destinations.some((d) => d.toLowerCase().includes(q))
      );
    }
    return exams;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#f0fdfa]">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/5 via-transparent to-[#f59e0b]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d9488]/10 text-[#0d9488] text-xs font-semibold tracking-wider uppercase">
              <GraduationCap className="w-3.5 h-3.5" /> Complete Guide
            </span>
            <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">2024-2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Study Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#0f766e]">Exam Hub</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
            Every examination you need for studying abroad — English proficiency, entrance tests,
            subject-specific exams, and mandatory Indian qualifications. Verified from official sources.
          </p>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: FileText, label: "Exams Covered", value: EXAM_STATS.totalExams.toString() },
              { icon: Filter, label: "Categories", value: EXAM_STATS.categories.toString() },
              { icon: Globe, label: "Destinations", value: "14+" },
              { icon: Users, label: "Indian Students/yr", value: "750K+" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0d9488]/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-[#0d9488]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{s.value}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Timeline Guide ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#f59e0b] font-bold">Recommended Timeline for Indian Students</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { step: "1", title: "11th Grade Start", desc: "Begin SAT/ACT prep. Start IELTS/TOEFL foundation. Build English vocabulary." },
                  { step: "2", title: "12th Grade / Gap Year", desc: "Take IELTS/TOEFL (target 7.0+/100+). Take SAT/ACT. Take NEET if medical." },
                  { step: "3", title: "Final Year UG", desc: "Take GRE (target Q168+)/GMAT (target 700+). Re-take English if needed." },
                  { step: "4", title: "Application Season", desc: "Send scores via official portals. Match scores to uni requirements. Apply early!" },
                ].map((t) => (
                  <div key={t.step} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#0d9488]/20 border border-[#0d9488]/40 text-[#0d9488] text-[10px] font-bold flex items-center justify-center font-mono">{t.step}</span>
                      <h4 className="text-sm font-bold text-white">{t.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search + Filter ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams by name, destination, or purpose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] bg-white"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === "All"
                  ? "bg-[#0d9488] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0d9488] hover:text-[#0d9488]"
              }`}
            >
              All Exams ({ALL_EXAMS.length})
            </button>
            {CATEGORY_ORDER.map((cat) => {
              const info = CATEGORY_INFO[cat];
              const count = EXAMS_BY_CATEGORY[cat]?.length || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? "text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  }`}
                  style={
                    activeCategory === cat
                      ? { backgroundColor: info.color }
                      : {}
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeCategory === cat ? "white" : info.color }}
                  />
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Exam Cards ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeCategory === "All" ? (
            // Show all categories grouped
            CATEGORY_ORDER.map((cat) => {
              const exams = EXAMS_BY_CATEGORY[cat];
              if (!exams || exams.length === 0) return null;
              const info = CATEGORY_INFO[cat];
              const Icon = CATEGORY_ICONS[info.icon] || BookOpen;
              return (
                <div key={cat} className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: info.color }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{cat}</h2>
                      <p className="text-xs text-slate-500">{info.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {exams.map((exam, idx) => (
                      <ExamCard key={exam.id} exam={exam} index={idx} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Show single category
            <div className="space-y-2">
              {filteredExams.map((exam, idx) => (
                <ExamCard key={exam.id} exam={exam} index={idx} />
              ))}
              {filteredExams.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No exams found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Destination Quick Reference ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-[#0d9488]" />
            <h2 className="text-2xl font-bold text-slate-900">Exams by Destination</h2>
          </div>
          <p className="text-sm text-slate-600 mb-5 max-w-2xl">
            Quick reference: which exams you need for each country. Always check your specific
            university and program requirements as they can vary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(DESTINATION_EXAMS).map(([dest, data]) => (
              <DestRefCard key={dest} dest={dest} data={data} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Key Insights ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Critical Insights for Indian Students</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: "IELTS is King for UK/AU", desc: "For UK and Australia, IELTS Academic is preferred. UKVI version mandatory for UK student visa." },
                { title: "TOEFL for USA", desc: "TOEFL iBT is the standard for US universities. Home Edition widely accepted now." },
                { title: "GRE Not Always Required", desc: "Many top programs (MIT EECS, some Stanford) don't require GRE anymore. Check each program!" },
                { title: "NEET is Mandatory for MBBS Abroad", desc: "No exceptions. Must qualify NEET to get NMC eligibility certificate for foreign MBBS." },
                { title: "GMAT Focus Edition (2024+)", desc: "New format: shorter, no essay, added Data Insights. Old GMAT scores still accepted." },
                { title: "German = Free + Low Tuition", desc: "Learn German to B2/C1 for free tuition. TestDaF 4×4 needed for German-taught programs." },
                { title: "Start Early", desc: "Begin SAT/ACT prep in 11th grade. Take GRE/GMAT in pre-final year of UG." },
                { title: "ScoreSelect / Superscoring", desc: "GRE ScoreSelect and SAT superscoring let you send only your best attempts." },
                { title: "PTE = Fastest Results", desc: "PTE Academic gives results in 48 hours. Good backup if you're running against deadlines." },
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                  <p className="text-xs font-bold text-slate-800 mb-1">{tip.title}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ─── CTA ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Not Sure Which Exams You Need?
              </h2>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-5">
                Use our AI Decision Engine to find your best study abroad destination, then
                come back here to see exactly which exams to prepare for.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/evaluate"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0d9488] rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <TrendingUp className="w-4 h-4" /> Match My Profile <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/smart-match"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Users className="w-4 h-4" /> Smart Match
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
