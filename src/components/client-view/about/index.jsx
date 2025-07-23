'use client';
import { useMemo, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AnimationWrapper from "../animation-wrapper";

// Function to define animation variants
function variants() {
    return {
        offscreen: { y: 150, opacity: 0 },
        onscreen: ({ duration = 2 } = {}) => ({
            y: 0,
            opacity: 1,
            transition: { type: "spring", duration },
        }),
    };
}

const skillsItemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", duration: 1 },
    },
};

// Animated Number Component
const AnimatedNumber = ({ value, duration = 2 }) => {
    const controls = useAnimation();
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        controls.start({
            value,
            transition: { duration, ease: "easeOut" },
        });
    }, [value, controls, duration]);

    return (
        <motion.span
            animate={controls}
            initial={{ value: 0 }}
            onUpdate={(latest) => setDisplayValue(Math.floor(latest.value))}
            className="text-[50px] text-amber-300 font-semibold tracking-wider"
        >
            {displayValue}+
        </motion.span>
    );
};

export default function ClientAboutView({ data }) {
    const setVariants = useMemo(() => variants(), []);

    const aboutDataInfo = [
        { label: "Clients", value: Number(data?.noofclients) || 0 },
        { label: "Projects", value: Number(data?.noofprojects) || 0 },
        { label: "Years Experience", value: (Number(data?.yearsofexperience) || 0) + "+" },
    ];

    const headingText = "Why Hire Me For Your Next Project?";

    return (
        <div className="bg-[#0A101E] mt-[-56px] pb-7">
            <div
                className="max-w-screen-xl sm:mt-14 sm:mb-20 px-6 sm:px-8 lg:px-16 mx-auto flex flex-col items-center justify-center mt-[30px]"
                id="about"
            >
                <AnimationWrapper className="w-full flex flex-col items-center ">

                    {/* Skills Section Title */}
                    {data?.skills && data.skills.trim() !== "" && (
                        <div className="relative flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] md:min-h-[270px] lg:min-h-[320px] my-3">
                            <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                                MY SKILLS
                            </h1>
                            <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                                MY SKILLS
                            </h2>
                            <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                                <div className="absolute w-8 h-1 bg-amber-500"></div>
                            </div>
                        </div>
                    )}

                    {/* About Me & Skills Section (Synced Animation) */}
                    <motion.div
                        className="w-full flex flex-col lg:flex-row mt-1 mb-1"
                        custom={{ duration: 2 }}
                        variants={setVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* About Me Section */}
                        <div className="w-full lg:w-1/2 text-left mb-3 lg:mb-0">
                            <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl font-medium leading-[50px] mb-6">
                                {headingText}
                            </h1>
                            <p className="text-gray-300 text-lg sm:text-xl max-w-xl leading-relaxed border-l-4 border-amber-500 pl-4 italic">
                                {data?.aboutme || "I am passionate about delivering high-quality solutions with a strong focus on innovation and efficiency."}
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="w-full lg:w-1/2 mt-3 lg:mt-0">
                            {data?.skills && data.skills.trim() !== "" && (
                                <div className="w-full mt-6">
                                    <AnimationWrapper className="w-full p-4">
                                        <div className="flex flex-col w-full gap-6 mb-10 mt-[-37px]">
                                            {data.skills.split(",").map((skill, index) => {
                                                const match = skill.trim().match(/^(.*?)[\s-]+(\d+)$/);
                                                if (!match) return null;

                                                const skillName = match[1].trim();
                                                const percentage = parseInt(match[2]);

                                                return (
                                                    <motion.div
                                                        key={index}
                                                        className="w-full flex flex-col"
                                                        variants={skillsItemVariant}
                                                        initial="hidden"
                                                        whileInView="visible"
                                                        viewport={{ once: true }}
                                                    >
                                                        <div className="flex justify-between w-full text-white text-xl mb-2">
                                                            <span className="font-semibold">{skillName}</span>
                                                            <span className="text-amber-400">{percentage}%</span>
                                                        </div>

                                                        <div className="w-full bg-gray-300 h-1 relative overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-amber-400"
                                                                style={{ width: `${percentage}%` }}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${percentage}%` }}
                                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </AnimationWrapper>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimationWrapper>
            </div>
        </div>
    );
}
