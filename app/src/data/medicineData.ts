export const medPrograms = [
  {
    id: "mbbs",
    title: "MBBS / MD",
    duration: "4-6 Years",
    avgTuition: "0-60L/year",
    description: "Bachelor of Medicine & Bachelor of Surgery (MBBS) or Doctor of Medicine (MD). Study in Russia, Philippines, Georgia, Ukraine, China, Caribbean or USA (MD).",
    whoFor: ["12th with PCB (50%+)", "NEET qualified (for some countries)", "Want to practice medicine", "Can invest 6-50L total"],
    eligibility: ["12th with Physics, Chemistry, Biology", "NEET (for India practice)", "IELTS 6.5+ (some countries)", "Age 17+ at admission"],
    countries: [
      { name: "Russia", tuition: "3-6L/yr", salary: "$40-80K", exam: "FMGE (India)", pr: "Citizenship after 5 yrs" },
      { name: "Philippines", tuition: "3-5L/yr", salary: "$50-90K", exam: "NMAT + FMGE", pr: "Permanent Resident after 5 yrs" },
      { name: "Georgia", tuition: "4-7L/yr", salary: "$50-85K", exam: "FMGE", pr: "Easy EU pathway" },
      { name: "USA (MD)", tuition: "40-60L/yr", salary: "$200-400K", exam: "USMLE (3 steps)", pr: "J-1 to H-1B to GC" },
      { name: "China", tuition: "2-5L/yr", salary: "$40-70K", exam: "FMGE", pr: "Work visa after degree" },
      { name: "Caribbean", tuition: "15-25L/yr", salary: "$200-350K", exam: "USMLE", pr: "Match in USA" },
    ],
    licensing: [
      { country: "India (After Abroad MBBS)", exam: "NEXT (National Exit Test) / FMGE", steps: ["Clear FMGE/NEXT", "Complete 1-year internship in India", "Register with MCI/NMC", "Start practice or PG preparation"] },
      { country: "USA", exam: "USMLE (United States Medical Licensing Examination)", steps: ["USMLE Step 1 (after 2nd yr)", "USMLE Step 2 CK & CS", "ERAS application + Residency Match", "USMLE Step 3 + State License"] },
      { country: "UK", exam: "PLAB / UKMLA", steps: ["IELTS/OET", "PLAB Part 1 + Part 2", "FY2 application", "GMC Registration"] },
    ],
    careers: [
      { role: "General Physician", usa: "$180-250K", canada: "CAD 150-250K", uk: "£60-100K", aus: "AUD 150-250K" },
      { role: "Surgeon", usa: "$300-500K", canada: "CAD 250-450K", uk: "£80-150K", aus: "AUD 250-450K" },
      { role: "Cardiologist", usa: "$350-600K", canada: "CAD 300-500K", uk: "£100-180K", aus: "AUD 300-500K" },
    ],
  },
  {
    id: "nursing",
    title: "Nursing (BSN)",
    duration: "2-4 Years",
    avgTuition: "5-20L/year",
    description: "Bachelor of Science in Nursing. Easiest PR pathway among all healthcare professions. Massive demand in Canada, UK, Australia, USA.",
    whoFor: ["12th any stream (science preferred)", "Compassionate caregivers", "Want fast PR", "Nursing background a plus"],
    eligibility: ["12th pass (50%+)", "IELTS 7.0 (NMC requires 7.0)", "Some programs accept 12th only", "Work experience preferred"],
    countries: [
      { name: "Canada", tuition: "10-20L/yr", salary: "CAD 70-100K", exam: "NCLEX-RN", pr: "Express Entry - 6 months!" },
      { name: "UK", tuition: "8-15L/yr", salary: "£25-40K", exam: "NMC OSCE", pr: "Health & Care Worker Visa" },
      { name: "Australia", tuition: "12-18L/yr", salary: "AUD 70-95K", exam: "AHPRA", pr: "Subclass 189/190" },
      { name: "USA", tuition: "15-25L/yr", salary: "$75-110K", exam: "NCLEX-RN", pr: "EB-3 priority" },
    ],
    licensing: [
      { country: "Canada", exam: "NCLEX-RN + Provincial Registration", steps: ["Complete BSN", "NCLEX-RN", "Apply to provincial college (e.g., CNO)", "Get license"] },
      { country: "UK", exam: "NMC Registration", steps: ["IELTS 7.0 or OET", "CBT (online)", "OSCE (practical test in UK)", "NMC Pin Registration"] },
    ],
    careers: [
      { role: "Registered Nurse", usa: "$75-110K", canada: "CAD 70-100K", uk: "£28-40K", aus: "AUD 70-95K" },
      { role: "Nurse Practitioner", usa: "$110-150K", canada: "CAD 100-130K", uk: "£45-65K", aus: "AUD 100-140K" },
      { role: "ICU / ER Nurse", usa: "$85-130K", canada: "CAD 80-110K", uk: "£32-48K", aus: "AUD 80-110K" },
    ],
  },
  {
    id: "dentistry",
    title: "Dentistry (BDS/DDS)",
    duration: "4-5 Years",
    avgTuition: "15-45L/year",
    description: "Bachelor of Dental Surgery (BDS) or Doctor of Dental Surgery (DDS). High earning potential. Strong demand in UK, USA, Australia.",
    whoFor: ["12th with PCB", "Manual dexterity", "Want high income", "Long-term commitment to licensing"],
    eligibility: ["12th PCB (80%+ for top schools)", "DAT (USA/Canada)", "UCAT (some UK schools)", "IELTS 7.0+"],
    countries: [
      { name: "USA", tuition: "30-45L/yr", salary: "$150-300K", exam: "NBDE", pr: "H-1B to GC" },
      { name: "UK", tuition: "25-40L/yr", salary: "£50-100K", exam: "ORE", pr: "Skilled Worker Visa" },
      { name: "Australia", tuition: "25-35L/yr", salary: "AUD 120-200K", exam: "ADC", pr: "189/190 visa" },
      { name: "Canada", tuition: "20-35L/yr", salary: "CAD 120-250K", exam: "NDEB", pr: "Express Entry" },
    ],
    licensing: [
      { country: "USA", exam: "INBDE (Integrated National Board Dental Examination)", steps: ["Complete DDS", "INBDE", "State Board Exam", "State License"] },
      { country: "Canada", exam: "NDEB (National Dental Examining Board)", steps: ["AFK + ACJ exams", "NDEB Certification", "Provincial License", "Practice"] },
    ],
    careers: [
      { role: "General Dentist", usa: "$130-220K", canada: "CAD 120-200K", uk: "£50-85K", aus: "AUD 120-180K" },
      { role: "Orthodontist", usa: "$200-400K", canada: "CAD 180-300K", uk: "£80-150K", aus: "AUD 180-300K" },
      { role: "Oral Surgeon", usa: "$250-500K", canada: "CAD 200-400K", uk: "£100-200K", aus: "AUD 200-350K" },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy (PharmD)",
    duration: "4-6 Years",
    avgTuition: "8-25L/year",
    description: "Doctor of Pharmacy. 2-4 year programs for B.Pharm holders. Strong demand in USA, UK, Canada. Good ROI.",
    whoFor: ["B.Pharm holders", "Interest in pharmacology", "Detail-oriented", "Want research + clinical"],
    eligibility: ["B.Pharm (4-year)", "PCAT (USA)", "IELTS 6.5+", "Some programs need GRE"],
    countries: [
      { name: "USA", tuition: "20-35L/yr", salary: "$120-160K", exam: "NAPLEX + MPJE", pr: "H-1B eligible" },
      { name: "UK", tuition: "15-25L/yr", salary: "£35-55K", exam: "GPhC", pr: "Skilled Worker" },
      { name: "Canada", tuition: "12-20L/yr", salary: "CAD 90-130K", exam: "PEBC", pr: "Express Entry" },
    ],
    licensing: [
      { country: "USA", exam: "NAPLEX + MPJE", steps: ["Complete PharmD", "NAPLEX (national)", "MPJE (state law)", "State License"] },
    ],
    careers: [
      { role: "Pharmacist", usa: "$120-160K", canada: "CAD 90-130K", uk: "£35-55K", aus: "AUD 80-110K" },
      { role: "Clinical Pharmacist", usa: "$130-180K", canada: "CAD 100-140K", uk: "£40-60K", aus: "AUD 90-120K" },
    ],
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    duration: "3-4 Years",
    avgTuition: "8-25L/year",
    description: "BPT/MPT programs. Growing demand with aging populations. Good PR prospects in Canada, Australia, UK.",
    whoFor: ["12th with Biology", "Interest in rehabilitation", "Active lifestyle", "Want patient interaction"],
    eligibility: ["12th PCB", "IELTS 6.5+", "Some need entry tests"],
    countries: [
      { name: "Australia", tuition: "15-25L/yr", salary: "AUD 70-100K", exam: "AHPRA", pr: "189/190" },
      { name: "UK", tuition: "12-20L/yr", salary: "£28-45K", exam: "HCPC", pr: "Skilled Worker" },
      { name: "Canada", tuition: "10-18L/yr", salary: "CAD 70-95K", exam: "CAPR", pr: "Express Entry" },
    ],
    licensing: [],
    careers: [
      { role: "Physiotherapist", usa: "$75-100K", canada: "CAD 70-95K", uk: "£28-45K", aus: "AUD 70-100K" },
      { role: "Sports Physio", usa: "$85-120K", canada: "CAD 80-110K", uk: "£35-55K", aus: "AUD 80-120K" },
    ],
  },
  {
    id: "mph",
    title: "Public Health (MPH)",
    duration: "1-2 Years",
    avgTuition: "10-40L/year",
    description: "Master of Public Health. 1-2 year programs. Excellent for healthcare management, epidemiology, global health. Strong PR pathway.",
    whoFor: ["Any bachelor's (life science preferred)", "Want non-clinical healthcare", "Interest in policy/research", "Healthcare professionals"],
    eligibility: ["Bachelor's degree", "IELTS 6.5+", "Work experience preferred", "Some need GRE"],
    countries: [
      { name: "USA", tuition: "20-40L/yr", salary: "$60-120K", exam: "None", pr: "STEM eligible" },
      { name: "UK", tuition: "15-30L/yr", salary: "£30-55K", exam: "None", pr: "Graduate visa" },
      { name: "Canada", tuition: "12-25L/yr", salary: "CAD 60-90K", exam: "None", pr: "PGWP + EE" },
      { name: "Australia", tuition: "18-30L/yr", salary: "AUD 70-100K", exam: "None", pr: "Post-study work" },
    ],
    licensing: [],
    careers: [
      { role: "Epidemiologist", usa: "$70-120K", canada: "CAD 70-100K", uk: "£35-60K", aus: "AUD 75-110K" },
      { role: "Health Policy Analyst", usa: "$60-100K", canada: "CAD 65-90K", uk: "£30-50K", aus: "AUD 70-95K" },
      { role: "Healthcare Administrator", usa: "$80-130K", canada: "CAD 75-110K", uk: "£40-65K", aus: "AUD 80-120K" },
    ],
  },
];

export const medJourneySteps = [
  {
    id: "budget",
    q: "What's your budget for total education cost?",
    options: [
      { label: "Under ₹15 Lakhs total", next: "low-budget" },
      { label: "₹15-40 Lakhs", next: "medium-budget" },
      { label: "₹40 Lakhs+", next: "high-budget" },
    ],
  },
  {
    id: "low-budget",
    q: "You have a low budget. What's your priority?",
    options: [
      { label: "I want to become a doctor (MBBS)", result: { program: "MBBS in Russia, China, or Philippines", countries: ["Russia", "Philippines", "China"], why: "Low-cost MBBS options starting at ₹3L/year. Russia and Philippines are most popular. Return to India and clear FMGE/NEXT." } },
      { label: "I want fastest PR in healthcare", result: { program: "Nursing (BSN) in Canada or UK", countries: ["Canada", "UK"], why: "Nursing is the fastest PR pathway. Canada offers Express Entry in 6 months after graduation. UK has Health & Care Worker visa." } },
      { label: "I want a public health career", result: { program: "MPH in Canada or UK", countries: ["Canada", "UK"], why: "1-2 year affordable programs. Strong PR pathways. Non-clinical healthcare option." } },
    ],
  },
  {
    id: "medium-budget",
    q: "Mid-range budget. What's your career goal?",
    options: [
      { label: "Doctor / Physician", next: "doctor-country" },
      { label: "Dentist", result: { program: "Dentistry (BDS/DDS)", countries: ["UK", "Australia", "Canada"], why: "High ROI profession. Licensing required but earning potential is ₹1-3 Cr/year abroad." } },
      { label: "Nurse (fastest PR)", result: { program: "BSN Nursing", countries: ["Canada", "Australia", "UK", "USA"], why: "The #1 PR-friendly healthcare career. Canada, UK, Australia all have nurse shortage." } },
      { label: "Pharmacist", result: { program: "PharmD", countries: ["USA", "UK", "Canada"], why: "3-4 year programs. Strong demand in USA ($120-160K salary)." } },
    ],
  },
  {
    id: "doctor-country",
    q: "Where do you want to practice as a doctor?",
    options: [
      { label: "Practice in India after abroad degree", result: { program: "MBBS in Russia, Georgia, Philippines", countries: ["Russia", "Georgia", "Philippines"], why: "₹3-7L/year tuition. Return to India, clear NEXT/FMGE. Total cost ₹20-35L." } },
      { label: "Practice in USA (highest salary)", result: { program: "MD in USA or Caribbean + USMLE", countries: ["USA", "Caribbean"], why: "US doctors earn $200-400K+. Caribbean is a pathway to US residency. Long journey but highest reward." } },
      { label: "Practice in UK", result: { program: "MBBS in UK or Europe", countries: ["UK", "Georgia"], why: "UK GMC registration pathway. PLAB exam. Salary £60-100K+." } },
    ],
  },
  {
    id: "high-budget",
    q: "High budget. What's your dream career?",
    options: [
      { label: "Doctor in USA (highest salary)", result: { program: "MD in USA", countries: ["USA"], why: "Direct MD admission or Caribbean pathway. USMLE Steps 1-3. Residency Match. $200-400K+ salary." } },
      { label: "Dentist/Surgeon", result: { program: "DDS / BDS + Specialization", countries: ["USA", "Canada", "Australia"], why: "Dentists earn $150-300K+. Specialize in Orthodontics or Oral Surgery for $300-500K+." } },
      { label: "Public Health Leader", result: { program: "MPH from Harvard/Johns Hopkins", countries: ["USA", "UK"], why: "Top MPH programs. Healthcare consulting, WHO, CDC. $80-150K salary." } },
      { label: "Nurse (fastest to PR + good salary)", result: { program: "Accelerated BSN in Canada/USA", countries: ["Canada", "USA", "Australia"], why: "2-year accelerated programs. Canada PR in 6 months. USA $75-110K." } },
    ],
  },
];
