(function() {
    angular
        .module("NetNewsApp")
        .controller("TechController", techController);

    function techController($location, $routeParams, TechService, $rootScope) {
        var vm = this;
        vm.technology = technology;

        function init() {
            vm.location = $location;
        }

        init();

        function technology() {
            $location.url("/technology/");
            TechService.findTechNews("technology%20and%20science", function (response) {
                for(var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g,'_');
                    response.response.results[i].id = id;
                }

                $rootScope.data = response;
                if ($rootScope.data != null) {
                    $location.url('/technology/');
                }
            });
        }
    }
})();
