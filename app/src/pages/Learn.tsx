import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, FileText, Shield, Banknote, Calculator, MapPin, Globe,
  Lock, Clock, ArrowRight, Sparkles, GraduationCap, ChevronLeft,
  CheckCircle, Crown, Lightbulb, PlayCircle, LockOpen,
  ChevronRight, Check, Zap, Star, Target, Trophy, Flame,
  Award, TrendingUp, CircleDot, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PremiumGate } from "@/components/PremiumGate";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { learnArticles, learnCategories } from "@/data/learnData";
import type { LearnArticle } from "@/data/learnData";

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
   LIST VIEW — DARK GAMIFIED
   ═══════════════════════════════════════════════════════════════ */
export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = useMemo(
    () => activeCategory === "all" ? learnArticles : learnArticles.filter(a => a.category === activeCategory),
    [activeCategory]
  );

  const freeCount = learnArticles.filter(a => !a.premiumLocked).length;
  const premiumCount = learnArticles.filter(a => a.premiumLocked).length;
  const totalXP = learnArticles.reduce((acc, a) => acc + a.content.sections.length * 50 + 100, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero — Dark */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-medium mb-6">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Knowledge Hub</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 text-xs font-bold">{totalXP} XP Available</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Study Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#14b8a6]">Quest Log</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Complete interactive quests, earn XP, and unlock expert guides curated for Indian students going abroad.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: BookOpen, label: "Guides", value: learnArticles.length, color: "text-blue-400" },
                { icon: Sparkles, label: "Free Quests", value: freeCount, color: "text-emerald-400" },
                { icon: Lock, label: "Premium", value: premiumCount, color: "text-amber-400" },
                { icon: Zap, label: "Total XP", value: totalXP, color: "text-purple-400" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-sm font-bold text-white">{s.value}</span>
                  <span className="text-xs text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter — Dark Pills */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {learnCategories.map(cat => {
            const count = cat.id === "all" ? learnArticles.length : learnArticles.filter(a => a.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#0d9488] text-white shadow-lg shadow-[#0d9488]/20"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                {cat.label}
                <span className={`text-xs ml-1.5 ${isActive ? "text-white/60" : "text-slate-600"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Article Cards — Dark Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredArticles.map((article, idx) => {
            const Icon = iconMap[article.icon] || BookOpen;
            const colors = categoryColors[article.category] || categoryColors.prep;
            const isLocked = article.premiumLocked;
            const questCount = article.content.sections.length;
            const articleXP = questCount * 50 + 100;

            return (
              <Link
                to={`/learn/${article.id}`}
                key={article.id}
                className={`group block rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] ${
                  isLocked
                    ? "border-slate-800 bg-slate-900/40 hover:border-amber-400/30 hover:bg-slate-900/60"
                    : "border-slate-800 bg-slate-900/60 hover:border-[#0d9488]/30 hover:bg-slate-900 hover:shadow-xl hover:shadow-[#0d9488]/5"
                }`}
              >
                {/* Top Row: Icon + Badges */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isLocked && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
                        <Lock className="w-3 h-3" /> Premium
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded-lg border border-purple-400/20">
                      <Zap className="w-3 h-3" /> {articleXP} XP
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[#0d9488] transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                {/* Footer: Category + Quests + Read Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${colors.bg} ${colors.text}`}>
                      {categoryLabelMap[article.category]}
                    </span>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1">
                      <Target className="w-3 h-3" /> {questCount} quests
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                {/* CTA Arrow */}
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0d9488] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isLocked ? "Unlock Quest" : "Start Quest"}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-[#0d9488] transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No quests found</h3>
            <p className="text-slate-600">Try selecting a different category.</p>
          </div>
        )}
      </section>

      {/* Bottom CTA — Dark */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d9488]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/20 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 text-[#0d9488]" />
              <span className="text-[#0d9488]">Ready to Level Up?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Complete Quests. Earn XP. <span className="text-amber-400">Go Abroad.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Create your profile and get AI-matched with the best study abroad consultants for your goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/evaluate">
                <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-8 py-6 text-base font-bold shadow-lg shadow-[#0d9488]/20">
                  <Zap className="w-5 h-5 mr-2" /> Run Decision Engine
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl px-6 py-6 text-base font-semibold">
                  <GraduationCap className="w-5 h-5 mr-2" /> Create Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
