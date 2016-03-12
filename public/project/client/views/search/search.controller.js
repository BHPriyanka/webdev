(function(){
    angular
        .module("NetNewsApp")
        .controller("SearchController", searchController);

        function searchController($scope, $location, $routeParams, NewsService, $rootScope){
            $scope.location = $location;
            $scope.search = search;
            $scope.title = $routeParams.title;

            function init(){

            }
            init();

            if($scope.title){
                search($scope.title);
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
