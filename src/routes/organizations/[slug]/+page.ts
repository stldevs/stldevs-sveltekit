import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	const r = await fetch(`/stldevs-api/devs/${encodeURIComponent(slug)}`);
	if (!r.ok) {
		if (r.status === 404) {
			return error(404, { message: 'Organization not found' });
		}
		return error(500, { message: 'Error fetching organization' });
	}

	return { response: await r.json() };
};
