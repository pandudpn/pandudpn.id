import type { Project } from '$lib/types';

export const projects: Project[] = [
	// ── FEATURED (3) ────────────────────────────────────────────────────────────
	{
		id: 'klikoo',
		title: 'Klikoo App & B2B',
		subtitle: 'Financial Technology',
		description:
			'Led backend engineering for Klikoo, a fintech super-app handling millions of monthly transactions. Designed high-performance payment orchestration, multi-tenant B2B integrations, and real-time fraud detection pipelines. Delivered 60% faster API response times through query optimization and caching strategies.',
		role: 'Senior Backend Engineer',
		techStack: ['Go', 'PostgreSQL', 'Kafka', 'Redis', 'gRPC', 'Kubernetes'],
		metricsText: '60% faster response, 7M+ transactions per month',
		metrics: [
			{ label: 'Response Improvement', value: '60% faster' },
			{ label: 'Transactions', value: '7M+/month' }
		],
		featured: true,
		category: 'fintech',
		period: '2023 — 2025',
		isEnterprise: true,
		isConfidential: true
	},
	{
		id: 'axisnet',
		title: 'AXISnet (AXIS Telecom)',
		subtitle: 'Telecommunications',
		description:
			"Led backend enhancements for AXISnet, one of Indonesia's top telecom super-apps. Restructured microservice architecture for OAuth2 security, built cloud infrastructure on AWS with VPC, EKS, and auto-scaling groups. Reduced deployment lead time by 40% with GitOps and Terraform.",
		role: 'Lead Backend Engineer',
		techStack: ['Go', 'MongoDB', 'Kubernetes', 'Redis', 'Solace', 'Terraform', 'ELK'],
		metricsText: '40% faster deployments, AWS EKS multi-region',
		metrics: [
			{ label: 'Deployment Speed', value: '40% faster' },
			{ label: 'Cloud', value: 'AWS EKS' }
		],
		featured: true,
		category: 'telecom',
		period: '2020 — 2023',
		isEnterprise: true,
		isConfidential: true
	},
	{
		id: 'duitin',
		title: 'Duitin Ecosystem',
		subtitle: 'Environmental Tech',
		description:
			"Technical Lead for Duitin — Indonesia's largest waste-to-cash ecosystem. Architected 4 interconnected apps: Contributor, Picker, B2B portal, and Tradisi marketplace. Implemented IoT-integrated waste tracking, real-time reward distribution, and ESG reporting pipelines.",
		role: 'Technical Lead',
		techStack: ['Go', 'PostgreSQL', 'Redis', 'gRPC', 'Kubernetes', 'Signoz', 'EMQX'],
		metricsText: '4 integrated apps, real-time IoT waste tracking',
		metrics: [
			{ label: 'Apps Delivered', value: '4 products' },
			{ label: 'IoT', value: 'Real-time' }
		],
		featured: true,
		category: 'envtech',
		period: '2024 — 2025',
		isEnterprise: false,
		isConfidential: false
	},

	// ── ALL PROJECTS (6) ─────────────────────────────────────────────────────────
	{
		id: 'gagas-erp',
		title: 'Gagas ERP & POS',
		subtitle: 'Enterprise Software',
		description:
			'Built a full-featured ERP and point-of-sale system for Gagas, covering inventory, procurement, HR, and multi-outlet reporting. Delivered real-time sales dashboards and offline-capable POS terminals for retail chains.',
		role: 'Full-Stack Engineer',
		techStack: ['Go', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker'],
		metricsText: 'Multi-outlet POS, real-time inventory sync',
		metrics: [{ label: 'Scale', value: 'Multi-outlet' }],
		featured: false,
		category: 'erp',
		period: '2022 — 2023',
		isEnterprise: true,
		isConfidential: true
	},
	{
		id: 'bernofarm',
		title: 'Bernofarm Pharmacy',
		subtitle: 'Healthcare',
		description:
			"Developed a pharmacy management platform for Bernofarm, one of Indonesia's leading pharmaceutical companies. Integrated drug database APIs, prescription workflow automation, and regulatory compliance reporting for BPOM standards.",
		role: 'Full-Stack Engineer',
		techStack: ['Go', 'React', 'PostgreSQL', 'Redis', 'Docker'],
		metricsText: 'BPOM-compliant, prescription automation',
		metrics: [{ label: 'Compliance', value: 'BPOM certified' }],
		featured: false,
		category: 'healthcare',
		period: '2022',
		isEnterprise: true,
		isConfidential: true
	},
	{
		id: 'agrinesia',
		title: 'Agrinesia (Nusarasa)',
		subtitle: 'E-Commerce',
		description:
			"Built the backend for Agrinesia's Nusarasa e-commerce platform, focusing on agricultural produce and traditional Indonesian food products. Implemented logistics integrations, vendor onboarding workflows, and real-time order tracking.",
		role: 'Full-Stack Engineer',
		techStack: ['Go', 'PHP', 'PostgreSQL', 'Redis', 'RabbitMQ'],
		metricsText: 'Multi-vendor marketplace, 3P logistics integrations',
		metrics: [{ label: 'Vendors', value: 'Multi-vendor' }],
		featured: false,
		category: 'ecommerce',
		period: '2021 — 2022',
		isEnterprise: false,
		isConfidential: false,
		liveUrl: 'https://nusarasa.id'
	},
	{
		id: 'brinvestyuk',
		title: 'BRInvestYuk (Bank BRI)',
		subtitle: 'Financial Services',
		description:
			'Developed comprehensive backend services for BRInvestYuk, a digital investment platform by Bank BRI. Built standardized observability with ELK stack, GitLab CI pipelines, and Kubernetes deployments on GCP.',
		role: 'Backend Engineer',
		techStack: ['Go', 'PostgreSQL', 'Redis', 'gRPC', 'NSQ', 'ELK', 'Kubernetes'],
		metricsText: 'BRI investment platform, GCP Kubernetes',
		metrics: [{ label: 'Cloud', value: 'GCP' }],
		featured: false,
		category: 'banking',
		period: '2021',
		isEnterprise: true,
		isConfidential: true
	},
	{
		id: 'ottencoffee',
		title: 'Ottencoffee',
		subtitle: 'E-Commerce',
		description:
			'Led development of ottencoffee.co.id platform features. Integrated SiCepat and GO-SEND logistics APIs, built automated courier pickup scheduling, and delivered performance improvements for the product catalog and checkout flows.',
		role: 'Backend Engineer',
		techStack: ['Go', 'PHP', 'PostgreSQL', 'AWS Lambda', 'Docker', 'Redis', 'RabbitMQ'],
		metricsText: 'Logistics automation, SiCepat & GO-SEND integrated',
		metrics: [{ label: 'Integrations', value: '2 logistics' }],
		featured: false,
		category: 'coffee',
		period: '2021 — 2022',
		isEnterprise: false,
		isConfidential: false,
		liveUrl: 'https://ottencoffee.co.id'
	},
	{
		id: 'personal-portfolio',
		title: 'Personal Portfolio & Blog',
		subtitle: 'Web Development',
		description:
			'My personal portfolio website built with SvelteKit 2, Svelte 5 Runes, and shadcn-svelte. Features Terminal Noir design aesthetic, smooth scroll animations, dark/light theme, real-time GitHub integration, and Supabase visitor tracking.',
		role: 'Full-Stack Engineer',
		techStack: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Tailwind CSS', 'shadcn-svelte', 'Vercel'],
		githubRepo: 'pandudpn/pandudpn.id',
		liveUrl: 'https://pandudpn.id',
		metricsText: 'SvelteKit 2, Svelte 5 Runes, open source',
		metrics: [{ label: 'Stack', value: 'SvelteKit 2' }],
		featured: false,
		category: 'web',
		period: '2024 — Present',
		isEnterprise: false,
		isConfidential: false
	}
];
