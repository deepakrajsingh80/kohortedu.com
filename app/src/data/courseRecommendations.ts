export interface CourseRec {
  course: string;
  avgSalary: string;
  prFriendly: boolean;
  notes?: string;
}

const courseRecs: Record<string, Record<string, Record<string, CourseRec[]>>> = {
  usa: {
    "postgraduate": {
      "engineering": [
        { course: "MS Computer Science", avgSalary: "$120K - $180K", prFriendly: true, notes: "Top choice for Indian STEM grads. 3-year STEM OPT." },
        { course: "MS Data Science / AI", avgSalary: "$130K - $200K", prFriendly: true, notes: "Highest demand field. Every company needs AI talent." },
        { course: "MS Cybersecurity", avgSalary: "$110K - $160K", prFriendly: true, notes: "Zero unemployment rate. Critical shortage globally." },
        { course: "MS Software Engineering", avgSalary: "$115K - $170K", prFriendly: true, notes: "Broad applicability. FAANG + startups hire aggressively." },
        { course: "MEng Electrical & Computer", avgSalary: "$105K - $155K", prFriendly: true, notes: "Strong in semiconductors, robotics, automotive." },
      ],
      "business": [
        { course: "MBA (General)", avgSalary: "$110K - $160K", prFriendly: false },
        { course: "MS Business Analytics", avgSalary: "$95K - $140K", prFriendly: true },
        { course: "MS Finance / Financial Engineering", avgSalary: "$100K - $150K", prFriendly: false },
        { course: "MS Supply Chain Management", avgSalary: "$85K - $125K", prFriendly: true },
        { course: "MS Marketing Analytics", avgSalary: "$80K - $120K", prFriendly: false },
      ],
      "science": [
        { course: "MS Biotechnology", avgSalary: "$80K - $120K", prFriendly: true },
        { course: "MS Statistics", avgSalary: "$90K - $135K", prFriendly: true },
        { course: "MS Environmental Science", avgSalary: "$70K - $105K", prFriendly: false },
        { course: "MS Physics (Applied)", avgSalary: "$85K - $125K", prFriendly: true },
      ],
      "health": [
        { course: "MPH (Public Health)", avgSalary: "$70K - $100K", prFriendly: true },
        { course: "MS Healthcare Administration", avgSalary: "$75K - $110K", prFriendly: true },
        { course: "MS Nursing (MSN)", avgSalary: "$90K - $130K", prFriendly: true },
        { course: "MS Health Informatics", avgSalary: "$85K - $125K", prFriendly: true },
      ],
    },
    "undergraduate": {
      "engineering": [
        { course: "BS Computer Science", avgSalary: "$90K - $140K", prFriendly: true },
        { course: "BS Information Technology", avgSalary: "$75K - $115K", prFriendly: true },
        { course: "BS Data Science", avgSalary: "$85K - $130K", prFriendly: true },
        { course: "BS Cybersecurity", avgSalary: "$80K - $125K", prFriendly: true },
      ],
      "business": [
        { course: "BBA", avgSalary: "$60K - $90K", prFriendly: false },
        { course: "BS Economics", avgSalary: "$65K - $95K", prFriendly: false },
        { course: "BS Accounting", avgSalary: "$60K - $85K", prFriendly: true },
      ],
    },
  },
  canada: {
    "postgraduate": {
      "engineering": [
        { course: "MEng / MASc Computer Engineering", avgSalary: "CAD $95K - $140K", prFriendly: true },
        { course: "MEng Software Engineering", avgSalary: "CAD $90K - $135K", prFriendly: true },
        { course: "MEng Data Science", avgSalary: "CAD $95K - $145K", prFriendly: true },
        { course: "MEng Electrical", avgSalary: "CAD $85K - $125K", prFriendly: true },
        { course: "MEng Mechanical", avgSalary: "CAD $80K - $120K", prFriendly: true },
      ],
      "business": [
        { course: "PG Diploma in Business Analytics", avgSalary: "CAD $65K - $95K", prFriendly: true },
        { course: "MBA", avgSalary: "CAD $90K - $130K", prFriendly: true },
        { course: "MSc Finance", avgSalary: "CAD $75K - $110K", prFriendly: true },
        { course: "Supply Chain Management PG Diploma", avgSalary: "CAD $60K - $85K", prFriendly: true },
        { course: "Project Management PG Diploma", avgSalary: "CAD $70K - $100K", prFriendly: true },
      ],
      "science": [
        { course: "MSc Biotechnology", avgSalary: "CAD $65K - $95K", prFriendly: true },
        { course: "MSc Environmental Science", avgSalary: "CAD $60K - $90K", prFriendly: true },
      ],
      "health": [
        { course: "MPH", avgSalary: "CAD $70K - $100K", prFriendly: true },
        { course: "MSc Nursing", avgSalary: "CAD $85K - $120K", prFriendly: true },
        { course: "Healthcare Administration PG Diploma", avgSalary: "CAD $60K - $85K", prFriendly: true },
        { course: "Pharmacy (PharmD)", avgSalary: "CAD $95K - $130K", prFriendly: true },
      ],
    },
    "undergraduate": {
      "engineering": [
        { course: "BEng Computer Science", avgSalary: "CAD $75K - $110K", prFriendly: true },
        { course: "BEng Software Engineering", avgSalary: "CAD $70K - $105K", prFriendly: true },
      ],
      "business": [
        { course: "BBA", avgSalary: "CAD $50K - $75K", prFriendly: true },
        { course: "BCom Accounting", avgSalary: "CAD $55K - $80K", prFriendly: true },
      ],
    },
  },
  uk: {
    "postgraduate": {
      "engineering": [
        { course: "MSc Computer Science", avgSalary: "£45K - £70K", prFriendly: true },
        { course: "MSc Data Science / AI", avgSalary: "£50K - £80K", prFriendly: true },
        { course: "MSc Cybersecurity", avgSalary: "£45K - £70K", prFriendly: true },
        { course: "MEng Software Engineering", avgSalary: "£42K - £65K", prFriendly: true },
      ],
      "business": [
        { course: "MBA", avgSalary: "£65K - £100K", prFriendly: true },
        { course: "MSc Business Analytics", avgSalary: "£40K - £65K", prFriendly: true },
        { course: "MSc Finance", avgSalary: "£50K - £80K", prFriendly: true },
        { course: "MSc Management", avgSalary: "£35K - £55K", prFriendly: true },
        { course: "MSc Marketing", avgSalary: "£32K - £50K", prFriendly: false },
      ],
      "science": [
        { course: "MSc Biotechnology", avgSalary: "£35K - £55K", prFriendly: true },
        { course: "MSc Statistics", avgSalary: "£40K - £65K", prFriendly: true },
      ],
      "health": [
        { course: "MPH", avgSalary: "£35K - £55K", prFriendly: true },
        { course: "MSc Nursing", avgSalary: "£35K - £50K", prFriendly: true },
        { course: "MSc Healthcare Management", avgSalary: "£38K - £60K", prFriendly: true },
      ],
    },
    "undergraduate": {
      "engineering": [
        { course: "BEng Computer Science", avgSalary: "£35K - £55K", prFriendly: true },
        { course: "BEng Software Engineering", avgSalary: "£32K - £50K", prFriendly: true },
      ],
      "business": [
        { course: "BSc Business Management", avgSalary: "£28K - £42K", prFriendly: true },
        { course: "BSc Accounting & Finance", avgSalary: "£30K - £48K", prFriendly: true },
      ],
    },
  },
  germany: {
    "postgraduate": {
      "engineering": [
        { course: "MSc Computer Science (TU Munich, TUB)", avgSalary: "€65K - €95K", prFriendly: true },
        { course: "MSc Data Engineering & Analytics", avgSalary: "€60K - €90K", prFriendly: true },
        { course: "MSc Automotive Engineering (RWTH)", avgSalary: "€55K - €85K", prFriendly: true },
        { course: "MSc Robotics / AI", avgSalary: "€62K - €92K", prFriendly: true },
        { course: "MSc Embedded Systems", avgSalary: "€58K - €88K", prFriendly: true },
      ],
      "business": [
        { course: "MBA (Mannheim, WHU, HHL)", avgSalary: "€75K - €110K", prFriendly: true },
        { course: "MSc Management & Technology (TUM)", avgSalary: "€55K - €80K", prFriendly: true },
        { course: "MSc Finance & Accounting", avgSalary: "€52K - €78K", prFriendly: true },
      ],
      "science": [
        { course: "MSc Biotechnology (LMU, Heidelberg)", avgSalary: "€45K - €70K", prFriendly: true },
        { course: "MSc Physics (Technical)", avgSalary: "€50K - €75K", prFriendly: true },
      ],
      "health": [
        { course: "MPH (Charite Berlin)", avgSalary: "€42K - €65K", prFriendly: true },
        { course: "MSc Medical Informatics", avgSalary: "€48K - €72K", prFriendly: true },
      ],
    },
    "undergraduate": {
      "engineering": [
        { course: "BSc Computer Science (TU9)", avgSalary: "€50K - €75K", prFriendly: true },
        { course: "BSc Information Engineering", avgSalary: "€48K - €72K", prFriendly: true },
      ],
    },
  },
  australia: {
    "postgraduate": {
      "engineering": [
        { course: "MEng Software Engineering", avgSalary: "AUD $95K - $140K", prFriendly: true },
        { course: "MSc Data Science", avgSalary: "AUD $100K - $150K", prFriendly: true },
        { course: "MEng Civil Engineering", avgSalary: "AUD $85K - $125K", prFriendly: true },
        { course: "MEng Electrical", avgSalary: "AUD $90K - $135K", prFriendly: true },
      ],
      "business": [
        { course: "MBA", avgSalary: "AUD $100K - $150K", prFriendly: true },
        { course: "MSc Business Analytics", avgSalary: "AUD $85K - $125K", prFriendly: true },
        { course: "Master of Professional Accounting", avgSalary: "AUD $70K - $100K", prFriendly: true },
        { course: "MSc Finance", avgSalary: "AUD $90K - $130K", prFriendly: true },
      ],
      "health": [
        { course: "MPH", avgSalary: "AUD $80K - $115K", prFriendly: true },
        { course: "MSc Nursing", avgSalary: "AUD $85K - $120K", prFriendly: true },
        { course: "Master of Physiotherapy", avgSalary: "AUD $75K - $105K", prFriendly: true },
        { course: "Master of Occupational Therapy", avgSalary: "AUD $78K - $110K", prFriendly: true },
      ],
    },
  },
};

