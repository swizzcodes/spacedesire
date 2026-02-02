<?php

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

// Mail settings
$to      = "sales@spacedesire.in";
$subject = "New Free Estimate Request";

$body = "
<h3>New Estimate Request</h3>
<p><strong>Name:</strong> {$firstName} {$lastName}</p>
<p><strong>Email:</strong> {$email}</p>
<p><strong>Phone:</strong> {$phone}</p>
<p><strong>Location:</strong> {$location}</p>
<p><strong>Message:</strong><br>{$message}</p>
";

// Headers
$headers  = "From: noreply@spacedesire.in\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Send mail
if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "error";
}
