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
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/technology/');
                }
            });
        }
    }
})();
