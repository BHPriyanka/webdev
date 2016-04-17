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
            $location.url("/sports/");
            SportsService.findSportsNews("sports", function (response) {
                for(var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g,'_');
                    response.response.results[i].id = id;
                }
                $rootScope.data = response;
                if ($rootScope.data != null) {
                    $location.url('/sports/');
                }
            });
        }
    }
})();
