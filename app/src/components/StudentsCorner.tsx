import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, TrendingUp, TrendingDown, BookOpen, GraduationCap,
  BarChart3, ExternalLink, ChevronRight, School, MapPin,
  X, Building2, Star, ArrowRight, Globe, Sparkles,
} from "lucide-react";
import { getEnrollmentByCountry, type EnrollmentUni } from "@/data/indianEnrollment";
import { getAllUniversities } from "@/data/universities";
import type { University } from "@/data/universities";

const countryIdMap: Record<string, string> = {
  usa: "USA", canada: "Canada", uk: "UK", australia: "Australia",
  germany: "Germany", ireland: "Ireland", france: "France",
  singapore: "Singapore", dubai: "UAE (Dubai)", netherlands: "Netherlands",
  sweden: "Sweden", italy: "Italy", poland: "Poland",
  georgia: "Georgia", malaysia: "Malaysia", newzealand: "New Zealand",
  russia: "Russia", philippines: "Philippines",
  "south-korea": "South Korea", southkorea: "South Korea",
  portugal: "Portugal", spain: "Spain",
};

/* Helper: find full university data by matching enrollment name */
function findUniversityByName(enrollmentUni: EnrollmentUni): University | undefined {
  const allUniversities = getAllUniversities();
  // Exact match first
  const exact = allUniversities.find(
    (u) => u.name.toLowerCase() === enrollmentUni.name.toLowerCase()
  );
  if (exact) return exact;
  // Fuzzy: enrollment name is contained in full name, or vice versa
  return allUniversities.find((u) => {
    const a = u.name.toLowerCase();
    const b = enrollmentUni.name.toLowerCase();
    return a.includes(b) || b.includes(a);
  });
}

