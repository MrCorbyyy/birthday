import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Sparkles } from 'lucide-react';

const DatePlanner = () => {
	const [result, setResult] = useState<string | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);

	const dates = [
		'Cinema Date',
		'Cook Together',
		'Weekend Getaway',
		'Movie Marathon & Cuddles',
		'Sunset Beach Walk',
		'Fancy Dinner Date',
		'Game Night at Home',
		'Karaoke Night (Duets!)',
	];

	const spinWheel = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setResult(null);

		// Simulate spinning time
		setTimeout(() => {
			const randomDate = dates[Math.floor(Math.random() * dates.length)];
			setResult(randomDate);
			setIsSpinning(false);
		}, 3000);
	};

	return (
		<section className="min-h-screen py-24 flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-gray-900 to-gray-900" />

			<div className="z-10 text-center mb-12">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					<h2 className="text-4xl md:text-6xl font-display mb-4 p-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-300">
						Our Next Adventure
					</h2>
					<p className="text-gray-300 text-lg">
						Let fate decide our next date night!
					</p>
				</motion.div>
			</div>

			<div className="relative z-10">
				<motion.button
					onClick={spinWheel}
					animate={isSpinning ? { rotate: 360 * 5 } : {}}
					transition={{ duration: 3, ease: 'circOut' }}
					disabled={isSpinning}
					className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-rose-500/50 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:shadow-[0_0_80px_rgba(244,63,94,0.6)] transition-shadow cursor-pointer relative group ${isSpinning ? 'cursor-wait' : ''}`}>
					{/* Inner Circle decorations */}
					<div className="absolute inset-2 rounded-full border border-white/10 border-dashed animate-[spin_10s_linear_infinite]" />
					<div className="absolute inset-0 flex items-center justify-center">
						{!result && !isSpinning && (
							<div className="text-center group-hover:scale-110 transition-transform">
								<Disc className="w-12 h-12 mx-auto text-rose-400 mb-2" />
								<span className="text-2xl font-display uppercase tracking-widest block">
									Spin
								</span>
								<span className="text-xs text-rose-300">Click Me</span>
							</div>
						)}
						{isSpinning && (
							<span className="text-xl font-display uppercase tracking-widest animate-pulse">
								Spinning...
							</span>
						)}
					</div>
				</motion.button>

				{/* Result Display */}
				<AnimatePresence>
					{result && (
						<motion.div
							initial={{ opacity: 0, scale: 0.5, y: 50 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.5 }}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
							<div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl min-w-[300px]">
								<Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
								<h3 className="text-xl text-rose-200 uppercase tracking-wider mb-2">
									Winner!
								</h3>
								<p className="text-3xl font-display font-bold text-white leading-tight">
									{result}
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className="mt-12 z-10 text-center">
				<p className="text-gray-400 text-sm">
					Don't like the result? Spin again!
				</p>
			</motion.div>
		</section>
	);
};

export default DatePlanner;
