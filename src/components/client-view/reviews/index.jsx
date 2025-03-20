"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientProjectView({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false, // Completely remove arrows
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.min(Math.max(Math.round(rating), 1), totalStars);

        return (
            <div className="flex mb-4">
                {[...Array(totalStars)].map((_, i) => (
                    <span key={i} className={`text-2xl mx-0.5 ${i < filledStars ? "text-[#FDC700]" : "text-gray-500"}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-screen-xl sm:mt-14 sm:mb-14 px-6 sm:px-8 mx-auto mb-6 mt-24" id="reviews">
            {/* Section Header */}
            <div className="relative text-center my-30">
                <h1 className="absolute inset-0 text-3xl lg:text-9xl font-bold text-gray-800 opacity-30 flex items-center justify-center">
                    TESTIMONIALS
                </h1>
                <h2 className="relative text-xl lg:text-5xl text-yellow-400">TESTIMONIALS</h2>
                <div className="w-16 h-1 bg-gray-400 mx-auto mt-2 relative">
                    <div className="absolute w-8 h-1 bg-amber-500"></div>
                </div>
            </div>

            {/* Carousel Slider */}
            <Slider {...settings} className="gap-x-6">
                {data?.map((item, index) => (
                    <div key={index} className="px-4">
                        <div className="relative bg-gray-900 shadow-lg border border-gray-700 rounded-lg overflow-hidden p-6 min-h-[250px] max-w-screen">
                            {/* Star Rating */}
                            {renderStars(item.rating)}

                            {/* Author Name */}
                            <h3 className="text-lg text-white font-bold">{item.author}</h3>

                            {/* Designation Placeholder */}
                            <p className="text-gray-400 text-sm">Graphic Designer</p>

                            {/* Content with Quote Icon */}
                            <div className="flex items-center mt-3">
                                <p className="text-gray-300 text-md leading-relaxed line-clamp-4 flex-1">
                                    {item.content}
                                </p>
                                <span className="text-[#FDC700] text-6xl ml-2">❞</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
