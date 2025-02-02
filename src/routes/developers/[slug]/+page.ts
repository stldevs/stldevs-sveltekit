import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	const r = await fetch(`/stldevs-api/devs/${encodeURIComponent(slug)}`);
	if (!r.ok) {
		return console.log('Error fetching', r);
	}

	return { response: await r.json() };
};
