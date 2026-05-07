<script>
  export let onNavigate;
  export let onLogout;

  // Données mockées pour le moment
  let articles = $state([
    { id: 1, title: "Smartphones à moins de 100 000 FCFA en Côte d'Ivoire", category: "Tech", status: "Publié", date: "3 mai 2026" },
    { id: 2, title: "Climatiseur en Côte d'Ivoire : comment choisir", category: "Maison", status: "Brouillon", date: "-" }
  ]);

  function editArticle(id) {
    onNavigate(`/admin/editor?id=${id}`);
  }

  function newArticle() {
    onNavigate('/admin/editor');
  }
</script>

<div class="admin-layout">
  <aside class="sidebar">
    <div class="logo">JUMIA <span style="font-size: 12px; color: #777;">Admin</span></div>
    <nav>
      <a href="/admin" class="active" on:click|preventDefault={() => onNavigate('/admin')}>Articles</a>
      <a href="/admin/media" on:click|preventDefault>Médiathèque (Bientôt)</a>
    </nav>
    <div class="logout">
      <button on:click={onLogout}>Déconnexion</button>
    </div>
  </aside>

  <main class="content">
    <header class="topbar">
      <h1>Tous les articles</h1>
      <button class="btn-primary" on:click={newArticle}>+ Nouvel Article</button>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each articles as article}
            <tr>
              <td><strong>{article.title}</strong></td>
              <td><span class="badge category">{article.category}</span></td>
              <td>
                <span class="badge status {article.status === 'Publié' ? 'pub' : 'draft'}">
                  {article.status}
                </span>
              </td>
              <td>{article.date}</td>
              <td>
                <button class="btn-action edit" on:click={() => editArticle(article.id)}>Éditer</button>
                <button class="btn-action delete">Supprimer</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
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
  nav {
    flex: 1;
    padding: 20px 0;
  }
  nav a {
    display: block;
    padding: 12px 20px;
    color: #4a5568;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: background 0.2s;
  }
  nav a:hover, nav a.active {
    background: #fffaf4;
    color: #F68B1E;
    border-right: 3px solid #F68B1E;
  }
  .logout {
    padding: 20px;
    border-top: 1px solid #e2e8f0;
  }
  .logout button {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    color: #4a5568;
    font-weight: 600;
    cursor: pointer;
  }
  .logout button:hover {
    background: #edf2f7;
  }

  .content {
    flex: 1;
    padding: 40px;
  }
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .topbar h1 {
    font-size: 24px;
    color: #2d3748;
    margin: 0;
  }
  .btn-primary {
    background: #F68B1E;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
  }
  .btn-primary:hover {
    background: #d97706;
  }

  .table-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background: #f7fafc;
    text-align: left;
    padding: 15px 20px;
    font-size: 12px;
    text-transform: uppercase;
    color: #718096;
    border-bottom: 1px solid #e2e8f0;
  }
  td {
    padding: 15px 20px;
    font-size: 14px;
    color: #2d3748;
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child td {
    border-bottom: none;
  }
  .badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
  }
  .badge.category {
    background: #edf2f7;
    color: #4a5568;
  }
  .badge.status.pub {
    background: #c6f6d5;
    color: #22543d;
  }
  .badge.status.draft {
    background: #feebc8;
    color: #7b341e;
  }
  .btn-action {
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    margin-right: 10px;
  }
  .btn-action.edit {
    color: #3182ce;
  }
  .btn-action.delete {
    color: #e53e3e;
  }
</style>
