import { Header, Footer, HeroForOwners, Features,Hero } from "../components";
import { catDog, catDogBg } from "../assets";
const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <HeroForOwners />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Home