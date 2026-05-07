<script>
  import { storage } from './lib/firebase';
  import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
  import { onMount } from 'svelte';

  let files = $state([]);
  let isUploading = $state(false);
  let uploadMessage = $state('');
  let fileInput;

  async function loadMedia() {
    const listRef = ref(storage, 'media/');
    try {
      const res = await listAll(listRef);
      const filePromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url, fullPath: itemRef.fullPath };
      });
      files = await Promise.all(filePromises);
    } catch (err) {
      console.error(err);
    }
  }

  onMount(loadMedia);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    isUploading = true;
    uploadMessage = 'Téléchargement en cours...';

    const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
    
    try {
      await uploadBytes(storageRef, file);
      uploadMessage = 'Image ajoutée !';
      loadMedia();
      fileInput.value = '';
    } catch (err) {
      console.error(err);
      uploadMessage = 'Erreur lors de l\'envoi.';
    } finally {
      isUploading = false;
    }
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papier !');
  }

  async function deleteFile(path, name) {
    if (confirm(`Supprimer l'image ${name} ?`)) {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
      loadMedia();
    }
  }
</script>

<div class="media-library">
  <header class="section-header">
    <div class="header-left">
      <h2>Médiathèque</h2>
      <p>Gérez vos images et fichiers média.</p>
    </div>
    <div class="header-right">
      <input type="file" bind:this={fileInput} on:change={handleUpload} style="display:none" accept="image/*" />
      <button class="btn-primary" on:click={() => fileInput.click()} disabled={isUploading}>
        {isUploading ? 'Chargement...' : '+ Ajouter une image'}
      </button>
    </div>
  </header>

  {#if uploadMessage}
    <div class="alert">{uploadMessage}</div>
  {/if}

  <div class="media-grid">
    {#each files as file}
      <div class="media-card">
        <div class="media-preview">
          <img src={file.url} alt={file.name} loading="lazy" />
        </div>
        <div class="media-info">
          <span class="file-name">{file.name}</span>
          <div class="media-actions">
            <button class="btn-sm" on:click={() => copyUrl(file.url)}>Copier le lien</button>
            <button class="btn-sm del" on:click={() => deleteFile(file.fullPath, file.name)}>Supprimer</button>
          </div>
        </div>
      </div>
    {/each}

    {#if files.length === 0 && !isUploading}
      <div class="empty-state">
        <p>Aucune image pour le moment. Cliquez sur le bouton pour en ajouter.</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .media-library { padding: 20px 0; }
  .section-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 30px; 
  }
  
  .alert {
    background: #ebf8ff;
    color: #2c5282;
    padding: 10px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 14px;
  }

  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .media-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
  }

  .media-preview {
    height: 150px;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .media-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .media-info { padding: 12px; }
  .file-name {
    display: block;
    font-size: 12px;
    color: #4a5568;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .media-actions { display: flex; gap: 8px; }
  .btn-sm {
    flex: 1;
    background: #edf2f7;
    border: none;
    padding: 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-sm:hover { background: #e2e8f0; }
  .btn-sm.del { color: #e53e3e; }

  .btn-primary {
    background: #F68B1E;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    color: #a0aec0;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
  }
</style>
