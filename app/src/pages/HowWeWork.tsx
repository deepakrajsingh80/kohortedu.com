import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Search,
  CheckCircle,
  Shield,
  Brain,
  Users,
  Clock,
  Star,
  MessageCircle,
  FileCheck,
  TrendingUp,
  Zap,
  ArrowRight,
  GraduationCap,
  Award,
  BarChart3,
  Target,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Submit Your Profile",
    desc: "Fill in your academic details, destination preferences, course interests, budget, timeline, and any specific requirements. Our form captures 50+ data points to build a comprehensive student profile.",
    icon: Users,
    details: [
      "Academic scores & transcripts",
      "Destination country preferences",
      "Course & specialization interest",
      "Budget range & funding needs",
      "Timeline & intake preference",
      "English proficiency scores",
      "Work experience (if any)",
    ],
    color: "#0d9488",
  },
  {
    step: "02",
    title: "AI Analysis & Matching",
    desc: "Our proprietary ML engine analyzes your profile against our verified consultant database. We don't just find the closest consultant — we find the most efficient one with the best track record for your specific profile.",
    icon: Brain,
    details: [
      "50+ data points analyzed",
      "Cross-reference consultant database",
      "Success rate matching by specialization",
      "Response efficiency scoring",
      "Outcome quality prediction",
      "Budget alignment verification",
      "Location proximity weighting",
    ],
    color: "#f59e0b",
  },
  {
    step: "03",
    title: "Verification & Quality Check",
    desc: "Every matched consultant undergoes our multi-layer verification process before being presented to you. We ensure only the highest-quality consultants make it to your shortlist.",
    icon: Shield,
    details: [
      "Credential verification",
      "Track record validation",
      "Student review authentication",
      "Success rate confirmation",
      "Active status verification",
      "Compliance check",
    ],
    color: "#0d9488",
  },
  {
    step: "04",
    title: "Receive Top 3 Matches",
    desc: "Within 72 hours, you receive your top 3 consultant matches — each with a detailed match score, efficiency rating, success rate, and verified student reviews.",
    icon: Star,
    details: [
      "Match percentage score (0-100%)",
      "Efficiency rating (Good to Excellent)",
      "Success rate for your profile type",
      "Average response time",
      "Verified student reviews",
      "Top university placements",
    ],
    color: "#f59e0b",
  },
  {
    step: "05",
    title: "Connect & Consult",
    desc: "Choose your preferred consultant and book a consultation. Our platform handles scheduling, reminders, and follow-ups to ensure a smooth experience.",
    icon: MessageCircle,
    details: [
      "In-app messaging",
      "Video consultation booking",
      "Document sharing",
      "Progress tracking",
      "Session reminders",
      "Post-consultation feedback",
    ],
    color: "#0d9488",
  },
  {
    step: "06",
    title: "Track Your Success",
    desc: "Monitor your application journey with real-time updates. Our system tracks outcomes to continuously improve matching for future students.",
    icon: TrendingUp,
    details: [
      "Application milestone tracking",
      "Document checklist",
      "Deadline reminders",
      "Outcome reporting",
      "Feedback collection",
      "Continuous AI improvement",
    ],
    color: "#f59e0b",
  },
];

const verificationProcess = [
  {
    icon: FileCheck,
    title: "Document Verification",
    desc: "Educational credentials, certifications, and licenses are verified through official channels.",
  },
  {
    icon: Award,
    title: "Track Record Audit",
    desc: "Past student placements are cross-referenced with university admission databases.",
  },
  {
    icon: Users,
    title: "Student Review Check",
    desc: "Every review is authenticated — only verified students who completed the journey can leave feedback.",
  },
  {
    icon: Shield,
    title: "Compliance Screening",
    desc: "Background checks ensure no history of fraud, malpractice, or disciplinary action.",
  },
];

