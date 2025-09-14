import { Features, Footer, Header } from "@/components";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import Faq from "@/components/Faq/Faq";
import AdoptionProcess from "@/components/Hero/AdoptionProcess";
import WhyAdoptSection from "@/components/Hero/WhyAdoptSection";

export default function AdoptionInfoPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="mx-auto  py-12 space-y-10">
          <div className="text-center space-y-2 ">
            <h1 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Adoption Info & FAQ
            </h1>
            <p className="text-gray-600">
              Learn more about the adoption process, FAQs, and important
              guidelines.
            </p>
          </div>
          {/* Why Adopt */}
          <WhyAdoptSection />
          {/* Process */}
          <AdoptionProcess />
          <Faq />
          {/* Features */}
          <Features />
          {/* Disclaimer */}
          <Disclaimer />
        </section>
      </main>
      <Footer />
    </div>
  );
}
