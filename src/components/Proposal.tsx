/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sendResponse } from '../services/email.service';
import { Sparkles, Heart } from 'lucide-react';

const Proposal = () => {
	const [noCount, setNoCount] = useState(0);
	const [yesPressed, setYesPressed] = useState(false);
	const [cinemaMode, setCinemaMode] = useState(false);
	const noButtonRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHoveringNo, setIsHoveringNo] = useState(false);

	// Auto-cycle No messages on hover
	useEffect(() => {
		let interval: any;
		if (isHoveringNo) {
			// Increment immediately on hover, then every 600ms
			setNoCount((prev) => prev + 1);
			interval = setInterval(() => {
				setNoCount((prev) => prev + 1);
			}, 600);
		}
		return () => clearInterval(interval);
	}, [isHoveringNo]);

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
		setIsHoveringNo(true);
	};

	const handleNoLeave = () => {
		setIsHoveringNo(false);
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

	const getHintMessage = () => {
		if (noCount < 3) return null;

		const hints = [
			{ min: 3, max: 5, text: 'Hmm... interesting choice 🤔' },
			{ min: 6, max: 8, text: 'You know you want to say yes... 😏' },
			{
				min: 9,
				max: 11,
				text: "The 'Yes' button is looking pretty good right now, isn't it? ✨",
			},
			{ min: 12, max: 14, text: 'I can wait all day... but can you? ⏰' },
			{
				min: 15,
				max: 17,
				text: "Your finger is getting tired, just click 'Yes' already! 💕",
			},
			{
				min: 18,
				max: 20,
				text: 'This is adorable, but we both know how this ends 😊',
			},
			{
				min: 21,
				max: 999,
				text: 'No is not an option, Aseye. It never was. 💖',
			},
		];

		const hint = hints.find((h) => noCount >= h.min && noCount <= h.max);
		return hint?.text || hints[hints.length - 1].text;
	};

	return (
		<section
			ref={containerRef}
			className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000 ${
				cinemaMode
					? 'bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900'
					: 'bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100'
			}`}>
			{/* Animated Background Orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{
						scale: [1, 1.3, 1],
						opacity: cinemaMode ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
					}}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: cinemaMode ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15],
					}}
					transition={{ duration: 10, repeat: Infinity }}
					className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
				/>
			</div>

			{/* Spotlight Effect */}
			<div
				className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
					cinemaMode ? 'opacity-100' : 'opacity-0'
				}`}
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
						className="relative z-10 text-center px-4">
						{/* Glowing Success Message */}
						<motion.div
							animate={{
								textShadow: [
									'0 0 20px rgba(225, 29, 72, 0.3)',
									'0 0 40px rgba(225, 29, 72, 0.6)',
									'0 0 20px rgba(225, 29, 72, 0.3)',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
							className="mb-8">
							<Heart className="w-24 h-24 mx-auto text-rose-400 fill-rose-400 mb-6" />
							<h2 className="font-script text-6xl md:text-8xl text-white mb-6">
								She said Yes!
							</h2>
						</motion.div>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="font-display text-2xl md:text-3xl text-rose-200 max-w-2xl mx-auto mb-8">
							This is just the beginning of our story together, Aseye. ❤️
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1 }}
							className="relative z-20 flex flex-wrap justify-center gap-4">
							<a
								href="https://wa.me/233509829682?text=I%20said%20YES!%20%F0%9F%92%95%F0%9F%8E%89"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105">
								<span>Tell Charddy on WhatsApp</span>
								<span>💬</span>
							</a>
						</motion.div>

						{/* Floating Hearts */}
						<div className="absolute inset-0 pointer-events-none">
							{[...Array(12)].map((_, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 0 }}
									animate={{ opacity: [0, 1, 0], y: -300 }}
									transition={{
										duration: 3,
										delay: i * 0.2,
										repeat: Infinity,
										repeatDelay: 1,
									}}
									className="absolute text-4xl"
									style={{
										left: `${10 + i * 8}%`,
										top: '50%',
									}}>
									❤️
								</motion.div>
							))}
						</div>
					</motion.div>
				) : (
					<motion.div
						key="question"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 1 }}
						className="z-10 text-center px-4 max-w-4xl">
						{/* Decorative Icon */}
						<motion.div
							animate={{
								rotate: [0, 10, -10, 0],
								scale: [1, 1.1, 1],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							className="mb-8">
							<Sparkles
								className={`w-16 h-16 mx-auto ${
									cinemaMode ? 'text-rose-400' : 'text-romantic-red'
								}`}
							/>
						</motion.div>

						{/* The Question Card */}
						<motion.div
							animate={{ opacity: cinemaMode ? 1 : 0.95 }}
							className={`backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 border ${
								cinemaMode
									? 'bg-white/5 border-white/10'
									: 'bg-white/60 border-white/40'
							} shadow-2xl`}>
							<span
								className={`block text-sm tracking-[0.4em] uppercase mb-6 ${
									cinemaMode ? 'text-rose-300' : 'text-romantic-red'
								}`}>
								The Question
							</span>
							<h2
								className={`font-display text-3xl md:text-6xl leading-tight transition-colors duration-1000 ${
									cinemaMode ? 'text-white' : 'text-gray-800'
								}`}>
								Aseye, will you be my girlfriend?
							</h2>
						</motion.div>

						{/* Buttons */}
						<div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
							<motion.button
								whileHover={{ scale: 1.1, y: -5 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleYesClick}
								className="group relative px-16 py-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 min-w-[240px] overflow-hidden">
								<span className="relative z-10">Yes! 💕</span>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500"
									initial={{ x: '-100%' }}
									whileHover={{ x: 0 }}
									transition={{ duration: 0.3 }}
								/>
							</motion.button>

							<motion.button
								ref={noButtonRef}
								onMouseEnter={handleNoHover}
								onMouseLeave={handleNoLeave}
								whileHover={{ scale: 1.05 }}
								className={`px-16 py-6 text-xl font-medium rounded-full transition-all duration-300 min-w-[240px] ${
									cinemaMode
										? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
										: 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200'
								}`}>
								{getNoButtonText()}
							</motion.button>
						</div>

						{/* Hint Message */}
						<AnimatePresence>
							{getHintMessage() && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.5 }}
									className={`mt-6 text-lg md:text-xl font-medium italic transition-colors duration-1000 ${
										cinemaMode ? 'text-rose-300' : 'text-rose-600'
									}`}>
									{getHintMessage()}
								</motion.p>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Proposal;
