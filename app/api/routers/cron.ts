import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { refreshCountryData, getDataHealth } from "../services/dataRefresh";

export const cronRouter = createRouter({
  /* ─── Trigger manual refresh ─── */
  refresh: publicQuery
    .input(z.object({
      secret: z.string(), // Simple secret to prevent abuse
    }).optional())
    .mutation(async ({ input }) => {
      // In production, check against env CRON_SECRET
      const result = await refreshCountryData();
      return {
        success: true,
        updated: result.updated,
        sources: result.sources,
        errors: result.errors,
        timestamp: new Date().toISOString(),
      };
    }),

  /* ─── Check data health ─── */
  health: publicQuery.query(async () => {
    return getDataHealth();
  }),
});
