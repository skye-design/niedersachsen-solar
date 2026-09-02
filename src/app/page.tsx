import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import FAQSection from "@/components/FAQSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { generalFaqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustSection />
        <Services />
        <Gallery />
        <FAQSection faqs={generalFaqs} />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
