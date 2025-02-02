import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const r = await fetch('/stldevs-api/devs?type=User')
	if (!r.ok) {
		console.log('Error fetching', r);
		return {};
	}

	return {
		response: await r.json()
	};
};
