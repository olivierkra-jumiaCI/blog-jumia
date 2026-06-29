<script>
  import { onMount } from 'svelte';
  import JumiaBlog from './JumiaBlog.svelte';
  import ArticleDetail from './ArticleDetail.svelte';
  import AdminLogin from './AdminLogin.svelte';
  import AdminDashboard from './AdminDashboard.svelte';
  import AdminEditor from './AdminEditor.svelte';

  let currentPath = $state(window.location.pathname);
  let isLoggedIn = $state(localStorage.getItem('isAdmin') === 'true');

  function handleNavigate(path) {
    currentPath = path;
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  }

  function handleLogin() {
    isLoggedIn = true;
    localStorage.setItem('isAdmin', 'true');
  }

  function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('isAdmin');
    handleNavigate('/admin/login');
  }

  onMount(() => {
    const handlePopState = () => {
      currentPath = window.location.pathname;
    };
    window.addEventListener('popstate', handlePopState);

    // Intercepte UNIQUEMENT les liens /blog/* pour la navigation SPA
    // Les liens /admin/* sont gérés par leurs propres handlers onclick
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      // Exclure les liens externes, admin, et ceux avec target
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith('/admin') &&
        !anchor.getAttribute('target')
      ) {
        e.preventDefault();
        handleNavigate(href);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  });
</script>

{#if currentPath === '/admin/login'}
  <AdminLogin onNavigate={handleNavigate} onLogin={handleLogin} />
{:else if currentPath.startsWith('/admin')}
  {#if isLoggedIn}
    {#if currentPath === '/admin/editor'}
      <AdminEditor onNavigate={handleNavigate} />
    {:else}
      <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
    {/if}
  {:else}
    <AdminLogin onNavigate={handleNavigate} onLogin={handleLogin} />
  {/if}
{:else}
  <div class="app-container">
    {#if currentPath === '/blog/' || currentPath === '/blog' || currentPath === '/'}
      <JumiaBlog onNavigate={handleNavigate} />
    {:else if currentPath.startsWith('/blog/')}
      {#key currentPath}
        <ArticleDetail onNavigate={handleNavigate} />
      {/key}
    {:else}
      <JumiaBlog onNavigate={handleNavigate} />
    {/if}
  </div>
{/if}

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', Arial, sans-serif;
    background-color: #f5f5f5;
    overflow-x: hidden;
  }

  .app-container {
    max-width: 1170px;
    margin: 0 auto;
    background-color: #fff; /* Fond blanc pour le contenu principal */
    min-height: 100vh;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
  }

  @media (max-width: 1170px) {
    .app-container {
      box-shadow: none;
    }
  }
</style>
