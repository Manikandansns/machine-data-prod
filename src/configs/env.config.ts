import { z, ZodSafeParseError } from "zod/v4";

const envSchema = z.object({
  // COMMON CONFIGURATION
  CORS_ORIGIN: z.string(),
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.url(),

});



/**
 * Formats a Zod error for display.
 * @param zodError The Zod error to format.
 * @returns A formatted string representation of the error.
 */
const formatError = (
  zodError: ZodSafeParseError<z.infer<typeof envSchema>>
) => {
  const errorTree = z.treeifyError(zodError.error);
  const maxLength = Math.max(
    ...Object.keys(errorTree.properties || {}).map((key) => key.length)
  );
  return Object.entries(errorTree.properties || {})
    .map(([key, value]) => {
      const errors = value.errors.join(", ");
      return `    * \x1b[1;31m${key.padEnd(maxLength)}\x1b[0m - ${errors}`;
    })
    .join("\n");
};

// * Load environment variables from .env files
const envSource = typeof Bun === "undefined" ? process.env : Bun.env;
const envParsed = envSchema.safeParse(envSource);

if (!envParsed.success) {
  const formattedError = formatError(envParsed);
  console.error(
    `❌ \x1b[1;0mEnvironment variables validation failed:\x1b[0m\n${formattedError}\n`
  );
  process.exit(1);
}

export const env = envParsed.data;

// Type for environment variables
export type EnvVariables = z.infer<typeof envSchema>;
