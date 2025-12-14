import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductNotFound } from "@/components/products/ProductNotFound";
import { products, getCategoryBySlug } from "@/data/mockData";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.name.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  const currentCategory = selectedCategory ? getCategoryBySlug(selectedCategory) : null;

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {currentCategory
            ? `${currentCategory.name} - SWH Négoce`
            : "Produits - SWH Négoce"}
        </title>
        <meta
          name="description"
          content={
            currentCategory
              ? `Découvrez notre sélection de ${currentCategory.name.toLowerCase()}. Produits de qualité par SWH Négoce.`
              : "Explorez notre catalogue complet de produits d'hygiène, consommables et fournitures professionnelles."
          }
        />
      </Helmet>
      <Layout>
        {/* Page Header */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {currentCategory ? currentCategory.name : "Nos Produits"}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {currentCategory
                  ? `Découvrez notre gamme de ${currentCategory.name.toLowerCase()}.`
                  : "Parcourez notre catalogue complet de produits d'hygiène et consommables."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 space-y-6"
            >
              <ProductSearch value={searchQuery} onChange={setSearchQuery} />
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
              />
            </motion.div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <ProductNotFound searchQuery={searchQuery || undefined} />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductsPage;
