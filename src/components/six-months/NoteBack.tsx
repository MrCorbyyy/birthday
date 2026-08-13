import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Heart } from 'lucide-react';
import { sendSixMonthNote } from '../../services/email.service';

const NoteBack = () => {
	const [note, setNote] = useState('');
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

	const handleSend = async () => {
		if (!note.trim() || status !== 'idle') return;
		setStatus('sending');
		await sendSixMonthNote(note.trim());

		confetti({
			particleCount: 120,
			spread: 90,
			origin: { y: 0.6 },
			colors: ['#e11d48', '#fb7185', '#fda4af', '#ffffff'],
		});

		setStatus('sent');
	};

	return (
		<section className="py-24 px-4 bg-gradient-to-b from-white to-rose-50">
			<div className="max-w-xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					<h2 className="font-display text-3xl md:text-5xl text-gray-800 mb-4">
						Your Turn
					</h2>
					<p className="text-gray-600 mb-10 font-light">
						Write me back? Anything at all — it comes straight to me.
					</p>
				</motion.div>

				<AnimatePresence mode="wait">
					{status !== 'sent' ? (
						<motion.div
							key="form"
							exit={{ opacity: 0, scale: 0.95 }}
							className="space-y-4">
							<textarea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								placeholder="Dear Gillette..."
								rows={5}
								className="w-full rounded-2xl border border-rose-200 bg-white/80 backdrop-blur-sm p-5 font-display text-lg text-gray-800 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-romantic-red/40 resize-none"
							/>
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								onClick={handleSend}
								disabled={!note.trim() || status === 'sending'}
								className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:shadow-rose-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{status === 'sending' ? 'Sending...' : 'Send it'}
								<Send className="w-4 h-4" />
							</motion.button>
						</motion.div>
					) : (
						<motion.div
							key="sent"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="py-8">
							<Heart className="w-10 h-10 mx-auto text-rose-500 fill-rose-500 mb-4 animate-pulse" />
							<p className="font-display text-2xl text-gray-800">
								Got it. On its way to me right now.
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default NoteBack;
