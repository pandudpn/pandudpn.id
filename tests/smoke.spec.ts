import { test, expect } from '@playwright/test';

test.describe('pandudpn.id smoke tests', () => {
	test('homepage loads with correct title', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Pandu Dwi Putra/);
	});

	test('all sections are present in DOM', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#hero')).toBeAttached();
		await expect(page.locator('#about')).toBeAttached();
		await expect(page.locator('#tech-stack')).toBeAttached();
		await expect(page.locator('#experience')).toBeAttached();
		await expect(page.locator('#projects')).toBeAttached();
		await expect(page.locator('#contact')).toBeAttached();
	});

	test('navigation links are present', async ({ page }) => {
		await page.goto('/');
		const nav = page.locator('nav[aria-label="Main navigation"]');
		await expect(nav).toBeAttached();
	});

	test('contact form has required fields', async ({ page }) => {
		await page.goto('/');
		// Scroll to contact section
		await page.evaluate(() => {
			document.getElementById('contact')?.scrollIntoView();
		});
		await expect(
			page.locator('input[name="name"], input[id="name"], input[id="contact-name"]').first()
		).toBeAttached();
		await expect(
			page.locator('input[name="email"], input[id="email"], input[id="contact-email"]').first()
		).toBeAttached();
		await expect(page.locator('textarea').first()).toBeAttached();
	});

	test('dark mode is default', async ({ page }) => {
		await page.goto('/');
		const html = page.locator('html');
		await expect(html).toHaveClass(/dark/);
	});

	test('no console errors on load', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		// Filter out known non-critical errors (like missing favicon in test env)
		const criticalErrors = errors.filter(
			(e) =>
				!e.includes('favicon') &&
				!e.includes('manifest') &&
				!e.includes('api/visitor') // API not available in test build
		);
		expect(criticalErrors).toHaveLength(0);
	});
});
