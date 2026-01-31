
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const MobileNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useApp();
    const location = useLocation();

    const navItems = [
        { name: 'Khởi đầu', path: '/' },
        { name: 'Thư viện', path: '/blog' },
        { name: 'Thông tin', path: '/about' },
    ];

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleNavClick = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[60] w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group"
            >
                <div className="relative w-6 h-5">
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="absolute top-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-900 dark:bg-white -translate-y-1/2"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white"
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-50"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute inset-0 bg-slate-50 dark:bg-slate-900"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.05 }}
                            className="absolute inset-0 flex flex-col pt-24 px-6"
                        >
                            <div className="flex-1 space-y-4">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 50, opacity: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={handleNavClick}
                                            className={`
                                                block py-4 px-6 rounded-2xl text-lg font-black uppercase tracking-widest transition-all
                                                ${location.pathname === item.path
                                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                                    : 'bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pb-8 space-y-6"
                            >
                                <button
                                    onClick={toggleTheme}
                                    className="w-full py-4 px-6 rounded-2xl bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-black uppercase tracking-widest border border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                                >
                                    {theme === 'dark' ? (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                                            Light Mode
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                            Dark Mode
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
