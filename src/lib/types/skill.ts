export interface Skill {
	id: string;
	name: string;
	icon: string; // Lucide icon name
	category:
		| 'language'
		| 'framework'
		| 'backend'
		| 'database'
		| 'broker'
		| 'cloud'
		| 'devops'
		| 'monitoring'
		| 'cicd'
		| 'frontend'
		| 'other';
	proficiency: number; // 0-100
	years: number;
	projectCount?: number;
	description?: string;
}

export interface SkillCategory {
	id: string;
	label: string;
	skills: Skill[];
}
