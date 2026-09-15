import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, Gift, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';


interface TimeRemaining {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isPast: boolean;
}

const calculateTimeLeft = (): TimeRemaining => {
	const now = new Date();
	const year = now.getFullYear();
	// Target: September 21st at 12:00:00 AM (midnight)
	// Month is 8 (September in 0-indexed Date)
	let target = new Date(year, 8, 21, 0, 0, 0);

	// If the entire birthday day has passed, target next year
	if (now.getTime() > target.getTime() + 24 * 60 * 60 * 1000) {
		target = new Date(year + 1, 8, 21, 0, 0, 0);
	}

	const diff = target.getTime() - now.getTime();
	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
	}

	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / 1000 / 60) % 60),
		seconds: Math.floor((diff / 1000) % 60),
		isPast: false,
	};
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
	<div className="flex flex-col items-center">
		<div className="relative group">
			<div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-sm opacity-40 group-hover:opacity-75 transition duration-500" />
			<div className="relative bg-black/40 backdrop-blur-md border border-rose-400/30 rounded-2xl w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-22 flex items-center justify-center shadow-inner">
				<span className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300">
					{String(value).padStart(2, '0')}
				</span>
			</div>
		</div>
		<span className="mt-2 text-[10px] sm:text-xs font-semibold tracking-widest text-rose-300 uppercase">
			{label}
		</span>
	</div>
);

const candles = Array.from({ length: 7 });


const BirthdayCandle = ({ delay }: { delay: number }) => {
	const [isBlown, setIsBlown] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay }}
			className="flex flex-col items-center cursor-pointer"
			onClick={() => setIsBlown((b) => !b)}>
			{/* Flame */}
			<AnimatePresence>
				{!isBlown && (
					<motion.div
						key="flame"
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: 1,
							scale: [1, 1.15, 0.9, 1.1, 1],
							x: [0, 2, -2, 1, 0],
						}}
						exit={{ opacity: 0, scale: 0, y: -10 }}
						transition={{
							scale: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
							x: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
						}}
						className="relative mb-[-4px]">
						{/* Outer glow */}
						<div className="absolute inset-0 rounded-full blur-md bg-amber-400/50 scale-150" />
						{/* Inner flame */}
						<div
							className="w-4 h-6 rounded-t-full rounded-b-sm relative"
							style={{
								background:
									'radial-gradient(ellipse at 50% 80%, #fff 0%, #fbbf24 40%, #f97316 80%, #dc2626 100%)',
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Candle body */}
			<div
				className="w-5 h-16 rounded-sm shadow-md relative overflow-hidden"
				style={{
					background: 'linear-gradient(135deg, #fda4af 0%, #fb7185 50%, #e11d48 100%)',
				}}>
				{/* Wax drip */}
				<div className="absolute top-0 left-1 w-1 h-3 bg-white/30 rounded-b-full" />
				{/* Shine */}
				<div className="absolute top-0 left-0 w-1.5 h-full bg-white/20 rounded-r-sm" />
			</div>

			{/* Candle base */}
			<div className="w-7 h-2 bg-rose-200 rounded-full" />
		</motion.div>
	);
};

const FloatingPetal = ({ i }: { i: number }) => (
	<motion.div
		className="absolute text-2xl pointer-events-none select-none"
		initial={{
			x: `${10 + i * 12}vw`,
			y: '110vh',
			opacity: 0,
			rotate: Math.random() * 360,
		}}
		animate={{
			y: '-10vh',
			opacity: [0, 0.8, 0.8, 0],
			rotate: Math.random() * 360 + 360,
			x: `${10 + i * 12 + (Math.random() - 0.5) * 8}vw`,
		}}
		transition={{
			duration: 6 + Math.random() * 4,
			delay: i * 0.4,
			repeat: Infinity,
			repeatDelay: Math.random() * 3,
			ease: 'easeInOut',
		}}>
		{['🌸', '🌺', '✨', '💫', '🌷', '⭐', '💕', '🌹'][i % 8]}
	</motion.div>
);

const prayers = [
	'May every dream you carry in your heart bloom into something more beautiful than you imagined.',
	'May God surround you with love, laughter, and every good thing you deserve this year and beyond.',
	'May this new year of your life bring you peace that passes understanding, joy that never fades, and love that keeps growing.',
];

