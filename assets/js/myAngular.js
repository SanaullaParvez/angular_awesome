var app = angular.module('mms', [
    'jcs-autoValidate',
    'angular-ladda'
]);
app.controller('mmsCtrl', function($scope, $http) {
    $scope.base_url = 'http://localhost/angular_awesome/';
    $http.get("http://localhost/angular_awesome/model/select.php")
        .then(function (response) {
            $scope.deposits = response.data.records;
            $scope.deposit_key = Object.keys(response.data.records[0]);
        });
    $scope.visibleForm = false;
    $scope.showForm = function(){
        $scope.visibleForm = true;
    }
    //
    //$scope.formModel = {};
    //$scope.submitting = false;
    //$scope.submitted = false;
    //$scope.has_error = false;
    //
    //$scope.onSubmit = function () {
    //    $scope.submitting = true;
    //    console.log("Hey i'm submitted!");
    //    console.log($scope.formModel);
    //
    //    $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
    //    success(function (data) {
    //        console.log(":)");
    //        $scope.submitting = false;
    //        $scope.submitted = true;
    //        $scope.has_error = false;
    //    }).error(function(data) {
    //        console.log(":(");
    //        $scope.submitting = false;
    //        $scope.submitted = false;
    //        $scope.has_error = true;
    //    });
    //
    //};
});