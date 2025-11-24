<script>
	let {data} = $props();
	let {response, sort} = data;

	import Listing from "$lib/components/Listing.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import {goto} from '$app/navigation';

	async function handleSortChange(event) {
		const newSort = event.target.value;
		await goto(`?sort=${encodeURIComponent(newSort)}`);
	}

	// Compute dynamic title based on sort parameter
	const sortLabels = {
		stars: 'Most Starred',
		forks: 'Most Forked',
		followers: 'Most Followed',
		public_repos: 'Most Repos'
	};
	const currentSort = sort || 'stars';
	const title = `${sortLabels[currentSort]} Devs in St. Louis`;
</script>

<style>
	.sort-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1em;
		gap: 0.5em;
	}

	select {
		font-size: 14pt;
		padding: 0.3em;
		border-radius: 4px;
	}
</style>

<svelte:head>
	<title>STL Devs | {title}</title>
</svelte:head>

<Hero title={title} lastrun="true"/>

<div class="sort-container">
	<label for="sort-select">Sort by:</label>
	<select id="sort-select" value={sort || 'stars'} onchange={handleSortChange}>
		<option value="stars">Stars</option>
		<option value="forks">Forks</option>
		<option value="followers">Followers</option>
		<option value="public_repos">Public Repos</option>
	</select>
</div>

<Listing response={response} route="developers"/>
