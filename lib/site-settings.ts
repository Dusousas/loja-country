import { getDbPool } from "@/lib/db";

const defaultAnnouncementMessages = [
  "Frete gratis para todo o Brasil",
  "Parcele em ate 12x com juros",
  "5% OFF a vista no Pix",
];

let siteSettingsReadyPromise: Promise<void> | null = null;

async function ensureSiteSettingsReady() {
  if (!siteSettingsReadyPromise) {
    siteSettingsReadyPromise = (async () => {
      const pool = getDbPool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          id INTEGER PRIMARY KEY,
          announcement_messages JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await pool.query(
        `
          INSERT INTO site_settings (id, announcement_messages, created_at, updated_at)
          VALUES (1, $1::jsonb, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING
        `,
        [JSON.stringify(defaultAnnouncementMessages)]
      );
    })();
  }

  return siteSettingsReadyPromise;
}

function normalizeMessages(messages: string[]) {
  const sanitized = Array.from(
    new Set(messages.map((message) => message.trim()).filter(Boolean))
  ).slice(0, 12);

  return sanitized.length > 0 ? sanitized : defaultAnnouncementMessages;
}

export async function getAnnouncementMessages() {
  await ensureSiteSettingsReady();

  const result = await getDbPool().query<{
    announcement_messages: unknown;
  }>("SELECT announcement_messages FROM site_settings WHERE id = 1 LIMIT 1");

  const rawMessages = Array.isArray(result.rows[0]?.announcement_messages)
    ? result.rows[0]?.announcement_messages
    : [];

  return normalizeMessages(
    rawMessages.filter((item): item is string => typeof item === "string")
  );
}

export async function updateAnnouncementMessages(messages: string[]) {
  await ensureSiteSettingsReady();

  const nextMessages = normalizeMessages(messages);

  await getDbPool().query(
    `
      UPDATE site_settings
      SET announcement_messages = $1::jsonb,
          updated_at = NOW()
      WHERE id = 1
    `,
    [JSON.stringify(nextMessages)]
  );

  return nextMessages;
}
