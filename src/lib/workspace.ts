// The workspace shown in the editor. Every fact comes from Pandu's CV and portfolio (October 2026).

export const FILES: Record<string, string> = {
  'README.md': `# Pandu Dwi Putra Nugroho

Technical lead in Jakarta. I build Go backends and keep them fast in production on Kubernetes.

Seven years across telco, payments and waste management. I ran AXISnet's backend for 14M monthly users at under 200 ms, built event-driven payment services for Klikoo at Pintar Ventura, and designed the backends for four waste-management apps at Duitin. I'm strongest at taking a system from design to Kubernetes production and keeping it fast once it's there.

## Selected work

- [AXISnet](projects/axisnet.md): telco self-care at 14M monthly users, 99% uptime, responses under 200 ms.
- [Klikoo](projects/klikoo.md): payments on 86 services, from 2 to 10 second responses down to under 1 second.
- [Duitin](projects/duitin.md): backends for four waste-management apps on 18 services.

Earlier projects: [Gagas](projects/gagas.md), [Bernofarm](projects/bernofarm.md), [Nusarasa](projects/nusarasa.md), [BRInvestYuk](projects/brinvestyuk.md), [Otten Coffee](projects/ottencoffee.md), [OneSound](projects/onesound.md) and [Derap](projects/derap.md).

## What I work with

Go, PostgreSQL, MongoDB, Redis, Kafka, gRPC, Kubernetes and Terraform. Every role is in [experience.ts](experience.ts) and the full list of tools is in [skills.json](skills.json).

## Contact

- Email: [pandu@pandudpn.id](mailto:pandu@pandudpn.id)
- WhatsApp: [+62 821 2227 4139](https://wa.me/6282122274139)
- LinkedIn: [linkedin.com/in/pandudpn](https://www.linkedin.com/in/pandudpn)
- GitHub: [github.com/pandudpn](https://github.com/pandudpn)

Based in Jakarta, Indonesia. I work in Indonesian and English.
`,

  'experience.ts': `// Roles, newest first. Each path in writeups opens the longer story in projects/.

type Role = {
  company: string;
  title: string;
  period: [start: string, end: string];
  summary: string;
  work: string[];
  stack: string[];
  writeups?: string[];
};

export const experience: Role[] = [
  {
    company: 'Duitin Indonesia',
    title: 'Technical lead (freelance)',
    period: ['Dec 2024', 'Jun 2025'],
    summary: 'Waste management platform connecting households, waste pickers and businesses across 4 apps and 18 microservices.',
    work: [
      'Designed and shipped the backends for 4 products (Contributor, Picker, B2B, Tradisi), each deployed and scaled on its own.',
      'Cut incident detection to under a minute by setting up SigNoz tracing and alerting across services.',
      'Introduced gRPC for service-to-service calls, giving services typed contracts.',
      "Set the team's review gates, test coverage thresholds and CI checks.",
    ],
    stack: ['Go', 'PostgreSQL', 'Redis', 'gRPC', 'Kubernetes', 'EMQX', 'SigNoz'],
    writeups: ['projects/duitin.md'],
  },
  {
    company: 'Hacktiv8',
    title: 'Fullstack instructor (part-time)',
    period: ['Feb 2025', 'Jun 2025'],
    summary: 'Fullstack development bootcamp that trains career-switchers to become professional developers.',
    work: [
      'Taught fullstack bootcamp cohorts in Go and JavaScript, with graduates landing their first engineering jobs.',
      'Designed a project-based curriculum modeled on real production workflows.',
    ],
    stack: ['Go', 'JavaScript'],
  },
  {
    company: 'Pintar Ventura Group',
    title: 'Senior backend engineer',
    period: ['Sep 2023', 'May 2025'],
    summary: 'Klikoo, a digital payment platform for MSMEs: bill payments, mobile top-ups, electricity tokens and e-wallet top-ups, through a mobile app and a B2B OpenAPI. 86 microservices.',
    work: [
      'Built and maintained the core user, product and payment services on an event-driven architecture with Kafka, keeping purchases, top-ups and registration consistent across services.',
      'Built and maintained the backends for the Klikoo app and the Klikoo B2B OpenAPI.',
      'Led the refactor of 45 microservices, cutting response times from 2 to 10 seconds to under 1 second and raising throughput from 3 concurrent transactions to 10+ per second.',
      'Added digital signature checks, OAuth 2.0 and refresh token rotation to every user-facing API, and moved secrets into HashiCorp Vault.',
      'Kept the platform at 99.9% uptime, backed by centralized logging in OpenSearch and distributed tracing with OpenTelemetry.',
    ],
    stack: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'Kubernetes', 'Vault', 'OpenSearch', 'OpenTelemetry'],
    writeups: ['projects/klikoo.md'],
  },
  {
    company: 'Axiata Digital Labs',
    title: 'Senior software engineer',
    period: ['Dec 2021', 'Sep 2023'],
    summary: 'AXISnet, the self-care app for AXIS subscribers: 14M monthly and about 4M daily active users.',
    work: [
      'Kept AXISnet backend services at 99% uptime and under 200 ms response time, with Prometheus metrics and DataDog APM tracing to catch latency and error spikes.',
      'Improved response times by 50% through caching on hot read paths, and load-tested the platform to 300 transactions per second.',
      "Built the package and credit purchase flows, from checkout through payment to activation, integrated with XL Axiata's telco core over Solace.",
      'Built promo, loyalty and rewards services (bonus quota, points, campaign rules) and owned login, OTP and subscriber profile services.',
      'Owned the backend for the in-app content system, with APIs reused by several product teams.',
    ],
    stack: ['Go', 'MongoDB', 'Redis', 'Solace', 'gRPC', 'Prometheus', 'DataDog'],
    writeups: ['projects/axisnet.md'],
  },
  {
    company: 'PT Sagara Technology',
    title: 'Backend engineer (freelance)',
    period: ['Jul 2021', 'Jun 2023'],
    summary: "Software house building products for clients: BRInvestYuk (Bank BRI's investment and deposit app), Gagas ERP & POS for MSMEs, and pharmacy and food e-commerce platforms.",
    work: [
      'Led the backend and DevOps for Gagas ERP & POS: a modular monolith for sales, inventory and purchasing, on Kubernetes with Terraform and GitLab CI.',
      "Built backend services for BRInvestYuk, BRI's investment app: portfolios, transactions and live market data, shipped as an MVP within one month.",
      'Set up GitLab CI with staged rollouts to GKE, which removed manual deploys.',
    ],
    stack: ['Go', 'PostgreSQL', 'Redis', 'gRPC', 'NSQ', 'Kubernetes', 'ELK', 'Prometheus', 'Jaeger'],
    writeups: [
      'projects/gagas.md',
      'projects/bernofarm.md',
      'projects/nusarasa.md',
      'projects/brinvestyuk.md',
    ],
  },
  {
    company: 'PT Otten Coffee Indonesia',
    title: 'Backend developer',
    period: ['Apr 2021', 'Jan 2022'],
    summary: 'E-commerce platform for coffee beans, equipment and supplies, with integrated courier delivery.',
    work: [
      'Built e-commerce features for ottencoffee.co.id, including multi-courier shipping (SiCepat, GO-SEND) at checkout.',
      'Implemented product search with Algolia, giving shoppers instant, typo-tolerant results across the catalog.',
      'Automated courier pickup scheduling with RabbitMQ, replacing manual dispatch.',
    ],
    stack: ['Go', 'PHP', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Algolia', 'AWS Lambda'],
    writeups: ['projects/ottencoffee.md'],
  },
  {
    company: 'OneSound.id',
    title: 'Backend developer (freelance)',
    period: ['Nov 2020', 'Jul 2021'],
    summary: 'Music and audio streaming platform.',
    work: [
      'Shipped features for the music platform and provisioned its Kubernetes cluster on DigitalOcean with Terraform.',
    ],
    stack: ['Go', 'PostgreSQL', 'Redis', 'NSQ', 'Terraform'],
    writeups: ['projects/onesound.md'],
  },
  {
    company: 'PT Klik Digital Sinergi',
    title: 'Backend developer',
    period: ['Jan 2020', 'Apr 2021'],
    summary: 'Built the AXISnet backend as a vendor for AXIS (XL Axiata), before joining Axiata Digital Labs.',
    work: [
      "Split AXISnet's monolithic endpoints into modular services secured with OAuth2.",
      'Provisioned the AWS infrastructure (VPC, EKS, autoscaling) with Terraform.',
    ],
    stack: ['Go', 'MongoDB', 'Redis', 'Solace', 'Kubernetes', 'Terraform'],
    writeups: ['projects/axisnet.md'],
  },
  {
    company: 'PT Derap Kreasi Persada',
    title: 'Backend developer',
    period: ['Jul 2019', 'Dec 2019'],
    summary: 'Payment and transaction management system integrated with e-wallets and bank transfers.',
    work: [
      'Integrated GoPay, OVO and BCA transfer payments, and built a back-office CMS for transaction monitoring.',
    ],
    stack: ['Go', 'PostgreSQL', 'Redis'],
    writeups: ['projects/derap.md'],
  },
  {
    company: 'PT Integrated Synergy System',
    title: 'Backend developer',
    period: ['May 2019', 'Jul 2019'],
    summary: 'Tournament management system for esports competitions.',
    work: [
      'Built an esports tournament CMS with bracket generation and Challonge API sync.',
    ],
    stack: ['PHP', 'Laravel', 'MySQL'],
  },
];

export const education = {
  school: 'Universitas Budi Luhur',
  degree: 'B.S. Information Systems',
  period: ['2015', '2019'],
  gpa: '3.38 / 4.0',
};
`,

  'skills.json': `{
  "languages": ["Go", "TypeScript", "JavaScript", "Dart", "PHP", "Python", "Kotlin"],
  "frameworks": ["Node.js", "NestJS", "Next.js", "React", "Flutter", "Laravel"],
  "architecture": ["Microservices", "Event-driven systems", "REST", "gRPC", "Change data capture (CDC)"],
  "data": ["PostgreSQL", "MongoDB", "ClickHouse", "MySQL", "Redis", "OpenSearch", "Elasticsearch", "Algolia", "PeerDB"],
  "messaging": ["Kafka", "Redpanda", "MQTT (EMQX)", "Solace", "RabbitMQ", "NSQ"],
  "infraAndCloud": ["Kubernetes (EKS, GKE, AKS, k3s, kubeadm)", "Docker", "Terraform", "ArgoCD", "AWS", "GCP", "Azure", "DigitalOcean"],
  "security": ["OAuth 2.0", "Digital signatures", "Refresh token rotation", "OTP / PIN auth", "PII masking", "HashiCorp Vault", "OpenBao", "External Secrets", "Gitleaks"],
  "observability": ["Prometheus", "Grafana", "Loki", "Tempo", "OpenTelemetry", "DataDog", "SigNoz", "ELK"],
  "ciCdAndTesting": ["GitHub Actions", "GitLab CI", "Jenkins", "fastlane", "pytest", "Appium", "Locust"],
  "spoken": ["Indonesian (native)", "English (professional)"]
}
`,

  'projects/axisnet.md': `# AXISnet

Ran the backend for AXIS's self-care app at 14M monthly users, with 99% uptime and responses under 200 ms.

## Roles

- Senior software engineer and backend team lead, Axiata Digital Labs, Dec 2021 to Sep 2023
- Backend developer, PT Klik Digital Sinergi (vendor for AXIS), Jan 2020 to Apr 2021

## Context

AXISnet is the self-care app for AXIS (XL Axiata) subscribers: check quota, buy and customize data packages, redeem promos, play games for bonuses, and earn points in the Alifetime loyalty program. It serves 14M monthly and about 4M daily active users, with 150 to 200 transactions per second in production. I worked on it for three and a half years across two companies.

## What I did

- At Klik Digital, the vendor: split monolithic endpoints into modular services secured with OAuth2, and provisioned the AWS infrastructure (VPC, EKS, autoscaling) with Terraform.
- At Axiata: led the backend team on a 25-service platform running Go, MongoDB, Redis and Solace on Kubernetes with blue-green deploys.
- Built the package and credit purchase flows, from checkout through payment to activation in XL Axiata's telco core over Solace.
- Built the promo, loyalty and rewards services, and owned login, OTP and subscriber profiles.
- Reworked caching on the hot read paths and added Prometheus metrics and DataDog APM tracing to catch latency and error spikes.
- Ran code reviews with design and complexity checks, and held weekly 1:1s with every backend engineer.

## Results

- Response times improved by 50% and held under 200 ms.
- 99% uptime at 14M monthly users.
- Load tests confirmed 300 transactions per second, about 1.5 times the production peak.

## Stack

Go, MongoDB, Redis, Solace, gRPC, Kubernetes, Prometheus, DataDog, ELK
`,

  'projects/klikoo.md': `# Klikoo

Took a payment platform from 3 concurrent transactions to 10+ per second, and from 2 to 10 second responses to under 1 second.

## Role

- Senior backend engineer, Pintar Ventura Group, Sep 2023 to May 2025

## Context

Klikoo is a digital payment platform for MSMEs: bill payments, mobile top-ups, electricity tokens and e-wallet top-ups, through a mobile app and a B2B OpenAPI for partners. The backend is 86 Go services communicating over gRPC and Kafka.

## Problems

- Each payment provider had its own request and response format, so every new provider meant custom code across several services.
- The system couldn't process more than 3 transactions at the same time.
- Many services took 2 to 10 seconds to respond.

## What I did

- Built and maintained the core user, product and payment services on an event-driven design with Kafka, so purchases, top-ups and registration stay consistent across services and process concurrently.
- Defined one internal request and response format for all providers, so adding a provider no longer touches the services that call it.
- Led the refactor of 45 microservices.
- Added digital signature checks with a 15-minute timestamp window, OAuth 2.0 and refresh token rotation to every user-facing API, and moved secrets into HashiCorp Vault.
- Set up centralized logging in OpenSearch and distributed tracing with OpenTelemetry.

## Results

- Response times went from 2 to 10 seconds down to under 1 second.
- Throughput went from 3 concurrent transactions to more than 10 transactions per second.
- 99.9% uptime.

## Stack

Go, PostgreSQL, Redis, Kafka, gRPC, Kubernetes, Vault, OpenSearch, OpenTelemetry
`,

  'projects/duitin.md': `# Duitin

Designed and shipped the backends for four waste-management apps on 18 services.

## Role

- Technical lead (freelance), Duitin Indonesia, Dec 2024 to Jun 2025

## Context

Duitin connects households, waste pickers, businesses and waste banks. I designed and shipped the backends for four products (Contributor, Picker, B2B and Tradisi) on 18 services.

## What I did

- Designed an event-driven service layout using gRPC between services, RabbitMQ for async work, and MQTT for live picker location and messaging.
- Used the Saga pattern to keep pickups, payments and balances consistent across services.
- Added role-based access control and digital signatures on every REST API.
- Set up SigNoz tracing and alerting, which brought incident detection under a minute.
- Set the team's review gates, test coverage thresholds and CI checks.

## Stack

Go, Laravel, Flutter, PostgreSQL, Redis, gRPC, RabbitMQ, MQTT (EMQX), SigNoz, Kubernetes
`,

  'projects/gagas.md': `# Gagas

ERP and POS for MSMEs.

## Role

- Technical lead, backend and DevOps, PT Sagara Technology, Dec 2022 to Jun 2023

## Context

Gagas is a web ERP and POS for small businesses: sales, inventory, purchasing and reporting in one system, used from several POS terminals at once.

## What I did

- Designed a modular monolith with one module per business domain and clear API contracts between them, so new modules can be added without touching existing ones.
- Kept stock consistent across POS terminals with database transactions and Redis caching for real-time updates.
- Built and ran the infrastructure: Kubernetes provisioned with Terraform, deployed through GitLab CI.
- Wrote the documentation and onboarding material for business users.

## Result

Fewer stock discrepancies and more accurate transactions after the real-time stock updates went live.

## Stack

Go, Next.js (TypeScript), PostgreSQL, Redis, Docker, Kubernetes, Terraform, GitLab CI
`,

  'projects/bernofarm.md': `# Bernofarm

Pharmacy e-commerce.

## Role

- Full-stack engineer, PT Sagara Technology, Jun 2022 to Dec 2022

## Context

Bernofarm sells generic and prescription medicines online and delivers them through Go-Send and Grab Express.

## What I did

- Built both the backend and the frontend on my own: a modular Go monolith (auth, users, products, transactions) and a Next.js app with Redux.
- Split the scope into modules and shipped the core buying flow first as an MVP.

## Result

The MVP shipped on the planned timeline.

## Stack

Go, Next.js (TypeScript), Redux, PostgreSQL, Redis
`,

  'projects/nusarasa.md': `# Nusarasa

Traditional dessert e-commerce.

## Role

- Technical lead and backend engineer, PT Sagara Technology, Aug 2021 to Jun 2022

## Context

Nusarasa (Agrinesia) sells traditional Indonesian cakes and desserts such as bolu and lapis Bogor, with home delivery or in-store pickup.

## What I did

- Led the backend and built it as a modular monolith (auth, users, products, transactions).
- Built nearest-store selection from the user's location, so every order is fulfilled by the closest outlet.
- Ran it on Kubernetes on AWS.

## Stack

Go, PostgreSQL, Redis, Docker, Kubernetes, AWS
`,

  'projects/brinvestyuk.md': `# BRInvestYuk

Bank BRI investment app.

## Role

- Backend engineer, PT Sagara Technology, Jul 2021 to Aug 2021

## Context

BRInvestYuk is Bank BRI's Android and iOS app for deposits and stock investments. The backend had a one-month deadline.

## What I did

- Built the backend as a modular monolith covering authentication, user management, investment products, transactions and reporting.
- Cut the scope to the high-priority features so the MVP could ship within the month.

## Result

The MVP shipped within the one-month deadline.

## Stack

Go, PostgreSQL, Redis, gRPC, Docker, AWS
`,

  'projects/ottencoffee.md': `# Otten Coffee

Coffee e-commerce.

## Role

- Backend developer, PT Otten Coffee Indonesia, Apr 2021 to Jan 2022

## Context

Otten Coffee sells coffee machines, beans and supplies through its website and mobile apps. The backend was a PHP modular monolith alongside newer Go microservices, talking over gRPC or RabbitMQ.

## What I did

- Integrated SiCepat, GO-SEND and Grab Express into one shipping layer at checkout, ahead of the original timeline.
- Automated courier pickup scheduling with RabbitMQ, replacing manual dispatch.
- Implemented product search with Algolia for instant, typo-tolerant results.

## Stack

Go, PHP, PostgreSQL, Redis, RabbitMQ, gRPC, Algolia, AWS Lambda
`,

  'projects/onesound.md': `# OneSound

Music platform.

## Role

- Backend developer (freelance), OneSound.id, Nov 2020 to Jul 2021

## Context

OneSound is a music and audio streaming platform.

## What I did

- Designed and built new platform features.
- Provisioned the production Kubernetes cluster on DigitalOcean with Terraform, so the infrastructure can be rebuilt from code.

## Stack

Go, PostgreSQL, Redis, NSQ, Terraform, Kubernetes
`,

  'projects/derap.md': `# Derap

Payments and back office.

## Role

- Backend developer, PT Derap Kreasi Persada, Jul 2019 to Dec 2019

## Context

A payment and transaction management system for digital purchases.

## What I did

- Integrated GoPay and OVO e-wallets and BCA bank transfers.
- Built a back-office CMS for real-time transaction monitoring and product catalog management.

## Stack

Go, PostgreSQL, Redis
`,

  'NOTICE.md': `# Notice

This site is styled after Visual Studio Code. It is not affiliated with Microsoft.

- Icons: [Codicons](https://github.com/microsoft/vscode-codicons) by Microsoft, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Editor font: [Cascadia Code](https://github.com/microsoft/cascadia-code) by Microsoft, [SIL Open Font License 1.1](https://openfontlicense.org).
- Color themes follow Dark Modern and Light Modern from VS Code, [Catppuccin](https://catppuccin.com), [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme), [Dracula](https://draculatheme.com), [One Dark Pro](https://github.com/Binaryify/OneDark-Pro), [Nord](https://www.nordtheme.com), [GitHub](https://github.com/primer/github-vscode-theme) and [Gruvbox](https://github.com/morhetz/gruvbox). Some text colors are lightened or darkened so each one reaches a 4.5:1 contrast ratio.
`,
};

