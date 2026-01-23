/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sendResponse } from '../services/email.service';

const Proposal = () => {
	const [noCount, setNoCount] = useState(0);
	const [yesPressed, setYesPressed] = useState(false);
	const [cinemaMode, setCinemaMode] = useState(false);
	const noButtonRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Cinema Mode Effect
	useEffect(() => {
		const handleScroll = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const isInView =
					rect.top < window.innerHeight / 2 &&
					rect.bottom > window.innerHeight / 2;
				setCinemaMode(isInView);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNoHover = () => {
		const btn = noButtonRef.current;
		if (btn) {
			const x = Math.random() * (window.innerWidth - 300); // constrained to keep somewhat on screen
			const y = Math.random() * (window.innerHeight - 100);
			btn.style.position = 'fixed';
			btn.style.left = `${Math.max(20, x)}px`;
			btn.style.top = `${Math.max(20, y)}px`;
		}
		setNoCount(noCount + 1);
	};

	const handleYesClick = () => {
		setYesPressed(true);

		// Massive Fireworks
		const duration = 15 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 50 };

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval: any = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 100 * (timeLeft / duration);

			// Fireworks from sides and bottom
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				}),
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				}),
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: { x: 0.5, y: 1 },
				}),
			);
		}, 200);

		sendResponse('Yes').catch(console.error);
	};

	const getNoButtonText = () => {
		const phrases = [
			'No',
			'Are you sure?',
			'Really sure?',
			'Think again!',
			'Last chance!',
			'Surely not?',
			'You might regret this!',
			'Give it another thought!',
			'Are you absolutely certain?',
			'This could be a mistake!',
			'Have a heart!',
			"Don't be so cold!",
			'Change of heart?',
			"Wouldn't you reconsider?",
			'Is that your final answer?',
			"You're breaking my heart ;(",
		];
		return phrases[Math.min(noCount, phrases.length - 1)];
	};

	return (
		<section
			ref={containerRef}
			className={`min-h-screen flex flex-col items-center justify-center relative transition-colors duration-1000 ${cinemaMode ? 'bg-black/95' : 'bg-gradient-to-br from-rose-50 via-white to-pink-50'}`}>
			{/* Spotlight Effect */}
			<div
				className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${cinemaMode ? 'opacity-100' : 'opacity-0'}`}
				style={{
					background:
						'radial-gradient(circle at center, rgba(225, 29, 72, 0.15) 0%, transparent 70%)',
				}}
			/>

			<AnimatePresence mode="wait">
				{yesPressed ? (
					<motion.div
						key="success"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className="relative z-10 text-center">
						{/* Glowing Text */}
						<motion.h2
							animate={{
								textShadow: [
									'0 0 10px rgba(225, 29, 72, 0.2)',
									'0 0 30px rgba(225, 29, 72, 0.6)',
									'0 0 10px rgba(225, 29, 72, 0.2)',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
							className="font-romantic text-6xl md:text-9xl text-white mb-8">
							She said Yes!
						</motion.h2>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="font-display text-2xl md:text-3xl text-gray-300">
							I love you, Kemi. Today is just the beginning.
						</motion.p>
					</motion.div>
				) : (
					<motion.div
						key="question"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1 }}
						className="z-10 text-center px-4 max-w-4xl">
						<motion.div
							animate={{ opacity: cinemaMode ? 1 : 0.8 }}
							className="mb-16">
							<span className="block text-romantic-red text-sm tracking-[0.4em] uppercase mb-6">
								The Final Question
							</span>
							<h2
								className={`font-display text-4xl md:text-7xl leading-tight transition-colors duration-1000 ${cinemaMode ? 'text-white' : 'text-gray-800'}`}>
								Will you make me the happiest man alive and be my girlfriend?
							</h2>
						</motion.div>

						<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
							<motion.button
								whileHover={{
									scale: 1.1,
									boxShadow: '0 0 30px rgba(225, 29, 72, 0.5)',
								}}
								whileTap={{ scale: 0.95 }}
								onClick={handleYesClick}
								className="px-16 py-6 bg-romantic-red text-white text-2xl font-medium rounded-full shadow-2xl hover:bg-rose-600 transition-all duration-300 min-w-[240px]">
								Yes
							</motion.button>

							<motion.button
								ref={noButtonRef}
								onMouseEnter={handleNoHover}
								className={`px-16 py-6 text-xl font-medium rounded-full transition-colors duration-300 min-w-[240px] ${cinemaMode ? 'bg-white/10 text-gray-400 hover:bg-white/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
								{getNoButtonText()}
							</motion.button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Proposal;
