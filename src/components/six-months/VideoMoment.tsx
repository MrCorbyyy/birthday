import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { surpriseVideo } from '../../data/sixMonthsMemories';

const VideoMoment = () => {
	const [isRevealed, setIsRevealed] = useState(false);

	return (
		<section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-rose-50 to-white">
			<div className="max-w-4xl mx-auto text-center">
				<AnimatePresence mode="wait">
					{!isRevealed ? (
						<motion.div
							key="prompt"
							initial={{ scale: 0.8, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							exit={{ scale: 1.2, opacity: 0 }}
							whileHover={{ scale: 1.05 }}
							onClick={() => setIsRevealed(true)}
							className="cursor-pointer flex flex-col items-center group">
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
								className="w-24 h-24 bg-white/60 backdrop-blur-lg rounded-2xl flex items-center justify-center border-2 border-white/60 shadow-xl mb-6 group-hover:bg-white/70 transition-colors relative overflow-hidden">
								<motion.div
									className="absolute inset-0 bg-gradient-to-tr from-rose-400/20 to-transparent"
									animate={{ opacity: [0.5, 0.8, 0.5] }}
									transition={{ duration: 2, repeat: Infinity }}
								/>
								<Sparkles className="w-11 h-11 text-rose-500 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
							</motion.div>
							<p className="text-rose-600 font-display text-2xl">
								One more thing before you go ✨
							</p>
						</motion.div>
					) : (
						<motion.div
							key="video"
							initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
							animate={{ opacity: 1, scale: 1, rotateX: 0 }}
							transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
							className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white/60 relative bg-black/20 backdrop-blur-sm">
							<video
								controls
								autoPlay
								playsInline
								poster={surpriseVideo.poster}
								className="w-full h-auto object-cover rounded-lg shadow-inner">
								<source src={surpriseVideo.src} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default VideoMoment;
