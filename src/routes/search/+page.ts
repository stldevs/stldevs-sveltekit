import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const q = url.searchParams.get('q');

	if (!q) {
		return {
			users: null,
			repos: null,
			q: ''
		};
	}

	const url1 = `/stldevs-api/devs?q=${encodeURIComponent(q)}`;
	const p1 = fetch(url1)
	const url2 = `/stldevs-api/repos?q=${encodeURIComponent(q)}`;
	const p2 = fetch(url2);
	const r2 = await p2
	if (!r2.ok) {
		return console.log('Error fetching', r2);
	}
	const r1 = await p1
	if (!r1.ok) {
		return console.log('Error fetching', r1);
	}

	return {
		users: await r1.json(),
		repos: await r2.json(),
		q
	};
};
