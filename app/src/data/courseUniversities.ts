/* ═══════════════════════════════════════════════════════════════════
   STRICT COURSE → UNIVERSITY MAPPER
   Only shows universities where the ACTUAL programs array contains
   a verified match for the course name. No fake data, no guesses.
   ═══════════════════════════════════════════════════════════════════ */

import { getAllUniversities } from "./universities";

let _unis: ReturnType<typeof getAllUniversities> | null = null;
function allUniversities() {
  if (!_unis) _unis = getAllUniversities();
  return _unis;
}

/* ─── Strict matching: only strong matches count ─── */
function isStrongMatch(programName: string, courseName: string): boolean {
  const p = programName.toLowerCase().trim();
  const c = courseName.toLowerCase().trim();

  // Exact match
  if (p === c) return true;

  // One contains the other fully
  if (p.includes(c) || c.includes(p)) return true;

  // Extract significant words (ignore short/common words)
  const ignoreWords = new Set(["in", "and", "of", "the", "a", "an", "&", "(", ")", "bs", "ms", "msc", "ma", "mba", "phd", "bsc", "ba", "master", "bachelor"]);
  const pWords = p.split(/\s+/).filter(w => w.length > 2 && !ignoreWords.has(w));
  const cWords = c.split(/\s+/).filter(w => w.length > 2 && !ignoreWords.has(w));

  if (pWords.length === 0 || cWords.length === 0) return false;

  // Count matching words
  let matches = 0;
  for (const cw of cWords) {
    for (const pw of pWords) {
      if (pw === cw || pw.includes(cw) || cw.includes(pw)) {
        matches++;
        break;
      }
    }
  }

  // Need at least 2 meaningful words to match, OR 80% of course words
  const threshold = Math.max(2, Math.ceil(cWords.length * 0.8));
  return matches >= threshold;
}

/* ─── Get universities that VERIFIABLY offer a specific course ─── */
export function getUniversitiesForCourse(
  courseName: string,
  topCountries?: string[],
  limit: number = 8
): { name: string; slug: string; country: string; indianStudents: string; qsRanking: number }[] {
  const universities = allUniversities();
  const results: {
    name: string;
    slug: string;
    country: string;
    indianStudents: string;
    qsRanking: number;
    matchStrength: number;
  }[] = [];

  for (const u of universities) {
    // Country filter
    if (topCountries && topCountries.length > 0 && !topCountries.includes(u.country)) {
      continue;
    }

    // Check ACTUAL programs for a real match
    let matched = false;
    let matchStrength = 0;

    for (const prog of u.programs) {
      if (isStrongMatch(prog.name, courseName)) {
        matched = true;
        // Score by how close the match is
        const p = prog.name.toLowerCase();
        const c = courseName.toLowerCase();
        if (p === c) matchStrength = 100;
        else if (p.includes(c) || c.includes(p)) matchStrength = 80;
        else matchStrength = 60;
        break; // Found a match, no need to check more programs
      }
    }

    // ONLY add if we found a real program match
    if (matched) {
      results.push({
        name: u.name,
        slug: u.slug,
        country: u.country,
        indianStudents: u.indianStudents || "",
        qsRanking: u.qsRankingNum || 9999,
        matchStrength,
      });
    }
  }

  // Sort: strongest match first, then by Indian students, then QS
  results.sort((a, b) => {
    if (b.matchStrength !== a.matchStrength) return b.matchStrength - a.matchStrength;
    const aInd = parseInt(a.indianStudents.replace(/[^0-9]/g, "")) || 0;
    const bInd = parseInt(b.indianStudents.replace(/[^0-9]/g, "")) || 0;
    if (bInd !== aInd) return bInd - aInd;
    return a.qsRanking - b.qsRanking;
  });

  return results.slice(0, limit).map(({ matchStrength, ...rest }) => rest);
}
