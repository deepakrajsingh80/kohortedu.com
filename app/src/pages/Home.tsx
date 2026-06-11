import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationsBanner from "@/components/DestinationsBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useProfile } from "@/context/ProfileContext";
import { trpc } from "@/providers/trpc";

const UniversityGrid = lazy(() => import("@/components/UniversityGrid"));
import {
  Shield,
  Users,
  Brain,
  Clock,
  CheckCircle,
  Globe,
  GraduationCap,
  Star,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  ArrowRight,
  Play,
  Calculator,
  Lock,
  User,
  Crown,
  ChevronRight,
  BarChart3,
  BookOpen,
  MessageSquare,
  Award,
  Percent,
  Lightbulb,
  LayoutDashboard,
  Building2,
} from "lucide-react";

const destinationLabels: Record<string, string> = {
  usa: "USA", canada: "Canada", uk: "UK", australia: "Australia",
  germany: "Germany", ireland: "Ireland", new_zealand: "New Zealand",
  france: "France", dubai: "Dubai", singapore: "Singapore",
  portugal: "Portugal", spain: "Spain", "south-korea": "South Korea",
  malaysia: "Malaysia", switzerland: "Switzerland", "czech-republic": "Czech Republic",
  other: "Other",
};

const courseLabels: Record<string, string> = {
  undergraduate: "Undergraduate", postgraduate: "Postgraduate", phd: "PhD",
  mba: "MBA", diploma: "Diploma", other: "Other",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const } }),
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════ HOME PAGE ═══════════════════════════ */
export default function Home() {
  const { isAuthenticated, user } = useLocalAuth();
  const { setProfile } = useProfile();
  const createLeadMutation = trpc.lead.create.useMutation();
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", destination: "",
    courseInterest: "", preferredIntake: "", city: "",
    budget: 20,
  });
  const [submitted, setSubmitted] = useState(false);

  // Map courseInterest to profile fields
  const courseToProfile = (ci: string) => {
    const levelMap: Record<string, string> = {
      undergraduate: "UG", postgraduate: "PG", phd: "PhD",
      mba: "PG", diploma: "Diploma", other: "PG",
    };
    // Guess major from course interest or destination
    const majorMap: Record<string, string> = {
      undergraduate: "STEM", postgraduate: "STEM", phd: "STEM",
      mba: "Mgmt", diploma: "STEM", other: "STEM",
    };
    return {
      level: levelMap[ci] || "PG",
      major: majorMap[ci] || "STEM",
      courseType: ci === "diploma" ? "Vocational" : "Academic",
    };
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.destination || !formData.courseInterest) return;
    
    // Save lead to backend database
    createLeadMutation.mutate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination as any,
      courseInterest: formData.courseInterest as any,
      preferredIntake: (formData.preferredIntake as any) || "later",
      city: formData.city,
      message: `Preferred budget: ₹${formData.budget} Lakhs`,
    });

    // Save to ProfileContext for personalized journey
    const profileMeta = courseToProfile(formData.courseInterest);
    setProfile({
      budget: formData.budget,
      courseType: profileMeta.courseType as any,
      level: profileMeta.level as any,
      major: profileMeta.major as any,
    });
    
    // Save to localStorage as "started profile"
    localStorage.setItem("kc_profile_draft", JSON.stringify(formData));
    // Also save to admin leads
    try {
      const existing = JSON.parse(localStorage.getItem("kc_leads") || "[]");
      existing.push({
        id: existing.length > 0 ? Math.max(...existing.map((l: any) => l.id)) + 1 : 1,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        courseInterest: formData.courseInterest,
        city: formData.city || "—",
        budget: formData.budget,
        status: "new",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("kc_leads", JSON.stringify(existing));
    } catch { /* ignore */ }
    setSubmitted(true);
    // Auto-login after profile creation — redirect to Decision Engine
    setTimeout(() => {
      localStorage.setItem("kc_user", JSON.stringify({
        id: `u_${Date.now()}`,
        name: formData.fullName,
        email: formData.email,
        isPremium: false,
        joinedAt: new Date().toISOString(),
      }));
      window.location.hash = "#/evaluate";
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO: CREATE PROFILE FOCUSED ===== */}
      <section className="relative min-h-screen overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="/hero-bg.jpg">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/30" />

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Value Prop */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <Badge className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium border border-white/20 mb-6">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Trusted by 2,500+ Students
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
                  Find Your <span className="text-[#0d9488]">Perfect</span> Study Abroad Path
                </h1>
                <p className="text-lg leading-relaxed text-gray-300 max-w-lg mb-8">
                  Create your free profile in 2 minutes. Our AI evaluates your goals across <strong className="text-white">22 countries</strong> and matches you with verified consultants.
                </p>

                {/* Value bullets */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Calculator, text: "Free Decision Engine" },
                    { icon: Shield, text: "100% Verified Consultants" },
                    { icon: Users, text: "AI-Powered Matching" },
                    { icon: Star, text: "4.9/5 Student Rating" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-gray-300">
                      <item.icon className="h-4 w-4 text-[#0d9488] shrink-0" /> {item.text}
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Trusted by <span className="text-[#f59e0b]">2,500+</span> Indian students</p>
                      <p className="text-xs text-gray-400">22 countries &middot; 223 universities &middot; Data-driven guidance</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form (guests) or Welcome Back (logged in) */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
                <Card className="border-0 shadow-2xl shadow-black/30 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6 sm:p-8">
                    {isAuthenticated && user ? (
                      /* Logged-in welcome card */
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0d9488]/10 border-2 border-[#0d9488]/20">
                          <User className="h-8 w-8 text-[#0d9488]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Welcome Back, {user.name?.split(" ")[0] || "Student"}!</h3>
                        <p className="text-sm text-gray-500 mb-6">Your profile is active. Continue your study abroad journey.</p>
                        <div className="space-y-3">
                          <Link to="/dashboard">
                            <Button size="lg" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white h-12 text-base font-semibold rounded-xl shadow-lg shadow-[#0d9488]/25">
                              <LayoutDashboard className="mr-2 h-5 w-5" /> Go to My Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          <div className="grid grid-cols-2 gap-3">
                            <Link to="/evaluate">
                              <Button variant="outline" className="w-full h-10 text-sm rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50">
                                <Calculator className="mr-1.5 h-4 w-4" /> Decision Engine
                              </Button>
                            </Link>
                            <Link to="/premium">
                              <Button variant="outline" className="w-full h-10 text-sm rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50">
                                <Crown className="mr-1.5 h-4 w-4" /> Premium
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : submitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0d9488]">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Created!</h3>
                        <p className="text-gray-600 mb-4">Redirecting to your dashboard...</p>
                        <div className="flex justify-center gap-1">
                          {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="h-2 w-2 rounded-full bg-[#0d9488]" />)}
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-5">
                          <div className="h-10 w-10 rounded-xl bg-[#0d9488] flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Create Your Free Profile</h3>
                            <p className="text-xs text-gray-500">Takes 2 minutes. No credit card needed.</p>
                          </div>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                          {/* Budget slider — the key profile question */}
                          <div className="space-y-2 p-3 bg-teal-50 rounded-xl border border-teal-200">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold text-teal-800">Your Budget (Total) *</Label>
                              <span className="text-sm font-bold text-teal-700">₹{formData.budget} Lakhs</span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="200"
                              step="5"
                              value={formData.budget}
                              onChange={e => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <div className="flex justify-between text-[10px] text-teal-600 font-mono">
                              <span>₹5L</span>
                              <span>₹100L</span>
                              <span>₹200L</span>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">Full Name *</Label>
                              <Input placeholder="Your name" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="h-10 text-sm" required />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">Email *</Label>
                              <Input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="h-10 text-sm" required />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">Phone *</Label>
                              <Input placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="h-10 text-sm" required />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">City *</Label>
                              <Input placeholder="e.g. Delhi" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="h-10 text-sm" required />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">Destination Preference *</Label>
                              <Select value={formData.destination} onValueChange={v => setFormData({ ...formData, destination: v })}>
                                <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                  {Object.entries(destinationLabels).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs text-gray-600">Course Interest *</Label>
                              <Select value={formData.courseInterest} onValueChange={v => setFormData({ ...formData, courseInterest: v })}>
                                <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                  {Object.entries(courseLabels).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <Button type="submit" size="lg" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white h-12 text-base font-semibold rounded-xl shadow-lg shadow-[#0d9488]/25">
                            <Calculator className="mr-2 h-5 w-5" /> Match My Profile <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          <p className="text-[10px] text-teal-600 text-center font-medium -mt-2">
                            Get AI-matched with your best study abroad destinations
                          </p>

                          <p className="text-[10px] text-gray-400 text-center">
                            By creating a profile, you agree to our terms. We never spam.
                          </p>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#0d9488] py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/20" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 2500, suffix: "+", label: "Student Profiles Created", icon: Users },
              { value: 100, suffix: "%", label: "Verified Consultants", icon: Shield },
              { value: 94, suffix: "%", label: "Match Accuracy", icon: Target },
              { value: 89, suffix: "%", label: "Students Satisfied", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeInUp} custom={i} className="text-center">
                <stat.icon className="h-6 w-6 text-teal-200 mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-bold text-white"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></p>
                <p className="mt-1 text-sm text-teal-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS: PROFILE-FIRST JOURNEY ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5"><Zap className="mr-1.5 h-3.5 w-3.5" />Your Journey Starts Here</Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl mb-4">3 Steps to Your Dream University</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">Create your profile. Run the Decision Engine. Get matched. It&apos;s that simple.</p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: User, title: "Create Your Free Profile", desc: "Tell us about your academics, goals, budget, and preferences. Takes 2 minutes. No commitment.", color: "#0d9488", cta: "Get Started Free", href: "#" },
              { step: "02", icon: Calculator, title: "Run the Decision Engine", desc: "Our AI analyzes your profile across 22 countries. See your #3 match free. Unlock #1 & #2 with Premium.", color: "#f59e0b", cta: "Match My Profile", href: "/evaluate" },
              { step: "03", icon: Users, title: "Connect with Consultants", desc: "Get matched with 3 verified consultants specialized in your top destinations. Upgrade to unlock contacts.", color: "#0d9488", cta: "Learn More", href: "/premium" },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full overflow-hidden group">
                    <CardContent className="p-8 relative">
                      <span className="absolute top-4 right-4 text-7xl font-bold opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" style={{ color: item.color }}>{item.step}</span>
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl group-hover:scale-110 transition-transform" style={{ backgroundColor: `${item.color}15` }}>
                        <item.icon className="h-7 w-7" style={{ color: item.color }} />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-5">{item.desc}</p>
                      <Link to={item.href}>
                        <span className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: item.color }}>
                          {item.cta} <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DECISION ENGINE PROMO (SOFT) ===== */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.12)_0%,_transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <Badge className="bg-amber-400/20 text-amber-300 mb-4 px-4 py-1.5 border border-amber-400/30"><Calculator className="mr-1.5 h-3.5 w-3.5" />Free Tool</Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Not Sure Where to Go? <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Let AI Decide.</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Our Decision Engine evaluates your profile across <strong className="text-white">22 countries</strong>, comparing tuition, living costs, part-time earnings, and starting salaries.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: Target, text: "Net OOP = Tuition + Living minus Part-time Earnings" },
                  { icon: TrendingUp, text: "ROI = Starting Salary divided by Net OOP" },
                  { icon: Globe, text: "Compare Government vs Private tracks" },
                  { icon: Lock, text: "Full 17-country table unlocks with Premium (₹999)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/evaluate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-amber-500/25">
                    <Calculator className="mr-2 h-5 w-5" /> Match My Profile <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-bold text-sm">Sample Results</span>
                  <span className="text-gray-500 text-xs ml-auto font-mono">STEM UG Profile</span>
                </div>
                <div className="space-y-3">
                  {[
                    { rank: 1, color: "from-amber-400 to-amber-600", country: "Germany", score: "8.9", netOOP: "Rs -4.3L", roi: "Earn while studying" },
                    { rank: 2, color: "from-slate-400 to-slate-500", country: "Canada", score: "8.4", netOOP: "Rs 26.8L", roi: "PGWP to PR in 3-4 yrs" },
                    { rank: 3, color: "from-orange-400 to-orange-600", country: "Australia", score: "7.6", netOOP: "Rs 14.2L", roi: "PSWV to PR pathway" },
                  ].map(r => (
                    <div key={r.rank} className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${r.color} flex items-center justify-center text-[10px] font-bold text-white`}>{r.rank}</div>
                        <span className="text-white font-bold">{r.country}</span>
                        <span className="text-emerald-400 font-bold text-sm ml-auto">{r.score}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-400">Net OOP: <span className="text-teal-300 font-mono">{r.netOOP}</span></span>
                        <span className="text-gray-500 ml-auto">{r.roi}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Lightbulb className="w-3.5 h-3.5 text-teal-400" />
                  <span>Create your profile to see your personalized rankings.</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS BANNER ===== */}
      <DestinationsBanner />

      {/* ===== FEATURED UNIVERSITIES (DYNAMIC) ===== */}
      <Suspense fallback={null}>
        <UniversityGrid />
      </Suspense>

      {/* ===== AI MATCHING PREVIEW ===== */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5"><Sparkles className="mr-1.5 h-3.5 w-3.5" />AI-Powered Matching</Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl mb-4">How We Match You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our algorithm analyzes 50+ data points to find your ideal consultant. Create a profile to unlock your matches.</p>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Student Profile Card */}
            <ScrollReveal>
              <Card className="border-2 border-[#0d9488]/20 bg-white h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Your Profile</h3>
                      <p className="text-sm text-[#0d9488] font-medium">After you create it</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[{ label: "Academics", value: "GPA, Course, Backlogs" }, { label: "Test Scores", value: "IELTS/TOEFL, GRE/GMAT" }, { label: "Budget", value: "Total spend range" }, { label: "Goals", value: "Destination, PR, Career" }, { label: "Preferences", value: "Intake, Location, Scholarship" }].map(item => (
                      <div key={item.label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500">{item.label}</span><span className="font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* AI Processing */}
            <ScrollReveal delay={0.15} className="hidden lg:flex items-center justify-center">
              <div className="text-center space-y-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-20 w-20 rounded-full bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center mx-auto shadow-lg shadow-[#0d9488]/30">
                  <Brain className="h-10 w-10 text-white" />
                </motion.div>
                <p className="text-sm font-semibold text-[#0d9488]">AI Processing</p>
                <p className="text-xs text-gray-500">50+ data points analyzed</p>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="h-2 w-2 rounded-full bg-[#0d9488]" />)}
                </div>
                <ArrowRight className="h-6 w-6 text-[#0d9488] mx-auto" />
              </div>
            </ScrollReveal>

            {/* Consultant Preview */}
            <ScrollReveal delay={0.3}>
              <Card className="border border-gray-200 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center text-sm font-bold text-white">
                      A
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Consultant A</h3>
                      <p className="text-sm text-gray-500">Canada & USA Tech</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-bold text-[#0d9488]">94%</p>
                      <p className="text-[10px] text-gray-500">MATCH</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                      <span className="font-bold">4.9</span><span className="text-gray-400 text-xs">(Google rated)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ v: "96%", l: "Success" }, { v: "850", l: "Placed" }, { v: "<2h", l: "Response" }].map(s => (
                        <div key={s.l} className="text-center bg-gray-50 rounded-lg p-2">
                          <p className="text-sm font-bold">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/login">
                    <Button className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-sm rounded-lg">
                      <User className="mr-2 h-4 w-4" /> Create Profile to Unlock
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== COURSE BANNERS ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-700 mb-4 px-4 py-1.5"><BookOpen className="mr-1.5 h-3.5 w-3.5" />Explore by Course</Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl mb-4">Find Your <span className="text-[#0d9488]">Perfect Program</span></h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">Detailed guides for every course type.</p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { id: "undergraduate", title: "Undergraduate", subtitle: "Bachelor's Degree", icon: BookOpen, color: "from-blue-500 to-blue-700", duration: "3-4 Years", students: "15,000+" },
              { id: "postgraduate", title: "Postgraduate", subtitle: "Master's Degree", icon: GraduationCap, color: "from-[#0d9488] to-[#0f766e]", duration: "1-2 Years", students: "22,000+" },
              { id: "diploma", title: "Diploma Courses", subtitle: "Short-Term Programs", icon: Award, color: "from-[#f59e0b] to-orange-600", duration: "6-12 Months", students: "8,000+" },
              { id: "pr-pathways", title: "PR Pathways", subtitle: "Study to Residency", icon: Target, color: "from-purple-500 to-purple-700", duration: "Study + Work + PR", students: "10,000+" },
            ].map((course, idx) => (
              <ScrollReveal key={course.id} delay={idx * 0.1}>
                <Link to={`/courses/${course.id}`}>
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card className="border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full group cursor-pointer">
                      <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                            <course.icon className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline" className="text-xs">{course.duration}</Badge>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0d9488] transition-colors">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{course.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 flex items-center gap-1"><Users className="h-3 w-3" /> {course.students} students</span>
                          <span className="text-sm font-medium text-[#0d9488] flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="h-4 w-4" /></span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUE / ROI SECTION (SOFT) ===== */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d9488]/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-white/10 text-white mb-4 px-4 py-1.5 border border-white/20"><BarChart3 className="mr-1.5 h-3.5 w-3.5" />Why Students Trust Us</Badge>
            <h2 className="text-3xl font-bold text-white lg:text-5xl mb-4">Real Results, <span className="text-[#0d9488]">Real Students</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">After creating a profile, students get matched and see real outcomes.</p>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Clock, title: "Save 200+ Hours", subtitle: "Research Time", desc: "No more googling for weeks. Our AI gives you answers in 90 seconds.", stat: "72h", statLabel: "to first match" },
              { icon: Shield, title: "100% Verified", subtitle: "Consultants", desc: "Every consultant is ID-verified, credential-checked, and rated by students.", stat: "4.9/5", statLabel: "average rating" },
              { icon: TrendingUp, title: "Higher Admit Rate", subtitle: "Better Universities", desc: "Matched consultants have 90%+ success rates for your specific profile.", stat: "94%", statLabel: "success rate" },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} custom={i}>
                <motion.div whileHover={{ y: -6 }} className="h-full">
                  <Card className="bg-white/5 border-white/10 text-white h-full hover:bg-white/10 transition-colors">
                    <CardContent className="p-8">
                      <div className="h-12 w-12 rounded-xl bg-[#0d9488]/20 flex items-center justify-center mb-5">
                        <item.icon className="h-6 w-6 text-[#0d9488]" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-[#0d9488] mb-4">{item.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-3xl font-bold text-[#0d9488]">{item.stat}</p>
                        <p className="text-xs text-gray-500">{item.statLabel}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== REVIEWS (SOFT - NO PREMIUM PUSH) ===== */}
      <section className="py-24 bg-[#0d9488]">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center mb-12">
            <Badge className="bg-white/20 text-white mb-4 px-4 py-1.5"><Star className="mr-1.5 h-3.5 w-3.5" />Built for Indian Students</Badge>
            <h2 className="text-3xl font-bold text-white lg:text-5xl mb-4">Everything You Need to Decide</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">No generic advice. No paid promotions. Just data — tuition, salaries, visa rules, PR timelines, and academic requirements for 22 countries.</p>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Calculator, title: "Decision Engine", desc: "Score 22 countries on budget, academics, jobs, safety, visa & PR. See your top 3 matches instantly.", color: "text-amber-400" },
              { icon: BookOpen, title: "Course Database", desc: "195+ universities with programmes, fees, eligibility criteria, and career outcomes by course type.", color: "text-teal-400" },
              { icon: Users, title: "Verified Consultants", desc: "Connect with background-checked consultants specialised in your destination country.", color: "text-blue-400" },
              { icon: GraduationCap, title: "Academic Criteria", desc: "Know the minimum marks you need for each country and university before you apply.", color: "text-emerald-400" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} custom={idx}>
                <Card className="bg-white/10 border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors h-full">
                  <CardContent className="p-5">
                    <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST / WHY US ===== */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <ScrollReveal>
              <img src="/trust-illustration.png" alt="Trust" className="w-full max-w-md mx-auto" />
            </ScrollReveal>
            <div className="space-y-8">
              <ScrollReveal>
                <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">Why Kohortconnect</Badge>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">Trust First. <span className="text-[#0d9488]">Always.</span></h2>
              </ScrollReveal>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
                {[
                  { icon: Shield, title: "100% Background Checked", desc: "Every consultant verified for credentials, track record, and outcomes before joining." },
                  { icon: Star, title: "Google Ratings Visible Upfront", desc: "See real Google ratings and review counts before choosing. No hidden reputations." },
                  { icon: MessageSquare, title: "Free Profile Creation", desc: "Create your profile, run the Decision Engine, and see matches — all before paying a rupee." },
                  { icon: Percent, title: "Pay Only When Ready", desc: "Upgrade to Premium only when you want to unlock consultant contacts. No pressure." },
                ].map((f, i) => (
                  <motion.div key={f.title} variants={fadeInUp} custom={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0d9488]/10">
                      <f.icon className="h-5 w-5 text-[#0d9488]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{f.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOFT PREMIUM CTA (BOTTOM) ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.12)_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="bg-amber-400/20 text-amber-300 mb-6 border border-amber-400/30">
              <Crown className="w-3.5 h-3.5 mr-1.5" /> Optional Upgrade
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Want to Connect with Consultants?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              Everything is free — profile creation, Decision Engine, and matches. Upgrade to Premium only when you want direct consultant contacts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#0d9488]/25">
                <User className="w-5 h-5" /> Create Free Profile First
              </Link>
              <Link to="/premium" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 rounded-xl font-semibold transition-colors">
                <Crown className="w-5 h-5" /> View Premium Details
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-4">Premium is Rs 999 one-time. No subscription.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


