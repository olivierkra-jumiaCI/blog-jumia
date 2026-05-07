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

        <h2>Pourquoi cette tranche de prix est la plus intéressante en 2026</h2>

        <p>En dessous de 70 000 FCFA, tu as des téléphones corrects pour les usages basiques — mais tu feras des concessions réelles sur la fluidité, la photo et la durée de vie. Au-dessus de 200 000 FCFA, tu paies surtout la marque et des fonctionnalités que la majorité des gens n'utilisent jamais.</p>

        <p>Entre 80 000 et 110 000 FCFA en 2026, tu accèdes à :</p>
        <ul>
          <li>4 à 8 Go de RAM — les applis tournent sans ramer</li>
          <li>128 à 256 Go de stockage — 2 à 3 ans de photos de famille sans se soucier de la place</li>
          <li>Batterie 5 000 mAh minimum — une journée entière, même avec les coupures de courant</li>
          <li>4G solide sur les réseaux Orange, MTN et Moov CI</li>
          <li>Double SIM — quasi obligatoire en CI pour jongler entre opérateurs</li>
        </ul>

        <h2>Mon tableau comparatif — les 5 modèles que j'ai regardés de près</h2>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Modèle</th>
                <th>Prix indicatif*</th>
                <th>RAM / Stockage</th>
                <th>Batterie</th>
                <th>Pour qui ?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Samsung Galaxy A17</strong></td>
                <td class="price">Aux alentours de 88 000 FCFA</td>
                <td>4 Go + 128 Go</td>
                <td>5 000 mAh</td>
                <td>Premier Samsung, cadeau, SAV fiable</td>
              </tr>
              <tr>
                <td><strong>Tecno Spark 50</strong> <span class="tag-top">Meilleur rapport</span></td>
                <td class="price">Aux alentours de 92 000 FCFA</td>
                <td>8 Go + 256 Go</td>
                <td>5 000 mAh</td>
                <td>Grande famille, usage quotidien intense</td>
              </tr>
              <tr>
                <td><strong>Xiaomi Redmi Note 15</strong></td>
                <td class="price">Aux alentours de 104 000 FCFA</td>
                <td>6 Go + 128 Go</td>
                <td>5 000 mAh</td>
                <td>Meilleures performances pour le prix</td>
              </tr>
              <tr>
                <td><strong>Tecno Camon 50 Pro</strong> <span class="tag-top">Photo</span></td>
                <td class="price">Aux alentours de 195 000 FCFA</td>
                <td>8 Go + 256 Go</td>
                <td>5 000 mAh</td>
                <td>Photos, réseaux sociaux, créateurs de contenu</td>
              </tr>
              <tr>
                <td><strong>Infinix Note Edge</strong></td>
                <td class="price">Aux alentours de 145 500 FCFA</td>
                <td>8 Go + 256 Go</td>
                <td>5 000 mAh + charge 45W</td>
                <td>Polyvalent, charge rapide, gros utilisateur</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="table-note">* Prix indicatifs relevés sur Jumia CI au moment de la rédaction. Clique sur le lien de chaque modèle pour voir le prix du jour.</p>

        <img src="/smartphone_comparison_hands.png" alt="Comparaison de deux smartphones Android tenus en main par une personne à peau noire" style="width: 100%; border-radius: 8px; margin: 20px 0;" loading="lazy"/>

        <div class="tip">
          <strong>💡 Le topo de Vanessa</strong>
          <p>Sur Jumia CI, les prix des téléphones bougent avec les ventes flash et les promos du weekend. Ne traîne pas trop si tu repères un bon prix — les stocks au bon tarif peuvent partir vite. Le roi a failli rater son téléphone à prix réduit pour ça.</p>
        </div>

        <h2>Ce que j'ai regardé pour chaque modèle</h2>

        <h3>Samsung Galaxy A17 — la sécurité avant tout</h3>
        <p>Le Galaxy A17 aux alentours de 88 000 FCFA, c'est l'entrée Samsung la plus accessible en ce moment. Caméra 50 MP, batterie 5 000 mAh. Et surtout — 6 ans de mises à jour de sécurité garanties selon Samsung. En clair : en 2032, ce téléphone sera encore sécurisé.</p>
        <p>Si le roi utilise son téléphone pour le travail, les dépôts Wave et les appels clients, c'est lui que je recommande en priorité. Le SAV Samsung en CI est présent dans les grandes villes et à l'intérieur du pays — Bouaké, Korhogo, San Pédro — ce qui compte vraiment quand quelque chose se passe.</p>
        <p><a href="https://www.jumia.ci/mlp-boutique-samsung/" target="_blank" rel="noopener">Voir le prix du jour sur Jumia CI → Boutique officielle Samsung</a></p>

        <h3>Tecno Spark 50 — les meilleures specs pour le prix</h3>
        <p>8 Go de RAM et 256 Go de stockage aux alentours de 92 000 FCFA. Sur le papier, c'est imbattable dans cette tranche. Tecno connaît nos usages : grosse batterie parce qu'on a des coupures, grand écran parce qu'on regarde des vidéos, double SIM parce qu'on jongle entre opérateurs.</p>
        <p>Le petit bémol honnête : les mises à jour Android arrivent parfois en retard par rapport à Samsung. Si la sécurité logicielle est ta priorité, penche-toi vers Samsung. Mais pour un usage familial quotidien — WhatsApp, Facebook, appels, photos des enfants — le Tecno Spark 50 fait très bien le job.</p>
        <p><a href="https://www.jumia.ci/tecno/" target="_blank" rel="noopener">Voir le prix du jour sur Jumia CI → Boutique officielle Tecno</a></p>

        <h3>Xiaomi Redmi Note 15 — le challenger silencieux</h3>
        <p>Aux alentours de 104 000 FCFA, le Redmi Note 15 propose ce que j'ai vu de mieux en termes de fluidité dans cette tranche. Le processeur est réactif et la caméra se défend bien même en intérieur. Si tu cherches les meilleures performances brutes pour le prix, c'est lui.</p>
        <p>Ce que je te dis franchement : le SAV Xiaomi en CI est moins dense que Samsung ou Tecno. Dans les grandes villes ça va, mais si tu es à l'intérieur du pays, vérifie qu'il y a un point de réparation agréé près de toi avant d'acheter.</p>
        <p><a href="https://www.jumia.ci/mlp-boutique-xiaomi/" target="_blank" rel="noopener">Voir le prix du jour sur Jumia CI → Boutique officielle Xiaomi</a></p>

        <h3>Tecno Camon 50 Pro — pour ceux qui vivent par la photo</h3>
        <p>Si tu veux de belles photos pour Facebook, des vidéos de tes enfants, ou du contenu pour tes réseaux, c'est le Camon 50 Pro qui sort du lot. La caméra est clairement au-dessus des autres modèles cités ici. Il dépasse les 100 000 FCFA — aux alentours de 195 000 FCFA — mais si la photo est ta priorité, c'est une vraie valeur.</p>
        <p><a href="https://www.jumia.ci/tecno/" target="_blank" rel="noopener">Voir le prix du jour sur Jumia CI → Boutique officielle Tecno</a></p>

        <h3>Infinix Note Edge — pour celui qui est toujours en déplacement</h3>
        <p>La charge 45W, c'est ce qui différencie vraiment l'Infinix Note Edge. Rentrer à la maison avec 10% de batterie et repartir rechargé en moins d'une heure — ça change la vie. Pour quelqu'un qui est dehors toute la journée, c'est un vrai argument. Aux alentours de 145 500 FCFA, c'est au-dessus de notre tranche mais ça se justifie largement.</p>
        <p><a href="https://www.jumia.ci/mlp-boutique-infinix/" target="_blank" rel="noopener">Voir le prix du jour sur Jumia CI → Boutique officielle Infinix</a></p>

        <div class="tip">
          <strong>💡 Le topo de Vanessa</strong>
          <p>Vérifie TOUJOURS si le chargeur est inclus dans la boîte. Certaines marques ont commencé à le vendre séparément. Lis bien la description sur la fiche Jumia — un chargeur compatible coûte 5 000 à 8 000 FCFA en plus, ce n'est pas anodin.</p>
        </div>

        <h2>Mes verdicts par profil</h2>

        <div class="verdict-grid">
          <div class="verdict-card">
            <div class="name">Samsung Galaxy A17</div>
            <div class="for-who">Pour : le cadeau ou l'usage pro fiable</div>
            <p>SAV présent partout en CI, 6 ans de mises à jour, marque reconnue. Pour offrir à ta maman, ta tante, ton père — ou pour quelqu'un qui utilise son téléphone pour le travail.</p>
          </div>
          <div class="verdict-card">
            <div class="name">Tecno Spark 50</div>
            <div class="for-who">Pour : le meilleur rapport specs/prix</div>
            <p>8 Go de RAM et 256 Go de stockage à 92 000 FCFA, c'est difficile à battre. Pour un usage familial intensif sans se ruiner.</p>
          </div>
          <div class="verdict-card">
            <div class="name">Tecno Camon 50 Pro</div>
            <div class="for-who">Pour : les amoureux de la photo</div>
            <p>La meilleure caméra de cette sélection. Si Facebook et les photos de famille sont ta priorité, c'est lui sans hésiter.</p>
          </div>
          <div class="verdict-card">
            <div class="name">Infinix Note Edge</div>
            <div class="for-who">Pour : celui qui est toujours en mouvement</div>
            <p>La charge 45W change vraiment la vie au quotidien. Pour quelqu'un qui ne peut pas se permettre de tomber en rade à midi.</p>
          </div>
        </div>

        <h2>Ce qu'il faut vérifier sur la fiche Jumia avant de valider</h2>

        <ul>
          <li><strong>Double SIM :</strong> vérifie que les deux slots acceptent des nano-SIM pour jongler entre Orange, MTN ou Moov.</li>
          <li><strong>Bandes 4G :</strong> tous les modèles cités fonctionnent sur les réseaux ivoiriens, mais si tu es dans une zone secondaire, vérifie la compatibilité avec ton opérateur local.</li>
          <li><strong>Le chargeur dans la boîte :</strong> lis bien la description complète avant de valider.</li>
          <li><strong>Boutique officielle :</strong> pour la garantie constructeur, commande depuis la boutique officielle de la marque sur Jumia CI.</li>
          <li><strong>Neuf vs reconditionné :</strong> c'est clairement mentionné sur la fiche. Pour un premier achat ou un cadeau, prends du neuf.</li>
        </ul>

        <div class="alert">
          <strong>⚠️ Le piège classique</strong><br>
          Méfie-toi des offres à prix très cassé sur des modèles "dernière génération". Si un Galaxy S25 ou un iPhone 15 se retrouve à 100 000 FCFA, c'est soit une contrefaçon, soit un reconditionné non déclaré. Reste sur les modèles et les boutiques officielles que je cite ici.
        </div>

        <img src="/jumia_delivery_payment.png" alt="Femme ivoirienne récupérant sa commande Jumia CI en point relais avec paiement mobile money" style="width: 100%; border-radius: 8px; margin: 20px 0;" loading="lazy"/>

        <h2>Comment payer et se faire livrer sur Jumia CI</h2>

        <p>Que tu sois à Abidjan, à Bouaké, à Man ou à San Pédro, Jumia livre partout en Côte d'Ivoire.</p>

        <ul>
          <li><strong>Cash à la livraison :</strong> tu paies quand tu récupères ta commande. Parfait pour un premier achat.</li>
          <li><strong>Mobile money à la livraison :</strong> Wave, Orange Money ou MTN MoMo — tu règles depuis ton téléphone à la réception.</li>
          <li><strong>Prépaiement mobile money :</strong> Wave, Orange Money ou MTN MoMo avant la livraison. Souvent plus rapide pour la préparation — et tu bénéficies jusqu'à 5 000 FCFA de réduction sur les frais de livraison si ta commande est d'au moins 7 500 FCFA et retirée en agence. Sur un téléphone, c'est pratiquement toujours le cas.</li>
        </ul>

        <p>Pour la livraison :</p>
        <ul>
          <li><strong>À Abidjan :</strong> livraison à domicile ou retrait en point relais Jumia — à toi de choisir.</li>
          <li><strong>À l'intérieur du pays :</strong> retrait en point relais uniquement (Bouaké, Yamoussoukro, Korhogo, San Pédro, Man, Daloa et autres villes). Compte 3 à 5 jours ouvrables.</li>
        </ul>

        <p>J'ai choisi le prépaiement Wave pour la commande du roi. Préparée le soir même, récupérée au point relais le lendemain. Il a testé sur place, tout était nickel.</p>

        <div class="cta-block">
          <a class="cta" href="https://www.jumia.ci/telephones-smartphones/" target="_blank" rel="noopener">Voir tous les smartphones sur Jumia CI →</a>
        </div>

        <h2>Mon choix final — et pourquoi</h2>

        <p>J'ai pris le <strong>Samsung Galaxy A17</strong> (aux alentours de 88 000 FCFA au moment où j'écrivais) pour le roi. Pas le meilleur rapport specs brutes du tableau — le Tecno Spark 50 avait plus de RAM et de stockage pour un prix comparable. Mais le roi utilise son téléphone pour son travail, pour ses clients, pour ses dépôts Wave. Si ça tombe en panne, on a besoin d'un SAV fiable et accessible, même s'il voyage à l'intérieur du pays. Samsung, c'est ce que ça offre en CI.</p>

        <p>Il est content. Moi aussi. Et on a gardé du budget pour une coque solide et un verre trempé — parce que ce monsieur-là, il ne fait pas attention à ses affaires. C'est pas dôhi.</p>

        <h2>FAQ — tes questions sur les smartphones en CI</h2>

        <details>
          <summary>Quelle différence entre 4 Go et 8 Go de RAM concrètement ?</summary>
          <p>Avec 4 Go, tu peux avoir une dizaine d'applis ouvertes en même temps sans problème — WhatsApp, Chrome, Facebook, Maps. Avec 8 Go, tu ajoutes des jeux comme Free Fire en arrière-plan sans que le téléphone rame. Pour un usage familial standard, 4 Go suffisent largement. Pour un ado ou un gros utilisateur, vise 8 Go.</p>
        </details>

        <details>
          <summary>Jumia livre bien dans les villes secondaires ?</summary>
          <p>Oui. Jumia livre dans tout le pays via ses points relais — Bouaké, Yamoussoukro, Korhogo, San Pédro, Man, Daloa et plus encore. Délai généralement de 3 à 5 jours ouvrables hors Abidjan. Vérifie le point relais le plus proche de chez toi directement sur le site.</p>
        </details>

        <details>
          <summary>Quelle garantie pour les téléphones achetés sur Jumia ?</summary>
          <p>La garantie standard est de 12 à 24 mois selon les marques. Pour les boutiques officielles Samsung, Tecno, Infinix et Xiaomi sur Jumia CI, la garantie est directement gérée par la marque. Vérifie toujours sur la fiche produit — si tu vois moins de 12 mois ou pas de mention de garantie, pose la question avant de commander.</p>
        </details>

        <details>
          <summary>Vaut-il mieux acheter maintenant ou attendre les promos ?</summary>
          <p>Si tu as besoin du téléphone maintenant, achète maintenant. Les stocks au bon prix peuvent partir vite. En revanche, si tu peux attendre, note les dates Jumia Anniversaire (juin) et Black Friday (novembre) — les réductions peuvent atteindre 20 à 30% sur certains modèles.</p>
        </details>

        <details>
          <summary>Samsung ou Tecno — lequel dure le plus longtemps ?</summary>
          <p>Les deux peuvent durer 3 ans avec une bonne utilisation. L'avantage Samsung : 6 ans de mises à jour de sécurité garanties, SAV plus dense en CI. L'avantage Tecno : specs souvent supérieures pour le même prix, conçu pour nos usages. Pour un usage pro ou un cadeau, je penche Samsung. Pour le quotidien familial avec le meilleur rapport qualité-prix, Tecno.</p>
        </details>

        <p class="signature">Vanessa, chercheuse des vrais kens.</p>

      </div>
    </div>

    <!-- ARTICLES LIÉS -->
    <div class="related-section" style="margin-top:20px;">
      <div class="related-hdr">Continue avec Vanessa</div>
      <div class="cards">
        <a href="/blog/electromenager/climatiseur-ci-2026/" class="card">
          <div class="card-img" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);">❄️</div>
          <div class="card-body"><h4>Climatiseur en CI : comment choisir sans se faire arnaquer</h4><small>Vanessa · 6 min</small></div>
        </a>
        <a href="/blog/beaute/maquillage-peaux-noires/" class="card">
          <div class="card-img" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD9);">💄</div>
          <div class="card-body"><h4>Maquillage pour peaux noires : mes produits préférés sur Jumia CI</h4><small>Vanessa · 5 min</small></div>
        </a>
        <a href="/blog/tech/ordinateur-etudiant-ci-2026/" class="card">
          <div class="card-img" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);">💻</div>
          <div class="card-body"><h4>PC portable pour étudiant ivoirien : le guide complet 2026</h4><small>Vanessa · 8 min</small></div>
        </a>
      </div>
    </div>

    <!-- PRODUITS -->
    <div class="products-section" style="margin-top:24px;">
      <div class="products-hdr">Les téléphones dont parle Vanessa</div>
      <div class="prod-grid">
        <div class="prod-card">
          <div class="prod-img">📱</div>
          <h5>Samsung Galaxy A17</h5>
          <div class="prod-price">Aux alentours de 88 000 FCFA</div>
          <a href="https://www.jumia.ci/mlp-boutique-samsung/" class="prod-cta" target="_blank" rel="noopener">Boutique Samsung →</a>
        </div>
        <div class="prod-card">
          <div class="prod-img">📱</div>
          <h5>Tecno Spark 50</h5>
          <div class="prod-price">Aux alentours de 92 000 FCFA</div>
          <a href="https://www.jumia.ci/tecno/" class="prod-cta" target="_blank" rel="noopener">Boutique Tecno →</a>
        </div>
        <div class="prod-card">
          <div class="prod-img">📱</div>
          <h5>Xiaomi Redmi Note 15</h5>
          <div class="prod-price">Aux alentours de 104 000 FCFA</div>
          <a href="https://www.jumia.ci/mlp-boutique-xiaomi/" class="prod-cta" target="_blank" rel="noopener">Boutique Xiaomi →</a>
        </div>
        <div class="prod-card">
          <div class="prod-img">📷</div>
          <h5>Tecno Camon 50 Pro</h5>
          <div class="prod-price">Aux alentours de 195 000 FCFA</div>
          <a href="https://www.jumia.ci/tecno/" class="prod-cta" target="_blank" rel="noopener">Boutique Tecno →</a>
        </div>
        <div class="prod-card">
          <div class="prod-img">⚡</div>
          <h5>Infinix Note Edge</h5>
          <div class="prod-price">Aux alentours de 145 500 FCFA</div>
          <a href="https://www.jumia.ci/mlp-boutique-infinix/" class="prod-cta" target="_blank" rel="noopener">Boutique Infinix →</a>
        </div>
      </div>
    </div>

  </div><!-- /main col -->

</div><!-- /page-layout -->



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
   CAT NAV BAR (masquée sur mobile)
   ============================================ */
.cat-bar { background: #fff; border-bottom: 1px solid #e0e0e0; display: none; }
.cat-bar-inner {
  max-width: 1100px; margin: 0 auto; padding: 0 16px;
  display: flex; align-items: stretch;
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.cat-all {
  display: flex; align-items: center; gap: 8px;
  background: #F68B1E; color: #fff; padding: 0 14px;
  font-size: 13px; font-weight: 700; cursor: pointer;
  white-space: nowrap; flex-shrink: 0; user-select: none;
}
.cat-list { display: flex; align-items: stretch; list-style: none; }
.cat-item { position: relative; }
.cat-link {
  display: flex; align-items: center; gap: 4px;
  padding: 0 12px; height: 40px; font-size: 13px; font-weight: 600;
  color: #333; white-space: nowrap; cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: border-color .15s, color .15s;
}
.cat-link:hover, .cat-link.active { color: #F68B1E; border-bottom-color: #F68B1E; text-decoration: none; }

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
</style>



