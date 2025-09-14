import { Link } from "react-router-dom";
import { catDogBg } from "../../assets";
import { motion, Variants } from "framer-motion";

const HeroSection1 = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants:Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants :Variants= {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 min-h-screen">
      <motion.div
        className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5" variants={containerVariants}>
          <motion.h2
            className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
            variants={textVariants}
          >
            Find your new best friend <br className="hidden md:block" />
            <span className="inline-block text-red-700">today</span>
          </motion.h2>

          <motion.p className="pr-5 mb-5 text-base text-gray-700 md:text-lg" variants={textVariants}>
            PetBook makes adopting cats and dogs easy. Browse pets posted by people and organizations,
            connect instantly, and give your new furry friend a loving home
          </motion.p>

          <motion.div className="flex items-center" variants={containerVariants}>
            <motion.div variants={buttonVariants}>
              <Link
                to="/pets"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
              >
                Browse Pets
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Link
                to="/signup"
                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-red-700"
              >
                Start Adopting
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={imageVariants}
      >
  
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full clip-diagonal"
          src={catDogBg}
          alt="Cats and Dogs"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection1;
