import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search, GraduationCap, MapPin, X, ChevronDown, ChevronUp,
  BookOpen, Microscope, Award, Filter, Globe, FlaskConical,
  Building2, Laptop, Stethoscope, Scale, Palette, Plane,
  Leaf, GraduationCap as EduCap, Brain, HeartPulse, DollarSign,
  BarChart3, Rocket, ShieldCheck, AlertTriangle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProfile } from "@/context/ProfileContext";
import { COURSE_CATEGORIES, LEVELS, searchCourses, getVerifiedCourses, getCourseStats, VerifiedCourse } from "@/data/courseDatabase";

/* ─── PR Score data (synced with Evaluate.tsx) ─── */
const PR_SCORE: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, "New Zealand": 7,
  Netherlands: 7, Sweden: 7, UK: 6, France: 6, Malaysia: 5,
  "South Korea": 5, Poland: 5, Italy: 4, UAE: 1, Singapore: 3,
  USA: 4, Russia: 4, Georgia: 4, Philippines: 1,
  Switzerland: 5, Spain: 5, "Czech Republic": 6,
};

function getPRChance(topCountries: string[]): { label: string; color: string; bg: string; border: string; score: number } {
  const scores = topCountries.map(c => PR_SCORE[c] || 5).filter(s => s > 0);
  if (scores.length === 0) return { label: "MODERATE", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", score: 5 };
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg >= 7) return { label: "HIGH", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", score: Math.round(avg) };
  if (avg >= 4.5) return { label: "MODERATE", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", score: Math.round(avg) };
  return { label: "LOW", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", score: Math.round(avg) };
}

/* ─── Category icon map ─── */
const catIcons: Record<string, React.ElementType> = {
  "Engineering & Technology": FlaskConical,
  "Computer Science & IT": Laptop,
  "Business & Management": Building2,
  "Medicine & Healthcare": Stethoscope,
  "Science & Research": FlaskConical,
  "Arts & Humanities": BookOpen,
  "Law": Scale,
  "Finance & Accounting": DollarSign,
  "Data Science & Analytics": BarChart3,
  "Design & Media": Palette,
  "Hospitality & Tourism": Plane,
  "Education": EduCap,
  "Environmental Science": Leaf,
  "Social Sciences": Brain,
  "Nursing & Health Sciences": HeartPulse,
  "PR Pathway Programs": MapPin,
};

/* ─── Level colors ─── */
const levelMeta: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  UG:        { color: "text-blue-700",     bg: "bg-blue-50",     border: "border-blue-200", icon: BookOpen },
  PG:        { color: "text-teal-700",     bg: "bg-teal-50",     border: "border-teal-200", icon: GraduationCap },
  Diploma:   { color: "text-orange-700",   bg: "bg-orange-50",   border: "border-orange-200", icon: Award },
  PhD:       { color: "text-purple-700",   bg: "bg-purple-50",   border: "border-purple-200", icon: Microscope },
};

/* ─── Profile match badge ─── */
function ProfileMatchBadge({ course, profile }: { course: VerifiedCourse; profile: any }) {
  if (!profile.hasSetProfile) return null;
  const levelMatch = course.level === profile.level;
  const majorMatch = course.fieldTags.some(t =>
    t.toLowerCase().includes(profile.major.toLowerCase()) ||
    (profile.major === "STEM" && ["Computer Science", "Engineering", "Data Science", "AI", "ML"].some(m => t.includes(m))) ||
    (profile.major === "Mgmt" && ["Business", "Management", "MBA", "Marketing"].some(m => t.includes(m))) ||
    (profile.major === "Medicine" && ["Medical", "Healthcare", "Nursing", "Pharma", "Biotech"].some(m => t.includes(m)))
  );
  if (!levelMatch && !majorMatch) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
      <ShieldCheck className="w-2.5 h-2.5" />
      {levelMatch && majorMatch ? "Profile Match" : levelMatch ? "Level Match" : "Field Match"}
    </span>
  );
}

/* ─── Expanded details: full university list ─── */
function ExpandedCourseDetails({ course }: { course: VerifiedCourse }) {
  const unis = course.actualUniversities;
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
      <div>
        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-teal-500" />
          All Universities Offering This Course
          <span className="text-[9px] font-normal normal-case text-slate-400">({unis.length})</span>
        </h4>
        <div className="space-y-2">
          {course.actualCountries.map(c => {
            const countryUnis = unis.filter(u => u.country === c);
            if (countryUnis.length === 0) return null;
            return (
              <div key={c} className="bg-slate-50 rounded-lg p-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3 h-3 text-teal-500" />
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">{c}</span>
                  <span className="text-[9px] text-slate-400">({countryUnis.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {countryUnis.map(u => (
                    <Link
                      key={u.slug}
                      to={`/universities/${u.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors font-medium"
                    >
                      {u.name.length > 30 ? u.name.slice(0, 30) + "..." : u.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const stats = getCourseStats();
const statsDisplay = [
  { icon: BookOpen, value: String(stats.total), label: "Verified Courses" },
  { icon: Globe, value: String(stats.countries), label: "Countries" },
  { icon: GraduationCap, value: "258", label: "Universities" },
];

export default function CoursesList() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const results = useMemo(() => {
    return searchCourses(search, {
      level: activeLevel,
      category: activeCategory,
    });
  }, [search, activeLevel, activeCategory]);

  const hasActiveFilters = activeLevel !== "All" || activeCategory !== "All";
  const { profile, profileSummary } = useProfile();

  const verifiedCourses = useMemo(() => getVerifiedCourses(), []);

  const profileMatches = useMemo(() => {
    if (!profile.hasSetProfile) return 0;
    return verifiedCourses.filter(c =>
      c.level === profile.level ||
      c.fieldTags.some(t => t.toLowerCase().includes(profile.major.toLowerCase()))
    ).length;
  }, [profile, verifiedCourses]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* ═════════════ HERO ═════════════ */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-32 lg:pb-14">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-teal-400 mb-4 border border-teal-500/30 rounded-full px-4 py-1.5 bg-teal-500/10">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Against Real University Catalogs
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Find Your <span className="text-teal-400">Course Abroad</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 mb-6 leading-relaxed">
                Every course below is verified against actual university program catalogs. Click on any university to see official program details.
              </p>

              {/* Honesty Banner */}
              <div className="max-w-2xl mx-auto mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-left">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300 leading-relaxed">
                  <strong>Fees, eligibility, and program details vary by university.</strong> The universities listed below offer this course — visit their official website for accurate fees, entry requirements, and application deadlines.
                </p>
              </div>

              <div className="max-w-2xl mx-auto relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses, fields, or countries..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white/15 transition-all text-sm sm:text-base"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Computer Science", "MBA", "Data Science", "Medicine", "Engineering"].map(chip => (
                  <button
                    key={chip}
                    onClick={() => setSearch(chip)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-slate-300 hover:bg-teal-500/20 hover:text-teal-300 border border-white/10 hover:border-teal-500/30 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════ STATS BAR ═════════════ */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-3 gap-4">
              {statsDisplay.map(s => (
                <div key={s.label} className="flex items-center gap-3 justify-center">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                    <s.icon className="w-4.5 h-4.5 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{s.value}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════ PROFILE BANNER ═════════════ */}
        {profile.hasSetProfile && (
          <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-teal-200" />
                <span className="text-xs sm:text-sm font-medium">
                  Your Profile: <span className="font-bold">{profileSummary}</span>
                  {profileMatches > 0 && (
                    <span className="ml-2 text-teal-200">({profileMatches} matching courses)</span>
                  )}
                </span>
              </div>
              <Link to="/evaluate" className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                Update →
              </Link>
            </div>
          </section>
        )}

        {/* ═════════════ LEVEL FILTERS ═════════════ */}
        <section className="bg-white border-b border-slate-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center gap-2">
              {LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeLevel === level
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {level === "All" ? "All Levels" : level === "UG" ? "Undergraduate" : level === "PG" ? "Postgraduate" : level === "PhD" ? "PhD / Doctorate" : "Diploma & Certificate"}
                </button>
              ))}
              <div className="w-px h-6 bg-slate-200 mx-1" />
              {hasActiveFilters && (
                <button
                  onClick={() => { setActiveLevel("All"); setActiveCategory("All"); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ═════════════ FIELD FILTERS (ALWAYS OPEN) ═════════════ */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider font-bold">Filter by Field</p>
              {activeCategory !== "All" && (
                <span className="text-[10px] px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium">
                  {activeCategory}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === "All"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Globe className="w-3 h-3" /> All Fields
              </button>
              {COURSE_CATEGORIES.filter(c => c !== "All").map(cat => {
                const CatIcon = catIcons[cat] || BookOpen;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <CatIcon className="w-3 h-3" /> {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═════════════ RESULTS COUNT ═════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">{results.length}</span> verified course{results.length !== 1 ? "s" : ""}
              {search && <> matching <span className="font-bold text-teal-700">"{search}"</span></>}
            </p>
            {activeLevel !== "All" && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-medium border border-teal-200">
                {activeLevel === "UG" ? "Undergraduate" : activeLevel === "PG" ? "Postgraduate" : activeLevel === "PhD" ? "PhD / Doctorate" : "Diploma"}
              </span>
            )}
          </div>
        </section>

        {/* ═════════════ COURSE CARDS — HONEST VERSION ═════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No courses found</h3>
              <p className="text-slate-500 mb-4">Try a different search term or filter</p>
              <button onClick={() => { setSearch(""); setActiveLevel("All"); setActiveCategory("All"); }} className="text-teal-600 font-semibold text-sm hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map(course => {
                const lMeta = levelMeta[course.level] || levelMeta.PG;
                const LevelIcon = lMeta.icon;
                const isExpanded = expandedCourse === course.name;
                const CatIcon = catIcons[course.category] || BookOpen;
                const unis = course.actualUniversities;
                const prChance = getPRChance(course.actualCountries);
                const topCountriesWithUnis = course.actualCountries.slice(0, 4).map(c => {
                  const countryUnis = unis.filter(u => u.country === c);
                  return { country: c, unis: countryUnis.slice(0, 3) };
                }).filter(c => c.unis.length > 0);

                return (
                  <div
                    key={course.name}
                    className={`bg-white rounded-2xl border-2 ${lMeta.border} shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col`}
                  >
                    {/* Header */}
                    <div className={`${lMeta.bg} px-4 py-3 border-b ${lMeta.border}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg ${lMeta.bg} border ${lMeta.border} flex items-center justify-center`}>
                            <LevelIcon className={`w-3.5 h-3.5 ${lMeta.color}`} />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${lMeta.color}`}>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <ProfileMatchBadge course={course} profile={profile} />
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="w-2.5 h-2.5" /> Verified
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{course.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <CatIcon className="w-3 h-3 text-slate-400" />
                        <span className="text-[11px] text-slate-500">{course.category}</span>
                      </div>
                    </div>

                    {/* Body — ONLY verified data */}
                    <div className="px-4 py-3 flex-1">
                      {/* PR Chance */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${prChance.bg} ${prChance.color} border ${prChance.border}`}>
                          PR Chance: {prChance.label} ({prChance.score}/10)
                        </span>
                      </div>

                      {/* Universities by Destination — THE ONLY REAL DATA */}
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin className="w-3 h-3 text-teal-600" />
                          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Offered At</span>
                        </div>
                        <div className="space-y-2">
                          {topCountriesWithUnis.map(({ country, unis: cu }) => (
                            <div key={country} className="bg-slate-50 rounded-lg p-2">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">{country}</span>
                                <span className="text-[9px] text-slate-400">({cu.length})</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {cu.map(u => (
                                  <Link
                                    key={u.slug}
                                    to={`/universities/${u.slug}`}
                                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors font-medium"
                                  >
                                    {u.name.length > 28 ? u.name.slice(0, 28) + "..." : u.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Honest Disclaimer */}
                      <div className="mb-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-amber-700 leading-relaxed">
                            <strong>Fees, eligibility & intakes vary by university.</strong> Click on a university above to visit their official program page for accurate details.
                          </p>
                        </div>
                      </div>

                      {/* Expand — full university list */}
                      {course.actualCountries.length > 4 && (
                        <button
                          onClick={() => setExpandedCourse(isExpanded ? null : course.name)}
                          className="w-full flex items-center justify-center gap-1 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
                        >
                          {isExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Show Less</> : <><ChevronDown className="w-3.5 h-3.5" /> See All {course.actualCountries.length} Countries</>}
                        </button>
                      )}

                      {isExpanded && <ExpandedCourseDetails course={course} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ═════════════ CTA ═════════════ */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Not Sure Which Course is <span className="text-teal-400">Right for You?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Run our Decision Engine to get matched with courses and universities based on your profile and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/evaluate"
                className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 rounded-xl font-semibold text-white transition-all inline-flex items-center justify-center gap-2 text-sm"
              >
                <Rocket className="w-4 h-4" /> Match My Profile
              </Link>
              <Link
                to="/universities"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-white transition-all inline-flex items-center justify-center gap-2 text-sm"
              >
                <Globe className="w-4 h-4" /> Browse All Universities
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
