import { z } from "zod";
import { createRouter, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads, users, studentProfiles, applications } from "@db/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export const adminRouter = createRouter({
  /* ─── Stats Overview ─── */
  stats: adminQuery.query(async () => {
    const db = getDb();
    const [totalLeads] = await db.select({ count: count() }).from(leads);
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [totalStudents] = await db.select({ count: count() }).from(studentProfiles);
    const [totalApps] = await db.select({ count: count() }).from(applications);

    const [newLeads] = await db.select({ count: count() }).from(leads).where(eq(leads.status, "new"));
    const [convertedLeads] = await db.select({ count: count() }).from(leads).where(eq(leads.status, "converted"));

    return {
      totalLeads: totalLeads.count,
      totalUsers: totalUsers.count,
      totalStudents: totalStudents.count,
      totalApplications: totalApps.count,
      newLeads: newLeads.count,
      convertedLeads: convertedLeads.count,
    };
  }),

  /* ─── Leads List ─── */
  leads: adminQuery.query(async () => {
    const db = getDb();
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return allLeads;
  }),

  /* ─── Update Lead Status ─── */
  updateLeadStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["new", "contacted", "qualified", "converted", "lost"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(leads).set({ status: input.status }).where(eq(leads.id, input.id));
      return { success: true };
    }),

  /* ─── Delete Lead ─── */
  deleteLead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(leads).where(eq(leads.id, input.id));
      return { success: true };
    }),

  /* ─── Students List ─── */
  students: adminQuery.query(async () => {
    const db = getDb();
    const students = await db
      .select({
        id: studentProfiles.id,
        fullName: studentProfiles.fullName,
        phone: studentProfiles.phone,
        city: studentProfiles.city,
        destination: studentProfiles.destination,
        courseInterest: studentProfiles.courseInterest,
        budget: studentProfiles.budget,
        createdAt: studentProfiles.createdAt,
        userId: studentProfiles.userId,
        email: users.email,
      })
      .from(studentProfiles)
      .leftJoin(users, eq(studentProfiles.userId, users.id))
      .orderBy(desc(studentProfiles.createdAt));
    return students;
  }),

  /* ─── Users List ─── */
  userList: adminQuery.query(async () => {
    const db = getDb();
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        lastSignInAt: users.lastSignInAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));
    return allUsers;
  }),

  /* ─── Applications List ─── */
  appList: adminQuery.query(async () => {
    const db = getDb();
    const apps = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));
    return apps;
  }),

  /* ─── Promote user to admin ─── */
  promoteUser: adminQuery
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(users).set({ role: "admin" }).where(eq(users.id, input.userId));
      return { success: true };
    }),
});
