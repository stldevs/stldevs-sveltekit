<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        grid-gap: .5rem;
        margin: .5em;
    }
</style>

<script>
    import Dev from "$lib/components/Dev.svelte";

    const {response, route} = $props();
</script>

<section>
    {#each response as dev}
        <Dev {dev} {route}/>
    {/each}
</section>
