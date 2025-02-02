<style>
  header {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    /*color: whi;*/
    /*background: url('/keyboard.jpg');*/
    /*background-size: cover;*/
    /*box-shadow: inset 0 0 0 1000px rgba(0,0,255,.2);*/
  }
  div {
    position: relative;
  }
</style>

<script>
  let { lastrun, title = 'St. Louis Developers' } = $props();

  import LastRun from "$lib/components/LastRun.svelte";
</script>

<header>
  <h2>{ title }</h2>
  {#if lastrun}
  <div>
    <LastRun/>
  </div>
  {/if}
</header>
