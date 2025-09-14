import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  PlusCircle,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

const parentVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const childVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const features = [
  {
    icon: CheckCircle,
    title: "Adopt with Ease",
    desc: "Browse verified cats and dogs, view their details, and find your perfect match in just a few clicks.",
  },
  {
    icon: PlusCircle,
    title: "List Your Pets",
    desc: "Have a pet that needs a new home? Post them on PetBook and connect with caring adopters.",
  },
  {
    icon: MessageSquare,
    title: "Chat Instantly",
    desc: "Message adopters and pet owners in real-time, ask questions, and stay connected throughout the adoption process.",
  },
  {
    icon: Users,
    title: "Direct Connections",
    desc: "Connect directly with adopters and pet owners — no middlemen or hidden charges.",
  },
  {
    icon: MapPin,
    title: "Location-Based Search",
    desc: "Find pets near you using our smart location-based search system.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Photos",
    desc: "Photo verification ensures genuine listings and reduces fraud.",
  },
];

const Features = () => {
  return (
    <section className="py-14 px-2 bg-gray-100/30">
      <motion.div
        variants={parentVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={childVariants}
            className="feature-box"
          >
            <div className="bg-red-100 p-4 rounded-full w-fit">
              <Icon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
