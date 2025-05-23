import React from "react";
import Hero from "../../components/Hero/Hero";
import ShetrHero from "../../components/Hero/ShetrHero";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function Home({shetr = false, toggleShetr}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {shetr ? (
          <motion.div
            key="shetr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ShetrHero toggleShetr={toggleShetr} />
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Hero toggleShetr={toggleShetr} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Home;
