import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const slug = params.slug;
	const p = Number(url.searchParams.get('p') || 0);

	let serverUrl = `/stldevs-api/langs/${encodeURIComponent(slug)}`;
	if (p) {
		serverUrl += `?offset=${p*25}&limit=25`
	}
	const r = await fetch(serverUrl);
	if (!r.ok) {
		if (r.status === 404) {
			return error(404, { message: 'Language not found' });
		}
		return error(500, { message: 'Error fetching language' });
	}
	const response = await r.json();

	return { response, slug, p };
};
