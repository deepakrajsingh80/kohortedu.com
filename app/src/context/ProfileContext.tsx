/* ═══════════════════════════════════════════════════════════════
   PROFILE CONTEXT — Anonymous user profile stored in localStorage
   Budget + Course + Level + Major = Personalized experience
   ═══════════════════════════════════════════════════════════════ */
import { createContext, useContext, useState, useCallback, useEffect } from "react";

import { getMajorShortLabel } from "@/data/siteData";

export interface UserProfile {
  budget: number;        // in Lakhs
  courseType: string;    // "Academic" | "Vocational"
  level: string;         // "UG" | "PG" | "Diploma" | "PhD"
  major: string;         // All 16 major IDs from Decision Engine
  hasSetProfile: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  budget: 20,
  courseType: "Academic",
  level: "PG",
  major: "CS_IT",
  hasSetProfile: false,
};

const STORAGE_KEY = "kc_user_profile";

interface ProfileContextType {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  clearProfile: () => void;
  profileSummary: string;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: DEFAULT_PROFILE,
  setProfile: () => {},
  clearProfile: () => {},
  profileSummary: "",
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old "STEM" major to new split system
        if (parsed.major === "STEM") parsed.major = "CS_IT";
        return parsed;
      }
    } catch {}
    return DEFAULT_PROFILE;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const setProfile = useCallback((partial: Partial<UserProfile>) => {
    setProfileState(prev => ({ ...prev, ...partial, hasSetProfile: true }));
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Use dynamic major labels from siteData.ts — auto-updates when new majors are added
  const profileSummary = profile.hasSetProfile
    ? `${profile.level === "UG" ? "Undergraduate" : profile.level === "PG" ? "Postgraduate" : profile.level === "PhD" ? "PhD" : "Diploma"} · ${getMajorShortLabel(profile.major)} · ₹${profile.budget}L budget`
    : "";

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile, profileSummary }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
