import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const r = await fetch('/stldevs-api/runs')
	if (!r.ok) {
		console.log('Error fetching', r);
		return { lastRun: '1970-01-01' };
	}

	const lastRun = await r.json();

	return {
		// TODO parse and display in local timezone
		lastRun: lastRun.split('T')[0]
	};
};
