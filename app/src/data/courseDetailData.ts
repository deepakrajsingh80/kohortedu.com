/* ═══════════════════════════════════════════════════════════════
   COURSE DETAIL DATA — Country-specific info for each course type
   Provides: fees, eligibility, PR path, popular courses, work rights
   by course type × country for the redesigned course landing pages.
   ═══════════════════════════════════════════════════════════════ */

export interface CountryCourseInfo {
  country: string;
  flag: string;
  tuitionUG: string;
  tuitionPG: string;
  tuitionDiploma: string;
  tuitionPhD: string;
  tuitionPRPathway: string;
  popularCourses: string[];
  prFriendly: boolean;
  prPath: string;
  workRights: string;
  ieltsMin: string;
  gpaMin: string;
  scholarshipAvg: string;
  postStudyWork: string;
  prTimeline: string;
  hiringSectors: string[];
  avgSalary: string;
  costOfLiving: string;
  blockedAccount?: string;
  notes: string;
}

export interface CourseTypeDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  whatYouStudy: string[];
  bestFor: string[];
  prFriendlyFields: { field: string; prScore: string; demand: string }[];
  countryBreakdown: CountryCourseInfo[];
  admissionSteps: { step: number; title: string; desc: string; timeline: string }[];
  documentChecklist: string[];
  financialPlanning: { item: string; cost: string; note?: string }[];
  comparisonTable: { label: string; ug: string; pg: string; diploma: string; phd: string }[];
}

