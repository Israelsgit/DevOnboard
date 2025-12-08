import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="py-12 relative z-10 border-t border-white/10 bg-[#0B0B0B]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image src="/app-icon.svg" alt="Devonboard Logo" width={32} height={32} className="w-full h-full" />
                        </div>
                        <span className="font-bold text-xl tracking-tight font-audiowide">Devonboard</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-white/40">
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-white/40"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-white/40"
                        >
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-white/40"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <div className="mt-12 text-center text-sm text-white/20">
                    © {new Date().getFullYear()} Devonboard. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
