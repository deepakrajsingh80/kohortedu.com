import { useEffect } from "react";
import { useLocation } from "react-router";
import { getKeywordsForRoute } from "../data/keywords";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

const SITE_NAME = "Kohortconnect";
const DEFAULT_OG = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200";

export function SEO({ title, description, keywords: overrideKeywords, ogImage = DEFAULT_OG, canonical, noindex = false }: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const location = useLocation();
  const routeKeywords = getKeywordsForRoute(location.pathname);
  const keywords = overrideKeywords || routeKeywords;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);
    setMeta("og:type", "website");
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:url", `https://kohortconnect.com${location.pathname}`);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:site", "@kohortconnect");

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [fullTitle, description, ogImage, canonical, noindex, keywords, location.pathname]);

  return null;
}

// Pre-configured SEO for common pages
export function HomeSEO() {
  return (
    <SEO
      title="Study Abroad Consultants Marketplace for Indian Students"
      description="Kohortconnect connects Indian students with verified study abroad consultants. Get free guidance for USA, UK, Canada, Australia, Germany & 14 destinations. AI-powered matching."
      ogImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
    />
  );
}

export function PageSEO({ page }: { page: string }) {
  const configs: Record<string, { title: string; description: string }> = {
    premium: {
      title: "Premium Bundle — Unlock Full Study Abroad Guidance",
      description: "Get complete access to 14 country guides, 100+ verified consultant contacts, Decision Engine, and scholarship database. One-time fee of ₹999.",
    },
    evaluate: {
      title: "AI Study Abroad Decision Engine — Find Your Best Country",
      description: "Profile yourself in 90 seconds. Compare 22 countries on tuition, living costs, ROI, safety, visa ease & PR pathways. Free rank #3 preview.",
    },
    courses: {
      title: "Study Abroad Courses — UG, PG, PhD, Diploma & PR Pathways",
      description: "Explore undergraduate, postgraduate, PhD, diploma and PR pathway courses. Compare tuition, scholarships, career outcomes across 22 countries.",
    },
    destinations: {
      title: "Top 14 Study Abroad Destinations for Indian Students",
      description: "Detailed guides for USA, Canada, UK, Australia, Germany, Ireland, Singapore, France, New Zealand, Netherlands, Italy, Spain, South Korea & Malaysia.",
    },
    dashboard: {
      title: "Your Study Abroad Dashboard",
      description: "Track your application progress, view matched consultants, and manage your study abroad journey.",
    },
    login: {
      title: "Create Your Free Profile",
      description: "Build your study abroad profile in 2 minutes. Get matched with verified consultants and unlock personalized recommendations.",
    },
    parents: {
      title: "Parent's Corner — Guide for Indian Parents",
      description: "Everything Indian parents need to know about sending their child abroad. Safety data, cost breakdowns, ROI calculator, and verified consultant network.",
    },
    "student-loans": {
      title: "Education Loans for Abroad Studies — Compare 9 Lenders",
      description: "Compare SBI, HDFC Credila, Avanse, ICICI, Axis & more. Get upto ₹2Cr at rates from 8.33%. Calculate EMI, check eligibility, apply online.",
    },
    "learning-hub": {
      title: "Study Abroad Knowledge Hub — Free Guides & Resources",
      description: "100+ visual guides on test prep, applications, visas, finance, and career planning. Curated for Indian students going abroad.",
    },
    checkout: {
      title: "Checkout — Kohortconnect Premium",
      description: "Complete your purchase of the Kohortconnect Premium Bundle for ₹999.",
    },
  };

  const config = configs[page];
  if (!config) return null;

  return <SEO title={config.title} description={config.description} />;
}
