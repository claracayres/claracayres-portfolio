import { motion } from "framer-motion";

function PageShell({ eyebrow, title, children, noNavSpace = false }) {


  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.20, ease: "easeOut" }}
      className={`mx-auto min-h-[78vh] w-full max-w-7xl px-5 pb-20 md:px-10 ${
        noNavSpace ? "pt-4 md:pt-6" : "pt-32"
      }`}
    >
      {eyebrow || title ? (
        <div className="mb-10">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-7xl">
              {title}
            </h1>
          ) : null}
        </div>
      ) : null}

      {children}
    </motion.section>
  );
}

export default PageShell;
