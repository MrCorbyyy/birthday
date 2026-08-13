import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { chapters, type MemoryMedia } from '../../data/sixMonthsMemories';

const MediaThumb = ({ media }: { media: MemoryMedia }) => {
	if (media.type === 'video') {
		return (
			<video
				src={media.src}
				muted
				playsInline
				preload="metadata"
				className="w-full h-full object-cover"
			/>
		);
	}
	return (
		<img
			src={media.src}
			alt={media.alt}
			loading="lazy"
			className="w-full h-full object-cover"
		/>
	);
};

const ChapterTimeline = () => {
	const [lightbox, setLightbox] = useState<{
		chapterIndex: number;
		mediaIndex: number;
	} | null>(null);

	const activeChapter = lightbox ? chapters[lightbox.chapterIndex] : null;
	const activeMedia = activeChapter
		? activeChapter.media[lightbox!.mediaIndex]
		: null;

	const stepLightbox = (direction: number) => {
		if (!lightbox || !activeChapter) return;
		const len = activeChapter.media.length;
		const nextIndex = (lightbox.mediaIndex + direction + len) % len;
		setLightbox({ ...lightbox, mediaIndex: nextIndex });
	};

	return (
		<section
			id="chapters"
			className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-rose-100 via-white to-rose-50 overflow-hidden">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center max-w-2xl mx-auto mb-20">
				<h2 className="font-display text-4xl md:text-6xl text-gray-800 mb-4">
					Our Last Six Months
				</h2>
				<p className="text-gray-600 text-lg font-light">
					Seven chapters so far. Tap a photo or video to see it bigger.
				</p>
			</motion.div>

			<div className="relative max-w-4xl mx-auto">
				{/* Timeline spine */}
				<div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 md:-translate-x-1/2" />

				<div className="space-y-20 md:space-y-28">
					{chapters.map((chapter, chapterIndex) => (
						<motion.div
							key={chapter.id}
							id={chapter.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.7 }}
							className="relative pl-16 md:pl-0 scroll-mt-24">
							{/* Node */}
							<div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-rose-200 shadow-md flex items-center justify-center text-xl z-10">
								{chapter.emoji}
							</div>

							<div
								className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
									chapterIndex % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
								}`}>
								{/* Media collage */}
								<div className="mb-6 md:mb-0">
									{chapter.media.length === 1 ? (
										<button
											onClick={() =>
												setLightbox({ chapterIndex, mediaIndex: 0 })
											}
											className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 shadow-lg group">
											<MediaThumb media={chapter.media[0]} />
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
											{chapter.media[0].type === 'video' && (
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="w-12 h-12 rounded-full bg-white/85 flex items-center justify-center shadow-lg">
														<Play className="w-5 h-5 text-romantic-red fill-romantic-red ml-0.5" />
													</div>
												</div>
											)}
										</button>
									) : (
										<div className="grid grid-cols-3 gap-2">
											{chapter.media.map((m, mediaIndex) => (
												<button
													key={m.src}
													onClick={() =>
														setLightbox({ chapterIndex, mediaIndex })
													}
													className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 shadow-md group">
													<MediaThumb media={m} />
													<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
													{m.type === 'video' && (
														<div className="absolute inset-0 flex items-center justify-center">
															<div className="w-8 h-8 rounded-full bg-white/85 flex items-center justify-center shadow">
																<Play className="w-3.5 h-3.5 text-romantic-red fill-romantic-red ml-0.5" />
															</div>
														</div>
													)}
												</button>
											))}
										</div>
									)}
								</div>

								{/* Text */}
								<div>
									<span className="text-xs uppercase tracking-[0.3em] text-romantic-red font-semibold">
										{chapter.dateLabel}
									</span>
									<h3 className="font-display text-3xl md:text-4xl text-gray-800 mt-2 mb-4">
										{chapter.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{chapter.caption}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{activeMedia && activeChapter && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
						onClick={() => setLightbox(null)}>
						<button
							className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
							onClick={() => setLightbox(null)}>
							<X className="w-6 h-6" />
						</button>

						{activeChapter.media.length > 1 && (
							<>
								<button
									onClick={(e) => {
										e.stopPropagation();
										stepLightbox(-1);
									}}
									className="absolute left-2 md:left-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
									<ChevronLeft className="w-6 h-6 text-white" />
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										stepLightbox(1);
									}}
									className="absolute right-2 md:right-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
									<ChevronRight className="w-6 h-6 text-white" />
								</button>
							</>
						)}

						<motion.div
							key={activeMedia.src}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', damping: 25 }}
							className="relative max-w-3xl w-full flex flex-col items-center"
							onClick={(e) => e.stopPropagation()}>
							{activeMedia.type === 'video' ? (
								<video
									src={activeMedia.src}
									controls
									autoPlay
									playsInline
									className="max-h-[70vh] w-auto rounded-2xl shadow-2xl bg-black"
								/>
							) : (
								<img
									src={activeMedia.src}
									alt={activeMedia.alt}
									className="max-h-[70vh] w-auto rounded-2xl shadow-2xl"
								/>
							)}
							<div className="mt-6 text-center">
								<h3 className="font-display text-2xl text-white mb-1">
									{activeChapter.title}
								</h3>
								<p className="text-rose-300 text-sm">
									{lightbox!.mediaIndex + 1} / {activeChapter.media.length}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default ChapterTimeline;
