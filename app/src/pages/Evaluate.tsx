import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
// useAccessControl removed — all content free
import { trpc } from "@/providers/trpc";
import { getConsultantsForCountry, type Consultant } from "@/data/consultants";
import { getCourseRecommendations as getTrendingCourses } from "@/data/courseRecommendations";
import { getEnrollmentByCountry } from "@/data/indianEnrollment";
import { getVocationalCourses, getVocationalColleges, hasVocationalData, type VocationalCourse } from "@/data/vocationalCourses";
import {
  DATA_META, COUNTRIES, COUNTRY_TO_ID, LIVING, BASE_TUITION, VOCATIONAL_BASE_TUITION,
  EARN, SALARY, INDIAN_SAFETY, VISA_EASE, PR_SCORE, EMPLOYMENT,
  WORK_EXP_VISA_BONUS, FIT_BASE, STREAM_MULT, EXAM_CONFIG,
  getWorkExReq, getCourseRecommendations, FUNDS_REQ, CULTURAL_BARRIER,
  LIFETIME_VALUE, SALARY_RANGE, COUNTRIES_BY_REGION, CURRENCY_RATES,
  WORK_EXP_LABEL, PG_WORK_EX_REQ, DURATION, VOCATIONAL_DURATION,
  VOCATIONAL_EARN_MULT, getMajorSalary,
  type WorkExpLevel,
} from "@/data/evaluateData";

/* ─── Country lookup tables (defined here to avoid tree-shaking) ───
   CACHE_BUST: v53abe49 - Forces new chunk hash on deploy */
const VISA: Record<string, string> = {
  Canada: "Study Permit → PGWP (1-3yr) → Express Entry",
  Germany: "Student Visa → 18mo Job Seeker → EU Blue Card / PR",
  UK: "Student Route → Graduate Visa (2yr) → Skilled Worker",
  USA: "F-1 → OPT (1-3yr) → H-1B (lottery) → EB-2/3",
  Australia: "Student Visa (sub 500) → TGV → GSM PR",
  "New Zealand": "Student Visa → Post-Study Work → SMC PR",
  Ireland: "Stamp 2 → 3rd Level Graduate Scheme → CSEP",
  Netherlands: "Student Visa → Orientation Year → Highly Skilled Migrant",
  France: "Student Visa → APS (1-2yr) → Talent Passport",
  Italy: "Student Visa → Permesso di Soggiorno → Work Permit",
  Sweden: "Student Visa → 12mo Job Seeker → Work Permit",
  Poland: "Student Visa → Work Permit → EU Long-Term",
  Singapore: "Student Pass → Long-Term Visit → EP/PEP",
  UAE: "Student Visa → Work Permit → Golden Visa",
  Russia: "Student Visa → Work Permit → Temporary Residence",
  Georgia: "Student Visa → Work Permit → Long-Term Residence",
  Philippines: "Student Visa → Special Study Permit",
  "South Korea": "Student Visa (D-2) → Job Seeker (D-10) → E-7 Work",
  Malaysia: "Student Pass → Employment Pass → PR (MyPR)",
  Switzerland: "Student Visa → Work Permit → C Permit",
  Spain: "Student Visa → Job Seeker → Highly Qualified Worker",
  "Czech Republic": "Student Visa → Employee Card → Permanent Residence",
};

const PR_PATH: Record<string, string> = {
  Canada: "Express Entry (CRS) or PNP — 1-2 yrs post-study",
  Germany: "EU Blue Card → Settlement Permit — 21-33 months",
  UK: "Skilled Worker Visa → ILR — 5 years",
  USA: "H-1B → EB-2/3 Green Card — 5-10+ years (backlog)",
  Australia: "GSM (189/190/491) — 2-4 years post-study",
  "New Zealand": "SMC or Green List — 1-2 years",
  Ireland: "CSEP → Stamp 4 → Citizenship — 5 years",
  Netherlands: "Highly Skilled Migrant → PR — 5 years",
  France: "Talent Passport → 10-Year Card — 5 years",
  Italy: "Work Permit → EC Long-Term — 5 years",
  Sweden: "Work Permit → PR — 4 years",
  Poland: "Work Permit → EU Long-Term — 5 years",
  Singapore: "Employment Pass → PR — 2-6 years",
  UAE: "Golden Visa — 5-10 years (investment/talent)",
  Russia: "Temporary → Permanent — 3-5 years",
  Georgia: "Work Permit → Long-Term — 5 years",
  Philippines: "No direct PR path for foreign students",
  "South Korea": "F-2-7 Points → F-5 PR — 3-5 years",
  Malaysia: "MyPR via MM2H or Employment — 5+ years",
  Switzerland: "C Permit → Citizenship — 10 years (cantonal)",
  Spain: "Highly Qualified → Long-Term — 5 years",
  "Czech Republic": "Employee Card → PR — 5 years",
};

const JOB: Record<string, string> = {
  Canada: "High", Germany: "High", UK: "Medium", USA: "High",
  Australia: "Medium", "New Zealand": "Medium", Ireland: "Medium",
  Netherlands: "Medium", France: "Medium", Italy: "Low", Sweden: "Medium",
  Poland: "Low", Singapore: "High", UAE: "Medium", Russia: "Low",
  Georgia: "Low", Philippines: "Low", "South Korea": "Medium",
  Malaysia: "Medium", Switzerland: "High", Spain: "Low", "Czech Republic": "Medium",
};

import { Badge } from "@/components/ui/badge";
import {
  Calculator, TrendingUp, DollarSign, MapPin, Star, Banknote,
  BookOpen, Briefcase, Clock, Home, Wallet, Target,
  Sparkles, Lightbulb, Users, User, Lock, ArrowRight, CheckCircle2, Crown,
  Table2, ShoppingCart, Play, MousePointer, FileText,
  BarChart3, Award, Zap, Shield, MessageCircle, X, Mail, Phone, BadgeCheck, AlertTriangle,
  Stethoscope, Brain, FlaskConical, Palette, Calculator as CalculatorIcon,
  ChevronUp, ChevronDown, GraduationCap, Shirt, Utensils, Newspaper, Clapperboard,
  HeartPulse, Microscope,
} from "lucide-react";

function getExamConfig(level: Level, major: Major): import("@/data/evaluateData").ExamConfig | null {
  if (!level || !major) return null;
  return EXAM_CONFIG[`${level}-${major}`] || null;
}

const PREMIUM_BUNDLE = {
  id: "premium-bundle",
  name: "Premium Bundle",
  subtitle: "Full Access — 17 Countries, 16 Consultants, All Reports",
  price: 999,
  originalPrice: 2499,
  icon: "Crown",
};

/* ---- Types ---- */
type CourseType = "" | "Academic" | "Vocational";
type Level = "" | "UG" | "PG";
type Major = "" | "CS_IT" | "DataScience" | "Engineering" | "MBBS" | "MD_MS" | "MDS" | "Nursing" | "Pharmacy" | "Biotech" | "Mgmt" | "Accts" | "Arts" | "Fashion" | "Hotel" | "Journalism" | "Media";
type Track = "Govt" | "Private";
type PRPriority = "" | "High" | "Med" | "Low";
type RegionFilter = "" | "Any" | string;

/* ─── VALID MAJORS per (CourseType × Level) ───
   Filters the Major dropdown dynamically. UG ≠ PG availability.
   Example: MDS (postgrad dental) only shows for PG. MBBS only for UG. ── */
const VALID_MAJORS: Record<string, Major[]> = {
  "UG-Academic":  ["CS_IT","DataScience","Engineering","MBBS","Nursing","Pharmacy","Biotech","Mgmt","Accts","Arts","Fashion","Hotel","Journalism","Media"],
  "PG-Academic":  ["CS_IT","DataScience","Engineering","MD_MS","MDS","Nursing","Pharmacy","Biotech","Mgmt","Accts","Arts","Fashion","Hotel","Journalism","Media"],
  "UG-Vocational":["CS_IT","Engineering","Nursing","Pharmacy","Hotel","Fashion","Media","Journalism"],
  "PG-Vocational":["CS_IT","Engineering","Nursing","Pharmacy","Hotel","Fashion","Media","Journalism","Mgmt"],
};

function getValidMajors(courseType: CourseType, level: Level): Major[] {
  if (!courseType || !level) return [];
  const key = `${level}-${courseType}`;
  return VALID_MAJORS[key] || [];
}

const MAJOR_LABEL: Record<string, string> = {
  CS_IT: "Computer Science & IT",
  DataScience: "Data Science & Analytics",
  Engineering: "Engineering (Mech/Electrical/Civil)",
  MBBS: "MBBS (Medicine)",
  MD_MS: "MD / MS (Surgery)",
  MDS: "MDS (Dental Surgery)",
  Nursing: "Nursing",
  Pharmacy: "Pharmacy",
  Biotech: "Biotechnology",
  Mgmt: "Management",
  Accts: "Accounts & Finance",
  Arts: "Arts & Humanities",
  Fashion: "Fashion & Design",
  Hotel: "Hotel Management",
  Journalism: "Journalism",
  Media: "Films & Media",
};

/* ─── Course Recommendation Engine ───
   Maps (CourseType × Level × Major) → recommended degree programs ── */
interface ProgramRec {
  name: string;
  desc: string;
  topCountries: string[];
  duration: string;
  career: string;
}


function getSalaryRange(country: string): string {
  const r = SALARY_RANGE[country];
  if (!r) return "N/A";
  return `₹${r.entry}–${r.senior}L`;
}

/* ---- Compute functions (enhanced) ---- */
function compute(country: string, track: Track, level: Level, major: Major, courseType: CourseType = "Academic") {
  const isVocational = courseType === "Vocational";

  // ─── Tuition: separate tables for Academic vs Vocational ───
  let baseTuition: number;
  if (isVocational) {
    baseTuition = VOCATIONAL_BASE_TUITION[country] || 5;
    // Germany private vocational colleges
    if (country === "Germany" && track === "Private") {
      baseTuition = 8;
    }
  } else {
    baseTuition = BASE_TUITION[country] || 10;
    // Germany private universities have real tuition (€5K-20K/yr)
    if (country === "Germany" && track === "Private") {
      baseTuition = 18;
    }
  }

  const streamMult = isVocational ? 1.0 : STREAM_MULT[major]; // vocational has no stream multiplier
  const govtDiscount = isVocational ? 0.5 : 0.6; // vocational govt discount slightly better
  const duration = isVocational ? VOCATIONAL_DURATION[level] : DURATION[level];
  // Tuition = per-year base × stream multiplier × (govt discount) × number of years
  const tuitionPerYear = track === "Govt"
    ? baseTuition * streamMult * govtDiscount
    : baseTuition * streamMult;
  const tuition = tuitionPerYear * duration;

  // ─── Living cost with 10% annual increase ───
  // Year 1 = base, Year 2 = +10%, Year 3 = +21%, Year 4 = +33.1%
  const baseLiving = LIVING[country] || 10;
  let totalLiving = 0;
  for (let yr = 0; yr < duration; yr++) {
    totalLiving += baseLiving * Math.pow(1.10, yr);
  }
  const living = Math.round(totalLiving * 10) / 10;

  // ─── Part-time work reality: Indian students can earn in English-speaking/EU countries
  // NOT realistic in Asia (Singapore, Korea, UAE, etc.) due to language barriers & visa restrictions
  const PT_WORK_AVAILABLE = ["USA", "Canada", "UK", "Australia", "Germany", "Ireland", "New Zealand", "Netherlands", "France", "Sweden", "Italy"];
  const ptWorkPossible = PT_WORK_AVAILABLE.includes(country);
  const earnMult = isVocational ? VOCATIONAL_EARN_MULT : 1.0;
  const rawEarnings = (EARN[country] || 20) * (duration / 4) * earnMult;
  const earnings = ptWorkPossible ? rawEarnings : 0; // Zero earnings in Asia/Middle East
  const netOOP = Math.round((tuition + living - earnings) * 10) / 10;

  // ─── Post-Tax Rates by Country ───
  const POST_TAX_RATE: Record<string, number> = {
    Canada: 0.25, Germany: 0.35, UK: 0.25, USA: 0.24, Australia: 0.27,
    "New Zealand": 0.22, Ireland: 0.25, Netherlands: 0.30, France: 0.28,
    Italy: 0.28, Sweden: 0.32, Poland: 0.22, Singapore: 0.12, UAE: 0.00,
    Russia: 0.13, Georgia: 0.20, Philippines: 0.25, "South Korea": 0.18, Malaysia: 0.20,
  };

  // ─── 3-Year ROI: cumulative 3-year POST-TAX income / Net OOP ───
  // Use major-specific salary from research database if available
  const countryMajorSalary = getMajorSalary(country, major);
  const sr = SALARY_RANGE[country];
  // Prefer major-specific entry salary, fall back to generic country range
  const entrySalary = countryMajorSalary ? countryMajorSalary.entry : (sr ? sr.entry : SALARY[country]);
  const taxRate = POST_TAX_RATE[country] ?? 0.25;
  const keepRate = 1 - taxRate;
  let threeYearPostTaxIncome = 0;
  for (let yr = 0; yr < 3; yr++) {
    const grossYearSalary = entrySalary * Math.pow(1.10, yr);
    threeYearPostTaxIncome += grossYearSalary * keepRate;
  }
  const roi = netOOP > 0 ? Math.round((threeYearPostTaxIncome / netOOP) * 10) / 10 : null;

  // ─── Ideal Budget: Net OOP + 20% buffer ───
  const idealBudget = netOOP > 0 ? Math.round(netOOP * 1.2 * 10) / 10 : 0;

  // ─── 10-Year ROI: cumulative 10-year POST-TAX income / Net OOP ───
  let tenYearPostTaxIncome = 0;
  for (let yr = 0; yr < 10; yr++) {
    const grossYearSalary = entrySalary * Math.pow(1.10, yr);
    tenYearPostTaxIncome += grossYearSalary * keepRate;
  }
  const roi10yr = netOOP > 0 ? Math.round((tenYearPostTaxIncome / netOOP) * 10) / 10 : null;

  return {
    tuition: Math.round(tuition * 10) / 10,
    living,
    earnings: Math.round(earnings * 10) / 10,
    netOOP,
    idealBudget,
    roi,
    roi10yr,
    lifetimeValue: Math.round(tenYearPostTaxIncome * 10) / 10,
    lifetimeROI: roi10yr,
    salary: countryMajorSalary ? countryMajorSalary.mid : (sr ? sr.mid : SALARY[country]),
    salaryRange: getSalaryRange(country),
    salaryEntry: entrySalary,
    salarySenior: countryMajorSalary ? countryMajorSalary.senior : (sr ? sr.senior : SALARY[country]),
    employment: EMPLOYMENT[country] || 5,
    visaEase: VISA_EASE[country] || 5,
    prScore: PR_SCORE[country] || 5,
    safety: INDIAN_SAFETY[country] || 70,
  };
}

