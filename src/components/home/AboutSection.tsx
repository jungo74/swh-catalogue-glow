import { motion } from "framer-motion";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Qualité Garantie",
    description: "Tous nos produits respectent les normes de qualité internationales",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Notre réseau logistique assure une livraison dans les délais",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Expert",
    description: "Notre équipe vous accompagne avec un service professionnel",
  },
  {
    icon: Award,
    title: "Partenaire de Confiance",
    description: "Des années d'expérience au service des professionnels",
  },
];

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pourquoi Choisir <span className="text-primary">SWH Négoce</span> ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Avec des années d'expérience dans le secteur des fournitures professionnelles, 
              nous comprenons l'importance de produits fiables et d'un service de qualité. 
              Notre engagement envers la satisfaction client nous distingue.
            </p>
            <p className="text-muted-foreground text-lg">
              Que vous ayez besoin de produits d'hygiène, de consommables bureautiques 
              ou de toners, nous avons l'expertise pour répondre à vos besoins 
              professionnels.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
