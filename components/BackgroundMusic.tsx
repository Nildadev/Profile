import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio with root-relative path to handle sub-routes correctly
        const audio = new Audio('/bgm.mp3');
        audio.loop = true;
        audio.volume = 0.6; // Slightly louder
        audioRef.current = audio;

        const startAudio = () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    // Remove listeners once playing
                    window.removeEventListener('click', startAudio);
                    window.removeEventListener('touchstart', startAudio);
                    window.removeEventListener('scroll', startAudio);
                    window.removeEventListener('keydown', startAudio);
                }).catch((error) => {
                    console.log("Autoplay prevented:", error);
                    setIsPlaying(false);
                });
            }
        };

        // Try to play immediately
        startAudio();

        // Listen for user interactions to trigger play
        window.addEventListener('click', startAudio);
        window.addEventListener('touchstart', startAudio);
        window.addEventListener('scroll', startAudio);
        window.addEventListener('keydown', startAudio);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('scroll', startAudio);
            window.removeEventListener('keydown', startAudio);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Manual playback failed:", error);
                setIsPlaying(false);
            });
        }
    };

    return (
        <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        >
            {isPlaying ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 010 12.728" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 010 12.728" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l3 3m0 0l3 3m-3-3l3-3m-3 3l-3 3" />
                </svg>
            )}
        </button>
    );
};

export default BackgroundMusic;
