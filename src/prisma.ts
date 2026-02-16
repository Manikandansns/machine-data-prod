import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool)
});

export async function connectToPostgres() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL successfully");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
}
