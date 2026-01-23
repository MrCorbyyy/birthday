import { motion } from 'framer-motion';

const Message = () => {
	return (
		<div className="py-24 bg-white relativelative overflow-hidden">
			{/* Decorative Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-purple-50/30" />

			{/* Floating Decorative Elements */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
				{[...Array(10)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute text-rose-300 text-4xl"
						animate={{
							y: [0, -30, 0],
							x: [0, Math.random() * 20 - 10, 0],
							rotate: [0, 360],
							opacity: [0.2, 0.4, 0.2],
						}}
						transition={{
							duration: 8 + Math.random() * 4,
							repeat: Infinity,
							delay: i * 0.8,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}>
						💕
					</motion.div>
				))}
			</div>

			<div className="max-w-6xl mx-auto px-4 relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-12">
					{/* Image with Enhanced Styling */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="w-full md:w-1/2 relative group">
						{/* Gradient Border */}
						<div
							className="relative p-1 rounded-3xl bg-gradient-to-br from-rose-400 via-purple-400 to-orange-400 animate-gradient"
							style={{ backgroundSize: '200% 200%' }}>
							<div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl">
								<img
									src="/me.JPEG"
									alt="Gillette"
									className="w-full h-[500px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
								/>
							</div>
						</div>

						{/* Decorative Corner */}
						<motion.div
							className="absolute -top-4 -left-4 text-5xl z-20"
							animate={{
								rotate: [0, -15, 15, 0],
								scale: [1, 1.1, 1],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
							}}>
							💖
						</motion.div>
					</motion.div>

					{/* Message Content with Glass Effect */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="w-full md:w-1/2">
						{/* Glass Card */}
						<div className="glass-strong rounded-3xl p-8 md:p-10 shadow-xl">
							<h2 className="text-5xl md:text-6xl mb-6 font-romantic">
								<span className="gradient-text">A Note for You...</span>
							</h2>

							<div className="space-y-6">
								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4 }}
									className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
									Kemi, from the moment we met, you've brought so much light
									into my life. Every day with you feels like a beautiful
									adventure, and I can't imagine spending this Valentine's Day
									(and every day after) without you by my side.
								</motion.p>

								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.6 }}
									className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
									You are smart, beautiful, and kind. You genuinely make me a
									better person, and I just want to make you smile every single
									day.
								</motion.p>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.8 }}
								className="mt-8 pt-6 border-t border-rose-200">
								<p className="text-2xl md:text-3xl font-playfair">
									<span className="gradient-text">With all my love,</span>
								</p>
								<p className="text-2xl md:text-3xl font-romantic text-rose-600 mt-2">
									- Gillette
								</p>
							</motion.div>

							{/* Decorative Hearts */}
							<div className="flex justify-center gap-3 mt-6">
								{[...Array(3)].map((_, i) => (
									<motion.span
										key={i}
										animate={{
											y: [0, -5, 0],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											delay: i * 0.3,
										}}
										className="text-2xl">
										❤️
									</motion.span>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Message;
