import { Link } from "react-router-dom";
import { catDog } from "../../assets";

const HeroSection2 = () => {
  return (
    <section className="relative flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left side - Image */}
      <div className="w-full lg:w-1/2">
        <img
          className="object-cover w-full h-56 rounded shadow-lg md:h-96 lg:h-full lg:rounded-none lg:shadow-none"
          src={catDog}
          alt="Cat and Dog"
        />
      </div>

      {/* Right side - Text */}
      <div className="flex flex-col justify-center w-full max-w-xl px-6 py-12 mx-auto lg:w-1/2 lg:px-12">
        <h2 className="mb-5 font-sans text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          Put Your Pets Up for <br className="hidden md:block" />
          <span className="inline-block text-red-700">Adoption</span>
        </h2>
        <p className="mb-5 text-base text-gray-700 md:text-lg">
          With PetBook, you can not only find cats and dogs to adopt but also
          list your own pets who need a new home. Sign up today to get started,
          or if you already have an account, just log in and connect with caring
          adopters.
        </p>
        <div className="flex items-center justify-end">
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            Sign up
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-red-700"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
