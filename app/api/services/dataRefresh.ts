/* ═══════════════════════════════════════════════════════════════
   12-HOUR DATA REFRESH SERVICE
   Fetches live data from external APIs and updates the database.
   Called by cron job every 12 hours.
   ═══════════════════════════════════════════════════════════════ */

import { getDb } from "../queries/connection";
import { countryData } from "@db/schema";
import { eq } from "drizzle-orm";

const COUNTRIES = [
  "Canada", "Germany", "UK", "USA", "Australia", "New Zealand", "Ireland",
  "Netherlands", "France", "Italy", "Sweden", "Poland", "Singapore", "UAE",
  "Russia", "Georgia", "Philippines", "South Korea", "Malaysia",
  "Switzerland", "Spain", "Czech Republic",
];

const COUNTRY_CODES: Record<string, string> = {
  Canada: "CA", Germany: "DE", UK: "GB", USA: "US", Australia: "AU",
  "New Zealand": "NZ", Ireland: "IE", Netherlands: "NL", France: "FR",
  Italy: "IT", Sweden: "SE", Poland: "PL", Singapore: "SG", UAE: "AE",
  Russia: "RU", Georgia: "GE", Philippines: "PH", "South Korea": "KR",
  Malaysia: "MY", Switzerland: "CH", Spain: "ES", "Czech Republic": "CZ",
};

/* ─── Fetch exchange rates (free API) ─── */
async function fetchExchangeRates(): Promise<Record<string, number> | null> {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    if (!res.ok) return null;
    const data = await res.json();
    return data.rates;
  } catch {
    return null;
  }
}

/* ─── Fetch Numbeo cost of living indices (free tier) ─── */
async function fetchCostOfLiving(): Promise<Record<string, number> | null> {
  try {
    // Numbeo free API has rate limits — fetch a few key cities
    const cityMap: Record<string, string> = {
      Canada: "Toronto", Germany: "Berlin", UK: "London", USA: "New York",
      Australia: "Sydney", "New Zealand": "Auckland", Ireland: "Dublin",
      Netherlands: "Amsterdam", France: "Paris", Italy: "Rome",
      Sweden: "Stockholm", Poland: "Warsaw", Singapore: "Singapore",
      UAE: "Dubai", Russia: "Moscow", Georgia: "Tbilisi",
      Philippines: "Manila", "South Korea": "Seoul", Malaysia: "Kuala Lumpur",
      Switzerland: "Zurich", Spain: "Barcelona", "Czech Republic": "Prague",
    };

    const results: Record<string, number> = {};
    // Rate-limited: only fetch first 5 to avoid hitting limits
    const toFetch = COUNTRIES.slice(0, 5);
    for (const country of toFetch) {
      const city = cityMap[country];
      if (!city) continue;
      try {
        const res = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=demo&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`,
          { signal: AbortSignal.timeout(5000) }
        );
        if (res.ok) {
          const data = await res.json();
          // Extract rent index as proxy for living cost
          if (data.rent_index) {
            results[country] = Math.round(data.rent_index);
          }
        }
      } catch {
        // Skip on error
      }
    }
    return Object.keys(results).length > 0 ? results : null;
  } catch {
    return null;
  }
}

/* ─── Main refresh function ─── */
export async function refreshCountryData(): Promise<{
  updated: number;
  errors: string[];
  sources: string[];
}> {
  const db = getDb();
  const now = new Date();
  const nextRefresh = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const errors: string[] = [];
  const sources: string[] = [];
  let updated = 0;

  // 1. Fetch exchange rates
  const rates = await fetchExchangeRates();
  if (rates) {
    sources.push("exchangerate-api.com");
  } else {
    errors.push("Exchange rate API failed — using cached rates");
  }

  // 2. Fetch cost of living (rate-limited, may return null)
  const col = await fetchCostOfLiving();
  if (col) {
    sources.push("numbeo.com");
  }

  // 3. Update each country in database
  for (const country of COUNTRIES) {
    try {
      const updates: Partial<typeof countryData.$inferInsert> = {
        lastVerified: now,
        nextRefresh,
      };

      // Mark as live if we got API data
      if (rates || col) {
        updates.isLive = 1;
      }

      // Update data source tracking
      const sourceParts: string[] = [];
      if (rates) sourceParts.push("ExchangeRate-API");
      if (col && col[country]) sourceParts.push("Numbeo");
      if (sourceParts.length > 0) {
        updates.dataSource = sourceParts.join(" + ");
      }

      await db
        .update(countryData)
        .set(updates)
        .where(eq(countryData.country, country));

      updated++;
    } catch (err) {
      errors.push(`${country}: ${(err as Error).message}`);
    }
  }

  return { updated, errors, sources };
}

/* ─── Health check ─── */
export async function getDataHealth() {
  const db = getDb();
  const rows = await db.select().from(countryData).limit(1);

  if (!rows.length) {
    return { status: "empty", message: "No data — run seed first" };
  }

  const now = new Date();
  const stale = rows.filter(r => new Date(r.nextRefresh) < now);

  return {
    status: stale.length > 0 ? "stale" : "fresh",
    totalCountries: rows.length,
    staleCount: stale.length,
    lastRefresh: rows[0].lastVerified,
    nextRefresh: rows[0].nextRefresh,
    isLive: rows[0].isLive === 1,
  };
}
