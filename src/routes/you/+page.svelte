<script>
	import Hero from "$lib/components/Hero.svelte";
	let { data } = $props();
	let { me } = $derived(data);

	async function logout() {
		await fetch(`/stldevs-api/logout`, {credentials: 'include'})
		location.reload()
	}
	async function optOut() {
		const r = await fetch(`/stldevs-api/me`, {
			credentials: 'include',
			method: 'PATCH',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({Hide: true}),
		})
		if (!r.ok) {
			return alert(await r.text())
		}
		data.me = await r.json()
	}
	async function optIn() {
		const r = await fetch(`/stldevs-api/me`, {
			credentials: 'include',
			method: 'PATCH',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({Hide: false})
		})
		if (!r.ok) {
			return alert(await r.text())
		}
		data.me = await r.json()
	}
</script>

<Hero title="You"/>

<article>
	{#if !me}
		<p>You aren't logged in. You can log in to opt-out of this website.</p>

		<a class="button" href="/stldevs-api/login">Log in with GitHub</a>

		<p>
			If you'd rather not log in with GitHub, mention me on Twitter and I'll opt you out.
			<a href="https://twitter.com/nill" target="_blank">@nill</a>
		</p>
	{:else}
		Welcome {me.name || me.login}!
		{#if !me.hide}
			<div>
				<p>To opt out of stldevs click here:</p>
				<button onclick={optOut}>Opt Out</button>
			</div>
		{:else}
			<div>
				<p>You should be hidden now.</p>
				<p>To opt back in to stldevs click here:</p>
				<button onclick={optIn}>Opt In</button>
			</div>
		{/if}

		{#if me.is_admin}
			<p>You're an admin</p>
		{/if}

		<p>
			<button onclick={logout}>Logout</button>
		</p>
	{/if}
</article>
