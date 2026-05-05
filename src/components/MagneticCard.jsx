/* eslint-disable no-unused-vars */
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function MagneticCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(mouseY, [-80, 80], [8, -8]);
  const rotateY = useTransform(mouseX, [-80, 80], [-8, 8]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MagneticCard;