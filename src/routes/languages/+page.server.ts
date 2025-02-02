import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const r = await fetch('https://stldevs.com/stldevs-api/langs')
	if (!r.ok) {
		console.log('Error fetching', r);
		return {};
	}

	return {
		toplangs: await r.json()
	};
};
