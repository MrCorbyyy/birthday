import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const MusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// You can replace this with a direct URL to a romantic song
	// For now using a placeholder that needs to be replaced
	const audioUrl =
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current
					.play()
					.catch((e) => console.log('Audio playback failed:', e));
			}
			setIsPlaying(!isPlaying);
		}
	};

	useEffect(() => {
		// Optional: Try to auto-play on interaction
		const handleInteraction = () => {
			if (audioRef.current && !isPlaying) {
				audioRef.current
					.play()
					.then(() => setIsPlaying(true))
					.catch(() => {});
			}
			window.removeEventListener('click', handleInteraction);
		};

		window.addEventListener('click', handleInteraction);
		return () => window.removeEventListener('click', handleInteraction);
	}, [isPlaying]);

	return (
		<div className="fixed top-6 right-6 z-50">
			<audio ref={audioRef} src={audioUrl} loop />

			<motion.button
				onClick={togglePlay}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className={`
          flex items-center gap-2 px-4 py-2 rounded-full 
          backdrop-blur-md shadow-lg border transition-all duration-300
          ${
						isPlaying
							? 'bg-rose-50/80 border-rose-200 text-romantic-red'
							: 'bg-white/80 border-white/50 text-gray-500'
					}
        `}>
				{isPlaying ? (
					<motion.div
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1.5, repeat: Infinity }}>
						<Music className="w-4 h-4" />
					</motion.div>
				) : (
					<VolumeX className="w-4 h-4" />
				)}
				<span className="text-xs font-medium uppercase tracking-widest hidden md:inline-block">
					{isPlaying ? 'Hey Kemi' : 'Play Music'}
				</span>
			</motion.button>
		</div>
	);
};
