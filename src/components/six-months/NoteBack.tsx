import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircle, RotateCcw, Mail, CheckCircle2 } from 'lucide-react';
import { sendSixMonthNote } from '../../services/email.service';
import toast from 'react-hot-toast';

const CHARDDY_PHONE = '0509829682';
const CHARDDY_WHATSAPP_NUMBER = '233509829682';

const promptSuggestions = [
	'💕 Just wanted to remind you...',
	'✨ My favorite memory of us...',
	'🙏 A prayer for our journey...',
	'💖 What I appreciate about you...',
];

const NoteBack = () => {
	const [note, setNote] = useState('');
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

	const handleSend = () => {
		if (!note.trim()) return;
		setStatus('sending');

		// 1. Trigger celebratory confetti
		confetti({
			particleCount: 160,
			spread: 100,
			origin: { y: 0.6 },
			colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e', '#ffffff', '#fbbf24', '#10b981'],
		});

		// 2. Format WhatsApp direct message to 0509829682
		const messageText = `💌 Note from Aseye for Charddy:\n\n${note.trim()}`;
		const whatsappUrl = `https://wa.me/${CHARDDY_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

		// 3. Open WhatsApp directly to Charddy's number
		window.open(whatsappUrl, '_blank');

		// 4. Background backup dispatch to email so nothing is ever lost
		sendSixMonthNote(note.trim()).catch(() => {});

		toast.success('Opening message to Charddy! 💕');
		setStatus('sent');
	};

	const applyPrompt = (prompt: string) => {
		if (!note.trim()) {
			setNote(prompt + '\n\n');
		} else {
			setNote((prev) => prev.trim() + '\n\n' + prompt + '\n');
		}
	};

	const handleReset = () => {
		setNote('');
		setStatus('idle');
	};

	return (
		<section className="relative py-24 px-4 bg-gradient-to-b from-rose-50/50 via-white to-pink-50/60 overflow-hidden">
			{/* Decorative background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-2xl mx-auto relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-600 text-xs font-semibold tracking-wider uppercase mb-4">
						<Mail className="w-3.5 h-3.5" />
						<span>A Message For Charddy</span>
					</div>
					<h2 className="font-display text-4xl md:text-5xl text-gray-800 mb-3">
						Your Turn, My Love
					</h2>
					<p className="text-gray-600 text-base md:text-lg font-light max-w-lg mx-auto">
						Write me back? A prayer, a sweet thought, or whatever is in your heart. It sends straight to my number ({CHARDDY_PHONE}).
					</p>
				</motion.div>

				{/* Letter Card */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="bg-white/90 backdrop-blur-xl border border-rose-200/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
					
					{/* Top Stationery Header */}
					<div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6 text-xs text-rose-500 font-semibold tracking-wide">
						<span className="flex items-center gap-1.5">
							<Heart className="w-3.5 h-3.5 fill-current" /> From: Aseye
						</span>
						<span className="flex items-center gap-1.5">
							To: Charddy ({CHARDDY_PHONE}) 🌹
						</span>
					</div>

					<AnimatePresence mode="wait">
						{status !== 'sent' ? (
							<motion.div
								key="form"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0, scale: 0.96 }}
								className="space-y-5">
								
								{/* Quick Prompt Starters */}
								<div>
									<p className="text-xs text-gray-500 mb-2 font-medium flex items-center gap-1">
										<Sparkles className="w-3 h-3 text-amber-400" /> Need inspiration? Tap to start:
									</p>
									<div className="flex flex-wrap gap-2">
										{promptSuggestions.map((prompt, idx) => (
											<button
												key={idx}
												type="button"
												onClick={() => applyPrompt(prompt)}
												className="text-xs px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 transition-colors cursor-pointer">
												{prompt}
											</button>
										))}
									</div>
								</div>

								{/* Textarea */}
								<div className="relative">
									<textarea
										value={note}
										onChange={(e) => setNote(e.target.value)}
										placeholder="Dear Charddy..."
										rows={6}
										className="w-full rounded-2xl border border-rose-200 bg-rose-50/20 p-5 font-display text-lg text-gray-800 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all resize-none leading-relaxed"
									/>
									<div className="text-right text-[11px] text-gray-400 mt-1">
										{note.trim().length} characters
									</div>
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
									<p className="text-xs text-rose-400 italic">
										Sends directly to Charddy at {CHARDDY_PHONE} 💬
									</p>

									<motion.button
										whileHover={{ scale: 1.04 }}
										whileTap={{ scale: 0.96 }}
										onClick={handleSend}
										disabled={!note.trim()}
										className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
										<MessageCircle className="w-5 h-5" />
										<span>Send to Charddy</span>
									</motion.button>
								</div>
							</motion.div>
						) : (
							<motion.div
								key="sent"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className="py-10 text-center space-y-6">
								<motion.div
									animate={{ scale: [1, 1.15, 1] }}
									transition={{ duration: 2, repeat: Infinity }}
									className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
									<CheckCircle2 className="w-10 h-10 text-emerald-600" />
								</motion.div>

								<div>
									<h3 className="font-display text-3xl text-gray-800 mb-2">
										Message Sent to Charddy! 💬
									</h3>
									<p className="text-gray-600 font-light text-base md:text-lg max-w-md mx-auto leading-relaxed">
										Your message was prepared directly for Charddy ({CHARDDY_PHONE}). Thank you, my love — I can't wait to read every word.
									</p>
								</div>

								{/* Actions */}
								<div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
									<a
										href={`https://wa.me/${CHARDDY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
											`💌 Note from Aseye for Charddy:\n\n${note}`
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-full shadow-md hover:scale-105 transition-all">
										<MessageCircle className="w-4 h-4" />
										<span>Re-open WhatsApp Chat</span>
									</a>

									<button
										onClick={handleReset}
										className="inline-flex items-center gap-2 px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-sm rounded-full border border-rose-200/80 transition-all cursor-pointer">
										<RotateCcw className="w-4 h-4" />
										<span>Write another note</span>
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default NoteBack;
