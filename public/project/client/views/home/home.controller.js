(function(){
    angular
        .module("NetNewsApp")
        .controller("HomeController", homeController);

    function homeController($location, NewsService, $sce, $rootScope) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;

        function init() {
            NewsService.findWorldNews("world", function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/home');
                }
            });
        }

        init();
    }
})();
