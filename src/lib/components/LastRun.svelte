<script>
  import { page } from '$app/state';
</script>

<style>
  em {
    position: absolute;
    right: 1em;
    top: -1.5rem;
  }
</style>

<em>
  Last run
  {#if page.data.lastRun}
    {new Date(page.data.lastRun).toLocaleString()}
  {:else}
<!--    <i><Spinner color="white"/></i>-->
  {/if}
</em>
