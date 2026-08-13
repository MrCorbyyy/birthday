import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { START_DATE } from '../../data/sixMonthsMemories';

const calculateTimeTogether = (since: string) => {
	const diff = Date.now() - +new Date(since);

	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / 1000 / 60) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
};

const SixMonthsHero = () => {
	const [time, setTime] = useState(() => calculateTimeTogether(START_DATE));

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(calculateTimeTogether(START_DATE));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const scrollToNext = () => {
		document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' });
	};

	const units = [
		{ label: 'Days', value: time.days },
		{ label: 'Hours', value: time.hours },
		{ label: 'Minutes', value: time.minutes },
		{ label: 'Seconds', value: time.seconds },
	];

	return (
		<div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 px-4 pt-24 pb-40">
			{/* Pulse rings, same visual language as the original hero */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				{[...Array(4)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute border-2 border-romantic-red/10 rounded-full"
						style={{ width: '50vw', height: '50vw' }}
						animate={{ scale: [1, 2, 2.5], opacity: [0.4, 0.2, 0] }}
						transition={{
							duration: 4,
							repeat: Infinity,
							delay: i * 1,
							ease: 'easeOut',
						}}
					/>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="relative z-10 text-center max-w-3xl">
				<span className="inline-block text-sm uppercase tracking-[0.4em] text-romantic-red font-semibold mb-6">
					182 days ago, I asked
				</span>

				<h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-romantic-red leading-none mb-4">
					Half a Year of Us
				</h1>

				<p className="text-gray-600 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed mb-14">
					You said yes. Here's everything that's happened since — the good,
					the silly, the "we turned bowling into a rivalry" kind of good.
				</p>

				{/* Live time-together counter */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.8 }}
					className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4">
					{units.map((unit) => (
						<div key={unit.label} className="flex flex-col items-center group">
							<div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden bg-white/70 backdrop-blur-sm border border-white/60 shadow-lg group-hover:scale-105 transition-transform">
								<span className="text-2xl md:text-4xl font-bold text-romantic-red font-sans tracking-tight">
									{String(unit.value).padStart(2, '0')}
								</span>
							</div>
							<span className="mt-2 text-gray-500 font-semibold uppercase tracking-[0.15em] text-[10px] md:text-xs">
								{unit.label}
							</span>
						</div>
					))}
				</motion.div>
				<p className="text-rose-400 text-sm italic mb-14">
					...and counting, right now, as you read this.
				</p>

				<motion.button
					onClick={scrollToNext}
					whileHover={{ scale: 1.05, y: -5 }}
					whileTap={{ scale: 0.95 }}
					className="group relative inline-flex flex-col items-center gap-3 px-10 py-5 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-rose-100 hover:border-romantic-red/30">
					<span className="text-gray-700 uppercase tracking-[0.25em] text-sm font-semibold group-hover:text-romantic-red transition-colors">
						See how far we've come
					</span>
					<motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
						<ChevronDown className="w-5 h-5 text-romantic-red" />
					</motion.div>
				</motion.button>
			</motion.div>
		</div>
	);
};

export default SixMonthsHero;
