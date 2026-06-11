import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen, Briefcase, Globe, GraduationCap, DollarSign,
  Clock, ChevronRight, CheckCircle, MapPin, Star, Users,
  Zap, Target, TrendingUp, ArrowRight, FileText, Check,
  Cpu, Microscope, Calculator, Sparkles, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubjectProgram {
  id: string;
  title: string;
  level: string;
  duration: string;
  avgTuition: string;
  description: string;
  whoFor: string[];
  eligibility: string[];
  countries: {
    name: string;
    tuition: string;
    salary: string;
    exam: string;
    pr: string;
  }[];
  careers: {
    role: string;
    usa: string;
    uk: string;
    canada: string;
    aus: string;
  }[];
  licensing: string[] | string;
}

interface FrameworkStep {
  s: string;
  l: string;
  d: string;
}

export interface SubjectData {
  icon: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string;
  whyAbroad: string[];
  framework: FrameworkStep[];
  programs: SubjectProgram[];
}

/* ─── Level badge colours ─── */
function levelColours(level: string) {
  if (level.includes("UG")) return { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
  if (level.includes("PG")) return { bg: "bg-teal-500", light: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" };
  if (level.includes("PhD")) return { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" };
  return { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
}

/* ─── Country flag emoji helper ─── */
function flag(country: string) {
  const map: Record<string, string> = {
    USA: "🇺🇸", "United States": "🇺🇸", UK: "🇬🇧", "United Kingdom": "🇬🇧",
    Canada: "🇨🇦", Germany: "🇩🇪", Australia: "🇦🇺", Ireland: "🇮🇪",
    Singapore: "🇸🇬", France: "🇫🇷", Netherlands: "🇳🇱", Sweden: "🇸🇪",
    Italy: "🇮🇹", Poland: "🇵🇱", "New Zealand": "🇳🇿", Malaysia: "🇲🇾",
    UAE: "🇦🇪", Russia: "🇷🇺", Philippines: "🇵🇭", Georgia: "🇬🇪",
    Finland: "🇫🇮", Norway: "🇳🇴", Denmark: "🇩🇰", Switzerland: "🇨🇭",
    Austria: "🇦🇹", Belgium: "🇧🇪", Spain: "🇪🇸",
  };
  return map[country] || "🌍";
}

export default function SubjectLanding({ data }: { data: SubjectData }) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

  const allCountries = [...new Set(data.programs.flatMap(p => p.countries.map(c => c.name)))];
  const totalCareers = [...new Set(data.programs.flatMap(p => p.careers.map(c => c.role)))].length;
  const lc = levelColours(data.programs[0]?.level || "PG");

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-20 pb-12 overflow-hidden min-h-[55vh] flex items-center">
        {/* Background */}
        {data.heroVideo ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster={data.heroImage}>
            <source src={data.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.heroImage})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs mb-4 backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1" /> {data.title} Abroad Guide
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
              Study <span className="text-teal-400">{data.title}</span> Abroad
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-2">{data.subtitle}</p>

            {/* Quick stats row */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-slate-800/80 text-slate-300 border-slate-700 text-xs backdrop-blur-sm">
                <GraduationCap className="w-3 h-3 mr-1" /> {data.programs.length} Programs
              </Badge>
              <Badge className="bg-slate-800/80 text-slate-300 border-slate-700 text-xs backdrop-blur-sm">
                <Globe className="w-3 h-3 mr-1" /> {allCountries.length} Countries
              </Badge>
              <Badge className="bg-slate-800/80 text-slate-300 border-slate-700 text-xs backdrop-blur-sm">
                <Briefcase className="w-3 h-3 mr-1" /> {totalCareers} Career Paths
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs backdrop-blur-sm">
                <TrendingUp className="w-3 h-3 mr-1" /> Up to 2Cr Salary
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/evaluate">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 py-5 text-sm font-bold shadow-lg shadow-teal-600/25">
                  <Zap className="w-4 h-4 mr-2" /> Match My {data.title} Profile
                </Button>
              </Link>
              <Link to="/courses">
                <Button className="bg-slate-700/80 hover:bg-slate-600 text-white rounded-xl px-6 py-5 text-sm font-bold backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 mr-2" /> Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ WHY STUDY + JOURNEY ═══════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Why Study Abroad */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Why Study {data.title} Abroad?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.whyAbroad.map((w, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{w}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey Steps */}
        {data.framework.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Your {data.title} Journey</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.framework.map((f, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-teal-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                      {f.s}
                    </div>
                    <h4 className="text-sm font-bold text-white">{f.l}</h4>
                  </div>
                  <p className="text-xs text-slate-400 ml-11">{f.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* ═══════════════════════ PROGRAMS ═══════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Programs & Courses</h2>
            <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[10px]">{data.programs.length} programs</Badge>
          </div>

          <div className="space-y-4">
            {data.programs.map((p) => {
              const isExpanded = expandedProgram === p.id;
              const lc = levelColours(p.level);

              return (
                <div key={p.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-all">
                  {/* Program Header - Always Visible */}
                  <button
                    onClick={() => setExpandedProgram(isExpanded ? null : p.id)}
                    className="w-full p-4 sm:p-5 flex items-start gap-3 sm:gap-4 text-left"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${lc.light} border ${lc.border} flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-bold ${lc.text}`}>{p.level}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-white">{p.title}</h3>
                        <Badge className={`text-[9px] ${lc.light} ${lc.text} ${lc.border} border`}>{p.level}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {p.duration}
                        </span>
                        <span className="text-[11px] text-teal-400 font-semibold flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {p.avgTuition}
                        </span>
                      </div>
                      {/* Country chips - quick preview */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.countries.slice(0, 4).map(c => (
                          <span key={c.name} className="text-[10px] px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-full flex items-center gap-1">
                            {flag(c.name)} {c.name}
                          </span>
                        ))}
                        {p.countries.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full">+{p.countries.length - 4}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-500 shrink-0 mt-2 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 border-t border-slate-700/50 pt-4 space-y-5">
                      {/* Description */}
                      <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>

                      {/* Who For */}
                      <div>
                        <p className="text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-2">Best For</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.whoFor.map((w, wi) => (
                            <span key={wi} className="text-[11px] px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">{w}</span>
                          ))}
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div className="bg-amber-500/5 rounded-xl p-3.5 border border-amber-500/15">
                        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Eligibility Requirements</p>
                        <ul className="space-y-1.5">
                          {p.eligibility.map((e, ei) => (
                            <li key={ei} className="text-xs text-slate-300 flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{e}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Country Comparison Table */}
                      <div>
                        <p className="text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-2">Cost, Salary & PR by Country</p>
                        <div className="overflow-x-auto -mx-1">
                          <table className="w-full text-[11px] min-w-[500px]">
                            <thead>
                              <tr className="text-slate-400 border-b border-slate-700">
                                <th className="text-left py-2 pr-3 font-medium">Country</th>
                                <th className="text-left py-2 pr-3 font-medium">Tuition/Year</th>
                                <th className="text-left py-2 pr-3 font-medium">Avg Salary</th>
                                <th className="text-left py-2 pr-3 font-medium">Exam Needed</th>
                                <th className="text-left py-2 font-medium">PR Pathway</th>
                              </tr>
                            </thead>
                            <tbody>
                              {p.countries.map((c, ci) => (
                                <tr key={ci} className="border-b border-slate-700/30 last:border-0">
                                  <td className="py-2.5 pr-3 font-medium text-white whitespace-nowrap">
                                    <span className="mr-1">{flag(c.name)}</span>{c.name}
                                  </td>
                                  <td className="py-2.5 pr-3 text-teal-400 font-medium whitespace-nowrap">{c.tuition}</td>
                                  <td className="py-2.5 pr-3 text-emerald-400 font-medium whitespace-nowrap">{c.salary}</td>
                                  <td className="py-2.5 pr-3 text-slate-400 whitespace-nowrap">{c.exam}</td>
                                  <td className="py-2.5 text-slate-400">{c.pr}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Licensing */}
                      {p.licensing && Array.isArray(p.licensing) && p.licensing.length > 0 && (
                        <div className="bg-blue-500/5 rounded-xl p-3.5 border border-blue-500/15">
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">Licensing / Certification</p>
                          <ul className="space-y-1">
                            {p.licensing.map((lic, li) => (
                              <li key={li} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />{lic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {p.licensing && typeof p.licensing === "string" && p.licensing.length > 0 && (
                        <div className="bg-blue-500/5 rounded-xl p-3.5 border border-blue-500/15">
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Licensing / Certification</p>
                          <p className="text-xs text-slate-300">{p.licensing}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ CAREER PATHS ═══════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Career Paths & Salaries</h2>
            <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[10px]">{totalCareers} roles</Badge>
          </div>

          <div className="space-y-6">
            {data.programs.map((p) => {
              const isCE = expandedCareer === p.id;
              return (
                <div key={p.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCareer(isCE ? null : p.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-700 text-slate-300 text-[9px]">{p.level}</Badge>
                      <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${isCE ? "rotate-90" : ""}`} />
                  </button>

                  {isCE && (
                    <div className="px-4 pb-4 border-t border-slate-700/50 pt-3">
                      <div className="overflow-x-auto -mx-1">
                        <table className="w-full text-[11px] min-w-[400px]">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-700">
                              <th className="text-left py-2 pr-2 font-medium">Role</th>
                              <th className="text-left py-2 pr-2 font-medium">🇺🇸 USA</th>
                              <th className="text-left py-2 pr-2 font-medium">🇬🇧 UK</th>
                              <th className="text-left py-2 pr-2 font-medium">🇨🇦 Canada</th>
                              <th className="text-left py-2 font-medium">🇦🇺 Australia</th>
                            </tr>
                          </thead>
                          <tbody>
                            {p.careers.map((c, ci) => (
                              <tr key={ci} className="border-b border-slate-700/30 last:border-0">
                                <td className="py-2.5 pr-2 font-medium text-white">{c.role}</td>
                                <td className="py-2.5 pr-2 text-emerald-400 font-medium">{c.usa}</td>
                                <td className="py-2.5 pr-2 text-emerald-400">{c.uk}</td>
                                <td className="py-2.5 pr-2 text-emerald-400">{c.canada}</td>
                                <td className="py-2.5 text-emerald-400">{c.aus}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ CTA — DECISION ENGINE ═══════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 sm:p-10 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-sm font-semibold mb-5">
              <Calculator className="w-4 h-4" /> Free 90-Second Evaluation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Find Your Best {data.title} Destination
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm sm:text-base">
              Tell us your budget, IELTS score, and academic record. Our Decision Engine will rank the top 3 countries for your {data.title} profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/evaluate">
                <Button className="bg-white text-teal-700 hover:bg-gray-100 rounded-xl px-8 py-5 font-bold text-sm shadow-lg">
                  <Zap className="w-4 h-4 mr-2" /> Match My Profile
                </Button>
              </Link>
              <Link to="/courses">
                <Button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl px-8 py-5 font-bold text-sm backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 mr-2" /> Browse All Courses
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ STICKY MOBILE CTA ═══════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-teal-600 to-teal-700 border-t border-teal-500/30 p-3 shadow-2xl">
        <Link to="/evaluate" className="flex items-center justify-center gap-2 text-white font-bold text-sm">
          <Sparkles className="w-4 h-4" /> Match My {data.title} Profile — Free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}
