import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductNotFoundProps {
  searchQuery?: string;
}

export function ProductNotFound({ searchQuery }: ProductNotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Produit non trouvé
      </h3>
      
      {searchQuery && (
        <p className="text-muted-foreground mb-2">
          Aucun résultat pour "<span className="font-medium text-foreground">{searchQuery}</span>"
        </p>
      )}
      
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
        Vous ne trouvez pas ce que vous cherchez ? Pas de problème ! 
        Contactez-nous et nous vous fournirons un devis personnalisé.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg">
          <Link to="/contact">
            <Mail className="mr-2 h-5 w-5" />
            Demander un Devis
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp
          </a>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        Notre équipe répondra à votre demande dans les 24 heures.
      </p>
    </motion.div>
  );
}
