// ============================================================
// PR Route Counsellor Toolkit Data — 17 Countries
// ============================================================

export const COUNTRIES = [
  "Canada", "Germany", "UK", "USA", "Australia", "New Zealand", "Ireland",
  "Netherlands", "France", "Italy", "Sweden", "Poland", "Singapore", "UAE", "Russia", "Georgia", "Philippines"
] as const;

export type Country = typeof COUNTRIES[number];
export type Profile = "Academic" | "Trade";
export type Level = "UG" | "PG";
export type Major = "CS_IT" | "DataScience" | "Engineering" | "MBBS" | "MD_MS" | "MDS" | "Nursing" | "Pharmacy" | "Biotech" | "Mgmt" | "Accts" | "Arts";
export type Track = "Govt" | "Private";
export type PRPriority = "High" | "Med" | "Low";
export type Region = "Any" | "Americas" | "Europe" | "Asia-Pacific" | "Asia";

export const REGION: Record<Country, string> = {
  Canada: "Americas", USA: "Americas",
  Germany: "Europe", UK: "Europe", Ireland: "Europe", Netherlands: "Europe",
  France: "Europe", Italy: "Europe", Sweden: "Europe", Poland: "Europe",
  Australia: "Asia-Pacific", "New Zealand": "Asia-Pacific",
  Singapore: "Asia", UAE: "Asia", Philippines: "Asia",
  Russia: "Europe/Asia", Georgia: "Europe/Asia"
};

export const STREAM_DURATION: Record<Profile, Record<Major, Record<Level, number>>> = {
  Academic: {
    STEM:     { UG: 4,   PG: 2 },
    Medicine: { UG: 5.5, PG: 3 },
    Mgmt:     { UG: 4,   PG: 2 },
    Accts:    { UG: 4,   PG: 2 },
    Arts:     { UG: 4,   PG: 2 }
  },
  Trade: {
    STEM:     { UG: 2,   PG: 2 },
    Medicine: { UG: 2.5, PG: 2 },
    Mgmt:     { UG: 2,   PG: 2 },
    Accts:    { UG: 2,   PG: 2 },
    Arts:     { UG: 2,   PG: 2 }
  }
};

export const STREAM_TUITION_MULT: Record<Major, Record<Profile, Record<Level, number>>> = {
  STEM:     { Academic: { UG: 1.0, PG: 1.0 }, Trade: { UG: 1.0, PG: 1.0 } },
  Medicine: { Academic: { UG: 2.0, PG: 1.5 }, Trade: { UG: 1.1, PG: 1.1 } },
  Mgmt:     { Academic: { UG: 1.0, PG: 2.0 }, Trade: { UG: 1.0, PG: 1.0 } },
  Accts:    { Academic: { UG: 0.9, PG: 1.0 }, Trade: { UG: 0.9, PG: 0.9 } },
  Arts:     { Academic: { UG: 0.8, PG: 0.9 }, Trade: { UG: 0.8, PG: 0.8 } }
};

export const TUITION_OVERRIDE: Record<string, Record<string, Record<string, Record<string, Record<Track, number>>>>> = {
  Russia:      { Medicine: { UG: { Academic: { Govt: 25, Private: 35 } }, PG: { Academic: { Govt: 12, Private: 18 } } } },
  Georgia:     { Medicine: { UG: { Academic: { Govt: 22, Private: 30 } }, PG: { Academic: { Govt: 10, Private: 15 } } } },
  Philippines: { Medicine: { UG: { Academic: { Govt: 22, Private: 30 } }, PG: { Academic: { Govt: 12, Private: 18 } } } },
  Poland:      { Medicine: { UG: { Academic: { Govt: 30, Private: 45 } }, PG: { Academic: { Govt: 15, Private: 22 } } } },
  Italy:       { Medicine: { UG: { Academic: { Govt: 8,  Private: 28 } }, PG: { Academic: { Govt: 5,  Private: 18 } } } },
  France:      { Medicine: { UG: { Academic: { Govt: 12, Private: 35 } }, PG: { Academic: { Govt: 8,  Private: 20 } } } },
  Germany:     { Medicine: { UG: { Academic: { Govt: 1,  Private: 25 } }, PG: { Academic: { Govt: 1,  Private: 18 } } } },
  USA:         { Mgmt:     { PG: { Academic: { Govt: 70, Private: 100 } } } },
  UK:          { Mgmt:     { PG: { Academic: { Govt: 50, Private: 80  } } } },
  Singapore:   { Mgmt:     { PG: { Academic: { Govt: 45, Private: 75  } } } },
  Canada:      { Mgmt:     { PG: { Academic: { Govt: 45, Private: 75  } } } }
};

