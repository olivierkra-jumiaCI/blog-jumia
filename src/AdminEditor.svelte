<script>
  import { onMount } from 'svelte';
  let { onNavigate } = $props();
  
  let title = $state('');
  let slug = $state('');
  let category = $state('Tech & Smartphones');
  let status = $state('Brouillon');
  let coverImage = $state('');
  let contentHtml = $state('');
  let quillInstance;
  let showPreview = $state(false);

  // Générer automatiquement le slug à partir du titre
  $effect(() => {
    if (title && !slug) {
      slug = title.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  });

  onMount(() => {
    // Vérifier si on édite un article existant (Simulation)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === '1') {
      title = "Smartphones à moins de 100 000 FCFA en Côte d'Ivoire";
      slug = "smartphones-100000-fcfa-2026";
      category = "Tech & Smartphones";
      status = "Publié";
      // Simulation de chargement de contenu Quill
      setTimeout(() => {
        if (quillInstance) quillInstance.root.innerHTML = "<h2>Contenu de test</h2><p>Voici un article de test avec du <strong>gras</strong>.</p><pre class='ql-syntax' spellcheck='false'>console.log('Hello Jumia');</pre>";
      }, 500);
    }

    if (window.Quill) {
      quillInstance = new window.Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      });
      
      quillInstance.on('text-change', () => {
        contentHtml = quillInstance.root.innerHTML;
      });
    }
  });

  function togglePreview() {
    showPreview = !showPreview;
  }

  function save() {
    alert(`Article sauvegardé !\nLien partageable : /blog/${category.toLowerCase().split(' ')[0]}/${slug}`);
    onNavigate('/admin');
  }
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
  <!-- Pour la coloration syntaxique dans l'éditeur -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
</svelte:head>

<div class="admin-layout">
  <aside class="sidebar">
    <div class="logo">JUMIA <span style="font-size: 12px; color: #777;">Admin</span></div>
    <nav>
      <a href="/admin" on:click|preventDefault={() => onNavigate('/admin')}>← Retour aux articles</a>
    </nav>
  </aside>

  <main class="content">
    <header class="topbar">
      <h1>Éditer l'article</h1>
      <div class="actions">
        <button class="btn-secondary" on:click={togglePreview}>👁️ Prévisualiser</button>
        <button class="btn-secondary" on:click={() => onNavigate('/admin')}>Annuler</button>
        <button class="btn-primary" on:click={save}>Enregistrer</button>
      </div>
    </header>

    <div class="editor-container">
      <!-- ... (form rows) ... -->
      <div class="form-row">
        <div class="form-group flex-2">
          <label for="title">Titre de l'article</label>
          <input type="text" id="title" bind:value={title} placeholder="Saisissez le titre..." />
        </div>
        <div class="form-group flex-1">
          <label for="slug">Lien de l'article (Slug)</label>
          <input type="text" id="slug" bind:value={slug} placeholder="lien-de-l-article" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group flex-1">
          <label for="category">Catégorie</label>
          <select id="category" bind:value={category}>
            <option>Tech & Smartphones</option>
            <option>Maison & Électro</option>
            <option>Beauté & Mode</option>
            <option>Bébé & Enfant</option>
            <option>Agriculture & élevage</option>
            <option>Sport & bien être</option>
            <option>Bons Plans</option>
          </select>
        </div>
        <div class="form-group flex-1">
          <label for="cover">Image de couverture (URL)</label>
          <input type="text" id="cover" bind:value={coverImage} placeholder="https://..." />
        </div>
        <div class="form-group flex-1">
          <label for="status">Statut</label>
          <select id="status" bind:value={status}>
            <option>Brouillon</option>
            <option>Publié</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Contenu de l'article</label>
        <div class="quill-wrapper">
          <div id="editor"></div>
        </div>
      </div>
    </div>
  </main>
</div>

{#if showPreview}
  <div class="preview-overlay" on:click={togglePreview}>
    <div class="preview-modal" on:click|stopPropagation>
      <div class="pm-header">
        <h2>Aperçu du brouillon</h2>
        <button class="btn-close" on:click={togglePreview}>&times;</button>
      </div>
      <div class="pm-body">
        <div class="article-preview">
          {#if coverImage}
            <img src={coverImage} alt="Cover" class="prev-cover" />
          {/if}
          <div class="prev-cat">{category}</div>
          <h1>{title || 'Titre de l\'article'}</h1>
          <div class="prev-content">
            {@html contentHtml || '<p style="color:#999">Aucun contenu...</p>'}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ... (styles existants) ... */
  .admin-layout {
    display: flex;
    min-height: 100vh;
    font-family: 'Open Sans', sans-serif;
    background: #f4f6f8;
  }
  .sidebar {
    width: 250px;
    background: #fff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
  }
  .logo {
    padding: 20px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e2e8f0;
  }
  nav { padding: 20px 0; }
  nav a {
    display: block;
    padding: 12px 20px;
    color: #4a5568;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }
  nav a:hover {
    background: #edf2f7;
  }

  .content {
    flex: 1;
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .topbar h1 { font-size: 24px; color: #2d3748; margin: 0; }
  .actions { display: flex; gap: 10px; }
  
  button {
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    font-size: 14px;
  }
  .btn-primary {
    background: #F68B1E;
    color: #fff;
    border: none;
  }
  .btn-primary:hover { background: #d97706; }
  .btn-secondary {
    background: #fff;
    color: #4a5568;
    border: 1px solid #cbd5e0;
  }
  .btn-secondary:hover { background: #f7fafc; }

  .editor-container {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  .flex-1 { flex: 1; }
  .flex-2 { flex: 2; }
  
  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 8px;
  }
  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: inherit;
  }
  input:focus, select:focus {
    outline: none;
    border-color: #F68B1E;
  }
  
  .quill-wrapper {
    background: #fff;
  }
  :global(.ql-toolbar) {
    border-color: #e2e8f0 !important;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  :global(.ql-container) {
    border-color: #e2e8f0 !important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    min-height: 550px;
    font-family: 'Open Sans', sans-serif !important;
    font-size: 15px !important;
  }

  /* PREVIEW MODAL */
  .preview-overlay {
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 40px;
  }
  .preview-modal {
    background: #fff;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .pm-header {
    padding: 15px 25px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pm-header h2 { font-size: 18px; margin:0; color: #333; }
  .btn-close {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #999;
    padding: 0;
  }
  .pm-body {
    flex: 1;
    overflow-y: auto;
    padding: 40px;
    background: #f9f9f9;
  }
  .article-preview {
    background: #fff;
    padding: 40px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    max-width: 750px;
    margin: 0 auto;
  }
  .prev-cover { width: 100%; height: 350px; object-fit: cover; border-radius: 4px; margin-bottom: 20px; }
  .prev-cat { color: #F68B1E; font-weight: 700; font-size: 12px; text-transform: uppercase; margin-bottom: 10px; }
  .article-preview h1 { font-size: 32px; margin-bottom: 25px; line-height: 1.2; }
  .prev-content { line-height: 1.7; font-size: 16px; color: #333; }
  :global(.prev-content pre) {
    background: #2d2d2d;
    color: #ccc;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: monospace;
  }
</style>
