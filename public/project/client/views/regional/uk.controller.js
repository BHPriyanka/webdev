(function(){
    angular
        .module("NetNewsApp")
        .controller("UKController", ukController);

    function ukController($scope, $location, $routeParams, UKService, $rootScope) {
        $scope.location = $location;
        $scope.uk = uk;

        function init() {

        }

        init();

        function uk() {
            console.log("Inside sports method");
            $location.url("/regional/uk");
            SportsService.findUKNews("uk", function (response) {
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/regional/uk/');
                }
            });
        }
    }
})();