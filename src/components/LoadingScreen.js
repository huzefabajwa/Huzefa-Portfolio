import { motion } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
  return (
    isLoading && (
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#070E1B] text-white z-50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Expanding Light Pulse */}
        <motion.div
          className="absolute w-60 h-60 bg-[#FF0080] opacity-10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />

        {/* Rotating Loader with Neon Flicker */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            perspective: 1000,
          }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          {/* Outer Ring with Flicker Effect */}
          <motion.div
            className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#FF0080] border-r-[#6A0DAD] border-b-[#00FFFF] border-l-[#FFD700] animate-spin"
            animate={{
              opacity: [1, 0.8, 1],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Inner Glow with Depth Animation */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#FF0080] to-[#00FFFF] opacity-50 blur-lg"
            animate={{
              scale: [1, 1.3, 1],
              y: [-5, 5, -5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Particle Effect with More Randomization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              animate={{
                opacity: [0.8, 0],
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 1.5,
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            />
          ))}
        </div>

        {/* Animated Loading Text with Wave Effect */}
        <motion.p
          className="mt-4 text-lg font-semibold text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {["L", "o", "a", "d", "i", "n", "g", "."].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: index * 0.15,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    )
  );
}
