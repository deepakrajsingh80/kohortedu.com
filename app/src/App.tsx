// v20250608-cachebust-001
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PartnerDashboard from "./pages/PartnerDashboard";
import NotFound from "./pages/NotFound";
import Evaluate from "./pages/Evaluate"; // Eagerly loaded — fixes Rollup icon export bug
import CartDrawer from "./components/CartDrawer";
import { LoanBanner } from "./components/LoanBanner";
import { SEORoute } from "./components/SEORoute";
import { CartProvider } from "./context/CartContext";
import { ProfileProvider } from "./context/ProfileContext";
import StickySubBar from "./components/StickySubBar";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Vision = lazy(() => import("./pages/Vision"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const CourseLanding = lazy(() => import("./pages/CourseLanding"));
const DestinationLanding = lazy(() => import("./pages/DestinationLanding"));
const EvaluateV2 = lazy(() => import("./pages/EvaluateV2"));
const ExamDetail = lazy(() => import("./pages/ExamDetail"));
const Premium = lazy(() => import("./pages/Premium"));
const ProfileBlaster = lazy(() => import("./pages/ProfileBlaster"));
const MajorLanding = lazy(() => import("./pages/MajorLanding"));

const ParentsPage = lazy(() => import("./pages/ParentsPage"));
const SmartMatch = lazy(() => import("./pages/SmartMatch"));
const Learn = lazy(() => import("./pages/Learn"));
const ArticleDetailPage = lazy(() => import("./pages/ArticleDetailPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const StudentLoans = lazy(() => import("./pages/StudentLoans"));
const CoursesList = lazy(() => import("./pages/CoursesList"));
const DestinationsList = lazy(() => import("./pages/DestinationsList"));
const Admin = lazy(() => import("./pages/Admin"));
const ExamHub = lazy(() => import("./pages/ExamHub"));
const LearnCompare = lazy(() => import("./pages/LearnCompare"));
const UniversitiesList = lazy(() => import("./pages/UniversitiesList"));
const UniversityDetail = lazy(() => import("./pages/UniversityDetail"));

const fallback = (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin w-10 h-10 border-4 border-[#0d9488] border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  </div>
);

/* ─── SEO configs per route ─── */
const seo = {
  home: { title: "Study Abroad Consultants Marketplace for Indian Students", desc: "Kohortconnect connects Indian students with verified study abroad consultants. Get free guidance for USA, UK, Canada, Australia, Germany & 14 destinations. AI-powered matching, 100+ verified consultants, education loans, and complete country guides." },
  vision: { title: "Our Vision — Making Study Abroad Accessible", desc: "Kohortconnect's mission is to democratize access to quality study abroad guidance for every Indian student, regardless of background or budget." },
  howWeWork: { title: "How It Works — 4 Simple Steps", desc: "Create profile, get AI-matched with consultants, compare countries with our Decision Engine, and connect with verified experts. Free to start." },
  team: { title: "Our Team — Study Abroad Experts", desc: "Meet the team behind Kohortconnect — education consultants, tech builders, and former international students dedicated to your success." },
  contact: { title: "Contact Us — Get in Touch", desc: "Reach out to Kohortconnect for partnership inquiries, media requests, or general questions about studying abroad." },
  login: { title: "Create Your Free Profile", desc: "Build your study abroad profile in 2 minutes. Get matched with verified consultants and unlock personalized recommendations for 22 countries." },
  dashboard: { title: "Your Study Abroad Dashboard", desc: "Track your application progress, view matched consultants, manage your study abroad journey, and access premium features." },
  partner: { title: "Partner Dashboard — For Consultants", desc: "Manage your consultant profile, track leads, and connect with students on the Kohortconnect partner platform." },
  courses: { title: "Study Abroad Courses — UG, PG, PhD, Diploma & PR Pathways", desc: "Explore undergraduate, postgraduate, PhD, diploma and PR pathway courses. Compare tuition, scholarships, career outcomes across 22 countries." },
  destinations: { title: "Top 14 Study Abroad Destinations for Indian Students", desc: "Detailed guides for USA, Canada, UK, Australia, Germany, Ireland, Singapore, France, New Zealand, Netherlands, Italy, Spain, South Korea & Malaysia." },
  evaluate: { title: "AI Study Abroad Decision Engine — Find Your Best Country", desc: "Profile yourself in 90 seconds. Compare 22 countries on tuition, living costs, ROI, safety, visa ease & PR pathways. Free rank #3 preview." },
  premium: { title: "Premium Bundle — Unlock Full Study Abroad Guidance", desc: "Get complete access to 14 country guides, 100+ verified consultant contacts, Decision Engine with full rankings, and scholarship database. One-time fee of ₹999." },
  profileBlaster: { title: "Profile Blaster — Boost Your Visibility", desc: "Get your study abroad profile featured to top consultants. Increase your chances of getting noticed and receiving personalized guidance." },
  medicine: { title: "Study Medicine Abroad — MBBS & MD Programs", desc: "Compare medical programs across Russia, Georgia, Philippines, Germany & more. Low-cost MBBS options starting from ₹3L/year." },
  stem: { title: "STEM Programs Abroad — Engineering, CS & Science", desc: "Best STEM destinations for Indian students. Top universities, scholarships, and career outcomes in tech, engineering and sciences." },
  accounts: { title: "Accounting & Finance Courses Abroad", desc: "CPA, ACCA, CFA and accounting programs in USA, UK, Canada, Australia. High-demand career paths with strong PR options." },
  arts: { title: "Arts & Humanities Programs Abroad", desc: "Liberal arts, design, media, and humanities programs. Discover creative career paths across 14 destinations." },
  management: { title: "MBA & Management Programs Abroad", desc: "Compare MBA programs globally. GMAT-free options, executive MBA, and specialized management courses with ROI analysis." },
  fashion: { title: "Fashion Design & Luxury Brand Management Abroad", desc: "Study fashion design, luxury brand management, and textile design in Italy, France, UK & USA. Career paths from Rs 30L-2Cr+." },
  hotel: { title: "Hotel Management & Hospitality Abroad", desc: "Hospitality, culinary arts, and tourism management in Switzerland, UAE, Australia & Canada. Tax-free salaries in UAE." },
  journalism: { title: "Journalism & Media Studies Abroad", desc: "Journalism, digital media, and PR programs. Train with BBC, CNN, Reuters. Strong demand for bilingual journalists." },
  films: { title: "Film Production, VFX & Animation Abroad", desc: "Filmmaking, VFX, animation, and screenwriting programs. Connected to Hollywood, Netflix, Pixar. O-1 visa for talent." },

  parents: { title: "Parent's Corner — Guide for Indian Parents", desc: "Everything Indian parents need to know about sending their child abroad. Safety data, cost breakdowns, ROI calculator, education loans, and verified consultant network." },
  smartMatch: { title: "Smart Match — Find Your Perfect Study Destination", desc: "Answer 6 quick questions and get AI-matched with your top 3 study abroad destinations based on your profile, budget, and goals." },
  learn: { title: "Study Abroad Knowledge Hub — Free Guides & Resources", desc: "100+ visual guides on IELTS, GRE, GMAT, applications, visas, finance, and career planning. Curated for Indian students going abroad." },
  checkout: { title: "Checkout — Kohortconnect Premium", desc: "Complete your purchase of the Kohortconnect Premium Bundle for ₹999. Unlock 14 country guides, 100+ consultant contacts, and the full Decision Engine." },
  loans: { title: "Education Loans for Abroad Studies — Compare 9 Lenders", desc: "Compare SBI, HDFC Credila, Avanse, ICICI, Axis & more. Get upto ₹2Cr at rates from 8.33%. Calculate EMI, check eligibility, apply online." },
  coursesList: { title: "Study Abroad Courses — UG, PG, PhD, Diploma & PR Pathways | 14 Destinations", desc: "Explore all study abroad course types — Undergraduate, Postgraduate, PhD, Diploma, and PR Pathway programs. Compare across 14 destinations with tuition, careers, and scholarships." },
  destinationsList: { title: "14 Study Abroad Destinations — Complete Guides for Indian Students", desc: "Browse all 14 study destinations — USA, Canada, UK, Australia, Germany, Ireland, Singapore, France, NZ, Netherlands, Italy, Spain, South Korea & Malaysia. Tuition, visas, PR & scholarships." },
  examHub: { title: "Study Abroad Exam Hub — IELTS, GRE, GMAT, SAT, NEET & 25+ Exams", desc: "Complete guide to all examinations for studying abroad: IELTS, TOEFL, GRE, GMAT, SAT, ACT, MCAT, UCAT, NEET, TestDaF, and more. Requirements, scores, costs, and preparation timelines for Indian students." },
  evaluateV2: { title: "Decision Engine v2 — Dynamic Exam Fields", desc: "Test version of the Decision Engine with smart exam fields that change based on your course selection. PG STEM asks for GRE, Medicine asks for NEET/MCAT, Management asks for GMAT." },
  examDetail: { title: "Study Abroad Exam Guide — Preparation, Coaching & Registration", desc: "Complete exam guide with pattern, scoring, registration steps, preparation timeline, free resources, recommended books, top coaching institutes, and lead form for personalized study plan." },
  universitiesList: { title: "Top Universities for Indian Students — USA, Canada, UK, Germany & More", desc: "Explore 50+ universities across 6 countries with detailed admission guides, scholarships, campus life, Indian student reviews, and career outcomes. Find your perfect university match." },
  universityDetail: { title: "", desc: "" },
};

export default function App() {
  return (
    <CartProvider>
      <ProfileProvider>
        <ScrollToTop />
        <CartDrawer />
        <LoanBanner />
        <StickySubBar />
      <ErrorBoundary>
      <Suspense fallback={fallback}>
          <Routes>
          <Route path="/" element={<SEORoute {...seo.home}><Home /></SEORoute>} />
          <Route path="/vision" element={<SEORoute {...seo.vision}><Vision /></SEORoute>} />
          <Route path="/how-we-work" element={<SEORoute {...seo.howWeWork}><HowWeWork /></SEORoute>} />
          <Route path="/team" element={<SEORoute {...seo.team}><Team /></SEORoute>} />
          <Route path="/contact" element={<SEORoute {...seo.contact}><Contact /></SEORoute>} />
          <Route path="/login" element={<SEORoute {...seo.login}><Login /></SEORoute>} />
          <Route path="/dashboard" element={<SEORoute {...seo.dashboard}><Dashboard /></SEORoute>} />
          <Route path="/partner-dashboard" element={<SEORoute {...seo.partner}><PartnerDashboard /></SEORoute>} />
          <Route path="/courses" element={<SEORoute {...seo.coursesList}><CoursesList /></SEORoute>} />
          <Route path="/courses/:courseId" element={<CourseLanding />} />
          <Route path="/destinations" element={<SEORoute {...seo.destinationsList}><DestinationsList /></SEORoute>} />
          <Route path="/destinations/:destId" element={<DestinationLanding />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/evaluate" element={<SEORoute {...seo.evaluate}><Evaluate /></SEORoute>} />
          <Route path="/evaluate-v2" element={<SEORoute {...seo.evaluateV2}><EvaluateV2 /></SEORoute>} />
          <Route path="/premium" element={<SEORoute {...seo.premium}><Premium /></SEORoute>} />
          <Route path="/profile-blaster" element={<SEORoute {...seo.profileBlaster}><ProfileBlaster /></SEORoute>} />
          {/* ═══ Unified Major Landing — handles all 16 majors dynamically ═══ */}
          <Route path="/majors/:majorId" element={<MajorLanding />} />

          <Route path="/parents" element={<SEORoute {...seo.parents}><ParentsPage /></SEORoute>} />
          <Route path="/smart-match" element={<SEORoute {...seo.smartMatch}><SmartMatch /></SEORoute>} />
          <Route path="/learn" element={<SEORoute {...seo.learn}><Learn /></SEORoute>} />
          <Route path="/learn/:articleId" element={<ArticleDetailPage />} />
          <Route path="/checkout" element={<SEORoute {...seo.checkout}><Checkout /></SEORoute>} />
          <Route path="/student-loans" element={<SEORoute {...seo.loans}><StudentLoans /></SEORoute>} />
          <Route path="/exams" element={<SEORoute {...seo.examHub}><ExamHub /></SEORoute>} />
          <Route path="/exams/:examId" element={<SEORoute {...seo.examDetail}><ExamDetail /></SEORoute>} />
          <Route path="/learn-compare" element={<SEORoute title="3 Design Concepts — Learning Hub Comparison" desc="Compare 3 interactive design concepts for the Learning Hub article experience: Card Stack, Timeline, and Gamified."><LearnCompare /></SEORoute>} />
          <Route path="/universities" element={<SEORoute {...seo.universitiesList}><UniversitiesList /></SEORoute>} />
          <Route path="/universities/:slug" element={<UniversityDetail />} />
          <Route path="*" element={<SEORoute title="Page Not Found" desc="The page you are looking for does not exist."><NotFound /></SEORoute>} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
      </ProfileProvider>
    </CartProvider>
  );
}
