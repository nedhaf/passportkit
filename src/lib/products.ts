export type Product = {
  name: string;
  sku: string;
  category: string;
  status: "Ready" | "Needs info" | "Draft" | "Published";
  readiness: number;
  missingFields: string[];
  qrStatus: "Published" | "Draft" | "Not generated";
  updated: string;
  origin: string;
  materials: string;
  color: string;
};

export const products: Product[] = [
  {
    name: "Linen Overshirt",
    sku: "LOS-001",
    category: "Apparel",
    status: "Needs info",
    readiness: 72,
    missingFields: ["Recycling", "Safety notes"],
    qrStatus: "Draft",
    updated: "Today",
    origin: "Made in Portugal",
    materials: "100% organic linen",
    color: "#d9c7a3",
  },
  {
    name: "Canvas Tote Bag",
    sku: "CTB-014",
    category: "Accessories",
    status: "Published",
    readiness: 100,
    missingFields: [],
    qrStatus: "Published",
    updated: "Yesterday",
    origin: "Made in Spain",
    materials: "Recycled cotton canvas",
    color: "#5f7d69",
  },
  {
    name: "Ribbed Tank Top",
    sku: "RTT-220",
    category: "Apparel",
    status: "Needs info",
    readiness: 58,
    missingFields: ["Origin", "Repair", "Recycling"],
    qrStatus: "Not generated",
    updated: "2 days ago",
    origin: "Missing origin",
    materials: "95% cotton, 5% elastane",
    color: "#f1d3c2",
  },
  {
    name: "Wool Beanie",
    sku: "WBN-043",
    category: "Accessories",
    status: "Ready",
    readiness: 94,
    missingFields: ["Safety notes"],
    qrStatus: "Draft",
    updated: "May 28",
    origin: "Made in Italy",
    materials: "Responsible wool blend",
    color: "#334155",
  },
  {
    name: "Recycled Nylon Jacket",
    sku: "RNJ-309",
    category: "Outerwear",
    status: "Draft",
    readiness: 41,
    missingFields: ["Materials", "Care", "Repair", "Recycling"],
    qrStatus: "Not generated",
    updated: "May 21",
    origin: "Made in Romania",
    materials: "Supplier data missing",
    color: "#2455a4",
  },
];

export const productStats = {
  total: products.length,
  ready: products.filter((product) => product.readiness >= 90).length,
  needInfo: products.filter((product) => product.readiness < 90).length,
  published: products.filter((product) => product.qrStatus === "Published")
    .length,
};
