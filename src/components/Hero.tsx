import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white">
			{/* Animated Gradient Mesh Background */}
			<div className="absolute inset-0 opacity-30">
				<div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-rose-300 to-transparent rounded-full blur-3xl animate-gradient" />
				<div
					className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-pink-300 to-transparent rounded-full blur-3xl animate-gradient"
					style={{ animationDelay: '2s' }}
				/>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-3xl animate-gradient"
					style={{ animationDelay: '4s' }}
				/>
			</div>

			{/* Floating Hearts Background */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(25)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute text-rose-200"
						initial={{
							x: Math.random() * window.innerWidth,
							y: window.innerHeight + 100,
							scale: Math.random() * 0.8 + 0.4,
							opacity: 0.2,
						}}
						animate={{
							y: -100,
							x: Math.random() * window.innerWidth,
							rotate: [0, 360],
							opacity: [0.2, 0.5, 0.2],
						}}
						transition={{
							duration: Math.random() * 15 + 15,
							repeat: Infinity,
							ease: 'linear',
							delay: Math.random() * 8,
						}}
						style={{ fontSize: `${Math.random() * 2.5 + 1}rem` }}>
						❤
					</motion.div>
				))}
			</div>

			{/* Sparkle Effects */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={`sparkle-${i}`}
						className="absolute text-yellow-300"
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: Math.random() * 5,
							repeatDelay: Math.random() * 3,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							fontSize: `${Math.random() * 1.5 + 0.5}rem`,
						}}>
						✨
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5, ease: 'easeOut' }}
				className="z-10 text-center px-4 max-w-4xl">
				<motion.h1
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
					className="text-6xl md:text-8xl lg:text-9xl text-rose-500 mb-6 drop-shadow-lg font-romantic text-glow">
					Hey Kemi...
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}
					className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
					I've been thinking about us, about all our moments...
					<br />
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.8, duration: 1 }}
						className="text-rose-600 font-medium">
						and I wanted to ask you something special.
					</motion.span>
				</motion.p>

				<motion.div
					className="mt-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2.5, duration: 1 }}>
					<motion.span
						className="text-rose-400 text-sm tracking-[0.3em] uppercase font-medium"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ repeat: Infinity, duration: 2 }}>
						Scroll Down
					</motion.span>
					<motion.div
						animate={{ y: [0, 15, 0] }}
						transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
						className="mt-3 text-rose-400 text-4xl">
						↓
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;