export const LIVING_PER_YEAR: Record<Country, number> = {
  Canada: 13, Germany: 9, UK: 16, USA: 14, Australia: 14,
  "New Zealand": 12, Ireland: 13, Netherlands: 12, France: 10,
  Italy: 9, Sweden: 12, Poland: 6, Singapore: 16, UAE: 12,
  Russia: 6, Georgia: 5, Philippines: 4
};

export interface RefData {
  GovtTuition: number;
  PrivateTuition: number;
  LivingUG: number;
  LivingPG: number;
  EarnUG: number;
  EarnPG: number;
  MaxBudget: number;
  Visa: string;
}

export const REF_ACADEMIC: Record<Country, RefData> = {
  Canada:      { GovtTuition: 30, PrivateTuition: 70, LivingUG: 50, LivingPG: 25, EarnUG: 43.2, EarnPG: 21.6, MaxBudget: 80, Visa: "PGWP 3yr → CEC" },
  Germany:     { GovtTuition: 8,  PrivateTuition: 25, LivingUG: 35, LivingPG: 18, EarnUG: 45.1, EarnPG: 22.6, MaxBudget: 25, Visa: "JobSeeker → BlueCard" },
  UK:          { GovtTuition: 25, PrivateTuition: 60, LivingUG: 50, LivingPG: 25, EarnUG: 44.2, EarnPG: 22.1, MaxBudget: 70, Visa: "Graduate Visa → Skilled" },
  USA:         { GovtTuition: 35, PrivateTuition: 80, LivingUG: 55, LivingPG: 30, EarnUG: 44.2, EarnPG: 22.1, MaxBudget: 90, Visa: "OPT → H1B → GreenCard" },
  Australia:   { GovtTuition: 20, PrivateTuition: 50, LivingUG: 42, LivingPG: 22, EarnUG: 53.8, EarnPG: 26.9, MaxBudget: 55, Visa: "PSWV → PR 189/190" },
  "New Zealand":{GovtTuition: 18, PrivateTuition: 40, LivingUG: 35, LivingPG: 18, EarnUG: 45.1, EarnPG: 22.6, MaxBudget: 45, Visa: "PSWV → SMC → PR" },
  Ireland:     { GovtTuition: 18, PrivateTuition: 40, LivingUG: 40, LivingPG: 22, EarnUG: 41.3, EarnPG: 20.6, MaxBudget: 45, Visa: "Stamp 1G → Critical Skills" },
  Netherlands: { GovtTuition: 15, PrivateTuition: 35, LivingUG: 35, LivingPG: 18, EarnUG: 36.1, EarnPG: 18.0, MaxBudget: 40, Visa: "Orientation → Search → PR" },
  France:      { GovtTuition: 10, PrivateTuition: 25, LivingUG: 30, LivingPG: 15, EarnUG: 42.2, EarnPG: 21.1, MaxBudget: 30, Visa: "APS → Talent Passport → PR" },
  Italy:       { GovtTuition: 8,  PrivateTuition: 20, LivingUG: 25, LivingPG: 13, EarnUG: 27.8, EarnPG: 13.9, MaxBudget: 25, Visa: "Permit → EC Long Term" },
  Sweden:      { GovtTuition: 12, PrivateTuition: 28, LivingUG: 35, LivingPG: 18, EarnUG: 38.4, EarnPG: 19.2, MaxBudget: 35, Visa: "Job Seeker → Work → PR" },
  Poland:      { GovtTuition: 6,  PrivateTuition: 15, LivingUG: 18, LivingPG: 9,  EarnUG: 20.2, EarnPG: 10.1, MaxBudget: 20, Visa: "Work Permit → TRP → PR" },
  Singapore:   { GovtTuition: 20, PrivateTuition: 50, LivingUG: 42, LivingPG: 22, EarnUG: 19.2, EarnPG: 9.6,  MaxBudget: 55, Visa: "LTVP → EP → PR (hard)" },
  UAE:         { GovtTuition: 18, PrivateTuition: 45, LivingUG: 35, LivingPG: 18, EarnUG: 9.6,  EarnPG: 4.8,  MaxBudget: 50, Visa: "NO PR. Work Visa only" },
  Russia:      { GovtTuition: 5,  PrivateTuition: 15, LivingUG: 14, LivingPG: 7,  EarnUG: 11.5, EarnPG: 5.8,  MaxBudget: 18, Visa: "Permit → RVP → PR" },
  Georgia:     { GovtTuition: 4,  PrivateTuition: 12, LivingUG: 12, LivingPG: 6,  EarnUG: 8.6,  EarnPG: 4.3,  MaxBudget: 15, Visa: "Permit → TRP → PR 6yr" },
  Philippines: { GovtTuition: 3,  PrivateTuition: 10, LivingUG: 10, LivingPG: 5,  EarnUG: 4.3,  EarnPG: 2.2,  MaxBudget: 12, Visa: "Visa → SRRV (retiree)" }
};

