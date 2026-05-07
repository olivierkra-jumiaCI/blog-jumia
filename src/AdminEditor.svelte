<script>
  import { onMount } from 'svelte';
  export let onNavigate;
  
  let title = '';
  let category = 'Tech';
  let status = 'Brouillon';
  let coverImage = '';
  let contentHtml = '';
  let quillInstance;

  onMount(() => {
    // Initialiser Quill si on est dans le navigateur
    if (window.Quill) {
      quillInstance = new window.Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline'],
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

  function save() {
    alert("Article sauvegardé (Simulation) !");
    onNavigate('/admin');
  }
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
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
        <button class="btn-secondary" on:click={() => onNavigate('/admin')}>Annuler</button>
        <button class="btn-primary" on:click={save}>Enregistrer</button>
      </div>
    </header>

    <div class="editor-container">
      <div class="form-row">
        <div class="form-group flex-2">
          <label for="title">Titre de l'article</label>
          <input type="text" id="title" bind:value={title} placeholder="Saisissez le titre..." />
        </div>
        <div class="form-group flex-1">
          <label for="category">Catégorie</label>
          <select id="category" bind:value={category}>
            <option>Tech & Smartphones</option>
            <option>Maison & Électro</option>
            <option>Beauté & Mode</option>
            <option>Bébé & Enfant</option>
            <option>Bons Plans</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group flex-2">
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

<style>
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
    max-width: 1000px;
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
    min-height: 400px;
    font-family: 'Open Sans', sans-serif !important;
    font-size: 15px !important;
  }
</style>