/* Helper: get work experience visa bonus for display */
function getWorkExpBonus(country: string, workExp: WorkExpLevel): number {
  if (!workExp) return 0;
  return WORK_EXP_VISA_BONUS[country]?.[workExp] || 0;
}

function score(country: string, track: Track, level: Level, major: Major, budget: number, prPriority: PRPriority, ielts: number, acad: number, workExp: WorkExpLevel, courseType: CourseType = "Academic") {
  let base = (FIT_BASE[country] || 5) * STREAM_MULT[major] * 0.6;
  let penalty = 0;
  let fin = compute(country, track, level, major, courseType);

  // ═══════════════════════════════════════════════════════════════
  // FIELD-COUNTRY EMPLOYMENT & SALARY OVERRIDE
  // MBBS students from Russia/Georgia/Philippines RETURN to India.
  // Local salaries (₹4-6L) are irrelevant — what matters is post-FMGE
  // earnings in India. FMGE pass rates: Russia 29%, Georgia 35%,
  // Philippines 20%. Those who clear earn Indian doctor salaries.
  // Sources: NBE FMGE 2024 data, Diginerve, Careers360
  // ═══════════════════════════════════════════════════════════════
  const MBBS_HUBS = ["Russia", "Georgia", "Philippines"];
  if (major === "MBBS" && MBBS_HUBS.includes(country)) {
    // Post-FMGE India salaries (research-backed):
    // Starting: ₹5-10L/yr (govt hosp ₹40K/mo, private ₹60-80K/mo)
    // Mid-career (5-10 yrs): ₹15-18L/yr
    // Senior specialist: ₹30-60L+/yr
    // Source: diginerve.com, netschools.in
    fin = { ...fin, employment: 7 }; // conditional on clearing FMGE
    fin.salaryEntry = 8;   // ₹8L = median post-FMGE starting in India
    if (fin.salarySenior < 35) fin.salarySenior = 35; // mid-career specialist
  }

  const effectivePr = prPriority || "Med"; // default to Medium if not selected

  // ─── 1. BUDGET PENALTY (uses minimum upfront, not just netOOP) ───
  const MINIMUM_UPFRONT: Record<string, number> = {
    Germany: 12, Canada: 15, UK: 18, USA: 22, Australia: 16,
    "New Zealand": 14, Ireland: 14, Netherlands: 13, France: 11, Italy: 9,
    Sweden: 12, Poland: 8, Singapore: 20, UAE: 15, Russia: 7,
    Georgia: 6, Philippines: 6, "South Korea": 12, Malaysia: 8,
  };
  const minimumRequired = MINIMUM_UPFRONT[country] || 8;
  const effectiveCost = Math.max(fin.netOOP, minimumRequired);
  // Budget used as-is — no UG multiplier. Student enters their total budget.
  const adjustedBudget = budget;
  const ratio = adjustedBudget / effectiveCost;
  penalty += ratio >= 1.0 ? 0 : ratio >= 0.75 ? 0.5 : ratio >= 0.55 ? 1.2 : ratio >= 0.35 ? 2.0 : 2.8;

  // ─── 2. IELTS PENALTY ───
  penalty += ielts >= 7 ? 0 : ielts >= 6.5 ? 0.5 : ielts >= 6 ? 1 : ielts >= 5.5 ? 1.5 : 2.5;

  // ─── 3. ACADEMIC PENALTY ───
  penalty += acad >= 65 ? 0 : acad >= 55 ? 0.5 : 1;

  // ─── 4. PR PENALTY ───
  // MOVED to step 14 — after FIELD_ALIGNMENT so waiver flags are respected.
  // Duplicate PR penalties here were causing waived countries (Russia/Georgia/Philippines
  // for MBBS) to still get penalised despite waivePR: true.

  // ─── 5. SAFETY BONUS / PENALTY ───
  if (fin.safety >= 85) base += 0.3;
  else if (fin.safety < 65) penalty += 0.5;

  // ─── 6. VISA EASE BONUS ───
  base += (fin.visaEase / 10) * 0.4;

  // ─── 7. PR TIMELINE BONUS ───
  const prWeight = effectivePr === "High" ? 1.0 : effectivePr === "Med" ? 0.6 : 0.3;
  base += (fin.prScore / 10) * 0.4 * prWeight;

  // ─── 8. EMPLOYMENT BONUS ───
  base += (fin.employment / 10) * 0.3;

  // ─── 9. SALARY PREMIUM ───
  if (fin.salaryEntry >= 45) base += 0.4;
  else if (fin.salaryEntry >= 35) base += 0.25;
  else if (fin.salaryEntry >= 28) base += 0.15;
  else if (fin.salaryEntry >= 20) base += 0.05;

  // ─── 10. 10-YEAR ROI BONUS ───
  if (fin.roi10yr && fin.roi10yr > 0) {
    if (fin.roi10yr >= 50) base += 0.6;
    else if (fin.roi10yr >= 30) base += 0.4;
    else if (fin.roi10yr >= 15) base += 0.25;
    else if (fin.roi10yr >= 8) base += 0.1;
  }
  const lv = LIFETIME_VALUE[country];
  if (lv) {
    if (lv.longTermMultiplier >= 1.4) base += 0.3;
    else if (lv.longTermMultiplier >= 1.25) base += 0.2;
    else if (lv.longTermMultiplier >= 1.1) base += 0.1;
    else if (lv.longTermMultiplier < 0.9) penalty += 0.2;
  }

  // ═══════════════════════════════════════════════════════════════
  // FIELD-COUNTRY ALIGNMENT SYSTEM
  // Checks alignment FIRST and sets penalty waiver flags.
  // For aligned countries, penalties are WAIVED not just offset.
  // ═══════════════════════════════════════════════════════════════
  const FIELD_ALIGNMENT: Record<string, Record<string, { bonus: number; waiveCultural?: boolean; waiveLang?: boolean; waivePR?: boolean; waiveReality?: boolean }>> = {
    // STEM splits
    CS_IT:       { USA: { bonus: 2.0, waiveLang: true }, Canada: { bonus: 1.5 }, Ireland: { bonus: 1.5, waiveLang: true }, UK: { bonus: 1.0 }, Germany: { bonus: 1.0 }, Singapore: { bonus: 1.0 } },
    DataScience: { USA: { bonus: 2.0, waiveLang: true }, Canada: { bonus: 1.5 }, UK: { bonus: 1.0 }, Germany: { bonus: 1.0 }, Ireland: { bonus: 1.5, waiveLang: true } },
    Engineering: { Germany: { bonus: 2.0 }, USA: { bonus: 1.5, waiveLang: true }, Canada: { bonus: 1.0 }, UK: { bonus: 1.0 }, Netherlands: { bonus: 1.0, waiveLang: true } },
    // Medicine splits — waive ALL penalties for MBBS hubs
    MBBS:        {
      // Russia, Georgia, Philippines — FIT_BASE is 5 (vs 8-9 for Western hubs).
      // Need bonus 5.5+ to overcome the base deficit and rank these countries
      // in the top tier for MBBS specifically. Penalties are ALL waived.
      Russia:      { bonus: 5.5, waiveCultural: true, waiveLang: true, waivePR: true, waiveReality: true },
      Georgia:     { bonus: 5.5, waiveCultural: true, waiveLang: true, waivePR: true, waiveReality: true },
      Philippines: { bonus: 5.5, waiveCultural: true, waiveLang: true, waivePR: true, waiveReality: true },
      Poland:      { bonus: 1.5, waiveLang: true },
      Germany:     { bonus: 1.0 },
      UK:          { bonus: 1.0 },
    },
    MD_MS:       { USA: { bonus: 2.0, waiveLang: true }, UK: { bonus: 1.5 }, Germany: { bonus: 1.0 }, Canada: { bonus: 1.0 } },
    MDS:         { USA: { bonus: 2.0, waiveLang: true }, UK: { bonus: 1.5 }, Australia: { bonus: 1.5 }, Canada: { bonus: 1.0 }, Germany: { bonus: 1.0 } },
    Nursing:     { Canada: { bonus: 2.5 }, Australia: { bonus: 2.5 }, UK: { bonus: 2.0 }, Ireland: { bonus: 2.0, waiveLang: true }, Germany: { bonus: 1.5 }, "New Zealand": { bonus: 1.5 } },
    Pharmacy:    { Ireland: { bonus: 2.0, waiveLang: true }, UK: { bonus: 1.5 }, Germany: { bonus: 1.5 }, USA: { bonus: 1.5, waiveLang: true }, Canada: { bonus: 1.0 } },
    Biotech:     { Ireland: { bonus: 2.0, waiveLang: true }, Germany: { bonus: 1.5 }, USA: { bonus: 1.5, waiveLang: true }, Singapore: { bonus: 1.0 } },
    // Business & Creative
    Mgmt:        { USA: { bonus: 2.0, waiveLang: true }, UK: { bonus: 1.5 }, France: { bonus: 1.5, waiveLang: true, waiveCultural: true }, Singapore: { bonus: 1.0 }, Canada: { bonus: 1.0 } },
    Accts:       { Canada: { bonus: 1.5 }, Australia: { bonus: 1.5 }, Ireland: { bonus: 1.5, waiveLang: true }, UK: { bonus: 1.0 }, "New Zealand": { bonus: 1.0 } },
    Arts:        { UK: { bonus: 1.5 }, USA: { bonus: 1.0, waiveLang: true }, Italy: { bonus: 1.0, waiveLang: true, waiveCultural: true }, France: { bonus: 1.0, waiveLang: true, waiveCultural: true } },
    Fashion:     { Italy: { bonus: 2.0, waiveLang: true, waiveCultural: true }, France: { bonus: 2.0, waiveLang: true, waiveCultural: true }, UK: { bonus: 1.0 }, USA: { bonus: 1.5, waiveLang: true } },
    Hotel:       { Switzerland: { bonus: 2.0, waiveLang: true, waiveCultural: true }, UAE: { bonus: 1.5, waiveLang: true }, Australia: { bonus: 1.0 }, UK: { bonus: 0.5 } },
    Journalism:  { UK: { bonus: 2.0 }, USA: { bonus: 1.5, waiveLang: true }, Australia: { bonus: 1.0 } },
    Media:       { USA: { bonus: 2.0, waiveLang: true }, UK: { bonus: 1.5 }, "South Korea": { bonus: 1.5 }, Canada: { bonus: 1.0 } },
  };

  const alignment = FIELD_ALIGNMENT[major]?.[country];
  if (alignment) {
    base += alignment.bonus;
  }

  // ═══════════════════════════════════════════════════════════════
  // MBBS NON-ALIGNED COUNTRY PENALTY
  // USA/UK/Canada/Australia medical schools cost $200K-400K and have
  // 3-4% international acceptance. Not realistic for Indian MBBS seekers.
  // Germany language barrier + state exam makes it hard. Ireland limited seats.
  // Only aligned MBBS hubs + Poland/Germany/UK get no penalty.
  // ═══════════════════════════════════════════════════════════════
  if (major === "MBBS" && !alignment) {
    const MBBS_POOR_DESTINATIONS = ["USA", "Canada", "Australia", "New Zealand", "Singapore", "Ireland", "Netherlands", "Sweden", "France", "Italy", "South Korea", "UAE", "Malaysia"];
    if (MBBS_POOR_DESTINATIONS.includes(country)) {
      penalty += 2.5; // Severe penalty — not a viable MBBS destination
    }
  }

  // ─── 11. GERMANY REALITY CHECK ───
  // WAIVED for aligned fields where country-specific hardships are expected
  if (alignment?.waiveReality) {
    // No reality check penalty — student is prepared for destination conditions
  } else {
    if (country === "Germany") {
      penalty += 1.0;
      if (budget < 20) penalty += 0.8;
    }
  }

  // ─── 12. CULTURAL BARRIER ───
  // WAIVED for aligned fields where culture is an asset (e.g., MBBS in Russia)
  if (alignment?.waiveCultural) {
    // No penalty — studying in the local culture is part of the experience
  } else {
    const cb = CULTURAL_BARRIER[country];
    if (cb) {
      // Convert level string to numeric penalty
      const cbPenalty = cb.level === "high" ? 1.2 : cb.level === "moderate" ? 0.8 : 0.5;
      penalty += cbPenalty;
    }
  }

  // ─── 13. LANGUAGE BARRIER PENALTY ───
  // WAIVED for aligned fields where English programs exist (MBBS is English-taught)
  const langPenalty: Record<string, number> = {
    France: 0.6, Italy: 0.6, Poland: 0.5, Russia: 0.8,
    Sweden: 0.3, Netherlands: 0.1, "South Korea": 0.7, UAE: 0.1,
    Georgia: 0.3, Philippines: 0.1, Malaysia: 0.1, Singapore: 0,
  };
  if (alignment?.waiveLang) {
    // No language penalty — programs are English-taught or language is part of training
  } else {
    penalty += langPenalty[country] || 0;
  }

  // ─── 14. PR PENALTY ───
  // WAIVED for aligned medical countries (MBBS students typically return to India)
  if (alignment?.waivePR) {
    // No PR penalty — MBBS students clear FMGE/NEXT and practice in India
  } else {
    if (effectivePr === "High" && (country === "UAE" || country === "Philippines")) penalty += 2;
    if (effectivePr === "High" && fin.prScore < 5) penalty += 0.5;
  }

  // ─── 15. WORK EXPERIENCE BONUS ───
  if (workExp) {
    const weBonus = (WORK_EXP_VISA_BONUS[country]?.[workExp] || 0) / 10;
    if (level === "PG") base += weBonus * 0.8;
    else base += weBonus * 0.3;
  }

  // ─── 16. MBA WORK EX PENALTY ───
  if (level === "PG" && major === "Mgmt" && (workExp === "0" || workExp === "0-1")) {
    penalty += 1.0;
  }

  return Math.max(0, Math.min(10, Math.round((base - penalty) * 10) / 10));
}

