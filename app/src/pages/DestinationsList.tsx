import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  MapPin, Globe, GraduationCap, Wallet, Clock, ArrowRight,
  Search, TrendingUp, Shield, Building2,
} from "lucide-react";
import { useState } from "react";
import { destinations } from "@/data/destinations";
import { getAllUniversities } from "@/data/universities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ═══════════════════════════════════════════
   DYNAMIC REGION MAPPING — auto-generated from destination data
   Add a new destination to destinations.ts → it appears here automatically
   ═══════════════════════════════════════════ */

const REGION_LABELS: Record<string, string> = {
  "north-america": "North America",
  europe: "Europe",
  "asia-pacific": "Asia-Pacific",
  mideast: "Middle East",
  other: "Other",
};

/** Build region map from destination data. Each destination should have a region field. */
function buildRegionMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const d of destinations) {
    if (d.id === "view-all") continue;
    // Use explicit region from data, or infer from known mappings
    map[d.id] = (d as any).region || inferRegion(d.id);
  }
  return map;
}

/** Fallback: infer region from country ID */
function inferRegion(id: string): string {
  const northAmerica = ["usa", "canada"];
  const europe = ["uk", "germany", "ireland", "france", "netherlands", "italy", "spain", "sweden", "poland", "switzerland", "czech-republic"];
  const asiaPacific = ["australia", "new-zealand", "singapore", "south-korea", "malaysia", "philippines"];
  const mideast = ["dubai", "uae"];
  if (northAmerica.includes(id)) return "north-america";
  if (europe.includes(id)) return "europe";
  if (asiaPacific.includes(id)) return "asia-pacific";
  if (mideast.includes(id)) return "mideast";
  return "other";
}

const regionMap = buildRegionMap();

/** Get unique region values present in the data */
function getActiveRegions(): (string | null)[] {
  const regions = new Set<string>();
  for (const d of destinations) {
    if (d.id === "view-all") continue;
    const r = regionMap[d.id];
    if (r) regions.add(r);
  }
  return [null, ...Array.from(regions).sort()];
}

/** Get human-readable region label */
function getRegionLabel(region: string | null): string {
  if (!region) return "All";
  return REGION_LABELS[region] || region;
}

/** Dynamic stats computed from data */
function getDynamicStats() {
  const destCount = destinations.filter(d => d.id !== "view-all").length;
  const uniCount = getAllUniversities().length;
  return [
    { value: `${destCount}+`, label: "Destinations" },
    { value: `${uniCount}+`, label: "Universities" },
    { value: "50+", label: "Scholarship Programs" },
    { value: "100%", label: "Free Guides" },
  ];
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function DestinationsList() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const activeRegions = getActiveRegions();
  const stats = getDynamicStats();
  const destCount = destinations.filter(d => d.id !== "view-all").length;

  const filtered = destinations.filter((d) => {
    if (d.id === "view-all") return false;
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase()) ||
      d.popularCourses.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = !activeRegion || regionMap[d.id] === activeRegion;
    return matchSearch && matchRegion;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                {destCount} Study Abroad <span className="text-[#0d9488]">Destinations</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Comprehensive guides for every major study destination — tuition costs, visa rules,
                PR pathways, scholarships, and life as an Indian student. Find your perfect match.
              </p>

              {/* Search */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries, courses, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:bg-white/20 transition-all"
                />
              </div>

              {/* Region filters — DYNAMIC */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {activeRegions.map((r) => (
                  <button
                    key={r ?? "all"}
                    onClick={() => setActiveRegion(r)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeRegion === r
                        ? "bg-[#0d9488] text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {getRegionLabel(r)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Stats Bar — DYNAMIC ─── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Country Cards — DYNAMIC ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((dest) => (
                <motion.div
                  key={dest.id}
                  variants={item}
                  className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Hero image area */}
                  <div className={`relative h-44 bg-gradient-to-br ${dest.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          {getRegionLabel(regionMap[dest.id])}
                        </span>
                        <Globe className="w-5 h-5 text-white/70" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{dest.name}</h2>
                        <p className="text-white/80 text-sm">{dest.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Key stats row */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                        <GraduationCap className="w-4 h-4 text-[#0d9488]" />
                        <div>
                          <div className="text-xs text-gray-400">Tuition</div>
                          <div className="text-xs font-semibold text-gray-700">{dest.tuition}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                        <Wallet className="w-4 h-4 text-[#0d9488]" />
                        <div>
                          <div className="text-xs text-gray-400">Living</div>
                          <div className="text-xs font-semibold text-gray-700">{dest.living}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 text-[#0d9488]" />
                        <div>
                          <div className="text-xs text-gray-400">Work Permit</div>
                          <div className="text-xs font-semibold text-gray-700">{dest.workPermit}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-[#0d9488]" />
                        <div>
                          <div className="text-xs text-gray-400">PR Pathway</div>
                          <div className="text-xs font-semibold text-gray-700 truncate">{dest.prPathway}</div>
                        </div>
                      </div>
                    </div>

                    {/* Popular courses */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3" /> Popular Courses
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.popularCourses.slice(0, 4).map((course) => (
                          <span key={course} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visa success */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-gray-500">Visa success rate</span>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600">{dest.visaSuccess}</span>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/destinations/${dest.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all group-hover:shadow-lg"
                    >
                      Explore {dest.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* ─── Compare CTA — DYNAMIC count ─── */}
        <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Compare All Destinations <span className="text-[#0d9488]">Side by Side</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Use our AI Decision Engine to compare tuition, living costs, ROI, safety,
              visa ease, and PR pathways across all {destCount} destinations in one view.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/evaluate" className="px-8 py-4 bg-[#0d9488] hover:bg-[#0f766e] rounded-xl font-semibold text-white transition-all inline-flex items-center justify-center gap-2">
                Launch Decision Engine <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/smart-match" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-white transition-all inline-flex items-center justify-center gap-2">
                Try Smart Match <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
