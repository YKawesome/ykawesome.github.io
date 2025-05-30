import React, { useState } from "react";
import CS161 from "./CS161";
import CS162 from "./CS162";
import Empty from "./Empty";

import { motion } from "framer-motion";


function Calculator() {
  const [selected, setSelected] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="">
        <div className="flex flex-col items-center justify-center pt-4 bg-base-200">
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
        </div>
        {selected === "" && <Empty />}
        {selected === "CS161" && <CS161 />}
        {selected === "CS162" && <CS162 />}
      </div>
    </motion.div>
  );
}

export default Calculator;
