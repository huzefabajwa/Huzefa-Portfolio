import { motion } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
  return (
    isLoading && (
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#070E1B] text-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Outer Pulsating Glow */}
        <motion.div
          className="absolute w-40 h-40 bg-[#FF0080] opacity-10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Rotating Loader with 3D Effect */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ perspective: 1000 }}
        >
          {/* Outer Ring */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#FF0080] border-r-[#6A0DAD] border-b-[#00FFFF] border-l-[#FFD700] animate-spin"></div>

          {/* Inner Glow */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#FF0080] to-[#00FFFF] opacity-50 blur-lg"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Particle Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0.8, 0],
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: Math.random(),
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            />
          ))}
        </div>

        {/* Animated Loading Text */}
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
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: index * 0.2,
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
