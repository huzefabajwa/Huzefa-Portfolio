"use client";

import { useMemo, useRef, useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaUpwork, FaLinkedin, FaGithub } from "react-icons/fa6";
import { FaSlack } from "react-icons/fa";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
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

export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Move profile image horizontally on scroll
  const x = useTransform(scrollYProgress, [0, 1], [0, 400]);

  // Move social media ribbon slightly on scroll
  const socialX = useTransform(scrollYProgress, [0, 1], [0, 400]);

  // Track hovered icon
  const [hovered, setHovered] = useState(null);

  // Extract dynamic links from `data`
  const hireMeLink = data?.[0]?.hireme || "#";
  const upworkLink = data?.[0]?.upwork?.trim() || "";
  const slackLink = data?.[0]?.slack?.trim() || "";
  const githubLink = data?.[0]?.github?.trim() || "";

   // Social media icons with validation
   const socialIcons = [
    { id: "upwork", icon: <FaUpwork />, name: "Upwork", link: upworkLink },
    { id: "slack", icon: <FaSlack />, name: "Slack", link: slackLink },
    { id: "github", icon: <FaGithub />, name: "GitHub", link: githubLink },
  ].filter((item) => item.link.trim() !== "");
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      {/* <div className="stars4"></div> */}
      <div className="stars5"></div>
      <div className="stars5"></div>
      <div className="stars6"></div>
     
      
      
      {/* Particles Background */}
      <Particles
        className="absolute top-0 left-0 w-full h-full z-0"
        init={async (engine) => {
          await loadFull(engine);
        }}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#ffffff", "#FEC544"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 4, random: true },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              bubble: { size: 8, distance: 100 },
              repulse: { distance: 100 },
            },
          },
        }}
      />

      {/* Content Wrapper */}
      <motion.div className="relative w-full flex flex-col items-center sm:flex-row sm:justify-center min-h-screen" id="home">
        {/* Mobile View: Profile Picture & Social Icons */}
        <div className="flex flex-col items-center justify-center sm:hidden md:hidden mt-10">
          <div className="mt-40 w-50 h-50 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
          </div>
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

        {/* Social Media Ribbon & Profile Picture */}
        <motion.div className="absolute right-0 top-0 h-full w-full sm:w-[50%] lg:w-[60%] xl:w-[60%] flex items-center justify-end overflow-visible">
          {/* Social Media Ribbon */}
          <motion.div
            style={{ x: socialX }}
            className="relative flex flex-col bottom-10 items-start mt-auto bg-gray-800 px-5 py-3 rounded-l-full border border-white/30 shadow-lg z-100 hidden sm:flex w-[515px]"
          >
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
                  layoutId={`social-${item.id}`}
                  animate={{
                    width: hovered === item.id ? 150 : 51,
                  }}
                >
                  <span className="w-16 h-12 flex items-center justify-center">{item.icon}</span>
                  {hovered === item.id && (
                    <span className="ml-1 text-lg text-white font-medium">{item.name}</span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            style={{ x }}
            className="relative h-full w-full z-10 hidden sm:block md:block"
          >
            <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
          </motion.div>
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
                  {data?.[0]?.summary}
                </h2>
                <a href={hireMeLink} target="_blank" rel="noopener noreferrer">
                  <Button className="mt-5 bg-[#FEC544] px-12 py-3 text-lg rounded-full text-black shadow-md hover:bg-[#e0b841] transition duration-200">
                    Hire Me
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimationWrapper>
        </div>
      </motion.div>
       {/* Twinkling Stars CSS */}
       <style jsx>{`
  body {
    background: black;
    overflow: hidden;
  }

  /* Star layers */
  .stars, .stars2, .stars3, .stars4, .stars5, .stars6 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: repeat;
    background-size: cover;
  }

  /* Layer 1 - Ultra Tiny Stars (Max Density) */
  .stars {
    background-image: 
      radial-gradient(white 0.3px, transparent 0.6px),
      radial-gradient(white 0.3px, transparent 0.6px);
    background-size: 150px 150px, 180px 180px;
    animation: twinkle 2s infinite ease-in-out alternate;
  }

  /* Layer 2 - Tiny Stars */
  .stars2 {
    background-image: 
      radial-gradient(white 0.4px, transparent 0.8px),
      radial-gradient(white 0.4px, transparent 0.8px);
    background-size: 200px 200px, 220px 220px;
    animation: twinkle 2.5s infinite ease-in-out alternate;
  }

  /* Layer 3 - Small Stars */
  .stars3 {
    background-image: 
      radial-gradient(white 0.5px, transparent 1px),
      radial-gradient(white 0.5px, transparent 1px);
    background-size: 250px 250px, 280px 280px;
    animation: twinkle 3s infinite ease-in-out alternate;
  }

  /* Layer 4 - Medium Stars */
  .stars4 {
    background-image: 
      radial-gradient(white 0.7px, transparent 1.5px),
      radial-gradient(white 0.7px, transparent 1.5px);
    background-size: 350px 350px, 380px 380px;
    animation: twinkle 3.5s infinite ease-in-out alternate;
  }

  /* Layer 5 - Large Stars */
  .stars5 {
    background-image: 
      radial-gradient(white 1px, transparent 2px),
      radial-gradient(white 1px, transparent 2px);
    background-size: 500px 500px, 550px 550px;
    animation: twinkle 4s infinite ease-in-out alternate;
  }

  /* Layer 6 - Biggest Stars (Soft Glow) */
  .stars6 {
    background-image: 
      radial-gradient(rgba(255, 255, 255, 0.8) 1.2px, transparent 2.5px),
      radial-gradient(rgba(255, 255, 255, 0.8) 1.2px, transparent 2.5px);
    background-size: 650px 650px, 700px 700px;
    animation: twinkle 4.5s infinite ease-in-out alternate;
  }

  /* Twinkling Animation (More Random & Smooth) */
  @keyframes twinkle {
    0% { opacity: 0.1; }
    30% { opacity: 0.6; }
    60% { opacity: 1; }
    90% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
`}</style>








    </div>
  );
}
