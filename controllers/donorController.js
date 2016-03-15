'use strict';

MadrasaApp.controller('addDonorController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
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
            $scope.formModel = {};
            $scope.donor.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Donor.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addDonor = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.donor.form.$setSubmitted();

            if ($scope.donor.form.$valid) {
                $nutrition.donors.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteDonorController', ['$authorize', 'donors', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, donors, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.donors.remove({id: dessert.id, tableName: 'donors'});

            deferred.$promise.then(function () {
                donors.splice(index, 1);
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
            $q.all(donors.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('donorController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            tableName: 'donors'
        };

        function getDonors(query) {
            $scope.promise = $nutrition.donors.get(query || $scope.query, success).$promise;
        }

        function success(donors) {
            $scope.donors = donors;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addDonorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/donor/form.html'
            }).then(getDonors);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteDonorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {donors: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getDonors);
        };

        $scope.onPaginate = function (page, limit) {
            getDonors(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getDonors(angular.extend({}, $scope.query, {order: order}));
        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if ($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }

            if (newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if (!newValue) {
                $scope.query.page = bookmark;
            }

            getDonors();
        });
    }]);