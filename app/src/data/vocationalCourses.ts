/* ═══════════════════════════════════════════════════════════════════════════
   VOCATIONAL COURSES DATABASE — Real colleges, courses, costs & PR pathways
   For Indian students seeking diploma/certificate programs abroad.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface VocationalCourse {
  name: string;              // Course name
  college: string;           // Institution name
  campus: string;            // City/location
  duration: string;          // e.g. "1 year", "2 years"
  tuition: string;           // Tuition fee display
  tuitionINR: number;        // Tuition in ₹ Lakhs
  intake: string;            // Intake months
  prPathway: string;         // PR pathway description
  prFriendly: boolean;       // Whether course is on PR occupation list
  avgSalary: string;         // Post-graduation salary
  requirements: string;      // Entry requirements
  nocCode?: string;          // NOC/occupation code (Canada, Australia)
  category: string;          // STEM / Healthcare / Business / Trades / Hospitality
}

export interface VocationalCollege {
  name: string;
  location: string;
  type: "Public" | "Private";
  website: string;
  courses: VocationalCourse[];
}

/* ═══════════════════════════════════════════════════════════════════════════
   🇨🇦 CANADA — Top vocational colleges with PR-friendly programs
   ═══════════════════════════════════════════════════════════════════════════ */
const CANADA_COLLEGES: VocationalCollege[] = [
  {
    name: "Seneca College",
    location: "Toronto, ON",
    type: "Public",
    website: "senecacollege.ca",
    courses: [
      { name: "PG Diploma in Computer Programming", college: "Seneca College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 16,000/yr", tuitionINR: 9.8, intake: "Jan, May, Sep", prPathway: "NOC 21230 → EE CEC after 1 yr work", prFriendly: true, avgSalary: "CAD 65,000", requirements: "12th pass, IELTS 6.0", nocCode: "21230", category: "STEM" },
      { name: "PG Diploma in Cybersecurity", college: "Seneca College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 18,000", tuitionINR: 11.0, intake: "Sep", prPathway: "NOC 21220 → EE CEC after 1 yr work", prFriendly: true, avgSalary: "CAD 80,000", requirements: "IT/CS background, IELTS 6.5", nocCode: "21220", category: "STEM" },
      { name: "Diploma in Hospitality Management", college: "Seneca College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 15,000/yr", tuitionINR: 9.2, intake: "Jan, Sep", prPathway: "NOC 60030 → CEC after 1 yr work", prFriendly: true, avgSalary: "CAD 50,000", requirements: "12th pass, IELTS 6.0", nocCode: "60030", category: "Hospitality" },
      { name: "PG Diploma in Supply Chain Management", college: "Seneca College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 17,000", tuitionINR: 10.4, intake: "Jan, Sep", prPathway: "NOC 12100 → EE CEC", prFriendly: true, avgSalary: "CAD 60,000", requirements: "Any degree, IELTS 6.0", nocCode: "12100", category: "Business" },
    ],
  },
  {
    name: "Humber College",
    location: "Toronto, ON",
    type: "Public",
    website: "humber.ca",
    courses: [
      { name: "PG Diploma in Data Analytics", college: "Humber College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 17,000/yr", tuitionINR: 10.4, intake: "Jan, Sep", prPathway: "NOC 21211 → EE CEC after 1 yr work", prFriendly: true, avgSalary: "CAD 70,000", requirements: "Any degree, IELTS 6.5", nocCode: "21211", category: "STEM" },
      { name: "Diploma in Practical Nursing", college: "Humber College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 20,000/yr", tuitionINR: 12.3, intake: "Sep", prPathway: "NOC 31301 → RN registration → CEC", prFriendly: true, avgSalary: "CAD 75,000", requirements: "12th with Biology, IELTS 6.5", nocCode: "31301", category: "Healthcare" },
      { name: "PG Diploma in Cloud Computing", college: "Humber College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 18,500", tuitionINR: 11.4, intake: "Sep", prPathway: "NOC 21222 → EE CEC", prFriendly: true, avgSalary: "CAD 85,000", requirements: "IT/CS background, IELTS 6.5", nocCode: "21222", category: "STEM" },
      { name: "Diploma in Early Childhood Education", college: "Humber College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 15,500/yr", tuitionINR: 9.5, intake: "Jan, Sep", prPathway: "NOC 42202 → CEC (high demand)", prFriendly: true, avgSalary: "CAD 48,000", requirements: "12th pass, IELTS 6.0", nocCode: "42202", category: "Healthcare" },
    ],
  },
  {
    name: "George Brown College",
    location: "Toronto, ON",
    type: "Public",
    website: "georgebrown.ca",
    courses: [
      { name: "PG Diploma in AI & Machine Learning", college: "George Brown College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 19,000", tuitionINR: 11.7, intake: "Sep", prPathway: "NOC 21211 → EE CEC", prFriendly: true, avgSalary: "CAD 85,000", requirements: "CS/IT degree, IELTS 6.5", nocCode: "21211", category: "STEM" },
      { name: "Diploma in Construction Management", college: "George Brown College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 16,500/yr", tuitionINR: 10.1, intake: "Jan, Sep", prPathway: "NOC 70010 → CEC (Ontario demand)", prFriendly: true, avgSalary: "CAD 70,000", requirements: "12th pass, IELTS 6.0", nocCode: "70010", category: "Trades" },
      { name: "PG Diploma in Marketing Management", college: "George Brown College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 17,500", tuitionINR: 10.8, intake: "Jan, Sep", prPathway: "NOC 10022 → EE CEC", prFriendly: false, avgSalary: "CAD 55,000", requirements: "Any degree, IELTS 6.0", nocCode: "10022", category: "Business" },
    ],
  },
  {
    name: "Centennial College",
    location: "Toronto, ON",
    type: "Public",
    website: "centennialcollege.ca",
    courses: [
      { name: "PG Diploma in Software Engineering", college: "Centennial College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 16,500/yr", tuitionINR: 10.1, intake: "Jan, Sep", prPathway: "NOC 21231 → EE CEC after 1 yr work", prFriendly: true, avgSalary: "CAD 75,000", requirements: "Any degree, IELTS 6.5", nocCode: "21231", category: "STEM" },
      { name: "Diploma in Paramedic", college: "Centennial College", campus: "Toronto, ON", duration: "2 years", tuition: "CAD 18,000/yr", tuitionINR: 11.0, intake: "Sep", prPathway: "NOC 32102 → CEC (critical skill)", prFriendly: true, avgSalary: "CAD 85,000", requirements: "12th with Science, IELTS 6.5", nocCode: "32102", category: "Healthcare" },
      { name: "PG Diploma in Project Management", college: "Centennial College", campus: "Toronto, ON", duration: "1 year", tuition: "CAD 17,000", tuitionINR: 10.4, intake: "Jan, Sep", prPathway: "NOC 70010 → EE CEC", prFriendly: true, avgSalary: "CAD 80,000", requirements: "Any degree, IELTS 6.0", nocCode: "70010", category: "Business" },
    ],
  },
  {
    name: "Conestoga College",
    location: "Kitchener, ON",
    type: "Public",
    website: "conestogac.on.ca",
    courses: [
      { name: "PG Diploma in Big Data Analytics", college: "Conestoga College", campus: "Kitchener, ON", duration: "2 years", tuition: "CAD 16,000/yr", tuitionINR: 9.8, intake: "Jan, Sep", prPathway: "NOC 21211 → EE CEC", prFriendly: true, avgSalary: "CAD 75,000", requirements: "STEM degree, IELTS 6.5", nocCode: "21211", category: "STEM" },
      { name: "Diploma in Welding & Fabrication", college: "Conestoga College", campus: "Kitchener, ON", duration: "2 years", tuition: "CAD 14,000/yr", tuitionINR: 8.6, intake: "Jan, Sep", prPathway: "NOC 72106 → CEC (Ontario trades demand)", prFriendly: true, avgSalary: "CAD 60,000", requirements: "12th pass, IELTS 5.5", nocCode: "72106", category: "Trades" },
      { name: "PG Diploma in Mobile App Development", college: "Conestoga College", campus: "Kitchener, ON", duration: "1 year", tuition: "CAD 17,500", tuitionINR: 10.8, intake: "Sep", prPathway: "NOC 21232 → EE CEC", prFriendly: true, avgSalary: "CAD 72,000", requirements: "IT/CS background, IELTS 6.0", nocCode: "21232", category: "STEM" },
    ],
  },
  {
    name: "Sheridan College",
    location: "Oakville, ON",
    type: "Public",
    website: "sheridancollege.ca",
    courses: [
      { name: "PG Diploma in Game Development", college: "Sheridan College", campus: "Oakville, ON", duration: "1 year", tuition: "CAD 18,000", tuitionINR: 11.0, intake: "Sep", prPathway: "NOC 21232 → EE CEC", prFriendly: true, avgSalary: "CAD 70,000", requirements: "CS/Design degree, IELTS 6.5", nocCode: "21232", category: "STEM" },
      { name: "Diploma in Animation", college: "Sheridan College", campus: "Oakville, ON", duration: "2 years", tuition: "CAD 19,000/yr", tuitionINR: 11.7, intake: "Sep", prPathway: "NOC 53111 → CEC", prFriendly: false, avgSalary: "CAD 55,000", requirements: "Portfolio + 12th, IELTS 6.0", nocCode: "53111", category: "Arts" },
    ],
  },
  {
    name: "Douglas College",
    location: "Vancouver, BC",
    type: "Public",
    website: "douglascollege.ca",
    courses: [
      { name: "PG Diploma in Financial Analysis", college: "Douglas College", campus: "Vancouver, BC", duration: "1 year", tuition: "CAD 16,500", tuitionINR: 10.1, intake: "Jan, Sep", prPathway: "NOC 11101 → BC PNP", prFriendly: true, avgSalary: "CAD 65,000", requirements: "Commerce degree, IELTS 6.5", nocCode: "11101", category: "Business" },
      { name: "Diploma in Psychiatric Nursing", college: "Douglas College", campus: "Vancouver, BC", duration: "2 years", tuition: "CAD 18,500/yr", tuitionINR: 11.4, intake: "Sep", prPathway: "NOC 31301 → BC PNP (healthcare priority)", prFriendly: true, avgSalary: "CAD 78,000", requirements: "12th with Science, IELTS 6.5", nocCode: "31301", category: "Healthcare" },
    ],
  },
  {
    name: "Fanshawe College",
    location: "London, ON",
    type: "Public",
    website: "fanshawec.ca",
    courses: [
      { name: "PG Diploma in Network Security", college: "Fanshawe College", campus: "London, ON", duration: "1 year", tuition: "CAD 16,000", tuitionINR: 9.8, intake: "Jan, Sep", prPathway: "NOC 22220 → EE CEC", prFriendly: true, avgSalary: "CAD 72,000", requirements: "IT background, IELTS 6.0", nocCode: "22220", category: "STEM" },
      { name: "Diploma in Culinary Management", college: "Fanshawe College", campus: "London, ON", duration: "2 years", tuition: "CAD 15,000/yr", tuitionINR: 9.2, intake: "Jan, Sep", prPathway: "NOC 60030 → CEC", prFriendly: false, avgSalary: "CAD 45,000", requirements: "12th pass, IELTS 6.0", nocCode: "60030", category: "Hospitality" },
    ],
  },
  {
    name: "SAIT (Southern Alberta Institute of Technology)",
    location: "Calgary, AB",
    type: "Public",
    website: "sait.ca",
    courses: [
      { name: "PG Diploma in Data Analytics", college: "SAIT", campus: "Calgary, AB", duration: "1 year", tuition: "CAD 18,000", tuitionINR: 11.0, intake: "Jan, Sep", prPathway: "NOC 21211 → Alberta Advantage Immigration", prFriendly: true, avgSalary: "CAD 70,000", requirements: "Any degree, IELTS 6.0", nocCode: "21211", category: "STEM" },
      { name: "Diploma in Petroleum Engineering Tech", college: "SAIT", campus: "Calgary, AB", duration: "2 years", tuition: "CAD 19,000/yr", tuitionINR: 11.7, intake: "Sep", prPathway: "NOC 21330 → Alberta PNP (high demand)", prFriendly: true, avgSalary: "CAD 85,000", requirements: "12th with Math/Physics, IELTS 6.0", nocCode: "21330", category: "Trades" },
    ],
  },
  {
    name: "Mohawk College",
    location: "Hamilton, ON",
    type: "Public",
    website: "mohawkcollege.ca",
    courses: [
      { name: "PG Diploma in Business Analysis", college: "Mohawk College", campus: "Hamilton, ON", duration: "1 year", tuition: "CAD 16,000", tuitionINR: 9.8, intake: "Jan, Sep", prPathway: "NOC 21221 → EE CEC", prFriendly: true, avgSalary: "CAD 68,000", requirements: "Any degree, IELTS 6.0", nocCode: "21221", category: "Business" },
      { name: "Diploma in Electrical Engineering Tech", college: "Mohawk College", campus: "Hamilton, ON", duration: "2 years", tuition: "CAD 15,500/yr", tuitionINR: 9.5, intake: "Jan, Sep", prPathway: "NOC 22310 → CEC (trades shortage)", prFriendly: true, avgSalary: "CAD 65,000", requirements: "12th with Math, IELTS 6.0", nocCode: "22310", category: "Trades" },
    ],
  },
  {
    name: "Langara College",
    location: "Vancouver, BC",
    type: "Public",
    website: "langara.ca",
    courses: [
      { name: "PG Diploma in Web & Mobile App Development", college: "Langara College", campus: "Vancouver, BC", duration: "2 years", tuition: "CAD 15,500/yr", tuitionINR: 9.5, intake: "Jan, Sep", prPathway: "NOC 21232 → BC PNP Tech Pilot", prFriendly: true, avgSalary: "CAD 75,000", requirements: "Any degree, IELTS 6.0", nocCode: "21232", category: "STEM" },
      { name: "Diploma in Nursing (LPN to RN)", college: "Langara College", campus: "Vancouver, BC", duration: "2 years", tuition: "CAD 17,000/yr", tuitionINR: 10.4, intake: "Sep", prPathway: "NOC 31301 → BC PNP Healthcare", prFriendly: true, avgSalary: "CAD 82,000", requirements: "LPN license + 12th, IELTS 7.0", nocCode: "31301", category: "Healthcare" },
    ],
  },
  {
    name: "Niagara College",
    location: "Niagara-on-the-Lake, ON",
    type: "Public",
    website: "niagaracollege.ca",
    courses: [
      { name: "PG Diploma in International Business", college: "Niagara College", campus: "Niagara, ON", duration: "1 year", tuition: "CAD 16,500", tuitionINR: 10.1, intake: "Jan, Sep", prPathway: "NOC 60010 → CEC", prFriendly: false, avgSalary: "CAD 55,000", requirements: "Any degree, IELTS 6.0", nocCode: "60010", category: "Business" },
      { name: "Diploma in Winery & Viticulture", college: "Niagara College", campus: "Niagara, ON", duration: "2 years", tuition: "CAD 15,000/yr", tuitionINR: 9.2, intake: "Sep", prPathway: "NOC 82031 → Rural NIA (RNIP)", prFriendly: true, avgSalary: "CAD 50,000", requirements: "12th pass, IELTS 5.5", nocCode: "82031", category: "Hospitality" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇦🇺 AUSTRALIA — TAFEs & vocational institutes with PR pathways
   ═══════════════════════════════════════════════════════════════════════════ */
const AUSTRALIA_COLLEGES: VocationalCollege[] = [
  {
    name: "TAFE NSW",
    location: "Sydney, NSW",
    type: "Public",
    website: "tafensw.edu.au",
    courses: [
      { name: "Diploma of Information Technology", college: "TAFE NSW", campus: "Sydney, NSW", duration: "1 year", tuition: "AUD 18,000", tuitionINR: 10.0, intake: "Feb, Jul", prPathway: "ANZSCO 261111 → 485 visa → 189/190", prFriendly: true, avgSalary: "AUD 75,000", requirements: "12th pass, IELTS 5.5", nocCode: "261111", category: "STEM" },
      { name: "Advanced Diploma of Cyber Security", college: "TAFE NSW", campus: "Sydney, NSW", duration: "1.5 years", tuition: "AUD 22,000", tuitionINR: 12.2, intake: "Feb, Jul", prPathway: "ANZSCO 262112 → 485 → 189/190", prFriendly: true, avgSalary: "AUD 95,000", requirements: "IT diploma or experience, IELTS 6.0", nocCode: "262112", category: "STEM" },
      { name: "Diploma of Nursing (Enrolled Nurse)", college: "TAFE NSW", campus: "Sydney, NSW", duration: "18 months", tuition: "AUD 24,000", tuitionINR: 13.3, intake: "Feb, Jul", prPathway: "ANZSCO 411411 → 485 → 189/190 (high demand)", prFriendly: true, avgSalary: "AUD 70,000", requirements: "12th with English, IELTS 7.0", nocCode: "411411", category: "Healthcare" },
      { name: "Certificate IV in Commercial Cookery", college: "TAFE NSW", campus: "Sydney, NSW", duration: "1 year", tuition: "AUD 14,000", tuitionINR: 7.8, intake: "Feb, Apr, Jul, Oct", prPathway: "ANZSCO 351311 → 482 → 186 ENS", prFriendly: true, avgSalary: "AUD 55,000", requirements: "12th pass, IELTS 5.5", nocCode: "351311", category: "Hospitality" },
    ],
  },
  {
    name: "Holmesglen Institute",
    location: "Melbourne, VIC",
    type: "Public",
    website: "holmesglen.edu.au",
    courses: [
      { name: "Diploma of Early Childhood Education", college: "Holmesglen Institute", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 16,000", tuitionINR: 8.9, intake: "Feb, Jul", prPathway: "ANZSCO 421111 → 485 → 189/190 (MLTSSL)", prFriendly: true, avgSalary: "AUD 65,000", requirements: "12th pass, IELTS 6.0", nocCode: "421111", category: "Healthcare" },
      { name: "Advanced Diploma of Civil Engineering", college: "Holmesglen Institute", campus: "Melbourne, VIC", duration: "2 years", tuition: "AUD 20,000/yr", tuitionINR: 11.1, intake: "Feb, Jul", prPathway: "ANZSCO 312211 → 485 → 190 (VIC state)", prFriendly: true, avgSalary: "AUD 85,000", requirements: "12th with Math, IELTS 6.0", nocCode: "312211", category: "Trades" },
      { name: "Diploma of Community Services", college: "Holmesglen Institute", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 15,000", tuitionINR: 8.3, intake: "Feb, Jul", prPathway: "ANZSCO 411711 → 485 → 189/190", prFriendly: true, avgSalary: "AUD 60,000", requirements: "12th pass, IELTS 6.0", nocCode: "411711", category: "Healthcare" },
    ],
  },
  {
    name: "Box Hill Institute",
    location: "Melbourne, VIC",
    type: "Public",
    website: "boxhill.edu.au",
    courses: [
      { name: "Diploma of Software Development", college: "Box Hill Institute", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 17,000", tuitionINR: 9.4, intake: "Feb, Jul", prPathway: "ANZSCO 261312 → 485 → 190 (VIC tech)", prFriendly: true, avgSalary: "AUD 80,000", requirements: "IT diploma or degree, IELTS 6.0", nocCode: "261312", category: "STEM" },
      { name: "Certificate III in Carpentry", college: "Box Hill Institute", campus: "Melbourne, VIC", duration: "2 years", tuition: "AUD 14,000/yr", tuitionINR: 7.8, intake: "Feb, Jul", prPathway: "ANZSCO 331212 → 485 → 189/190 (trades)", prFriendly: true, avgSalary: "AUD 70,000", requirements: "12th pass, IELTS 5.5", nocCode: "331212", category: "Trades" },
    ],
  },
  {
    name: "William Angliss Institute",
    location: "Melbourne, VIC",
    type: "Public",
    website: "angliss.edu.au",
    courses: [
      { name: "Advanced Diploma of Hospitality Management", college: "William Angliss", campus: "Melbourne, VIC", duration: "2 years", tuition: "AUD 16,000/yr", tuitionINR: 8.9, intake: "Feb, Jul", prPathway: "ANZSCO 141111 → 485 → 190", prFriendly: true, avgSalary: "AUD 60,000", requirements: "12th pass, IELTS 5.5", nocCode: "141111", category: "Hospitality" },
      { name: "Diploma of Event Management", college: "William Angliss", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 15,000", tuitionINR: 8.3, intake: "Feb, Jul", prPathway: "ANZSCO 149311 → 485 → 190", prFriendly: false, avgSalary: "AUD 55,000", requirements: "12th pass, IELTS 6.0", nocCode: "149311", category: "Hospitality" },
    ],
  },
  {
    name: "MIT (Melbourne Institute of Technology)",
    location: "Melbourne, VIC",
    type: "Private",
    website: "mit.edu.au",
    courses: [
      { name: "PG Diploma in Telecommunication", college: "MIT", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 16,500", tuitionINR: 9.2, intake: "Feb, Jul, Nov", prPathway: "ANZSCO 263312 → 485 → 189/190", prFriendly: true, avgSalary: "AUD 78,000", requirements: "Engineering degree, IELTS 6.0", nocCode: "263312", category: "STEM" },
      { name: "Diploma of Business", college: "MIT", campus: "Melbourne, VIC", duration: "1 year", tuition: "AUD 13,000", tuitionINR: 7.2, intake: "Feb, Jul, Nov", prPathway: "ANZSCO 131111 → 485 → 190", prFriendly: false, avgSalary: "AUD 55,000", requirements: "12th pass, IELTS 5.5", nocCode: "131111", category: "Business" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇩🇪 GERMANY — Ausbildung & vocational programs (often free/low cost)
   ═══════════════════════════════════════════════════════════════════════════ */
const GERMANY_COLLEGES: VocationalCollege[] = [
  {
    name: "Berlin School of Economics & Law (BSEL)",
    location: "Berlin",
    type: "Public",
    website: "hwr-berlin.de",
    courses: [
      { name: "Ausbildung IT Specialist (Fachinformatiker)", college: "BSEL", campus: "Berlin", duration: "3 years", tuition: "€0 (stipend €800-1,200/mo)", tuitionINR: 0, intake: "Aug/Sep", prPathway: "EU Blue Card after Ausbildung + 2yr work", prFriendly: true, avgSalary: "€45,000", requirements: "B1 German, 12th pass, company contract", category: "STEM" },
      { name: "Ausbildung Nursing (Gesundheits- und Krankenpfleger)", college: "BSEL", campus: "Berlin", duration: "3 years", tuition: "€0 (stipend €1,100-1,400/mo)", tuitionINR: 0, intake: "Aug/Sep", prPathway: "EU Blue Card → PR after 33 months", prFriendly: true, avgSalary: "€42,000", requirements: "B1 German, 12th with Biology", category: "Healthcare" },
    ],
  },
  {
    name: "Lufthansa Technical Training",
    location: "Hamburg",
    type: "Private",
    website: "lufthansa-technik.com",
    courses: [
      { name: "Ausbildung Aircraft Mechanic", college: "Lufthansa Technical", campus: "Hamburg", duration: "3.5 years", tuition: "€0 (paid apprenticeship)", tuitionINR: 0, intake: "Aug/Sep", prPathway: "EU Blue Card → PR after 33 months", prFriendly: true, avgSalary: "€48,000", requirements: "B1 German, 12th with Physics", category: "Trades" },
    ],
  },
  {
    name: "TUM (Technical University Munich) — Certificate Programs",
    location: "Munich",
    type: "Public",
    website: "tum.de",
    courses: [
      { name: "Certificate in Data Science & AI", college: "TUM", campus: "Munich", duration: "1 year", tuition: "€6,000", tuitionINR: 5.5, intake: "Oct", prPathway: "18-month Job Seeker visa after certificate", prFriendly: true, avgSalary: "€55,000", requirements: "STEM degree, B1 German, IELTS 6.5", category: "STEM" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇬🇧 UK — Level 4-5 Diplomas & HNDs
   ═══════════════════════════════════════════════════════════════════════════ */
const UK_COLLEGES: VocationalCollege[] = [
  {
    name: "BPP University",
    location: "London",
    type: "Private",
    website: "bpp.com",
    courses: [
      { name: "HND in Business & Management", college: "BPP University", campus: "London", duration: "2 years", tuition: "£12,000/yr", tuitionINR: 12.6, intake: "Jan, Sep", prPathway: "Graduate Visa 2yr → Skilled Worker visa", prFriendly: false, avgSalary: "£30,000", requirements: "12th pass, IELTS 5.5", category: "Business" },
      { name: "HND in Computing", college: "BPP University", campus: "London", duration: "2 years", tuition: "£13,000/yr", tuitionINR: 13.7, intake: "Jan, Sep", prPathway: "Graduate Visa → Skilled Worker (tech shortage)", prFriendly: true, avgSalary: "£35,000", requirements: "12th with Math, IELTS 5.5", category: "STEM" },
    ],
  },
  {
    name: "Pearson College London",
    location: "London",
    type: "Private",
    website: "pearsoncollegelondon.ac.uk",
    courses: [
      { name: "Higher National Diploma in Digital Arts", college: "Pearson College", campus: "London", duration: "2 years", tuition: "£11,000/yr", tuitionINR: 11.6, intake: "Sep", prPathway: "Graduate Visa → Creative industries", prFriendly: false, avgSalary: "£28,000", requirements: "Portfolio + 12th, IELTS 5.5", category: "Arts" },
    ],
  },
  {
    name: "Ulster University — Belfast Campus",
    location: "Belfast, Northern Ireland",
    type: "Public",
    website: "ulster.ac.uk",
    courses: [
      { name: "Foundation Degree in Software Engineering", college: "Ulster University", campus: "Belfast", duration: "2 years", tuition: "£9,250/yr", tuitionINR: 9.7, intake: "Sep", prPathway: "Graduate Visa → Skilled Worker (NI has shortage)", prFriendly: true, avgSalary: "£32,000", requirements: "12th with Math, IELTS 6.0", category: "STEM" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇮🇪 IRELAND — PLC & Post-Leaving Cert courses
   ═══════════════════════════════════════════════════════════════════════════ */
const IRELAND_COLLEGES: VocationalCollege[] = [
  {
    name: "Dublin Institute of Technology (TUD)",
    location: "Dublin",
    type: "Public",
    website: "tudublin.ie",
    courses: [
      { name: "Higher Certificate in Science in Computing", college: "TUD", campus: "Dublin", duration: "2 years", tuition: "€10,000/yr", tuitionINR: 9.2, intake: "Sep", prPathway: "Stamp 1G (2yr) → Critical Skills Employment", prFriendly: true, avgSalary: "€40,000", requirements: "12th with Math, IELTS 6.0", category: "STEM" },
      { name: "PLC in Healthcare Support", college: "TUD", campus: "Dublin", duration: "1 year", tuition: "€8,000", tuitionINR: 7.4, intake: "Sep", prPathway: "Stamp 1G → Critical Skills (healthcare shortage)", prFriendly: true, avgSalary: "€30,000", requirements: "12th pass, IELTS 5.5", category: "Healthcare" },
    ],
  },
  {
    name: "Griffith College",
    location: "Dublin",
    type: "Private",
    website: "griffith.ie",
    courses: [
      { name: "Higher Diploma in Science in Computing", college: "Griffith College", campus: "Dublin", duration: "1 year", tuition: "€14,000", tuitionINR: 12.9, intake: "Sep, Jan", prPathway: "Stamp 1G → Critical Skills (tech shortage)", prFriendly: true, avgSalary: "€42,000", requirements: "Any degree, IELTS 6.0", category: "STEM" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇳🇿 NEW ZEALAND — Polytechnics & Institutes of Technology
   ═══════════════════════════════════════════════════════════════════════════ */
const NEWZEALAND_COLLEGES: VocationalCollege[] = [
  {
    name: "Unitec Institute of Technology",
    location: "Auckland",
    type: "Public",
    website: "unitec.ac.nz",
    courses: [
      { name: "Diploma in Applied Technology", college: "Unitec", campus: "Auckland", duration: "2 years", tuition: "NZD 22,000/yr", tuitionINR: 11.0, intake: "Feb, Jul", prPathway: "Post-study work visa → SMC (points)", prFriendly: true, avgSalary: "NZD 60,000", requirements: "12th pass, IELTS 5.5", category: "STEM" },
      { name: "Diploma in Construction Management", college: "Unitec", campus: "Auckland", duration: "2 years", tuition: "NZD 20,000/yr", tuitionINR: 10.0, intake: "Feb, Jul", prPathway: "Post-study work → SMC (construction shortage)", prFriendly: true, avgSalary: "NZD 70,000", requirements: "12th with Math, IELTS 6.0", category: "Trades" },
    ],
  },
  {
    name: "Manukau Institute of Technology (MIT)",
    location: "Auckland",
    type: "Public",
    website: "manukau.ac.nz",
    courses: [
      { name: "Diploma in Nursing", college: "MIT", campus: "Auckland", duration: "2 years", tuition: "NZD 24,000/yr", tuitionINR: 12.0, intake: "Feb, Jul", prPathway: "Post-study work → SMC (healthcare shortage)", prFriendly: true, avgSalary: "NZD 65,000", requirements: "12th with Science, IELTS 6.5", category: "Healthcare" },
      { name: "Diploma in Culinary Arts", college: "MIT", campus: "Auckland", duration: "1 year", tuition: "NZD 18,000", tuitionINR: 9.0, intake: "Feb, Jul", prPathway: "Post-study work → SMC (hospitality)", prFriendly: false, avgSalary: "NZD 50,000", requirements: "12th pass, IELTS 5.5", category: "Hospitality" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MASTER MAP: Country → Colleges
   ═══════════════════════════════════════════════════════════════════════════ */
const VOCATIONAL_DB: Record<string, VocationalCollege[]> = {
  Canada: CANADA_COLLEGES,
  Australia: AUSTRALIA_COLLEGES,
  Germany: GERMANY_COLLEGES,
  UK: UK_COLLEGES,
  Ireland: IRELAND_COLLEGES,
  "New Zealand": NEWZEALAND_COLLEGES,
};

/* ═══════════════════════════════════════════════════════════════════════════
   PUBLIC API
   ═══════════════════════════════════════════════════════════════════════════ */

/** Get all vocational colleges for a country */
export function getVocationalColleges(country: string): VocationalCollege[] {
  return VOCATIONAL_DB[country] || [];
}

/** Get all vocational courses for a country, optionally filtered by category */
export function getVocationalCourses(country: string, category?: string): VocationalCourse[] {
  const colleges = VOCATIONAL_DB[country] || [];
  let courses = colleges.flatMap(c => c.courses);
  if (category && category !== "All") {
    courses = courses.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  return courses;
}

/** Get PR-friendly vocational courses for a country */
export function getPRFriendlyVocationalCourses(country: string): VocationalCourse[] {
  return getVocationalCourses(country).filter(c => c.prFriendly);
}

/** Get all courses across all countries */
export function getAllVocationalCourses(): { country: string; course: VocationalCourse }[] {
  const result: { country: string; course: VocationalCourse }[] = [];
  for (const [country, colleges] of Object.entries(VOCATIONAL_DB)) {
    for (const college of colleges) {
      for (const course of college.courses) {
        result.push({ country, course });
      }
    }
  }
  return result;
}

/** Get all countries that have vocational course data */
export function getVocationalCountries(): string[] {
  return Object.keys(VOCATIONAL_DB);
}

/** Check if a country has vocational data */
export function hasVocationalData(country: string): boolean {
  return !!VOCATIONAL_DB[country] && VOCATIONAL_DB[country].length > 0;
}

/** Get vocational summary stats for a country */
export function getVocationalSummary(country: string): {
  totalColleges: number;
  totalCourses: number;
  prFriendlyCourses: number;
  categories: string[];
  avgTuitionINR: number;
} | null {
  const colleges = VOCATIONAL_DB[country];
  if (!colleges || colleges.length === 0) return null;

  const allCourses = colleges.flatMap(c => c.courses);
  const prFriendly = allCourses.filter(c => c.prFriendly);
  const categories = [...new Set(allCourses.map(c => c.category))];
  const avgTuition = allCourses.length > 0
    ? Math.round(allCourses.reduce((sum, c) => sum + c.tuitionINR, 0) / allCourses.length * 10) / 10
    : 0;

  return {
    totalColleges: colleges.length,
    totalCourses: allCourses.length,
    prFriendlyCourses: prFriendly.length,
    categories,
    avgTuitionINR: avgTuition,
  };
}
