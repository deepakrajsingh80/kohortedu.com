import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Redirect direct browser paths to HashRouter paths (e.g. /admin -> /#/admin)
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  const path = url.pathname;

  if (
    path.startsWith("/api/") ||
    path === "/api" ||
    path === Paths.oauthCallback ||
    path.includes(".")
  ) {
    await next();
    return;
  }

  const accept = c.req.header("accept") ?? "";
  if (!accept.includes("text/html")) {
    await next();
    return;
  }

  if (path !== "/" && !path.startsWith("/#")) {
    return c.redirect(`/#${path}`);
  }

  await next();
});

app.get(Paths.oauthCallback, createOAuthCallbackHandler());
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
