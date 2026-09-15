import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Message from './components/Message';
import OpenWhen from './components/OpenWhen';
import Birthday from './components/Birthday';
import Proposal from './components/Proposal';
import { Navigation } from './components/Navigation';
import { AmbientParticles } from './components/AmbientParticles';

function App() {
	const [activeSection, setActiveSection] = useState('hero');

	useEffect(() => {
		const handleScroll = () => {
			const sections = [
				'hero',
				'gallery',
				'message',
				'openwhen',
				'birthday',
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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}>
					<AmbientParticles />
					<Navigation activeSection={activeSection} />

					<div id="hero">
						<Hero />
					</div>

					<div id="gallery">
						<Gallery />
					</div>

					<div id="message">
						<Message />
					</div>

					<div id="openwhen">
						<OpenWhen />
					</div>

					<div id="birthday">
						<Birthday />
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
			</main>
		</div>
	);
}

export default App;
