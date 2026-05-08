<script>
  import { onMount } from 'svelte';
  import { db } from './lib/firebase';
  import { collection, query, where, getDocs, limit } from 'firebase/firestore';

  let { onNavigate } = $props();
  let article = $state(null);
  let isLoading = $state(true);

  function goHome(e) {
    if (e) e.preventDefault();
    onNavigate('/blog/');
  }

  onMount(async () => {
    const pathParts = window.location.pathname.split('/');
    const slug = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    
    if (slug) {
      const q = query(collection(db, "articles"), where("slug", "==", slug), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        article = querySnapshot.docs[0].data();
      }
    }
    isLoading = false;
  });
</script>

<svelte:head>
  {#if article}
    <title>{article.title} | Jumia CI</title>
    <meta name="description" content={article.title} />
  {/if}
</svelte:head>

<!-- CAT NAV BAR -->
<nav class="cat-bar" aria-label="Catégories du blog">
  <div class="cat-bar-inner">
    <div class="cat-all" onclick={goHome} role="button" tabindex="0" onkeydown={e => e.key === 'Enter' && goHome(e)}>☰ &nbsp;Toutes les catégories</div>
    <ul class="cat-list">
      <li class="cat-item"><a href="/blog/tech/" class="cat-link active" onclick={goHome}>📱 Tech &amp; Smartphones</a></li>
      <li class="cat-item"><a href="/blog/electromenager/" class="cat-link" onclick={goHome}>🏠 Maison &amp; Électro</a></li>
      <li class="cat-item"><a href="/blog/beaute/" class="cat-link" onclick={goHome}>💄 Beauté &amp; Mode</a></li>
      <li class="cat-item"><a href="/blog/bebe-enfant/" class="cat-link" onclick={goHome}>👶 Bébé &amp; Enfant</a></li>
      <li class="cat-item"><a href="/blog/bons-plans/" class="cat-link" onclick={goHome}>🏷️ Bons Plans</a></li>
      <li class="cat-item"><a href="/blog/guide-achat/" class="cat-link" onclick={goHome}>📋 Guides d'achat</a></li>
    </ul>
  </div>
</nav>

{#if isLoading}
  <div style="padding: 100px; text-align: center;">Chargement de l'article...</div>
{:else if article}
  <!-- BREADCRUMB -->
  <div class="breadcrumb">
    <a href="/" onclick={goHome}>Accueil</a> › <a href="/" onclick={goHome}>Blog</a> › <a href="/blog/tech/">{article.category}</a> › {article.title}
  </div>

  <div class="page-layout">
    <div>
      <div class="article-wrap">
        <div class="article">
          <h1>{article.title}</h1>

          <div class="byline">
            <div class="avatar">J</div>
            <div>
              <strong>Equipe Jumia CI</strong><br>
              <span>Publié sur le Blog Jumia</span>
            </div>
          </div>

          {#if article.coverImage}
            <img src={article.coverImage} alt={article.title} style="width: 100%; border-radius: 8px; margin: 20px 0;" loading="eager"/>
          {/if}

          <div class="article-content">
            {@html article.content}
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div style="padding: 100px; text-align: center;">
    <h2>Article non trouvé</h2>
    <button class="btn-primary" onclick={goHome}>Retour à l'accueil</button>
  </div>
{/if}



<style>
/* ============================================
   RESET & BASE
   ============================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:global(html) { overflow-x: hidden; }
:global(body) {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  color: #2b2b2b;
  background: #f5f5f5;
  line-height: 1.6;
  font-size: 15px;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
}

a { color: #F68B1E; text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; height: auto; display: block; }

/* ============================================
   CAT NAV BAR
   ============================================ */
.cat-bar { 
  background: #fff; 
  border-bottom: 1px solid #e0e0e0; 
  position: sticky;
  top: 0;
  z-index: 100;
}
.cat-bar-inner {
  max-width: 1100px; 
  margin: 0 auto; 
  display: flex; 
  align-items: stretch;
  overflow-x: auto; 
  -webkit-overflow-scrolling: touch;
}
/* Masquer la barre de défilement mais garder la fonctionnalité */
.cat-bar-inner::-webkit-scrollbar {
  display: none;
}
.cat-all {
  display: flex; 
  align-items: center; 
  gap: 8px;
  background: #F68B1E; 
  color: #fff; 
  padding: 0 14px;
  font-size: 13px; 
  font-weight: 700; 
  cursor: pointer;
  white-space: nowrap; 
  flex-shrink: 0; 
  user-select: none;
}
.cat-list { 
  display: flex; 
  align-items: stretch; 
  list-style: none; 
}
.cat-item { position: relative; }
.cat-link {
  display: flex; 
  align-items: center; 
  gap: 4px;
  padding: 0 15px; 
  height: 45px; 
  font-size: 13px; 
  font-weight: 600;
  color: #333; 
  white-space: nowrap; 
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all .15s;
}
.cat-link:hover, .cat-link.active { 
  color: #F68B1E; 
  border-bottom-color: #F68B1E; 
  text-decoration: none; 
}

/* ============================================
   BREADCRUMB
   ============================================ */
.breadcrumb {
  max-width: 1100px; margin: 10px auto;
  padding: 0 16px; font-size: 12px; color: #999;
  white-space: normal; overflow-wrap: break-word;
}
.breadcrumb a { color: #777; }
.breadcrumb a:hover { color: #F68B1E; }

/* ============================================
   PAGE LAYOUT — mobile first, 1 colonne
   ============================================ */
.page-layout {
  max-width: 1100px; margin: 0 auto;
  padding: 0 16px 40px;
  display: flex; flex-direction: column; gap: 20px;
}

/* ============================================
   ARTICLE WRAP
   ============================================ */
.article-wrap {
  background: #fff; border-radius: 4px;
  width: 100%; overflow: hidden;
}
.article { padding: 20px 16px 28px; }

/* Textes */
h1 {
  font-size: 22px; font-weight: 800;
  line-height: 1.3; margin: 0 0 14px; color: #1a1a1a;
  overflow-wrap: break-word;
}
.byline {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 18px; font-size: 13px; color: #777;
  padding-bottom: 14px; border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
}
.avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, #F68B1E, #ffd166);
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 700; color: #fff; font-size: 16px; flex-shrink: 0;
}
.byline strong { color: #333; }
.article p { font-size: 15px; margin-bottom: 14px; color: #2b2b2b; line-height: 1.75; overflow-wrap: break-word; }
.article h2 {
  font-size: 18px; font-weight: 800; margin: 24px 0 10px;
  padding-left: 10px; border-left: 4px solid #F68B1E;
  line-height: 1.3; color: #1a1a1a; overflow-wrap: break-word;
}
.article h3 { font-size: 16px; font-weight: 700; margin: 18px 0 7px; color: #222; overflow-wrap: break-word; }
.article ul, .article ol { margin: 0 0 14px 18px; }
.article li { margin-bottom: 7px; font-size: 15px; line-height: 1.65; overflow-wrap: break-word; }
.article strong { color: #1a1a1a; }

/* ============================================
   TABLE — scrollable sur mobile
   ============================================ */
.table-wrap {
  overflow-x: auto; margin: 14px -16px 20px;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px;
}
table {
  border-collapse: collapse; font-size: 13px;
  background: #fff; border: 1px solid #eee;
  width: max-content; min-width: 100%;
}
thead { background: #fff7ec; }
th {
  text-align: left; padding: 9px 12px; font-weight: 700;
  color: #333; border-bottom: 2px solid #F68B1E;
  font-size: 12px; text-transform: uppercase; letter-spacing: .3px;
  white-space: nowrap;
}
td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; font-size: 13px; }
tbody tr:hover { background: #fffaf4; }
.price { color: #F68B1E; font-weight: 700; white-space: nowrap; }
.tag-top { background: #F68B1E; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; white-space: nowrap; }
.tag-mid { background: #eee; color: #555; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 10px; white-space: nowrap; }
.table-note { font-size: 12px; color: #aaa; font-style: italic; margin-bottom: 16px; }

/* ============================================
   TIP / ALERT / DISCLAIMER
   ============================================ */
.tip { background: #FFF8E7; border-left: 4px solid #F68B1E; padding: 12px 16px; margin: 18px 0; border-radius: 0 4px 4px 0; }
.tip strong { display: block; margin-bottom: 5px; color: #b25b00; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; }
.tip p { font-size: 14px; margin: 0 0 7px; }
.tip p:last-child { margin: 0; }
.tip ul { margin: 5px 0 0 16px; }
.tip ul li { font-size: 14px; margin-bottom: 4px; }
.alert { background: #FFF0F0; border-left: 4px solid #e53e3e; padding: 12px 16px; margin: 18px 0; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.65; overflow-wrap: break-word; }
.alert strong { color: #c53030; }
.disclaimer { background: #FFF8E7; border-left: 4px solid #F68B1E; padding: 11px 14px; margin: 0 0 18px; border-radius: 0 4px 4px 0; font-size: 13px; line-height: 1.6; overflow-wrap: break-word; }

/* ============================================
   VERDICT GRID
   ============================================ */
.verdict-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin: 14px 0 20px; }
.verdict-card { background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 13px 14px; border-top: 4px solid #F68B1E; }
.verdict-card .name { font-weight: 800; font-size: 14px; color: #1a1a1a; margin-bottom: 2px; }
.verdict-card .for-who { font-size: 12px; color: #F68B1E; font-weight: 600; margin-bottom: 6px; }
.verdict-card p { font-size: 13px; color: #555; margin: 0; line-height: 1.5; }

/* ============================================
   CTA
   ============================================ */
.cta {
  display: block; background: #F68B1E; color: #fff;
  padding: 13px 20px; border-radius: 4px; font-weight: 700;
  font-size: 15px; margin: 6px 0; transition: background .15s;
  text-align: center; width: 100%;
}
.cta:hover { background: #d97706; color: #fff; text-decoration: none; }
.cta-block { margin: 22px 0; }

/* ============================================
   FAQ
   ============================================ */
details { background: #f9f9f9; border: 1px solid #eee; border-radius: 4px; margin-bottom: 8px; padding: 11px 14px; }
details summary { font-weight: 700; cursor: pointer; font-size: 14px; list-style: none; display: flex; justify-content: space-between; align-items: center; overflow-wrap: break-word; }
details summary::-webkit-details-marker { display: none; }
details summary::after { content: "+"; font-size: 20px; color: #F68B1E; font-weight: 400; flex-shrink: 0; margin-left: 8px; }
details[open] summary::after { content: "−"; }
details p { margin-top: 9px; font-size: 14px; color: #555; line-height: 1.65; overflow-wrap: break-word; }

/* ============================================
   SIGNATURE
   ============================================ */
.signature { font-size: 13px; color: #aaa; font-style: italic; margin-top: 24px; padding-top: 14px; border-top: 1px solid #f0f0f0; }

/* ============================================
   RELATED CARDS
   ============================================ */
.related-hdr { font-size: 17px; font-weight: 800; margin-bottom: 12px; color: #1a1a1a; }
.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
.card { background: #fff; border: 1px solid #eee; border-radius: 6px; overflow: hidden; transition: box-shadow .15s; display: flex; align-items: stretch; }
.card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.1); }
.card-img { width: 80px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.card-body { padding: 10px 12px; flex: 1; }
.card-body h4 { font-size: 13px; font-weight: 700; margin-bottom: 5px; line-height: 1.35; color: #222; overflow-wrap: break-word; }
.card-body h4:hover { color: #E07B10; }
.card-body small { color: #aaa; font-size: 11px; }

/* ============================================
   PRODUCTS GRID
   ============================================ */
.products-hdr { font-size: 17px; font-weight: 800; margin-bottom: 12px; color: #1a1a1a; }
.prod-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.prod-card { background: #fff; border: 1px solid #eee; border-radius: 4px; padding: 10px; text-align: center; transition: box-shadow .15s; }
.prod-card:hover { box-shadow: 0 3px 10px rgba(0,0,0,.09); }
.prod-img { height: 70px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.prod-card h5 { font-size: 12px; font-weight: 600; margin: 5px 0 3px; line-height: 1.3; color: #222; overflow-wrap: break-word; }
.prod-price { font-size: 11px; color: #aaa; margin-bottom: 5px; }
.prod-cta { display: block; background: #F68B1E; color: #fff; padding: 6px 4px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-top: 5px; transition: background .15s; }
.prod-cta:hover { background: #E07B10; text-decoration: none; }

/* ============================================
   SIDEBAR
   ============================================ */
.sidebar { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.sb-block { background: #fff; border: 1px solid #e8e8e8; border-radius: 4px; overflow: hidden; }
.sb-hdr { padding: 8px 12px; border-bottom: 1px solid #eee; background: #f9f9f9; font-size: 13px; font-weight: 700; color: #333; border-left: 4px solid #F68B1E; }
.sb-body { padding: 10px 12px; }
.sb-nav-link { display: flex; align-items: center; gap: 8px; padding: 7px 12px; font-size: 12px; color: #666; transition: background .1s; }
.sb-nav-link:hover { background: #FFF8E7; color: #F68B1E; text-decoration: none; }
.sb-pop { display: flex; flex-direction: column; }
.sb-pop-item { display: flex; gap: 8px; align-items: flex-start; padding: 8px 12px; border-bottom: 1px solid #f0f0f0; transition: background .1s; }
.sb-pop-item:last-child { border-bottom: none; }
.sb-pop-item:hover { background: #FFF8E7; }
.sb-pop-n { font-size: 15px; font-weight: 700; color: #ddd; line-height: 1; flex-shrink: 0; width: 20px; }
.sb-pop-t { font-size: 12px; font-weight: 600; color: #333; margin-bottom: 2px; line-height: 1.35; overflow-wrap: break-word; }
.sb-pop-t:hover { color: #E07B10; }
.sb-pop-m { font-size: 11px; color: #aaa; }
.sb-cta-block { background: #F68B1E; border-radius: 4px; padding: 14px; text-align: center; }
.sb-cta-block h3 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 5px; line-height: 1.3; }
.sb-cta-block p { font-size: 12px; color: rgba(255,255,255,.85); margin-bottom: 10px; line-height: 1.5; }
.sb-cta-block a { display: block; background: #fff; color: #E07B10; font-size: 13px; font-weight: 700; padding: 8px; border-radius: 4px; }
.sb-cta-block a:hover { background: #FFF8E7; text-decoration: none; }
.sb-nl h3 { font-size: 13px; font-weight: 700; color: #333; margin-bottom: 4px; }
.sb-nl p { font-size: 12px; color: #777; margin-bottom: 8px; line-height: 1.5; }
.sb-nl input { width: 100%; border: 1px solid #e0e0e0; border-radius: 4px; padding: 7px 9px; font-size: 12px; font-family: inherit; outline: none; margin-bottom: 5px; }
.sb-nl input:focus { border-color: #F68B1E; }
.sb-nl button { width: 100%; background: #F68B1E; color: #fff; border: none; border-radius: 4px; padding: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.sb-nl button:hover { background: #E07B10; }
.sb-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.sb-tag { background: #f5f5f5; border: 1px solid #e0e0e0; color: #666; font-size: 11px; padding: 3px 8px; border-radius: 2px; transition: all .12s; }
.sb-tag:hover { background: #FFF8E7; color: #E07B10; border-color: #F68B1E; text-decoration: none; }
.sb-del-row { display: flex; align-items: flex-start; gap: 7px; padding: 7px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; color: #666; }
.sb-del-row:last-child { border-bottom: none; padding-bottom: 0; }
.sb-del-row strong { display: block; color: #333; font-size: 12px; margin-bottom: 1px; }
.sb-del-ico { font-size: 14px; flex-shrink: 0; margin-top: 1px; }

/* ============================================
   TABLETTE (≥ 600px) — 2 colonnes verdicts
   ============================================ */
@media (min-width: 600px) {
  .article { padding: 24px 24px 32px; }
  h1 { font-size: 24px; }
  .article h2 { font-size: 20px; }
  .verdict-grid { grid-template-columns: 1fr 1fr; }
  .cards { grid-template-columns: repeat(3, 1fr); }
  .cards .card { flex-direction: column; }
  .cards .card-img { width: 100%; height: 100px; }
  .prod-grid { grid-template-columns: repeat(3, 1fr); }
}

/* ============================================
   DESKTOP (≥ 900px) — sidebar à droite
   ============================================ */
@media (min-width: 900px) {
  .cat-bar { display: block; }
  .page-layout {
    flex-direction: row;
    align-items: flex-start;
    padding: 0 20px 40px;
  }
  .article-wrap { flex: 1; min-width: 0; }
  .article { padding: 0 28px 36px; }
  h1 { font-size: 28px; }
  .article h2 { font-size: 20px; }
  .sidebar { width: 260px; flex-shrink: 0; }
  .cta { width: auto; display: inline-block; }
  .cta-block { text-align: center; }
  .prod-grid { grid-template-columns: repeat(5, 1fr); }
  .table-wrap { margin: 14px 0 20px; padding: 0; }
}

/* Suppression automatique des footers importés */
.article-content footer, 
.article-content .footer {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
</style>



