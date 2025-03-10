import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const r = await fetch('/stldevs-api/langs')
	if (!r.ok) {
		console.log('Error fetching', r);
		return {};
	}

	return {
		toplangs: await r.json()
	};
};
