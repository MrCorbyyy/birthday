import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Message from './components/Message';
import Proposal from './components/Proposal';
import Countdown from './components/Countdown';

function App() {
	// Target date: February 14th, 2026 at 6:00 PM
	const targetDate = '2026-02-14T00:00:00';

	const [isUnlocked, setIsUnlocked] = useState(() => {
		return new Date() >= new Date(targetDate);
	});

	return (
		<div className="w-full min-h-screen overflow-x-hidden">
			<Toaster position="top-center" />

			<main className="w-full">
				{isUnlocked ? (
					<>
						<Hero />
						<Gallery />
						<Message />
						<Proposal />
					</>
				) : (
					<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-rose-200">
						<Countdown
							targetDate={targetDate}
							onComplete={() => setIsUnlocked(true)}
						/>
					</div>
				)}
			</main>

			<footer className="py-8 text-center text-rose-300 text-sm bg-rose-50/50">
				<p>Made with ❤️ for you</p>
			</footer>
		</div>
	);
}

export default App;
