"use client";

import Image from "next/image";
import { FileCheck2, QrCode, Upload, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const steps = [
  {
    title: "workflow.import.title",
    body: "workflow.import.body",
    icon: Upload,
    color: "text-[#2455a4]",
  },
  {
    title: "workflow.complete.title",
    body: "workflow.complete.body",
    icon: FileCheck2,
    color: "text-[#237047]",
  },
  {
    title: "workflow.publish.title",
    body: "workflow.publish.body",
    icon: QrCode,
    color: "text-[#17211b]",
  },
] satisfies {
  title: TranslationKey;
  body: TranslationKey;
  icon: LucideIcon;
  color: string;
}[];

const garments = [
  {
    src: "/clothing/tshirt.svg",
    alt: "T-shirt",
    left: 48,
    top: 30,
    startX: -44,
    startY: -80,
    endX: -7,
    endY: -14,
    startRotate: -18,
    endRotate: 3,
    startScale: 0.72,
    endScale: 1.16,
    width: "clamp(150px, 18vw, 300px)",
    delay: 0,
  },
  {
    src: "/clothing/jeans.svg",
    alt: "Jeans",
    left: 47,
    top: 48,
    startX: 45,
    startY: 96,
    endX: 8,
    endY: 26,
    startRotate: 21,
    endRotate: -4,
    startScale: 0.72,
    endScale: 1.08,
    width: "clamp(140px, 17vw, 280px)",
    delay: 0.08,
  },
  {
    src: "/clothing/dress.svg",
    alt: "Dress",
    left: 28,
    top: 44,
    startX: -26,
    startY: 66,
    endX: -16,
    endY: 16,
    startRotate: 14,
    endRotate: -8,
    startScale: 0.62,
    endScale: 0.94,
    width: "clamp(120px, 14vw, 240px)",
    delay: 0.16,
  },
  {
    src: "/clothing/coat.svg",
    alt: "Coat",
    left: 70,
    top: 38,
    startX: 32,
    startY: -60,
    endX: 15,
    endY: -4,
    startRotate: -13,
    endRotate: 8,
    startScale: 0.6,
    endScale: 0.96,
    width: "clamp(120px, 15vw, 250px)",
    delay: 0.24,
  },
  {
    src: "/clothing/socks.svg",
    alt: "Socks",
    left: 22,
    top: 22,
    startX: -34,
    startY: -42,
    endX: -4,
    endY: -8,
    startRotate: -24,
    endRotate: 13,
    startScale: 0.54,
    endScale: 0.78,
    width: "clamp(90px, 10vw, 170px)",
    delay: 0.32,
  },
  {
    src: "/clothing/yarn.svg",
    alt: "Yarn",
    left: 76,
    top: 65,
    startX: 38,
    startY: 42,
    endX: 3,
    endY: 14,
    startRotate: 26,
    endRotate: -16,
    startScale: 0.52,
    endScale: 0.82,
    width: "clamp(90px, 11vw, 180px)",
    delay: 0.4,
  },
];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function garmentStyle(
  garment: (typeof garments)[number],
  progress: number,
  index: number,
) {
  const gather = clamp((progress - garment.delay) / 0.7);
  const publish = clamp((progress - 0.68) / 0.26);
  const wave = Math.sin((progress * 2.4 + index * 0.18) * Math.PI) * 10;
  const x = mix(garment.startX, garment.endX, gather) + wave;
  const y = mix(garment.startY, garment.endY, gather) - publish * 24;
  const rotate = mix(garment.startRotate, garment.endRotate, gather);
  const scale = mix(garment.startScale, garment.endScale, gather);
  const opacity = mix(0.7, 1, gather);

  return {
    left: `${garment.left}%`,
    top: `${garment.top}%`,
    width: garment.width,
    opacity,
    transform: `translate3d(${x}vw, ${y}px, 0) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
  };
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
  const readyPercent = Math.round(mix(32, 100, clamp(progress / 0.82)));

  return (
    <section ref={sectionRef} className="bg-white" id="workflow">
      <div className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
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

          <div className="mt-10 grid gap-4 lg:hidden">
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
            <div className="grid grid-cols-3 gap-3 rounded-lg border border-[#dfe5dc] bg-[#f7f8f5] p-4">
              {garments.slice(0, 3).map((garment) => (
                <Image
                  alt={garment.alt}
                  className="mx-auto h-24 w-24 object-contain"
                  height={96}
                  key={garment.src}
                  src={garment.src}
                  width={96}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-[280vh] lg:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f7f8f5]">
          <div
            className="absolute left-0 top-0 h-1 bg-[#2f9d62]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />

          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[56vh] w-[56vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dfe5dc] bg-white/70 shadow-2xl shadow-[#23432f]/10" />
            <div className="absolute left-1/2 top-1/2 h-[34vh] w-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ead7a2] bg-[#fff8e8]/55" />
          </div>

          <div className="absolute inset-0">
            {garments.map((garment, index) => (
              <Image
                alt={garment.alt}
                className="absolute drop-shadow-2xl transition-opacity duration-200 will-change-transform"
                height={320}
                key={garment.src}
                src={garment.src}
                style={garmentStyle(garment, progress, index)}
                width={320}
              />
            ))}
          </div>

          <div className="absolute left-8 top-8 max-w-[430px] rounded-lg border border-[#dfe5dc] bg-white/92 p-6 shadow-xl shadow-[#23432f]/10 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-[#17211b]">
                <ActiveIcon className={`h-4 w-4 ${activeStep.color}`} />
                {t(activeStep.title)}
              </span>
              <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
                {readyPercent}% {t("demo.ready")}
              </span>
            </div>
            <p className="mt-4 text-lg leading-8 text-[#526057]">
              {t(activeStep.body)}
            </p>
          </div>

          <div className="absolute inset-x-8 bottom-8">
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3">
              {steps.map(({ title, icon: Icon }, index) => (
                <div
                  className={`rounded-lg border p-4 transition-all duration-300 ${
                    activeIndex === index
                      ? "border-[#b9c9b6] bg-white text-[#17211b] shadow-lg shadow-[#23432f]/10"
                      : "border-[#dfe5dc] bg-white/72 text-[#526057]"
                  }`}
                  key={title}
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#eef6ef] text-[#237047]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2455a4]">
                    {t("workflow.stepLabel")} 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{t(title)}</h3>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-4 max-w-5xl text-xs text-[#6b746d]">
              {t("workflow.graphicsCredit")}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
