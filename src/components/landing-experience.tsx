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
import { products } from "@/lib/products";

const readinessFields = [
  { label: "Materials", icon: Shirt },
  { label: "Origin", icon: MapPin },
  { label: "Care", icon: FileCheck2 },
  { label: "Repair", icon: Wrench },
  { label: "Recycling", icon: Recycle },
  { label: "Safety", icon: ShieldCheck },
];

function initialFields(productName: string) {
  return Object.fromEntries(
    readinessFields.map((field) => [
      field.label,
      productName === "Linen Overshirt"
        ? !["Recycling", "Safety"].includes(field.label)
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
              Interactive EU readiness demo
            </p>
            <p className="text-xs text-[#6b746d]">
              Pick a product and complete passport fields.
            </p>
          </div>
          <span className="rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#237047]">
            {readiness}% ready
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
            <p className="text-sm font-semibold">Passport fields</p>
            <p className="text-xs text-[#6b746d]">
              {completedCount}/{readinessFields.length} complete
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#edf1ea]">
            <div
              className="h-full rounded-full bg-[#2f9d62] transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {readinessFields.map(({ label, icon: Icon }) => (
              <button
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition ${
                  checked[label]
                    ? "border-[#d7e8d8] bg-[#eef6ef] text-[#237047]"
                    : "border-[#ead7a2] bg-[#fff6df] text-[#8a5b00]"
                }`}
                key={label}
                onClick={() =>
                  setChecked((current) => ({
                    ...current,
                    [label]: !current[label],
                  }))
                }
                type="button"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <span>{checked[label] ? "Done" : "Missing"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 right-6 hidden w-72 rounded-lg border border-[#dfe5dc] bg-[#17211b] p-4 text-white shadow-xl md:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <QrCode className="h-4 w-4" />
            Live QR passport
          </span>
          <span className="rounded-full bg-[#2f9d62] px-2 py-1 text-xs">
            Updating
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
              {selectedProduct.materials}. {readiness}% ready for EU passport
              publishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
