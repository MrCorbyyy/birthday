import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
		className="absolute text-rose-200 pointer-events-none"
		style={{
			fontSize: Math.random() * 20 + 20 + 'px',
			left: Math.random() * 100 + '%',
		}}>
		❤️
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
		<div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8">
			{/* Floating Background Hearts */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
				{[...Array(15)].map((_, i) => (
					<FloatingHeart key={i} delay={i * 2} />
				))}
			</div>

			<div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 w-full max-w-3xl">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-4xl md:text-6xl text-rose-500 font-romantic mb-12 text-center drop-shadow-sm">
					Something special is coming...
				</motion.h2>

				<div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
					{timeUnits.map((unit, index) => (
						<motion.div
							key={unit.label}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className="flex flex-col items-center">
							<div className="bg-white/80 w-20 h-20 md:w-32 md:h-32 rounded-2xl flex items-center justify-center shadow-lg border border-rose-100 relative overflow-hidden group">
								<div className="absolute inset-0 bg-rose-100/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
								<span className="text-3xl md:text-6xl font-bold text-rose-500 relative z-10">
									{String(unit.value).padStart(2, '0')}
								</span>
							</div>
							<span className="mt-4 text-rose-400 font-medium uppercase tracking-widest text-xs md:text-sm">
								{unit.label}
							</span>
						</motion.div>
					))}
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-rose-500/80 text-lg md:text-xl italic text-center max-w-lg mx-auto leading-relaxed">
					"Patience is not simply the ability to wait - it's how we behave while
					we're waiting."
				</motion.p>
			</div>
		</div>
	);
};

export default Countdown;
