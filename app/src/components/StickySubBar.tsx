/* ═══════════════════════════════════════════════════════════════
   STICKY SUBSCRIPTION BAR — Appears on all pages when user 
   has a profile but isn't premium. Shows personalized summary.
   ═══════════════════════════════════════════════════════════════ */
import { Link } from "react-router";
import { useProfile } from "@/context/ProfileContext";
import { useCart } from "@/context/CartContext";
// useLocalAuth removed — all content free

const PREMIUM_BUNDLE = {
  id: "premium-bundle",
  title: "Kohortconnect Premium Bundle",
  description: "Complete study abroad guidance with 14 country guides, 100+ consultant contacts, full Decision Engine access, and scholarship database.",
  price: 999,
  image: "/trust-illustration.png",
};
import { Crown, X, ArrowRight, Zap, Calculator } from "lucide-react";
import { useState } from "react";

export default function StickySubBar() {
  const { profile, profileSummary } = useProfile();
  const { addItem, isInCart } = useCart();
  const [dismissed, setDismissed] = useState(false);

  // Hide if: no profile, dismissed, or already in cart
  if (!profile.hasSetProfile || dismissed) return null;
  const inCart = isInCart(PREMIUM_BUNDLE.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-amber-400/30 shadow-2xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3">
        {/* Left: Profile badge */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Your Profile</p>
            <p className="text-xs text-white font-semibold truncate max-w-[200px]">{profileSummary}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-slate-700" />

        {/* Center: Value prop */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs sm:text-sm text-white font-semibold truncate">
            <Crown className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
            Unlock YOUR personalized study abroad plan
          </p>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            19-country comparison · Full cost breakdown · University matches · Consultant access
          </p>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {!inCart ? (
            <button
              onClick={() => addItem(PREMIUM_BUNDLE)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold hover:from-amber-400 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unlock — ₹999</span>
              <span className="sm:hidden">₹999</span>
            </button>
          ) : (
            <Link
              to="/checkout"
              onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs font-bold hover:from-teal-400 transition-all shadow-lg shadow-teal-500/20 whitespace-nowrap"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Checkout
            </Link>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
