import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courseTypes } from "@/data/courses";
import { destinations } from "@/data/destinations";
import { getCountryData, getPRFriendlyFields } from "@/data/courseDetailData";
import type { CountryCourseInfo } from "@/data/courseDetailData";
import {
  BookOpen, GraduationCap, Award, MapPin, Clock, ChevronRight,
  TrendingUp, CheckCircle, Globe, ArrowRight, Zap, DollarSign,
  Briefcase, Star, Users, Calendar, Search, Lightbulb, Send,
  FileText, Plane, List, Award as AwardIcon, Crown, Lock,
  ChevronDown, MessageCircle, Play, Target, Heart, Banknote,
  Compass, Phone, MousePointer, Quote, Shield, Rocket,
  Wallet, Receipt, FileCheck, GraduationCap as GradCap,
  ChevronUp, Filter,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = { BookOpen, GraduationCap, Award, MapPin };

const courseSEO: Record<string, { title: string; desc: string; keywords: string }> = {
  undergraduate: {
    title: "Undergraduate Courses Abroad — UG Programs for Indian Students 2026",
    desc: "Bachelor's degree abroad after 12th: ₹8L-25L/yr tuition, 3-4 year programs across USA, UK, Canada, Australia, Germany. Explore 1000+ universities, scholarships up to 50% & career options.",
    keywords: "ug courses abroad, bachelors abroad, bachelors in usa, bachelors in uk, bachelors in canada, study abroad after 12th, undergraduate study abroad, ug admission abroad",
  },
  postgraduate: {
    title: "Postgraduate Courses Abroad — MS & MBA for Indian Students 2026",
    desc: "Master's & MBA abroad: ₹12L-40L/yr tuition, 1-2 year programs. STEM OPT in USA, PSW in UK, PGWP in Canada. Compare universities, scholarships, GMAT/GRE requirements & ROI.",
    keywords: "ms in usa, mba abroad, mba in usa, mba in germany, ms in canada, ms in uk, postgraduate study abroad, masters abroad",
  },
  phd: {
    title: "PhD Abroad for Indian Students — Fully-Funded Doctorate Programs 2026",
    desc: "PhD abroad with full funding: ₹0-15L/yr tuition, ₹15-45L/yr stipend. USA, Germany, UK, Canada, Australia. Research assistantships, teaching fellowships & direct PR pathway.",
    keywords: "phd abroad, phd in usa, phd in canada, phd in uk, phd funding abroad, fully funded phd, phd scholarship abroad",
  },
  diploma: {
    title: "Diploma Courses Abroad — Short-Term Programs for Indian Students 2026",
    desc: "Diploma & trade courses abroad: ₹5L-15L/yr tuition, 1-2 year programs. Best PR pathway courses in Canada, Australia, NZ. Co-op programs, work permits & affordable fees.",
    keywords: "diploma courses abroad, diploma in canada, diploma in australia, short courses abroad, pr courses canada",
  },
  "pr-pathways": {
    title: "PR Pathway Courses Abroad — Permanent Residency Courses 2026",
    desc: "Strategic PR pathway courses: study in-demand skills in Canada, Australia, NZ, Germany. Maximize PR points with targeted course selection. Post-study work visa & settlement guide.",
    keywords: "pr pathway courses, pr courses in australia, pr courses in canada, permanent residency after study",
  },
};

/* ─── Fade in wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

/* ─── Country Card ─── */
function CountryCard({ data, index }: { data: CountryCourseInfo; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <Card className={`border hover:shadow-lg transition-all overflow-hidden ${data.prFriendly ? "border-emerald-200" : "border-slate-200"}`}>
        {/* Header */}
        <div className={`p-4 cursor-pointer ${data.prFriendly ? "bg-gradient-to-r from-emerald-50 to-white" : "bg-gradient-to-r from-slate-50 to-white"}`} onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{data.flag}</span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{data.country}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {data.prFriendly && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0">
                      <Shield className="w-3 h-3 mr-0.5" />PR Friendly
                    </Badge>
                  )}
                  <span className="text-[10px] text-slate-500">{data.postStudyWork} PSW</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-teal-700">{data.tuitionUG.split("/yr")[0]}/yr</span>
              {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <CardContent className="p-4 pt-0 border-t border-slate-100">
            {/* Tuition by level */}
            <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Tuition / Year</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{data.tuitionUG}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 uppercase font-mono">Cost of Living</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{data.costOfLiving}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 uppercase font-mono">IELTS Minimum</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{data.ieltsMin}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-500 uppercase font-mono">GPA / % Required</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{data.gpaMin}</p>
              </div>
            </div>

            {/* Popular Courses */}
            <div className="mb-3">
              <p className="text-[10px] text-slate-500 uppercase font-mono mb-1.5">Popular Courses</p>
              <div className="flex flex-wrap gap-1">
                {data.popularCourses.map(c => (
                  <span key={c} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-100">{c}</span>
                ))}
              </div>
            </div>

            {/* PR Path */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-3">
              <p className="text-[10px] text-emerald-700 uppercase font-mono font-bold mb-1">PR Pathway</p>
              <p className="text-xs text-emerald-800 leading-relaxed">{data.prPath}</p>
              <p className="text-[10px] text-emerald-600 mt-1">Timeline: {data.prTimeline}</p>
            </div>

            {/* Work Rights & Salary */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-[10px] text-blue-600 uppercase font-mono">Work During Study</p>
                <p className="text-xs text-blue-800 mt-0.5">{data.workRights}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2.5">
                <p className="text-[10px] text-amber-600 uppercase font-mono">Starting Salary</p>
                <p className="text-xs text-amber-800 mt-0.5">{data.avgSalary}</p>
              </div>
            </div>

            {/* Scholarship & Notes */}
            <div className="mb-2">
              <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Scholarships</p>
              <p className="text-xs text-slate-700">{data.scholarshipAvg}</p>
            </div>

            {/* Hiring Sectors */}
            <div className="mb-3">
              <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Top Hiring Sectors</p>
              <div className="flex flex-wrap gap-1">
                {data.hiringSectors.map(s => (
                  <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>

            {/* Special notes */}
            {data.blockedAccount && (
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 mb-2">
                <p className="text-[10px] text-orange-700 font-bold">Proof of Funds Required</p>
                <p className="text-xs text-orange-800">{data.blockedAccount}</p>
              </div>
            )}

            <p className="text-[10px] text-slate-500 leading-relaxed italic">{data.notes}</p>
          </CardContent>
        )}
      </Card>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function CourseLanding() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseTypes.find((c) => c.id === courseId);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prFilter, setPrFilter] = useState<"all" | "pr-friendly">("all");

  if (!course) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Course not found</p></div>;

  const seo = courseSEO[course.id] || {
    title: `Study ${course.title} Abroad`,
    desc: `${course.title} courses abroad for Indian students.`,
    keywords: `study ${course.title.toLowerCase()} abroad`,
  };

  const Icon = iconMap[course.icon] || BookOpen;
  const countryData = getCountryData(course.id);
  const prFields = getPRFriendlyFields(course.id);
  const filteredCountries = prFilter === "pr-friendly" ? countryData.filter(c => c.prFriendly) : countryData;

  return (
    <div className="min-h-screen bg-white">
      <SEO title={seo.title} description={seo.desc} keywords={seo.keywords} />
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-slate-900 to-amber-900/30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-6 relative w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/10 text-white mb-4 px-4 py-1.5 border border-white/20 backdrop-blur-sm">
                <Icon className="mr-1.5 h-3.5 w-3.5" /> {course.subtitle}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Study <span className="text-amber-400">{course.title}</span> Abroad
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-xl">{course.description}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[{ icon: Clock, label: "Duration", value: course.duration }, { icon: DollarSign, label: "Avg Tuition", value: course.avgTuition }, { icon: Briefcase, label: "Avg Salary", value: course.avgSalary }].map(s => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                    <div className="flex items-center gap-2 mb-0.5"><s.icon className="h-3.5 w-3.5 text-teal-400" /><span className="text-[10px] text-white/60 font-mono uppercase tracking-wider">{s.label}</span></div>
                    <p className="text-base font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/#lead-form"><Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-teal-600/25">Get Free Guidance <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link to="/evaluate"><Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-6 text-base font-semibold rounded-xl"><Zap className="mr-2 h-5 w-5" /> Find Best Country</Button></Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-white/50 mb-2">Why {course.title}?</p>
              {course.whyThisCourse?.map((why, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{why.title}</h4>
                        <p className="text-sm text-gray-400 mt-0.5">{why.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PR-FRIENDLY FIELDS (PREMIUM) ═══════════ */}
      {prFields.length > 0 && (
        <section className="py-16 bg-emerald-50">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <Badge className="bg-emerald-100 text-emerald-700 mb-3 px-4 py-1.5"><Shield className="mr-1.5 h-3.5 w-3.5" />PR-Friendly Fields</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Best Fields for Permanent Residency</h2>
                <p className="mt-2 text-slate-600 max-w-xl mx-auto">These fields have the highest PR success rates based on occupation shortage lists across countries</p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {prFields.map((field, idx) => (
                  <FadeIn key={field.field} delay={idx * 0.05}>
                    <Card className={`border hover:shadow-md transition-all h-full ${field.prScore.startsWith("10") ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-white" : "border-slate-200"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`text-[10px] ${field.prScore.startsWith("10") ? "bg-emerald-100 text-emerald-700" : field.prScore.startsWith("9") ? "bg-teal-100 text-teal-700" : "bg-blue-100 text-blue-700"}`}>
                            PR Score: {field.prScore}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">{field.demand}</Badge>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-2">{field.field}</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-mono mb-1.5">Top Countries</p>
                        <div className="flex flex-wrap gap-1">
                          {field.countries.map(c => (
                            <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{c}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
        </section>
      )}

      {/* ═══════════ COUNTRY BREAKDOWN (PREMIUM) ═══════════ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center mb-6">
              <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><Globe className="mr-1.5 h-3.5 w-3.5" />Country Guide</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{course.title} by Country</h2>
              <p className="mt-2 text-slate-600 max-w-xl mx-auto">Click any country to see tuition, eligibility, PR path, and more</p>
            </div>
          </FadeIn>

          {/* Filter */}
            <div className="flex justify-center gap-2 mb-8">
              <button onClick={() => setPrFilter("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${prFilter === "all" ? "bg-teal-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"}`}>
                <Globe className="w-3.5 h-3.5 inline mr-1" />All Countries
              </button>
              <button onClick={() => setPrFilter("pr-friendly")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${prFilter === "pr-friendly" ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300"}`}>
                <Shield className="w-3.5 h-3.5 inline mr-1" />PR-Friendly Only
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredCountries.map((country, idx) => (
                <CountryCard key={country.country} data={country} index={idx} />
              ))}
            </div>
          </div>
      </section>

      {/* ═══════════ ADMISSION ROADMAP (PROFILE REQUIRED) ═══════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-amber-100 text-amber-700 mb-3 px-4 py-1.5"><Rocket className="mr-1.5 h-3.5 w-3.5" />Roadmap</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Your Admission Journey</h2>
              <p className="mt-2 text-slate-600">Step-by-step guide from today to your first day abroad</p>
            </div>
          </FadeIn>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-amber-500 hidden md:block" />
            <div className="space-y-6">
              {[
                { step: "1", icon: Target, title: "Profile Assessment", desc: "Evaluate your academics, budget, and career goals. Use our Decision Engine to find your best-fit countries.", timeline: "Month 1", color: "from-teal-500 to-teal-600" },
                { step: "2", icon: Search, title: "Research & Shortlist", desc: "Shortlist 6-8 universities based on rankings, fees, scholarships, and PR prospects. Check occupation shortage lists.", timeline: "Month 1-2", color: "from-teal-500 to-teal-600" },
                { step: "3", icon: FileText, title: "Entrance Exams", desc: "Take IELTS/TOEFL (all countries) + GRE/GMAT/SAT depending on target. Aim for scores above minimum requirements.", timeline: "Month 2-3", color: "from-teal-600 to-teal-700" },
                { step: "4", icon: Send, title: "Apply to Universities", desc: "Submit applications with SOP, LORs, transcripts, and test scores. Apply for scholarships simultaneously.", timeline: "Month 3-5", color: "from-amber-400 to-amber-500" },
                { step: "5", icon: AwardIcon, title: "Receive Offers & Decide", desc: "Compare offer letters, scholarship amounts, and total costs. Accept the best offer and pay deposit.", timeline: "Month 5-7", color: "from-amber-500 to-amber-600" },
                { step: "6", icon: FileCheck, title: "Student Visa", desc: "Prepare financial documents, proof of funds, health insurance. Attend visa interview if required.", timeline: "Month 7-9", color: "from-violet-500 to-violet-600" },
                { step: "7", icon: Plane, title: "Fly & Settle", desc: "Book flights, arrange accommodation, attend orientation. Start building your network from Day 1.", timeline: "Month 9-12", color: "from-emerald-500 to-emerald-600" },
              ].map((item, idx) => (
                <FadeIn key={item.step} delay={idx * 0.08}>
                  <div className="flex gap-4 items-start relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg z-10`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <Badge variant="outline" className="text-[10px]">{item.timeline}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          </div>
      </section>

      {/* ═══════════ DOCUMENT CHECKLIST (PROFILE REQUIRED) ═══════════ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><FileCheck className="mr-1.5 h-3.5 w-3.5" />Checklist</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Documents You Will Need</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: FileText, label: "Academic Transcripts", desc: "10th, 12th, Bachelor's marksheets (attested)" },
              { icon: GradCap, label: "Degree Certificate", desc: "Provisional/final degree certificate" },
              { icon: Star, label: "English Test Score", desc: "IELTS / TOEFL / PTE / Duolingo scorecard" },
              { icon: Award, label: "Entrance Exam Score", desc: "GRE / GMAT / SAT (if required by university)" },
              { icon: FileText, label: "Statement of Purpose", desc: "1-2 page essay on why this course & university" },
              { icon: Users, label: "Letters of Recommendation", desc: "2-3 LORs from professors or employers" },
              { icon: Wallet, label: "Proof of Funds", desc: "Bank statements, loan sanction letter, scholarship proof" },
              { icon: Receipt, label: "Financial Documents", desc: "Affidavit of support, sponsor letter, ITR (if applicable)" },
              { icon: FileCheck, label: "Passport", desc: "Valid for at least 6 months beyond travel date" },
              { icon: Heart, label: "Medical Certificate", desc: "Health checkup + vaccination records" },
              { icon: Shield, label: "Police Clearance", desc: " PCC from local police station" },
              { icon: MapPin, label: "Passport Photos", desc: "Recent passport-size photos (visa specifications)" },
            ].map((doc, idx) => (
              <FadeIn key={doc.label} delay={idx * 0.03}>
                <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-3.5 hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <doc.icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{doc.label}</h4>
                    <p className="text-xs text-slate-500">{doc.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          </div>
      </section>

      {/* ═══════════ CAREER OUTCOMES (PREMIUM) ═══════════ */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(13,148,136,0.4),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <FadeIn>
            <div className="text-center mb-10">
              <Badge className="bg-white/10 text-white mb-3 px-4 py-1.5 border border-white/20"><Briefcase className="mr-1.5 h-3.5 w-3.5" />Career Outcomes</Badge>
              <h2 className="text-3xl font-bold text-white lg:text-4xl">Where Graduates Work</h2>
              <p className="mt-2 text-gray-400 max-w-xl mx-auto">Top roles, salaries by country, and hiring companies</p>
            </div>
          </FadeIn>
          <div className="space-y-3 max-w-5xl mx-auto">
              {course.careerPaths?.map((career, idx) => (
                <FadeIn key={career.role} delay={idx * 0.08}>
                  <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                    <CardContent className="p-5">
                      <div className="grid lg:grid-cols-12 gap-4 items-center">
                        <div className="lg:col-span-3 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{career.role}</h4>
                            <p className="text-xs text-gray-400">Starting Salary</p>
                          </div>
                        </div>
                        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[{ label: "USA", val: career.salaryUSA }, { label: "Canada", val: career.salaryCanada }, { label: "UK", val: career.salaryUK }, { label: "Germany", val: career.salaryGermany }].filter(s => s.val && s.val !== "—").map(s => (
                            <div key={s.label} className="text-center">
                              <p className="text-[10px] text-gray-500 font-mono uppercase">{s.label}</p>
                              <p className="text-sm font-bold text-amber-400">{s.val}</p>
                            </div>
                          ))}
                        </div>
                        <div className="lg:col-span-3">
                          <div className="flex flex-wrap gap-1.5">
                            {career.companies?.map(c => (
                              <span key={c} className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded text-gray-300">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      {course.faqs && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <Badge className="bg-teal-100 text-teal-700 mb-3 px-4 py-1.5"><Lightbulb className="mr-1.5 h-3.5 w-3.5" />FAQs</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
              </div>
            </FadeIn>
            <div className="space-y-3">
              {course.faqs.map((faq, idx) => (
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

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(245,158,11,0.3),transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <FadeIn>
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your {course.title} Journey?</h2>
            <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">Get matched with verified consultants who specialize in {course.title} admissions. Free consultation, no obligation.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#lead-form"><Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-xl font-semibold text-base">Get Free Guidance <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link to="/evaluate"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl"><Zap className="mr-2 h-5 w-5" /> Find Best Country</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ STICKY PREMIUM BAR ═══════════ */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/10 z-50">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"><Crown className="w-4 h-4 text-white" /></div>
              <div>
                <p className="text-sm font-bold text-white">Unlock full salary data & consultant contacts</p>
                <p className="text-xs text-gray-400">Country-specific guides · Scholarship deadlines · Visa roadmaps</p>
              </div>
            </div>
            <Link to="/premium" onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 text-sm">
                <Crown className="w-4 h-4 mr-1.5" /> Get Premium
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className={isAuthenticated ? "" : "pb-16"}><Footer /></div>
    </div>
  );
}
