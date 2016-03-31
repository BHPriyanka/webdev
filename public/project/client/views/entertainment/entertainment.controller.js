(function() {
    angular
        .module("NetNewsApp")
        .controller("EntertainmentController", entertainmentController);

    function entertainmentController($location, $routeParams, EntertainmentService, $rootScope) {
        var vm =this;
        console.log("Inside entertainment controller");
        vm.entertainment = entertainment;

        function init() {

        }

        init();

        function entertainment() {
            console.log("Inside entertainment method");
            $location.url("/entertainment/");
           EntertainmentService.findEntertainmentNews("culture%20and%20fashion", function (response) {
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/entertainment/');
                }
            });
        }
    }
})();
