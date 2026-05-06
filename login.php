<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Curalis — Log In</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #E6F6F4;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Jost', sans-serif;
      padding: 32px 16px;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: -100px;
      margin-bottom: 6px;
      animation: fadeUp 1.5s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .logo { width: 200px; height: 200px; object-fit: contain; margin-bottom: -50px; }

    .cure {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.8rem;
      font-weight: 400;
      color: #1F3A3A;
      letter-spacing: .02em;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      width: 300px;
      margin-top: -20px;
    }

    input {
      width: 100%;
      background: #F8FBFB;
      border: 1.5px solid #3A6F6A;
      border-radius: 8px;
      padding: 11px 14px;
      font-family: 'Jost', sans-serif;
      font-size: .92rem;
      color: #000;
      outline: none;
      transition: border-color .18s, box-shadow .18s;
    }
    input::placeholder { color: #5a8a85; }
    input:focus {
      border-color: #007F6D;
      box-shadow: 0 0 0 3px rgba(0,127,109,.12);
    }

    .btn-row { display: flex; gap: 12px; margin-top: 8px; margin-left: 20px}

    .btn {
      background: #2A9D8F;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 10px 28px;
      font-family: 'Jost', sans-serif;
      font-size: .92rem;
      cursor: pointer;
      text-decoration: none;
      transition: background .18s, transform .12s;
    }
    .btn:hover  { background: #18766C; }
    .btn:active { background: #0F5C55; transform: scale(.97); }

    .error-msg   { color: #c0392b; font-size: .82rem; }
    .success-msg { color: #007F6D; font-size: .82rem; }
  </style>
</head>
<body>
  <div class="card">
    <img src="assets/img/logo.png" alt="Curalis logo" class="logo"/>
    <h1 class="cure">Curalis</h1>

    <form action="handle_login.php" method="POST">
      <?php if (!empty($_GET['error'])): ?>
        <p class="error-msg"><?= htmlspecialchars($_GET['error']) ?></p>
      <?php endif; ?>
      <?php if (!empty($_GET['success'])): ?>
        <p class="success-msg"><?= htmlspecialchars($_GET['success']) ?></p>
      <?php endif; ?>

      <input type="tel"      name="phone"    placeholder="Phone No"  autocomplete="tel"              required/>
      <input type="password" name="password" placeholder="Password"  autocomplete="current-password" required minlength="6"/>

      <div class="btn-row">
        <button type="submit" class="btn">Log In</button>
        <a href="signup.php"  class="btn">Sign Up</a>
      </div>
    </form>
  </div>
</body>
</html>
