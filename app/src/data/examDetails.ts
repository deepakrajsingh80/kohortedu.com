import { ALL_EXAMS, type Exam } from "./exams";

export interface ExamDetail {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  heroStats: { label: string; value: string; icon: string }[];
  whyThisExam: string[];
  examPattern: { section: string; questions: string; duration: string; marks: string; topics: string }[];
  scoring: { label: string; value: string }[];
  registrationSteps: { step: number; title: string; desc: string }[];
  prepTimeline: { month: string; tasks: string[] }[];
  freeResources: { name: string; type: string; url: string }[];
  books: { name: string; author: string; bestFor: string }[];
  relatedExams: string[];
  faq: { q: string; a: string }[];
  tips: string[];
}

const examDetails: Record<string, ExamDetail> = {
  ielts: {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    tagline: "The world's most popular English test for study, work and migration",
    heroStats: [
      { label: "Duration", value: "2h 45min", icon: "Clock" },
      { label: "Fee (India)", value: "₹17,000", icon: "Wallet" },
      { label: "Score Range", value: "Band 0–9", icon: "Target" },
      { label: "Valid For", value: "2 Years", icon: "Calendar" },
      { label: "Frequency", value: "48+ / year", icon: "Repeat" },
      { label: "Accepted In", value: "11,000+ Orgs", icon: "Globe" },
    ],
    whyThisExam: [
      "Accepted by ALL UK, Australian, Canadian and New Zealand universities — no exceptions",
      "Computer-delivered results in just 3-5 days (paper takes 13 days)",
      "No pass/fail — get a band score that matches your university requirement",
      "Two formats: Academic (for uni) and General Training (for immigration)",
      "Face-to-face Speaking test with a real examiner — not a robot",
      "UKVI version available for UK student visa applications",
      "Most Indian students score Band 6.5-7.5 with 4-8 weeks of preparation",
    ],
    examPattern: [
      { section: "Listening", questions: "40", duration: "30 min + 10 min transfer", marks: "1 mark each", topics: "4 recordings: conversations, monologues, academic lectures" },
      { section: "Reading", questions: "40", duration: "60 min", marks: "1 mark each", topics: "3 passages: academic articles, journals, opinion pieces" },
      { section: "Writing", questions: "2 tasks", duration: "60 min", marks: "Task 1: 33%, Task 2: 66%", topics: "Task 1: Graph/letter. Task 2: Essay argument" },
      { section: "Speaking", questions: "3 parts", duration: "11-14 min", marks: "Fluency, vocab, grammar, pronunciation", topics: "Intro, cue card (2 min talk), discussion" },
    ],
    scoring: [
      { label: "Band 9", value: "Expert user — virtually no mistakes" },
      { label: "Band 8", value: "Very good user — occasional errors" },
      { label: "Band 7", value: "Good user — some inaccuracies (target for most unis)" },
      { label: "Band 6.5", value: "Competent user — minimum for many programs" },
      { label: "Band 6.0", value: "Modest user — basic communication effective" },
      { label: "Band 5.5", value: "Partial user — limited proficiency" },
    ],
    registrationSteps: [
      { step: 1, title: "Choose Test Type", desc: "IELTS Academic for university. IELTS UKVI for UK visa. Pick computer or paper." },
      { step: 2, title: "Find Test Date", desc: "Visit ielts.org. Computer tests available almost daily. Paper tests 4x/month." },
      { step: 3, title: "Create Account", desc: "Register on British Council or IDP India portal. Both are official test partners." },
      { step: 4, title: "Upload Documents", desc: "Passport scan required. Must match exam day ID exactly. No Aadhaar accepted." },
      { step: 5, title: "Pay Fee", desc: "₹17,000 online via UPI/card/netbanking. Fee non-refundable but date can be changed." },
      { step: 6, title: "Confirmation", desc: "Receive email with test centre address, reporting time (usually 8:30 AM)." },
    ],
    prepTimeline: [
      { month: "Week 1-2", tasks: ["Take a diagnostic test to know your starting band", "Learn exam format and question types", "Start daily vocabulary building (50 words/day)"] },
      { month: "Week 3-4", tasks: ["Practice Listening with BBC podcasts, TED talks", "Read The Guardian, BBC News daily", "Write 1 essay every 2 days"] },
      { month: "Week 5-6", tasks: ["Full mock tests every 3 days", "Get Speaking feedback from a partner or tutor", "Focus on weakest section"] },
      { month: "Week 7-8", tasks: ["Intensive practice — 1 full test daily", "Review mistakes from all mocks", "Book final speaking practice sessions"] },
    ],
    freeResources: [
      { name: "IELTS Liz (YouTube)", type: "Video", url: "https://youtube.com/ieltsliz" },
      { name: "British Council Prep", type: "Website", url: "https://takeielts.britishcouncil.org" },
      { name: "IELTS Simon Blog", type: "Blog", url: "https://ielts-simon.com" },
      { name: "IDP IELTS Masterclass", type: "Webinar", url: "https://ielts.idp.com" },
      { name: "Cambridge IELTS 1-18 PDFs", type: "Books", url: "https://www.cambridge.org/ielts" },
      { name: "IELTS Buddy", type: "Practice", url: "https://www.ieltsbuddy.com" },
    ],
    books: [
      { name: "The Official Cambridge Guide to IELTS", author: "Cambridge", bestFor: "Complete preparation" },
      { name: "Cambridge IELTS 15-18 (Authentic Papers)", author: "Cambridge", bestFor: "Practice tests" },
      { name: "Target Band 7", author: "Simone Braverman", bestFor: "Strategy and tips" },
      { name: "Vocabulary for IELTS", author: "Pauline Cullen", bestFor: "Word building" },
      { name: "IELTS Trainer", author: "Cambridge", bestFor: "6 practice tests with guidance" },
    ],
    relatedExams: ["toefl", "pte", "cae-cpe"],
    faq: [
      { q: "Which is better — IELTS computer or paper?", a: "Computer: Results in 3-5 days, easier editing, timer on screen. Paper: Some prefer writing by hand, more comfortable for some. Content is identical. Most students now choose computer." },
      { q: "Is IELTS accepted in the USA?", a: "Yes! Over 3,400 US institutions accept IELTS including all Ivy League schools. However, TOEFL is more commonly preferred by US universities. Check your target university's requirements." },
      { q: "How many times can I retake IELTS?", a: "Unlimited times. No waiting period. You can book the next available slot immediately. Many students take it 2-3 times to improve their band score." },
      { q: "What is the difference between IELTS and IELTS UKVI?", a: "IELTS UKVI is specifically for UK visa applications. The test format is identical but UKVI has stricter ID verification. If you're applying for a UK student visa, you MUST take UKVI version." },
      { q: "Is 1 month enough to prepare for IELTS?", a: "If your English is already strong (read English newspapers, watch English shows), 1 month is enough to get Band 7+. If starting from scratch, plan for 2-3 months." },
      { q: "Can I use my IELTS score for immigration?", a: "Yes! IELTS General Training is accepted for Canada Express Entry, Australia PR, UK visa, and New Zealand immigration. Academic version is for university applications." },
    ],
    tips: [
      "Listening: Write answers directly — no extra transfer time in computer test",
      "Reading: Skim first, then scan for answers. Don't read every word.",
      "Writing: Task 2 carries 66% weight — prioritize it. Always plan for 5 minutes.",
      "Speaking: Be natural, not rehearsed. Examiners can tell memorized answers.",
      "Practice with a timer always — time management is the #1 reason for low scores",
    ],
  },
  gre: {
    id: "gre",
    name: "GRE",
    fullName: "Graduate Record Examination",
    tagline: "The gateway to MS and PhD programs in the USA and beyond",
    heroStats: [
      { label: "Duration", value: "1h 58min", icon: "Clock" },
      { label: "Fee (India)", value: "₹22,550", icon: "Wallet" },
      { label: "Score Range", value: "260–340", icon: "Target" },
      { label: "Valid For", value: "5 Years", icon: "Calendar" },
      { label: "Frequency", value: "Year-round", icon: "Repeat" },
      { label: "Sections", value: "3", icon: "Layers" },
    ],
    whyThisExam: [
      "Required for 95% of MS and PhD programs in the USA — the #1 STEM destination",
      "Accepted by top Canadian, German, and Singapore universities too",
      "ScoreSelect: Send only your best scores to universities. No penalty for retakes!",
      "Valid for 5 years — take it in 3rd year of UG and use for all applications",
      "Shortened in 2023: Only 1 essay now, under 2 hours total",
      "Many programs are now GRE-optional — but a good score (320+) still boosts your application",
      "Quantitative section favors Indian students strong in Math",
    ],
    examPattern: [
      { section: "Quantitative Reasoning", questions: "27", duration: "47 min", marks: "130-170", topics: "Algebra, geometry, data analysis, arithmetic. On-screen calculator allowed." },
      { section: "Verbal Reasoning", questions: "27", duration: "41 min", marks: "130-170", topics: "Reading comprehension, text completion, sentence equivalence" },
      { section: "Analytical Writing", questions: "1 task", duration: "30 min", marks: "0-6", topics: "Analyze an Issue essay. No Argument essay (removed 2023)." },
    ],
    scoring: [
      { label: "330-340", value: "99th percentile — Top 10 universities (MIT, Stanford, CMU)" },
      { label: "320-329", value: "90th+ percentile — Good for most Top 50 programs" },
      { label: "310-319", value: "75th+ percentile — Competitive for most universities" },
      { label: "300-309", value: "50th+ percentile — Acceptable for many programs" },
      { label: "Verbal 155+", value: "Target for non-native English speakers" },
      { label: "Quant 165+", value: "Expected for Indian STEM applicants" },
    ],
    registrationSteps: [
      { step: 1, title: "Create ETS Account", desc: "Visit ets.org/gre. Use exact name as on passport." },
      { step: 2, title: "Select Test Centre", desc: "Choose computer-delivered test at a centre near you. Available year-round." },
      { step: 3, title: "Pick Date & Time", desc: "Book 2-3 months in advance for preferred slots. Morning/afternoon options." },
      { step: 4, title: "Pay Fee", desc: "₹22,550 via credit/debit card. Reschedule fee: $50." },
      { step: 5, title: "Score Recipients", desc: "Send to 4 universities FREE on test day. Additional reports $30 each." },
      { step: 6, title: "ScoreSelect", desc: "Choose which scores to send after seeing results. Send only your best attempt!" },
    ],
    prepTimeline: [
      { month: "Month 1", tasks: ["Diagnostic test to identify weak areas", "Learn Quant formulas and concepts (Indian students: focus on Verbal)", "Build vocabulary: 500 high-frequency GRE words"] },
      { month: "Month 2", tasks: ["Practice Quant daily (target: 165+)", "Read complex passages (The Economist, Scientific American)", "Write 2 essays per week"] },
      { month: "Month 3", tasks: ["Full-length mock tests every weekend", "Review all mistakes thoroughly", "Work on time management strategies"] },
    ],
    freeResources: [
      { name: "ETS PowerPrep (2 FREE tests)", type: "Mock Tests", url: "https://www.ets.org/gre/test-takers/prepare/powerprep.html" },
      { name: "Magoosh GRE Vocab App", type: "App", url: "https://gre.magoosh.com" },
      { name: "GregMat (YouTube)", type: "Video", url: "https://www.youtube.com/c/GregMat" },
      { name: "Khan Academy (partnered with ETS)", type: "Video", url: "https://www.khanacademy.org/test-prep/gre" },
      { name: "Manhattan Prep GRE Forum", type: "Forum", url: "https://www.manhattanprep.com/gre/forums" },
    ],
    books: [
      { name: "ETS Official GRE Super Power Pack", author: "ETS", bestFor: "Authentic practice material" },
      { name: "Manhattan Prep 5 lb. Book of Practice Problems", author: "Manhattan Prep", bestFor: "Extensive Quant practice" },
      { name: "Kaplan GRE Prep Plus", author: "Kaplan", bestFor: "Comprehensive strategy" },
      { name: "Magoosh GRE Vocabulary Flashcards", author: "Magoosh", bestFor: "Word building" },
      { name: "Princeton Review GRE Premium", author: "Princeton", bestFor: "Strategy + 6 practice tests" },
    ],
    relatedExams: ["gmat", "gate"],
    faq: [
      { q: "Is GRE required for all MS programs in USA?", a: "No. Since COVID, many universities made GRE optional. However, top programs (MIT, Stanford, CMU, Berkeley) still strongly prefer or require it. A good score (320+) significantly boosts your chances and scholarship eligibility." },
      { q: "How is the new GRE different from the old one?", a: "Since September 2023: Shorter (under 2 hours), only 1 essay (no Argument essay), fewer questions. Scoring remains 260-340. The test is less tiring but pacing is tighter." },
      { q: "Can I get a scholarship with GRE scores?", a: "GRE scores alone don't guarantee scholarships, but a 325+ score with strong academics makes you competitive for Teaching Assistantships (TA) and Research Assistantships (RA) that cover tuition + stipend." },
      { q: "How many times can I retake GRE?", a: "Up to 5 times in a rolling 12-month period, with a 21-day gap between attempts. ScoreSelect lets you send only your best scores." },
      { q: "Is GRE easier than GATE?", a: "For Indian engineering students: GRE Quant is easier than GATE Math. But GRE Verbal is significantly harder — it tests advanced vocabulary most Indian students haven't encountered. Focus 70% of prep on Verbal." },
    ],
    tips: [
      "Indian students: Your Quant is likely already strong. Spend 70% of time on Verbal.",
      "Memorize the 1000 most common GRE words — this alone can boost Verbal by 10 points",
      "The on-screen calculator is basic — mental math shortcuts save precious seconds",
      "Read The Economist daily — it mirrors the complexity of GRE reading passages",
      "Take PowerPrep tests under exam conditions (timed, no distractions)",
    ],
  },
  gmat: {
    id: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test (Focus Edition)",
    tagline: "The MBA entrance exam trusted by top business schools worldwide",
    heroStats: [
      { label: "Duration", value: "2h 15min", icon: "Clock" },
      { label: "Fee (India)", value: "₹21,500", icon: "Wallet" },
      { label: "Score Range", value: "205–805", icon: "Target" },
      { label: "Valid For", value: "5 Years", icon: "Calendar" },
      { label: "Frequency", value: "Year-round", icon: "Repeat" },
      { label: "Sections", value: "3", icon: "Layers" },
    ],
    whyThisExam: [
      "Required by 90% of Top 50 B-schools including Harvard, Wharton, INSEAD, LBS",
      "Focus Edition (2024) is shorter with no AWA essay — less stressful",
      "New Data Insights section tests real-world business analytical skills",
      "Scores valid for 5 years — take it when you're ready, apply when you're experienced",
      "Strong GMAT (665+) can offset a lower GPA in your application",
      "Many Indian B-schools (ISB, XLRI) also accept GMAT for their PG programs",
      "Section order can be customized — attempt your strongest section first",
    ],
    examPattern: [
      { section: "Quantitative Reasoning", questions: "21", duration: "45 min", marks: "60-90", topics: "Problem solving, data sufficiency. No geometry. Calculator NOT allowed." },
      { section: "Verbal Reasoning", questions: "23", duration: "45 min", marks: "60-90", topics: "Reading comprehension, critical reasoning. No sentence correction." },
      { section: "Data Insights", questions: "20", duration: "45 min", marks: "60-90", topics: "Data sufficiency, multi-source reasoning, table analysis, graphics interpretation. On-screen calculator allowed." },
    ],
    scoring: [
      { label: "755-805", value: "99th percentile — Harvard, Stanford, Wharton range" },
      { label: "695-754", value: "95th+ percentile — Top 10 B-schools" },
      { label: "665-694", value: "90th+ percentile — Top 25 B-schools" },
      { label: "645-664", value: "80th+ percentile — Top 50 B-schools" },
      { label: "625-644", value: "70th+ percentile — Good B-schools" },
      { label: "555-624", value: "50th+ percentile — Many programs accept" },
    ],
    registrationSteps: [
      { step: 1, title: "Create MBA.com Account", desc: "Register at mba.com — the official GMAT portal." },
      { step: 2, title: "Choose Test Mode", desc: "Test centre (preferred) or online from home. Centres offer better environment." },
      { step: 3, title: "Select Date", desc: "Book 2-3 months ahead. Morning slots preferred for freshness." },
      { step: 4, title: "Pay Fee", value: "₹21,500", desc: "Pay via credit/debit card. Reschedule fee applies." },
      { step: 5, title: "Send Scores", desc: "Send to 5 programs FREE on test day. $35 for each additional." },
      { step: 6, title: "Score Preview", desc: "See unofficial scores before deciding to accept/cancel. Cancelled scores can be reinstated later." },
    ],
    prepTimeline: [
      { month: "Month 1", tasks: ["Diagnostic test (official GMAT Prep)", "Learn Data Insights section thoroughly (new)", "Review Quant fundamentals — no calculator!"] },
      { month: "Month 2", tasks: ["Practice Verbal — focus on critical reasoning", "Master Data Insights question types", "Take 2 full mock tests"] },
      { month: "Month 3", tasks: [ "Weekly mock tests under timed conditions", "Review all errors — maintain error log", "Final week: Light practice, focus on stamina"] },
    ],
    freeResources: [
      { name: "GMAT Official Starter Kit (2 FREE tests)", type: "Mock Tests", url: "https://www.mba.com/exams/gmat" },
      { name: "GMAT Club (Forum + Free Questions)", type: "Forum", url: "https://gmatclub.com" },
      { name: "Target Test Prep (5-day trial)", type: "Course", url: "https://www.targettestprep.com" },
      { name: "Magoosh GMAT (YouTube)", type: "Video", url: "https://www.youtube.com/magoosh" },
    ],
    books: [
      { name: "GMAT Official Guide (Focus Edition)", author: "GMAC", bestFor: "Authentic practice questions" },
      { name: "Manhattan Prep GMAT Strategy Guides", author: "Manhattan Prep", bestFor: "Concept building" },
      { name: "Target Test Prep GMAT", author: "TTP", bestFor: "Comprehensive online course" },
      { name: "Kaplan GMAT Prep Plus", author: "Kaplan", bestFor: "Strategy + practice tests" },
      { name: "Powerscore GMAT Critical Reasoning", author: "Powerscore", bestFor: "Verbal improvement" },
    ],
    relatedExams: ["gre", "cat"],
    faq: [
      { q: "GMAT Classic vs Focus Edition — which should I take?", a: "Focus Edition is the current standard (since Jan 2024). It's shorter, has a new Data Insights section, and no AWA essay. All B-schools accept it. If you've already prepared for Classic, check if your target schools still accept it." },
      { q: "Can I get into a top B-school without work experience?", a: "Harvard, Wharton, Stanford require 3-5 years average work experience. However, MiM (Master in Management) programs at HEC, LBS, Duke accept fresh graduates with 0-2 years experience." },
      { q: "How many times can I retake GMAT?", a: "5 times in a rolling 12-month period, lifetime limit of 8 attempts. You can cancel scores immediately after the test and they won't appear on your score report." },
      { q: "Is GMAT harder than CAT?", a: "Different challenges. GMAT tests analytical thinking and data interpretation. CAT is more speed-based with higher Quant difficulty. Indian students often find GMAT Verbal harder but Quant easier than CAT." },
      { q: "Do I need coaching or can I self-study?", a: "If scoring 600+ on diagnostic, self-study with Official Guide + GMAT Club is sufficient. If below 550, structured coaching (TTP, Magoosh, e-GMAT) helps significantly. Most Indian test-takers use coaching." },
    ],
    tips: [
      "No calculator in Quant — practice mental math daily. Speed matters more than complexity.",
      "Data Insights is NEW — dedicate 40% of your prep time to mastering this section",
      "Critical Reasoning is the hardest Verbal topic — practice 10 questions daily",
      "Use the 8-minute optional break between sections — stretch, hydrate, reset",
      "Take mocks in the SAME time slot as your actual test to sync your body clock",
    ],
  },
  sat: {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    tagline: "The most widely accepted undergraduate admission test for US universities",
    heroStats: [
      { label: "Duration", value: "2h 14min", icon: "Clock" },
      { label: "Fee (India)", value: "$60 + $43", icon: "Wallet" },
      { label: "Score Range", value: "400–1600", icon: "Target" },
      { label: "Valid For", value: "5 Years", icon: "Calendar" },
      { label: "Frequency", value: "7x / year", icon: "Repeat" },
      { label: "Sections", value: "2", icon: "Layers" },
    ],
    whyThisExam: [
      "Accepted by virtually ALL US universities for undergraduate admissions",
      "Required by most universities for scholarship consideration",
      "Fully digital since 2024 — adaptive testing personalizes question difficulty",
      "Superscoring: Combine best section scores from multiple attempts",
      "No penalty for wrong answers — attempt every question",
      "Calculator allowed in ALL Math questions now (no-calculator section removed)",
      "Indian students strong in Math often score 750+ in the Math section",
    ],
    examPattern: [
      { section: "Reading & Writing", questions: "54", duration: "64 min", marks: "200-800", topics: "Comprehension, grammar, vocabulary, textual evidence, data analysis in passages" },
      { section: "Math", questions: "44", duration: "70 min", marks: "200-800", topics: "Algebra, advanced math, problem-solving, data analysis. Calculator allowed throughout." },
    ],
    scoring: [
      { label: "1500-1600", value: "99th+ percentile — Ivy League range" },
      { label: "1400-1490", value: "95th+ percentile — Top 20 universities" },
      { label: "1300-1390", value: "90th+ percentile — Top 50 universities" },
      { label: "1200-1290", value: "75th+ percentile — Good universities" },
      { label: "1100-1190", value: "50th+ percentile — Many accept" },
      { label: "Math 750+", value: "Achievable for Indian students — target this" },
    ],
    registrationSteps: [
      { step: 1, title: "Create College Board Account", desc: "Sign up at satsuite.collegeboard.org. Use exact name as on passport." },
      { step: 2, title: "Download Bluebook App", desc: "Official digital SAT app. Must use this for the test. Practice tests included." },
      { step: 3, title: "Select Test Centre", desc: "Choose from centres in major Indian cities (Delhi, Mumbai, Bangalore, Chennai, etc.)" },
      { step: 4, title: "Pick Test Date", desc: "7 dates: Mar, May, Jun, Aug, Oct, Nov, Dec. Register 4 weeks early." },
      { step: 5, title: "Pay Fee", desc: "$60 + $43 India regional fee = $103 total (~₹8,600). Fee waivers available." },
      { step: 6, title: "Send Scores", desc: "4 score reports FREE at registration. Additional reports $12 each." },
    ],
    prepTimeline: [
      { month: "Month 1", tasks: ["Download Bluebook app, take diagnostic", "Master algebra and advanced math concepts", "Start daily Reading practice (30 min)"] },
      { month: "Month 2", tasks: ["Practice full sections timed", "Focus on weak areas from diagnostic", "Learn grammar rules for Writing"] },
      { month: "Month 3", tasks: ["Full practice tests every weekend", "Review all mistakes", "Take final mock 1 week before exam"] },
    ],
    freeResources: [
      { name: "Bluebook App (4 FREE practice tests)", type: "Mock Tests", url: "https://satsuite.collegeboard.org/digital" },
      { name: "Khan Academy SAT Prep (Official Partner)", type: "Course", url: "https://www.khanacademy.org/test-prep/sat" },
      { name: "College Board Question Bank", type: "Practice", url: "https://satsuite.collegeboard.org/practice" },
    ],
    books: [
      { name: "The Official Digital SAT Study Guide", author: "College Board", bestFor: "Authentic practice" },
      { name: "Erica Meltzer SAT Grammar", author: "Erica Meltzer", bestFor: "Writing section" },
      { name: "College Panda SAT Math", author: "Nielson Phu", bestFor: "Math section" },
      { name: "Princeton Review SAT Premium", author: "Princeton", bestFor: "Comprehensive prep" },
    ],
    relatedExams: ["act", "gre"],
    faq: [
      { q: "Is SAT still required after COVID?", a: "Most US universities are now test-optional, but a strong SAT score (1400+) significantly boosts your application and scholarship chances. Some universities are returning to requiring it." },
      { q: "What is a good SAT score for Indian students?", a: "1400+ is competitive for Top 50 universities. 1500+ for Ivy League. Indian students typically score 750+ in Math — leverage this strength." },
      { q: "Can I get scholarships with SAT?", a: "Yes! Many US universities offer merit scholarships based on SAT scores. A 1400+ can unlock $10,000-$30,000/year in scholarships." },
      { q: "When should I take the SAT?", a: "First attempt in 11th grade (May/June). Retake in 12th grade (October/November) if needed. This gives time for score improvement." },
      { q: "How is digital SAT different from paper SAT?", a: "Shorter (2h 14min vs 3h), calculator allowed in all Math, adaptive (question difficulty changes based on answers), results in days not weeks." },
    ],
    tips: [
      "Math is your strength as an Indian student — aim for 750+. This compensates for lower Reading scores.",
      "Read The New York Times, The Atlantic daily — builds Reading stamina",
      "The adaptive format means early questions matter MORE — don't rush the first module",
      "Bluebook app mirrors the exact test interface — practice exclusively on this",
      "Register for 2-3 test dates upfront — gives flexibility for retakes",
    ],
  },
  toefl: {
    id: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language (iBT)",
    tagline: "The preferred English test for US universities",
    heroStats: [
      { label: "Duration", value: "~2 hours", icon: "Clock" },
      { label: "Fee (India)", value: "₹16,900", icon: "Wallet" },
      { label: "Score Range", value: "0–120", icon: "Target" },
      { label: "Valid For", value: "2 Years", icon: "Calendar" },
      { label: "Frequency", value: "50+ / year", icon: "Repeat" },
      { label: "Accepted In", value: "USA, Canada", icon: "Globe" },
    ],
    whyThisExam: [
      "Preferred by 90% of US universities over other English tests",
      "MyBest scores combine your best section scores from all attempts",
      "Can retake every 3 days — fastest turnaround among major tests",
      "Home Edition widely accepted — take from your own computer",
      "Results in 4-8 days (sometimes 2 days for Express)",
      "Shorter format since 2023 — under 2 hours total",
      "Speaking section uses microphone recording — no live examiner",
    ],
    examPattern: [
      { section: "Reading", questions: "20", duration: "35 min", marks: "0-30", topics: "2 academic passages with comprehension and vocabulary questions" },
      { section: "Listening", questions: "28", duration: "36 min", marks: "0-30", topics: "Lectures, conversations, classroom discussions — headphones provided" },
      { section: "Speaking", questions: "4 tasks", duration: "16 min", marks: "0-30", topics: "Independent opinion + integrated tasks (read/listen/speak). Recorded responses." },
      { section: "Writing", questions: "2 tasks", duration: "29 min", marks: "0-30", topics: "Integrated task (reading+listening+writing) + academic discussion essay" },
    ],
    scoring: [
      { label: "110-120", value: "Expert — MIT, Stanford, Ivy League range" },
      { label: "100-109", value: "Very Good — Top 50 US universities" },
      { label: "90-99", value: "Good — Most universities accept" },
      { label: "80-89", value: "Fair — Some conditional admissions" },
      { label: "MyBest", value: "Combines best section scores from all attempts" },
    ],
    registrationSteps: [
      { step: 1, title: "Create ETS Account", desc: "Register at ets.org/toefl. Use exact passport name." },
      { step: 2, title: "Choose Test Mode", desc: "Test Centre or Home Edition. Home requires specific equipment setup." },
      { step: 3, title: "Select Date", desc: "Tests almost every week. Book 3-4 weeks ahead for preferred slot." },
      { step: 4, title: "Pay Fee", desc: "₹16,900 ($205). Late registration adds $40. Reschedule $60." },
      { step: 5, title: "Send Scores", desc: "4 FREE score reports at test time. Additional: $20 each." },
      { step: 6, title: "Get Results", desc: "4-8 days after test. PDF score report downloadable from ETS account." },
    ],
    prepTimeline: [
      { month: "Week 1-2", tasks: ["Diagnostic test", "Learn new Writing format (academic discussion)", "Build academic vocabulary"] },
      { month: "Week 3-4", tasks: ["Practice Speaking into a microphone", "Listening practice with university lectures", "Write 2 essays per week"] },
      { month: "Week 5-6", tasks: ["Full mock tests", "Focus on weakest section", "Practice time management"] },
    ],
    freeResources: [
      { name: "TOEFL Go! Official App", type: "App", url: "https://www.ets.org/toefl/test-takers/ibt/prepare" },
      { name: "ETS Free Practice Test", type: "Mock Test", url: "https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests" },
      { name: "Magoosh TOEFL (YouTube)", type: "Video", url: "https://www.youtube.com/magoosh" },
      { name: "TST Prep TOEFL", type: "Video", url: "https://www.youtube.com/tstprep" },
    ],
    books: [
      { name: "Official TOEFL iBT Tests Volume 1 & 2", author: "ETS", bestFor: "Authentic practice" },
      { name: "Cambridge Preparation for the TOEFL Test", author: "Cambridge", bestFor: "Comprehensive prep" },
      { name: "Barron's TOEFL iBT", author: "Barron's", bestFor: "Strategy + practice" },
    ],
    relatedExams: ["ielts", "pte", "duolingo"],
    faq: [
      { q: "TOEFL vs IELTS — which should I take?", a: "For USA: TOEFL is preferred. For UK/Australia/Canada: IELTS is more accepted. Check your target universities' requirements. Many accept both." },
      { q: "What is TOEFL MyBest score?", a: "ETS automatically combines your highest section scores from all valid tests in the last 2 years. So if you score R28/L25 on Test 1 and R25/L29 on Test 2, your MyBest is R28/L29." },
      { q: "Is TOEFL Home Edition accepted?", a: "Yes, by most universities since 2020. You need a quiet room, good internet, a webcam, and must download ETS Secure Browser. Check your target university specifically." },
      { q: "How long is TOEFL valid?", a: "2 years from the test date. Universities typically require the test to be valid at the time of application, not admission." },
    ],
    tips: [
      "Note-taking is crucial in Listening — practice shorthand symbols",
      "Speaking: Speak clearly, not fast. Pronunciation matters more than accent.",
      "New Writing format (2023): Practice the 'academic discussion' essay type",
      "Reading: The passages are dense — learn to identify main idea quickly",
      "Take tests in morning if possible — matches when most people are freshest",
    ],
  },
  pte: {
    id: "pte",
    name: "PTE Academic",
    fullName: "Pearson Test of English Academic",
    tagline: "Fastest results — accepted by Australia and UK for visas",
    heroStats: [
      { label: "Duration", value: "2 hours", icon: "Clock" },
      { label: "Fee (India)", value: "₹15,900", icon: "Wallet" },
      { label: "Score Range", value: "10–90", icon: "Target" },
      { label: "Valid For", value: "2 Years", icon: "Calendar" },
      { label: "Frequency", value: "Daily", icon: "Repeat" },
      { label: "Results", value: "48 hours", icon: "Zap" },
    ],
    whyThisExam: [
      "Results in just 48 hours — fastest among all major English tests",
      "Fully computer-based with AI scoring — objective and consistent",
      "Accepted for ALL Australian visas including student and PR",
      "Accepted by 99% of UK universities",
      "Test slots available almost every day — book 24 hours in advance",
      "Single 2-hour session — no separate speaking appointment",
      "Score reports sent to unlimited universities for FREE",
    ],
    examPattern: [
      { section: "Speaking & Writing", questions: "Varies", duration: "54-67 min", marks: "Integrated scoring", topics: "Personal intro, read aloud, repeat sentence, describe image, retell lecture, essay (20 min)" },
      { section: "Reading", questions: "Varies", duration: "29-30 min", marks: "Integrated scoring", topics: "Fill in blanks, reorder paragraphs, multiple choice, reading & writing blanks" },
      { section: "Listening", questions: "Varies", duration: "30-43 min", marks: "Integrated scoring", topics: "Summarize spoken text, multiple choice, fill in blanks, highlight correct summary, write from dictation" },
    ],
    scoring: [
      { label: "79-90", value: "Expert — Equivalent to IELTS 8.0+" },
      { label: "65-78", value: "Very Good — Equivalent to IELTS 7.0. Target for most unis" },
      { label: "50-64", value: "Good — Equivalent to IELTS 6.0-6.5" },
      { label: "43-49", value: "Competent — Minimum for some programs" },
      { label: "30-42", value: "Modest — May need English prep course" },
    ],
    registrationSteps: [
      { step: 1, title: "Create Pearson Account", desc: "Register at pearsonpte.com. Simple signup process." },
      { step: 2, title: "Select Test Centre", desc: "Choose from Pearson VUE centres across India. Available in all major cities." },
      { step: 3, title: "Pick Date", desc: "Daily availability. Can book as late as 24 hours before." },
      { step: 4, title: "Pay Fee", desc: "₹15,900 ($200). Pay online via card/UPI." },
      { step: 5, title: "Send Scores", desc: "Unlimited free score reports to institutions. Select after getting results." },
    ],
    prepTimeline: [
      { month: "Week 1", tasks: ["Take scored practice test on Pearson website", "Learn integrated scoring system", "Practice read aloud and repeat sentence"] },
      { month: "Week 2-3", tasks: ["Focus on Speaking fluency — speak naturally not robotically", "Practice essay writing (20 min limit)", "Master 'Write from dictation' — highest value Listening task"] },
      { month: "Week 4", tasks: ["Full mock tests", "Time management practice", "Book test only when consistently scoring target"] },
    ],
    freeResources: [
      { name: "PTE Scored Practice Tests (Pearson)", type: "Mock Tests", url: "https://www.pearsonpte.com/practice-tests" },
      { name: "E2Language PTE (YouTube)", type: "Video", url: "https://www.youtube.com/c/E2PTEAcademic" },
      { name: "PTE Academic Official Guide", type: "Book", url: "https://www.pearsonpte.com/preparation" },
    ],
    books: [
      { name: "The Official Guide to PTE Academic", author: "Pearson", bestFor: "Authentic practice and strategies" },
      { name: "PTE Academic Practice Tests Plus", author: "Pearson", bestFor: "3 full practice tests" },
    ],
    relatedExams: ["ielts", "toefl"],
    faq: [
      { q: "Is PTE easier than IELTS?", a: "It depends on your strengths. PTE Speaking is easier for some (recorded, not live examiner). PTE Writing has a word count displayed. PTE Reading can be harder due to integrated tasks. Take a practice test of both to decide." },
      { q: "Do Australian universities prefer PTE?", a: "Yes! PTE was developed by Australians and is fully accepted for all Australian visas (student, work, PR). It's the most popular choice for students going to Australia." },
      { q: "What is integrated scoring in PTE?", a: "Some tasks contribute to scores in multiple sections. For example, 'Read Aloud' scores in both Reading AND Speaking. This can help boost your overall score." },
      { q: "Can I prepare for PTE in 2 weeks?", a: "If your English is already good (comfortable speaking, reading), 2 weeks is enough to learn the format. If weaker in English, plan 4-6 weeks." },
    ],
    tips: [
      "Speak naturally with rhythm — the AI prefers fluent speech over perfect pronunciation",
      "'Write from dictation' is the highest-scoring Listening task — practice daily",
      "In 'Read Aloud', don't pause at commas — read in meaningful phrase groups",
      "Essay: Use template structure — intro, 2 body paragraphs, conclusion. 200-300 words.",
      "Results come in 48 hours but sometimes in 24 — book early to meet deadlines",
    ],
  },
  neet: {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    tagline: "India's mandatory medical entrance — required even for MBBS abroad",
    heroStats: [
      { label: "Duration", value: "3h 20min", icon: "Clock" },
      { label: "Fee (India)", value: "₹1,700", icon: "Wallet" },
      { label: "Total Marks", value: "720", icon: "Target" },
      { label: "Frequency", value: "Once/year (May)", icon: "Calendar" },
      { label: "Questions", value: "180", icon: "FileText" },
      { label: "Subjects", value: "3 (PCB)", icon: "Layers" },
    ],
    whyThisExam: [
      "MANDATORY for all Indian students pursuing MBBS abroad — no exceptions",
      "Required to get NMC Eligibility Certificate for foreign medical degrees",
      "Qualifying NEET makes you eligible for medical studies in Russia, Georgia, Philippines, Kazakhstan, China",
      "Score 550+ to get into good government medical colleges in India",
      "Lower fees than Indian private colleges when going abroad (₹15-25L vs ₹80L-1Cr)",
      "FMGE/NEXT exemption for students from selected countries with proper agreements",
      "Single exam for both Indian and abroad medical admissions",
    ],
    examPattern: [
      { section: "Physics", questions: "50 (Section A: 35 + B: 15)", duration: "Part of 3h 20min", marks: "180", topics: "Mechanics, Electricity, Magnetism, Optics, Modern Physics" },
      { section: "Chemistry", questions: "50 (Section A: 35 + B: 15)", duration: "Part of 3h 20min", marks: "180", topics: "Physical Chemistry, Organic Chemistry, Inorganic Chemistry" },
      { section: "Biology (Botany + Zoology)", questions: "100 (Section A: 35+35 + B: 15+15)", duration: "Part of 3h 20min", marks: "360", topics: "Cell Biology, Genetics, Human Physiology, Ecology, Plant Physiology, Reproduction" },
    ],
    scoring: [
      { label: "650-720", value: "Top 1% — AIIMS, top government colleges" },
      { label: "550-649", value: "Good government colleges, abroad MBBS eligibility" },
      { label: "450-549", value: "Private colleges in India, abroad options" },
      { label: "137-449", value: "Qualifying range — eligible for abroad" },
      { label: "Below 137", value: "Not qualifying (General category cutoff)" },
      { label: "Negative marking", value: "-1 for each wrong answer. +4 for correct." },
    ],
    registrationSteps: [
      { step: 1, title: "Check Eligibility", desc: "Must have PCB in 12th with 50% (General) / 40% (SC/ST/OBC). Age: 17+ by Dec 31 of admission year." },
      { step: 2, title: "NTA Registration", desc: "Apply at neet.nta.nic.in when window opens (usually Jan-Feb)." },
      { step: 3, title: "Fill Application", desc: "Personal details, academic info, photo (with name+date), signature, category certificate if applicable." },
      { step: 4, title: "Pay Fee", desc: "₹1,700 (General), ₹1,500 (EWS), ₹900 (SC/ST/PwD). Pay online." },
      { step: 5, title: "Download Admit Card", desc: "Available 3-4 days before exam. Print and carry with ID proof." },
      { step: 6, title: "NMC Eligibility Certificate", desc: "After qualifying, apply at nmc.org.in for Eligibility Certificate to study abroad." },
    ],
    prepTimeline: [
      { month: "Year 1-2", tasks: ["Complete NCERT thoroughly for all 3 subjects", "Join coaching (Allen/Aakash) or structured self-study", "Solve 180 previous year papers"] },
      { month: "Final 6 Months", tasks: ["Daily mock tests (full syllabus)", "Focus on Biology (50% weightage)", "Revision notes for formulas and reactions"] },
      { month: "Final 1 Month", tasks: ["Intensive revision — 12-14 hours/day", "Full tests every alternate day", "Sleep well before exam — avoid new topics"] },
    ],
    freeResources: [
      { name: "NCERT Textbooks (Class 11-12)", type: "Books", url: "https://ncert.nic.in" },
      { name: "NTA NEET Official", type: "Website", url: "https://neet.nta.nic.in" },
      { name: "Physics Wallah (YouTube)", type: "Video", url: "https://www.youtube.com/c/PhysicsWallah" },
      { name: "Unacademy NEET", type: "App", url: "https://unacademy.com" },
      { name: "Previous Year Papers (2005-2024)", type: "Practice", url: "https://neet.nta.nic.in" },
    ],
    books: [
      { name: "NCERT Biology Class 11 & 12", author: "NCERT", bestFor: "Biology foundation — read 5+ times" },
      { name: "Concepts of Physics (H.C. Verma)", author: "H.C. Verma", bestFor: "Physics concepts and problems" },
      { name: "Organic Chemistry (Morrison & Boyd)", author: "Morrison & Boyd", bestFor: "Organic Chemistry mastery" },
      { name: "Objective Biology (Dinesh)", author: "Dinesh", bestFor: "MCQ practice for Biology" },
      { name: "40 Years NEET Chapterwise Solutions", author: "MTG", bestFor: "Previous year paper practice" },
    ],
    relatedExams: ["mcat", "ucat"],
    faq: [
      { q: "Is NEET required for MBBS abroad?", a: "YES. The National Medical Commission (NMC) mandates NEET qualification for Indian students who want to study medicine abroad. You need the NEET Eligibility Certificate from NMC before applying to foreign medical universities." },
      { q: "What is the minimum NEET score for abroad MBBS?", a: "You need to qualify NEET (137+ marks for General in 2024). However, 350+ is recommended as some better universities abroad prefer higher scores." },
      { q: "Which countries accept NEET for direct admission?", a: "Russia, Georgia, Philippines, Kazakhstan, Kyrgyzstan, Uzbekistan, China, Armenia, Moldova, and Bangladesh. Each has different minimum score requirements." },
      { q: "Do I need to take FMGE/NEXT after abroad MBBS?", a: "Yes. After completing MBBS abroad, you must clear the National Exit Test (NEXT) to practice in India. This applies to ALL foreign medical graduates." },
      { q: "Is MBBS abroad cheaper than India?", a: "Compared to Indian private medical colleges (₹80L-1.5Cr), abroad options like Russia (₹15-25L total), Georgia (₹20-30L), and Philippines (₹15-25L) are significantly more affordable." },
    ],
    tips: [
      "Biology = 360 marks (50% of total). Master NCERT Biology line by line.",
      "Previous year papers are GOLD — 40% of questions repeat with slight modifications",
      "Negative marking hurts — attempt only questions you're confident about",
      "Time management: Spend 80 min on Biology, 50 min each on Chemistry and Physics",
      "Read Biology NCERT at least 5 times — every diagram, every table, every footnote",
    ],
  },
};

