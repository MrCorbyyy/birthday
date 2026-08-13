import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { achievements } from '../../data/sixMonthsMemories';

const Achievements = () => {
	const scrollToChapter = (chapterId: string) => {
		document.getElementById(chapterId)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-gray-900 to-gray-900" />

			<div className="relative z-10 max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-4">
					<span className="inline-flex items-center gap-2 text-amber-300 text-sm uppercase tracking-[0.3em] font-semibold mb-4">
						<Trophy className="w-4 h-4" />
						Trophy Shelf
					</span>
					<h2 className="font-display text-4xl md:text-6xl text-white mb-4">
						Achievements Unlocked
					</h2>
					<p className="text-gray-400 text-lg font-light mb-16">
						{achievements.length} / {achievements.length} — tap one to relive it
					</p>
				</motion.div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
					{achievements.map((a, index) => (
						<motion.button
							key={a.id}
							initial={{ opacity: 0, scale: 0.85 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.06 }}
							whileHover={{ y: -6, scale: 1.03 }}
							onClick={() => scrollToChapter(a.chapterId)}
							className="group relative rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-amber-300/40 hover:bg-white/10 transition-all duration-300 text-left overflow-hidden">
							{/* Unlocked stamp */}
							<span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold text-amber-300/80 border border-amber-300/30 rounded-full px-2 py-0.5">
								Unlocked
							</span>

							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-rose-400/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
								{a.emoji}
							</div>
							<p className="text-white font-display text-lg leading-snug">
								{a.label}
							</p>
						</motion.button>
					))}
				</div>
			</div>
		</section>
	);
};

export default Achievements;
