## Learn Real World AngularJS Step By Step by CodeCraft
http://codecraftpro.com

### Section 1 - How to submit and validate a form in AngularJS

__Folders__

./libs/ - The required libraries for all lectures in this course.
* [lesson1](./lesson1/index.html) - Starter template for lecture 1
* [lesson2](./lesson2/index.html) - Starter template for lecture 2
* [lesson3](./lesson3/index.html) - Starter template for lecture 3
* [lesson4](./lesson4/index.html) - Starter template for lecture 4
* [lesson5](./lesson5/index.html) - Starter template for lecture 5
* [lesson6](./lesson6/index.html) - Starter template for lecture 6
* [lesson7](./lesson7/index.html) - Starter template for lecture 7
* [lesson8](./lesson8/index.html) - The completed application for this section
* [practice](./practice/index.html) - In progressing application for this section

##PHP
* __The global Keyword:__ To get and change the global variable 
```
$x = 5;
function myTest() {
    global $x;
    $GLOBALS['x'] = 15;
    echo $x
}
echo $x;
```
*  __The static Keyword:__ static local variable NOT to be deleted.
```
function myTest() {
    static $x = 0;
    echo $x;
    $x++;
}
myTest();
myTest();
```
* __Data Type__
```
$x = array("Volvo","BMW","Toyota");
var_dump($x);
```
* __PHP Object__
```
class Car {
     function Car() {
         $this->model = "VW";
     }
}
// create an object
$herbie = new Car();

// show object properties
echo $herbie->model;
```
* __PHP Constant:__Constants are automatically global 
```
define("GREETING", "Welcome to W3Schools.com!", true);
echo greeting;
```
* __PHP for Loop:__
```
for ($x = 0; $x <= 10; $x++) {
    echo "The number is: $x <br>";
}

$colors = array("red", "green", "blue", "yellow"); 
foreach ($colors as $value) {
    echo "$value <br>";
}

$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
foreach($age as $x => $x_value) {
    echo "Key=" . $x . ", Value=" . $x_value;
    echo "<br>";
}

$cars = array
  (
  array("Volvo",22,18),
  array("BMW",15,13),
  array("Saab",5,2),
  array("Land Rover",17,15)
  );

for ($row = 0; $row < 4; $row++) {
  echo "<p><b>Row number $row</b></p>";
  echo "<ul>";
  for ($col = 0; $col < 3; $col++) {
    echo "<li>".$cars[$row][$col]."</li>";
  }
  echo "</ul>";
}

```
* __PHP Global Variables - Superglobals__
```
$GLOBALS
$_SERVER
$_REQUEST
$_POST
$_GET
$_FILES
$_ENV
$_COOKIE
$_SESSION
```
