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
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const steps = [
  {
    title: "workflow.import.title",
    body: "workflow.import.body",
    icon: Upload,
    progress: 32,
  },
  {
    title: "workflow.complete.title",
    body: "workflow.complete.body",
    icon: FileCheck2,
    progress: 72,
  },
  {
    title: "workflow.publish.title",
    body: "workflow.publish.body",
    icon: QrCode,
    progress: 100,
  },
] satisfies {
  title: TranslationKey;
  body: TranslationKey;
  icon: LucideIcon;
  progress: number;
}[];

const checklist = [
  { label: "passport.materials", icon: Shirt },
  { label: "passport.origin", icon: MapPin },
  { label: "passport.careInstructions", icon: FileCheck2 },
  { label: "passport.repairNotes", icon: BadgeCheck },
  { label: "passport.recycling", icon: Recycle },
  { label: "passport.safetyNotes", icon: ShieldCheck },
] satisfies { label: TranslationKey; icon: LucideIcon }[];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function QrMark({ active }: { active: boolean }) {
  return (
    <div className="grid aspect-square grid-cols-6 gap-1 rounded-lg bg-white p-3">
      {Array.from({ length: 36 }).map((_, index) => (
        <span
          className={`rounded-sm transition-colors duration-500 ${
            active && ((index + 2) % 4 === 0 || [0, 1, 6, 7, 28, 29, 34, 35].includes(index))
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
  const { t } = useLanguage();

  useEffect(() => {
    let frame = 0;

    function update() {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setProgress(scrollable > 0 ? clamp(-rect.top / scrollable) : 0);
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
    if (progress < 0.34) return 0;
    if (progress < 0.68) return 1;
    return 2;
  }, [progress]);

  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;
  const importStage = clamp(progress / 0.32);
  const completeStage = clamp((progress - 0.28) / 0.36);
  const publishStage = clamp((progress - 0.64) / 0.28);
  const readyPercent = Math.round(mix(32, 100, clamp(progress / 0.82)));

  return (
    <section ref={sectionRef} className="bg-white px-6" id="workflow">
      <div className="mx-auto max-w-7xl py-16">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2455a4]">
              {t("workflow.kicker")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t("workflow.title")}
            </h2>
          </div>
          <p className="max-w-2xl leading-8 text-[#526057]">
            {t("workflow.body")}
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
                <h3 className="text-xl font-semibold">{t(title)}</h3>
                <p className="mt-3 leading-7 text-[#526057]">{t(body)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-h-[220vh] lg:grid lg:grid-cols-[0.78fr_1fr] lg:gap-12">
          <div className="space-y-[36vh] py-[18vh]">
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
                  {t("workflow.stepLabel")} 0{index + 1}
                </p>
                <h3 className="mt-3 text-3xl font-semibold">{t(title)}</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#526057]">
                  {t(body)}
                </p>
              </article>
            ))}
          </div>

          <div className="sticky top-8 flex h-[calc(100vh-4rem)] items-center">
            <div className="relative h-[620px] w-full overflow-hidden rounded-[28px] border border-[#dfe5dc] bg-[#f7f8f5] p-6 shadow-2xl shadow-[#23432f]/10">
              <div
                className="absolute left-0 top-0 h-1 bg-[#2f9d62] transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <ActiveIcon className="h-4 w-4 text-[#2455a4]" />
                  {t(activeStep.title)}
                </span>
                <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
                  {readyPercent}% {t("demo.ready")}
                </span>
              </div>

              <div className="mt-7 grid h-[520px] grid-cols-3 gap-4">
                <div
                  className="rounded-2xl border border-[#dfe5dc] bg-white p-4 shadow-sm transition-all duration-300"
                  style={{
                    opacity: mix(1, 0.55, completeStage),
                    transform: `translateX(${mix(0, 10, importStage)}px)`,
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#edf3ff] text-[#2455a4]">
                    <Upload className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                    {t("workflow.shopifyImport")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">Linen Overshirt</h3>
                  <p className="mt-1 text-sm text-[#526057]">LOS-001 · Apparel</p>
                  <div className="mt-5 space-y-2">
                    {["SKU", "Product title", "Image", "Description"].map((item) => (
                      <div
                        className="rounded-md border border-[#edf1ea] bg-[#fbfcfa] px-3 py-2 text-sm font-medium text-[#526057]"
                        key={item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl border border-[#dfe5dc] bg-white p-4 shadow-sm transition-all duration-300"
                  style={{
                    opacity: mix(0.62, 1, completeStage),
                    transform: `translateY(${mix(18, 0, completeStage)}px)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                      <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                      <span className="rounded-full bg-[#fff8e8] px-2 py-1 text-xs font-semibold text-[#8a5b00]">
                      checklist
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746d]">
                    {t("workflow.passportRecord")}
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#edf1ea]">
                    <div
                      className="h-full rounded-full bg-[#2f9d62] transition-[width] duration-200"
                      style={{ width: `${readyPercent}%` }}
                    />
                  </div>
                  <div className="mt-5 space-y-2">
                    {checklist.map(({ label, icon: Icon }, index) => {
                      const done = progress > 0.18 + index * 0.09;
                      return (
                        <div
                          className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors duration-300 ${
                            done
                              ? "border-[#d7e8d8] bg-[#eef6ef] text-[#237047]"
                              : "border-[#ead7a2] bg-[#fff8e8] text-[#8a5b00]"
                          }`}
                          key={label}
                        >
                          <span className="flex items-center gap-2 font-semibold">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {t(label)}
                          </span>
                          {done ? (
                            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <span>{t("demo.missing")}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="rounded-2xl bg-[#17211b] p-4 text-white shadow-sm transition-all duration-300"
                  style={{
                    opacity: mix(0.42, 1, publishStage),
                    transform: `translateY(${mix(28, 0, publishStage)}px)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white">
                      <QrCode className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-[#2f9d62] px-2 py-1 text-xs font-semibold">
                      {publishStage > 0.75 ? "live" : "draft"}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    {t("workflow.qrPassport")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">
                    {t("workflow.publicPage")}
                  </h3>
                  <div className="relative mt-5 overflow-hidden rounded-lg">
                    <QrMark active={publishStage > 0.35} />
                    <span
                      className="absolute inset-x-0 h-0.5 bg-[#2f9d62] transition-[top] duration-200"
                      style={{ top: `${mix(10, 88, publishStage)}%` }}
                    />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-white/70">
                    {t("workflow.scanReady")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#dfe5dc] bg-[#f7f8f5] p-5">
          <div className="grid gap-5 md:grid-cols-[220px_1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold">
                {t("workflow.exampleUseCase")}
              </p>
              <p className="mt-1 text-sm text-[#6b746d]">Linen Overshirt</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                "workflow.useCase.import",
                "workflow.useCase.complete",
                "workflow.useCase.publish",
              ].map((item) => (
                <div
                  className="rounded-md border border-[#dfe5dc] bg-white px-3 py-2 text-sm font-medium text-[#526057]"
                  key={item}
                >
                  {t(item as TranslationKey)}
                </div>
              ))}
            </div>
            <a
              className="rounded-md bg-[#17211b] px-4 py-2 text-center text-sm font-semibold text-white"
              href="/products/linen-overshirt"
            >
              {t("workflow.tryFlow")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
