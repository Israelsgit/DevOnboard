"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Github, Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export function Hero() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleAnalyze = async () => {
        if (!url) return;
        setLoading(true);
        setError("");

        try {
            const result = await api.validateRepo(url);
            if (result.valid) {
                router.push(`/dashboard?owner=${result.owner}&repo=${result.repo}`);
            } else {
                setError("Invalid GitHub repository URL or repository not found.");
            }
        } catch (err) {
            setError("An error occurred while validating the repository.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
            <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                >
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>AI-Powered Codebase Onboarding</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-audiowide text-white"
                >
                    Understand Any <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 text-glow">
                        Codebase Faster
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
                >
                    Paste a GitHub repo and get instant insights, summaries, and onboarding guidance powered by advanced AI.
                </motion.p>

                {/* Interactive Input */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-xl mx-auto relative group"
                >
                    <div
                        className={cn(
                            "absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-400 opacity-20 blur-xl transition-opacity duration-500",
                            isFocused ? "opacity-50" : "opacity-20"
                        )}
                    />
                    <div className="relative flex items-center bg-[#0B0B0B] border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 focus-within:border-teal-500/50 focus-within:ring-1 focus-within:ring-teal-500/50">
                        <div className="pl-4 text-white/40">
                            <Github className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="https://github.com/owner/repo"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 px-4 py-3 text-lg"
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-teal-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Analyze <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-8 left-0 right-0 text-center text-red-400 text-sm"
                        >
                            {error}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
