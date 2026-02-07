import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Message from './components/Message';
import Proposal from './components/Proposal';
import Countdown from './components/Countdown';
import { Navigation } from './components/Navigation';
import { MusicPlayer } from './components/MusicPlayer';
import { AmbientParticles } from './components/AmbientParticles';
import OpenWhen from './components/OpenWhen';
import DatePlanner from './components/DatePlanner';

function App() {
	const targetDate = '2026-02-14T01:00:00';

	const [activeSection, setActiveSection] = useState('hero');
	// const [isUnlocked, setIsUnlocked] = useState(true);
	const [isUnlocked, setIsUnlocked] = useState(() => {
		return new Date() >= new Date(targetDate);
	});

	// useSmoothScroll({
	// 	smoothness: 0.1,
	// 	enabled: isUnlocked,
	// });

	useEffect(() => {
		const handleScroll = () => {
			const sections = [
				'hero',
				'gallery',
				'open-when',
				'date-planner',
				'message',
				'proposal',
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
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: 'rgba(255, 255, 255, 0.8)',
						backdropFilter: 'blur(10px)',
						color: '#e11d48',
						fontFamily: 'Montserrat, sans-serif',
					},
				}}
			/>

			<main className="w-full relative">
				<AnimatePresence mode="wait">
					{isUnlocked ? (
						<motion.div
							key="content"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1 }}>
							<AmbientParticles />
							<MusicPlayer />
							<Navigation activeSection={activeSection} />

							<div id="hero">
								<Hero />
							</div>

							<div id="gallery">
								<Gallery />
							</div>

							<div id="open-when">
								<OpenWhen />
							</div>

							<div id="date-planner">
								<DatePlanner />
							</div>

							<div id="message">
								<Message />
							</div>

							<div id="proposal">
								<Proposal />
							</div>

							<footer className="pb-32 pt-10 px-6 text-center text-rose-400 bg-gradient-to-t from-white to-transparent">
								<p className="font-display text-xl mb-2">
									Made with all my love
								</p>
								<div className="flex justify-center gap-2">
									{[...Array(3)].map((_, i) => (
										<motion.span
											key={i}
											animate={{
												y: [0, -5, 0],
												scale: [1, 1.1, 1],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												delay: i * 0.2,
											}}>
											❤️
										</motion.span>
									))}
								</div>
							</footer>
						</motion.div>
					) : (
						<motion.div
							key="countdown"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="min-h-screen flex items-center justify-center">
							<Countdown
								targetDate={targetDate}
								onComplete={() => setIsUnlocked(true)}
								setIsUnlocked={setIsUnlocked}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}

export default App;
