"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimationWrapper from "../animation-wrapper";

export default function ClientProjectView({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Fixes hydration mismatch in Next.js

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
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }} 
                variants={sectionVariants}
            >
                {/* Section Header */}
                <motion.div className="relative text-center my-30" variants={sectionVariants}>
                    <h1 className="absolute inset-0 text-3xl lg:text-9xl font-bold text-gray-800 opacity-30 flex items-center justify-center">
                        MY WORK
                    </h1>
                    <h2 className="relative text-xl lg:text-5xl text-yellow-400">
                        PROJECTS
                    </h2>
                    <div className="w-16 h-1 bg-gray-400 mx-auto mt-2 relative">
                        <div className="absolute w-8 h-1 bg-amber-500"></div>
                    </div>
                </motion.div>

                {/* Projects Grid View with Animated Entrance */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data?.map((item, index) => {
                        const images = [item.imageUrl, item.imageUrl1, item.imageUrl2, item.imageUrl3].filter(Boolean);

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
                                            {images.length > 0 ? (
                                                <img
                                                    src={images[0]}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Project Content */}
                                        <div className="p-7 py-10 bg-[#313552] text-white flex flex-col flex-grow">
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

                                            {/* Arrow Icon */}
                                            <div className="mt-4 text-right text-yellow-400 text-2xl">
                                                ➝
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
