import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // your Card component

const IntroCard = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
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

  return (
    <motion.div
      className="container px-4 md:px-6 mx-auto max-w-6xl flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="rounded-2xl border border-red-200 bg-white shadow-xl p-8 w-full"
        variants={itemVariants}
      >
        <Card className="border-0">
          <CardContent className="p-0 space-y-6">
            <motion.p className="hero-text text-gray-700 md:text-lg" variants={itemVariants}>
              Hi, I’m{" "}
              <motion.span
                className="font-semibold text-red-600"
                variants={highlightVariants}
              >
                Syed Umar
              </motion.span>
              , a passionate developer exploring the world of full-stack development. I enjoy building practical, user-friendly applications and experimenting with new technologies.
            </motion.p>

            <motion.p className="hero-text text-gray-700 md:text-lg" variants={itemVariants}>
              This project —{" "}
              <motion.span
                className="font-semibold text-red-600"
                variants={highlightVariants}
              >
                Pet Adoption Platform
              </motion.span>{" "}
              — is part of my journey to learn and apply real-world concepts like React, Spring Boot, WebSockets, and SQL databases.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default IntroCard;
