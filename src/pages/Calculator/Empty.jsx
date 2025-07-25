import { motion } from "framer-motion";
import TypeIt from "typeit-react";

function Empty() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content text-center text-base-content pb-16">
          <div className="max-w-xl w-full bg-base-300 bg-opacity-70 glass p-8 rounded-2xl shadow-2xl">
            <div className="text-4xl md:text-6xl font-bold mb-6">
              Grade Calculator.
            </div>
            <div className="mt-6"></div>
            <div
              className="text-lg md:text-xl"
              options={{ startDelay: 1000, speed: 30 }}
            >
              A collection of interactive GPA tools for specific UCI CS courses. Select a
              calculator from the dropdown above to get started!
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Empty;