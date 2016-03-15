angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null
}
var MadrasaApp = angular.module('mms', [
    'jcs-autoValidate',
    'angular-ladda',
    'ui.router',
    'pascalprecht.translate',
    'md.data.table',
    'ngMaterial',
    'ngResource',
    'oc.lazyLoad',
    'ngFlash'
]);

MadrasaApp.config(function ($httpProvider) {
    //$httpProvider.defaults.headers.common['Access-Token'] = '562391dc787b6bbabb0c99dd8db05160e989c68d0fc9ec29ee96dce3d247ddbe7bb368711ff361e67eee3ee7c465347f17b115fc63f7fc6f2b03044e87d09eda'
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

});

MadrasaApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/404");
        //
        // Now set up the states
        $stateProvider
            .state('404', {
                url: "/404",
                templateUrl: "views/404.html"
            })
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            })
            .state('student', {
                url: "/student",
                templateUrl: "views/student/students.html",
                controller: 'studentController'
            })
            .state('student_admission', {
                url: "/student_admission",
                templateUrl: "views/student/form.html",
                controller: 'addStudentController'
            })
            .state('teacher', {
                url: "/teacher",
                templateUrl: "views/teacher/teachers.html",
                controller: 'teacherController'
            })
            .state('teacher_admission', {
                url: "/teacher_admission",
                templateUrl: "views/teacher/form.html",
                controller: 'addTeacherController'
            })
            .state('donor', {
                url: "/donor",
                templateUrl: "views/donor/donors.html",
                controller: 'donorController'
            })
            .state('donor_admission', {
                url: "/donor_admission",
                templateUrl: "views/donor/form.html",
                controller: 'addDonorController'
            })
            .state('creditor', {
                url: "/creditor",
                templateUrl: "views/creditor/creditors.html",
                controller: 'creditorController'
            })
            .state('creditor_admission', {
                url: "/creditor_admission",
                templateUrl: "views/creditor/form.html",
                controller: 'addCreditorController'
            });
        $translateProvider.translations('bn', {
            'KARIMIA': '>> কারিমিয়া খালপাড় মাদ্রাসা',

            'TEACHER': 'ওস্তাদ',
            'TEACHER_ADMISSION': 'নতুন ওস্তাদ',
            'ID': 'ক্রমিক নং ',
            'teacher_admission_no': 'নিয়োগ নং ',
            'teacher_admission_date': 'মাস ',
            'name': 'নাম ',
            'address': 'ঠিকানা ',
            'cantact_no': 'মোবাইল নং ',
            'designation': 'পদবী ',
            'basic_salary': 'মূল বেতন ',
            'honors_salary': 'অতিরিক্ত দায়িত্বের সম্মানী ',
            'attendance_salary': 'উপস্থিতি ',
            'eid_bonus': 'ঈদ বোনাস ',
            'effort_bonus': 'মেহনত বোনাস ',
            'treatment_bonus': 'চিকিৎসা বোনাস ',
            'previous_due_salary': 'পূর্বের বকেয়া ',
            'advance_salary': 'অগ্রিম ',
            'total_salary': 'মোট প্রাপ্য ',


            'STUDENT': 'ছাত্র',
            'ADMISSION': 'ভর্তি',
            'STUDENT_ADMISSION': 'ছাত্র ভর্তি',
            'admission_no': 'ভর্তি নং ',
            'admission_date': 'ভর্তির তারিখ ',
            'student_name': 'ছাত্রের নাম ',
            'age': 'বয়স ',
            'father_name': 'পিতার নাম ',
            'guardian_name': 'অভিভাবক ',
            'relation': 'সম্পর্ক ',
            'contact_no': 'মোবাইল ',
            'class_name': 'জামাত ',
            'rental_bill': 'বোডিং বাবদ',
            'monthly_fees': 'বেতন বাবদ ',
            'book_bill': 'কিতাব বাবদ ',
            'cash': 'নগদ ',
            'arrears': 'বকেয়া ',

            'DONOR': 'দাতা ',
            'donor_name': 'দাতার নাম ',
            'date_of_registration': 'তারিখ ',
            'amount': 'পরিমাণ ',
            'start_date': 'মাস ',
            'DONOR_ADMISSION': ' নতুন দাতা ',


            'CREDITOR': 'পাওনাদার ',
            'creditor_name': 'দাতার নাম ',
            'description': 'বিবরণ ',
            'rate': 'দর ',
            'total': 'মোট ',
            'previous_due': 'পূর্বের দেনা  ',
            'payment': 'পরিশোধ ',
            'current_dues': 'বর্তমান প্রাপ্য',
            'CREDITOR_ADMISSION': ' নতুন পাওনাদার '


        });
        $translateProvider.preferredLanguage('bn');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }]);

