import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Linkedin,
  Mail,
  Award,
  GraduationCap,
  Building2,
  Globe,
  ArrowRight,
} from "lucide-react";

const founders = [
  {
    name: "CEO & Co-Founder",
    role: "Chief Executive Officer",
    bio: "15 years in study-abroad EdTech. Former VP at Leap Scholar. Deep industry networks across India, USA, and Canada. Built and scaled multiple education platforms from zero to 500K+ users.",
    expertise: ["EdTech Strategy", "Market Expansion", "Investor Relations"],
    bg: "bg-[#0d9488]",
    initial: "C",
  },
  {
    name: "CTO & Co-Founder",
    role: "Chief Technology Officer",
    bio: "Ex-Flipkart AI/ML Specialist. 10 years building scalable platforms. Led recommendation systems serving 50M+ users. IIT Delhi Computer Science graduate.",
    expertise: ["Platform Architecture", "AI/ML Engine", "Technical Scalability"],
    bg: "bg-[#f59e0b]",
    initial: "T",
  },
  {
    name: "COO & Co-Founder",
    role: "Chief Operations Officer",
    bio: "Ex-Byju's Operations Expert. 8 years in EdTech operations. Managed consultant networks of 200+ professionals. Expert in customer success and consultant onboarding.",
    expertise: ["Day-to-Day Operations", "Consultant Onboarding", "Customer Success"],
    bg: "bg-purple-500",
    initial: "O",
  },
  {
    name: "CMO & Co-Founder",
    role: "Chief Marketing Officer",
    bio: "Ex-Unacademy Growth Marketing. 7 years in digital marketing for education. Drove user acquisition from 0 to 1M students. Expert in performance marketing and brand building.",
    expertise: ["User Acquisition", "Brand Building", "University Partnerships"],
    bg: "bg-blue-500",
    initial: "M",
  },
];

const advisors = [
  {
    name: "Strategy Advisor",
    role: "Ex-McKinsey, 8 Years EdTech",
    bio: "Former McKinsey consultant specializing in EdTech market strategy. Advised 3 education unicorns on growth and expansion. IIM Ahmedabad alumnus.",
    bg: "bg-indigo-500",
    initial: "S",
  },
  {
    name: "Academic Advisor",
    role: "Dean, IIT Madras",
    bio: "Dean of International Relations at IIT Madras. 25 years in academia. Led 50+ international university partnerships. Expert in research collaboration and student exchange programs.",
    bg: "bg-pink-500",
    initial: "A",
  },
  {
    name: "Investment Advisor",
    role: "Partner, Sequoia India",
    bio: "Partner at Sequoia Capital India focusing on EdTech investments. Led investments in 5 education startups. IIT Bombay & Stanford GSB alumnus.",
    bg: "bg-teal-600",
    initial: "I",
  },
];

const teamStats = [
  { icon: Users, value: "12", label: "Current Team" },
  { icon: Building2, value: "28", label: "Year 1 Target" },
  { icon: Award, value: "50+", label: "Years Combined Experience" },
  { icon: Globe, value: "3", label: "Countries Represented" },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[350px] lg:h-[400px]">
          <img
            src="/team-hero.jpg"
            alt="Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 w-full">
              <div className="max-w-2xl">
                <Badge className="bg-[#0d9488]/20 text-white mb-4 px-4 py-1.5 backdrop-blur-sm">
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  Our Team
                </Badge>
                <h1 className="text-4xl font-extrabold text-white lg:text-5xl mb-4 leading-tight">
                  Built by Industry Veterans
                </h1>
                <p className="text-lg text-gray-200 leading-relaxed">
                  A team of ex-Flipkart, ex-Byju&apos;s, ex-Unacademy, and
                  ex-Leap Scholar leaders — united by one mission: fixing the
                  trust gap in overseas education consulting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#0d9488]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-teal-200" />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-teal-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
              <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
              Founding Team
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              The Founders
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Four leaders who have built, scaled, and operated India&apos;s most
              successful EdTech platforms. Now they&apos;re fixing the trust
              problem in overseas consulting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {founders.map((founder) => (
              <Card
                key={founder.name}
                className="border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-16 w-16 rounded-full ${founder.bg} flex items-center justify-center text-2xl font-bold text-white shrink-0`}
                    >
                      {founder.initial}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {founder.name}
                      </h3>
                      <p className="text-[#0d9488] font-medium text-sm mb-3">
                        {founder.role}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {founder.bio}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {founder.expertise.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-[#0d9488]/10 text-[#0d9488] text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href="#"
                          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0d9488] hover:text-white transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a
                          href="#"
                          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0d9488] hover:text-white transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5">
              <Award className="mr-1.5 h-3.5 w-3.5" />
              Advisory Board
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              Guided by the Best
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our advisors bring decades of experience in strategy, academia,
              and venture capital to help us build something truly impactful.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {advisors.map((advisor) => (
              <Card
                key={advisor.name}
                className="border border-gray-100 hover:shadow-lg transition-shadow text-center"
              >
                <CardContent className="p-8">
                  <div
                    className={`h-20 w-20 rounded-full ${advisor.bg} flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4`}
                  >
                    {advisor.initial}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {advisor.name}
                  </h3>
                  <p className="text-[#0d9488] font-medium text-sm mb-4">
                    {advisor.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {advisor.bio}
                  </p>
                  <div className="flex justify-center gap-2">
                    <a
                      href="#"
                      className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0d9488] hover:text-white transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0d9488] hover:text-white transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-gradient-to-br from-[#f0fdfa] to-[#fff7ed] rounded-2xl p-10 border border-gray-100">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  Join Us
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  We&apos;re Hiring
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We&apos;re building the team that will transform overseas
                  education consulting in India. If you&apos;re passionate about
                  education, technology, and trust — we want to hear from you.
                </p>
                <div className="space-y-3">
                  {[
                    { role: "Full-Stack Engineer", location: "Hyderabad / Remote" },
                    { role: "AI/ML Engineer", location: "Hyderabad" },
                    { role: "Product Manager", location: "Hyderabad" },
                    { role: "Growth Marketer", location: "Bangalore / Remote" },
                    { role: "Consultant Operations Lead", location: "Hyderabad" },
                  ].map((job) => (
                    <div
                      key={job.role}
                      className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100"
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {job.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        {job.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-block bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <p className="text-5xl font-bold text-[#0d9488] mb-2">5</p>
                  <p className="text-gray-600 mb-1">Open Positions</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Apply by May 2026
                  </p>
                  <a
                    href="mailto:careers@kohortconnect.com"
                    className="inline-flex items-center gap-2 bg-[#0d9488] text-white hover:bg-[#0f766e] px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    View All Roles
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d9488]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Users className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Join the Mission?
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Whether as a team member, consultant, or advisor — there&apos;s a
            place for you at Kohortconnect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:careers@kohortconnect.com"
              className="inline-flex items-center gap-2 bg-white text-[#0d9488] hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Careers
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:founders@kohortconnect.com"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Contact Founders
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
