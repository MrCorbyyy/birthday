import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { chapters, START_DATE } from '../../data/sixMonthsMemories';

const daysSince = (since: string) =>
	Math.floor((Date.now() - +new Date(since)) / (1000 * 60 * 60 * 24));

const stats = [
	{ value: '1', label: 'Flight, so far' },
	{ value: '2', label: 'Countries' },
	{ value: '0', label: 'Regrets' },
];

const NumbersWeMade = () => {
	const [days, setDays] = useState(() => daysSince(START_DATE));

	// Recheck once a minute so the number stays correct if the page is left open overnight.
	useEffect(() => {
		const timer = setInterval(() => setDays(daysSince(START_DATE)), 60_000);
		return () => clearInterval(timer);
	}, []);

	const allStats = [
		{ value: String(days), label: 'Days together' },
		...stats,
		{ value: String(chapters.length), label: 'Chapters & counting' },
	];

	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-14">
					<h2 className="font-display text-3xl md:text-5xl text-gray-800">
						By the Numbers
					</h2>
				</motion.div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
					{allStats.map((s, i) => (
						<motion.div
							key={s.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="text-center">
							<div className="font-display text-4xl md:text-6xl text-romantic-red mb-2">
								{s.value}
							</div>
							<div className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.15em]">
								{s.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default NumbersWeMade;