export function getCourseRecommendations(country: string, level: string, major: string): CourseRec[] {
  const c = country.toLowerCase().replace(/\s+/g, "-");
  const l = level.toLowerCase().replace(/\s+/g, "-");
  const m = major.toLowerCase().replace(/\s+/g, "-");

  // Map level values
  const levelMap: Record<string, string> = {
    "undergraduate": "undergraduate",
    "ug": "undergraduate",
    "postgraduate": "postgraduate",
    "pg": "postgraduate",
    "masters": "postgraduate",
    "phd": "postgraduate",
    "doctorate": "postgraduate",
    "diploma": "postgraduate",
  };

  const mappedLevel = levelMap[l] || "postgraduate";

  // Map major values from Evaluate.tsx choices to data file keys
  const majorMap: Record<string, string> = {
    "engineering": "engineering",
    "computer-science": "engineering",
    "cs": "engineering",
    "information-technology": "engineering",
    "it": "engineering",
    "stem": "engineering",
    "business": "business",
    "management": "business",
    "mba": "business",
    "finance": "business",
    "mgmt": "business",
    "accts": "business",
    "accounts": "business",
    "accounting": "business",
    "science": "science",
    "life-sciences": "science",
    "mathematics": "science",
    "health": "health",
    "medicine": "health",
    "nursing": "health",
    "pharmacy": "health",
    "arts": "science",
    "humanities": "science",
    "law": "business",
  };

  const mappedMajor = majorMap[m] || "engineering";

  const countryData = courseRecs[c];
  if (!countryData) return [];

  const levelData = countryData[mappedLevel];
  if (!levelData) return [];

  return levelData[mappedMajor] || [];
}
