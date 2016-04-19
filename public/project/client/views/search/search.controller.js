(function(){
    angular
        .module("NetNewsApp")
        .controller("SearchController", searchController);

        function searchController($location, $routeParams, NewsService, $rootScope, $sce){
            var vm = this;
            vm.url = "http://content.guardianapis.com/search?show-fields=all&show-refinements=all&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q="+$routeParams.title+"&page=";

            vm.trustAsHtml = $sce.trustAsHtml;

            function init(){
                vm.location = $location;
            }
            init();
            vm.search = search;
            vm.title = $routeParams.title;

            if(vm.title){
                search(vm.title);
            }

            function search(news){
                NewsService.findNewsByTitle(news.title, function(response){
                        for(var i in response.response.results) {
                            var id = response.response.results[i].id;
                            id = id.replace(/\//g, '_');
                            response.response.results[i].id = id;
                        }
                    $rootScope.data = response;
                    if($rootScope.data != null) {
                        $location.url('/search/');
                    }});
            }
        }

})();
