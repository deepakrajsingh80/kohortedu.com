import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap, Mail, Phone, MapPin,
  Linkedin, Twitter, Instagram, Youtube, ArrowRight,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { courseTypes } from "@/data/courses";
import { ALL_EXAMS } from "@/data/exams";
import { NAV_MAJORS } from "@/data/siteData";

/* ═══════════════════════════════════════════════════════════════
   DYNAMIC FOOTER — Auto-updates from data sources
   Destinations, Universities, Courses, Exams all pulled live
   from data files. Add a new country/university/course/exam
   and it appears here automatically.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Static config for tool/resource pages ─── */
const TOOLS_PAGES = [
  { label: "Decision Engine", href: "/evaluate" },
  { label: "Smart Match", href: "/smart-match" },
  { label: "Premium Bundle", href: "/premium" },
  { label: "Student Loans", href: "/student-loans" },
  { label: "Profile Blaster", href: "/profile-blaster" },
];

const RESOURCES = [
  { label: "Learning Hub", href: "/learn" },
  { label: "Exam Hub", href: "/exams" },
  { label: "Parent's Corner", href: "/parents" },
];

const COMPANY_PAGES = [
  { label: "Home", href: "/" },
  { label: "Our Vision", href: "/vision" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
  { label: "Courses", href: "/courses" },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/company/kohortconnect", label: "LinkedIn", color: "hover:bg-[#0077b5]" },
  { icon: Twitter, href: "https://twitter.com/kohortconnect", label: "Twitter", color: "hover:bg-[#1da1f2]" },
  { icon: Instagram, href: "https://instagram.com/kohortconnect", label: "Instagram", color: "hover:bg-[#e4405f]" },
  { icon: Youtube, href: "https://youtube.com/@kohortconnect", label: "YouTube", color: "hover:bg-[#ff0000]" },
];

/* ─── Helper: build dynamic link arrays from data ─── */

/** Destinations — pulled live from destinations.ts */
function getDestinationLinks() {
  const links = destinations
    .filter((d) => d.id !== "view-all")
    .map((d) => ({ label: d.name, href: `/destinations/${d.id}` }));
  links.push({ label: "View All", href: "/destinations" });
  return links;
}

/** Universities — lightweight featured list (avoids bundling 36K-line DB) */
const FEATURED_UNIVERSITIES = [
  { name: "Northeastern University", slug: "northeastern-university" },
  { name: "University of Toronto", slug: "university-of-toronto" },
  { name: "UCL London", slug: "university-college-london" },
  { name: "TU Munich", slug: "technical-university-munich" },
  { name: "UniMelb", slug: "university-of-melbourne" },
  { name: "Trinity College Dublin", slug: "trinity-college-dublin" },
  { name: "NUS Singapore", slug: "national-university-singapore" },
  { name: "INSEAD", slug: "insead" },
];

function getUniversityLinks() {
  const links = FEATURED_UNIVERSITIES.map((u) => ({ label: u.name, href: `/universities/${u.slug}` }));
  links.push({ label: "View All", href: "/universities" });
  return links;
}

/** Majors — DYNAMIC from siteData.ts */
function getMajorLinks() {
  return [
    ...NAV_MAJORS.map((m) => ({ label: m.label, href: m.href })),
    { label: "View All", href: "/majors" },
  ];
}

/** Courses — pulled live from courseTypes in courses.ts */
function getCourseLinks() {
  return [
    ...courseTypes.map((c) => ({
      label: c.title,
      href: `/courses/${c.id}`,
    })),
    { label: "View All", href: "/courses" },
  ];
}

/** Exams — pulled live from ALL_EXAMS in exams.ts */
function getExamLinks() {
  const links = ALL_EXAMS.slice(0, 10).map((e) => ({
    label: e.name,
    href: `/exams/${e.id}`,
  }));
  links.push({ label: "All Exams", href: "/exams" });
  return links;
}

/* ─── Footer Column Component ─── */
function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              to={link.href}
              className="text-sm text-gray-400 hover:text-[#0d9488] transition-colors duration-200 flex items-center gap-1 group"
            >
              <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   MAIN FOOTER
   ═══════════════════════════════════════════ */
export default function Footer() {
  const destinationLinks = getDestinationLinks();
  const universityLinks = getUniversityLinks();
  const courseLinks = getCourseLinks();
  const examLinks = getExamLinks();
  const majorLinks = getMajorLinks();

  return (
    <footer className="bg-slate-950 text-white" itemScope itemType="https://schema.org/WPFooter">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Top — Brand + Social */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488]">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold" itemProp="name">Kohortconnect</span>
              <p className="text-xs text-gray-500 mt-0.5">AI-Powered Study Abroad Marketplace for Indian Students</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Kohortconnect on ${s.label}`}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 ${s.color} hover:text-white transition-all duration-300`}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8 py-10 border-b border-slate-800">
          {/* Company */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-semibold text-white text-sm tracking-wide uppercase mb-4">Company</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              AI-powered marketplace connecting Indian students with verified education consultants across 22 countries.
            </p>
            <FooterColumn title="Pages" links={COMPANY_PAGES} />
          </div>

          {/* Dynamic: Universities */}
          <FooterColumn title={`Universities (${universityLinks.length - 1})`} links={universityLinks} />

          {/* Dynamic: Destinations */}
          <FooterColumn title="Destinations (22)" links={destinationLinks} />

          {/* Dynamic: Courses */}
          <FooterColumn title="Courses" links={courseLinks} />

          {/* Dynamic: Majors */}
          <FooterColumn title={`Majors (${majorLinks.length - 1})`} links={majorLinks} />

          {/* Static: Tools */}
          <FooterColumn title="Tools" links={TOOLS_PAGES} />

          {/* Static: Resources */}
          <FooterColumn title="Resources" links={RESOURCES} />

          {/* Dynamic: Exams */}
          <FooterColumn title={`Exams (${examLinks.length - 1})`} links={examLinks} />
        </div>

        {/* Contact Bar */}
        <div className="py-8 border-b border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="mailto:founders@kohortconnect.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#0d9488] transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-[#0d9488]/10 transition-colors">
                <Mail className="h-4 w-4 text-[#0d9488]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Email</div>
                <div>founders@kohortconnect.com</div>
              </div>
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#0d9488] transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-[#0d9488]/10 transition-colors">
                <Phone className="h-4 w-4 text-[#0d9488]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Phone</div>
                <div>+91-98765-43210</div>
              </div>
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-[#0d9488]" />
              </div>
              <div itemScope itemType="https://schema.org/Organization">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Address</div>
                <div itemProp="address">
                  Kohortconnect Technologies Pvt. Ltd.<br />Hyderabad, Telangana, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Kohortconnect Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link to="/" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Sitemap</Link>
            <span className="text-gray-700">|</span>
            <span>Confidential — MVP Demo v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
