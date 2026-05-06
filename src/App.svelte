<script>
  import { onMount } from 'svelte';
  import JumiaBlog from './JumiaBlog.svelte';
  import ArticleDetail from './ArticleDetail.svelte';

  let currentPath = $state(window.location.pathname);

  function handleNavigate(path) {
    currentPath = path;
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  }

  onMount(() => {
    const handlePopState = () => {
      currentPath = window.location.pathname;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  });
</script>

{#if currentPath === '/blog/' || currentPath === '/blog'}
  <JumiaBlog onNavigate={handleNavigate} />
{:else if currentPath === '/blog/tech/smartphones-100000-fcfa-2026/' || currentPath === '/blog/tech/smartphones-100000-fcfa-2026'}
  <ArticleDetail onNavigate={handleNavigate} />
{:else}
  <!-- Redirection par défaut vers l'accueil du blog si le chemin ne match pas -->
  <JumiaBlog onNavigate={handleNavigate} />
{/if}

<style>
  :global(html), :global(body) {
    margin: 0 auto;
    padding: 0;
    font-family: 'Open Sans', Arial, sans-serif;
    background-color: #f5f5f5;
    max-width: 1170px;
    overflow-x: hidden;
  }
</style>
