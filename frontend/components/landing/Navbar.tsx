"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Docs", href: "/docs" },
    { name: "Changelog", href: "/changelog" },
];

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className="glassy bg-white/5 rounded-2xl px-2 py-2 flex items-center gap-1">
                <Link href="/" className="flex items-center gap-2 ml-4">
                    <span className="font-bold text-xl tracking-tight font-audiowide">Devonboard</span>
                </Link>
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="relative group">
                        <motion.div
                            // whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-5 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors relative z-10"
                            )}
                        >
                            {item.name}
                        </motion.div>
                        <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
}
