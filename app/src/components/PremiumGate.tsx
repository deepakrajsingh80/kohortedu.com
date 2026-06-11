import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, Crown, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const RETURN_URL_KEY = "kc_premium_source_url";

interface PremiumGateProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isUnlocked?: boolean;
  compact?: boolean;
}

const PREMIUM_BUNDLE = {
  id: "premium-bundle",
  name: "Premium Bundle",
  subtitle: "Full Access — 17 Countries, 16 Consultants, All Reports",
  price: 999,
  originalPrice: 2499,
  icon: "Crown",
};

function storeReturnUrl() {
  // Store current hash route so checkout can send user back after payment
  localStorage.setItem(RETURN_URL_KEY, window.location.hash);
}

export function PremiumGate({ title, subtitle, children, isUnlocked = false, compact = false }: PremiumGateProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PREMIUM_BUNDLE.id);
  const navigate = useNavigate();

  if (isUnlocked) return <>{children}</>;

  function goToCheckout() {
    storeReturnUrl();
    navigate("/checkout");
  }

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
          <Lock className="w-6 h-6 text-amber-600" />
        </div>
        <h4 className="text-base font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-600 mb-4 max-w-xs mx-auto">{subtitle}</p>
        {!inCart ? (
          <Button
            size="sm"
            onClick={() => addItem(PREMIUM_BUNDLE)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-xs font-semibold hover:from-amber-400"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add to Cart — ₹999
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={goToCheckout}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl text-xs font-semibold hover:from-teal-400"
          >
            <ArrowRight className="w-3.5 h-3.5 mr-1.5" /> Go to Checkout
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-amber-600" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-mono tracking-wider uppercase text-amber-600 font-bold">Premium Feature</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">{subtitle}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {!inCart ? (
          <Button
            onClick={() => addItem(PREMIUM_BUNDLE)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-400 shadow-lg shadow-amber-500/25"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart — ₹999
          </Button>
        ) : (
          <Button
            onClick={goToCheckout}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-400 shadow-lg shadow-teal-500/25"
          >
            <ArrowRight className="w-4 h-4 mr-2" /> Go to Checkout
          </Button>
        )}
        <Link to="/login">
          <Button variant="outline" className="border-teal-300 text-teal-700 rounded-xl hover:bg-teal-50 font-semibold">
            <Lock className="w-4 h-4 mr-2" /> Sign In Free
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
