let currentSection = $state('hero');
let sections = $state<string[]>([]);

export function getActiveSection() {
	return {
		get current() {
			return currentSection;
		},
		set current(value: string) {
			currentSection = value;
		},
		get sections() {
			return sections;
		},
		register(id: string) {
			if (!sections.includes(id)) sections = [...sections, id];
		}
	};
}
