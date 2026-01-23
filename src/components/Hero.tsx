import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
			{/* Animated Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-purple-50 to-orange-50 animate-gradient" />

			{/* Particle System - Hearts */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(25)].map((_, i) => (
					<motion.div
						key={`heart-${i}`}
						className="absolute text-rose-300"
						initial={{
							x: Math.random() * window.innerWidth,
							y: window.innerHeight + 100,
							scale: Math.random() * 0.5 + 0.5,
							opacity: 0,
						}}
						animate={{
							y: -100,
							x: Math.random() * window.innerWidth,
							rotate: [0, 360],
							opacity: [0, 0.4, 0.6, 0.4, 0],
						}}
						transition={{
							duration: Math.random() * 15 + 15,
							repeat: Infinity,
							ease: 'linear',
							delay: Math.random() * 5,
						}}
						style={{ fontSize: `${Math.random() * 2 + 1}rem` }}>
						❤
					</motion.div>
				))}
			</div>

			{/* Sparkles */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={`sparkle-${i}`}
						className="absolute"
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							scale: 0,
							opacity: 0,
						}}
						animate={{
							scale: [0, 1, 0],
							opacity: [0, 1, 0],
							rotate: [0, 180],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: Math.random() * 3,
							repeatDelay: Math.random() * 2,
						}}
						style={{ fontSize: `${Math.random() * 1.5 + 0.5}rem` }}>
						✨
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5 }}
				className="z-10 text-center px-4 max-w-5xl">
				{/* Main Heading with Gradient */}
				<motion.h1
					animate={{
						scale: [1, 1.02, 1],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className="text-6xl md:text-8xl lg:text-9xl mb-6 font-romantic">
					<span className="gradient-text text-shadow-glow">Hey Kemi...</span>
				</motion.h1>

				{/* Subheading */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 1 }}
					className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed mb-4">
					I've been thinking about us, about all our moments...
				</motion.p>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2, duration: 1 }}
					className="text-xl md:text-2xl lg:text-3xl font-playfair text-rose-600 max-w-3xl mx-auto">
					and I wanted to ask you something special.
				</motion.p>

				{/* Decorative Hearts */}
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1.8, duration: 0.5 }}
					className="flex justify-center gap-4 my-8">
					{[...Array(3)].map((_, i) => (
						<motion.span
							key={i}
							animate={{
								y: [0, -10, 0],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: i * 0.3,
							}}
							className="text-4xl md:text-5xl">
							💕
						</motion.span>
					))}
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div
					className="mt-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2.5, duration: 1 }}>
					<motion.div
						animate={{
							y: [0, 10, 0],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{ repeat: Infinity, duration: 2 }}
						className="flex flex-col items-center">
						<span className="text-rose-500 text-sm tracking-widest uppercase font-medium mb-2">
							Scroll Down
						</span>
						<span className="text-rose-500 text-5xl">↓</span>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;
