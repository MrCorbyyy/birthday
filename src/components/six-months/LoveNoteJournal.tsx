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
								Six Months In
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
									src="/6-mnth-anniv/anniv_cover.JPG"
									alt="Us"
									className="w-full aspect-square object-cover"
								/>
							</motion.div>

							<span className="text-romantic-red text-xs font-bold tracking-[0.3em] uppercase opacity-60">
								Dear Ursie
							</span>

							<div className="mt-6 font-display text-base md:text-lg leading-relaxed text-gray-800 space-y-4">
								<p>
									Six months ago I was standing behind a countdown, refreshing
									it more than I'll admit, hoping you'd say yes. You did. And
									the six months since have been better than anything I built up
									in my head while I was waiting.
								</p>
								<p>
									We've had a movie night through a laptop camera because a
									screen was all we had that night. We've had real cinema seats,
									too. We've lost — fine, <em>I've</em> lost, some of the time —
									at bowling, won at laser tag, and gotten way too competitive
									over an arcade hoop game that doesn't even keep real score. I
									got on a flight just to stand in the same room as you.
								</p>
								{/* <p>
									And somewhere in the middle of all of it, I got to watch you
									in a hardhat, running a site like you were born doing it, and
									think: <em>that's my girlfriend</em>. That's still wild to say
									out loud.
								</p> */}
								<p>
									181 days in, and I'd choose every single one again. Here's to
									the next 181, and the 181 after that, and however many more
									you'll have me for.
								</p>
							</div>

							<div className="mt-10 text-right clear-both">
								<p className="font-romantic text-3xl text-romantic-red transform -rotate-2">
									Still choosing you,
									<br />
									<span className="text-4xl ml-4">Gillette</span>
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
