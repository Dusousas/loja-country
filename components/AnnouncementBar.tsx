"use client";

import { useEffect, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  useEffect(() => {
    setActiveIndex(0);
    setIsVisible(true);
  }, [messages]);

  useEffect(() => {
    if (messages.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIsVisible(false);

      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % messages.length);
        setIsVisible(true);
      }, 220);
    }, 3200);

    return () => {
      window.clearInterval(interval);
    };
  }, [messages]);

  return (
    <section className="overflow-hidden bg-[#171717] py-2">
      <div className="maxW">
        <p
          aria-live="polite"
          className={`text-center text-xs font-medium uppercase tracking-[0.24em] text-white transition-opacity duration-200 sm:text-sm ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[activeIndex] ?? fallbackMessages[0]}
        </p>
      </div>
    </section>
  );
}
