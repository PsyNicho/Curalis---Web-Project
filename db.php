<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'cure1');
define('DB_USER', 'root');
define('DB_PASS', '');

function redirectDbError(): void
{
    header('Location: login.php?error=' . urlencode('Database setup failed.'));
    exit;
}

try {
    $rootPdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $rootPdo->exec(
        "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );

    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            phone VARCHAR(20) NOT NULL UNIQUE,
            role ENUM('user','doctor') NOT NULL DEFAULT 'user',
            age TINYINT UNSIGNED NULL,
            gender ENUM('male','female','other','prefer_not') NULL,
            specialty VARCHAR(120) NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );
} catch (PDOException $e) {
    error_log($e->getMessage());
    redirectDbError();
}
