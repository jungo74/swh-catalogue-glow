import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/mockData";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : null;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - SWH Négoce</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/products"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux Produits
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Category Badge */}
                <Link
                  to={`/products?category=${product.category.slug}`}
                  className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 hover:bg-primary/20 transition-colors"
                >
                  {product.category.name}
                </Link>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {product.name}
                </h1>

                {/* Description */}
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Spécifications
                    </h2>
                    <div className="bg-secondary rounded-xl p-6">
                      <dl className="grid grid-cols-2 gap-4">
                        {product.specifications.map((spec, index) => (
                          <div key={index}>
                            <dt className="text-sm text-muted-foreground mb-1">
                              {spec.key}
                            </dt>
                            <dd className="text-foreground font-medium">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Datasheet Download */}
                {product.datasheet && (
                  <div className="mb-8">
                    <a
                      href={product.datasheet}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      Télécharger la Fiche Technique (PDF)
                    </a>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="flex-1">
                    <Link to="/contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Demander un Devis
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <a
                      href={`https://wa.me/1234567890?text=Je suis intéressé par ${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductDetailPage;
