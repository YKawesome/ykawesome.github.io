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
        <div className="pb-16 text-center hero-content text-base-content">
          <div className="w-full max-w-xl p-8 shadow-2xl bg-base-300 bg-opacity-70 glass rounded-2xl">
            <div className="mb-6 text-4xl font-bold md:text-6xl">
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