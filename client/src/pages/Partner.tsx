import { motion } from "framer-motion";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import four from "../assets/four.jpg";
import five from "../assets/five.jpg";
import six from "../assets/six.jpg";
import seven from "../assets/seven.jpg";
import eight from "../assets/eight.jpg";
import nine from "../assets/nine.jpg";

const partnerLogos = [
  // "https://logo.clearbit.com/google.com",
  // "https://logo.clearbit.com/microsoft.com",
  // "https://logo.clearbit.com/apple.com",
  // "https://logo.clearbit.com/amazon.com",
  // "https://logo.clearbit.com/netflix.com",
  // "https://logo.clearbit.com/tesla.com",
  // "https://via.placeholder.com/150",
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
];

const PartnersSection: React.FC = () => {
  return (
    <div className="mt-32">
      <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900 text-center">
        Our Partners
      </h2>

      <div className="bg-gray-50 py-10 mt-16 overflow-hidden">
        <div className="relative w-full flex items-center">
          <motion.div
            className="flex space-x-8 w-max"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Partner Logo"
                className="h-25 w-auto object-contain"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
