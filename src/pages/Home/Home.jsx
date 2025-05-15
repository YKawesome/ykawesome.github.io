import React from "react";
import Hero from "../../components/Hero/Hero";
import ShetrHero from "../../components/Hero/ShetrHero";
import { motion } from "framer-motion";

function Home({shetr = false, toggleShetr}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25}}
    >
      {
        shetr ? <ShetrHero toggleShetr={toggleShetr}/> : <Hero toggleShetr={toggleShetr}/>
      }
    </motion.div>
  );
}

export default Home;
