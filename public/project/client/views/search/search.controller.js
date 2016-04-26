(function(){
    angular
        .module("NetNewsApp")
        .controller("SearchController", searchController);

        function searchController($location, $routeParams, NewsService, $rootScope, $sce){
            var vm = this;
            vm.url = "http://content.guardianapis.com/search?show-fields=all&show-refinements=all&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q="+$routeParams.title+"&page=";
            vm.countOfPages = 0;
            vm.trustAsHtml = $sce.trustAsHtml;
            vm.prev = prev;
            vm.next = next;
            vm.message;

            function init(){
                vm.location = $location;
            }
            init();
            vm.search = search;

            function search(news){
                    NewsService.findNewsByTitle(news.title, 1, function (response) {
                        for (var i in response.response.results) {
                            var id = response.response.results[i].id;
                            id = id.replace(/\//g, '_');
                            response.response.results[i].id = id;
                        }
                        $rootScope.countOfPages = response.response.pages;
                        $rootScope.currentPage = response.response.currentPage;
                        $rootScope.startIndex = response.response.startIndex;
                        $rootScope.data = response;
                        $rootScope.title = news.title;
                        console.log($rootScope.countOfPages + " " + $rootScope.currentPage +" " + $rootScope.startIndex);
                        $location.url('/search');
                    });
                }



            function prev(title, page){

                if(page != 0){
                    page = page - 1;
                }

                NewsService.findNewsByTitle(title, page, function(response) {
                    for (var i in response.response.results) {
                        var id = response.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.response.results[i].id = id;
                    }
                    $rootScope.countOfPages = response.response.pages;
                    $rootScope.currentPage = response.response.currentPage;
                    $rootScope.data = response;
                    $location.url('/search');
                });
            }

            function next(title, page){
                page = page + 1;

                NewsService.findNewsByTitle(title, page, function(response) {
                    for (var i in response.response.results) {
                        var id = response.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.response.results[i].id = id;
                    }
                    $rootScope.countOfPages = response.response.pages;
                    $rootScope.currentPage = response.response.currentPage;
                    $rootScope.data = response;
                    //console.log($rootScope.countOfPages + " " + $rootScope.currentPage);
                    $location.url('/search');
                });
            }

        }

})();
