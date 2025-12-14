import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configure your Sanity client
// Replace these values with your actual Sanity project details
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  allCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }`,
  
  allProducts: `*[_type == "product"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    images,
    specifications,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    datasheet
  }`,
  
  productsByCategory: (categorySlug: string) => `*[_type == "product" && category->slug.current == "${categorySlug}"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    images,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    }
  }`,
  
  productBySlug: (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    images,
    specifications,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    datasheet
  }`,
  
  categoryBySlug: (slug: string) => `*[_type == "category" && slug.current == "${slug}"][0] {
    _id,
    name,
    "slug": slug.current
  }`,
};

// Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: any[];
  specifications?: { key: string; value: string }[];
  category: Category;
  datasheet?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
}