/* ── Convert basic Exam data to ExamDetail (fallback for exams without full detail page) ── */
function convertBasicToDetail(exam: Exam): ExamDetail {
  const whyThisExam = [
    `Accepted by universities in ${exam.destinations.slice(0, 5).join(", ")}`,
    exam.purpose,
    `Scores valid for ${exam.validity}`,
    `Conducted ${exam.frequency.toLowerCase()}`,
    `Widely recognized — required by top universities globally`,
  ];

  const examPattern = exam.sections.map((s) => ({
    section: s.name,
    questions: s.questions,
    duration: s.duration,
    marks: exam.scoring[s.name] || exam.scoring["Overall"] || "See official guide",
    topics: s.description,
  }));

  const scoring = Object.entries(exam.scores).map(([label, value]) => ({
    label,
    value,
  }));

  const heroStats = [
    { label: "Duration", value: exam.duration, icon: "Clock" },
    { label: "Cost (India)", value: exam.cost, icon: "Wallet" },
    { label: "Frequency", value: exam.frequency.split("(")[0].trim(), icon: "Calendar" },
    { label: "Validity", value: exam.validity, icon: "Repeat" },
    { label: "Level", value: exam.level, icon: "GraduationCap" },
    { label: "Destinations", value: `${exam.destinations.length}+ countries`, icon: "Globe" },
  ];

  const registrationSteps = [
    { step: 1, title: "Create Account", desc: `Register at ${exam.officialUrl.replace("https://", "").split("/")[0]}` },
    { step: 2, title: "Book Test Date", desc: `Visit ${exam.bookAt.replace("https://", "").split("/")[0]} to select your preferred test center and date` },
    { step: 3, title: "Pay & Confirm", desc: `Fee: ${exam.cost}. Keep your confirmation email and ID proof ready` },
    { step: 4, title: "Prepare & Appear", desc: `Recommended prep: ${exam.prepTime}. ${exam.whenToTake}` },
  ];

  const prepTimeline = [
    { month: `Month 1 (${exam.prepTime} before)`, tasks: ["Understand the exam pattern and syllabus", "Gather study materials and mock tests", `Register for ${exam.name} well in advance`] },
    { month: "Month 2", tasks: ["Complete first round of study for all sections", "Take a diagnostic mock test to identify weak areas"] },
    { month: "Month 3", tasks: ["Focus on weak areas identified in diagnostic", "Practice with official past papers and timed mocks"] },
    { month: "Final Week", tasks: ["Review important formulas and strategies", "Take 2-3 full-length mock tests under exam conditions", "Rest well before the exam day"] },
  ];

  const freeResources = [
    { name: `${exam.name} Official Website`, type: "Official", url: exam.officialUrl },
    { name: `${exam.name} Registration Portal`, type: "Registration", url: exam.registrationUrl },
  ];

  const books = [
    { name: `${exam.name} Official Guide`, author: exam.officialUrl.replace("https://www.", "").split(".")[0], bestFor: "Comprehensive preparation" },
  ];

  const faq = [
    { q: `What is ${exam.name}?`, a: exam.description },
    { q: `How much does ${exam.name} cost?`, a: `The exam fee is ${exam.cost}. Additional fees may apply for rescheduling or score sending.` },
    { q: `How long are ${exam.name} scores valid?`, a: `Scores are valid for ${exam.validity}.` },
    { q: `How often can I take ${exam.name}?`, a: exam.frequency },
    { q: `What is the minimum score required?`, a: exam.minScore || exam.avgScore || "Check individual university requirements" },
  ];

  const tips = [
    exam.preparation,
    exam.whenToTake,
    exam.importantNotes || "Start preparation early and take multiple mock tests.",
  ];

  return {
    id: exam.id,
    name: exam.name,
    fullName: exam.fullName,
    tagline: exam.purpose,
    heroStats,
    whyThisExam,
    examPattern,
    scoring,
    registrationSteps,
    prepTimeline,
    freeResources,
    books,
    relatedExams: [],
    faq,
    tips,
  };
}

export function getExamDetail(id: string): ExamDetail | null {
  if (examDetails[id]) return examDetails[id];
  // Fallback: create detail from basic exam data
  const basicExam = ALL_EXAMS.find((e) => e.id === id);
  return basicExam ? convertBasicToDetail(basicExam) : null;
}

export function getAllExamIds(): string[] {
  // Return all exam IDs from both detailed and basic exam data
  const detailIds = Object.keys(examDetails);
  const basicIds = ALL_EXAMS.map((e) => e.id);
  return [...new Set([...detailIds, ...basicIds])];
}

export function getRelatedExams(ids: string[]): ExamDetail[] {
  return ids.map(id => examDetails[id]).filter(Boolean) as ExamDetail[];
}
