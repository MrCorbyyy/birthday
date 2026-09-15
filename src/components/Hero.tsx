import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

const Hero = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
	const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

	const scrollToGallery = () => {
		const gallery = document.getElementById('gallery');
		if (gallery) {
			gallery.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<motion.div
			ref={containerRef}
			style={{ opacity }}
			className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
			
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				{[...Array(4)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute border-2 border-romantic-red/10 rounded-full"
						style={{
							width: '50vw',
							height: '50vw',
						}}
						animate={{
							scale: [1, 2, 2.5],
							opacity: [0.4, 0.2, 0],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							delay: i * 1,
							ease: 'easeOut',
						}}
					/>
				))}

				<motion.div
					className="relative z-10 w-96 h-96 rounded-full blur-3xl opacity-40"
					style={{
						background:
							'radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, transparent 70%)',
					}}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
			</div>

			<motion.div
				style={{ scale, y }}
				className="relative z-20 text-center space-y-12 max-w-4xl px-6">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5, ease: 'easeOut' }}
					className="space-y-8">

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 1, type: 'spring' }}
						className="mb-8">
						<motion.h1
							className="font-script text-7xl md:text-9xl lg:text-[12rem] text-romantic-red leading-none"
							animate={{
								textShadow: [
									'0 0 20px rgba(225, 29, 72, 0.3)',
									'0 0 40px rgba(225, 29, 72, 0.5)',
									'0 0 20px rgba(225, 29, 72, 0.3)',
								],
							}}
							transition={{ duration: 3, repeat: Infinity }}>
							Aseye
						</motion.h1>
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.8, duration: 0.8 }}
							className="h-1 w-48 md:w-64 mx-auto mt-4 bg-gradient-to-r from-transparent via-romantic-red to-transparent"
						/>
					</motion.div>

					{/* Main Message */}
					<div className="space-y-4">
						<motion.p
							className="font-display text-2xl md:text-4xl text-gray-700"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, duration: 0.8 }}>
							I've been thinking...
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.6, duration: 0.8 }}
							className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
							There's something I've wanted to ask you for a while now...
						</motion.p>
					</div>
				</motion.div>

				{/* CTA Button */}
				<motion.button
					onClick={scrollToGallery}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.05, y: -5 }}
					whileTap={{ scale: 0.95 }}
					transition={{ delay: 2, duration: 0.5 }}
					className="group relative inline-flex flex-col items-center gap-3 px-10 py-5 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-rose-100 hover:border-romantic-red/30">
					<span className="text-gray-700 uppercase tracking-[0.25em] text-sm font-semibold group-hover:text-romantic-red transition-colors">
						Let me show you
					</span>
					<motion.div
						animate={{ y: [0, 5, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}>
						<ChevronDown className="w-5 h-5 text-romantic-red" />
					</motion.div>
				</motion.button>
			</motion.div>

			{/* Cinematic Grain */}
			<div
				className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulature type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			/>
		</motion.div>
	);
};

export default Hero;
