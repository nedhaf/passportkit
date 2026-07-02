import Link from "next/link";
import {
  BadgeCheck,
  FileCheck2,
  MapPin,
  Recycle,
  ShieldCheck,
  Shirt,
  Wrench,
} from "lucide-react";
import { DeadlineTimer } from "@/components/deadline-timer";
import { HowItWorksMotion } from "@/components/how-it-works-motion";
import { LandingExperience } from "@/components/landing-experience";

const passportSections = [
  { label: "Materials", icon: Shirt },
  { label: "Care instructions", icon: FileCheck2 },
  { label: "Origin", icon: MapPin },
  { label: "Repair notes", icon: Wrench },
  { label: "Recycling", icon: Recycle },
  { label: "Safety notes", icon: ShieldCheck },
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
              EU-ready QR product passports for small fashion brands.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526057] md:text-xl">
              Import products, complete missing details, and publish
              mobile-friendly passport pages for materials, care, origin,
              repair, and recycling information before your EU readiness
              deadline.
            </p>
            <div className="mt-6 max-w-xl">
              <DeadlineTimer />
            </div>
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

          <LandingExperience />
        </div>
      </section>

      <HowItWorksMotion />

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
            {passportSections.map(({ label, icon: Icon }) => (
              <div
                className="flex items-center gap-3 rounded-md border border-[#dfe5dc] bg-white p-4 text-sm font-semibold"
                key={label}
              >
                <Icon className="h-4 w-4 text-[#237047]" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17211b] px-6 py-16 text-white" id="readiness">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              EU readiness target: November 28, 2026
            </div>
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
