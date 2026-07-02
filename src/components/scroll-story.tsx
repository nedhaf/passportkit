"use client";

import {
  BadgeCheck,
  FileCheck2,
  Globe2,
  QrCode,
  Recycle,
  ScanLine,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const storySteps = [
  {
    kicker: "Step 01",
    title: "Import your product catalog.",
    copy: "Start with Shopify data and turn scattered product details into structured passport records.",
    icon: ScanLine,
    status: "CSV imported",
    progress: 34,
  },
  {
    kicker: "Step 02",
    title: "Complete EU readiness fields.",
    copy: "Materials, origin, care, repair, recycling, and safety notes become a guided checklist.",
    icon: FileCheck2,
    status: "4 of 6 fields ready",
    progress: 72,
  },
  {
    kicker: "Step 03",
    title: "Publish a QR passport.",
    copy: "Generate a shopper-facing page and QR label that make product information easy to scan.",
    icon: QrCode,
    status: "QR page live",
    progress: 100,
  },
];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function QrVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="grid aspect-square grid-cols-6 gap-1 rounded-xl bg-white p-4 shadow-sm">
      {Array.from({ length: 36 }).map((_, index) => (
        <span
          className={`rounded-sm transition-colors duration-500 ${
            (index + activeIndex) % 4 === 0 ||
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

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? clamp(-rect.top / scrollable) : clamp(-rect.top);
      setProgress(nextProgress);
    }

    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    }

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

  const activeStep = storySteps[activeIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section ref={sectionRef} className="relative bg-white px-6" id="scroll-demo">
      <div className="mx-auto max-w-7xl py-16 lg:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
            Scroll demo
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.01em] md:text-5xl">
            Watch a product passport assemble as you scroll.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-8 lg:py-24">
            {storySteps.map(({ kicker, title, copy, icon: Icon }, index) => (
              <article
                className={`min-h-[48vh] rounded-lg border p-6 transition-all duration-500 lg:min-h-[62vh] ${
                  index === activeIndex
                    ? "border-[#b9c9b6] bg-[#f7f8f5] opacity-100 shadow-lg shadow-[#23432f]/10"
                    : "border-transparent bg-white opacity-45"
                }`}
                key={title}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2455a4]">
                  {kicker}
                </p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight">
                  {title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#526057]">
                  {copy}
                </p>
              </article>
            ))}
          </div>

          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <div className="flex h-full items-center">
              <div className="relative w-full overflow-hidden rounded-[28px] border border-[#dfe5dc] bg-[#f7f8f5] p-5 shadow-2xl shadow-[#23432f]/10">
                <div
                  className="absolute left-0 top-0 h-1 bg-[#2f9d62] transition-all duration-300"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
                <div className="grid gap-5 md:grid-cols-[1fr_260px]">
                  <div className="rounded-2xl border border-[#dfe5dc] bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <ActiveIcon className="h-4 w-4 text-[#2455a4]" />
                        {activeStep.status}
                      </span>
                      <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
                        {activeStep.progress}%
                      </span>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#edf1ea]">
                      <div
                        className="h-full rounded-full bg-[#2f9d62] transition-all duration-700"
                        style={{ width: `${activeStep.progress}%` }}
                      />
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        ["Materials", true],
                        ["Origin", activeIndex >= 1],
                        ["Care", activeIndex >= 1],
                        ["Repair", activeIndex >= 1],
                        ["Recycling", activeIndex >= 2],
                        ["Safety", activeIndex >= 2],
                      ].map(([label, done]) => (
                        <div
                          className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors duration-500 ${
                            done
                              ? "border-[#d7e8d8] bg-[#eef6ef] text-[#237047]"
                              : "border-[#ead7a2] bg-[#fff8e8] text-[#8a5b00]"
                          }`}
                          key={String(label)}
                        >
                          <span className="font-semibold">{label}</span>
                          {done ? (
                            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <span>Pending</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#17211b] p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">QR passport</span>
                      <Globe2 className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="mt-5">
                      <QrVisual activeIndex={activeIndex} />
                    </div>
                    <div className="mt-5 rounded-xl bg-white/10 p-4">
                      <p className="text-sm font-semibold">Linen Overshirt</p>
                      <p className="mt-2 text-xs leading-5 text-white/70">
                        EU product information updates from draft to published
                        as the readiness checklist completes.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 p-3 text-xs text-white/80">
                      <Recycle className="h-4 w-4" aria-hidden="true" />
                      Recycling and safety fields unlock the final QR state.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
