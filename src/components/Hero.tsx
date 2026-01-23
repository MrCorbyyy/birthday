import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-rose-50 to-white">
			{/* Floating Hearts Background */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute text-rose-200"
						initial={{
							x: Math.random() * window.innerWidth,
							y: window.innerHeight + 100,
							scale: Math.random() * 0.5 + 0.5,
							opacity: 0.3,
						}}
						animate={{
							y: -100,
							x: Math.random() * window.innerWidth,
							rotate: [0, 45, -45, 0],
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							ease: 'linear',
							delay: Math.random() * 5,
						}}
						style={{ fontSize: `${Math.random() * 2 + 1}rem` }}>
						❤
					</motion.div>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5 }}
				className="z-10 text-center px-4">
				<h1 className="text-6xl md:text-8xl text-rose-500 mb-6 drop-shadow-sm font-romantic">
					Hey Kemi...
				</h1>
				<p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
					I've been thinking about us, about all our moments...
					<br />
					and I wanted to ask you something special.
				</p>

				<motion.div
					className="mt-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2, duration: 1 }}>
					<span className="text-rose-400 text-sm tracking-widest uppercase">
						Scroll Down
					</span>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2 }}
						className="mt-2 text-rose-400 text-4xl">
						↓
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;
