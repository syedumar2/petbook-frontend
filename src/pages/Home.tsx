import {
  Header,
  Footer,
  Features,
  HeroSection1,
  HeroSection2,
} from "../components";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <HeroSection1 />
        <HeroSection2 />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