/* ─── PR-FRIENDLY FIELDS BY COURSE TYPE ─── */
export const PR_FRIENDLY_FIELDS: Record<string, { field: string; prScore: string; demand: string; countries: string[] }[]> = {
  undergraduate: [
    { field: "Computer Science & IT", prScore: "9/10", demand: "Extremely High", countries: ["Canada", "Australia", "Germany", "Ireland", "New Zealand"] },
    { field: "Engineering (All)", prScore: "9/10", demand: "Extremely High", countries: ["Canada", "Australia", "Germany", "UK", "Ireland"] },
    { field: "Nursing & Healthcare", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "Germany", "Ireland"] },
    { field: "Accounting & Finance", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "UK", "Ireland", "New Zealand"] },
    { field: "Data Science", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "Germany", "Ireland"] },
    { field: "Cybersecurity", prScore: "9/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "USA", "Germany"] },
    { field: "Hospitality Management", prScore: "7/10", demand: "High", countries: ["Canada", "Australia", "New Zealand", "Ireland", "UAE"] },
    { field: "Education / Teaching", prScore: "7/10", demand: "High", countries: ["Canada", "Australia", "UK", "Ireland", "New Zealand"] },
  ],
  postgraduate: [
    { field: "MS Computer Science / AI / ML", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Germany", "Ireland", "USA", "UK"] },
    { field: "MBA (General)", prScore: "6/10", demand: "Moderate", countries: ["Canada", "Australia", "UK", "Ireland", "Germany"] },
    { field: "MS Data Science / Analytics", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Germany", "Ireland", "USA", "UK"] },
    { field: "MS Engineering (All)", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "Germany", "Ireland", "USA", "UK"] },
    { field: "MS Nursing / Public Health", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "Ireland", "USA"] },
    { field: "MS Cybersecurity", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "USA", "Germany"] },
    { field: "MSc Biotechnology / Pharma", prScore: "8/10", demand: "High", countries: ["Germany", "Canada", "Australia", "Ireland", "UK"] },
    { field: "MS Supply Chain / Logistics", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "Germany", "Ireland"] },
    { field: "Professional Accounting (CPA/ACCA path)", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "New Zealand", "Ireland"] },
  ],
  diploma: [
    { field: "PG Diploma in Data Analytics", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "Ireland", "UK"] },
    { field: "PG Diploma in Cybersecurity", prScore: "9/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Ireland", "UK"] },
    { field: "PG Diploma in Cloud Computing", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "Ireland"] },
    { field: "PG Diploma in Business Analytics", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "Ireland", "UK"] },
    { field: "Diploma in Nursing (Practical)", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Ireland"] },
    { field: "PG Diploma in Supply Chain", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "Ireland"] },
    { field: "Diploma in Culinary Arts", prScore: "6/10", demand: "Moderate", countries: ["Canada", "Australia", "New Zealand", "Ireland"] },
    { field: "PG Diploma in Project Management", prScore: "7/10", demand: "Moderate", countries: ["Canada", "Australia", "Ireland", "UK"] },
  ],
  phd: [
    { field: "PhD Computer Science / AI", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Germany", "USA", "UK", "Ireland"] },
    { field: "PhD Engineering (All)", prScore: "10/10", demand: "Very High", countries: ["Canada", "Australia", "Germany", "USA", "UK"] },
    { field: "PhD Biotechnology / Life Sciences", prScore: "9/10", demand: "Very High", countries: ["Germany", "Canada", "Australia", "USA", "UK", "Ireland"] },
    { field: "PhD Physics / Chemistry / Maths", prScore: "9/10", demand: "High", countries: ["Germany", "Canada", "Australia", "USA", "UK"] },
    { field: "PhD Nursing / Public Health", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "Ireland", "USA"] },
    { field: "PhD Environmental Science", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "Germany", "Ireland", "New Zealand"] },
  ],
  "pr-pathways": [
    { field: "STEM (CS, Data Science, Engineering)", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Germany", "Ireland", "New Zealand", "USA", "UK"] },
    { field: "Healthcare (Nursing, Pharmacy, Public Health)", prScore: "10/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "UK", "Ireland", "Germany", "USA"] },
    { field: "Skilled Trades (Electrician, Welder, HVAC)", prScore: "9/10", demand: "Critical Shortage", countries: ["Canada", "Australia", "Germany", "Ireland"] },
    { field: "Accounting & Finance (CPA/ACCA path)", prScore: "9/10", demand: "Very High", countries: ["Canada", "Australia", "New Zealand", "Ireland"] },
    { field: "Education / Teaching", prScore: "7/10", demand: "High", countries: ["Canada", "Australia", "UK", "Ireland", "New Zealand"] },
    { field: "Hospitality & Tourism", prScore: "7/10", demand: "Moderate", countries: ["Canada", "Australia", "New Zealand", "Ireland", "UAE"] },
    { field: "Agriculture & Food Science", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "New Zealand", "Ireland"] },
    { field: "Social Work", prScore: "8/10", demand: "High", countries: ["Canada", "Australia", "UK", "Ireland", "New Zealand"] },
  ],
};

/* ─── COUNTRY BREAKDOWN BY COURSE TYPE ─── */