MadrasaApp.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
    'use strict';
    $compileProvider.debugInfoEnabled(true);
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue');
}]);

MadrasaApp.controller('mmsCtrl', [
    '$scope',
    '$filter',
    '$http',
    '$translate',
    '$location',
    //'Records',
    '$httpParamSerializerJQLike',
    function ($scope, $filter, $http, $translate, $location, Records, $httpParamSerializerJQLike) {
        $scope.autoScroll = true;
        /**
         * Function to change the default language
         * @param {String} key - language key
         */
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
        $scope.isSidebarOpen = true;
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        /**
         * Function to get data list from Database
         */
        /*        Records.students().then(function (students) {
         console.log(students);
         $scope.students = students;
         $scope.student_key = students.length ? Object.keys(students[0]) : '';
         });
         Records.teachers().then(function (teachers) {
         console.log(teachers);
         $scope.teachers = teachers;
         $scope.teacher_key = teachers.length ? Object.keys(teachers[0]) : '';
         });
         Records.jamats().then(function (jamats) {
         console.log(jamats);
         $scope.jamats = jamats;
         });
         Records.donors().then(function (donors) {
         console.log(donors);
         $scope.donors = donors;
         $scope.donor_key = donors.length ? Object.keys(donors[0]) : '';
         });*/

        /*
         $scope.formModel = {};
         $scope.submitting = false;
         $scope.submitted = false;
         $scope.has_error = false;
         $scope.onSubmit = function () {
         $scope.submitting = true;
         console.log("Hey i'm submitted!");
         console.log($scope.formModel);

         $http({
         url: 'http://localhost/angular_awesome/models/student.php',
         method: 'POST',
         paramSerializer: '$httpParamSerializerJQLike',
         data: $scope.formModel
         }).success(function (data) {
         console.log(":)");
         $scope.submitting = false;
         $scope.submitted = true;
         $scope.has_error = false;
         }).error(function(data) {
         console.log(":(");
         console.log(data);
         $scope.submitting = false;
         $scope.submitted = false;
         $scope.has_error = true;
         });

         };
         */

    }]);
MadrasaApp.factory('$nutrition', ['$resource', function ($resource) {
    'use strict';

    return {
        students: $resource('http://localhost/angular_awesome/models/student.php'),
        donors: $resource('http://localhost/angular_awesome/models/donor.php'),
        teachers: $resource('http://localhost/angular_awesome/models/teacher.php'),
        creditors: $resource('http://localhost/angular_awesome/models/creditor.php')
    };
}]);
MadrasaApp.factory('$authorize', ['$resource', function ($resource) {
    'use strict';

    return $resource('http://localhost/angular_awesome/models/authorize.php');
}]);
MadrasaApp.filter('translateToBengali', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'জানুয়ারী ', 'ফেব্রুয়ারি ', 'মার্চ', 'এপ্রিল', 'মে ', 'জুন ',
            'জুলাই ', 'অগাস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর' ];
        return monthNames[monthNumber - 1];
    }
}]);
/*MadrasaApp.factory('Records', ['$http', '$q', function ($http, $q) {
    return {
        data: {
            select: 'http://localhost/angular_awesome/models/student.php'
        },
        students: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'students'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        teachers: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'teachers'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        jamats: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'jamats'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        donors: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'donors'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        }
    }
}]);*/
