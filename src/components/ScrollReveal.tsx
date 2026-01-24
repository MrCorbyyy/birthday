import type { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export const ScrollReveal = ({
	children,
	className = '',
	delay = 0,
}: ScrollRevealProps) => {
	const { elementRef, isVisible } = useScrollAnimation({
		threshold: 0.1,
		rootMargin: '-50px',
	});

	const staggerClass = delay > 0 ? `stagger-${Math.min(delay, 5)}` : '';

	return (
		<div
			ref={elementRef}
			className={`fade-in-up ${isVisible ? 'visible' : ''} ${staggerClass} ${className}`}>
			{children}
		</div>
	);
};
