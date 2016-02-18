<?php
include_once 'mysql.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
    $_POST = json_decode(file_get_contents('php://input'), true);
}
function post($var)
{
    return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
}
$post = array_map('drop_empty', $_POST);

$name = post("name");
$address = post("address");
$contact_no = post("contact_no");
$guardian_name = post("guardian_name");
$father_name = post("father_name");
$guardian_contact_no = post("guardian_contact_no");
$class_name = post("class_name");
$roll_no = post("roll_no");

$sql = "INSERT INTO students (name, address, contact_no, guardian_name, father_name, guardian_contact_no, class_name, roll_no)
VALUES ('{$name}', '$address', '$contact_no', '$guardian_name', '$father_name', $guardian_contact_no, $class_name, $roll_no)";

if ($mysqli->query($sql) === TRUE) {
    echo 'true';
//    return true;
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}
$mysqli->close();
?>