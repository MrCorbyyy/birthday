/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Mock Data for "The Memory Box"
const memoryItems = [
	{
		id: 1,
		type: 'photo',
		src: '/IMG_5405.JPG',
		rotation: -5,
		x: 10,
		y: 10,
		caption: 'The First Spark',
		date: 'Dec 2023',
	},
	{
		id: 2,
		type: 'note',
		content: 'I knew from the very first moment...',
		rotation: 3,
		x: 50,
		y: -20,
		bg: '#fef3c7',
	},
	{
		id: 3,
		type: 'photo',
		src: '/eb4bb98a-2db4-4c19-b87a-df10e6c29956.JPG',
		rotation: 6,
		x: -30,
		y: 40,
		caption: 'Growing Together',
		date: 'July 2024',
	},
	{
		id: 4,
		type: 'ticket',
		title: 'First Date',
		location: 'Cinema Paradiso',
		date: '14 Feb',
		rotation: -15,
		x: 200,
		y: 150,
	},
	{
		id: 5,
		type: 'photo',
		src: '/kemi.JPG',
		rotation: -8,
		x: -150,
		y: -50,
		caption: 'Unbreakable Bond',
		date: 'Always',
	},
	{
		id: 6,
		type: 'note',
		content: 'You are my favorite adventure.',
		rotation: 12,
		x: 120,
		y: 80,
		bg: '#e0f2fe',
	},
];

const Gallery = () => {
	const containerRef = useRef(null);

	return (
		<section
			ref={containerRef}
			className="py-24 min-h-screen bg-rose-50 overflow-hidden relative flex flex-col items-center">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="text-center mb-12 z-20 pointer-events-none">
				<h2 className="font-display text-4xl md:text-5xl text-gray-800">
					Our Memory Box
				</h2>
				<p className="text-gray-500 mt-2 font-display italic">
					Shuffle through our moments...
				</p>
			</motion.div>

			{/* The Table Surface */}
			<div className="relative w-full max-w-5xl h-[80vh] bg-rose-100/50 rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
				{/* Texture */}
				<div
					className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
					style={{
						backgroundImage: `url("https://www.transparenttextures.com/patterns/cork-board.png")`,
					}}
				/>

				{/* Scattered Items */}
				{memoryItems.map((item) => (
					<DraggableItem
						key={item.id}
						item={item}
						containerRef={containerRef}
					/>
				))}
			</div>

			<p className="mt-8 text-sm text-gray-400 font-medium uppercase tracking-widest animate-pulse">
				Drag & Interact
			</p>
		</section>
	);
};

const DraggableItem = ({
	item,
	containerRef,
}: {
	item: any;
	containerRef: any;
}) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [zIndex, setZIndex] = useState(1);

	const handleFlip = () => {
		if (item.type === 'photo') {
			setIsFlipped(!isFlipped);
		}
	};

	return (
		<motion.div
			drag
			dragConstraints={containerRef}
			dragElastic={0.2}
			dragMomentum={false}
			whileHover={{ scale: 1.05, cursor: 'grab', zIndex: 100 }}
			whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
			whileTap={{ scale: 0.95 }}
			onDragStart={() => setZIndex(100)}
			onDragEnd={() => setZIndex(1)}
			style={{
				rotate: item.rotation,
				x: item.x,
				y: item.y,
				position: 'absolute',
				zIndex: zIndex,
			}}
			onClick={handleFlip}
			className="perspective-1000">
			<motion.div
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6, type: 'spring' }}
				className="relative preserve-3d"
				style={{ transformStyle: 'preserve-3d' }}>
				{/* Photo Polaroid */}
				{item.type === 'photo' && (
					<div className="relative">
						{/* Front */}
						<div className="w-64 bg-white p-4 pb-12 shadow-xl transform rotate-0 backface-hidden">
							<div className="w-full h-56 bg-gray-200 overflow-hidden mb-2">
								<img
									src={item.src}
									alt={item.caption}
									className="w-full h-full object-cover pointer-events-none"
								/>
							</div>
							<p className="font-script text-2xl text-center text-gray-700">
								{item.caption}
							</p>
						</div>

						{/* Back */}
						<div
							className="absolute inset-0 w-64 h-full bg-[#fdfbf7] p-6 shadow-xl flex items-center justify-center transform rotate-y-180 backface-hidden"
							style={{
								backfaceVisibility: 'hidden',
								transform: 'rotateY(180deg)',
							}}>
							<div className="text-center transform rotate-y-180">
								{' '}
								{/* rotate text back */}
								<p className="font-display text-gray-400 text-sm mb-2">
									Taken on
								</p>
								<p className="font-script text-3xl text-romantic-red">
									{item.date}
								</p>
								<div className="mt-4 text-xs text-gray-400">
									❤️ Gillette & Kemi
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Sticky Note */}
				{item.type === 'note' && (
					<div
						className="w-56 h-56 p-6 shadow-lg flex items-center justify-center"
						style={{ backgroundColor: item.bg }}>
						<div className="absolute top-[-10px] left-[50%] -translate-x-1/2 w-24 h-6 bg-rose-200/50 transform -rotate-2" />{' '}
						{/* Tape */}
						<p className="font-script text-xl text-gray-800 leading-relaxed text-center">
							"{item.content}"
						</p>
					</div>
				)}

				{/* Ticket Stub */}
				{item.type === 'ticket' && (
					<div className="w-64 h-32 bg-rose-100 border-2 border-dashed border-rose-300 relative flex flex-col justify-between p-4 shadow-md rounded-lg">
						<div className="flex justify-between items-start border-b border-rose-200 pb-2">
							<span className="font-display uppercase text-xs tracking-wider text-rose-500">
								Admit Two
							</span>
							<span className="font-bold text-rose-600">{item.date}</span>
						</div>
						<div className="text-center">
							<p className="font-display font-bold text-lg text-gray-800">
								{item.title}
							</p>
							<p className="text-xs text-gray-500 uppercase">{item.location}</p>
						</div>
						{/* Cutout circles */}
						<div className="absolute top-1/2 -left-3 w-6 h-6 bg-rose-50 rounded-full" />
						<div className="absolute top-1/2 -right-3 w-6 h-6 bg-rose-50 rounded-full" />
					</div>
				)}
			</motion.div>
		</motion.div>
	);
};

export default Gallery;
