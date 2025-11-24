<style>
    .page-of {
        text-align: right;
        padding: 0;
        margin: 0;
    }
    ul {
        margin-left: 1rem;
        margin-bottom: .75rem;
        padding-bottom: .75rem;
        border-bottom: 1px solid #c9c9c9;
    }
    li {
        margin-top: .5rem;
    }
</style>

<script>
	import FaStar from 'svelte-icons/fa/FaStar.svelte'
	import { goto } from '$app/navigation';

	let { data } = $props();
	let { response, slug, p } = $derived(data);

	let page = $state(p ? p : 0);
	const pageSize = 25;

	let pages = $derived(Math.ceil(response.count / pageSize)-1);
	let morePages = $derived(page+1 <= pages);

	async function next() {
		page++;
		document.getElementById('top')?.scrollIntoView({behavior: 'smooth'});
		await goto(`/languages/${encodeURIComponent(slug)}?p=${page}`)
	}

	async function prev() {
		page--;
		document.getElementById('top')?.scrollIntoView({behavior: 'smooth'});
		await goto(`/languages/${encodeURIComponent(slug)}?p=${page}`)
	}
</script>

<svelte:head>
	<title>STL Devs | {slug}</title>
</svelte:head>

<article>
	<h3 id="top">{(response.count || response.Count || 0).toLocaleString()} {slug} users in St. Louis</h3>
	<p class="page-of">Page {page} of {pages}</p>
	{#each response.languages as lang}
		<div>
			<a href={lang.type === 'user' ? `/developers/${lang.owner || lang.Owner}` : `/organizations/${lang.owner || lang.Owner}`} rel="prefetch">
				{lang.name || lang.Name || lang.owner || lang.Owner}
			</a> has <b>{(lang.count || lang.Count || 0).toLocaleString()}</b> <i><FaStar/></i> from {slug} repos:
			<ul>
				{#each (lang.repos || lang.Repos || []) as r}
					<li>
						<a href="https://github.com/{lang.owner || lang.Owner}/{r.name || r.Name}" target="_blank">
							{r.name || r.Name}
						</a>
						(<b>{(r.stargazers_count || r.StargazersCount || 0).toLocaleString()}</b> <i><FaStar/></i>)
						<small>{r.description || r.Description || '(No description)'}</small>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
	<div class="flex">
		<div>
			<button class="flex-1" onclick={prev} disabled={page === 0}>
				Previous
			</button>
		</div>
		<div class="flex-1 center">Page {page} of {pages}</div>
		<div>
			<button onclick={next} disabled={!morePages}>
				Next
			</button>
		</div>
	</div>
</article>
