import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const sort = url.searchParams.get('sort') || 'stars';
	const r = await fetch(`/stldevs-api/devs?type=User&sort=${sort}`)
	if (!r.ok) {
		console.log('Error fetching', r);
		return {};
	}

	return {
		response: await r.json(),
		sort
	};
};
