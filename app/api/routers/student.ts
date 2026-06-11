import { z } from "zod";
import { createRouter, authedQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { studentProfiles, applications } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const studentRouter = createRouter({
  getProfile: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const profile = await db
      .select()
      .from(studentProfiles)
      .where(eq(studentProfiles.userId, ctx.user.id))
      .limit(1);
    return profile[0] ?? null;
  }),

  upsertProfile: authedQuery
    .input(
      z.object({
        fullName: z.string().optional(),
        phone: z.string().optional(),
        city: z.string().optional(),
        destination: z.string().optional(),
        courseInterest: z.string().optional(),
        preferredIntake: z.string().optional(),
        gpa: z.string().optional(),
        englishProficiency: z.string().optional(),
        workExperience: z.string().optional(),
        budget: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(studentProfiles)
        .where(eq(studentProfiles.userId, ctx.user.id))
        .limit(1);

      const data = {
        fullName: input.fullName ?? null,
        phone: input.phone ?? null,
        city: input.city ?? null,
        destination: (input.destination as any) ?? null,
        courseInterest: (input.courseInterest as any) ?? null,
        preferredIntake: (input.preferredIntake as any) ?? null,
        gpa: input.gpa ?? null,
        englishProficiency: input.englishProficiency ?? null,
        workExperience: input.workExperience ?? null,
        budget: input.budget ?? null,
        bio: input.bio ?? null,
      };

      if (existing.length > 0) {
        await db
          .update(studentProfiles)
          .set(data)
          .where(eq(studentProfiles.userId, ctx.user.id));
        return { success: true, id: existing[0].id };
      } else {
        const result = await db.insert(studentProfiles).values({
          userId: ctx.user.id,
          ...data,
        });
        return { success: true, id: Number(result[0].insertId) };
      }
    }),

  getApplications: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const apps = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, ctx.user.id))
      .orderBy(applications.createdAt);
    return apps;
  }),

  createApplication: authedQuery
    .input(
      z.object({
        university: z.string().min(1),
        course: z.string().min(1),
        destination: z.enum([
          "usa", "canada", "uk", "australia", "germany", "ireland", "new_zealand", "other",
        ]),
        deadline: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db.insert(applications).values({
        userId: ctx.user.id,
        university: input.university,
        course: input.course,
        destination: input.destination,
        deadline: input.deadline ?? null,
        notes: input.notes ?? null,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  updateApplicationStatus: authedQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum([
          "researching", "shortlisted", "applied", "documents_submitted",
          "interview_scheduled", "interview_completed", "offer_received", "rejected", "accepted",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .update(applications)
        .set({ status: input.status, updatedAt: new Date() })
        .where(
          and(
            eq(applications.id, input.id),
            eq(applications.userId, ctx.user.id)
          )
        );
      return { success: true };
    }),

  deleteApplication: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(applications)
        .where(
          and(
            eq(applications.id, input.id),
            eq(applications.userId, ctx.user.id)
          )
        );
      return { success: true };
    }),
});
