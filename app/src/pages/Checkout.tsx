import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart, ArrowLeft, Shield, CreditCard, Smartphone,
  Landmark, Zap, Crown, CheckCircle, Lock, User, Mail, Phone,
  ArrowRight, Home, Compass
} from "lucide-react";

const RETURN_URL_KEY = "kc_premium_source_url";

function getReturnUrl(): { url: string; label: string } | null {
  const raw = localStorage.getItem(RETURN_URL_KEY);
  if (!raw) return null;
  // Clean up the hash URL
  const url = raw.replace(/^#/, "").trim();
  if (!url || url === "/" || url === "#/") return null;

  // Generate a human label from the URL
  const path = url.replace(/^\//, "").split("/")[0];
  const labels: Record<string, string> = {
    evaluate: "Decision Engine",
    destinations: "Country Guide",
    courses: "Course Details",
    premium: "Premium Page",
    "profile-blaster": "Profile Blaster",
    learn: "Learning Hub",
    parents: "Parent's Corner",
    "student-loans": "Student Loans",
    medicine: "Medicine Programs",
    stem: "STEM Programs",
    accounts: "Accounting Programs",
    arts: "Arts Programs",
    management: "Management Programs",
    universities: "University Guide",
  };
  const label = labels[path] || path.charAt(0).toUpperCase() + path.slice(1);

  return { url, label };
}

export default function Checkout() {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Unlock premium features
      localStorage.setItem("kc_premium", "true");
      localStorage.setItem("kc_premium_unlocked", Date.now().toString());
      localStorage.setItem("kc_premium_bundle", JSON.stringify({ name: "Premium Bundle", price: 999, purchasedAt: new Date().toISOString() }));
      // Also create/update user profile
      if (!localStorage.getItem("kc_user")) {
        localStorage.setItem("kc_user", JSON.stringify({ name: form.fullName || "Premium User", email: form.email || "user@example.com", isPremium: true }));
      } else {
        const user = JSON.parse(localStorage.getItem("kc_user") || "{}");
        user.isPremium = true;
        localStorage.setItem("kc_user", JSON.stringify(user));
      }
      setIsComplete(true);
    }, 2500);
  };

  // Auto-redirect after payment success
  const returnInfo = isComplete ? getReturnUrl() : null;

  useEffect(() => {
    if (!isComplete || !returnInfo) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem(RETURN_URL_KEY);
          navigate(returnInfo.url);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete, returnInfo, navigate]);

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-28 pb-20 px-6 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-600 mb-6">Add a premium bundle before checking out.</p>
          <Link to="/premium">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl">
              Browse Premium Bundles
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-28 pb-20 px-6 max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 mb-4 px-4 py-1.5">Payment Successful</Badge>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Premium Activated!</h1>
          <p className="text-slate-600 mb-2">Your Premium Bundle is now active.</p>
          <p className="text-sm text-slate-500 mb-8">Order ID: KC{Date.now().toString(36).toUpperCase()}</p>

          {/* Return to source page */}
          {returnInfo ? (
            <div className="bg-teal-50 rounded-2xl border border-teal-200 p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Compass className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-teal-800">Returning you to {returnInfo.label}</h3>
              </div>
              <p className="text-sm text-teal-600 mb-4">
                All previously locked content will be unlocked automatically.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    localStorage.removeItem(RETURN_URL_KEY);
                    navigate(returnInfo.url);
                  }}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Go Back to {returnInfo.label} Now
                </button>
                <p className="text-xs text-teal-500">
                  Auto-redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-left mb-8">
              <h3 className="font-bold text-slate-900 mb-3">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">All locked content is now unlocked — go back to any page</p></div>
                <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">Browse country pages — all premium content is now accessible</p></div>
                <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">Connect with consultants — full contact details revealed</p></div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {returnInfo && (
              <Link to="/">
                <Button variant="outline" className="w-full border-slate-300 text-slate-700 py-5 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" /> Go to Homepage
                </Button>
              </Link>
            )}
            {!returnInfo && (
              <>
                <Link to="/evaluate">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-xl font-bold text-base">
                    <Zap className="mr-2 w-5 h-5" /> Start Using Decision Engine
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 py-5 rounded-xl font-semibold">
                    Back to Home
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <button onClick={() => { localStorage.removeItem(RETURN_URL_KEY); window.history.back(); }} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Info */}
              <Card className="border border-slate-200"><CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center"><User className="w-5 h-5 text-teal-600" /></div>
                  <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">Full Name</label><input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className="form-input" placeholder="Rahul Sharma" /></div>
                  <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">Email</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="form-input" placeholder="rahul@email.com" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">Phone</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="form-input" placeholder="+91-98765-43210" /></div>
                </div>
              </CardContent></Card>

              {/* Billing Address */}
              <Card className="border border-slate-200"><CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Landmark className="w-5 h-5 text-blue-600" /></div>
                  <h2 className="text-lg font-bold text-slate-900">Billing Address</h2>
                </div>
                <div className="space-y-4">
                  <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">Address</label><input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="form-input" placeholder="123, MG Road" /></div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">City</label><input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="form-input" placeholder="Mumbai" /></div>
                    <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">State</label><input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="form-input" placeholder="Maharashtra" /></div>
                    <div><label className="text-xs font-mono uppercase text-slate-500 font-semibold mb-1 block">Pincode</label><input value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} className="form-input" placeholder="400001" /></div>
                  </div>
                </div>
              </CardContent></Card>

              {/* Payment Method */}
              <Card className="border border-slate-200"><CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><CreditCard className="w-5 h-5 text-amber-600" /></div>
                  <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "upi", label: "UPI / Google Pay / PhonePe", icon: Smartphone, desc: "Pay instantly using any UPI app" },
                    { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay accepted" },
                    { id: "netbanking", label: "Net Banking", icon: Landmark, desc: "All major Indian banks" },
                  ].map(method => (
                    <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === method.id ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-slate-300"}`}>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "bg-amber-100" : "bg-slate-100"}`}>
                        <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? "text-amber-600" : "text-slate-500"}`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${paymentMethod === method.id ? "text-amber-700" : "text-slate-900"}`}>{method.label}</p>
                        <p className="text-xs text-slate-500">{method.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "border-amber-500 bg-amber-500" : "border-slate-300"}`}>
                        {paymentMethod === method.id && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Security note */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-teal-500" />
                  <span>All payments are SSL encrypted. Your data is never stored on our servers.</span>
                </div>
              </CardContent></Card>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <Card className="border border-slate-200 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-5">Order Summary</h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6">
                      {items.map(item => (
                        <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-slate-100">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.subtitle}</p>
                          </div>
                          <p className="font-bold text-amber-700">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm"><span className="text-slate-600">Subtotal</span><span className="font-semibold text-slate-900">₹{total.toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-slate-600">GST (18%)</span><span className="font-semibold text-slate-900">₹{gst.toLocaleString()}</span></div>
                      {total > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600"><span>Discount</span><span className="font-semibold">-₹0</span></div>
                      )}
                      <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="font-bold text-slate-900">Total</span><span className="font-bold text-2xl text-amber-700">₹{grandTotal.toLocaleString()}</span></div>
                    </div>

                    {/* Pay button */}
                    <Button
                      onClick={handlePay}
                      disabled={isProcessing || !form.fullName || !form.email || !form.phone}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-white py-6 text-base font-bold rounded-xl shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Pay ₹{grandTotal.toLocaleString()}</span>
                      )}
                    </Button>

                    <p className="text-xs text-slate-400 text-center mt-3">
                      By completing this purchase you agree to our Terms of Service and Privacy Policy.
                    </p>

                    {/* Trust logos */}
                    <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1"><Shield className="w-3 h-3 text-teal-500" /> Razorpay Secure</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Instant Access</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
