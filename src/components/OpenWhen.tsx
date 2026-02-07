import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, Sparkles } from 'lucide-react';

const letters = [
	{
		id: 1,
		title: "Open when you're sad",
		color: 'from-blue-400 to-indigo-400',
		icon: '😢',
		content:
			"Hey my love, I hate that you're feeling down. Remember that you are the strongest, most beautiful person I know. This moment is temporary, but my love for you is permanent. Take a deep breath, call me, and let me make you smile. I'm always here for you. ❤️",
	},
	{
		id: 2,
		title: 'Open when you miss me',
		color: 'from-rose-400 to-pink-400',
		icon: '🤗',
		content:
			"I miss you too! Probably even more. Close your eyes and imagine I'm giving you the biggest, warmest hug right now. We'll be together soon, and I'll make up for every second we're apart. Until then, look at my photos and remember how much I adore you.",
	},
	{
		id: 3,
		title: 'Open when you need confidence',
		color: 'from-amber-400 to-orange-400',
		icon: '💪',
		content:
			"You are capable, brilliant, and absolutely amazing. Don't let doubt creep in. You've achieved so much and you have so much potential. I believe in you more than words can say. Go out there and show the world what I see in you every day!",
	},
	{
		id: 4,
		title: 'Open on our 1st Anniversary',
		color: 'from-purple-400 to-violet-400',
		icon: '🎉',
		content:
			"Happy Anniversary baby! Can you believe it's been a whole year? 365 days of loving you, laughing with you, and building memories. You are the best thing that ever happened to me. Here's to a lifetime more of us. I love you!",
	},
	{
		id: 5,
		title: 'Open when we are fighting',
		color: 'from-red-400 to-rose-400',
		icon: '🛑',
		content:
			"If we're fighting right now, I want you to know that I love you more than this argument. My pride, my anger—none of it matters more than you. Let's take a breath, forgive each other, and fix this. You are my teammate, not my opponent.",
	},
	{
		id: 6,
		title: 'Open just because',
		color: 'from-teal-400 to-emerald-400',
		icon: '✨',
		content:
			'No special reason, just wanted to remind you that you are loved beyond measure. You make my life brighter just by being in it. Have a wonderful day, my beautiful sunshine!',
	},
];

const OpenWhen = () => {
	const [selectedLetter, setSelectedLetter] = useState<
		(typeof letters)[0] | null
	>(null);

	return (
		<section className="min-h-screen py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
			{/* Background Decorations */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-10 left-10 text-rose-200/50 animate-pulse text-6xl">
					💌
				</div>
				<div className="absolute bottom-20 right-20 text-pink-200/50 animate-bounce text-8xl">
					💕
				</div>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[50px] border-rose-100/30 rounded-full"
				/>
			</div>

			<div className="max-w-6xl w-full z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16">
					<span className="inline-block p-3 rounded-full bg-white/50 backdrop-blur-sm mb-4">
						<Sparkles className="w-6 h-6 text-rose-500" />
					</span>
					<h2 className="font-display text-4xl md:text-6xl text-gray-800 mb-4">
						Open When...
					</h2>
					<p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
						Little reminders of my love for every moment, mood, and milestone.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{letters.map((letter, index) => (
						<motion.button
							key={letter.id}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
							onClick={() => setSelectedLetter(letter)}
							className={`relative group h-64 rounded-3xl p-1 bg-gradient-to-br ${letter.color} shadow-xl hover:shadow-2xl transition-all duration-300`}>
							<div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-[22px] m-[2px] flex flex-col items-center justify-center p-6 text-center border border-white/50 group-hover:bg-white/95 transition-colors">
								<motion.div
									className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl shadow-inner mb-6"
									whileHover={{ scale: 1.2, rotate: 10 }}>
									{letter.icon}
								</motion.div>
								<h3 className="font-display text-2xl text-gray-800 group-hover:text-rose-600 transition-colors">
									{letter.title}
								</h3>
								<div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400 font-medium flex items-center gap-2">
									<Mail className="w-4 h-4" />
									<span>Read Letter</span>
								</div>
							</div>
						</motion.button>
					))}
				</div>
			</div>

			<AnimatePresence>
				{selectedLetter && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
						onClick={() => setSelectedLetter(null)}>
						<motion.div
							initial={{ scale: 0.9, y: 100, rotateX: 20 }}
							animate={{ scale: 1, y: 0, rotateX: 0 }}
							exit={{ scale: 0.9, y: 100, opacity: 0 }}
							className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden"
							onClick={(e) => e.stopPropagation()}>
							{/* Paper Texture Effect */}
							<div
								className="absolute inset-0 opacity-[0.03] pointer-events-none"
								style={{
									backgroundImage:
										"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
								}}
							/>

							<button
								onClick={() => setSelectedLetter(null)}
								className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
								<X className="w-6 h-6 text-gray-500" />
							</button>

							<div className="text-center mb-10">
								<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 mb-6">
									<span className="text-4xl">{selectedLetter.icon}</span>
								</div>
								<h3 className="font-display text-3xl md:text-4xl text-gray-800">
									{selectedLetter.title}
								</h3>
								<div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-6" />
							</div>

							<div className="prose prose-lg mx-auto text-center">
								<p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-gray-700">
									{selectedLetter.content}
								</p>
							</div>

							<div className="flex justify-center mt-12">
								<Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default OpenWhen;
