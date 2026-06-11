import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, MapPin, Star, Users, Search, GraduationCap, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllUniversities } from "@/data/universities";

export default function UniversitiesList() {
  const allUniversities = getAllUniversities();
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");

  useEffect(() => {
    const saved = sessionStorage.getItem("uni_filter_country");
    if (saved) {
      setCountryFilter(saved);
      sessionStorage.removeItem("uni_filter_country");
    }
  }, []);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(allUniversities.map((u) => u.country)))],
    [allUniversities]
  );

  /* ═══════════════════════════════════════════════════════════════
     SIMPLE FILTERING
     - If no search: show all (optionally filtered by country)
     - If search exists: ONLY show matching universities
       (match on name, city, or country — case insensitive)
     ═══════════════════════════════════════════════════════════════ */
  const filtered = useMemo(() => {
    const trimmed = search.trim().toLowerCase();

    let result = allUniversities;

    // Step 1: Filter by country
    if (countryFilter !== "All") {
      result = result.filter((u) => u.country === countryFilter);
    }

    // Step 2: Filter by search text (if any)
    if (trimmed) {
      result = result.filter((u) => {
        const nameMatch = u.name?.toLowerCase().includes(trimmed);
        const cityMatch = u.city?.toLowerCase().includes(trimmed);
        const countryMatch = u.country?.toLowerCase().includes(trimmed);
        return nameMatch || cityMatch || countryMatch;
      });
    }

    return result;
  }, [search, countryFilter, allUniversities]);

  /* Real stats from data */
  const totalUniversities = allUniversities.length;
  const totalCountries = countries.length - 1; // exclude "All"
  const totalPrograms = allUniversities.reduce((acc, u) => acc + (u.programs?.length || 0), 0);
  const totalIndianStudents = allUniversities.reduce((acc, u) => acc + (parseInt(String(u.indianStudents).replace(/[^0-9]/g, "")) || 0), 0);

  /* Filtered stats */
  const filteredCountries = Array.from(new Set(filtered.map((u) => u.country))).length;
  const filteredPrograms = filtered.reduce((acc, u) => acc + (u.programs?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-[#0d9488]/20 text-[#0d9488] border-[#0d9488]/30 text-xs mb-4">
              <Building2 className="w-3 h-3 mr-1" /> University Directory
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {search
                ? <>Search Results: <span className="text-[#0d9488]">&ldquo;{search}&rdquo;</span></>
                : countryFilter !== "All"
                  ? <>Universities in <span className="text-[#0d9488]">{countryFilter}</span></>
                  : <>Explore <span className="text-[#0d9488]">{totalUniversities}+</span> Universities Across <span className="text-[#0d9488]">{totalCountries}</span> Countries</>
              }
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              {search
                ? `Found ${filtered.length} matching universit${filtered.length === 1 ? "y" : "ies"} across ${filteredCountries} countr${filteredCountries === 1 ? "y" : "ies"} — click any card for full details`
                : `Detailed admission guides, placement reports, scholarships, campus life videos, and academic requirements for Indian students`
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PROMINENT SEARCH BAR ═══════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by university name, city or country..."
              className="w-full pl-12 pr-12 py-4 bg-slate-800/70 border border-slate-600/50 rounded-2xl text-white text-base placeholder:text-slate-500 focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none transition-all shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Country Filter Pills */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                countryFilter === c
                  ? "bg-[#0d9488] text-white shadow-md shadow-teal-500/20"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:border-slate-500"
              }`}
            >
              {c === "All" ? `All (${totalUniversities})` : `${c} (${allUniversities.filter(u => u.country === c).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{filtered.length}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              {search || countryFilter !== "All" ? `of ${totalUniversities} Universities` : "Universities"}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{filteredCountries}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              {search || countryFilter !== "All" ? `of ${totalCountries} Countries` : "Countries"}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{filteredPrograms}+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Programs</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#0d9488]">{totalIndianStudents.toLocaleString()}+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Indian Students</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ UNIVERSITY CARDS ═══════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((uni, idx) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.03, 0.5) }}
            >
              <Link to={`/universities/${uni.slug}`}>
                <div className="relative border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#0d9488]/5 hover:-translate-y-1 hover:border-[#0d9488]/30 transition-all group">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={uni.heroImage}
                      alt=""
                      className="w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-900" />
                  </div>
                  {/* Content */}
                  <div className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#0d9488]/10 border border-[#0d9488]/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                          <Building2 className="w-6 h-6 text-[#0d9488]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-white group-hover:text-[#0d9488] transition-colors truncate">
                            {uni.name}
                          </h3>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {uni.city}, {uni.country}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs shrink-0 ml-2">
                        <Star className="w-3 h-3 mr-1" /> QS {uni.qsRanking}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {uni.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="bg-slate-700/80 text-slate-300 text-[10px] backdrop-blur-sm">
                        <Users className="w-3 h-3 mr-1" /> {uni.indianStudents} Indians
                      </Badge>
                      <Badge className="bg-slate-700/80 text-slate-300 text-[10px] backdrop-blur-sm">
                        <GraduationCap className="w-3 h-3 mr-1" /> {uni.programs.length} programs
                      </Badge>
                      <Badge className="bg-slate-700/80 text-slate-300 text-[10px] backdrop-blur-sm">
                        {uni.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Acceptance:{" "}
                        <span className="text-slate-300 font-semibold">
                          {uni.acceptanceRate}
                        </span>
                      </span>
                      <span className="text-xs text-[#0d9488] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-14 h-14 text-slate-600 mx-auto mb-4" />
            <p className="text-lg font-bold text-white mb-1">
              No universities found
            </p>
            {search ? (
              <p className="text-sm text-slate-400 mb-4">
                No universities match &ldquo;{search}&rdquo;. Try a different search term.
              </p>
            ) : (
              <p className="text-sm text-slate-400 mb-4">
                Try adjusting your filters
              </p>
            )}
            <button
              onClick={() => {
                setSearch("");
                setCountryFilter("All");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <X className="w-4 h-4" /> Clear All Filters
            </button>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
