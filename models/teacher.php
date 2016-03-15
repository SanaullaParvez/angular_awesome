<?php
include_once 'setup.php';
$method = $_SERVER['REQUEST_METHOD'];
$table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
if ($method == 'GET'){
    $num_rows = $mysqli->query("SELECT * FROM ($table_name)")->num_rows;
    $limit = !empty($_GET['limit'])? $_GET['limit'] : $num_rows;
    $page = !empty($_GET['page'])? ($_GET['page'] - 1) * $limit : 0;
    $rest = !empty($_GET['order'])? substr($_GET['order'], 0, 1): '';
    if(!empty($_GET['order'])){
        if(substr($_GET['order'], 0, 1) === '-'){
            $order = substr($_GET['order'], 1).' '.'DESC';
        }else{
            $order = $_GET['order'];
        }
    }else{
        $order = 'id';
    }
    $filter = !empty($_GET['filter'])? $_GET['filter'].'%' : '%';

    $sql = "SELECT * FROM ($table_name) WHERE name LIKE '$filter' ORDER BY $order LIMIT $page, $limit";
    $result = $mysqli->query($sql);
    if ($result) {
        $output = ["records"=>[],"count"=>$num_rows];
        $object = new stdClass();
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($output["records"],$rs);
        }
        $object = json_encode($output);
        echo $object;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}elseif($method == 'DELETE'){
    $id = !empty($_GET['id'])? $_GET['id'] : '';
    $sql = "DELETE FROM $table_name WHERE id=$id";

    if ($mysqli->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "Error deleting record: " . $mysqli->error;
    }
}elseif($method === 'POST'){
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
    function post($var)
    {
        return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
    }
    $admission_no = post("admission_no");
    $admission_date = !empty($_POST["admission_date"]) ? date("Y-m-d H:i:s", strtotime($_POST["admission_date"])) : date("Y-m-d H:i:s");
    $name = post("name");
    $address = post("address");
    $contact_no = post("contact_no");
    $designation = post("designation");
    $basic_salary = post("basic_salary");
    $honors_salary = post("honors_salary");
    $attendance_salary = post("attendance_salary");
    $eid_bonus = post("eid_bonus");
    $effort_bonus = post("effort_bonus");
    $treatment_bonus = post("treatment_bonus");
    $previous_due_salary = post("previous_due_salary");
    $advance_salary = post("advance_salary");
    $payment = post("payment");

    $sql = "INSERT INTO teachers (`admission_no`, `admission_date`, `name`, `address`, `contact_no`, `designation`, `basic_salary`, `honors_salary`, `attendance_salary`, `eid_bonus`, `effort_bonus`, `treatment_bonus`, `previous_due_salary`, `advance_salary`, `payment`)
            VALUES ($admission_no, '{$admission_date}', '{$name}', '{$address}', '{$contact_no}', '{$designation}',
            $basic_salary, $honors_salary, $attendance_salary, $eid_bonus, $effort_bonus, $treatment_bonus, $previous_due_salary, $advance_salary, $payment)";

    if ($mysqli->query($sql) === TRUE) {
        return true;
//    return true;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();

?>