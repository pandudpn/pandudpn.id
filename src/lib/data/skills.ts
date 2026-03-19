import type { Skill, SkillCategory } from '$lib/types';

export const skills: Skill[] = [
	// Languages
	{
		id: 'go',
		name: 'Go',
		icon: 'Code2',
		category: 'language',
		proficiency: 95,
		years: 7,
		projectCount: 15,
		description: 'Primary language for microservices and backend systems'
	},
	{
		id: 'php',
		name: 'PHP',
		icon: 'FileCode',
		category: 'language',
		proficiency: 75,
		years: 3,
		projectCount: 5,
		description: 'Laravel-based web applications'
	},
	{
		id: 'nodejs',
		name: 'Node.js',
		icon: 'FileCode',
		category: 'language',
		proficiency: 78,
		years: 4,
		projectCount: 6,
		description: 'Server-side JavaScript and REST APIs'
	},
	{
		id: 'kotlin',
		name: 'Kotlin',
		icon: 'Smartphone',
		category: 'language',
		proficiency: 60,
		years: 2,
		projectCount: 3,
		description: 'Android development and JVM services'
	},
	{
		id: 'javascript',
		name: 'JavaScript/TypeScript',
		icon: 'FileCode',
		category: 'language',
		proficiency: 80,
		years: 4,
		projectCount: 8,
		description: 'Frontend and Node.js development'
	},

	// Frameworks
	{
		id: 'laravel',
		name: 'Laravel',
		icon: 'Globe',
		category: 'framework',
		proficiency: 75,
		years: 3,
		projectCount: 5,
		description: 'PHP web application framework'
	},
	{
		id: 'reactjs',
		name: 'React.js',
		icon: 'Globe',
		category: 'framework',
		proficiency: 70,
		years: 2,
		projectCount: 4,
		description: 'Component-based UI development'
	},

	// Databases
	{
		id: 'postgresql',
		name: 'PostgreSQL',
		icon: 'Database',
		category: 'database',
		proficiency: 92,
		years: 7,
		projectCount: 14,
		description: 'Primary relational database with advanced features'
	},
	{
		id: 'mysql',
		name: 'MySQL',
		icon: 'Database',
		category: 'database',
		proficiency: 80,
		years: 4,
		projectCount: 7,
		description: 'Relational database for web applications'
	},
	{
		id: 'mongodb',
		name: 'MongoDB',
		icon: 'Database',
		category: 'database',
		proficiency: 80,
		years: 4,
		projectCount: 6,
		description: 'Document store for flexible data models'
	},
	{
		id: 'elasticsearch',
		name: 'ElasticSearch',
		icon: 'Search',
		category: 'database',
		proficiency: 78,
		years: 3,
		projectCount: 5,
		description: 'Full-text search and analytics engine'
	},
	{
		id: 'opensearch',
		name: 'OpenSearch',
		icon: 'Search',
		category: 'database',
		proficiency: 78,
		years: 3,
		projectCount: 5,
		description: 'Open-source search and observability suite'
	},
	{
		id: 'redis',
		name: 'Redis',
		icon: 'Cpu',
		category: 'database',
		proficiency: 88,
		years: 6,
		projectCount: 12,
		description: 'Caching, sessions, and pub/sub messaging'
	},

	// Message Brokers
	{
		id: 'kafka',
		name: 'Kafka',
		icon: 'MessageSquare',
		category: 'broker',
		proficiency: 82,
		years: 3,
		projectCount: 5,
		description: 'Event streaming and message processing'
	},
	{
		id: 'rabbitmq',
		name: 'RabbitMQ',
		icon: 'MessageSquare',
		category: 'broker',
		proficiency: 78,
		years: 3,
		projectCount: 4,
		description: 'AMQP message broker for reliable queuing'
	},
	{
		id: 'nsq',
		name: 'NSQ',
		icon: 'Send',
		category: 'broker',
		proficiency: 75,
		years: 2,
		projectCount: 3,
		description: 'Lightweight real-time distributed messaging'
	},
	{
		id: 'mqtt',
		name: 'MQTT (EMQX)',
		icon: 'Wifi',
		category: 'broker',
		proficiency: 72,
		years: 2,
		projectCount: 2,
		description: 'IoT messaging protocol with EMQX broker'
	},
	{
		id: 'solace',
		name: 'Solace',
		icon: 'Radio',
		category: 'broker',
		proficiency: 75,
		years: 2,
		projectCount: 3,
		description: 'Enterprise event broker for real-time messaging'
	},

	// Cloud & Infrastructure
	{
		id: 'aws',
		name: 'AWS',
		icon: 'Cloud',
		category: 'cloud',
		proficiency: 85,
		years: 5,
		projectCount: 8,
		description: 'VPC, EKS, Lambda, S3, RDS, auto-scaling'
	},
	{
		id: 'gcp',
		name: 'GCP',
		icon: 'Cloud',
		category: 'cloud',
		proficiency: 75,
		years: 3,
		projectCount: 5,
		description: 'GKE, Cloud Run, Cloud SQL, Pub/Sub'
	},
	{
		id: 'azure',
		name: 'Azure',
		icon: 'Cloud',
		category: 'cloud',
		proficiency: 60,
		years: 1,
		projectCount: 2,
		description: 'AKS, Azure Functions, Cosmos DB'
	},
	{
		id: 'kubernetes',
		name: 'Kubernetes',
		icon: 'Container',
		category: 'cloud',
		proficiency: 82,
		years: 4,
		projectCount: 7,
		description: 'Container orchestration and service mesh'
	},
	{
		id: 'docker',
		name: 'Docker',
		icon: 'Container',
		category: 'cloud',
		proficiency: 92,
		years: 6,
		projectCount: 14,
		description: 'Containerization for all environments'
	},
	{
		id: 'terraform',
		name: 'Terraform',
		icon: 'Blocks',
		category: 'cloud',
		proficiency: 70,
		years: 2,
		projectCount: 4,
		description: 'Infrastructure as Code for cloud resources'
	},

	// Monitoring & Observability
	{
		id: 'prometheus',
		name: 'Prometheus',
		icon: 'BarChart2',
		category: 'monitoring',
		proficiency: 82,
		years: 3,
		projectCount: 6,
		description: 'Metrics collection and alerting'
	},
	{
		id: 'grafana',
		name: 'Grafana',
		icon: 'BarChart2',
		category: 'monitoring',
		proficiency: 80,
		years: 3,
		projectCount: 6,
		description: 'Metrics visualization and dashboards'
	},
	{
		id: 'opentelemetry',
		name: 'OpenTelemetry',
		icon: 'Activity',
		category: 'monitoring',
		proficiency: 75,
		years: 2,
		projectCount: 4,
		description: 'Distributed tracing and observability'
	},
	{
		id: 'datadog',
		name: 'DataDog',
		icon: 'Activity',
		category: 'monitoring',
		proficiency: 72,
		years: 2,
		projectCount: 3,
		description: 'APM and infrastructure monitoring'
	},
	{
		id: 'signoz',
		name: 'Signoz',
		icon: 'Activity',
		category: 'monitoring',
		proficiency: 70,
		years: 1,
		projectCount: 2,
		description: 'Open-source APM and observability'
	},
	{
		id: 'jaeger',
		name: 'Jaeger',
		icon: 'Activity',
		category: 'monitoring',
		proficiency: 70,
		years: 2,
		projectCount: 3,
		description: 'Distributed tracing system'
	},

	// CI/CD
	{
		id: 'gitlab-ci',
		name: 'GitLab CI',
		icon: 'GitBranch',
		category: 'cicd',
		proficiency: 88,
		years: 4,
		projectCount: 8,
		description: 'Pipelines for Kubernetes deployments'
	},
	{
		id: 'jenkins',
		name: 'Jenkins',
		icon: 'RefreshCw',
		category: 'cicd',
		proficiency: 75,
		years: 3,
		projectCount: 5,
		description: 'Automated build and deployment with Groovy'
	},
	{
		id: 'github-actions',
		name: 'GitHub Actions',
		icon: 'GitPullRequest',
		category: 'cicd',
		proficiency: 85,
		years: 3,
		projectCount: 8,
		description: 'Workflow automation and CI/CD pipelines'
	}
];

export const skillCategories: SkillCategory[] = [
	{
		id: 'language',
		label: 'Languages',
		skills: skills.filter((s) => s.category === 'language')
	},
	{
		id: 'framework',
		label: 'Frameworks',
		skills: skills.filter((s) => s.category === 'framework')
	},
	{
		id: 'database',
		label: 'Databases',
		skills: skills.filter((s) => s.category === 'database')
	},
	{
		id: 'broker',
		label: 'Message Brokers',
		skills: skills.filter((s) => s.category === 'broker')
	},
	{
		id: 'cloud',
		label: 'Cloud & Infrastructure',
		skills: skills.filter((s) => s.category === 'cloud')
	},
	{
		id: 'monitoring',
		label: 'Monitoring & Observability',
		skills: skills.filter((s) => s.category === 'monitoring')
	},
	{
		id: 'cicd',
		label: 'CI/CD',
		skills: skills.filter((s) => s.category === 'cicd')
	}
];
