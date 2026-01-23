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
			className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-rose-50">
			{/* The Pulse Visualization */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute border border-romantic-red/20 rounded-full"
						style={{
							width: '40vw',
							height: '40vw',
						}}
						animate={{
							scale: [1, 1.5, 2],
							opacity: [0.5, 0.2, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 1,
							ease: 'easeInOut',
						}}
					/>
				))}

				{/* Central Core */}
				<div className="relative z-10 w-64 h-64 bg-gradient-to-br from-rose-100 to-white rounded-full blur-3xl opacity-60 animate-pulse-slow" />
			</div>

			{/* Content Portal */}
			<motion.div
				style={{ scale, y }}
				className="relative z-20 text-center space-y-12 max-w-4xl px-6">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5, ease: 'easeOut' }}>
					<h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gray-800 leading-tight tracking-tight mix-blend-multiply">
						<span className="block text-romantic-red text-opacity-90">Our</span>
						<span className="block italic font-light">Journey</span>
					</h1>
				</motion.div>

				<motion.button
					onClick={scrollToGallery}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
					<span className="text-gray-600 uppercase tracking-[0.2em] text-sm font-medium group-hover:text-romantic-red transition-colors">
						Enter The Story
					</span>
					<span className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-romantic-red group-hover:text-white transition-colors duration-300">
						<ChevronDown className="w-4 h-4" />
					</span>
				</motion.button>
			</motion.div>

			{/* Cinematic Grain */}
			<div
				className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			/>
		</motion.div>
	);
};

export default Hero;