// ─── UNDERGRADUATE ───
export const UG_COUNTRY_DATA: CountryCourseInfo[] = [
  {
    country: "Canada", flag: "🇨🇦",
    tuitionUG: "CAD 15,000-35,000/yr", tuitionPG: "CAD 20,000-50,000/yr", tuitionDiploma: "CAD 12,000-18,000/yr", tuitionPhD: "Fully Funded + Stipend", tuitionPRPathway: "CAD 15,000-35,000/yr",
    popularCourses: ["BSc Computer Science", "BEng Engineering", "BBA", "BSc Nursing", "BCA", "BCom Accounting"],
    prFriendly: true, prPath: "3-year PGWP → Express Entry CEC (1yr work) → PR in 12-18mo",
    workRights: "20 hrs/week during study, unlimited during breaks",
    ieltsMin: "6.0 overall (6.5 for top unis)", gpaMin: "65% in 12th (70%+ for top unis)",
    scholarshipAvg: "CAD 2,000-10,000/yr (merit-based)",
    postStudyWork: "3 years (PGWP)", prTimeline: "3-4 years total (study + work + PR processing)",
    hiringSectors: ["Tech", "Healthcare", "Banking", "Engineering", "Education"],
    avgSalary: "CAD 55,000-75,000/yr starting", costOfLiving: "CAD 1,200-2,000/mo",
    notes: "PGWP length matches program length (min 8 months). STEM graduates have highest PR success rate."
  },
  {
    country: "Germany", flag: "🇩🇪",
    tuitionUG: "€0 (public) or €5,000-20,000/yr (private)", tuitionPG: "€0 (public) or €8,000-25,000/yr (private)", tuitionDiploma: "€0-5,000/yr", tuitionPhD: "Fully Funded + €1,200-2,000/mo", tuitionPRPathway: "€0 (public)",
    popularCourses: ["BSc Computer Science (TU9)", "BEng Mechanical", "BSc Physics", "MBBS (6 yr)", "BBA (private)"],
    prFriendly: true, prPath: "18-month Job Seeker Visa → EU Blue Card (€45,300+) → PR in 21-33 months",
    workRights: "120 full days or 240 half days/year (student visa)",
    ieltsMin: "6.5 overall (German B2 for German-taught)", gpaMin: "70% in 12th (85%+ for TU9)",
    scholarshipAvg: "€300-800/mo (DAAD, Deutschlandstipendium)",
    postStudyWork: "18 months (Job Seeker Visa)", prTimeline: "3-4 years total",
    hiringSectors: ["Automotive", "Engineering", "IT", "Pharma", "Research"],
    avgSalary: "€45,000-65,000/yr starting", costOfLiving: "€850-1,200/mo",
    blockedAccount: "€11,904/year (~₹11L) in blocked account required for visa",
    notes: "Public universities are FREE — only semester contribution (~€300/sem). Blocked account is your living money released monthly. German language B2 opens 3x more opportunities."
  },
  {
    country: "UK", flag: "🇬🇧",
    tuitionUG: "£12,000-25,000/yr", tuitionPG: "£15,000-35,000/yr", tuitionDiploma: "£8,000-15,000/yr", tuitionPhD: "£15,000-25,000/yr (usually funded)", tuitionPRPathway: "£12,000-25,000/yr",
    popularCourses: ["BSc Computer Science", "BEng Engineering", "LLB Law", "BSc Economics", "BSc Psychology"],
    prFriendly: true, prPath: "Graduate Visa (2yr) → Skilled Worker Visa (5yr) → ILR → Citizenship",
    workRights: "20 hrs/week during term, full-time during holidays",
    ieltsMin: "6.0 overall (6.5 for Russell Group)", gpaMin: "70% in 12th (80%+ for top 20)",
    scholarshipAvg: "£2,000-5,000/yr (university-specific)",
    postStudyWork: "2 years (Graduate Visa)", prTimeline: "7 years total (2yr Graduate + 5yr Skilled Worker)",
    hiringSectors: ["Finance", "Tech", "Consulting", "Law", "Pharma"],
    avgSalary: "£28,000-40,000/yr starting", costOfLiving: "£1,000-1,500/mo",
    notes: "PSW is back (Graduate Route). London salary premium 20-30%. Russell Group = top 24 universities."
  },
  {
    country: "Australia", flag: "🇦🇺",
    tuitionUG: "AUD 25,000-45,000/yr", tuitionPG: "AUD 30,000-50,000/yr", tuitionDiploma: "AUD 15,000-25,000/yr", tuitionPhD: "Fully Funded + AUD 28,000-35,000/yr", tuitionPRPathway: "AUD 25,000-45,000/yr",
    popularCourses: ["BSc IT", "BEng Engineering", "B Nursing", "BBA", "BCom Accounting", "BSc Data Science"],
    prFriendly: true, prPath: "Temporary Graduate Visa (485) → Skills Assessment → PR (189/190/491)",
    workRights: "48 hrs/fortnight during study, unlimited during breaks",
    ieltsMin: "6.0 overall (6.5 for Group of Eight)", gpaMin: "65% in 12th (75%+ for Go8)",
    scholarshipAvg: "AUD 5,000-15,000/yr",
    postStudyWork: "2-4 years (485 Visa, length depends on degree level)", prTimeline: "3-5 years total",
    hiringSectors: ["Healthcare", "IT", "Engineering", "Accounting", "Education"],
    avgSalary: "AUD 65,000-85,000/yr starting", costOfLiving: "AUD 1,500-2,500/mo",
    notes: "Group of Eight (Go8) = top 8. 485 visa length: Bachelor=2yr, Master=3yr, PhD=4yr. Points-based PR system (need 65+ points)."
  },
  {
    country: "USA", flag: "🇺🇸",
    tuitionUG: "$25,000-60,000/yr", tuitionPG: "$30,000-70,000/yr", tuitionDiploma: "$15,000-30,000/yr", tuitionPhD: "Fully Funded + $25,000-45,000/yr stipend", tuitionPRPathway: "$25,000-60,000/yr",
    popularCourses: ["BS Computer Science", "BS Engineering", "BS Economics", "BS Biology", "BBA"],
    prFriendly: false, prPath: "OPT (1-3yr) → H-1B (lottery) → EB-2/3 Green Card (5-10yr backlog for Indians)",
    workRights: "On-campus 20 hrs/week (1st year), CPT/OPT after",
    ieltsMin: "6.5 overall (7.0 for top 50)", gpaMin: "70% in 12th (SAT 1300+ for top 100)",
    scholarshipAvg: "$5,000-25,000/yr (merit/need-based)",
    postStudyWork: "12 months OPT (36 months for STEM)", prTimeline: "8-15 years (H-1B lottery + green card backlog)",
    hiringSectors: ["Tech", "Finance", "Consulting", "Healthcare", "Research"],
    avgSalary: "$70,000-100,000/yr starting", costOfLiving: "$1,200-2,500/mo",
    notes: "STEM OPT = 3 years total work authorization. H-1B lottery makes PR uncertain. Best for career growth even without PR."
  },
  {
    country: "Ireland", flag: "🇮🇪",
    tuitionUG: "€10,000-20,000/yr", tuitionPG: "€12,000-25,000/yr", tuitionDiploma: "€8,000-15,000/yr", tuitionPhD: "€0-15,000/yr (funded available)", tuitionPRPathway: "€10,000-20,000/yr",
    popularCourses: ["BSc Computer Science", "BEng", "BPharm", "BBM", "BSc Biotech"],
    prFriendly: true, prPath: "2-year Stamp 1G → Critical Skills Employment Permit → Stamp 4 (PR) in 2 years",
    workRights: "20 hrs/week during study, 40 hrs during holidays (May-Aug, Dec-Jan)",
    ieltsMin: "6.0 overall", gpaMin: "60% in 12th",
    scholarshipAvg: "€2,000-5,000/yr (Government of Ireland scholarships)",
    postStudyWork: "2 years (Third Level Graduate Scheme)", prTimeline: "4-5 years total",
    hiringSectors: ["Pharma", "Tech (FAANG HQs)", "Finance", "Biotech"],
    avgSalary: "€35,000-50,000/yr starting", costOfLiving: "€1,000-1,500/mo",
    notes: "Major tech HQs: Google, Apple, Meta, Microsoft, TikTok. Pharma hub: Pfizer, J&J, Roche. STEM graduates have 2-year stay-back."
  },
  {
    country: "New Zealand", flag: "🇳🇿",
    tuitionUG: "NZD 22,000-35,000/yr", tuitionPG: "NZD 26,000-40,000/yr", tuitionDiploma: "NZD 15,000-22,000/yr", tuitionPhD: "NZD 6,500-8,000/yr (domestic rate)", tuitionPRPathway: "NZD 22,000-35,000/yr",
    popularCourses: ["BSc Computer Science", "BEng", "B Nursing", "BBA", "BCom"],
    prFriendly: true, prPath: "Post-Study Work Visa → Skilled Migrant Category (points 160+) → PR",
    workRights: "20 hrs/week during study, full-time during holidays",
    ieltsMin: "6.0 overall", gpaMin: "65% in 12th",
    scholarshipAvg: "NZD 3,000-10,000/yr",
    postStudyWork: "3 years (Bachelor), 3 years (Master)", prTimeline: "4-5 years total",
    hiringSectors: ["Healthcare", "IT", "Agriculture", "Tourism", "Construction"],
    avgSalary: "NZD 55,000-70,000/yr starting", costOfLiving: "NZD 1,500-2,000/mo",
    notes: "High quality of life. Healthcare and IT on Long Term Skill Shortage List. Lower competition than Australia."
  },
  {
    country: "Netherlands", flag: "🇳🇱",
    tuitionUG: "€8,000-15,000/yr", tuitionPG: "€12,000-20,000/yr", tuitionDiploma: "€6,000-12,000/yr", tuitionPhD: "€0 (employee salary €2,500-3,500/mo)", tuitionPRPathway: "€8,000-15,000/yr",
    popularCourses: ["BSc Computer Science", "BSc AI / Data Science", "BEng", "BBA", "BSc Psychology"],
    prFriendly: true, prPath: "1-year Orientation Year (Search Year) → Highly Skilled Migrant Visa → PR in 5 years",
    workRights: "16 hrs/week during study, full-time Jun-Aug",
    ieltsMin: "6.0 overall (6.5 for research unis)", gpaMin: "70% in 12th",
    scholarshipAvg: "€5,000/yr (Holland Scholarship)",
    postStudyWork: "1 year (Orientation Year)", prTimeline: "5-6 years total",
    hiringSectors: ["Tech (ASML, Booking)", "AgriTech", "Finance", "Logistics"],
    avgSalary: "€40,000-55,000/yr starting", costOfLiving: "€900-1,400/mo",
    notes: "English-taught programs widely available. Tech hub: ASML, Booking.com, Adyen, TomTom. Lower fees than UK."
  },
  {
    country: "Singapore", flag: "🇸🇬",
    tuitionUG: "SGD 20,000-40,000/yr", tuitionPG: "SGD 25,000-50,000/yr", tuitionDiploma: "SGD 10,000-20,000/yr", tuitionPhD: "Fully Funded + SGD 2,000-3,500/mo", tuitionPRPathway: "SGD 20,000-40,000/yr",
    popularCourses: ["BSc Computer Science (NUS/NTU)", "BEng", "BBA", "BSc Data Science", "B Economics"],
    prFriendly: false, prPath: "Employment Pass → S Pass → PR (very competitive, 2-6 years processing)",
    workRights: "Part-time work allowed after 1st semester (needs approval)",
    ieltsMin: "6.5 overall", gpaMin: "80% in 12th",
    scholarshipAvg: "Full tuition (NUS/NTU scholarships for top students)",
    postStudyWork: "Not guaranteed — needs employer sponsorship", prTimeline: "5-8 years (very competitive)",
    hiringSectors: ["Finance", "Tech", "Biotech", "Logistics"],
    avgSalary: "SGD 45,000-65,000/yr starting", costOfLiving: "SGD 1,200-2,000/mo",
    notes: "NUS/NTU ranked top 20 globally. Very competitive PR. Best for short-term career boost. No post-study work visa."
  },
  {
    country: "UAE", flag: "🇦🇪",
    tuitionUG: "AED 40,000-80,000/yr", tuitionPG: "AED 50,000-100,000/yr", tuitionDiploma: "AED 25,000-50,000/yr", tuitionPhD: "AED 60,000-120,000/yr", tuitionPRPathway: "AED 40,000-80,000/yr",
    popularCourses: ["BBA", "BSc IT", "BEng", "BSc Aviation", "BHM"],
    prFriendly: false, prPath: "Golden Visa (10yr) for exceptional talent/investors. No standard PR pathway.",
    workRights: "Part-time work allowed (university approval needed)",
    ieltsMin: "6.0 overall", gpaMin: "60% in 12th",
    scholarshipAvg: "10-25% tuition waiver",
    postStudyWork: "No dedicated post-study visa", prTimeline: "N/A (no standard PR)",
    hiringSectors: ["Finance", "Tourism", "Aviation", "Real Estate", "Logistics"],
    avgSalary: "AED 80,000-150,000/yr starting", costOfLiving: "AED 3,000-6,000/mo",
    notes: "Tax-free income. No post-study work visa. Golden Visa for exceptional students/researchers. Good for Middle East network."
  },
  {
    country: "South Korea", flag: "🇰🇷",
    tuitionUG: "KRW 4,000,000-10,000,000/sem", tuitionPG: "KRW 5,000,000-12,000,000/sem", tuitionDiploma: "KRW 3,000,000-7,000,000/sem", tuitionPhD: "KRW 0-6,000,000/sem (funded available)", tuitionPRPathway: "KRW 4,000,000-10,000,000/sem",
    popularCourses: ["BSc Computer Science (KAIST/SNU)", "BEng", "BBA", "BSc AI", "Korean Language"],
    prFriendly: false, prPath: "D-10 Job Seeker (6mo) → E-7 Work Visa → F-2 Points Visa → F-5 PR (3-5yr)",
    workRights: "20 hrs/week (after 6 months), need Korean language",
    ieltsMin: "6.0 / TOPIK 3+ (Korean)", gpaMin: "65% in 12th",
    scholarshipAvg: "Full tuition (GKS Scholarship)",
    postStudyWork: "6 months (D-10)", prTimeline: "5-7 years",
    hiringSectors: ["Electronics (Samsung, LG)", "Automotive (Hyundai)", "K-Pop/Media", "Tech"],
    avgSalary: "KRW 35,000,000-50,000,000/yr", costOfLiving: "KRW 800,000-1,500,000/mo",
    notes: "GKS Scholarship = full ride for top students. Korean language crucial for jobs. Great for tech/semiconductor careers."
  },
  {
    country: "Poland", flag: "🇵🇱",
    tuitionUG: "€2,000-4,000/yr", tuitionPG: "€2,000-5,000/yr", tuitionDiploma: "€1,500-3,000/yr", tuitionPhD: "€0-3,000/yr", tuitionPRPathway: "€2,000-4,000/yr",
    popularCourses: ["BSc IT", "BSc Medicine (6yr)", "BEng", "BBA", "BSc Pharmacy"],
    prFriendly: true, prPath: "Work Permit → EU Long-Term Residence (5yr continuous) → PR",
    workRights: "20 hrs/week during study, full-time during holidays",
    ieltsMin: "6.0 overall", gpaMin: "55% in 12th",
    scholarshipAvg: "€500-2,000/yr",
    postStudyWork: "1.5 years", prTimeline: "5-7 years",
    hiringSectors: ["IT (outsourcing hub)", "Pharma", "Manufacturing", "Shared Services"],
    avgSalary: "€15,000-25,000/yr starting", costOfLiving: "€400-700/mo",
    notes: "Most affordable in Europe. EU Blue Card pathway available. Growing IT outsourcing hub. Low cost of living."
  },
];

