
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center group shadow-2xl hover:shadow-brand-primary/20 transition-all"
                >
                    <motion.div
                        whileHover={{ rotate: -180 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        <svg className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
