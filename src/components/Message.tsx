import { motion } from 'framer-motion';

const Message = () => {
	return (
		<div className="py-32 bg-gradient-to-b from-white via-pink-50/50 to-rose-50 relative overflow-hidden">
			{/* Floating decorative hearts */}
			<motion.div
				className="absolute top-20 right-1/4 text-rose-200 text-5xl"
				animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
				transition={{ repeat: Infinity, duration: 4 }}>
				💕
			</motion.div>
			<motion.div
				className="absolute bottom-32 left-1/4 text-pink-200 text-4xl"
				animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
				transition={{ repeat: Infinity, duration: 5, delay: 1 }}>
				❤
			</motion.div>

			<div className="max-w-6xl mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-16">
					{/* Image Side */}
					<motion.div
						initial={{ opacity: 0, x: -50, scale: 0.95 }}
						whileInView={{ opacity: 1, x: 0, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="w-full md:w-1/2">
						<div className="relative group">
							{/* Glow effect */}
							<div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

							<img
								src="/me.JPEG"
								alt="Gillette"
								className="relative rounded-3xl shadow-2xl w-full h-[550px] object-cover border-8 border-white transform -rotate-2 group-hover:rotate-0 transition-all duration-500"
							/>
						</div>
					</motion.div>

					{/* Text Side with Glassmorphism */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="w-full md:w-1/2 relative">
						{/* Glassmorphism Card */}
						<div className="glass-card rounded-3xl p-10 relative overflow-hidden">
							{/* Animated border gradient */}
							<div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 animate-gradient -z-10" />
							<div className="absolute inset-[2px] bg-white/60 backdrop-blur-xl rounded-3xl -z-10" />

							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4, duration: 0.6 }}
								className="text-5xl md:text-6xl text-rose-500 font-romantic mb-8 text-glow">
								A Note for You...
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.6, duration: 0.6 }}
								className="text-lg md:text-xl text-gray-800 leading-relaxed font-light mb-6">
								Kemi, from the moment we met, you've brought so much light into
								my life. Every day with you feels like a beautiful adventure,
								and I can't imagine spending this Valentine's Day (and every day
								after) without you by my side.
							</motion.p>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.8, duration: 0.6 }}
								className="text-lg md:text-xl text-gray-800 leading-relaxed font-light mb-10">
								You are smart, beautiful, and kind. You genuinely make me a
								better person, and I just want to make you smile every single
								day.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 1, duration: 0.6 }}
								className="relative">
								<p className="text-2xl md:text-3xl text-rose-600 font-romantic">
									With all my love,
									<br />
									<span className="text-3xl md:text-4xl">- Gillette</span>
								</p>

								{/* Decorative hearts */}
								<div className="absolute -right-8 -top-4 text-rose-300 text-3xl animate-float">
									❤
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Message;