const Birthday = () => {
	const [revealed, setRevealed] = useState(false);
	const [prayerIndex, setPrayerIndex] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeLeft());
	const [isUnlocked, setIsUnlocked] = useState(false);

	const handleUnlock = () => {
		if (!timeLeft.isPast) return;
		confetti({
			particleCount: 160,
			spread: 100,
			origin: { y: 0.6 },
			colors: ['#fda4af', '#fb7185', '#e11d48', '#f43f5e', '#ffffff', '#fbbf24'],
		});
		setIsUnlocked(true);
	};


	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearInterval(timer);
	}, []);




	useEffect(() => {
		if (revealed) {
			timerRef.current = setInterval(() => {
				setPrayerIndex((prev) => (prev + 1) % prayers.length);
			}, 5000);
		}
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [revealed]);

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-950 via-pink-900 to-purple-950 py-20 px-4">
			{/* Floating petals */}
			{Array.from({ length: 8 }).map((_, i) => (
				<FloatingPetal key={i} i={i} />
			))}

			{/* Starfield */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 50 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full bg-white"
						style={{
							width: Math.random() * 3 + 1,
							height: Math.random() * 3 + 1,
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{ opacity: [0.1, 0.9, 0.1] }}
						transition={{
							duration: 2 + Math.random() * 3,
							repeat: Infinity,
							delay: Math.random() * 3,
						}}
					/>
				))}
			</div>

			{/* Glow orbs */}
			<motion.div
				animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
				transition={{ duration: 8, repeat: Infinity }}
				className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"
			/>
			<motion.div
				animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
				transition={{ duration: 10, repeat: Infinity }}
				className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
			/>

			<div className="relative z-10 w-full max-w-3xl mx-auto text-center">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="mb-10">
					<motion.p
						animate={{ opacity: [0.6, 1, 0.6] }}
						transition={{ duration: 3, repeat: Infinity }}
						className="text-rose-300 text-sm uppercase tracking-[0.3em] mb-3">
						21st September
					</motion.p>
					<h2 className="text-6xl md:text-8xl font-script text-white leading-none mb-4"
						style={{
							textShadow: '0 0 40px rgba(251, 113, 133, 0.6)',
						}}>
						Happy Birthday
					</h2>
					<motion.h3
						animate={{
							textShadow: [
								'0 0 20px rgba(251, 113, 133, 0.4)',
								'0 0 50px rgba(251, 113, 133, 0.8)',
								'0 0 20px rgba(251, 113, 133, 0.4)',
							],
						}}
						transition={{ duration: 2.5, repeat: Infinity }}
						className="text-5xl md:text-7xl font-script text-rose-300">
						Aseye ✨
					</motion.h3>
				</motion.div>

				{/* Birthday Countdown */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="mb-12 max-w-xl mx-auto">
					<div className="bg-white/5 backdrop-blur-xl border border-rose-300/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
						<div className="flex items-center justify-center gap-2 mb-5 text-rose-300">
							<Clock className="w-4 h-4 animate-pulse" />
							<span className="text-xs uppercase tracking-widest font-semibold">
								{timeLeft.isPast ? "It's Celebration Time!" : "Countdown to Midnight, Sept 21st"}
							</span>
							<Sparkles className="w-4 h-4 text-amber-300" />
						</div>

						{timeLeft.isPast ? (
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: [1, 1.05, 1] }}
								transition={{ repeat: Infinity, duration: 2 }}
								className="py-4">
								<p className="font-script text-4xl sm:text-5xl text-rose-300">
									🎉 Today is the Day! Happy Birthday, Aseye! 🎂
								</p>
							</motion.div>
						) : (
							<div className="grid grid-cols-4 gap-2 sm:gap-4 justify-items-center">
								<CountdownUnit value={timeLeft.days} label="Days" />
								<CountdownUnit value={timeLeft.hours} label="Hours" />
								<CountdownUnit value={timeLeft.minutes} label="Mins" />
								<CountdownUnit value={timeLeft.seconds} label="Secs" />
							</div>
						)}
					</div>
				</motion.div>


				{timeLeft.isPast && isUnlocked ? (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}>

						{/* Candles */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="flex justify-center gap-4 mb-10">
							{candles.map((_, i) => (
								<BirthdayCandle key={i} delay={0.5 + i * 0.1} />
							))}
						</motion.div>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 1.2 }}
							className="text-rose-300/60 text-xs italic mb-12">
							(tap a candle to blow it out 🎂)
						</motion.p>

						{/* Main message card */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl text-left">
							<div className="space-y-5 text-white/90 font-display text-lg md:text-xl leading-relaxed">
								<p>
									<span className="text-5xl text-rose-300 font-script float-left mr-3 mt-[-8px]">A</span>
									seye, where do I even begin? The universe did something truly special when it decided
									to bring you into this world on September 21st.
								</p>
								<p>
									You are the kind of person who makes ordinary moments feel like something out of a
									movie the way you laugh, the way you think, the way you show up. Every day with
									you in my world is a gift I don't take for granted.
								</p>
								<p>
									On this day, I don't just want to say <em className="text-rose-300">"Happy Birthday"</em> and move on.
									I want you to feel it deep in your chest how loved you are. How seen you are.
									How much light you carry without even knowing it.
								</p>
								<p>
									Here's to you, Aseye. Here's to everything you are, everything you're becoming,
									and everything we're building together. 🥂
								</p>
							</div>
						</motion.div>

						{/* Prayer section */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.8, duration: 0.8 }}
							className="mb-8">
							<button
								onClick={() => setRevealed(true)}
								className={`${revealed ? 'hidden' : 'inline-flex'} items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold tracking-wide shadow-xl hover:shadow-rose-500/40 hover:scale-105 transition-all duration-300`}>
								<span>🙏</span> Open a Prayer for You
							</button>

							<AnimatePresence>
								{revealed && (
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										className="bg-gradient-to-br from-purple-900/50 to-rose-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
										<div className="text-4xl mb-6">🙏</div>
										<p className="text-rose-200 text-sm uppercase tracking-[0.3em] mb-4">
											A Prayer For You
										</p>
										<AnimatePresence mode="wait">
											<motion.p
												key={prayerIndex}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.6 }}
												className="font-display text-xl md:text-2xl text-white/90 leading-relaxed italic">
												"{prayers[prayerIndex]}"
											</motion.p>
										</AnimatePresence>
										<div className="flex justify-center gap-2 mt-6">
											{prayers.map((_, i) => (
												<button
													key={i}
													onClick={() => setPrayerIndex(i)}
													className={`w-2 h-2 rounded-full transition-all duration-300 ${
														i === prayerIndex ? 'bg-rose-400 w-6' : 'bg-white/30'
													}`}
												/>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>

						{/* Together message */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 1, duration: 0.8 }}
							className="bg-white/5 backdrop-blur-xl border border-rose-400/20 rounded-3xl p-8 shadow-2xl">
							<motion.div
								animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
								transition={{ duration: 3, repeat: Infinity }}
								className="text-5xl mb-4">
								💞
							</motion.div>
							<p className="font-display text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
								And as for us — I pray we continue to grow, to laugh, to choose each other every single day.
							</p>
							<p className="font-display text-lg text-rose-300 leading-relaxed">
								This birthday is just the beginning of another beautiful chapter.
								I want to be there for all of them.
							</p>
							<motion.p
								animate={{
									textShadow: [
										'0 0 10px rgba(251, 113, 133, 0)',
										'0 0 30px rgba(251, 113, 133, 0.5)',
										'0 0 10px rgba(251, 113, 133, 0)',
									],
								}}
								transition={{ duration: 2.5, repeat: Infinity }}
								className="font-script text-4xl text-rose-300 mt-6">
								With all my heart, Charddy 🌹
							</motion.p>
						</motion.div>
					</motion.div>
				) : (
					/* Locked state until countdown reaches birthday */
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="bg-white/5 backdrop-blur-xl border border-rose-300/20 rounded-3xl p-8 md:p-10 max-w-xl mx-auto text-center shadow-2xl">
						{timeLeft.isPast ? (
							/* Countdown has reached her birthday! She can now tap to unlock */
							<div>
								<motion.div
									animate={{
										scale: [1, 1.15, 1],
										rotate: [0, -8, 8, 0],
									}}
									transition={{ repeat: Infinity, duration: 2.2 }}
									className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 border-2 border-rose-300/60 flex items-center justify-center text-5xl mb-6 shadow-xl shadow-rose-500/40 cursor-pointer"
									onClick={handleUnlock}>
									🎁
								</motion.div>
								<h3 className="font-display text-3xl md:text-4xl text-white mb-3">
									It's Your Birthday! 🎉
								</h3>
								<p className="text-rose-200/90 font-light text-lg md:text-xl leading-relaxed mb-6">
									The wait is over! Your birthday candles, heartfelt letter, and prayers are waiting.
								</p>
								<motion.button
									whileHover={{ scale: 1.06 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleUnlock}
									className="inline-flex items-center gap-3 px-8 sm:px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-lg rounded-full shadow-2xl shadow-rose-500/50 hover:shadow-rose-500/80 transition-all cursor-pointer">
									<Gift className="w-6 h-6" />
									<span>Tap to Unlock Your Birthday Surprise</span>
									<Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
								</motion.button>
							</div>
						) : (
							/* Countdown still ticking down */
							<div>
								<div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-3xl mb-4">
									<Lock className="w-7 h-7 text-rose-300" />
								</div>
								<h3 className="font-display text-2xl md:text-3xl text-white mb-3">
									Birthday Message Locked
								</h3>
								<p className="text-rose-200/80 font-light text-base md:text-lg leading-relaxed mb-4">
									The birthday candles, love letter, and special prayers will unlock right here as soon as the countdown hits midnight on September 21st!
								</p>
								<p className="text-rose-300/60 text-xs italic">
									Counting down every second for you, Aseye ❤️
								</p>
							</div>
						)}
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default Birthday;
