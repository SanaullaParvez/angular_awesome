var app = angular.module('wom-ads', []);

app.directive("w3TestDirective", function () {
    return {
        restrict: "M",
        replace: true,
        template: "<h3>My First Angular</h3>"
    };
});
app.config(function ($httpProvider) {
    //$httpProvider.defaults.headers.common['Access-Token'] = '562391dc787b6bbabb0c99dd8db05160e989c68d0fc9ec29ee96dce3d247ddbe7bb368711ff361e67eee3ee7c465347f17b115fc63f7fc6f2b03044e87d09eda'
        $httpProvider.defaults.headers.common['Authorization'] = 'Token ecd811c80f2a83a2f3c959d19fe6506cd8abb9a8'

});

app.controller('AdsCtrl', ['$http', '$scope', 'Campaigns', 'ContactService', function ($http, $scope, Campaigns, ContactService) {
    //$scope.students = ["Sanaulla", "Sahidul", "Talha", "Sanjoy", "Sufian"]
    $scope.myvar = "Moon..."
    $scope.$watch("myvar", function (oldValue, newValue) {
        console.log(newValue + ':' + oldValue);
    });

        //Campaigns.getCampaign().then(function (campaigns) {
        //    console.log(campaigns)
        //    $scope.campaigns = campaigns;
        //})

        ContactService.loadContacts();
        $scope.model = {
            'contacts': ContactService.contacts
        }
}]);

app.service("ContactService", function ($http) {
    var self = {
        'loadContacts': function () {
            $http.get("https://codecraftpro.com/api/samples/v1/contact/")
                .success(function success(data) {
                    console.log(data)
                })
                .error(function erros(msg) {
                    console.log(msg)
                })
        }
    }
    return self;
})

app.service("Campaigns", ['$http', '$q', function ($http, $q) {
    this.getCampaign = function () {
        var d = $q.defer();
        $http.get("https://api.insightpool.com/ads/clients/1/accounts/59p6hy/campaigns").success(function (data) {
//                    console.log(data.results)
            d.resolve(data)
        });
        return d.promise;
    }
//        return getCampaign;
}])


//    var swfUrl = "./js/honehone_clock_tr.swf";
//    var swfTitle = "honehoneclock";
//    document.write('<embed wmode="transparent" src="' + swfUrl + '" quality="high" bgcolor="#ffffff" width="160" height="70" name="' + swfTitle + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');