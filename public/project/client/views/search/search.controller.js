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
                console.log("Inside search method");
                $location.url("/search/"+ news.title);
                console.log(news.title);
                NewsService.findNewsByTitle(news.title, function(response){
                        $rootScope.data = response;
                        console.log($rootScope.data);
                        if($rootScope.data != null) {
                            $location.url('/search/');
                    }});
            }
        }

})();
