import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const photos = [
	{
		src: '/IMG_5405.JPG',
		caption: 'The First Spark',
		date: 'Always',
		color: '#fda4af',
	},
	{
		src: '/IMG_5531.PNG',
		caption: 'Beautiful Moments',
		date: 'Jan 23, 2026',
		color: '#f9a8d4',
	},
	{
		src: '/eb4bb98a-2db4-4c19-b87a-df10e6c29956.JPG',
		caption: 'Stylist Time',
		date: 'Always',
		color: '#c4b5fd',
	},
	{
		src: '/kemi.JPG',
		caption: 'My Beautiful Kemi',
		date: 'Jan 1, 2026',
		color: '#fca5a5',
	},
	{
		src: '/me.JPEG',
		caption: 'Hi!  Gillette',
		date: 'Feb 19, 2025',
		color: '#fdba74',
	},
	{
		src: '/me3.JPG',
		caption: 'Turtle Time',
		date: 'Always',
		color: '#a5f3fc',
	},
	{
		src: '/me4.JPG',
		caption: 'Suit Up',
		date: 'Jan 5, 2026',
		color: '#d8b4fe',
	},
];

const Gallery = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isZoomed, setIsZoomed] = useState(false);

	// Parallax refs for background elements
	const parallaxOrb1 = useParallax({ speed: 0.3 });
	const parallaxOrb2 = useParallax({ speed: 0.5 });

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
			rotateY: direction > 0 ? 45 : -45,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1,
			rotateY: 0,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
			rotateY: direction < 0 ? 45 : -45,
		}),
	};

	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity;
	};

	const paginate = (newDirection: number) => {
		setDirection(newDirection);
		setCurrentIndex((prevIndex) => {
			let nextIndex = prevIndex + newDirection;
			if (nextIndex < 0) nextIndex = photos.length - 1;
			if (nextIndex >= photos.length) nextIndex = 0;
			return nextIndex;
		});
	};

	const currentPhoto = photos[currentIndex];

	return (
		<section className="relative h-screen pt-10 pb-24 bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900 overflow-hidden flex flex-col items-center justify-center">
			{/* Animated Background Gradient Orbs with Parallax */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					ref={parallaxOrb1}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl parallax-slow"
				/>
				<motion.div
					ref={parallaxOrb2}
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{ duration: 10, repeat: Infinity }}
					className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl parallax-medium"
				/>
			</div>

			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16 z-10">
				{/* <motion.div
					animate={{ scale: [1, 1.05, 1] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="inline-block mb-4">
					<Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
				</motion.div> */}
				<h2 className="text-5xl md:text-6xl text-white mb-4">
					Our Story in Frames
				</h2>
				<p className="text-rose-200 text-lg font-light">
					Swipe or click to explore
				</p>
			</motion.div>

			{/* 3D Carousel Container */}
			<div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center perspective-1000">
				{/* Navigation Buttons */}
				<button
					onClick={() => paginate(-1)}
					className="absolute left-4 md:left-8 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
					<ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
				</button>

				<button
					onClick={() => paginate(1)}
					className="absolute right-4 md:right-8 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
					<ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
				</button>

				{/* Main Card */}
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.4 },
							scale: { duration: 0.4 },
							rotateY: { duration: 0.6 },
						}}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={(_e, { offset, velocity }) => {
							const swipe = swipePower(offset.x, velocity.x);
							if (swipe < -swipeConfidenceThreshold) {
								paginate(1);
							} else if (swipe > swipeConfidenceThreshold) {
								paginate(-1);
							}
						}}
						className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing"
						style={{ transformStyle: 'preserve-3d' }}>
						{/* Glassmorphism Card */}
						<motion.div
							whileHover={{ scale: 1.02, y: -10 }}
							onClick={() => setIsZoomed(true)}
							className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-2"
							style={{
								boxShadow: `0 25px 50px -12px ${currentPhoto.color}40`,
							}}>
							{/* Image Container */}
							<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
								<img
									src={currentPhoto.src}
									alt={currentPhoto.caption}
									className="w-full h-full object-cover "
								/>
								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							</div>

							{/* Caption */}
							<div className="p-6 text-center">
								<motion.h3
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="font-script text-4xl text-white mb-2">
									{currentPhoto.caption}
								</motion.h3>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="text-rose-200 text-sm uppercase tracking-widest">
									{currentPhoto.date}
								</motion.p>
							</div>

							{/* Decorative Corner Accent */}
							<div
								className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-50 blur-2xl"
								style={{ backgroundColor: currentPhoto.color }}
							/>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Progress Indicators */}
			<div className="flex gap-3 mt-12 z-10">
				{photos.map((_, index) => (
					<button
						key={index}
						onClick={() => {
							setDirection(index > currentIndex ? 1 : -1);
							setCurrentIndex(index);
						}}
						className="group relative">
						<div
							className={`h-2 rounded-full transition-all duration-300 ${
								index === currentIndex
									? 'w-12 bg-rose-400'
									: 'w-2 bg-white/30 group-hover:bg-white/50'
							}`}
						/>
					</button>
				))}
			</div>

			{/* Fullscreen Zoom Modal */}
			<AnimatePresence>
				{isZoomed && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
						onClick={() => setIsZoomed(false)}>
						<button
							className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
							onClick={() => setIsZoomed(false)}>
							<X className="w-6 h-6" />
						</button>

						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ type: 'spring', damping: 25 }}
							className="relative max-w-6xl"
							onClick={(e) => e.stopPropagation()}>
							<img
								src={currentPhoto.src}
								alt={currentPhoto.caption}
								className="max-h-[75vh] w-auto rounded-2xl shadow-2xl"
							/>
							<div className="mt-8 text-center">
								<h3 className="font-script text-5xl text-white mb-3">
									{currentPhoto.caption}
								</h3>
								<p className="text-rose-300 text-lg">{currentPhoto.date}</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Gallery;
