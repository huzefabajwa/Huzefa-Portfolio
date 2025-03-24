"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGooglePlay, FaApple, FaGithub } from "react-icons/fa";
import LoadingScreen from "@/components/LoadingScreen";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoIosGlobe } from "react-icons/io";
import { MdAndroid } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Navbar from "@/components/client-view/navbar";

export default function ProjectDetails() {
    const params = useParams();
    const [id, setId] = useState(null);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, [params]);

    useEffect(() => {
        if (!id) return;

        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${id}`);

                if (!res.ok) throw new Error("Project not found");

                const { success, data } = await res.json();

                if (success) {
                    setProject(data);
                } else {
                    throw new Error("Project not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProject();
    }, [id]);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="text-red-500 text-center mt-10">🚨 {error}</div>;
    if (!project) return <div className="text-white text-center mt-10">🚨 Project Not Found</div>;

    const processText = (text) => {
        return text.replace(/\\n/g, "\n").split("\n").map((line, index) => {
            if (line.startsWith("- ")) {
                return (
                    <div key={index} className="flex items-start gap-2 text-lg md:text-xl">
                        <span className="text-amber-500 font-bold">•</span>
                        <p dangerouslySetInnerHTML={{ __html: formatBoldText(line.substring(2)) }} />
                    </div>
                );
            }
            return <p key={index} className="mb-2 text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: formatBoldText(line) }} />;
        });
    };

    const formatBoldText = (text) => {
        return text.replace(/\/\*(.*?)\*\//g, "<strong>$1</strong>");
    };

    const images = [project.imageUrl, project.imageUrl1, project.imageUrl2, project.imageUrl3].filter(Boolean);
    const lightboxImages = images.map((img) => ({ src: img }));

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white px-6 md:px-16 lg:px-32 py-12">
            <div className="container mx-auto flex flex-col lg:flex-row gap-16 items-start max-w-screen-xl mt-20">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-semibold text-amber-300">{project.name}</h1>
                    <div className="mt-6 text-gray-300">{processText(project.description)}</div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techstack?.split(" ").map((tech, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-800 text-white rounded-full text-lg md:text-xl font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="mt-20 flex flex-wrap gap-4 items-center">
                            {project.github && (
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-2 py-[10px] border-2 border-gray-600 bg-[#000000] text-white rounded-lg text-lg md:text-xl transition-transform duration-500 hover:scale-105"
                                >
                                    <FaGithub size={30} />
                                    View on GitHub
                                </a>
                            )}
                            {project.playstore && (
                                <a href={project.playstore} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src="/googleplaybadge.png" 
                                        alt="Get it on Google Play"
                                        className="w-40 md:w-43 h-13 transition-transform duration-200 hover:scale-105"
                                    />
                                </a>
                            )}
                            {project.ios && (
                                <a href={project.ios} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src="/appstore.png" 
                                        alt="Download on the App Store"
                                        className="w-40 md:w-40 h-13 transition-transform duration-200 hover:scale-105"
                                    />
                                </a>
                            )}
                            {project.application && (
                                <a 
                                    href={project.application} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-2 py-[10px] border-2 border-gray-600 bg-[#000000] text-white rounded-lg text-lg md:text-xl transition-transform duration-500 hover:scale-105"
                                >
                                    <MdAndroid size={30} />
                                    Download APK
                                </a>
                            )}
                            {project.weburl && (
                                <a 
                                    href={project.weburl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-2 py-[10px] border-2 border-gray-600 bg-[#000000] text-white rounded-lg text-lg md:text-xl transition-transform duration-500 hover:scale-105"
                                >
                                    <IoIosGlobe size={30} />
                                    View Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/5 relative">
                    <div className="space-y-6 flex flex-wrap justify-center lg:block">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={project.name}
                                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                                onClick={() => {
                                    setSelectedImageIndex(index);
                                    setLightboxOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxImages}
                index={selectedImageIndex}
                on={{ view: ({ index }) => setSelectedImageIndex(index) }}
                styles={{
                    container: {
                        backdropFilter: "blur(10px)", 
                        backgroundColor: "rgba(0, 0, 0, 0.2)" 
                    }
                }}
            />
        </div>
    );
}
