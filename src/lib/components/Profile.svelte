<style>
  .profile {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  li {
      margin-bottom: 1rem;
      line-height: 1.1;
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
  }

  .stats li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
    color: #5d5d5d;
  }

  .stats i {
      margin-right: 3px;
  }

  .avatar {
      height: 200px;
      border-radius: 5px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      transition: all 0.6s cubic-bezier(.25,.8,.25,1);
      margin: 0 1rem 1rem;
  }
  .avatar:hover {
      box-shadow: 0 6px 12px rgba(0,0,0,0.22), 0 6px 12px rgba(0,0,0,0.26);
  }
  @media screen and (max-width: 690px) {
      .profile {
          flex-direction: column;
          align-items: center;
      }
      .avatar {
          width: 200px;
      }
  }
  .user-info {
      overflow-wrap: anywhere;
  }

  aside {
      margin-bottom: 1.5rem;
  }
  .admin {
    background: #fc8383;
    border-radius: 5px;
    padding: 1rem;
  }
  .admin h3 {
    margin: 0;
    padding: 0;
  }
</style>

<script>
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import FaCodeBranch from 'svelte-icons/fa/FaCodeBranch.svelte'
  import FaUserCircle from 'svelte-icons/fa/FaUserCircle.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
  import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'
  import FaCheckSquare from 'svelte-icons/fa/FaRegCheckSquare.svelte'
  import FaSquare from 'svelte-icons/fa/FaRegSquare.svelte'

  import Repos from "$lib/components/Repos.svelte";

  let {response, slug, isOrg, me} = $props();
  let user = $derived(response.user || response.User);
  let repos = $derived(response.repos || response.Repos);

  function toggleHide(login, val) {
    fetch(`/stldevs-api/devs/${login}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({hide: val}),
    })
    .then(async r => {
      if (r.ok) {
        response = await r.json()
      }
    })
  }

  function delUser(login) {
    fetch(`/stldevs-api/devs/${login}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(() => {
      location.reload()
    })
  }

  let hideUnstarred = $state(true)
</script>

<article>
  <section>
    <div class="profile">
      <img class="avatar" src={user.avatar_url} loading="lazy" alt="{user.login}'s photo">
      <ul class="user-info">
        <li><a href="https://github.com/{user.login}" target="_blank">
                {user.name || user.login}
              <!--                    <i class="sup"><FaExternalLinkSquareAlt/></i>-->
        </a></li>
        <li>
            {#if user.blog}
              <a href={user.blog.startsWith('http') ? user.blog : `http://${user.blog}` }
                 target="_blank">
                  {user.blog}
              </a>
            {/if}
        </li>
      <li>
          {#if user.email}
            <a href={`mailto:${user.email}`}>{user.email}</a>
          {/if}
        <li class="bio">{user.bio || ''}</li>
        <li>
          <ul class="stats">
              {#if !isOrg}
                <li title="followers"><i>
                  <FaUserCircle/>
                </i>{user.followers.toLocaleString()}</li>
                <li title="gists"><i>
                  <FaBookmark/>
                </i>{user.public_gists.toLocaleString()}</li>
              {/if}
            <li title="repositories"><i>
              <FaBook/>
            </i>{user.public_repos.toLocaleString()}</li>
            <li title="total stars"><i>
              <FaStar/>
            </i>{user.stars ? user.stars.toLocaleString() : 0}</li>
            <li title="total forks"><i>
              <FaCodeBranch/>
            </i>{user.forks ? user.forks.toLocaleString() : 0}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
  {#if me && me.is_admin}
    <aside class="admin">
      <h3>Admin</h3>
      {#if user.hide}
        User is hidden
      {:else}
        User is visible
      {/if}
      <button onclick={() => toggleHide(user.login, !user.hide)}>
        Toggle Visibility
      </button>
      <button onclick={() => delUser(user.login)}>
        Delete User
      </button>
    </aside>
  {/if}

  <aside class="flex gap">
    <button onclick={() => hideUnstarred = !hideUnstarred} class="flex gap align-center">
      {#if hideUnstarred}
        <i><FaCheckSquare/></i>
      {:else}
        <i><FaSquare/></i>
      {/if}
      <span>Hide 0<i><FaStar/></i> 0<i><FaCodeBranch/></i></span>
    </button>
  </aside>

  <section class="code">
      {#each Object.entries(repos) as [lang, repoList] }
        <Repos {slug} {lang} repos={repoList} {hideUnstarred}/>
      {/each}
  </section>
</article>
