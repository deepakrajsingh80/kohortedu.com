import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle,
} from "@/components/ui/sheet";
import {
  GraduationCap, Menu, User, Briefcase, LogOut, Crown,
  Calculator, ChevronDown, BookOpen, Landmark, Heart,
  Building2, Sparkles, Eye, Wrench, Users, Phone,
} from "lucide-react";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useProfile } from "@/context/ProfileContext";
import {
  NAV_DESTINATIONS, NAV_COURSES, NAV_MAJORS, NAV_EXAMS,
  NAV_TOOLS, NAV_RESOURCES, NAV_COMPANY,
} from "@/data/siteData";

/* ─── Dropdown Component ─── */
function Dropdown({
  label, children, active, href,
}: {
  label: string; children: React.ReactNode; active?: boolean; href?: string;
}) {
  const [open, setOpen] = useState(false);
  const [timer, setTimerState] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => { if (timer) clearTimeout(timer); setOpen(true); };
  const handleLeave = () => { const t = setTimeout(() => setOpen(false), 150); setTimerState(t); };

  const labelClass = `flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    active ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"
  }`;

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {href ? (
        <Link to={href} className={labelClass}>
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform pointer-events-none ${open ? "rotate-180" : ""}`} />
        </Link>
      ) : (
        <button className={labelClass}>
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function Sep() { return <div className="h-px bg-gray-100 my-1" />; }

function usePartnerAuth() {
  const [partner, setPartner] = useState<{ name: string } | null>(null);
  useEffect(() => {
    const raw = localStorage.getItem("kc_partner");
    if (raw) { try { setPartner(JSON.parse(raw)); } catch { } }
  }, []);
  return partner;
}

/* ─── Profile badge in navbar ─── */
function NavbarProfileBadge() {
  const { profile, profileSummary } = useProfile();
  if (!profile.hasSetProfile) return null;
  return (
    <Link to="/evaluate" className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors">
      <Calculator className="w-3 h-3" />
      <span className="text-[11px] font-semibold truncate max-w-[180px]">{profileSummary}</span>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   MAIN NAVBAR
   ═══════════════════════════════════════════ */
export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user: studentUser, isAuthenticated: isStudent } = useLocalAuth();
  const partner = usePartnerAuth();
  const isPartner = !!partner;
  const isActive = (href: string) => location.pathname === href;

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("kc_user");
    localStorage.removeItem("kc_premium");
    localStorage.removeItem("kc_premium_unlocked");
    localStorage.removeItem("kc_premium_bundle");
    localStorage.removeItem("kc_partner");
    localStorage.removeItem("kc_de_form_state");
    localStorage.removeItem("kc_premium_source_url");
    localStorage.removeItem("kc_admin_override");
    localStorage.removeItem("kc_profile_draft");
    localStorage.removeItem("kc_user_profile");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d9488]">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">Kohortconnect</span>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Company */}
            <Dropdown label="About Us" active={NAV_COMPANY.some((l) => location.pathname.startsWith(l.href))}>
              {NAV_COMPANY.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${location.pathname === link.href ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                  <Users className="w-4 h-4" />{link.label}
                </Link>
              ))}
            </Dropdown>

            {/* Courses — DYNAMIC from courseTypes */}
            <Dropdown label="Courses" href="/courses" active={NAV_COURSES.some((l) => location.pathname.startsWith(l.href))}>
              {NAV_COURSES.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`block px-4 py-2 text-sm transition-colors ${location.pathname === link.href ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                  {link.label}
                </Link>
              ))}
            </Dropdown>

            {/* Destinations — DYNAMIC from destinations.ts */}
            <Dropdown label="Destinations" href="/destinations" active={NAV_DESTINATIONS.some((l) => location.pathname.startsWith(l.href))}>
              {NAV_DESTINATIONS.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`block px-4 py-2 text-sm transition-colors ${location.pathname === link.href ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                  {link.label}
                </Link>
              ))}
            </Dropdown>

            {/* Universities */}
            <Dropdown label="Universities" href="/universities" active={location.pathname.startsWith("/universities")}>
              <Link to="/universities" className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${location.pathname === "/universities" ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                <Building2 className="w-4 h-4" />All Universities
              </Link>
              <Sep />
              {NAV_DESTINATIONS.slice(0, 12).map((d) => (
                <Link key={d.href} to={d.href.replace("/destinations/", "/universities?country=")}
                  className="block px-4 py-1.5 text-sm text-gray-600 hover:text-[#0d9488] hover:bg-gray-50 transition-colors">
                  Universities in {d.label}
                </Link>
              ))}
              <Sep />
              <Link to="/universities" className="block px-4 py-2 text-xs text-[#0d9488] font-medium hover:bg-[#0d9488]/5 transition-colors">View All</Link>
            </Dropdown>

            {/* Major Subjects — DYNAMIC from ALL_MAJORS */}
            <Dropdown label="Major Subjects" href="#" active={NAV_MAJORS.some((l) => location.pathname.startsWith(l.href))}>
              {NAV_MAJORS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} to={link.href}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${location.pathname === link.href ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                    <Icon className="w-4 h-4" />{link.shortLabel}
                  </Link>
                );
              })}
            </Dropdown>

            {/* Learning Hub */}
            <Link to="/learn"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive("/learn") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
              <BookOpen className="w-3.5 h-3.5" />Learning Hub
              <span className="ml-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[8px] font-bold px-1 py-0.5 rounded-full leading-none uppercase tracking-wide">New</span>
            </Link>

            {/* Exam Hub */}
            <Dropdown label="Exam Hub" href="/exams" active={NAV_EXAMS.some((l) => location.pathname.startsWith(l.href))}>
              <div className="max-h-64 overflow-y-auto">
                {NAV_EXAMS.map((link) => (
                  <Link key={link.href} to={link.href}
                    className={`block px-4 py-2 text-sm transition-colors ${location.pathname === link.href ? "text-[#0d9488] bg-[#0d9488]/5 font-medium" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </Dropdown>

            {/* Student Loans */}
            <Link to="/student-loans"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive("/student-loans") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
              <Landmark className="w-3.5 h-3.5" />Loans
              <span className="ml-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full leading-none uppercase tracking-wide">New</span>
            </Link>

            {/* Parent's Corner */}
            <Link to="/parents"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive("/parents") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:text-[#0d9488] hover:bg-gray-50"}`}>
              <Heart className="w-3.5 h-3.5" />Parents
              <span className="ml-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[8px] font-bold px-1 py-0.5 rounded-full leading-none uppercase tracking-wide">New</span>
            </Link>
          </div>

          {/* ─── Right Side — Auth ─── */}
          <div className="flex items-center gap-2">
            <NavbarProfileBadge />
            {isPartner ? (
              <div className="flex items-center gap-2">
                <Link to="/partner-dashboard" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                    {partner.name?.charAt(0)?.toUpperCase() ?? "P"}
                  </div>
                  <span className="text-sm font-medium text-slate-700">Partner</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600 h-9 w-9 p-0"><LogOut className="h-4 w-4" /></Button>
              </div>
            ) : isStudent ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${studentUser?.isPremium ? "bg-gradient-to-br from-amber-400 to-amber-600" : "bg-gradient-to-br from-[#0d9488] to-[#14b8a6]"}`}>
                    {studentUser?.name?.charAt(0)?.toUpperCase() ?? "S"}
                  </div>
                  <span className="text-sm font-medium text-gray-700">My Dashboard</span>
                  {studentUser?.isPremium && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600 h-9 w-9 p-0"><LogOut className="h-4 w-4" /></Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button size="sm" className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs h-9 px-4 rounded-lg font-semibold shadow-sm">
                    <User className="mr-1.5 h-3.5 w-3.5" /> Student Login
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs h-9 px-4 rounded-lg font-medium"
                  onClick={() => { localStorage.setItem("kc_login_intent", "partner"); window.location.hash = "#/login"; }}>
                  <Briefcase className="mr-1.5 h-3.5 w-3.5" /> Partner Login
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Menu className="h-5 w-5" /></Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <SheetTitle className="flex items-center gap-2 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d9488]">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold">Kohortconnect</span>
                  </SheetTitle>

                  <div className="flex flex-col gap-1">
                    {/* Mobile: Company */}
                    <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider mt-2">About Us</p>
                    {NAV_COMPANY.map((link) => (
                      <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${isActive(link.href) ? "bg-[#0d9488]/10 text-[#0d9488] font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                        <Users className="w-4 h-4" />{link.label}
                      </Link>
                    ))}
                    <Sep />

                    {/* Mobile: Courses — DYNAMIC */}
                    <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Courses</p>
                    {NAV_COURSES.map((link) => (
                      <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                        className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">{link.label}</Link>
                    ))}
                    <Sep />

                    {/* Mobile: Destinations — DYNAMIC */}
                    <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Destinations</p>
                    <div className="grid grid-cols-2 gap-0">
                      {NAV_DESTINATIONS.map((link) => (
                        <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                          className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">{link.label}</Link>
                      ))}
                    </div>
                    <Sep />

                    {/* Mobile: Major Subjects — DYNAMIC */}
                    <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Major Subjects</p>
                    {NAV_MAJORS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                          <Icon className="w-4 h-4" />{link.shortLabel}
                        </Link>
                      );
                    })}
                    <Sep />

                    {/* Mobile: Learning Hub */}
                    <Link to="/learn" onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive("/learn") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:bg-gray-50"}`}>
                      <BookOpen className="w-4 h-4" />Learning Hub
                      <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none uppercase tracking-wide">New</span>
                    </Link>

                    {/* Mobile: Exam Hub */}
                    <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Exam Hub</p>
                    <Link to="/exams" onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive("/exams") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:bg-gray-50"}`}>
                      All Exams
                    </Link>
                    <div className="grid grid-cols-2 gap-0">
                      {NAV_EXAMS.slice(0, 12).map((link) => (
                        <Link key={link.href} to={link.href} onClick={() => setOpen(false)}
                          className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">{link.label}</Link>
                      ))}
                    </div>
                    <Sep />

                    {/* Mobile: Loans & Parents */}
                    <Link to="/student-loans" onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive("/student-loans") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:bg-gray-50"}`}>
                      <Landmark className="w-4 h-4" />Student Loans
                    </Link>
                    <Link to="/parents" onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive("/parents") ? "bg-[#0d9488]/10 text-[#0d9488]" : "text-gray-600 hover:bg-gray-50"}`}>
                      <Heart className="w-4 h-4" />Parent&apos;s Corner
                    </Link>
                    <Sep className="my-3" />

                    {/* Mobile Auth */}
                    {isPartner ? (
                      <>
                        <Link to="/partner-dashboard" onClick={() => setOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full border-slate-800 text-slate-800 mb-2"><Briefcase className="mr-2 h-4 w-4" /> Partner Dashboard</Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setOpen(false); }} className="w-full text-gray-500"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Button>
                      </>
                    ) : isStudent ? (
                      <>
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full border-[#0d9488] text-[#0d9488] mb-2"><User className="mr-2 h-4 w-4" /> My Dashboard {studentUser?.isPremium && <Crown className="ml-1 w-3.5 h-3.5 text-amber-500" />}</Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setOpen(false); }} className="w-full text-gray-500"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <p className="px-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Sign In</p>
                        <Link to="/login" onClick={() => setOpen(false)}>
                          <Button size="sm" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white"><User className="mr-2 h-4 w-4" /> Student Login</Button>
                        </Link>
                        <Button size="sm" variant="outline" className="w-full border-slate-300 text-slate-700"
                          onClick={() => { setOpen(false); localStorage.setItem("kc_login_intent", "partner"); window.location.hash = "#/login"; }}>
                          <Briefcase className="mr-2 h-4 w-4" /> Partner Login
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
