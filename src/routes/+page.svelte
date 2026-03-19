<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import TechStack from '$lib/components/sections/TechStack.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Pandu Dwi Putra Nugroho',
		jobTitle: 'Backend Engineer',
		url: 'https://pandudpn.id',
		email: 'pandu@pandudpn.id',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Jakarta',
			addressCountry: 'ID'
		},
		sameAs: ['https://github.com/pandudpn', 'https://www.linkedin.com/in/pandudpn']
	});
</script>

<svelte:head>
	<title>Pandu Dwi Putra Nugroho — Backend Engineer</title>
	<meta
		name="description"
		content="Backend Engineer with 8+ years experience. Specialized in Go, Microservices, and Cloud Architecture. Built 100+ microservices serving 5M+ users."
	/>
	<meta
		name="keywords"
		content="Backend Engineer, Go, Golang, Microservices, Cloud, Jakarta, Indonesia"
	/>
	<meta name="author" content="Pandu Dwi Putra Nugroho" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://pandudpn.id" />
	<meta property="og:title" content="Pandu Dwi Putra Nugroho — Backend Engineer" />
	<meta
		property="og:description"
		content="Building scalable systems with Go, Microservices, and Cloud Architecture. 8+ years, 100+ microservices, 5M+ users."
	/>
	<meta property="og:image" content="https://pandudpn.id/og-image.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Pandu Dwi Putra Nugroho — Backend Engineer" />
	<meta
		name="twitter:description"
		content="Building scalable systems with Go, Microservices, and Cloud Architecture."
	/>

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<Navigation />
<main id="main-content">
	<Hero />
	<About />
	<TechStack />
	<Experience />
	<Projects />
	<Contact />
</main>
<Footer />
