"use client";

import Header from "@/components/Header";
import ThemeAwareHero from "@/components/ThemeAwareHero";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ThemeAwareHero />
        <ProductsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
