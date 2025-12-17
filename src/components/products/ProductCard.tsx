import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, index = 0, viewMode = "grid" }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group flex flex-col sm:flex-row bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
      >
        {/* Image */}
        <Link to={`/products/${product.slug}`} className="sm:w-48 md:w-56 aspect-[4/3] sm:aspect-square overflow-hidden bg-secondary shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
              {product.category.name}
            </span>

            {/* Title */}
            <Link to={`/products/${product.slug}`}>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              onClick={handleAddToCart}
              variant={inCart ? "secondary" : "default"}
              size="sm"
              className={inCart ? "bg-accent/20 text-accent hover:bg-accent/30" : "bg-accent hover:bg-accent/90"}
            >
              {inCart ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Ajouté
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter au Devis
                </>
              )}
            </Button>
            <Link 
              to={`/products/${product.slug}`}
              className="flex items-center text-primary font-medium text-sm hover:text-accent transition-colors"
            >
              <span>Détails</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-secondary relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick add button overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button
            onClick={handleAddToCart}
            variant={inCart ? "secondary" : "default"}
            size="sm"
            className={inCart ? "bg-background text-accent" : "bg-accent hover:bg-accent/90"}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Dans le Panier
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter au Devis
              </>
            )}
          </Button>
        </motion.div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
          {product.category.name}
        </span>

        {/* Title */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleAddToCart}
            variant={inCart ? "ghost" : "outline"}
            size="sm"
            className={inCart ? "text-accent" : "hover:bg-accent hover:text-accent-foreground hover:border-accent"}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Ajouté
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Devis
              </>
            )}
          </Button>
          <Link 
            to={`/products/${product.slug}`}
            className="flex items-center text-primary font-medium text-sm hover:text-accent transition-colors"
          >
            <span>Voir</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
