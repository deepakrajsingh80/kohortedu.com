// ============================================================
// PR Route Counsellor Scoring Engine
// ============================================================

import {
  COUNTRIES, REGION, STREAM_DURATION, STREAM_TUITION_MULT, TUITION_OVERRIDE,
  LIVING_PER_YEAR, REF_ACADEMIC, REF_TRADE, FIT, JOB, SALARY, PR_TL, PR_EASE, GRADE,
  MAJOR_INDEX, getProgram,
  type Country, type Profile, type Level, type Major, type Track, type PRPriority
} from "./counselorData";

export interface Financials {
  govtTuition: number;
  privateTuition: number;
  govtNetOOP: number;
  privateNetOOP: number;
  govtROI: number | null;
  privateROI: number | null;
  tuition: number;
  living: number;
  livingPerYear: number;
  duration: number;
  earnings: number;
  netOOP: number;
  roi: number | null;
  salary: number;
  visa: string;
  maxBudget: number;
}

export interface CountryResult extends Financials {
  country: Country;
  score: number;
  pr: string;
  grade: string;
  program: string;
  job: string;
  _rank: number;
}

// Returns full-program tuition for a country × profile × level × track × stream combo
function getTuition(country: Country, profile: Profile, level: Level, track: Track, stream: Major): number {
  // 1. Check explicit override first
  const ov = TUITION_OVERRIDE[country]?.[stream]?.[level]?.[profile]?.[track];
  if (ov !== undefined) return ov;

  // 2. Otherwise: STEM baseline × stream multiplier
  const ref = profile === "Trade" ? REF_TRADE[country] : REF_ACADEMIC[country];
  const baseline = track === "Govt" ? ref.GovtTuition : ref.PrivateTuition;
  const mult = STREAM_TUITION_MULT[stream][profile][level];
  return Math.round(baseline * mult * 10) / 10;
}

// Main financial computation engine
export function computeFinancials(
  country: Country,
  track: Track,
  profile: Profile,
  level: Level,
  major: Major
): Financials {
  const ref = profile === "Trade" ? REF_TRADE[country] : REF_ACADEMIC[country];

  // Stream-aware duration (Medicine longer than other streams)
  const duration = STREAM_DURATION[profile][major][level];

  // Living = per-year × stream-specific duration
  const livingPerYear = LIVING_PER_YEAR[country];
  const living = Math.round(livingPerYear * duration * 10) / 10;

  // Earnings: scale per-year × stream duration
  const stemDuration = STREAM_DURATION[profile].STEM[level];
  const earnPerYear = (level === "UG" ? ref.EarnUG : ref.EarnPG) / stemDuration;
  const earnings = Math.round(earnPerYear * duration * 10) / 10;

  const salary = SALARY[country][MAJOR_INDEX[major]];

  // Stream-specific tuition for BOTH tracks
  const govtTuition = getTuition(country, profile, level, "Govt", major);
  const privateTuition = getTuition(country, profile, level, "Private", major);

  // Net OOP per track = Tuition + Living − Earnings
  const govtNetOOP = govtTuition + living - earnings;
  const privateNetOOP = privateTuition + living - earnings;

  // ROI per track = Salary / Net OOP (null when Net OOP <= 0)
  const govtROI = govtNetOOP > 0 ? salary / govtNetOOP : null;
  const privateROI = privateNetOOP > 0 ? salary / privateNetOOP : null;

  // The "current track" values
  const tuition = track === "Govt" ? govtTuition : privateTuition;
  const netOOP = track === "Govt" ? govtNetOOP : privateNetOOP;
  const roi = track === "Govt" ? govtROI : privateROI;

  return {
    govtTuition, privateTuition,
    govtNetOOP, privateNetOOP,
    govtROI, privateROI,
    tuition, living, livingPerYear, duration, earnings, netOOP, roi, salary,
    visa: ref.Visa, maxBudget: ref.MaxBudget
  };
}

