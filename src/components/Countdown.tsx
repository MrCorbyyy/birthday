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
			x: [0, Math.random() * 100 - 50, 0], // Random horizontal sway
		}}
		transition={{
			duration: Math.random() * 5 + 10, // 10-15s float duration
			repeat: Infinity,
			delay: delay,
			ease: 'linear',
		}}
		className="absolute text-rose-200 pointer-events-none select-none"
		style={{
			fontSize: Math.random() * 20 + 20 + 'px',
			left: Math.random() * 100 + '%',
		}}>
		❤️
	</motion.div>
);

const Sparkle = ({ delay }: { delay: number }) => (
	<motion.div
		initial={{ scale: 0, opacity: 0 }}
		animate={{
			scale: [0, 1, 0],
			opacity: [0, 1, 0],
			rotate: [0, 180],
		}}
		transition={{
			duration: 2,
			repeat: Infinity,
			delay: delay,
			repeatDelay: Math.random() * 3,
		}}
		className="absolute text-yellow-300 pointer-events-none select-none"
		style={{
			top: Math.random() * 100 + '%',
			left: Math.random() * 100 + '%',
			fontSize: Math.random() * 10 + 10 + 'px',
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
		<div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 min-h-[60vh]">
			{/* Floating Background Hearts */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
				{[...Array(15)].map((_, i) => (
					<FloatingHeart key={i} delay={i * 2} />
				))}
			</div>

			<div className="relative bg-white/30 backdrop-blur-xl rounded-[2rem] p-8 md:p-14 shadow-2xl border border-white/40 w-full max-w-4xl overflow-hidden ring-1 ring-white/60">
				{/* Background Glow */}
				<div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-rose-200/30 blur-[100px] rounded-full pointer-events-none -z-10" />

				{/* Sparkles Overlay */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					{[...Array(8)].map((_, i) => (
						<Sparkle key={`sparkle-${i}`} delay={Math.random() * 2} />
					))}
				</div>

				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-5xl md:text-7xl text-rose-500 font-romantic mb-16 text-center drop-shadow-md tracking-wide">
					Something special is coming...
				</motion.h2>

				<div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-14">
					{timeUnits.map((unit, index) => (
						<motion.div
							key={unit.label}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className="flex flex-col items-center">
							<div className="bg-white/60 w-24 h-24 md:w-36 md:h-36 rounded-3xl flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_16px_rgba(225,29,72,0.1)] border border-white/80 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/50 pointer-events-none" />
								<AnimatePresence mode="popLayout">
									<motion.span
										key={unit.value}
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -20, opacity: 0 }}
										className="text-4xl md:text-7xl font-bold text-rose-500 relative z-10 font-sans tracking-tight">
										{String(unit.value).padStart(2, '0')}
									</motion.span>
								</AnimatePresence>
							</div>
							<span className="mt-4 text-rose-400 font-medium uppercase tracking-[0.2em] text-xs md:text-sm bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
								{unit.label}
							</span>
						</motion.div>
					))}
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-rose-500/90 text-xl md:text-2xl italic text-center max-w-2xl mx-auto leading-relaxed font-light">
					"Patience is not simply the ability to wait - it's how we behave while
					we're waiting."
				</motion.p>
			</div>
		</div>
	);
};

export default Countdown;