export const REF_TRADE: Record<Country, RefData> = {
  Canada:      { GovtTuition: 12, PrivateTuition: 30, LivingUG: 30, LivingPG: 15, EarnUG: 43.2, EarnPG: 21.6, MaxBudget: 45, Visa: "PGWP 3yr → CEC" },
  Germany:     { GovtTuition: 0,  PrivateTuition: 8,  LivingUG: 18, LivingPG: 9,  EarnUG: 45.1, EarnPG: 22.6, MaxBudget: 15, Visa: "Ausbildung → PR" },
  UK:          { GovtTuition: 12, PrivateTuition: 28, LivingUG: 28, LivingPG: 14, EarnUG: 44.2, EarnPG: 22.1, MaxBudget: 35, Visa: "Graduate Visa → Skilled" },
  USA:         { GovtTuition: 15, PrivateTuition: 35, LivingUG: 30, LivingPG: 15, EarnUG: 44.2, EarnPG: 22.1, MaxBudget: 35, Visa: "OPT → H1B (hard)" },
  Australia:   { GovtTuition: 10, PrivateTuition: 25, LivingUG: 25, LivingPG: 13, EarnUG: 53.8, EarnPG: 26.9, MaxBudget: 30, Visa: "TR visa → PR 189/190" },
  "New Zealand":{GovtTuition: 8,  PrivateTuition: 20, LivingUG: 20, LivingPG: 10, EarnUG: 45.1, EarnPG: 22.6, MaxBudget: 25, Visa: "PSWV → SMC → PR" },
  Ireland:     { GovtTuition: 8,  PrivateTuition: 18, LivingUG: 18, LivingPG: 9,  EarnUG: 41.3, EarnPG: 20.6, MaxBudget: 22, Visa: "Stamp 1G → Skills" },
  Netherlands: { GovtTuition: 8,  PrivateTuition: 18, LivingUG: 18, LivingPG: 9,  EarnUG: 36.1, EarnPG: 18.0, MaxBudget: 22, Visa: "Orientation → Search" },
  France:      { GovtTuition: 5,  PrivateTuition: 12, LivingUG: 12, LivingPG: 6,  EarnUG: 42.2, EarnPG: 21.1, MaxBudget: 15, Visa: "APS → Talent → PR" },
  Italy:       { GovtTuition: 4,  PrivateTuition: 10, LivingUG: 10, LivingPG: 5,  EarnUG: 27.8, EarnPG: 13.9, MaxBudget: 12, Visa: "Permit → EC Long" },
  Sweden:      { GovtTuition: 6,  PrivateTuition: 14, LivingUG: 14, LivingPG: 7,  EarnUG: 38.4, EarnPG: 19.2, MaxBudget: 18, Visa: "Job Seeker → Work" },
  Poland:      { GovtTuition: 3,  PrivateTuition: 8,  LivingUG: 9,  LivingPG: 5,  EarnUG: 20.2, EarnPG: 10.1, MaxBudget: 10, Visa: "Work Permit → TRP" },
  Singapore:   { GovtTuition: 10, PrivateTuition: 22, LivingUG: 22, LivingPG: 11, EarnUG: 19.2, EarnPG: 9.6,  MaxBudget: 28, Visa: "LTVP → EP (hard)" },
  UAE:         { GovtTuition: 8,  PrivateTuition: 20, LivingUG: 18, LivingPG: 9,  EarnUG: 9.6,  EarnPG: 4.8,  MaxBudget: 25, Visa: "NO PR" },
  Russia:      { GovtTuition: 2,  PrivateTuition: 6,  LivingUG: 6,  LivingPG: 3,  EarnUG: 11.5, EarnPG: 5.8,  MaxBudget: 8,  Visa: "Permit → RVP" },
  Georgia:     { GovtTuition: 2,  PrivateTuition: 6,  LivingUG: 5,  LivingPG: 3,  EarnUG: 8.6,  EarnPG: 4.3,  MaxBudget: 8,  Visa: "Permit → TRP" },
  Philippines: { GovtTuition: 1.5,PrivateTuition: 5,  LivingUG: 5,  LivingPG: 3,  EarnUG: 4.3,  EarnPG: 2.2,  MaxBudget: 6,  Visa: "Visa → SRRV" }
};

