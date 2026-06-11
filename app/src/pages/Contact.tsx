import { useState } from "react";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  GraduationCap,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";

const contactReasons = [
  { icon: GraduationCap, title: "I am a Student", desc: "Need help finding a consultant or have questions about studying abroad?" },
  { icon: Users, title: "I am a Consultant", desc: "Want to join our verified consultant network?" },
  { icon: Building2, title: "University/Partner", desc: "Interested in partnership opportunities?" },
  { icon: MessageCircle, title: "General Inquiry", desc: "Have feedback, press inquiry, or something else?" },
];

const faqs = [
  {
    q: "How long does the matching process take?",
    a: "Our AI matching engine delivers your top 3 verified consultant matches within 72 hours of profile submission. In many cases, it's much faster — often within 24 hours.",
  },
  {
    q: "Is the matching service really free?",
    a: "Yes! Our basic AI matching service is completely free for students. We also offer a premium tier at Rs 999/month that includes priority matching, dedicated support, and visa success guarantees.",
  },
  {
    q: "How do you verify consultants?",
    a: "Every consultant undergoes a 4-layer verification process: document verification, track record audit, student review authentication, and compliance screening. Only consultants who pass all checks receive our verified badge.",
  },
  {
    q: "What countries do you cover?",
    a: "We currently cover 8 major study destinations: USA, Canada, UK, Australia, Germany, Ireland, New Zealand, and other countries. Our consultant network spans all these regions.",
  },
  {
    q: "Can I change my consultant after matching?",
    a: "Absolutely. If your first match isn't the right fit, you can request a rematch or choose from your other top matches at no additional cost.",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0fdfa] via-white to-[#fff7ed] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <Badge className="bg-[#0d9488]/10 text-[#0d9488] mb-4 px-4 py-1.5">
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Contact Us
            </Badge>
            <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl mb-4 leading-tight">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you&apos;re a student looking for guidance, a consultant
              wanting to join our network, or a university exploring partnership
              — our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: "+91-XXXXX-XXXXX",
                sub: "Mon-Fri, 9AM-7PM IST",
              },
              {
                icon: Mail,
                label: "Email",
                value: "founders@kohortconnect.com",
                sub: "We reply within 24 hours",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "Hyderabad, India",
                sub: "Telangana 500081",
              },
              {
                icon: Clock,
                label: "Hours",
                value: "Mon - Fri",
                sub: "9:00 AM - 7:00 PM IST",
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-[#0d9488]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-[#0d9488]" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>
              {submitted ? (
                <Card className="border-[#0d9488]/20 bg-[#f0fdfa]">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d9488]">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                      className="border-[#0d9488] text-[#0d9488]"
                    >
                      Send Another
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Name *</Label>
                          <Input
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            className="h-11"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Email *</Label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700">Phone</Label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700">Subject *</Label>
                        <Input
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700">Message *</Label>
                        <Textarea
                          placeholder="Tell us more about how we can help..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="min-h-[120px] resize-none"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white h-11 font-semibold"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* I am a... */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                I am a...
              </h2>
              <div className="space-y-4">
                {contactReasons.map((item) => (
                  <Card
                    key={item.title}
                    className="border border-gray-100 hover:shadow-md hover:border-[#0d9488]/20 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#0d9488]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0d9488] transition-colors">
                          <item.icon className="h-5 w-5 text-[#0d9488] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                            {item.title}
                            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-[#0d9488] transition-all" />
                          </h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-8" />

              {/* Quick CTA */}
              <div className="bg-[#f0fdfa] rounded-xl p-6 border border-[#0d9488]/20">
                <h3 className="font-bold text-gray-900 mb-2">
                  Ready to get matched?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Submit your profile and get your top 3 verified consultant
                  matches within 72 hours.
                </p>
                <Link to="/">
                  <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white">
                    Get Matched Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] mb-4 px-4 py-1.5">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border border-gray-200">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <MessageCircle className="h-5 w-5 text-[#0d9488] shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
