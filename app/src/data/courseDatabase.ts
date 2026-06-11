/* ═══════════════════════════════════════════════════════════════════
   COMPREHENSIVE COURSE DATABASE — 148 courses across 195 universities
   Extracted from university program data. Searchable by name, 
   description, level, country, field.
   ═══════════════════════════════════════════════════════════════════ */

export interface CourseEntry {
  name: string;
  level: "UG" | "PG" | "Diploma" | "PhD";
  category: string;        // e.g. "Engineering", "Business", "Medicine"
  duration: string;
  description: string;
  avgTuition: string;      // e.g. "$25K-35K/yr"
  feeRangeINR: string;     // e.g. "₹21L-29L/yr"
  fieldTags: string[];     // e.g. ["STEM", "Computer Science", "AI"]
  topCountries: string[];  // Countries offering this course
  careerRoles: string[];
  requirements: string[];  // General eligibility
  intakes: string[];
}

export const COURSE_CATEGORIES = [
  "All",
  "Engineering & Technology",
  "Computer Science & IT",
  "Business & Management",
  "Medicine & Healthcare",
  "Science & Research",
  "Arts & Humanities",
  "Law",
  "Finance & Accounting",
  "Data Science & Analytics",
  "Design & Media",
  "Hospitality & Tourism",
  "Education",
  "Environmental Science",
  "Social Sciences",
  "Nursing & Health Sciences",
  "PR Pathway Programs",
] as const;

export const LEVELS = ["All", "UG", "PG", "Diploma", "PhD"] as const;

/* ─── Helper to convert USD tuition to INR range ─── */
function usdToINR(usdStr: string): string {
  // e.g. "$25K-35K/yr" → "₹21L-29L/yr" (approx 1 USD = 83 INR)
  const match = usdStr.match(/\$(\d+)K-?(\d+)?K?/);
  if (!match) return usdStr;
  const low = Math.round(parseInt(match[1]) * 0.83);
  const high = match[2] ? Math.round(parseInt(match[2]) * 0.83) : low;
  return `₹${low}L${high !== low ? `-${high}L` : ""}/yr`;
}

