import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMajorInfo, ALL_MAJORS } from "@/data/siteData";
// useLocalAuth removed — all content free
import {
  BookOpen, ChevronRight, TrendingUp, CheckCircle, ArrowRight,
  Zap, DollarSign, Briefcase, Star, Users, Calendar, Lightbulb,
  Send, FileText, Globe, ChevronDown, ChevronUp, Lock, Crown,
  MapPin, Shield, Clock, GraduationCap, Plane,
} from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

/* ─── Career Card ─── */
function CareerCard({ career, index }: { career: any; index: number }) {
  return (
    <FadeIn delay={index * 0.08}>
      <Card className="border border-slate-200 hover:shadow-md transition-all">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{career.role}</h4>
              <p className="text-xs text-slate-500">Starting Salary</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "USA", val: career.salaryUSA },
              { label: "Canada", val: career.salaryCanada },
              { label: "UK", val: career.salaryUK },
              { label: "Germany", val: career.salaryGermany },
            ].filter(s => s.val && s.val !== "—").map(s => (
              <div key={s.label} className="text-center bg-slate-50 rounded-lg p-2">
                <p className="text-[10px] text-slate-500 font-mono uppercase">{s.label}</p>
                <p className="text-sm font-bold text-teal-700">{s.val}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {career.companies?.map((c: string) => (
              <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{c}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════
   UNIFIED MAJOR LANDING — Handles all 16 majors
   dynamically from siteData.ts. Add a new major
   to siteData.ts → page appears automatically.
   ═══════════════════════════════════════════ */
export default function MajorLanding() {
  const { majorId } = useParams<{ majorId: string }>();
  const major = getMajorInfo(majorId || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!major) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Major Not Found</h1>
          <p className="text-slate-600 mb-4">Available majors:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_MAJORS.map(m => (
              <Link key={m.id} to={`/majors/${m.id}`} className="text-sm text-teal-600 hover:underline">{m.label}</Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const Icon = major.icon;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Study ${major.label} Abroad — Courses, Fees, PR Path 2026`}
        description={`${major.description.slice(0, 150)}... Explore ${major.label} courses abroad: ${major.avgTuition} tuition, ${major.avgSalary} salary, ${major.prScore} PR score.`}
        keywords={`${major.shortLabel.toLowerCase()} courses abroad, study ${major.shortLabel.toLowerCase()} abroad, ${major.shortLabel.toLowerCase()} fees abroad, ${major.shortLabel.toLowerCase()} pr pathway`}
      />
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className={`relative overflow-hidden min-h-[65vh] flex items-center bg-gradient-to-br ${major.heroColor}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="mx-auto max-w-7xl px-6 relative w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/10 text-white mb-4 px-4 py-1.5 border border-white/20 backdrop-blur-sm">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5" /> {major.shortLabel}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Study <span className="text-amber-300">{major.label}</span> Abroad
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-6 max-w-xl">{major.description}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Clock, label: "Duration", value: major.duration },
                  { icon: DollarSign, label: "Avg Tuition", value: major.avgTuition },
                  { icon: Briefcase, label: "Avg Salary", value: major.avgSalary },
                  { icon: Shield, label: "PR Score", value: major.prScore },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                    <div className="flex items-center gap-2 mb-0.5">
                      <s.icon className="h-3.5 w-3.5 text-amber-300" />
                      <span className="text-[10px] text-white/60 font-mono uppercase tracking-wider">{s.label}</span>
                    </div>
                    <p className="text-base font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/#lead-form">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl shadow-lg">
                    Get Free Guidance <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/evaluate">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-xl">
                    <Zap className="mr-2 h-5 w-5" /> Find Best Country
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-white/50 mb-2">Why {major.label}?</p>
              {major.whyThisMajor.map((why, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{why.title}</h4>
                        <p className="text-sm text-white/80 mt-0.5">{why.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT YOU STUDY ═══════════ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><BookOpen className="mr-1.5 h-3.5 w-3.5" />Curriculum</Badge>
              <h2 className="text-3xl font-bold text-slate-900">What You Will Study</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {major.whatYouStudy.map((subject, idx) => (
              <FadeIn key={subject} delay={idx * 0.05}>
                <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{idx + 1}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mt-1.5">{subject}</h4>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TOP COUNTRIES ═══════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><Globe className="mr-1.5 h-3.5 w-3.5" />Destinations</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Best Countries for {major.label}</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {major.topCountries.map((country, idx) => (
              <FadeIn key={country} delay={idx * 0.05}>
                <Link to={`/destinations/${country.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Card className="border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{country}</h4>
                        <p className="text-xs text-slate-500">Explore universities &rarr;</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CAREER PATHS ═══════════ */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(13,148,136,0.4),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-6 relative">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-white/10 text-white mb-3 px-4 py-1.5 border border-white/20"><Briefcase className="mr-1.5 h-3.5 w-3.5" />Careers</Badge>
              <h2 className="text-3xl font-bold text-white lg:text-4xl">Career Paths After {major.label}</h2>
              <p className="mt-2 text-gray-400">Roles, salaries by country, and top employers</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {major.careerPaths.map((career, idx) => (
              <CareerCard key={career.role} career={career} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      {major.faqs && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><Lightbulb className="mr-1.5 h-3.5 w-3.5" />FAQs</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
              </div>
            </FadeIn>
            <div className="space-y-3">
              {major.faqs.map((faq, idx) => (
                <FadeIn key={idx} delay={idx * 0.03}>
                  <Card className="border border-slate-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</h4>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                      </div>
                      {openFaq === idx && <p className="text-sm text-slate-600 mt-3 leading-relaxed pt-3 border-t border-slate-100">{faq.a}</p>}
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ OTHER MAJORS ═══════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><BookOpen className="mr-1.5 h-3.5 w-3.5" />Explore</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Other Major Subjects</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_MAJORS.filter(m => m.id !== major.id).map((otherMajor, idx) => {
              const OtherIcon = otherMajor.icon;
              return (
                <FadeIn key={otherMajor.id} delay={idx * 0.05}>
                  <Link to={`/majors/${otherMajor.id}`}>
                    <Card className="border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-9 h-9 rounded-lg ${otherMajor.bgColor} flex items-center justify-center shrink-0`}>
                            <OtherIcon className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">{otherMajor.shortLabel}</h4>
                        </div>
                        <p className="text-xs text-slate-500">PR: {otherMajor.prScore} · {otherMajor.demandLevel}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(245,158,11,0.3),transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <FadeIn>
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Study {major.label} Abroad?</h2>
            <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">Get matched with verified consultants who specialize in {major.label} admissions. Free consultation, no obligation.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#lead-form">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-xl font-semibold text-base">
                  Get Free Guidance <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/evaluate">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl">
                  <Zap className="mr-2 h-5 w-5" /> Find Best Country
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
