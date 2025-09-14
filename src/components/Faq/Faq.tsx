import { AnimatePresence, motion, Variants } from "framer-motion";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How much does adoption cost?",
      a: "Most adoptions are free or charge only for medical/vaccination expenses.",
    },
    {
      q: "Can I return a pet if things don’t work out?",
      a: "Returns are handled directly between adopter and owner/shelter. Please make sure you’re fully committed before adopting.",
    },
    {
      q: "Are pets vaccinated or neutered?",
      a: "This depends on the owner/shelter. Always verify documents and health status before adoption.",
    },
    {
      q: "Can I adopt more than one pet?",
      a: "Yes, as long as you can provide the time, care, and resources needed.",
    },
  ];

  // Parent + child variants
  const parentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, x: 60 }, // start from right
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-white pt-20">
      <div className="container px-6 mx-auto" ref={ref}>
        <h1 className="hero-heading text-center pb-12">Frequently Asked Questions</h1>

        <motion.div
          variants={parentVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="space-y-6"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={childVariants}
              className="p-6 bg-gray-100 rounded-lg"
            >
              <button
                className="flex items-center justify-between w-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h2 className="font-bold text-gray-700">{faq.q}</h2>
                {openIndex === i ? (
                  <CircleMinus color="gray" />
                ) : (
                  <CirclePlus color="red" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 hero-text">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
