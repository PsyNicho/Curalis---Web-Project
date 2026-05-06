<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: signup.php');
    exit;
}

$name     = trim($_POST['name']     ?? '');
$phone    = trim($_POST['phone']    ?? '');
$role     = 'user';
$ageRaw   = trim($_POST['age']      ?? '');
$age      = $ageRaw === '' ? null : intval($ageRaw);
$gender   = trim($_POST['gender']   ?? '');
$password =      $_POST['password'] ?? '';

$allowedGenders = ['male', 'female', 'other', 'prefer_not'];

if (!$name || !$phone || !$password) {
    header('Location: signup.php?error=' . urlencode('Please fill in all fields.'));
    exit;
}

if ($age === null || !$gender) {
    header('Location: signup.php?error=' . urlencode('Please complete your patient profile.'));
    exit;
}
if ($age < 1 || $age > 120) {
    header('Location: signup.php?error=' . urlencode('Please enter a valid age.'));
    exit;
}
if (!in_array($gender, $allowedGenders, true)) {
    header('Location: signup.php?error=' . urlencode('Invalid gender value.'));
    exit;
}
if (strlen($password) < 6) {
    header('Location: signup.php?error=' . urlencode('Password must be at least 6 characters.'));
    exit;
}

$check = $pdo->prepare("SELECT id FROM users WHERE phone = ? LIMIT 1");
$check->execute([$phone]);
if ($check->fetch()) {
    header('Location: signup.php?error=' . urlencode('This phone number is already registered.'));
    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare(
    "INSERT INTO users (name, phone, role, age, gender, specialty, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)"
);
$stmt->execute([$name, $phone, $role, $age, $gender, null, $hash]);

$_SESSION['user_id']   = $pdo->lastInsertId();
$_SESSION['user_name'] = $name;
$_SESSION['user_role'] = $role;

header('Location: login.php?success=' . urlencode('Account created! Please log in.'));
exit;
