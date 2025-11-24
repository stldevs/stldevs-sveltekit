<script>
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'

  export let slug='ghost'
  export let lang='Unknown'
  export let repos=[]
  export let hideUnstarred=true

  $: language = lang || 'No Language'
  $: filteredRepos = !hideUnstarred ? repos : repos.filter(repo => repo.stargazers_count || repo.forks_count)
</script>

{#if filteredRepos.length > 0 }
<fieldset>
  <legend id={language}>{language}</legend>
  {#each filteredRepos as repo}
    <section class="repo">
      <header>
        <h4>
          {#if repo.fork === true}
            <i title="is a fork">
              <FaCodeBranch/>
            </i>
          {/if}
          <a href="https://github.com/{slug}/{repo.name}" target="_blank">{repo.name}</a>
        </h4>
        <span>
          <i title="stars"><FaStar/></i>&nbsp;{repo.stargazers_count.toLocaleString()}
        </span>
        <span>
          <i title="forks"><FaCodeBranch/></i>&nbsp;{repo.forks_count.toLocaleString()}
        </span>
      </header>
      <em>{repo.description || ''}</em>
    </section>
  {/each}
</fieldset>
{/if}
<style>
    section {
        margin-bottom: .75rem;
    }

    header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        grid-gap: .5rem;
    }

    h4 {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
    }

    fieldset {
        border: 1px solid black;
        margin-top: 1rem;
    }

    span {
        display: flex;
        align-items: center;
        line-height: 1.1;
        color: #5d5d5d;
    }

    em {
        overflow-wrap: anywhere;
    }
</style>
