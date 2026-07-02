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
import { productStats, products, type Product } from "@/lib/products";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Box },
  { label: "Passports", icon: QrCode },
  { label: "Imports", icon: Upload },
  { label: "Settings", icon: Settings },
];

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
          <Link className="text-lg font-semibold" href="/">
            PassportKit
          </Link>
          <nav className="mt-10 space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <a
                className={`block rounded-md px-3 py-2 text-sm font-medium ${
                  label === "Dashboard"
                    ? "bg-[#eef6ef] text-[#237047]"
                    : "text-[#526057] hover:bg-[#f7f8f5]"
                }`}
                href="#"
                key={label}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
              </a>
            ))}
          </nav>
          <div className="mt-10 rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-4">
            <p className="text-sm font-semibold">Readiness note</p>
            <p className="mt-2 text-sm leading-6 text-[#526057]">
              PassportKit organizes product data and readiness documentation.
              It is not legal advice.
            </p>
          </div>
        </aside>

        <section className="px-6 py-6 lg:px-8">
          <header className="flex flex-col gap-4 border-b border-[#dfe5dc] pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#2455a4]">
                EU product readiness
              </p>
              <h1 className="mt-1 text-3xl font-semibold">
                Fashion passport dashboard
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Import Shopify CSV
                </span>
              </button>
              <button className="rounded-md bg-[#17211b] px-4 py-2 text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <Box className="h-4 w-4" aria-hidden="true" />
                  Add product
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
                  <h2 className="font-semibold">EU readiness timeline</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526057]">
                    Use this dashboard to keep product passport data complete
                    before the November 28, 2026 deadline you are tracking.
                  </p>
                </div>
              </div>
            </div>
            <DeadlineTimer compact />
          </div>

          <div className="grid gap-4 py-6 md:grid-cols-4">
            {[
              ["Products", productStats.total],
              ["Ready", productStats.ready],
              ["Need info", productStats.needInfo],
              ["Published", productStats.published],
            ].map(([label, value]) => (
              <div
                className="rounded-lg border border-[#dfe5dc] bg-white p-5"
                key={label}
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                  {label === "Products" ? (
                    <Box className="h-5 w-5" aria-hidden="true" />
                  ) : label === "Ready" ? (
                    <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                  ) : label === "Need info" ? (
                    <Gauge className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <QrCode className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-[#6b746d]">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <section className="overflow-hidden rounded-lg border border-[#dfe5dc] bg-white">
              <div className="flex flex-col gap-3 border-b border-[#dfe5dc] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-semibold">Products</h2>
                  <p className="text-sm text-[#6b746d]">
                    Track missing fields and QR publishing status.
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  {["All", "Needs info", "Published"].map((filter) => (
                    <button
                      className={`rounded-md px-3 py-2 font-medium ${
                        filter === "All"
                          ? "bg-[#17211b] text-white"
                          : "border border-[#dfe5dc] bg-white text-[#526057]"
                      }`}
                      key={filter}
                    >
                      {filter}
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
                              Complete
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
                            Open
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
                <h2 className="font-semibold">Readiness summary</h2>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-5xl font-semibold">73%</span>
                  <span className="pb-2 text-sm text-[#6b746d]">
                    average completion
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
