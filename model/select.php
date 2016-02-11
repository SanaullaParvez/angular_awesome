<?php
include_once 'mysql.php';

$result = $conn->query("SELECT * FROM deposite");
$output = ["records"=>[]];
$object = new stdClass();
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    array_push($output["records"],$rs);
}
$object = json_encode($output);
$conn->close();
print_r($object);
?>