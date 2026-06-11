import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen, ChevronLeft, Clock, Lock, CheckCircle, Lightbulb,
  ChevronDown, ChevronUp, Sparkles, Zap, Star, Crown,
  ArrowRight, Target, LockOpen, Award, TrendingUp,
  CircleDot, Check, Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ═══════ SHARED ARTICLE DATA: GRE 60-Day Master Plan ═══════ */
const article = {
  id: "gre-60-day",
  title: "GRE General Test: 60-Day Master Plan for a 320+ Score",
  category: "Test Prep",
  readTime: "13 min read",
  excerpt: "A 320+ GRE score opens doors to top 50 universities. The key is consistent daily practice — 2 hours for 60 days beats 8 hours for 15 days.",
  keyTakeaway: "A 320+ GRE score opens doors to top 50 universities. The key is consistent daily practice — 2 hours for 60 days beats 8 hours for 15 days. Start vocabulary NOW.",
  sections: [
    {
      heading: "Understanding the GRE Format",
      body: "The GRE General Test has three sections: Verbal Reasoning (130-170), Quantitative Reasoning (130-170), and Analytical Writing (0-6). The test is section-level adaptive — your performance on the first section determines the difficulty of the second. Total score range: 260-340.",
      bullets: [
        "Verbal: 2 sections, 27 questions each, 41 minutes — tests vocabulary, reading comprehension, text completion",
        "Quant: 2 sections, 27 questions each, 47 minutes — algebra, arithmetic, geometry, data analysis",
        "AWA: 1 essay (Analyze an Issue), 30 minutes — tests critical thinking and writing",
        "Experimental section: Unscored, used for ETS research — you won't know which one it is",
      ],
    },
    {
      heading: "Days 1-15: Foundation Phase",
      body: "Start with vocabulary and quant fundamentals. This phase builds the base that everything else rests on. Do NOT skip vocabulary — it's 50% of your verbal score.",
      bullets: [
        "Learn 30 Magoosh vocab words daily using spaced repetition (Anki app)",
        "Complete Manhattan 5lb book — Quant chapters 1-10 (arithmetic, algebra)",
        "Write 2 AWA essays weekly — use official ETS prompts only",
        "Take 1 diagnostic full-length test to identify weak areas",
        "Target: 150+ on both Verbal and Quant diagnostic",
      ],
    },
    {
      heading: "Days 16-35: Build Phase",
      body: "Now that fundamentals are solid, increase difficulty. Focus on your weak areas from the diagnostic. This is where most score improvement happens.",
      bullets: [
        "Continue 20 vocab words daily + review previous 300 words",
        "Complete Manhattan 5lb — remaining quant + all verbal sections",
        "Start official ETS practice book — verbal reasoning questions",
        "Take weekly full-length tests (ETS PowerPrep 1 & 2)",
        "Review EVERY mistake — maintain an error log spreadsheet",
        "Target: 155+ on both sections by Day 35",
      ],
    },
    {
      heading: "Days 36-60: Sprint Phase",
      body: "Final push. Focus on test strategy, timing, and full-length stamina. Simulate test-day conditions. Cut out all new material — only review and practice tests now.",
      bullets: [
        "2 full-length timed tests per week (Saturdays & Wednesdays)",
        "Review error log daily — focus on recurring mistake patterns",
        "AWA: Write 3 timed essays per week — aim for 4.0+ score",
        "Fine-tune pacing: Verbal 90 sec/question, Quant 105 sec/question",
        "Final 3 days: Light review only — no new material, sleep 8 hours",
        "Target: 162+ Quant, 158+ Verbal = 320+ total",
      ],
    },
  ],
};

