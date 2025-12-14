import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SWH Négoce - Produits d'Hygiène & Consommables</title>
        <meta
          name="description"
          content="SWH Négoce, votre partenaire de confiance pour les produits d'hygiène, consommables, toners et fournitures professionnelles. Parcourez notre catalogue et demandez un devis."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <CategoriesSection />
        <AboutSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
