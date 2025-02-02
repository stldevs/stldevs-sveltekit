<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from "$lib/components/Hero.svelte";

	let { data, children } = $props();
</script>

<style>
    main {
        background: #ececec url("/fleur.svg");
        width: 100%;
        min-height: 100vh;
    }
    div {
        width: 100px;
        height: 100px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>

<Nav/>

<main>
	{#if data.params && data.params.slug}
		<Hero title={data.params.slug}/>
	{/if}
	{@render children()}
</main>
