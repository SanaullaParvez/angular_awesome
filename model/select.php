<?php
include_once 'setup.php';
$table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
$num_rows = $mysqli->query("SELECT * FROM ($table_name)")->num_rows;
$limit = !empty($_GET['limit'])? $_GET['limit'] : $num_rows;
$page = !empty($_GET['page'])? ($_GET['page'] - 1) * $limit : 0;
$order = !empty($_GET['order'])? $_GET['order'] : 'id';
$filter = !empty($_GET['filter'])? $_GET['filter'].'%' : '%';

$result = $mysqli->query("SELECT * FROM ($table_name) WHERE name LIKE '$filter' ORDER BY $order LIMIT $page, $limit");
if ($result) {
    $output = ["records"=>[],"count"=>$num_rows];
    $object = new stdClass();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        array_push($output["records"],$rs);
    }
    $object = json_encode($output);
    print_r($object);
} else {
    echo "Error: " . $num_rows . "<br>" . $mysqli->error;
}
$mysqli->close();

?>