import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const photos = [
	'/IMG_5405.JPG',
	'/eb4bb98a-2db4-4c19-b87a-df10e6c29956.JPG',
	'/kemi.JPG',
];

const Gallery = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
	const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

	return (
		<div
			ref={containerRef}
			className="py-24 min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden">
			{/* Decorative Elements */}
			<div className="absolute top-20 left-10 text-6xl text-rose-200 opacity-50 select-none">
				❤
			</div>
			<div className="absolute bottom-32 right-10 text-5xl text-pink-200 opacity-50 select-none">
				💕
			</div>
			<div className="absolute top-1/2 left-1/4 text-4xl text-rose-100 opacity-40 select-none">
				✨
			</div>

			<div className="max-w-6xl mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-5xl md:text-7xl text-center mb-4 font-romantic gradient-text">
					Beautiful You
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3, duration: 0.8 }}
					className="text-center text-gray-500 italic text-lg mb-20">
					Captured moments that make my heart smile
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
					{photos.map((src, index) => (
						<motion.div
							key={index}
							style={{ y: index === 0 ? y1 : index === 1 ? y2 : y3 }}
							initial={{ opacity: 0, scale: 0.8, rotateZ: 0 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2, duration: 0.8 }}
							className="group relative"
							whileHover={{
								scale: 1.08,
								rotateZ: 0,
								zIndex: 10,
								transition: { duration: 0.3 },
							}}>
							{/* Polaroid Frame */}
							<div className="bg-white p-4 pb-16 shadow-2xl rounded-lg transform rotate-2 group-hover:rotate-0 transition-all duration-300 group-hover:shadow-rose-200/50 relative">
								{/* Glow effect on hover */}
								<div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

								<div className="relative">
									<img
										src={src}
										alt={`Memory ${index + 1}`}
										className="w-full h-[400px] object-cover object-top rounded"
										loading="lazy"
									/>

									{/* Shine effect */}
									<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-700 rounded" />
								</div>

								{/* Decorative tape */}
								<div
									className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-rose-100/80 shadow-sm rotate-2"
									style={{
										clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
									}}
								/>
							</div>

							{/* Floating hearts on hover */}
							<motion.div
								className="absolute top-0 left-1/2 -translate-x-1/2 text-rose-400 text-2xl pointer-events-none"
								initial={{ opacity: 0, y: 0 }}
								whileInView={{ opacity: 0 }}
								animate={{ opacity: 0 }}>
								❤
							</motion.div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.8 }}
					className="mt-24 text-center">
					<p className="text-2xl text-gray-600 italic font-light">
						Every moment with you is my favorite...
					</p>
					<div className="mt-4 flex justify-center gap-2 text-rose-300 text-2xl">
						<motion.span
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>
							❤
						</motion.span>
						<motion.span
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>
							❤
						</motion.span>
						<motion.span
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>
							❤
						</motion.span>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Gallery;
