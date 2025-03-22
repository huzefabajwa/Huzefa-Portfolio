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

function CreateMenus({ activeLink, setActiveLink, closeDropdown }) {
    return menuItems.map((item) => (
        <LinkScroll
            key={item.id}
            to={item.id}
            spy={true}
            smooth={true}
            duration={500}
            onClick={() => {
                setActiveLink(item.id);
                closeDropdown && closeDropdown();
            }}
            className={`px-7 py-3 cursor-pointer inline-block transition-all duration-300 uppercase text-lg tracking-wide rounded-full ${
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            {/* 🌟 Desktop Navbar */}
            <header
                className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 px-300 py-3 flex items-center bg-[#0A101E] bg-opacity-50 shadow-none ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                } hidden lg:flex`}
            >
                {/* 🚀 Brand Name */}
                <div className="text-4xl font-bold text-[#FEC544] tracking-wide uppercase mr-40">
                    T<span className="text-white">alha</span>
                </div>

                {/* 🖥️ Desktop Navigation */}
                <ul className="flex gap-6 items-center">
                    <CreateMenus setActiveLink={setActiveLink} activeLink={activeLink} />
                </ul>
            </header>

            {/* 📱 Mobile Navbar (Fixed & Transparent when closed) */}
            <div
                className={`lg:hidden fixed top-0 left-0 w-full px-4 py-3 flex items-center justify-between z-50 transition-all duration-500 ${
                    isDropdownOpen ? "bg-black bg-opacity-90" : "bg-transparent"
                }`}
            >
               

                {/* 📱 Mobile Menu Button (Fixed) */}
                <button
                    className="rounded-full border p-2 text-white hover:bg-gray-900 transition-all"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {isDropdownOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 📱 Mobile Dropdown Menu (Expands smoothly to half-screen, items fade in) */}
            <div
                className={`fixed top-0 left-0 w-full transition-all duration-500 z-40 flex flex-col items-center ${
                    isDropdownOpen ? "h-[50vh] opacity-100 visible bg-black bg-opacity-90 pt-20" : "h-0 opacity-0 invisible"
                }`}
            >
                <nav
                    className={`flex flex-col items-center space-y-6 transition-all duration-500 ${
                        isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    <CreateMenus
                        setActiveLink={setActiveLink}
                        activeLink={activeLink}
                        closeDropdown={() => setIsDropdownOpen(false)}
                    />
                </nav>
            </div>
        </>
    );
}
