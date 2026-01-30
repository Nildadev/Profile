import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

const SkyBackground: React.FC = () => {
    const { theme } = useApp();

    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random(),
            size: `${Math.random() * 2 + 1}px`
        }));
    }, []);

    const clouds = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 40}%`,
            left: `${-20 - Math.random() * 20}%`, // Start off-screen
            scale: 0.5 + Math.random() * 1.5,
            opacity: 0.3 + Math.random() * 0.5,
            animationDuration: `${20 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * -10}s` // Random start time
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {theme === 'dark' ? (
                <div className="absolute inset-0">
                    {stars.map(star => (
                        <div
                            key={star.id}
                            className="absolute bg-white rounded-full animate-twinkle"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: star.size,
                                height: star.size,
                                animationDelay: star.animationDelay,
                                opacity: star.opacity
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="absolute inset-0">
                    {clouds.map(cloud => (
                        <div
                            key={cloud.id}
                            className="absolute text-white/40 blur-xl animate-drift whitespace-nowrap"
                            style={{
                                top: cloud.top,
                                fontSize: `${cloud.scale * 100}px`,
                                animationDuration: cloud.animationDuration,
                                animationDelay: cloud.animationDelay,
                                opacity: cloud.opacity
                            }}
                        >
                            ☁️
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkyBackground;
