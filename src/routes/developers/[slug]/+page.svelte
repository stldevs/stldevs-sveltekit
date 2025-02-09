<script>
	import Profile from "$lib/components/Profile.svelte";
	let {data} = $props();
	let {response, slug, me} = $state(data);
</script>

<svelte:head>
	<title>STL Devs | {slug}</title>
</svelte:head>

<Profile bind:response {slug} {me}/>
