(function(){
    angular
        .module("NetNewsApp")
        .controller("HomeController", homeController);

    function homeController($location, NewsService, $sce) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            $location.url('/home');
            NewsService.findWorldNews("world", function (response) {
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
