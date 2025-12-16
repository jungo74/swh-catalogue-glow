import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, index = 0, viewMode = "grid" }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link
          to={`/products/${product.slug}`}
          className="group flex flex-col sm:flex-row bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
        >
          {/* Image */}
          <div className="sm:w-48 md:w-56 aspect-[4/3] sm:aspect-square overflow-hidden bg-secondary shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
                {product.category.name}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Link */}
            <div className="flex items-center text-primary font-medium text-sm group-hover:text-accent transition-colors mt-4">
              <span>Voir les Détails</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
            {product.category.name}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Link */}
          <div className="flex items-center text-primary font-medium text-sm group-hover:text-accent transition-colors">
            <span>Voir les Détails</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}