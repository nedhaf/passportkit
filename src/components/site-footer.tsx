import Link from "next/link";
import { CalendarClock, Mail, QrCode } from "lucide-react";
import { T } from "@/components/i18n-text";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import type { TranslationKey } from "@/lib/i18n";

const footerGroups = [
  {
    title: "footer.product",
    links: [
      { label: "footer.dashboard", href: "/dashboard" },
      { label: "footer.qrPreview", href: "/p/linen-overshirt" },
      { label: "footer.productFlow", href: "/products/linen-overshirt" },
    ],
  },
  {
    title: "footer.company",
    links: [
      { label: "nav.howItWorks", href: "/#workflow" },
      { label: "footer.deadline", href: "/#readiness" },
      { label: "footer.contact", href: "mailto:hello@passportkit.app" },
    ],
  },
  {
    title: "footer.legal",
    links: [
      { label: "footer.privacy", href: "#" },
      { label: "footer.terms", href: "#" },
      { label: "footer.disclaimer", href: "/#readiness" },
    ],
  },
] satisfies {
  title: TranslationKey;
  links: { label: TranslationKey; href: string }[];
}[];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dfe5dc] bg-white px-6 py-10 text-[#17211b]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-[#526057]">
            <T k="footer.description" />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#ead7a2] bg-[#fff8e8] px-3 py-2 text-sm font-semibold text-[#8a5b00]">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              <T k="readiness.badge" />
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-[#dfe5dc] bg-[#fbfcfa] px-3 py-2 text-sm font-semibold text-[#526057]"
              href="/p/linen-overshirt"
            >
              <QrCode className="h-4 w-4" aria-hidden="true" />
              <T k="footer.qrPreview" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-[#17211b]">
                <T k={group.title} />
              </h2>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link
                    className="block text-sm text-[#526057] transition hover:text-[#17211b]"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label === "footer.contact" ? (
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <T k={link.label} />
                      </span>
                    ) : (
                      <T k={link.label} />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#edf1ea] pt-6 text-sm text-[#6b746d] md:flex-row md:items-center md:justify-between">
        <p>
          <T k="footer.copyright" />
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span>
            <T k="footer.disclaimer" />
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
