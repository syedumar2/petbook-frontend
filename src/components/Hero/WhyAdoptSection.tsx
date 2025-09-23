import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const WhyAdoptSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  return (
    <section className=" lg:grid  lg:place-content-center ">
      <div
        className="mx-auto w-screen max-w-screen-xl px-4  
           sm:px-6 sm:py-14 
           md:grid md:grid-cols-2 md:items-center md:gap-4 
           lg:px-8 lg:py-18"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y:50 }} // start hidden & left
          animate={isInView ? { opacity: 1, y: 0 } : {}} // animate when visible
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-prose"
        >
          <h1 className="hero-heading">
            Why <span className="inline-block text-red-700"> Adopt ?</span>
          </h1>

          <p className="hero-text">
            Adopting a pet saves lives, reduces abandonment, and gives animals a
            second chance at love. By adopting, you’re also discouraging
            unethical breeding and supporting a kinder society.
          </p>
        </motion.div>
        <motion.img
          ref={ref}
          initial={{ opacity: 0, y:50 }} // start hidden & left
          animate={isInView ? { opacity: 1, y: 0 } : {}} // animate when visible
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={`${import.meta.env.BASE_URL}images/whyAdopt.png`}

          alt="Illustration showing user flow"
          className="mx-auto hidden max-w-md md:block bg-none"
        />
      </div>
    </section>
  );
};

export default WhyAdoptSection;
