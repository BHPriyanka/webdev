(function() {
    angular
        .module("NetNewsApp")
        .controller("TravelController", travelController);

    function travelController($location, $routeParams, TravelService, $rootScope) {
        var vm =this;
        vm.travel = travel;

        function init() {
            vm.location = $location;
        }

        init();

        function travel() {
            TravelService.findTravelNews("travel")
                .then(function (response) {
                    for(var i in response.data.response.results) {
                        var id = response.data.response.results[i].id;
                        id = id.replace(/\//g,'_');
                        response.data.response.results[i].id = id;
                    }

                    $rootScope.data = response.data;
                    if ($rootScope.data != null) {
                        $location.url('/travel');
                    }
            });
        }
    }
})();
