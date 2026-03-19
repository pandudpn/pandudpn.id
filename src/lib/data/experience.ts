import type { Experience } from '$lib/types/experience';

export const experiences: Experience[] = [
	{
		id: 'hacktiv8',
		company: 'Hacktiv8 (Part-time)',
		role: 'Fullstack Instructor',
		period: { start: 'Feb 2025', end: 'Jun 2025' },
		location: 'Jakarta, Indonesia',
		description:
			'Instructed and mentored students in fullstack development, focusing on best practices and modern frameworks. Developed curriculum materials and hands-on projects.',
		highlights: [
			'Instructed and mentored students in fullstack development',
			'Developed comprehensive curriculum materials and hands-on projects',
			'Facilitated workshops and coding bootcamps'
		],
		techStack: ['Go', 'JavaScript']
	},
	{
		id: 'duitin',
		company: 'Duitin Indonesia (Freelance)',
		role: 'Technical Lead',
		period: { start: 'Dec 2024', end: 'Jun 2025' },
		location: 'Jakarta, Indonesia',
		description:
			'Led the design and implementation of systems for Duitin Contributor, Duitin Picker, Duitin B2B, and Tradisi. Coordinated cross-functional teams and implemented scalable architecture solutions.',
		highlights: [
			'Led design and implementation for Duitin Contributor, Picker, B2B, and Tradisi',
			'Implemented scalable architecture solutions',
			'Utilized Signoz for monitoring and performance optimization',
			'Spearheaded adoption of best practices in code quality and deployment'
		],
		techStack: ['Go', 'PostgreSQL', 'Redis', 'gRPC', 'Kubernetes', 'Signoz', 'EMQX']
	},
	{
		id: 'pintar-ventura',
		company: 'Pintar Ventura Group',
		role: 'Senior Backend Engineer',
		period: { start: 'Sept 2023', end: 'May 2025' },
		location: 'Jakarta, Indonesia',
		description:
			'Successfully refactored 45 microservices to improve code quality and system performance. Enhanced data security by implementing Digital Signature, OAuth, and Refresh Token mechanisms.',
		highlights: [
			'Refactored 45 microservices improving code quality and performance',
			'Implemented Digital Signature, OAuth, and Refresh Token security',
			'Designed Product Purchasing, Top-up, and User Registration with Kafka',
			'Integrated HashiCorp Vault for managing sensitive environment variables',
			'Integrated OpenSearch for centralized logging and monitoring'
		],
		techStack: [
			'Go',
			'PostgreSQL',
			'Redis',
			'Kafka',
			'gRPC',
			'Kubernetes',
			'Prometheus',
			'OpenSearch'
		]
	},
	{
		id: 'axiata',
		company: 'Axiata Digital Labs',
		role: 'Senior Software Engineer',
		period: { start: 'Dec 2021', end: 'Sept 2023' },
		location: 'Jakarta, Indonesia',
		description:
			'Led the development of backend solutions for a design system. Refactored existing codebases using design patterns, significantly increasing performance and scalability.',
		highlights: [
			'Led backend solutions development for design system',
			'Refactored codebases using design patterns for performance',
			'Conducted detailed code reviews enforcing best practices',
			'Integrated Prometheus and DataDog APM for monitoring'
		],
		techStack: ['Go', 'MongoDB', 'Redis', 'Solace', 'OpenSearch', 'DataDog', 'gRPC', 'Prometheus']
	},
	{
		id: 'sagara',
		company: 'PT Sagara Technology (Freelance)',
		role: 'Backend Engineer',
		period: { start: 'Jul 2021', end: 'Jun 2023' },
		location: 'Jakarta, Indonesia',
		description:
			'Developed comprehensive backend services for BRInvestYuk. Established standardized logging protocols and created GitLab CI pipelines for Kubernetes deployments on GCP.',
		highlights: [
			'Developed backend services for BRInvestYuk',
			'Established standardized logging with ELK stack',
			'Created GitLab CI pipelines for Kubernetes on GCP',
			'Enhanced e-commerce features and database architecture'
		],
		techStack: [
			'Go',
			'PostgreSQL',
			'Redis',
			'gRPC',
			'NSQ',
			'ELK',
			'Prometheus',
			'Jaeger',
			'Kubernetes'
		]
	},
	{
		id: 'ottencoffee',
		company: 'PT Otten Coffee Indonesia',
		role: 'Backend Developer',
		period: { start: 'Apr 2021', end: 'Jan 2022' },
		location: 'Bekasi, Indonesia',
		description:
			'Led the development of features for the ottencoffee.co.id platform. Integrated logistics services and developed scheduler features for automatic courier pickups.',
		highlights: [
			'Led feature development for ottencoffee.co.id platform',
			'Integrated SiCepat and GO-SEND logistics services',
			'Developed scheduler for automatic courier pickups'
		],
		techStack: ['Go', 'PHP', 'PostgreSQL', 'AWS Lambda', 'Docker', 'Redis', 'RabbitMQ']
	},
	{
		id: 'onesound',
		company: 'OneSound.id (Freelance)',
		role: 'Backend Developer',
		period: { start: 'Nov 2020', end: 'Jul 2021' },
		location: 'Jakarta, Indonesia',
		description:
			'Designed and implemented new features for the platform. Engineered a Kubernetes cluster on DigitalOcean using Terraform for scalable infrastructure.',
		highlights: [
			'Designed and implemented new platform features',
			'Engineered Kubernetes cluster on DigitalOcean with Terraform'
		],
		techStack: ['Go', 'PostgreSQL', 'Docker', 'Redis', 'NSQ']
	},
	{
		id: 'klikdigital',
		company: 'PT Klik Digital Sinergi',
		role: 'Backend Developer',
		period: { start: 'Jan 2020', end: 'Apr 2021' },
		location: 'Jakarta, Indonesia',
		description:
			'Led backend enhancements for AXISnet, focusing on efficient service restructuring and security by implementing OAuth2. Architected cloud infrastructure on AWS.',
		highlights: [
			'Led backend enhancements for AXISnet',
			'Implemented OAuth2 for security',
			'Architected AWS cloud infrastructure (VPC, EKS, auto-scaling)'
		],
		techStack: ['Go', 'MongoDB', 'Kubernetes', 'Redis', 'Solace', 'Terraform', 'ELK']
	},
	{
		id: 'derap',
		company: 'PT Derap Kreasi Persada',
		role: 'Backend Developer',
		period: { start: 'Jul 2019', end: 'Dec 2019' },
		location: 'Jakarta, Indonesia',
		description:
			'Developed payment features using E-Wallets like Go-Pay and OVO. Integrated with Bank BCA for money transfer functionalities.',
		highlights: [
			'Developed E-Wallet payment features (Go-Pay, OVO)',
			'Integrated Bank BCA for money transfers',
			'Created CMS for transaction and product management'
		],
		techStack: ['Go', 'PostgreSQL', 'Redis']
	},
	{
		id: 'integrated-synergy',
		company: 'PT Integrated Synergy System',
		role: 'Backend Developer',
		period: { start: 'May 2019', end: 'Jul 2019' },
		location: 'Jakarta, Indonesia',
		description:
			'Designed and developed a CMS for managing tournament brackets, teams, and player profiles. Integrated bracket systems with Challonge.',
		highlights: [
			'Designed CMS for tournament bracket management',
			'Integrated with Challonge for tournament management'
		],
		techStack: ['PHP', 'Laravel', 'MySQL', 'Redis']
	}
];
