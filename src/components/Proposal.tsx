import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sendResponse } from '../services/email.service';

const Proposal = () => {
	const [noCount, setNoCount] = useState(0);
	const [yesPressed, setYesPressed] = useState(false);
	const noButtonRef = useRef<HTMLButtonElement>(null);

	const handleNoHover = () => {
		const btn = noButtonRef.current;
		if (!btn) return;

		const randomX = (Math.random() - 0.5) * 500;
		const randomY = (Math.random() - 0.5) * 500;

		btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
		setNoCount((prev) => prev + 1);
	};

	const handleYesClick = () => {
		setYesPressed(true);

		// Send email notification
		sendResponse('YES');

		// Trigger confetti
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	};

	const noPhrases = [
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

	const getNoText = () => {
		return noPhrases[Math.min(noCount, noPhrases.length - 1)];
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
			{/* Animated Gradient Background */}
			<div
				className="absolute inset-0 bg-gradient-to-br from-rose-100 via-purple-50 to-orange-100 animate-gradient -z-10"
				style={{ backgroundSize: '200% 200%' }}
			/>

			{/* Floating Hearts Background */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute text-rose-200 text-5xl"
						initial={{
							x: Math.random() * window.innerWidth,
							y: window.innerHeight + 50,
							opacity: 0,
						}}
						animate={{
							y: -50,
							opacity: [0, 0.6, 0],
							rotate: [0, 360],
						}}
						transition={{
							duration: Math.random() * 10 + 15,
							repeat: Infinity,
							delay: Math.random() * 5,
							ease: 'linear',
						}}>
						💕
					</motion.div>
				))}
			</div>

			<div className="relative z-10 w-full max-w-4xl">
				{yesPressed ? (
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5, type: 'spring' }}
						className="text-center glass-strong rounded-3xl p-12 shadow-2xl">
						<motion.h1
							animate={{
								scale: [1, 1.05, 1],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
							}}
							className="text-6xl md:text-8xl font-romantic mb-8">
							<span className="gradient-text">YiPPeeeee!!! 🎉</span>
						</motion.h1>

						<div className="flex justify-center gap-4 my-6">
							{[...Array(5)].map((_, i) => (
								<motion.span
									key={i}
									animate={{
										scale: [1, 1.3, 1],
										rotate: [0, 360],
									}}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: i * 0.2,
									}}
									className="text-5xl">
									❤️
								</motion.span>
							))}
						</div>

						<p className="text-2xl md:text-3xl text-rose-600 font-playfair mb-8">
							I promise to make you the happiest girl in the world!
						</p>

						<img
							src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5cWl5ZjQ2bW93c2ZqaHl5cmZ4Z2V3bmV3c2ZqaHl5cmZ4Z2V3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif"
							alt="Celebration"
							className="mt-8 rounded-2xl shadow-2xl mx-auto max-w-md w-full border-4 border-white"
						/>
					</motion.div>
				) : (
					<div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl">
						<motion.h2
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="text-5xl md:text-7xl mb-12 font-romantic">
							<span className="gradient-text">
								Kemi, will you be my Girlfriend?
							</span>
						</motion.h2>

						<div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-40">
							{/* Yes Button with Pulsing Glow */}
							<motion.button
								onClick={handleYesClick}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								animate={{
									boxShadow: [
										'0 0 20px rgba(225, 29, 72, 0.4)',
										'0 0 40px rgba(225, 29, 72, 0.6)',
										'0 0 20px rgba(225, 29, 72, 0.4)',
									],
								}}
								transition={{
									boxShadow: {
										duration: 2,
										repeat: Infinity,
									},
								}}
								className="relative bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-5 px-14 rounded-full text-2xl md:text-3xl shadow-lg z-20 overflow-hidden group">
								{/* Shimmer Effect */}
								<div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
								<span className="relative z-10">Yes 💖</span>
							</motion.button>

							{/* No Button that Runs Away */}
							<motion.button
								ref={noButtonRef}
								onMouseEnter={handleNoHover}
								onClick={handleNoHover}
								whileHover={{ scale: 1.05 }}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-10 rounded-full text-lg md:text-xl absolute md:static transition-all duration-200 ease-out shadow-md">
								{getNoText()}
							</motion.button>
						</div>

						{/* Hint Text */}
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
							className="mt-12 text-gray-500 text-sm italic">
							(Psst... there's only one right answer 😉)
						</motion.p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Proposal;
