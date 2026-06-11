import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getConsultantsForCountry, type Consultant } from "@/data/consultants";

import { Badge } from "@/components/ui/badge";
import {
  Calculator, TrendingUp, DollarSign, MapPin, Star,
  BookOpen, Briefcase, Clock, Home, Wallet, Target,
  Sparkles, Lightbulb, Users, User, Lock, ArrowRight, CheckCircle2, Crown,
  Table2, ShoppingCart, Play, MousePointer, FileText,
  BarChart3, Award, Zap, Shield, MessageCircle, X, Mail, Phone, BadgeCheck, AlertTriangle,
  Stethoscope, Brain, FlaskConical, Palette, Calculator as CalculatorIcon,
} from "lucide-react";

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
type Major = "" | "STEM" | "Medicine" | "Mgmt" | "Accts" | "Arts";
type Track = "Govt" | "Private";
type PRPriority = "High" | "Med" | "Low";
type RegionFilter = "Any" | string;

const MAJOR_LABEL: Record<string, string> = {
  STEM: "STEM", Medicine: "Medicine", Mgmt: "Management",
  Accts: "Accounts", Arts: "Arts & Humanities", "": "—",
};

/* ═══════════════════════════════════════════════════════════════
   DYNAMIC EXAM FIELD CONFIGURATION
   Changes the last form field based on Level + Major selection
   ═══════════════════════════════════════════════════════════════ */
interface ExamConfig {
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step: number;
  icon: React.ElementType;
  helperText: string;
  unit: string;
}

const EXAM_CONFIG: Record<string, ExamConfig> = {
  // ─── UG combinations ───
  "UG-STEM":       { label: "SAT / JEE Score",      placeholder: "e.g. 1350",   min: 400,  max: 1600, step: 10,  icon: Calculator,       helperText: "SAT (400-1600) or JEE rank for India-adjacent planning", unit: "points" },
  "UG-Medicine":   { label: "NEET Score",           placeholder: "e.g. 550",    min: 0,    max: 720,  step: 1,   icon: Stethoscope,      helperText: "NEET out of 720. 137+ qualifies. 550+ for govt colleges.", unit: "/720" },
  "UG-Mgmt":       { label: "CAT Percentile / SAT", placeholder: "e.g. 85",     min: 0,    max: 100,  step: 0.1, icon: Brain,            helperText: "CAT percentile (0-100) or SAT score (400-1600)", unit: "percentile" },
  "UG-Accts":      { label: "12th Board %",         placeholder: "e.g. 88",     min: 0,    max: 100,  step: 0.1, icon: CalculatorIcon,   helperText: "Your 12th standard percentage. 85%+ preferred for top colleges.", unit: "%" },
  "UG-Arts":       { label: "12th Board %",         placeholder: "e.g. 82",     min: 0,    max: 100,  step: 0.1, icon: Palette,          helperText: "Your 12th standard percentage + portfolio for design programs", unit: "%" },
  // ─── PG combinations ───
  "PG-STEM":       { label: "GRE Score",            placeholder: "e.g. 325",    min: 260,  max: 340,  step: 1,   icon: FlaskConical,     helperText: "GRE General out of 340. 320+ is competitive for top STEM programs.", unit: "/340" },
  "PG-Medicine":   { label: "MCAT / NEET Score",    placeholder: "e.g. 515",    min: 472,  max: 528,  step: 1,   icon: Stethoscope,      helperText: "MCAT (472-528) for USA/Canada. NEET (0-720) for other countries.", unit: "score" },
  "PG-Mgmt":       { label: "GMAT Score",           placeholder: "e.g. 700",    min: 205,  max: 805,  step: 1,   icon: Brain,            helperText: "GMAT Focus Edition (205-805). 665+ for top-50 B-schools.", unit: "/805" },
  "PG-Accts":      { label: "CPA/ACCA Papers Cleared", placeholder: "e.g. 5",     min: 0,    max: 13,   step: 1,   icon: CalculatorIcon,   helperText: "Number of ACCA papers cleared (0-13). Or CPA exams passed (0-4).", unit: "papers" },
  "PG-Arts":       { label: "IELTS + Portfolio",    placeholder: "e.g. 7.5",    min: 4,    max: 9,    step: 0.5, icon: Palette,          helperText: "IELTS score (4.0-9.0). Portfolio required for design/arts programs.", unit: "band" },
};

function getExamConfig(level: Level, major: Major): ExamConfig | null {
  if (!level || !major) return null;
  return EXAM_CONFIG[`${level}-${major}`] || null;
}

/* ─── Course Recommendation Engine ───
   Maps (CourseType × Level × Major) → recommended degree programs ── */
interface ProgramRec {
  name: string;
  desc: string;
  topCountries: string[];
  duration: string;
  career: string;
}

