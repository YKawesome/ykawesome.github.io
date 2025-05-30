import React, { useState } from "react";
import CS161 from "./CS161";
import CS162 from "./CS162";
import Empty from "./Empty";

import { motion, AnimatePresence } from "framer-motion";


function Calculator() {
  const [selected, setSelected] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-base-200"
    >
      <div className="">
        <div className="flex flex-col items-center justify-center py-4 bg-base-200">
          <fieldset className="fieldset">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="select select-xl"
            >
              <option value="" disabled>
                Pick a Calculator
              </option>
              <option value="CS161">CS161</option>
              <option value="CS162">CS162</option>
            </select>
          </fieldset>
          <h1 className="text-4xl font-bold mt-4"> Grade Calculator</h1>
        </div>
        <AnimatePresence mode="wait">
          {selected === "" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Empty />
            </motion.div>
          )}
          {selected === "CS161" && (
            <motion.div
              key="cs161"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CS161 />
            </motion.div>
          )}
          {selected === "CS162" && (
            <motion.div
              key="cs162"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CS162 />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Calculator;
