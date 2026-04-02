import { Pool } from "pg";

declare global {
  var __countryDbPool: Pool | undefined;
}

export const DATABASE_CONFIGURATION_ERROR =
  "Banco nao configurado. Defina DATABASE_URL ou POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER e POSTGRES_PASSWORD.";

function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

function getDatabaseParts() {
  return {
    host: process.env.POSTGRES_HOST?.trim() || "",
    port: process.env.POSTGRES_PORT?.trim() || "5432",
    database: process.env.POSTGRES_DB?.trim() || "",
    user: process.env.POSTGRES_USER?.trim() || "",
    password: process.env.POSTGRES_PASSWORD?.trim() || "",
  };
}

export function isDatabaseConfigured() {
  if (getDatabaseUrl()) {
    return true;
  }

  const { host, database, user, password } = getDatabaseParts();
  return Boolean(host && database && user && password);
}

export function assertDatabaseConfigured() {
  if (!isDatabaseConfigured()) {
    throw new Error(DATABASE_CONFIGURATION_ERROR);
  }
}

function getConnectionString() {
  const databaseUrl = getDatabaseUrl();

  if (databaseUrl) {
    return databaseUrl;
  }

  const { host, port, database, user, password } = getDatabaseParts();

  if (!host || !database || !user || !password) {
    throw new Error(DATABASE_CONFIGURATION_ERROR);
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}:${port}/${database}`;
}

export function getDbPool() {
  assertDatabaseConfigured();

  if (!global.__countryDbPool) {
    global.__countryDbPool = new Pool({
      connectionString: getConnectionString(),
    });
  }

  return global.__countryDbPool;
}
