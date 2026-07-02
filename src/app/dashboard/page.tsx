import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  CalendarClock,
  FileCheck2,
  Gauge,
  Globe2,
  LayoutDashboard,
  QrCode,
  Settings,
  Upload,
} from "lucide-react";
import { DashboardProducts } from "@/components/dashboard-products";
import { DemoActionButton } from "@/components/demo-action-button";
import { DeadlineTimer } from "@/components/deadline-timer";
import { T } from "@/components/i18n-text";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import type { TranslationKey } from "@/lib/i18n";
import { productStats } from "@/lib/products";

const navItems = [
  { label: "dashboard.nav.dashboard", icon: LayoutDashboard },
  { label: "dashboard.nav.products", icon: Box },
  { label: "dashboard.nav.passports", icon: QrCode },
  { label: "dashboard.nav.imports", icon: Upload },
  { label: "dashboard.nav.settings", icon: Settings },
] satisfies { label: TranslationKey; icon: typeof LayoutDashboard }[];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17211b]">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="border-r border-[#dfe5dc] bg-white px-5 py-6">
          <Logo />
          <nav className="mt-10 space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <DemoActionButton
                className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                  label === "dashboard.nav.dashboard"
                    ? "bg-[#eef6ef] text-[#237047]"
                    : "text-[#526057] hover:bg-[#f7f8f5]"
                }`}
                key={label}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <T k={label} />
                </span>
              </DemoActionButton>
            ))}
          </nav>
          <div className="mt-10 rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-4">
            <p className="text-sm font-semibold">
              <T k="dashboard.noteTitle" />
            </p>
            <p className="mt-2 text-sm leading-6 text-[#526057]">
              <T k="dashboard.noteBody" />
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-[#17211b] p-4 text-white">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              Launch focus
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Prepare the first 20 passports, publish the QR pilot, then
              validate with two EU-facing brands.
            </p>
          </div>
        </aside>

        <section className="px-6 py-6 lg:px-8">
          <header className="overflow-hidden rounded-xl border border-[#dfe5dc] bg-white shadow-sm shadow-[#23432f]/5">
            <div className="grid gap-6 p-6 xl:grid-cols-[1fr_380px] xl:items-center">
            <div>
              <p className="text-sm font-semibold text-[#2455a4]">
                <T k="dashboard.kicker" />
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.01em]">
                <T k="dashboard.title" />
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526057]">
                Monitor readiness, resolve missing fields, and open the exact
                product record that needs work before publishing customer-facing
                QR passport pages.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap justify-start gap-3 xl:justify-end">
                <LanguageSwitcher />
                <DemoActionButton className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[#f7f8f5]">
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" aria-hidden="true" />
                    <T k="dashboard.import" />
                  </span>
                </DemoActionButton>
                <DemoActionButton className="rounded-md bg-[#17211b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2a342d]">
                  <span className="flex items-center gap-2">
                    <Box className="h-4 w-4" aria-hidden="true" />
                    <T k="dashboard.add" />
                  </span>
                </DemoActionButton>
              </div>
              <div className="mt-5 rounded-lg border border-[#ead7a2] bg-[#fff8e8] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#8a5b00]">
                      Pilot queue health
                    </p>
                    <p className="mt-1 text-xs text-[#8a5b00]/80">
                      3 products need attention before QR publishing.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#8a5b00]">
                    73%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full w-[73%] rounded-full bg-[#d39b2a]" />
                </div>
              </div>
            </div>
            </div>
          </header>

          <div className="grid gap-4 pt-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-[#dfe5dc] bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-[#edf3ff] p-2 text-[#2455a4]">
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold">
                    <T k="dashboard.timelineTitle" />
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526057]">
                    <T k="dashboard.timelineBody" />
                  </p>
                </div>
              </div>
            </div>
            <DeadlineTimer compact />
          </div>

          <div className="grid gap-4 py-6 md:grid-cols-4">
            {[
              ["dashboard.products", productStats.total, "products"],
              ["dashboard.ready", productStats.ready, "ready"],
              ["dashboard.needInfo", productStats.needInfo, "needInfo"],
              ["dashboard.published", productStats.published, "published"],
            ].map(([label, value, id]) => (
              <div
                className="rounded-lg border border-[#dfe5dc] bg-white p-5"
                key={label}
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                  {id === "products" ? (
                    <Box className="h-5 w-5" aria-hidden="true" />
                  ) : id === "ready" ? (
                    <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                  ) : id === "needInfo" ? (
                    <Gauge className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <QrCode className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-[#6b746d]">
                  <T k={label as TranslationKey} />
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <DashboardProducts />

            <aside className="space-y-6">
              <div className="rounded-lg border border-[#dfe5dc] bg-white p-5">
                <h2 className="font-semibold">
                  <T k="dashboard.summary" />
                </h2>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-5xl font-semibold">73%</span>
                  <span className="pb-2 text-sm text-[#6b746d]">
                    <T k="dashboard.average" />
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {["Materials", "Origin", "Care", "Repair", "Recycling"].map(
                    (item, index) => (
                      <div className="flex items-center justify-between" key={item}>
                        <span className="text-sm text-[#526057]">{item}</span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            index < 3 ? "bg-[#2f9d62]" : "bg-[#d39b2a]"
                          }`}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-[#dfe5dc] bg-[#17211b] p-5 text-white">
                <h2 className="font-semibold">Next suggested action</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Finish recycling and safety notes for Linen Overshirt, then
                  publish the first public QR passport page.
                </p>
                <Link
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#17211b]"
                  href="/products/linen-overshirt"
                >
                  Continue wizard
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
