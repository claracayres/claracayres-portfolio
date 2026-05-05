/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function FloatingOrb({ className = "" }) {
  return (
    <motion.div
      animate={{ opacity: [0.45, 0.7, 0.45] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute rounded-full blur-2xl ${className}`}
    />
  );
}