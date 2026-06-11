import { createRouter, publicQuery } from "./middleware";
import { leadRouter } from "./routers/lead";
import { studentRouter } from "./routers/student";
import { adminRouter } from "./routers/admin";
import { authRouter } from "./auth-router";
import { countryDataRouter } from "./routers/countryData";
import { cronRouter } from "./routers/cron";
import { deProfileRouter } from "./routers/deProfile";
import { premiumRouter } from "./routers/premium";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  lead: leadRouter,
  student: studentRouter,
  admin: adminRouter,
  countryData: countryDataRouter,
  cron: cronRouter,
  deProfile: deProfileRouter,
  premium: premiumRouter,
});

export type AppRouter = typeof appRouter;
