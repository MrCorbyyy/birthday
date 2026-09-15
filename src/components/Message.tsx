import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

const Message = () => {
	const [isOpen, setIsOpen] = useState(false);
	const parallaxBg = useParallax({ speed: 0.2 });

	return (
		<section className="min-h-screen py-24 flex items-center justify-center relative overflow-hidden bg-rose-100 perspective-1000">
			{/* Background with Parallax */}
			<div
				ref={parallaxBg}
				className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 parallax-slow"
			/>

			<div className="relative z-10 w-full max-w-lg mx-auto h-[60vh] flex items-center justify-center">
				<AnimatePresence>
					{!isOpen ? (
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
							whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
							exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
							transition={{ duration: 0.8 }}
							onClick={() => setIsOpen(true)}
							className="relative cursor-pointer group"
							style={{ transformStyle: 'preserve-3d' }}>

							<div className="w-[300px] h-[200px] bg-rose-200 shadow-2xl rounded-b-lg relative z-0" />

							
							<div className="absolute top-0 left-0 w-full h-full z-20 origin-top transition-transform duration-500 group-hover:rotate-x-180">
								<div className="border-t-[100px] border-t-rose-300 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent h-0 w-0 filter drop-shadow-md" />
							</div>

							
							<div className="absolute top-[40%] left-1/2 -translate-x-1/2 z-30 w-12 h-12 bg-romantic-red rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
								<span className="font-great-vibes text-white text-xl font-bold">
									A
								</span>
							</div>

							{/* Envelope Front */}
							<div className="absolute bottom-0 left-0 w-full h-full z-10 pointer-events-none">
								<div className="border-b-[100px] border-b-rose-100 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent h-0 w-0 absolute bottom-0" />
								<div className="border-l-[150px] border-l-rose-50 border-b-[100px] border-b-transparent border-t-[100px] border-t-transparent h-0 w-0 absolute left-0" />
								<div className="border-r-[150px] border-r-rose-50 border-b-[100px] border-b-transparent border-t-[100px] border-t-transparent h-0 w-0 absolute right-0" />
							</div>

							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									delay: 0.5,
									repeat: Infinity,
									repeatType: 'reverse',
									duration: 1.5,
								}}
								className="absolute -bottom-12 left-0 w-full text-center text-romantic-red font-medium tracking-widest text-sm uppercase">
								Tap to Open
							</motion.p>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 1, delay: 0.2 }}
							className="bg-[#fffcfc] p-8 md:p-12 rounded-sm shadow-2xl max-w-xl w-full mx-4 relative"
							style={{
								backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
							}}>
							<div className="mb-8 text-center">
								<span className="text-romantic-red text-xs font-bold tracking-[0.3em] uppercase opacity-60">
									From My Heart
								</span>
							</div>

							<div className="font-display text-lg md:text-xl leading-relaxed text-gray-800 space-y-6">
								<p>
									<span className="text-5xl text-romantic-red font-romantic float-left mr-3 mt-[-10px] opacity-80">
										A
									</span>
									seye,
								</p>
								<p>
									I never believed in perfect timing until I met you. Every
									laugh we've shared, every moment we've spent together has
									shown me what it means to truly connect with someone.
								</p>
								<p>
									You make ordinary days feel extraordinary. Your smile lights
									up my world, and your presence brings me a peace I've never
									known before.
								</p>
								<p>
									I don't want to imagine my days without you in them. You've
									become my favorite person, my best friend, and the one I want
									to share everything with.
								</p>
							</div>

							<div className="mt-12 text-right">
								<p className="font-romantic text-3xl text-romantic-red transform -rotate-2">
									With all my heart,
									<br />
									<span className="text-4xl ml-4">Charddy</span>
								</p>
							</div>

							{/* Close Button */}
							<button
								onClick={(e) => {
									e.stopPropagation();
									setIsOpen(false);
								}}
								className="absolute top-4 right-4 text-gray-300 hover:text-romantic-red transition-colors">
								<span className="text-xs uppercase tracking-widest">Close</span>
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Message;
