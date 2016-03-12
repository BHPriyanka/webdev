(function() {
    angular
        .module("NetNewsApp")
        .controller("TechController", techController);

    function techController($scope, $location, $routeParams, TechService, $rootScope) {
        $scope.location = $location;
        $scope.technology = technology;

        function init() {

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
