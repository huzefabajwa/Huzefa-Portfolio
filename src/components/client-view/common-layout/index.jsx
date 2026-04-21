'use client'

import { usePathname } from "next/navigation"
import Navbar from "../navbar"
import Footer from "../footer"
import CursorTracker from "@/components/CursorTracker"

export default function CommonLayout({ children }) {
    const pathName = usePathname();
    const isAdmin  = pathName === "/admin";

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <CursorTracker />
            {!isAdmin && <Navbar />}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
}
