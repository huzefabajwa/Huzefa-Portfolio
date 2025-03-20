"use client";

import { useMemo, useRef, useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaUpwork, FaLinkedin, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";
import talhabajwa from "../../../app/assets/Talhabajwa.jpg";

function variants() {
  return {
    offscreen: { y: 150, opacity: 0 },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const socialIcons = [
  { id: "upwork", icon: <FaUpwork />, name: "Upwork", link: "https://www.upwork.com/freelancers/~YOUR_PROFILE" },
  { id: "linkedIn", icon: <FaLinkedin />, name: "LinkedIn", link: "https://www.linkedin.com/in/YOUR_PROFILE" },
  { id: "github", icon: <FaGithub />, name: "GitHub", link: "https://github.com/YOUR_GITHUB" },
];

export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Move image horizontally on scroll
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // State to track hovered icon
  const [hovered, setHovered] = useState(null);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background with Animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/sti.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={100}
          placeholder="blur"
          blurDataURL="/sti.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(10,16,30)] to-[rgba(30,25,25,0)]"></div>
      </motion.div>

      {/* Content Wrapper */}
      <motion.div className="relative w-full flex flex-col items-center sm:flex-row sm:justify-center min-h-screen" id="home">
      <div className="flex flex-col items-center justify-center sm:hidden md:hidden mt-10">
          {/* Profile Picture */}
          <div className="mt-40 w-50 h-50 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
          </div>

          {/* Social Media Icons - Below Profile Picture */}
          <div className="mt-4 mb-[-100px] flex flex-row gap-4">
            {socialIcons.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-gray-900 text-white shadow-md transition-transform transform hover:scale-110 hover:bg-[#FEC544] hover:text-black"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        <motion.div
          style={{ x }}
          className="absolute right-0 top-0 h-full w-full sm:w-[60%] lg:w-[50%] xl:w-[50%] flex items-center justify-end overflow-visible"
        >
          {/* Social Media Ribbon - Fixed Width */}
          <div className="relative bottom-0 flex items-center bg-gray-800 px-5 py-3 rounded-l-full border border-white/30 shadow-lg z-11 hidden sm:flex xl:w-[314px]  pointer-events-auto">
            <div className="flex gap-3">
              {socialIcons.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center bg-gray-900 text-[#8A8795] text-3xl border border-white/30 rounded-full overflow-hidden transition-all duration-10 ease-in-out"
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    width: hovered === item.id ? 120 : 48, // Expand width on hover
                  }}
                >
                  <span className="w-12 h-12 flex items-center justify-center">{item.icon}</span>
                  {hovered === item.id && (
                    <span className="ml-2 text-sm text-white font-medium">{item.name}</span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="relative h-full w-full z-10 hidden sm:block md:block pointer-events-none">
            <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="mt-5 w-full max-w-screen-xl px-6 lg:px-8 xl:px-16 mx-auto relative z-10 flex flex-col justify-center min-h-screen">
          <AnimationWrapper>
            <motion.div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-6" variants={setVariants}>
              <div className="flex flex-col justify-center items-center sm:items-start">
                <span className=" text-[#FEC544] text-xl lg:text-2xl px-1.5">Hello, I'm</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[100px] leading-tight text-white text-center sm:text-left mt-4 lg:mt-6">
                  {data && data.length > 0 ? (
                    data[0].heading.split(" ").map((item, index) => (
                      <span key={index} className="font-black bg-clip-text">{item} </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Loading...</span>
                  )}
                </h1>
                <h2 className="mt-4 lg:mt-6 mb-6 text-gray-400 text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-snug text-center sm:text-left">
                  {data && data.length ? data[0]?.summary : null}
                </h2>
                {/* Hire Me Button */}
                <div className="mt-4 lg:mt-6">
                  <Button className="inline-flex items-center gap-2 rounded-full bg-[#FEC544] px-6 py-3 text-lg font-bold text-black shadow-md hover:bg-[#e0b841] transition duration-200">
                    Hire Me
                    <ArrowRightIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimationWrapper>
        </div>
      </motion.div>

      {/* Next Section */}
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">Next Section</h2>
      </div>
    </div>
  );
}
