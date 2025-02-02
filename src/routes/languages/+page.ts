import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const r = await fetch('/stldevs-api/langs')
	if (!r.ok) {
		console.log('Error fetching', r);
		return {};
	}

	return {
		toplangs: await r.json()
	};
};
