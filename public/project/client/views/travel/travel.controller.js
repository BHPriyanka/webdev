(function() {
    angular
        .module("NetNewsApp")
        .controller("TravelController", travelController);

    function travelController($scope, $location, $routeParams, TravelService, $rootScope) {
        $scope.location = $location;
        $scope.travel = travel;

        function init() {

        }

        init();

        function travel() {
            $location.url("/travel/");
            TravelService.findTravelNews("travel", function (response) {
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/travel/');
                }
            });
        }
    }
})();
