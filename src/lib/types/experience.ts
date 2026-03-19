export interface Experience {
	id: string;
	company: string;
	role: string;
	period: { start: string; end: string | 'Present' };
	location: string;
	description: string;
	highlights: string[];
	metrics?: { label: string; value: string }[];
	techStack: string[];
	logo?: string;
}
