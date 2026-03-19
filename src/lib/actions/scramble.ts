import type { Action } from 'svelte/action';

interface ScrambleParams {
	text: string;
	speed?: number;
	charset?: string;
	delay?: number;
}

export const scramble: Action<HTMLElement, ScrambleParams> = (node, params) => {
	const {
		text = '',
		speed = 50,
		charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
		delay = 0
	} = params || {};

	let frame: number;
	let iteration = 0;

	const scrambleText = () => {
		node.textContent = text
			.split('')
			.map((char, index) => {
				if (index < iteration) return text[index];
				if (char === ' ') return ' ';
				return charset[Math.floor(Math.random() * charset.length)];
			})
			.join('');

		if (iteration < text.length) {
			iteration += 1 / 3;
			frame = requestAnimationFrame(() => setTimeout(scrambleText, speed));
		}
	};

	const timer = setTimeout(() => {
		iteration = 0;
		scrambleText();
	}, delay);

	return {
		destroy() {
			clearTimeout(timer);
			cancelAnimationFrame(frame);
		},
		update(newParams) {
			if (newParams?.text && newParams.text !== text) {
				iteration = 0;
				scrambleText();
			}
		}
	};
};
