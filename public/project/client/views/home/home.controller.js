(function(){
    angular
        .module("NetNewsApp")
        .controller("HomeController", homeController);

    function homeController($location, NewsService, $sce, $rootScope) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;
        vm.prev = prev;
        vm.next = next;
        $rootScope.currentPage = 1;
        function init() {
            NewsService.findWorldNews("world", $rootScope.currentPage, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/home');
                }
            });
        }

        init();


        function prev(page){

            if(page != 0){
                page = page - 1;
            }

            NewsService.findWorldNews("world", page, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/home');
                }
            });
        }

        function next(page){
            page = page + 1;

            NewsService.findWorldNews("world", page, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                if(!$rootScope.data){
                    $location.url('/home');
                }
            });
        }
    }
})();
