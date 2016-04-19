(function() {
    angular
        .module("NetNewsApp")
        .controller("TechController", techController);

    function techController($location, $rootScope, TechService, $sce) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            TechService.findTechNews("technology%20and%20science", function (response) {
                for(var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g,'_');
                    response.response.results[i].id = id;
                }
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/technology');
                }
            });
        }

        init();
    }
})();
