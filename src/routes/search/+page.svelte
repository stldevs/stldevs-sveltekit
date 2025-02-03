<script>
	const { data } = $props();

	let users = $derived(data.users);
	let repos = $derived(data.repos);
	let q = $state(data.q);

	import Hero from "$lib/components/Hero.svelte";
	import {goto} from '$app/navigation';
	import Listing from "$lib/components/Listing.svelte";
	import FaStar from 'svelte-icons/fa/FaStar.svelte';
	import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte';

	async function search() {
		if (q === '') {
			await goto(`?`);
			return
		}
		await goto(`?q=${encodeURIComponent(q)}`)
	}
</script>
<style>
    .search {
        margin: 1em;
        display: flex;
        justify-content: center;
    }
    input {
        font-size: 16pt;
    }
    h4 {
        margin: 0;
    }
    section {
        margin-bottom: 1em;
    }
</style>

<Hero title="Search St. Louis Devs"/>

<div class="search">
	<input id="search" type="text" bind:value={q} placeholder="Search" onkeyup={e=>e.key==='Enter' && search()}/>
	<button onclick={search}>
		Search
	</button>
</div>

{#if !users && !repos}
	<p class="center">Search for users or repositories</p>
{/if}

{#if users}
	<p class="center">{users.length} users</p>
	<Listing response={users}/>
{/if}

{#if repos}
	<p class="center">{repos.length} repos</p>
	<article class="repos">
		{#each repos as repo}
			<section>
				<div class="flex">
					<h4 class="flex-1">
						{repo.Name} (by <a href="/developers/{repo.Owner}" rel="prefetch">{repo.Owner}</a>)
					</h4>
					<span><i><FaStar/></i>{repo.StargazersCount} <i><FaCodeBranch/></i> {repo.ForksCount}</span>
				</div>
				<em>{repo.Description}</em>
			</section>
		{/each}
	</article>
{/if}
