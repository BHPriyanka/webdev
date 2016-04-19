(function() {
    angular
        .module("NetNewsApp")
        .controller("EntertainmentController", entertainmentController);

    function entertainmentController($location, $rootScope, EntertainmentService, $sce) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            EntertainmentService.findEntertainmentNews("culture%20and%20fashion", function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/entertainment');
                }
            });
        }

        init();
    }
})();
