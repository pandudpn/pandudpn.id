import type { Action } from 'svelte/action';

interface ParallaxParams {
	speed?: number;
}

export const parallax: Action<HTMLElement, ParallaxParams> = (node, params = {}) => {
	const { speed = 0.5 } = params;

	const handleScroll = () => {
		const rect = node.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const visible = rect.top < windowHeight && rect.bottom > 0;

		if (visible) {
			const offset = (rect.top - windowHeight / 2) * speed;
			node.style.transform = `translateY(${offset}px)`;
		}
	};

	window.addEventListener('scroll', handleScroll, { passive: true });
	handleScroll();

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
		}
	};
};
