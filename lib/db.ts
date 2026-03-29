import { Pool } from "pg";

declare global {
  var __countryDbPool: Pool | undefined;
}

function getConnectionString() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT ?? "5432";
  const database = process.env.POSTGRES_DB;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;

  if (!host || !database || !user || !password) {
    throw new Error(
      "Banco nao configurado. Defina DATABASE_URL ou POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER e POSTGRES_PASSWORD."
    );
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}:${port}/${database}`;
}

export function getDbPool() {
  if (!global.__countryDbPool) {
    global.__countryDbPool = new Pool({
      connectionString: getConnectionString(),
    });
  }

  return global.__countryDbPool;
}
