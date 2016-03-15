'use strict';

MadrasaApp.controller('addCreditorController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
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
            $scope.creditor.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Creditor.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addCreditor = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.creditor.form.$setSubmitted();

            if ($scope.creditor.form.$valid) {
                $nutrition.creditors.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteCreditorController', ['$authorize', 'creditors', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, creditors, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.creditors.remove({id: dessert.id, tableName: 'creditors'});

            deferred.$promise.then(function () {
                creditors.splice(index, 1);
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
            $q.all(creditors.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('creditorController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            tableName: 'creditors'
        };

        function getCreditors(query) {
            $scope.promise = $nutrition.creditors.get(query || $scope.query, success).$promise;
        }

        function success(creditors) {
            $scope.creditors = creditors;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addCreditorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/creditor/form.html'
            }).then(getCreditors);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteCreditorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {creditors: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getCreditors);
        };

        $scope.onPaginate = function (page, limit) {
            getCreditors(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getCreditors(angular.extend({}, $scope.query, {order: order}));
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

            getCreditors();
        });
    }]);