<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$servername = "localhost";
$username = "root";
$password = "root123";
$database = "a6207060_sana";

// Create connection
$mysqli = new mysqli($servername, $username, $password, $database);
$mysqli->set_charset('utf8');

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
if (!$mysqli->set_charset('utf8')) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit;
}
?>
