import { motion } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
  return (
    isLoading && (
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#070E1B] text-white z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Beautiful Colorful Loader */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          {/* Outer Ring */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#FF0080] border-r-[#6A0DAD] border-b-[#00FFFF] border-l-[#FFD700] animate-spin"></div>
          
          {/* Inner Glow */}
          <div className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-[#FF0080] to-[#00FFFF] opacity-50 blur-md"></div>
        </motion.div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-300 animate-pulse">Loading...</p>
      </motion.div>
    )
  );
}
