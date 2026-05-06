<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

$phone    = trim($_POST['phone']    ?? '');
$password =      $_POST['password'] ?? '';

if (!$phone || !$password) {
    header('Location: login.php?error=' . urlencode('Please fill in all fields.'));
    exit;
}

$stmt = $pdo->prepare("SELECT id, name, role, password_hash FROM users WHERE phone = ? LIMIT 1");
$stmt->execute([$phone]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password_hash'])) {
    $_SESSION['user_id']   = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_role'] = $user['role'] ?? 'user';

    if (($_SESSION['user_role'] ?? 'user') === 'doctor') {
        header('Location: doctor-home.html');
    } else {
        header('Location: home.html');
    }
} else {
    header('Location: login.php?error=' . urlencode('Incorrect phone number or password.'));
}
exit;
