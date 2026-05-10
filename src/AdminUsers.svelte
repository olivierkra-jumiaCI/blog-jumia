<script>
  import { db } from './lib/firebase';
  import { collection, getDocs, doc, setDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
  import { onMount } from 'svelte';
  import { initializeApp } from 'firebase/app';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

  // Config nécessaire pour créer un second utilisateur sans déconnecter l'admin
  // On récupère la config depuis le fichier lib/firebase.js ou on la ré-utilise
  const firebaseConfig = {
    apiKey: "AIzaSyBwHjsCBd7oean2tJ67u0SZq-Wg9VBstzg",
    authDomain: "jumia-blog.firebaseapp.com",
    projectId: "jumia-blog",
    storageBucket: "jumia-blog.firebasestorage.app",
    messagingSenderId: "601629053381",
    appId: "1:601629053381:web:8f5c27dd0da74634b2fbac"
  };

  let users = $state([]);
  let email = $state('');
  let password = $state('');
  let role = $state('writer');
  let isCreating = $state(false);
  let message = $state('');

  async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  onMount(loadUsers);

  async function createUser(e) {
    e.preventDefault();
    isCreating = true;
    message = '';

    try {
      // Créer une instance temporaire pour ne pas déconnecter l'admin actuel
      const tempApp = initializeApp(firebaseConfig, "temp");
      const tempAuth = getAuth(tempApp);
      
      const userCredential = await createUserWithEmailAndPassword(tempAuth, email, password);
      const newUser = userCredential.user;

      // Enregistrer le rôle dans Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: email,
        role: role,
        createdAt: new Date()
      });

      // Nettoyer l'instance temporaire
      await tempApp.delete();

      message = "Compte créé avec succès !";
      email = '';
      password = '';
      loadUsers();
    } catch (err) {
      console.error(err);
      message = "Erreur : " + err.message;
    } finally {
      isCreating = false;
    }
  }

  async function deleteUser(uid) {
    if (confirm("Supprimer l'accès de cet utilisateur ? (Le compte Auth doit être supprimé manuellement dans la console Firebase par sécurité)")) {
      await deleteDoc(doc(db, "users", uid));
      loadUsers();
    }
  }
</script>

<div class="users-settings">
  <header class="section-header">
    <h2>Gestion des comptes</h2>
    <p>Créez des accès pour vos rédacteurs. Seul l'administrateur peut accéder à cette page.</p>
  </header>

  <div class="admin-grid">
    <!-- FORMULAIRE -->
    <div class="user-card">
      <h3>Ajouter un rédacteur</h3>
      <form on:submit={createUser}>
        <div class="form-group">
          <label for="u-email">Adresse Email</label>
          <input type="email" id="u-email" bind:value={email} required placeholder="email@exemple.com" />
        </div>
        <div class="form-group">
          <label for="u-pass">Mot de passe provisoire</label>
          <input type="password" id="u-pass" bind:value={password} required minlength="6" />
        </div>
        <div class="form-group">
          <label for="u-role">Rôle</label>
          <select id="u-role" bind:value={role}>
            <option value="writer">Rédacteur (Articles uniquement)</option>
            <option value="admin">Administrateur (Accès total)</option>
          </select>
        </div>
        
        <button type="submit" class="btn-primary" disabled={isCreating}>
          {isCreating ? 'Création...' : 'Créer le compte'}
        </button>

        {#if message}
          <div class="msg {message.includes('Erreur') ? 'err' : 'success'}">{message}</div>
        {/if}
      </form>
    </div>

    <!-- LISTE -->
    <div class="user-card">
      <h3>Utilisateurs enregistrés</h3>
      <div class="user-list">
        {#each users as user}
          <div class="user-item">
            <div class="u-info">
              <strong>{user.email}</strong>
              <span class="u-role-badge {user.role}">{user.role}</span>
            </div>
            <button class="btn-del" on:click={() => deleteUser(user.id)}>Supprimer l'accès</button>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .users-settings { padding: 20px 0; }
  .section-header { margin-bottom: 30px; }
  .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; }
  
  .user-card {
    background: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  h3 { font-size: 18px; margin-bottom: 20px; color: #2d3748; }

  .form-group { margin-bottom: 15px; }
  label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #4a5568; }
  input, select { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px; }
  
  .btn-primary {
    width: 100%;
    background: #F68B1E;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 10px;
  }
  .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

  .msg { margin-top: 15px; padding: 10px; border-radius: 4px; font-size: 13px; text-align: center; }
  .msg.success { background: #c6f6d5; color: #22543d; }
  .msg.err { background: #fed7d7; color: #822727; }

  .user-list { display: flex; flex-direction: column; gap: 10px; }
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 1px solid #edf2f7;
    border-radius: 4px;
  }
  .u-info { display: flex; flex-direction: column; }
  .u-info strong { font-size: 14px; color: #2d3748; }
  
  .u-role-badge {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 10px;
    width: fit-content;
    margin-top: 4px;
  }
  .u-role-badge.admin { background: #ebf8ff; color: #2b6cb0; }
  .u-role-badge.writer { background: #fff5f5; color: #c53030; }

  .btn-del {
    background: none;
    border: none;
    color: #e53e3e;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-del:hover { text-decoration: underline; }

  @media(max-width: 768px) {
    .admin-grid { grid-template-columns: 1fr; }
  }
</style>
