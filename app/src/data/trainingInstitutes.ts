export interface TrainingInstitute {
  id: string;
  name: string;
  city: string;
  mode: "Online" | "Offline" | "Hybrid";
  exams: string[];
  courses: { name: string; duration: string; fee: string }[];
  rating: number;
  studentsTrained: string;
  avgScoreImprovement: string;
  highlights: string[];
  contact: { phone?: string; email?: string; website?: string; address?: string };
  freeDemo: boolean;
  batchSize: string;
}

const trainingInstitutes: TrainingInstitute[] = [
  // IELTS Institutes
  {
    id: "tc-ielts-1",
    name: "British Council IELTS Centre",
    city: "Delhi, Mumbai, Bangalore, Chennai, Kolkata",
    mode: "Hybrid",
    exams: ["ielts"],
    courses: [
      { name: "IELTS Intensive (4 weeks)", duration: "4 weeks", fee: "₹12,000" },
      { name: "IELTS Complete (8 weeks)", duration: "8 weeks", fee: "₹20,000" },
      { name: "IELTS 1-on-1 Coaching", duration: "Flexible", fee: "₹2,000/hr" },
    ],
    rating: 4.7,
    studentsTrained: "50,000+",
    avgScoreImprovement: "+1.5 bands",
    highlights: ["Official IELTS partner", "British Council certified trainers", "Free practice materials"],
    contact: { phone: "+91-120-4569000", website: "https://www.britishcouncil.in/exam/ielts" },
    freeDemo: true,
    batchSize: "15-20",
  },
  {
    id: "tc-ielts-2",
    name: "IDP IELTS India",
    city: "Delhi, Mumbai, Bangalore, Hyderabad, Pune",
    mode: "Hybrid",
    exams: ["ielts"],
    courses: [
      { name: "IELTS Masterclass", duration: "6 weeks", fee: "₹8,500" },
      { name: "IELTS Premium (with mock tests)", duration: "8 weeks", fee: "₹15,000" },
    ],
    rating: 4.6,
    studentsTrained: "1,00,000+",
    avgScoreImprovement: "+1.5 bands",
    highlights: ["Official IELTS test co-owner", "Free IELTS Masterclass webinars", "Score guarantee program"],
    contact: { phone: "1800-102-4544", website: "https://www.ieltsidpindia.com" },
    freeDemo: true,
    batchSize: "20-30",
  },
  {
    id: "tc-ielts-3",
    name: "Manya — The Princeton Review",
    city: "Delhi, Noida, Gurgaon, Bangalore, Chennai, Hyderabad",
    mode: "Hybrid",
    exams: ["ielts", "toefl", "gre", "gmat", "sat"],
    courses: [
      { name: "IELTS Classroom", duration: "4-8 weeks", fee: "₹15,000-25,000" },
      { name: "IELTS Live Online", duration: "4-8 weeks", fee: "₹12,000-20,000" },
    ],
    rating: 4.5,
    studentsTrained: "30,000+",
    avgScoreImprovement: "+1.5 bands",
    highlights: ["Princeton Review curriculum", "Adaptive learning platform", "Unlimited doubt sessions"],
    contact: { phone: "+91-1800-102-4646", website: "https://www.manyagroup.com" },
    freeDemo: true,
    batchSize: "10-15",
  },
  // GRE Institutes
  {
    id: "tc-gre-1",
    name: "Jamboree Education",
    city: "Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata",
    mode: "Hybrid",
    exams: ["gre", "gmat", "sat", "ielts", "toefl"],
    courses: [
      { name: "GRE Comprehensive", duration: "8-12 weeks", fee: "₹25,000" },
      { name: "GRE Live Online", duration: "8 weeks", fee: "₹20,000" },
      { name: "GRE 1-on-1", duration: "Flexible", fee: "₹45,000" },
    ],
    rating: 4.6,
    studentsTrained: "75,000+",
    avgScoreImprovement: "+15 points",
    highlights: ["30+ years experience", "Highest GRE scores in India", "Full-length mock tests every week"],
    contact: { phone: "+91-99999-09941", website: "https://www.jamboreeindia.com" },
    freeDemo: true,
    batchSize: "12-15",
  },
  {
    id: "tc-gre-2",
    name: "Galvanize Test Prep (Magoosh India)",
    city: "Online (PAN India)",
    mode: "Online",
    exams: ["gre", "toefl", "ielts"],
    courses: [
      { name: "GRE Premium", duration: "Self-paced", fee: "₹8,000" },
      { name: "GRE + Admissions Counseling", duration: "3-6 months", fee: "₹35,000" },
    ],
    rating: 4.4,
    studentsTrained: "1,00,000+",
    avgScoreImprovement: "+12 points",
    highlights: ["Magoosh platform — video lessons", "Vocabulary app included", "Email support from experts"],
    contact: { website: "https://galvanizetestprep.com" },
    freeDemo: true,
    batchSize: "Self-paced",
  },
  {
    id: "tc-gre-3",
    name: "Kaplan India",
    city: "Online (PAN India)",
    mode: "Online",
    exams: ["gre", "gmat"],
    courses: [
      { name: "GRE Live Online", duration: "8 weeks", fee: "₹30,000" },
      { name: "GRE Self-Paced", duration: "3 months access", fee: "₹18,000" },
    ],
    rating: 4.3,
    studentsTrained: "3,00,000+ (global)",
    avgScoreImprovement: "+10 points",
    highlights: ["Global test prep leader", "Higher Score Guarantee", "Official GRE practice tests"],
    contact: { website: "https://www.kaptest.com" },
    freeDemo: true,
    batchSize: "20-25 (live)",
  },
  // GMAT Institutes
  {
    id: "tc-gmat-1",
    name: "CrackVerbal",
    city: "Bangalore, Online (PAN India)",
    mode: "Hybrid",
    exams: ["gmat", "gre"],
    courses: [
      { name: "GMAT Classroom", duration: "10 weeks", fee: "₹40,000" },
      { name: "GMAT Live Online", duration: "10 weeks", fee: "₹35,000" },
      { name: "GMAT Personal Tutoring", duration: "Flexible", fee: "₹75,000" },
    ],
    rating: 4.7,
    studentsTrained: "15,000+",
    avgScoreImprovement: "+80 points",
    highlights: ["India's #1 GMAT prep", "Arun Jagannathan — legendary instructor", "99th percentile strategies"],
    contact: { phone: "+91-99000-25844", website: "https://www.crackverbal.com" },
    freeDemo: true,
    batchSize: "8-12",
  },
  {
    id: "tc-gmat-2",
    name: "e-GMAT",
    city: "Online (PAN India)",
    mode: "Online",
    exams: ["gmat"],
    courses: [
      { name: "GMAT Online (Scholar)", duration: "Self-paced + live", fee: "₹25,000" },
      { name: "GMAT Online (Sigma X)", duration: "3 months", fee: "₹45,000" },
    ],
    rating: 4.5,
    studentsTrained: "50,000+",
    avgScoreImprovement: "+70 points",
    highlights: ["AI-powered personalized learning", "750+ score guarantee", "Mentorship from 760+ scorers"],
    contact: { website: "https://e-gmat.com" },
    freeDemo: true,
    batchSize: "Self-paced",
  },
  // SAT Institutes
  {
    id: "tc-sat-1",
    name: "The Princeton Review India",
    city: "Delhi, Mumbai, Bangalore, Hyderabad",
    mode: "Hybrid",
    exams: ["sat", "act", "ap"],
    courses: [
      { name: "SAT Classroom", duration: "8-12 weeks", fee: "₹35,000" },
      { name: "SAT Private Tutoring", duration: "Flexible", fee: "₹60,000" },
      { name: "SAT Live Online", duration: "8 weeks", fee: "₹25,000" },
    ],
    rating: 4.5,
    studentsTrained: "25,000+",
    avgScoreImprovement: "+200 points",
    highlights: ["Official practice tests", "Score improvement guarantee", "College counseling included"],
    contact: { phone: "+91-124-4142000", website: "https://www.princetonreview.com" },
    freeDemo: true,
    batchSize: "10-15",
  },
  {
    id: "tc-sat-2",
    name: "FIITJEE (SAT Division)",
    city: "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad",
    mode: "Offline",
    exams: ["sat", "ap"],
    courses: [
      { name: "SAT Foundation", duration: "6 months", fee: "₹40,000" },
      { name: "SAT Advanced", duration: "3 months", fee: "₹30,000" },
    ],
    rating: 4.3,
    studentsTrained: "10,000+",
    avgScoreImprovement: "+180 points",
    highlights: ["Math-focused approach", "JEE + SAT combined prep", "Structured classroom environment"],
    contact: { phone: "+91-11-49203471", website: "https://www.fiitjee.com" },
    freeDemo: false,
    batchSize: "30-40",
  },
  // NEET Institutes
  {
    id: "tc-neet-1",
    name: "Allen Career Institute",
    city: "Kota, Delhi, Mumbai, Bangalore, 20+ cities",
    mode: "Offline",
    exams: ["neet"],
    courses: [
      { name: "NEET Classroom (1 Year)", duration: "1 year", fee: "₹1,50,000" },
      { name: "NEET Classroom (2 Year)", duration: "2 years", fee: "₹2,50,000" },
      { name: "NEET Distance Learning", duration: "1 year", fee: "₹75,000" },
    ],
    rating: 4.7,
    studentsTrained: "10,00,000+",
    avgScoreImprovement: "+150 marks",
    highlights: ["#1 NEET coaching in India", "AIR 1 history", "DLP available nationwide"],
    contact: { phone: "+91-744-2757575", website: "https://www.allen.ac.in" },
    freeDemo: true,
    batchSize: "150-200",
  },
  {
    id: "tc-neet-2",
    name: "Aakash Institute",
    city: "Delhi, Mumbai, Bangalore, Chennai, 200+ centres",
    mode: "Hybrid",
    exams: ["neet"],
    courses: [
      { name: "NEET Regular (1 Year)", duration: "1 year", fee: "₹1,40,000" },
      { name: "NEET Engineering + Medical", duration: "2 years", fee: "₹2,80,000" },
      { name: "NEET Online Live", duration: "1 year", fee: "₹60,000" },
    ],
    rating: 4.6,
    studentsTrained: "15,00,000+",
    avgScoreImprovement: "+140 marks",
    highlights: ["Byju's backed", "AI-powered tests", "National test series"],
    contact: { phone: "+91-11-47623456", website: "https://www.aakash.ac.in" },
    freeDemo: true,
    batchSize: "100-150",
  },
  {
    id: "tc-neet-3",
    name: "Physics Wallah (PW)",
    city: "Online (PAN India), 50+ offline centres",
    mode: "Hybrid",
    exams: ["neet", "jee"],
    courses: [
      { name: "NEET Batch (Arjuna/Prakhar)", duration: "1 year", fee: "₹4,000-15,000" },
      { name: "NEET Offline (Vidyapeeth)", duration: "1 year", fee: "₹80,000" },
    ],
    rating: 4.5,
    studentsTrained: "50,00,000+",
    avgScoreImprovement: "+120 marks",
    highlights: ["Most affordable coaching", "Alakh Pandey's teaching", "Millions of followers"],
    contact: { phone: "+91-782-700-3883", website: "https://www.pw.live" },
    freeDemo: true,
    batchSize: "500-5000 (online)",
  },
  // PTE Institutes
  {
    id: "tc-pte-1",
    name: "E2Language India",
    city: "Online (PAN India)",
    mode: "Online",
    exams: ["pte", "ielts", "oet"],
    courses: [
      { name: "PTE Express (2 weeks)", duration: "2 weeks", fee: "₹8,000" },
      { name: "PTE Complete (4 weeks)", duration: "4 weeks", fee: "₹15,000" },
      { name: "PTE 1-on-1", duration: "Flexible", fee: "₹1,500/hr" },
    ],
    rating: 4.6,
    studentsTrained: "2,00,000+",
    avgScoreImprovement: "+15 points",
    highlights: ["PTE-specialized trainers", "AI mock tests", "Score guarantee"],
    contact: { website: "https://www.e2language.com" },
    freeDemo: true,
    batchSize: "15-20",
  },
  // TOEFL Institutes
  {
    id: "tc-toefl-1",
    name: "Edwise International",
    city: "Mumbai, Delhi, Bangalore, Chennai, Pune, Ahmedabad",
    mode: "Hybrid",
    exams: ["toefl", "ielts", "pte", "gre", "gmat"],
    courses: [
      { name: "TOEFL Classroom", duration: "4-6 weeks", fee: "₹12,000" },
      { name: "TOEFL Private", duration: "Flexible", fee: "₹25,000" },
    ],
    rating: 4.3,
    studentsTrained: "50,000+",
    avgScoreImprovement: "+15 points",
    highlights: ["Study abroad counseling included", "University application support", "Small batch sizes"],
    contact: { phone: "+91-22-40813333", website: "https://www.edwiseinternational.com" },
    freeDemo: true,
    batchSize: "8-10",
  },
];

export function getInstitutesForExam(examId: string): TrainingInstitute[] {
  return trainingInstitutes.filter(i => i.exams.includes(examId));
}

export function getAllInstitutes(): TrainingInstitute[] {
  return trainingInstitutes;
}

export default trainingInstitutes;