export default function HowWeWork() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0fdfa] via-white to-[#fff7ed] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
              <Settings className="mr-1.5 h-3.5 w-3.5" />
              Our Process
            </Badge>
            <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl mb-4 leading-tight">
              How Kohortconnect Works
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A transparent, 6-step process powered by AI that takes you from
              profile submission to consultant matching in under 72 hours. Every
              step is designed for trust, efficiency, and results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#matching-process">
                <Badge className="bg-[#0d9488]/10 text-[#0d9488] px-3 py-1.5 cursor-pointer hover:bg-[#0d9488]/20">
                  <Search className="mr-1.5 h-3 w-3" />
                  Matching Process
                </Badge>
              </a>
              <a href="#verification">
                <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] px-3 py-1.5 cursor-pointer hover:bg-[#f59e0b]/20">
                  <Shield className="mr-1.5 h-3 w-3" />
                  Verification
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Steps */}
      <section id="matching-process" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Step-by-Step
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              Your Journey, Simplified
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              From submitting your profile to connecting with your ideal
              consultant — here&apos;s how we make it happen.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((item) => (
              <Card
                key={item.step}
                className="border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <item.icon
                            className="h-7 w-7"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div>
                          <p
                            className="text-sm font-bold"
                            style={{ color: item.color }}
                          >
                            STEP {item.step}
                          </p>
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.desc}
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#0d9488] hover:underline"
                      >
                        Get started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div
                      className="p-8 border-t lg:border-t-0 lg:border-l border-gray-100"
                      style={{ backgroundColor: `${item.color}05` }}
                    >
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" style={{ color: item.color }} />
                        What happens:
                      </p>
                      <ul className="space-y-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section id="verification" className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Trust Framework
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              How We Verify Consultants
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our 4-layer verification process ensures only the most credible
              consultants join our platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {verificationProcess.map((item, idx) => (
              <Card
                key={idx}
                className="border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-14 w-14 rounded-full bg-[#0d9488]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-[#0d9488]" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="h-6 w-6 rounded-full bg-[#0d9488] text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-[#0d9488]/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6 text-[#0d9488]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Verification Badge System
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Every verified consultant receives a trust badge that indicates
                  their verification level. Students can see this badge on every
                  consultant profile, ensuring complete transparency.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Fully Verified
                  </Badge>
                  <Badge className="bg-[#0d9488]/10 text-[#0d9488]">
                    <Shield className="h-3 w-3 mr-1" />
                    Background Checked
                  </Badge>
                  <Badge className="bg-[#f59e0b]/10 text-[#f59e0b]">
                    <Star className="h-3 w-3 mr-1" />
                    Top Rated
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    High Success Rate
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Matching Deep Dive */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5">
              <Brain className="mr-1.5 h-3.5 w-3.5" />
              AI Engine
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              How Our AI Matching Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We don&apos;t just match — we optimize for the best possible
              outcome.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Closest Agents",
                desc: "We prioritize consultants in your city or region for easy in-person meetings and local support.",
                weight: "25% weight",
              },
              {
                icon: Zap,
                title: "Best Efficiency",
                desc: "Response time, availability, and throughput are measured to ensure you get attention when you need it.",
                weight: "30% weight",
              },
              {
                icon: BarChart3,
                title: "Proven Results",
                desc: "Historical success rates, university placement tiers, and scholarship achievement scores matter most.",
                weight: "45% weight",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border border-gray-100 text-center"
              >
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-full bg-[#0d9488]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-[#0d9488]" />
                  </div>
                  <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-3">
                    {item.weight}
                  </Badge>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0d9488]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Clock className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            72-Hour Guarantee
          </h2>
          <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
            Submit your profile today. Within 72 hours, you&apos;ll have your
            top 3 verified consultant matches with full match scores and
            efficiency ratings.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { hour: "0h", label: "Submit Profile" },
              { hour: "24h", label: "AI Analysis" },
              { hour: "72h", label: "Get Matches" },
            ].map((item) => (
              <div key={item.hour} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{item.hour}</p>
                <p className="text-sm text-teal-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