// FIT scores per country × major × profile × level
export const FIT: Record<Profile, Record<Level, Record<Country, number[]>>> = {
  Academic: {
    UG: {
      Canada: [9,7,8,8,7], Germany: [9,8,7,7,6], UK: [8,7,7,8,8], USA: [9,7,8,8,7],
      Australia: [8,8,7,7,6], "New Zealand": [7,7,6,6,6], Ireland: [8,7,7,8,7],
      Netherlands: [8,6,7,7,6], France: [7,6,6,6,7], Italy: [6,6,6,6,8],
      Sweden: [8,6,6,6,6], Poland: [6,7,5,5,5], Singapore: [8,6,7,8,6],
      UAE: [6,5,7,8,5], Russia: [5,7,4,4,5], Georgia: [5,6,4,4,5], Philippines: [5,6,5,5,6]
    },
    PG: {
      Canada: [9,8,9,9,7], Germany: [9,8,8,7,6], UK: [8,7,8,8,8], USA: [9,8,9,9,7],
      Australia: [8,8,8,8,7], "New Zealand": [7,7,7,7,6], Ireland: [8,7,8,8,7],
      Netherlands: [8,6,8,7,6], France: [7,6,7,6,7], Italy: [6,6,6,6,8],
      Sweden: [8,6,7,6,6], Poland: [6,7,5,5,5], Singapore: [8,6,8,8,6],
      UAE: [6,5,7,8,5], Russia: [5,7,4,4,5], Georgia: [5,6,4,4,5], Philippines: [5,6,5,5,6]
    }
  },
  Trade: {
    UG: {
      Canada: [10,7,9,9,7], Germany: [10,7,9,8,6], UK: [7,7,7,7,6], USA: [7,6,7,7,6],
      Australia: [9,7,8,8,6], "New Zealand": [8,7,7,7,6], Ireland: [7,6,7,7,6],
      Netherlands: [7,5,6,6,5], France: [6,5,5,5,6], Italy: [5,5,5,5,7],
      Sweden: [7,5,5,5,5], Poland: [6,6,5,5,5], Singapore: [7,5,6,7,5],
      UAE: [5,4,6,7,4], Russia: [5,6,4,4,5], Georgia: [5,5,4,4,5], Philippines: [5,5,5,5,6]
    },
    PG: {
      Canada: [9,7,9,9,7], Germany: [9,7,9,8,6], UK: [6,6,7,7,6], USA: [6,6,7,7,6],
      Australia: [8,7,8,8,6], "New Zealand": [7,6,7,7,6], Ireland: [6,5,7,7,6],
      Netherlands: [6,5,6,6,5], France: [5,5,5,5,6], Italy: [5,5,5,5,7],
      Sweden: [6,5,5,5,5], Poland: [5,6,5,5,5], Singapore: [6,5,6,7,5],
      UAE: [5,4,6,7,4], Russia: [4,6,4,4,5], Georgia: [4,5,4,4,5], Philippines: [4,5,5,5,6]
    }
  }
};

export const JOB: Record<Country, string[]> = {
  Canada: ["High","High","High","High","Medium"],
  Germany: ["High","High","High","High","Medium"],
  UK: ["High","High","High","High","Medium"],
  USA: ["High","High","High","High","Medium"],
  Australia: ["High","High","High","High","Medium"],
  "New Zealand": ["Medium","High","Medium","Medium","Medium"],
  Ireland: ["High","High","High","High","Medium"],
  Netherlands: ["High","Medium","High","High","Medium"],
  France: ["High","Medium","High","Medium","Medium"],
  Italy: ["Medium","Medium","Medium","Medium","High"],
  Sweden: ["High","Medium","Medium","Medium","Medium"],
  Poland: ["Medium","Medium","Medium","Medium","Low"],
  Singapore: ["High","Medium","High","High","Medium"],
  UAE: ["Medium","Low","High","High","Low"],
  Russia: ["Medium","Medium","Low","Low","Low"],
  Georgia: ["Medium","Medium","Low","Low","Low"],
  Philippines: ["Medium","Medium","Medium","Medium","Medium"]
};

export const SALARY: Record<Country, number[]> = {
  Canada: [45,48,42,40,35], Germany: [42,40,38,36,32], UK: [40,42,38,36,30], USA: [55,50,48,45,38],
  Australia: [40,45,32,30,28], "New Zealand": [30,32,25,24,22], Ireland: [38,35,30,28,25],
  Netherlands: [40,32,28,26,24], France: [32,28,25,22,20], Italy: [28,25,22,20,18],
  Sweden: [35,28,25,22,20], Poland: [22,20,15,14,12], Singapore: [45,38,35,32,28],
  UAE: [35,28,30,28,20], Russia: [18,16,12,11,10], Georgia: [15,14,10,9,8], Philippines: [12,11,9,8,7]
};

export const PR_TL: Record<Country, string> = {
  Canada: "3-4 yrs (CEC after 1 yr work)",
  Germany: "3-4 yrs (EU Blue Card → PR)",
  UK: "3-5 yrs (Skilled Worker → ILR)",
  USA: "5-8 yrs (H1B → Green Card)",
  Australia: "2-3 yrs (PR 189/190 after study)",
  "New Zealand": "2-3 yrs (SMC after 2 yrs work)",
  Ireland: "2-3 yrs (Critical Skills → Stamp4)",
  Netherlands: "3-4 yrs (Search → PR)",
  France: "3-5 yrs (Talent Passport → PR)",
  Italy: "5+ yrs (EC Long Term → PR)",
  Sweden: "3-4 yrs (Work Permit → PR)",
  Poland: "3-5 yrs (TRP → PR)",
  Singapore: "5-8 yrs (EP → PR, very hard)",
  UAE: "NO PR (Work Visa only)",
  Russia: "3-5 yrs (RVP → PR)",
  Georgia: "5-6 yrs (TRP → PR)",
  Philippines: "NO PR (SRRV retiree visa only)"
};

