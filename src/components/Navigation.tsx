import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Image, AlignLeft, Gift, Mail, Disc } from 'lucide-react';

interface NavigationProps {
	activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const navItems = [
		{ id: 'hero', icon: Heart, label: 'Start' },
		{ id: 'gallery', icon: Image, label: 'Memories' },
		{ id: 'open-when', icon: Mail, label: 'Open When' },
		{ id: 'date-planner', icon: Disc, label: 'Future' },
		{ id: 'message', icon: AlignLeft, label: 'Dearest' },
		{ id: 'proposal', icon: Gift, label: 'Forever' },
	];

	return (
		<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
			<AnimatePresence>
				<motion.nav
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					className="flex items-center gap-2 px-1 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50">
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => scrollToSection(item.id)}
							className={`
                  relative p-3 rounded-full transition-all duration-300 group
                  ${
										activeSection === item.id
											? 'text-romantic-red bg-rose-50'
											: 'text-gray-500 hover:text-romantic-red hover:bg-rose-50/50'
									}
                `}
							aria-label={item.label}>
							<item.icon
								className={`w-5 h-5 ${activeSection === item.id ? 'fill-current' : ''}`}
							/>

							{/* Tooltip */}
							<span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-xs font-medium text-gray-600 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
								{item.label}
							</span>

							{/* Active Indicator */}
							{activeSection === item.id && (
								<motion.div
									layoutId="activeTab"
									className="absolute inset-0 rounded-full bg-rose-100/50 -z-10 border border-rose-200"
									transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</button>
					))}
				</motion.nav>
			</AnimatePresence>
		</div>
	);
};
