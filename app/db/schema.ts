import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
  int,
  json,
  boolean,
} from "drizzle-orm/mysql-core";

// ─── Leads Table ───
export const leads = mysqlTable("leads", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  destination: mysqlEnum("destination", [
    "usa", "canada", "uk", "australia", "germany", "ireland", "new_zealand", "other",
  ]).notNull(),
  courseInterest: mysqlEnum("course_interest", [
    "undergraduate", "postgraduate", "phd", "mba", "diploma", "other",
  ]).notNull(),
  preferredIntake: mysqlEnum("preferred_intake", [
    "fall_2026", "spring_2027", "fall_2027", "later",
  ]).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "lost"])
    .notNull()
    .default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ─── Users Table (Auth) ───
export const users = mysqlTable("users", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

// ─── Student Profiles ───
export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  userId: int("user_id", { unsigned: true }).notNull(),
  fullName: varchar("full_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 100 }),
  destination: mysqlEnum("destination", [
    "usa", "canada", "uk", "australia", "germany", "ireland", "new_zealand", "other",
  ]),
  courseInterest: mysqlEnum("course_interest", [
    "undergraduate", "postgraduate", "phd", "mba", "diploma", "other",
  ]),
  preferredIntake: mysqlEnum("preferred_intake", [
    "fall_2026", "spring_2027", "fall_2027", "later",
  ]),
  gpa: varchar("gpa", { length: 20 }),
  englishProficiency: varchar("english_proficiency", { length: 50 }),
  workExperience: varchar("work_experience", { length: 50 }),
  budget: varchar("budget", { length: 50 }),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ─── Application Tracker ───
export const applications = mysqlTable("applications", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  userId: int("user_id", { unsigned: true }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  course: varchar("course", { length: 255 }).notNull(),
  destination: mysqlEnum("destination", [
    "usa", "canada", "uk", "australia", "germany", "ireland", "new_zealand", "other",
  ]).notNull(),
  status: mysqlEnum("app_status", [
    "researching", "shortlisted", "applied", "documents_submitted",
    "interview_scheduled", "interview_completed", "offer_received", "rejected", "accepted",
  ]).notNull().default("researching"),
  deadline: varchar("deadline", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ─── Country Data (Decision Engine) ───
// Stores all country metrics with timestamps for 12-hour refresh tracking
export const countryData = mysqlTable("country_data", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  country: varchar("country", { length: 100 }).notNull().unique(),
  countryCode: varchar("country_code", { length: 10 }).notNull(),
  // Costs (₹ Lakhs/year)
  livingCost: int("living_cost"), // estimated
  tuitionCost: int("tuition_cost"), // estimated
  // Scores (0-100 or 0-10)
  safetyScore: int("safety_score"), // 0-100
  visaEaseScore: int("visa_ease_score"), // 0-10
  prScore: int("pr_score"), // 0-10
  employmentScore: int("employment_score"), // 0-10
  // Salary (₹ Lakhs/year)
  avgSalary: int("avg_salary"), // estimated
  // Metadata
  dataSource: text("data_source"), // e.g. "Numbeo, QS, MEA"
  lastVerified: timestamp("last_verified").notNull().defaultNow(),
  nextRefresh: timestamp("next_refresh").notNull().defaultNow(),
  isLive: int("is_live", { unsigned: true }).notNull().default(1), // 1 = from API, 0 = fallback
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ─── Decision Engine Profiles ───
// Stores user's decision engine inputs and last computed results
export const decisionProfiles = mysqlTable("decision_profiles", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  userId: int("user_id", { unsigned: true }).notNull(),
  // Form inputs
  major: varchar("major", { length: 50 }),
  level: mysqlEnum("level", ["UG", "PG", "Diploma"]),
  budget: int("budget"),
  ielts: varchar("ielts", { length: 10 }),
  prPriority: mysqlEnum("pr_priority", ["High", "Med", "Low"]),
  academicScore: int("academic_score"),
  workExp: mysqlEnum("work_exp", ["0", "0-1", "1-3", "3-5", "5+"]),
  courseType: varchar("course_type", { length: 50 }),
  // Cached results (last computed rankings)
  lastResults: json("last_results"),
  lastComputedAt: timestamp("last_computed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ─── Premium Subscriptions ───
// Tracks premium payment status per user
export const premiumSubscriptions = mysqlTable("premium_subscriptions", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  userId: int("user_id", { unsigned: true }).notNull().unique(),
  isActive: boolean("is_active").notNull().default(false),
  plan: mysqlEnum("plan", ["monthly", "quarterly", "yearly"]).default("monthly"),
  amount: int("amount"), // in paise (₹)
  currency: varchar("currency", { length: 10 }).default("INR"),
  // Payment tracking (simulated for now — integrate Razorpay/Stripe later)
  paymentId: varchar("payment_id", { length: 255 }),
  paymentStatus: mysqlEnum("payment_status", ["pending", "completed", "failed", "refunded"]).default("pending"),
  // Timestamps
  startedAt: timestamp("started_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CountryData = typeof countryData.$inferSelect;
export type DecisionProfile = typeof decisionProfiles.$inferSelect;
export type PremiumSubscription = typeof premiumSubscriptions.$inferSelect;