// ─── POSTGRADUATE ───
export const PG_COUNTRY_DATA: CountryCourseInfo[] = UG_COUNTRY_DATA.map(c => ({
  ...c,
  popularCourses: c.country === "Canada" ? ["MS Computer Science", "MS Data Science", "MBA", "MS Engineering", "MS Cybersecurity", "MSc Nursing"] :
    c.country === "Germany" ? ["MS Computer Science (TU9)", "MS Automotive Eng", "MBA (private)", "MS AI/Robotics", "MSc Economics"] :
    c.country === "UK" ? ["MSc Computer Science", "MBA", "MSc Finance", "MSc Data Science", "MEng"] :
    c.country === "Australia" ? ["MS IT", "MBA", "MS Engineering", "M Nursing", "M Data Science"] :
    c.country === "USA" ? ["MS CS / AI / ML", "MBA", "MS Data Science", "MS Engineering", "MS Finance"] :
    c.country === "Ireland" ? ["MSc Computer Science", "MBA", "MSc Data Analytics", "MSc Biotech", "MEng"] :
    c.country === "Netherlands" ? ["MSc Computer Science", "MSc AI", "MBA", "MSc Data Science", "MEng"] :
    c.country === "New Zealand" ? ["MS Computer Science", "MBA", "MS Engineering", "M Nursing"] :
    c.country === "Singapore" ? ["MSc Computer Science (NUS)", "MBA (INSEAD)", "MSc Data Science", "MEng"] :
    c.country === "South Korea" ? ["MS CS (KAIST)", "MBA", "MS AI", "MSc Economics"] :
    c.country === "Poland" ? ["MSc IT", "MBA", "MSc Medicine", "MEng"] :
    c.popularCourses,
}));

