<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from "$lib/components/Hero.svelte";
	import Spinner from "$lib/components/Spinner.svelte";

	let { data, children } = $props();
	import { navigating } from '$app/state'
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
	{#if data.slug}
		<Hero title={data.slug}/>
	{/if}
	{#if navigating.to}
		<div><Spinner/></div>
	{/if}
	{@render children()}
</main>