export function StudentsCorner({ countryId }: { countryId: string }) {
  const mappedCountry = countryIdMap[countryId.toLowerCase()];
  const data = mappedCountry ? getEnrollmentByCountry(mappedCountry) : null;
  const [selectedUni, setSelectedUni] = useState<{ enrollment: EnrollmentUni; full?: University } | null>(null);

  if (!data) return null;

  const isGrowthPositive = !data.growthYoY.includes("-") && !data.growthYoY.toLowerCase().includes("decline");

  return (
    <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#0d9488]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#0d9488]/15 flex items-center justify-center">
            <Users className="w-4 h-4 text-[#0d9488]" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#0d9488] font-bold">Students Corner</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Indian Students in {data.country}
        </h2>
        <p className="text-sm text-slate-400 mb-8 max-w-2xl">
          Real enrollment numbers, popular courses, and where Indian students are studying right now.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
          >
            <Users className="w-4 h-4 text-[#0d9488] mb-2" />
            <p className="text-2xl font-bold text-white">{data.totalIndianStudents}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Indian Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
          >
            {isGrowthPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-400 mb-2" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400 mb-2" />
            )}
            <p className={`text-2xl font-bold ${isGrowthPositive ? "text-emerald-400" : "text-red-400"}`}>
              {data.growthYoY}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Year-over-Year</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
          >
            <School className="w-4 h-4 text-amber-400 mb-2" />
            <p className="text-2xl font-bold text-white">{data.topUniversities.length}+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Top Universities</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4"
          >
            <BookOpen className="w-4 h-4 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-white">{data.year}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Data Year</p>
          </motion.div>
        </div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-2xl p-5 mb-8"
        >
          <p className="text-sm text-slate-300 leading-relaxed">{data.keyInsight}</p>
        </motion.div>

        {/* Top Universities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#0d9488]" />
              Where Indian Students Study
            </h3>
            <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[10px]">
              {data.topUniversities.length} universities
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.topUniversities.slice(0, 6).map((uni, idx) => {
              const fullUni = findUniversityByName(uni);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedUni({ enrollment: uni, full: fullUni })}
                  className="relative border border-slate-700/60 rounded-xl overflow-hidden hover:border-[#0d9488]/30 transition-all cursor-pointer group"
                >
                  {/* Background image */}
                  {fullUni?.heroImage && (
                    <>
                      <img
                        src={fullUni.heroImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
                    </>
                  )}
                  {/* Content */}
                  <div className="relative p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-bold text-white leading-snug flex-1 mr-2">{uni.name}</h4>
                    {uni.qsRanking && uni.qsRanking !== "N/A" && (
                      <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 text-[9px] shrink-0">
                        {uni.qsRanking}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-[9px] ${
                      uni.type === "Public"
                        ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                        : "bg-purple-400/10 text-purple-400 border-purple-400/20"
                    }`}>
                      {uni.type}
                    </Badge>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5" /> {uni.indianStudents}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {uni.popularCourses.slice(0, 3).map((course, ci) => (
                      <span key={ci} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">
                        {course}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between">
                    <span className="text-[9px] text-[#0d9488] font-medium">Quick View</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                  </div>{/* end relative content */}
                </motion.div>
              );
            })}
          </div>

          {data.topUniversities.length > 6 && (
            <p className="text-xs text-slate-500 mt-3 text-center">
              +{data.topUniversities.length - 6} more universities with Indian student enrollment
            </p>
          )}
        </div>

        {/* Source */}
        <div className="flex items-center gap-2 text-[10px] text-slate-600 border-t border-slate-800 pt-4">
          <ExternalLink className="w-3 h-3" />
          <span>Source: {data.source}</span>
          <span className="text-slate-700">·</span>
          <span>Verified from official government data</span>
        </div>
      </div>

      {/* ═══ University QuickView Modal ═══ */}
      <AnimatePresence>
        {selectedUni && (
          <motion.div
            key="quickview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedUni(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Header image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={selectedUni.full?.heroImage || selectedUni.full?.campusImage || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"}
                  alt={selectedUni.enrollment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-[9px] ${
                      selectedUni.enrollment.type === "Public"
                        ? "bg-emerald-400/20 text-emerald-400 border-emerald-400/30"
                        : "bg-purple-400/20 text-purple-400 border-purple-400/30"
                    }`}>
                      {selectedUni.enrollment.type}
                    </Badge>
                    {selectedUni.enrollment.qsRanking && selectedUni.enrollment.qsRanking !== "N/A" && (
                      <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 text-[9px]">
                        <Star className="w-2.5 h-2.5 mr-1" />QS {selectedUni.enrollment.qsRanking}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{selectedUni.enrollment.name}</h3>
                  {selectedUni.full && (
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {selectedUni.full.city}, {selectedUni.full.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
                    <Users className="w-4 h-4 text-[#0d9488] mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">{selectedUni.enrollment.indianStudents}</p>
                    <p className="text-[10px] text-slate-500">Indian Students</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
                    <GraduationCap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">{selectedUni.enrollment.popularCourses.length}+</p>
                    <p className="text-[10px] text-slate-500">Top Courses</p>
                  </div>
                </div>

                {/* Popular Courses */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Popular Courses
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUni.enrollment.popularCourses.map((course, ci) => (
                      <span key={ci} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedUni.enrollment.notes && (
                  <div className="bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-xl p-3">
                    <p className="text-xs text-[#0d9488] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedUni.enrollment.notes}
                    </p>
                  </div>
                )}

                {/* Description from full uni data */}
                {selectedUni.full?.description && (
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {selectedUni.full.description}
                  </p>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  {selectedUni.full ? (
                    <Link to={`/universities/${selectedUni.full.slug}`} onClick={() => setSelectedUni(null)}>
                      <Button className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl py-5 text-sm font-bold">
                        <Building2 className="w-4 h-4 mr-2" /> View Full Profile
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full bg-slate-700 text-slate-400 rounded-xl py-5 text-sm font-bold cursor-not-allowed">
                      <Globe className="w-4 h-4 mr-2" /> Full Profile Coming Soon
                    </Button>
                  )}
                  <button
                    onClick={() => setSelectedUni(null)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors text-center py-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
