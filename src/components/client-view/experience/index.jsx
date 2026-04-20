'use client'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

// Icon for Timeline Dots
const TimelineIcon = () => (
    <div className="w-4 h-4 rounded-full hover:bg-amber-400"></div>
);

export default function ClientExperienceAndEducationView({ educationData, experienceData }) {
    return (
        <div className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-4 sm:px-8 mx-auto" id="experience">
                <div className="relative flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] my-10">
                        {/* Background Large Text (Always Centered) */}
                        <h1 className="absolute text-[12vw] lg:text-9xl font-bold text-gray-800 opacity-20 leading-none whitespace-nowrap">
                            RESUME
                        </h1>

                        {/* Foreground Smaller Heading (Always Centered & No Wrapping) */}
                        <h2 className="absolute text-[5vw] sm:text-2xl md:text-4xl lg:text-5xl text-yellow-400 leading-none whitespace-nowrap">
                            RESUME
                        </h2>

                        {/* Underline Effect */}
                        <div className="relative mt-30 sm:bottom-0 w-16 h-1 bg-gray-400 mx-auto">
                            <div className="absolute w-8 h-1 bg-amber-500"></div>
                        </div>
                    </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                {/* Experience Section */}
                <div className="flex flex-col gap-5">
                    <AnimationWrapper className="py-6 sm:py-16">
                        <div className="flex flex-col justify-center sm:items-start items-center text-center sm:text-left">
                            <h1 className="mb-4 text-3xl lg:text-4xl xl:text-5xl flex items-center gap-3 xl:ml-4">
                                <FaBriefcase className="text-gray-500 text-3xl sm:text-4xl" />
                                {"Experience".split(" ").map((item, index) => (
                                    <span key={index} className={`${index === 1 ? "text-green-main" : "text-white px-5"}`}>
                                        {item}{" "}
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </AnimationWrapper>

                    <AnimationWrapper>
                        <motion.div className="w-full">
                            <VerticalTimeline layout="1-column-left" lineColor="#ccc">
                                {experienceData && experienceData.length ? 
                                    experienceData.map((experienceItem, index) => (
                                        <VerticalTimelineElement
                                            key={index}
                                            className="vertical-timeline-element--work"
                                            contentStyle={{ background: '#070E1B', color: '#FFFFFF', boxShadow: "none" }}
                                            contentArrowStyle={{ display: 'none' }} 
                                            icon={<TimelineIcon />}
                                            iconStyle={{ 
                                                backgroundColor: '#070E1B',
                                                color: '#3B414D',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginLeft: '13px',
                                                marginTop: '-40px',
                                            }}
                                        >
                                            <h3 className="text-amber-400 text-2xl py-1 mt-[-65px]">{experienceItem.position}</h3>
                                            <h3 className="text-xl text-gray-400 py-1">{experienceItem.duration}</h3>
                                            <h4 className="text-xl py-1">{experienceItem.company}</h4>
                                            <h4 className="text-xl py-1">{experienceItem.location}</h4>
                                            <h4 className="text-lg text-gray-400">{experienceItem.jobprofile}</h4>
                                        </VerticalTimelineElement>
                                    )) 
                                    : null 
                                }
                            </VerticalTimeline>
                        </motion.div>
                    </AnimationWrapper>
                </div>  

                {/* Education Section */}
                <div className="flex flex-col gap-5">
                    <AnimationWrapper className="py-6 sm:py-16">
                        <div className="flex flex-col justify-center sm:items-start items-center text-center sm:text-right">
                            <h1 className="mb-4 text-3xl lg:text-4xl xl:text-5xl flex items-center gap-3 xl:ml-3">
                                <FaGraduationCap className="text-gray-400 xl:text-5xl sm:text-4xl" />
                                {"Education".split(" ").map((item, index) => (
                                    <span key={index} className={`${index === 1 ? "text-green-main" : "text-white px-5"}`}>
                                        {item}{" "}
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </AnimationWrapper>

                    <AnimationWrapper>
                        <motion.div className="w-full">
                            <VerticalTimeline layout="1-column-left" lineColor="#ccc">
                                {educationData && educationData.length ? 
                                    educationData.map((educationItem, index) => (
                                        <VerticalTimelineElement
                                            key={index}
                                            className="vertical-timeline-element--education"
                                            contentStyle={{ background: '#070E1B', color: '#FFFFFF', boxShadow: "none" }}
                                            contentArrowStyle={{ display: 'none' }}
                                            icon={<TimelineIcon />}
                                            iconStyle={{ 
                                                background: '#070E1B',
                                                color: '#fff',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginLeft: '13px',
                                                marginTop: '-40px',
                                            }}
                                        >
                                            <h3 className="text-amber-400 text-2xl py-1 mt-[-65px]">{educationItem.degree}</h3>
                                            <h4 className="text-xl mt-[10px] text-gray-400">{educationItem.year}</h4>
                                            <h4 className="text-xl py-1 mt-[10px]">{educationItem.college}</h4>
                                        </VerticalTimelineElement>
                                    )) 
                                    : null 
                                }
                            </VerticalTimeline>
                        </motion.div>
                    </AnimationWrapper>
                </div>  

            </div> 
        </div>
    )
}
