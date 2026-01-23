import { motion } from 'framer-motion';

const Message = () => {
	return (
		<div className="py-24 bg-rose-50">
			<div className="max-w-4xl mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-12">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="w-full md:w-1/2">
						<img
							src="/me.JPEG"
							alt="Gillette"
							className="rounded-2xl shadow-xl w-full h-[500px] object-cover -rotate-2 border-8 border-white"
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="w-full md:w-1/2">
						<h2 className="text-5xl text-rose-500 font-romantic mb-6">
							A Note for You...
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed font-light mb-6">
							Kemi, from the moment we met, you've brought so much light into my
							life. Every day with you feels like a beautiful adventure, and I
							can't imagine spending this Valentine's Day (and every day after)
							without you by my side.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
							You are smart, beautiful, and kind. You genuinely make me a better
							person, and I just want to make you smile every single day.
						</p>
						<p className="text-2xl text-rose-600 font-romantic">
							With all my love,
							<br />- Gillette
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Message;
