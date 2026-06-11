import { useState, useEffect, useCallback, useMemo } from "react";

export interface LocalUser {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  avatar?: string;
  joinedAt: string;
}

const STORAGE_KEY = "kc_user";
const PREMIUM_KEY = "kc_premium";

function getStoredUser(): LocalUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function useLocalAuth() {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      // Ensure isPremium flag is synced with PREMIUM_KEY
      const hasPremium = localStorage.getItem(PREMIUM_KEY) === "true";
      stored.isPremium = hasPremium;
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, name: string) => {
    const hasPremium = localStorage.getItem(PREMIUM_KEY) === "true";
    const newUser: LocalUser = {
      id: `u_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      isPremium: hasPremium,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

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
  }, []);

  const upgradeToPremium = useCallback(() => {
    localStorage.setItem(PREMIUM_KEY, "true");
    setUser(prev => prev ? { ...prev, isPremium: true } : prev);
  }, []);

  const isAuthenticated = !!user;

  return useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      upgradeToPremium,
    }),
    [user, isLoading, isAuthenticated, login, logout, upgradeToPremium]
  );
}

export function isPremiumUser(): boolean {
  return localStorage.getItem(PREMIUM_KEY) === "true";
}
