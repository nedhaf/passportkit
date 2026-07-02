"use client";

import { toast } from "sonner";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

export function DemoActionButton({
  children,
  className,
  toastTitle = "demoToast.title",
  toastDescription = "demoToast.body",
}: {
  children: React.ReactNode;
  className: string;
  toastTitle?: TranslationKey;
  toastDescription?: TranslationKey;
}) {
  const { t } = useLanguage();

  return (
    <button
      className={className}
      onClick={() => {
        toast(t(toastTitle), {
          description: t(toastDescription),
        });
      }}
      type="button"
    >
      {children}
    </button>
  );
}
