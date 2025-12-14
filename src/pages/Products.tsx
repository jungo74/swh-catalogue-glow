import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { products, getCategoryBySlug } from "@/data/mockData";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category.slug === selectedCategory);
  }, [selectedCategory]);

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
            : "Products - SWH Négoce"}
        </title>
        <meta
          name="description"
          content={
            currentCategory
              ? `Browse our selection of ${currentCategory.name.toLowerCase()} products. Quality industrial equipment from SWH Négoce.`
              : "Explore our complete catalog of industrial equipment, safety gear, and professional supplies."
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
                {currentCategory ? currentCategory.name : "Our Products"}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {currentCategory
                  ? `Explore our range of ${currentCategory.name.toLowerCase()} products.`
                  : "Browse our complete catalog of industrial equipment and supplies."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
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
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductsPage;
