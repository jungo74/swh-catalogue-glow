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
        <title>SWH Négoce - Industrial Equipment & Supplies</title>
        <meta
          name="description"
          content="SWH Négoce is your trusted partner for industrial equipment, safety gear, and professional supplies. Browse our catalog and request a quote today."
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
