<script>
  import { onMount } from 'svelte';
  import { db } from './lib/firebase';
  import { collection, query, where, getDocs, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

  let { onNavigate } = $props();
  
  let articles = $state([]);
  let filteredArticles = $state([]);
  let popularArticles = $state([]);
  let selectedCategory = $state('Tous');
  let isLoading = $state(true);

  // --- NEWSLETTER STATE ---
  let nlPrenom = $state('');
  let nlEmail = $state('');
  let nlStatus = $state(''); // '', 'loading', 'success', 'error'
  let nlMessage = $state('');

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!nlEmail) return;
    
    nlStatus = 'loading';
    nlMessage = '';

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        prenom: nlPrenom,
        email: nlEmail,
        subscribedAt: serverTimestamp()
      });

      nlStatus = 'success';
      nlMessage = 'Inscription réussie ! Vous recevrez nos bons plans.';
      nlPrenom = '';
      nlEmail = '';
    } catch (error) {
      console.error('Newsletter error:', error);
      nlStatus = 'error';
      nlMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
    }
  }

  // Mapping des catégories pour la correspondance avec Firestore
  const catMap = {
    'Tech': 'Tech & Smartphones',
    'Maison': 'Maison & Électro',
    'Agriculture': 'Agriculture',
    'Sport': 'Sport',
    'Beauté': 'Beauté & Mode',
    'Bébé': 'Bébé & Enfant',
    'Bons Plans': 'Bons Plans',
    'Guides': 'Guides d\'achat'
  };

  async function fetchArticles() {
    isLoading = true;
    try {
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      applyFilter();
    } catch (e) {
      console.error("Erreur articles:", e);
    }
    isLoading = false;
  }

  async function fetchPopularArticles() {
    try {
      const q = query(collection(db, "articles"), orderBy("views", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      popularArticles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Erreur populaires:", e);
      // Fallback si pas encore de champ views
      popularArticles = articles.slice(0, 5);
    }
  }

  function selectCategory(cat) {
    selectedCategory = cat;
    applyFilter();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  function applyFilter() {
    if (selectedCategory === 'Tous') {
      filteredArticles = articles;
    } else {
      const dbCat = catMap[selectedCategory] || selectedCategory;
      filteredArticles = articles.filter(a => a.category === dbCat);
    }
  }

  function openArticle(slug) {
    onNavigate(`/blog/${slug}`);
  }

  onMount(() => {
    fetchArticles();
    fetchPopularArticles();

    // Logic for menu clicks (if any needed in future)
    return () => {};
  });
</script>

<svelte:head>
  <title>Blog Jumia CI — Conseils, Bons Plans &amp; Guides d'achat</title>
  <meta name="description" content="Conseils d'achat, comparatifs tech, bons plans et guides pratiques pour acheter malin sur Jumia CI."/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="https://www.jumia.ci/blog/"/>
  <meta property="og:title" content="Blog Jumia CI — Conseils &amp; Bons Plans"/>
  <meta property="og:type" content="website"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Blog","name":"Blog Jumia CI","description":"Conseils d'achat, comparatifs et bons plans pour les consommateurs en Côte d'Ivoire.","url":"https://www.jumia.ci/blog/","publisher":{"@type":"Organization","name":"Jumia Côte d'Ivoire","url":"https://www.jumia.ci"},"inLanguage":"fr-CI"}
  </script>
</svelte:head>


<!-- CAT NAV BAR -->
<nav class="cat-bar" aria-label="Catégories du blog">
  <div class="cat-bar-inner">
    <div class="cat-all" onclick={() => selectCategory('Tous')} role="button" tabindex="0">☰ &nbsp;Toutes les catégories</div>
    <ul class="cat-list">

      <li class="cat-item">
        <button class="cat-link {selectedCategory === 'Tech' ? 'active' : ''}" onclick={() => selectCategory('Tech')}>📱 Tech &amp; Smartphones</button>
      </li>

      <li class="cat-item">
        <button class="cat-link {selectedCategory === 'Maison' ? 'active' : ''}" onclick={() => selectCategory('Maison')}>🏠 Maison &amp; Électro</button>
      </li>

      <li class="cat-item">
        <button class="cat-link {selectedCategory === 'Beauté' ? 'active' : ''}" onclick={() => selectCategory('Beauté')}>💄 Beauté &amp; Mode</button>
      </li>

      <li class="cat-item">
        <button class="cat-link {selectedCategory === 'Bébé' ? 'active' : ''}" onclick={() => selectCategory('Bébé')}>👶 Bébé &amp; Enfant</button>
      </li>

      <li class="cat-item">
        <button class="cat-link {selectedCategory === 'Bons Plans' ? 'active' : ''}" onclick={() => selectCategory('Bons Plans')}>🏷️ Bons Plans</button>
      </li>

      <li class="cat-item">
        <button class="cat-link" onclick={() => selectCategory('Guides')}>📋 Guides d'achat</button>
      </li>

    </ul>
  </div>
</nav>

<nav class="breadcrumb" aria-label="Fil d'ariane">
  <div class="bc-inner">
    <a href="/blog/" onclick={(e) => { e.preventDefault(); onNavigate('/blog/'); }}>Accueil</a>
    <span>›</span>
    <span>Blog</span>
  </div>
</nav>

<!-- PAGE -->
<div class="page">

  <!-- BLOG BANNER -->
  <div class="blog-banner">
    <div class="bb-left">
      <h1>Blog <span>Jumia CI</span></h1>
      <p>Conseils d'achat, comparatifs produits et bons plans — pour commander malin sur Jumia CI, à Abidjan comme en province.</p>
    </div>
  </div>

  <!-- TOPIC PILLS -->
  <div class="pills">
    <span class="pills-lbl">Filtrer :</span>
    <button class="pill {selectedCategory === 'Tous' ? 'on' : ''}" onclick={() => selectCategory('Tous')}>Tous</button>
    <button class="pill {selectedCategory === 'Tech' ? 'on' : ''}" onclick={() => selectCategory('Tech')}>📱 Tech</button>
    <button class="pill {selectedCategory === 'Maison' ? 'on' : ''}" onclick={() => selectCategory('Maison')}>🏠 Maison</button>
    <button class="pill {selectedCategory === 'Agriculture' ? 'on' : ''}" onclick={() => selectCategory('Agriculture')}>🌾 Agriculture</button>
    <button class="pill {selectedCategory === 'Sport' ? 'on' : ''}" onclick={() => selectCategory('Sport')}>⚽ Sport</button>
    <button class="pill {selectedCategory === 'Beauté' ? 'on' : ''}" onclick={() => selectCategory('Beauté')}>💄 Beauté</button>
    <button class="pill {selectedCategory === 'Bébé' ? 'on' : ''}" onclick={() => selectCategory('Bébé')}>👶 Bébé</button>
    <button class="pill {selectedCategory === 'Bons Plans' ? 'on' : ''}" onclick={() => selectCategory('Bons Plans')}>🏷️ Bons Plans</button>
    <button class="pill {selectedCategory === 'Guides' ? 'on' : ''}" onclick={() => selectCategory('Guides')}>📋 Guides</button>
  </div>

  <!-- MAIN + SIDEBAR -->
  <div class="content-grid">

    <main>
      {#if selectedCategory !== 'Tous' || filteredArticles.length > 0}
        <div class="sec-h">
          <span class="sec-h-title">
            {selectedCategory === 'Tous' ? 'Dernières publications' : `Articles : ${catMap[selectedCategory] || selectedCategory}`}
          </span>
        </div>
        
        {#if isLoading}
          <div style="padding: 40px; text-align: center; color: #999;">Chargement des articles...</div>
        {:else if filteredArticles.length === 0}
          <div style="padding: 60px; text-align: center; background: #fff; border-radius: 8px; border: 1px dashed #ccc; margin-bottom: 20px;">
            <div style="font-size: 40px; margin-bottom: 15px;">🔍</div>
            <p style="color: #666;">Aucun article trouvé dans la catégorie <strong>{selectedCategory}</strong> pour le moment.</p>
            <button class="pill on" style="margin-top: 15px; border: none; cursor: pointer;" onclick={() => selectCategory('Tous')}>Voir tout le blog</button>
          </div>
        {:else}
          {#if selectedCategory === 'Tous'}
            <div class="carousel-container">
              <div class="carousel-track">
                {#each [...filteredArticles].sort((a, b) => (b.publishedAt?.seconds || b.createdAt?.seconds || 0) - (a.publishedAt?.seconds || a.createdAt?.seconds || 0)).slice(0, 5) as art}
                  <article class="acard carousel-item" onclick={() => openArticle(art.slug)} style="cursor: pointer;">
                    <div class="ac-img" style="background: #eee; overflow: hidden;">
                      {#if art.coverImage}
                        <img src={art.coverImage} alt={art.title} style="width: 100%; height: 100%; object-fit: cover;" />
                      {:else}
                        <span>📄</span>
                      {/if}
                    </div>
                    <div class="ac-body">
                      <div class="ac-cat">{art.category}</div>
                      <div class="ac-title" style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">{art.title}</div>
                      <div class="ac-meta">
                        <div class="ac-author"><div class="avc">V</div><span>Vanessa de Jumia</span></div>
                        <span>{new Date((art.publishedAt?.seconds || art.createdAt?.seconds) * 1000).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </article>
                {/each}
              </div>
            </div>
          {:else}
            <div class="g2" style="margin-bottom:24px;">
              {#each filteredArticles as art}
                <article class="acard" onclick={() => openArticle(art.slug)} style="cursor: pointer;">
                  <div class="ac-img" style="background: #eee; overflow: hidden;">
                    {#if art.coverImage}
                      <img src={art.coverImage} alt={art.title} style="width: 100%; height: 100%; object-fit: cover;" />
                    {:else}
                      <span>📄</span>
                    {/if}
                  </div>
                  <div class="ac-body">
                    <div class="ac-cat">{art.category}</div>
                    <div class="ac-title" style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">{art.title}</div>
                    <div class="ac-meta">
                      <div class="ac-author"><div class="avc">V</div><span>Vanessa de Jumia</span></div>
                      <span>{new Date((art.publishedAt?.seconds || art.createdAt?.seconds) * 1000).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </article>
              {/each}
            </div>
          {/if}
        {/if}
      {/if}

      {#if selectedCategory === 'Tous'}
        <!-- HERO (ONLY ON HOME) -->
        <div class="sec-h"><span class="sec-h-title">✦ Article à la une</span></div>
        <a href="/blog/tech/smartphones-100000-fcfa-2026/" class="hero-card" onclick={e => { e.preventDefault(); onNavigate('/blog/tech/smartphones-100000-fcfa-2026/'); }}>
          <div class="hc-img" style="padding:0;overflow:hidden;"><img src="/hero_smartphones_cover.jpg" alt="Femme ivoirienne comparant des smartphones à moins de 100 000 FCFA" style="width:100%;height:100%;object-fit:cover;" loading="eager"/><span class="badge">Nouveau</span></div>
          <div class="hc-body">
            <div class="hc-cat">📱 Smartphones · Comparatif 2026</div>
            <div class="hc-title">Smartphones à moins de 100 000 FCFA en Côte d'Ivoire : mon comparatif honnête 2026</div>
            <p class="hc-excerpt">J'ai testé 8 modèles disponibles sur Jumia CI pour trouver le meilleur rapport qualité-prix. Le résultat m'a surprise — et pas toujours dans le bon sens.</p>
            <div class="hc-meta"><div class="avc">V</div><span>Vanessa</span><span>·</span><span>3 mai 2026</span><span>·</span><span>5 min de lecture</span></div>
            <span class="hc-cta">Lire l'article →</span>
          </div>
        </a>

        <!-- SÉLECTION SEMAINE -->
        <div class="sec-h"><span class="sec-h-title">✦ Sélection de la semaine</span><a href="/blog/tous-les-articles/" class="sec-h-link">Tous les articles →</a></div>
        <div class="g3" style="margin-bottom:12px;">
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);">❄️<span class="badge">Populaire</span></div>
            <div class="ac-body">
              <div class="ac-cat">🏠 Électroménager</div>
              <a href="/blog/electromenager/climatiseur-2026/"><div class="ac-title">Climatiseur en Côte d'Ivoire : comment choisir sans se faire arnaquer</div></a>
              <p class="ac-excerpt">BTU, inverter, marques à éviter… tout ce que j'aurais voulu savoir avant d'acheter le mien.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>6 min · 28 avr.</span></div>
            </div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);">⚡</div>
            <div class="ac-body">
              <div class="ac-cat">⚡ Énergie</div>
              <a href="/blog/electromenager/onduleur-inverter-2026/"><div class="ac-title">Onduleur vs inverter en CI : lequel choisir pour survivre aux délestages ?</div></a>
              <p class="ac-excerpt">Avec les coupures de courant, beaucoup se posent la question. Voici ma réponse après deux achats ratés.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>7 min · 21 avr.</span></div>
            </div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD9);">💋</div>
            <div class="ac-body">
              <div class="ac-cat">💄 Beauté</div>
              <a href="/blog/beaute/maquillage-peaux-noires-2026/"><div class="ac-title">Maquillage pour peaux noires : mes produits préférés sur Jumia CI 2026</div></a>
              <p class="ac-excerpt">Le bon fond de teint c'est pas facile à trouver. Voici ce qui m'a vraiment convaincue.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>5 min · 15 avr.</span></div>
            </div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#FFF8E1,#FFECB3);">👶</div>
            <div class="ac-body">
              <div class="ac-cat">👶 Bébé</div>
              <a href="/blog/bebe/poussette-abidjan-2026/"><div class="ac-title">Choisir une poussette pour Abidjan : les critères que personne ne mentionne</div></a>
              <p class="ac-excerpt">Les trottoirs, les marchés, les rues en terre… j'aurais voulu qu'on me prévienne avant.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>6 min · 2 mai</span></div>
            </div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#EDE7F6,#D1C4E9);">💻</div>
            <div class="ac-body">
              <div class="ac-cat">💻 Ordinateurs</div>
              <a href="/blog/tech/ordinateur-etudiant-2026/"><div class="ac-title">PC portable pour étudiant ivoirien : le guide complet 2026</div></a>
              <p class="ac-excerpt">Budget 150 000 à 350 000 FCFA : voici ce qu'on peut vraiment avoir.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>8 min · 10 avr.</span></div>
            </div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#FFCCBC,#FFAB91);">🏷️<span class="badge">Cette semaine</span></div>
            <div class="ac-body">
              <div class="ac-cat">🏷️ Bons Plans</div>
              <a href="/blog/bons-plans/promo-mai-2026/"><div class="ac-title">Promotions mai 2026 sur Jumia CI : les 12 deals à ne pas manquer</div></a>
              <p class="ac-excerpt">Smartphones, électro, beauté… on a sélectionné les vraies bonnes affaires de la semaine.</p>
              <div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa de Jumia</span></div><span>3 min · 4 mai</span></div>
            </div>
          </article>
        </div>

        <!-- TECH -->
        <div class="sec-h"><span class="sec-h-title">📱 Tech &amp; Smartphones</span><a href="/blog/tech/" class="sec-h-link">Voir tout →</a></div>
        <div class="g2" style="margin-bottom:12px;">
          <article class="hcard">
            <div class="hc-i" style="background:linear-gradient(135deg,#E8EAF6,#C5CAE9);">🍎</div>
            <div class="hc-b"><div class="ac-cat">📱 Smartphones</div><a href="/blog/tech/iphone-occasion-ci/"><div class="ac-title">iPhone occasion sur Jumia CI : arnaque ou bonne affaire ? Les 5 vérifications à faire</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min · 19 avr. 2026</div></div>
          </article>
          <article class="hcard">
            <div class="hc-i" style="background:linear-gradient(135deg,#E0F2F1,#B2DFDB);">🎧</div>
            <div class="hc-b"><div class="ac-cat">🔌 Accessoires</div><a href="/blog/tech/ecouteurs-bluetooth-30000/"><div class="ac-title">Écouteurs Bluetooth à moins de 30 000 FCFA : les 4 qui valent vraiment le coup</div></a><div class="hc-b ac-meta-s">Vanessa · 5 min · 5 avr. 2026</div></div>
          </article>
          <article class="hcard">
            <div class="hc-i" style="background:linear-gradient(135deg,#FFF3E0,#FFE0B2);">📡</div>
            <div class="hc-b"><div class="ac-cat">📡 Réseau</div><a href="/blog/tech/4g-operateurs-ci-2026/"><div class="ac-title">Orange, MTN, Moov en CI : quel opérateur a la meilleure 4G en 2026 ?</div></a><div class="hc-b ac-meta-s">Vanessa · 6 min · 1 avr. 2026</div></div>
          </article>
          <article class="hcard">
            <div class="hc-i" style="background:linear-gradient(135deg,#F3E5F5,#E1BEE7);">🎮</div>
            <div class="hc-b"><div class="ac-cat">🎮 Gaming</div><a href="/blog/tech/manette-ps5-jumia-ci/"><div class="ac-title">Manette PS5 sur Jumia CI : originale ou compatible ? Ce qu'on a testé</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min · 28 mars 2026</div></div>
          </article>
        </div>

        <!-- MAISON -->
        <div class="sec-h"><span class="sec-h-title">🏠 Maison &amp; Électroménager</span><a href="/blog/electromenager/" class="sec-h-link">Voir tout →</a></div>
        <div class="g3" style="margin-bottom:12px;">
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#FFF8E1,#FFE082);">☀️</div>
            <div class="ac-body"><div class="ac-cat">⚡ Énergie</div><a href="/blog/electromenager/panneau-solaire-ci/"><div class="ac-title">Panneau solaire pour la maison en CI : par où commencer ?</div></a><p class="ac-excerpt">Les kits à moins de 200 000 FCFA qui changent vraiment la vie pendant les délestages.</p><div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>6 min · 4 mai</span></div></div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#FFCCBC,#FFAB91);">🍳</div>
            <div class="ac-body"><div class="ac-cat">🍳 Cuisine</div><a href="/blog/electromenager/cuisiniere-gaz-electrique/"><div class="ac-title">Cuisinière gaz ou électrique en CI : le vrai choix selon ton quartier</div></a><p class="ac-excerpt">J'ai changé trois fois. Voici ce que j'aurais voulu savoir avant.</p><div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>5 min · 8 avr.</span></div></div>
          </article>
          <article class="acard">
            <div class="ac-img" style="background:linear-gradient(135deg,#B3E5FC,#81D4FA);">🧺</div>
            <div class="ac-body"><div class="ac-cat">🧺 Linge</div><a href="/blog/electromenager/machine-laver-300000/"><div class="ac-title">Machine à laver à moins de 300 000 FCFA : les 3 modèles recommandés</div></a><p class="ac-excerpt">Charge frontale ou top ? Marque locale ou internationale ? Ma réponse honnête.</p><div class="ac-meta"><div class="ac-author"><div class="avc">V</div><span>Vanessa</span></div><span>6 min · 1 avr.</span></div></div>
          </article>
        </div>

        <!-- BEAUTÉ + BÉBÉ -->
        <div class="g2" style="margin-bottom:12px;">
          <div>
            <div class="sec-h" style="margin-bottom:8px;"><span class="sec-h-title">💄 Beauté &amp; Mode</span><a href="/blog/beaute/" class="sec-h-link">Tout voir →</a></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD9);">💋</div><div class="hc-b"><div class="ac-cat">💄 Maquillage</div><a href="/blog/beaute/maquillage-peaux-noires/"><div class="ac-title">Maquillage peaux noires : mes produits préférés sur Jumia CI</div></a><div class="hc-b ac-meta-s">Vanessa · 5 min</div></div></article>
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#E8EAF6,#C5CAE9);">👗</div><div class="hc-b"><div class="ac-cat">👗 Mode femme</div><a href="/blog/beaute/bureau-abidjan-2026/"><div class="ac-title">S'habiller pour le bureau à Abidjan en 2026 : le guide de Vanessa</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min</div></div></article>
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#FFFDE7,#FFF9C4);">👠</div><div class="hc-b"><div class="ac-cat">👠 Chaussures</div><a href="/blog/beaute/chaussures-homme-cuir/"><div class="ac-title">Chaussures cuir homme sur Jumia CI : les modèles qui durent</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min</div></div></article>
            </div>
          </div>
          <div>
            <div class="sec-h" style="margin-bottom:8px;"><span class="sec-h-title">👶 Bébé &amp; Enfant</span><a href="/blog/bebe-enfant/" class="sec-h-link">Tout voir →</a></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#FFF8E1,#FFECB3);">🛒</div><div class="hc-b"><div class="ac-cat">🍼 Bébé</div><a href="/blog/bebe/poussette-abidjan/"><div class="ac-title">Choisir une poussette pour Abidjan : les critères que personne ne mentionne</div></a><div class="hc-b ac-meta-s">Vanessa · 6 min</div></div></article>
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#FFF0DC,#FFD89B);">🍼</div><div class="hc-b"><div class="ac-cat">🍼 Bébé</div><a href="/blog/bebe/couches-bebe-ci/"><div class="ac-title">Couches bébé sur Jumia CI : le meilleur rapport qualité-prix 2026</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min</div></div></article>
              <article class="hcard"><div class="hc-i" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);">🎒</div><div class="hc-b"><div class="ac-cat">🎒 École</div><a href="/blog/enfant/cartable-rentree-2026/"><div class="ac-title">Cartable rentrée scolaire à moins de 15 000 FCFA : sélection 2026</div></a><div class="hc-b ac-meta-s">Vanessa · 4 min</div></div></article>
            </div>
          </div>
        </div>

        <!-- NEWSLETTER BANNER -->
        <div class="nl-banner">
          <div><h2>Bons plans &amp; nouveaux articles chaque semaine</h2><p>Reçois les meilleurs conseils du Blog Jumia CI dans ta boîte mail. Zéro spam, désinscription en 1 clic.</p></div>
          <div>
            <form class="nl-form" onsubmit={handleNewsletterSubmit}>
              <input type="text" placeholder="Ton prénom" bind:value={nlPrenom} disabled={nlStatus === 'loading'}/>
              <input type="email" placeholder="Ton adresse email" required bind:value={nlEmail} disabled={nlStatus === 'loading'}/>
              <button type="submit" disabled={nlStatus === 'loading'}>
                {nlStatus === 'loading' ? '⏳ Inscription...' : '✉️ S\'inscrire gratuitement'}
              </button>
              <span class="nl-note">🔒 Tes données sont protégées</span>
              {#if nlStatus === 'success'}
                <div style="color: #4CAF50; font-size: 13px; font-weight: 600; margin-top: 8px;">✅ {nlMessage}</div>
              {:else if nlStatus === 'error'}
                <div style="color: #F44336; font-size: 13px; font-weight: 600; margin-top: 8px;">❌ {nlMessage}</div>
              {/if}
            </form>
          </div>
        </div>

        <!-- GUIDES PRATIQUES -->
        <div class="sec-h"><span class="sec-h-title">📋 Guides pratiques Jumia CI</span><a href="/blog/guide-achat/" class="sec-h-link">Tous les guides →</a></div>
        <div class="guide-grid">
          <a href="/blog/livraison-guide/" class="guide-card"><div class="g-ico">🚚</div><div class="g-txt"><h3>Comment fonctionne la livraison Jumia CI ?</h3><p>Domicile, points relais, délais, frais — tout avant de commander.</p></div></a>
          <a href="/blog/paiement-mobile-money/" class="guide-card"><div class="g-ico">📲</div><div class="g-txt"><h3>Payer avec Wave, Orange Money ou MTN MoMo</h3><p>Guide étape par étape pour ne pas bloquer au paiement.</p></div></a>
          <a href="/blog/acheter-occasion-jumia/" class="guide-card"><div class="g-ico">♻️</div><div class="g-txt"><h3>Acheter de l'occasion sur Jumia CI sans risque</h3><p>Les 7 questions à poser au vendeur avant de valider.</p></div></a>
          <a href="/blog/points-relais-ci/" class="guide-card"><div class="g-ico">📍</div><div class="g-txt"><h3>Trouver un point relais près de chez toi</h3><p>Abidjan, Bouaké, Yamoussoukro, San-Pédro, Korhogo…</p></div></a>
          <a href="/blog/retour-remboursement/" class="guide-card"><div class="g-ico">🔄</div><div class="g-txt"><h3>Retourner un produit sur Jumia CI</h3><p>La procédure exacte, les délais et les cas difficiles.</p></div></a>
          <a href="/blog/boutiques-officielles/" class="guide-card"><div class="g-ico">🏪</div><div class="g-txt"><h3>Reconnaître les boutiques officielles</h3><p>Samsung, Tecno, LG, Itel — les vraies boutiques de marque.</p></div></a>
        </div>
      {/if}
    </main>

    <!-- SIDEBAR -->
    <aside class="sb">


      <div class="sb-block">
        <div class="sb-hdr">Les plus lus</div>
        <div class="sb-pop">
          {#each popularArticles as art, i}
            <a href="/blog/{art.slug}" class="sb-pop-item" onclick={(e) => { e.preventDefault(); onNavigate(`/blog/${art.slug}`); }}>
              <span class="sb-pop-n">0{i + 1}</span>
              <div>
                <div class="sb-pop-t">{art.title}</div>
                <div class="sb-pop-m">Vanessa de Jumia · {new Date(art.createdAt?.seconds * 1000).toLocaleDateString('fr-FR')}</div>
              </div>
            </a>
          {/each}
          
          {#if popularArticles.length === 0}
            <div style="padding: 10px; font-size: 12px; color: #999;">Le classement arrive bientôt...</div>
          {/if}
        </div>
      </div>

      <div class="sb-cta">
        <div class="sb-cta-ico">🛒</div>
        <h3>Prêt à acheter ?</h3>
        <p>Livraison à domicile à Abidjan ou en point relais partout en CI.</p>
        <a href="https://www.jumia.ci">Aller sur Jumia CI →</a>
      </div>

      <div class="sb-block">
        <div class="sb-hdr">Livraison &amp; Paiement</div>
        <div class="sb-body">
          <div class="sb-del-row"><span class="sb-del-ico">🚚</span><div><strong>Livraison domicile</strong>Abidjan — 24 à 48h</div></div>
          <div class="sb-del-row"><span class="sb-del-ico">📍</span><div><strong>Point relais</strong>Partout en CI — Bouaké, Yamoussoukro, Korhogo…</div></div>
          <div class="sb-del-row"><span class="sb-del-ico">📲</span><div><strong>Mobile Money</strong>Wave · Orange Money · MTN MoMo</div></div>
          <div class="sb-del-row"><span class="sb-del-ico">💸</span><div><strong>Livraison offerte</strong>Panier ≥ 7 500 FCFA prépayé en point relais</div></div>
        </div>
      </div>

      <div class="sb-block">
        <div class="sb-hdr">✉️ Newsletter</div>
        <div class="sb-body sb-nl">
          <form onsubmit={handleNewsletterSubmit}>
            <h3>Bons plans chaque semaine</h3>
            <p>Les meilleurs articles directement dans ta boîte mail.</p>
            <input type="text" placeholder="Ton prénom" bind:value={nlPrenom} disabled={nlStatus === 'loading'}/>
            <input type="email" placeholder="Ton email" required bind:value={nlEmail} disabled={nlStatus === 'loading'}/>
            <button type="submit" disabled={nlStatus === 'loading'}>
              {nlStatus === 'loading' ? '⏳ En cours...' : 'S\'inscrire gratuitement'}
            </button>
            {#if nlStatus === 'success'}
              <div style="color: #4CAF50; font-size: 12px; font-weight: 600; margin-top: 8px; text-align: center;">✅ {nlMessage}</div>
            {:else if nlStatus === 'error'}
              <div style="color: #F44336; font-size: 12px; font-weight: 600; margin-top: 8px; text-align: center;">❌ {nlMessage}</div>
            {/if}
          </form>
        </div>
      </div>

      <div class="sb-block">
        <div class="sb-hdr">Mots-clés</div>
        <div class="sb-body">
          <div class="sb-tags">
            <a href="/blog/tag/samsung/" class="sb-tag">Samsung</a>
            <a href="/blog/tag/tecno/" class="sb-tag">Tecno</a>
            <a href="/blog/tag/iphone/" class="sb-tag">iPhone</a>
            <a href="/blog/tag/climatiseur/" class="sb-tag">Climatiseur</a>
            <a href="/blog/tag/wave/" class="sb-tag">Wave</a>
            <a href="/blog/tag/orange-money/" class="sb-tag">Orange Money</a>
            <a href="/blog/tag/bebe/" class="sb-tag">Bébé</a>
            <a href="/blog/tag/inverter/" class="sb-tag">Inverter</a>
            <a href="/blog/tag/solaire/" class="sb-tag">Solaire</a>
            <a href="/blog/tag/abidjan/" class="sb-tag">Abidjan</a>
            <a href="/blog/tag/4g/" class="sb-tag">4G</a>
            <a href="/blog/tag/promo/" class="sb-tag">Promo</a>
          </div>
        </div>
      </div>

    </aside>
  </div>
</div>



<style>
  :global(:root) {
    --orange:     #F68B1E;
    --orange-dk:  #E07B10;
    --orange-lt:  #FEF3E7;
    --white:      #FFFFFF;
    --bg:         #F5F5F5;
    --border:     #E0E0E0;
    --text:       #333333;
    --text-lt:    #666666;
    --text-xlt:   #999999;
    --radius:     4px;
    --font:       'Open Sans', Arial, sans-serif;
    --shadow:     0 1px 4px rgba(0,0,0,.10);
    --shadow-hov: 0 4px 16px rgba(0,0,0,.14);
  }
  :global(*), :global(*::before), :global(*::after) {box-sizing:border-box;margin:0;padding:0;}
  :global(html) {scroll-behavior:smooth;}
  :global(body) {
    font-family:var(--font);
    background:var(--bg);
    color:var(--text);
    font-size:14px;
    line-height:1.5;
    overflow-x: hidden;
    width: 100%;
  }
  :global(a) {text-decoration:none;color:inherit; word-break: break-word;}
  :global(img) {max-width:100%;display:block;height: auto;}
  :global(ul) {list-style:none;}



  .cat-bar { 
    background: var(--white); 
    border-bottom: 1px solid var(--border); 
    position: sticky;
    top: 0;
    z-index: 100;
    will-change: transform;
    transform: translateZ(0);
  }
  .cat-bar-inner {
    max-width: 1170px; 
    margin: 0 auto; 
    display: flex; 
    align-items: stretch;
    overflow-x: auto; 
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .cat-bar-inner::-webkit-scrollbar {
    display: none;
  }
  .cat-all {
    display: flex; 
    align-items: center; 
    gap: 8px; 
    background: var(--orange); 
    color: #fff; 
    padding: 0 16px; 
    font-size: 13px; 
    font-weight: 700; 
    cursor: pointer; 
    white-space: nowrap; 
    flex-shrink: 0; 
    user-select: none;
    border: none;
  }
  .cat-list { 
    display: flex; 
    align-items: stretch; 
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
    color: var(--text); 
    white-space: nowrap; 
    cursor: pointer; 
    background: none;
    border: none;
    border-bottom: 3px solid transparent; 
    transition: all .15s;
  }
  .cat-link:hover, .cat-link.active { 
    color: var(--orange); 
    border-bottom-color: var(--orange); 
  }

  /* BREADCRUMB */
  .breadcrumb{background:var(--white);border-bottom:1px solid var(--border);padding:8px 0;}
  .bc-inner{max-width:1170px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-xlt);}
  .bc-inner a{color:var(--text-lt);}
  .bc-inner a:hover{color:var(--orange);}

  /* PAGE */
  .page{max-width:1170px;margin:0 auto;padding:14px 16px;}

  /* BLOG BANNER */
  .blog-banner{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:20px;}
  .bb-left h1{font-size:20px;font-weight:700;color:var(--text);margin-bottom:4px;}
  .bb-left h1 span{color:var(--orange);}
  .bb-left p{font-size:13px;color:var(--text-lt);max-width:500px;line-height:1.5;}


  /* TOPIC PILLS */
  .pills{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px;align-items:center;}
  .pills-lbl{font-size:12px;color:var(--text-lt);font-weight:600;flex-shrink:0;}
  .pill{display:inline-flex;align-items:center;gap:4px;background:var(--white);border:1px solid var(--border);color:var(--text-lt);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;transition:all .12s;}
  .pill:hover{border-color:var(--orange);color:var(--orange);}
  .pill.on{background:var(--orange);border-color:var(--orange);color:#fff;}

  /* GRID */
  .content-grid{display:grid;grid-template-columns:1fr 276px;gap:14px;align-items:start;}

  /* SEC HEADER */
  .sec-h{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--white);border:1px solid var(--border);border-left:4px solid var(--orange);border-radius:var(--radius);margin-bottom:10px;}
  .sec-h-title{font-size:14px;font-weight:700;color:var(--text);}
  .sec-h-title:hover{color:var(--orange-dk);}
  .sec-h-link{font-size:12px;color:var(--orange);font-weight:600;}
  .sec-h-link:hover{text-decoration:underline;}

  /* HERO CARD */
  .hero-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:12px;display:grid;grid-template-columns:1fr 300px;transition:box-shadow .18s;}
  .hero-card:hover{box-shadow:var(--shadow-hov);}
  .hc-img{background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:68px;min-height:200px;height:100%;position:relative;overflow:hidden;}
  .hc-body{padding:18px;display:flex;flex-direction:column;justify-content:center;}
  .hc-cat{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--orange);margin-bottom:7px;}
  .hc-title{font-size:19px;font-weight:700;line-height:1.3;color:var(--text);margin-bottom:9px;}
  .hc-title:hover{color:var(--orange-dk);}
  .hc-excerpt{font-size:13px;color:var(--text-lt);line-height:1.6;margin-bottom:12px;}
  .hc-meta{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--text-xlt);margin-bottom:12px;}
  .hc-cta{display:inline-flex;align-items:center;gap:5px;background:var(--orange);color:#fff;padding:8px 16px;border-radius:var(--radius);font-size:13px;font-weight:600;align-self:flex-start;transition:background .15s;}
  .hc-cta:hover{background:var(--orange-dk);}

  /* CAROUSEL */
  .carousel-container { width: 100%; overflow: hidden; position: relative; margin-bottom: 24px; }
  .carousel-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; padding-bottom: 8px; }
  .carousel-track::-webkit-scrollbar { height: 6px; }
  .carousel-track::-webkit-scrollbar-track { background: var(--bg); border-radius: 3px; }
  .carousel-track::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  .carousel-track::-webkit-scrollbar-thumb:hover { background: var(--orange); }
  .carousel-item { scroll-snap-align: start; flex: 0 0 calc(50% - 8px); min-width: 280px; }

  /* ARTICLE CARDS */
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
  .acard{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:box-shadow .18s,transform .18s;display:flex;flex-direction:column;}
  .acard:hover{box-shadow:var(--shadow-hov);transform:translateY(-2px);}
  .ac-img{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:38px;position:relative;background:var(--bg);}
  .ac-img-md{aspect-ratio:16/8;font-size:52px;}
  .badge{position:absolute;top:8px;left:8px;background:var(--orange);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:2px;text-transform:uppercase;}
  .ac-body{padding:11px;flex:1;display:flex;flex-direction:column;}
  .ac-cat{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--orange);margin-bottom:5px;}
  .ac-title{font-size:13px;font-weight:700;line-height:1.35;color:var(--text);margin-bottom:6px;flex:1;}
  .ac-title:hover{color:var(--orange-dk);}
  .ac-excerpt{font-size:12px;color:var(--text-lt);line-height:1.5;margin-bottom:9px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ac-meta{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-xlt);border-top:1px solid var(--border);padding-top:8px;margin-top:auto;}
  .ac-author{display:flex;align-items:center;gap:4px;}
  .avc{width:18px;height:18px;border-radius:50%;background:var(--orange);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

  /* HCARD (horizontal) */
  .hcard{display:flex;gap:10px;align-items:flex-start;background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:10px;transition:box-shadow .15s;}
  .hcard:hover{box-shadow:var(--shadow-hov);}
  .hc-i{width:72px;height:58px;flex-shrink:0;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:26px;background:var(--bg);}
  .hc-b{flex:1;min-width:0;}
  .hc-b .ac-cat{margin-bottom:2px;}
  .hc-b .ac-title{font-size:13px;margin-bottom:3px;flex:none;}
  .hc-b .ac-meta-s{font-size:11px;color:var(--text-xlt);}

  /* SIDEBAR */
  .sb{display:flex;flex-direction:column;gap:10px;}
  .sb-block{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;}
  .sb-hdr{padding:9px 12px;border-bottom:1px solid var(--border);background:var(--bg);font-size:13px;font-weight:700;color:var(--text);border-left:4px solid var(--orange);}
  .sb-body{padding:10px 12px;}
  /* cat list */
  .sb-cats{display:flex;flex-direction:column;gap:1px;padding:4px 0;}
  .sb-cat{display:flex;align-items:center;justify-content:space-between;padding:7px 12px;font-size:13px;color:var(--text-lt);border-radius:var(--radius);transition:background .1s,color .1s;}
  .sb-cat:hover{background:var(--orange-lt);color:var(--orange-dk);}
  .sb-cat-l{display:flex;align-items:center;gap:6px;}

  /* popular */
  .sb-pop{display:flex;flex-direction:column;}
  .sb-pop-item{display:flex;gap:8px;align-items:flex-start;padding:9px 12px;border-bottom:1px solid var(--border);transition:background .1s;}
  .sb-pop-item:last-child{border-bottom:none;}
  .sb-pop-item:hover{background:var(--orange-lt);}
  .sb-pop-n {
    font-size: 24px; 
    font-weight: 800; 
    color: var(--orange); 
    line-height: 1; 
    flex-shrink: 0; 
    width: 32px;
    opacity: 0.3;
    transition: opacity .2s;
  }
  .sb-pop-item:hover .sb-pop-n {
    opacity: 1;
  }
  .sb-pop-t {
    font-size: 13px; 
    font-weight: 600; 
    line-height: 1.4; 
    color: var(--text); 
    margin-bottom: 3px;
    transition: color .2s;
  }
  .sb-pop-item:hover .sb-pop-t {
    color: var(--orange-dk);
  }
  .sb-pop-m { font-size: 11px; color: var(--text-xlt); }
  /* delivery */
  .sb-del-row{display:flex;align-items:flex-start;gap:7px;padding:7px 0;border-bottom:1px solid var(--border);font-size:12px;color:var(--text-lt);}
  .sb-del-row:last-child{border-bottom:none;padding-bottom:0;}
  .sb-del-row strong{display:block;color:var(--text);font-size:12px;margin-bottom:1px;}
  .sb-del-ico{font-size:14px;flex-shrink:0;margin-top:2px;}
  /* cta block */
  .sb-cta{background:var(--orange);border-radius:var(--radius);padding:14px;text-align:center;}
  .sb-cta-ico{font-size:26px;margin-bottom:7px;}
  .sb-cta h3{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px;line-height:1.3;}
  .sb-cta p{font-size:12px;color:rgba(255,255,255,.85);margin-bottom:10px;line-height:1.5;}
  .sb-cta a{display:block;background:#fff;color:var(--orange-dk);font-size:13px;font-weight:700;padding:8px;border-radius:var(--radius);}
  .sb-cta a:hover{background:var(--orange-lt);}
  /* newsletter mini */
  .sb-nl h3{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px;}
  .sb-nl p{font-size:12px;color:var(--text-lt);margin-bottom:9px;line-height:1.5;}
  .sb-nl input{width:100%;border:1px solid var(--border);border-radius:var(--radius);padding:7px 9px;font-size:12px;font-family:var(--font);outline:none;margin-bottom:5px;}
  .sb-nl input:focus{border-color:var(--orange);}
  .sb-nl button{width:100%;background:var(--orange);color:#fff;border:none;border-radius:var(--radius);padding:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);}
  .sb-nl button:hover{background:var(--orange-dk);}
  /* tags */
  .sb-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .sb-tag{background:var(--bg);border:1px solid var(--border);color:var(--text-lt);font-size:11px;padding:3px 9px;border-radius:2px;transition:all .12s;}
  .sb-tag:hover{background:var(--orange-lt);color:var(--orange-dk);border-color:var(--orange);}

  /* GUIDE CARDS */
  .guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .guide-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;gap:10px;align-items:flex-start;transition:box-shadow .15s;}
  .guide-card:hover{box-shadow:var(--shadow-hov);}
  .g-ico{width:40px;height:40px;border-radius:var(--radius);background:var(--orange-lt);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
  .g-txt h3{font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px;line-height:1.3;}
  .g-txt h3:hover{color:var(--orange-dk);}
  .g-txt p{font-size:12px;color:var(--text-lt);line-height:1.4;}

  /* NEWSLETTER BANNER */
  .nl-banner{background:var(--orange);border-radius:var(--radius);padding:22px 24px;margin:14px 0;display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:center;}
  .nl-banner h2{font-size:18px;font-weight:700;color:#fff;margin-bottom:5px;line-height:1.3;}
  .nl-banner p{font-size:13px;color:rgba(255,255,255,.85);line-height:1.5;}
  .nl-form{display:flex;flex-direction:column;gap:7px;}
  .nl-form input{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);border-radius:var(--radius);padding:9px 11px;font-size:13px;color:#fff;font-family:var(--font);outline:none;}
  .nl-form input::placeholder{color:rgba(255,255,255,.6);}
  .nl-form input:focus{background:rgba(255,255,255,.26);border-color:rgba(255,255,255,.7);}
  .nl-form button{background:#fff;color:var(--orange-dk);border:none;border-radius:var(--radius);padding:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);}
  .nl-form button:hover{background:var(--orange-lt);}
  .nl-note{font-size:11px;color:rgba(255,255,255,.5);}



  /* GAP HELPER */
  .gap{height:12px;}

  /* RESPONSIVE */
  @media(max-width:850px){
    .content-grid{grid-template-columns:1fr; padding: 0 4px;}
    .hero-card{grid-template-columns:1fr;}
    .hc-img{min-height:160px;}
    .guide-grid{grid-template-columns:1fr 1fr;}
    .nl-banner{grid-template-columns:1fr; gap: 20px;}
    .g4{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .blog-banner{padding: 16px; flex-direction:column; align-items:flex-start; text-align: center;}
    .bb-left h1{font-size: 18px;}
    .g2,.g3{grid-template-columns:1fr;}
    .carousel-item { flex: 0 0 85%; min-width: 85%; }
    .guide-grid{grid-template-columns:1fr;}
    .pills { overflow-x: auto; white-space: nowrap; padding-bottom: 8px; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; }
    .hero-card .hc-title { font-size: 16px; }
    .hero-card .hc-excerpt { display: none; }
  }
  @media(max-width:480px){
    .g4{grid-template-columns:1fr;}
    .ac-img-md{height: 140px;}
  }
</style>
