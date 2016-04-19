(function() {
    angular
        .module("NetNewsApp")
        .controller("SportsController", sportsController);

    function sportsController($location, $routeParams, SportsService, $sce) {
        var vm = this;

        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            $location.url('/sports');
            SportsService.findSportsNews("sports", function (response) {
                for(var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g,'_');
                    response.response.results[i].id = id;
                }
                vm.data = response;
            });
        }

        init();

    }
})();
