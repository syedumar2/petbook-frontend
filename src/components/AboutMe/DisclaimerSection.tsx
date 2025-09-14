import { motion } from "framer-motion";

const DisclaimerSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container px-4 md:px-6 mx-auto max-w-6xl text-center mt-8 md:mt-12 border-red-200 border-2 rounded-xl bg-red-100 py-8 "
    >
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="hero-heading flex items-center justify-center gap-7 text-center text-red-700 "
      >
        ⛔ Disclaimer
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-3"
      >
        <p className="hero-text text-red-800 text-center">
          This is a <strong>portfolio project</strong> created to showcase my
          skills in full-stack development and UI design.
          <br />
          My platform <strong>only facilitates connections</strong> between
          adopters and pet owners/shelters.
        </p>
        <ul className="list-disc list-inside text-lg text-red-700 space-y-1 pl-20 text-start ">
          <li>
            I <strong>do not guarantee</strong> the health, behavior, or
            authenticity of pets listed.
          </li>
          <li>
            Users are responsible for verifying all details, arranging safe
            meetings, and making informed decisions.
          </li>
          <li>
            I am <strong>not liable</strong> for disputes, damages, or issues
            during or after the adoption process.
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default DisclaimerSection;