// ─── DIPLOMA ───
export const DIPLOMA_COUNTRY_DATA: CountryCourseInfo[] = UG_COUNTRY_DATA.map(c => ({
  ...c,
  popularCourses: c.country === "Canada" ? ["PG Diploma Data Analytics", "PG Diploma Cybersecurity", "PG Diploma Cloud Computing", "PG Diploma Business Analytics", "PG Diploma Project Mgmt"] :
    c.country === "Australia" ? ["Diploma IT", "Diploma Nursing", "Diploma Hospitality", "Advanced Diploma Engineering"] :
    c.country === "Ireland" ? ["Higher Diploma CS", "Higher Diploma Data Science", "PG Diploma Cybersecurity", "PG Diploma AI"] :
    c.country === "UK" ? ["PG Diploma Data Science", "PG Diploma Business", "HND Engineering", "Diploma Nursing"] :
    c.country === "Germany" ? ["Ausbildung (Vocational Training)", "Fachhochschule Diploma", "IT Apprenticeship"] :
    c.country === "New Zealand" ? ["Diploma IT", "Diploma Nursing", "Diploma Business", "Diploma Engineering"] :
    c.country === "Poland" ? ["Diploma IT", "Diploma Business", "Diploma Pharmacy"] :
    c.popularCourses,
  notes: c.country === "Canada" ? "PG Diploma = 1-2yr. Qualifies for 1-3yr PGWP. Best PR pathway for diploma students. Co-op programs available." :
    c.country === "Australia" ? "Diploma + Advanced Diploma can lead to Bachelor transfer. 485 visa requires Bachelor minimum." :
    c.country === "Germany" ? "Ausbildung = paid vocational training (€800-1,200/mo). 3yr program. Leads directly to work." :
    c.country === "Ireland" ? "Higher Diploma = 1yr conversion course. Great for career switchers. 2yr stay-back." :
    c.notes,
}));

