"use client";

import {
  BadgeCheck,
  FileCheck2,
  MapPin,
  QrCode,
  Recycle,
  ShieldCheck,
  Shirt,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const steps = [
  {
    title: "Import product data",
    body: "Shopify fields, SKUs, descriptions, images, and variants become structured passport records.",
    icon: Upload,
    progress: 32,
  },
  {
    title: "Complete missing fields",
    body: "Materials, origin, care, repair, recycling, and safety notes move into a guided readiness checklist.",
    icon: FileCheck2,
    progress: 72,
  },
  {
    title: "Publish QR passport",
    body: "A shopper-facing passport page and QR label are generated from the completed product record.",
    icon: QrCode,
    progress: 100,
  },
];

const floatingFields = [
  { label: "Materials", icon: Shirt, startX: -190, startY: -118, endX: -38, endY: -64 },
  { label: "Origin", icon: MapPin, startX: 170, startY: -98, endX: 42, endY: -18 },
  { label: "Recycling", icon: Recycle, startX: -175, startY: 112, endX: -36, endY: 40 },
  { label: "Safety", icon: ShieldCheck, startX: 168, startY: 122, endX: 44, endY: 88 },
];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function QrMark({ progress }: { progress: number }) {
  return (
    <div className="grid aspect-square grid-cols-6 gap-1 rounded-lg bg-white p-3">
      {Array.from({ length: 36 }).map((_, index) => (
        <span
          className={`rounded-sm transition-colors duration-300 ${
            (index + Math.round(progress * 10)) % 4 === 0 ||
            [0, 1, 6, 7, 28, 29, 34, 35].includes(index)
              ? "bg-[#17211b]"
              : "bg-[#dfe5dc]"
          }`}
          key={index}
        />
      ))}
    </div>
  );
}

export function HowItWorksMotion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const next = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
      setProgress(next);
    }

    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = useMemo(() => {
    if (progress < 0.34) {
      return 0;
    }

    if (progress < 0.68) {
      return 1;
    }

    return 2;
  }, [progress]);

  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;
  const assembleProgress = clamp((progress - 0.18) / 0.48);
  const publishProgress = clamp((progress - 0.62) / 0.3);

  return (
    <section ref={sectionRef} className="bg-white px-6" id="workflow">
      <div className="mx-auto max-w-7xl py-16">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              From Shopify catalog to EU QR passport.
            </h2>
          </div>
          <p className="max-w-2xl leading-8 text-[#526057]">
            Scroll this section to see product information move from raw store
            data into a completed passport record, then into a QR page customers
            can scan.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="grid gap-4">
            {steps.map(({ title, body, icon: Icon }) => (
              <div
                className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-6"
                key={title}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#526057]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-h-[250vh] lg:grid lg:grid-cols-[0.78fr_1fr] lg:gap-12">
          <div className="space-y-[42vh] py-[20vh]">
            {steps.map(({ title, body, icon: Icon }, index) => (
              <article
                className={`rounded-lg border p-6 transition-all duration-500 ${
                  activeIndex === index
                    ? "border-[#b9c9b6] bg-[#f7f8f5] opacity-100 shadow-lg shadow-[#23432f]/10"
                    : "border-transparent bg-white opacity-45"
                }`}
                key={title}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2455a4]">
                  Step 0{index + 1}
                </p>
                <h3 className="mt-3 text-3xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#526057]">
                  {body}
                </p>
              </article>
            ))}
          </div>

          <div className="sticky top-8 flex h-[calc(100vh-4rem)] items-center">
            <div className="relative h-[640px] w-full overflow-hidden rounded-[28px] border border-[#dfe5dc] bg-[#f7f8f5] p-6 shadow-2xl shadow-[#23432f]/10">
              <div
                className="absolute left-0 top-0 h-1 bg-[#2f9d62]"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <ActiveIcon className="h-4 w-4 text-[#2455a4]" />
                  {activeStep.title}
                </span>
                <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
                  {activeStep.progress}% ready
                </span>
              </div>

              <div className="absolute left-7 top-24 w-52 rounded-lg border border-[#dfe5dc] bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                  Shopify import
                </p>
                <p className="mt-3 text-lg font-semibold">Linen Overshirt</p>
                <p className="mt-1 text-sm text-[#526057]">LOS-001 · Apparel</p>
                <div className="mt-4 h-2 rounded-full bg-[#edf1ea]">
                  <div
                    className="h-2 rounded-full bg-[#2455a4]"
                    style={{ width: `${mix(28, 100, assembleProgress)}%` }}
                  />
                </div>
              </div>

              <div
                className="absolute left-1/2 top-48 h-72 w-72 -translate-x-1/2 rounded-[24px] border border-[#dfe5dc] bg-white p-5 shadow-xl transition-transform duration-200"
                style={{
                  transform: `translateX(-50%) scale(${mix(0.92, 1.05, publishProgress)})`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2455a4]">
                  Passport record
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Linen Overshirt</h3>
                <div className="mt-5 space-y-2">
                  {["Materials", "Origin", "Care", "Repair", "Recycling", "Safety"].map(
                    (item, index) => {
                      const done = assembleProgress > index / 7;
                      return (
                        <div
                          className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors duration-300 ${
                            done
                              ? "border-[#d7e8d8] bg-[#eef6ef] text-[#237047]"
                              : "border-[#ead7a2] bg-[#fff8e8] text-[#8a5b00]"
                          }`}
                          key={item}
                        >
                          <span className="font-semibold">{item}</span>
                          {done ? (
                            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <span>Missing</span>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {floatingFields.map(({ label, icon: Icon, startX, startY, endX, endY }) => {
                const x = mix(startX, endX, assembleProgress);
                const y = mix(startY, endY, assembleProgress);
                const scale = mix(1, 0.82, assembleProgress);

                return (
                  <div
                    className="absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full border border-[#dfe5dc] bg-white px-3 py-2 text-sm font-semibold shadow-lg shadow-[#23432f]/10"
                    key={label}
                    style={{
                      opacity: mix(1, 0.42, assembleProgress),
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                    }}
                  >
                    <Icon className="h-4 w-4 text-[#237047]" aria-hidden="true" />
                    {label}
                  </div>
                );
              })}

              <div
                className="absolute bottom-7 right-7 w-52 rounded-[22px] bg-[#17211b] p-4 text-white shadow-xl transition-transform duration-200"
                style={{
                  opacity: mix(0.35, 1, publishProgress),
                  transform: `translateY(${mix(44, 0, publishProgress)}px) scale(${mix(
                    0.88,
                    1,
                    publishProgress,
                  )})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">QR passport</span>
                  <QrCode className="h-4 w-4 text-white/70" />
                </div>
                <div className="relative mt-4 overflow-hidden rounded-lg">
                  <QrMark progress={progress} />
                  <span
                    className="absolute inset-x-0 h-0.5 bg-[#2f9d62]"
                    style={{ top: `${mix(8, 88, publishProgress)}%` }}
                  />
                </div>
                <p className="mt-4 text-xs leading-5 text-white/70">
                  Scan-ready passport page for EU product information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#dfe5dc] bg-[#f7f8f5] p-5">
          <div className="grid gap-5 md:grid-cols-[220px_1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold">Example use case</p>
              <p className="mt-1 text-sm text-[#6b746d]">Linen Overshirt</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                "Import product from Shopify",
                "Fill recycling and safety notes",
                "Publish QR passport page",
              ].map((item) => (
                <div
                  className="rounded-md border border-[#dfe5dc] bg-white px-3 py-2 text-sm font-medium text-[#526057]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <a
              className="rounded-md bg-[#17211b] px-4 py-2 text-center text-sm font-semibold text-white"
              href="/products/linen-overshirt"
            >
              Try the flow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
