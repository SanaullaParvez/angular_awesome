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
    'oc.lazyLoad'
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
                templateUrl: "views/student/students.html"
            })
            .state('student_admission', {
                url: "/student_admission",
                templateUrl: "views/student/form.html"
            })
            .state('teacher', {
                url: "/teacher",
                templateUrl: "views/teacher/teachers.html"
            })
            .state('teacher_admission', {
                url: "/teacher_admission",
                templateUrl: "views/teacher/form.html"
            })
            .state('donor', {
                url: "/donor",
                templateUrl: "views/donor/donors.html"
            });
        $translateProvider.translations('bn', {
            'STUDENT': 'ছাত্র',
            'TEACHER': 'ওস্তাদ',
            'ADMISSION': 'ভর্তি',
            'DONOR': 'দাতা ',
            'ADMISSION_FROM': 'This is a paragraph',
            'STUDENT_ADMISSION':'ছাত্র ভর্তি',

            'admission_no':'ভর্তি নং ',
            'admission_date':'ভর্তির তারিখ ',
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
            'KARIMIA': '>> কারিমিয়া খালপাড় মাদ্রাসা'

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
    '$http',
    '$translate',
    '$location',
    'Records',
    '$httpParamSerializerJQLike',
    function ($scope, $http, $translate, $location, Records, $httpParamSerializerJQLike) {
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
        Records.students().then(function (students) {
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
        });


        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;
        $scope.onSubmit = function () {
            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $http({
                url: 'http://localhost/angular_awesome/models/insert.php',
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

    }]);

MadrasaApp.factory('Records', ['$http', '$q', function ($http, $q) {
    return {
        data: {
            select: 'http://localhost/angular_awesome/models/select.php'
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
}]);


MadrasaApp.controller('addItemController', ['$nutrition', '$scope', function ($nutrition, $scope) {
    'use strict';

    $scope.formModel = {};
    $scope.submitting = false;
    $scope.submitted = false;
    $scope.has_error = false;

    function error(dessert) {
        console.log(":(");
        console.log(dessert);
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = true;
    }

    function success() {
        console.log(":)");
        $scope.submitting = false;
        $scope.submitted = true;
        $scope.has_error = false;
    }

    $scope.addItem = function () {

        $scope.submitting = true;
        console.log("Hey i'm submitted!");
        console.log($scope.formModel);

        $scope.item.form.$setSubmitted();

        if($scope.item.form.$valid) {
            $nutrition.desserts.save($scope.formModel, success, error);
        }
    };

}]);
MadrasaApp.controller('deleteController', ['$authorize', 'desserts', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, desserts, $mdDialog, $nutrition, $scope, $q) {
    'use strict';

    this.cancel = $mdDialog.cancel;

    function deleteDessert(dessert, index) {
        var deferred = $nutrition.desserts.remove({id: dessert.id, tableName: 'students'});

        deferred.$promise.then(function () {
            desserts.splice(index, 1);
        });

        return deferred.$promise;
    }

    function onComplete() {
        $mdDialog.hide();
    }

    function error() {
        $scope.error = 'Invalid secret.';
    }

    function success() {
        $q.all(desserts.forEach(deleteDessert)).then(onComplete);
    }

    this.authorizeUser = function () {
        $authorize.get({secret: $scope.authorize.secret}, success, error);
    };

}]);
MadrasaApp.controller('nutritionController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
    'use strict';

    var bookmark;

    $scope.selected = [];

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.query = {
        filter: '',
        limit: '5',
        order: 'id',
        page: 1,
        tableName: 'students'
    };

    function getDesserts(query) {
        $scope.promise = $nutrition.desserts.get(query || $scope.query, success).$promise;
    }

    function success(desserts) {
        $scope.desserts = desserts;
    }

    $scope.addItem = function (event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'addItemController',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            templateUrl: 'views/student/form.html',
        }).then(getDesserts);
    };

    $scope.delete = function (event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'deleteController',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            locals: { desserts: $scope.selected },
            templateUrl: 'views/templates/delete-dialog.html',
        }).then(getDesserts);
    };

    $scope.onPaginate = function (page, limit) {
        getDesserts(angular.extend({}, $scope.query, {page: page, limit: limit}));
    };

    $scope.onReorder = function (order) {
        getDesserts(angular.extend({}, $scope.query, {order: order}));
    };

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';

        if($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };

    $scope.$watch('query.filter', function (newValue, oldValue) {
        if(!oldValue) {
            bookmark = $scope.query.page;
        }

        if(newValue !== oldValue) {
            $scope.query.page = 1;
        }

        if(!newValue) {
            $scope.query.page = bookmark;
        }

        getDesserts();
    });
}]);
MadrasaApp.factory('$nutrition', ['$resource', function ($resource) {
    'use strict';

    return {
        desserts: $resource('http://localhost/angular_awesome/models/select.php')
    };
}]);
MadrasaApp.factory('$authorize', ['$resource', function ($resource) {
    'use strict';

    return $resource('http://localhost/angular_awesome/models/authorize.php');
}]);
