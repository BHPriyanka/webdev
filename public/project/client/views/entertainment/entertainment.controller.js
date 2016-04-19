(function() {
    angular
        .module("NetNewsApp")
        .controller("EntertainmentController", entertainmentController);

    function entertainmentController($location, EntertainmentService, $sce) {
        var vm =this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            $location.url('/entertainment');
            EntertainmentService.findEntertainmentNews("culture%20and%20fashion", function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                vm.data = response;
            });
        }

        init();
    }
})();
