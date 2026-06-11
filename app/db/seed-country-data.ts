/* ═══════════════════════════════════════════════════════════════
   SEED COUNTRY DATA — Populates the country_data table with
   current estimates. Run once to initialize, then the 12-hour
   refresh job will update with live API data.
   ═══════════════════════════════════════════════════════════════ */

import { getDb } from "../api/queries/connection";
import { countryData } from "./schema";

const COUNTRY_TO_CODE: Record<string, string> = {
  Canada: "CA", Germany: "DE", UK: "GB", USA: "US", Australia: "AU",
  "New Zealand": "NZ", Ireland: "IE", Netherlands: "NL", France: "FR",
  Italy: "IT", Sweden: "SE", Poland: "PL", Singapore: "SG", UAE: "AE",
  Russia: "RU", Georgia: "GE", Philippines: "PH", "South Korea": "KR",
  Malaysia: "MY", Switzerland: "CH", Spain: "ES", "Czech Republic": "CZ",
};

// Current hardcoded data (will be replaced by API data on first refresh)
const LIVING: Record<string, number> = {
  Singapore: 12, UK: 11, USA: 10, Australia: 11, Canada: 10, Ireland: 10,
  UAE: 9, Germany: 8, Netherlands: 9, Sweden: 9, France: 8, "New Zealand": 9,
  "South Korea": 7, Italy: 7, Malaysia: 5, Poland: 5, Russia: 4,
  "Czech Republic": 6, Spain: 7, Georgia: 4, Philippines: 3, Switzerland: 18,
};

const TUITION: Record<string, number> = {
  Canada: 30, Germany: 1, UK: 25, USA: 35, Australia: 20, "New Zealand": 18,
  Ireland: 18, Netherlands: 15, France: 10, Italy: 8, Sweden: 12, Poland: 6,
  Singapore: 20, UAE: 18, Russia: 5, Georgia: 4, Philippines: 3,
  "South Korea": 8, Malaysia: 6, Switzerland: 25, Spain: 8, "Czech Republic": 5,
};

const SAFETY: Record<string, number> = {
  Canada: 88, Germany: 86, Singapore: 92, Australia: 78, "New Zealand": 83,
  UK: 82, Ireland: 84, Netherlands: 85, France: 75, Sweden: 84,
  Italy: 76, Poland: 80, "South Korea": 85, Malaysia: 82, UAE: 80,
  USA: 72, Russia: 68, Georgia: 75, Philippines: 70,
  Switzerland: 90, Spain: 80, "Czech Republic": 85,
};

const VISA: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, Malaysia: 8,
  Netherlands: 7, "New Zealand": 7, France: 7, Sweden: 7, UK: 7,
  "South Korea": 7, Poland: 6, UAE: 6, Italy: 6, Georgia: 6,
  Singapore: 5, USA: 5, Russia: 5, Philippines: 5,
  Switzerland: 6, Spain: 7, "Czech Republic": 7,
};

const PR: Record<string, number> = {
  Canada: 9, Germany: 8, Australia: 8, Ireland: 8, "New Zealand": 7,
  Netherlands: 7, Sweden: 7, UK: 6, France: 6, Malaysia: 5,
  "South Korea": 5, Poland: 5, Italy: 4, UAE: 1, Singapore: 3,
  USA: 4, Russia: 4, Georgia: 4, Philippines: 1,
  Switzerland: 5, Spain: 5, "Czech Republic": 6,
};

const EMPLOYMENT: Record<string, number> = {
  Canada: 9, Germany: 8, USA: 8, Singapore: 8, UK: 7,
  Ireland: 7, Netherlands: 7, Australia: 7, Sweden: 7,
  "South Korea": 6, "New Zealand": 6, Malaysia: 6, UAE: 6,
  France: 6, Poland: 5, Italy: 5, Russia: 4, Georgia: 4, Philippines: 4,
  Switzerland: 8, Spain: 5, "Czech Republic": 6,
};

const SALARY: Record<string, number> = {
  Canada: 45, Germany: 42, UK: 40, USA: 55, Australia: 40, "New Zealand": 30,
  Ireland: 38, Netherlands: 40, France: 32, Italy: 28, Sweden: 35, Poland: 22,
  Singapore: 45, UAE: 35, Russia: 18, Georgia: 15, Philippines: 12,
  "South Korea": 32, Malaysia: 18, Switzerland: 70, Spain: 28, "Czech Republic": 22,
};

async function seed() {
  const db = getDb();
  const now = new Date();
  const nextRefresh = new Date(now.getTime() + 12 * 60 * 60 * 1000); // +12 hours

  const countries = Object.keys(COUNTRY_TO_CODE);

  for (const country of countries) {
    await db.insert(countryData).values({
      country,
      countryCode: COUNTRY_TO_CODE[country],
      livingCost: LIVING[country] || null,
      tuitionCost: TUITION[country] || null,
      safetyScore: SAFETY[country] || null,
      visaEaseScore: VISA[country] || null,
      prScore: PR[country] || null,
      employmentScore: EMPLOYMENT[country] || null,
      avgSalary: SALARY[country] || null,
      dataSource: "Hardcoded estimates — pending live API refresh",
      lastVerified: now,
      nextRefresh,
      isLive: 0, // 0 = fallback data
    }).onDuplicateKeyUpdate({
      set: {
        livingCost: LIVING[country] || null,
        tuitionCost: TUITION[country] || null,
        safetyScore: SAFETY[country] || null,
        visaEaseScore: VISA[country] || null,
        prScore: PR[country] || null,
        employmentScore: EMPLOYMENT[country] || null,
        avgSalary: SALARY[country] || null,
        lastVerified: now,
        nextRefresh,
      },
    });
  }

  console.log(`✅ Seeded ${countries.length} countries into country_data table`);
}

seed().catch(console.error);
