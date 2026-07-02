"use client";

import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

export function T({
  k,
  className,
}: {
  k: TranslationKey;
  className?: string;
}) {
  const { t } = useLanguage();

  return <span className={className}>{t(k)}</span>;
}
