import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const leadRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Phone must be at least 10 digits"),
        destination: z.enum([
          "usa",
          "canada",
          "uk",
          "australia",
          "germany",
          "ireland",
          "new_zealand",
          "other",
        ]),
        courseInterest: z.enum([
          "undergraduate",
          "postgraduate",
          "phd",
          "mba",
          "diploma",
          "other",
        ]),
        preferredIntake: z.enum([
          "fall_2026",
          "spring_2027",
          "fall_2027",
          "later",
        ]),
        city: z.string().min(2, "City is required"),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(leads).values({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        destination: input.destination,
        courseInterest: input.courseInterest,
        preferredIntake: input.preferredIntake,
        city: input.city,
        message: input.message || null,
      });

      return { success: true, id: Number(result[0].insertId) };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return allLeads;
  }),

  updateStatus: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(leads)
        .set({ status: input.status })
        .where(eq(leads.id, input.id));
      return { success: true };
    }),
});
