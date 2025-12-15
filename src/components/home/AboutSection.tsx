import { motion } from "framer-motion";
import { Shield, Truck, HeadphonesIcon, Award, CheckCircle2, Users, Clock, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Qualité Certifiée",
    description: "Produits conformes aux normes internationales avec garantie de satisfaction",
  },
  {
    icon: Truck,
    title: "Livraison Express",
    description: "Livraison rapide sur tout le Maroc avec suivi en temps réel",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Dédié",
    description: "Une équipe d'experts disponible pour vous conseiller et vous accompagner",
  },
  {
    icon: Award,
    title: "15+ Ans d'Expérience",
    description: "Un savoir-faire reconnu au service des professionnels marocains",
  },
];

const stats = [
  { value: "500+", label: "Clients Satisfaits", icon: Users },
  { value: "1000+", label: "Produits Disponibles", icon: CheckCircle2 },
  { value: "24h", label: "Délai de Réponse", icon: Clock },
  { value: "98%", label: "Taux de Satisfaction", icon: ThumbsUp },
];

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-xl shadow-card"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Votre Partenaire de Confiance
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pourquoi Choisir <span className="text-primary">SWH Négoce</span> ?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Depuis plus de 15 ans, <strong className="text-foreground">SWH Négoce</strong> s'est imposé comme un acteur majeur 
              dans la distribution de fournitures professionnelles au Maroc. Notre expertise couvre 
              un large éventail de produits : hygiène, consommables bureautiques, toners, vêtements 
              de travail et équipements industriels.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Notre engagement ? Offrir à nos clients des <strong className="text-foreground">produits de qualité</strong> au 
              <strong className="text-foreground"> meilleur prix</strong>, accompagnés d'un service client irréprochable. 
              Que vous soyez une PME ou une grande entreprise, nous adaptons nos solutions à vos besoins.
            </p>
            
            {/* ICE Number */}
            <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-3 rounded-lg border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <span className="text-xs text-muted-foreground block">ICE Entreprise</span>
                <span className="font-mono font-semibold text-foreground">002075015000049</span>
              </div>
            </div>
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
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
