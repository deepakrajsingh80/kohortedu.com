import type { ReactNode } from "react";
import { SEO } from "./SEO";

interface SEORouteProps {
  children: ReactNode;
  title: string;
  description?: string;
  desc?: string;
}

export function SEORoute({ children, title, description, desc }: SEORouteProps) {
  // Support both "description" and "desc" prop names
  const resolvedDesc = description || desc || "";
  return (
    <>
      <SEO title={title} description={resolvedDesc} />
      {children}
    </>
  );
}
