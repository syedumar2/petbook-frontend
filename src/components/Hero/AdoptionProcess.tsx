import { motion } from "framer-motion";
import {
  Heart,
  MessageSquare,
  PawPrint,
  ShieldCheckIcon
} from "lucide-react";
import { useRef } from "react";

const AdoptionProcess = () => {
  const ref = useRef(null);
  const steps = [
    {
      step: "STEP 1",
      title: "Browse Pets",
      desc: "Explore the listings by category, breed, or location.",
      icon: PawPrint,
    },
    {
      step: "STEP 2",
      title: "Start a Conversation",
      desc: "Connect with the current owner or shelter via chat.",
      icon: MessageSquare,
    },
    {
      step: "STEP 3",
      title: "Meet & Verify",
      desc: "Arrange a safe meeting to understand the pet’s needs and temperament.",
      icon: ShieldCheckIcon,
    },
    {
      step: "STEP 4",
      title: "Finalize Adoption",
      desc: "If both parties agree, complete the adoption and give the pet a forever home.",
      icon: Heart,
    },
  ];

  return (
    <section className="mx-auto w-screen max-w-screen-xl px-4  lg:px-8 ">
      <h3 className="hero-heading !text-center pb-18">Adoption Process</h3>

      <div className="flex flex-col items-center w-full">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex items-center flex-col relative ">
              {/* Alternate left/right */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }} // animates when enters viewport
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`absolute top-0 w-72 ${
                  idx % 2 === 0
                    ? "left-full ml-4 text-left"
                    : "right-full mr-4 text-right"
                }`}
              >
                <p className="steps-heading">{s.step}</p>
                <h6 className="text-2xl">{s.title}</h6>
                <p className="text-gray-600 mt-1 text-sm">{s.desc}</p>
              </motion.div>

              <div className="steps-bullet">
                <Icon className="h-6 w-6 text-red-600" />{" "}
              </div>

              {idx < steps.length - 1 && (
                <motion.div
                  className="steps-length"
                  initial={{ height: 0 }}
                  whileInView={{ height: "11rem" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 1.2, // slower growth
                    ease: "easeOut",
                    delay: idx * 0.2,
                  }}
                ></motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdoptionProcess;
