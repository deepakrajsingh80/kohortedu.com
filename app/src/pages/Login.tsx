import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  User,
  Briefcase,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Shield,
  Globe,
  Clock,
  ArrowLeft,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState<"choose" | "student" | "partner">(() => {
    const intent = localStorage.getItem("kc_login_intent");
    localStorage.removeItem("kc_login_intent");
    return intent === "partner" ? "partner" : "student";
  });
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPassword, setPartnerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [partnerError, setPartnerError] = useState("");
  const [studentSubmitted, setStudentSubmitted] = useState(false);

  const { login } = useLocalAuth();

  const handleStudentLogin = () => {
    if (!studentEmail.trim() || !studentEmail.includes("@")) return;
    login(studentEmail, studentName);
    setStudentSubmitted(true);
    // Redirect to Decision Engine after profile creation
    setTimeout(() => {
      window.location.hash = "#/evaluate";
      window.location.reload();
    }, 800);
  };

  const handlePartnerLogin = () => {
    setPartnerError("");
    if (!partnerEmail.trim() || !partnerPassword) {
      setPartnerError("Please enter both email and password.");
      return;
    }
    // Demo: accept any partner login for now
    // In production this would validate against backend
    localStorage.setItem("kc_partner", JSON.stringify({
      id: `p_${Date.now()}`,
      name: "Partner User",
      email: partnerEmail,
      isPartner: true,
      joinedAt: new Date().toISOString(),
    }));
    window.location.hash = "#/partner-dashboard";
    window.location.reload();
  };

  /* ─── Mode Selection ─── */
  if (mode === "choose") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Kohortconnect</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-500">Sign in to access your account</p>
            </div>

            {/* Student Card */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("student")}
              className="w-full text-left mb-4 p-5 rounded-2xl border-2 border-teal-100 bg-white hover:border-teal-300 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
                  <User className="h-7 w-7 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Student Login
                    <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Access your dashboard, track applications, and connect with consultants
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> 17 Countries</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Application Tracker</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Verified Consultants</span>
              </div>
            </motion.button>

            {/* Partner Card */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("partner")}
              className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                  <Briefcase className="h-7 w-7 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Partner / Consultant Login
                    <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Manage your leads, view student matches, and track conversions
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Lead Management</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Analytics</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Verified Partner</span>
              </div>
            </motion.button>

            <p className="text-center text-xs text-slate-400 mt-6">
              Kohortconnect Technologies Pvt. Ltd.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Student Login Form ─── */
  if (mode === "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Kohortconnect</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8"
          >
            <button
              onClick={() => setMode("choose")}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <User className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Student Sign In</h2>
                <p className="text-xs text-slate-500">New here? Enter your email to create an account</p>
              </div>
            </div>

            {studentSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Welcome aboard!</h3>
                <p className="text-sm text-slate-500">Redirecting to your dashboard...</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={e => setStudentEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyDown={e => e.key === "Enter" && handleStudentLogin()}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyDown={e => e.key === "Enter" && handleStudentLogin()}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleStudentLogin}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white h-11 rounded-xl font-semibold"
                  disabled={!studentEmail.trim() || !studentEmail.includes("@")}
                >
                  <Sparkles className="w-4 h-4 mr-2" /> Continue as Student <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  No password needed. We&apos;ll remember you on this device.
                </p>

                <div className="pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    {[
                      "Track unlimited applications",
                      "Get AI-matched with consultants",
                      "Access country playbooks",
                    ].map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Partner Login Form ─── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">Kohortconnect</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8"
        >
          <button
            onClick={() => { setMode("choose"); setPartnerError(""); }}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Partner Sign In</h2>
              <p className="text-xs text-slate-500">For verified consultants & partners</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Partner Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={partnerEmail}
                  onChange={e => { setPartnerEmail(e.target.value); setPartnerError(""); }}
                  placeholder="partner@company.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  onKeyDown={e => e.key === "Enter" && handlePartnerLogin()}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={partnerPassword}
                  onChange={e => { setPartnerPassword(e.target.value); setPartnerError(""); }}
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  onKeyDown={e => e.key === "Enter" && handlePartnerLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {partnerError && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg p-2">{partnerError}</p>
            )}

            <Button
              onClick={handlePartnerLogin}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white h-11 rounded-xl font-semibold"
            >
              <Shield className="w-4 h-4 mr-2" /> Sign In as Partner <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <p className="text-xs text-slate-400 text-center">
              Partner access is by invitation only. <Link to="/contact" className="text-teal-600 hover:underline">Apply to partner</Link>
            </p>

            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-2">
                {[
                  "View matched student leads",
                  "Track conversion analytics",
                  "Manage your partner profile",
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
