import { motion } from "framer-motion";
import { useScrollAnimation, fadeUp } from "../../hooks/useScrollAnimation";

export default function AnimatedSection({
  children,
  className = "",
  variant = fadeUp,
  delay = 0,
}) {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible?.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}