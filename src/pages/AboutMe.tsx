import { Footer, Header } from "@/components";
import AboutMeSection from "@/components/AboutMe/AboutMeSection";

export default function AboutMe() {
  return (
    <div>
      <Header />
      <main>
        <section className="mx-auto py-12 space-y-10">
          <div className="text-center space-y-2">
            <h1 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              About Me
            </h1>
       
          </div>
          <AboutMeSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