export const PR_EASE: Record<Country, string> = {
  Canada: "Easy", Germany: "Easy", "New Zealand": "Easy", Australia: "Easy",
  Ireland: "Easy", Sweden: "Easy",
  Netherlands: "Moderate", France: "Moderate", Poland: "Moderate", Russia: "Moderate", Georgia: "Moderate",
  Italy: "Hard", Singapore: "Hard", UK: "Hard", USA: "Hard",
  UAE: "Very Hard", Philippines: "Very Hard"
};

export const GRADE: Record<Track, Record<Country, string>> = {
  Govt: {
    Canada: "Grade A: U15 / Medical Doctoral (UofT, UBC, McGill)",
    Germany: "Grade A: TU9 / Elite (TUM, RWTH, KIT)",
    UK: "Grade A: Russell Group (Oxford, Cambridge, Imperial)",
    USA: "Grade B: R2 / Flagship Public (UMich, UT Austin, UIUC)",
    Australia: "Grade A: Group of 8 (Melbourne, ANU, Sydney)",
    "New Zealand": "Grade A: Research-Intensive (Auckland, Otago, Canterbury)",
    Ireland: "Grade A: RUAs / Trad (TCD, UCD, UCC, NUI Galway)",
    Netherlands: "Grade A: Research Uni (UvA, Leiden, Utrecht, TU Delft)",
    France: "Grade B: Research Uni (Sorbonne, Lyon, Marseille)",
    Italy: "Grade B: Research / State (Bologna, Padova, Torino)",
    Sweden: "Grade A: Research-Intensive (KTH, Chalmers, Lund, Uppsala)",
    Poland: "Grade A: Research A+ / A (Warsaw, Jagiellonian, AGH)",
    Singapore: "Grade A: Autonomous (NUS, NTU, SMU, SUTD)",
    UAE: "Grade A: Tier 1 (NYUAD, AUS, Khalifa, UAEU)",
    Russia: "Grade A: Federal / National (HSE, MIPT, MEPhI, MSU)",
    Georgia: "Grade A: Tier 1 (Tbilisi State, Free Uni, GTU)",
    Philippines: "Grade A: Centers of Excellence (UP, DLSU, UST, Ateneo)"
  },
  Private: {
    Canada: "Grade D: Polytechnics / Colleges (Sheridan, Seneca)",
    Germany: "Grade C: Fachhochschule / HAW (FH Aachen, FH Munster)",
    UK: "Grade C: Post-92 / Modern (Oxford Brookes, Coventry)",
    USA: "Grade A: R1 Research / Ivy (MIT, Stanford, Harvard)",
    Australia: "Grade D: TAFE / Polytechnics (Holmesglen, TAFE NSW)",
    "New Zealand": "Grade C: Polytechnics / Wananga (Unitec, WITT)",
    Ireland: "Grade C: Private Colleges (DBS, Griffith, IBAT)",
    Netherlands: "Grade C: Small Private / Applied (Wittenborg, TIO)",
    France: "Grade A: Grandes Ecoles / U15 (ENS, Polytechnique, HEC)",
    Italy: "Grade A: Excellence / SSML (Politecnico Milano, Bocconi, Sapienza)",
    Sweden: "Grade D: Yrkeshogskola / KYH (Vocational)",
    Poland: "Grade C: Private / Applied (Vistula, WSB, Lazarski)",
    Singapore: "Grade D: Private / Foreign (SIM, PSB, MDIS, Kaplan)",
    UAE: "Grade B: Tier 2 (Heriot-Watt Dubai, Middlesex, Birmingham)",
    Russia: "Grade C: Private / Branch (VShE branches, Regional privates)",
    Georgia: "Grade C: Tier 3 (Batumi, East Europe, New Vision)",
    Philippines: "Grade C: Local / New (Perpetual, San Beda, LPU, Adamson)"
  }
};

export const MAJOR_INDEX: Record<Major, number> = { STEM: 0, Medicine: 1, Mgmt: 2, Accts: 3, Arts: 4 };
export const MAJOR_LABEL: Record<Major, string> = { CS_IT: "CS & IT", DataScience: "Data Science", Engineering: "Engineering", MBBS: "MBBS", MD_MS: "MD/MS", MDS: "MDS", Nursing: "Nursing", Pharmacy: "Pharmacy", Biotech: "Biotech", Mgmt: "Management", Accts: "Accounts", Arts: "Arts" };

