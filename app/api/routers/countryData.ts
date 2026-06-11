import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { countryData } from "@db/schema";
import { eq } from "drizzle-orm";

export const countryDataRouter = createRouter({
  /* ─── Get all country data ─── */
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(countryData).orderBy(countryData.country);
  }),

  /* ─── Get single country ─── */
  byCountry: publicQuery
    .input(z.object({ country: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(countryData)
        .where(eq(countryData.country, input.country))
        .limit(1);
      return rows[0] || null;
    }),

  /* ─── Get data freshness status ─── */
  freshness: publicQuery.query(async () => {
    const db = getDb();
    const rows = await db.select({
      lastVerified: countryData.lastVerified,
      nextRefresh: countryData.nextRefresh,
      isLive: countryData.isLive,
      dataSource: countryData.dataSource,
    }).from(countryData).limit(1);

    if (!rows.length) return { status: "no_data", message: "No country data available" };

    const row = rows[0];
    const now = new Date();
    const nextRefresh = new Date(row.nextRefresh);
    const isStale = now > nextRefresh;

    return {
      status: isStale ? "stale" : "fresh",
      lastVerified: row.lastVerified,
      nextRefresh: row.nextRefresh,
      isLive: row.isLive === 1,
      dataSource: row.dataSource,
      message: isStale
        ? "Data is stale — refresh overdue"
        : row.isLive === 1
          ? "Live data from APIs"
          : "Fallback data — API refresh pending",
    };
  }),
});
