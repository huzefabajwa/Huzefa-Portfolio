"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as CiIcons from "react-icons/ci";
import * as CgIcons from "react-icons/cg";
import * as FiIcons from "react-icons/fi";
import * as GrIcons from "react-icons/gr";
import * as ImIcons from "react-icons/im";
import * as LuIcons from "react-icons/lu";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as SlIcons from "react-icons/sl";
import * as TfiIcons from "react-icons/tfi";
import * as VscIcons from "react-icons/vsc";

export default function ClientServicesView({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevent hydration errors

    // Function to dynamically get an icon component
    const getIconComponent = (iconName) => {
        const iconLibraries = { 
            ...FaIcons, ...AiIcons, ...MdIcons, ...RiIcons, 
            ...BiIcons, ...HiIcons, ...IoIcons, ...GiIcons, 
            ...TbIcons, ...BsIcons, ...CiIcons, ...CgIcons,
            ...FiIcons, ...GrIcons, ...ImIcons, ...LuIcons,
            ...PiIcons, ...SiIcons, ...SlIcons, ...TfiIcons, ...VscIcons
        };
        return iconLibraries[iconName] || FaIcons.FaQuestionCircle; // Default icon
    };

    // **Framer Motion Variants**
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    const gridVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                staggerChildren: 0.3, // Delays each child animation
                delayChildren: 0.2, 
                duration: 0.7, 
                ease: "easeOut" 
            } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    const iconVariants = {
        hover: { rotate: 10 }
    };

    return (
        <motion.div
            className="max-w-screen-xl sm:mt-14 sm:mb-14 px-6 sm:px-8 mx-auto mb-6 mt-24"
            id="services"
            initial="hidden"
            whileInView="visible" // Triggers animation when section is in view
            viewport={{ once: true, amount: 0.2 }} // Ensures smooth scrolling animation
            variants={sectionVariants}
        >
             <div className="relative flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] my-10">
                        {/* Background Large Text (Always Centered) */}
                        <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                            SERVICES
                        </h1>

                        {/* Foreground Smaller Heading (Always Centered & No Wrapping) */}
                        <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                            SERVICES
                        </h2>

                        {/* Underline Effect */}
                        <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                            <div className="absolute w-8 h-1 bg-amber-500"></div>
                        </div>
                    </div>

            {/* Animated Grid Container */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible" // Animates on scroll
                viewport={{ once: true, amount: 0.2 }} // Ensures smooth appearance
            >
                {data?.map((item, index) => {
                    const IconComponent = getIconComponent(item.fareacticon);

                    return (
                        <motion.div
                            key={index}
                            className="bg-[#101624] border border-gray-700 shadow-md rounded-lg p-10 flex flex-col items-center text-center text-white w-full h-80"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="cursor-pointer w-full flex flex-col items-center">
                                {/* Animated Circular Icon */}
                                <motion.div 
                                    className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-500 bg-[#101624]"
                                    variants={iconVariants}
                                    whileHover="hover"
                                >
                                    <IconComponent className="text-5xl text-[#7A8290]" />
                                </motion.div>

                                {/* Animated Project Title */}
                                <motion.h3 
                                    className="text-xl font-semibold mt-4"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {item.title}
                                </motion.h3>

                                {/* Animated Project Description */}
                                <motion.p 
                                    className="text-gray-400 text-md mt-3 px-4 line-clamp-2"
                                    whileHover={{ color: "#fbbf24" }}
                                >
                                    {item.service}
                                </motion.p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
