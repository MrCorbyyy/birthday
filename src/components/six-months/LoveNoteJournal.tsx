import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart } from 'lucide-react';

const LoveNoteJournal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className="min-h-screen py-24 px-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100">
			<div
				className="relative z-10 w-full max-w-xl mx-auto"
				style={{ perspective: 1500 }}>
				<AnimatePresence mode="wait">
					{!isOpen ? (
						<motion.button
							key="cover"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							exit={{ rotateY: -110, opacity: 0 }}
							transition={{ duration: 0.7 }}
							onClick={() => setIsOpen(true)}
							style={{ transformOrigin: 'left center' }}
							className="group relative w-full aspect-[3/4] max-w-sm mx-auto rounded-r-xl rounded-l-sm bg-gradient-to-br from-rose-500 via-rose-600 to-romantic-red shadow-2xl flex flex-col items-center justify-center text-center p-10 border-l-4 border-rose-800/40">
							{/* Spine shadow */}
							<div className="absolute left-0 top-0 bottom-0 w-3 bg-black/10 rounded-l-sm" />
							<BookHeart className="w-10 h-10 text-rose-100 mb-6 group-hover:scale-110 transition-transform" />
							<h3 className="font-script text-4xl text-white mb-3">
								Our Story
							</h3>
							<p className="text-rose-100 text-sm uppercase tracking-[0.3em]">
								Open my journal
							</p>

						</motion.button>
					) : (
						<motion.div
							key="page"
							initial={{ rotateY: 90, opacity: 0 }}
							animate={{ rotateY: 0, opacity: 1 }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="relative bg-[#fffcfa] rounded-lg shadow-2xl p-8 md:p-12 w-full"
							style={{
								backgroundImage:
									'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
							}}>
							{/* Pinned photo, taped in */}
							<motion.div
								initial={{ opacity: 0, rotate: -8, y: -10 }}
								animate={{ opacity: 1, rotate: -6, y: 0 }}
								transition={{ delay: 0.5 }}
								className="float-right ml-4 mb-4 w-28 md:w-36 bg-white p-2 pb-4 shadow-lg">
								<img
									src="/6-mnth-anniv/us.jpeg"
									alt="Us"
									className="w-full aspect-square object-cover"
								/>
							</motion.div>

							<span className="text-romantic-red text-xs font-bold tracking-[0.3em] uppercase opacity-60">
								Dear Aseye
							</span>

							<div className="mt-6 font-display text-base md:text-lg leading-relaxed text-gray-800 space-y-4">
								<p>
									From our first pizza date and morning video calls, to grabbing ice cream and laughing through all our sweet, late-night randoms — every memory with you has been my absolute favorite part of us.
								</p>
								<p>
									You make ordinary moments feel like magic just by being in them.
								</p>
								<p className="font-semibold text-romantic-red italic text-lg md:text-xl pt-2">
									I've been thinking... There's something I've wanted to ask you for a while now...
								</p>
							</div>

							<div className="mt-8 text-right clear-both">
								<p className="font-romantic text-3xl text-romantic-red transform -rotate-2">
									Forever yours,
									<br />
									<span className="text-4xl ml-4">Charddy</span>
								</p>
							</div>

							<button
								onClick={() => setIsOpen(false)}
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

export default LoveNoteJournal;
