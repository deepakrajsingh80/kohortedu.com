import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Clock,
  ChevronLeft,
  Crown,
  Sparkles,
  Send,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { consultants } from "@/data/consultants";

export default function ProfileBlaster() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d9488] to-[#134e4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <Link
            to="/premium"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Premium
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-4">
                <Crown className="w-4 h-4 text-amber-300" /> Premium Add-On
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Profile Blaster
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-6">
                Send your profile to all {consultants.length} verified consultants in one click. 
                Let them come to you.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                <span className="text-4xl font-bold">₹399</span>
                <span className="text-white/60 line-through text-xl">₹999</span>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-sm font-semibold">
                  60% off with Premium
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link to="/login">
                  <Button className="bg-white text-[#0d9488] hover:bg-gray-100 rounded-xl px-8 py-5 text-base font-bold shadow-xl">
                    <Send className="w-5 h-5 mr-2" /> Get Profile Blaster
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/50">
                Available only for Premium members. One-time purchase.
              </p>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-80 shrink-0"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white/10 rounded-2xl">
                    <Users className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">{consultants.length}</p>
                    <p className="text-xs text-white/70">Consultants</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-2xl">
                    <Clock className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">48h</p>
                    <p className="text-xs text-white/70">Avg. Response</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-2xl">
                    <Shield className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-white/70">Verified</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-2xl">
                    <Zap className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-white/70">Click Send</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            How Profile Blaster Works
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Instead of reaching out to consultants one by one, blast your profile to all of them instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Your Profile",
              desc: "Fill in your academic background, target countries, budget, and preferences. This becomes your digital profile card.",
              icon: Sparkles,
            },
            {
              step: "02",
              title: "One-Click Blast",
              desc: "Hit the send button. Your profile is instantly delivered to all 16 verified consultants via email and WhatsApp.",
              icon: Send,
            },
            {
              step: "03",
              title: "Consultants Come to You",
              desc: "Interested consultants reach out directly with personalized proposals. Compare offers and choose the best fit.",
              icon: Users,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl font-bold text-[#0d9488]/10">{item.step}</span>
              <div className="h-12 w-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center mx-auto -mt-4 mb-4">
                <item.icon className="h-6 w-6 text-[#0d9488]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                What's Included
              </h2>
              <div className="space-y-4">
                {[
                  "Profile sent to all 16 verified consultants",
                  "Delivery via email + WhatsApp for maximum visibility",
                  "Consultants interested in your profile reach out to you",
                  "Average response time: 48 hours",
                  "Compare multiple consultant proposals side by side",
                  "No limit on how many consultants can contact you",
                  "100% verified consultants — no fake profiles",
                  "One-time purchase — works for your entire admissions cycle",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0d9488] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Consultants Who Receive Your Profile
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {consultants.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {c.specialties.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Why Profile Blaster Works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Saves 40+ Hours</p>
                    <p className="text-sm text-slate-400">
                      No more researching, calling, and following up with consultants individually.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Creates Competition</p>
                    <p className="text-sm text-slate-400">
                      When multiple consultants want you, you get better service and pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Reaches Hidden Gems</p>
                    <p className="text-sm text-slate-400">
                      Some of our best consultants don't advertise — but they actively check blaster profiles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-80 shrink-0 text-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
                <p className="text-5xl font-bold text-white mb-2">₹399</p>
                <p className="text-white/60 mb-6">One-time with Premium</p>
                <Link to="/login">
                  <Button className="w-full bg-white text-[#0d9488] hover:bg-gray-100 rounded-xl py-5 font-bold">
                    <Send className="w-5 h-5 mr-2" /> Get Profile Blaster
                  </Button>
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/50">
                  <Lock className="w-4 h-4" /> Premium members only
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Do I need Premium to buy Profile Blaster?",
              a: "Yes. Profile Blaster is an exclusive add-on for Premium members. Purchase Premium (₹999) first, then add Profile Blaster for ₹399.",
            },
            {
              q: "How do consultants contact me?",
              a: "Consultants receive your profile with your contact details and reach out via email or WhatsApp within 48 hours on average.",
            },
            {
              q: "Can I choose which consultants to send to?",
              a: "Your profile goes to all 16 verified consultants by default. This maximizes your chances of finding the perfect match.",
            },
            {
              q: "Is this a one-time or recurring purchase?",
              a: "One-time purchase. Your profile blast is active for your entire admissions cycle (typically 12 months).",
            },
            {
              q: "What if no consultant contacts me?",
              a: "This is extremely rare. If you don't receive a single response within 7 days, we'll refund your ₹399 and personally match you with 3 consultants.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
