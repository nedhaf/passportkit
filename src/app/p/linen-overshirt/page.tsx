import Link from "next/link";
import { featuredProduct } from "@/lib/products";

const details = [
  ["Materials", featuredProduct.materials],
  ["Origin", featuredProduct.origin],
  ["Care", featuredProduct.care],
  ["Repair", featuredProduct.repair],
  ["Recycling", featuredProduct.recycling],
  ["Safety", featuredProduct.safety],
];

function QrMark() {
  return (
    <div className="grid aspect-square grid-cols-5 gap-1 rounded-lg bg-white p-2">
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

export default function PublicPassportPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-6 text-[#17211b]">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <section className="hidden pt-8 lg:block">
          <Link className="text-lg font-semibold" href="/">
            PassportKit
          </Link>
          <div className="mt-16 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              Public QR preview
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">
              A shopper-facing product passport page.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#526057]">
              This is the page a customer sees after scanning the QR code on a
              garment label. It stays simple, readable, and brand-safe.
            </p>
            <Link
              className="mt-8 inline-block rounded-md border border-[#c7d2c4] bg-white px-5 py-3 text-sm font-semibold"
              href="/products/linen-overshirt"
            >
              Back to wizard
            </Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] border border-[#dfe5dc] bg-white shadow-xl shadow-[#23432f]/10">
          <div className="p-4">
            <div
              className="h-72 rounded-[24px]"
              style={{ backgroundColor: featuredProduct.color }}
            >
              <div className="flex h-full items-end justify-between p-5">
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#17211b]">
                  Verified product information
                </div>
                <div className="w-20 rounded-lg bg-white/90 p-2">
                  <QrMark />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              Product passport
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              {featuredProduct.name}
            </h1>
            <p className="mt-2 text-sm text-[#6b746d]">
              {featuredProduct.brand} · Passport ID:{" "}
              {featuredProduct.passportId}
            </p>

            <div className="mt-6 space-y-3">
              {details.map(([label, value]) => (
                <section
                  className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-4"
                  key={label}
                >
                  <h2 className="text-sm font-semibold">{label}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#526057]">
                    {value}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-[#17211b] p-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Last updated</p>
                  <p className="mt-1 text-sm text-white/70">
                    {featuredProduct.lastUpdated}
                  </p>
                </div>
                <span className="rounded-full bg-[#2f9d62] px-3 py-1 text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-[#6b746d]">
              Powered by PassportKit · Readiness support, not legal advice.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
