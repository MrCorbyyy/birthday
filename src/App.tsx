import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Message from './components/Message';
import Proposal from './components/Proposal';
import Countdown from './components/Countdown';

function App() {
	// Target date: February 14th, 2026 at 12:00 AM
	const targetDate = '2026-02-14T00:00:00';

	const [isUnlocked, setIsUnlocked] = useState(() => {
		return new Date() >= new Date(targetDate);
	});

	return (
		<div className="w-full min-h-screen overflow-x-hidden">
			<Toaster position="top-center" />

			<main className="w-full">
				<AnimatePresence mode="wait">
					{!isUnlocked ? (
						<motion.div
							key="content"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<Hero />
							<Gallery />
							<Message />
							<Proposal />
							<footer className="py-8 text-center bg-gradient-to-r from-rose-50 via-purple-50/30 to-orange-50/30 relative overflow-hidden">
								{/* Decorative Background */}
								<div className="absolute inset-0 pointer-events-none opacity-10">
									{[...Array(5)].map((_, i) => (
										<motion.span
											key={i}
											className="absolute text-4xl"
											animate={{
												y: [0, -20, 0],
												opacity: [0.3, 0.6, 0.3],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												delay: i * 0.8,
											}}
											style={{
												left: `${20 + i * 20}%`,
												top: '50%',
											}}>
											💕
										</motion.span>
									))}
								</div>
								<p className="text-sm font-playfair relative z-10">
									<span className="gradient-text">Made with ❤️ for you</span>
								</p>
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
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}

export default App;
