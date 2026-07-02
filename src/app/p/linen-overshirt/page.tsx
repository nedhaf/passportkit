import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  Globe2,
  MapPin,
  QrCode,
  Recycle,
  ShieldCheck,
  Shirt,
  Wrench,
} from "lucide-react";
import { DeadlineTimer } from "@/components/deadline-timer";
import { T } from "@/components/i18n-text";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { featuredProduct } from "@/lib/products";

const details = [
  { label: "Materials", value: featuredProduct.materials, icon: Shirt },
  { label: "Origin", value: featuredProduct.origin, icon: MapPin },
  { label: "Care", value: featuredProduct.care, icon: FileCheck2 },
  { label: "Repair", value: featuredProduct.repair, icon: Wrench },
  { label: "Recycling", value: featuredProduct.recycling, icon: Recycle },
  { label: "Safety", value: featuredProduct.safety, icon: ShieldCheck },
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
          <div className="flex items-center justify-between">
            <Logo />
            <LanguageSwitcher />
          </div>
          <div className="mt-16 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              <T k="public.kicker" />
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">
              <T k="public.title" />
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#526057]">
              <T k="public.body" />
            </p>
            <div className="mt-8">
              <DeadlineTimer compact />
            </div>
            <Link
              className="mt-8 inline-block rounded-md border border-[#c7d2c4] bg-white px-5 py-3 text-sm font-semibold"
              href="/products/linen-overshirt"
            >
              <T k="public.back" />
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
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#17211b]">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <T k="public.badge" />
                </div>
                <div className="w-20 rounded-lg bg-white/90 p-2">
                  <QrMark />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              <T k="public.passport" />
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              {featuredProduct.name}
            </h1>
            <p className="mt-2 text-sm text-[#6b746d]">
              {featuredProduct.brand} · Passport ID:{" "}
              {featuredProduct.passportId}
            </p>

            <div className="mt-6 space-y-3">
              {details.map(({ label, value, icon: Icon }) => (
                <section
                  className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-4"
                  key={label}
                >
                  <h2 className="flex items-center gap-2 text-sm font-semibold">
                    <Icon className="h-4 w-4 text-[#237047]" aria-hidden="true" />
                    {label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#526057]">
                    {value}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-[#17211b] p-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    <T k="public.lastUpdated" />
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    {featuredProduct.lastUpdated}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#2f9d62] px-3 py-1 text-xs font-semibold">
                  <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <T k="public.active" />
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-[#dfe5dc] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-[#edf3ff] p-2 text-[#2455a4]">
                  <QrCode className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    <T k="public.deadline" />
                  </p>
                  <p className="mt-1 text-xs text-[#6b746d]">
                    <T k="public.deadlineBody" />
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-[#6b746d]">
              <T k="public.powered" />
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
