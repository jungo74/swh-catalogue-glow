import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à Commencer ?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Contactez-nous dès aujourd'hui pour un devis personnalisé. Notre équipe 
            est prête à vous aider à trouver les produits adaptés à vos besoins.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
            >
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Demander un Devis
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
            >
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-primary-foreground/70">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-5 w-5" />
              +1 (234) 567-890
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-primary-foreground/30" />
            <a
              href="mailto:contact@swhnegoce.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              contact@swhnegoce.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
