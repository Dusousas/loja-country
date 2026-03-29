import { NextResponse } from "next/server";
import { getAnnouncementMessages } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const announcementMessages = await getAnnouncementMessages();

  return NextResponse.json({
    announcementMessages,
  });
}
