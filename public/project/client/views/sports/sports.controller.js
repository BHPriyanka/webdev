(function() {
    angular
        .module("NetNewsApp")
        .controller("SportsController", sportsController);

    function sportsController($location, $routeParams, SportsService, $rootScope) {
        var vm = this;
        vm.sports = sports;

        function init() {
            vm.location = $location;
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
