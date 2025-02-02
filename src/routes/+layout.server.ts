import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const r = await fetch('https://stldevs.com/stldevs-api/runs')
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
