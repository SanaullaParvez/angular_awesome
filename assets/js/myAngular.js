angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null
}
var app = angular.module('mms', [
    'jcs-autoValidate',
    'angular-ladda',
    'ui.router',
    'pascalprecht.translate',
    'md.data.table',
    'ngMaterial',
    'ngResource'
]);

app.config(function ($httpProvider) {
    //$httpProvider.defaults.headers.common['Access-Token'] = '562391dc787b6bbabb0c99dd8db05160e989c68d0fc9ec29ee96dce3d247ddbe7bb368711ff361e67eee3ee7c465347f17b115fc63f7fc6f2b03044e87d09eda'
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

});

app.config([
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
                templateUrl: "view/404.html"
            })
            .state('home', {
                url: "/home",
                templateUrl: "view/home.html"
            })
            .state('student', {
                url: "/student",
                templateUrl: "view/student/students.html"
            })
            .state('student_admission', {
                url: "/student_admission",
                templateUrl: "view/student/form.html"
            })
            .state('teacher', {
                url: "/teacher",
                templateUrl: "view/teacher/teachers.html"
            })
            .state('teacher_admission', {
                url: "/teacher_admission",
                templateUrl: "view/teacher/form.html"
            })
            .state('donor', {
                url: "/donor",
                templateUrl: "view/donor/donors.html"
            });
        $translateProvider.translations('bn', {
            'STUDENT': 'ছাত্র',
            'TEACHER': 'ওস্তাদ',
            'ADMISSION': 'ভর্তি',
            'DONOR': 'দাতা ',
            'ADMISSION_FROM': 'This is a paragraph',
            'STUDENT_ADMISSION':'ছাত্র ভর্তি'

        });
        $translateProvider.preferredLanguage('bn');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }]);

app.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
    'use strict';
    $compileProvider.debugInfoEnabled(true);
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue');
}]);

app.controller('mmsCtrl', [
    '$scope',
    '$http',
    '$translate',
    '$location',
    'Records',
    '$httpParamSerializerJQLike',
    '$nutrition',
    function ($scope, $http, $translate, $location, Records, $httpParamSerializerJQLike, $nutrition) {
        $scope.autoScroll = true;
        $scope.base_url = 'http://localhost/angular_awesome/';

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
                url: 'http://localhost/angular_awesome/model/insert.php',
                method: 'POST',
                paramSerializer: '$httpParamSerializerJQLike',
                data: $scope.formModel
            }).success(function (data) {
                console.log(":)");
                console.log(data);
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
        console.log($nutrition.desserts)


    }]);

app.factory('Records', ['$http', '$q', function ($http, $q) {
    return {
        data: {
            select: 'http://localhost/angular_awesome/model/select.php'
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


app.controller('addItemController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
    'use strict';

    this.cancel = $mdDialog.cancel;

    function success(dessert) {
        $mdDialog.hide(dessert);
    }

    this.addItem = function () {
        $scope.item.form.$setSubmitted();

        if($scope.item.form.$valid) {
            $nutrition.desserts.save({dessert: $scope.dessert}, success);
        }
    };

}]);
app.controller('deleteController', ['$authorize', 'desserts', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, desserts, $mdDialog, $nutrition, $scope, $q) {
    'use strict';

    this.cancel = $mdDialog.cancel;

    function deleteDessert(dessert, index) {
        var deferred = $nutrition.desserts.remove({id: dessert._id});

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
app.controller('nutritionController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
        order: 'nameToLower',
        page: 1
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
            templateUrl: 'templates/add-item-dialog.html',
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
            templateUrl: 'templates/delete-dialog.html',
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
app.factory('$nutrition', ['$resource', function ($resource) {
    'use strict';

    return {
        desserts: $resource('http://localhost/angular_awesome/model/select.php?table_name=students')
    };
}]);
app.factory('$authorize', ['$resource', function ($resource) {
    'use strict';

    return $resource('https://infinite-earth-4803.herokuapp.com/authorize/:secret');
}]);
