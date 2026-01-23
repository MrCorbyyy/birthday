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

	const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

	return (
		<div
			ref={containerRef}
			className="py-20 min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden">
			{/* Decorative Background */}
			<div className="absolute inset-0 pointer-events-none opacity-30">
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute text-rose-200 text-6xl"
						initial={{
							x: Math.random() * 100 + '%',
							y: Math.random() * 100 + '%',
							rotate: Math.random() * 360,
							opacity: 0,
						}}
						animate={{
							rotate: [0, 360],
							opacity: [0.1, 0.3, 0.1],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							delay: i * 2,
						}}>
						💕
					</motion.div>
				))}
			</div>

			<div className="max-w-6xl mx-auto px-4 relative z-10">
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-5xl md:text-7xl text-center mb-6 font-romantic">
					<span className="gradient-text">Beautiful You</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-center text-gray-600 text-lg mb-16 font-playfair">
					Every moment captured, every smile treasured
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
					{photos.map((src, index) => (
						<motion.div
							key={index}
							style={{ y: index % 2 === 0 ? y1 : y2 }}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="relative group">
							{/* Gradient Border Container */}
							<div
								className="relative p-1 rounded-2xl bg-gradient-to-br from-rose-400 via-purple-400 to-orange-400 animate-gradient hover:shadow-2xl transition-all duration-500"
								style={{ backgroundSize: '200% 200%' }}>
								<div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
									{/* The Image */}
									<motion.img
										src={src}
										alt={`Memory ${index + 1}`}
										className="w-full h-[400px] object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
										loading="lazy"
									/>

									{/* Overlay on Hover */}
									<div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">
										<motion.p
											initial={{ y: 20, opacity: 0 }}
											whileInView={{ y: 0, opacity: 1 }}
											className="text-white text-xl font-playfair italic">
											Cherished Memory
										</motion.p>
									</div>
								</div>
							</div>

							{/* Decorative Corner Hearts */}
							<motion.div
								className="absolute -top-3 -right-3 text-3xl z-20"
								animate={{
									rotate: [0, 15, -15, 0],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									delay: index * 0.5,
								}}>
								💖
							</motion.div>
						</motion.div>
					))}
				</div>

				<motion.div
					className="mt-20 text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<p className="text-2xl md:text-3xl font-playfair italic mb-4">
						<span className="gradient-text">
							Every moment with you is my favorite...
						</span>
					</p>
					<div className="flex justify-center gap-3 mt-4">
						{[...Array(5)].map((_, i) => (
							<motion.span
								key={i}
								animate={{
									y: [0, -8, 0],
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									delay: i * 0.2,
								}}
								className="text-2xl">
								❤️
							</motion.span>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Gallery;
