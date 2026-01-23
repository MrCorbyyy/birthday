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
		<div ref={containerRef} className="py-20 min-h-screen bg-white relative">
			<div className="max-w-6xl mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="text-5xl md:text-7xl text-center text-rose-400 mb-20 font-romantic">
					Beautiful You
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
					{photos.map((src, index) => (
						<motion.div
							key={index}
							style={{ y: index % 2 === 0 ? y1 : y2 }}
							className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 bg-gray-100"
							whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
							transition={{ duration: 0.3 }}>
							<img
								src={src}
								alt={`Memory ${index + 1}`}
								className="w-full h-[400px] object-cover"
								loading="lazy"
							/>
						</motion.div>
					))}
				</div>

				<div className="mt-20 text-center">
					<p className="text-xl text-gray-500 italic">
						Every moment with you is my favorite...
					</p>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
