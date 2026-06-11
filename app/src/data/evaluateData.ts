/* ═══════════════════════════════════════════════════════════════
   DECISION ENGINE DATA TABLES
   All hardcoded country data, scores, recommendations.
   Separated from Evaluate.tsx to reduce chunk size.
   ═══════════════════════════════════════════════════════════════ */

// Research-backed salary database (22 countries x 16 majors)
import { SALARY_BY_MAJOR, getMajorSalary } from "./salaryResearch";
export { SALARY_BY_MAJOR, getMajorSalary };

import type { ElementType } from "react";
import {
  Calculator, Stethoscope, Brain, FlaskConical, Palette, Calculator as CalculatorIcon,
  Laptop, BarChart3, HeartPulse, Microscope,
  CheckCircle2, AlertTriangle,
  Shirt, Utensils, Newspaper, Clapperboard,
} from "lucide-react";

// ─── Type for Exam Config ───
export interface ExamConfig {
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step: number;
  icon: ElementType;
  helperText: string;
  unit: string;
}

export interface WorkExpConfig {
  required: boolean;
  minYears: number;
  idealYears: number;
  note: string;
}

export interface CourseRec {
  name: string;
  desc: string;
  topCountries: string[];
  duration: string;
  career: string;
}

export const EXAM_CONFIG: Record<string, ExamConfig> = {
  // ─── UG combinations ───
  "UG-CS_IT":      { label: "SAT / JEE Score",      placeholder: "e.g. 1350",   min: 400,  max: 1600, step: 10,  icon: Laptop,           helperText: "SAT (400-1600) for abroad. JEE rank for India-adjacent planning.", unit: "points" },
  "UG-DataScience":{ label: "SAT / JEE Score",      placeholder: "e.g. 1300",   min: 400,  max: 1600, step: 10,  icon: BarChart3,        helperText: "SAT for US/Canada. Strong math background required.", unit: "points" },
  "UG-Engineering":{ label: "SAT / JEE Score",      placeholder: "e.g. 1250",   min: 400,  max: 1600, step: 10,  icon: FlaskConical,     helperText: "SAT for abroad. JEE Mains/Advanced for India-adjacent.", unit: "points" },
  "UG-MBBS":       { label: "NEET Score",           placeholder: "e.g. 550",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET out of 720. 137+ qualifies. 550+ for govt colleges.", unit: "/720" },
  "UG-MDS":        { label: "NEET Score",           placeholder: "e.g. 500",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET for BDS admission. 400+ for private dental colleges.", unit: "/720" },
  "UG-Nursing":    { label: "12th Board %",         placeholder: "e.g. 75",     min: 0,    max: 100,  step: 0.1, icon: HeartPulse,       helperText: "12th % (60%+ min) + English proficiency. Biology preferred.", unit: "%" },
  "UG-Pharmacy":   { label: "12th Board %",         placeholder: "e.g. 80",     min: 0,    max: 100,  step: 0.1, icon: FlaskConical,     helperText: "12th % (70%+ min) with Chemistry + Biology/Physics.", unit: "%" },
  "UG-Biotech":    { label: "12th Board %",         placeholder: "e.g. 78",     min: 0,    max: 100,  step: 0.1, icon: Microscope,       helperText: "12th % (65%+ min) with Biology + Chemistry.", unit: "%" },
  "UG-Mgmt":       { label: "CAT Percentile / SAT", placeholder: "e.g. 85",     min: 0,    max: 100,  step: 0.1, icon: Brain,            helperText: "CAT percentile (0-100) or SAT score (400-1600)", unit: "percentile" },
  "UG-Accts":      { label: "12th Board %",         placeholder: "e.g. 88",     min: 0,    max: 100,  step: 0.1, icon: CalculatorIcon,   helperText: "Your 12th standard percentage. 85%+ preferred for top colleges.", unit: "%" },
  "UG-Arts":       { label: "12th Board %",         placeholder: "e.g. 82",     min: 0,    max: 100,  step: 0.1, icon: Palette,          helperText: "Your 12th standard percentage + portfolio for design programs", unit: "%" },
  "UG-Fashion":    { label: "12th Board % + Portfolio", placeholder: "e.g. 80",  min: 0,    max: 100,  step: 0.1, icon: Shirt,            helperText: "12th % (60%+ min) + design portfolio for fashion institutes", unit: "%" },
  "UG-Hotel":      { label: "12th Board % + Interview", placeholder: "e.g. 75",  min: 0,    max: 100,  step: 0.1, icon: Utensils,         helperText: "12th % (55%+ min) + personal interview. Service attitude matters.", unit: "%" },
  "UG-Journalism": { label: "12th Board % + Writing",   placeholder: "e.g. 78",  min: 0,    max: 100,  step: 0.1, icon: Newspaper,        helperText: "12th % + writing sample/blog/portfolio. Strong English required.", unit: "%" },
  "UG-Media":      { label: "12th Board % + Portfolio", placeholder: "e.g. 76",  min: 0,    max: 100,  step: 0.1, icon: Clapperboard,     helperText: "12th % + creative portfolio (videos, photos, scripts)", unit: "%" },
  // ─── PG combinations ───
  "PG-CS_IT":      { label: "GRE Score",            placeholder: "e.g. 325",    min: 260,  max: 340,  step: 1,   icon: Laptop,           helperText: "GRE General (320+ competitive). Some unis waive GRE for work exp.", unit: "/340" },
  "PG-DataScience":{ label: "GRE Score",            placeholder: "e.g. 320",    min: 260,  max: 340,  step: 1,   icon: BarChart3,        helperText: "GRE (315+). Strong quant section preferred for DS programs.", unit: "/340" },
  "PG-Engineering":{ label: "GRE Score",            placeholder: "e.g. 315",    min: 260,  max: 340,  step: 1,   icon: FlaskConical,     helperText: "GRE (310+). Germany options often don't require GRE.", unit: "/340" },
  "PG-MBBS":       { label: "NEET Score",           placeholder: "e.g. 550",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET PG for India. USMLE for USA. PLAB for UK.", unit: "/720" },
  "PG-MD_MS":      { label: "NEET PG / USMLE",      placeholder: "e.g. 480",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET PG score. Or USMLE Step 1/2 for USA pathway.", unit: "score" },
  "PG-MDS":        { label: "NEET MDS Score",       placeholder: "e.g. 450",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET MDS for India. NBDE for USA. ORE for UK.", unit: "/720" },
  "PG-Nursing":    { label: "IELTS + Work Exp",     placeholder: "e.g. 7.0",    min: 4,    max: 9,    step: 0.5, icon: HeartPulse,       helperText: "IELTS 6.5+ + clinical nursing experience. NCLEX for USA/Canada.", unit: "band" },
  "PG-Pharmacy":   { label: "GRE / GPAT Score",     placeholder: "e.g. 310",    min: 260,  max: 340,  step: 1,   icon: FlaskConical,     helperText: "GRE for abroad. GPAT for India. NAPLEX for USA licensure.", unit: "/340" },
  "PG-Biotech":    { label: "GRE Score",            placeholder: "e.g. 315",    min: 260,  max: 340,  step: 1,   icon: Microscope,       helperText: "GRE General (300+ preferred). Research experience valued.", unit: "/340" },
  "PG-Mgmt":       { label: "GMAT Score",           placeholder: "e.g. 700",    min: 205,  max: 805,  step: 1,   icon: Brain,            helperText: "GMAT Focus Edition (205-805). 665+ for top-50 B-schools.", unit: "/805" },
  "PG-Accts":      { label: "CPA/ACCA Papers Cleared", placeholder: "e.g. 5",     min: 0,    max: 13,   step: 1,   icon: CalculatorIcon,   helperText: "Number of ACCA papers cleared (0-13). Or CPA exams passed (0-4).", unit: "papers" },
  "PG-Arts":       { label: "IELTS + Portfolio",    placeholder: "e.g. 7.5",    min: 4,    max: 9,    step: 0.5, icon: Palette,          helperText: "IELTS score (4.0-9.0). Portfolio required for design/arts programs.", unit: "band" },
  "PG-Fashion":    { label: "IELTS + Design Portfolio", placeholder: "e.g. 7.0", min: 4,    max: 9,    step: 0.5, icon: Shirt,            helperText: "IELTS 6.5+ + strong design portfolio. Work experience preferred.", unit: "band" },
  "PG-Hotel":      { label: "IELTS + Work Exp",     placeholder: "e.g. 6.5",    min: 4,    max: 9,    step: 0.5, icon: Utensils,         helperText: "IELTS 6.0+ + 1-2 years hospitality work experience preferred.", unit: "band" },
  "PG-Journalism": { label: "IELTS + Writing Samples", placeholder: "e.g. 7.0",  min: 4,    max: 9,    step: 0.5, icon: Newspaper,        helperText: "IELTS 6.5+ + published articles/blog/internship clips.", unit: "band" },
  "PG-Media":      { label: "IELTS + Creative Reel",   placeholder: "e.g. 7.0",  min: 4,    max: 9,    step: 0.5, icon: Clapperboard,     helperText: "IELTS 6.5+ + demo reel/portfolio. Film school auditions common.", unit: "band" },
};

function getExamConfig(level: Level, major: Major): ExamConfig | null {
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
type PRPriority = "High" | "Med" | "Low";
type RegionFilter = "Any" | string;

export const MAJOR_LABEL: Record<string, string> = {
  CS_IT: "Computer Science & IT", DataScience: "Data Science & Analytics", Engineering: "Engineering",
  MBBS: "MBBS (Medicine)", MD_MS: "MD / MS (Surgery)", MDS: "MDS (Dental)",
  Nursing: "Nursing", Pharmacy: "Pharmacy", Biotech: "Biotechnology",
  Mgmt: "Management", Accts: "Accounts", Arts: "Arts & Humanities",
  Fashion: "Fashion & Design", Hotel: "Hotel Management",
  Journalism: "Journalism", Media: "Films & Media",
  "": "—",
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

export function getCourseRecommendations(courseType: CourseType, level: Level, major: Major): ProgramRec[] {
  if (!courseType || !level || !major) return [];
  const key = `${courseType}-${level}-${major}`;
  const map: Record<string, ProgramRec[]> = {
    // ─── ACADEMIC + UG ───
    "Academic-UG-CS_IT": [
      { name: "BS Computer Science", desc: "Core programming, algorithms, software engineering. Most versatile tech degree globally.", topCountries: ["USA", "Canada", "Germany"], duration: "4 years", career: "Software Engineer, $90-150K" },
      { name: "BS Artificial Intelligence", desc: "Machine learning, NLP, computer vision. The hottest field in tech right now.", topCountries: ["USA", "Canada", "UK"], duration: "4 years", career: "AI Engineer, $100-180K" },
      { name: "BS Cybersecurity", desc: "Ethical hacking, network security, compliance. 0% unemployment rate globally.", topCountries: ["USA", "UK", "Australia"], duration: "4 years", career: "Security Engineer, $95-150K" },
      { name: "BS Information Technology", desc: "Cloud computing, DevOps, system administration. Practical tech career path.", topCountries: ["USA", "Canada", "Australia"], duration: "4 years", career: "Cloud Engineer, $85-140K" },
    ],
    "Academic-UG-DataScience": [
      { name: "BS Data Science & Analytics", desc: "Statistics, ML, visualization. Fastest-growing field with applications in every industry.", topCountries: ["USA", "UK", "Ireland"], duration: "3-4 years", career: "Data Analyst, $85-140K" },
      { name: "BS Statistics & Data Analytics", desc: "Mathematical modeling, predictive analytics, big data. Quant-heavy foundation.", topCountries: ["USA", "UK", "Netherlands"], duration: "3-4 years", career: "Data Scientist, $90-145K" },
      { name: "BS Business Analytics", desc: "Data-driven business decisions, SQL, Tableau. Business + tech hybrid.", topCountries: ["USA", "Ireland", "Canada"], duration: "3-4 years", career: "Business Analyst, $80-130K" },
    ],
    "Academic-UG-Engineering": [
      { name: "B.Tech Mechanical / Automotive", desc: "Design, manufacturing, thermodynamics. Germany's automotive industry absorbs thousands.", topCountries: ["Germany", "Canada", "Australia"], duration: "4 years", career: "Design Engineer, $75-120K" },
      { name: "B.Tech Electrical / Electronics", desc: "Hardware design, embedded systems, robotics. Strong demand in automotive & chip industry.", topCountries: ["Germany", "USA", "Netherlands"], duration: "4 years", career: "Hardware Engineer, $80-130K" },
      { name: "B.Tech Civil / Structural", desc: "Construction, urban planning, sustainable infrastructure. Growing with global development.", topCountries: ["Australia", "Canada", "Germany"], duration: "4 years", career: "Civil Engineer, $70-110K" },
      { name: "B.Tech Aerospace / Aeronautical", desc: "Aircraft design, propulsion, avionics. Niche but high-paying field.", topCountries: ["USA", "Germany", "UK"], duration: "4 years", career: "Aerospace Engineer, $85-140K" },
    ],
    "Academic-UG-MBBS": [
      { name: "MBBS / MD Medicine", desc: "Clinical medicine, anatomy, physiology, clinical rotations. Direct pathway to medical practice.", topCountries: ["Russia", "Georgia", "Philippines"], duration: "5-6 years", career: "Doctor / Resident, $120-250K" },
      { name: "MBBS (6-year program)", desc: "Intensive medical training with early clinical exposure. NMC-recognised options.", topCountries: ["Russia", "Georgia"], duration: "6 years", career: "General Practitioner, $100-200K" },
      { name: "Pre-Med + MD Pathway", desc: "4-year pre-med BS + 4-year MD. US/Canada medical school route.", topCountries: ["USA", "Canada"], duration: "8 years total", career: "Physician, $200-400K" },
    ],
    "Academic-UG-MDS": [
      { name: "BDS / DDS Dentistry", desc: "Oral surgery, orthodontics, prosthodontics, endodontics. High earning with own practice.", topCountries: ["Russia", "Georgia", "Philippines"], duration: "5 years", career: "Dentist, $100-200K" },
      { name: "BDS (5-year program)", desc: "Comprehensive dental training with clinical practice. NMC-recognised.", topCountries: ["Russia", "Georgia"], duration: "5 years", career: "Dental Surgeon, $90-180K" },
    ],
    "Academic-UG-Nursing": [
      { name: "BSc Nursing (BSN)", desc: "Patient care, healthcare admin, specialized nursing. Critical shortage worldwide.", topCountries: ["Canada", "Australia", "Germany"], duration: "3-4 years", career: "Registered Nurse, $70-110K" },
      { name: "BS Nursing (Pre-licensure)", desc: "Direct RN pathway. NCLEX prep included. Fastest healthcare PR route in Canada.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "4 years", career: "RN / Nurse Practitioner, $75-120K" },
    ],
    "Academic-UG-Pharmacy": [
      { name: "B.Pharm / PharmD", desc: "Drug development, clinical trials, pharmacology. Growing demand in pharma hubs.", topCountries: ["USA", "UK", "Ireland"], duration: "4-6 years", career: "Pharmacist, $90-130K" },
      { name: "BS Pharmaceutical Sciences", desc: "Drug formulation, quality control, regulatory affairs. Industry-focused.", topCountries: ["USA", "Canada", "Ireland"], duration: "4 years", career: "Pharma Scientist, $85-120K" },
    ],
    "Academic-UG-Biotech": [
      { name: "BSc Biotechnology", desc: "Genetics, molecular biology, fermentation tech. Strong research foundation.", topCountries: ["USA", "Germany", "Ireland"], duration: "3-4 years", career: "Lab Scientist, $70-100K" },
      { name: "BS Biomedical Sciences", desc: "Human biology, pathology, research methods. Pre-med alternative.", topCountries: ["UK", "Canada", "Australia"], duration: "3-4 years", career: "Research Associate, $65-95K" },
    ],
    "Academic-UG-Mgmt": [
      { name: "BBA Business Administration", desc: "Finance, marketing, operations. Foundation for MBA or direct corporate roles.", topCountries: ["USA", "Canada", "Singapore"], duration: "3-4 years", career: "Business Analyst, $70-110K" },
      { name: "BCom Accounting & Finance", desc: "Auditing, taxation, investment analysis. Direct pathway to CPA/ACCA.", topCountries: ["Canada", "Australia", "UK"], duration: "3 years", career: "Accountant, $65-100K" },
      { name: "BS Economics", desc: "Macro/micro economics, policy analysis, quantitative methods. Strong for consulting.", topCountries: ["UK", "USA", "Netherlands"], duration: "3 years", career: "Economic Analyst, $75-120K" },
    ],
    "Academic-UG-Accts": [
      { name: "BCom / BA Accounting", desc: "Financial accounting, auditing, tax. Step 1 toward CPA (USA) or ACCA (UK).", topCountries: ["Canada", "Australia", "USA"], duration: "3-4 years", career: "Staff Accountant, $60-95K" },
      { name: "BS Finance & Investment", desc: "Capital markets, portfolio management, corporate finance. Wall Street feeder.", topCountries: ["USA", "UK", "Singapore"], duration: "3-4 years", career: "Financial Analyst, $80-130K" },
      { name: "BBA Taxation & Audit", desc: "Tax law, forensic accounting, compliance. Evergreen demand in every country.", topCountries: ["Canada", "Australia", "Germany"], duration: "3 years", career: "Tax Consultant, $65-105K" },
    ],
    "Academic-UG-Arts": [
      { name: "BA Psychology", desc: "Clinical, organizational, counseling psychology. Growing demand in healthcare & HR.", topCountries: ["USA", "Canada", "UK"], duration: "3-4 years", career: "Psychologist, $70-120K" },
      { name: "BA Liberal Arts", desc: "Interdisciplinary: philosophy, literature, sociology. Top US colleges love this.", topCountries: ["USA", "Netherlands", "Canada"], duration: "4 years", career: "Consultant, $65-100K" },
      { name: "BA Media & Communication", desc: "Journalism, PR, digital media. Strong in creative economies.", topCountries: ["UK", "USA", "Australia"], duration: "3 years", career: "Media Manager, $60-95K" },
      { name: "BArch Architecture", desc: "Design, urban planning, sustainable construction. Creative + technical blend.", topCountries: ["Germany", "Australia", "Canada"], duration: "5 years", career: "Architect, $75-130K" },
    ],
    // ─── ACADEMIC + PG ───
    "Academic-PG-CS_IT": [
      { name: "MS Computer Science", desc: "Algorithms, distributed systems, software architecture. The gold standard tech degree.", topCountries: ["USA", "Canada", "Germany"], duration: "1-2 years", career: "Software Architect, $130-200K" },
      { name: "MS Artificial Intelligence", desc: "Deep learning, NLP, computer vision. #1 choice for Indian CS grads.", topCountries: ["USA", "Canada", "UK"], duration: "1-2 years", career: "ML Engineer, $140-220K" },
      { name: "MS Cybersecurity", desc: "Ethical hacking, network security, compliance. 0% unemployment rate globally.", topCountries: ["USA", "UK", "Australia"], duration: "1-2 years", career: "Security Engineer, $120-170K" },
      { name: "MS Software Engineering", desc: "System design, DevOps, cloud-native development. Practical industry-focused.", topCountries: ["USA", "Canada", "Ireland"], duration: "1-2 years", career: "Senior Engineer, $120-180K" },
    ],
    "Academic-PG-DataScience": [
      { name: "MS Data Science", desc: "Big data, statistical modeling, cloud ML. Every company needs data scientists.", topCountries: ["USA", "Ireland", "UK"], duration: "1-2 years", career: "Data Scientist, $120-180K" },
      { name: "MS Business Analytics", desc: "Data-driven strategy, operations analytics, financial modeling. MBA alternative.", topCountries: ["USA", "Ireland", "Canada"], duration: "1-2 years", career: "Analytics Manager, $110-170K" },
      { name: "MS Big Data Engineering", desc: "Hadoop, Spark, cloud data pipelines. Backend of every AI/ML system.", topCountries: ["USA", "Germany", "Ireland"], duration: "1-2 years", career: "Data Engineer, $130-190K" },
    ],
    "Academic-PG-Engineering": [
      { name: "MEng / MS Mechanical", desc: "Advanced manufacturing, robotics, automotive. Germany's hidden gem.", topCountries: ["Germany", "Canada", "USA"], duration: "2 years", career: "Project Engineer, $100-150K" },
      { name: "MS Electrical / Electronics", desc: "VLSI, embedded systems, chip design. Semiconductor industry demand.", topCountries: ["Germany", "USA", "Netherlands"], duration: "2 years", career: "Chip Designer, $110-160K" },
      { name: "MS Civil / Structural", desc: "Infrastructure, sustainable construction, project management. Growing globally.", topCountries: ["Australia", "Canada", "Germany"], duration: "1-2 years", career: "Structural Engineer, $90-140K" },
      { name: "MEng Aerospace", desc: "Aircraft design, propulsion, space systems. Niche but prestigious.", topCountries: ["USA", "Germany", "UK"], duration: "2 years", career: "Aerospace Engineer, $100-160K" },
    ],
    "Academic-PG-MBBS": [
      { name: "MD / MBBS (Advanced Standing)", desc: "For BSc graduates to enter medicine at year 2-3. Accelerated medical degree.", topCountries: ["USA", "Australia", "Poland"], duration: "4 years", career: "Physician, $200-350K" },
      { name: "Doctor of Medicine (MD)", desc: "Complete medical degree for graduate entry. NMC-recognised in select countries.", topCountries: ["Philippines", "Poland", "Georgia"], duration: "4-5 years", career: "Doctor, $150-300K" },
    ],
    "Academic-PG-MD_MS": [
      { name: "MS / MD General Surgery", desc: "Specialized surgical training. Highest medical salaries post-training.", topCountries: ["USA", "UK", "Germany"], duration: "3-5 years", career: "Surgeon, $250-500K" },
      { name: "MD Internal Medicine", desc: "Diagnosis, treatment, chronic care. Broadest medical specialization.", topCountries: ["USA", "UK", "Canada"], duration: "3 years", career: "Internist, $200-400K" },
      { name: "MS Orthopedics / Neurosurgery", desc: "Super-specialized surgery. Extremely high demand and compensation.", topCountries: ["USA", "Germany", "UK"], duration: "5-6 years", career: "Specialist Surgeon, $300-600K" },
    ],
    "Academic-PG-MDS": [
      { name: "MDS Oral Surgery", desc: "Complex extractions, implants, facial reconstruction. Highest-paid dental specialty.", topCountries: ["USA", "UK", "Australia"], duration: "3 years", career: "Oral Surgeon, $200-400K" },
      { name: "MDS Orthodontics", desc: "Braces, aligners, jaw correction. Strong private practice potential.", topCountries: ["USA", "Canada", "Australia"], duration: "2-3 years", career: "Orthodontist, $180-350K" },
      { name: "MDS Prosthodontics", desc: "Crowns, bridges, dentures, implants. Aging population = growing demand.", topCountries: ["USA", "Germany", "UK"], duration: "3 years", career: "Prosthodontist, $150-300K" },
    ],
    "Academic-PG-Nursing": [
      { name: "MSc Nursing (Advanced Practice)", desc: "Leadership roles, clinical specialization. Direct PR pathway in Canada & Australia.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Nurse Manager, $90-130K" },
      { name: "MS Healthcare Administration", desc: "Hospital management, health policy, operations. Non-clinical leadership.", topCountries: ["USA", "Canada", "UK"], duration: "1-2 years", career: "Health Admin, $100-160K" },
      { name: "MPH Public Health", desc: "Epidemiology, health policy, biostatistics. Post-COVID demand surge.", topCountries: ["USA", "UK", "Canada"], duration: "1-2 years", career: "Health Director, $90-150K" },
    ],
    "Academic-PG-Pharmacy": [
      { name: "PharmD (Doctor of Pharmacy)", desc: "Clinical pharmacy, patient care, pharmacotherapy. Direct patient interaction.", topCountries: ["USA", "Canada", "UK"], duration: "3-4 years", career: "Clinical Pharmacist, $110-160K" },
      { name: "MPharm Pharmaceutical Sciences", desc: "Drug development, formulation, regulatory. Industry-focused.", topCountries: ["USA", "UK", "Ireland"], duration: "2 years", career: "Pharma Scientist, $95-140K" },
      { name: "MS Pharmacology", desc: "Drug action, toxicology, clinical trials. Research pathway.", topCountries: ["USA", "Germany", "UK"], duration: "2 years", career: "Research Pharmacologist, $90-130K" },
    ],
    "Academic-PG-Biotech": [
      { name: "MS Biotechnology", desc: "Genomics, drug discovery, clinical research. Strong pharma pipeline.", topCountries: ["USA", "Germany", "Ireland"], duration: "2 years", career: "Research Scientist, $95-140K" },
      { name: "MS Bioinformatics", desc: "Computational biology, genomics data, AI in drug discovery. High-demand niche.", topCountries: ["USA", "Germany", "Netherlands"], duration: "2 years", career: "Bioinformatician, $100-150K" },
      { name: "MSc Molecular Biology", desc: "Cell biology, genetic engineering, CRISPR. Research-intensive.", topCountries: ["USA", "UK", "Germany"], duration: "1-2 years", career: "Molecular Biologist, $90-130K" },
    ],
    "Academic-PG-Mgmt": [
      { name: "MBA (General)", desc: "Strategy, leadership, operations. The gold standard for management careers.", topCountries: ["USA", "UK", "Canada"], duration: "1-2 years", career: "Product Manager, $130-200K" },
      { name: "MBA Finance", desc: "Investment banking, corporate finance, PE/VC. Highest ROI among all MBAs.", topCountries: ["USA", "UK", "France"], duration: "1-2 years", career: "Investment Banker, $150-300K" },
      { name: "MBA Technology / Product", desc: "Tech strategy, product management, agile. Perfect for STEM grads pivoting.", topCountries: ["USA", "Singapore", "Germany"], duration: "1-2 years", career: "Tech PM, $140-220K" },
      { name: "MS Supply Chain Management", desc: "Logistics, procurement, operations. Critical post-pandemic skill gap.", topCountries: ["Germany", "Netherlands", "USA"], duration: "1-2 years", career: "SC Manager, $100-160K" },
    ],
    "Academic-PG-Accts": [
      { name: "MSc Accounting / CPA Track", desc: "US GAAP, audit, corporate tax. Prepares for CPA licensure in USA.", topCountries: ["USA", "Canada", "Australia"], duration: "1-2 years", career: "Senior Accountant, $95-140K" },
      { name: "MSc Finance (MFin)", desc: "Quantitative finance, derivatives, risk management. Hardcore finance track.", topCountries: ["USA", "UK", "Singapore"], duration: "1-2 years", career: "Quant Analyst, $130-250K" },
      { name: "MBA Accounting & Finance", desc: "Business + accounting hybrid. Best for leadership in finance functions.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Finance Manager, $110-170K" },
    ],
    "Academic-PG-Arts": [
      { name: "MA / MS Psychology (Clinical)", desc: "Therapy, assessment, mental health. Licensed practice pathway.", topCountries: ["USA", "Canada", "UK"], duration: "2 years", career: "Clinical Psychologist, $85-140K" },
      { name: "MA UX / Interaction Design", desc: "User research, prototyping, design systems. Tech + creative intersection.", topCountries: ["USA", "Netherlands", "Sweden"], duration: "1-2 years", career: "UX Lead, $110-170K" },
      { name: "MA International Relations", desc: "Diplomacy, global policy, NGO work. Gateway to UN, World Bank.", topCountries: ["UK", "Netherlands", "Switzerland"], duration: "1-2 years", career: "Policy Advisor, $80-130K" },
      { name: "MEd Education Leadership", desc: "Curriculum design, EdTech, admin. Growing with online education.", topCountries: ["USA", "Canada", "Australia"], duration: "1-2 years", career: "Education Director, $75-120K" },
    ],
    // ─── VOCATIONAL + UG ───
    "Vocational-UG-CS_IT": [
      { name: "Advanced Diploma IT / Networking", desc: "Cisco, cloud admin, DevOps. 2-year fast track to tech jobs with PR.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "Network Admin, $70-100K" },
      { name: "Diploma Cybersecurity Operations", desc: "SOC analyst, incident response, compliance. Massive skill shortage.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "SOC Analyst, $80-120K" },
      { name: "Diploma Cloud Computing (AWS/Azure)", desc: "Cloud architecture, serverless, containers. Every company is migrating.", topCountries: ["Canada", "Australia", "Germany"], duration: "1-2 years", career: "Cloud Admin, $85-130K" },
    ],
    "Vocational-UG-DataScience": [
      { name: "Diploma Data Analytics", desc: "Excel, SQL, Tableau, Python basics. Entry point to data careers.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Junior Data Analyst, $60-90K" },
      { name: "Certificate Business Intelligence", desc: "Power BI, data warehousing, reporting. Strong corporate demand.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1 year", career: "BI Analyst, $70-100K" },
    ],
    "Vocational-UG-Engineering": [
      { name: "Advanced Diploma Mechanical Design", desc: "CAD/CAM, 3D modeling, manufacturing processes. Hands-on engineering.", topCountries: ["Canada", "Australia", "Germany"], duration: "2 years", career: "CAD Technician, $65-95K" },
      { name: "Diploma Electrical Technician", desc: "Power systems, automation, PLC programming. Industrial demand.", topCountries: ["Canada", "Australia", "Germany"], duration: "2 years", career: "Electrical Tech, $60-90K" },
    ],
    "Vocational-UG-MBBS": [
      { name: "Pre-Medical Certificate", desc: "Foundation in biology, chemistry, physics. Bridge to MBBS for non-science grads.", topCountries: ["Russia", "Georgia", "Philippines"], duration: "1 year", career: "MBBS Student" },
    ],
    "Vocational-UG-MDS": [
      { name: "Dental Assistant Diploma", desc: "Chairside assisting, sterilization, patient prep. Entry to dental field.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "1 year", career: "Dental Assistant, $45-70K" },
    ],
    "Vocational-UG-Nursing": [
      { name: "Diploma Practical Nursing (PN)", desc: "Direct patient care, clinic work. Fastest healthcare PR pathway in Canada.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "LPN / RN, $65-95K" },
      { name: "Certificate Aged Care / Disability", desc: "Elderly care, support work. Huge demand in aging Western populations.", topCountries: ["Australia", "Canada", "New Zealand"], duration: "1-2 years", career: "Care Coordinator, $55-80K" },
    ],
    "Vocational-UG-Pharmacy": [
      { name: "Diploma Pharmacy Technician", desc: "Dispensing, inventory, patient service. Entry point to pharmacy career.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Pharmacy Tech, $50-75K" },
      { name: "Certificate Compounding Pharmacy", desc: "Custom medication preparation. Specialized niche in pharmacy.", topCountries: ["Canada", "USA", "Australia"], duration: "1 year", career: "Compounding Tech, $55-80K" },
    ],
    "Vocational-UG-Biotech": [
      { name: "Diploma Medical Lab Technology", desc: "Diagnostics, pathology, lab management. In-demand behind-the-scenes role.", topCountries: ["Canada", "Australia", "Germany"], duration: "2 years", career: "Lab Technician, $60-90K" },
      { name: "Certificate Clinical Research Coord", desc: "Trial coordination, data entry, regulatory support. Growing field.", topCountries: ["Canada", "Ireland", "USA"], duration: "1 year", career: "Clinical Coord, $55-85K" },
    ],
    "Vocational-UG-Mgmt": [
      { name: "Diploma Hospitality Management", desc: "Hotel ops, tourism, event management. Canada's booming sector.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "Hotel Manager, $55-85K" },
      { name: "Diploma Supply Chain & Logistics", desc: "Warehousing, procurement, distribution. Essential infrastructure role.", topCountries: ["Canada", "Australia", "Germany"], duration: "1-2 years", career: "Logistics Coord, $65-95K" },
      { name: "Diploma HR Management", desc: "Recruitment, labor law, payroll. Every company needs HR.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "HR Coordinator, $55-85K" },
    ],
    "Vocational-UG-Accts": [
      { name: "Diploma Accounting & Payroll", desc: "Bookkeeping, tax prep, payroll systems. Steady demand, PR-friendly.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "1-2 years", career: "Bookkeeper, $55-80K" },
      { name: "Diploma Financial Planning", desc: "Wealth management, insurance, retirement planning. Commission + salary.", topCountries: ["Canada", "Australia"], duration: "1-2 years", career: "Financial Planner, $70-110K" },
      { name: "Certificate Business Analytics", desc: "Excel, Power BI, SQL. Bridge to data science with minimal math.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1 year", career: "Business Analyst, $70-100K" },
    ],
    "Vocational-UG-Arts": [
      { name: "Diploma Graphic Design", desc: "Branding, UI design, motion graphics. Creative + tech intersection.", topCountries: ["Canada", "Australia", "UK"], duration: "2 years", career: "Graphic Designer, $55-85K" },
      { name: "Diploma Early Childhood Education", desc: "Preschool teaching, child development. PR priority occupation.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "1-2 years", career: "ECE Teacher, $50-75K" },
      { name: "Certificate Digital Marketing", desc: "SEO, PPC, social media, analytics. Fastest entry to marketing.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Digital Marketer, $60-90K" },
    ],
    // ─── VOCATIONAL + PG ───
    "Vocational-PG-CS_IT": [
      { name: "PG Diploma Cybersecurity", desc: "CISSP prep, ethical hacking, compliance. Every industry needs security.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Security Analyst, $95-140K" },
      { name: "PG Diploma Cloud Computing", desc: "AWS, Azure, Kubernetes. Cloud skills = guaranteed interviews.", topCountries: ["Canada", "Australia", "Germany"], duration: "1-2 years", career: "Cloud Admin, $90-140K" },
      { name: "PG Diploma Web Development", desc: "Full-stack JavaScript, React, Node. Bootcamp-style intensive.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Full-Stack Dev, $80-120K" },
    ],
    "Vocational-PG-DataScience": [
      { name: "PG Diploma Data Analytics", desc: "Python, SQL, Tableau. Intensive 1-year program with co-op.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1 year", career: "Data Analyst, $85-130K" },
      { name: "PG Diploma AI & Machine Learning", desc: "Deep learning, NLP, computer vision. Practical AI application focus.", topCountries: ["Canada", "USA", "Ireland"], duration: "1 year", career: "ML Engineer, $100-150K" },
    ],
    "Vocational-PG-Engineering": [
      { name: "PG Diploma Project Management (Eng)", desc: "PMP prep, Agile, construction/project management. Industry-recognized.", topCountries: ["Canada", "Australia", "Germany"], duration: "1 year", career: "Project Manager, $90-130K" },
      { name: "PG Diploma Supply Chain / Operations", desc: "Logistics, Lean Six Sigma, manufacturing ops. Engineering + business hybrid.", topCountries: ["Canada", "Germany", "Australia"], duration: "1 year", career: "Operations Manager, $85-120K" },
    ],
    "Vocational-PG-MBBS": [
      { name: "PG Diploma Pre-Clinical Sciences", desc: "Anatomy, physiology, biochemistry prep. Bridge for alternate-entry MD.", topCountries: ["Poland", "Georgia", "Philippines"], duration: "1 year", career: "Medical Student" },
    ],
    "Vocational-PG-MD_MS": [
      { name: "PG Diploma Surgical Assisting", desc: "OR support, surgical tech, sterilization. High demand in hospital systems.", topCountries: ["Canada", "Australia", "USA"], duration: "1-2 years", career: "Surgical Assistant, $70-100K" },
    ],
    "Vocational-PG-MDS": [
      { name: "PG Diploma Dental Technology", desc: "Crown/bridge fabrication, digital dentistry. Lab-based dental career.", topCountries: ["Canada", "Australia", "Germany"], duration: "1-2 years", career: "Dental Tech, $60-90K" },
    ],
    "Vocational-PG-Nursing": [
      { name: "PG Diploma Public Health", desc: "Epidemiology, health admin, policy. Shorter alternative to MPH.", topCountries: ["Canada", "Australia", "UK"], duration: "1 year", career: "Health Officer, $75-110K" },
      { name: "PG Diploma Clinical Research", desc: "Trials management, regulatory affairs, pharmacovigilance.", topCountries: ["Canada", "Ireland", "Germany"], duration: "1-2 years", career: "Clinical Assoc, $80-120K" },
    ],
    "Vocational-PG-Pharmacy": [
      { name: "PG Diploma Regulatory Affairs", desc: "Drug approval, FDA/EMA compliance, pharmacovigilance. High demand.", topCountries: ["Ireland", "Canada", "USA"], duration: "1 year", career: "Regulatory Assoc, $85-120K" },
      { name: "PG Diploma Clinical Trials Management", desc: "Protocol design, site management, data monitoring.", topCountries: ["Canada", "Ireland", "USA"], duration: "1 year", career: "Trial Manager, $90-130K" },
    ],
    "Vocational-PG-Biotech": [
      { name: "PG Diploma Clinical Research", desc: "Trials management, regulatory affairs, pharmacovigilance.", topCountries: ["Canada", "Ireland", "Germany"], duration: "1-2 years", career: "Clinical Assoc, $80-120K" },
      { name: "PG Diploma Quality Assurance (Biotech)", desc: "GMP compliance, lab quality systems, audit. Essential for pharma manufacturing.", topCountries: ["Ireland", "Germany", "Singapore"], duration: "1 year", career: "QA Specialist, $75-110K" },
    ],
    "Vocational-PG-Mgmt": [
      { name: "PG Diploma International Business", desc: "Global trade, cross-border strategy, export/import.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Trade Manager, $85-130K" },
      { name: "PG Diploma Operations Management", desc: "Lean, Six Sigma, process optimization. Manufacturing & services.", topCountries: ["Canada", "Germany", "Australia"], duration: "1-2 years", career: "Ops Manager, $95-140K" },
      { name: "PG Diploma Marketing Analytics", desc: "Data-driven marketing, CRM, customer insights.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1 year", career: "Marketing Analyst, $80-120K" },
    ],
    "Vocational-PG-Accts": [
      { name: "PG Diploma Accounting (CPA Track)", desc: "US GAAP, audit, tax. Prepares for CPA exams while studying.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Accountant, $85-125K" },
      { name: "PG Diploma Fintech", desc: "Blockchain, digital payments, robo-advisory. Emerging field.", topCountries: ["Canada", "Ireland", "Singapore"], duration: "1 year", career: "Fintech Analyst, $95-140K" },
    ],
    "Vocational-PG-Arts": [
      { name: "PG Diploma UX / UI Design", desc: "Figma, user research, prototyping. In-demand creative-tech hybrid.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "UX Designer, $90-140K" },
      { name: "PG Diploma Media Production", desc: "Video editing, content strategy, social media production.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Content Lead, $75-110K" },
      { name: "PG Diploma Counselling Psychology", desc: "Mental health, therapy techniques, community support.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Counsellor, $70-105K" },
    ],
    // ─── FASHION ───
    "Academic-UG-Fashion": [
      { name: "BDes Fashion Design", desc: "Apparel design, textiles, illustration, trend forecasting. Strong industry placement track.", topCountries: ["UK", "Italy", "USA"], duration: "3-4 years", career: "Fashion Designer, $50-100K" },
      { name: "BSc Textile Technology", desc: "Fabric science, sustainable materials, production techniques. Technical track in fashion.", topCountries: ["Germany", "UK", "Netherlands"], duration: "3-4 years", career: "Textile Technologist, $55-95K" },
      { name: "BA Fashion Communication", desc: "Styling, branding, fashion journalism, visual merchandising. Creative + business blend.", topCountries: ["UK", "France", "USA"], duration: "3 years", career: "Fashion Editor, $45-85K" },
    ],
    "Academic-PG-Fashion": [
      { name: "MA Fashion Design", desc: "Advanced design methodology, collection development, runway presentation.", topCountries: ["UK", "Italy", "France"], duration: "1-2 years", career: "Lead Designer, $70-130K" },
      { name: "MSc Luxury Brand Management", desc: "Heritage brands, retail strategy, consumer behaviour. Strong in Switzerland & France.", topCountries: ["Switzerland", "France", "UK"], duration: "1-2 years", career: "Brand Manager, $80-150K" },
      { name: "MA Sustainable Fashion", desc: "Circular design, ethical sourcing, green supply chains. Fastest-growing niche.", topCountries: ["Netherlands", "UK", "Sweden"], duration: "1-2 years", career: "Sustainability Director, $75-120K" },
    ],
    "Vocational-UG-Fashion": [
      { name: "Diploma Fashion Design", desc: "Pattern making, garment construction, CAD. 2-year fast track to entry-level roles.", topCountries: ["Canada", "Australia", "UK"], duration: "2 years", career: "Junior Designer, $40-65K" },
      { name: "Certificate Fashion Styling", desc: "Personal styling, editorial shoots, wardrobe consulting. Freelance-friendly.", topCountries: ["Canada", "Australia", "UAE"], duration: "1 year", career: "Stylist, $35-70K" },
    ],
    "Vocational-PG-Fashion": [
      { name: "PG Diploma Fashion Buying", desc: "Merchandising, trend analysis, retail math. Bridges design and business.", topCountries: ["UK", "Canada", "Australia"], duration: "1 year", career: "Fashion Buyer, $65-110K" },
      { name: "PG Diploma Fashion Marketing", desc: "Digital marketing, brand strategy, influencer partnerships for fashion brands.", topCountries: ["UK", "Canada", "Ireland"], duration: "1 year", career: "Fashion Marketer, $60-95K" },
    ],
    // ─── HOTEL MANAGEMENT ───
    "Academic-UG-Hotel": [
      { name: "BBA Hospitality Management", desc: "Hotel ops, F&B management, revenue management. Swiss schools are gold standard.", topCountries: ["Switzerland", "Netherlands", "Spain"], duration: "3-4 years", career: "Hotel Manager, $55-100K" },
      { name: "BSc Culinary Arts", desc: "Professional kitchen training, menu design, food science. Hands-on from day one.", topCountries: ["Switzerland", "France", "Spain"], duration: "3 years", career: "Executive Chef, $50-90K" },
      { name: "BA Tourism & Events", desc: "Destination marketing, event planning, cultural tourism. Strong in European hubs.", topCountries: ["Spain", "Italy", "Netherlands"], duration: "3 years", career: "Events Director, $45-85K" },
    ],
    "Academic-PG-Hotel": [
      { name: "MSc International Hospitality Management", desc: "Strategic leadership in global hospitality. Strong internship pipelines.", topCountries: ["Switzerland", "Netherlands", "UK"], duration: "1-2 years", career: "General Manager, $80-150K" },
      { name: "MBA Hospitality (Luxury Focus)", desc: "Revenue strategy, asset management, luxury service excellence.", topCountries: ["Switzerland", "France", "UAE"], duration: "1-2 years", career: "VP Operations, $120-200K" },
      { name: "MSc Gastronomy & Food Studies", desc: "Food culture, sustainable dining, culinary innovation. Research + practice.", topCountries: ["France", "Italy", "Spain"], duration: "1-2 years", career: "F&B Director, $70-120K" },
    ],
    "Vocational-UG-Hotel": [
      { name: "Diploma Hotel Operations", desc: "Front desk, housekeeping, reservations. Co-op included. PR-friendly in Canada.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "Operations Supervisor, $45-70K" },
      { name: "Certificate Culinary Management", desc: "Kitchen leadership, food safety, cost control. Fastest pathway to chef roles.", topCountries: ["Canada", "Australia"], duration: "1-2 years", career: "Sous Chef, $50-75K" },
    ],
    "Vocational-PG-Hotel": [
      { name: "PG Diploma Global Hospitality", desc: "Cross-cultural service standards, revenue optimisation, digital hospitality.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Hotel Director, $75-120K" },
      { name: "PG Diploma Tourism & Events", desc: "MICE tourism, destination marketing, large-scale event execution.", topCountries: ["Canada", "Australia", "UAE"], duration: "1-2 years", career: "Event Manager, $55-90K" },
    ],
    // ─── JOURNALISM ───
    "Academic-UG-Journalism": [
      { name: "BA Journalism & Mass Communication", desc: "Reporting, editing, broadcasting, digital media. Strong internships at news outlets.", topCountries: ["UK", "USA", "Australia"], duration: "3-4 years", career: "Journalist, $45-85K" },
      { name: "BA Digital Media & Storytelling", desc: "Online journalism, podcasting, data journalism, multimedia production.", topCountries: ["USA", "UK", "Ireland"], duration: "3-4 years", career: "Digital Editor, $50-90K" },
      { name: "BA Public Relations", desc: "Corporate communications, crisis management, brand storytelling. High demand.", topCountries: ["UK", "USA", "Australia"], duration: "3-4 years", career: "PR Manager, $55-100K" },
    ],
    "Academic-PG-Journalism": [
      { name: "MA Journalism", desc: "Investigative reporting, documentary, international correspondence.", topCountries: ["UK", "USA", "Netherlands"], duration: "1-2 years", career: "Senior Reporter, $60-110K" },
      { name: "MA Digital Journalism", desc: "AI in news, audience analytics, platform strategy. Future-proof track.", topCountries: ["USA", "UK", "Ireland"], duration: "1-2 years", career: "Editor-in-Chief, $80-140K" },
      { name: "MSc Media & Communication", desc: "Media theory, research methods, policy analysis. Academic + industry hybrid.", topCountries: ["UK", "Netherlands", "Sweden"], duration: "1-2 years", career: "Media Strategist, $70-120K" },
    ],
    "Vocational-UG-Journalism": [
      { name: "Diploma Broadcast Journalism", desc: "TV/radio production, anchoring, scriptwriting. Hands-on studio training.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Broadcast Producer, $45-75K" },
      { name: "Certificate Content Writing", desc: "SEO writing, social media, copywriting. Freelance-friendly entry point.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Content Writer, $40-70K" },
    ],
    "Vocational-PG-Journalism": [
      { name: "PG Diploma Public Relations", desc: "Corporate comms, media relations, digital PR strategy.", topCountries: ["Canada", "UK", "Australia"], duration: "1 year", career: "PR Director, $70-110K" },
      { name: "PG Diploma Digital Content", desc: "Video production, podcasting, social media strategy for brands.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Content Strategist, $65-100K" },
    ],
    // ─── FILMS & MEDIA ───
    "Academic-UG-Media": [
      { name: "BA Film Production", desc: "Directing, cinematography, editing, sound design. Portfolio-intensive admission.", topCountries: ["USA", "UK", "Australia"], duration: "3-4 years", career: "Film Director, $50-120K" },
      { name: "BSc Animation & VFX", desc: "3D modelling, motion capture, compositing. Huge demand in gaming & film.", topCountries: ["USA", "Canada", "UK"], duration: "3-4 years", career: "VFX Artist, $60-110K" },
      { name: "BA Screenwriting", desc: "Script development, story structure, pitching. USC & UCLA are top feeders to Hollywood.", topCountries: ["USA", "UK", "Australia"], duration: "3-4 years", career: "Screenwriter, $50-200K" },
    ],
    "Academic-PG-Media": [
      { name: "MA Film Directing", desc: "Advanced directing, visual storytelling, festival strategy. LA & London hubs.", topCountries: ["USA", "UK", "Australia"], duration: "1-2 years", career: "Director, $80-200K" },
      { name: "MSc Animation & Game Design", desc: "Real-time rendering, Unreal Engine, interactive storytelling. Gaming industry track.", topCountries: ["USA", "Canada", "UK"], duration: "1-2 years", career: "Game Designer, $90-150K" },
      { name: "MA Documentary Filmmaking", desc: "Non-fiction storytelling, social impact cinema, festival distribution.", topCountries: ["UK", "Netherlands", "Australia"], duration: "1-2 years", career: "Documentary Filmmaker, $60-130K" },
    ],
    "Vocational-UG-Media": [
      { name: "Diploma Film & Video Production", desc: "Camera operation, editing (Premiere/Final Cut), production management.", topCountries: ["Canada", "Australia", "UK"], duration: "1-2 years", career: "Production Asst, $40-65K" },
      { name: "Certificate Motion Graphics", desc: "After Effects, Cinema 4D, title design. High demand in advertising.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1 year", career: "Motion Designer, $55-90K" },
    ],
    "Vocational-PG-Media": [
      { name: "PG Diploma Film Production", desc: "End-to-end filmmaking: pre-production through post. Portfolio-focused.", topCountries: ["Canada", "UK", "Australia"], duration: "1-2 years", career: "Producer, $70-130K" },
      { name: "PG Diploma VFX & Compositing", desc: "Nuke, Houdini, matte painting. VFX studio pipeline training.", topCountries: ["Canada", "UK", "Australia"], duration: "1-2 years", career: "VFX Supervisor, $90-150K" },
    ],
  };
  return map[key] || [];
}

export const COUNTRIES_BY_REGION: Record<string, string[]> = {
  "North America": ["Canada", "USA"],
  "Europe — Western": ["UK", "Ireland", "Netherlands", "France", "Germany", "Sweden", "Italy", "Switzerland", "Spain"],
  "Europe — Eastern": ["Poland", "Russia", "Georgia", "Czech Republic"],
  "Asia-Pacific": ["Australia", "New Zealand", "Singapore", "Philippines", "South Korea", "Malaysia"],
  "Middle East": ["UAE"],
};

/* ═══════════════════════════════════════════════════════════════
   DATA SOURCE METADATA — When was this data last verified?
   All scores below are ESTIMATES from publicly available sources.
   Last comprehensive review: 2024-06-05
   ═══════════════════════════════════════════════════════════════ */
export const DATA_META = {
  lastUpdated: "2024-06-05",
  sources: "Numbeo, QS Rankings, World Bank, MEA India, OSAC, Payscale, Official Immigration Portals",
  disclaimer: "All figures are estimates for planning purposes. Verify current fees, visa rules and living costs on official university and government websites before applying.",
};

/* ---- Inline country data (lightweight) ---- */
export const COUNTRIES = ["Canada", "Germany", "UK", "USA", "Australia", "New Zealand", "Ireland", "Netherlands", "France", "Italy", "Sweden", "Poland", "Singapore", "UAE", "Russia", "Georgia", "Philippines", "South Korea", "Malaysia", "Switzerland", "Spain", "Czech Republic"];

/* Country name → destination page ID */
export const COUNTRY_TO_ID: Record<string, string> = {
  Canada: "canada", Germany: "germany", UK: "uk", USA: "usa",
  Australia: "australia", "New Zealand": "newzealand", Ireland: "ireland",
  Netherlands: "netherlands", France: "france", Italy: "italy", Sweden: "sweden",
  Poland: "poland", Singapore: "singapore", UAE: "dubai", Russia: "russia",
  Georgia: "georgia", Philippines: "philippines", "South Korea": "south-korea",
  Malaysia: "malaysia", Switzerland: "switzerland", Spain: "spain",
  "Czech Republic": "czech-republic",
};

/* ═══════════════════════════════════════════════════════════════
   REALISTIC LIVING COSTS for Indian students (₹ Lakhs / year)
   SOURCE: Numbeo cost of living indices + Indian student survey data
   METHOD: Shared apartments (2-4 students), cooking own food,
   public transport, student discounts. Indian students typically
   spend 25-35% less than official visa requirement figures.
   ACCURACY: ±20% — varies significantly by city and lifestyle.
   VERIFY AT: numbeo.com + university international office
   ═══════════════════════════════════════════════════════════════ */
export const LIVING: Record<string, number> = {
  /* Tier 1: Most expensive — but Indian students share heavily */
  Singapore:  12,  // SGD ~20K/yr — HDB sharing, hawker food
  UK:         11,  // £10K/yr outside London — shared house, cooking
  USA:        10,  // $12K/yr college towns — shared apt, no car
  Australia:  11,  // AUD 22K/yr — shared, cooking, student concessions
  Canada:     10,  // CAD 17K/yr — basement/shared, cooking, transit pass
  Ireland:    10,  // €11K/yr outside Dublin — shared house
  UAE:         9,  // AED 40K/yr — Sharjah sharing, no Dubai rent
  
  /* Tier 2: Moderate — Europe student cities */
  Germany:     8,  // €9K/yr — student housing (WG), semester ticket, cooking
  Netherlands:  9,  // €10K/yr — student city (not Amsterdam), cycling
  Sweden:      9,  // SEK 100K/yr — student corridor, cooking
  France:      8,  // €9K/yr — CAF housing benefit, CROUS restaurants
  "New Zealand": 9,  // NZD 18K/yr — shared flat, cooking
  "South Korea": 7,  // ₩11M/yr — goshiwon/shared, cheap student food
  
  /* Tier 3: Affordable */
  Italy:       7,  // €8K/yr — student housing, cheap food
  Malaysia:    4.5, // MYR 22K/yr — very cheap shared, local food
  Poland:      4.5, // PLN 20K/yr — dorm/shared, very cheap
  Russia:      4,   // RUB 450K/yr — university dorm, cheap food
  "Czech Republic": 6, // CZK 130K/yr — Prague is affordable, student housing cheap
  Spain:       7,  // €8.5K/yr — student flats, affordable food, low transport
  
  /* Tier 4: Very affordable */
  Georgia:     3.5, // GEL 40K/yr — shared, very cheap
  Philippines: 3,   // PHP 220K/yr — university housing, very cheap
  
  /* Tier 5: Expensive but worth it */
  Switzerland: 18, // CHF 22K/yr — very expensive but high earning potential
};
/* Tuition: ₹ Lakhs/year — SOURCE: QS cost reports, university fee pages 2023-2024
   Public universities (Germany, France) show semester fees only.
   Private/tuition-paying universities show annual tuition averages.
   VERIFY AT: Each university's official fee page */
export const BASE_TUITION: Record<string, number> = {
  Canada: 30, Germany: 1, UK: 25, USA: 35, Australia: 20, "New Zealand": 18, Ireland: 18, Netherlands: 15,
  France: 10, Italy: 8, Sweden: 12, Poland: 6, Singapore: 20, UAE: 18, Russia: 5, Georgia: 4, Philippines: 3,
  "South Korea": 8, Malaysia: 6, Switzerland: 25, Spain: 8, "Czech Republic": 5
};

/* Part-time earnings: ₹ Lakhs/year — SOURCE: Student visa work hour limits × minimum wage
   Canada: 20hrs/wk × $17/hr × 52 weeks = ~CAD 17K. Germany: 120 full days/year × €12/hr.
   VERIFY AT: Official immigration portal work hour rules */
export const EARN: Record<string, number> = {
  Canada: 43.2, Germany: 45.1, UK: 44.2, USA: 44.2, Australia: 53.8, "New Zealand": 45.1, Ireland: 41.3,
  Netherlands: 36.1, France: 42.2, Italy: 27.8, Sweden: 38.4, Poland: 20.2, Singapore: 19.2, UAE: 9.6, Russia: 11.5, Georgia: 8.6, Philippines: 4.3,
  "South Korea": 22.8, Malaysia: 12.4, Switzerland: 50.0, Spain: 30.0, "Czech Republic": 18.0
};

/* Starting salary: ₹ Lakhs/year — SOURCE: Payscale, Glassdoor, graduate employment surveys
   STEM graduate entry-level, post-tax, first job after degree.
   ACCURACY: ±30% — varies wildly by field, city, and individual.
   VERIFY AT: payscale.com, glassdoor.com, university career reports */
export const SALARY: Record<string, number> = {
  Canada: 45, Germany: 42, UK: 40, USA: 55, Australia: 40, "New Zealand": 30, Ireland: 38, Netherlands: 40,
  France: 32, Italy: 28, Sweden: 35, Poland: 22, Singapore: 45, UAE: 35,
  Russia: 6, Georgia: 5, Philippines: 4,  // Local salaries — MBBS override handles India-return
  "South Korea": 32, Malaysia: 18, Switzerland: 70, Spain: 28, "Czech Republic": 22
};

/* ---- Indian Student Safety Index (0-100) — ESTIMATED ----
   SOURCES: MEA India travel advisories + OSAC crime reports +
   Global Peace Index + student forum discussions (2020-2025).
   This is a COMPOSITE ESTIMATE for Indian students specifically,
   not official government safety statistics.
   VERIFY AT: mea.gov.in/travel-advisory */
export const INDIAN_SAFETY: Record<string, number> = {
  Canada: 88, Germany: 86, Singapore: 92, Australia: 78, "New Zealand": 83,
  UK: 82, Ireland: 84, Netherlands: 85, France: 75, Sweden: 84,
  Italy: 76, Poland: 80, "South Korea": 85, Malaysia: 82, UAE: 80,
  USA: 72, Russia: 68, Georgia: 75, Philippines: 70,
  Switzerland: 90, Spain: 80, "Czech Republic": 85,
};

/* ---- Visa Ease Score (0-10) — ESTIMATED ----
   SOURCES: Official immigration portals + visa rejection rate data +
   student forum reports (2023-2024).
   Combines: application complexity, document requirements,
   processing time, and post-study work visa availability.
   VERIFY AT: Official embassy/immigration portal of each country */
export const VISA_EASE: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, Malaysia: 8,
  Netherlands: 7, "New Zealand": 7, France: 7, Sweden: 7, UK: 7,
  "South Korea": 7, Poland: 6, UAE: 6, Italy: 6, Georgia: 6,
  Singapore: 5, USA: 5, Russia: 5, Philippines: 5,
  Switzerland: 6, Spain: 7, "Czech Republic": 7,
};

/* ---- PR Score (0-10) — ESTIMATED ----
   SOURCES: Official immigration pathway documentation (2024).
   Based on: points required, processing time, job offer necessity,
   language requirements, and Indian student success rates.
   These change frequently with policy updates.
   VERIFY AT: Official government immigration portals */
export const PR_SCORE: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, "New Zealand": 7,
  Netherlands: 7, Sweden: 7, UK: 6, France: 6, Malaysia: 5,
  "South Korea": 5, Poland: 5, Italy: 4, UAE: 1, Singapore: 3,
  USA: 4, Russia: 4, Georgia: 4, Philippines: 1,
  Switzerland: 5, Spain: 5, "Czech Republic": 6,
};

/* ---- Employment Index (0-10) — ESTIMATED ----
   SOURCES: Graduate employment surveys + LinkedIn job market data +
   OECD employment statistics (2023-2024).
   For Indian graduates specifically — English-language job availability,
   employer sponsorship willingness, and field-specific demand.
   VERIFY AT: university career reports, linkedin.com/jobs */
export const EMPLOYMENT: Record<string, number> = {
  Canada: 9, Germany: 8, USA: 8, Singapore: 8, UK: 7,
  Ireland: 7, Netherlands: 7, Australia: 7, Sweden: 7,
  "South Korea": 6, "New Zealand": 6, Malaysia: 6, UAE: 6,
  France: 6, Poland: 5, Italy: 5, Russia: 4, Georgia: 4, Philippines: 4,
  Switzerland: 8, Spain: 5, "Czech Republic": 6,
};

/* ═══════════════════════════════════════════════════════════════
   VISA DESCRIPTIONS, PR PATHWAYS & JOB MARKET — BY COUNTRY
   ═══════════════════════════════════════════════════════════════ */
export const VISA: Record<string, string> = {
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

export const PR_PATH: Record<string, string> = {
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

export const JOB: Record<string, string> = {
  Canada: "High", Germany: "High", UK: "Medium", USA: "High",
  Australia: "Medium", "New Zealand": "Medium", Ireland: "Medium",
  Netherlands: "Medium", France: "Medium", Italy: "Low", Sweden: "Medium",
  Poland: "Low", Singapore: "High", UAE: "Medium", Russia: "Low",
  Georgia: "Low", Philippines: "Low", "South Korea": "Medium",
  Malaysia: "Medium", Switzerland: "High", Spain: "Low", "Czech Republic": "Medium",
};

/* ═══════════════════════════════════════════════════════════════
   WORK EXPERIENCE — VISA POINTS BONUS BY COUNTRY
   Points added to country score based on work experience years.
   Australia, Canada, NZ give the most points for skilled work ex.
   ═══════════════════════════════════════════════════════════════ */
export type WorkExpLevel = "" | "0" | "0-1" | "1-2" | "2-4" | "4-6" | "6+";

export const WORK_EXP_LABEL: Record<WorkExpLevel, string> = {
  "": "— Choose Experience —",
  "0": "Fresher (0 years)",
  "0-1": "< 1 year",
  "1-2": "1-2 years",
  "2-4": "2-4 years",
  "4-6": "4-6 years",
  "6+": "6+ years",
};

/* Visa/PR points bonus per country for work experience (0-10 scale) */
export const WORK_EXP_VISA_BONUS: Record<string, Record<WorkExpLevel, number>> = {
  // ─── High bonus: direct points in PR system ───
  Australia:  { "0": 0, "0-1": 1, "1-2": 3, "2-4": 5, "4-6": 8, "6+": 10 },
  Canada:     { "0": 0, "0-1": 2, "1-2": 4, "2-4": 6, "4-6": 8, "6+": 10 },
  "New Zealand": { "0": 0, "0-1": 1, "1-2": 3, "2-4": 5, "4-6": 7, "6+": 9 },
  // ─── Medium bonus: helps visa but not direct points ───
  Germany:    { "0": 0, "0-1": 1, "1-2": 2, "2-4": 4, "4-6": 6, "6+": 8 },
  UK:         { "0": 0, "0-1": 0, "1-2": 1, "2-4": 3, "4-6": 5, "6+": 7 },
  Ireland:    { "0": 0, "0-1": 0, "1-2": 1, "2-4": 3, "4-6": 5, "6+": 7 },
  Netherlands:{ "0": 0, "0-1": 0, "1-2": 1, "2-4": 3, "4-6": 5, "6+": 7 },
  Sweden:     { "0": 0, "0-1": 0, "1-2": 1, "2-4": 3, "4-6": 5, "6+": 7 },
  France:     { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 4, "6+": 6 },
  Singapore:  { "0": 0, "0-1": 1, "1-2": 2, "2-4": 4, "4-6": 6, "6+": 8 },
  // ─── Low bonus: minimal impact ───
  USA:        { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 5 },
  UAE:        { "0": 0, "0-1": 1, "1-2": 2, "2-4": 3, "4-6": 4, "6+": 5 },
  // ─── Default for others ───
  Italy:      { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 4 },
  Poland:     { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 4 },
  Malaysia:   { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 4 },
  "South Korea": { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 4 },
  Russia:     { "0": 0, "0-1": 0, "1-2": 0, "2-4": 1, "4-6": 2, "6+": 3 },
  Georgia:    { "0": 0, "0-1": 0, "1-2": 0, "2-4": 1, "4-6": 2, "6+": 3 },
  Philippines:{ "0": 0, "0-1": 0, "1-2": 0, "2-4": 1, "4-6": 2, "6+": 3 },
  Switzerland:{ "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 4, "6+": 6 },
  Spain:      { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 5 },
  "Czech Republic": { "0": 0, "0-1": 0, "1-2": 1, "2-4": 2, "4-6": 3, "6+": 4 },
};

/* ═══════════════════════════════════════════════════════════════
   PG WORK EXPERIENCE REQUIREMENTS
   Which PG courses strongly prefer or require work experience.
   Used to warn/advise users when selecting certain combinations.
   ═══════════════════════════════════════════════════════════════ */
interface WorkExReq {
  required: boolean;      // true = must have, false = preferred
  minYears: number;       // minimum years needed
  idealYears: number;     // ideal years for competitive admission
  note: string;           // display note for user
}

export const PG_WORK_EX_REQ: Record<string, WorkExReq> = {
  "PG-Mgmt":  { required: false, minYears: 2, idealYears: 4, note: "MBA programs strongly prefer 2-5 years of work experience. Top B-schools need 4+ years." },
  "PG-MBBS": { required: false, minYears: 0, idealYears: 1, note: "MBBS-level programs accept fresh graduates. Clinical exposure during MBBS counts as experience." },
  "PG-MD_MS": { required: true, minYears: 1, idealYears: 2, note: "MD/MS requires MBBS completion + 1-2 years internship/residency. Mandatory for surgical specializations." },
  "PG-MDS": { required: true, minYears: 1, idealYears: 2, note: "MDS requires BDS + 1 year internship. Clinical dental practice strengthens application." },
  "PG-Nursing": { required: false, minYears: 0, idealYears: 2, note: "Advanced nursing programs prefer 1-2 years clinical experience. Fresh BSc Nursing grads also accepted." },
  "PG-Pharmacy": { required: false, minYears: 0, idealYears: 1, note: "PharmD/MPharm programs accept freshers. Industrial pharmacy experience preferred for some specializations." },
  "PG-Biotech": { required: false, minYears: 0, idealYears: 1, note: "Research experience (lab work, publications) valued more than industry work. Fresh graduates accepted." },
  "PG-CS_IT":  { required: false, minYears: 0, idealYears: 1, note: "Not required for CS MS. 1-2 years of coding exp (internship, job, projects) strengthens top-tier apps." },
  "PG-DataScience":  { required: false, minYears: 0, idealYears: 1, note: "Not required. Data analysis internship or Kaggle projects help significantly for top programs." },
  "PG-Engineering":  { required: false, minYears: 0, idealYears: 2, note: "2+ years of industrial experience highly valued for MEng programs. Germany options accept freshers." },
  "PG-Accts": { required: false, minYears: 0, idealYears: 1, note: "MFin/Accounting programs accept freshers. CPA-track candidates benefit from audit experience." },
  "PG-Arts":  { required: false, minYears: 0, idealYears: 0, note: "Arts PG programs generally do not require work experience. Portfolio matters more." },
  "PG-Fashion":  { required: false, minYears: 0, idealYears: 1, note: "Fashion PG programs prefer 1-2 years design/retail experience. Portfolio is critical." },
  "PG-Hotel":    { required: false, minYears: 0, idealYears: 1, note: "Hotel management PG values 1+ years hospitality experience. Internships count." },
  "PG-Journalism": { required: false, minYears: 0, idealYears: 0, note: "Journalism PG programs value published work over formal experience. Clips/portfolio essential." },
  "PG-Media":    { required: false, minYears: 0, idealYears: 1, note: "Media/Film PG prefers creative experience. Demo reel weighs more than years of work." },
};

export function getWorkExReq(level: Level, major: Major): WorkExReq | null {
  if (level !== "PG" || !major) return null;
  return PG_WORK_EX_REQ[`${level}-${major}`] || null;
}

export const STREAM_MULT: Record<Major, number> = { CS_IT: 1.1, DataScience: 1.15, Engineering: 1.0, MBBS: 2.0, MD_MS: 1.8, MDS: 1.6, Nursing: 1.3, Pharmacy: 1.4, Biotech: 1.2, Mgmt: 1.2, Accts: 0.9, Arts: 0.8, Fashion: 0.85, Hotel: 0.75, Journalism: 0.8, Media: 0.85 };
export const DURATION: Record<string, number> = { UG: 4, PG: 2 };

/* ═══════════════════════════════════════════════════════════════
   VOCATIONAL COURSE COSTS — separate, much lower than academic
   Diplomas & certificates cost 30-60% of degree programs.
   Duration: UG Vocational = 2 yrs, PG Vocational = 1 yr
   ═══════════════════════════════════════════════════════════════ */
export const VOCATIONAL_BASE_TUITION: Record<string, number> = {
  Canada: 12, Germany: 0.5, UK: 10, USA: 14, Australia: 10, "New Zealand": 8,
  Ireland: 8, Netherlands: 6, France: 4, Italy: 3, Sweden: 5, Poland: 2.5,
  Singapore: 8, UAE: 6, Russia: 2, Georgia: 2, Philippines: 1.5,
  "South Korea": 4, Malaysia: 2.5, Switzerland: 12, Spain: 3, "Czech Republic": 2.5,
};
export const VOCATIONAL_DURATION: Record<string, number> = { UG: 2, PG: 1 };
/* Vocational students earn less part-time (fewer legal hours) but 
   gain co-op income — net earnings roughly 60% of academic */
export const VOCATIONAL_EARN_MULT = 0.6;
export const FIT_BASE: Record<string, number> = {
  Canada: 9, Germany: 9, UK: 8, USA: 9, Australia: 8, "New Zealand": 7, Ireland: 8, Netherlands: 8,
  France: 7, Italy: 6, Sweden: 8, Poland: 6, Singapore: 8, UAE: 6, Russia: 5, Georgia: 5, Philippines: 5,
  "South Korea": 7, Malaysia: 7, Switzerland: 8, Spain: 7, "Czech Republic": 6
};

/* ---- Visa Proof of Funds: how much must show in bank account ---- */
interface FundsReq {
  amount: string;        // Short line for card header
  period: string;        // Sub-line (e.g. "GIC locked 12 months")
  explain: string;       // Full expanded explanation
  noMoney: string;       // "What happens if I do not have this money?"
}
export const FUNDS_REQ: Record<string, FundsReq> = {
  Canada:     { amount: "CAD 20,635 (GIC) + 1st year tuition", period: "GIC locked for 12 months", explain: "The Canadian government wants to see that you have enough money to support yourself. You must buy a Guaranteed Investment Certificate (GIC) from a Canadian bank for 20,635 Canadian Dollars. This money is locked for one year and paid back to you in monthly installments while you study. Additionally, you must show proof that you can pay the first year of tuition. If you do not want to buy a GIC, you can show 6 months of bank statements instead, but this takes longer for visa approval.", noMoney: "Your visa application will be refused. You can use an education loan — the loan approval letter from your bank is accepted by Canada as proof of funds. Your parents or relatives can also sponsor you — you just need a letter from them and their bank statements." },
  UK:         { amount: "£1,483/mo (London) / £1,136/mo (outside)", period: "28 consecutive days in bank", explain: "You must show 9 months of living costs plus your unpaid tuition fees in your bank account. The money must stay in the account for 28 full days before you apply for the visa — no gaps allowed. The exact amount depends on whether your university is in London (higher) or outside London (lower). The bank statement must be in your name or your parent's name with a sponsorship letter.", noMoney: "Your visa will be refused. UKVI checks bank statements strictly. An education loan approval letter from a recognised Indian bank (SBI, HDFC Credila, Axis, etc.) is accepted. Parental sponsorship with 28 days of their bank statements also works." },
  USA:        { amount: "Full 1st year cost (I-20 amount)", period: "Current balance accepted", explain: "The exact amount is printed on your university's I-20 letter. It covers one full year of tuition plus living expenses — typically $35,000–70,000 depending on the university. You can show a bank letter, an education loan approval letter, or a family sponsor letter. There is no minimum duration the money must be in your account — a current balance is accepted.", noMoney: "Your F-1 visa will be refused at the embassy interview. Education loan sanction letter is widely accepted — you do not need the cash in your account. Family sponsors need an affidavit of support (Form I-134) plus their bank proof." },
  Germany:    { amount: "€11,904 (Blocked Account)", period: "11 months at €992/month", explain: "You must open a blocked account (Sperrkonto) with providers like Fintiba or Expatrio before your visa appointment. Deposit 11,904 Euros into this account. The money is released to you monthly at 992 Euros per month for 11 months to cover your living costs. You cannot access the full amount upfront — it is designed to ensure you have steady income while studying.", noMoney: "Your visa will be refused — the blocked account is mandatory. You can take an education loan and deposit the loan amount into the blocked account. Some German banks also offer blocked account opening from India. Your parents can transfer the money as a gift — no tax issues in Germany." },
  Australia:  { amount: "AUD 29,710 + tuition + travel", period: "3+ months bank history", explain: "From May 2024, you must show AUD 29,710 for living costs (up from AUD 24,505) plus your first year tuition and AUD 2,000 for travel. Show 3 months of bank statements. An education loan approval letter is widely accepted and often preferred by the Department of Home Affairs.", noMoney: "Your Subclass 500 visa will be refused. Education loan approval letter is fully accepted — you do not need liquid cash. Parental sponsorship with their bank statements and an affidavit is also valid. Some students use a combination: part loan + part family funds." },
  "New Zealand":{ amount: "NZD 20,000 + tuition + NZD 2,000 travel", period: "3 months bank history", explain: "Show NZD 20,000 for living costs plus your first year tuition and NZD 2,000 for travel. Alternatively, use the Funds Transfer Scheme — deposit the money directly with an approved New Zealand education provider. This is simpler than bank statements and speeds up visa processing.", noMoney: "Your student visa will be refused. The Funds Transfer Scheme lets you deposit money directly with a NZ provider — this is the easiest path. Education loan approval letters are accepted. Family sponsorship with bank statements works too." },
  Ireland:    { amount: "€10,000 + 1st year tuition", period: "6 months bank history", explain: "Show €10,000 for living expenses plus proof you can pay the first year of tuition. The funds can be in your own account, your parent's account, or from a sponsor. You need 6 months of bank history. An education loan approval letter is also accepted by the Irish Naturalisation and Immigration Service.", noMoney: "Your visa will be refused. Education loan approval letter is accepted — no need for cash in account. Parental sponsorship with 6 months of their bank statements plus a sponsorship letter works. Some students combine both sources." },
  Netherlands:{ amount: "€12,240 total (€1,020/month)", period: "Bank guarantee or blocked account", explain: "Transfer €12,240 to a Dutch blocked account after arrival in the Netherlands, or show a bank guarantee from your home country bank. The Immigration and Naturalisation Service (IND) requires this as proof you can support yourself. Some universities arrange the blocked account for you.", noMoney: "Your entry visa will be refused. A bank guarantee from an Indian bank (ICICI, HDFC, SBI) is accepted — you do not need to transfer cash. Education loan letter also works. Your university can guide you through the blocked account process after admission." },
  France:     { amount: "€7,380 total (€615/month)", period: "No fixed duration", explain: "Show €7,380 to cover one year of living expenses at €615 per month. You can show your parent's bank account with an affidavit letter confirming they will support you. Campus France will verify your financial documents during the pre-visa interview (ETUDES EN FRANCE process) before you apply for the visa.", noMoney: "Your visa will likely be refused — Campus France checks finances carefully. Parental account with an affidavit is accepted — no need for the money to be in your name. Education loan letter works. The amount is low compared to other European countries, making France accessible." },
  Sweden:     { amount: "SEK 105,840 total (SEK 10,584/month)", period: "Must be in student's own account", explain: "Show SEK 105,840 to cover 10 months of living costs. The money must be in your own bank account — parent or sponsor accounts are NOT accepted. A scholarship letter from the Swedish Institute or your university can substitute for the full or partial amount. Apply for the residence permit online through the Swedish Migration Agency.", noMoney: "Your residence permit will be refused — this is strict. The money MUST be in your own account. Transfer funds from parents to your account at least 1-2 months before applying. Scholarship recipients are exempt — apply for SI scholarships early. Education loan deposited into your account also works." },
  Italy:      { amount: "€5,376 total (€448/month)", period: "No fixed duration", explain: "Show €5,376 for one year of living expenses — the lowest requirement in Europe. Family account with proof of relationship (birth certificate translated to Italian) is accepted. No blocked account needed. The embassy may ask for a 'Dichiarazione di Valore' confirming your financial documents.", noMoney: "Your visa will be refused. The amount is very low — €5,376 is among the easiest in Europe. Parental bank account with a birth certificate proving relationship is accepted. Education loan letter works. Some regions require the 'Dichiarazione di Valore' — apply for this early." },
  Singapore:  { amount: "Tuition + SGD 1,500/month living", period: "Current balance accepted", explain: "The exact amount is stated on your university's In-Principle Approval (IPA) letter. It covers tuition plus SGD 1,500 per month for living costs. Show a bank statement or education loan approval letter. There is no minimum duration the money must be in your account.", noMoney: "Your Student's Pass application will be rejected. Education loan letter is fully accepted. Parental sponsorship with bank statements and a letter works. Singapore requires the IPA first, then you apply for the Student's Pass — financial proof is checked at both stages." },
  UAE:        { amount: "AED 15,000-30,000", period: "3 months bank history", explain: "Show AED 15,000 to 30,000 depending on the emirate and university. Dubai is more flexible than Abu Dhabi. No blocked account system exists. A scholarship letter or education loan approval is accepted. The student residence visa is sponsored by the university, not the government.", noMoney: "Your student residence visa may be refused. The requirement varies by emirate — Dubai is more flexible. Education loan letter is accepted. Parental sponsorship with bank statements works. Some universities include the funds requirement in their total fee estimate." },
  Poland:     { amount: "€6,000 total (€600/month)", period: "No fixed duration", explain: "Show €6,000 for one year of living costs. Family funds are accepted without complex documentation. Some universities offer delayed tuition payment plans. No blocked account is needed. The Polish National Agency for Academic Exchange (NAWA) also offers scholarships.", noMoney: "Your visa will be refused. The amount is low — €6,000 is manageable for most families. Parental bank account with a simple letter is accepted. Education loan approval letter works. Some Polish universities allow tuition fee payment in installments." },
  Malaysia:   { amount: "MYR 15,000 + tuition", period: "3 months bank history", explain: "Show MYR 15,000 for living costs plus proof you can pay tuition. EMGS (Education Malaysia Global Services) processes your visa. Education loans and family sponsorship are straightforward. Bank statements for 3 months are standard. Malaysia is among the most accessible destinations financially.", noMoney: "Your visa will be refused. Education loan letter is accepted by EMGS. Parental sponsorship with bank statements works. Malaysia has low living costs and some of the most affordable tuition fees for Indian students. Many universities offer installment payment plans." },
  "South Korea":{ amount: "USD 20,000 equivalent", period: "3+ months bank history", explain: "Show USD 20,000 or equivalent in your bank account for 3+ months. If you have a scholarship (GKS, university scholarship, etc.), you are exempt — the scholarship letter alone is sufficient. The Korean embassy checks bank statements strictly.", noMoney: "Your D-2 visa will be refused. Apply for the Global Korea Scholarship (GKS) — it covers tuition, living costs, and airfare. University-specific scholarships also exempt you from funds proof. Education loan letter is accepted. Parental sponsorship with bank statements works." },
  Russia:     { amount: "USD 3,000-5,000 + tuition", period: "Current balance accepted", explain: "Show USD 3,000 to 5,000 plus tuition fees — one of the lowest requirements globally. An invitation letter from your university simplifies the visa process. No blocked account needed. Medical students should verify their university is listed in the WHO/WDMS directory.", noMoney: "Your visa will be refused. The amount is very low — among the most accessible. Education loan letter is accepted. Parental bank statement with a sponsorship letter works. Some Russian universities include living costs in their total fee package." },
  Georgia:    { amount: "USD 5,000-7,000 + tuition", period: "Current balance accepted", explain: "Show USD 5,000 to 7,000 plus tuition fees. A simple bank statement is sufficient — no blocked account. Medical students must verify the university is NMC-recognised (National Medical Commission of India). The Georgian visa process is straightforward through the e-Visa portal.", noMoney: "Your e-Visa will be refused. The amount is low and manageable. Education loan letter is accepted. Parental sponsorship with bank statements works. Verify NMC recognition before applying — some Georgian medical colleges are not recognised in India." },
  Philippines:{ amount: "USD 3,000-5,000", period: "Current balance accepted", explain: "Show USD 3,000 to 5,000 — very accessible for most Indian families. Some schools include this in their total cost estimate. Medical students must verify the university is listed in the WHO World Directory of Medical Schools (WDMS). No blocked account needed.", noMoney: "Your student visa will be refused. The amount is among the lowest globally. Education loan letter is accepted. Parental sponsorship works. Verify WDMS listing for medical colleges — some Philippine medical schools have had NMC recognition issues." },
  Switzerland: { amount: "CHF 21,000 (blocked account)", period: "12 months at CHF 1,750/mo", explain: "Swiss immigration requires a blocked account with CHF 21,000 — released monthly at CHF 1,750 for living costs. This is in addition to high tuition. The D visa is processed through the Swiss embassy. Open the account via Swiss banks or providers like Fintiba after admission.", noMoney: "Your visa will be refused — the blocked account is mandatory. Education loan is accepted — you can deposit the loan into the blocked account. Scholarships from Swiss universities are limited but do exist. Parental sponsorship with bank statements works." },
  Spain:      { amount: "€600/month (€7,200/yr)", period: "No fixed duration", explain: "Show €600 per month for living costs — €7,200 per year. A simple bank statement or education loan letter is accepted. No blocked account. The Spanish student visa (Tipo D) is processed through BLS International. Low financial barrier makes Spain very accessible.", noMoney: "Your visa will likely be refused. The amount is low — among the easiest in Europe. Education loan letter is accepted. Parental bank account with sponsorship letter works. Some regions offer subsidised student housing (residencias)." },
  "Czech Republic": { amount: "CZK 124,500/yr (blocked account)", period: "Bank guarantee or blocked account", explain: "Show CZK 124,500 per year (~€5,000) for living costs. You can use a bank guarantee, blocked account, or show the funds in your bank account. The long-term visa (D) is processed through the Czech embassy. Prague requires slightly more than other Czech cities.", noMoney: "Your visa will be refused. The amount is very low — among Europe's most affordable. Education loan letter is accepted. Parental sponsorship works. Some universities help arrange the blocked account." },
};

/* ---- Countries where Indian students face language / cultural barriers ---- */
export const CULTURAL_BARRIER: Record<string, { level: string; text: string }> = {
  Germany:      { level: "high", text: "German B2/C1 needed for 90%+ jobs. 6-12 months to learn. Blocked account €11,904 upfront. Cultural integration harder than English-speaking countries." },
  France:       { level: "high", text: "French B2 essential for most jobs. Very few English workplaces outside tech. Bureaucracy entirely in French. Indian community small outside Paris." },
  Italy:        { level: "high", text: "Italian required for 95%+ of jobs. English rarely used. Weak non-EU graduate job market. Bureaucracy slow and Italian-only." },
  Russia:       { level: "high", text: "Russian required for daily life and jobs. Significant cultural differences. Limited Indian community. Cold climate. Currency volatility." },
  "South Korea":{ level: "high", text: "Korean TOPIK 4+ needed for most jobs. Very few English roles. Competitive job market favours locals. Significant cultural adjustment." },
  Poland:       { level: "moderate", text: "Polish preferred for many jobs though English growing in IT. Indian community small but growing. Bureaucracy can be challenging." },
  Sweden:       { level: "moderate", text: "Swedish preferred for 70%+ of jobs despite high English fluency. Housing shortage in cities. Dark winters can affect mental health." },
  Netherlands:  { level: "moderate", text: "English widely spoken but Dutch preferred for many roles. Severe housing crisis. High cost of living." },
  UAE:          { level: "moderate", text: "No permanent residency pathway. Work visa tied to employer. Hot climate. High cost of living in Dubai and Abu Dhabi." },
  Georgia:      { level: "moderate", text: "Georgian or Russian widely used. English limited outside Tbilisi. Very small Indian community. Limited post-study work options." },
  Switzerland:  { level: "moderate", text: "German/French/Italian by region. English widely spoken in universities but daily life needs local language. Very high cost of living." },
  Spain:        { level: "moderate", text: "Spanish B1/B2 needed for most jobs outside tech. English rarely used in workplaces. Bureaucracy can be slow. Growing Indian community in Barcelona & Madrid." },
  "Czech Republic": { level: "moderate", text: "Czech preferred for jobs though English growing in IT. Small but growing Indian community. Affordable living makes it accessible." },
};

/* ═══════════════════════════════════════════════════════════════════════════
   LIFETIME VALUE — Long-term PR & settlement benefits by country
   Factors in 10-year earnings growth, healthcare, education, PR pathway value.
   This is what basic ROI misses: a ₹50L investment in USA can return ₹3Cr+
   over a decade when you factor salary growth + benefits for family.
   ═══════════════════════════════════════════════════════════════════════════ */
interface LifetimeValue {
  salaryGrowth10Yr: number;       // Multiplier: 1yr salary × this = 10yr total
  healthcareAnnual: number;       // ₹ Lakhs saved per year (public healthcare)
  educationPerChild: number;      // ₹ Lakhs saved per child (K-12 + university)
  prToCitizenshipYrs: number;     // Years from study start to citizenship
  socialSafetyNet: number;        // 0-10 score (unemployment, pension, benefits)
  longTermMultiplier: number;     // Overall multiplier applied to base salary
}

export const LIFETIME_VALUE: Record<string, LifetimeValue> = {
  // ─── Tier 1: Best long-term value ───
  Canada: {
    salaryGrowth10Yr: 2.8,      // ₹45L → ₹126L over 10 years
    healthcareAnnual: 4.0,       // Universal healthcare saves ~₹4L/yr
    educationPerChild: 35.0,     // Free K-12 + subsidized university
    prToCitizenshipYrs: 5,       // Study(2) → PGWP(1) → PR(1) → Citz(1)
    socialSafetyNet: 9,          // EI, CPP, OAS, strong safety net
    longTermMultiplier: 1.35,
  },
  Australia: {
    salaryGrowth10Yr: 2.6,      // ₹40L → ₹104L over 10 years
    healthcareAnnual: 3.5,       // Medicare saves ~₹3.5L/yr
    educationPerChild: 30.0,     // Free public schools + HECS university
    prToCitizenshipYrs: 6,       // Study(2) → 485(2) → PR(1) → Citz(1)
    socialSafetyNet: 8,          // Centrelink, superannuation
    longTermMultiplier: 1.30,
  },
  Germany: {
    salaryGrowth10Yr: 2.4,      // ₹42L → ₹100L over 10 years
    healthcareAnnual: 4.5,       // Public insurance ~₹4.5L value/yr
    educationPerChild: 25.0,     // Free university (no tuition!)
    prToCitizenshipYrs: 8,       // Study(2) → Work(2) → PR(2) → Citz(2)
    socialSafetyNet: 9,          // Unemployment benefits, pension, childcare
    longTermMultiplier: 1.25,
  },
  // ─── Tier 2: Strong but slower PR ───
  USA: {
    salaryGrowth10Yr: 3.5,      // ₹55L → ₹192L over 10 years (highest growth)
    healthcareAnnual: 1.5,       // Employer insurance, not universal
    educationPerChild: 50.0,     // Free K-12 + in-state tuition saves huge
    prToCitizenshipYrs: 12,      // Long path: H1B(3) → GC(5) → Citz(4)
    socialSafetyNet: 4,          // Minimal (Social Security, Medicare at 65)
    longTermMultiplier: 1.50,    // Highest earning potential
  },
  UK: {
    salaryGrowth10Yr: 2.5,      // ₹40L → ₹100L over 10 years
    healthcareAnnual: 5.0,       // NHS free at point of use
    educationPerChild: 28.0,     // Free state schools + lower uni fees
    prToCitizenshipYrs: 6,       // Study(1) → PSW(2) → ILR(2) → Citz(1)
    socialSafetyNet: 7,          // NHS, state pension, JSA
    longTermMultiplier: 1.28,
  },
  Ireland: {
    salaryGrowth10Yr: 2.4,      // ₹38L → ₹91L over 10 years
    healthcareAnnual: 3.0,       // Public healthcare system
    educationPerChild: 22.0,     // Free primary/secondary
    prToCitizenshipYrs: 5,       // Stamp 1G(2) → Stamp 4(1) → Citz(2)
    socialSafetyNet: 7,
    longTermMultiplier: 1.20,
  },
  "New Zealand": {
    salaryGrowth10Yr: 2.2,      // ₹30L → ₹66L over 10 years
    healthcareAnnual: 3.0,       // Public health system
    educationPerChild: 25.0,     // Free state education
    prToCitizenshipYrs: 6,
    socialSafetyNet: 8,
    longTermMultiplier: 1.18,
  },
  Netherlands: {
    salaryGrowth10Yr: 2.3,      // ₹40L → ₹92L over 10 years
    healthcareAnnual: 3.5,       // Mandatory but subsidized
    educationPerChild: 20.0,
    prToCitizenshipYrs: 7,
    socialSafetyNet: 8,
    longTermMultiplier: 1.15,
  },
  Sweden: {
    salaryGrowth10Yr: 2.2,      // ₹35L → ₹77L over 10 years
    healthcareAnnual: 4.0,       // Universal healthcare
    educationPerChild: 30.0,     // Free education + childcare subsidies
    prToCitizenshipYrs: 7,
    socialSafetyNet: 9,
    longTermMultiplier: 1.15,
  },
  // ─── Tier 3: Moderate long-term value ───
  France: {
    salaryGrowth10Yr: 2.0,      // ₹32L → ₹64L over 10 years
    healthcareAnnual: 4.0,       // Excellent public healthcare
    educationPerChild: 18.0,     // Free public education
    prToCitizenshipYrs: 8,
    socialSafetyNet: 8,
    longTermMultiplier: 1.10,
  },
  Singapore: {
    salaryGrowth10Yr: 2.5,      // ₹45L → ₹112L over 10 years
    healthcareAnnual: 1.0,       // Medisave system, not fully covered
    educationPerChild: 15.0,
    prToCitizenshipYrs: 8,       // Very difficult PR → citizenship
    socialSafetyNet: 5,
    longTermMultiplier: 1.15,
  },
  UAE: {
    salaryGrowth10Yr: 1.8,      // ₹35L → ₹63L (tax-free but limited growth)
    healthcareAnnual: 0,         // Employer-provided, no permanent settlement
    educationPerChild: 20.0,     // International schools expensive
    prToCitizenshipYrs: 99,      // No pathway to citizenship
    socialSafetyNet: 2,
    longTermMultiplier: 0.85,    // No PR, temporary by design
  },
  // ─── Tier 4: Limited long-term value ───
  Italy: { salaryGrowth10Yr: 1.7, healthcareAnnual: 3.0, educationPerChild: 12.0, prToCitizenshipYrs: 10, socialSafetyNet: 6, longTermMultiplier: 0.90 },
  Poland: { salaryGrowth10Yr: 1.8, healthcareAnnual: 2.0, educationPerChild: 8.0, prToCitizenshipYrs: 8, socialSafetyNet: 5, longTermMultiplier: 0.85 },
  Malaysia: { salaryGrowth10Yr: 1.6, healthcareAnnual: 1.0, educationPerChild: 8.0, prToCitizenshipYrs: 10, socialSafetyNet: 4, longTermMultiplier: 0.75 },
  "South Korea": { salaryGrowth10Yr: 1.8, healthcareAnnual: 2.0, educationPerChild: 10.0, prToCitizenshipYrs: 10, socialSafetyNet: 6, longTermMultiplier: 0.85 },
  Russia: { salaryGrowth10Yr: 1.5, healthcareAnnual: 1.0, educationPerChild: 5.0, prToCitizenshipYrs: 8, socialSafetyNet: 4, longTermMultiplier: 0.70 },
  Georgia: { salaryGrowth10Yr: 1.5, healthcareAnnual: 0.5, educationPerChild: 3.0, prToCitizenshipYrs: 10, socialSafetyNet: 3, longTermMultiplier: 0.65 },
  Philippines: { salaryGrowth10Yr: 1.4, healthcareAnnual: 0, educationPerChild: 2.0, prToCitizenshipYrs: 99, socialSafetyNet: 2, longTermMultiplier: 0.55 },
  Switzerland: { salaryGrowth10Yr: 2.8, healthcareAnnual: 5.0, educationPerChild: 40.0, prToCitizenshipYrs: 10, socialSafetyNet: 9, longTermMultiplier: 1.45 },
  Spain:       { salaryGrowth10Yr: 1.9, healthcareAnnual: 3.5, educationPerChild: 14.0, prToCitizenshipYrs: 8, socialSafetyNet: 7, longTermMultiplier: 0.95 },
  "Czech Republic": { salaryGrowth10Yr: 1.8, healthcareAnnual: 2.5, educationPerChild: 10.0, prToCitizenshipYrs: 8, socialSafetyNet: 7, longTermMultiplier: 0.88 },
};

/* ═══════════════════════════════════════════════════════════════════════════
   SALARY RANGES BY COUNTRY (₹ Lakhs) — Entry / Mid / Senior
   Entry = fresh grad, Mid = 3-5 yrs, Senior = 8+ yrs
   ═══════════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════════
   SALARY RANGES BY COUNTRY (₹ Lakhs) — Entry / Mid / Senior
   Research-backed from official in-country sources.
   Entry = fresh grad, Mid = 3-5 yrs, Senior = 8+ yrs
   ═══════════════════════════════════════════════════════════════════════════ */
export const SALARY_RANGE: Record<string, { entry: number; mid: number; senior: number }> = {
  // Tier 1: English-speaking Western
  USA:           { entry: 85, mid: 109, senior: 150 }, // NACE Summer 2025
  UK:            { entry: 30, mid: 40,  senior: 58  }, // HESA 2024
  Canada:        { entry: 43, mid: 58,  senior: 79  }, // UofT PEY 2024-25
  Australia:     { entry: 42, mid: 53,  senior: 73  }, // QILT 2024
  "New Zealand": { entry: 36, mid: 46,  senior: 62  }, // ~15% below AU
  Ireland:       { entry: 41, mid: 56,  senior: 77  }, // HEA 2024
  // Tier 2: Western Europe
  Germany:       { entry: 46, mid: 64,  senior: 86  }, // Expatrio/VDI
  Switzerland:   { entry: 73, mid: 100, senior: 137 }, // ~60% above DE
  Netherlands:   { entry: 44, mid: 59,  senior: 82  }, // ~10% below DE
  Sweden:        { entry: 41, mid: 56,  senior: 77  }, // ~5% below DE
  France:        { entry: 38, mid: 53,  senior: 73  }, // ~8% below DE
  Italy:         { entry: 27, mid: 38,  senior: 53  }, // ~30% below DE
  Spain:         { entry: 25, mid: 36,  senior: 50  }, // ~35% below DE
  Poland:        { entry: 18, mid: 27,  senior: 38  }, // ~55% below DE
  "Czech Republic":{ entry: 20, mid: 29,  senior: 41  }, // ~50% below DE
  // Tier 3: Asia
  Singapore:     { entry: 32, mid: 49,  senior: 72  }, // JobStreet 2024
  "South Korea": { entry: 36, mid: 53,  senior: 77  }, // Glassdoor 2024
  UAE:           { entry: 27, mid: 42,  senior: 64  }, // ~80% SG, tax-free
  Malaysia:      { entry: 19, mid: 29,  senior: 42  }, // ~40% of SG
  // Tier 4: MBBS Hubs (local salaries — MBBS override handles India-return)
  Russia:        { entry: 8,  mid: 15,  senior: 28  }, // Eklavya Overseas
  Georgia:       { entry: 7,  mid: 13,  senior: 24  }, // ~15% below RU
  Philippines:   { entry: 7,  mid: 13,  senior: 24  }, // ~10% below RU
};

/* ═══════════════════════════════════════════════════════════════════════════
   CURRENCY CONVERSION RATES (₹ per unit of foreign currency)
   Used for converting foreign tuition/living costs to INR
   ═══════════════════════════════════════════════════════════════════════════ */
export const CURRENCY_RATES: Record<string, number> = {
  USD: 83.5,    // US Dollar
  CAD: 61.2,    // Canadian Dollar
  EUR: 90.5,    // Euro
  GBP: 106.2,   // British Pound
  AUD: 55.8,    // Australian Dollar
  NZD: 51.3,    // New Zealand Dollar
  SGD: 62.1,    // Singapore Dollar
  CHF: 94.8,    // Swiss Franc
  AED: 22.7,    // UAE Dirham
  KRW: 0.063,   // South Korean Won
  RUB: 0.92,    // Russian Ruble
  PHP: 1.48,    // Philippine Peso
  MYR: 17.8,    // Malaysian Ringgit
  PLN: 21.2,    // Polish Zloty
  CZK: 3.65,    // Czech Koruna
  GEL: 31.2,    // Georgian Lari
};
