import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DecisionEntry from "@/components/DecisionEntry";
import TrustSection from "@/components/TrustSection";
import SystemExplainer from "@/components/SystemExplainer";
import Process from "@/components/Process";
import ProjectTeasers from "@/components/ProjectTeasers";
import KnowledgeBlock from "@/components/KnowledgeBlock";
import FAQSection from "@/components/FAQSection";
import ConversionFinale from "@/components/ConversionFinale";
import Footer from "@/components/Footer";
import { generalFaqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">
        <Hero />
        <DecisionEntry />
        <TrustSection />
        <SystemExplainer />
        <Process />
        <ProjectTeasers />
        <div id="wissen">
          <KnowledgeBlock />
        </div>
        <FAQSection faqs={generalFaqs} />
        <ConversionFinale />
      </main>
      <Footer />
    </>
  );
}