// Top programs per profile/level/major/country
export const PROGRAMS: Record<string, Partial<Record<Country, string>>> = {
  "Academic_UG_STEM": {
    Canada: "BSc CS / BEng Co-op → PGWP → PR", Germany: "BSc / BEng TU9 → JobSeeker → BlueCard → PR",
    UK: "BSc / BEng → Graduate Visa → Skilled Worker", USA: "BS CS / Eng → OPT → H1B → Green Card",
    Australia: "BSc CS / BEng → PSWV → PR 189/190", "New Zealand": "BSc CS / BEng → PSWV → SMC → PR",
    Ireland: "BSc CS / BEng → Stamp1G → Critical Skills", Netherlands: "BSc CS / BEng → Orientation → Search → PR",
    France: "BSc / BEng (Grande Ecole) → APS → Talent → PR", Italy: "BSc / BEng (English) → Permit → EC Long",
    Sweden: "BSc / BEng → Job Seeker → Permit → PR", Poland: "BSc / BEng → Work Permit → TRP → PR",
    Singapore: "BSc / BEng NUS / NTU → LTVP → EP → PR", UAE: "BSc / BEng → Work Permit → NO PR",
    Russia: "BSc / BEng → Permit → RVP → PR", Georgia: "BSc / BEng → Permit → TRP → PR 6yr",
    Philippines: "BSc CS / Eng → Visa → SRRV (retiree)"
  },
  "Academic_UG_Medicine": {
    Canada: "BSc Nursing / Health Sci → PGWP → PR", Germany: "BSc Health / Biotech → JobSeeker → PR",
    UK: "BSc Biomed / Nursing → Graduate → Skilled", USA: "BS Biomed / Public Health → OPT → H1B",
    Australia: "BSc Nursing → AHPRA → PR", "New Zealand": "BSc Nursing → NCNZ → PR",
    Ireland: "BSc Nursing / NMBI → Stamp1G → Skills", Netherlands: "BSc Health Sciences → Search → PR",
    France: "BSc Health → APS → Talent → PR", Italy: "BSc Health → Permit → EC Long",
    Sweden: "BSc Health → Job Seeker → Permit", Poland: "BSc Nursing → Work Permit → TRP",
    Singapore: "BSc Health → LTVP → EP (hard)", UAE: "BSc Nursing → Work Permit → NO PR",
    Russia: "BSc Nursing → Permit → RVP", Georgia: "BSc Nursing → Permit → TRP",
    Philippines: "BS Nursing → NCLEX → US / CA / AU"
  },
  "Academic_UG_Mgmt": {
    Canada: "BBA / BCom (Co-op) → PGWP → PR", Germany: "BA Business FH → JobSeeker → BlueCard",
    UK: "BBA / BA Business → Graduate → Skilled", USA: "BS Business Admin → OPT → H1B",
    Australia: "BCom / BBA → PSWV → PR", "New Zealand": "BCom / BBA → PSWV → SMC",
    Ireland: "BBA / BA Business → Stamp1G → Skills", Netherlands: "BSc Business → Orientation → Search",
    France: "BBA ESSEC / ESCP → APS → Talent", Italy: "BBA Bocconi → Permit → EC Long",
    Sweden: "BSc Business → Job Seeker → Permit", Poland: "BBA → Work Permit → TRP → PR",
    Singapore: "BBA NUS / SMU → LTVP → EP", UAE: "BBA → Work Permit → NO PR",
    Russia: "BBA → Permit → RVP → PR", Georgia: "BBA → Permit → TRP → PR",
    Philippines: "BBA → Visa → SRRV"
  },
  "Academic_UG_Accts": {
    Canada: "BCom Accounting / Finance → CPA → PGWP", Germany: "BSc Business Admin → BlueCard → PR",
    UK: "BSc Accounting / Finance → ACA / ACCA → Skilled", USA: "BS Accounting → CPA → OPT → H1B",
    Australia: "BCom Accounting → CPA → PSWV → PR", "New Zealand": "BCom Accounting → CA → PSWV",
    Ireland: "BSc Accounting → Chartered → Stamp1G", Netherlands: "BSc Economics / Accounting → Search",
    France: "BSc Accounting → APS → Talent", Italy: "BSc Econ → Permit → EC Long",
    Sweden: "BSc Accounting → Job Seeker → Permit", Poland: "BSc Accounting → Work Permit → TRP",
    Singapore: "BAcc NUS / SMU → LTVP → EP", UAE: "BSc Accounting → Work Permit",
    Russia: "BSc Accounting → Permit → RVP", Georgia: "BSc Accounting → Permit → TRP",
    Philippines: "BSA Accounting → Visa → SRRV"
  },
  "Academic_UG_Arts": {
    Canada: "BA Psych / Soc / Design → PGWP → CEC", Germany: "BA Media / Design → JobSeeker → PR",
    UK: "BA Design / Fashion → Graduate → Skilled", USA: "BA Design / Comm → OPT → H1B",
    Australia: "BA Design / Media → PSWV → PR", "New Zealand": "BA Design → PSWV → SMC",
    Ireland: "BA Design → Stamp1G → Skills", Netherlands: "BA Design → Orientation → Search",
    France: "BA Design / Art → APS → Talent", Italy: "BA Design / Fashion → Permit → EC Long",
    Sweden: "BA Design → Job Seeker → Permit", Poland: "BA Design → Work Permit → TRP",
    Singapore: "BA Design → LTVP → EP (hard)", UAE: "BA Design → Work Permit",
    Russia: "BA Design → Permit → RVP", Georgia: "BA Design → Permit → TRP",
    Philippines: "BA Comm / Design → Visa → SRRV"
  },
  "Academic_PG_STEM": {
    Canada: "MSc CS / Data Sci → PGWP → PR", Germany: "MSc / BEng TUM / RWTH → BlueCard → PR",
    UK: "MSc / BEng → Graduate Visa → Skilled Worker", USA: "MS / PhD CS / Eng → OPT → H1B → Green",
    Australia: "MSc / MEng → PSWV → PR 189/190", "New Zealand": "MSc / MEng → PSWV → SMC → PR",
    Ireland: "MSc / MEng → Stamp1G → Critical Skills", Netherlands: "MSc TU Delft / TUE → Search → PR",
    France: "MSc / MEng → APS 2yr → Talent → PR", Italy: "MSc / MEng → Permit → EC Long → PR",
    Sweden: "MSc KTH / Chalmers → Job Seeker → PR", Poland: "MSc / BEng → Work Permit → TRP → PR",
    Singapore: "MSc NUS / NTU → LTVP → EP → PR", UAE: "MSc / BEng → Work Permit → NO PR",
    Russia: "MSc / BEng → Permit → RVP → PR", Georgia: "MSc / BEng → Permit → TRP → PR",
    Philippines: "MSc / MEng → Visa → SRRV"
  },
  "Academic_PG_Mgmt": {
    Canada: "MBA (Co-op) → PGWP → PR", Germany: "MBA Mannheim / WHU → BlueCard → PR",
    UK: "MBA LBS / LSE → Graduate → Skilled", USA: "MBA Harvard / Wharton → OPT → H1B",
    Australia: "MBA Melbourne / UNSW → PSWV → PR", "New Zealand": "MBA Auckland → PSWV → SMC",
    Ireland: "MBA Smurfit → Stamp1G → Skills", Netherlands: "MBA Rotterdam → Search → PR",
    France: "MBA INSEAD → APS → Talent", Italy: "MBA Bocconi → Permit → EC Long",
    Sweden: "MBA Stockholm → Job Seeker → PR", Poland: "MBA → Work Permit → TRP",
    Singapore: "MBA INSEAD / NUS → LTVP → EP", UAE: "MBA → Work Permit → NO PR",
    Russia: "MBA → Permit → RVP", Georgia: "MBA → Permit → TRP",
    Philippines: "MBA → Visa → SRRV"
  },
  "Academic_PG_Medicine": {
    Canada: "MSc Nursing / MPH → PGWP → PR", Germany: "MSc Health / BioEng → BlueCard → PR",
    UK: "MSc Nursing / MPH → Graduate → Skilled", USA: "MPH / MS Nursing → OPT → H1B",
    Australia: "MSc Nursing / MPH → PSWV → PR", "New Zealand": "MSc Nursing → PSWV → PR",
    Ireland: "MSc Nursing → Stamp1G → Skills", Netherlands: "MSc Health → Orientation → Search",
    France: "MSc Public Health → APS → Talent", Italy: "MSc Health → Permit → EC Long",
    Sweden: "MSc Public Health → Job Seeker", Poland: "MSc Nursing → Work Permit → TRP",
    Singapore: "MSc Health → LTVP → EP", UAE: "MSc Nursing → Work Permit",
    Russia: "MSc Nursing → Permit → RVP", Georgia: "MSc Nursing → Permit → TRP",
    Philippines: "MS Nursing → NCLEX → Overseas"
  },
  "Academic_PG_Accts": {
    Canada: "MAcc / MPA → CPA → PGWP → PR", Germany: "MSc Accounting → BlueCard → PR",
    UK: "MSc Accounting LSE → ACA → Skilled", USA: "MS Accountancy → CPA → OPT → H1B",
    Australia: "MProfAcc → CPA → PSWV → PR", "New Zealand": "MProfAcc → CA → PSWV",
    Ireland: "MSc Accounting → Chartered → Skills", Netherlands: "MSc Accounting → Search → PR",
    France: "MSc Accounting → APS → Talent", Italy: "MSc Accounting → Permit → EC Long",
    Sweden: "MSc Accounting → Job Seeker", Poland: "MSc Accounting → Work Permit",
    Singapore: "MSc Accounting → LTVP → EP", UAE: "MSc Accounting → Work Permit",
    Russia: "MSc Accounting → Permit", Georgia: "MSc Accounting → Permit",
    Philippines: "MS Accounting → Visa → SRRV"
  },
  "Academic_PG_Arts": {
    Canada: "MA Public Policy / Design → PGWP → PR", Germany: "MA Design / Media → BlueCard → PR",
    UK: "MA Design / Art → Graduate → Skilled", USA: "MFA Design / Comm → OPT → H1B",
    Australia: "MA Design → PSWV → PR", "New Zealand": "MA Design → PSWV → PR",
    Ireland: "MA Design → Stamp1G → Skills", Netherlands: "MA Design → Search → PR",
    France: "MA Design → APS → Talent", Italy: "MA Design → Permit → EC Long",
    Sweden: "MA Design → Job Seeker → PR", Poland: "MA Design → Work Permit → TRP",
    Singapore: "MA Design → LTVP → EP", UAE: "MA Design → Work Permit",
    Russia: "MA Design → Permit → RVP", Georgia: "MA Design → Permit → TRP",
    Philippines: "MA Design → Visa → SRRV"
  },
  // Trade programs (simplified)
  "Trade_UG_STEM": {
    Canada: "2yr Dip: Cyber Security → PGWP → PR", Germany: "Ausbildung: IT Specialist PAID → PR",
    UK: "HND Computing → Top-up → Graduate Visa", USA: "Community College: AS CS → OPT → H1B",
    Australia: "TAFE Dip: IT / Cyber → TR visa → PR", "New Zealand": "Polytechnic Dip: IT → PSWV → SMC → PR",
    Ireland: "PLC Level 6: IT → Stamp1G → Critical", Netherlands: "HBO Associate IT → Orientation → Search",
    France: "BTS / DUT IT → APS 2yr → Talent Pass", Italy: "ITS / Terziario IT → Work Permit → EC Long",
    Sweden: "Yrkeshogskola IT → Job Seeker → Permit", Poland: "Diploma IT → Work Permit → TRP → PR",
    Singapore: "Polytechnic Dip IT → LTVP → EP → PR", UAE: "Diploma IT → Work Permit → NO PR",
    Russia: "College Dip IT → Permit → RVP → PR", Georgia: "College Dip IT → Permit → TRP → PR 6",
    Philippines: "Associate IT → Work Visa → SRRV"
  },
  "Trade_UG_Mgmt": {
    Canada: "2yr Dip: Business → PGWP → PR", Germany: "Ausbildung: Office Mgmt PAID → PR",
    UK: "HND Business → Top-up → Graduate", USA: "Community College: AS Business → OPT",
    Australia: "TAFE Dip: Business → TR → PR", "New Zealand": "Polytechnic Dip: Business → PSWV → PR",
    Ireland: "PLC: Business → Stamp1G → Skills", Netherlands: "HBO: Business → Orientation → Search",
    France: "BTS: Business → APS → Talent Pass", Italy: "ITS: Business → Permit → EC Long",
    Sweden: "YH: Business → Seeker → Permit → PR", Poland: "Diploma: Business → Permit → TRP → PR",
    Singapore: "Polytechnic Dip: Business → LTVP → EP", UAE: "Diploma: Business → Work Permit → NO",
    Russia: "College Dip: Business → Permit → RVP", Georgia: "College Dip: Business → Permit → TRP",
    Philippines: "Associate: Business → Visa → SRRV"
  },
  "Trade_PG_STEM": {
    Canada: "PG Dip: IT → PGWP → PR", Germany: "Weiterbildung: IT Specialist → PR",
    UK: "PG Dip: IT → Graduate Visa → Skilled", USA: "PG Cert: IT → OPT → H1B",
    Australia: "PG Dip: IT → TR visa → PR", "New Zealand": "PG Dip: IT → PSWV → SMC → PR",
    Ireland: "PG Dip: IT → Stamp1G → Skills", Netherlands: "PG Dip: IT → Orientation → Search",
    France: "PG Dip: IT → APS → Talent → PR", Italy: "PG Dip: IT → Permit → EC Long → PR",
    Sweden: "PG Dip: IT → Job Seeker → Permit → PR", Poland: "PG Dip: IT → Permit → TRP → PR",
    Singapore: "PG Dip: IT → LTVP → EP → PR", UAE: "PG Dip: IT → Work Permit → NO PR",
    Russia: "PG Dip: IT → Permit → RVP → PR", Georgia: "PG Dip: IT → Permit → TRP → PR",
    Philippines: "PG Dip: IT → Visa → SRRV"
  }
};

// Helper to get program
export function getProgram(profile: Profile, level: Level, major: Major, country: Country): string {
  const key = `${profile}_${level}_${major}`;
  return PROGRAMS[key]?.[country] || "—";
}
