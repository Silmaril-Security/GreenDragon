import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text font-semibold text-transparent text-xl dark:from-emerald-300 dark:via-teal-200 dark:to-sky-300 md:text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        Welcome,
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-sm text-muted-foreground md:text-base"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
      >
        I&apos;m <span className="font-medium text-foreground">Lorien</span>, an
        AI assistant designed by{" "}
        <a
          href="https://silmaril.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          Silmaril
        </a>{" "}
        to showcase AI risks.{" "}
        <a href="/" className="font-medium text-foreground hover:underline">
          Green Dragon
        </a>{" "}
        is inspired by{" "}
        <a
          href="https://owasp.org/www-project-juice-shop/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          OWASP Juice Shop
        </a>
        . It is the most advanced open-source application of its kind.
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-sm text-muted-foreground md:text-base"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.7 }}
      >
        Solve hyper-realistic security challenges, earn points, and start your
        white-hat AI hacker journey.
      </motion.div>
    </div>
  );
};
