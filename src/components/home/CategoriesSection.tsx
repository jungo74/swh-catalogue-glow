import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Catégories de Produits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits d'hygiène et consommables
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="group block relative overflow-hidden rounded-xl aspect-[4/3] shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-primary-foreground/70 text-sm group-hover:text-accent transition-colors">
                    <span>Voir les Produits</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            Voir Tous les Produits
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
