(function(){
    angular
        .module("NetNewsApp")
        .controller("DetailsController",detailsController);

    function detailsController($location, $routeParams, NewsService, $rootScope){
        var vm = this;
        var id = $routeParams.id;
        vm.favourite = favourite;
        var currentUser = $rootScope.currentUser;

        console.log(id);

        function init() {
            vm.location = $location;
            console.log("Details Controller");
            NewsService.findNewsById(id)
                .then(function(response){
                    console.log(response.data);
                    vm.data = response.data;
                });
        }
        init();

        function favourite(newsId){
            console.log(newsId);
            if(currentUser){
                console.log([currentUser.userName, newsId]);
            } else{
                $location.url("/login");
            }
        }
    }
})();
