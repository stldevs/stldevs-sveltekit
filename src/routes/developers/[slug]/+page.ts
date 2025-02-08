import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const slug = params.slug;

	const r = await fetch(`/stldevs-api/devs/${encodeURIComponent(slug)}`);
	if (!r.ok) {
		if (r.status === 404) {
			return error(404, { message: 'Developer not found' });
		}
		console.log('Error fetching', r);
		return error(500, { message: 'Error fetching developer' });
	}

	return { response: await r.json() };
};
