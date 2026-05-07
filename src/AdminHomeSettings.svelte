<script>
  let { articles = [] } = $props();

  // Simulation de l'état actuel de la home
  let homeConfig = $state({
    hero: 1,
    selection1: 1,
    selection2: 2,
    selection3: 3,
    selection4: 4,
    selection5: 5,
    selection6: 6,
    tech1: 1,
    tech2: 2,
    tech3: 3,
    tech4: 4
  });

  function saveHome() {
    alert("Configuration de la page d'accueil enregistrée !");
  }
</script>

<div class="home-settings">
  <header class="section-header">
    <h2>Gestion de la page d'accueil</h2>
    <p>Sélectionnez les articles à afficher dans chaque zone stratégique.</p>
  </header>

  <div class="settings-grid">
    <!-- ZONE HERO -->
    <div class="zone-card hero-zone">
      <div class="zone-badge">Zone 1</div>
      <h3>Article à la une (Hero)</h3>
      <div class="form-group">
        <label>Choisir l'article principal :</label>
        <select bind:value={homeConfig.hero}>
          {#each articles as article}
            <option value={article.id}>{article.title}</option>
          {/each}
        </select>
      </div>
      <div class="zone-preview">
        Cet article occupera le grand bloc avec l'image géante en haut de page.
      </div>
    </div>

    <!-- ZONE SÉLECTION -->
    <div class="zone-card">
      <div class="zone-badge">Zone 2</div>
      <h3>Sélection de la semaine</h3>
      <div class="selection-grid">
        {#each [1, 2, 3, 4, 5, 6] as i}
          <div class="form-group">
            <label>Position {i} :</label>
            <select bind:value={homeConfig['selection' + i]}>
              {#each articles as article}
                <option value={article.id}>{article.title}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>

    <!-- ZONE TECH -->
    <div class="zone-card">
      <div class="zone-badge">Zone 3</div>
      <h3>Section Tech & Smartphones</h3>
      <div class="selection-grid">
        {#each [1, 2, 3, 4] as i}
          <div class="form-group">
            <label>Position {i} :</label>
            <select bind:value={homeConfig['tech' + i]}>
              {#each articles as article}
                <option value={article.id}>{article.title}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>
    <!-- ZONE MAISON -->
    <div class="zone-card">
      <div class="zone-badge">Zone 4</div>
      <h3>Section Maison & Électroménager</h3>
      <div class="selection-grid">
        {#each [1, 2, 3] as i}
          <div class="form-group">
            <label>Position {i} :</label>
            <select bind:value={homeConfig['maison' + i]}>
              {#each articles as article}
                <option value={article.id}>{article.title}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>

    <!-- ZONE BEAUTÉ -->
    <div class="zone-card">
      <div class="zone-badge">Zone 5</div>
      <h3>Section Beauté & Mode</h3>
      <div class="selection-grid">
        {#each [1, 2, 3] as i}
          <div class="form-group">
            <label>Position {i} :</label>
            <select bind:value={homeConfig['beaute' + i]}>
              {#each articles as article}
                <option value={article.id}>{article.title}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>

    <!-- ZONE GUIDES -->
    <div class="zone-card">
      <div class="zone-badge">Zone 6</div>
      <h3>Guides pratiques Jumia CI</h3>
      <div class="selection-grid">
        {#each [1, 2, 3, 4, 5, 6] as i}
          <div class="form-group">
            <label>Guide {i} :</label>
            <select bind:value={homeConfig['guide' + i]}>
              {#each articles as article}
                <option value={article.id}>{article.title}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="save-bar">
    <button class="btn-primary" on:click={saveHome}>Appliquer les changements</button>
  </div>
</div>

<style>
  .home-settings {
    padding: 20px 0;
  }
  .section-header {
    margin-bottom: 30px;
  }
  .section-header h2 { font-size: 24px; margin-bottom: 5px; }
  .section-header p { color: #718096; font-size: 14px; }

  .settings-grid {
    display: grid;
    gap: 25px;
  }

  .zone-card {
    background: #fff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: relative;
    border-left: 5px solid #e2e8f0;
  }
  .hero-zone { border-left-color: #F68B1E; }
  
  .zone-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #edf2f7;
    color: #4a5568;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
  }

  h3 { font-size: 18px; margin-bottom: 20px; color: #2d3748; }

  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #4a5568;
  }
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
  }

  .selection-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .zone-preview {
    margin-top: 15px;
    font-size: 12px;
    color: #a0aec0;
    font-style: italic;
  }

  .save-bar {
    margin-top: 40px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    text-align: right;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.05);
  }

  .btn-primary {
    background: #F68B1E;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
  }
  .btn-primary:hover { background: #d97706; }
</style>
