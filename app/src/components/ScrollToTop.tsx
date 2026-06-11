import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    // Delay slightly to allow lazy-loaded content to render first
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // Also reset any scrollable containers
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, search, hash]);
  return null;
}
