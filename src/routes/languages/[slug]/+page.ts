import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const slug = params.slug;
	const p = Number(url.searchParams.get('p') || 0);

	let serverUrl = `/stldevs-api/langs/${encodeURIComponent(slug)}`;
	if (p) {
		serverUrl += `?offset=${p*25}&limit=25`
	}
	const res = await fetch(serverUrl);
	if (!res.ok) {
		return console.log('Error fetching', res);
	}
	const response = await res.json();

	return { response, slug, p };
};
