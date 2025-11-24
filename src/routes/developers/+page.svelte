<script>
	let {data} = $props();
	let {response, sort} = data;

	import Listing from "$lib/components/Listing.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import {goto} from '$app/navigation';

	async function handleSortChange(event) {
		const newSort = event.target.value;
		await goto(`?sort=${newSort}`);
	}
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
	<title>STL Devs | Developers</title>
</svelte:head>

<Hero title="Most Starred Devs in St. Louis" lastrun="true"/>

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
