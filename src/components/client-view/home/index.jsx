"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaUpwork, FaGithub } from "react-icons/fa6";
import { FaSlack } from "react-icons/fa";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";
import { Typewriter } from "react-simple-typewriter";
import talhabajwa from "../../../app/assets/Talhabajwa.jpg";
import * as THREE from "three";

// Import JetBrains Mono font from next/font/google
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains", // Define CSS variable
});

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
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const socialX = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const [hovered, setHovered] = useState(null);
  const hireMeLink = data?.[0]?.hireme || "#";
  const upworkLink = data?.[0]?.upwork?.trim() || "";
  const slackLink = data?.[0]?.slack?.trim() || "";
  const githubLink = data?.[0]?.github?.trim() || "";
  const rawSummary = data?.[0]?.summary || "Passionate Developer, Problem Solver";
  const summaryParts = rawSummary.split(",");

  const socialIcons = [
    { id: "upwork", icon: <FaUpwork />, name: "Upwork", link: upworkLink },
    { id: "slack", icon: <FaSlack />, name: "Slack", link: slackLink },
    { id: "github", icon: <FaGithub />, name: "GitHub", link: githubLink },
  ].filter((item) => item.link.trim() !== "");

// Ensure Three.js initializes only after mounting
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (!mounted || typeof window === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
  renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
  containerRef.current.appendChild(renderer.domElement);

  // Create star particles
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8, // Smaller size for uniform stars
    transparent: true,
    depthWrite: false
  });

  const starVertices = [];
  const starOpacities = new Float32Array(2000);
  const starFlickerSpeeds = [];

  for (let i = 0; i < 3000; i++) {
    const radius = Math.random() * 1000 + 500; // Stars distributed naturally in a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    starVertices.push(x, y, z);
    starFlickerSpeeds.push(0.002 + Math.random() * 0.00); // Flicker speed
    starOpacities[i] = Math.random(); // Initial random brightness
  }

  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
  starGeometry.setAttribute("alpha", new THREE.Float32BufferAttribute(starOpacities, 1));

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  camera.position.z = 500;

  // Animate stars with independent twinkling
  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate stars for a subtle motion
    stars.rotation.x += 0.0001;
    stars.rotation.y += 0.0001;

    // Update each star's opacity for the twinkling effect
    const positions = starGeometry.attributes.position.array;
    const alphas = starGeometry.attributes.alpha.array;

    for (let i = 0; i < alphas.length; i++) {
      alphas[i] = 0.4 + 0.6 * Math.sin(Date.now() * starFlickerSpeeds[i]); // Smooth dimming and lighting
    }

    starGeometry.attributes.alpha.needsUpdate = true; // Update changes

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    renderer.dispose();
    containerRef.current.removeChild(renderer.domElement);
  };
}, [mounted]);


  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
         {mounted && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />}
    <motion.div className="relative w-full flex flex-col items-center sm:flex-row sm:justify-center min-h-screen" id="home">
    
      <div className="flex flex-col items-center justify-center sm:hidden md:hidden mt-10">
      
        <div className="mt-10 w-50 h-50 relative z-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
        </div>
        <div className="mt-4 mb-[-100px] z-20 flex flex-row gap-4">
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

      <motion.div className="absolute right-0 top-0 h-full w-full sm:w-[50%] lg:w-[60%] xl:w-[60%] flex items-center justify-end overflow-visible">
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

        <motion.div
          style={{ x }}
          className="relative h-full w-full z-10 hidden sm:block md:block"
        >
          <Image src={talhabajwa} alt="Profile Picture" quality={100} fill className="object-cover" />
        </motion.div>
      </motion.div>

      <div className="mt-5 w-full max-w-screen-xl px-6 lg:px-8 xl:px-16 mx-auto relative z-10 flex flex-col justify-center min-h-screen">
        <AnimationWrapper>
          <motion.div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-6" variants={setVariants}>
            <div className="flex flex-col justify-center items-center sm:items-start">
              <span className="text-[#FEC544] text-xl lg:text-2xl px-1.5">Hello, I'm</span>
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
              <span className="font-mono text-white" style={{ fontFamily: 'var(--font-jetbrains)' }}>

                  <Typewriter
                    words={summaryParts}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
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
  </div>
  );
}