/* ═══════ CONCEPT A: INTERACTIVE CARD STACK ═══════ */
function ConceptA() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [keyOpen, setKeyOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/learn" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0d9488]">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <Badge className="bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/20 text-[10px]">CONCEPT A</Badge>
        </div>
      </div>

      {/* Hero Title */}
      <div className="px-5 pt-6 pb-4">
        <Badge className="bg-blue-100 text-blue-700 text-[10px] mb-3">TEST PREP</Badge>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {article.sections.length} sections</span>
        </div>
      </div>

      {/* Key Takeaway — Flip Card */}
      <div className="px-5 mb-4">
        <motion.div
          onClick={() => setKeyOpen(!keyOpen)}
          className="rounded-2xl bg-gradient-to-br from-[#0d9488]/5 to-[#14b8a6]/10 border border-[#0d9488]/15 overflow-hidden cursor-pointer"
          layout
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0d9488]/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0d9488]" />
              </div>
              <span className="text-sm font-bold text-[#0d9488]">Key Takeaway</span>
            </div>
            <motion.div animate={{ rotate: keyOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-[#0d9488]" />
            </motion.div>
          </div>
          <AnimatePresence>
            {keyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{article.keyTakeaway}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Section Navigation Dots */}
      <div className="px-5 mb-4">
        <div className="flex gap-2">
          {article.sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setExpandedCard(expandedCard === i ? null : i)}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                expandedCard === i ? "bg-[#0d9488]" : expandedCard !== null && i < expandedCard ? "bg-[#0d9488]/40" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stacked Cards */}
      <div className="px-5 pb-8 space-y-3">
        {article.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              expandedCard === idx
                ? "border-[#0d9488]/30 shadow-lg shadow-[#0d9488]/5"
                : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
            }`}
          >
            {/* Card Header */}
            <button
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              className="w-full p-4 flex items-center gap-3 text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                expandedCard === idx ? "bg-[#0d9488] text-white" : "bg-[#0d9488]/10 text-[#0d9488]"
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{section.heading}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">{section.bullets.length} key points</p>
              </div>
              <motion.div
                animate={{ rotate: expandedCard === idx ? 180 : 0 }}
                className="shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedCard === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                    {section.body && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{section.body}</p>
                    )}
                    <ul className="space-y-2">
                      {section.bullets.map((b, bi) => (
                        <motion.li
                          key={bi}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: bi * 0.08 }}
                          className="flex items-start gap-2.5 text-sm text-gray-700"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#0d9488]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#0d9488]" />
                          </div>
                          <span className="leading-relaxed">{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-bold">Ready to Test Yourself?</span>
          </div>
          <p className="text-xs text-white/80 mb-3">Run our Decision Engine to find universities that match your target GRE score.</p>
          <Link to="/evaluate">
            <button className="w-full py-2.5 bg-white text-[#0d9488] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Evaluate Profile <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════ CONCEPT B: IMMERSIVE TIMELINE ═══════ */
function ConceptB() {
  const [activeNode, setActiveNode] = useState<number>(0);
  const scrollProgress = ((activeNode + 1) / article.sections.length) * 100;

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
        <motion.div
          className="h-full bg-[#0d9488]"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Dark Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#0d9488]/30 pt-16 pb-10 px-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0d9488]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <Link to="/learn" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <Badge className="bg-white/10 text-white border-white/20 text-[10px]">CONCEPT B</Badge>
          </div>

          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] mb-3">TEST PREP</Badge>

          <h1 className="text-2xl font-extrabold text-white leading-tight mb-3">
            GRE 60-Day<br />Master Plan
          </h1>

          <div className="flex items-center gap-3">
            <div className="bg-amber-400/20 border border-amber-400/30 rounded-xl px-3 py-1.5">
              <span className="text-xs font-bold text-amber-300">320+ Score Target</span>
            </div>
            <span className="text-xs text-white/50 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-8 relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200" />
        <motion.div
          className="absolute left-8 top-8 w-0.5 bg-[#0d9488] origin-top"
          animate={{ scaleY: scrollProgress / 100 }}
          style={{ height: "100%" }}
        />

        {/* Timeline Nodes */}
        <div className="space-y-6 relative">
          {article.sections.map((section, idx) => {
            const isActive = activeNode === idx;
            const isCompleted = idx < activeNode;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="flex gap-4"
              >
                {/* Node Dot */}
                <button
                  onClick={() => setActiveNode(idx)}
                  className="relative z-10 shrink-0"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isCompleted || isActive ? "#0d9488" : "#e5e7eb",
                    }}
                    className="w-7 h-7 rounded-full border-4 border-white shadow-md flex items-center justify-center"
                  >
                    {(isCompleted || isActive) && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </motion.div>
                </button>

                {/* Content Card */}
                <motion.div
                  onClick={() => setActiveNode(idx)}
                  animate={{
                    backgroundColor: isActive ? "#f0fdfa" : "#ffffff",
                    borderColor: isActive ? "#0d948833" : "#f3f4f6",
                  }}
                  className="flex-1 rounded-2xl border p-4 cursor-pointer transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isActive ? "text-[#0d9488]" : "text-gray-400"
                    }`}>
                      Phase {idx + 1}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[#0d9488]"
                      />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{section.heading}</h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        {section.body && (
                          <p className="text-sm text-gray-600 leading-relaxed mb-3 mt-2">{section.body}</p>
                        )}
                        <ul className="space-y-2">
                          {section.bullets.map((b, bi) => (
                            <motion.li
                              key={bi}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bi * 0.06 }}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CircleDot className="w-3.5 h-3.5 text-[#0d9488] mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{b}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <p className="text-[11px] text-gray-400 mt-1">{section.bullets.length} key points</p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Takeaway — Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-300/30 p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-700">Key Takeaway</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{article.keyTakeaway}</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-bold">Find Your Target Universities</span>
          </div>
          <p className="text-xs text-white/80 mb-3">See which universities accept your GRE score range.</p>
          <Link to="/evaluate">
            <button className="w-full py-2.5 bg-white text-[#0d9488] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Run Decision Engine <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════ CONCEPT C: GAMIFIED PROGRESS ═══════ */
function ConceptC() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const currentLevel = completedSteps.length;
  const xp = currentLevel * 50;
  const allDone = currentLevel === article.sections.length;

  const toggleComplete = (idx: number) => {
    setCompletedSteps(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-gray-50 to-white min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/learn" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0d9488]">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-[10px]">CONCEPT C</Badge>
        </div>
      </div>

      {/* Gamified Progress Header */}
      <div className="px-5 pt-6 pb-4">
        {/* Level + XP Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-600">Level {Math.min(currentLevel + 1, article.sections.length)} of {article.sections.length}</span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Zap className="w-3 h-3" /> {xp} XP
              </span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#14b8a6]"
                animate={{ width: `${((currentLevel) / article.sections.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <Badge className="bg-blue-100 text-blue-700 text-[10px] mb-2">TEST PREP</Badge>
        <h1 className="text-xl font-extrabold text-gray-900 leading-tight mb-1">
          {article.title}
        </h1>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {article.readTime} · Complete all {article.sections.length} quests
        </p>
      </div>

      {/* Quest Cards */}
      <div className="px-5 pb-6 space-y-3">
        {article.sections.map((section, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isExpanded = expandedStep === idx;
          const isLocked = idx > 0 && !completedSteps.includes(idx - 1) && !isCompleted;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                isCompleted
                  ? "border-[#0d9488]/30 bg-[#f0fdfa] shadow-sm"
                  : isLocked
                  ? "border-gray-100 bg-gray-50 opacity-70"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {/* Quest Header */}
              <div className="p-4 flex items-center gap-3">
                {/* Status Icon */}
                <button
                  onClick={() => !isLocked && toggleComplete(idx)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isCompleted
                      ? "bg-[#0d9488] text-white"
                      : isLocked
                      ? "bg-gray-200 text-gray-400"
                      : "bg-[#0d9488]/10 text-[#0d9488] hover:bg-[#0d9488]/20"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{idx + 1}</span>
                  )}
                </button>

                {/* Title + Subtitle */}
                <div className="flex-1 min-w-0" onClick={() => !isLocked && setExpandedStep(isExpanded ? null : idx)}>
                  <h3 className={`text-sm font-bold leading-snug ${isCompleted ? "text-[#0d9488] line-through decoration-2" : "text-gray-900"}`}>
                    {section.heading}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{section.bullets.length} tasks</p>
                </div>

                {/* Expand / Action */}
                {!isCompleted && !isLocked && (
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : idx)}
                    className="shrink-0 px-3 py-1.5 bg-[#0d9488] text-white rounded-lg text-[11px] font-bold hover:bg-[#0f766e] transition-colors"
                  >
                    {isExpanded ? "Close" : "Start"}
                  </button>
                )}
                {isCompleted && (
                  <div className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-[#0d9488]">
                    <Check className="w-3.5 h-3.5" /> Done
                  </div>
                )}
              </div>

              {/* Expandable Quest Details */}
              <AnimatePresence>
                {isExpanded && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      {section.body && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{section.body}</p>
                      )}
                      <ul className="space-y-2">
                        {section.bullets.map((b, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: bi * 0.06 }}
                            className="flex items-start gap-2.5 text-sm text-gray-700"
                          >
                            <div className="w-5 h-5 rounded bg-[#0d9488]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-[#0d9488]">{bi + 1}</span>
                            </div>
                            <span className="leading-relaxed">{b}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Complete Button */}
                      <button
                        onClick={() => { toggleComplete(idx); setExpandedStep(null); }}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:from-[#0f766e] transition-all"
                      >
                        <Check className="w-4 h-4" /> Mark Complete (+50 XP)
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Reward Card — Key Takeaway */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: allDone ? 1 : 0.5, scale: 1 }}
          className={`rounded-2xl border overflow-hidden transition-all ${
            allDone
              ? "border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-lg shadow-amber-200/50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                allDone ? "bg-gradient-to-br from-amber-400 to-amber-500" : "bg-gray-200"
              }`}>
                <Award className={`w-6 h-6 ${allDone ? "text-white" : "text-gray-400"}`} />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${allDone ? "text-amber-700" : "text-gray-400"}`}>
                  {allDone ? "Reward Unlocked!" : "Complete All Quests to Unlock"}
                </h4>
                <p className="text-[10px] text-gray-500">Key Takeaway · +100 XP bonus</p>
              </div>
            </div>

            <AnimatePresence>
              {allDone && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-700 leading-relaxed bg-white/60 rounded-xl p-3 border border-amber-200/50">
                    {article.keyTakeaway}
                  </p>
                  <div className="mt-3 flex items-center justify-center">
                    <Badge className="bg-amber-400 text-white border-0 font-bold">
                      <Star className="w-3 h-3 mr-1 fill-white" /> +100 XP Bonus Earned!
                    </Badge>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Final CTA */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] p-5 text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-bold">Quest Complete!</span>
            </div>
            <p className="text-xs text-white/80 mb-3">You have earned {xp + 100} XP. Now find universities that match your GRE goals.</p>
            <Link to="/evaluate">
              <button className="w-full py-2.5 bg-white text-[#0d9488] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <Target className="w-4 h-4" /> Find Universities <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════ COMPARISON WRAPPER ═══════ */
export default function LearnCompare() {
  const [activeConcept, setActiveConcept] = useState<"A" | "B" | "C">("A");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Comparison Header */}
      <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-purple-100 text-purple-700 text-[10px]">DESIGN COMPARISON</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            3 Ways to Experience the Same Article
          </h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Same content — "GRE General Test: 60-Day Master Plan for a 320+ Score". Three different interactive experiences. Tap each tab to compare.
          </p>

          {/* Concept Selector */}
          <div className="flex gap-2 mt-5">
            {([
              { key: "A" as const, label: "Card Stack", color: "#0d9488", desc: "Clean, expandable cards" },
              { key: "B" as const, label: "Timeline", color: "#1e293b", desc: "Visual reading journey" },
              { key: "C" as const, label: "Gamified", color: "#7c3aed", desc: "Quests, XP, rewards" },
            ]).map(c => (
              <button
                key={c.key}
                onClick={() => setActiveConcept(c.key)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-left transition-all border ${
                  activeConcept === c.key
                    ? "border-transparent shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                style={activeConcept === c.key ? { backgroundColor: `${c.color}10`, borderColor: `${c.color}40` } : {}}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs font-bold" style={{ color: c.color }}>Concept {c.key}</span>
                </div>
                <p className="text-[11px] text-gray-500">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Active Concept */}
      <div className="py-6 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <AnimatePresence mode="wait">
            {activeConcept === "A" && (
              <motion.div
                key="A"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <ConceptA />
              </motion.div>
            )}
            {activeConcept === "B" && (
              <motion.div
                key="B"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <ConceptB />
              </motion.div>
            )}
            {activeConcept === "C" && (
              <motion.div
                key="C"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <ConceptC />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
