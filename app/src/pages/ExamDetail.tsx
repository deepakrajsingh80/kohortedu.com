import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getExamDetail } from "@/data/examDetails";
import { getInstitutesForExam } from "@/data/trainingInstitutes";
import type { ExamDetail as ExamDetailType } from "@/data/examDetails";

import {
  Clock, Wallet, Target, Calendar, Repeat, Globe, Layers,
  Star, BookOpen, FileText, Users, ChevronDown, ChevronRight,
  ArrowRight, CheckCircle, MessageCircle, Phone, Mail, MapPin,
  Award, Lightbulb, ExternalLink, Download, PlayCircle, UserCheck,
  Zap, TrendingUp, Shield, Sparkles, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  Clock, Wallet, Target, Calendar, Repeat, Globe, Layers,
  Star, BookOpen, FileText, Users, ChevronDown, ChevronRight,
  ArrowRight, CheckCircle, MessageCircle, Phone, Mail, MapPin,
  Award, Lightbulb, ExternalLink, Download, PlayCircle, UserCheck,
  Zap, TrendingUp, Shield, Sparkles, GraduationCap,
};

/* ─── Lead Form Component ─── */
function LeadForm({ examName }: { examName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", targetScore: "" });

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Thank You!</h3>
        <p className="text-sm text-emerald-700">Our {examName} experts will contact you within 24 hours with a personalized study plan and coaching recommendations.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0d9488]/5 to-amber-50 rounded-2xl border border-[#0d9488]/10 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#0d9488]" /> Get Free {examName} Study Plan
      </h3>
      <p className="text-sm text-gray-600 mb-5">Connect with top coaching institutes. Get personalized guidance, fee discounts, and a structured preparation timeline.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="form-input text-sm" />
        <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="form-input text-sm" />
        <input type="tel" placeholder="Phone *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="form-input text-sm" />
        <input type="text" placeholder="City *" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="form-input text-sm" />
        <input type="text" placeholder={`Target ${examName} Score`} value={form.targetScore} onChange={e => setForm({...form, targetScore: e.target.value})} className="form-input text-sm" />
        <Button onClick={() => setSubmitted(true)} className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl text-sm font-bold h-10">
          Get Free Study Plan <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
        <Shield className="w-3 h-3" /> Your information is secure. No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

/* ─── Section Card ─── */
function SectionCard({ title, icon: Icon, children, className = "" }: { title: string; icon: any; children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#0d9488]" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors">
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform mt-0.5 ${open ? "rotate-180" : ""}`} />
        <span className="text-sm font-semibold text-gray-800">{q}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pl-12">
              <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ExamDetail() {
  const { examId } = useParams<{ examId: string }>();
  const exam = useMemo(() => examId ? getExamDetail(examId) : null, [examId]);
  const institutes = useMemo(() => examId ? getInstitutesForExam(examId) : [], [examId]);
  const [activePrepTab, setActivePrepTab] = useState<"timeline" | "resources" | "books">("timeline");

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Exam Not Found</h1>
          <p className="text-gray-600 mb-6">The exam you're looking for doesn't exist in our database.</p>
          <Link to="/exams">
            <Button className="bg-[#0d9488] text-white rounded-xl">Back to Exam Hub</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedExams = exam.relatedExams.map(id => getExamDetail(id)).filter(Boolean) as ExamDetailType[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#f0fdfa]">
      <SEO
        title={`${exam.name} (${exam.fullName}) — Complete Guide for Indian Students`}
        description={`${exam.tagline}. Exam pattern, registration steps, preparation timeline, free resources, coaching centres, scoring guide, and FAQs for ${exam.name} in India.`}
        keywords={`${exam.name}, ${exam.fullName}, ${exam.name} India, ${exam.name} exam, study abroad ${exam.name}, ${exam.name} preparation, ${exam.name} coaching, ${exam.name} registration, ${exam.name} syllabus, ${exam.name} pattern`}
      />
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-24 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0f4a45]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d9488]/30 border border-[#0d9488]/50 text-[#5eead4] text-sm font-medium mb-5">
              <GraduationCap className="w-4 h-4" /> Exam Guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
              {exam.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">({exam.fullName})</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">{exam.tagline}</p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {exam.heroStats.map((s, i) => {
                const Icon = iconMap[s.icon] || Star;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 p-3 text-center">
                    <Icon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        {/* ─── WHY THIS EXAM ─── */}
        <SectionCard title={`Why ${exam.name} for Indian Students?`} icon={Lightbulb}>
          <div className="grid sm:grid-cols-2 gap-3">
            {exam.whyThisExam.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{w}</span>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ─── EXAM PATTERN ─── */}
        <SectionCard title="Exam Pattern & Structure" icon={FileText}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Section</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Questions</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Marks/Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Topics</th>
                </tr>
              </thead>
              <tbody>
                {exam.examPattern.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 px-4 font-semibold text-gray-900">{p.section}</td>
                    <td className="py-3 px-4 text-gray-600">{p.questions}</td>
                    <td className="py-3 px-4 text-gray-600">{p.duration}</td>
                    <td className="py-3 px-4 text-[#0d9488] font-medium">{p.marks}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs max-w-xs">{p.topics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* ─── SCORING ─── */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Score Range & Interpretation" icon={Target}>
            <div className="space-y-2">
              {exam.scoring.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-amber-600">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{s.label}</p>
                    <p className="text-xs text-gray-600">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ─── REGISTRATION ─── */}
          <SectionCard title="How to Register" icon={ExternalLink}>
            <div className="space-y-3">
              {exam.registrationSteps.map((r) => (
                <div key={r.step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {r.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-600">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ─── PREPARATION ─── */}
        <SectionCard title="Preparation Guide" icon={BookOpen}>
          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-100 mb-4">
            {(["timeline", "resources", "books"] as const).map(t => (
              <button key={t} onClick={() => setActivePrepTab(t)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all ${activePrepTab === t ? "bg-[#0d9488]/5 text-[#0d9488] border-b-2 border-[#0d9488]" : "text-gray-500 hover:text-gray-700"}`}>
                {t === "timeline" ? "Study Timeline" : t === "resources" ? "Free Resources" : "Recommended Books"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activePrepTab === "timeline" && (
              <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {exam.prepTimeline.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">{t.month}</p>
                      <ul className="space-y-1">
                        {t.tasks.map((task, ti) => (
                          <li key={ti} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <CheckCircle className="w-3 h-3 text-[#0d9488] shrink-0 mt-0.5" />{task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {activePrepTab === "resources" && (
              <motion.div key="resources" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-3">
                {exam.freeResources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#0d9488] transition-colors">{r.name}</p>
                      <p className="text-[10px] text-gray-500">{r.type}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0d9488] transition-colors shrink-0" />
                  </a>
                ))}
              </motion.div>
            )}
            {activePrepTab === "books" && (
              <motion.div key="books" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                {exam.books.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{b.name}</p>
                      <p className="text-xs text-gray-500">by {b.author}</p>
                      <Badge className="mt-1 bg-[#0d9488]/5 text-[#0d9488] border-[#0d9488]/10 text-[10px]">{b.bestFor}</Badge>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </SectionCard>
        {/* ─── TIPS ─── */}
        <SectionCard title={`Expert Tips for ${exam.name}`} icon={Zap}>
          <div className="grid sm:grid-cols-2 gap-3">
            {exam.tips.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50">
                <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{t}</span>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* ─── TRAINING INSTITUTES ─── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#0d9488]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Top {exam.name} Coaching Institutes in India</h2>
          </div>

          {institutes.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Coaching institute listings coming soon. Fill the form below to get notified.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {institutes.map((inst, i) => (
                <motion.div key={inst.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="text-base font-bold text-gray-900">{inst.name}</h3>
                          {inst.freeDemo && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px]">Free Demo</Badge>}
                          <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-[10px]">{inst.mode}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{inst.city}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{inst.rating}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{inst.studentsTrained} trained</span>
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" />{inst.avgScoreImprovement}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {inst.highlights.map((h, hi) => (
                            <span key={hi} className="text-[10px] px-2 py-1 rounded-full bg-[#0d9488]/5 text-[#0d9488] border border-[#0d9488]/10">{h}</span>
                          ))}
                        </div>
                        {/* Courses */}
                        <div className="space-y-1">
                          {inst.courses.map((c, ci) => (
                            <div key={ci} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                              <span className="text-gray-700">{c.name} <span className="text-gray-400">({c.duration})</span></span>
                              <span className="font-semibold text-gray-900">{c.fee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Contact */}
                      <div className="sm:w-48 shrink-0 space-y-2">
                        {inst.contact.phone && (
                          <a href={`tel:${inst.contact.phone}`} className="flex items-center gap-2 p-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                            <Phone className="w-3.5 h-3.5" /> Call Now
                          </a>
                        )}
                        {inst.contact.website && (
                          <a href={inst.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> Visit Website
                          </a>
                        )}
                        <p className="text-[10px] text-gray-400 text-center">Batch size: {inst.batchSize}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ─── LEAD FORM ─── */}
        <LeadForm examName={exam.name} />

        {/* ─── FAQ ─── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-[#0d9488]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {exam.faq.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

        {/* ─── RELATED EXAMS ─── */}
        {relatedExams.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#0d9488]" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Related Exams</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedExams.map((re) => (
                <Link key={re.id} to={`/exams/${re.id}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#0d9488]/30 hover:shadow-md transition-all group">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">{re.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{re.fullName}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" />{re.heroStats[0]?.value}
                    <Wallet className="w-3 h-3 ml-2" />{re.heroStats[1]?.value}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── CTA ─── */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0d9488]/30 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Take the {exam.name}?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">Start your preparation with top coaching institutes. Get a personalized study plan, free demo classes, and exclusive fee discounts.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/evaluate">
              <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-6 font-bold">
                <Target className="w-4 h-4 mr-2" /> Find My Study Destination
              </Button>
            </Link>
            <Link to="/exams">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6 font-bold">
                <ArrowRight className="w-4 h-4 mr-2" /> Explore All Exams
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
