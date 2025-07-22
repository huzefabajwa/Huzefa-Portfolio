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
    console.log(data, 'ClientAboutView');

    const setVariants = useMemo(() => variants(), []);

    // Convert data fields to numbers and append "Years" for experience
    const aboutDataInfo = [
        { label: "Clients", value: Number(data?.noofclients) || 0 },
        { label: "Projects", value: Number(data?.noofprojects) || 0 },
        { label: "Years Experience", value: (Number(data?.yearsofexperience) || 0) + "+" },
    ];

    const headingText = "Why Hire Me For Your Next Project?";

    return (
        <div className="bg-[#0A101E] mt-[-56px] pb-7">
            <div className="max-w-screen-xl  sm:mt-14 sm:mb-20 px-6 sm:px-8 lg:px-16 mx-auto flex flex-col items-center justify-center mt-[30px]" id="about">
                <AnimationWrapper className="w-full flex flex-col items-center ">
                    {/* Stats Section - Commented out as per request */}
                    {false && aboutDataInfo.length > 0 && (
                        <div className="relative w-full z-10 mt-30">
                            <div className="relative">
                                <div className="rounded-lg w-full grid grid-cols-1 sm:grid-cols-3 place-items-center gap-20 sm:gap-0 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-amber-400 ">
                                    {aboutDataInfo.map((infoItem, index) => (
                                        <motion.div
                                            className="flex flex-col items-center justify-center w-full text-center py-10 px-10"
                                            key={index}
                                            custom={{ duration: 2 + index }}
                                            variants={setVariants}
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.5 }}
                                        >
                                            {infoItem.label === "Years Experience" ? (
                                                <span className="text-[50px] text-amber-300 font-semibold tracking-wider">
                                                    {infoItem.value}+
                                                </span>
                                            ) : (
                                                <AnimatedNumber value={Number(infoItem.value) || 0} duration={2 + index} />
                                            )}

                                            <p className="text-[25px] font-semibold text-white uppercase tracking-wider">
                                                {infoItem.label}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Skills Section Title - Conditionally render if there are skills */}
                    {data?.skills && data.skills.trim() !== "" && (
                        <div className="relative flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] md:min-h-[270px] lg:min-h-[320px] my-14">
                            {/* Background Large Text (Always Centered) */}
                            <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                                MY SKILLS
                            </h1>

                            {/* Foreground Smaller Heading (Always Centered & No Wrapping) */}
                            <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                                MY SKILLS
                            </h2>

                            {/* Underline Effect */}
                            <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                                <div className="absolute w-8 h-1 bg-amber-500"></div>
                            </div>
                        </div>
                    )}

                    {/* About Me & Skills Section */}
                    <div className="w-full flex flex-col lg:flex-row mt-20 mb-10">
                        {/* Left Section - Why Hire Me & About Me */}
                        <motion.div 
                            className="w-full lg:w-1/2 text-left mb-10 lg:mb-0"
                            custom={{ duration: 4 }}
                            variants={setVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl font-medium leading-[50px] mb-6">
                                {headingText}
                            </h1>
                            <motion.p 
                                className="text-gray-300 text-lg sm:text-xl mt-6 max-w-xl leading-relaxed border-l-4 border-amber-500 pl-4 italic"
                                custom={{ duration: 4.5 }}
                                variants={setVariants}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                {data?.aboutme || "I am passionate about delivering high-quality solutions with a strong focus on innovation and efficiency."}
                            </motion.p>
                        </motion.div>
                        {/* Right Section - Skills */}
                        <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
                            {/* Skills List - Conditionally render if there are skills */}
                            {data?.skills && data.skills.trim() !== "" && (
                                <div className="w-full mt-6">
                                    <AnimationWrapper className="w-full p-4">
                                        <motion.div
                                            variants={setVariants}
                                            className="flex flex-col w-full gap-6 mb-10 mt-[-37px]"
                                        >
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
                                        </motion.div>
                                    </AnimationWrapper>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimationWrapper>
            </div>
        </div>
    );
}
