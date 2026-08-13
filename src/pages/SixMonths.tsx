import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AmbientParticles } from '../components/AmbientParticles';
import { SixMonthsNav } from '../components/six-months/SixMonthsNav';
import SixMonthsHero from '../components/six-months/SixMonthsHero';
import ChapterTimeline from '../components/six-months/ChapterTimeline';
import Achievements from '../components/six-months/Achievements';
import NumbersWeMade from '../components/six-months/NumbersWeMade';
import LoveNoteJournal from '../components/six-months/LoveNoteJournal';
import VideoMoment from '../components/six-months/VideoMoment';
import NextChapterCountdown from '../components/six-months/NextChapterCountdown';
import NoteBack from '../components/six-months/NoteBack';

const SixMonths = () => {
	const [activeSection, setActiveSection] = useState('six-hero');

	useEffect(() => {
		const handleScroll = () => {
			const sections = [
				'six-hero',
				'chapters',
				'achievements',
				'journal',
				'note-back',
			];
			const scrollPosition = window.scrollY + window.innerHeight / 2;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(section);
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="w-full min-h-screen overflow-x-hidden selection:bg-rose-200 selection:text-romantic-red">
			<main className="w-full relative">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}>
					<AmbientParticles />
					<SixMonthsNav activeSection={activeSection} />

					<div id="six-hero">
						<SixMonthsHero />
					</div>

					<ChapterTimeline />

					<div id="achievements">
						<Achievements />
					</div>

					<NumbersWeMade />

					<div id="journal">
						<LoveNoteJournal />
					</div>

					<VideoMoment />

					<NextChapterCountdown />

					<div id="note-back">
						<NoteBack />
					</div>

					<footer className="pb-32 pt-10 px-6 text-center text-rose-400 bg-gradient-to-t from-white to-transparent">
						<p className="font-display text-xl mb-2">Here's to forever, one ordinary day at a time</p>
						<div className="flex justify-center gap-2">
							{[...Array(3)].map((_, i) => (
								<motion.span
									key={i}
									animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
									transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
									❤️
								</motion.span>
							))}
						</div>
					</footer>
				</motion.div>
			</main>
		</div>
	);
};

export default SixMonths;
