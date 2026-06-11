/**
 * DataMask — Unified content gating for Kohortconnect
 *
 * Tiers:
 *   - "none"     : Not logged in → blurred with login CTA
 *   - "basic"    : Logged in, no premium → blurred with upgrade CTA
 *   - "premium"  : Full access → content visible
 *
 * Usage: Wrap any sensitive data section with <DataMask>
 */
import { useAccessControl } from "@/hooks/useAccessControl";
import { Link } from "react-router";
import { Lock, Sparkles, Eye, LogIn, Crown } from "lucide-react";
import type { ReactNode } from "react";

interface DataMaskProps {
  children: ReactNode;
  /** Which tier gets full visibility */
  requiredTier?: "login" | "premium";
  /** Custom label for what's being locked */
  label?: string;
  /** Show a compact inline lock instead of full overlay */
  inline?: boolean;
  className?: string;
}

export function DataMask({
  children,
  requiredTier = "premium",
  label = "Premium data",
  inline = false,
  className = "",
}: DataMaskProps) {
  const { isAuthenticated, isPremium, isLoading } = useAccessControl();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  // Premium content — require premium subscription
  if (requiredTier === "premium") {
    if (isPremium) return <>{children}</>;
    return <PremiumLock label={label} inline={inline} isAuthenticated={isAuthenticated} className={className} />;
  }

  // Login-only content — require any auth
  if (requiredTier === "login") {
    if (isAuthenticated) return <>{children}</>;
    return <LoginLock label={label} inline={inline} className={className} />;
  }

  return <>{children}</>;
}

/** Full overlay with blur for locked content */
function PremiumLock({
  label,
  inline,
  isAuthenticated,
  className,
  children,
}: {
  label: string;
  inline: boolean;
  isAuthenticated: boolean;
  className: string;
  children?: React.ReactNode;
}) {
  if (inline) {
    return (
      <div className={`flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 ${className}`}>
        <Lock className="w-3.5 h-3.5" />
        <span className="font-medium">{label}</span>
        <Link
          to={isAuthenticated ? "/premium" : "/login"}
          className="ml-auto inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2"
        >
          {isAuthenticated ? <><Sparkles className="w-3 h-3" /> Upgrade</> : <><LogIn className="w-3 h-3" /> Login</>}
        </Link>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="blur-[6px] opacity-30 pointer-events-none select-none max-h-64 overflow-hidden">
        {children}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-xl p-6 max-w-sm mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-xs text-gray-500 mb-4">
            {isAuthenticated
              ? "Upgrade to Premium for full access to all data."
              : "Login to unlock this content and more."}
          </p>
          <Link
            to={isAuthenticated ? "/premium" : "/login"}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              isAuthenticated
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {isAuthenticated ? <><Sparkles className="w-3.5 h-3.5" /> Upgrade to Premium</> : <><Eye className="w-3.5 h-3.5" /> Login to Unlock</>}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Login-only lock */
function LoginLock({
  label,
  inline,
  className,
  children,
}: {
  label: string;
  inline: boolean;
  className: string;
  children?: React.ReactNode;
}) {
  if (inline) {
    return (
      <div className={`flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200 ${className}`}>
        <Lock className="w-3.5 h-3.5" />
        <span className="font-medium">{label}</span>
        <Link to="/login" className="ml-auto inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold underline underline-offset-2">
          <LogIn className="w-3 h-3" /> Login
        </Link>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="blur-[6px] opacity-30 pointer-events-none select-none max-h-48 overflow-hidden">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl p-6 max-w-sm mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-xs text-gray-500 mb-4">Login to access this content.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Login to Unlock
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Floating tier badge — shows current access level */
export function TierBadge() {
  const { isAuthenticated, isPremium, isLoading } = useAccessControl();

  if (isLoading) return null;

  if (isPremium) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
        <Crown className="w-3.5 h-3.5" /> Premium
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Link
        to="/premium"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" /> Upgrade
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-white text-xs font-bold rounded-full shadow-lg hover:bg-gray-800 transition-colors"
    >
      <LogIn className="w-3.5 h-3.5" /> Login
    </Link>
  );
}
