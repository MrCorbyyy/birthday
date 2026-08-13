import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { NEXT_MILESTONE_DATE, NEXT_MILESTONE_LABEL } from '../../data/sixMonthsMemories';

const calculateTimeLeft = (targetDate: string) => {
	const difference = +new Date(targetDate) - Date.now();
	if (difference <= 0) {
		return { days: 0, hours: 0, minutes: 0 };
	}
	return {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / 1000 / 60) % 60),
	};
};

const NextChapterCountdown = () => {
	const [time, setTime] = useState(() => calculateTimeLeft(NEXT_MILESTONE_DATE));

	useEffect(() => {
		const timer = setInterval(() => setTime(calculateTimeLeft(NEXT_MILESTONE_DATE)), 30_000);
		return () => clearInterval(timer);
	}, []);

	const units = [
		{ label: 'Days', value: time.days },
		{ label: 'Hours', value: time.hours },
		{ label: 'Minutes', value: time.minutes },
	];

	return (
		<section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-gray-900 to-gray-900" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="relative z-10 max-w-xl mx-auto text-center">
				<Heart className="w-8 h-8 mx-auto text-rose-400 fill-rose-400 mb-6" />
				<h2 className="font-display text-3xl md:text-5xl text-white mb-3">
					{NEXT_MILESTONE_LABEL} begins in
				</h2>
				<p className="text-gray-400 mb-10">Not a countdown to wait through. Just one to look forward to.</p>

				<div className="flex justify-center gap-4 md:gap-8">
					{units.map((unit) => (
						<div key={unit.label} className="flex flex-col items-center">
							<div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
								<span className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-300 to-pink-300 bg-clip-text text-transparent">
									{String(unit.value).padStart(2, '0')}
								</span>
							</div>
							<span className="mt-3 text-rose-300 font-semibold uppercase tracking-[0.2em] text-xs">
								{unit.label}
							</span>
						</div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default NextChapterCountdown;
