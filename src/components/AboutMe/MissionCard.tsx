import { motion } from "framer-motion";

const MissionCard = () => {
  return (
    <motion.div
      className="container px-4 md:px-6 mx-auto max-w-6xl text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="mt-8 md:mt-12 rounded-xl border border-red-200 bg-white shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            My Mission
          </h2>
          <p className="text-gray-700 md:text-lg">
            I aim to grow as a developer by building practical, real-world applications that{" "}
            <span className="font-semibold text-red-700">showcase my skills</span>{" "}
            and make a positive impact — from helping pets find loving homes
            to creating tools that make everyday life easier and more connected.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MissionCard;
