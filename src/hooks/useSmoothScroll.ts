import { useEffect, useRef } from 'react';

interface SmoothScrollOptions {
	smoothness?: number;
	enabled?: boolean;
}

export const useSmoothScroll = ({
	smoothness = 0.08,
	enabled = true,
}: SmoothScrollOptions = {}) => {
	const scrollTargetRef = useRef(0);
	const currentScrollRef = useRef(0);
	const rafIdRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		if (!enabled) return;

		let isScrolling = false;

		const handleWheel = (e: WheelEvent) => {
			if (e.cancelable) {
				e.preventDefault();
			}
			// Reduce scroll speed by multiplying deltaY by 0.4 (slower scroll)
			scrollTargetRef.current += e.deltaY * 0.4;

			// Clamp the target scroll position
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			scrollTargetRef.current = Math.max(
				0,
				Math.min(scrollTargetRef.current, maxScroll),
			);

			if (!isScrolling) {
				isScrolling = true;
				smoothScroll();
			}
		};

		const smoothScroll = () => {
			const diff = scrollTargetRef.current - currentScrollRef.current;

			if (Math.abs(diff) > 0.5) {
				currentScrollRef.current += diff * smoothness;
				window.scrollTo(0, currentScrollRef.current);
				rafIdRef.current = requestAnimationFrame(smoothScroll);
			} else {
				currentScrollRef.current = scrollTargetRef.current;
				window.scrollTo(0, currentScrollRef.current);
				isScrolling = false;
			}
		};

		// Initialize with current scroll position
		currentScrollRef.current = window.scrollY;
		scrollTargetRef.current = window.scrollY;

		// Add wheel event listener with passive: false to allow preventDefault
		window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleWheel);
			if (rafIdRef.current) {
				cancelAnimationFrame(rafIdRef.current);
			}
		};
	}, [smoothness, enabled]);

	return { scrollTargetRef, currentScrollRef };
};
