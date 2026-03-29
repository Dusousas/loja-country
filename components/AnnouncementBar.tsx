"use client";

import { useEffect, useMemo, useState } from "react";

const fallbackMessages = [
  "Frete gratis para todo o Brasil",
  "Parcele em ate 12x com juros",
  "5% OFF a vista no Pix",
];

type SiteSettingsResponse = {
  announcementMessages?: string[];
};

export default function AnnouncementBar() {
  const [messages, setMessages] = useState(fallbackMessages);

  useEffect(() => {
    let isActive = true;

    async function loadMessages() {
      try {
        const response = await fetch("/api/site-settings", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as SiteSettingsResponse;
        const nextMessages = Array.isArray(data.announcementMessages)
          ? data.announcementMessages.filter(
              (message): message is string =>
                typeof message === "string" && message.trim().length > 0
            )
          : [];

        if (isActive && nextMessages.length > 0) {
          setMessages(nextMessages);
        }
      } catch {
        // Keep fallback messages when the request is unavailable.
      }
    }

    void loadMessages();

    return () => {
      isActive = false;
    };
  }, []);

  const marqueeItems = useMemo(() => [...messages, ...messages], [messages]);

  return (
    <section className="overflow-hidden bg-[#171717] py-2">
      <div className="announcement-marquee">
        <div className="announcement-marquee__track">
          {marqueeItems.map((message, index) => (
            <span
              key={`${message}-${index}`}
              className="announcement-marquee__item text-xs font-medium uppercase tracking-[0.24em] text-white sm:text-sm"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
