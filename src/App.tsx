import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Message from './components/Message';
import Proposal from './components/Proposal';

function App() {
	return (
		<div className="w-full min-h-screen overflow-x-hidden">
			<Toaster position="top-center" />

			<main className="w-full">
				<Hero />
				<Gallery />
				<Message />
				<Proposal />
			</main>

			<footer className="py-8 text-center text-rose-300 text-sm bg-rose-50/50">
				<p>Made with ❤️ for you</p>
			</footer>
		</div>
	);
}

export default App;
