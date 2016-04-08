(function(){
    angular
        .module("NetNewsApp")
        .controller("SearchController", searchController);

        function searchController($location, $routeParams, NewsService, $rootScope){
            var vm = this;

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
                $location.url("/search/");
                NewsService.findNewsByTitle(news.title, function(response){
                        for(var i in response.response.results) {
                            var id = response.response.results[i].id;
                            id = id.replace(/\//g,'_');
                            response.response.results[i].id = id;
                        }
                        $rootScope.data = response;
                        console.log($rootScope.data);
                        if($rootScope.data != null) {
                            $location.url('/search/');
                    }});
            }
        }

})();
