import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const VideoReveal = () => {
	const [isVideoRevealed, setIsVideoRevealed] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const handleOpenSurprise = () => {
		setIsVideoRevealed(true);

		// Celebration confetti explosion
		confetti({
			particleCount: 160,
			spread: 100,
			origin: { y: 0.6 },
			colors: ['#fda4af', '#fb7185', '#e11d48', '#f43f5e', '#ffffff', '#fbbf24'],
		});

		// Pause any background audio so the song plays clearly
		setTimeout(() => {
			const audios = document.querySelectorAll('audio');
			audios.forEach((audio) => audio.pause());
			if (videoRef.current) {
				videoRef.current.play().catch(() => {});
			}
		}, 300);
	};

	const handleCloseSurprise = () => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
		setIsVideoRevealed(false);
	};

	return (
		<section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-rose-50/40 to-transparent">
			<div className="max-w-4xl mx-auto text-center relative z-10">
				<AnimatePresence mode="wait">
					{!isVideoRevealed ? (
						<motion.div
							key="gift"
							initial={{ scale: 0.9, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							exit={{ scale: 1.15, opacity: 0 }}
							whileHover={{ scale: 1.04 }}
							onClick={handleOpenSurprise}
							className="cursor-pointer inline-flex flex-col items-center group">
							
							{/* Floating Gift Box with Glow */}
							<div className="relative mb-6">
								<motion.div
									animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
									transition={{ duration: 3, repeat: Infinity }}
									className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-500"
								/>
								<motion.div
									animate={{ y: [0, -12, 0] }}
									transition={{
										duration: 2.5,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
									className="relative w-28 h-28 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-3xl flex items-center justify-center border-2 border-white/60 shadow-2xl shadow-rose-500/40 group-hover:shadow-rose-500/70 transition-all duration-300">
									<Gift className="w-14 h-14 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
										className="absolute -top-2 -right-2 text-amber-300">
										<Sparkles className="w-6 h-6 fill-current" />
									</motion.div>
								</motion.div>
							</div>

							<h3 className="text-rose-600 font-display text-2xl sm:text-3xl font-semibold mb-2 flex items-center gap-2">
								<span>Tap to open a surprise</span>
								<span className="animate-bounce">🎁</span>
							</h3>
							<p className="text-gray-500 text-sm sm:text-base font-light flex items-center gap-1.5">
								<Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
								<span>A special song & memory for you, Aseye</span>
							</p>
						</motion.div>
					) : (
						<motion.div
							key="video"
							initial={{ opacity: 0, scale: 0.8, y: 30 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 30 }}
							transition={{
								type: 'spring',
								duration: 0.8,
								bounce: 0.3,
							}}
							className="relative w-full max-w-2xl mx-auto">
							
							{/* Close / Re-wrap button */}
							<div className="flex justify-between items-center mb-4 px-2">
								<div className="flex items-center gap-2 text-rose-500 font-semibold text-sm">
									<Sparkles className="w-4 h-4 text-amber-400" />
									<span>Our Special Song</span>
								</div>
								<button
									onClick={handleCloseSurprise}
									className="p-2 rounded-full bg-white/80 hover:bg-rose-100 text-gray-500 hover:text-rose-600 shadow-sm transition-all cursor-pointer"
									title="Close surprise">
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Video Container */}
							<div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white/80 relative bg-black/40 backdrop-blur-md">
								<video
									ref={videoRef}
									controls
									autoPlay
									playsInline
									className="w-full h-auto max-h-[75vh] object-cover rounded-2xl shadow-inner">
									<source src="/sonng.mp4" type="video/mp4" />
									<source src="/6-mnth-anniv/sonng.mp4" type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>

							{/* Caption Below Video */}
							<div className="mt-5 text-center">
								<p className="font-display text-lg md:text-xl text-gray-700 italic flex items-center justify-center gap-2">
									<span>Every melody reminds me of you, Aseye</span>
									<Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default VideoReveal;
