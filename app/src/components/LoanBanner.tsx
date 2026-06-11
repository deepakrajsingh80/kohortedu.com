import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Landmark, X, ArrowRight } from "lucide-react";

export function LoanBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-amber-500/30 z-[60]">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">
              Money problem? No problem. <span className="text-amber-400">Get Secured & Unsecured Education Loans</span>
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              Upto ₹2 Cr · Rates from 8.33% · No collateral options · Section 80E tax savings
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/student-loans">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-white rounded-lg font-semibold text-xs h-8 px-4">
              <ArrowRight className="w-3 h-3 mr-1" /> Explore Loans
            </Button>
          </Link>
          <button onClick={() => setDismissed(true)} className="text-slate-500 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
