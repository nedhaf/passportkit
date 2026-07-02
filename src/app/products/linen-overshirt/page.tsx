import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Download,
  Eye,
  FileCheck2,
  Globe2,
  QrCode,
  Recycle,
  Save,
  ShieldCheck,
} from "lucide-react";
import { DeadlineTimer } from "@/components/deadline-timer";
import { featuredProduct } from "@/lib/products";

const steps = [
  ["Basics", "Complete"],
  ["Materials", "Complete"],
  ["Origin", "Complete"],
  ["Care", "Complete"],
  ["Repair", "Complete"],
  ["Recycling", "Missing"],
  ["Safety", "Missing"],
];

const fields = [
  ["Product name", featuredProduct.name],
  ["SKU", featuredProduct.sku],
  ["Materials composition", featuredProduct.materials],
  ["Country of origin", featuredProduct.origin],
  ["Care instructions", featuredProduct.care],
  ["Repair information", featuredProduct.repair],
  ["Recycling guidance", featuredProduct.recycling],
  ["Safety notes", featuredProduct.safety],
];

function QrMark() {
  return (
    <div className="grid aspect-square grid-cols-5 gap-1 rounded-md bg-white p-2">
      {Array.from({ length: 25 }).map((_, index) => (
        <span
          className={
            [0, 1, 2, 5, 10, 12, 14, 18, 20, 21, 22, 24].includes(index)
              ? "bg-[#17211b]"
              : "bg-[#dfe5dc]"
          }
          key={index}
        />
      ))}
    </div>
  );
}

export default function ProductWizardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17211b]">
      <header className="border-b border-[#dfe5dc] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link className="text-sm font-semibold text-[#2455a4]" href="/dashboard">
              ← Back to dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">
              {featuredProduct.name}
            </h1>
            <p className="mt-1 text-sm text-[#6b746d]">
              {featuredProduct.sku} · {featuredProduct.category} ·{" "}
              {featuredProduct.brand}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" aria-hidden="true" />
                Save draft
              </span>
            </button>
            <Link
              className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold"
              href="/p/linen-overshirt"
            >
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" aria-hidden="true" />
                Preview QR page
              </span>
            </Link>
            <button className="rounded-md bg-[#17211b] px-4 py-2 text-sm font-semibold text-white">
              <span className="flex items-center gap-2">
                <QrCode className="h-4 w-4" aria-hidden="true" />
                Publish passport
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 xl:grid-cols-[220px_1fr_360px]">
        <aside className="h-fit rounded-lg border border-[#dfe5dc] bg-white p-3">
          <div className="px-2 py-2">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <FileCheck2 className="h-4 w-4 text-[#2455a4]" />
              Passport wizard
            </p>
            <p className="mt-1 text-xs text-[#6b746d]">
              {featuredProduct.readiness}% complete
            </p>
          </div>
          <div className="mt-3 space-y-1">
            {steps.map(([step, state]) => (
              <a
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                  step === "Recycling"
                    ? "bg-[#fff6df] font-semibold text-[#8a5b00]"
                    : "text-[#526057] hover:bg-[#f7f8f5]"
                }`}
                href="#"
                key={step}
              >
                {step}
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    state === "Complete" ? "bg-[#2f9d62]" : "bg-[#d39b2a]"
                  }`}
                />
              </a>
            ))}
          </div>
        </aside>

        <section className="rounded-lg border border-[#dfe5dc] bg-white">
          <div className="border-b border-[#dfe5dc] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2455a4]">
                  EU readiness step
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Recycling and safety details
                </h2>
              </div>
              <span className="flex w-fit items-center gap-2 rounded-full bg-[#fff6df] px-3 py-1 text-sm font-semibold text-[#8a5b00]">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                2 fields need review
              </span>
            </div>
          </div>

          <div className="border-b border-[#dfe5dc] bg-[#fbfcfa] p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-[#edf3ff] p-2 text-[#2455a4]">
                <Globe2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold">EU deadline tracker</p>
                <p className="mt-1 text-sm leading-6 text-[#526057]">
                  Complete this passport before November 28, 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            {fields.map(([label, value]) => (
              <label className="block" key={label}>
                <span className="text-sm font-semibold">{label}</span>
                <textarea
                  className="mt-2 min-h-24 w-full resize-none rounded-md border border-[#cfd8cf] bg-[#fbfcfa] px-3 py-3 text-sm leading-6 outline-none focus:border-[#2455a4]"
                  defaultValue={value}
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#dfe5dc] p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#6b746d]">
              Changes are saved to the draft passport before publishing.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-md border border-[#c7d2c4] bg-white px-4 py-2 text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download QR label
                </span>
              </button>
              <button className="rounded-md bg-[#2455a4] px-4 py-2 text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Mark fields complete
                </span>
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-lg border border-[#dfe5dc] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <QrCode className="h-4 w-4 text-[#2455a4]" />
                  Live passport preview
                </p>
                <p className="text-xs text-[#6b746d]">
                  Customer-facing QR page
                </p>
              </div>
              <span className="rounded-full bg-[#edf3ff] px-2 py-1 text-xs font-semibold text-[#2455a4]">
                Draft
              </span>
            </div>

            <div className="rounded-[28px] border border-[#dfe5dc] bg-[#f7f8f5] p-3">
              <div className="overflow-hidden rounded-[22px] bg-white">
                <div
                  className="h-36"
                  style={{ backgroundColor: featuredProduct.color }}
                />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2455a4]">
                    Product passport
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {featuredProduct.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#6b746d]">
                    {featuredProduct.passportId} · {featuredProduct.origin}
                  </p>
                  <div className="mt-4 grid grid-cols-[72px_1fr] gap-3">
                    <QrMark />
                    <div className="text-sm leading-6 text-[#526057]">
                      {featuredProduct.materials}
                      <br />
                      Updated {featuredProduct.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              className="mt-4 block rounded-md bg-[#17211b] px-4 py-3 text-center text-sm font-semibold text-white"
              href="/p/linen-overshirt"
            >
              Open public page
            </Link>
          </div>

          <DeadlineTimer />

          <div className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-[#237047]" />
              Audit trail
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#526057]">
              <p>Materials completed from supplier sheet.</p>
              <p>Origin confirmed by production invoice.</p>
              <p>
                <Recycle className="mr-2 inline h-4 w-4 text-[#8a5b00]" />
                Recycling guidance still needs brand approval.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
