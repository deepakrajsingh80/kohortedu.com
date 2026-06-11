import { useState } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccessControl } from "@/hooks/useAccessControl";
import { trpc } from "@/providers/trpc";
import { Sparkles, Check, Crown, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    id: "monthly" as const,
    name: "Monthly",
    price: "₹499",
    period: "/month",
    desc: "Full access to all decision engine results",
    icon: Zap,
  },
  {
    id: "quarterly" as const,
    name: "Quarterly",
    price: "₹1,299",
    period: "/3 months",
    desc: "Save 13% with quarterly billing",
    icon: Globe,
    popular: true,
  },
  {
    id: "yearly" as const,
    name: "Yearly",
    price: "₹3,999",
    period: "/year",
    desc: "Save 33% — best value for serious students",
    icon: Crown,
  },
];

const FEATURES = [
  "Full Decision Engine results (all 22 countries)",
  "Major-specific salary data",
  "Personalized country recommendations",
  "Save & compare multiple profiles",
  "Access to university database",
  "Course comparison tools",
  "Priority support",
  "Admission deadline alerts",
];

export default function PremiumPage() {
  const { isPremium, isAuthenticated, isLoading } = useAccessControl();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "yearly">("quarterly");

  const activateMutation = trpc.premium.activate.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Upgrade Your Study Abroad Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Go <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlock the full power of AI-driven country recommendations, major-specific salary data, and personalized guidance for every step of your study abroad journey.
            </p>
          </motion.div>

          {isPremium ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 text-center mb-16"
            >
              <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">You are already a Premium member!</h2>
              <p className="text-gray-400 mb-6">Enjoy full access to all features.</p>
              <Link
                to="/evaluate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                Go to Decision Engine
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Plans */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {PLANS.map((plan) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                      selectedPlan === plan.id
                        ? "border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/10"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}
                    <plan.icon className={`w-10 h-10 mb-4 ${selectedPlan === plan.id ? "text-purple-400" : "text-gray-500"}`} />
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-400">{plan.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mb-16">
                {!isAuthenticated ? (
                  <div className="space-y-4">
                    <p className="text-gray-400">Please login to upgrade to Premium</p>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                    >
                      Login to Continue
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => activateMutation.mutate({ plan: selectedPlan })}
                    disabled={activateMutation.isPending}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                  >
                    {activateMutation.isPending ? (
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    Activate {PLANS.find((p) => p.id === selectedPlan)?.name} Plan
                  </button>
                )}
              </div>
            </>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">Everything you get with Premium</h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
