import Hexamaze from "./Hexamaze";
import SkewedSlots from "./SkewedSlots";
import { motion } from "framer-motion";

function KTANE() {

    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
            
            <Hexamaze />
            <SkewedSlots />

        </motion.div>
    );
}

export default KTANE;