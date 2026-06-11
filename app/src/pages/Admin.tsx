import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import {
  Users, GraduationCap, FileText, TrendingUp, Clock,
  ArrowLeft, Mail, Phone, Trash2, RefreshCw, AlertTriangle,
  BarChart3, Shield, Search, X, ArrowRight, LogOut,
  CheckCircle2, XCircle, BookOpen, Wallet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  courseInterest: string;
  city: string;
  status: LeadStatus;
  createdAt: string;
}

interface StudentProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  destination: string;
  courseInterest: string;
  budget: string;
  createdAt: string;
}

type Tab = "overview" | "leads" | "students";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  converted: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost",
};

/* ─── Admin Access Gate ─── */
function AdminGate() {
  const [secret, setSecret] = useState("");
  const [err, setErr] = useState("");

  function activate() {
    if (secret === "kohort2026") {
      localStorage.setItem("kc_admin_override", "1");
      window.location.reload();
    } else {
      setErr("Invalid access key");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg max-w-md w-full p-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-slate-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 text-center mb-2">Admin Access</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Enter your admin access key to continue.</p>
        <div className="space-y-3">
          <input
            type="password" value={secret}
            onChange={e => { setSecret(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && activate()}
            placeholder="Enter access key"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button onClick={activate} className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-colors">
            Access Admin Panel
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link to="/" className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Admin Component ─── */
export default function Admin() {
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const utils = trpc.useUtils();
  const { data: dbLeads = [], isLoading, refetch } = trpc.lead.list.useQuery();

  const updateStatusMutation = trpc.lead.updateStatus.useMutation({
    onSuccess: () => {
      utils.lead.list.invalidate();
    },
  });

  const deleteMutation = trpc.lead.delete.useMutation({
    onSuccess: () => {
      utils.lead.list.invalidate();
    },
  });

  const leads: Lead[] = dbLeads.map((l) => ({
    id: l.id,
    fullName: l.fullName,
    email: l.email,
    phone: l.phone,
    destination: l.destination,
    courseInterest: l.courseInterest,
    city: l.city,
    status: l.status as LeadStatus,
    createdAt: typeof l.createdAt === "string" ? l.createdAt : (l.createdAt instanceof Date ? l.createdAt.toISOString() : new Date(l.createdAt).toISOString()),
  }));

  const students: StudentProfile[] = leads.map((l) => ({
    id: l.id,
    fullName: l.fullName,
    email: l.email,
    phone: l.phone,
    city: l.city,
    destination: l.destination,
    courseInterest: l.courseInterest,
    budget: "—",
    createdAt: l.createdAt,
  }));

  const isAdmin = (() => {
    try {
      const raw = localStorage.getItem("kc_user");
      if (raw) {
        const user = JSON.parse(raw);
        return user.role === "admin" || user.isAdmin;
      }
    } catch { /* ignore */ }
    return localStorage.getItem("kc_admin_override") === "1";
  })();

  function refreshData() {
    refetch();
  }

  function updateLeadStatus(id: number, status: LeadStatus) {
    updateStatusMutation.mutate({ id, status });
  }

  function deleteLead(id: number) {
    if (!confirm("Delete this lead?")) return;
    deleteMutation.mutate(id);
  }

  function logout() {
    localStorage.removeItem("kc_user");
    localStorage.removeItem("kc_premium");
    localStorage.removeItem("kc_premium_unlocked");
    localStorage.removeItem("kc_premium_bundle");
    localStorage.removeItem("kc_de_form_state");
    localStorage.removeItem("kc_premium_source_url");
    localStorage.removeItem("kc_admin_override");
    localStorage.removeItem("kc_profile_draft");
    window.location.href = "/";
  }

  const filteredLeads = leads.filter(l => {
    const matchSearch = !search ||
      l.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.city?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    converted: leads.filter(l => l.status === "converted").length,
    totalStudents: students.length,
  };

  if (!isAdmin) return <AdminGate />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-600 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refreshData} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1">
          {[
            { id: "overview" as Tab, label: "Overview", icon: BarChart3, count: null },
            { id: "leads" as Tab, label: "Leads", icon: FileText, count: stats.totalLeads },
            { id: "students" as Tab, label: "Students", icon: GraduationCap, count: stats.totalStudents },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}>
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count !== null && <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── OVERVIEW ─── */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Total Leads", value: stats.totalLeads, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "New Leads", value: stats.newLeads, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Contacted", value: stats.contacted, icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Students", value: stats.totalStudents, icon: GraduationCap, color: "text-teal-600", bg: "bg-teal-50" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={() => setTab("leads")} className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all text-left">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Manage Leads</div>
                    <div className="text-xs text-slate-500">{stats.totalLeads} leads total</div>
                  </div>
                </button>
                <button onClick={() => setTab("students")} className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all text-left">
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">View Students</div>
                    <div className="text-xs text-slate-500">{stats.totalStudents} profiles</div>
                  </div>
                </button>
                <Link to="/" className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all text-left">
                  <ArrowRight className="w-5 h-5 text-teal-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">View Website</div>
                    <div className="text-xs text-slate-500">Go to homepage</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Status Legend */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Lead Status Guide</h2>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(STATUS_COLORS) as LeadStatus[]).map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_COLORS[s]}`}>{STATUS_LABELS[s]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Change lead status by selecting from the dropdown in the Leads table. Deleted leads are permanently removed.
              </p>
            </div>
          </motion.div>
        )}

        {/* ─── LEADS ─── */}
        {tab === "leads" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, email, city..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-slate-400" /></button>}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "new", "contacted", "qualified", "converted", "lost"] as const).map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                      statusFilter === s ? "bg-teal-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Destination</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">City</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-slate-400">#{lead.id}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">{lead.fullName}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-blue-600 flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs capitalize">{lead.destination}</Badge></td>
                        <td className="px-4 py-3 text-xs text-slate-600 capitalize">{lead.courseInterest}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{lead.city}</td>
                        <td className="px-4 py-3">
                          <select value={lead.status}
                            onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer ${STATUS_COLORS[lead.status]}`}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteLead(lead.id)} className="text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isLoading ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
                  <p className="text-slate-500 text-sm font-medium">Loading data from database...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm font-medium">No leads yet. Student profiles created on the homepage will appear here.</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}

        {/* ─── STUDENTS ─── */}
        {tab === "students" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">City</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Destination</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">{s.fullName || "—"}</td>
                        <td className="px-4 py-3 text-xs text-blue-600">{s.email || "—"}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{s.phone || "—"}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{s.city || "—"}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs capitalize">{s.destination || "—"}</Badge></td>
                        <td className="px-4 py-3 text-xs text-slate-600 capitalize">{s.courseInterest || "—"}</td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isLoading ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
                  <p className="text-slate-500 text-sm font-medium">Loading data from database...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm font-medium">No student profiles yet.</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
