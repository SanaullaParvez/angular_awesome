<?php
include_once 'mysql.php';
$table_name = $_GET["table_name"];
$result = $mysqli->query("SELECT * FROM ($table_name)");
$output = ["records"=>[]];
$object = new stdClass();
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    array_push($output["records"],$rs);
}
$object = json_encode($output);
$mysqli->close();
print_r($object);
?>