function evaluateAll(params: { courseType: CourseType; level: Level; major: Major; budget: number; prPriority: PRPriority; ielts: number; track: Track; region: RegionFilter; workExp: WorkExpLevel; acad: number }) {
  const { courseType, level, major, budget, prPriority, ielts, track, region, workExp, acad } = params;
  let countries = COUNTRIES;
  const effectiveRegion = region || "Any";
  if (effectiveRegion !== "Any") {
    countries = COUNTRIES.filter(c => c === effectiveRegion);
    if (countries.length === 0) countries = COUNTRIES;
  }
  const results = countries.map(country => {
    const s = score(country, track, level, major, budget, prPriority, ielts, acad, workExp, courseType);
    const fin = compute(country, track, level, major, courseType);
    const weBonus = getWorkExpBonus(country, workExp);
    return {
      country, score: s, ...fin,
      visa: VISA[country], pr: PR_PATH[country], job: JOB[country],
      jobNumeric: fin.employment,
      workExpBonus: weBonus,
      idealBudget: fin.idealBudget,
      lifetimeValue: fin.lifetimeValue,
      lifetimeROI: fin.lifetimeROI,
      salaryRange: fin.salaryRange,
      salaryEntry: fin.salaryEntry,
      salarySenior: fin.salarySenior,
      _rank: 0
    };
  });
  results.sort((a, b) => b.score - a.score || a.country.localeCompare(b.country));
  results.forEach((r, i) => r._rank = i + 1);
  return results;
}

const formatROI = (r: number | null) => r === null ? "—" : `${r}x`;
const formatMoney = (v: number) => `₹${v.toFixed(1)}L`;
const scoreColor = (s: number) => s >= 7.5 ? "text-emerald-600" : s >= 5 ? "text-amber-600" : "text-red-600";
const roiColor = (r: number | null) => { if (r === null) return "text-gray-500"; return r >= 2 ? "text-emerald-600" : r >= 1 ? "text-amber-600" : "text-red-600"; };
const jobBg = (j: string) => j === "High" ? "bg-emerald-100 text-emerald-700" : j === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

