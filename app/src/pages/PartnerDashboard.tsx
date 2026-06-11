import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Shield,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  LogOut,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  Target,
  Globe,
  Award,
  ChevronRight,
  BarChart3,
  Zap,
  AlertCircle,
  Calendar,
} from "lucide-react";

/* ─── Types ─── */
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  course: string;
  budget: string;
  status: "new" | "contacted" | "qualified" | "converted" | "dropped";
  matchScore: number;
  date: string;
  notes: string;
}

/* ─── Demo Data ─── */
const myLeads: Lead[] = [
  { id: "L001", name: "Rahul Sharma", email: "rahul.s@email.com", phone: "+91-98765-43210", destination: "Canada", course: "MS Computer Science", budget: "₹35-45L", status: "converted", matchScore: 96, date: "2 hours ago", notes: "Interested in Fall 2026 intake. IELTS 7.5. Ready to apply." },
  { id: "L002", name: "Priya Patel", email: "priya.p@email.com", phone: "+91-87654-32109", destination: "Canada", course: "MBA", budget: "₹50-60L", status: "qualified", matchScore: 88, date: "5 hours ago", notes: "Work exp: 4 years. Looking at Rotman & Ivey." },
  { id: "L003", name: "Amit Kumar", email: "amit.k@email.com", phone: "+91-76543-21098", destination: "USA", course: "MS Data Science", budget: "₹60-70L", status: "contacted", matchScore: 82, date: "1 day ago", notes: "GRE 320. Needs scholarship guidance." },
  { id: "L004", name: "Sneha Reddy", email: "sneha.r@email.com", phone: "+91-65432-10987", destination: "Germany", course: "MSc AI", budget: "₹20-30L", status: "new", matchScore: 91, date: "1 day ago", notes: "Budget conscious. Interested in DAAD scholarship." },
  { id: "L005", name: "Vikram Mehta", email: "vikram.m@email.com", phone: "+91-54321-09876", destination: "UK", course: "MSc Finance", budget: "₹40-50L", status: "contacted", matchScore: 85, date: "2 days ago", notes: "Russell Group target. GMAT 710." },
  { id: "L006", name: "Ananya Iyer", email: "ananya.i@email.com", phone: "+91-43210-98765", destination: "Australia", course: "MS Cybersecurity", budget: "₹35-45L", status: "qualified", matchScore: 79, date: "3 days ago", notes: "STEM background. Interested in PR pathway." },
  { id: "L007", name: "Karan Singh", email: "karan.s@email.com", phone: "+91-32109-87654", destination: "Ireland", course: "MS Cloud Computing", budget: "₹25-35L", status: "dropped", matchScore: 72, date: "4 days ago", notes: "Decided to defer to 2027." },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New Lead", color: "text-blue-700", bg: "bg-blue-100" },
  contacted: { label: "Contacted", color: "text-yellow-700", bg: "bg-yellow-100" },
  qualified: { label: "Qualified", color: "text-purple-700", bg: "bg-purple-100" },
  converted: { label: "Converted", color: "text-green-700", bg: "bg-green-100" },
  dropped: { label: "Dropped", color: "text-red-700", bg: "bg-red-100" },
};

