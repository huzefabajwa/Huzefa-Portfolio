'use client'

import { usePathname } from "next/navigation"
import Navbar from "../navbar"

export default function CommonLayout({ children }) {
    const pathName = usePathname();

    return (
        <div className="bg-custom">
            {!(pathName === "/admin" ) && <Navbar />}
            {children}
        </div>
    );
}
