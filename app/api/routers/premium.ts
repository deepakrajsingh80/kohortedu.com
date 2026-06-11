import { z } from "zod";
import { createRouter, authedQuery, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { premiumSubscriptions } from "../../db/schema";
import { eq } from "drizzle-orm";

export const premiumRouter = createRouter({
  // Check premium status for current user (authed) or return false (public)
  status: publicQuery.query(async ({ ctx }) => {
    if (!ctx.user) {
      return { isPremium: false, plan: null, expiresAt: null };
    }
    const db = getDb();
    const sub = await db
      .select()
      .from(premiumSubscriptions)
      .where(eq(premiumSubscriptions.userId, ctx.user.id))
      .limit(1);

    if (!sub[0]) {
      return { isPremium: false, plan: null, expiresAt: null };
    }

    const now = new Date();
    const isActive =
      sub[0].isActive &&
      sub[0].paymentStatus === "completed" &&
      sub[0].expiresAt &&
      new Date(sub[0].expiresAt) > now;

    return {
      isPremium: isActive,
      plan: sub[0].plan,
      expiresAt: sub[0].expiresAt,
    };
  }),

  // Activate premium (simulated payment — integrate Razorpay/Stripe for production)
  activate: authedQuery
    .input(
      z.object({
        plan: z.enum(["monthly", "quarterly", "yearly"]),
        paymentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const now = new Date();

      // Calculate expiry based on plan
      const expiresAt = new Date(now);
      if (input.plan === "monthly") expiresAt.setMonth(expiresAt.getMonth() + 1);
      else if (input.plan === "quarterly") expiresAt.setMonth(expiresAt.getMonth() + 3);
      else if (input.plan === "yearly") expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      const amounts = { monthly: 49900, quarterly: 129900, yearly: 399900 }; // in paise

      const existing = await db
        .select()
        .from(premiumSubscriptions)
        .where(eq(premiumSubscriptions.userId, ctx.user.id))
        .limit(1);

      if (existing[0]) {
        await db
          .update(premiumSubscriptions)
          .set({
            isActive: true,
            plan: input.plan,
            amount: amounts[input.plan],
            paymentId: input.paymentId ?? `sim_${Date.now()}`,
            paymentStatus: "completed",
            startedAt: now,
            expiresAt,
            updatedAt: now,
          })
          .where(eq(premiumSubscriptions.userId, ctx.user.id));
      } else {
        await db.insert(premiumSubscriptions).values({
          userId: ctx.user.id,
          isActive: true,
          plan: input.plan,
          amount: amounts[input.plan],
          paymentId: input.paymentId ?? `sim_${Date.now()}`,
          paymentStatus: "completed",
          startedAt: now,
          expiresAt,
        });
      }

      return { success: true, plan: input.plan, expiresAt };
    }),

  // Cancel premium
  cancel: authedQuery.mutation(async ({ ctx }) => {
    const db = getDb();
    await db
      .update(premiumSubscriptions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(premiumSubscriptions.userId, ctx.user.id));
    return { success: true };
  }),
});
