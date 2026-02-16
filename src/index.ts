import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "bun";
import { machineDataRoutes } from "./routes/machinedata.route";
import { env } from "./configs/env.config";

const app = new Hono();

const CORS_ORIGIN = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
const PORT = env.PORT || 8080;

// Middlewares
app.use(logger());
app.use(
  cors({
    origin: (origin, _c) => {
      if (
        CORS_ORIGIN.includes(origin)
      ) {
        return origin;
      }
      return null;
    },
    credentials: true,
  }),
);

// Register Routes
app.route("/api/v1", machineDataRoutes);
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Machine Data Dashboard API"
  });
});

// 404 Not Found Handler
app.notFound((c) => c.json({ error: "Not Found" }, 404));


// customLogger.info(`Starting server in http://localhost:${PORT}`);

// Start the Bun Server
serve({
  fetch: app.fetch,
  port: env.PORT,
  idleTimeout: 60,
},
);
console.log(`Server is running at http://localhost:${PORT} in ${env.NODE_ENV} mode`);