/* ---- Consultant Contact Modal ---- */
function ConsultantModal({ country, consultants, onClose }: { country: string; consultants: Consultant[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col border border-slate-700" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between shrink-0 border-b border-slate-700">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-400" /> Consultants for {country}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">{consultants.length} verified consultants available</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Consultant List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-slate-900">
          {consultants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No consultants listed for this country yet.</p>
            </div>
          ) : (
            consultants.map(c => (
              <div key={c.id} className="border border-slate-700 rounded-xl p-4 hover:border-teal-500/40 hover:bg-slate-800/50 transition-all bg-slate-800/30">
                {/* Top row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg shadow-teal-500/20">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-sm truncate">{c.name}</h4>
                      {c.verified && <BadgeCheck className="w-4 h-4 text-teal-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-400">{c.title} · {c.experience} · {c.successRate} success</p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.specialization.slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 bg-slate-700/80 rounded-full text-slate-300 border border-slate-600">{s}</span>
                  ))}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <a href={`mailto:${c.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-semibold hover:bg-teal-500/20 transition-colors border border-teal-500/20">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                  <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-3 border-t border-slate-700 bg-slate-800/50 text-center">
          <p className="text-[10px] text-slate-500">All consultants are verified by Kohortconnect</p>
        </div>
      </div>
    </div>
  );
}

const DE_FORM_KEY = "kc_de_form_state";

/* ---- Main Page ---- */
export default function Evaluate() {
  // All content free — no login required
  const [effectiveAuth] = useState(true);
  const [hasPremium] = useState(true);

  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PREMIUM_BUNDLE.id);

  /* Load saved form state from localStorage (for returning from payment etc.) */
  const savedForm = (() => {
    try {
      const raw = localStorage.getItem(DE_FORM_KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return null;
  })();

  /* Load pre-filled data from Smart Match if available */
  const prefilled = (() => {
    try {
      const raw = localStorage.getItem("kc_smartmatch_data");
      if (raw) { localStorage.removeItem("kc_smartmatch_data"); return JSON.parse(raw); }
    } catch { /* ignore */ }
    return null;
  })();

  // All fields start empty after logout — user MUST select each one
  // Also check ProfileContext for pre-filled values from homepage
  const profileCtx = JSON.parse(localStorage.getItem("kc_user_profile") || "{}");
  
  // Selection fields always start fresh — user must choose each time
  const initialCourseType: CourseType = "";
  const initialLevel: Level = "";
  const initialMajor: Major = "";
  const initialBudget: number = 0;
  const initialPr: PRPriority = (savedForm?.prPriority as PRPriority) || "";
  const initialIelts: number = savedForm?.ielts ?? 0;
  const initialTrack: Track = (savedForm?.track as Track) || "Private";
  const initialRegion: RegionFilter = savedForm?.region || "";
  const initialWorkExp: WorkExpLevel = savedForm?.workExp || "";
  const initialEngineStarted: boolean = savedForm?.engineStarted || false;

  const [courseType, setCourseType] = useState<CourseType>(initialCourseType);
  const [level, setLevel] = useState<Level>(initialLevel);
  const [major, setMajor] = useState<Major>(initialMajor);
  const [budget, setBudget] = useState<number>(initialBudget);
  const [prPriority, setPrPriority] = useState<PRPriority>(initialPr);
  const [ielts, setIelts] = useState<number>(initialIelts);
  const [track, setTrack] = useState<Track>(initialTrack);
  const [region, setRegion] = useState<RegionFilter>(initialRegion);
  const [workExp, setWorkExp] = useState<WorkExpLevel>(initialWorkExp);
  const [engineStarted, setEngineStarted] = useState<boolean>(initialEngineStarted);
  const [examScore, setExamScore] = useState<number>(0);
  const [acad, setAcad] = useState<number>(80);

  /* ═══════ ACCESS CONTROL: Use outer effectiveAuth + hasPremium ═══════ */
  const accessLevel = !effectiveAuth ? "none" : hasPremium ? "premium" : "basic";
  const canSaveProfile = effectiveAuth;

  // Load saved decision profile for logged-in users
  const { data: savedProfile } = trpc.deProfile.get.useQuery(undefined, {
    enabled: effectiveAuth,
    staleTime: Infinity,
  });

  // Save mutation
  const saveProfileMutation = trpc.deProfile.save.useMutation();

  // Pre-fill form from saved profile for logged-in users on first load
  useEffect(() => {
    if (savedProfile && effectiveAuth && !engineStarted) {
      if (savedProfile.major) setMajor(savedProfile.major as Major);
      if (savedProfile.level) setLevel(savedProfile.level as Level);
      if (savedProfile.budget) setBudget(savedProfile.budget);
      if (savedProfile.ielts) setIelts(parseFloat(savedProfile.ielts));
      if (savedProfile.prPriority) setPrPriority(savedProfile.prPriority as PRPriority);
      if (savedProfile.academicScore) setAcad(savedProfile.academicScore);
      if (savedProfile.workExp) setWorkExp(savedProfile.workExp as WorkExpLevel);
      if (savedProfile.courseType) setCourseType(savedProfile.courseType as CourseType);
    }
  }, [savedProfile, effectiveAuth]);

  /* ═══════ DERIVED: Get exam config based on level + major ═══════ */
  const examConfig = useMemo(() => getExamConfig(level, major), [level, major]);

  /* ═══════ DYNAMIC BUDGET HINT — popular Indian destinations, low/mid/high ranges ═══════ */
  const budgetHint = useMemo(() => {
    if (!courseType || !level || !major) return null;
    // Popular destinations for Indian students — 1 budget, 2 mid, 2 premium
    const POPULAR_TIER: Record<string, "budget" | "mid" | "premium"> = {
      Russia: "budget", Poland: "budget",
      Germany: "mid", Canada: "mid", Ireland: "mid",
      UK: "premium", USA: "premium", Australia: "premium",
    };
    const hints = Object.entries(POPULAR_TIER).map(([country, tier]) => {
      const fin = compute(country, track, level, major, courseType);
      return { country, idealBudget: fin.idealBudget, tier };
    });
    const nonZero = hints.filter(h => h.idealBudget > 0);
    if (nonZero.length === 0) return null;
    // Range across all tiers
    const allBudgets = nonZero.map(h => h.idealBudget);
    const low = Math.round(Math.min(...allBudgets));
    const high = Math.round(Math.max(...allBudgets));
    // Pick 5: 1 budget + 2 mid + 2 premium (most popular Indian destinations)
    const budgetPick = nonZero.filter(h => h.tier === "budget").sort((a, b) => a.idealBudget - b.idealBudget)[0];
    const midPicks = nonZero.filter(h => h.tier === "mid").sort((a, b) => a.idealBudget - b.idealBudget).slice(0, 2);
    const premiumPicks = nonZero.filter(h => h.tier === "premium").sort((a, b) => a.idealBudget - b.idealBudget).slice(0, 2);
    const top5 = [budgetPick, ...midPicks, ...premiumPicks].filter(Boolean);
    return { low, high, top5 };
  }, [courseType, level, major, track]);

  /* Consultant modal state */
  const [consultantModal, setConsultantModal] = useState<{ country: string; consultants: Consultant[] } | null>(null);
  const [courseModal, setCourseModal] = useState<{ country: string; programs: ProgramRec[] } | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  function validateAndStart() {
    const errors: string[] = [];
    if (!courseType) errors.push("Select Course Type");
    if (!level) errors.push("Select Education Level");
    if (!major) errors.push("Select Major / Field");
    if (budget <= 0 || !budget) errors.push("Enter your budget (₹ Lakhs)");
    if (ielts <= 0 || !ielts) errors.push("Enter your IELTS score");
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    setEngineStarted(true);

    // Save profile to backend for logged-in users
    if (canSaveProfile) {
      saveProfileMutation.mutate({
        major,
        level,
        budget,
        ielts: ielts.toString(),
        prPriority,
        academicScore: acad,
        workExp,
        courseType,
      });
    }
  }

  // Persist form state to localStorage on every change
  useEffect(() => {
    localStorage.setItem(DE_FORM_KEY, JSON.stringify({ courseType, level, major, budget, prPriority, ielts, track, region, workExp, engineStarted }));
  }, [courseType, level, major, budget, prPriority, ielts, track, region, workExp, engineStarted]);

  // Auto-start engine when returning after payment (authenticated + valid data)
  useEffect(() => {
    if (effectiveAuth && budget > 0 && ielts > 0 && !engineStarted) {
      setEngineStarted(true);
    }
  }, [effectiveAuth]); // only trigger on auth change

  // Only compute results after user clicks "Start Engine" AND values are valid
  const [resultsError, setResultsError] = useState<string | null>(null);
  const results = useMemo(() => {
    setResultsError(null);
    if (!engineStarted || budget <= 0 || ielts <= 0) return [];
    try {
      return evaluateAll({ courseType, level, major, budget, prPriority, ielts, track, region, workExp, acad });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[DecisionEngine] evaluateAll crashed:", msg);
      setResultsError(`Calculation error: ${msg}`);
      return [];
    }
  }, [engineStarted, courseType, level, major, budget, prPriority, ielts, track, region, workExp, acad]);

  // ═══ ACCESS CONTROL: Filter results based on user tier ═══
  // non-logged-in: top 5, basic: top 11, premium: all 22
  const d = useMemo(() => {
    const maxResults = !effectiveAuth ? 5 : hasPremium ? 22 : 11;
    const visibleResults = (results || []).slice(0, maxResults);
    return {
      maxResults,
      visibleResults,
      lockedCount: (results || []).length - visibleResults.length,
      top3: visibleResults.slice(0, 3),
      trackLabel: track === "Govt" ? "Government" : "Private",
      regionLabel: !region || region === "Any" ? "All Countries" : region,
    };
  }, [effectiveAuth, hasPremium, results, track, region]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/20">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">22 Countries Analysed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Study Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500 italic font-serif">Decision Engine</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl">
            Profile yourself in 90 seconds. See Net Out-of-Pocket, ROI, and your top 3 destinations ranked by fit score.
          </p>
        </div>
      </section>

      {/* Profile Gate — Required before using Decision Engine */}
      {!effectiveAuth && (
        <section className="px-4 sm:px-6 lg:px-8 pb-5">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Free Profile to Unlock the Decision Engine</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    We need your profile to personalise recommendations and connect you with the right consultants.
                    It takes 2 minutes — no credit card required. See all 22 countries ranked with full financial breakdowns, salary data, and ROI analysis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-sm hover:from-teal-500 transition-all shadow-lg shadow-teal-600/25"
                    >
                      <User className="w-4 h-4" /> Create Free Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/smart-match"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" /> Try Smart Match First
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-amber-200/60 flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start">
                <span className="text-[11px] text-amber-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 90-Second Profile</span>
                <span className="text-[11px] text-amber-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Free Forever</span>
                <span className="text-[11px] text-amber-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> No Spam Guarantee</span>
                <span className="text-[11px] text-amber-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 2,500+ Students Trust Us</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works — Tutorial Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">How to Use — 4 Simple Steps</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <StepCard num="1" icon={MousePointer} title="Fill All Fields" desc="Select course type, education level, major, budget & IELTS score. All fields marked with * are required." />
                <StepCard num="2" icon={BarChart3} title="Pick Institution Track" desc="Private (default) shows all options. Government filters for subsidized/public universities — lower cost, competitive entry." />
                <StepCard num="3" icon={FileText} title="Review Your Scores" desc="See your top 3 best-matched countries instantly with detailed financial breakdowns." />
                <StepCard num="4" icon={Award} title="Explore Full Rankings" desc="Scroll down to see all 22 countries ranked with salary data, ROI analysis, and personalized recommendations." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-filled from Smart Match */}
      {prefilled && (
        <section className="px-4 sm:px-6 lg:px-8 pb-5">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-teal-800 mb-1">Data pre-filled from your Smart Match</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white text-teal-700 border-teal-200 text-xs">Budget: ₹{prefilled.budget}L</Badge>
                  <Badge className="bg-white text-teal-700 border-teal-200 text-xs">Major: {prefilled.major}</Badge>
                  <Badge className="bg-white text-teal-700 border-teal-200 text-xs">Level: {prefilled.level}</Badge>
                  <Badge className="bg-white text-teal-700 border-teal-200 text-xs">{prefilled.track === "Govt" ? "Government" : "Private"} Track</Badge>
                  <Badge className="bg-white text-teal-700 border-teal-200 text-xs">PR Priority: {prefilled.prPriority}</Badge>
                </div>
              </div>
              <button onClick={() => { localStorage.removeItem("kc_smartmatch_data"); window.location.reload(); }} className="text-xs text-teal-600 hover:text-teal-800 underline shrink-0">
                Reset All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* AUTH GATE: Track Toggle + Inputs + Results — hidden for non-authenticated users */}
      {effectiveAuth && (
      <>
      {/* Track Toggle */}
      <section className="px-4 sm:px-6 lg:px-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-3 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Institution Track</span>
            <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
              {(["Private", "Govt"] as Track[]).map(t => (
                <button key={t} onClick={() => setTrack(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${track === t ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:text-slate-200"}`}>
                  {t === "Govt" ? (
                    <><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Government</>
                  ) : "Private"}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 ml-auto hidden sm:inline-flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> = subsidized fees, competitive entry
            </span>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-6">
            <div className="absolute-bar" />
            {/* Choose prompt banner */}
            <div className="mb-5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <MousePointer className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-sm font-semibold text-blue-800">
                Please select from the options below — all fields marked with <span className="text-red-500">*</span> are required.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="Course Type" required>
                <select value={courseType} onChange={e => { setCourseType(e.target.value as CourseType); setFormErrors([]); }} className="form-select" required>
                  <option value="" disabled>— Choose —</option>
                  <option value="Academic">Academic (Degree)</option>
                  <option value="Vocational">Vocational Courses (PR Pathways)</option>
                </select>
              </Field>
              <Field label="Education Level" required>
                <select value={level} onChange={e => { setLevel(e.target.value as Level); setExamScore(0); setFormErrors([]); }} className="form-select" required>
                  <option value="" disabled>— Choose —</option>
                  <option value="UG">UG (Bachelors / Diploma)</option>
                  <option value="PG">PG (Masters)</option>
                </select>
              </Field>
              <Field label="Major / Field" required>
                <select
                  value={major}
                  onChange={e => { setMajor(e.target.value as Major); setExamScore(0); setFormErrors([]); }}
                  className="form-select"
                  required
                  disabled={!courseType || !level}
                >
                  <option value="" disabled>{!courseType || !level ? "Select above first" : "— Choose —"}</option>
                  {getValidMajors(courseType, level).map(m => (
                    <option key={m} value={m}>{MAJOR_LABEL[m]}</option>
                  ))}
                </select>
                {!courseType || !level ? (
                  <p className="text-[10px] text-amber-600 mt-1">Select Course Type &amp; Level first</p>
                ) : null}
              </Field>
              <Field label="Budget (₹ Lakhs)" required>
                <input type="number" min={5} max={300} value={budget || ""} onChange={e => { setBudget(+e.target.value); setFormErrors([]); }} className="form-input" placeholder={budgetHint ? `₹${budgetHint.low}L–₹${budgetHint.high}L` : "e.g. 25"} required />
                {budgetHint && (
                  <p className="text-[10px] text-teal-600 mt-1 flex items-start gap-1">
                    <Target className="w-3 h-3 shrink-0 mt-0.5" />
                    {budgetHint.top5.map((h, i) => (
                      <span key={h.country}>
                        {h.country}: ₹{Math.round(h.idealBudget)}L{i < budgetHint.top5.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </Field>
              <Field label="PR Priority">
                <select value={prPriority} onChange={e => setPrPriority(e.target.value as PRPriority)} className="form-select">
                  <option value="" disabled>— Choose —</option>
                  <option value="High">High — PR is top goal</option>
                  <option value="Med">Medium</option>
                  <option value="Low">Low — May return to India</option>
                </select>
              </Field>
              <Field label="IELTS Score" required>
                <input type="number" min={4} max={9} step={0.5} value={ielts || ""} onChange={e => { setIelts(+e.target.value); setFormErrors([]); }} className="form-input" placeholder="e.g. 7.0" required />
              </Field>
              <Field label="Work Experience">
                <select value={workExp} onChange={e => setWorkExp(e.target.value as WorkExpLevel)} className="form-select">
                  <option value="" disabled>— Choose —</option>
                  <option value="0">Fresher (0 years)</option>
                  <option value="0-1">&lt; 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-4">2-4 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="6+">6+ years</option>
                </select>
                {(() => {
                  const req = getWorkExReq(level, major);
                  if (!req) return null;
                  return (
                    <p className="text-[10px] text-amber-600 mt-1 flex items-start gap-1">
                      <Briefcase className="w-3 h-3 shrink-0 mt-0.5" />
                      {req.note}
                    </p>
                  );
                })()}
              </Field>
              <Field label="Region / Country">
                <select value={region || ""} onChange={e => setRegion(e.target.value as RegionFilter || "Any")} className="form-select">
                  <option value="" disabled>— Choose —</option>
                  <option value="Any">All 22 Countries</option>
                  <optgroup label="North America">
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                  </optgroup>
                  <optgroup label="Europe — Western">
                    <option value="UK">UK</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Italy">Italy</option>
                  </optgroup>
                  <optgroup label="Europe — Eastern">
                    <option value="Poland">Poland</option>
                    <option value="Russia">Russia</option>
                    <option value="Georgia">Georgia</option>
                  </optgroup>
                  <optgroup label="Asia-Pacific">
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Philippines">Philippines</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Malaysia">Malaysia</option>
                  </optgroup>
                  <optgroup label="Middle East">
                    <option value="UAE">UAE</option>
                  </optgroup>
                </select>
              </Field>
              {/* ═══════════════════════════════════════════════════════════════
                  DYNAMIC EXAM FIELD — changes based on Level + Major
                  ═══════════════════════════════════════════════════════════════ */}
              <Field label={examConfig ? examConfig.label : "Exam Score"} required>
                <div className="relative">
                  {examConfig && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <examConfig.icon className="w-4 h-4" />
                    </div>
                  )}
                  <input 
                    type="number" 
                    min={examConfig?.min || 0} 
                    max={examConfig?.max || 100} 
                    step={examConfig?.step || 1}
                    value={examScore || ""} 
                    onChange={e => { setExamScore(+e.target.value); setFormErrors([]); }} 
                    className={`form-input ${examConfig ? 'pl-10' : ''}`}
                    placeholder={examConfig?.placeholder || "Enter score"}
                    required 
                    disabled={!level || !major}
                  />
                  {examConfig && examScore > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">
                      {examConfig.unit}
                    </span>
                  )}
                </div>
                {/* Helper text below input */}
                {examConfig ? (
                  <p className="text-[10px] text-slate-500 mt-1 flex items-start gap-1">
                    <Sparkles className="w-3 h-3 text-teal-500 shrink-0 mt-0.5" />
                    {examConfig.helperText}
                  </p>
                ) : (
                  <p className="text-[10px] text-amber-600 mt-1">
                    Select Level and Major first to see your required exam
                  </p>
                )}
              </Field>
            </div>
            {/* Start Engine Button */}
            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={validateAndStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-sm hover:from-teal-500 transition-all shadow-lg shadow-teal-600/25"
              >
                <Zap className="w-5 h-5" /> {engineStarted ? "Recalculate Results" : "Start Engine"}
              </button>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <span className="text-red-500">*</span> = Required fields. Budget & IELTS must be &gt; 0.
              </p>
              {formErrors.length > 0 && (
                <div className="mt-2 space-y-1">
                  {formErrors.map(e => (
                    <p key={e} className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{e}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results only shown after engine started */}
      {!engineStarted ? (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <Calculator className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Calculate</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-2">Set your <strong className="text-slate-700">Budget</strong> and <strong className="text-slate-700">IELTS score</strong> (both required), then click <strong className="text-teal-600">Start Engine</strong> to see your top country recommendations.</p>
            <p className="text-xs text-slate-400">We analyse 22 countries across tuition, living costs, earnings, safety, visa ease & PR pathways.</p>
          </div>
        </section>
      ) : (
        <>
      {/* Error display if results computation failed */}
      {resultsError && (
        <section className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-7xl mx-auto bg-red-50 border-2 border-red-300 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-bold text-red-800 text-sm">Something went wrong with the calculation</span>
            </div>
            <p className="text-xs text-red-600 font-mono">{resultsError}</p>
            <p className="text-xs text-red-500 mt-2">Please try refreshing the page or contact support.</p>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE RESULTS: 3-Step Journey (Countries → Courses → Consultants)
          Hidden on md+. Shown only below 768px.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="md:hidden px-4 pb-24">
        {/* Data Disclaimer — Mobile */}
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              All scores are <strong>estimates for planning only</strong>. Last reviewed: {DATA_META.lastUpdated}.
            </p>
            <p className="text-[10px] text-amber-600 mt-0.5">
              Verify on official sources before applying.
            </p>
          </div>
        </div>
        <MobileResultsJourney
          results={results}
          top3={d.top3}
          budget={budget}
          courseType={courseType}
          level={level}
          major={major}
          hasPremium={hasPremium}
          trackLabel={track === "Govt" ? "Government" : "Private"}
          regionLabel={!region || region === "Any" ? "All Countries" : region}
          onCourseClick={(country) => {
            const allRecs = getCourseRecommendations(courseType, level, major);
            const countryRecs = allRecs.filter(p => p.topCountries.includes(country));
            setCourseModal({ country, programs: countryRecs.length > 0 ? countryRecs : allRecs.slice(0, 3) });
          }}
          onConsultantClick={(country) => {
            const did = COUNTRY_TO_ID[country];
            if (did) setConsultantModal({ country, consultants: getConsultantsForCountry(did) });
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP RESULTS: Card Grid (md+ only)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="hidden md:block px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Data Disclaimer Banner */}
          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                All scores and costs are <strong>estimates for planning only</strong>. Data last reviewed: {DATA_META.lastUpdated}.
                Verify current fees, visa rules and living costs on official university and government websites before applying.
              </p>
              <p className="text-[10px] text-amber-600 mt-1">
                Sources: {DATA_META.sources}
              </p>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-5 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Top 3 Recommendations</h2>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">{d.trackLabel} &middot; {courseType || "—"} &middot; {level || "—"} &middot; {MAJOR_LABEL[major] || "—"} &middot; {d.regionLabel}</span>
          </div>

          {/* Top 3 — uses CountryCard with top3 variant + rank colors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {top3.map((r, idx) => {
              const isBlurred = !hasPremium && idx < 2;
              return (
                <CountryCard
                  key={r.country}
                  r={r}
                  budget={budget}
                  courseType={courseType}
                  level={level}
                  major={major}
                  variant="top3"
                  rankIndex={idx}
                  isBlurred={isBlurred}
                  onCourseClick={() => {
                    const allRecs = getCourseRecommendations(courseType, level, major);
                    const countryRecs = allRecs.filter(p => p.topCountries.includes(r.country));
                    setCourseModal({ country: r.country, programs: countryRecs.length > 0 ? countryRecs : allRecs.slice(0, 3) });
                  }}
                  onConsultantClick={() => {
                    const did = COUNTRY_TO_ID[r.country];
                    if (did) setConsultantModal({ country: r.country, consultants: getConsultantsForCountry(did) });
                  }}
                />
              );
            })}
          </div>

          {/* Upgrade CTA for #1 and #2 */}
          {!hasPremium && (
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">See Your #1 and #2 Matches</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-4">
                Your #1 and #2 best-matched countries — scroll down to see the full rankings.
                Unlock to see your full ranking and detailed financials.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors">
                  <Users className="w-4 h-4" /> Sign In Free <ArrowRight className="w-4 h-4" />
                </Link>
                {!inCart ? (
                  <button
                    onClick={() => addItem(PREMIUM_BUNDLE)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 rounded-xl font-semibold text-sm hover:from-amber-300 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart — ₹999
                  </button>
                ) : (
                  <Link
                    to="/checkout"
                    onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-teal-400 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" /> Go to Checkout
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Full Results — ALL countries as cards (desktop only) */}
          <div className="relative rounded-2xl border-2 border-slate-200 bg-slate-50/80 shadow-xl overflow-hidden p-4 sm:p-6">
            {/* Header bar */}
            <div className="bg-slate-900 rounded-xl px-4 py-3 flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
                {(d.visibleResults).length < results.length
                  ? `Top ${(d.visibleResults).length} of ${results.length} Countries`
                  : `All ${results.length} Countries Ranked`}
              </span>
              <span className="text-[10px] text-slate-500">
                "Showing all 22 countries"
              </span>
            </div>

            {/* Card Grid: 2 col tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((r, idx) => (
                <CountryCard
                  key={r.country}
                  r={r}
                  budget={budget}
                  courseType={courseType}
                  level={level}
                  major={major}
                  variant="ranked"
                  rankIndex={idx}
                  onCourseClick={() => {
                    const allRecs = getCourseRecommendations(courseType, level, major);
                    const countryRecs = allRecs.filter(p => p.topCountries.includes(r.country));
                    setCourseModal({ country: r.country, programs: countryRecs.length > 0 ? countryRecs : allRecs.slice(0, 3) });
                  }}
                  onConsultantClick={() => {
                    const did = COUNTRY_TO_ID[r.country];
                    if (did) setConsultantModal({ country: r.country, consultants: getConsultantsForCountry(did) });
                  }}
                />
              ))}
            </div>

            {/* Results lock overlay — shown when not all countries visible */}
            {((results || []).length - (d.visibleResults).length) > 0 && (
              <div className="mt-8 relative rounded-2xl overflow-hidden border border-amber-200/50">
                <div className="bg-gradient-to-r from-amber-500/5 to-purple-500/5 p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {((results || []).length - (d.visibleResults).length)} more countries hidden
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-5">
                    {effectiveAuth
                      ? `All ${results.length} countries ranked with major-specific salary data, ROI analysis, and personalized recommendations.`
                      : `Login and upgrade to Premium to unlock all ${results.length} country rankings with major-specific salary data, ROI analysis, and personalized recommendations.`}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {!effectiveAuth ? (
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
                      >
                        Login to Unlock
                      </Link>
                    ) : (
                      <Link
                        to="/premium"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all shadow-lg"
                      >
                        <Sparkles className="w-4 h-4" />
                        View Full Rankings
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Blur overlay for non-premium */}
            {!hasPremium && (
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/40 backdrop-blur-[4px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mb-4">
                  <Table2 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">22 Countries Compared</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-2 text-center">
                  Your complete ranking across all 19 destinations. All amounts in ₹ Lakhs. Score is out of 10.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-5 max-w-lg">
                  {["Tuition","Living","Earnings","Net OOP","ROI","Salary","Jobs","Safety","Visa","PR","Funds Required","Cultural Warnings"].map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-500"><CheckCircle2 className="w-2.5 h-2.5 text-teal-500" />{tag}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {!inCart ? (
                    <button
                      onClick={() => addItem(PREMIUM_BUNDLE)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold text-sm hover:from-amber-400 shadow-lg shadow-amber-500/25 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart — ₹999
                    </button>
                  ) : (
                    <Link
                      to="/checkout"
                      onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:from-amber-400 shadow-lg shadow-teal-500/25 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" /> Go to Checkout
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
        </>
      )}
      </>)}

      {/* How Calculations Work */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">How We Calculate Everything</h2>
            <p className="text-slate-600">Click any card to see a worked example.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <InfoCard icon={DollarSign} title="Tuition" color="blue" formula="STEM Baseline × Stream Multiplier"
              explain="Every country has a STEM baseline. Your major applies a multiplier — Medicine ~1.8x, Arts ~0.8x."
              example="Germany STEM: ₹1L × 1.0 = ₹1L (public uni). USA STEM: ₹35L × 1.0 = ₹35L. Medicine: 1.8× multiplier everywhere." />
            <InfoCard icon={Home} title="Living Cost" color="amber" formula="Per Year × Duration (+10%/yr inflation)"
              explain="Living costs increase 10% every year (rent, food, transport inflation). Year 1 = base, Year 2 = +10%, Year 3 = +21%, Year 4 = +33%."
              example="Canada: ₹13L + ₹14.3L + ₹15.7L + ₹17.3L = ₹60.3L total (not ₹52L flat). This makes budgets more realistic." />
            <InfoCard icon={Wallet} title="Part-Time Earnings" color="emerald" formula="Earn/Year × Duration"
              explain="Based on local minimum wage and legal work hours (10-20 hrs/week). Longer courses = more total earnings."
              example="Canada: ₹10.8L/yr × 4 yrs = ₹43.2L total earnings over the course." />
            <InfoCard icon={Target} title="Net Out-of-Pocket" color="teal" formula="Tuition + Inflated Living − Earnings"
              explain="The real number your family pays. Living costs include 10% annual inflation. This is what your budget and Ideal Budget are compared against."
              example="Tuition ₹30L + Living ₹60L (with 10%/yr inflation) − Earnings ₹43L = Net OOP ₹47L. Higher but more realistic." />
            <InfoCard icon={Banknote} title="Ideal Budget" color="cyan" formula="Net OOP × 1.2"
              explain="The budget you need for zero budget penalty — Net OOP plus 20% comfort buffer. Green = within reach, Amber = close, Red = gap."
              example="Net OOP ₹39L × 1.2 = ₹46.8L Ideal Budget. If you have ₹35L, you are in the amber zone — doable with adjustments." />
            <InfoCard icon={Briefcase} title="Work Experience" color="orange" formula="Visa Points Bonus"
              explain="Your work experience adds visa/PR points in countries like Canada, Australia, Germany. More experience = higher score."
              example="4 years experience in Canada: +8 visa points. MBA without experience gets a penalty since top B-schools require 2+ years." />
            <InfoCard icon={TrendingUp} title="3-Year ROI" color="rose" formula="3yr Post-Tax Income ÷ Net OOP"
              explain="Cumulative take-home pay over 3 years (after tax), starting from entry-level salary with 10% annual growth for promotions. Shows how quickly you recover your education investment."
              example="Canada: ₹45L entry, 25% tax, 10% growth → 3yr post-tax ≈ ₹52L ÷ ₹25L Net OOP = 5.2x. Investment recovered within 3 years." />
            <InfoCard icon={Sparkles} title="10-Year ROI" color="emerald" formula="10yr Post-Tax Income ÷ Net OOP"
              explain="Your cumulative take-home pay over 10 years (after tax + social contributions), with salary growing 10% annually for promotions. Pure income — no healthcare or education savings included."
              example="Canada: ₹45L entry, 25% tax, 10% growth → 10yr post-tax ≈ ₹221L ÷ ₹25L Net OOP = 48x return." />
            <InfoCard icon={DollarSign} title="Salary Range" color="amber" formula="Entry → Mid → Senior"
              explain="We show salary as a range (₹38–85L for Canada) not a single number. Bonus uses entry-level salary (conservative). Scoring uses senior-level for long-term value."
              example="USA: ₹50L entry → ₹85L mid → ₹150L senior. Bonus: +0.4 for ₹50L+ entry. Canada: ₹38L → ₹55L → ₹85L. Bonus: +0.25." />
            <InfoCard icon={Clock} title="UG Budget Scaling" color="indigo" formula="Budget × 1.6 for UG"
              explain="UG courses cost ~60% more (4 years vs 2). We scale your budget expectation so UG courses are not unfairly penalized."
              example="You enter ₹30L budget for UG. We compare against ₹48L adjusted budget — so USA UG does not get a harsh penalty." />
            <InfoCard icon={Shield} title="PR Pathway Weighting" color="violet" formula="PR Score × Your Priority"
              explain="PR importance is weighted by YOUR priority. High PR priority = full weight. Low priority = 30% weight. USA scores better if PR is not your focus."
              example="PR Priority = Low: USA's PR score of 4/10 only contributes 30%. Priority = High: Canada PR 9/10 gets full 100% weight." />
            <InfoCard icon={Star} title="Final Match Score" color="teal" formula="Base + All Bonuses − All Penalties"
              explain="Combines everything: budget fit (with 10% COL inflation), IELTS, academics, safety, visa ease, salary range (entry→senior), 3-year ROI, lifetime value, work experience, PR pathway weighting."
              example="Canada: Base 5.4 + Entry Salary 0.25 + Lifetime 0.6 + Visa 0.36 + Safety 0.3 − Budget 0 = ~7.1. USA Low PR priority: ~6.5 despite higher salary." />
          </div>
        </div>
      </section>

      {/* Tips + Counsellor CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center"><Lightbulb className="w-4 h-4" /></div>
              <h3 className="text-sm font-bold font-mono tracking-wider uppercase">Reading Your Results</h3>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="border-l-2 border-amber-400 pl-3"><strong>Net OOP is the real number.</strong> It is what your family pays after part-time earnings. Negative = you earn more than you spend.</p>
              <p className="border-l-2 border-amber-400 pl-3"><strong>ROI above 1x = recover costs in year one.</strong> 3x ROI = every ₹1 invested returns ₹3 per year.</p>
              <p className="border-l-2 border-amber-400 pl-3"><strong>Always compare both tracks.</strong> Government universities often cost 50-70% less than Private.</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center"><Users className="w-4 h-4" /></div>
              <h3 className="text-sm font-bold font-mono tracking-wider uppercase">Need Help Deciding?</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">A certified counsellor can walk you through your top countries, check scholarships, and build your application timeline.</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm italic border-l-2 border-white/40 pl-3 opacity-90">&ldquo;Your Net OOP in Germany is only ₹5L after earnings — 90% cheaper than USA for the same STEM degree.&rdquo;</p>
              <p className="text-sm italic border-l-2 border-white/40 pl-3 opacity-90">&ldquo;With IELTS 7 and 80% academics, you qualify for TU9 elite universities.&rdquo;</p>
            </div>
            {!inCart ? (
              <button
                onClick={() => addItem(PREMIUM_BUNDLE)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-amber-700 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors shadow-md"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart — ₹999 <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/checkout"
                onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-teal-700 rounded-xl font-bold text-sm hover:bg-teal-50 transition-colors shadow-md"
              >
                <ArrowRight className="w-4 h-4" /> Go to Checkout
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Consultant Contact Modal */}
      {consultantModal && (
        <ConsultantModal
          country={consultantModal.country}
          consultants={consultantModal.consultants}
          onClose={() => setConsultantModal(null)}
        />
      )}

      {/* Course Recommendation Modal */}
      {courseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setCourseModal(null)}>
          <div className="bg-slate-900 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col border border-slate-700" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between shrink-0 border-b border-slate-700">
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-violet-400" /> Courses in {courseModal.country}
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">{courseType || "—"} · {level || "—"} · {MAJOR_LABEL[major] || "—"}</p>
              </div>
              <button onClick={() => setCourseModal(null)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Course List */}
            <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-slate-900">
              {/* ─── VOCATIONAL MODE: Show real vocational colleges & courses ─── */}
              {courseType === "Vocational" && hasVocationalData(courseModal.country) && (
                <div className="space-y-4">
                  {/* Vocational Summary Header */}
                  <div className="bg-gradient-to-br from-amber-400/10 to-orange-400/10 border border-amber-400/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-amber-300">Vocational Courses (PR Pathways)</h4>
                    </div>
                    <p className="text-xs text-amber-400/70">
                      Diploma & certificate programs at real colleges with verified PR pathways.
                      Costs include tuition only — living extra.
                    </p>
                  </div>

                  {/* Vocational Courses by College */}
                  {getVocationalColleges(courseModal.country).map((college, ci) => (
                    <div key={ci} className="border border-slate-200 rounded-xl overflow-hidden">
                      {/* College Header */}
                      <div className="bg-slate-800/60 px-4 py-3 border-b border-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-bold text-white">{college.name}</h5>
                            <p className="text-[10px] text-slate-400">{college.location} &middot; {college.type}</p>
                          </div>
                          <span className="text-[9px] text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full border border-slate-600">{college.courses.length} courses</span>
                        </div>
                      </div>
                      {/* Courses */}
                      <div className="divide-y divide-slate-100">
                        {college.courses.map((course, coi) => (
                          <div key={coi} className="p-4 hover:bg-teal-500/5 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-semibold text-white">{course.name}</span>
                                  {course.prFriendly && (
                                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold whitespace-nowrap border border-emerald-500/20">PR FRIENDLY</span>
                                  )}
                                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 font-bold border border-violet-500/20">{course.category}</span>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full shrink-0 ml-2">{course.duration}</span>
                            </div>
                            {/* Course Details Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-2">
                              <span className="text-[10px] text-slate-400">Tuition: <span className="font-semibold text-slate-200">{course.tuition}</span></span>
                              <span className="text-[10px] text-slate-400">Intake: <span className="font-semibold text-slate-200">{course.intake}</span></span>
                              <span className="text-[10px] text-slate-400">Campus: <span className="font-semibold text-slate-200">{course.campus}</span></span>
                              <span className="text-[10px] text-slate-400">Salary: <span className="font-semibold text-emerald-400">{course.avgSalary}</span></span>
                            </div>
                            {/* PR Pathway */}
                            <div className="bg-teal-500/10 rounded-lg px-3 py-1.5 mb-1.5 border border-teal-500/15">
                              <span className="text-[10px] text-teal-400 font-semibold">PR Pathway: </span>
                              <span className="text-[10px] text-teal-300">{course.prPathway}</span>
                            </div>
                            {/* NOC Code if available */}
                            {course.nocCode && (
                              <span className="text-[9px] text-slate-400 font-mono">NOC: {course.nocCode}</span>
                            )}
                            {/* Requirements */}
                            <p className="text-[10px] text-slate-500 mt-1">
                              <span className="font-semibold">Entry:</span> {course.requirements}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ─── ACADEMIC MODE: Show trending degree courses ─── */}
              {courseType === "Academic" && (() => {
                const recs = getTrendingCourses(courseModal.country, level, major);
                if (recs.length === 0) return null;
                return (
                  <div className="bg-gradient-to-br from-[#0d9488]/10 to-[#14b8a6]/10 border border-[#0d9488]/20 rounded-xl p-4 mb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-[#0d9488]" />
                      <h4 className="text-sm font-bold text-white">Trending Courses for Indian Students</h4>
                    </div>
                    <div className="space-y-2">
                      {recs.slice(0, 5).map((rec, ri) => (
                        <div key={ri} className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            ri === 0 ? "bg-amber-400/20 text-amber-400" :
                            ri === 1 ? "bg-slate-600/50 text-slate-300" :
                            ri === 2 ? "bg-orange-400/20 text-orange-400" :
                            "bg-slate-700 text-slate-400"
                          }`}>
                            {ri + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{rec.course}</span>
                              {rec.prFriendly && (
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20">PR FRIENDLY</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-slate-400">Avg Salary: <span className="font-semibold text-slate-200">{rec.avgSalary}</span></span>
                            </div>
                            {rec.notes && <p className="text-[10px] text-slate-400 mt-0.5">{rec.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#0d9488]/10 flex items-center gap-1.5 text-[10px] text-slate-400">
                      <BookOpen className="w-3 h-3" />
                      <span>Data from Open Doors, HESA, DAAD, HEA, Campus France, Austrade 2024</span>
                    </div>
                  </div>
                );
              })()}

              {/* Universities where Indian students actually enrolled */}
              {(() => {
                const enrollmentData = getEnrollmentByCountry(courseModal.country);
                const enrolledUnis = enrollmentData?.topUniversities || [];
                return (
                  <>
                    {enrolledUnis.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#0d9488]" />
                          <h4 className="text-sm font-bold text-white">Universities Chosen by Indian Students</h4>
                          <span className="text-[9px] text-slate-500">({enrollmentData?.totalIndianStudents || ""} enrolled)</span>
                        </div>
                        <div className="space-y-2">
                          {enrolledUnis.slice(0, 5).map((uni, uIdx) => (
                            <div key={uIdx} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700 hover:border-[#0d9488]/40 hover:bg-slate-800/60 transition-all">
                              <div className="flex items-start justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white">{uni.name}</span>
                                  <Badge className={`text-[8px] ${uni.type === "Public" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-purple-500/15 text-purple-400 border-purple-500/30"}`}>
                                    {uni.type}
                                  </Badge>
                                </div>
                                {uni.qsRanking && uni.qsRanking !== "N/A" && (
                                  <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">{uni.qsRanking}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] text-[#0d9488] font-semibold flex items-center gap-1">
                                  <Users className="w-3 h-3" /> {uni.indianStudents}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {uni.popularCourses.slice(0, 4).map((course, ci) => (
                                  <span key={ci} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                                    {course}
                                  </span>
                                ))}
                              </div>
                              {uni.notes && (
                                <p className="text-[9px] text-slate-500 mt-1.5 italic">{uni.notes}</p>
                              )}
                            </div>
                          ))}
                        </div>
                        {enrollmentData && (
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-2 pt-2 border-t border-slate-700">
                            <BookOpen className="w-2.5 h-2.5" />
                            <span>Source: {enrollmentData.source} · {enrollmentData.year}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Course Recommendations */}
                    {courseModal.programs.map((p, idx) => (
                      <div key={idx} className="border border-slate-700 rounded-xl p-4 hover:border-violet-500/30 hover:bg-slate-800/40 transition-all bg-slate-800/20">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{p.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full shrink-0 ml-2 border border-slate-600">{p.duration}</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2 leading-relaxed">{p.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 rounded-lg px-3 py-1 border border-emerald-500/15">
                          <Briefcase className="w-3.5 h-3.5" />
                          {/* Replace hardcoded global salary with country-specific one */}
                          {(() => {
                            const roleName = p.career.split(",")[0];
                            const countrySalary = getSalaryRange(courseModal.country);
                            return `${roleName}, ${countrySalary}`;
                          })()}
                        </div>
                      </div>
                    ))}

                    {courseModal.programs.length === 0 && enrolledUnis.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">No specific data available for this combination yet.</p>
                        <p className="text-slate-500 text-xs mt-1">Select Course Type, Level and Major to see recommendations.</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="shrink-0 p-3 border-t border-slate-700 bg-slate-800/50 text-center">
              <p className="text-[10px] text-slate-500">Explore more on the <Link to="/courses" onClick={() => setCourseModal(null)} className="text-violet-400 hover:text-violet-300">Courses page</Link></p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE RESULTS JOURNEY — 3-Step: Countries → Courses → Consultants
   Mobile-only (<768px). Swipeable cards, step progress, bottom nav.
   ═══════════════════════════════════════════════════════════════ */
type JourneyStep = "countries" | "courses" | "consultants";

function MobileResultsJourney({
  results, top3, budget, courseType, level, major,
  hasPremium, trackLabel, regionLabel,
  onCourseClick, onConsultantClick,
}: {
  results: any[]; top3: any[]; budget: number;
  courseType: CourseType; level: Level; major: Major;
  hasPremium: boolean; trackLabel: string; regionLabel: string;
  onCourseClick: (country: string) => void;
  onConsultantClick: (country: string) => void;
}) {
  const [step, setStep] = useState<JourneyStep>("countries");
  const [selectedCountry, setSelectedCountry] = useState<string>(top3[2]?.country || results[0]?.country || "");
  const [showFullList, setShowFullList] = useState(false);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const selectedResult = results.find(r => r.country === selectedCountry) || results[0];

  return (
    <div className="max-w-lg mx-auto">
      {/* ═══ Step Progress Bar ═══ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 mb-4">
        <div className="flex items-center justify-between">
          {[
            { key: "countries" as JourneyStep, label: "Your Matches", num: 1 },
            { key: "courses" as JourneyStep, label: "Courses", num: 2 },
            { key: "consultants" as JourneyStep, label: "Consultants", num: 3 },
          ].map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(s.key)}
              className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-slate-100" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.key ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30" :
                step === "countries" && s.key === "courses" ? "bg-slate-200 text-slate-400" :
                step === "countries" && s.key === "consultants" ? "bg-slate-200 text-slate-400" :
                step === "courses" && s.key === "countries" ? "bg-teal-100 text-teal-700" :
                step === "courses" && s.key === "consultants" ? "bg-slate-200 text-slate-400" :
                "bg-teal-100 text-teal-700"
              }`}>
                {s.num}
              </div>
              <span className={`text-[10px] font-semibold ${step === s.key ? "text-teal-700" : "text-slate-400"}`}>{s.label}</span>
            </button>
          ))}
        </div>
        {/* Progress line */}
        <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ${
            step === "countries" ? "w-1/3" : step === "courses" ? "w-2/3" : "w-full"
          }`} />
        </div>
      </div>

      {/* ═══ STEP 1: Your Country Matches ═══ */}
      {step === "countries" && (
        <div>
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">Your Top Matches</h2>
            <p className="text-xs text-slate-500">{trackLabel} · {courseType || "—"} · {level || "—"} · {MAJOR_LABEL[major] || "—"}</p>
          </div>

          {/* Top 3 — Horizontal swipeable cards */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {top3.map((r, idx) => {
              const isBlurred = !hasPremium && idx < 2;
              return (
                <div
                  key={r.country}
                  onClick={() => { if (!isBlurred) { setSelectedCountry(r.country); } }}
                  className={`snap-center shrink-0 w-[85vw] max-w-[340px] rounded-2xl border-2 overflow-hidden shadow-lg ${
                    idx === 0 ? "border-amber-400" : idx === 1 ? "border-slate-300" : "border-teal-400"
                  } ${!isBlurred ? "active:scale-[0.98] transition-transform" : ""} ${selectedCountry === r.country && !isBlurred ? "ring-2 ring-teal-500 ring-offset-2" : ""}`}
                >
                  {/* Rank bar */}
                  <div className={`px-3 py-1.5 text-[10px] font-bold text-white font-mono tracking-wider uppercase ${
                    idx === 0 ? "bg-gradient-to-r from-amber-400 to-amber-600" :
                    idx === 1 ? "bg-gradient-to-r from-slate-400 to-slate-600" :
                    "bg-gradient-to-r from-teal-400 to-teal-600"
                  }`}>
                    {idx === 0 ? "BEST MATCH" : idx === 1 ? "STRONG FIT" : "YOUR PREVIEW"}
                  </div>

                  <div className="p-4 bg-white">
                    {isBlurred ? (
                      <div className="text-center py-6">
                        <Lock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-lg font-bold text-slate-900">{r.country}</p>
                        <p className="text-sm text-teal-700 font-bold">{r.score.toFixed(1)}/10</p>
                        <p className="text-xs text-slate-500 mt-1">Unlock Premium to see details</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{r.country}</h3>
                          <span className={`text-xl font-bold ${r.score >= 7 ? "text-emerald-600" : r.score >= 5.5 ? "text-teal-600" : "text-amber-600"}`}>
                            {r.score.toFixed(1)}<span className="text-xs text-slate-400">/10</span>
                          </span>
                        </div>
                        <StatusBadge r={r} budget={budget} />

                        {/* Compact key stats */}
                        <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
                          <div className="bg-slate-50 rounded-lg p-2 text-center">
                            <div className="text-[9px] text-slate-400 uppercase">Net OOP</div>
                            <div className="text-sm font-bold text-teal-700">₹{r.netOOP.toFixed(0)}L</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2 text-center">
                            <div className="text-[9px] text-slate-400 uppercase">10-Yr ROI</div>
                            <div className="text-sm font-bold text-emerald-600">{r.roi10yr || r.roi}x</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2 text-center">
                            <div className="text-[9px] text-slate-400 uppercase">Salary</div>
                            <div className="text-sm font-bold text-slate-700">{r.salaryRange}</div>
                          </div>
                        </div>

                        {/* Collapsible Funds Card */}
                        {FUNDS_REQ[r.country] && (
                          <MobileFundsCard funds={FUNDS_REQ[r.country]} />
                        )}
                        {/* Cultural Warning Card */}
                        {CULTURAL_BARRIER[r.country] && (
                          <MobileCulturalWarning barrier={CULTURAL_BARRIER[r.country]} />
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedCountry(r.country); setStep("courses"); }}
                            className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-bold hover:bg-violet-100 transition-colors border border-violet-200"
                          >
                            <BookOpen className="w-3.5 h-3.5" /> Explore Courses
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedCountry(r.country); setStep("consultants"); }}
                            className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors border border-teal-200"
                          >
                            <Users className="w-3.5 h-3.5" /> Find Agents
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe hint */}
          <p className="text-center text-[10px] text-slate-400 mb-4">← Swipe to see all top matches →</p>

          {/* Full country list — compact toggle */}
          <button
            onClick={() => setShowFullList(!showFullList)}
            className="w-full flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-slate-200 shadow-sm mb-3"
          >
            <span className="text-sm font-semibold text-slate-700">
              {results.length} Countries
            </span>
            <span className="text-xs text-teal-600 font-bold">{showFullList ? "Hide" : "View"}</span>
          </button>

          {showFullList && (
            <div className="space-y-3 mb-6">
              {results.map((r, idx) => {
                const isExpanded = expandedCountry === r.country;
                return (
                  <div key={r.country} className="rounded-2xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden">
                    {/* Compact header — always visible, clickable to expand */}
                    <button
                      onClick={() => setExpandedCountry(isExpanded ? null : r.country)}
                      className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700 shrink-0">
                        {r._rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">{r.country}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${r.score >= 7 ? "text-emerald-600" : r.score >= 5.5 ? "text-teal-600" : "text-amber-600"}`}>
                              {r.score.toFixed(1)}
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                          <span>Net: ₹{r.netOOP.toFixed(0)}L</span>
                          <span>ROI: {r.roi10yr || r.roi}x</span>
                          <span>{r.salaryRange}</span>
                        </div>
                      </div>
                    </button>

                    {/* Expanded full card */}
                    {isExpanded && (
                      <div className="px-3 pb-3 border-t border-slate-100">
                        <MobileCountryFullCard
                          r={r}
                          budget={budget}
                          onCourseClick={() => { setSelectedCountry(r.country); setStep("courses"); }}
                          onConsultantClick={() => { setSelectedCountry(r.country); setStep("consultants"); }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP 2: Courses for Selected Country ═══ */}
      {step === "courses" && selectedResult && (
        <div>
          {/* Back button + header */}
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setStep("countries")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Courses in {selectedResult.country}</h2>
              <p className="text-xs text-slate-500">Matched to your profile</p>
            </div>
          </div>

          {/* Quick stats for context */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4 flex items-center gap-4 overflow-x-auto">
            <div className="text-center shrink-0">
              <div className="text-[9px] text-slate-400 uppercase">Score</div>
              <div className="text-sm font-bold text-teal-700">{selectedResult.score.toFixed(1)}</div>
            </div>
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <div className="text-center shrink-0">
              <div className="text-[9px] text-slate-400 uppercase">Net OOP</div>
              <div className="text-sm font-bold text-slate-700">₹{selectedResult.netOOP.toFixed(0)}L</div>
            </div>
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <div className="text-center shrink-0">
              <div className="text-[9px] text-slate-400 uppercase">Visa</div>
              <div className="text-sm font-bold text-blue-600">{selectedResult.visaEase}/10</div>
            </div>
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <div className="text-center shrink-0">
              <div className="text-[9px] text-slate-400 uppercase">PR</div>
              <div className="text-sm font-bold text-violet-600">{selectedResult.prScore}/10</div>
            </div>
          </div>

          {/* Course cards */}
          <div className="space-y-3 mb-6">
            {(() => {
              const allRecs = getCourseRecommendations(courseType, level, major);
              const countryRecs = allRecs.filter(p => p.topCountries.includes(selectedResult.country));
              const recs = countryRecs.length > 0 ? countryRecs : allRecs.slice(0, 5);
              return recs.map((program, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-violet-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900">{program.name}</h4>
                      <p className="text-[10px] text-slate-500">{program.degree} · {program.duration}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{program.tuition}</span>
                    <button
                      onClick={() => onCourseClick(selectedResult.country)}
                      className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ));
            })()}
          </div>

          {/* Next: Find Consultants */}
          <button
            onClick={() => setStep("consultants")}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" /> Next: Find Consultants in {selectedResult.country}
          </button>
        </div>
      )}

      {/* ═══ STEP 3: Consultants for Selected Country ═══ */}
      {step === "consultants" && selectedResult && (
        <div>
          {/* Back button + header */}
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setStep("courses")} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Consultants for {selectedResult.country}</h2>
              <p className="text-xs text-slate-500">Verified study abroad agents</p>
            </div>
          </div>

          {/* Consultant cards */}
          {(() => {
            const did = COUNTRY_TO_ID[selectedResult.country];
            const consultants = did ? getConsultantsForCountry(did) : [];
            if (consultants.length === 0) {
              return (
                <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No consultants listed yet for {selectedResult.country}.</p>
                  <button onClick={() => onConsultantClick(selectedResult.country)} className="mt-3 text-xs text-teal-600 font-semibold underline">
                    Browse all consultants
                  </button>
                </div>
              );
            }
            return (
              <div className="space-y-3 mb-6">
                {consultants.map(c => (
                  <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-teal-500/20">
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                          {c.verified && <BadgeCheck className="w-4 h-4 text-teal-500 shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-500">{c.title} · {c.experience}</p>
                        <p className="text-[10px] text-teal-600 font-semibold">{c.successRate} success rate</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {c.specialization.slice(0, 3).map(s => (
                        <span key={s} className="text-[9px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{s}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a href={`mailto:${c.email}`} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                      <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors">
                        <Phone className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Start Over */}
          <button
            onClick={() => setStep("countries")}
            className="w-full py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Your Matches
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REUSABLE COUNTRY CARD — used for Top 3 + Full Results
   ═══════════════════════════════════════════════════════════════ */
function CountryCard({
  r, budget, courseType, level, major,
  variant = "ranked",
  rankIndex = 0,
  isBlurred = false,
  onCourseClick, onConsultantClick,
}: {
  r: any; budget: number; courseType: CourseType; level: Level; major: Major;
  variant?: "top3" | "ranked";
  rankIndex?: number;
  isBlurred?: boolean;
  onCourseClick: () => void;
  onConsultantClick: () => void;
}) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PREMIUM_BUNDLE.id);
  const destId = COUNTRY_TO_ID[r.country];
  const rankColors = [
    { border: "border-amber-400", bar: "from-amber-400 to-amber-600", label: "RANK #1 — BEST MATCH" },
    { border: "border-slate-300", bar: "from-slate-400 to-slate-600", label: "RANK #2 — STRONG FIT" },
    { border: "border-teal-400", bar: "from-teal-400 to-teal-600", label: "RANK #3 — YOUR PREVIEW" },
  ];
  const rc = rankColors[rankIndex] || { border: "border-slate-200", bar: "from-slate-500 to-slate-600", label: `RANK #${rankIndex + 1}` };

  // For non-top-3: use a prominent neutral border with colored left accent
  const cardBorder = variant === "top3" ? rc.border : "border-2 border-slate-200";
  const leftAccent = variant === "ranked" ? "border-l-4 border-l-teal-500" : "";

  return (
    <div className={`bg-white rounded-2xl ${cardBorder} ${leftAccent} shadow-xl overflow-hidden ${isBlurred ? "relative" : ""} hover:shadow-2xl transition-shadow`}>
      {/* Premium blur overlay — only for top3 #1 and #2 */}
      {isBlurred && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${rankIndex === 0 ? "bg-amber-50/80" : "bg-slate-50/80"} p-4 text-center rounded-2xl`}>
          <Lock className={`w-8 h-8 mb-2 ${rankIndex === 0 ? "text-amber-600" : "text-slate-500"}`} />
          <p className="text-lg font-bold text-slate-900">{r.country}</p>
          <p className="text-sm text-teal-700 font-bold mb-1">Score: {r.score.toFixed(1)} / 10</p>
          <p className="text-xs text-slate-600 mb-3 max-w-[200px]">{rankIndex === 0 ? "Your best match. Unlock Premium to see full details." : "Your #2 alternative. Unlock Premium for full details."}</p>
          {!inCart ? (
            <button onClick={() => addItem(PREMIUM_BUNDLE)} className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${rankIndex === 0 ? "from-amber-500 to-amber-600 hover:from-amber-400" : "from-slate-400 to-slate-500 hover:from-slate-300"} text-white rounded-lg text-xs font-bold transition-all`}>
              <ShoppingCart className="w-3.5 h-3.5" /> Unlock — ₹999
            </button>
          ) : (
            <Link to="/checkout" onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs font-bold hover:from-teal-400 transition-all">
              <ArrowRight className="w-3.5 h-3.5" /> Go to Checkout
            </Link>
          )}
        </div>
      )}
      {/* Rank bar — top3 gets colored gradient, ranked gets subtle */}
      {variant === "top3" ? (
        <div className={`px-4 py-2 text-xs font-bold text-white font-mono tracking-wider uppercase bg-gradient-to-r ${rc.bar}`}>{rc.label}</div>
      ) : (
        <div className="px-4 py-2 flex items-center justify-between bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">{r._rank}</span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">of 22 countries</span>
          </div>
          <span className={`text-xs font-bold font-mono ${scoreColor(r.score)}`}>{r.score.toFixed(1)}<span className="text-slate-400 font-normal">/10</span></span>
        </div>
      )}

      <div className="p-5">
        <div className={isBlurred ? "blur-[5px] opacity-40 pointer-events-none select-none" : ""}>
          {/* Header: Country + Score (top3 already has score in rank bar, so skip for ranked) */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-slate-900">{r.country}</h3>
            {variant === "top3" && (
              <div className={`text-3xl font-bold ${scoreColor(r.score)}`}>{r.score.toFixed(1)}<span className="text-sm text-slate-400 font-normal">/10</span></div>
            )}
          </div>

          {/* Status Badge */}
          <div className="mb-3">
            <StatusBadge r={r} budget={budget} />
          </div>

          {/* Collapsible Funds Card */}
          {FUNDS_REQ[r.country] && (
            <FundsCard funds={FUNDS_REQ[r.country]} />
          )}

          {/* Cultural Warning Card */}
          {CULTURAL_BARRIER[r.country] && (
            <CulturalWarningCard barrier={CULTURAL_BARRIER[r.country]} />
          )}

          {/* FMGE/NEXT Warning for MBBS — Indian graduates must clear licensing exam */}
          {major === "MBBS" && (
            <div className="mb-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-amber-800">FMGE / NEXT Required — Only 29% Pass (Russia 2024)</p>
                  <p className="text-[10px] text-amber-700 leading-relaxed mt-0.5">
                    After MBBS abroad, you MUST clear <strong className="text-amber-900">FMGE</strong> (soon <strong className="text-amber-900">NEXT</strong>) to practice in India. FMGE 2024 pass rates: <strong>Russia 29%</strong> (3,331/11,276), <strong>Georgia 35%</strong>, <strong>Philippines 20%</strong>. Those who clear earn <strong>₹5-10L/yr</strong> starting, growing to <strong>₹15-30L/yr</strong> with experience. Source: NBE FMGE 2024 data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3-Column Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Net OOP</div>
              <div className="text-sm font-bold font-mono text-teal-700">₹{r.netOOP.toFixed(1)}L</div>
            </div>
            <div className="text-center">
              {(() => {
                const gap = r.idealBudget - budget;
                const ratio = budget / r.idealBudget;
                const isFeasible = ratio >= 1;
                const isClose = ratio >= 0.7;
                return (
                  <div>
                    <div className={`text-[10px] uppercase font-mono ${isFeasible ? "text-emerald-500" : isClose ? "text-amber-500" : "text-red-400"}`}>Ideal Budget</div>
                    <div className={`text-sm font-bold font-mono ${isFeasible ? "text-emerald-600" : isClose ? "text-amber-600" : "text-red-500"}`}>₹{r.idealBudget.toFixed(1)}L</div>
                    {gap > 0 && <div className={`text-[9px] font-mono ${isClose ? "text-amber-500" : "text-red-400"}`}>+₹{gap.toFixed(1)}L</div>}
                    {gap <= 0 && <div className="text-[9px] font-mono text-emerald-500">within budget</div>}
                  </div>
                );
              })()}
            </div>
            <div className="text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Salary Range</div>
              <div className="text-sm font-bold font-mono text-slate-700">{r.salaryRange}</div>
            </div>
          </div>

          {/* Secondary Metrics — compact row (ALL ESTIMATED) */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1 text-[11px]">
            <span className="text-slate-500" title="Estimated from QS cost reports">Tuition*: <span className="font-mono text-slate-700">₹{r.tuition.toFixed(1)}L</span></span>
            <span className="text-slate-500" title="Estimated from Numbeo + student surveys">Living*: <span className="font-mono text-slate-700">₹{r.living.toFixed(1)}L</span></span>
            <span className="text-slate-500" title="Estimated from MEA advisories + OSAC">Safety*: <span className={`font-mono ${r.safety >= 85 ? "text-emerald-600" : r.safety >= 70 ? "text-amber-600" : "text-red-500"}`}>{r.safety}</span></span>
            <span className="text-slate-500" title="Estimated from visa rejection data">Visa*: <span className="font-mono text-blue-600">{r.visaEase}/10</span></span>
            <span className="text-slate-500" title="Estimated from immigration pathways">PR*: <span className="font-mono text-violet-600">{r.prScore}/10</span></span>
            <span className="text-slate-500" title="Estimated from graduate employment data">Jobs*: <span className="font-mono text-slate-700">{r.jobNumeric}/10</span></span>
            {r.roi10yr && r.roi10yr > 0 && (
              <span className={`font-semibold font-mono ${r.roi10yr >= 30 ? "text-emerald-600" : r.roi10yr >= 15 ? "text-teal-600" : "text-amber-600"}`} title="Estimated projection">
                10-Year*: {r.roi10yr}x
              </span>
            )}
            {r.workExpBonus > 0 && (
              <span className="text-teal-600 font-semibold" title="Estimated from PR points systems">Work Ex*: +{r.workExpBonus}pts</span>
            )}
          </div>
          <p className="text-[9px] text-slate-400 mb-3">* All figures are estimates. Verify on official sources.</p>

          {/* Road to PR — Key Info */}
          <div className="mb-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Road to PR</p>
            <div className="space-y-1">
              {r.visa && (
                <p className="text-[11px] text-slate-600 leading-relaxed"><strong className="text-slate-800">Visa:</strong> {r.visa}</p>
              )}
              {r.pr && (
                <p className="text-[11px] text-slate-600 leading-relaxed"><strong className="text-slate-800">PR:</strong> {r.pr}</p>
              )}
              {r.job && (
                <p className="text-[11px] text-slate-600 leading-relaxed"><strong className="text-slate-800">Jobs:</strong> {r.job}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {destId && (
              <>
                <button onClick={onCourseClick} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors">
                  <BookOpen className="w-3.5 h-3.5" /> Courses
                </button>
                <button onClick={onConsultantClick} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors">
                  <Users className="w-3.5 h-3.5" /> Consultants
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub-components (inline to avoid module issues) ---- */
function Field({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function StepCard({ num, icon: Icon, title, desc }: { num: string; icon: any; title: string; desc: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 text-[10px] font-bold flex items-center justify-center font-mono">{num}</span>
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function FinRow({ icon: Icon, label, value, highlight, valueClass }: { icon: any; label: string; value: string; highlight?: boolean; valueClass?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <span className="text-xs text-slate-500 uppercase font-mono tracking-wider w-16 shrink-0">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-teal-700" : valueClass || "text-slate-800"}`}>{value}</span>
    </div>
  );
}

const COLOR_MAP: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",    icon: "bg-blue-100 text-blue-600",    badge: "bg-blue-100 text-blue-700" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   icon: "bg-amber-100 text-amber-600",  badge: "bg-amber-100 text-amber-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  teal:    { bg: "bg-teal-50",    border: "border-teal-200",    icon: "bg-teal-100 text-teal-600",    badge: "bg-teal-100 text-teal-700" },
  rose:    { bg: "bg-rose-50",    border: "border-rose-200",    icon: "bg-rose-100 text-rose-600",    badge: "bg-rose-100 text-rose-700" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  icon: "bg-violet-100 text-violet-600",  badge: "bg-violet-100 text-violet-700" },
  cyan:    { bg: "bg-cyan-50",    border: "border-cyan-200",    icon: "bg-cyan-100 text-cyan-600",    badge: "bg-cyan-100 text-cyan-700" },
  indigo:  { bg: "bg-indigo-50",  border: "border-indigo-200",  icon: "bg-indigo-100 text-indigo-600",  badge: "bg-indigo-100 text-indigo-700" },
  orange:  { bg: "bg-orange-50",  border: "border-orange-200",  icon: "bg-orange-100 text-orange-600",  badge: "bg-orange-100 text-orange-700" },
};

/* ---- Generate explanation for why a country is Moderate or Challenging ---- */
function getScoreReasons(r: any, budget: number): string[] {
  const reasons: string[] = [];
  const ratio = budget / r.idealBudget;

  // Budget check
  if (ratio < 0.55) reasons.push("Your budget is significantly below the ideal — consider education loans or scholarships");
  else if (ratio < 0.75) reasons.push("Your budget is tight — you may need additional funding or part-time work");
  else if (ratio < 1.0) reasons.push("Budget is close but leaves little buffer for emergencies");

  // ROI check
  if (r.roi10yr && r.roi10yr < 8) reasons.push("Low 10-year ROI — salary growth may not justify the investment");
  else if (r.roi10yr && r.roi10yr < 15) reasons.push("Moderate ROI — consider if the career outcomes align with your goals");

  // Safety
  if (r.safety < 65) reasons.push("Safety concerns for Indian students — research neighbourhoods carefully");
  else if (r.safety < 75) reasons.push("Below-average safety rating — stay in verified student areas");

  // Visa
  if (r.visaEase < 5) reasons.push("Strict visa policies — high rejection risk without strong documentation");
  else if (r.visaEase < 7) reasons.push("Moderate visa difficulty — ensure all documents are perfect");

  // PR
  if (r.prScore < 4) reasons.push("Limited PR pathway — difficult to settle permanently after studies");
  else if (r.prScore < 6) reasons.push("PR pathway exists but is competitive or lengthy");

  // Employment
  if (r.jobNumeric < 5) reasons.push("Weak job market for graduates — finding work may take longer");
  else if (r.jobNumeric < 7) reasons.push("Job market is moderate — network early and build local experience");

  // Salary
  if (r.salaryEntry < 20) reasons.push("Low starting salary — may take years to recover education costs");
  else if (r.salaryEntry < 30) reasons.push("Entry salary is modest — budget carefully for first 2-3 years");

  // Language barrier
  const langBarriers: Record<string, string> = {
    France: "French language required for most jobs — learn B1 level before applying",
    Italy: "Italian language needed for daily life and work — start learning early",
    Poland: "Polish language barrier — English jobs limited outside tech/multinationals",
    Russia: "Russian language essential — most programs teach in Russian",
    Sweden: "Swedish helps for jobs — though many Swedes speak English",
    Netherlands: "Dutch useful for local jobs — but English widely accepted",
    "South Korea": "Korean language barrier — KLI certificate strongly recommended",
    Georgia: "Georgian/Russian useful — English not widely spoken outside Tbilisi",
    Germany: "German B1 required for most jobs — start learning before arrival",
  };
  if (langBarriers[r.country]) reasons.push(langBarriers[r.country]);

  // Country-specific warnings
  if (r.country === "Germany") reasons.push("Blocked account €11,904 required upfront — strict financial proof");
  if (r.country === "UAE") reasons.push("No PR pathway — work visa tied to employer sponsorship");
  if (r.country === "Philippines") reasons.push("Limited PR pathway — plan for return to India or third-country move");

  return reasons.length > 0 ? reasons : ["Multiple factors combined give this score — review all metrics below"];
}

/* ---- Status Badge: Competitive / Excellent / Moderate / Challenging ---- */
function StatusBadge({ r, budget }: { r: any; budget: number }) {
  const score = r.score;
  const [expanded, setExpanded] = useState(false);

  if (score >= 7.5) return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
      <CheckCircle2 className="w-3 h-3" /> Excellent Fit
    </span>
  );
  if (score >= 6) return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
      <CheckCircle2 className="w-3 h-3" /> Competitive
    </span>
  );

  // For Moderate and Challenging — add collapsible explanation
  const isModerate = score >= 4.5;
  const reasons = getScoreReasons(r, budget);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
          isModerate
            ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
            : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
        }`}
      >
        <AlertTriangle className="w-3 h-3" />
        {isModerate ? "Moderate" : "Challenging"}
        {expanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
      </button>

      {expanded && (
        <div className={`mt-2 p-3 rounded-lg border ${isModerate ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isModerate ? "text-amber-700" : "text-red-700"}`}>
            Why this score?
          </p>
          <ul className="space-y-1.5">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-slate-700 leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isModerate ? "bg-amber-400" : "bg-red-400"}`} />
                {reason}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setExpanded(false)}
            className="mt-2 text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}

/* ---- Collapsible Funds Card ---- */
function FundsCard({ funds }: { funds: FundsReq }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
      {/* Collapsed / Header — always visible */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Banknote className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-sm font-bold text-white">Funds to Show: {funds.amount}</span>
        </div>
        <p className="text-xs text-slate-400 ml-6">{funds.period}</p>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="ml-6 mt-1.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
          >
            Click here to understand what this means
          </button>
        )}
      </div>

      {/* Expanded explanation */}
      {expanded && (
        <div className="px-3 pb-3">
          <div className="ml-6 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{funds.explain}</p>

            {/* Bonus: What happens if I don't have this money */}
            <div className="pt-2 border-t border-slate-600">
              <p className="text-[11px] font-bold text-amber-400 mb-1">What happens if I do not have this money?</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{funds.noMoney}</p>
            </div>

            <button
              onClick={() => setExpanded(false)}
              className="mt-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300 transition-colors"
            >
              Show less
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Cultural Warning Card ---- */
function CulturalWarningCard({ barrier }: { barrier: { level: string; text: string } }) {
  const isHigh = barrier.level === "high";
  return (
    <div className={`mb-3 rounded-xl p-3 border ${isHigh ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className={`w-4 h-4 shrink-0 ${isHigh ? "text-red-500" : "text-amber-500"}`} />
        <span className={`text-xs font-bold ${isHigh ? "text-red-700" : "text-amber-700"}`}>
          {isHigh ? "Language Barrier — Local Language Required" : "Cultural Note"}
        </span>
      </div>
      <p className={`text-[11px] leading-relaxed ml-6 ${isHigh ? "text-red-600" : "text-amber-700"}`}>
        {barrier.text}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE-SPECIFIC: Collapsible Funds Card (white bg for swipe cards)
   ═══════════════════════════════════════════════════════════════ */
function MobileFundsCard({ funds }: { funds: FundsReq }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-2 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
      {/* Collapsed — always visible */}
      <div className="p-2.5">
        <div className="flex items-center gap-2 mb-1">
          <Banknote className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="text-xs font-bold text-slate-800">Funds: {funds.amount}</span>
        </div>
        <p className="text-[10px] text-slate-500 ml-5.5">{funds.period}</p>
        {!expanded && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            className="ml-5 mt-1 text-[10px] font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-2 transition-colors"
          >
            Click to understand what this means
          </button>
        )}
      </div>
      {/* Expanded */}
      {expanded && (
        <div className="px-2.5 pb-2.5">
          <div className="ml-5 p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{funds.explain}</p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] font-bold text-amber-600 mb-1">What if I don't have this money?</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{funds.noMoney}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              className="mt-2 text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Show less
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE-SPECIFIC: Cultural Warning (compact for swipe cards)
   ═══════════════════════════════════════════════════════════════ */
function MobileCulturalWarning({ barrier }: { barrier: { level: string; text: string } }) {
  const [expanded, setExpanded] = useState(false);
  const isHigh = barrier.level === "high";
  return (
    <div className={`mb-2 rounded-xl border ${isHigh ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
      {/* Header — always visible */}
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="w-full flex items-center gap-2 p-2.5 text-left"
      >
        <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${isHigh ? "text-red-500" : "text-amber-500"}`} />
        <span className={`text-xs font-bold ${isHigh ? "text-red-700" : "text-amber-700"}`}>
          {isHigh ? "Language Barrier — High" : "Cultural Note"}
        </span>
        {expanded ? <ChevronUp className="w-3 h-3 ml-auto text-slate-400" /> : <ChevronDown className="w-3 h-3 ml-auto text-slate-400" />}
      </button>
      {/* Expanded text */}
      {expanded && (
        <div className="px-2.5 pb-2.5">
          <p className={`text-[11px] leading-relaxed ml-5 ${isHigh ? "text-red-600" : "text-amber-700"}`}>
            {barrier.text}
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE: Full Country Card (shown when expanded in the list)
   ═══════════════════════════════════════════════════════════════ */
function MobileCountryFullCard({
  r, budget, onCourseClick, onConsultantClick,
}: {
  r: any; budget: number;
  onCourseClick: () => void;
  onConsultantClick: () => void;
}) {
  return (
    <div className="pt-3 space-y-3">
      {/* Status Badge */}
      <StatusBadge r={r} budget={budget} />

      {/* Funds Required */}
      {FUNDS_REQ[r.country] && (
        <MobileFundsCard funds={FUNDS_REQ[r.country]} />
      )}

      {/* Cultural Warning */}
      {CULTURAL_BARRIER[r.country] && (
        <MobileCulturalWarning barrier={CULTURAL_BARRIER[r.country]} />
      )}

      {/* 3-Column Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Net OOP</div>
          <div className="text-sm font-bold font-mono text-teal-700">₹{r.netOOP.toFixed(1)}L</div>
        </div>
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          {(() => {
            const gap = r.idealBudget - budget;
            const ratio = budget / r.idealBudget;
            const isFeasible = ratio >= 1;
            const isClose = ratio >= 0.7;
            return (
              <div>
                <div className={`text-[10px] uppercase font-mono ${isFeasible ? "text-emerald-500" : isClose ? "text-amber-500" : "text-red-400"}`}>Ideal Budget</div>
                <div className={`text-sm font-bold font-mono ${isFeasible ? "text-emerald-600" : isClose ? "text-amber-600" : "text-red-500"}`}>₹{r.idealBudget.toFixed(1)}L</div>
                {gap > 0 && <div className={`text-[9px] font-mono ${isClose ? "text-amber-500" : "text-red-400"}`}>+₹{gap.toFixed(1)}L</div>}
                {gap <= 0 && <div className="text-[9px] font-mono text-emerald-500">within budget</div>}
              </div>
            );
          })()}
        </div>
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Salary</div>
          <div className="text-sm font-bold font-mono text-slate-700">{r.salaryRange}</div>
        </div>
      </div>

      {/* Compact metrics row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
        <span className="text-slate-500">Tuition: <span className="font-mono text-slate-700">₹{r.tuition.toFixed(1)}L</span></span>
        <span className="text-slate-500">Living: <span className="font-mono text-slate-700">₹{r.living.toFixed(1)}L</span></span>
        <span className="text-slate-500">Safety: <span className={`font-mono ${r.safety >= 85 ? "text-emerald-600" : r.safety >= 70 ? "text-amber-600" : "text-red-500"}`}>{r.safety}</span></span>
        <span className="text-slate-500">Visa: <span className="font-mono text-blue-600">{r.visaEase}/10</span></span>
        <span className="text-slate-500">PR: <span className="font-mono text-violet-600">{r.prScore}/10</span></span>
        <span className="text-slate-500">Jobs: <span className="font-mono text-slate-700">{r.jobNumeric}/10</span></span>
        {r.roi10yr && r.roi10yr > 0 && (
          <span className={`font-semibold font-mono ${r.roi10yr >= 30 ? "text-emerald-600" : r.roi10yr >= 15 ? "text-teal-600" : "text-amber-600"}`}>
            10Yr: {r.roi10yr}x
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={(e) => { e.stopPropagation(); onCourseClick(); }}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-bold hover:bg-violet-100 transition-colors border border-violet-200"
        >
          <BookOpen className="w-3.5 h-3.5" /> Explore Courses
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onConsultantClick(); }}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors border border-teal-200"
        >
          <Users className="w-3.5 h-3.5" /> Find Agents
        </button>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, color, formula, explain, example }: { icon: any; title: string; color: string; formula: string; explain: string; example: string }) {
  const [open, setOpen] = useState(false);
  const c = COLOR_MAP[color];
  return (
    <div className={`rounded-2xl border p-5 ${c.bg} ${c.border} hover:shadow-md transition-shadow cursor-pointer`} onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.icon}`}><Icon className="w-4 h-4" /></div>
        <div><h4 className="text-sm font-bold text-slate-900">{title}</h4><span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${c.badge}`}>{formula}</span></div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{explain}</p>
      {open && <div className="mt-3 pt-3 border-t border-dashed border-slate-300">
        <p className="text-xs text-slate-600 leading-relaxed"><strong className="text-slate-800">Example:</strong> {example}</p>
      </div>}
      <div className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-700">{open ? "Hide example" : "See example"}</div>
    </div>
  );
}
