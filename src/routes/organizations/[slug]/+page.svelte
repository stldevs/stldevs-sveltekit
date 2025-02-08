<script>
	import Profile from "$lib/components/Profile.svelte";
	let {data} = $props();
	let {response, slug, me} = data;
</script>

<svelte:head>
	<title>STL Org | {slug}</title>
</svelte:head>

<Profile {response} {slug} {me}/>
