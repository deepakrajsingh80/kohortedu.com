import { useAccessControl, type AccessLevel } from "@/hooks/useAccessControl";
import { Lock, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router";
import type { ReactNode } from "react";

interface ContentGateProps {
  children: ReactNode;
  /** Minimum access level required */
  minAccess?: AccessLevel;
  /** What fraction of content to show at "none" level (0-1) */
  freeFraction?: number;
  /** What fraction of content to show at "basic" level (0-1) */
  basicFraction?: number;
  /** If true, content is fully hidden (no teaser) below min access */
  fullyHidden?: boolean;
  /** Optional custom message for locked content */
  lockMessage?: string;
  /** CSS class for the container */
  className?: string;
}

/**
 * ContentGate — wraps content with progressive visibility.
 *
 * Non-logged-in: 75% visible (freeFraction)
 * Logged-in (basic): 75% visible (basicFraction)  
 * Premium: 100% visible
 */
export function ContentGate({
  children,
  minAccess = "none",
  freeFraction = 0.75,
  basicFraction = 0.75,
  fullyHidden = false,
  lockMessage,
  className = "",
}: ContentGateProps) {
  const { accessLevel, isLoading } = useAccessControl();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  // Determine visibility fraction
  let fraction = 1;
  if (accessLevel === "none") fraction = freeFraction;
  else if (accessLevel === "basic") fraction = basicFraction;

  // If fraction is 1, show everything
  if (fraction >= 1) {
    return <div className={className}>{children}</div>;
  }

  // If fully hidden and below min access, show lock screen only
  if (fullyHidden && accessLevel === "none" && minAccess !== "none") {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10 flex items-end justify-center pb-6">
          <div className="text-center">
            <Lock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium mb-2">
              {lockMessage || "Login to access this content"}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Login to Unlock
            </Link>
          </div>
        </div>
        <div className="blur-sm opacity-40 pointer-events-none select-none max-h-48 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // Show partial content with gradient fade
  return (
    <div className={`relative ${className}`}>
      <div
        className="overflow-hidden"
        style={{ maxHeight: `${fraction * 100}%` }}
      >
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-10" />

      {/* Upgrade CTA overlay */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
        {accessLevel === "none" ? (
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            Login to see more
          </Link>
        ) : (
          <Link
            to="/premium"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold rounded-lg transition-all shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade to Premium for full access
          </Link>
        )}
      </div>
    </div>
  );
}
