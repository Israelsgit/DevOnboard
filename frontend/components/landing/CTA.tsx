"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glassy rounded-2xl p-12 md:p-20 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                        Ready to dive in?
                    </h2>
                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto relative z-10">
                        Start understanding codebases faster today. No credit card required.
                    </p>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors flex items-center gap-2">
                            Try Devonboard Free <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-white/40 text-sm mt-4 sm:mt-0">
                            New features dropping soon.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
