import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
	threshold?: number;
	rootMargin?: string;
}

export const useScrollAnimation = ({
	threshold = 0.1,
	rootMargin = '0px',
}: ScrollAnimationOptions = {}) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					// Once visible, stop observing to prevent re-triggering
					if (elementRef.current) {
						observer.unobserve(elementRef.current);
					}
				}
			},
			{ threshold, rootMargin },
		);

		const currentElement = elementRef.current;
		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
	}, [threshold, rootMargin]);

	return { elementRef, isVisible };
};
