import type { PageLoad } from './$types';
const session = "$lib/stores/session";

export const load: PageLoad = async ({ fetch }) => {
	const r = await fetch('/stldevs-api/runs')
	if (!r.ok) {
		console.log('Error fetching', r);
		return { lastRun: '1970-01-01' };
	}

	const r2 = await fetch('/stldevs-api/me')
	if (!r2.ok) {
		if (r2.status === 401) {
			console.log('Not logged in');
		} else {
			console.log('Error fetching', r2);
		}
	} else {
		session.set({ me: await r2.json() });
	}

	const lastRun = await r.json();

	return {
		// TODO parse and display in local timezone
		lastRun: lastRun.split('T')[0]
	};
};
