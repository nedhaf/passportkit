import Link from "next/link";
import {
  Box,
  FileCheck2,
  Gauge,
  Globe2,
  LayoutDashboard,
  QrCode,
  Settings,
  Upload,
} from "lucide-react";
import { DeadlineTimer } from "@/components/deadline-timer";
import { T } from "@/components/i18n-text";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import type { TranslationKey } from "@/lib/i18n";
import { productStats, products, type Product } from "@/lib/products";

const navItems = [
  { label: "dashboard.nav.dashboard", icon: LayoutDashboard },
  { label: "dashboard.nav.products", icon: Box },
  { label: "dashboard.nav.passports", icon: QrCode },
  { label: "dashboard.nav.imports", icon: Upload },
  { label: "dashboard.nav.settings", icon: Settings },
] satisfies { label: TranslationKey; icon: typeof LayoutDashboard }[];

function qrClass(status: Product["qrStatus"]) {
  if (status === "Published") {
    return "bg-[#eef6ef] text-[#237047]";
  }

  if (status === "Draft") {
    return "bg-[#edf3ff] text-[#2455a4]";
  }

  return "bg-[#f3f4f2] text-[#6b746d]";
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17211b]">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="border-r border-[#dfe5dc] bg-white px-5 py-6">
          <Logo />
          <nav className="mt-10 space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <a
                className={`block rounded-md px-3 py-2 text-sm font-medium ${
                  label === "dashboard.nav.dashboard"
                    ? "bg-[#eef6ef] text-[#237047]"
                    : "text-[#526057] hover:bg-[#f7f8f5]"
                }`}
                href="#"
                key={label}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <T k={label} />
                </span>
              </a>
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
        </aside>

        <section className="px-6 py-6 lg:px-8">
          <header className="flex flex-col gap-4 border-b border-[#dfe5dc] pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#2455a4]">
                <T k="dashboard.kicker" />
              </p>
              <h1 className="mt-1 text-3xl font-semibold">
                <T k="dashboard.title" />
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <LanguageSwitcher />
              <button className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  <T k="dashboard.import" />
                </span>
              </button>
              <button className="rounded-md bg-[#17211b] px-4 py-2 text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <Box className="h-4 w-4" aria-hidden="true" />
                  <T k="dashboard.add" />
                </span>
              </button>
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
            <section className="overflow-hidden rounded-lg border border-[#dfe5dc] bg-white">
              <div className="flex flex-col gap-3 border-b border-[#dfe5dc] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-semibold">
                    <T k="dashboard.products" />
                  </h2>
                  <p className="text-sm text-[#6b746d]">
                    <T k="dashboard.tableBody" />
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  {[
                    ["dashboard.filterAll", true],
                    ["dashboard.filterNeeds", false],
                    ["dashboard.published", false],
                  ].map(([filter, active]) => (
                    <button
                      className={`rounded-md px-3 py-2 font-medium ${
                        active
                          ? "bg-[#17211b] text-white"
                          : "border border-[#dfe5dc] bg-white text-[#526057]"
                      }`}
                      key={filter as string}
                    >
                      <T k={filter as TranslationKey} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="bg-[#fbfcfa] text-xs uppercase tracking-[0.12em] text-[#6b746d]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Readiness</th>
                      <th className="px-4 py-3 font-semibold">
                        Missing fields
                      </th>
                      <th className="px-4 py-3 font-semibold">QR status</th>
                      <th className="px-4 py-3 font-semibold">Updated</th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        className="border-t border-[#edf1ea]"
                        key={product.sku}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-11 w-11 rounded-md"
                              style={{ backgroundColor: product.color }}
                            />
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-xs text-[#6b746d]">
                                {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-[#526057]">
                          {product.category}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-24 rounded-full bg-[#edf1ea]">
                              <div
                                className="h-2 rounded-full bg-[#2f9d62]"
                                style={{ width: `${product.readiness}%` }}
                              />
                            </div>
                            <span className="font-semibold">
                              {product.readiness}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {product.missingFields.length === 0 ? (
                            <span className="rounded-full bg-[#eef6ef] px-2 py-1 text-xs font-semibold text-[#237047]">
                              <T k="dashboard.complete" />
                            </span>
                          ) : (
                            <span className="text-[#526057]">
                              {product.missingFields.join(", ")}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${qrClass(
                              product.qrStatus,
                            )}`}
                          >
                            {product.qrStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[#526057]">
                          {product.updated}
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            className="font-semibold text-[#2455a4]"
                            href="/products/linen-overshirt"
                          >
                            <T k="dashboard.open" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

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
                  className="mt-5 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#17211b]"
                  href="/products/linen-overshirt"
                >
                  Continue wizard
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
