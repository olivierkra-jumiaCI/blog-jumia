<script>
  import { onMount } from 'svelte';
  export let onNavigate;

  onMount(() => {
    const catLinks = document.querySelectorAll('.cat-link');
    catLinks.forEach(l => {
      l.addEventListener('focus', () => {
        const p = l.closest('.cat-item');
        if (p) {
          const d = p.querySelector('.mega');
          if (d) {
            d.style.opacity = '1';
            d.style.visibility = 'visible';
            d.style.transform = 'translateY(0)';
          }
        }
      });
    });

    const handleDocumentClick = (e) => {
      if (!e.target.closest('.cat-item')) {
        document.querySelectorAll('.mega').forEach(d => {
          d.style.opacity = '';
          d.style.visibility = '';
          d.style.transform = '';
        });
      }
    };

    document.addEventListener('click', handleDocumentClick);

    const megaCats = document.querySelectorAll('.mega-cat');
    megaCats.forEach(c => {
      c.addEventListener('click', () => {
        c.parentElement.querySelectorAll('.mega-cat').forEach(s => s.classList.remove('on'));
        c.classList.add('on');
      });
    });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
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
    <div class="cat-all">☰ &nbsp;Toutes les catégories</div>
    <ul class="cat-list">

      <li class="cat-item">
        <a href="/blog/tech/" class="cat-link active">📱 Tech &amp; Smartphones <span class="caret">▾</span></a>
        <div class="mega">
          <div class="mega-grid">
            <div class="mega-left">
              <div class="mega-cat on">📱 Smartphones</div>
              <div class="mega-cat">💻 Ordinateurs</div>
              <div class="mega-cat">📷 Photo &amp; Vidéo</div>
              <div class="mega-cat">🎮 Gaming</div>
              <div class="mega-cat">🔌 Accessoires</div>
              <div class="mega-cat">📡 Réseau &amp; 5G</div>
            </div>
            <div class="mega-right">
              <div class="mega-lbl">Articles populaires</div>
              <div class="mega-links">
                <a href="/blog/tech/smartphones-100000-fcfa/" class="mega-a">🔥 Smartphones à moins de 100 000 FCFA</a>
                <a href="/blog/tech/meilleur-android-2026/" class="mega-a">⭐ Meilleur Android 2026 en CI</a>
                <a href="/blog/tech/iphone-occasion-jumia/" class="mega-a">🍎 iPhone occasion : bonne affaire ?</a>
                <a href="/blog/tech/4g-operateurs-ci/" class="mega-a">📶 4G par opérateur en CI</a>
                <a href="/blog/tech/ordinateur-etudiant-ci/" class="mega-a">💻 PC portable étudiant 2026</a>
                <a href="/blog/tech/samsung-vs-tecno/" class="mega-a">⚖️ Samsung vs Tecno comparatif</a>
              </div>
              <div class="mega-feat">
                <div class="mega-feat-lbl">✦ À la une</div>
                <a href="/blog/tech/smartphones-100000-fcfa-2026/" class="mega-feat-row">
                  <div class="mega-feat-ico">📱</div>
                  <div class="mega-feat-text"><h4>Smartphones à moins de 100 000 FCFA : comparatif honnête 2026</h4><p>Vanessa · 5 min · 3 mai 2026</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="cat-item">
        <a href="/blog/electromenager/" class="cat-link">🏠 Maison &amp; Électro <span class="caret">▾</span></a>
        <div class="mega">
          <div class="mega-grid">
            <div class="mega-left">
              <div class="mega-cat on">❄️ Climatisation</div>
              <div class="mega-cat">⚡ Énergie &amp; Onduleurs</div>
              <div class="mega-cat">🍳 Cuisine</div>
              <div class="mega-cat">🧺 Linge &amp; Ménage</div>
              <div class="mega-cat">🛋️ Mobilier</div>
            </div>
            <div class="mega-right">
              <div class="mega-lbl">Guides pratiques</div>
              <div class="mega-links">
                <a href="/blog/electromenager/climatiseur-ci/" class="mega-a">❄️ Choisir son climatiseur en CI</a>
                <a href="/blog/electromenager/onduleur-inverter/" class="mega-a">⚡ Onduleur vs inverter</a>
                <a href="/blog/electromenager/frigo-300000-fcfa/" class="mega-a">🧊 Frigos à moins de 300 000 FCFA</a>
                <a href="/blog/electromenager/solaire-maison/" class="mega-a">☀️ Énergie solaire à la maison</a>
                <a href="/blog/electromenager/machine-laver/" class="mega-a">🧺 Machine à laver 2026</a>
                <a href="/blog/electromenager/cuisiniere-gaz-elec/" class="mega-a">🍳 Gaz ou électrique en CI ?</a>
              </div>
              <div class="mega-feat">
                <div class="mega-feat-lbl">✦ À la une</div>
                <a href="/blog/electromenager/climatiseur-2026/" class="mega-feat-row">
                  <div class="mega-feat-ico">❄️</div>
                  <div class="mega-feat-text"><h4>Climatiseur en CI : comment choisir sans se faire arnaquer</h4><p>Vanessa · 6 min · 28 avr. 2026</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="cat-item">
        <a href="/blog/beaute/" class="cat-link">💄 Beauté &amp; Mode <span class="caret">▾</span></a>
        <div class="mega">
          <div class="mega-grid">
            <div class="mega-left">
              <div class="mega-cat on">💆 Soin visage &amp; corps</div>
              <div class="mega-cat">💋 Maquillage</div>
              <div class="mega-cat">👗 Mode femme</div>
              <div class="mega-cat">👔 Mode homme</div>
              <div class="mega-cat">👠 Chaussures</div>
            </div>
            <div class="mega-right">
              <div class="mega-lbl">Tendances &amp; conseils</div>
              <div class="mega-links">
                <a href="/blog/beaute/maquillage-peaux-noires/" class="mega-a">💄 Maquillage peaux noires</a>
                <a href="/blog/beaute/soin-corps/" class="mega-a">✨ Soins corps essentiels</a>
                <a href="/blog/beaute/bureau-abidjan/" class="mega-a">👗 S'habiller pour le bureau</a>
                <a href="/blog/beaute/chaussures-homme/" class="mega-a">👞 Chaussures cuir homme</a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="cat-item">
        <a href="/blog/bebe-enfant/" class="cat-link">👶 Bébé &amp; Enfant <span class="caret">▾</span></a>
        <div class="mega">
          <div class="mega-grid">
            <div class="mega-left">
              <div class="mega-cat on">🍼 Bébé 0–2 ans</div>
              <div class="mega-cat">🎒 École &amp; fournitures</div>
              <div class="mega-cat">🧸 Jouets &amp; loisirs</div>
              <div class="mega-cat">👟 Mode enfant</div>
            </div>
            <div class="mega-right">
              <div class="mega-lbl">Guides parents</div>
              <div class="mega-links">
                <a href="/blog/bebe/poussette-abidjan/" class="mega-a">🛒 Choisir une poussette en CI</a>
                <a href="/blog/bebe/couches-bebe/" class="mega-a">🍼 Couches bébé : meilleur rapport</a>
                <a href="/blog/enfant/tablette-educative/" class="mega-a">📚 Tablettes éducatives 2026</a>
                <a href="/blog/enfant/cartable-rentree/" class="mega-a">🎒 Cartables rentrée scolaire</a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="cat-item">
        <a href="/blog/bons-plans/" class="cat-link">🏷️ Bons Plans <span class="caret">▾</span></a>
        <div class="mega">
          <div class="mega-grid">
            <div class="mega-left">
              <div class="mega-cat on">🔥 Promos en cours</div>
              <div class="mega-cat">🏅 Top ventes</div>
              <div class="mega-cat">💸 Moins de 10 000 FCFA</div>
              <div class="mega-cat">🎁 Idées cadeaux</div>
            </div>
            <div class="mega-right">
              <div class="mega-lbl">Sélections du moment</div>
              <div class="mega-links">
                <a href="/blog/bons-plans/promo-mai-2026/" class="mega-a">⚡ Promos de la semaine</a>
                <a href="/blog/bons-plans/produits-5000-fcfa/" class="mega-a">💰 Moins de 5 000 FCFA</a>
                <a href="/blog/bons-plans/fete-des-meres/" class="mega-a">💐 Idées fête des mères</a>
                <a href="/blog/bons-plans/top-ventes-mai/" class="mega-a">🏅 Top ventes mai 2026</a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="cat-item">
        <a href="/blog/guide-achat/" class="cat-link">📋 Guides d'achat</a>
      </li>

    </ul>
  </div>
</nav>

<!-- BREADCRUMB -->
<nav class="breadcrumb" aria-label="Fil d'ariane">
  <div class="bc-inner">
    <a href="https://www.jumia.ci">Accueil</a>
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
    <div class="bb-stats">
      <div class="bb-stat"><div class="bb-stat-n">240+</div><div class="bb-stat-l">Articles</div></div>
      <div class="bb-stat"><div class="bb-stat-n">7</div><div class="bb-stat-l">Catégories</div></div>
      <div class="bb-stat"><div class="bb-stat-n">50k+</div><div class="bb-stat-l">Lecteurs / mois</div></div>
    </div>
  </div>

  <!-- TOPIC PILLS -->
  <div class="pills">
    <span class="pills-lbl">Filtrer :</span>
    <a href="/blog/" class="pill on">Tous</a>
    <a href="/blog/tech/" class="pill">📱 Tech</a>
    <a href="/blog/electromenager/" class="pill">🏠 Maison</a>
    <a href="/blog/beaute/" class="pill">💄 Beauté</a>
    <a href="/blog/bebe-enfant/" class="pill">👶 Bébé</a>
    <a href="/blog/bons-plans/" class="pill">🏷️ Bons Plans</a>
    <a href="/blog/guide-achat/" class="pill">📋 Guides</a>
  </div>

  <!-- MAIN + SIDEBAR -->
  <div class="content-grid">

    <main>
      <!-- HERO -->
      <a href="/blog/tech/smartphones-100000-fcfa-2026/" class="hero-card">
        <div class="hc-img" style="background:linear-gradient(135deg,#FEF3E7,#FFD89B);">📱<span class="badge">Nouveau</span></div>
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
            <div class="ac-meta"><div class="ac-author"><div class="avc">J</div><span>Équipe Jumia</span></div><span>3 min · 4 mai</span></div>
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
        <div><form class="nl-form" onsubmit={(e) => e.preventDefault()}><input type="text" placeholder="Ton prénom"/><input type="email" placeholder="Ton adresse email" required/><button type="submit">✉️ S'inscrire gratuitement</button><span class="nl-note">🔒 Tes données sont protégées</span></form></div>
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
    </main>

    <!-- SIDEBAR -->
    <aside class="sb">

      <div class="sb-block">
        <div class="sb-hdr">Catégories</div>
        <div class="sb-cats">
          <a href="/blog/tech/" class="sb-cat"><span class="sb-cat-l"><span>📱</span>Tech &amp; Smartphones</span><span class="sb-cat-n">48</span></a>
          <a href="/blog/electromenager/" class="sb-cat"><span class="sb-cat-l"><span>🏠</span>Maison &amp; Électroménager</span><span class="sb-cat-n">35</span></a>
          <a href="/blog/beaute/" class="sb-cat"><span class="sb-cat-l"><span>💄</span>Beauté &amp; Mode</span><span class="sb-cat-n">41</span></a>
          <a href="/blog/bebe-enfant/" class="sb-cat"><span class="sb-cat-l"><span>👶</span>Bébé &amp; Enfant</span><span class="sb-cat-n">26</span></a>
          <a href="/blog/bons-plans/" class="sb-cat"><span class="sb-cat-l"><span>🏷️</span>Bons Plans</span><span class="sb-cat-n">33</span></a>
          <a href="/blog/guide-achat/" class="sb-cat"><span class="sb-cat-l"><span>📋</span>Guides d'achat</span><span class="sb-cat-n">19</span></a>
          <a href="/blog/livraison-paiement/" class="sb-cat"><span class="sb-cat-l"><span>🚚</span>Livraison &amp; Paiement</span><span class="sb-cat-n">12</span></a>
        </div>
      </div>

      <div class="sb-block">
        <div class="sb-hdr">Les plus lus</div>
        <div class="sb-pop">
          <a href="/blog/tech/smartphones-100000-fcfa/" class="sb-pop-item"><span class="sb-pop-n">01</span><div><div class="sb-pop-t">Smartphones à moins de 100 000 FCFA : comparatif 2026</div><div class="sb-pop-m">Vanessa · 5 min</div></div></a>
          <a href="/blog/electromenager/climatiseur-ci/" class="sb-pop-item"><span class="sb-pop-n">02</span><div><div class="sb-pop-t">Choisir son climatiseur en CI sans se faire arnaquer</div><div class="sb-pop-m">Vanessa · 6 min</div></div></a>
          <a href="/blog/beaute/maquillage-peaux-noires/" class="sb-pop-item"><span class="sb-pop-n">03</span><div><div class="sb-pop-t">Maquillage pour peaux noires sur Jumia CI</div><div class="sb-pop-m">Vanessa · 4 min</div></div></a>
          <a href="/blog/paiement-mobile-money/" class="sb-pop-item"><span class="sb-pop-n">04</span><div><div class="sb-pop-t">Payer avec Wave, Orange Money, MTN MoMo sur Jumia CI</div><div class="sb-pop-m">Vanessa · 3 min</div></div></a>
          <a href="/blog/electromenager/onduleur-inverter/" class="sb-pop-item"><span class="sb-pop-n">05</span><div><div class="sb-pop-t">Onduleur vs inverter : lequel choisir pour les délestages ?</div><div class="sb-pop-m">Vanessa · 7 min</div></div></a>
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
          <h3>Bons plans chaque semaine</h3>
          <p>Les meilleurs articles directement dans ta boîte mail.</p>
          <input type="text" placeholder="Ton prénom"/>
          <input type="email" placeholder="Ton email"/>
          <button>S'inscrire gratuitement</button>
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

<!-- FOOTER -->
<footer class="site-footer">
  <div class="ft-inner">
    <div class="ft-top">
      <div class="ft-brand">
        <img src="/logo.png" class="logo-img-ft" alt="Jumia CI" />
        <p>Conseils d'achat, comparatifs et bons plans pour commander malin sur Jumia CI.</p>
      </div>
      <div class="ft-col">
        <h4>Catégories</h4>
        <ul class="ft-links">
          <li><a href="/blog/tech/">📱 Tech &amp; Smartphones</a></li>
          <li><a href="/blog/electromenager/">🏠 Maison &amp; Électroménager</a></li>
          <li><a href="/blog/beaute/">💄 Beauté &amp; Mode</a></li>
          <li><a href="/blog/bebe-enfant/">👶 Bébé &amp; Enfant</a></li>
          <li><a href="/blog/bons-plans/">🏷️ Bons Plans</a></li>
          <li><a href="/blog/guide-achat/">📋 Guides d'achat</a></li>
        </ul>
      </div>
      <div class="ft-col">
        <h4>Guides pratiques</h4>
        <ul class="ft-links">
          <li><a href="/blog/livraison-guide/">🚚 Guide livraison CI</a></li>
          <li><a href="/blog/paiement-mobile-money/">📲 Paiement Mobile Money</a></li>
          <li><a href="/blog/acheter-occasion-jumia/">♻️ Acheter occasion</a></li>
          <li><a href="/blog/points-relais-ci/">📍 Points relais en CI</a></li>
          <li><a href="/blog/retour-remboursement/">🔄 Retours &amp; Remboursements</a></li>
        </ul>
      </div>
      <div class="ft-col">
        <h4>Jumia CI</h4>
        <ul class="ft-links">
          <li><a href="https://www.jumia.ci">🛒 Boutique Jumia CI</a></li>
          <li><a href="/vendre/">Vendre sur Jumia</a></li>
          <li><a href="/aide/">Centre d'aide</a></li>
          <li><a href="/blog/a-propos/">À propos du blog</a></li>
          <li><a href="/blog/mentions-legales/">Mentions légales</a></li>
        </ul>
      </div>
    </div>
    <div class="ft-bottom">
      <span>© 2026 Jumia CI — Tous droits réservés</span>
      <a href="https://www.jumia.ci">jumia.ci</a>
    </div>
  </div>
</footer>

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
  :global(body) {font-family:var(--font);background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;}
  :global(a) {text-decoration:none;color:inherit;}
  :global(img) {max-width:100%;display:block;}
  :global(ul) {list-style:none;}



  /* CAT NAV BAR */
  .cat-bar{background:var(--white);border-bottom:1px solid var(--border);}
  .cat-bar-inner{max-width:1170px;margin:0 auto;padding:0 16px;display:flex;align-items:stretch;}
  .cat-all{display:flex;align-items:center;gap:8px;background:var(--orange);color:#fff;padding:0 16px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;user-select:none;}
  .cat-list{display:flex;align-items:stretch;}
  .cat-item{position:relative;}
  .cat-link{display:flex;align-items:center;gap:4px;padding:0 13px;height:40px;font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;cursor:pointer;border-bottom:3px solid transparent;transition:border-color .15s,color .15s;}
  .cat-link:hover,.cat-item:hover>.cat-link{color:var(--orange);border-bottom-color:var(--orange);}
  .cat-link.active{color:var(--orange);border-bottom-color:var(--orange);}
  .caret{font-size:9px;transition:transform .2s;}
  .cat-item:hover .caret{transform:rotate(180deg);}

  /* MEGA DROPDOWN */
  .mega{position:absolute;top:100%;left:0;background:var(--white);border:1px solid var(--border);border-top:3px solid var(--orange);box-shadow:0 8px 24px rgba(0,0,0,.12);min-width:500px;z-index:300;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .18s,transform .18s,visibility .18s;}
  .cat-item:hover .mega{opacity:1;visibility:visible;transform:translateY(0);}
  .mega-grid{display:grid;grid-template-columns:170px 1fr;}
  .mega-left{background:#FAFAFA;border-right:1px solid var(--border);padding:8px 0;}
  .mega-cat{display:flex;align-items:center;gap:7px;padding:8px 14px;font-size:13px;color:var(--text-lt);cursor:pointer;border-left:3px solid transparent;transition:all .12s;}
  .mega-cat:hover,.mega-cat.on{color:var(--orange);background:var(--white);border-left-color:var(--orange);font-weight:600;}
  .mega-right{padding:14px 16px;}
  .mega-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--text-xlt);font-weight:700;margin-bottom:8px;}
  .mega-links{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:12px;}
  .mega-a{display:flex;align-items:center;gap:5px;padding:6px 7px;font-size:13px;color:var(--text);border-radius:var(--radius);transition:background .1s,color .1s;}
  .mega-a:hover{background:var(--orange-lt);color:var(--orange-dk);}
  .mega-feat{border-top:1px solid var(--border);padding-top:10px;}
  .mega-feat-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--orange);font-weight:700;margin-bottom:7px;}
  .mega-feat-row{display:flex;gap:9px;align-items:flex-start;}
  .mega-feat-ico{width:48px;height:48px;border-radius:var(--radius);background:var(--orange-lt);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
  .mega-feat-text h4{font-size:13px;font-weight:600;line-height:1.3;color:var(--text);margin-bottom:2px;}
  .mega-feat-text p{font-size:11px;color:var(--text-xlt);}

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
  .bb-stats{display:flex;gap:20px;flex-shrink:0;}
  .bb-stat{text-align:center;padding:8px 14px;border-left:1px solid var(--border);}
  .bb-stat:first-child{border-left:none;}
  .bb-stat-n{font-size:22px;font-weight:700;color:var(--orange);line-height:1;}
  .bb-stat-l{font-size:11px;color:var(--text-xlt);margin-top:2px;}

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
  .sec-h-link{font-size:12px;color:var(--orange);font-weight:600;}
  .sec-h-link:hover{text-decoration:underline;}

  /* HERO CARD */
  .hero-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:12px;display:grid;grid-template-columns:1fr 300px;transition:box-shadow .18s;}
  .hero-card:hover{box-shadow:var(--shadow-hov);}
  .hc-img{background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:68px;min-height:200px;position:relative;}
  .hc-body{padding:18px;display:flex;flex-direction:column;justify-content:center;}
  .hc-cat{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--orange);margin-bottom:7px;}
  .hc-title{font-size:19px;font-weight:700;line-height:1.3;color:var(--text);margin-bottom:9px;}
  .hc-title:hover{color:var(--orange-dk);}
  .hc-excerpt{font-size:13px;color:var(--text-lt);line-height:1.6;margin-bottom:12px;}
  .hc-meta{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--text-xlt);margin-bottom:12px;}
  .hc-cta{display:inline-flex;align-items:center;gap:5px;background:var(--orange);color:#fff;padding:8px 16px;border-radius:var(--radius);font-size:13px;font-weight:600;align-self:flex-start;transition:background .15s;}
  .hc-cta:hover{background:var(--orange-dk);}

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
  .sb-cat-n{font-size:11px;color:var(--text-xlt);background:var(--bg);padding:1px 6px;border-radius:10px;}
  /* popular */
  .sb-pop{display:flex;flex-direction:column;}
  .sb-pop-item{display:flex;gap:8px;align-items:flex-start;padding:9px 12px;border-bottom:1px solid var(--border);transition:background .1s;}
  .sb-pop-item:last-child{border-bottom:none;}
  .sb-pop-item:hover{background:var(--orange-lt);}
  .sb-pop-n{font-size:18px;font-weight:700;color:var(--border);line-height:1;flex-shrink:0;width:22px;}
  .sb-pop-t{font-size:12px;font-weight:600;line-height:1.35;color:var(--text);margin-bottom:2px;}
  .sb-pop-t:hover{color:var(--orange-dk);}
  .sb-pop-m{font-size:11px;color:var(--text-xlt);}
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

  /* FOOTER */
  .site-footer{background:#2B2B2B;color:rgba(255,255,255,.65);margin-top:28px;padding:28px 0 14px;}
  .ft-inner{max-width:1170px;margin:0 auto;padding:0 16px;}
  .ft-top{display:grid;grid-template-columns:190px 1fr 1fr 1fr;gap:28px;margin-bottom:24px;}
  .logo-img-ft{height:26px;width:auto;margin-bottom:10px;}
  .ft-brand p{font-size:12px;line-height:1.65;}
  .ft-col h4{font-size:11px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.1);}
  .ft-links li{margin-bottom:6px;}
  .ft-links a{font-size:12px;color:rgba(255,255,255,.55);transition:color .12s;}
  .ft-links a:hover{color:var(--orange);}
  .ft-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:14px;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.35);}
  .ft-bottom a{color:rgba(255,255,255,.45);}
  .ft-bottom a:hover{color:var(--orange);}

  /* GAP HELPER */
  .gap{height:12px;}

  /* RESPONSIVE */
  @media(max-width:1024px){
    .content-grid{grid-template-columns:1fr;}
    .hero-card{grid-template-columns:1fr;}
    .hc-img{min-height:160px;}
    .guide-grid{grid-template-columns:1fr 1fr;}
    .nl-banner{grid-template-columns:1fr;}
    .ft-top{grid-template-columns:1fr 1fr;gap:20px;}
    .g4{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .cat-bar{display:none;}
    .g2,.g3{grid-template-columns:1fr;}
    .guide-grid{grid-template-columns:1fr;}
    .ft-top{grid-template-columns:1fr;}
    .blog-banner{flex-direction:column;align-items:flex-start;}
    .bb-stats{gap:0;}
  }
</style>
