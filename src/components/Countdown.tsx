import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

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
			duration: Math.random() * 5 + 10,
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
		<div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900 overflow-hidden">
			{/* Animated Background Orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{
						scale: [1, 1.3, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{ duration: 10, repeat: Infinity }}
					className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
				/>
			</div>

			{/* Floating Background Hearts */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(12)].map((_, i) => (
					<FloatingHeart key={i} delay={i * 2} />
				))}
			</div>

			{/* Main Content */}
			<div className="relative z-10 w-full max-w-5xl mx-auto">
				{/* Pulsing Heart Icon */}
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{ duration: 2, repeat: Infinity }}
					className="flex justify-center mb-8">
					<div className="relative">
						<Heart className="w-20 h-20 text-rose-400 fill-rose-400" />
						<motion.div
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 0, 0.5],
							}}
							transition={{ duration: 2, repeat: Infinity }}
							className="absolute inset-0 w-20 h-20">
							<Heart className="w-20 h-20 text-rose-400 fill-rose-400" />
						</motion.div>
					</div>
				</motion.div>

				{/* Personalized Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="text-center mb-12">
					<h1 className="font-script text-6xl md:text-8xl text-rose-300 mb-4 drop-shadow-[0_0_30px_rgba(251,113,133,0.5)]">
						Hey Kemi...
					</h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 1 }}
						className="text-2xl md:text-3xl text-rose-200 font-display">
						Something special is waiting for you
					</motion.p>
				</motion.div>

				{/* Glassmorphism Card */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
					{/* Sparkles Overlay */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden">
						{[...Array(10)].map((_, i) => (
							<Sparkle key={`sparkle-${i}`} delay={Math.random() * 2} />
						))}
					</div>

					{/* Countdown Timer */}
					<div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
						{timeUnits.map((unit, index) => (
							<motion.div
								key={unit.label}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1 + index * 0.1 }}
								className="flex flex-col items-center group">
								<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110">
									{/* Animated Border */}
									<div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 opacity-80" />
									<div className="absolute inset-[2px] bg-gray-900/90 backdrop-blur-xl rounded-2xl" />

									{/* Number */}
									<div className="relative z-10">
										<AnimatePresence mode="popLayout">
											<motion.span
												key={unit.value}
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={{ y: -20, opacity: 0 }}
												className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-rose-300 to-pink-300 bg-clip-text text-transparent font-sans tracking-tight">
												{String(unit.value).padStart(2, '0')}
											</motion.span>
										</AnimatePresence>
									</div>

									{/* Glow Effect */}
									<motion.div
										animate={{
											opacity: [0, 0.3, 0],
										}}
										transition={{ duration: 2, repeat: Infinity }}
										className="absolute inset-0 bg-gradient-to-br from-rose-400/0 via-pink-400/50 to-rose-500/0 rounded-2xl"
									/>
								</div>
								<span className="mt-3 text-rose-300 font-semibold uppercase tracking-[0.2em] text-xs md:text-sm">
									{unit.label}
								</span>
							</motion.div>
						))}
					</div>

					{/* Message */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.5 }}
						className="text-center space-y-4">
						<p className="text-rose-200 text-lg md:text-xl italic font-playfair leading-relaxed">
							"Good things come to those who wait..."
						</p>
						<motion.div
							animate={{
								opacity: [0.5, 1, 0.5],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							className="flex items-center justify-center gap-2 text-rose-300">
							<Sparkles className="w-5 h-5" />
							<span className="text-sm md:text-base font-medium">
								The wait will be worth it
							</span>
							<Sparkles className="w-5 h-5" />
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Countdown;