/* ─── Auth Guard ─── */
function usePartnerAuth() {
  const [partner, setPartner] = useState<{ name: string; email: string; isPartner: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("kc_partner");
    if (raw) {
      try { setPartner(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("kc_partner");
    window.location.hash = "#/login";
    window.location.reload();
  };

  return { partner, loading, logout };
}

/* ════════════════════════════ PARTNER DASHBOARD ════════════════════════════ */
export default function PartnerDashboard() {
  const { partner, loading, logout } = usePartnerAuth();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-transparent" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-sm w-full">
          <CardContent className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Partner Access Required</h2>
            <p className="text-sm text-slate-500 mb-6">Sign in with your partner credentials to view this dashboard.</p>
            <Link to="/login">
              <Button className="w-full bg-slate-800 hover:bg-slate-900 rounded-xl">
                <Briefcase className="w-4 h-4 mr-2" /> Sign In as Partner
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredLeads = filterStatus === "all" ? myLeads : myLeads.filter(l => l.status === filterStatus);
  const totalLeads = myLeads.length;
  const converted = myLeads.filter(l => l.status === "converted").length;
  const qualified = myLeads.filter(l => l.status === "qualified").length;
  const newLeads = myLeads.filter(l => l.status === "new").length;
  const conversionRate = Math.round((converted / totalLeads) * 100);
  const avgMatchScore = Math.round(myLeads.reduce((s, l) => s + l.matchScore, 0) / totalLeads);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Header ─── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900 hidden sm:block">Partner Portal</span>
              </Link>
              <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
                <Shield className="w-3 h-3 mr-1" /> Verified
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
                <p className="text-[10px] text-slate-500">{partner.email}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                {partner.name?.charAt(0)?.toUpperCase() ?? "P"}
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 hover:text-red-600 h-9 w-9 p-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Users} label="Total Leads" value={totalLeads} sub={`${newLeads} new`} color="blue" />
          <StatCard icon={CheckCircle2} label="Converted" value={converted} sub={`${conversionRate}% rate`} color="green" />
          <StatCard icon={Target} label="Avg Match" value={`${avgMatchScore}%`} sub="AI score" color="purple" />
          <StatCard icon={TrendingUp} label="This Week" value={`+${qualified}`} sub="qualified" color="teal" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ─── Leads List ─── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Leads</h2>
                <p className="text-sm text-slate-500">AI-matched students interested in your services</p>
              </div>
              <div className="flex gap-1">
                {["all", "new", "contacted", "qualified", "converted"].map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                      filterStatus === s ? "bg-slate-800 text-white" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredLeads.map(lead => (
                <motion.div
                  key={lead.id}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-white rounded-xl border cursor-pointer transition-all hover:shadow-md ${selectedLead?.id === lead.id ? "border-teal-300 ring-1 ring-teal-100" : "border-slate-200"}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                            <Badge className={`${statusConfig[lead.status].bg} ${statusConfig[lead.status].color} border-0 text-[10px]`}>
                              {statusConfig[lead.status].label}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {lead.course} &middot; {lead.destination} &middot; {lead.budget}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {lead.date}
                            <span className="mx-1">|</span>
                            <span className="text-teal-600 font-medium">Match: {lead.matchScore}%</span>
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Lead Detail Sidebar ─── */}
          <div className="space-y-4">
            {selectedLead ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="border border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900">Lead Details</h3>
                      <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                      <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-lg font-bold text-teal-700">
                        {selectedLead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{selectedLead.name}</p>
                        <p className="text-xs text-slate-500">ID: {selectedLead.id}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{selectedLead.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{selectedLead.course}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{selectedLead.budget}</span>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs font-medium text-slate-500 mb-1">Notes</p>
                      <p className="text-sm text-slate-700">{selectedLead.notes}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">AI Match Score</span>
                        <span className="font-bold text-teal-700">{selectedLead.matchScore}%</span>
                      </div>
                      <Progress value={selectedLead.matchScore} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <a href={`tel:${selectedLead.phone}`} className="flex-1">
                        <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 rounded-lg text-xs">
                          <Phone className="w-3.5 h-3.5 mr-1" /> Call
                        </Button>
                      </a>
                      <a href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" variant="outline" className="w-full rounded-lg text-xs border-green-300 text-green-700 hover:bg-green-50">
                          <MessageSquare className="w-3.5 h-3.5 mr-1" /> WhatsApp
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="border border-slate-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Eye className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-600">Select a lead to view details</p>
                  <p className="text-xs text-slate-400 mt-1">Click any lead from the list</p>
                </CardContent>
              </Card>
            )}

            {/* Performance Mini-Card */}
            <Card className="border border-slate-200 shadow-sm bg-gradient-to-br from-slate-800 to-slate-900 text-white">
              <CardContent className="p-5">
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-400" /> Your Performance
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Conversion Rate</span>
                      <span className="font-bold text-teal-400">{conversionRate}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${conversionRate}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Platform Avg</span>
                      <span className="font-bold text-amber-400">34%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "34%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 flex items-center gap-2 text-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-300">
                    {conversionRate > 34 ? "Above" : "Below"} platform average by {Math.abs(conversionRate - 34)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Tips to Convert
                </h4>
                <ul className="space-y-2 text-xs text-amber-900">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    Contact new leads within 2 hours for best conversion
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    Students with 90%+ match scores convert 3x better
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    Follow up within 24h after first contact
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; sub: string; color: string }) {
  const bgMap: Record<string, string> = { blue: "bg-blue-50", green: "bg-green-50", purple: "bg-purple-50", teal: "bg-teal-50", slate: "bg-slate-100" };
  const iconMap: Record<string, string> = { blue: "text-blue-600", green: "text-green-600", purple: "text-purple-600", teal: "text-teal-600", slate: "text-slate-600" };
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
          <div className={`h-10 w-10 rounded-lg ${bgMap[color] ?? bgMap.slate} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconMap[color] ?? iconMap.slate}`} />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">{sub}</p>
      </CardContent>
    </Card>
  );
}
