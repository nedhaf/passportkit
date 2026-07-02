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
  brand: string;
  care: string;
  repair: string;
  recycling: string;
  safety: string;
  passportId: string;
  lastUpdated: string;
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
    brand: "Brand Room",
    care: "Wash at 30°C on a gentle cycle. Hang dry. Do not tumble dry.",
    repair: "Spare buttons included. Reinforce seams with matching linen thread.",
    recycling: "Textile recycling recommended. Remove buttons before recycling where required.",
    safety: "No special safety warnings. Keep packaging away from children.",
    passportId: "LOS-001",
    lastUpdated: "12 May 2026",
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
    brand: "Brand Room",
    care: "Spot clean with mild soap. Air dry flat.",
    repair: "Replace handles with cotton webbing. Patch small tears with canvas.",
    recycling: "Reuse first. Textile recycling recommended at end of life.",
    safety: "Do not overload above 12 kg.",
    passportId: "CTB-014",
    lastUpdated: "11 May 2026",
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
    brand: "Brand Room",
    care: "Wash cold with similar colors. Lay flat to dry.",
    repair: "Mend small holes with cotton thread.",
    recycling: "Fiber blend requires textile sorting.",
    safety: "No special safety warnings.",
    passportId: "RTT-220",
    lastUpdated: "10 May 2026",
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
    brand: "Brand Room",
    care: "Hand wash cold. Reshape while damp and dry flat.",
    repair: "Darn small holes with wool yarn.",
    recycling: "Textile recycling recommended. Avoid mixed-waste disposal.",
    safety: "May contain wool; check allergy sensitivity.",
    passportId: "WBN-043",
    lastUpdated: "28 May 2026",
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
    brand: "Brand Room",
    care: "Wipe clean. Wash only when necessary.",
    repair: "Patch tears with recycled nylon repair tape.",
    recycling: "Check local textile and synthetic fabric recycling options.",
    safety: "Keep away from open flame.",
    passportId: "RNJ-309",
    lastUpdated: "21 May 2026",
  },
];

export const productStats = {
  total: products.length,
  ready: products.filter((product) => product.readiness >= 90).length,
  needInfo: products.filter((product) => product.readiness < 90).length,
  published: products.filter((product) => product.qrStatus === "Published")
    .length,
};

export const featuredProduct = products[0];
