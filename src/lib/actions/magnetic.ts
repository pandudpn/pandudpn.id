import type { Action } from 'svelte/action';

interface MagneticParams {
	strength?: number;
	radius?: number;
}

export const magnetic: Action<HTMLElement, MagneticParams> = (node, params = {}) => {
	const { strength = 0.3, radius = 150 } = params;

	const handleMouseMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const distX = e.clientX - centerX;
		const distY = e.clientY - centerY;
		const dist = Math.sqrt(distX * distX + distY * distY);

		if (dist < radius) {
			const pull = (1 - dist / radius) * strength;
			node.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
			node.style.transition = 'transform 0.15s ease-out';
		} else {
			node.style.transform = 'translate(0, 0)';
			node.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
		}
	};

	const handleMouseLeave = () => {
		node.style.transform = 'translate(0, 0)';
		node.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
	};

	window.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			window.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
};
