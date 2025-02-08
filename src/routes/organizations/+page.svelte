<script>
	let {data} = $props();
	let {response} = data;

	import Listing from "$lib/components/Listing.svelte";
	import Hero from "$lib/components/Hero.svelte";
</script>

<svelte:head>
	<title>STL Devs | Organizations</title>
</svelte:head>

<Hero title="Most Starred Orgs in St. Louis" lastrun="true"/>
<Listing response={response} route="organizations"/>
