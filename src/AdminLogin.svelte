<script>
  export let onNavigate;
  export let onLogin;

  let email = '';
  let password = '';
  let error = '';

  function handleLogin(e) {
    e.preventDefault();
    // Simuler une connexion pour le moment
    if (email === 'admin@jumia.ci' && password === 'admin') {
      onLogin();
      onNavigate('/admin');
    } else {
      error = 'Email ou mot de passe incorrect. (Utilisez admin@jumia.ci / admin)';
    }
  }
</script>

<div class="login-wrapper">
  <div class="login-box">
    <div class="logo">
      <span style="color:#2b2b2b;">JUMIA</span><span style="color:#F68B1E;">⭐</span> <span style="font-size: 14px; color: #777;">Admin</span>
    </div>
    
    <form on:submit={handleLogin}>
      {#if error}
        <div class="error">{error}</div>
      {/if}
      
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input type="email" id="email" bind:value={email} placeholder="admin@jumia.ci" required />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" bind:value={password} placeholder="••••••••" required />
      </div>
      
      <button type="submit" class="btn-login">Se connecter</button>
    </form>
    
    <div class="back-link">
      <a href="/" on:click|preventDefault={() => onNavigate('/')}>← Retour au blog</a>
    </div>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    font-family: 'Open Sans', sans-serif;
  }
  .login-box {
    background: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    width: 100%;
    max-width: 400px;
  }
  .logo {
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 30px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }
  input:focus {
    outline: none;
    border-color: #F68B1E;
  }
  .btn-login {
    width: 100%;
    background: #F68B1E;
    color: #fff;
    border: none;
    padding: 14px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-login:hover {
    background: #d97706;
  }
  .error {
    background: #FFF0F0;
    color: #c53030;
    padding: 10px;
    border-radius: 4px;
    font-size: 13px;
    margin-bottom: 20px;
    border-left: 3px solid #c53030;
  }
  .back-link {
    text-align: center;
    margin-top: 20px;
  }
  .back-link a {
    color: #777;
    font-size: 13px;
    text-decoration: none;
  }
  .back-link a:hover {
    color: #F68B1E;
  }
</style>
