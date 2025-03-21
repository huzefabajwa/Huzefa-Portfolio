"use client";
import { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { X, Menu } from "lucide-react";

const menuItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "project", label: "Project" },
    { id: "services", label: "Services" },
    { id: "reviews", label: "Testimonials" },
    
];

function CreateMenus({ activeLink, setActiveLink, closeDrawer }) {
    return menuItems.map((item) => (
        <LinkScroll
            key={item.id}
            to={item.id}
            spy={true}
            smooth={true}
            duration={500}
            onClick={() => {
                setActiveLink(item.id);
                closeDrawer && closeDrawer(); // Close mobile menu
            }}
            className={`bg-[#70E1B] px-7 py-3 cursor-pointer inline-block transition-all duration-300 uppercase text-lg  tracking-wide rounded-full border-2 border-transparent ${
                activeLink === item.id
                    ? "text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
            }`}
        >
            {item.label}
        </LinkScroll>
    ));
}

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("home");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            {/* 🌟 Centered Navbar */}
            <header
                className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 px-300 py-3 flex items-center bg-[#0A101E] bg-opacity-50 shadow-none ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                {/* 🚀 Brand Name (Desktop) */}
                <div className="hidden lg:block text-4xl font-bold text-[#FEC544] tracking-wide uppercase mr-40">
                     T<span className="text-white">alha</span>
                </div>

                {/* 🖥️ Desktop Navigation */}
                <ul className="hidden lg:flex gap-6 items-center">
                    <CreateMenus setActiveLink={setActiveLink} activeLink={activeLink} />
                </ul>

                {/* 📱 Mobile Menu Button */}
                <button
                    className="lg:hidden rounded-full border hover:bg-gray-900 transition-all ml-auto"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* 📱 Mobile Drawer Navigation */}
            <div
                className={`fixed inset-y-0 left-0 w-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-md z-[100] flex flex-col items-center justify-center transition-transform transform ${
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                } lg:hidden h-full shadow-xl border-r-2 border-green-500 rounded-r-lg`}
            >
                {/* ❌ Close Button */}
                <button
                    className="absolute top-6 right-6 bg-gray-800 text-green-400 p-3 rounded-full border border-green-500 hover:bg-gray-700 transition-all"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <X size={24} />
                </button>

                {/* 📝 Mobile Navigation Links */}
                <nav className="flex flex-col items-center space-y-6 mt-20">
                    <CreateMenus setActiveLink={setActiveLink} activeLink={activeLink} closeDrawer={() => setIsDrawerOpen(false)} />
                </nav>
            </div>
        </>
    );
}
