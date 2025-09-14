import { motion } from "framer-motion";

const Disclaimer = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto w-screen max-w-screen-xl px-4 sm:px-6 sm:py-14 lg:px-8  relative bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm"
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
        <ul className="list-disc list-inside text-lg text-red-700 space-y-1 pl-2">
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

export default Disclaimer;
