(function() {
    angular
        .module("NetNewsApp")
        .controller("SportsController", sportsController);

    function sportsController($scope, $location, $routeParams, SportsService, $rootScope) {
        $scope.location = $location;
        $scope.sports = sports;

        function init() {

        }

        init();

        function sports() {
            console.log("Inside sports method");
            $location.url("/sports/");
            SportsService.findSportsNews("sports", function (response) {
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/sports/');
                }
            });
        }
    }
})();
