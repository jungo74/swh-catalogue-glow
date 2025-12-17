import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/hero-industrial.jpg";
import heroImage2 from "@/assets/hero-industrial-workwear.jpg";
import heroImage3 from "@/assets/hero-it-equipment.jpg";

const heroSlides = [
  {
    image: heroImage1,
    title: "Produits d'Hygiène",
    subtitle: "& Consommables",
    description: "Découvrez notre gamme complète de produits d'hygiène professionnelle, détergents, désinfectants et consommables de qualité pour entreprises.",
  },
  {
    image: heroImage2,
    title: "Vêtements de Travail",
    subtitle: "& Équipements de Sécurité",
    description: "Équipez vos équipes avec nos vêtements de travail, EPI, chaussures de sécurité et matériel de chantier aux normes professionnelles.",
  },
  {
    image: heroImage3,
    title: "Matériel Informatique",
    subtitle: "& Consommables d'Impression",
    description: "Ordinateurs, imprimantes, toners, cartouches d'encre et fournitures de bureau pour optimiser votre environnement de travail.",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect (relative to this hero section)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = heroSlides[currentSlide];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images Carousel with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: `url(${currentContent.image})` }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Dark Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" 
        style={{ opacity: overlayOpacity }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Votre Partenaire de Confiance
            </span>
          </motion.div>

          {/* Main Heading - Dynamic */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              {currentContent.title}
              <br />
              <span className="text-accent">{currentContent.subtitle}</span>
            </motion.h1>
          </AnimatePresence>

          {/* Description - Dynamic */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mb-8"
            >
              {currentContent.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-transparent hover:text-accent border-2 border-accent transition-all duration-300 text-base px-8"
            >
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Demander un Devis
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 text-base"
            >
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactez-nous
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 text-base"
            >
              <Link to="/products">
                Voir le Catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Carousel Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 mt-8"
          >
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-accent"
                    : "w-4 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          className="flex flex-col items-center gap-3 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.span 
            className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 font-medium group-hover:text-accent transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Défiler
          </motion.span>
          <div className="relative">
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5 group-hover:border-accent transition-colors"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          <motion.div 
            className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 via-accent/50 to-transparent"
            animate={{ scaleY: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
