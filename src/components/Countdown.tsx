import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
	targetDate: string; // ISO string or parsable date string
	onComplete: () => void;
}

const calculateTimeLeft = (targetDate: string) => {
	const difference = +new Date(targetDate) - +new Date();
	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	};

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}

	return { total: difference, ...timeLeft };
};

const FloatingHeart = ({ delay }: { delay: number }) => (
	<motion.div
		initial={{ y: '100vh', opacity: 0 }}
		animate={{
			y: '-100vh',
			opacity: [0, 1, 0],
			x: [0, Math.random() * 100 - 50, 0],
		}}
		transition={{
			duration: Math.random() * 5 + 12,
			repeat: Infinity,
			delay: delay,
			ease: 'linear',
		}}
		className="absolute text-rose-200 pointer-events-none select-none"
		style={{
			fontSize: Math.random() * 25 + 25 + 'px',
			left: Math.random() * 100 + '%',
		}}>
		❤️
	</motion.div>
);

const Sparkle = ({ delay }: { delay: number }) => (
	<motion.div
		initial={{ scale: 0, opacity: 0 }}
		animate={{
			scale: [0, 1.2, 0],
			opacity: [0, 1, 0],
			rotate: [0, 180],
		}}
		transition={{
			duration: 2.5,
			repeat: Infinity,
			delay: delay,
			repeatDelay: Math.random() * 4,
		}}
		className="absolute text-yellow-300 pointer-events-none select-none"
		style={{
			top: Math.random() * 100 + '%',
			left: Math.random() * 100 + '%',
			fontSize: Math.random() * 12 + 12 + 'px',
		}}>
		✨
	</motion.div>
);

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
	const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

	useEffect(() => {
		const timer = setInterval(() => {
			const newTime = calculateTimeLeft(targetDate);
			setTimeLeft(newTime);

			if (newTime.total <= 0) {
				clearInterval(timer);
				onComplete();
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate, onComplete]);

	if (timeLeft.total <= 0) {
		return null;
	}

	const timeUnits = [
		{ label: 'Days', value: timeLeft.days },
		{ label: 'Hours', value: timeLeft.hours },
		{ label: 'Minutes', value: timeLeft.minutes },
		{ label: 'Seconds', value: timeLeft.seconds },
	];

	return (
		<div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-8 min-h-[70vh]">
			{/* Floating Background Hearts */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
				{[...Array(20)].map((_, i) => (
					<FloatingHeart key={i} delay={i * 1.5} />
				))}
			</div>

			<div className="relative bg-white/20 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/50 w-full max-w-5xl overflow-hidden ring-2 ring-white/70">
				{/* Animated gradient border */}
				<div className="absolute inset-0 rounded-[3rem] p-[3px] bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 animate-gradient -z-10 blur-sm" />

				{/* Background Glow */}
				<div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-rose-200/40 blur-[120px] rounded-full pointer-events-none -z-10" />

				{/* Sparkles Overlay */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
					{[...Array(12)].map((_, i) => (
						<Sparkle key={`sparkle-${i}`} delay={Math.random() * 3} />
					))}
				</div>

				<motion.h2
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-5xl md:text-7xl lg:text-8xl text-rose-500 font-romantic mb-20 text-center drop-shadow-lg tracking-wide text-glow">
					Something special is coming...
				</motion.h2>

				<div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
					{timeUnits.map((unit, index) => (
						<motion.div
							key={unit.label}
							initial={{ opacity: 0, scale: 0.5, y: 30 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{
								delay: index * 0.15,
								duration: 0.6,
								type: 'spring',
							}}
							className="flex flex-col items-center group">
							<div className="relative">
								{/* Glow effect */}
								<div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

								<div className="relative bg-white/70 w-28 h-28 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_10px_20px_rgba(225,29,72,0.15)] border-2 border-white/90 overflow-hidden group-hover:scale-105 transition-transform duration-300">
									<div className="absolute inset-0 bg-gradient-to-b from-white/50 to-rose-50/80 pointer-events-none" />
									<AnimatePresence mode="popLayout">
										<motion.span
											key={unit.value}
											initial={{ y: 30, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: -30, opacity: 0 }}
											transition={{
												type: 'spring',
												stiffness: 300,
												damping: 25,
											}}
											className="text-5xl md:text-7xl font-bold text-rose-500 relative z-10 font-sans tracking-tight">
											{String(unit.value).padStart(2, '0')}
										</motion.span>
									</AnimatePresence>
								</div>
							</div>
							<span className="mt-5 text-rose-500 font-semibold uppercase tracking-[0.25em] text-xs md:text-sm bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30 shadow-sm">
								{unit.label}
							</span>
						</motion.div>
					))}
				</div>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="text-rose-600 text-xl md:text-2xl lg:text-3xl italic text-center max-w-3xl mx-auto leading-relaxed font-light">
					"Patience is not simply the ability to wait - it's how we behave while
					we're waiting."
				</motion.p>

				{/* Decorative hearts */}
				<div className="flex justify-center gap-3 mt-10">
					<motion.span
						animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2, delay: 0 }}
						className="text-rose-300 text-3xl">
						❤
					</motion.span>
					<motion.span
						animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
						transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
						className="text-pink-300 text-3xl">
						💕
					</motion.span>
					<motion.span
						animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
						className="text-rose-300 text-3xl">
						❤
					</motion.span>
				</div>
			</div>
		</div>
	);
};

export default Countdown;
