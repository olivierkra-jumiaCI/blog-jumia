<script>
  import JumiaBlog from './JumiaBlog.svelte';
  import ArticleDetail from './ArticleDetail.svelte';

  let currentPath = '/blog/';

  function handleNavigate(path) {
    currentPath = path;
    window.scrollTo(0, 0);
  }
</script>

{#if currentPath === '/blog/'}
  <JumiaBlog onNavigate={handleNavigate} />
{:else if currentPath === '/blog/tech/smartphones-100000-fcfa-2026/'}
  <ArticleDetail onNavigate={handleNavigate} />
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
