'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "../navbar"
import Footer from "../footer"
import CursorTracker from "@/components/CursorTracker"

export default function CommonLayout({ children }) {
    const pathName = usePathname();
    const isAdmin  = pathName === "/admin";

    // Add/remove `.admin-page` class on <body> so CSS can scope the custom cursor
    useEffect(() => {
        if (isAdmin) {
            document.body.classList.add("admin-page");
        } else {
            document.body.classList.remove("admin-page");
        }
        return () => document.body.classList.remove("admin-page");
    }, [isAdmin]);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Custom cursor only on portfolio, not admin */}
            {!isAdmin && <CursorTracker />}
            {!isAdmin && <Navbar />}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
}
