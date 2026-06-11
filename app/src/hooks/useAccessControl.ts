import { useState, useEffect, useCallback, useRef } from "react";

export type AccessLevel = "none" | "basic" | "premium";

export interface AccessControl {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  isPremium: boolean;
  premiumPlan: string | null;
  premiumExpiresAt: Date | null;
  accessLevel: AccessLevel;
  canViewFullContent: boolean;
  canViewPartialContent: boolean;
  canSaveProfile: boolean;
  canViewDecisionEngine: boolean;
  canViewPremiumResults: boolean;
  logout: () => void;
}

const STORAGE_KEY = "kc_user";
const PREMIUM_KEY = "kc_premium";

function getStoredUser(): any | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function checkPremium(user: any | null): boolean {
  const flag = localStorage.getItem(PREMIUM_KEY) === "true";
  return flag || !!user?.isPremium;
}

/**
 * useAccessControl — reads auth state from localStorage.
 *
 * Syncs with the same keys as useLocalAuth:
 *   - kc_user: user object (name, email, isPremium)
 *   - kc_premium: "true" | null
 */
export function useAccessControl(): AccessControl {
  const [user, setUser] = useState<any | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userRef = useRef(user);
  userRef.current = user;

  // Sync on mount + storage events
  useEffect(() => {
    const sync = () => {
      const stored = getStoredUser();
      const premium = checkPremium(stored);
      // Only update if changed (avoid unnecessary re-renders)
      const userChanged = JSON.stringify(stored) !== JSON.stringify(userRef.current);
      if (userChanged) setUser(stored);
      setIsPremium((prev) => {
        if (prev !== premium) return premium;
        return prev;
      });
      setIsLoading(false);
    };

    sync();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === PREMIUM_KEY) {
        sync();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isAuthenticated = !!user;
  const accessLevel: AccessLevel = isPremium ? "premium" : isAuthenticated ? "basic" : "none";

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PREMIUM_KEY);
    localStorage.removeItem("kc_premium_unlocked");
    localStorage.removeItem("kc_premium_bundle");
    localStorage.removeItem("kc_de_form_state");
    localStorage.removeItem("kc_premium_source_url");
    localStorage.removeItem("kc_admin_override");
    localStorage.removeItem("kc_profile_draft");
    setUser(null);
    setIsPremium(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    isPremium,
    premiumPlan: isPremium ? "Kohortconnect Premium" : null,
    premiumExpiresAt: null,
    accessLevel,
    canViewFullContent: isPremium,
    canViewPartialContent: isAuthenticated || isPremium,
    canSaveProfile: isAuthenticated,
    canViewDecisionEngine: true,
    canViewPremiumResults: isPremium,
    logout,
  };
}
