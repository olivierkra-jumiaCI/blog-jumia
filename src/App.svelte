<script>
  import JumiaBlog from './JumiaBlog.svelte';

  let currentPath = '/blog/';

  function handleNavigate(path) {
    currentPath = path;
  }
</script>

<JumiaBlog onNavigate={handleNavigate} />

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
