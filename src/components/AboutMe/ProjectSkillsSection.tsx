import { motion, Variant, Variants } from "framer-motion";

const techStack = [
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "MySQL (JPA, Flyway)",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "JWT Auth",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://www.svgrepo.com/show/333609/tailwind-css.svg",
  },
  {
    name: "WebSockets",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
];

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

export default function ProjectSkillsSection() {
  return (
    <motion.div
      className="container px-4 md:px-6 mx-auto max-w-6xl text-center mt-8 md:mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div className="rounded-xl border border-red-200 bg-white shadow-sm p-8 space-y-4">
        <motion.div className="text-center space-y-2" variants={itemVariants}>
          <h1 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Project Tech Stack
          </h1>
          <p className="hero-text ml-6">
            Technologies I used to build the Pet Adoption Platform
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-6"
          variants={containerVariants}
        >
          {techStack.map((tech) => (
            <motion.span
              key={tech.name}
              className="rounded-lg border border-red-300 bg-red-50 text-red-800 font-medium w-fit text-sm py-2 px-4 flex items-center gap-2 shadow-sm hover:bg-red-100 transition cursor-pointer"
              variants={itemVariants}
            >
              <img
                alt={`${tech.name} logo`}
                className="h-5 w-5 object-contain"
                src={tech.logo}
              />
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
