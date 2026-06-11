import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PremiumGate } from "@/components/PremiumGate";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { learnArticles } from "@/data/learnData";
import type { LearnArticle } from "@/data/learnData";

import {
  BookOpen, FileText, Shield, Banknote, Calculator, MapPin, Globe,
  Lock, Clock, ArrowRight, Sparkles, ChevronLeft,
  CheckCircle, Crown, Lightbulb, LockOpen,
  ChevronRight, Check, Zap, Star, Target, Trophy, Flame, Award,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, FileText, Shield, Banknote, Calculator, MapPin, Globe,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  prep:       { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", glow: "shadow-blue-500/10" },
  application:{ bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "shadow-purple-500/10" },
  visa:       { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" },
  finance:    { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "shadow-amber-500/10" },
  career:     { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", glow: "shadow-rose-500/10" },
};

const categoryLabelMap: Record<string, string> = {
  prep: "Test Prep", application: "Application", visa: "Visa & Immigration",
  finance: "Finance", career: "Career & PR",
};

/* ═══════════════════════════════════════════════════════════════
   ARTICLE DETAIL PAGE — DARK GAMIFIED (STANDALONE)
   ═══════════════════════════════════════════════════════════════ */
export default function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = useMemo(() => learnArticles.find(a => a.id === articleId), [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
          <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-white mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-8">The guide you're looking for doesn't exist in our knowledge hub.</p>
          <Link to="/learn">
            <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-6">
              <ArrowRight className="w-4 h-4 mr-2" /> Browse All Guides
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <ArticleDetailContent article={article} />;
}

function ArticleDetailContent({ article }: { article: LearnArticle }) {
  const { user } = useLocalAuth();
  const isPremium = user?.isPremium || false;
  const isLocked = article.premiumLocked && !isPremium;
  const Icon = iconMap[article.icon] || BookOpen;
  const colors = categoryColors[article.category] || categoryColors.prep;

  /* Gamified state */
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const totalXP = completedSteps.length * 50 + (completedSteps.length === article.content.sections.length ? 100 : 0);
  const allDone = completedSteps.length === article.content.sections.length;
  const progress = (completedSteps.length / article.content.sections.length) * 100;

  /* Show first section if locked (free preview) */
  const visibleSections = isLocked ? article.content.sections.slice(0, 1) : article.content.sections;

  const toggleComplete = (idx: number) => {
    if (isLocked && idx > 0) return;
    setCompletedSteps(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const sectionKeywords = article.content.sections.map(s => s.heading).join(", ");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Dynamic SEO */}
      <SEO
        title={`${article.title} — Study Abroad Guide | Kohortconnect`}
        description={`${article.excerpt} Complete guide for Indian students: ${sectionKeywords}. Read time: ${article.readTime}.`}
        keywords={`study abroad, ${article.title}, ${categoryLabelMap[article.category]}, Indian students, ${article.content.sections.map(s => s.heading).join(", ")}`}
      />

      {/* XP Progress Bar — fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0d9488] to-[#14b8a6]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <Navbar />

      {/* Sticky Nav */}
      <div className="sticky top-1 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/learn" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-400">{totalXP} XP</span>
            </div>
            <Badge className={`${colors.bg} ${colors.text} ${colors.border} text-[10px] border`}>
              {categoryLabelMap[article.category]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Quest Log</span>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" /> {article.readTime}
                <span className="text-slate-700">·</span>
                <span>{article.content.sections.length} quests</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* XP Progress */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400">
                Level {Math.min(completedSteps.length + 1, article.content.sections.length)} of {article.content.sections.length}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-3 h-3" /> {totalXP} XP
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#14b8a6]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Free Preview Banner (if locked) */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl bg-amber-400/5 border border-amber-400/15 p-4 flex items-center gap-3"
          >
            <LockOpen className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-300">Free Preview — Quest 1 of {article.content.sections.length}</p>
              <p className="text-xs text-amber-400/60">Complete the first quest. Unlock all with Premium.</p>
            </div>
          </motion.div>
        )}

        {/* Quest Cards */}
        <div className="space-y-3">
          {visibleSections.map((section, idx) => {
            const isCompleted = completedSteps.includes(idx);
            const isExpanded = expandedStep === idx;
            const canExpand = !isLocked || idx === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isCompleted
                    ? "border-[#0d9488]/25 bg-[#0d9488]/5"
                    : isExpanded
                    ? "border-slate-600 bg-slate-900"
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                {/* Quest Header */}
                <div className="p-4 flex items-center gap-3">
                  <button
                    onClick={() => canExpand && toggleComplete(idx)}
                    disabled={!canExpand}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isCompleted
                        ? "bg-[#0d9488] text-white shadow-lg shadow-[#0d9488]/20"
                        : canExpand
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                        : "bg-slate-800/50 text-slate-600 border border-slate-800"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => canExpand && setExpandedStep(isExpanded ? null : idx)}
                      className={`text-sm font-bold leading-snug cursor-pointer ${
                        isCompleted ? "text-[#0d9488]" : isExpanded ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {section.heading}
                    </h3>
                    {isCompleted && (
                      <span className="text-[10px] text-[#0d9488] font-medium">+50 XP</span>
                    )}
                  </div>
                  {canExpand && (
                    <button onClick={() => setExpandedStep(isExpanded ? null : idx)} className="shrink-0">
                      <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                  )}
                  {!canExpand && <Lock className="w-4 h-4 text-slate-600 shrink-0" />}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-[4.5rem]">
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">{section.body}</p>
                        {section.bullets && (
                          <ul className="space-y-2">
                            {section.bullets.map((b, bi) => (
                              <li key={bi} className="flex items-start gap-2 text-xs text-slate-400">
                                <CheckCircle className="w-3.5 h-3.5 text-[#0d9488] shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Key Takeaway Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-6 rounded-2xl border ${allDone ? "border-amber-400/25 bg-amber-400/5" : "border-slate-800 bg-slate-900/50"}`}
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                allDone ? "bg-gradient-to-br from-amber-400 to-amber-500" : "bg-slate-800"
              }`}>
                <Award className={`w-6 h-6 ${allDone ? "text-white" : "text-slate-600"}`} />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${allDone ? "text-amber-300" : "text-slate-500"}`}>
                  {allDone ? "Reward Unlocked!" : "Complete All Quests to Unlock"}
                </h4>
                <p className="text-[10px] text-slate-500">Key Takeaway · +100 XP bonus</p>
              </div>
            </div>

            <AnimatePresence>
              {(allDone || !isLocked) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    {article.content.keyTakeaway}
                  </p>
                  {allDone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 flex items-center justify-center"
                    >
                      <Badge className="bg-amber-400 text-slate-900 border-0 font-bold">
                        <Star className="w-3 h-3 mr-1 fill-slate-900" /> +100 XP Bonus!
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Premium Gate (if locked) */}
        {isLocked && (
          <div className="mt-6">
            <PremiumGate
              title="Unlock Full Quest Log"
              subtitle={`Get all ${article.content.sections.length} quests for "${article.title}" and all premium guides.`}
            />
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-bold">Find Universities for This Goal</span>
          </div>
          <p className="text-xs text-white/70 mb-3">Run the Decision Engine to see which destinations match your profile.</p>
          <Link to="/evaluate">
            <button className="w-full py-2.5 bg-white text-[#0d9488] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <Zap className="w-4 h-4" /> Run Decision Engine <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
