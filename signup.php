<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Curalis — Sign Up</title>
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
      gap: 0px;
      margin-top: -100px;
      margin-bottom: 6px;
      animation: fadeUp 1.5s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .logo { width: 200px; height: 200px; object-fit: contain; margin-top: 40px; margin-bottom: -30px;}

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
      margin-top: 6px;
    }

    input, select {
      width: 100%;
      background: #F8FBFB;
      border: 1.5px solid #3A6F6A;
      border-radius: 8px;
      padding: 11px 14px;
      font-family: 'Jost', sans-serif;
      font-size: .92rem;
      color: #000;
      outline: none;
      appearance: none;
      transition: border-color .18s, box-shadow .18s;
    }
    input::placeholder { color: #5a8a85; }
    input:focus, select:focus {
      border-color: #007F6D;
      box-shadow: 0 0 0 3px rgba(0,127,109,.12);
    }

    .select-wrap { position: relative; width: 100%; }
    #patientFields { width: 100%; }
    .select-wrap::after {
      content: '▾';
      position: absolute;
      right: 14px; top: 50%;
      transform: translateY(-50%);
      color: #007F6D;
      pointer-events: none;
    }
    select.empty { color: #5a8a85; }
    select option { color: #000; }

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

    .error-msg { color: #c0392b; font-size: .82rem; }
  </style>
</head>
<body>
  <div class="card">
    <img src="assets/img/logo.png" alt="Curalis logo" class="logo"/>
    <h1 class="cure">Curalis</h1>

    <form action="handle_signup.php" method="POST">
      <?php if (!empty($_GET['error'])): ?>
        <p class="error-msg"><?= htmlspecialchars($_GET['error']) ?></p>
      <?php endif; ?>

      <input type="text"     name="name"     placeholder="Name"      autocomplete="off" required/>
      <input type="tel"      name="phone"    placeholder="Phone No." autocomplete="username"  required/>
      <input type="number"   name="age" placeholder="Age" min="1" max="120" required/>
      <div class="select-wrap">
        <select name="gender" class="empty" required
                onchange="this.classList.remove('empty')">
          <option value="" disabled selected hidden>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer_not">Prefer not to say</option>
        </select>
      </div>
      <input type="password" name="password" placeholder="Password" minlength="6" autocomplete="new-password" required/>

      <div class="btn-row">
        <a href="login.php"   class="btn">Log In</a>
        <button type="submit" class="btn">Sign Up</button>
      </div>
    </form>
  </div>
</body>
</html>
