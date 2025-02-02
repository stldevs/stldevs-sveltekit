<script>
	import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
	import FaBook from 'svelte-icons/fa/FaBook.svelte'
	import Hero from "$lib/components/Hero.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>STL Devs | Languages</title>
</svelte:head>

<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
        grid-gap: .5rem;
        margin: .5rem;
    }
    .card {
        display: grid;
        grid-template-columns: 60px 1fr;
    }
    .inner {
        padding: .5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    h3 {
        font-weight: normal;
        margin: 0 0 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
    ul {
        display: flex;
        color: #5d5d5d;
    }
    li {
        display: flex;
        font-size: .90rem;
    }
    span {
        margin-left: .25rem;
    }
</style>

<Hero title="Top Languages in St. Louis" lastrun="true"/>

<section>
	{#each data.toplangs as {Language, Count, Users}}
		<div class="card">

			<a href="/languages/{encodeURIComponent(Language)}" rel="prefetch">
				<img src="/langs/{Language}.svg" loading="lazy" alt="{Language} logo" onerror="{() => this.src = '/langs/Unknown.svg'}">
			</a>
			<div class="inner">
				<h3>
					<a href="/languages/{encodeURIComponent(Language)}" rel="prefetch">
						{Language}
					</a>
				</h3>
				<ul>
					<li title="repositories" class="flex-1">
						<i><FaBook/></i>
						<span>{Count.toLocaleString()}</span>
					</li>
					<li title="users">
						<i><FaUserCircle/></i>
						<span>{Users.toLocaleString()}</span>
					</li>
				</ul>
			</div>
		</div>
	{/each}
</section>
