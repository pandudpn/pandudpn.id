import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

// GET: Return visitor stats
export const GET: RequestHandler = async () => {
	try {
		// Get total visits
		const { count: total } = await supabaseAdmin
			.from('visitors')
			.select('id', { count: 'exact', head: true });

		// Get unique visitors (distinct IPs) via manual query
		const { data: distinctData } = await supabaseAdmin
			.from('visitors')
			.select('ip_address')
			.limit(10000);

		let unique = 0;
		if (distinctData) {
			const uniqueIps = new Set(distinctData.map((d) => d.ip_address));
			unique = uniqueIps.size;
		}

		return json({
			unique: unique || 0,
			total: total || 0
		});
	} catch (err) {
		console.error('Visitor stats error:', err);
		return json({ unique: 0, total: 0 });
	}
};

// POST: Track a visitor
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		let ipAddress = '0.0.0.0';
		try {
			ipAddress = getClientAddress();
		} catch {
			// May fail in some environments
		}

		const userAgent = request.headers.get('user-agent') || '';
		const referrer = request.headers.get('referer') || '';

		// Check if this IP visited in the last hour (avoid duplicate tracking)
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const { count } = await supabaseAdmin
			.from('visitors')
			.select('id', { count: 'exact', head: true })
			.eq('ip_address', ipAddress)
			.gte('created_at', oneHourAgo);

		// Only insert if not visited in the last hour
		if (!count || count === 0) {
			await supabaseAdmin.from('visitors').insert({
				ip_address: ipAddress,
				user_agent: userAgent,
				path: '/',
				referrer: referrer
			});
		}

		return json({ success: true });
	} catch (err) {
		console.error('Visitor tracking error:', err);
		return json({ error: 'Failed to track' }, { status: 500 });
	}
};
