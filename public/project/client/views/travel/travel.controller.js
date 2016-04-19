(function() {
    angular
        .module("NetNewsApp")
        .controller("TravelController", travelController);

    function travelController($location, TravelService, $sce, $rootScope) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            TravelService.findTravelNews("travel")
                .then(function (response) {
                    for (var i in response.data.response.results) {
                        var id = response.data.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.data.response.results[i].id = id;
                    }
                    $rootScope.data = response.data;
                    $location.url('/travel');
                });
        }

        init();

    }
})();
