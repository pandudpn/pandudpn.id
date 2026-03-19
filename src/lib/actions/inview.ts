import type { Action } from 'svelte/action';

interface InViewParams {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

interface InViewAttributes {
	oninview?: (event: CustomEvent) => void;
	onoutview?: (event: CustomEvent) => void;
}

export const inview: Action<HTMLElement, InViewParams, InViewAttributes> = (node, params = {}) => {
	const { threshold = 0.3, rootMargin = '0px', once = true } = params;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.dispatchEvent(new CustomEvent('inview'));
				node.classList.add('is-inview');
				if (once) observer.unobserve(node);
			} else if (!once) {
				node.dispatchEvent(new CustomEvent('outview'));
				node.classList.remove('is-inview');
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
};
