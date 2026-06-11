import { Link } from "react-router";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllUniversities } from "@/data/universities";
import { Building2, Star, Users, ArrowRight } from "lucide-react";

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function UniversityGrid() {
  const allUniversities = getAllUniversities();
  const totalUnis = allUniversities.length;
  const totalCountries = Array.from(new Set(allUniversities.map((u) => u.country))).length;

  // Pick top 4: highest Indian student count, diverse countries
  const topByIndians = [...allUniversities]
    .sort((a, b) => {
      const aNum = parseInt(String(a.indianStudents).replace(/[^0-9]/g, "")) || 0;
      const bNum = parseInt(String(b.indianStudents).replace(/[^0-9]/g, "")) || 0;
      return bNum - aNum;
    })
    .slice(0, 12);

  // Pick 4 from different countries for diversity
  const featured: typeof allUniversities = [];
  const usedCountries = new Set<string>();
  for (const u of topByIndians) {
    if (!usedCountries.has(u.country) && featured.length < 4) {
      featured.push(u);
      usedCountries.add(u.country);
    }
  }
  if (featured.length < 4) {
    for (const u of topByIndians) {
      if (!featured.find((f) => f.id === u.id) && featured.length < 4) {
        featured.push(u);
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="text-center mb-12">
          <Badge className="bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30 mb-4 px-4 py-1.5">
            <Building2 className="mr-1.5 h-3.5 w-3.5" />Top Universities
          </Badge>
          <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">
            Explore <span className="text-[#0d9488]">{totalUnis}+</span> Universities Across <span className="text-[#0d9488]">{totalCountries}</span> Countries
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Detailed admission guides, placement reports, scholarships, campus life videos, and academic requirements for Indian students.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {featured.map((uni, i) => (
            <ScrollReveal key={uni.id} delay={i * 0.1}>
              <Link to={`/universities/${uni.slug}`}>
                <motion.div whileHover={{ y: -6 }} className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-[#0d9488]/40 transition-all h-full">
                  <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${uni.heroImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <Badge className="absolute top-2 right-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
                      <Star className="w-2.5 h-2.5 mr-1" />QS {uni.qsRanking}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#0d9488] transition-colors mb-1 truncate">
                      {uni.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mb-2">{uni.city}, {uni.country}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-700 text-slate-300 text-[9px]">
                        <Users className="w-2.5 h-2.5 mr-1" />{uni.indianStudents} Indians
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Link to="/universities">
            <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-xl px-8 py-5 text-sm font-bold">
              <Building2 className="w-4 h-4 mr-2" /> Explore All Universities <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
