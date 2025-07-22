"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimationWrapper from "../animation-wrapper";
import Image from "next/image";

export default function ClientProjectView({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Fixes hydration mismatch in Next.js

    // Sort projects by creation date (latest first)
    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // **Framer Motion Variants**
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 1, ease: "easeOut" } 
        }
    };

    const gridVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                staggerChildren: 0.3, 
                delayChildren: 0.2, 
                duration: 0.7, 
                ease: "easeOut" 
            } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.7, ease: "easeOut" } 
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <AnimationWrapper> {/* Wraps everything for smooth initial animation */}
            <motion.div 
                className="max-w-screen-xl sm:mt-14 sm:mb-14 px-6 sm:px-8 mx-auto mb-6 mt-24"
                id="project"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="relative flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] my-10">
                    {/* Background Large Text (Always Centered) */}
                    <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                        PORTFOLIO
                    </h1>

                    {/* Foreground Smaller Heading (Always Centered & No Wrapping) */}
                    <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                        PORTFOLIO
                    </h2>

                    {/* Underline Effect */}
                    <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                        <div className="absolute w-8 h-1 bg-amber-500"></div>
                    </div>
                </div>

                {/* Projects Grid View with Animated Entrance */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {sortedData?.map((item, index) => {
                        const images = item.imageUrl || [];
                        const firstImage = images.length > 0 ? images[0] : null;

                        return (
                            <motion.div
                                key={index}
                                className="relative bg-gray-900 shadow-lg rounded-lg overflow-hidden h-[500px]"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <Link href={`/project/${item._id}`} passHref>
                                    <div className="cursor-pointer flex flex-col h-full">
                                        {/* Project Image */}
                                        <div className="w-full h-[190px] overflow-hidden">
                                            {firstImage ? (
                                                <Image
                                                    src={firstImage}
                                                    alt={item.name}
                                                    width={400}
                                                    height={190}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    unoptimized={true}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Project Content */}
                                        <div className="p-7 py-10 bg-[#101624] border-b-1 border-[#FDC700] rounded-b-lg text-white flex flex-col flex-grow">
                                            <h3 className="text-lg text-[#FDC700]">{item.projecttype}</h3>
                                            <h3 className="text-2xl mt-3">{item.name}</h3>
                                            <p className="text-gray-300 text-xl mt-5 flex-grow overflow-hidden">
                                                {item.shortdescription}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {item.tags?.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </AnimationWrapper>
    );
}
