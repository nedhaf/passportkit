"use client";

import { Globe2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { locales } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      aria-label="Language"
      className="inline-flex items-center gap-1 rounded-md border border-[#dfe5dc] bg-white p-1 shadow-sm shadow-[#23432f]/5"
      role="group"
    >
      <Globe2 className="ml-2 h-4 w-4 text-[#6b746d]" aria-hidden="true" />
      {locales.map((item) => (
        <button
          aria-pressed={locale === item.code}
          className={`rounded px-2 py-1 text-xs font-semibold transition ${
            locale === item.code
              ? "bg-[#17211b] text-white"
              : "text-[#526057] hover:bg-[#f7f8f5]"
          }`}
          key={item.code}
          onClick={() => setLocale(item.code)}
          title={item.name}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
