import { Link } from "react-router-dom";
import { catDog } from "../../assets";
import { motion, Variants } from "framer-motion";

const textContainerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const highlightVariants: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
};
const imageVariants: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HeroSection2 = () => {
  return (
    <section className="relative flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left side - Image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={imageVariants}
        className="w-full lg:w-1/2"
      >
        <img
          className="object-cover w-full h-56 rounded shadow-lg md:h-96 lg:h-full lg:rounded-none lg:shadow-none"
          src={catDog}
          alt="Cat and Dog"
        />
      </motion.div>

      {/* Right side - Text */}
      <motion.div
        className="flex flex-col justify-center w-full max-w-xl px-6 py-12 mx-auto lg:w-1/2 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={textContainerVariants}
      >
        <motion.h2
          className="mb-5 font-sans text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
          variants={textItemVariants}
        >
          Put Your Pets Up for <br className="hidden md:block" />
          <motion.span
            className="inline-block text-red-700"
            variants={highlightVariants}
          >
            Adoption
          </motion.span>
        </motion.h2>

        <motion.p
          className="mb-5 text-base text-gray-700 md:text-lg"
          variants={textItemVariants}
        >
          With PetBook, you can not only find cats and dogs to adopt but also
          list your own pets who need a new home. Sign up today to get started,
          or if you already have an account, just log in and connect with caring
          adopters.
        </motion.p>

        <motion.div
          className="flex items-center justify-end"
          variants={textItemVariants}
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection2;
