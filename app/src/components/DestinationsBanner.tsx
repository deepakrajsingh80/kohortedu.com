import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { destinations } from "@/data/destinations";
import {
  Globe,
  Star,
  Banknote,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function DestinationsBanner() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0d9488]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-white/10 text-white mb-4 px-4 py-1.5 border border-white/20 backdrop-blur-sm">
            <Globe className="mr-1.5 h-3.5 w-3.5" />
            Top Study Destinations 2026
          </Badge>
          <h2 className="text-4xl font-bold text-white lg:text-5xl mb-4">
            Where Will You <span className="text-[#0d9488]">Go?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore the world&apos;s top 14 destinations. Hover to see eligibility,
            fees, and visa success rates — all at a glance.
          </p>
        </motion.div>

        {/* Bento Grid - 6 Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest, idx) => {
            const isHovered = hoveredId === dest.id;
            const isOtherHovered = hoveredId !== null && hoveredId !== dest.id;

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(dest.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isOtherHovered ? "opacity-60 scale-[0.97]" : "opacity-100"
                } ${idx === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >
                <Link to={`/destinations/${dest.id}`}>
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-90`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="relative p-6 h-full min-h-[220px] flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-black text-white">
                            {dest.name}
                          </span>
                          <Badge className="bg-white/20 text-white border-0 text-xs backdrop-blur-sm">
                            {dest.flag}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70">{dest.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className="text-xs font-bold text-white">
                            {dest.visaSuccess}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay with details */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3"
                        >
                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                              <GraduationCap className="h-4 w-4 text-white/70 mx-auto mb-1" />
                              <p className="text-xs text-white/60">Min GPA</p>
                              <p className="text-sm font-bold text-white">
                                {dest.minGpa}
                              </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                              <Star className="h-4 w-4 text-white/70 mx-auto mb-1" />
                              <p className="text-xs text-white/60">IELTS</p>
                              <p className="text-sm font-bold text-white">
                                {dest.minIelts}
                              </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                              <Banknote className="h-4 w-4 text-white/70 mx-auto mb-1" />
                              <p className="text-xs text-white/60">Our Fee</p>
                              <p className="text-sm font-bold text-white">
                                {dest.fees}
                              </p>
                            </div>
                          </div>

                          {/* Quick info */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/60">
                              Tuition: {dest.tuition}
                            </span>
                            <span className="text-white/60">
                              Living: {dest.living}
                            </span>
                          </div>

                          {/* Work permit + PR */}
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                            <span className="text-xs text-white/80">
                              {dest.workPermit}
                            </span>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-sm font-semibold text-white group">
                            <span>Explore {dest.name}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Default bottom (shown when not hovered) */}
                    {!isHovered && (
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 flex-wrap">
                            {dest.topUniversities.slice(0, 3).map((u) => (
                              <Badge
                                key={u}
                                variant="outline"
                                className="text-[10px] border-white/20 text-white/70"
                              >
                                {u}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-white/50 flex items-center gap-1">
                            Hover for details
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
