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

		const randomX = (Math.random() - 0.5) * 400;
		const randomY = (Math.random() - 0.5) * 400;

		btn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.95)`;
		btn.style.transition =
			'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
		setNoCount((prev) => prev + 1);
	};

	const handleYesClick = () => {
		setYesPressed(true);

		// Send email notification
		sendResponse('YES');

		// Enhanced confetti celebration
		const duration = 6 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 0 };

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 60 * (timeLeft / duration);

			// Multiple confetti bursts from different positions
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				colors: ['#e11d48', '#fb7185', '#fda4af', '#fecdd3'],
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				colors: ['#e11d48', '#fb7185', '#fda4af', '#fecdd3'],
			});
		}, 200);
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
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-4 text-center relative overflow-hidden">
			{/* Animated background elements */}
			<motion.div
				className="absolute top-20 left-20 text-rose-200 text-6xl"
				animate={{ rotate: 360, scale: [1, 1.2, 1] }}
				transition={{ repeat: Infinity, duration: 8 }}>
				❤
			</motion.div>
			<motion.div
				className="absolute bottom-32 right-20 text-pink-200 text-5xl"
				animate={{ rotate: -360, scale: [1, 1.3, 1] }}
				transition={{ repeat: Infinity, duration: 10 }}>
				💕
			</motion.div>

			{yesPressed ? (
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 15 }}
					className="text-center relative z-10">
					<motion.h1
						animate={{ scale: [1, 1.05, 1] }}
						transition={{ repeat: Infinity, duration: 2 }}
						className="text-6xl md:text-8xl lg:text-9xl text-rose-600 font-romantic mb-8 text-glow">
						YiPPeeeee!!! 🎉
					</motion.h1>

					<motion.div
						className="flex justify-center gap-4 text-6xl mb-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}>
						<motion.span
							animate={{ rotate: [0, 20, -20, 0] }}
							transition={{ repeat: Infinity, duration: 1 }}>
							❤️
						</motion.span>
						<motion.span
							animate={{ rotate: [0, -20, 20, 0] }}
							transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>
							❤️
						</motion.span>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
						className="text-2xl md:text-3xl text-rose-500 font-medium mb-8">
						I promise to make you the happiest girl in the world!
					</motion.p>

					<motion.img
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 1 }}
						src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5cWl5ZjQ2bW93c2ZqaHl5cmZ4Z2V3bmV3c2ZqaHl5cmZ4Z2V3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif"
						alt="Celebration"
						className="mt-8 rounded-3xl shadow-2xl mx-auto max-w-md w-full border-4 border-white"
					/>
				</motion.div>
			) : (
				<>
					<motion.h2
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, type: 'spring' }}
						className="text-5xl md:text-7xl lg:text-8xl text-rose-500 font-romantic mb-16 text-glow relative z-10">
						Kemi, will you be my Girlfriend?
					</motion.h2>

					<div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-48 z-10">
						{/* Yes Button with Premium Design */}
						<motion.button
							onClick={handleYesClick}
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.95 }}
							className="relative group">
							{/* Animated glow */}
							<div className="absolute -inset-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 animate-pulse-glow" />

							<div className="relative bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-white font-bold py-5 px-16 rounded-full text-2xl md:text-3xl shadow-2xl animate-gradient">
								Yes 💖
							</div>
						</motion.button>

						{/* No Button with Escape Animation */}
						<motion.button
							ref={noButtonRef}
							onMouseEnter={handleNoHover}
							onClick={handleNoHover}
							whileHover={{ scale: 0.95 }}
							className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-medium py-4 px-10 rounded-full text-lg md:text-xl shadow-lg absolute md:static"
							style={{
								willChange: 'transform',
							}}>
							{getNoText()}
						</motion.button>
					</div>

					{/* Hint Text */}
					{noCount > 3 && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="mt-12 text-rose-400 italic text-lg">
							Psst... the "Yes" button doesn't run away 😉
						</motion.p>
					)}
				</>
			)}
		</div>
	);
};

export default Proposal;
