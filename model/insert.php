<?php
include_once 'setup.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
    $_POST = json_decode(file_get_contents('php://input'), true);
}
function post($var)
{
    return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
}
$post = array_map('drop_empty', $_POST);

$admission_no = post("admission_no");
$admission_date = post("admission_date");
$name = post("name");
$age = post("age");
$father_name = post("father_name");
$guardian_name = post("guardian_name");
$relation = post("relation");
$contact_no = post("contact_no");
$class_name = post("class_name");
$rental_bill = post("rental_bill");
$monthly_fees = post("monthly_fees");
$book_bill = post("book_bill");
$cash = post("cash");
$arrears = post("arrears");

$sql = "INSERT INTO students (`admission_no`, `admission_data`, `name`, `age`, `father_name`, `guardian_name`, `relation`, `contact_no`, `class_name`, `rental_bill`, `monthly_fees`, `book_bill`, `cash`, `arrears`)
VALUES ($admission_no, $admission_date, '{$name}', $age, '{$father_name}', '{$guardian_name}', '{$relation}', '{$contact_no}', $class_name, $rental_bill, $monthly_fees, $book_bill, $cash, $arrears)";

if ($mysqli->query($sql) === TRUE) {
    echo 'true';
//    return true;
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}
$mysqli->close();
?>