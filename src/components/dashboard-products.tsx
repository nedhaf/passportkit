"use client";

import Link from "next/link";
import { Box, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { T } from "@/components/i18n-text";
import type { TranslationKey } from "@/lib/i18n";
import { products, type Product } from "@/lib/products";

const filters = [
  { label: "dashboard.filterAll", value: "all" },
  { label: "dashboard.filterNeeds", value: "needs" },
  { label: "dashboard.published", value: "published" },
] satisfies { label: TranslationKey; value: string }[];

function qrClass(status: Product["qrStatus"]) {
  if (status === "Published") {
    return "bg-[#eef6ef] text-[#237047]";
  }

  if (status === "Draft") {
    return "bg-[#edf3ff] text-[#2455a4]";
  }

  return "bg-[#f3f4f2] text-[#6b746d]";
}

function productMatchesFilter(product: Product, filter: string) {
  if (filter === "published") {
    return product.qrStatus === "Published";
  }

  if (filter === "needs") {
    return product.readiness < 90;
  }

  return true;
}

export function DashboardProducts() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [product.name, product.sku, product.category, product.origin]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesQuery && productMatchesFilter(product, filter);
    });
  }, [filter, query]);

  return (
    <section className="overflow-hidden rounded-lg border border-[#dfe5dc] bg-white">
      <div className="border-b border-[#dfe5dc] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold">
              <T k="dashboard.products" />
            </h2>
            <p className="text-sm text-[#6b746d]">
              <T k="dashboard.tableBody" />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-w-64 items-center gap-2 rounded-md border border-[#dfe5dc] bg-[#fbfcfa] px-3 py-2 text-sm text-[#526057]">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                className="w-full bg-transparent font-medium outline-none placeholder:text-[#8d978f]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, SKU, origin"
                value={query}
              />
            </label>
            <div className="flex gap-2 text-sm">
              {filters.map((item) => (
                <button
                  className={`rounded-md px-3 py-2 font-medium transition ${
                    filter === item.value
                      ? "bg-[#17211b] text-white"
                      : "border border-[#dfe5dc] bg-white text-[#526057] hover:bg-[#f7f8f5]"
                  }`}
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  type="button"
                >
                  <T k={item.label} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#edf1ea] bg-[#fbfcfa] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6b746d]">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Showing {visibleProducts.length} of {products.length} products
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-[0.12em] text-[#6b746d]">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Readiness</th>
              <th className="px-4 py-3 font-semibold">Missing fields</th>
              <th className="px-4 py-3 font-semibold">QR status</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr
                className="border-t border-[#edf1ea] transition hover:bg-[#fbfcfa]"
                key={product.sku}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-md text-white shadow-sm"
                      style={{ backgroundColor: product.color }}
                    >
                      <Box className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-[#6b746d]">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-[#526057]">
                  {product.category}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-[#edf1ea]">
                      <div
                        className={`h-2 rounded-full ${
                          product.readiness >= 90
                            ? "bg-[#2f9d62]"
                            : product.readiness >= 70
                              ? "bg-[#d39b2a]"
                              : "bg-[#2455a4]"
                        }`}
                        style={{ width: `${product.readiness}%` }}
                      />
                    </div>
                    <span className="font-semibold">{product.readiness}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {product.missingFields.length === 0 ? (
                    <span className="rounded-full bg-[#eef6ef] px-2 py-1 text-xs font-semibold text-[#237047]">
                      <T k="dashboard.complete" />
                    </span>
                  ) : (
                    <span className="text-[#526057]">
                      {product.missingFields.join(", ")}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${qrClass(
                      product.qrStatus,
                    )}`}
                  >
                    {product.qrStatus}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#526057]">{product.updated}</td>
                <td className="px-4 py-4">
                  <Link
                    className="rounded-md border border-[#c9d8ef] px-3 py-2 font-semibold text-[#2455a4] transition hover:bg-[#f4f7ff]"
                    href="/products/linen-overshirt"
                  >
                    <T k="dashboard.open" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