// ─── PhD ───
export const PHD_COUNTRY_DATA: CountryCourseInfo[] = UG_COUNTRY_DATA.map(c => ({
  ...c,
  popularCourses: c.country === "Canada" ? ["PhD Computer Science", "PhD Engineering", "PhD Biotech", "PhD Physics", "PhD Nursing"] :
    c.country === "Germany" ? ["PhD (Dr.-Ing. / Dr. rer. nat.)", "PhD Computer Science", "PhD Physics", "PhD Chemistry", "PhD Engineering"] :
    c.country === "USA" ? ["PhD CS / AI / ML", "PhD Engineering", "PhD Biology", "PhD Physics", "PhD Economics"] :
    c.country === "UK" ? ["PhD Computer Science", "PhD Engineering", "PhD Biotech", "PhD Chemistry"] :
    c.country === "Australia" ? ["PhD Computer Science", "PhD Engineering", "PhD Medical Research"] :
    c.country === "Ireland" ? ["PhD Computer Science", "PhD Biotech", "PhD Pharma"] :
    c.country === "Netherlands" ? ["PhD (4yr employee contract)", "PhD Computer Science", "PhD Physics"] :
    c.popularCourses,
  notes: c.country === "Germany" ? "PhD is FREE + stipend. Dr.-Ing. at TU9 universities. Industry PhDs with BMW, Siemens, Bosch available." :
    c.country === "USA" ? "5-year program. Fully funded via RA/TA. Year 1 = coursework + rotation. Year 2+ = research. GRE 320+ for top programs." :
    c.country === "Netherlands" ? "PhD is a 4yr EMPLOYEE contract (€2,500-3,500/mo). You are a university employee with pension, vacation, benefits." :
    c.country === "UK" ? "3-4 year program. 1st year = coursework + research proposal. Funded via research councils or university scholarships." :
    c.notes,
}));

