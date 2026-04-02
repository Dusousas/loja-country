"use client";

const fallbackMessages = [
  "Frete gratis para todo o Brasil",
  "Parcele em ate 12x com juros",
  "5% OFF a vista no Pix",
];

type AnnouncementBarProps = {
  messages?: string[];
};

export default function AnnouncementBar({
  messages = fallbackMessages,
}: AnnouncementBarProps) {
  const normalizedMessages = messages.filter((message) => message.trim().length > 0);
  const items = normalizedMessages.length > 0 ? normalizedMessages : fallbackMessages;

  if (items.length === 1) {
    return (
      <section className="overflow-hidden bg-[#171717] py-2">
        <div className="maxW">
          <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-white sm:text-sm">
            {items[0]}
          </p>
        </div>
      </section>
    );
  }

  const marqueeItems = [...items, ...items];

  return (
    <section className="overflow-hidden bg-[#171717] py-2">
      <div className="maxW">
        <div className="announcement-marquee" aria-label="Avisos da loja">
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
      </div>
    </section>
  );
}
