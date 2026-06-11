import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Crown, Lock, UserPlus, Zap, ArrowRight } from "lucide-react";
import { useLocalAuth } from "@/hooks/useLocalAuth";

interface GatedContentProps {
  children: React.ReactNode;
  requiresPremium?: boolean;
  title?: string;
  description?: string;
}

export default function GatedContent({
  children,
  requiresPremium = false,
  title = "Premium Content",
  description,
}: GatedContentProps) {
  const { user, isAuthenticated } = useLocalAuth();
  const isPremium = user?.isPremium ?? false;

  // Not authenticated — show "Create Profile" gate
  if (!isAuthenticated) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white">
        {/* Blurred preview of content */}
        <div className="blur-sm opacity-40 pointer-events-none select-none max-h-[400px] overflow-hidden">
          {children}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] p-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
            {requiresPremium ? "Premium Content" : "Create Your Free Profile"}
          </h3>
          <p className="text-sm text-slate-600 text-center max-w-sm mb-5">
            {description || (requiresPremium
              ? "Sign up for free to preview. Upgrade to Premium (₹999) for full access to all country guides, salary data, and PR pathways."
              : "Create a free profile to unlock this section and access personalized recommendations."
            )}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/login">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-5 rounded-xl font-semibold">
                <UserPlus className="w-4 h-4 mr-2" /> Create Free Profile
              </Button>
            </Link>
            {requiresPremium && (
              <Link to="/premium">
                <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-50 px-6 py-5 rounded-xl font-semibold">
                  <Crown className="w-4 h-4 mr-2" /> Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated but no premium — show "Upgrade to Premium" gate
  if (requiresPremium && !isPremium) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-dashed border-amber-300 bg-gradient-to-br from-amber-50/50 to-white">
        {/* Blurred preview of content */}
        <div className="blur-sm opacity-40 pointer-events-none select-none max-h-[400px] overflow-hidden">
          {children}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] p-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 shadow-lg">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
            {title}
          </h3>
          <p className="text-sm text-slate-600 text-center max-w-sm mb-5">
            {description || "Upgrade to Premium (₹999 one-time) to unlock full country guides, salary data, PR pathways, and 194 university PDF guides."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/premium">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-white px-6 py-5 rounded-xl font-semibold shadow-lg shadow-amber-500/25">
                <Crown className="w-4 h-4 mr-2" /> Unlock Premium — ₹999
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-3">One-time payment. No subscription. Lifetime access.</p>
        </div>
      </div>
    );
  }

  // Full access — show content
  return <>{children}</>;
}
