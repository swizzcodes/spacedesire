<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "error";
    exit;
}

// Sanitize inputs
$firstName = trim($_POST['first_name'] ?? '');
$lastName  = trim($_POST['last_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$location  = trim($_POST['location'] ?? '');
$message   = trim($_POST['message'] ?? '');

if (!$firstName || !$email || !$phone) {
    echo "error";
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP configuration (cPanel)
    $mail->isSMTP();
    $mail->Host       = 'mail.spacedesires.in';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@spacedesires.in';
    $mail->Password   = 'EMAIL_PASSWORD_HERE';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Headers
    $mail->setFrom('noreply@spacedesires.in', 'Space Desire Interiors');
    $mail->addAddress('niyazk@spacedesires.in');
    $mail->addReplyTo($email, $firstName . ' ' . $lastName);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Free Estimate Request';

    $mail->Body = "
        <h3>New Estimate Request</h3>
        <p><strong>Name:</strong> {$firstName} {$lastName}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Location:</strong> {$location}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    ";

    $mail->send();
    echo "success";

} catch (Exception $e) {
    echo "error";
}
