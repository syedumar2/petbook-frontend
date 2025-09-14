import { motion, Variants } from "framer-motion";
import { Mail } from "lucide-react"; // assuming you're using lucide-react

const links = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    logo: "https://www.svgrepo.com/show/157006/linkedin.svg",
  },
  {
    name: "Email",
    url: "mailto:yourname@example.com",
    logo: "mail", // we’ll handle Mail icon separately
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

export default function LinksSection() {
  return (
    <motion.div
      className="container px-4 md:px-6 mx-auto max-w-6xl text-center mt-8 md:mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div className="rounded-xl border border-red-200 bg-white shadow-sm p-8 space-y-4">
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Links
          </h2>
          <p className="text-gray-700 md:text-lg">
            Connect with me through GitHub, LinkedIn, or Email.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-6"
          variants={containerVariants}
        >
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-red-300 bg-red-50 text-red-800 font-medium w-fit text-sm py-2 px-4 flex items-center gap-2 shadow-sm hover:bg-red-100 transition cursor-pointer"
              variants={itemVariants}
            >
              {link.name === "Email" ? (
                <Mail className="h-5 w-5 text-black" />
              ) : (
                <img
                  src={link.logo}
                  alt={`${link.name} logo`}
                  className={link.name === "GitHub" ? "w-7 h-7" : "w-5 h-5"}
                />
              )}
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
