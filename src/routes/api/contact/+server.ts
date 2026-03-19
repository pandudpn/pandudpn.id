import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const data = await request.json();

		// Validation
		if (!data.name || !data.email || !data.message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		if (data.message.length < 10 || data.message.length > 1000) {
			return json({ error: 'Message must be between 10 and 1000 characters' }, { status: 400 });
		}

		// Rate limiting: max 3 submissions per email per 10 minutes
		const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
		const { count } = await supabaseAdmin
			.from('contacts')
			.select('id', { count: 'exact', head: true })
			.eq('email', data.email)
			.gte('created_at', tenMinutesAgo);

		if (count && count >= 3) {
			return json({ error: 'Too many requests. Please wait a few minutes.' }, { status: 429 });
		}

		// Get client info
		let ipAddress = '0.0.0.0';
		try {
			ipAddress = getClientAddress();
		} catch {
			// getClientAddress may fail in some environments
		}
		const userAgent = request.headers.get('user-agent') || '';

		// Insert to Supabase
		const { error } = await supabaseAdmin.from('contacts').insert({
			name: data.name.trim(),
			email: data.email.trim().toLowerCase(),
			company: data.company?.trim() || null,
			message: data.message.trim(),
			ip_address: ipAddress,
			user_agent: userAgent
		});

		if (error) {
			console.error('Supabase insert error:', error);
			return json({ error: 'Failed to save message' }, { status: 500 });
		}

		return json({ success: true, message: 'Message sent successfully!' });
	} catch (err) {
		console.error('Contact form error:', err);
		return json({ error: 'Failed to process request' }, { status: 500 });
	}
};
