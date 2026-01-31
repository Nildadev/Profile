
import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
    items: string[];
    speed?: number;
    reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 20, reverse = false }) => {
    return (
        <div className="flex overflow-hidden select-none gap-8 py-10 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <motion.div
                animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
                className="flex flex-none gap-20 min-w-full items-center justify-around"
            >
                {items.map((item, idx) => (
                    <span
                        key={idx}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-400/20 hover:text-brand-primary transition-colors cursor-default whitespace-nowrap"
                    >
                        {item}
                    </span>
                ))}
                {/* Duplicate items for seamless loop */}
                {items.map((item, idx) => (
                    <span
                        key={`dup-${idx}`}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-400/20 hover:text-brand-primary transition-colors cursor-default whitespace-nowrap"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
