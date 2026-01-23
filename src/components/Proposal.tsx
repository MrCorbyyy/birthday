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

		// Ensure it stays within viewport somewhat or just swap transform
		// Simple random offset approach
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
		<div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 p-4 text-center">
			{yesPressed ? (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="text-center">
					<h1 className="text-6xl md:text-8xl text-rose-600 font-romantic mb-8">
						YiPPeeeee!!! 🎉❤️❤️
					</h1>
					<p className="text-2xl text-rose-400">
						I promise to make you the happiest girl in the world!
					</p>
					<img
						src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5cWl5ZjQ2bW93c2ZqaHl5cmZ4Z2V3bmV3c2ZqaHl5cmZ4Z2V3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif"
						alt="Celebration"
						className="mt-8 rounded-xl shadow-lg mx-auto max-w-md w-full"
					/>
				</motion.div>
			) : (
				<>
					<motion.h2
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						className="text-5xl md:text-7xl text-rose-500 font-romantic mb-12">
						Kemi, will you be my Girlfriend?
					</motion.h2>

					<div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-40">
						<button
							onClick={handleYesClick}
							className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform transition-transform hover:scale-110 active:scale-95 z-20">
							Yes 💖
						</button>

						<button
							ref={noButtonRef}
							onMouseEnter={handleNoHover}
							onClick={handleNoHover} // Mobile support
							className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-8 rounded-full text-lg absolute md:static transition-all duration-100 ease-out"
							style={
								{
									// Start static then go absolute on moves if needed, or just let transform handle it
								}
							}>
							{getNoText()}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Proposal;
