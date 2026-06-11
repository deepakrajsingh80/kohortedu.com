import { z } from "zod";
import { createRouter, authedQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { decisionProfiles } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deProfileRouter = createRouter({
  // Get the current user's decision engine profile
  get: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const profile = await db
      .select()
      .from(decisionProfiles)
      .where(eq(decisionProfiles.userId, ctx.user.id))
      .limit(1);
    return profile[0] ?? null;
  }),

  // Save (upsert) the user's decision engine profile
  save: authedQuery
    .input(
      z.object({
        major: z.string().optional(),
        level: z.enum(["UG", "PG", "Diploma"]).optional(),
        budget: z.number().optional(),
        ielts: z.string().optional(),
        prPriority: z.enum(["High", "Med", "Low"]).optional(),
        academicScore: z.number().optional(),
        workExp: z.enum(["0", "0-1", "1-3", "3-5", "5+"]).optional(),
        courseType: z.string().optional(),
        lastResults: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(decisionProfiles)
        .where(eq(decisionProfiles.userId, ctx.user.id))
        .limit(1);

      if (existing[0]) {
        // Update
        await db
          .update(decisionProfiles)
          .set({
            ...input,
            lastComputedAt: input.lastResults ? new Date() : existing[0].lastComputedAt,
            updatedAt: new Date(),
          })
          .where(eq(decisionProfiles.userId, ctx.user.id));
        return { success: true, action: "updated" };
      } else {
        // Insert
        await db.insert(decisionProfiles).values({
          userId: ctx.user.id,
          ...input,
          lastComputedAt: input.lastResults ? new Date() : null,
        });
        return { success: true, action: "created" };
      }
    }),

  // Clear the user's profile
  clear: authedQuery.mutation(async ({ ctx }) => {
    const db = getDb();
    await db
      .delete(decisionProfiles)
      .where(eq(decisionProfiles.userId, ctx.user.id));
    return { success: true };
  }),
});