// The career as a commit graph, newest first. Each entry points at a line in experience.ts.
export const GRAPH: { msg: string; when: string; find: string }[] = [
  { msg: 'Teach Go and JavaScript at Hacktiv8', when: 'Feb 2025', find: "company: 'Hacktiv8'" },
  { msg: "Lead the backends for Duitin's four apps", when: 'Dec 2024', find: "company: 'Duitin Indonesia'" },
  { msg: 'Join Pintar Ventura to work on Klikoo payments', when: 'Sep 2023', find: "company: 'Pintar Ventura Group'" },
  { msg: 'Lead the AXISnet backend team at Axiata Digital Labs', when: 'Dec 2021', find: "company: 'Axiata Digital Labs'" },
  { msg: 'Build client products at Sagara Technology', when: 'Jul 2021', find: "company: 'PT Sagara Technology'" },
  { msg: 'Ship couriers and search at Otten Coffee', when: 'Apr 2021', find: "company: 'PT Otten Coffee Indonesia'" },
  { msg: 'Build streaming features for OneSound', when: 'Nov 2020', find: "company: 'OneSound.id'" },
  { msg: 'Build the AXISnet backend as a vendor at Klik Digital', when: 'Jan 2020', find: "company: 'PT Klik Digital Sinergi'" },
  { msg: 'Integrate e-wallet payments at Derap', when: 'Jul 2019', find: "company: 'PT Derap Kreasi Persada'" },
  { msg: 'Build an esports tournament CMS at Integrated Synergy System', when: 'May 2019', find: "company: 'PT Integrated Synergy System'" },
  { msg: 'Study Information Systems at Universitas Budi Luhur', when: '2015 to 2019', find: "school: 'Universitas Budi Luhur'" },
];
