(function() {
    angular
        .module("NetNewsApp")
        .controller("SportsController", sportsController);

    function sportsController($location, $rootScope, SportsService, $sce) {
        var vm = this;

        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            SportsService.findSportsNews("sports", function (response) {
                for(var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g,'_');
                    response.response.results[i].id = id;
                }
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/sports');
                }
            });
        }

        init();

    }
})();
