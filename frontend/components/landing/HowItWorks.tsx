"use client";

import { motion } from "framer-motion";
import { Link, BrainCircuit, CheckCircle2 } from "lucide-react";

const steps = [
    {
        icon: Link,
        title: "Paste a GitHub Link",
        description: "Simply copy and paste any public GitHub repository URL into the input field.",
        delay: 0.1,
    },
    {
        icon: BrainCircuit,
        title: "AI Processes the Repo",
        description: "Our advanced AI scans the codebase, understanding structure, dependencies, and logic.",
        delay: 0.2,
    },
    {
        icon: CheckCircle2,
        title: "Get Insights Instantly",
        description: "Receive a comprehensive summary, onboarding guide, and key architectural insights.",
        delay: 0.3,
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        From raw code to clear understanding in three simple steps.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: step.delay }}
                            whileHover={{ y: -10 }}
                            className="glassy p-8 rounded-2xl relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                    <step.icon className="w-8 h-8 text-teal-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
