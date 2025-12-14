// Mock data for development before Sanity CMS is connected
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  specifications: { key: string; value: string }[];
  category: Category;
  datasheet?: string;
}

export const categories: Category[] = [
  {
    _id: "cat-1",
    name: "Industrial Equipment",
    slug: "industrial-equipment",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    _id: "cat-2",
    name: "Safety Gear",
    slug: "safety-gear",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    _id: "cat-3",
    name: "Tools & Hardware",
    slug: "tools-hardware",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
  },
  {
    _id: "cat-4",
    name: "Electrical Components",
    slug: "electrical-components",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export const products: Product[] = [
  {
    _id: "prod-1",
    name: "Heavy Duty Industrial Pump",
    slug: "heavy-duty-industrial-pump",
    description: "High-performance industrial pump designed for demanding applications. Features robust construction, excellent flow rates, and reliable operation in harsh environments.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    ],
    specifications: [
      { key: "Flow Rate", value: "500 L/min" },
      { key: "Pressure", value: "10 bar" },
      { key: "Power", value: "5.5 kW" },
      { key: "Weight", value: "45 kg" },
    ],
    category: categories[0],
  },
  {
    _id: "prod-2",
    name: "Industrial Safety Helmet",
    slug: "industrial-safety-helmet",
    description: "Premium safety helmet with advanced impact protection. Meets all international safety standards. Comfortable fit with adjustable suspension system.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    specifications: [
      { key: "Material", value: "ABS Shell" },
      { key: "Standard", value: "EN 397" },
      { key: "Weight", value: "380g" },
      { key: "Colors", value: "White, Yellow, Red, Blue" },
    ],
    category: categories[1],
  },
  {
    _id: "prod-3",
    name: "Professional Tool Set",
    slug: "professional-tool-set",
    description: "Complete professional tool set with 150+ pieces. Chrome vanadium steel construction for durability. Organized carrying case included.",
    images: [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
    ],
    specifications: [
      { key: "Pieces", value: "152" },
      { key: "Material", value: "Chrome Vanadium Steel" },
      { key: "Case Type", value: "Blow Mold" },
      { key: "Warranty", value: "Lifetime" },
    ],
    category: categories[2],
  },
  {
    _id: "prod-4",
    name: "Industrial Circuit Breaker",
    slug: "industrial-circuit-breaker",
    description: "High-capacity circuit breaker for industrial applications. Provides reliable overcurrent and short-circuit protection.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    specifications: [
      { key: "Rating", value: "100A" },
      { key: "Poles", value: "3" },
      { key: "Breaking Capacity", value: "25kA" },
      { key: "Mounting", value: "DIN Rail" },
    ],
    category: categories[3],
  },
  {
    _id: "prod-5",
    name: "Hydraulic Press Machine",
    slug: "hydraulic-press-machine",
    description: "Industrial hydraulic press with precise pressure control. Ideal for metal forming, stamping, and assembly operations.",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    ],
    specifications: [
      { key: "Capacity", value: "100 Tons" },
      { key: "Stroke", value: "300mm" },
      { key: "Table Size", value: "600x600mm" },
      { key: "Motor", value: "15 kW" },
    ],
    category: categories[0],
  },
  {
    _id: "prod-6",
    name: "Safety Gloves - Heavy Duty",
    slug: "safety-gloves-heavy-duty",
    description: "Cut-resistant safety gloves for industrial use. Excellent grip and dexterity while providing maximum protection.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    specifications: [
      { key: "Cut Level", value: "A5" },
      { key: "Material", value: "HPPE + Steel" },
      { key: "Coating", value: "Nitrile" },
      { key: "Sizes", value: "S, M, L, XL" },
    ],
    category: categories[1],
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category.slug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