function getCourseRecommendations(courseType: CourseType, level: Level, major: Major): ProgramRec[] {
  if (!courseType || !level || !major) return [];
  const key = `${courseType}-${level}-${major}`;
  const map: Record<string, ProgramRec[]> = {
    // ─── ACADEMIC + UG ───
    "Academic-UG-STEM": [
      { name: "B.Tech / BS Computer Science", desc: "Core programming, AI, data structures. Most versatile degree for global tech careers.", topCountries: ["USA", "Canada", "Germany"], duration: "4 years", career: "Software Engineer, $90-150K" },
      { name: "B.Tech Electrical / Electronics", desc: "Hardware design, embedded systems, robotics. Strong demand in automotive & chip industry.", topCountries: ["Germany", "USA", "Netherlands"], duration: "4 years", career: "Hardware Engineer, $80-130K" },
      { name: "BS Data Science & Analytics", desc: "Statistics, ML, visualization. Fastest-growing field with applications in every industry.", topCountries: ["USA", "UK", "Ireland"], duration: "3-4 years", career: "Data Analyst, $85-140K" },
      { name: "B.Tech Mechanical / Automotive", desc: "Design, manufacturing, thermodynamics. Germany's automotive industry absorbs thousands.", topCountries: ["Germany", "Canada", "Australia"], duration: "4 years", career: "Design Engineer, $75-120K" },
    ],
    "Academic-UG-Medicine": [
      { name: "MBBS / MD Medicine", desc: "Clinical medicine, patient care, rotations. Direct pathway to medical practice globally.", topCountries: ["Russia", "Georgia", "Philippines"], duration: "5-6 years", career: "Doctor / Resident, $120-250K" },
      { name: "BDS Dentistry", desc: "Oral surgery, orthodontics, prosthodontics. High earning potential with own practice option.", topCountries: ["Russia", "Georgia", "Philippines"], duration: "5 years", career: "Dentist, $100-200K" },
      { name: "B.Pharm Pharmacy", desc: "Drug development, clinical trials, pharmacology. Growing demand in pharma hubs.", topCountries: ["USA", "UK", "Ireland"], duration: "4 years", career: "Pharmacist, $90-130K" },
      { name: "BSc Nursing", desc: "Patient care, healthcare admin, specialized nursing. Critical shortage worldwide.", topCountries: ["Canada", "Australia", "Germany"], duration: "3-4 years", career: "Registered Nurse, $70-110K" },
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
    "Academic-PG-STEM": [
      { name: "MS Computer Science / AI", desc: "Deep learning, NLP, computer vision. #1 choice for Indian STEM grads.", topCountries: ["USA", "Canada", "Germany"], duration: "1-2 years", career: "ML Engineer, $130-200K" },
      { name: "MS Data Science", desc: "Big data, statistical modeling, cloud ML. Every company needs data scientists.", topCountries: ["USA", "Ireland", "UK"], duration: "1-2 years", career: "Data Scientist, $120-180K" },
      { name: "MS Cybersecurity", desc: "Ethical hacking, network security, compliance. 0% unemployment rate globally.", topCountries: ["USA", "UK", "Australia"], duration: "1-2 years", career: "Security Engineer, $120-170K" },
      { name: "MEng / MS Mechanical", desc: "Advanced manufacturing, robotics, aerospace. Germany's hidden gem.", topCountries: ["Germany", "Canada", "USA"], duration: "2 years", career: "Project Engineer, $100-150K" },
    ],
    "Academic-PG-Medicine": [
      { name: "MS / MD Surgery", desc: "Specialized surgical training. Highly competitive but highest medical salaries.", topCountries: ["USA", "UK", "Germany"], duration: "3-5 years", career: "Surgeon, $250-500K" },
      { name: "MPH Public Health", desc: "Epidemiology, health policy, biostatistics. Post-COVID demand surge.", topCountries: ["USA", "UK", "Canada"], duration: "1-2 years", career: "Health Director, $90-150K" },
      { name: "MS Biotechnology", desc: "Genomics, drug discovery, clinical research. Strong pharma pipeline.", topCountries: ["USA", "Germany", "Ireland"], duration: "2 years", career: "Research Scientist, $95-140K" },
      { name: "MSc Nursing / Healthcare Admin", desc: "Leadership roles in nursing. Direct PR pathway in Canada & Australia.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "Nurse Manager, $90-130K" },
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
    "Vocational-UG-STEM": [
      { name: "Advanced Diploma IT / Networking", desc: "Cisco, cloud admin, DevOps. 2-year fast track to tech jobs with PR.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "Network Admin, $70-100K" },
      { name: "Diploma Cybersecurity Operations", desc: "SOC analyst, incident response, compliance. Massive skill shortage.", topCountries: ["Canada", "Australia", "Ireland"], duration: "1-2 years", career: "SOC Analyst, $80-120K" },
      { name: "Diploma Cloud Computing (AWS/Azure)", desc: "Cloud architecture, serverless, containers. Every company is migrating.", topCountries: ["Canada", "Australia", "Germany"], duration: "1-2 years", career: "Cloud Admin, $85-130K" },
    ],
    "Vocational-UG-Medicine": [
      { name: "Diploma Practical Nursing (PN)", desc: "Direct patient care, clinic work. Fastest healthcare PR pathway in Canada.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "2 years", career: "LPN / RN, $65-95K" },
      { name: "Diploma Medical Lab Technology", desc: "Diagnostics, pathology, lab management. In-demand behind-the-scenes role.", topCountries: ["Canada", "Australia", "Germany"], duration: "2 years", career: "Lab Technician, $60-90K" },
      { name: "Certificate Aged Care / Disability", desc: "Elderly care, support work. Huge demand in aging Western populations.", topCountries: ["Australia", "Canada", "New Zealand"], duration: "1-2 years", career: "Care Coordinator, $55-80K" },
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
    "Vocational-PG-STEM": [
      { name: "PG Diploma Data Analytics", desc: "Python, SQL, Tableau. Intensive 1-year program with co-op.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1 year", career: "Data Analyst, $85-130K" },
      { name: "PG Diploma Project Management", desc: "PMP prep, agile, stakeholder management. Universal skill.", topCountries: ["Canada", "Australia", "New Zealand"], duration: "1 year", career: "Project Manager, $95-140K" },
      { name: "PG Diploma Software Development", desc: "Full-stack, cloud native, mobile dev. Co-op included.", topCountries: ["Canada", "Ireland", "Australia"], duration: "1-2 years", career: "Software Dev, $100-150K" },
    ],
    "Vocational-PG-Medicine": [
      { name: "PG Diploma Public Health", desc: "Epidemiology, health admin, policy. Shorter alternative to MPH.", topCountries: ["Canada", "Australia", "UK"], duration: "1 year", career: "Health Officer, $75-110K" },
      { name: "PG Diploma Clinical Research", desc: "Trials management, regulatory affairs, pharmacovigilance.", topCountries: ["Canada", "Ireland", "Germany"], duration: "1-2 years", career: "Clinical Assoc, $80-120K" },
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
  };
  return map[key] || [];
}

const COUNTRIES_BY_REGION: Record<string, string[]> = {
  "North America": ["Canada", "USA"],
  "Europe — Western": ["UK", "Ireland", "Netherlands", "France", "Germany", "Sweden", "Italy"],
  "Europe — Eastern": ["Poland", "Russia", "Georgia"],
  "Asia-Pacific": ["Australia", "New Zealand", "Singapore", "Philippines", "South Korea", "Malaysia"],
  "Middle East": ["UAE"],
};

/* ---- Inline country data (lightweight) ---- */
const COUNTRIES = ["Canada", "Germany", "UK", "USA", "Australia", "New Zealand", "Ireland", "Netherlands", "France", "Italy", "Sweden", "Poland", "Singapore", "UAE", "Russia", "Georgia", "Philippines", "South Korea", "Malaysia"];

/* Country name → destination page ID */
const COUNTRY_TO_ID: Record<string, string> = {
  Canada: "canada", Germany: "germany", UK: "uk", USA: "usa",
  Australia: "australia", "New Zealand": "newzealand", Ireland: "ireland",
  Netherlands: "netherlands", France: "france", Italy: "italy", Sweden: "sweden",
  Poland: "poland", Singapore: "singapore", UAE: "dubai", Russia: "russia",
  Georgia: "georgia", Philippines: "philippines", "South Korea": "south-korea",
  Malaysia: "malaysia",
};

const LIVING: Record<string, number> = {
  Canada: 13, Germany: 11, UK: 16, USA: 14, Australia: 14, "New Zealand": 12, Ireland: 13, Netherlands: 12,
  France: 10, Italy: 9, Sweden: 12, Poland: 6, Singapore: 16, UAE: 12, Russia: 6, Georgia: 5, Philippines: 4,
  "South Korea": 10, Malaysia: 6
};
const BASE_TUITION: Record<string, number> = {
  Canada: 30, Germany: 1, UK: 25, USA: 35, Australia: 20, "New Zealand": 18, Ireland: 18, Netherlands: 15,
  France: 10, Italy: 8, Sweden: 12, Poland: 6, Singapore: 20, UAE: 18, Russia: 5, Georgia: 4, Philippines: 3,
  "South Korea": 8, Malaysia: 6
};
const EARN: Record<string, number> = {
  Canada: 43.2, Germany: 45.1, UK: 44.2, USA: 44.2, Australia: 53.8, "New Zealand": 45.1, Ireland: 41.3,
  Netherlands: 36.1, France: 42.2, Italy: 27.8, Sweden: 38.4, Poland: 20.2, Singapore: 19.2, UAE: 9.6, Russia: 11.5, Georgia: 8.6, Philippines: 4.3,
  "South Korea": 22.8, Malaysia: 12.4
};
const SALARY: Record<string, number> = {
  Canada: 45, Germany: 42, UK: 40, USA: 55, Australia: 40, "New Zealand": 30, Ireland: 38, Netherlands: 40,
  France: 32, Italy: 28, Sweden: 35, Poland: 22, Singapore: 45, UAE: 35, Russia: 18, Georgia: 15, Philippines: 12,
  "South Korea": 32, Malaysia: 18
};

/* ---- Indian Student Safety Index (research-based, 0-100) ----
   Sources: MEA India advisories, OSAC, student surveys, news reports 2020-2025
   Higher = safer for Indian students specifically
*/
const INDIAN_SAFETY: Record<string, number> = {
  Canada: 88, Germany: 86, Singapore: 92, Australia: 78, "New Zealand": 83,
  UK: 82, Ireland: 84, Netherlands: 85, France: 75, Sweden: 84,
  Italy: 76, Poland: 80, "South Korea": 85, Malaysia: 82, UAE: 80,
  USA: 72, Russia: 68, Georgia: 75, Philippines: 70,
};

/* ---- Visa Ease Score (0-10): ease of visa process + post-study options ---- */
const VISA_EASE: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, Malaysia: 8,
  Netherlands: 7, "New Zealand": 7, France: 7, Sweden: 7, UK: 7,
  "South Korea": 7, Poland: 6, UAE: 6, Italy: 6, Georgia: 6,
  Singapore: 5, USA: 5, Russia: 5, Philippines: 5,
};

/* ---- PR Score (0-10): speed & ease of permanent residency pathway ---- */
const PR_SCORE: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, "New Zealand": 7,
  Netherlands: 7, Sweden: 7, UK: 6, France: 6, Malaysia: 5,
  "South Korea": 5, Poland: 5, Italy: 4, UAE: 1, Singapore: 3,
  USA: 4, Russia: 4, Georgia: 4, Philippines: 1,
};

/* ---- Employment Index (0-10): job market strength for Indian graduates ---- */
const EMPLOYMENT: Record<string, number> = {
  Canada: 9, Germany: 8, USA: 8, Singapore: 8, UK: 7,
  Ireland: 7, Netherlands: 7, Australia: 7, Sweden: 7,
  "South Korea": 6, "New Zealand": 6, Malaysia: 6, UAE: 6,
  France: 6, Poland: 5, Italy: 5, Russia: 4, Georgia: 4, Philippines: 4,
};

const STREAM_MULT: Record<Major, number> = { STEM: 1.0, Medicine: 1.8, Mgmt: 1.2, Accts: 0.9, Arts: 0.8 };
const DURATION: Record<string, number> = { UG: 4, PG: 2 };
const FIT_BASE: Record<string, number> = {
  Canada: 9, Germany: 9, UK: 8, USA: 9, Australia: 8, "New Zealand": 7, Ireland: 8, Netherlands: 8,
  France: 7, Italy: 6, Sweden: 8, Poland: 6, Singapore: 8, UAE: 6, Russia: 5, Georgia: 5, Philippines: 5,
  "South Korea": 7, Malaysia: 7
};
const VISA: Record<string, string> = {
  Canada: "PGWP 3yr → CEC", Germany: "JobSeeker → BlueCard", UK: "Graduate Visa → Skilled",
  USA: "OPT → H1B", Australia: "PSWV → PR 189/190", "New Zealand": "PSWV → SMC → PR",
  Ireland: "Stamp 1G → Critical Skills", Netherlands: "Orientation → Search → PR",
  France: "APS → Talent Passport → PR", Italy: "Permit → EC Long Term",
  Sweden: "Job Seeker → Work → PR", Poland: "Work Permit → TRP → PR",
  Singapore: "LTVP → EP → PR (hard)", UAE: "NO PR. Work Visa only",
  Russia: "Permit → RVP → PR", Georgia: "Permit → TRP → PR 6yr", Philippines: "NO PR",
  "South Korea": "D-10 → E-7 → F-2 → F-5", Malaysia: "EP → RP-T → PR",
};
const PR_PATH: Record<string, string> = {
  Canada: "3-4 yrs (CEC after 1 yr work)", Germany: "3-4 yrs (Blue Card → PR)",
  UK: "3-5 yrs (Skilled Worker → ILR)", USA: "5-8 yrs (H1B → Green Card)",
  Australia: "2-3 yrs (PR 189/190)", "New Zealand": "2-3 yrs (SMC after 2 yrs)",
  Ireland: "2-3 yrs (Critical Skills → Stamp4)", Netherlands: "3-4 yrs",
  France: "3-5 yrs (Talent Passport)", Italy: "5+ yrs", Sweden: "3-4 yrs",
  Poland: "3-5 yrs", Singapore: "5-8 yrs (very hard)", UAE: "NO PR",
  Russia: "3-5 yrs", Georgia: "5-6 yrs", Philippines: "NO PR",
  "South Korea": "3-4 yrs (F-2 → F-5)", Malaysia: "3-5 yrs (points-based)",
};
const JOB: Record<string, string> = {
  Canada: "High", Germany: "High", UK: "High", USA: "High", Australia: "High",
  "New Zealand": "Medium", Ireland: "High", Netherlands: "High", France: "High",
  Italy: "Medium", Sweden: "High", Poland: "Medium", Singapore: "High",
  UAE: "Medium", Russia: "Medium", Georgia: "Medium", Philippines: "Medium",
  "South Korea": "Medium", Malaysia: "Medium",
};

/* ---- Compute functions (enhanced) ---- */
function compute(country: string, track: Track, level: Level, major: Major) {
  let baseTuition = BASE_TUITION[country] || 10;
  if (country === "Germany" && track === "Private") {
    baseTuition = 18;
  }
  const tuition = track === "Govt" 
    ? baseTuition * STREAM_MULT[major] * 0.6 
    : baseTuition * STREAM_MULT[major];
  const living = (LIVING[country] || 10) * DURATION[level];
  const earnings = (EARN[country] || 20) * (DURATION[level] / 4);
  const netOOP = Math.round((tuition + living - earnings) * 10) / 10;
  const roi = netOOP > 0 ? Math.round((SALARY[country] / netOOP) * 10) / 10 : null;
  return { 
    tuition: Math.round(tuition * 10) / 10, 
    living, 
    earnings: Math.round(earnings * 10) / 10, 
    netOOP, 
    roi, 
    salary: SALARY[country],
    employment: EMPLOYMENT[country] || 5,
    visaEase: VISA_EASE[country] || 5,
    prScore: PR_SCORE[country] || 5,
    safety: INDIAN_SAFETY[country] || 70,
  };
}

function score(country: string, track: Track, level: Level, major: Major, budget: number, prPriority: PRPriority, ielts: number, acad: number) {
  let base = (FIT_BASE[country] || 5) * STREAM_MULT[major] * 0.6;
  let penalty = 0;
  const fin = compute(country, track, level, major);
  if (fin.netOOP > 0) {
    const ratio = budget / fin.netOOP;
    penalty += ratio >= 1 ? 0 : ratio >= 0.7 ? 1 : ratio >= 0.5 ? 2 : 3;
  }
  penalty += ielts >= 7 ? 0 : ielts >= 6.5 ? 0.5 : ielts >= 6 ? 1 : ielts >= 5.5 ? 1.5 : 2.5;
  penalty += acad >= 65 ? 0 : acad >= 55 ? 0.5 : 1;
  if (prPriority === "High" && (country === "UAE" || country === "Philippines")) penalty += 3;
  if (fin.safety >= 85) base += 0.3;
  else if (fin.safety < 70) penalty += 0.5;
  base += (fin.visaEase / 10) * 0.4;
  base += (fin.prScore / 10) * 0.4;
  base += (fin.employment / 10) * 0.3;
  if (country === "Germany" && budget < 20) penalty += 0.8;
  return Math.max(0, Math.min(10, Math.round((base - penalty) * 10) / 10));
}

function evaluateAll(params: { courseType: CourseType; level: Level; major: Major; budget: number; prPriority: PRPriority; ielts: number; track: Track; region: RegionFilter }) {
  const { level, major, budget, prPriority, ielts, track, region } = params;
  let acad = 80;
  let countries = COUNTRIES;
  if (region !== "Any") {
    countries = COUNTRIES.filter(c => c === region);
    if (countries.length === 0) countries = COUNTRIES;
  }
  const results = countries.map(country => {
    const s = score(country, track, level, major, budget, prPriority, ielts, acad);
    const fin = compute(country, track, level, major);
    return { 
      country, score: s, ...fin, 
      visa: VISA[country], pr: PR_PATH[country], job: JOB[country],
      jobNumeric: fin.employment,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">Consultants for {country}</h3>
            <p className="text-teal-100 text-xs">{consultants.length} verified consultants available</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {consultants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No consultants listed for this country yet.</p>
            </div>
          ) : (
            consultants.map(c => (
              <div key={c.id} className="border border-gray-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-md transition-all bg-gray-50/50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{c.name}</h4>
                      {c.verified && <BadgeCheck className="w-4 h-4 text-teal-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500">{c.title} · {c.experience} · {c.successRate} success</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.specialization.slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 bg-white rounded-full text-slate-600 border border-gray-100">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${c.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                  <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="shrink-0 p-3 border-t border-gray-100 bg-gray-50 text-center">
          <p className="text-[10px] text-gray-400">All consultants are verified by Kohortconnect</p>
        </div>
      </div>
    </div>
  );
}

const DE_FORM_KEY = "kc_de_form_state";

/* ---- Auth hook ---- */
function useLocalAuth() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    function check() {
      const hasToken = document.cookie.includes("token") || localStorage.getItem("kc-auth") === "1";
      const hasPremium = localStorage.getItem("kc_premium") === "true";
      const userRaw = localStorage.getItem("kc_user");
      const hasUser = !!userRaw;
      let userPremium = false;
      if (userRaw) { try { userPremium = JSON.parse(userRaw).isPremium === true; } catch { /* ignore */ } }
      setAuth(hasToken || hasPremium || hasUser || userPremium);
    }
    check();
    const iv = setInterval(check, 1000);
    window.addEventListener("storage", check);
    return () => { clearInterval(iv); window.removeEventListener("storage", check); };
  }, []);
  return auth;
}

/* ---- Main Page ---- */
export default function EvaluateV2() {
  const isAuthenticated = useLocalAuth();
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(PREMIUM_BUNDLE.id);

  const savedForm = (() => {
    try {
      const raw = localStorage.getItem(DE_FORM_KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return null;
  })();

  const prefilled = (() => {
    try {
      const raw = localStorage.getItem("kc_smartmatch_data");
      if (raw) { localStorage.removeItem("kc_smartmatch_data"); return JSON.parse(raw); }
    } catch { /* ignore */ }
    return null;
  })();

  const initialCourseType: CourseType = (savedForm?.courseType as CourseType) || "";
  const initialLevel: Level = (savedForm?.level as Level) || "";
  const initialMajor: Major = (savedForm?.major as Major) || "";
  const initialBudget: number = savedForm?.budget ?? 0;
  const initialPr: PRPriority = (savedForm?.prPriority as PRPriority) || "Med";
  const initialIelts: number = savedForm?.ielts ?? 0;
  const initialTrack: Track = (savedForm?.track as Track) || "Private";
  const initialRegion: RegionFilter = savedForm?.region || "Any";
  const initialEngineStarted: boolean = false;

  const [courseType, setCourseType] = useState<CourseType>(initialCourseType);
  const [level, setLevel] = useState<Level>(initialLevel);
  const [major, setMajor] = useState<Major>(initialMajor);
  const [budget, setBudget] = useState<number>(initialBudget);
  const [prPriority, setPrPriority] = useState<PRPriority>(initialPr);
  const [ielts, setIelts] = useState<number>(initialIelts);
  const [track, setTrack] = useState<Track>(initialTrack);
  const [region, setRegion] = useState<RegionFilter>(initialRegion);
  const [engineStarted, setEngineStarted] = useState<boolean>(initialEngineStarted);
  /* ═══════ NEW: Dynamic exam score state ═══════ */
  const [examScore, setExamScore] = useState<number>(0);

  const [consultantModal, setConsultantModal] = useState<{ country: string; consultants: Consultant[] } | null>(null);
  const [courseModal, setCourseModal] = useState<{ country: string; programs: ProgramRec[] } | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  /* ═══════ DERIVED: Get exam config based on level + major ═══════ */
  const examConfig = useMemo(() => getExamConfig(level, major), [level, major]);

  function validateAndStart() {
    const errors: string[] = [];
    if (!courseType) errors.push("Select Course Type");
    if (!level) errors.push("Select Education Level");
    if (!major) errors.push("Select Major / Field");
    if (budget <= 0 || !budget) errors.push("Enter your budget (₹ Lakhs)");
    if (ielts <= 0 || !ielts) errors.push("Enter your IELTS score");
    /* ═══════ Validate exam score if config exists ═══════ */
    if (examConfig && examScore <= 0) errors.push(`Enter your ${examConfig.label}`);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    setEngineStarted(true);
  }

  useEffect(() => {
    localStorage.setItem(DE_FORM_KEY, JSON.stringify({ courseType, level, major, budget, prPriority, ielts, track, region, engineStarted, examScore }));
  }, [courseType, level, major, budget, prPriority, ielts, track, region, engineStarted, examScore]);

  useEffect(() => {
    if (isAuthenticated && budget > 0 && ielts > 0 && !engineStarted) {
      setEngineStarted(true);
    }
  }, [isAuthenticated]);

  const results = useMemo(() => {
    if (!engineStarted || budget <= 0 || ielts <= 0) return [];
    return evaluateAll({ courseType, level, major, budget, prPriority, ielts, track, region });
  }, [engineStarted, courseType, level, major, budget, prPriority, ielts, track, region]);
  const top3 = results.slice(0, 3);
  const trackLabel = track === "Govt" ? "Government" : "Private";
  const regionLabel = region === "Any" ? "All Countries" : region;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/20">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered V2
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">22 Countries · Dynamic Exam Fields</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Decision Engine <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500 italic font-serif">v2.0</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl">
            Now with smart exam fields that change based on your course selection. Tell us your level + major and we ask for the right exam.
          </p>
        </div>
      </section>

      {/* Profile Gate */}
      {!isAuthenticated && (
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
                    It takes 2 minutes — no credit card required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <Link to="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-sm hover:from-teal-500 transition-all shadow-lg shadow-teal-600/25">
                      <User className="w-4 h-4" /> Create Free Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/smart-match" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Try Smart Match First
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">How It Works — 4 Simple Steps</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <StepCard num="1" icon={MousePointer} title="Fill All Fields" desc="Select course type, education level, major, budget & IELTS score. All fields marked with * are required." />
                <StepCard num="2" icon={BarChart3} title="Dynamic Exam Field" desc="The last field changes based on your selections — GRE for PG STEM, NEET for Medicine, GMAT for MBA, etc." />
                <StepCard num="3" icon={FileText} title="Review Your Scores" desc="See Rank #3 FREE instantly. Your top 2 matches + the full 19-country table unlock with Premium." />
                <StepCard num="4" icon={Award} title="Unlock Full Results" desc="Upgrade to Premium (₹999) to reveal your #1 & #2 matches, detailed financials & consultant contacts." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Toggle — always visible */}
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
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-6">
            <div className="absolute-bar" />
            <div className="mb-5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <MousePointer className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-sm font-semibold text-blue-800">
                Please select from the options below — all fields marked with <span className="text-red-500">*</span> are required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="Course Type" required>
                <select value={courseType} onChange={e => { setCourseType(e.target.value as CourseType); setFormErrors([]); }} className="form-select" required>
                  <option value="" disabled>— Choose Course Type —</option>
                  <option value="Academic">Academic (Degree)</option>
                  <option value="Vocational">Vocational Courses (PR Pathways)</option>
                </select>
              </Field>
              <Field label="Education Level" required>
                <select value={level} onChange={e => { setLevel(e.target.value as Level); setExamScore(0); setFormErrors([]); }} className="form-select" required>
                  <option value="" disabled>— Choose Level —</option>
                  <option value="UG">UG (Bachelors / Diploma)</option>
                  <option value="PG">PG (Masters)</option>
                </select>
              </Field>
              <Field label="Major / Field" required>
                <select value={major} onChange={e => { setMajor(e.target.value as Major); setExamScore(0); setFormErrors([]); }} className="form-select" required>
                  <option value="" disabled>— Choose Major —</option>
                  <option value="STEM">STEM</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Mgmt">Management</option>
                  <option value="Accts">Accounts</option>
                  <option value="Arts">Arts</option>
                </select>
              </Field>
              <Field label="Budget (₹ Lakhs)" required>
                <input type="number" min={5} max={300} value={budget || ""} onChange={e => { setBudget(+e.target.value); setFormErrors([]); }} className="form-input" placeholder="e.g. 25" required />
              </Field>
              <Field label="PR Priority">
                <select value={prPriority} onChange={e => setPrPriority(e.target.value as PRPriority)} className="form-select">
                  <option value="High">High — PR is top goal</option>
                  <option value="Med">Medium</option>
                  <option value="Low">Low — May return to India</option>
                </select>
              </Field>
              <Field label="IELTS Score" required>
                <input type="number" min={4} max={9} step={0.5} value={ielts || ""} onChange={e => { setIelts(+e.target.value); setFormErrors([]); }} className="form-input" placeholder="e.g. 7.0" required />
              </Field>
              <Field label="Region / Country">
                <select value={region} onChange={e => setRegion(e.target.value as RegionFilter)} className="form-select">
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
              <Field 
                label={examConfig ? examConfig.label : "Exam Score"} 
                required
              >
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
            </div>
            {formErrors.length > 0 && (
              <div className="mt-2 space-y-1">
                {formErrors.map(e => (
                  <p key={e} className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{e}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results — AUTH GATED: only visible when logged in */}
      {isAuthenticated && (
      <>
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
      {/* Top 3 */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-3 mb-5 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Top 3 Recommendations</h2>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">{trackLabel} · {courseType || "—"} · {level || "—"} · {MAJOR_LABEL[major] || "—"} · {regionLabel}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Rank #1 */}
            {top3[0] && (
              <div className={`bg-white rounded-2xl border-2 border-amber-400 shadow-xl overflow-hidden ${!isAuthenticated ? "relative" : ""}`}>
                <div className="px-4 py-2 text-xs font-bold text-white font-mono tracking-wider uppercase bg-gradient-to-r from-amber-400 to-amber-600">RANK #1 — BEST MATCH</div>
                <div className="p-5">
                  <div className={!isAuthenticated ? "blur-[5px] opacity-40 pointer-events-none select-none" : ""}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-slate-900">{top3[0].country}</h3>
                      <div className={`text-3xl font-bold ${scoreColor(top3[0].score)}`}>{top3[0].score.toFixed(1)}<span className="text-sm text-slate-400 font-normal">/10</span></div>
                    </div>
                    <div className="space-y-1.5">
                      <FinRow icon={DollarSign} label="Tuition" value={formatMoney(top3[0].tuition)} />
                      <FinRow icon={Home} label="Living" value={formatMoney(top3[0].living)} />
                      <FinRow icon={Wallet} label="Part-Time Earnings" value={formatMoney(top3[0].earnings)} />
                      <FinRow icon={Target} label="Net Out of Pocket" value={formatMoney(top3[0].netOOP)} highlight />
                      <FinRow icon={TrendingUp} label="ROI" value={formatROI(top3[0].roi)} valueClass={roiColor(top3[0].roi)} />
                      <FinRow icon={MapPin} label="Visa Pathway" value={top3[0].visa} />
                      <FinRow icon={Clock} label="PR Timeline" value={top3[0].pr} />
                      <div className="flex items-center gap-2 pt-1"><Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="text-xs text-slate-500 uppercase font-mono w-16">Job Market</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${jobBg(top3[0].job)}`}>{top3[0].job}</span></div>
                      <FinRow icon={DollarSign} label="Starting Salary" value={`${formatMoney(top3[0].salary)}/yr`} />
                    </div>
                  </div>
                  {!isAuthenticated && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/80 p-4 text-center">
                      <Lock className="w-8 h-8 text-amber-600 mb-2" />
                      <p className="text-lg font-bold text-slate-900">{top3[0].country}</p>
                      <p className="text-sm text-teal-700 font-bold mb-1">Score: {top3[0].score.toFixed(1)} / 10</p>
                      <p className="text-xs text-slate-600 mb-3 max-w-[200px]">Your best match. Unlock Premium to see full financial breakdown.</p>
                      {!inCart ? (
                        <button onClick={() => addItem(PREMIUM_BUNDLE)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold hover:from-amber-400 transition-all">
                          <ShoppingCart className="w-3.5 h-3.5" /> Unlock — ₹999
                        </button>
                      ) : (
                        <Link to="/checkout" onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs font-bold hover:from-teal-400 transition-all">
                          <ArrowRight className="w-3.5 h-3.5" /> Go to Checkout
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rank #2 */}
            {top3[1] && (
              <div className={`bg-white rounded-2xl border-2 border-slate-300 shadow-lg overflow-hidden ${!isAuthenticated ? "relative" : ""}`}>
                <div className="px-4 py-2 text-xs font-bold text-white font-mono tracking-wider uppercase bg-gradient-to-r from-slate-400 to-slate-600">RANK #2 — STRONG FIT</div>
                <div className="p-5">
                  <div className={!isAuthenticated ? "blur-[5px] opacity-40 pointer-events-none select-none" : ""}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-slate-900">{top3[1].country}</h3>
                      <div className={`text-3xl font-bold ${scoreColor(top3[1].score)}`}>{top3[1].score.toFixed(1)}<span className="text-sm text-slate-400 font-normal">/10</span></div>
                    </div>
                    <div className="space-y-1.5">
                      <FinRow icon={DollarSign} label="Tuition" value={formatMoney(top3[1].tuition)} />
                      <FinRow icon={Home} label="Living" value={formatMoney(top3[1].living)} />
                      <FinRow icon={Wallet} label="Part-Time Earnings" value={formatMoney(top3[1].earnings)} />
                      <FinRow icon={Target} label="Net Out of Pocket" value={formatMoney(top3[1].netOOP)} highlight />
                      <FinRow icon={TrendingUp} label="ROI" value={formatROI(top3[1].roi)} valueClass={roiColor(top3[1].roi)} />
                      <FinRow icon={MapPin} label="Visa Pathway" value={top3[1].visa} />
                      <FinRow icon={Clock} label="PR Timeline" value={top3[1].pr} />
                      <div className="flex items-center gap-2 pt-1"><Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="text-xs text-slate-500 uppercase font-mono w-16">Job Market</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${jobBg(top3[1].job)}`}>{top3[1].job}</span></div>
                      <FinRow icon={DollarSign} label="Starting Salary" value={`${formatMoney(top3[1].salary)}/yr`} />
                    </div>
                  </div>
                  {!isAuthenticated && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 p-4 text-center">
                      <Lock className="w-8 h-8 text-slate-500 mb-2" />
                      <p className="text-lg font-bold text-slate-900">{top3[1].country}</p>
                      <p className="text-sm text-teal-700 font-bold mb-1">Score: {top3[1].score.toFixed(1)} / 10</p>
                      <p className="text-xs text-slate-600 mb-3 max-w-[200px]">Your #2 alternative. Unlock Premium for full details.</p>
                      {!inCart ? (
                        <button onClick={() => addItem(PREMIUM_BUNDLE)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-lg text-xs font-bold hover:from-slate-300 transition-all">
                          <ShoppingCart className="w-3.5 h-3.5" /> Unlock — ₹999
                        </button>
                      ) : (
                        <Link to="/checkout" onClick={() => localStorage.setItem("kc_premium_source_url", window.location.hash)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs font-bold hover:from-teal-400 transition-all">
                          <ArrowRight className="w-3.5 h-3.5" /> Go to Checkout
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rank #3 */}
            {top3[2] && (
              <div className="bg-white rounded-2xl border-2 border-orange-400 shadow-lg overflow-hidden">
                <div className="px-4 py-2 text-xs font-bold text-white font-mono tracking-wider uppercase bg-gradient-to-r from-orange-400 to-orange-600">RANK #3 — YOUR PREVIEW</div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-slate-900">{top3[2].country}</h3>
                    <div className={`text-3xl font-bold ${scoreColor(top3[2].score)}`}>{top3[2].score.toFixed(1)}<span className="text-sm text-slate-400 font-normal">/10</span></div>
                  </div>
                  <div className="space-y-1.5">
                    <FinRow icon={DollarSign} label="Tuition" value={formatMoney(top3[2].tuition)} />
                    <FinRow icon={Home} label="Living" value={formatMoney(top3[2].living)} />
                    <FinRow icon={Wallet} label="Part-Time Earnings" value={formatMoney(top3[2].earnings)} />
                    <FinRow icon={Target} label="Net Out of Pocket" value={formatMoney(top3[2].netOOP)} highlight />
                    <FinRow icon={TrendingUp} label="ROI" value={formatROI(top3[2].roi)} valueClass={roiColor(top3[2].roi)} />
                    <FinRow icon={MapPin} label="Visa Pathway" value={top3[2].visa} />
                    <FinRow icon={Clock} label="PR Timeline" value={top3[2].pr} />
                    <div className="flex items-center gap-2 pt-1"><Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="text-xs text-slate-500 uppercase font-mono w-16">Job Market</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${jobBg(top3[2].job)}`}>{top3[2].job}</span></div>
                    <FinRow icon={DollarSign} label="Starting Salary" value={`${formatMoney(top3[2].salary)}/yr`} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Results Table */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="md:hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider uppercase text-slate-300">All {results.length} Countries Ranked</span>
                <span className="text-[10px] text-slate-500">Scroll to see all</span>
              </div>
              <div className="divide-y divide-slate-100">
                {results.map(r => {
                  const destId = COUNTRY_TO_ID[r.country];
                  return (
                    <div key={r.country} className="p-4 hover:bg-teal-50/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-sm font-bold text-teal-600">{r._rank}</span>
                          {destId ? (
                            <Link to={`/destinations/${destId}`} className="text-base font-bold text-slate-900 hover:text-teal-600 transition-colors">{r.country}</Link>
                          ) : (
                            <span className="text-base font-bold text-slate-900">{r.country}</span>
                          )}
                        </div>
                        <span className={`text-lg font-bold ${scoreColor(r.score)}`}>{r.score.toFixed(1)}<span className="text-xs text-slate-400 font-normal">/10</span></span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-400 uppercase">Net OOP</div>
                          <div className="text-sm font-bold font-mono text-teal-700">₹{r.netOOP.toFixed(1)}L</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-400 uppercase">ROI</div>
                          <div className={`text-sm font-bold font-mono ${roiColor(r.roi)}`}>{formatROI(r.roi)}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-400 uppercase">Salary</div>
                          <div className="text-sm font-bold font-mono text-slate-700">₹{r.salary}L/yr</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-slate-900">
                  {[
                    { h: "Rank", sub: "", w: "w-10" },
                    { h: "Country", sub: "", w: "w-24" },
                    { h: "Score", sub: "/10", w: "w-16" },
                    { h: "Tuition", sub: "(₹L)", w: "w-18" },
                    { h: "Living", sub: "(₹L)", w: "w-18" },
                    { h: "Earnings", sub: "(₹L)", w: "w-18" },
                    { h: "Net OOP", sub: "(₹L)", w: "w-18" },
                    { h: "ROI", sub: "", w: "w-12" },
                    { h: "Salary", sub: "(₹L/yr)", w: "w-18" },
                    { h: "Jobs", sub: "/10", w: "w-10" },
                    { h: "Safety", sub: "/100", w: "w-12" },
                    { h: "Visa", sub: "/10", w: "w-10" },
                    { h: "PR", sub: "/10", w: "w-10" },
                  ].map(col => (
                    <th key={col.h} className={`px-2 py-2.5 text-left text-[9px] font-mono tracking-wider uppercase text-slate-300 whitespace-nowrap ${col.w}`}>
                      <div>{col.h}</div>
                      {col.sub && <div className="text-slate-500 font-normal normal-case">{col.sub}</div>}
                    </th>
                  ))}
                </tr></thead>
                <tbody>
                  {results.map(r => {
                    const destId = COUNTRY_TO_ID[r.country];
                    return (
                      <tr key={r.country} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors group">
                        <td className="px-2 py-2.5 text-sm font-bold text-teal-600">{r._rank}</td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          {destId ? (
                            <Link to={`/destinations/${destId}`} className="text-sm font-semibold text-slate-900 hover:text-teal-600 transition-colors flex items-center gap-1">
                              {r.country}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                            </Link>
                          ) : (
                            <span className="text-sm font-semibold text-slate-900">{r.country}</span>
                          )}
                        </td>
                        <td className={`px-2 py-2.5 text-sm font-bold ${scoreColor(r.score)}`}>{r.score.toFixed(1)}<span className="text-[10px] text-slate-400 font-normal">/10</span></td>
                        <td className="px-2 py-2.5 text-xs text-slate-600 font-mono whitespace-nowrap">₹{r.tuition.toFixed(1)}L</td>
                        <td className="px-2 py-2.5 text-xs text-slate-600 font-mono whitespace-nowrap">₹{r.living.toFixed(1)}L</td>
                        <td className="px-2 py-2.5 text-xs text-emerald-600 font-mono whitespace-nowrap">+₹{r.earnings.toFixed(1)}L</td>
                        <td className="px-2 py-2.5 text-xs font-bold font-mono whitespace-nowrap text-teal-700">₹{r.netOOP.toFixed(1)}L</td>
                        <td className={`px-2 py-2.5 text-xs font-bold font-mono whitespace-nowrap ${roiColor(r.roi)}`}>{formatROI(r.roi)}</td>
                        <td className="px-2 py-2.5 text-xs text-slate-600 font-mono whitespace-nowrap">₹{r.salary}L</td>
                        <td className="px-2 py-2.5 text-xs font-mono whitespace-nowrap">{r.jobNumeric}/10</td>
                        <td className={`px-2 py-2.5 text-xs font-mono whitespace-nowrap ${r.safety >= 85 ? "text-emerald-600" : r.safety >= 70 ? "text-amber-600" : "text-red-500"}`}>{r.safety}</td>
                        <td className="px-2 py-2.5 text-xs font-mono whitespace-nowrap text-blue-600">{r.visaEase}/10</td>
                        <td className="px-2 py-2.5 text-xs font-mono whitespace-nowrap text-violet-600">{r.prScore}/10</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
            <InfoCard icon={Home} title="Living Cost" color="amber" formula="Per Year × Duration"
              explain="Per-year living cost (rent, food, transport) multiplied by course duration. UG typically 4 years, PG 2 years."
              example="Canada: ₹13L/yr × 4 yrs = ₹52L total living cost for a UG degree." />
            <InfoCard icon={Wallet} title="Part-Time Earnings" color="emerald" formula="Earn/Year × Duration"
              explain="Based on local minimum wage and legal work hours (10-20 hrs/week). Longer courses = more total earnings."
              example="Canada: ₹10.8L/yr × 4 yrs = ₹43.2L total earnings over the course." />
            <InfoCard icon={Target} title="Net Out-of-Pocket" color="teal" formula="Tuition + Living − Earnings"
              explain="The real number your family pays. Negative means you earn more than you spend — you graduate debt-free."
              example="Tuition ₹30L + Living ₹52L − Earnings ₹43L = Net OOP ₹39L. That is the actual family spend." />
            <InfoCard icon={TrendingUp} title="ROI Multiplier" color="rose" formula="Salary ÷ Net OOP"
              explain="How many years of salary equal your investment. 3x ROI = every ₹1 returns ₹3/year. Above 1x = recover in under 1 year."
              example="Salary ₹45L ÷ Net OOP ₹15L = 3.0x. Family recovers investment in 4 months of work." />
            <InfoCard icon={Star} title="Match Score" color="violet" formula="Base Fit − Penalties"
              explain="Base fit (0-10) for your major per country, minus penalties for budget, IELTS, academics, and PR priority."
              example="Canada STEM base fit 9.0. Good budget + IELTS 7 + High PR = ~9.0. Low budget drops to ~6.0." />
          </div>
        </div>
      </section>

      <Footer />

      {/* Consultant Contact Modal */}
      {consultantModal && (
        <ConsultantModal
          country={consultantModal.country}
          consultants={consultantModal.consultants}
          onClose={() => setConsultantModal(null)}
        />
      )}
    </div>
  );
}

/* ---- Sub-components ---- */
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
};

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