// ─── PR PATHWAYS ───
export const PR_COUNTRY_DATA: CountryCourseInfo[] = UG_COUNTRY_DATA.map(c => ({
  ...c,
  prFriendly: c.country === "Canada" || c.country === "Australia" || c.country === "Germany" || c.country === "Ireland" || c.country === "New Zealand" || c.country === "Netherlands" || c.country === "UK" || c.country === "Poland",
  notes: c.country === "Canada" ? "Express Entry CRS: Age + Education + Language + Work Exp + Canadian degree bonus. PNP adds 600 points. Nursing/STEM have highest success rate." :
    c.country === "Australia" ? "Points test: 65 minimum. Age(30pts max) + English(20pts) + Education(15pts) + Work(20pts) + Study(5pts) + Regional(15pts). STEM/Healthcare on MLTSSL." :
    c.country === "Germany" ? "EU Blue Card: €45,300+ salary (€41,041 shortage occupations). PR in 21 months with B1 German or 33 months with A1. Fastest EU PR pathway." :
    c.country === "Ireland" ? "Critical Skills Employment Permit: €32,000+ (€64,000+ for non-shortage). Stamp 4 (PR) after 2 years on CSEP. STEM graduates prioritized." :
    c.country === "New Zealand" ? "Skilled Migrant Category: 160 points. Green List occupations = fast-track PR (no points needed). STEM/Healthcare on Green List." :
    c.country === "UK" ? "Graduate Visa (2yr) → Skilled Worker (sponsorship needed, £38,700 min salary) → ILR (5yr). Healthcare workers exempt from salary threshold." :
    c.country === "Netherlands" ? "Highly Skilled Migrant: €5,000+ gross/month (€3,700 under 30). Orientation Year after graduation. PR after 5 years continuous." :
    c.country === "Poland" ? "EU Long-Term Residence after 5 years. Blue Card available for skilled workers. Easy pathway to EU-wide mobility." :
    c.notes,
}));

/* ─── HELPER: Get country data by course type ─── */
export function getCountryData(courseTypeId: string): CountryCourseInfo[] {
  switch (courseTypeId) {
    case "undergraduate": return UG_COUNTRY_DATA;
    case "postgraduate": return PG_COUNTRY_DATA;
    case "diploma": return DIPLOMA_COUNTRY_DATA;
    case "phd": return PHD_COUNTRY_DATA;
    case "pr-pathways": return PR_COUNTRY_DATA;
    default: return UG_COUNTRY_DATA;
  }
}

export function getPRFriendlyFields(courseTypeId: string): { field: string; prScore: string; demand: string; countries: string[] }[] {
  return PR_FRIENDLY_FIELDS[courseTypeId] || [];
}
