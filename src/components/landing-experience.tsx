"use client";

import {
  BadgeCheck,
  FileCheck2,
  MapPin,
  QrCode,
  Recycle,
  ScanLine,
  ShieldCheck,
  Shirt,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { products } from "@/lib/products";
import type { TranslationKey } from "@/lib/i18n";

const readinessFields = [
  { label: "passport.materials", id: "Materials", icon: Shirt },
  { label: "passport.origin", id: "Origin", icon: MapPin },
  { label: "passport.careInstructions", id: "Care", icon: FileCheck2 },
  { label: "passport.repairNotes", id: "Repair", icon: Wrench },
  { label: "passport.recycling", id: "Recycling", icon: Recycle },
  { label: "passport.safetyNotes", id: "Safety", icon: ShieldCheck },
] satisfies { label: TranslationKey; id: string; icon: typeof Shirt }[];

function initialFields(productName: string) {
  return Object.fromEntries(
    readinessFields.map((field) => [
      field.id,
      productName === "Linen Overshirt"
        ? !["Recycling", "Safety"].includes(field.id)
        : true,
    ]),
  ) as Record<string, boolean>;
}

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

export function LandingExperience() {
  const { t } = useLanguage();
  const [selectedSku, setSelectedSku] = useState(products[0].sku);
  const selectedProduct =
    products.find((product) => product.sku === selectedSku) ?? products[0];
  const [checked, setChecked] = useState(() =>
    initialFields(selectedProduct.name),
  );

  const completedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked],
  );
  const readiness = Math.round((completedCount / readinessFields.length) * 100);

  function selectProduct(sku: string) {
    const nextProduct = products.find((product) => product.sku === sku);
    if (!nextProduct) {
      return;
    }

    setSelectedSku(sku);
    setChecked(initialFields(nextProduct.name));
  }

  return (
    <div className="relative">
      <div className="rounded-lg border border-[#dfe5dc] bg-white p-4 shadow-xl shadow-[#23432f]/10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ScanLine className="h-4 w-4 text-[#2455a4]" />
              {t("demo.title")}
            </p>
            <p className="text-xs text-[#6b746d]">
              {t("demo.body")}
            </p>
          </div>
          <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
            {readiness}% {t("demo.ready")}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {products.slice(0, 4).map((product) => (
            <button
              className={`grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-md border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                selectedSku === product.sku
                  ? "border-[#2455a4] bg-[#f4f7ff]"
                  : "border-[#e5ebe2] bg-white"
              }`}
              key={product.sku}
              onClick={() => selectProduct(product.sku)}
              type="button"
            >
              <span
                className="h-9 rounded-md"
                style={{ backgroundColor: product.color }}
              />
              <span>
                <span className="block text-sm font-semibold">
                  {product.name}
                </span>
                <span className="text-xs text-[#6b746d]">{product.sku}</span>
              </span>
              {selectedSku === product.sku ? (
                <BadgeCheck className="h-4 w-4 text-[#237047]" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-md border border-[#e5ebe2] bg-[#fbfcfa] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">{t("demo.fields")}</p>
            <p className="text-xs text-[#6b746d]">
              {completedCount}/{readinessFields.length} {t("demo.complete")}
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#edf1ea]">
            <div
              className="h-full rounded-full bg-[#2f9d62] transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {readinessFields.map(({ label, id, icon: Icon }) => (
              <button
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition ${
                  checked[id]
                    ? "border-[#d7e8d8] bg-[#eef6ef] text-[#237047]"
                    : "border-[#ead7a2] bg-[#fff6df] text-[#8a5b00]"
                }`}
                key={id}
                onClick={() =>
                  setChecked((current) => ({
                    ...current,
                    [id]: !current[id],
                  }))
                }
                type="button"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Icon className="h-4 w-4" />
                  {t(label)}
                </span>
                <span>{checked[id] ? t("demo.done") : t("demo.missing")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 right-6 hidden w-72 rounded-lg border border-[#dfe5dc] bg-[#17211b] p-4 text-white shadow-xl md:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <QrCode className="h-4 w-4" />
            {t("demo.liveQr")}
          </span>
          <span className="rounded-full bg-[#2f9d62] px-2 py-1 text-xs">
            {t("demo.updating")}
          </span>
        </div>
        <div className="grid grid-cols-[76px_1fr] gap-3">
          <div className="relative overflow-hidden rounded-md">
            <QrMark />
            <span className="absolute inset-x-0 top-1/2 h-0.5 animate-pulse bg-[#2f9d62]" />
          </div>
          <div>
            <p className="text-sm font-semibold">{selectedProduct.name}</p>
            <p className="mt-1 text-xs text-white/70">
              {selectedProduct.materials}. {readiness}%{" "}
              {t("demo.readyForPublishing")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