// Scoring: FIT is the ceiling, modifiers only subtract
export function scoreCountry(
  country: Country,
  track: Track,
  profile: Profile,
  level: Level,
  major: Major,
  budget: number,
  prPriority: PRPriority,
  ielts: number,
  region: string,
  acad: number
): number {
  // Base FIT is the ceiling for this country × major
  const ceiling = FIT[profile][level][country][MAJOR_INDEX[major]];
  let penalty = 0;

  const fin = computeFinancials(country, track, profile, level, major);

  // Budget penalty vs Net OOP
  if (fin.netOOP <= 0) {
    penalty += 0; // earnings cover everything
  } else {
    const ratio = budget / fin.netOOP;
    if (ratio >= 1.0) penalty += 0;
    else if (ratio >= 0.8) penalty += 0.5;
    else if (ratio >= 0.6) penalty += 1.5;
    else penalty += 3.0;
  }

  // IELTS penalty
  if (ielts >= 6.5) penalty += 0;
  else if (ielts >= 6.0) penalty += 0.5;
  else if (ielts >= 5.5) penalty += 1.2;
  else penalty += 2.0;

  // Academic % penalty
  if (acad >= 65) penalty += 0;
  else if (acad >= 55) penalty += 0.5;
  else penalty += 1.0;

  // PR Priority misalignment penalty
  const ease = PR_EASE[country];
  if (prPriority === "High") {
    if (ease === "Easy") penalty += 0;
    else if (ease === "Moderate") penalty += 0.5;
    else if (ease === "Hard") penalty += 1.8;
    else penalty += 3.5;
  } else if (prPriority === "Med") {
    if (ease === "Hard") penalty += 0.5;
    else if (ease === "Very Hard") penalty += 1.0;
  }

  // Region mismatch penalty (heavy)
  if (region !== "Any" && REGION[country] !== region && !REGION[country].includes(region)) {
    penalty += 5.0;
  }

  const score = Math.max(0, ceiling - penalty);
  return Math.round(score * 10) / 10;
}

// Compute all results
export interface EvalParams {
  profile: Profile;
  level: Level;
  major: Major;
  acad: number;
  budget: number;
  prPriority: PRPriority;
  ielts: number;
  region: string;
  track: Track;
}

export function evaluateAll(params: EvalParams): CountryResult[] {
  const { profile, level, major, acad, budget, prPriority, ielts, region, track } = params;

  const results: CountryResult[] = COUNTRIES.map(country => {
    const score = scoreCountry(country, track, profile, level, major, budget, prPriority, ielts, region, acad);
    const fin = computeFinancials(country, track, profile, level, major);

    return {
      country,
      score,
      ...fin,
      pr: PR_TL[country],
      grade: GRADE[track][country],
      program: getProgram(profile, level, major, country),
      job: JOB[country][MAJOR_INDEX[major]],
      _rank: 0
    };
  });

  // Sort by score descending, then by country name
  results.sort((a, b) => b.score - a.score || a.country.localeCompare(b.country));
  results.forEach((r, i) => { r._rank = i + 1; });

  return results;
}

// Color helpers
export const scoreColor = (s: number): string => s >= 7.5 ? "text-emerald-600" : s >= 5 ? "text-amber-600" : "text-red-600";
export const scoreBg = (s: number): string => s >= 7.5 ? "bg-emerald-50 border-emerald-200" : s >= 5 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
export const jobColor = (j: string): string => j === "High" ? "text-emerald-600" : j === "Medium" ? "text-amber-600" : "text-red-600";
export const jobBg = (j: string): string => j === "High" ? "bg-emerald-100 text-emerald-700" : j === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
export const roiColor = (r: number | null): string => {
  if (r === null) return "text-gray-500";
  return r >= 2 ? "text-emerald-600" : r >= 1 ? "text-amber-600" : "text-red-600";
};

export function formatROI(r: number | null): string {
  if (r === null) return "—";
  const rounded = Math.round(r * 10) / 10;
  if (rounded === Math.floor(rounded)) return `${Math.floor(rounded)}x`;
  return `${rounded}x`;
}

export function formatMoney(lakhs: number): string {
  return `₹${lakhs.toFixed(1)}L`;
}
