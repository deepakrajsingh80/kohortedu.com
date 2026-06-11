import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Target,
  Heart,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Lightbulb,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust Above All",
    desc: "We believe every student deserves honest, verified guidance. No compromises on consultant verification.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    desc: "AI-powered matching that goes beyond proximity to find the most efficient consultant for each unique profile.",
  },
  {
    icon: Heart,
    title: "Student First",
    desc: "Every decision we make starts with one question: 'Is this best for the student?' If not, we don't do it.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    desc: "We constantly push the boundaries of what's possible with AI in education consulting.",
  },
  {
    icon: Globe,
    title: "Borderless Access",
    desc: "Quality education guidance should not be limited by geography. We're building a global network of verified experts.",
  },
  {
    icon: Award,
    title: "Excellence Obsessed",
    desc: "From consultant vetting to match accuracy, we hold ourselves to the highest standards in everything we do.",
  },
];

const milestones = [
  { year: "2026 Q1", title: "Platform Launch", desc: "Beta launch in Hyderabad & Bangalore with 50 verified consultants", done: true },
  { year: "2026 Q2", title: "AI Engine v2", desc: "Enhanced matching algorithms with outcome prediction", done: true },
  { year: "2026 Q3", title: "National Expansion", desc: "Coverage across 15 Indian cities with 600+ consultants", done: false },
  { year: "2026 Q4", title: "University Partners", desc: "200+ university partnerships for direct admission pathways", done: false },
  { year: "2027 H1", title: "B2B White-Label", desc: "SaaS platform for universities and education agencies", done: false },
  { year: "2027 H2", title: "Global Expansion", desc: "Southeast Asia pilot in Singapore & Malaysia", done: false },
];

export default function Vision() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] lg:h-[500px]">
          <img
            src="/vision-hero.jpg"
            alt="Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 w-full">
              <div className="max-w-2xl">
                <Badge className="bg-[#0d9488]/20 text-white mb-4 px-4 py-1.5 backdrop-blur-sm">
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Our Vision
                </Badge>
                <h1 className="text-4xl font-extrabold text-white lg:text-5xl mb-4 leading-tight">
                  Building the Trust Infrastructure for Global Education
                </h1>
                <p className="text-lg text-gray-200 leading-relaxed">
                  We envision a world where every Indian student can access
                  verified, world-class education consulting — regardless of
                  where they live or what they can afford.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-6 px-4 py-1.5">
            <Target className="mr-1.5 h-3.5 w-3.5" />
            Vision 2030
          </Badge>
          <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed mb-8">
            &ldquo;By 2030, every Indian student planning to study abroad will
            start their journey on Kohortconnect — because trust should never be
            a luxury, and great guidance should never be a gamble.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#0d9488] flex items-center justify-center text-sm font-bold text-white">
              K
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Kohortconnect Team</p>
              <p className="text-sm text-gray-500">Founded 2026</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Problem We Solve */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Problem We&apos;re Solving
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              India&apos;s overseas education market is massive — but the trust
              infrastructure is broken. Here&apos;s the reality:
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                stat: "47%",
                label: "Fraud Rate",
                desc: "of students report experiencing consultant fraud or misleading promises",
                icon: Shield,
              },
              {
                stat: "74%",
                label: "Visa Rejection",
                desc: "rejection rate for Indian students due to poor consultant guidance",
                icon: TrendingUp,
              },
              {
                stat: "Rs 85K",
                label: "Average Loss",
                desc: "money wasted on unsuitable consultations per student",
                icon: Target,
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="border border-gray-200 text-center"
              >
                <CardContent className="p-8">
                  <item.icon className="h-10 w-10 text-[#0d9488] mx-auto mb-4" />
                  <p className="text-4xl font-bold text-[#0d9488] mb-2">
                    {item.stat}
                  </p>
                  <p className="font-semibold text-gray-900 mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5">
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Core Values
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              These principles guide every decision we make at Kohortconnect.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border border-gray-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-[#0d9488]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              Roadmap
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              Our Journey to 2030
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex gap-6 items-start">
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      milestone.done
                        ? "bg-[#0d9488]"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {milestone.done ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <span className="text-sm font-bold text-gray-400">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <Card className="flex-1 border border-gray-200">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={
                            milestone.done
                              ? "bg-[#0d9488]/10 text-[#0d9488]"
                              : "bg-gray-100 text-gray-500"
                          }
                        >
                          {milestone.year}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {milestone.desc}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d9488]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Users className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Building the Future
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Whether you&apos;re a student, consultant, university, or investor —
            there&apos;s a place for you in our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#lead-form"
              className="inline-flex items-center gap-2 bg-white text-[#0d9488] hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
