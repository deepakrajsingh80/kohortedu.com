/* ═══════════════════════════════════════════════════════════════
   SITE DATA — Single source of truth for nav, footer, banners
   All navigation, footer columns, and key page data derive from
   this file. Add a new destination/course/major/exam → all
   UI surfaces update automatically.
   ═══════════════════════════════════════════════════════════════ */

import {
  FlaskConical, Stethoscope, Calculator, Palette, Building2,
  Shirt, Utensils, Newspaper, Clapperboard, Laptop,
  BarChart3, HeartPulse, Microscope, Pill, Dna,
  type LucideIcon,
} from "lucide-react";
import { destinations } from "./destinations";
import { courseTypes } from "./courses";
import { ALL_EXAMS } from "./exams";

/* ═══════════════════════════════════════════
   MAJOR SUBJECTS — All 16 from Decision Engine
   ═══════════════════════════════════════════ */

export interface MajorInfo {
  id: string;          // e.g. "CS_IT"
  label: string;       // e.g. "Computer Science & IT"
  shortLabel: string;  // e.g. "CS & IT"
  icon: LucideIcon;
  color: string;       // tailwind color class
  bgColor: string;
  heroColor: string;   // gradient for hero
  tagline: string;
  description: string;
  whatYouStudy: string[];
  avgTuition: string;
  avgSalary: string;
  duration: string;
  prScore: string;     // "10/10", "9/10", etc.
  demandLevel: string; // "Critical Shortage", "Very High", etc.
  topCountries: string[];
  careerPaths: {
    role: string; salaryUSA: string; salaryCanada: string; salaryUK: string;
    salaryGermany: string; companies: string[];
  }[];
  whyThisMajor: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const ALL_MAJORS: MajorInfo[] = [
  {
    id: "CS_IT", label: "Computer Science & IT", shortLabel: "CS & IT",
    icon: Laptop, color: "text-blue-600", bgColor: "bg-blue-600", heroColor: "from-blue-600 to-indigo-700",
    tagline: "Build the Future — Code, AI, Cloud, Cybersecurity",
    description: "CS & IT is the most in-demand field globally for PR. Every industry needs software engineers, AI specialists, and cloud architects. Graduates from top destinations (USA, Canada, Germany, Ireland) report 95%+ job placement within 6 months.",
    whatYouStudy: ["Programming & Algorithms", "Artificial Intelligence & ML", "Cloud Computing & DevOps", "Cybersecurity & Ethical Hacking", "Database Systems & Big Data", "Software Engineering"],
    avgTuition: "₹10L-25L/yr", avgSalary: "$75K-150K/yr", duration: "1-2 years (PG)", prScore: "10/10", demandLevel: "Critical Shortage",
    topCountries: ["USA", "Canada", "Germany", "Ireland", "UK", "Australia"],
    careerPaths: [
      { role: "Software Engineer", salaryUSA: "$100-180K", salaryCanada: "CAD 85-140K", salaryUK: "£45-80K", salaryGermany: "€55-90K", companies: ["Google", "Microsoft", "Amazon", "Apple"] },
      { role: "AI / ML Engineer", salaryUSA: "$120-220K", salaryCanada: "CAD 95-160K", salaryUK: "£55-95K", salaryGermany: "€65-100K", companies: ["OpenAI", "NVIDIA", "Meta", "DeepMind"] },
      { role: "Cloud Architect", salaryUSA: "$130-200K", salaryCanada: "CAD 110-170K", salaryUK: "£60-100K", salaryGermany: "€70-110K", companies: ["AWS", "Azure", "GCP", "IBM"] },
      { role: "Cybersecurity Engineer", salaryUSA: "$110-180K", salaryCanada: "CAD 90-150K", salaryUK: "£50-85K", salaryGermany: "€60-95K", companies: ["CrowdStrike", "Palo Alto", "Cloudflare", "Cisco"] },
      { role: "Data Engineer", salaryUSA: "$105-170K", salaryCanada: "CAD 90-145K", salaryUK: "£50-85K", salaryGermany: "€55-90K", companies: ["Databricks", "Snowflake", "Netflix", "Uber"] },
    ],
    whyThisMajor: [
      { title: "Highest PR Success Rate", desc: "CS & IT tops every country's occupation shortage list — Express Entry, H-1B, EU Blue Card all prioritize tech talent." },
      { title: "Unlimited Career Paths", desc: "From FAANG to fintech, healthcare to autonomous vehicles — every industry needs software talent." },
      { title: "Remote-First Industry", desc: "Tech is the most remote-friendly field. Work from anywhere, earn global salaries." },
      { title: "Fastest Growing Salaries", desc: "Tech salaries have grown 40% in 5 years. AI/ML roles command 50%+ premium." },
    ],
    faqs: [
      { q: "Do I need a CS background to pursue MS CS?", a: "Many universities accept students with math, physics, or engineering backgrounds. Bridge programs are available. Top programs prefer some coding experience." },
      { q: "Which country is best for CS — USA or Canada?", a: "USA for maximum salary (FAANG + startups). Canada for fastest PR (Express Entry + PGWP). Germany for free tuition + EU Blue Card. Ireland for tech HQ access. Choose based on your priority." },
      { q: "Is coding bootcamp enough or do I need a degree?", a: "For PR pathways, a Master's degree is strongly preferred. Bootcamps work for entry-level jobs but not for visa sponsorship in most countries." },
      { q: "What's the GRE requirement for MS CS?", a: "Top 50 US programs: GRE 320+. Canada/Germany/Ireland: Mostly waived or optional. Some require GRE only if GPA is below 3.0." },
    ],
  },
  {
    id: "DataScience", label: "Data Science & Analytics", shortLabel: "Data Science",
    icon: BarChart3, color: "text-violet-600", bgColor: "bg-violet-600", heroColor: "from-violet-600 to-purple-700",
    tagline: "Turn Data into Decisions — The Hottest Job of the Decade",
    description: "Data Science combines statistics, programming, and domain expertise to extract insights from massive datasets. Every company — from Netflix predicting what you watch to banks detecting fraud — needs data scientists. This field has the highest growth rate of any profession globally.",
    whatYouStudy: ["Statistics & Probability", "Machine Learning Algorithms", "Python, R & SQL", "Data Visualization", "Big Data Technologies", "Business Intelligence"],
    avgTuition: "₹12L-28L/yr", avgSalary: "$80K-160K/yr", duration: "1-2 years (PG)", prScore: "10/10", demandLevel: "Critical Shortage",
    topCountries: ["USA", "Canada", "Germany", "Ireland", "UK", "Australia"],
    careerPaths: [
      { role: "Data Scientist", salaryUSA: "$120-200K", salaryCanada: "CAD 95-155K", salaryUK: "£50-90K", salaryGermany: "€60-95K", companies: ["Meta", "Netflix", "Uber", "Airbnb"] },
      { role: "ML Engineer", salaryUSA: "$130-210K", salaryCanada: "CAD 105-170K", salaryUK: "£55-95K", salaryGermany: "€65-100K", companies: ["Google", "OpenAI", "NVIDIA", "Apple"] },
      { role: "Business Intelligence Analyst", salaryUSA: "$90-140K", salaryCanada: "CAD 75-120K", salaryUK: "£40-70K", salaryGermany: "€50-80K", companies: ["Deloitte", "McKinsey", "BCG", "Accenture"] },
      { role: "Quantitative Analyst", salaryUSA: "$140-250K", salaryCanada: "CAD 110-180K", salaryUK: "£60-110K", salaryGermany: "€70-120K", companies: ["Goldman Sachs", "JP Morgan", "Two Sigma", "Citadel"] },
    ],
    whyThisMajor: [
      { title: "#1 Job Growth", desc: "LinkedIn reports 650% growth in Data Science roles since 2015. Shortage of qualified professionals everywhere." },
      { title: "Cross-Industry Demand", desc: "Finance, healthcare, retail, sports, government — every sector needs data-driven decision makers." },
      { title: "AI Era Fuel", desc: "Generative AI has created massive demand for data scientists who can train, fine-tune, and deploy models." },
      { title: "PR Priority Everywhere", desc: "Canada, Australia, Germany, UK all list Data Science as a priority occupation with fast-track PR." },
    ],
    faqs: [
      { q: "Do I need a math/statistics background?", a: "Math, Statistics, CS, Economics, or Engineering backgrounds are preferred. Some programs accept science graduates with strong quantitative skills." },
      { q: "What's the difference between Data Science and Data Analytics?", a: "Data Science focuses on predictive modeling, ML, and algorithm development. Data Analytics focuses on descriptive insights and business reporting using tools like SQL and Tableau." },
      { q: "Which tools should I learn?", a: "Python (pandas, scikit-learn), SQL, Tableau/Power BI, and cloud platforms (AWS/GCP). R is useful for research roles." },
    ],
  },
  {
    id: "Engineering", label: "Engineering", shortLabel: "Engineering",
    icon: FlaskConical, color: "text-orange-600", bgColor: "bg-orange-600", heroColor: "from-orange-500 to-red-600",
    tagline: "Design the World — Mechanical, Electrical, Civil, Aerospace",
    description: "Engineering remains the backbone of global infrastructure and innovation. From Germany's automotive industry to Canada's civil engineering boom, qualified engineers are in critical shortage worldwide. Specializations like robotics, renewable energy, and semiconductor design command top salaries.",
    whatYouStudy: ["Mechanical / Automotive Design", "Electrical & Electronics", "Civil & Structural", "Aerospace & Aeronautical", "Robotics & Automation", "Renewable Energy Systems"],
    avgTuition: "₹10L-22L/yr", avgSalary: "$70K-130K/yr", duration: "1-2 years (PG)", prScore: "9/10", demandLevel: "Very High",
    topCountries: ["Germany", "Canada", "USA", "Australia", "UK", "Netherlands"],
    careerPaths: [
      { role: "Mechanical Engineer", salaryUSA: "$80-130K", salaryCanada: "CAD 70-110K", salaryUK: "£35-60K", salaryGermany: "€50-80K", companies: ["BMW", "Siemens", "Boeing", "Rolls-Royce"] },
      { role: "Electrical Engineer", salaryUSA: "$85-140K", salaryCanada: "CAD 75-120K", salaryUK: "£38-65K", salaryGermany: "€52-85K", companies: ["Intel", "Texas Instruments", "ABB", "Schneider"] },
      { role: "Civil Engineer", salaryUSA: "$75-120K", salaryCanada: "CAD 65-105K", salaryUK: "£32-55K", salaryGermany: "€45-75K", companies: ["AECOM", "Arup", "WSP", "Jacobs"] },
      { role: "Aerospace Engineer", salaryUSA: "$95-155K", salaryCanada: "CAD 80-130K", salaryUK: "£42-70K", salaryGermany: "€55-90K", companies: ["SpaceX", "Airbus", "Lockheed Martin", "Safran"] },
    ],
    whyThisMajor: [
      { title: "German Automotive Giant", desc: "Germany alone needs 100,000+ engineers annually. BMW, Mercedes, Bosch, Siemens recruit directly from campuses." },
      { title: "Infrastructure Boom", desc: "Canada, Australia, NZ investing billions in infrastructure — civil and structural engineers in massive demand." },
      { title: "Semiconductor Surge", desc: "Global chip shortage created 1M+ engineering jobs. Intel, TSMC, Samsung building new fabs worldwide." },
      { title: "PR Fast-Track", desc: "Engineering is on every country's priority occupation list. Canada PNP and Australia GSM prioritize engineers." },
    ],
    faqs: [
      { q: "Which engineering specialization has the best PR prospects?", a: "Software/Computer Engineering, Civil Engineering, and Electrical Engineering have the highest demand. Renewable Energy and Robotics are fastest-growing." },
      { q: "Do I need GATE for MS Engineering abroad?", a: "No. GRE is required for US programs. Germany accepts direct applications. Australia/Canada mostly require only IELTS." },
      { q: "Is German language required for engineering jobs in Germany?", a: "English is sufficient at MNCs (BMW, Siemens). B1 German opens 3x more opportunities at Mittelstand companies." },
    ],
  },
  {
    id: "MBBS", label: "MBBS (Medicine)", shortLabel: "MBBS",
    icon: HeartPulse, color: "text-red-600", bgColor: "bg-red-600", heroColor: "from-red-600 to-rose-700",
    tagline: "Become a Doctor — Save Lives, Serve Humanity",
    description: "MBBS is the gateway to becoming a medical doctor. With healthcare systems worldwide facing critical doctor shortages, MBBS graduates enjoy near-guaranteed employment and some of the fastest PR pathways. Countries like Canada, Australia, and Germany actively recruit international medical graduates.",
    whatYouStudy: ["Anatomy & Physiology", "Pathology & Microbiology", "Pharmacology", "Surgery & Clinical Skills", "Internal Medicine", "Community Medicine"],
    avgTuition: "₹5L-40L/yr", avgSalary: "$150K-300K/yr", duration: "4-6 years", prScore: "10/10", demandLevel: "Critical Shortage",
    topCountries: ["USA", "Canada", "UK", "Australia", "Germany", "Russia", "Georgia"],
    careerPaths: [
      { role: "General Physician (GP)", salaryUSA: "$200-300K", salaryCanada: "CAD 180-350K", salaryUK: "£70-120K", salaryGermany: "€80-150K", companies: ["NHS", "Kaiser", "Mayo Clinic", "Cleveland Clinic"] },
      { role: "Surgeon", salaryUSA: "$300-500K", salaryCanada: "CAD 300-500K", salaryUK: "£100-200K", salaryGermany: "€120-250K", companies: ["Johns Hopkins", "Mass General", "Cleveland Clinic"] },
      { role: "Medical Researcher", salaryUSA: "$80-150K", salaryCanada: "CAD 70-120K", salaryUK: "£40-75K", salaryGermany: "€50-90K", companies: ["NIH", "WHO", "Pharma Co", "Universities"] },
      { role: "Public Health Officer", salaryUSA: "$80-130K", salaryCanada: "CAD 70-110K", salaryUK: "£40-70K", salaryGermany: "€50-80K", companies: ["WHO", "CDC", "UNICEF", "Govt Health"] },
    ],
    whyThisMajor: [
      { title: "100% Employment Rate", desc: "Doctors are always needed. Every country has a physician shortage. Job security is unmatched." },
      { title: "Highest Earning Potential", desc: "Specialist doctors earn $300K-500K+ in USA/Canada. Even GPs start at $150K+." },
      { title: "Fastest PR Pathway", desc: "Healthcare workers get priority processing in Canada, Australia, UK, Germany. Many countries waive salary thresholds." },
      { title: "Noble Profession", desc: "Medicine offers unmatched personal fulfillment — saving lives and serving communities." },
    ],
    faqs: [
      { q: "Can I practice in India after MBBS abroad?", a: "Yes, after clearing NEXT (formerly FMGE) exam. Most countries with NMC-recognized universities have Indian professors who prepare students for this exam." },
      { q: "Which country has the cheapest MBBS?", a: "Russia (₹3-5L/yr), Georgia (₹3-6L/yr), and Philippines (₹2.5-5L/yr) are the cheapest. Germany has free tuition but requires German language." },
      { q: "How long does it take to become a doctor?", a: "MBBS (4-6yr) + Internship (1yr) + PG/Specialization (3-6yr). Total 8-13 years depending on specialization." },
      { q: "Is USMLE required for all countries?", a: "USMLE is only for USA. Each country has its own licensing exam: PLAB for UK, AMC for Australia, MCCQE for Canada." },
    ],
  },
  {
    id: "MD_MS", label: "MD / MS (Surgery)", shortLabel: "MD / MS",
    icon: Stethoscope, color: "text-rose-600", bgColor: "bg-rose-600", heroColor: "from-rose-600 to-pink-700",
    tagline: "Master Surgery — Specialize, Operate, Lead",
    description: "MD (Doctor of Medicine) and MS (Master of Surgery) are postgraduate medical degrees for doctors who want to specialize. These are the most prestigious and highest-paying medical qualifications globally. Specializations range from Cardiology and Neurology to Orthopedics and Plastic Surgery.",
    whatYouStudy: ["Advanced Clinical Medicine", "Surgical Techniques & Procedures", "Specialized Diagnostics", "Research Methodology", "Patient Management", "Supervised Clinical Rotations"],
    avgTuition: "₹15L-50L/yr", avgSalary: "$200K-500K/yr", duration: "3-6 years", prScore: "10/10", demandLevel: "Critical Shortage",
    topCountries: ["USA", "UK", "Canada", "Australia", "Germany"],
    careerPaths: [
      { role: "Cardiologist", salaryUSA: "$350-600K", salaryCanada: "CAD 300-500K", salaryUK: "£120-200K", salaryGermany: "€150-300K", companies: ["Cleveland Clinic", "Mayo Clinic", "Johns Hopkins"] },
      { role: "Neurosurgeon", salaryUSA: "$400-700K", salaryCanada: "CAD 350-600K", salaryUK: "£150-250K", salaryGermany: "€180-350K", companies: ["Mass General", "Johns Hopkins", "Stanford Health"] },
      { role: "Orthopedic Surgeon", salaryUSA: "$350-550K", salaryCanada: "CAD 300-480K", salaryUK: "£120-200K", salaryGermany: "€150-280K", companies: ["Hospital for Special Surgery", "Mayo Clinic"] },
      { role: "Radiologist", salaryUSA: "$350-500K", salaryCanada: "CAD 300-450K", salaryUK: "£100-180K", salaryGermany: "€140-250K", companies: ["Memorial Sloan", "Cleveland Clinic", "Mayo Clinic"] },
    ],
    whyThisMajor: [
      { title: "Highest Paid Medical Specialty", desc: "Surgeons and specialists earn $300K-700K depending on the field. Neurosurgery and Cardiology top the charts." },
      { title: "Universal Demand", desc: "Every healthcare system needs specialists. Aging populations in developed countries are driving unprecedented demand." },
      { title: "Research & Academia", desc: "Top hospitals combine clinical practice with research. Publish papers, teach residents, and advance medical science." },
      { title: "PR Priority Status", desc: "Specialist doctors get the fastest PR processing in every country. Some nations have dedicated health worker visa streams." },
    ],
    faqs: [
      { q: "What's the difference between MD and MS?", a: "MD is a non-surgical specialty (Medicine) — Internal Medicine, Pediatrics, Radiology, etc. MS is a surgical specialty — General Surgery, Orthopedics, Neurosurgery, etc." },
      { q: "Can I do MD/MS directly after MBBS abroad?", a: "Yes, in most countries. USA requires USMLE Steps 1 & 2 + residency match. UK has PLAB or MRCP pathway. Germany requires Approbation (medical license)." },
      { q: "Which MD/MS specialization has the best ROI?", a: "Radiology, Dermatology, and Orthopedic Surgery offer the best salary-to-training-time ratio. Neurosurgery and Cardiac Surgery have the highest absolute salaries but longest training." },
    ],
  },
  {
    id: "MDS", label: "MDS (Dental)", shortLabel: "MDS",
    icon: Microscope, color: "text-cyan-600", bgColor: "bg-cyan-600", heroColor: "from-cyan-600 to-teal-700",
    tagline: "Perfect Smiles — Advanced Dental Specialization",
    description: "MDS (Master of Dental Surgery) is the postgraduate degree for dentists seeking specialization. Fields like Orthodontics, Oral Surgery, Periodontics, and Prosthodontics offer high income, regular hours, and excellent work-life balance — making dentistry one of the most satisfying medical careers.",
    whatYouStudy: ["Oral & Maxillofacial Surgery", "Orthodontics & Dentofacial Orthopedics", "Periodontics & Implantology", "Prosthodontics", "Endodontics", "Pediatric Dentistry"],
    avgTuition: "₹8L-30L/yr", avgSalary: "$120K-300K/yr", duration: "3 years", prScore: "8/10", demandLevel: "High",
    topCountries: ["USA", "Canada", "UK", "Australia", "Ireland"],
    careerPaths: [
      { role: "Oral & Maxillofacial Surgeon", salaryUSA: "$250-400K", salaryCanada: "CAD 200-350K", salaryUK: "£100-180K", salaryGermany: "€120-220K", companies: ["Mayo Clinic", "Cleveland Clinic", "Private Practice"] },
      { role: "Orthodontist", salaryUSA: "$200-350K", salaryCanada: "CAD 180-300K", salaryUK: "£80-150K", salaryGermany: "€100-180K", companies: ["SmileDirectClub", "Invisalign", "Private Practice"] },
      { role: "Periodontist", salaryUSA: "$180-300K", salaryCanada: "CAD 160-280K", salaryUK: "£70-130K", salaryGermany: "€90-160K", companies: ["Private Practice", "Dental Chains", "Academic Hospitals"] },
      { role: "Prosthodontist", salaryUSA: "$180-280K", salaryCanada: "CAD 160-260K", salaryUK: "£70-120K", salaryGermany: "€90-150K", companies: ["Private Practice", "Implant Centers", "Dental Labs"] },
    ],
    whyThisMajor: [
      { title: "Best Work-Life Balance", desc: "Dentists work predictable hours with minimal emergency calls. Earn $150K-400K with a 9-to-5 schedule." },
      { title: "Own Your Practice", desc: "Dentistry has the highest rate of private practice ownership. Be your own boss and build equity." },
      { title: "High Income Potential", desc: "Specialist dentists (Orthodontists, Oral Surgeons) earn among the highest in healthcare." },
      { title: "Growing Cosmetic Demand", desc: "Smile makeovers, implants, and clear aligners are booming. Cosmetic dentistry is a $30B+ industry." },
    ],
    faqs: [
      { q: "Do I need BDS before MDS abroad?", a: "Yes, MDS requires a BDS (Bachelor of Dental Surgery) or equivalent. Some countries accept BDS graduates directly into specialty programs." },
      { q: "Which MDS specialization earns the most?", a: "Oral & Maxillofacial Surgery and Orthodontics are the highest-paid. Both require 3-4 years of additional training post-BDS." },
      { q: "Can Indian BDS graduates practice abroad?", a: "Yes, but licensing requirements vary. USA requires NBDE + DDS equivalency. UK requires ORE. Canada requires NDEB. Each takes 1-3 years." },
    ],
  },
  {
    id: "Nursing", label: "Nursing", shortLabel: "Nursing",
    icon: HeartPulse, color: "text-pink-600", bgColor: "bg-pink-600", heroColor: "from-pink-600 to-rose-700",
    tagline: "Care for the World — In-Demand, Respected, Rewarding",
    description: "Nursing is the #1 occupation in shortage worldwide. Canada alone needs 200,000+ nurses by 2030. Nursing offers guaranteed employment, fast-track PR, and the chance to make a real difference. Specializations like Nurse Practitioner and CRNA earn doctor-level salaries.",
    whatYouStudy: ["Patient Care & Clinical Skills", "Pharmacology & Pathophysiology", "Community Health Nursing", "Pediatric & Geriatric Care", "Mental Health Nursing", "Nursing Leadership & Management"],
    avgTuition: "₹8L-25L/yr", avgSalary: "$70K-200K/yr", duration: "2-4 years", prScore: "10/10", demandLevel: "Critical Shortage",
    topCountries: ["Canada", "Australia", "UK", "Ireland", "USA", "Germany"],
    careerPaths: [
      { role: "Registered Nurse (RN)", salaryUSA: "$75-110K", salaryCanada: "CAD 80-110K", salaryUK: "£30-45K", salaryGermany: "€45-65K", companies: ["NHS", "Kaiser", "Mayo Clinic", "Mount Sinai"] },
      { role: "Nurse Practitioner", salaryUSA: "$120-160K", salaryCanada: "CAD 110-150K", salaryUK: "£50-80K", salaryGermany: "€70-100K", companies: ["Kaiser", "Cleveland Clinic", "Johns Hopkins"] },
      { role: "CRNA (Anesthetist)", salaryUSA: "$200-250K", salaryCanada: "CAD 180-220K", salaryUK: "£80-120K", salaryGermany: "€100-150K", companies: ["Hospital Networks", "Surgical Centers", "VA Hospitals"] },
      { role: "Nursing Director", salaryUSA: "$130-180K", salaryCanada: "CAD 120-160K", salaryUK: "£60-95K", salaryGermany: "€80-120K", companies: ["Hospital Systems", "Aged Care", "Govt Health"] },
    ],
    whyThisMajor: [
      { title: "#1 PR Occupation", desc: "Nurses get the fastest PR processing in Canada (PNP), Australia (189/190), UK (Health & Care Visa), and Ireland." },
      { title: "100% Job Placement", desc: "Nursing graduates are hired before they graduate in most countries. Signing bonuses of $10K-25K are common." },
      { title: "CRNA = Doctor Salary", desc: "Certified Registered Nurse Anesthetists earn $200K+ in the USA — more than many doctors." },
      { title: "Global Mobility", desc: "Nursing qualifications are recognized worldwide through reciprocity agreements. Work in any country." },
    ],
    faqs: [
      { q: "Can I become a nurse with a non-nursing bachelor's degree?", a: "Yes! Accelerated BSN programs (12-18 months) accept graduates from any field. This is the fastest pathway to nursing." },
      { q: "Which country needs nurses the most?", a: "Canada (200K+ shortage), Australia (100K+), UK (40K+), and Ireland (all actively recruiting internationally)." },
      { q: "Do I need NCLEX for all countries?", a: "NCLEX is for USA/Canada. UK requires NMC registration. Australia requires AHPRA. Ireland requires NMBI. Each has its own exam." },
      { q: "Can my spouse work if I'm a nurse?", a: "Yes, in most countries. Canada and Australia offer open work permits for nurse spouses. UK offers dependent visas." },
    ],
  },
  {
    id: "Pharmacy", label: "Pharmacy", shortLabel: "Pharmacy",
    icon: Pill, color: "text-emerald-600", bgColor: "bg-emerald-600", heroColor: "from-emerald-600 to-green-700",
    tagline: "The Science of Medicines — Research, Formulate, Dispense",
    description: "Pharmacy bridges chemistry, biology, and healthcare. Pharmacists are medication experts who ensure safe drug use, develop new treatments, and advise healthcare teams. With aging populations and expanding pharmaceutical industries, demand for pharmacists and pharmaceutical researchers is growing rapidly.",
    whatYouStudy: ["Pharmaceutical Chemistry", "Pharmacology & Toxicology", "Clinical Pharmacy", "Drug Formulation & Delivery", "Pharmaceutical Analysis", "Regulatory Affairs"],
    avgTuition: "₹10L-25L/yr", avgSalary: "$90K-180K/yr", duration: "2-4 years", prScore: "8/10", demandLevel: "High",
    topCountries: ["USA", "Canada", "UK", "Australia", "Ireland", "Germany"],
    careerPaths: [
      { role: "Clinical Pharmacist", salaryUSA: "$120-160K", salaryCanada: "CAD 100-140K", salaryUK: "£45-70K", salaryGermany: "€55-85K", companies: ["CVS Health", "Walgreens", "Hospital Pharmacies"] },
      { role: "Pharmaceutical Researcher", salaryUSA: "$100-160K", salaryCanada: "CAD 85-130K", salaryUK: "£40-70K", salaryGermany: "€50-85K", companies: ["Pfizer", "Novartis", "Roche", "AstraZeneca"] },
      { role: "Regulatory Affairs Manager", salaryUSA: "$110-160K", salaryCanada: "CAD 95-135K", salaryUK: "£50-80K", salaryGermany: "€60-95K", companies: ["FDA", "EMA", "TGA", "Pharma Co"] },
      { role: "Pharmacovigilance Specialist", salaryUSA: "$90-140K", salaryCanada: "CAD 75-110K", salaryUK: "£38-60K", salaryGermany: "€45-75K", companies: ["ICON", "IQVIA", "Parexel", "Covance"] },
    ],
    whyThisMajor: [
      { title: "Pharma Boom", desc: "Post-COVID, pharmaceutical companies are investing record amounts in R&D. New drug approvals are at an all-time high." },
      { title: "Diverse Career Paths", desc: "From clinical practice to research, regulatory affairs to pharmacovigilance — pharmacy offers many directions." },
      { title: "Work-Life Balance", desc: "Clinical pharmacy offers predictable hours. Research roles offer academic flexibility. Best of both worlds." },
      { title: "PR Eligible", desc: "Pharmacists are on Canada's NOC list, Australia's MLTSSL, and UK's shortage occupation list." },
    ],
    faqs: [
      { q: "What's the difference between B.Pharm and Pharm.D?", a: "B.Pharm is a 4-year undergraduate degree. Pharm.D is a 6-year doctoral degree (more clinical focus, patient-facing). Pharm.D is preferred for clinical roles in USA/Canada." },
      { q: "Can I work in pharma R&D with a pharmacy degree?", a: "Yes! M.Pharm and PhD Pharmacy graduates work in drug discovery, formulation, clinical trials, and regulatory affairs at top pharma companies." },
      { q: "Is pharmacy a good alternative to MBBS?", a: "Yes, for those interested in medicines rather than surgery. Shorter training, good salaries ($100K+), better work-life balance, and strong PR prospects." },
    ],
  },
  {
    id: "Biotech", label: "Biotechnology", shortLabel: "Biotech",
    icon: Dna, color: "text-teal-600", bgColor: "bg-teal-600", heroColor: "from-teal-600 to-emerald-700",
    tagline: "Engineer Life — Genes, Cells, Cures",
    description: "Biotechnology is where biology meets technology to solve humanity's biggest challenges — from developing vaccines and gene therapies to creating sustainable biofuels and genetically modified crops. The field has exploded post-COVID, with biotech startups raising record funding and pharma giants investing billions in cell and gene therapy.",
    whatYouStudy: ["Genetic Engineering & CRISPR", "Cell & Tissue Culture", "Bioinformatics & Computational Biology", "Immunology & Vaccinology", "Bioprocess Engineering", "Drug Discovery & Development"],
    avgTuition: "₹10L-28L/yr", avgSalary: "$80K-160K/yr", duration: "1-2 years (PG)", prScore: "8/10", demandLevel: "Very High",
    topCountries: ["USA", "Germany", "UK", "Ireland", "Canada", "Singapore"],
    careerPaths: [
      { role: "Biotech Research Scientist", salaryUSA: "$90-150K", salaryCanada: "CAD 75-120K", salaryUK: "£40-70K", salaryGermany: "€50-85K", companies: ["Genentech", "Amgen", "Biogen", "Regeneron"] },
      { role: "Gene Therapy Specialist", salaryUSA: "$110-180K", salaryCanada: "CAD 90-145K", salaryUK: "£50-85K", salaryGermany: "€60-100K", companies: ["Novartis Gene", "Bluebird Bio", "Sarepta", "Spark"] },
      { role: "Bioinformatics Analyst", salaryUSA: "$100-160K", salaryCanada: "CAD 85-130K", salaryUK: "£45-75K", salaryGermany: "€55-90K", companies: ["Illumina", "10x Genomics", "BGI", "Broad Institute"] },
      { role: "Clinical Research Associate", salaryUSA: "$80-130K", salaryCanada: "CAD 70-105K", salaryUK: "£35-60K", salaryGermany: "€45-75K", companies: ["IQVIA", "ICON", "Parexel", "Syneos"] },
    ],
    whyThisMajor: [
      { title: "Post-COVID Boom", desc: "mRNA vaccines, gene therapies, and cell therapies have created a golden age for biotech. $100B+ invested annually." },
      { title: "Cure Diseases", desc: "Work on therapies that cure genetic diseases, cancer, and rare disorders. CRISPR gene editing is revolutionizing medicine." },
      { title: "Ireland's Pharma Hub", desc: "Ireland hosts 9 of the top 10 pharma companies. Biotech graduates have direct access to Pfizer, J&J, Roche, and more." },
      { title: "Research + Entrepreneurship", desc: "Biotech has the highest rate of academic spin-offs. Start your own biotech company with a breakthrough discovery." },
    ],
    faqs: [
      { q: "What's the difference between Biotech and Biomedical Science?", a: "Biotech focuses on using living organisms/technology to develop products (drugs, vaccines, biofuels). Biomedical Science focuses on understanding disease mechanisms and diagnostics." },
      { q: "Do I need a PhD for biotech jobs?", a: "Not necessarily. MS graduates work in industry R&D, QA, and clinical research. PhD is needed for lead scientist roles and academia." },
      { q: "Which country is best for biotech?", a: "USA (Boston, SF) for startups & highest salaries. Ireland for pharma industry access. Germany for research excellence. Singapore for APAC hub." },
    ],
  },
  {
    id: "Mgmt", label: "Management", shortLabel: "Management",
    icon: Building2, color: "text-slate-700", bgColor: "bg-slate-700", heroColor: "from-slate-700 to-gray-800",
    tagline: "Lead Organizations — Strategy, Operations, People",
    description: "Management education equips you with the skills to lead teams, optimize operations, and drive business strategy. From MBA programs at world-renowned institutions to specialized Master's in Supply Chain, HR, and International Business — management graduates are the backbone of every successful organization.",
    whatYouStudy: ["Strategic Management & Leadership", "Marketing & Brand Management", "Operations & Supply Chain", "Human Resource Management", "Finance & Accounting for Managers", "Entrepreneurship & Innovation"],
    avgTuition: "₹15L-45L/yr", avgSalary: "$70K-150K/yr", duration: "1-2 years", prScore: "6/10", demandLevel: "Moderate",
    topCountries: ["USA", "UK", "Canada", "Australia", "Germany", "Ireland"],
    careerPaths: [
      { role: "Management Consultant", salaryUSA: "$100-180K", salaryCanada: "CAD 85-140K", salaryUK: "£50-90K", salaryGermany: "€60-100K", companies: ["McKinsey", "BCG", "Bain", "Deloitte"] },
      { role: "Product Manager", salaryUSA: "$120-190K", salaryCanada: "CAD 100-155K", salaryUK: "£55-95K", salaryGermany: "€65-105K", companies: ["Google", "Meta", "Amazon", "Spotify"] },
      { role: "Operations Manager", salaryUSA: "$90-140K", salaryCanada: "CAD 75-120K", salaryUK: "£45-75K", salaryGermany: "€55-85K", companies: ["Amazon", "FedEx", "DHL", "UPS"] },
      { role: "HR Director", salaryUSA: "$120-180K", salaryCanada: "CAD 100-145K", salaryUK: "£60-100K", salaryGermany: "€70-110K", companies: ["Deloitte", "Mercer", "Randstad", "Adecco"] },
    ],
    whyThisMajor: [
      { title: "Versatile Career", desc: "Management skills transfer across every industry. Tech, healthcare, finance, manufacturing — everyone needs managers." },
      { title: "MBA = Career Accelerator", desc: "Top MBA graduates see 2-3x salary increases. Average ROI on a top MBA is 300-500% over 10 years." },
      { title: "Entrepreneurship", desc: "Management education teaches you to start, fund, and scale businesses. Many founders are MBA graduates." },
      { title: "Global Network", desc: "MBA programs build lifelong networks. Your classmates become CEOs, founders, and industry leaders." },
    ],
    faqs: [
      { q: "Do I need work experience for an MBA?", a: "Top programs (Harvard, Stanford, INSEAD) require 3-5 years. Many good programs accept fresh graduates or those with 1-2 years experience." },
      { q: "GMAT or GRE for MBA?", a: "GMAT is preferred for MBA. GRE is accepted by most programs too. Some European programs waive GMAT for strong profiles." },
      { q: "Is MBA worth it for PR?", a: "MBA alone is moderate for PR. Combine it with STEM-designation (Business Analytics, FinTech) for much better PR prospects." },
    ],
  },
  {
    id: "Accts", label: "Accounting", shortLabel: "Accounting",
    icon: Calculator, color: "text-amber-700", bgColor: "bg-amber-700", heroColor: "from-amber-600 to-yellow-700",
    tagline: "The Language of Business — CPA, ACCA, CMA Pathways",
    description: "Accounting is the foundation of every business. Professional accounting qualifications (CPA, ACCA, CMA) are globally recognized and open doors to high-paying roles in audit, taxation, financial planning, and corporate finance. Countries like Canada and Australia actively recruit accountants through their PR pathways.",
    whatYouStudy: ["Financial & Management Accounting", "Audit & Assurance", "Taxation (Domestic & International)", "Corporate Finance", "Financial Reporting Standards", "Business Law & Ethics"],
    avgTuition: "₹8L-20L/yr", avgSalary: "$60K-130K/yr", duration: "1-2 years", prScore: "9/10", demandLevel: "Very High",
    topCountries: ["Canada", "Australia", "Ireland", "UK", "USA", "New Zealand"],
    careerPaths: [
      { role: "CPA / Chartered Accountant", salaryUSA: "$90-140K", salaryCanada: "CAD 80-130K", salaryUK: "£45-80K", salaryGermany: "€55-90K", companies: ["Big 4 (Deloitte, PwC, EY, KPMG)", "Grant Thornton", "BDO"] },
      { role: "Financial Analyst", salaryUSA: "$80-130K", salaryCanada: "CAD 70-110K", salaryUK: "£40-70K", salaryGermany: "€50-80K", companies: ["Goldman Sachs", "JP Morgan", "Barclays", "HSBC"] },
      { role: "Tax Consultant", salaryUSA: "$85-135K", salaryCanada: "CAD 75-115K", salaryUK: "£42-75K", salaryGermany: "€52-85K", companies: ["Deloitte Tax", "PwC Tax", "EY Tax", "KPMG Tax"] },
      { role: "Internal Auditor", salaryUSA: "$80-120K", salaryCanada: "CAD 70-105K", salaryUK: "£40-65K", salaryGermany: "€48-78K", companies: [" Banks", "Manufacturing", "Tech Companies", "Retail Chains"] },
    ],
    whyThisMajor: [
      { title: "PR Fast-Track", desc: "Accountants are on Canada's NOC list, Australia's MLTSSL, and Ireland's Critical Skills list. PR processing is prioritized." },
      { title: "Global Qualifications", desc: "CPA (USA), ACCA (UK), CA (Australia) are recognized worldwide. Your qualification travels with you." },
      { title: "Recession-Proof", desc: "Businesses always need accountants. Even during downturns, accounting roles remain stable." },
      { title: "Big 4 Gateway", desc: "Deloitte, PwC, EY, KPMG recruit thousands of international accounting graduates annually." },
    ],
    faqs: [
      { q: "CPA vs ACCA — which is better?", a: "CPA (USA) is best for North America. ACCA is recognized in 180+ countries and better for UK/Commonwealth. Many accountants pursue both." },
      { q: "Can I do CPA after B.Com from India?", a: "Yes, Indian B.Com graduates are eligible for CPA (USA) after completing additional credits (120-150 credit hours). Many do M.Com or bridge courses." },
      { q: "What's the salary difference between CPA and non-CPA?", a: "CPA holders earn 30-50% more than non-certified accountants. In the US, that's $30-50K more annually." },
    ],
  },
  {
    id: "Arts", label: "Arts & Humanities", shortLabel: "Arts",
    icon: Palette, color: "text-indigo-600", bgColor: "bg-indigo-600", heroColor: "from-indigo-600 to-purple-700",
    tagline: "Think Critically — History, Literature, Philosophy, Psychology",
    description: "Arts & Humanities develops critical thinking, communication, and cultural understanding — skills that are increasingly valuable in our complex world. Graduates pursue careers in education, publishing, media, international relations, counseling, and public policy. Combined with digital skills, arts graduates are highly employable.",
    whatYouStudy: ["Literature & Linguistics", "History & Archaeology", "Philosophy & Ethics", "Psychology & Sociology", "Political Science & IR", "Digital Humanities"],
    avgTuition: "₹8L-20L/yr", avgSalary: "$50K-100K/yr", duration: "1-2 years", prScore: "5/10", demandLevel: "Moderate",
    topCountries: ["UK", "USA", "Canada", "Australia", "Ireland"],
    careerPaths: [
      { role: "University Lecturer", salaryUSA: "$60-100K", salaryCanada: "CAD 55-90K", salaryUK: "£35-60K", salaryGermany: "€45-75K", companies: ["Universities", "Colleges", "Research Institutes"] },
      { role: "Content Strategist", salaryUSA: "$70-120K", salaryCanada: "CAD 60-100K", salaryUK: "£35-65K", salaryGermany: "€45-75K", companies: ["Netflix", "Spotify", "Publishers", "Media Co"] },
      { role: "UX Researcher", salaryUSA: "$90-150K", salaryCanada: "CAD 75-120K", salaryUK: "£45-80K", salaryGermany: "€55-90K", companies: ["Google", "Meta", "Apple", "Airbnb"] },
      { role: "Policy Analyst", salaryUSA: "$70-110K", salaryCanada: "CAD 60-95K", salaryUK: "£35-60K", salaryGermany: "€45-75K", companies: ["Govt", "Think Tanks", "UN", "NGOs"] },
    ],
    whyThisMajor: [
      { title: "Develop Transferable Skills", desc: "Critical thinking, research, writing, and communication — skills every employer values, regardless of industry." },
      { title: "UX & Digital Careers", desc: "Arts + UX/UI = high-paying tech careers. UX Researchers at Google/Meta earn $100K-150K+." },
      { title: "Academic & Research Path", desc: "Pursue PhD and become a professor or researcher. Tenure-track positions offer stability and intellectual freedom." },
      { title: "Government & NGOs", desc: "Policy analysts, diplomats, and international development roles value humanities backgrounds." },
    ],
    faqs: [
      { q: "Are arts graduates employable?", a: "Yes — especially when combined with digital skills. Arts + UX, Arts + Data, Arts + Marketing are powerful combinations." },
      { q: "Which arts specialization has the best salary?", a: "Psychology (clinical/counseling), Digital Humanities, and UX Research offer the highest salaries. Psychology PhDs can earn $100K+." },
      { q: "Can arts graduates get PR?", a: "Direct PR from arts roles is challenging. Better approach: combine with teaching qualification (high PR demand) or pivot to UX/digital roles." },
    ],
  },
  {
    id: "Fashion", label: "Fashion & Design", shortLabel: "Fashion",
    icon: Shirt, color: "text-fuchsia-600", bgColor: "bg-fuchsia-600", heroColor: "from-fuchsia-600 to-pink-700",
    tagline: "Create Trends — Design, Style, Inspire",
    description: "Fashion & Design combines creativity with commercial acumen. From haute couture in Milan to sustainable fashion in Amsterdam, the industry is evolving rapidly. Programs blend design, business, marketing, and technology — preparing graduates for roles in design houses, luxury brands, retail, and entrepreneurship.",
    whatYouStudy: ["Fashion Design & Illustration", "Textile Science & Technology", "Pattern Making & Garment Construction", "Fashion Marketing & Branding", "Sustainable Fashion", "Digital Fashion & CAD"],
    avgTuition: "₹12L-30L/yr", avgSalary: "$50K-120K/yr", duration: "1-3 years", prScore: "5/10", demandLevel: "Moderate",
    topCountries: ["Italy", "UK", "France", "USA", "Australia"],
    careerPaths: [
      { role: "Fashion Designer", salaryUSA: "$60-120K", salaryCanada: "CAD 50-100K", salaryUK: "£30-65K", salaryGermany: "€40-80K", companies: ["Gucci", "Prada", "Zara", "H&M"] },
      { role: "Brand Manager (Luxury)", salaryUSA: "$90-150K", salaryCanada: "CAD 75-120K", salaryUK: "£50-90K", salaryGermany: "€60-100K", companies: ["LVMH", "Kering", "Richemont", "Hermès"] },
      { role: "Textile Technologist", salaryUSA: "$70-110K", salaryCanada: "CAD 60-95K", salaryUK: "£35-60K", salaryGermany: "€45-75K", companies: [" technical textiles", "Sportswear brands", "Automotive textiles"] },
      { role: "Fashion Buyer", salaryUSA: "$70-120K", salaryCanada: "CAD 60-100K", salaryUK: "£35-70K", salaryGermany: "€45-80K", companies: ["Net-a-Porter", "SSENSE", "MyTheresa", "Farfetch"] },
    ],
    whyThisMajor: [
      { title: "Creative Fulfillment", desc: "Turn your creative passion into a career. Design clothes that people wear and love." },
      { title: "Global Industry", desc: "Fashion is a $2.5 trillion industry. Work in Milan, Paris, London, New York — the world's fashion capitals." },
      { title: "Sustainable Revolution", desc: "Sustainable fashion is the fastest-growing segment. Brands need designers who understand eco-friendly materials." },
      { title: "Entrepreneurship", desc: "Start your own label. Many successful designers (Ritu Kumar, Sabyasachi) built empires from small studios." },
    ],
    faqs: [
      { q: "Do I need a fashion degree to work in fashion?", a: "Not strictly, but a degree from a reputed school (Parsons, Central Saint Martins, Polimoda) opens doors to top brands and provides industry connections." },
      { q: "Which country is best for fashion design?", a: "Italy (Politecnico Milano, Polimoda) for luxury. UK (Central Saint Martins) for avant-garde. France for haute couture." },
      { q: "What's the portfolio requirement?", a: "Most programs require a design portfolio showing sketches, illustrations, and any garment work. Start building early." },
    ],
  },
  {
    id: "Hotel", label: "Hotel Management", shortLabel: "Hotel Mgmt",
    icon: Utensils, color: "text-sky-600", bgColor: "bg-sky-600", heroColor: "from-sky-600 to-blue-700",
    tagline: "Hospitality Excellence — Manage Luxury, Create Experiences",
    description: "Hotel Management prepares you to lead in the global hospitality industry — hotels, resorts, cruise lines, event management, and luxury travel. Programs blend operations, marketing, finance, and service excellence. With tourism rebounding post-COVID, the industry needs skilled managers who can deliver world-class guest experiences.",
    whatYouStudy: ["Hotel Operations & Front Office", "Food & Beverage Management", "Revenue Management & Pricing", "Event & Conference Management", "Hospitality Marketing", "Luxury Service Excellence"],
    avgTuition: "₹8L-25L/yr", avgSalary: "$50K-120K/yr", duration: "1-3 years", prScore: "6/10", demandLevel: "Moderate",
    topCountries: ["Switzerland", "Australia", "Canada", "UAE", "UK", "USA"],
    careerPaths: [
      { role: "Hotel General Manager", salaryUSA: "$80-150K", salaryCanada: "CAD 70-120K", salaryUK: "£45-85K", salaryGermany: "€55-100K", companies: ["Marriott", "Hilton", "Four Seasons", "Hyatt"] },
      { role: "Event Manager", salaryUSA: "$60-110K", salaryCanada: "CAD 55-95K", salaryUK: "£30-60K", salaryGermany: "€40-70K", companies: ["Eventbrite", "Cvent", "Freeman", "Live Nation"] },
      { role: "Revenue Manager", salaryUSA: "$70-120K", salaryCanada: "CAD 60-100K", salaryUK: "£35-70K", salaryGermany: "€45-80K", companies: ["Marriott", "IHG", "Accor", "Airbnb"] },
      { role: "Luxury Travel Consultant", salaryUSA: "$60-100K", salaryCanada: "CAD 50-85K", salaryUK: "£30-55K", salaryGermany: "€40-70K", companies: ["Virtuoso", "Signature", "Internova", "BCD Travel"] },
    ],
    whyThisMajor: [
      { title: "Global Mobility", desc: "Hospitality skills are universal. Work in Maldives, Dubai, Switzerland, Caribbean — anywhere tourists go." },
      { title: "Tourism Recovery", desc: "Post-COVID tourism is booming. Hotels and resorts are hiring aggressively. Career prospects are excellent." },
      { title: "Diverse Career Paths", desc: "Hotels, cruise lines, airlines, event management, luxury retail, casinos — hospitality opens many doors." },
      { title: "Switzerland = Gold Standard", desc: "Swiss hotel schools (EHL, Glion, Les Roches) are the world's best. Graduates are recruited globally." },
    ],
    faqs: [
      { q: "Is hotel management only about hotels?", a: "No! Graduates work in airlines, cruise lines, event management, luxury retail, corporate hospitality, and even consulting." },
      { q: "Which is the best hotel management school?", a: "EHL (Switzerland) is ranked #1 globally. Glion, Les Roches, Cornell (USA), and Blue Mountains (Australia) are also top-tier." },
      { q: "What's the work schedule like?", desc: "Hospitality involves shifts, weekends, and holidays. Senior management roles have more regular hours. The industry rewards dedication with rapid promotion." },
    ],
  },
  {
    id: "Journalism", label: "Journalism", shortLabel: "Journalism",
    icon: Newspaper, color: "text-yellow-700", bgColor: "bg-yellow-700", heroColor: "from-yellow-600 to-amber-700",
    tagline: "Tell Stories — Report, Investigate, Inspire Change",
    description: "Journalism is the backbone of democracy. From investigative reporting to digital storytelling, journalists shape public discourse and hold power accountable. Modern journalism programs blend traditional reporting with digital media, data journalism, and multimedia production — preparing graduates for the evolving media landscape.",
    whatYouStudy: ["News Reporting & Writing", "Investigative Journalism", "Digital & Multimedia Journalism", "Broadcast Journalism", "Data Journalism", "Media Ethics & Law"],
    avgTuition: "₹8L-22L/yr", avgSalary: "$45K-100K/yr", duration: "1-2 years", prScore: "4/10", demandLevel: "Low",
    topCountries: ["UK", "USA", "Australia", "Canada"],
    careerPaths: [
      { role: "Journalist / Reporter", salaryUSA: "$50-90K", salaryCanada: "CAD 45-80K", salaryUK: "£25-50K", salaryGermany: "€35-65K", companies: ["BBC", "NYT", "Reuters", "The Guardian"] },
      { role: "Digital Content Creator", salaryUSA: "$60-110K", salaryCanada: "CAD 50-90K", salaryUK: "£30-60K", salaryGermany: "€40-70K", companies: ["BuzzFeed", "Vox", "Vice", "Substack"] },
      { role: "Communications Director", salaryUSA: "$90-150K", salaryCanada: "CAD 75-120K", salaryUK: "£50-90K", salaryGermany: "€60-100K", companies: ["Corporates", "NGOs", "Govt", "Agencies"] },
      { role: "PR Specialist", salaryUSA: "$60-100K", salaryCanada: "CAD 50-85K", salaryUK: "£30-55K", salaryGermany: "€40-70K", companies: ["Edelman", "Weber Shandwick", "FleishmanHillard", "Ketchum"] },
    ],
    whyThisMajor: [
      { title: "Democracy's Watchdog", desc: "Journalism holds power accountable. Investigative journalists have exposed corruption, changed laws, and saved lives." },
      { title: "Digital Evolution", desc: "Modern journalism spans podcasts, newsletters, YouTube, and social media. New formats create new career opportunities." },
      { title: "Content Skills Transfer", desc: "Writing, research, and storytelling skills are valued in marketing, PR, corporate communications, and tech." },
      { title: "Freelance Freedom", desc: "Many journalists build independent brands through Substack, Patreon, and YouTube — earning $100K+ with full autonomy." },
    ],
    faqs: [
      { q: "Is journalism a dying field?", a: "Traditional print journalism is declining, but digital journalism is booming. Data journalism, multimedia storytelling, and niche newsletters are growing rapidly." },
      { q: "What skills do I need beyond writing?", a: "Video editing, data analysis, social media, SEO, and basic coding (for data journalism). The more skills, the more employable." },
      { q: "Can journalism lead to PR/marketing?", a: "Absolutely! Many journalists transition to PR, content marketing, and corporate communications. The storytelling skills transfer perfectly." },
    ],
  },
  {
    id: "Media", label: "Films & Media", shortLabel: "Films & Media",
    icon: Clapperboard, color: "text-purple-600", bgColor: "bg-purple-600", heroColor: "from-purple-600 to-indigo-700",
    tagline: "Create Content — Film, TV, Digital, Games",
    description: "Films & Media covers the entire spectrum of content creation — filmmaking, television production, animation, game design, and digital media. With streaming platforms (Netflix, Amazon, Disney+) investing billions in original content, demand for skilled media professionals has never been higher. Programs blend creative craft with technical skills and industry knowledge.",
    whatYouStudy: ["Film Direction & Production", "Screenwriting & Storytelling", "Cinematography & Editing", "Animation & VFX", "Game Design & Development", "Media Business & Distribution"],
    avgTuition: "₹10L-30L/yr", avgSalary: "$50K-150K/yr", duration: "1-3 years", prScore: "5/10", demandLevel: "Moderate",
    topCountries: ["USA", "UK", "Canada", "Australia", "South Korea"],
    careerPaths: [
      { role: "Film / TV Producer", salaryUSA: "$70-150K", salaryCanada: "CAD 60-120K", salaryUK: "£40-85K", salaryGermany: "€50-100K", companies: ["Netflix", "Amazon Studios", "BBC", "Warner Bros"] },
      { role: "VFX Artist", salaryUSA: "$70-130K", salaryCanada: "CAD 60-110K", salaryUK: "£35-70K", salaryGermany: "€45-85K", companies: ["ILM", "Weta", "Framestore", "DNEG"] },
      { role: "Game Designer", salaryUSA: "$80-140K", salaryCanada: "CAD 70-115K", salaryUK: "£40-75K", salaryGermany: "€50-90K", companies: ["Ubisoft", "EA", "Rockstar", "Naughty Dog"] },
      { role: "Content Strategist (Media)", salaryUSA: "$80-130K", salaryCanada: "CAD 65-105K", salaryUK: "£40-70K", salaryGermany: "€50-85K", companies: ["Spotify", "YouTube", "TikTok", "Netflix"] },
    ],
    whyThisMajor: [
      { title: "Streaming Boom", desc: "Netflix, Disney+, Amazon spent $100B+ on content in 2024. Every platform needs producers, editors, VFX artists, and writers." },
      { title: "Global Creative Career", desc: "Film and media skills travel. Work on productions in Hollywood, Bollywood, London, Seoul, or remotely from anywhere." },
      { title: "Game Industry Growth", desc: "Gaming is a $200B industry — larger than film and music combined. Game designers and developers are in massive demand." },
      { title: "AI + Media", desc: "AI is transforming content creation. Learn to use AI tools for editing, VFX, and production — stay ahead of the curve." },
    ],
    faqs: [
      { q: "Do I need a film degree to work in film?", a: "Not required, but film school provides equipment, networking, and mentorship. Many successful filmmakers are self-taught too." },
      { q: "Which country has the best film schools?", a: "USA (USC, NYU, AFI) for Hollywood. UK (NFTS, LFS) for indie/arthouse. Canada (VFS, Sheridan) for VFX/animation." },
      { q: "How do I build a portfolio?", a: "Start making short films, YouTube content, or indie games. Festivals (Sundance, TIFF, Cannes) accept student work. Build an online presence." },
    ],
  },
];

/* ═══════════════════════════════════════════
   DYNAMIC NAV DATA — Derived from sources above
   ═══════════════════════════════════════════ */

/** Destinations — from destinations.ts, sorted alphabetically */
export const NAV_DESTINATIONS = destinations
  .filter((d) => d.id !== "view-all")
  .map((d) => ({ label: d.name, href: `/destinations/${d.id}` }));

/** Courses — from courseTypes in courses.ts */
export const NAV_COURSES = courseTypes.map((c) => ({
  label: c.title,
  href: `/courses/${c.id}`,
}));

/** Majors — from ALL_MAJORS above */
export const NAV_MAJORS = ALL_MAJORS.map((m) => ({
  label: m.label,
  shortLabel: m.shortLabel,
  href: `/majors/${m.id}`,
  icon: m.icon,
}));

/** Exams — from ALL_EXAMS in exams.ts */
export const NAV_EXAMS = ALL_EXAMS.map((e) => ({
  label: e.name,
  href: `/exams/${e.id}`,
}));

/** Tools / Platform pages */
export const NAV_TOOLS = [
  { label: "Decision Engine", href: "/evaluate", tag: "Free" },
  { label: "Smart Match", href: "/smart-match" },
  { label: "Premium Bundle", href: "/premium", tag: "Popular" },
  { label: "Student Loans", href: "/student-loans", tag: "New" },
];

/** Resources */
export const NAV_RESOURCES = [
  { label: "Learning Hub", href: "/learn", tag: "New" },
  { label: "Parent's Corner", href: "/parents" },
];

/** Company pages */
export const NAV_COMPANY = [
  { label: "Vision", href: "/vision" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/* ═══════════════════════════════════════════
   HELPER: Get major info by ID
   ═══════════════════════════════════════════ */
export function getMajorInfo(id: string): MajorInfo | undefined {
  return ALL_MAJORS.find((m) => m.id === id);
}

export function getMajorLabel(id: string): string {
  return ALL_MAJORS.find((m) => m.id === id)?.label || id;
}

export function getMajorShortLabel(id: string): string {
  return ALL_MAJORS.find((m) => m.id === id)?.shortLabel || id;
}
