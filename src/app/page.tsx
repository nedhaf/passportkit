import Link from "next/link";
import { productStats, products } from "@/lib/products";

const passportSections = [
  "Materials",
  "Care instructions",
  "Origin",
  "Repair notes",
  "Recycling",
  "Safety notes",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17211b]">
      <section className="px-6 py-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link className="text-lg font-semibold" href="/">
            PassportKit
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#526057] md:flex">
            <a href="#workflow">How it works</a>
            <a href="#passport">Passport contents</a>
            <a href="#readiness">Readiness</a>
          </div>
          <Link
            className="rounded-md bg-[#17211b] px-4 py-2 text-sm font-semibold text-white"
            href="/dashboard"
          >
            View demo
          </Link>
        </nav>
      </section>

      <section className="px-6 pb-16 pt-8">
        <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_560px]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-[#cfd8cf] bg-white px-3 py-1 text-sm font-medium text-[#2455a4]">
              Built for Shopify fashion and accessory brands
            </div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#111814] md:text-7xl">
              QR product passports for small fashion brands.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526057] md:text-xl">
              Import products, complete missing details, and publish
              mobile-friendly passport pages for materials, care, origin,
              repair, and recycling information.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-[#17211b] px-5 py-3 text-sm font-semibold text-white shadow-sm"
                href="/dashboard"
              >
                Create your first passport
              </Link>
              <Link
                className="rounded-md border border-[#c7d2c4] bg-white px-5 py-3 text-sm font-semibold text-[#17211b]"
                href="/dashboard"
              >
                View product dashboard
              </Link>
            </div>
            <p className="mt-5 text-sm text-[#6b746d]">
              Readiness support, not legal advice.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-[#dfe5dc] bg-white p-4 shadow-xl shadow-[#23432f]/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Product readiness</p>
                  <p className="text-xs text-[#6b746d]">
                    Imported from Shopify CSV
                  </p>
                </div>
                <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
                  {productStats.ready}/{productStats.total} ready
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Products", productStats.total],
                  ["Need info", productStats.needInfo],
                  ["Published", productStats.published],
                ].map(([label, value]) => (
                  <div
                    className="rounded-md border border-[#e5ebe2] bg-[#fbfcfa] p-3"
                    key={label}
                  >
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="text-xs text-[#6b746d]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {products.slice(0, 4).map((product) => (
                  <div
                    className="grid grid-cols-[38px_1fr_auto] items-center gap-3 rounded-md border border-[#e5ebe2] bg-white p-3"
                    key={product.sku}
                  >
                    <div
                      className="h-10 rounded-md"
                      style={{ backgroundColor: product.color }}
                    />
                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-[#6b746d]">
                        {product.sku} · {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {product.readiness}%
                      </p>
                      <p className="text-xs text-[#6b746d]">
                        {product.qrStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-8 right-6 hidden w-64 rounded-lg border border-[#dfe5dc] bg-[#17211b] p-4 text-white shadow-xl md:block">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">QR passport</span>
                <span className="rounded-full bg-[#2f9d62] px-2 py-1 text-xs">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-[72px_1fr] gap-3">
                <div className="grid aspect-square grid-cols-4 gap-1 rounded bg-white p-2">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span
                      className={
                        index % 3 === 0 || index === 5
                          ? "bg-[#17211b]"
                          : "bg-[#dfe5dc]"
                      }
                      key={index}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold">Linen Overshirt</p>
                  <p className="mt-1 text-xs text-white/70">
                    Materials, origin, care and repair details in one mobile
                    page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16" id="workflow">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              A simple path from product data to QR passport.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "Import",
                "Start with Shopify CSV data: products, SKUs, descriptions, images and variants.",
              ],
              [
                "Complete",
                "Use guided fields for materials, origin, care, repair, recycling and safety notes.",
              ],
              [
                "Publish",
                "Generate a mobile passport page, QR label, and downloadable product record.",
              ],
            ].map(([title, copy], index) => (
              <div
                className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-6"
                key={title}
              >
                <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-md bg-[#eef6ef] text-sm font-semibold text-[#237047]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#526057]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16" id="passport">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              Passport contents
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Make product information scannable, structured, and brand-safe.
            </h2>
            <p className="mt-5 leading-8 text-[#526057]">
              PassportKit helps small teams organize the product facts they
              already have scattered across spreadsheets, product pages,
              supplier emails, and care labels.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {passportSections.map((section) => (
              <div
                className="rounded-md border border-[#dfe5dc] bg-white p-4 text-sm font-semibold"
                key={section}
              >
                <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-[#2f9d62]" />
                {section}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17211b] px-6 py-16 text-white" id="readiness">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">
              Start with a readiness prototype, then validate with real brands.
            </h2>
            <p className="mt-4 leading-8 text-white/70">
              The first version focuses on clarity: import products, see what
              is missing, and publish a credible QR passport page.
            </p>
          </div>
          <Link
            className="w-fit rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#17211b]"
            href="/dashboard"
          >
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
