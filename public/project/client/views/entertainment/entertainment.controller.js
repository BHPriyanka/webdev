(function() {
    angular
        .module("NetNewsApp")
        .controller("EntertainmentController", entertainmentController);

    function entertainmentController($location, $routeParams, EntertainmentService, $rootScope) {
        var vm =this;
        vm.entertainment = entertainment;

        function init() {

        }

        init();

        function entertainment() {
            $location.url("/entertainment/");
           EntertainmentService.findEntertainmentNews("culture%20and%20fashion", function (response) {
               for(var i in response.response.results) {
                   var id = response.response.results[i].id;
                   id = id.replace(/\//g,'_');
                   response.response.results[i].id = id;
               }
                $rootScope.data = response;
                if ($rootScope.data != null) {
                    $location.url('/entertainment/');
                }
            });
        }
    }
})();
