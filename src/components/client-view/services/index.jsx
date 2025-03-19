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

    if (!mounted) return null; // Fixes hydration mismatch

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

    return (
        <div className="max-w-screen-xl sm:mt-14 sm:mb-14 px-6 sm:px-8 mx-auto mb-6 mt-24" id="services">
            {/* Section Header */}
            <div className="relative text-center my-30">
                <h1 className="absolute inset-0 text-3xl lg:text-9xl font-bold text-gray-800 opacity-30 flex items-center justify-center">
                    SERVICES
                </h1>
                <h2 className="relative text-xl lg:text-5xl text-yellow-400">
                    SERVICES
                </h2>
                <div className="w-16 h-1 bg-gray-400 mx-auto mt-2 relative">
                    <div className="absolute w-8 h-1 bg-amber-500"></div>
                </div>
            </div>

            {/* Projects Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {data?.map((item, index) => {
                    const IconComponent = getIconComponent(item.fareacticon);

                    return (
                        <motion.div
                            key={index}
                            className="bg-[#101624] border border-gray-700 shadow-md rounded-lg p-10 flex flex-col items-center text-center text-white w-full h-80 "
                            whileHover={{}}
                            transition={{}}
                        >
                            <div className="cursor-pointer w-full flex flex-col items-center">
                                {/* Circular Icon */}
                                <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-500 bg-[#101624]">
                                    <IconComponent className="text-5xl text-[#7A8290]" />
                                </div>

                                {/* Project Title */}
                                <h3 className="text-xl font-semibold mt-4">
                                    {item.title}
                                </h3>

                                {/* Project Description (Clamped to max 2 lines) */}
                                <p className="text-gray-400 text-md mt-3 px-4 line-clamp-4">
                                    {item.service}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
