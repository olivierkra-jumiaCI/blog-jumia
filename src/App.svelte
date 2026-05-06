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

<div class="app-container">
  {#if currentPath === '/blog/' || currentPath === '/blog'}
    <JumiaBlog onNavigate={handleNavigate} />
  {:else if currentPath === '/blog/tech/smartphones-100000-fcfa-2026/' || currentPath === '/blog/tech/smartphones-100000-fcfa-2026'}
    <ArticleDetail onNavigate={handleNavigate} />
  {:else}
    <JumiaBlog onNavigate={handleNavigate} />
  {/if}
</div>

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', Arial, sans-serif;
    background-color: #f5f5f5;
    overflow-x: hidden;
  }

  .app-container {
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 100vh;
    box-sizing: border-box;
  }

  @media (min-width: 1171px) {
    .app-container {
      box-shadow: 0 0 20px rgba(0,0,0,0.05);
    }
  }
</style>