/* ─── Main course database (148 courses) ─── */
export const courseDatabase: CourseEntry[] = [
  // ═══ UG — ENGINEERING & TECHNOLOGY ═══
  {
    name: "BS in Computer Science", level: "UG", category: "Computer Science & IT",
    duration: "4 Years", description: "Comprehensive CS program covering algorithms, systems, software engineering, AI, and ML. Strong industry placement.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Computer Science", "Programming", "Software Engineering"],
    topCountries: ["USA", "Canada", "UK", "Australia", "Germany", "Ireland"],
    careerRoles: ["Software Engineer", "Full-Stack Developer", "Systems Architect", "DevOps Engineer"],
    requirements: ["12th with 75%+ in PCM", "IELTS 6.5+ / TOEFL 90+", "SAT 1200+ (USA)"],
    intakes: ["Fall (Aug/Sep)", "Spring (Jan)"],
  },
  {
    name: "BS in Computer Science (CO-OP)", level: "UG", category: "Computer Science & IT",
    duration: "4-5 Years", description: "CS degree with paid co-op internships integrated. Graduate with 1-2 years of real work experience.",
    avgTuition: "$22K-45K/yr", feeRangeINR: "₹18L-37L/yr",
    fieldTags: ["STEM", "Computer Science", "CO-OP", "Work Experience"],
    topCountries: ["Canada", "USA"],
    careerRoles: ["Software Engineer", "ML Engineer", "Data Engineer", "Cloud Architect"],
    requirements: ["12th with 80%+ in PCM", "IELTS 6.5+", "Strong programming background"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Data Science", level: "UG", category: "Data Science & Analytics",
    duration: "4 Years", description: "Interdisciplinary program combining statistics, programming, and domain expertise. Heavy focus on real-world datasets.",
    avgTuition: "$28K-48K/yr", feeRangeINR: "₹23L-40L/yr",
    fieldTags: ["STEM", "Data Science", "Statistics", "Machine Learning"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Data Scientist", "Data Analyst", "BI Analyst", "Quantitative Analyst"],
    requirements: ["12th with 75%+ in Math", "IELTS 6.5+", "Programming basics preferred"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "BS in Electrical Engineering", level: "UG", category: "Engineering & Technology",
    duration: "4 Years", description: "Core electrical engineering with specializations in power systems, communications, VLSI, and embedded systems.",
    avgTuition: "$24K-45K/yr", feeRangeINR: "₹20L-37L/yr",
    fieldTags: ["STEM", "Electrical", "Electronics", "VLSI"],
    topCountries: ["USA", "Germany", "Canada", "UK", "Australia"],
    careerRoles: ["Electrical Engineer", "VLSI Designer", "Systems Engineer", "Hardware Engineer"],
    requirements: ["12th with 75%+ in PCM", "IELTS 6.5+", "Physics & Math strong"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Mechanical Engineering", level: "UG", category: "Engineering & Technology",
    duration: "4 Years", description: "Thermodynamics, fluid mechanics, materials science, robotics, and automotive engineering. Hands-on lab work.",
    avgTuition: "$24K-42K/yr", feeRangeINR: "₹20L-35L/yr",
    fieldTags: ["STEM", "Mechanical", "Automotive", "Robotics"],
    topCountries: ["Germany", "USA", "Canada", "UK", "Australia"],
    careerRoles: ["Mechanical Engineer", "Automotive Engineer", "Aerospace Engineer", "Design Engineer"],
    requirements: ["12th with 75%+ in PCM", "IELTS 6.5+", "Physics strong"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Civil Engineering", level: "UG", category: "Engineering & Technology",
    duration: "4 Years", description: "Structural engineering, geotechnical engineering, transportation, environmental engineering.",
    avgTuition: "$22K-38K/yr", feeRangeINR: "₹18L-32L/yr",
    fieldTags: ["STEM", "Civil", "Construction", "Structural"],
    topCountries: ["USA", "Canada", "Australia", "UK", "Germany"],
    careerRoles: ["Civil Engineer", "Structural Engineer", "Project Manager", "Urban Planner"],
    requirements: ["12th with 70%+ in PCM", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Aerospace Engineering", level: "UG", category: "Engineering & Technology",
    duration: "4 Years", description: "Aerodynamics, propulsion, flight mechanics, spacecraft design. Strong industry ties with NASA, Boeing, SpaceX.",
    avgTuition: "$28K-50K/yr", feeRangeINR: "₹23L-42L/yr",
    fieldTags: ["STEM", "Aerospace", "Aviation", "Space"],
    topCountries: ["USA", "UK", "Germany", "Canada"],
    careerRoles: ["Aerospace Engineer", "Flight Test Engineer", "Propulsion Engineer", "Systems Engineer"],
    requirements: ["12th with 85%+ in PCM", "IELTS 7.0+", "Strong Physics & Math"],
    intakes: ["Fall (Sep)"],
  },
    {
    name: "BEng in Biomedical Engineering", level: "UG", category: "Engineering & Technology",
    duration: "4 Years", description: "Intersection of engineering and medicine. Medical devices, imaging, biomechanics, tissue engineering.",
    avgTuition: "$26K-48K/yr", feeRangeINR: "₹22L-40L/yr",
    fieldTags: ["STEM", "Biomedical", "Medical Devices", "Healthcare"],
    topCountries: ["USA", "Canada", "Germany", "UK"],
    careerRoles: ["Biomedical Engineer", "Medical Device Developer", "Clinical Engineer", "Researcher"],
    requirements: ["12th with 80%+ in PCB/PCM", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
    // ═══ UG — BUSINESS ═══
  {
    name: "BS in Business Administration", level: "UG", category: "Business & Management",
    duration: "4 Years", description: "Management, marketing, finance, operations, entrepreneurship. Case-study based learning.",
    avgTuition: "$22K-55K/yr", feeRangeINR: "₹18L-46L/yr",
    fieldTags: ["Business", "Management", "Marketing", "Entrepreneurship"],
    topCountries: ["USA", "Canada", "UK", "Australia", "Netherlands"],
    careerRoles: ["Business Analyst", "Marketing Manager", "Product Manager", "Entrepreneur"],
    requirements: ["12th with 70%+", "IELTS 6.5+ / TOEFL 90+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "Bachelor of Commerce (BCom)", level: "UG", category: "Finance & Accounting",
    duration: "3-4 Years", description: "Accounting, economics, business law, taxation. Foundation for CA, CPA, ACCA.",
    avgTuition: "$18K-35K/yr", feeRangeINR: "₹15L-29L/yr",
    fieldTags: ["Commerce", "Accounting", "Finance", "Economics"],
    topCountries: ["Canada", "Australia", "UK", "New Zealand"],
    careerRoles: ["Accountant", "Financial Analyst", "Auditor", "Tax Consultant"],
    requirements: ["12th with 65%+ in Commerce", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
    // ═══ UG — MEDICINE & HEALTHCARE ═══
  {
    name: "BS in Nursing", level: "UG", category: "Nursing & Health Sciences",
    duration: "4 Years", description: "Clinical nursing, patient care, healthcare management. High demand globally, excellent PR pathway.",
    avgTuition: "$18K-35K/yr", feeRangeINR: "₹15L-29L/yr",
    fieldTags: ["Healthcare", "Nursing", "Clinical", "PR Pathway"],
    topCountries: ["Canada", "USA", "UK", "Australia", "Ireland"],
    careerRoles: ["Registered Nurse", "Nurse Practitioner", "Healthcare Manager", "Clinical Nurse"],
    requirements: ["12th with 75%+ in PCB", "IELTS 7.0+", "NEET (some countries)"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Biology (Pre-med)", level: "UG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Pre-medical track for students aiming for MD/DO. Molecular biology, genetics, anatomy.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Biology", "Pre-med", "Healthcare"],
    topCountries: ["USA", "Canada", "UK"],
    careerRoles: ["Medical Doctor (after MD)", "Research Scientist", "Biotechnologist", "Pharmacologist"],
    requirements: ["12th with 85%+ in PCB", "IELTS 7.0+", "MCAT for MD"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Pharmacy (Pre-PharmD)", level: "UG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Pharmaceutical sciences, drug development, clinical pharmacy. Pathway to PharmD.",
    avgTuition: "$22K-40K/yr", feeRangeINR: "₹18L-33L/yr",
    fieldTags: ["STEM", "Pharmacy", "Drug Development", "Healthcare"],
    topCountries: ["USA", "Canada", "UK", "Australia"],
    careerRoles: ["Pharmacist", "Drug Researcher", "Clinical Pharmacist", "Pharma Sales"],
    requirements: ["12th with 75%+ in PCB", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Medical Technology", level: "UG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Medical lab technology, diagnostic imaging, clinical laboratory science.",
    avgTuition: "$20K-38K/yr", feeRangeINR: "₹17L-32L/yr",
    fieldTags: ["Healthcare", "Medical Technology", "Diagnostics", "Lab Science"],
    topCountries: ["USA", "Canada", "Australia", "Philippines"],
    careerRoles: ["Medical Technologist", "Lab Manager", "Clinical Researcher", "QA Specialist"],
    requirements: ["12th with 70%+ in PCB", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Physical Therapy", level: "UG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Physiotherapy, rehabilitation, sports medicine. High demand in aging populations.",
    avgTuition: "$22K-40K/yr", feeRangeINR: "₹18L-33L/yr",
    fieldTags: ["Healthcare", "Physiotherapy", "Rehabilitation", "Sports Medicine"],
    topCountries: ["USA", "Canada", "Australia", "UK"],
    careerRoles: ["Physical Therapist", "Sports Therapist", "Rehabilitation Specialist", "Clinical Director"],
    requirements: ["12th with 75%+ in PCB", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "BS in Psychology", level: "UG", category: "Social Sciences",
    duration: "4 Years", description: "Clinical psychology, cognitive science, behavioral analysis, research methods.",
    avgTuition: "$20K-40K/yr", feeRangeINR: "₹17L-33L/yr",
    fieldTags: ["Social Science", "Psychology", "Clinical", "Research"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Psychologist", "HR Specialist", "Counselor", "Researcher"],
    requirements: ["12th with 70%+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "BS in Radiologic Technology", level: "UG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Medical imaging, X-rays, CT, MRI, radiation therapy. Technical healthcare field.",
    avgTuition: "$20K-35K/yr", feeRangeINR: "₹17L-29L/yr",
    fieldTags: ["Healthcare", "Radiology", "Imaging", "Medical Technology"],
    topCountries: ["USA", "Canada", "Australia"],
    careerRoles: ["Radiologic Technologist", "MRI Technician", "Radiation Therapist", "Imaging Specialist"],
    requirements: ["12th with 70%+ in PCB", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ UG — OTHER ═══
  {
    name: "LLB (Law)", level: "UG", category: "Law",
    duration: "3-4 Years", description: "Common law, constitutional law, contract law, criminal law. Bar exam preparation.",
    avgTuition: "$20K-50K/yr", feeRangeINR: "₹17L-42L/yr",
    fieldTags: ["Law", "Legal", "Litigation", "Corporate Law"],
    topCountries: ["UK", "Australia", "Canada", "Singapore"],
    careerRoles: ["Lawyer", "Barrister", "Corporate Counsel", "Legal Consultant"],
    requirements: ["12th with 80%+", "IELTS 7.0+", "LNAT (UK)"],
    intakes: ["Fall (Sep)"],
  },
        {
    name: "BSc in Environmental Science", level: "UG", category: "Environmental Science",
    duration: "4 Years", description: "Climate science, conservation, sustainability, environmental policy.",
    avgTuition: "$20K-38K/yr", feeRangeINR: "₹17L-32L/yr",
    fieldTags: ["Science", "Environment", "Sustainability", "Climate"],
    topCountries: ["Canada", "Australia", "UK", "Netherlands"],
    careerRoles: ["Environmental Consultant", "Conservation Scientist", "Policy Analyst", "ESG Specialist"],
    requirements: ["12th with 70%+ in PCB", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
    {
    name: "Advanced Diploma in Aerospace Engineering", level: "UG", category: "Engineering & Technology",
    duration: "3 Years", description: "Aircraft systems, aerodynamics, maintenance engineering. Hands-on training with industry partners.",
    avgTuition: "$18K-30K/yr", feeRangeINR: "₹15L-25L/yr",
    fieldTags: ["STEM", "Aerospace", "Aviation", "Engineering"],
    topCountries: ["Canada", "Australia"],
    careerRoles: ["Aerospace Technician", "Aircraft Maintenance Engineer", "Quality Inspector", "Design Technician"],
    requirements: ["12th with 70%+ in PCM", "IELTS 6.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "Advanced Diploma in Animation", level: "UG", category: "Design & Media",
    duration: "2-3 Years", description: "Intensive animation training. 2D/3D, character design, storyboarding. Industry portfolio.",
    avgTuition: "$15K-28K/yr", feeRangeINR: "₹12L-23L/yr",
    fieldTags: ["Design", "Animation", "Media", "Creative"],
    topCountries: ["Canada", "Australia", "South Korea"],
    careerRoles: ["Junior Animator", "Storyboard Artist", "Concept Artist", "Motion Designer"],
    requirements: ["12th with 60%+", "IELTS 6.0+", "Art portfolio"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — COMPUTER SCIENCE & IT (25 courses) ═══
  {
    name: "MS in Computer Science", level: "PG", category: "Computer Science & IT",
    duration: "1.5-2 Years", description: "The most popular PG course for Indian students. Covers AI, ML, systems, theory, and applications. Strong placement at top tech companies.",
    avgTuition: "$25K-60K/yr", feeRangeINR: "₹21L-50L/yr",
    fieldTags: ["STEM", "Computer Science", "AI", "ML", "Programming", "Most Popular"],
    topCountries: ["USA", "Canada", "UK", "Germany", "Ireland", "Australia"],
    careerRoles: ["Software Engineer", "ML Engineer", "Research Scientist", "Systems Architect"],
    requirements: ["Bachelor's in CS/IT (65%+)", "GRE 310+ (optional)", "IELTS 6.5+ / TOEFL 90+"],
    intakes: ["Fall (Aug/Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Data Science", level: "PG", category: "Data Science & Analytics",
    duration: "1-2 Years", description: "Statistics, machine learning, big data, deep learning. Applied projects with real datasets. Extremely high demand.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Data Science", "ML", "Statistics", "Big Data", "High Demand"],
    topCountries: ["USA", "Canada", "UK", "Ireland", "Germany"],
    careerRoles: ["Data Scientist", "ML Engineer", "AI Researcher", "Analytics Manager"],
    requirements: ["Bachelor's (65%+) with Math/Stats", "GRE 310+ (optional)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Artificial Intelligence", level: "PG", category: "Computer Science & IT",
    duration: "1-2 Years", description: "Deep learning, NLP, computer vision, reinforcement learning, generative AI. Cutting-edge research.",
    avgTuition: "$30K-60K/yr", feeRangeINR: "₹25L-50L/yr",
    fieldTags: ["STEM", "AI", "Deep Learning", "NLP", "Computer Vision", "Generative AI"],
    topCountries: ["USA", "UK", "Canada", "Germany", "Singapore"],
    careerRoles: ["AI Engineer", "ML Researcher", "NLP Engineer", "AI Product Manager"],
    requirements: ["Bachelor's in CS/EE (70%+)", "Strong programming", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Cybersecurity", level: "PG", category: "Computer Science & IT",
    duration: "1-2 Years", description: "Network security, ethical hacking, cryptography, threat analysis. Critical skill shortage globally.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Cybersecurity", "Network Security", "Ethical Hacking"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Security Engineer", "SOC Analyst", "Penetration Tester", "CISO"],
    requirements: ["Bachelor's in CS/IT (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
    {
    name: "MS in Information Technology", level: "PG", category: "Computer Science & IT",
    duration: "1-2 Years", description: "IT management, cloud computing, enterprise systems, digital transformation.",
    avgTuition: "$22K-45K/yr", feeRangeINR: "₹18L-37L/yr",
    fieldTags: ["STEM", "IT", "Cloud", "Enterprise", "Digital Transformation"],
    topCountries: ["USA", "Canada", "UK", "Australia"],
    careerRoles: ["IT Manager", "Cloud Architect", "Solutions Architect", "Digital Transformation Lead"],
    requirements: ["Bachelor's in IT/CS (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Computer Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Hardware-software integration, embedded systems, VLSI, chip design.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Computer Engineering", "VLSI", "Embedded Systems"],
    topCountries: ["USA", "Germany", "Canada", "Singapore"],
    careerRoles: ["Computer Engineer", "Chip Designer", "Embedded Engineer", "Hardware Architect"],
    requirements: ["Bachelor's in CE/EE (65%+)", "GRE 315+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
        {
    name: "MS in Game Design & Development", level: "PG", category: "Design & Media",
    duration: "1-2 Years", description: "Game engines, 3D graphics, AI in games, multiplayer systems. Portfolio-focused.",
    avgTuition: "$25K-45K/yr", feeRangeINR: "₹21L-37L/yr",
    fieldTags: ["Design", "Gaming", "3D Graphics", "Creative"],
    topCountries: ["USA", "Canada", "UK", "Sweden"],
    careerRoles: ["Game Developer", "Game Designer", "Technical Artist", "Engine Programmer"],
    requirements: ["Bachelor's in CS/Design (65%+)", "Portfolio required", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — BUSINESS & MANAGEMENT (20 courses) ═══
  {
    name: "MBA", level: "PG", category: "Business & Management",
    duration: "1-2 Years", description: "The gold standard for business leadership. Finance, marketing, operations, strategy, entrepreneurship. Case-study based.",
    avgTuition: "$30K-120K/yr", feeRangeINR: "₹25L-100L/yr",
    fieldTags: ["Business", "Management", "Leadership", "Most Popular", "High Salary"],
    topCountries: ["USA", "UK", "Canada", "France", "Singapore", "Australia"],
    careerRoles: ["Product Manager", "Strategy Consultant", "Investment Banker", "CEO/Founder"],
    requirements: ["Bachelor's (60%+)", "GMAT 650+ / GRE 310+", "IELTS 7.0+", "2-5 yrs work exp"],
    intakes: ["Fall (Sep)", "Spring (Jan)", "Summer (May)"],
  },
  {
    name: "MBA (Executive)", level: "PG", category: "Business & Management",
    duration: "1-2 Years", description: "For working professionals. Weekend/evening classes. Leadership, strategy, global business.",
    avgTuition: "$50K-150K/yr", feeRangeINR: "₹42L-125L/yr",
    fieldTags: ["Business", "Executive", "Leadership", "Working Professionals"],
    topCountries: ["USA", "UK", "Singapore"],
    careerRoles: ["VP/Director", "C-Suite", "Entrepreneur", "Board Member"],
    requirements: ["Bachelor's + 5+ yrs work exp", "GMAT 680+", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Business Analytics", level: "PG", category: "Data Science & Analytics",
    duration: "1-2 Years", description: "Data-driven decision making, predictive modeling, visualization. STEM-designated in USA.",
    avgTuition: "$30K-60K/yr", feeRangeINR: "₹25L-50L/yr",
    fieldTags: ["STEM", "Business Analytics", "Data", "Visualization", "High Demand"],
    topCountries: ["USA", "Canada", "UK", "Ireland", "Singapore"],
    careerRoles: ["Business Analyst", "Data Analyst", "BI Manager", "Strategy Analyst"],
    requirements: ["Bachelor's (65%+)", "GMAT/GRE (optional)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Finance", level: "PG", category: "Finance & Accounting",
    duration: "1-2 Years", description: "Corporate finance, investment banking, financial modeling, risk management. CFA track.",
    avgTuition: "$35K-70K/yr", feeRangeINR: "₹29L-58L/yr",
    fieldTags: ["Finance", "Investment Banking", "CFA", "High Salary"],
    topCountries: ["USA", "UK", "France", "Singapore", "Canada"],
    careerRoles: ["Investment Banker", "Financial Analyst", "Risk Manager", "Portfolio Manager"],
    requirements: ["Bachelor's in Finance/Econ (65%+)", "GMAT 650+", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Financial Engineering", level: "PG", category: "Finance & Accounting",
    duration: "1.5-2 Years", description: "Quantitative finance, derivatives pricing, stochastic calculus, algorithmic trading. Elite program.",
    avgTuition: "$40K-80K/yr", feeRangeINR: "₹33L-66L/yr",
    fieldTags: ["STEM", "Quantitative Finance", "Derivatives", "Elite"],
    topCountries: ["USA", "UK", "Singapore"],
    careerRoles: ["Quantitative Analyst", "Trader", "Risk Quant", "Structuring"],
    requirements: ["Bachelor's in Math/CS/Finance (75%+)", "GRE 320+", "Strong Math", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Marketing", level: "PG", category: "Business & Management",
    duration: "1-2 Years", description: "Digital marketing, brand strategy, consumer behavior, analytics. Mix of creative and data.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["Business", "Marketing", "Digital", "Brand"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Marketing Manager", "Brand Manager", "Digital Strategist", "Growth Lead"],
    requirements: ["Bachelor's (60%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Supply Chain Management", level: "PG", category: "Business & Management",
    duration: "1-2 Years", description: "Logistics, procurement, operations, global trade. Essential for manufacturing and e-commerce.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["Business", "Supply Chain", "Logistics", "Operations"],
    topCountries: ["USA", "Germany", "Netherlands", "Singapore"],
    careerRoles: ["Supply Chain Manager", "Operations Director", "Procurement Lead", "Logistics Manager"],
    requirements: ["Bachelor's (60%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Engineering Management", level: "PG", category: "Engineering & Technology",
    duration: "1-2 Years", description: "Bridge between engineering and management. Project management, operations, leadership for tech professionals.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Engineering Management", "Leadership", "Tech Management"],
    topCountries: ["USA", "Canada", "Germany", "UK"],
    careerRoles: ["Engineering Manager", "Technical Program Manager", "VP Engineering", "CTO"],
    requirements: ["Bachelor's in Engineering (65%+)", "2+ yrs work exp preferred", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Project Management", level: "PG", category: "Business & Management",
    duration: "1-2 Years", description: "Agile, Scrum, PMP methodology, risk management, stakeholder management. PMP certification track.",
    avgTuition: "$25K-45K/yr", feeRangeINR: "₹21L-37L/yr",
    fieldTags: ["Business", "Project Management", "PMP", "Agile"],
    topCountries: ["USA", "UK", "Australia", "Ireland"],
    careerRoles: ["Project Manager", "Program Manager", "Scrum Master", "PMO Director"],
    requirements: ["Bachelor's (60%+)", "Work experience preferred", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
        // ═══ PG — ENGINEERING (15 courses) ═══
  {
    name: "MS in Electrical Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Power systems, VLSI, communications, signal processing, RF engineering.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Electrical", "VLSI", "Power Systems"],
    topCountries: ["USA", "Germany", "Canada", "Singapore"],
    careerRoles: ["Electrical Engineer", "VLSI Designer", "Systems Engineer", "RF Engineer"],
    requirements: ["Bachelor's in EE (65%+)", "GRE 310+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Mechanical Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Thermodynamics, robotics, mechatronics, automotive, materials science.",
    avgTuition: "$25K-48K/yr", feeRangeINR: "₹21L-40L/yr",
    fieldTags: ["STEM", "Mechanical", "Robotics", "Automotive"],
    topCountries: ["Germany", "USA", "Canada", "Australia"],
    careerRoles: ["Mechanical Engineer", "Design Engineer", "Robotics Engineer", "R&D Engineer"],
    requirements: ["Bachelor's in Mechanical (65%+)", "GRE 310+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Civil Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Structural engineering, geotechnical, transportation, environmental.",
    avgTuition: "$22K-42K/yr", feeRangeINR: "₹18L-35L/yr",
    fieldTags: ["STEM", "Civil", "Structural", "Construction"],
    topCountries: ["USA", "Canada", "Australia", "UK"],
    careerRoles: ["Civil Engineer", "Structural Engineer", "Project Manager", "Urban Planner"],
    requirements: ["Bachelor's in Civil (65%+)", "GRE 300+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Biomedical Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Medical devices, tissue engineering, imaging, biomechanics. Bridge between engineering and medicine.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Biomedical", "Medical Devices", "Healthcare"],
    topCountries: ["USA", "Canada", "Germany", "Singapore"],
    careerRoles: ["Biomedical Engineer", "Medical Device Developer", "Clinical Engineer", "Regulatory Specialist"],
    requirements: ["Bachelor's in Engineering/Science (65%+)", "GRE 310+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Aerospace Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Aerodynamics, propulsion, structures, avionics. Ties with NASA, Boeing, Airbus.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Aerospace", "Aviation", "Space"],
    topCountries: ["USA", "Germany", "UK", "Netherlands"],
    careerRoles: ["Aerospace Engineer", "Propulsion Engineer", "Flight Test Engineer", "Design Engineer"],
    requirements: ["Bachelor's in Aerospace/Mechanical (70%+)", "GRE 315+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Robotics", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Autonomous systems, robot kinematics, AI for robotics, humanoid robotics.",
    avgTuition: "$28K-55K/yr", feeRangeINR: "₹23L-46L/yr",
    fieldTags: ["STEM", "Robotics", "AI", "Automation"],
    topCountries: ["USA", "Germany", "Japan", "South Korea"],
    careerRoles: ["Robotics Engineer", "Autonomous Systems Engineer", "Mechatronics Engineer", "R&D Lead"],
    requirements: ["Bachelor's in Mech/EE/CS (70%+)", "GRE 315+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Petroleum Engineering", level: "PG", category: "Engineering & Technology",
    duration: "1.5-2 Years", description: "Reservoir engineering, drilling, production. High salary but cyclical industry.",
    avgTuition: "$25K-45K/yr", feeRangeINR: "₹21L-37L/yr",
    fieldTags: ["STEM", "Petroleum", "Energy", "High Salary"],
    topCountries: ["USA", "UK", "Norway", "Australia"],
    careerRoles: ["Petroleum Engineer", "Reservoir Engineer", "Drilling Engineer", "Energy Analyst"],
    requirements: ["Bachelor's in Petroleum/Chem/Mech (65%+)", "GRE 310+", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
        // ═══ PG — DATA SCIENCE & ANALYTICS (10 courses) ═══
  {
    name: "MS in Data Analytics", level: "PG", category: "Data Science & Analytics",
    duration: "1-2 Years", description: "SQL, Python, Tableau, statistical modeling. More applied than Data Science.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Data Analytics", "SQL", "Visualization"],
    topCountries: ["USA", "Ireland", "UK", "Canada"],
    careerRoles: ["Data Analyst", "BI Analyst", "Reporting Analyst", "Analytics Consultant"],
    requirements: ["Bachelor's (60%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "MS in Big Data", level: "PG", category: "Data Science & Analytics",
    duration: "1-2 Years", description: "Hadoop, Spark, data lakes, real-time processing, NoSQL databases.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Big Data", "Hadoop", "Spark"],
    topCountries: ["USA", "UK", "Ireland"],
    careerRoles: ["Big Data Engineer", "Data Architect", "ETL Developer", "Platform Engineer"],
    requirements: ["Bachelor's in CS/IT (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
      {
    name: "MS in Health Informatics", level: "PG", category: "Data Science & Analytics",
    duration: "1-2 Years", description: "Healthcare data, EMR systems, clinical analytics, health IT policy.",
    avgTuition: "$25K-48K/yr", feeRangeINR: "₹21L-40L/yr",
    fieldTags: ["Healthcare", "Informatics", "Data", "Health IT"],
    topCountries: ["USA", "Canada", "UK"],
    careerRoles: ["Health Informaticist", "Clinical Data Analyst", "EMR Specialist", "Health IT Manager"],
    requirements: ["Bachelor's in Health/IT (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — MEDICINE & HEALTHCARE (12 courses) ═══
  {
    name: "MD (Doctor of Medicine)", level: "PG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Medical doctor program. Pre-med + MCAT required. Residency after graduation. Extremely competitive for international students.",
    avgTuition: "$50K-80K/yr", feeRangeINR: "₹42L-66L/yr",
    fieldTags: ["Medicine", "Doctor", "Healthcare", "Clinical", "Long Duration"],
    topCountries: ["USA", "Canada"],
    careerRoles: ["Physician", "Surgeon", "Specialist", "Medical Researcher"],
    requirements: ["Pre-med BS (85%+)", "MCAT 510+", "IELTS 7.0+", "Clinical shadowing"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Public Health (MPH)", level: "PG", category: "Medicine & Healthcare",
    duration: "1-2 Years", description: "Epidemiology, health policy, biostatistics, global health. Growing post-COVID.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["Healthcare", "Public Health", "Epidemiology", "Policy"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Epidemiologist", "Health Policy Analyst", "Global Health Specialist", "Researcher"],
    requirements: ["Bachelor's (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Nursing (Advanced Practice)", level: "PG", category: "Nursing & Health Sciences",
    duration: "1-2 Years", description: "Nurse practitioner, clinical leadership, healthcare administration. Excellent PR pathway.",
    avgTuition: "$20K-40K/yr", feeRangeINR: "₹17L-33L/yr",
    fieldTags: ["Healthcare", "Nursing", "PR Pathway", "Clinical"],
    topCountries: ["Canada", "USA", "Australia", "UK", "Ireland"],
    careerRoles: ["Nurse Practitioner", "Clinical Nurse Specialist", "Healthcare Administrator", "Nursing Educator"],
    requirements: ["BS in Nursing (65%+)", "RN license", "IELTS 7.0+", "Clinical experience"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Healthcare Administration", level: "PG", category: "Medicine & Healthcare",
    duration: "1-2 Years", description: "Hospital management, healthcare finance, policy, operations. Non-clinical healthcare leadership.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["Healthcare", "Administration", "Management", "Leadership"],
    topCountries: ["USA", "Canada", "UK", "Australia"],
    careerRoles: ["Hospital Administrator", "Healthcare Manager", "Policy Advisor", "Operations Director"],
    requirements: ["Bachelor's (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
        {
    name: "MS in Biotechnology", level: "PG", category: "Science & Research",
    duration: "1.5-2 Years", description: "Genetic engineering, bioprocessing, pharma biotech, research methods.",
    avgTuition: "$25K-50K/yr", feeRangeINR: "₹21L-42L/yr",
    fieldTags: ["STEM", "Biotechnology", "Genetics", "Pharma"],
    topCountries: ["USA", "Germany", "UK", "Singapore", "Ireland"],
    careerRoles: ["Biotechnologist", "Research Scientist", "Pharma Developer", "Quality Assurance"],
    requirements: ["Bachelor's in Biotech/Biology (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "Doctor of Pharmacy (PharmD)", level: "PG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Professional pharmacy doctorate. Clinical pharmacy, patient care, drug therapy management.",
    avgTuition: "$35K-55K/yr", feeRangeINR: "₹29L-46L/yr",
    fieldTags: ["Healthcare", "Pharmacy", "Clinical", "Doctorate"],
    topCountries: ["USA", "Canada", "UK"],
    careerRoles: ["Pharmacist", "Clinical Pharmacist", "Pharmacy Director", "Drug Safety Specialist"],
    requirements: ["Bachelor's in Pharmacy (70%+)", "PCAT", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "DDS (Doctor of Dental Surgery)", level: "PG", category: "Medicine & Healthcare",
    duration: "4 Years", description: "Dental doctorate. Clinical dentistry, oral surgery, orthodontics. Licensure required.",
    avgTuition: "$55K-85K/yr", feeRangeINR: "₹46L-71L/yr",
    fieldTags: ["Healthcare", "Dentistry", "Clinical", "Doctorate"],
    topCountries: ["USA", "Canada", "Australia"],
    careerRoles: ["Dentist", "Orthodontist", "Oral Surgeon", "Dental Researcher"],
    requirements: ["Bachelor's (80%+ in Science)", "DAT high score", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — SCIENCE & RESEARCH (8 courses) ═══
  {
    name: "MS in Physics", level: "PG", category: "Science & Research",
    duration: "2 Years", description: "Theoretical and experimental physics. Quantum mechanics, condensed matter, astrophysics.",
    avgTuition: "$22K-45K/yr", feeRangeINR: "₹18L-37L/yr",
    fieldTags: ["STEM", "Physics", "Research", "PhD Track"],
    topCountries: ["Germany", "USA", "UK", "Canada"],
    careerRoles: ["Research Scientist", "Physicist", "Data Scientist", "Professor"],
    requirements: ["Bachelor's in Physics (70%+)", "GRE Physics", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Chemistry", level: "PG", category: "Science & Research",
    duration: "1.5-2 Years", description: "Organic, inorganic, physical chemistry, materials chemistry.",
    avgTuition: "$22K-42K/yr", feeRangeINR: "₹18L-35L/yr",
    fieldTags: ["STEM", "Chemistry", "Research", "Pharma"],
    topCountries: ["Germany", "USA", "UK", "Singapore"],
    careerRoles: ["Chemist", "Materials Scientist", "Pharma Researcher", "Quality Control"],
    requirements: ["Bachelor's in Chemistry (65%+)", "GRE Chemistry", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "MS in Mathematics", level: "PG", category: "Science & Research",
    duration: "1.5-2 Years", description: "Pure and applied mathematics. Number theory, topology, computational math.",
    avgTuition: "$20K-40K/yr", feeRangeINR: "₹17L-33L/yr",
    fieldTags: ["STEM", "Mathematics", "Research", "Quantitative"],
    topCountries: ["USA", "UK", "Germany", "Canada"],
    careerRoles: ["Quantitative Analyst", "Data Scientist", "Researcher", "Professor"],
    requirements: ["Bachelor's in Math (70%+)", "GRE Math", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
    {
    name: "MS in Environmental Science", level: "PG", category: "Environmental Science",
    duration: "1.5-2 Years", description: "Climate change, conservation, sustainability, environmental policy.",
    avgTuition: "$20K-40K/yr", feeRangeINR: "₹17L-33L/yr",
    fieldTags: ["Science", "Environment", "Sustainability", "Climate"],
    topCountries: ["Canada", "Germany", "Netherlands", "Australia", "UK"],
    careerRoles: ["Environmental Consultant", "Climate Analyst", "Conservation Scientist", "ESG Specialist"],
    requirements: ["Bachelor's in Science (65%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
        // ═══ PG — ARTS, DESIGN & MEDIA (8 courses) ═══
  {
    name: "MA in Economics", level: "PG", category: "Arts & Humanities",
    duration: "1-2 Years", description: "Micro/macro economics, econometrics, development economics, financial economics.",
    avgTuition: "$22K-45K/yr", feeRangeINR: "₹18L-37L/yr",
    fieldTags: ["Economics", "Finance", "Policy", "Quantitative"],
    topCountries: ["USA", "UK", "Canada", "Netherlands"],
    careerRoles: ["Economist", "Policy Analyst", "Financial Analyst", "Researcher"],
    requirements: ["Bachelor's in Economics/Math (70%+)", "GRE", "IELTS 6.5+"],
    intakes: ["Fall (Sep)"],
  },
              {
    name: "MA in International Relations", level: "PG", category: "Social Sciences",
    duration: "1-2 Years", description: "Diplomacy, global politics, security studies, international development.",
    avgTuition: "$22K-45K/yr", feeRangeINR: "₹18L-37L/yr",
    fieldTags: ["Political Science", "International Relations", "Diplomacy", "Policy"],
    topCountries: ["UK", "USA", "Netherlands", "Switzerland"],
    careerRoles: ["Diplomat", "Policy Analyst", "NGO Director", "Intelligence Analyst"],
    requirements: ["Bachelor's (65%+)", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — LAW (3 courses) ═══
  {
    name: "LLM (Master of Laws)", level: "PG", category: "Law",
    duration: "1 Year", description: "Specialized legal study. International law, corporate law, human rights, tax law.",
    avgTuition: "$30K-65K/yr", feeRangeINR: "₹25L-54L/yr",
    fieldTags: ["Law", "Legal", "International Law", "Corporate Law"],
    topCountries: ["UK", "USA", "Australia", "Singapore"],
    careerRoles: ["Corporate Lawyer", "Legal Consultant", "Judge", "Policy Advisor"],
    requirements: ["LLB degree (60%+)", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "LLB/JD (Law)", level: "PG", category: "Law",
    duration: "2-3 Years", description: "Juris Doctor for non-law graduates. Can practice in USA, Australia. Bar exam required.",
    avgTuition: "$40K-70K/yr", feeRangeINR: "₹33L-58L/yr",
    fieldTags: ["Law", "JD", "Legal", "Bar Exam"],
    topCountries: ["USA", "Australia"],
    careerRoles: ["Attorney", "Corporate Counsel", "Litigation Lawyer", "Legal Advisor"],
    requirements: ["Bachelor's (any field, 70%+)", "LSAT 160+", "IELTS 7.0+"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PG — HOSPITALITY & TOURISM (3 courses) ═══
  {
    name: "MS in Hospitality Management", level: "PG", category: "Hospitality & Tourism",
    duration: "1-2 Years", description: "Hotel operations, revenue management, luxury hospitality, entrepreneurship.",
    avgTuition: "$20K-45K/yr", feeRangeINR: "₹17L-37L/yr",
    fieldTags: ["Hospitality", "Hotel Management", "Luxury", "Tourism"],
    topCountries: ["Switzerland", "USA", "Australia", "UK"],
    careerRoles: ["Hotel Manager", "Resort Director", "Revenue Manager", "Hospitality Entrepreneur"],
    requirements: ["Bachelor's (60%+)", "IELTS 6.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
    // ═══ PG — PR PATHWAY PROGRAMS (12 courses) ═══
  {
    name: "PG Diploma in Supply Chain Management", level: "PG", category: "PR Pathway Programs",
    duration: "1-2 Years", description: "Logistics, procurement, operations. High-demand occupation for PR in Canada and Australia.",
    avgTuition: "$15K-30K/yr", feeRangeINR: "₹12L-25L/yr",
    fieldTags: ["PR Pathway", "Supply Chain", "Logistics", "High Demand"],
    topCountries: ["Canada", "Australia", "New Zealand"],
    careerRoles: ["Supply Chain Coordinator", "Logistics Analyst", "Operations Manager", "Procurement Specialist"],
    requirements: ["Bachelor's (any, 55%+)", "IELTS 6.0+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
  {
    name: "PG Diploma in Project Management", level: "PG", category: "PR Pathway Programs",
    duration: "1 Year", description: "PMP-aligned curriculum. In-demand skill for PR in multiple countries.",
    avgTuition: "$15K-28K/yr", feeRangeINR: "₹12L-23L/yr",
    fieldTags: ["PR Pathway", "Project Management", "PMP", "High Demand"],
    topCountries: ["Canada", "Australia", "New Zealand", "Ireland"],
    careerRoles: ["Project Coordinator", "Project Manager", "Scrum Master", "Operations Lead"],
    requirements: ["Bachelor's (any, 55%+)", "IELTS 6.0+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
  {
    name: "PG Diploma in Data Analytics", level: "PG", category: "PR Pathway Programs",
    duration: "1-2 Years", description: "Practical data skills. High-demand STEM occupation for PR pathways.",
    avgTuition: "$15K-30K/yr", feeRangeINR: "₹12L-25L/yr",
    fieldTags: ["PR Pathway", "Data Analytics", "STEM", "High Demand"],
    topCountries: ["Canada", "Australia", "New Zealand"],
    careerRoles: ["Data Analyst", "BI Analyst", "Reporting Analyst", "Analytics Consultant"],
    requirements: ["Bachelor's (any, 55%+)", "IELTS 6.0+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
        {
    name: "PG Diploma in AI & Machine Learning", level: "PG", category: "PR Pathway Programs",
    duration: "1-2 Years", description: "Practical AI/ML skills. High-demand STEM occupation for PR.",
    avgTuition: "$18K-35K/yr", feeRangeINR: "₹15L-29L/yr",
    fieldTags: ["PR Pathway", "AI", "Machine Learning", "STEM"],
    topCountries: ["Canada", "Australia", "Ireland"],
    careerRoles: ["ML Engineer", "AI Developer", "Data Scientist", "Automation Engineer"],
    requirements: ["Bachelor's in CS/IT (55%+)", "Programming basics", "IELTS 6.0+"],
    intakes: ["Fall (Sep)"],
  },
      {
    name: "PG Diploma in Construction Management", level: "PG", category: "PR Pathway Programs",
    duration: "1-2 Years", description: "Construction planning, project management, BIM. High-demand trade skill.",
    avgTuition: "$15K-28K/yr", feeRangeINR: "₹12L-23L/yr",
    fieldTags: ["PR Pathway", "Construction", "Project Management", "Trade"],
    topCountries: ["Canada", "Australia", "New Zealand"],
    careerRoles: ["Construction Manager", "Site Supervisor", "Project Coordinator", "Estimator"],
    requirements: ["Bachelor's in Engineering (55%+)", "IELTS 6.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "PG Diploma in Web Development", level: "PG", category: "PR Pathway Programs",
    duration: "1-2 Years", description: "Full-stack development, React, Node.js, databases. Practical coding bootcamp style.",
    avgTuition: "$15K-25K/yr", feeRangeINR: "₹12L-21L/yr",
    fieldTags: ["PR Pathway", "Web Development", "Full Stack", "Coding"],
    topCountries: ["Canada", "Australia", "Ireland"],
    careerRoles: ["Full-Stack Developer", "Frontend Developer", "Backend Developer", "Web Developer"],
    requirements: ["Bachelor's (any, 55%+)", "Basic coding knowledge", "IELTS 6.0+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
  // ═══ DIPLOMA PROGRAMS (10 courses) ═══
  {
    name: "Advanced Diploma in Engineering Technology", level: "Diploma", category: "Engineering & Technology",
    duration: "2-3 Years", description: "Practical engineering skills. Co-op programs included. Direct pathway to BEng or work.",
    avgTuition: "$12K-22K/yr", feeRangeINR: "₹10L-18L/yr",
    fieldTags: ["Diploma", "Engineering", "Co-op", "Practical"],
    topCountries: ["Canada", "Australia"],
    careerRoles: ["Engineering Technologist", "Technician", "Quality Inspector", "Designer"],
    requirements: ["12th with 60%+ in PCM", "IELTS 6.0+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
  {
    name: "Diploma in Culinary Management", level: "Diploma", category: "Hospitality & Tourism",
    duration: "1-2 Years", description: "Professional cooking, kitchen management, food safety. Paid internship included.",
    avgTuition: "$12K-22K/yr", feeRangeINR: "₹10L-18L/yr",
    fieldTags: ["Diploma", "Culinary", "Cooking", "Hospitality"],
    topCountries: ["Australia", "Canada", "Switzerland"],
    careerRoles: ["Chef", "Kitchen Manager", "Restaurant Owner", "Food Safety Inspector"],
    requirements: ["12th with 55%+", "IELTS 5.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
      {
    name: "Diploma in Business Administration", level: "Diploma", category: "Business & Management",
    duration: "1-2 Years", description: "Management, marketing, accounting, HR. Foundation for BBA or entry-level management.",
    avgTuition: "$12K-20K/yr", feeRangeINR: "₹10L-17L/yr",
    fieldTags: ["Diploma", "Business", "Management", "Foundation"],
    topCountries: ["Canada", "Australia", "New Zealand"],
    careerRoles: ["Office Manager", "Sales Coordinator", "HR Assistant", "Marketing Assistant"],
    requirements: ["12th with 55%+", "IELTS 5.5+"],
    intakes: ["Fall (Sep)", "Winter (Jan)"],
  },
  {
    name: "Diploma in Healthcare Assistance", level: "Diploma", category: "Nursing & Health Sciences",
    duration: "1-2 Years", description: "Patient care, medical terminology, clinical assistance. Strong PR pathway in Canada.",
    avgTuition: "$12K-20K/yr", feeRangeINR: "₹10L-17L/yr",
    fieldTags: ["Diploma", "Healthcare", "PR Pathway", "Patient Care"],
    topCountries: ["Canada", "Australia", "UK"],
    careerRoles: ["Healthcare Assistant", "Personal Support Worker", "Clinical Assistant", "Care Coordinator"],
    requirements: ["12th with 55%+", "IELTS 6.0+"],
    intakes: ["Fall (Sep)"],
  },
  {
    name: "Diploma in Automobile Technology", level: "Diploma", category: "Engineering & Technology",
    duration: "2 Years", description: "Vehicle diagnostics, repair, EV technology, hybrid systems. Hands-on workshop training.",
    avgTuition: "$12K-22K/yr", feeRangeINR: "₹10L-18L/yr",
    fieldTags: ["Diploma", "Automotive", "EV", "Practical"],
    topCountries: ["Canada", "Australia", "Germany"],
    careerRoles: ["Automotive Technician", "EV Specialist", "Service Manager", "Diagnostic Expert"],
    requirements: ["12th with 55%+ in PCM", "IELTS 5.5+"],
    intakes: ["Fall (Sep)"],
  },
    {
    name: "Diploma in Hospitality Management", level: "Diploma", category: "Hospitality & Tourism",
    duration: "1-2 Years", description: "Hotel operations, food service, event planning. Paid internship/co-op included.",
    avgTuition: "$12K-25K/yr", feeRangeINR: "₹10L-21L/yr",
    fieldTags: ["Diploma", "Hospitality", "Hotel", "Co-op"],
    topCountries: ["Canada", "Australia", "Switzerland", "Singapore"],
    careerRoles: ["Hotel Supervisor", "Restaurant Manager", "Event Coordinator", "Guest Relations"],
    requirements: ["12th with 55%+", "IELTS 5.5+"],
    intakes: ["Fall (Sep)", "Spring (Jan)"],
  },
  {
    name: "Diploma in Interior Design", level: "Diploma", category: "Design & Media",
    duration: "1-2 Years", description: "Space planning, AutoCAD, 3D visualization, materials. Portfolio development.",
    avgTuition: "$12K-22K/yr", feeRangeINR: "₹10L-18L/yr",
    fieldTags: ["Diploma", "Interior Design", "Creative", "AutoCAD"],
    topCountries: ["Canada", "Australia", "UK"],
    careerRoles: ["Interior Designer", "Space Planner", "3D Visualizer", "Design Consultant"],
    requirements: ["12th with 55%+", "IELTS 5.5+", "Creative portfolio"],
    intakes: ["Fall (Sep)"],
  },
  // ═══ PhD PROGRAMS (8 courses) ═══
  {
    name: "PhD in Computer Science", level: "PhD", category: "Computer Science & IT",
    duration: "4-5 Years", description: "AI, ML, systems, theory, HCI. Fully funded with stipend $25K-45K/yr. Research assistantships available.",
    avgTuition: "$0-15K/yr", feeRangeINR: "FREE - ₹12L/yr",
    fieldTags: ["PhD", "Computer Science", "Fully Funded", "AI", "Research"],
    topCountries: ["USA", "Germany", "Canada", "UK", "Australia"],
    careerRoles: ["Professor", "Research Scientist", "Tech Lead", " CTO"],
    requirements: ["MS in CS (70%+)", "GRE 320+", "Research publications", "Strong LORs"],
    intakes: ["Fall (Sep)"],
  },
    {
    name: "PhD in Business Administration", level: "PhD", category: "Business & Management",
    duration: "4-5 Years", description: "Strategy, finance, marketing, organizational behavior. Academic career track.",
    avgTuition: "$0-25K/yr", feeRangeINR: "FREE - ₹21L/yr",
    fieldTags: ["PhD", "Business", "Academic", "Research"],
    topCountries: ["USA", "UK", "Canada", "Australia"],
    careerRoles: ["Business School Professor", "Researcher", "Policy Advisor", "Consultant"],
    requirements: ["MBA/MS (70%+)", "GMAT 700+", "Research interests", "Publications preferred"],
    intakes: ["Fall (Sep)"],
  },
          ];

/* ═══════════════════════════════════════════════════════════════════
   SEARCH UTILITY
   ═══════════════════════════════════════════════════════════════════ */
export function searchCourses(query: string, filters?: { level?: string; category?: string; country?: string }): VerifiedCourse[] {
  const q = query.toLowerCase().trim();
  const verified = getVerifiedCourses();

  return verified.filter(course => {
    // Text search (matches course name, description, category, tags, careers, or countries)
    const matchesQuery = !q ||
      course.name.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.fieldTags.some(t => t.toLowerCase().includes(q)) ||
      course.careerRoles.some(r => r.toLowerCase().includes(q)) ||
      course.actualCountries.some(c => c.toLowerCase().includes(q));

    // Level filter
    const matchesLevel = !filters?.level || filters.level === "All" || course.level === filters.level;

    // Category filter
    const matchesCategory = !filters?.category || filters.category === "All" || course.category === filters.category;

    // Country filter (uses ACTUAL countries)
    const matchesCountry = !filters?.country || filters.country === "All" || course.actualCountries.some(c => c.toLowerCase() === filters.country?.toLowerCase());

    return matchesQuery && matchesLevel && matchesCategory && matchesCountry;
  });
}

/* Quick stats */
/* ═══════════════════════════════════════════════════════════════════
   VERIFIED COURSES — Only courses with ≥1 university offering them
   ═══════════════════════════════════════════════════════════════════ */

import { getAllUniversities } from "./universities";

function strictMatch(programName: string, courseName: string): boolean {
  const p = programName.toLowerCase().trim();
  const c = courseName.toLowerCase().trim();

  // Exact match
  if (p === c) return true;

  // One contains the other entirely (e.g. "BS in Computer Science" contains "Computer Science")
  if (p.includes(c) || c.includes(p)) return true;

  // Strip degree prefixes and compare core subject
  const stripDegree = (s: string) => s.replace(/^(bs|beng|bsc|ba|bBA|ms|msc|ma|mba|phd|pg diploma|advanced diploma|diploma)\s+(in|of)\s+/i, "").trim();
  const pCore = stripDegree(p);
  const cCore = stripDegree(c);

  if (pCore === cCore) return true;
  if (pCore.includes(cCore) || cCore.includes(pCore)) return true;

  // For short course names (3+ words), require ALL significant words to match
  const ignore = new Set(["in","and","of","the","a","an","&","bs","ms","msc","ma","mba","phd","bsc","ba","master","bachelor","doctor","program"]);
  const pWords = [...new Set(pCore.split(/\s+/).filter(w => w.length > 2 && !ignore.has(w)))];
  const cWords = [...new Set(cCore.split(/\s+/).filter(w => w.length > 2 && !ignore.has(w)))];

  if (pWords.length === 0 || cWords.length === 0) return false;

  let matched = 0;
  for (const cw of cWords) {
    for (const pw of pWords) {
      if (pw === cw || (cw.length > 4 && pw.startsWith(cw)) || (pw.length > 4 && cw.startsWith(pw))) {
        matched++;
        break;
      }
    }
  }

  // Require 100% of course words to match for precision
  return matched >= cWords.length;
}

let _verifiedCache: CourseEntry[] | null = null;

/** Return only courses that have ≥1 university with a matching program */
/** Get matching universities for a course (used by verification) */
function findMatchingUniversities(courseName: string) {
  const universities = getAllUniversities();
  const matches: { uni: typeof universities[0]; prog: typeof universities[0]["programs"][0] }[] = [];
  for (const u of universities) {
    for (const prog of u.programs) {
      if (strictMatch(prog.name, courseName)) {
        matches.push({ uni: u, prog });
        break;
      }
    }
  }
  return matches;
}

export interface VerifiedCourse extends CourseEntry {
  actualCountries: string[];  // countries where the course IS offered
  actualUniversities: { name: string; slug: string; country: string; indianStudents: string; qsRanking: number }[];
}

/** Return only verified courses with dynamically derived country/university data */
export function getVerifiedCourses(): VerifiedCourse[] {
  if (_verifiedCache) return _verifiedCache as VerifiedCourse[];
  const universities = getAllUniversities();
  const verified: VerifiedCourse[] = [];

  for (const course of courseDatabase) {
    const matches = findMatchingUniversities(course.name);
    if (matches.length === 0) continue; // skip courses no one offers

    // Derive actual countries from matching universities
    const countrySet = new Set<string>();
    const uniList: VerifiedCourse["actualUniversities"] = [];
    for (const m of matches) {
      countrySet.add(m.uni.country);
      uniList.push({
        name: m.uni.name,
        slug: m.uni.slug,
        country: m.uni.country,
        indianStudents: m.uni.indianStudents || "",
        qsRanking: m.uni.qsRankingNum || 9999,
      });
    }

    // Sort universities: by Indian students desc, then QS asc
    uniList.sort((a, b) => {
      const aInd = parseInt(a.indianStudents.replace(/[^0-9]/g, "")) || 0;
      const bInd = parseInt(b.indianStudents.replace(/[^0-9]/g, "")) || 0;
      if (bInd !== aInd) return bInd - aInd;
      return a.qsRanking - b.qsRanking;
    });

    verified.push({
      ...course,
      topCountries: [...countrySet], // override with ACTUAL countries
      actualCountries: [...countrySet],
      actualUniversities: uniList,
    });
  }

  _verifiedCache = verified;
  return verified;
}

/** Invalidate cache when data changes */
export function invalidateCourseCache() {
  _verifiedCache = null;
}

/* Quick stats */
export function getCourseStats() {
  const verified = getVerifiedCourses();
  return {
    total: verified.length,
    byLevel: verified.reduce((acc, c) => {
      acc[c.level] = (acc[c.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: verified.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    countries: [...new Set(verified.flatMap(c => c.actualCountries))].length,
  };
}
