import { useEffect, useRef } from 'react';

interface ParallaxOptions {
	speed?: number;
	enabled?: boolean;
}

export const useParallax = ({
	speed = 0.5,
	enabled = true,
}: ParallaxOptions = {}) => {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!enabled) return;

		const handleScroll = () => {
			if (!elementRef.current) return;

			const rect = elementRef.current.getBoundingClientRect();
			const scrolled = window.scrollY;
			const elementTop = rect.top + scrolled;
			const windowHeight = window.innerHeight;

			// Only apply parallax when element is in viewport
			if (rect.top < windowHeight && rect.bottom > 0) {
				const offset = (scrolled - elementTop) * speed;
				elementRef.current.style.transform = `translateY(${offset}px)`;
			}
		};

		// Use requestAnimationFrame for smooth updates
		let rafId: number;
		const smoothHandleScroll = () => {
			handleScroll();
			rafId = requestAnimationFrame(smoothHandleScroll);
		};

		rafId = requestAnimationFrame(smoothHandleScroll);

		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [speed, enabled]);

	return elementRef;
};
