import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const slug = params.slug;

	const api = new URL(`/stldevs-api/devs/${encodeURIComponent(slug)}`, url.origin);
	const r = await fetch(api);
	if (!r.ok) {
		if (r.status === 404) {
			return error(404, { message: 'Developer not found' });
		}
		return error(500, { message: 'Error fetching developer' });
	}

	return { response: await r.json() };
};
