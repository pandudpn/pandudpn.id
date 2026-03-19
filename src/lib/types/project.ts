export interface Project {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	role: string;
	techStack: string[];
	metrics?: { label: string; value: string }[];
	githubRepo?: string;
	liveUrl?: string;
	image?: string;
	featured: boolean;
	category:
		| 'fintech'
		| 'telecom'
		| 'envtech'
		| 'erp'
		| 'ecommerce'
		| 'banking'
		| 'healthcare'
		| 'enterprise'
		| 'iot'
		| 'oss'
		| 'web'
		| 'coffee';
	metricsText?: string;
	period: string;
	isEnterprise: boolean;
	isConfidential: boolean;
}
