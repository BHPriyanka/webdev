(function(){
    angular
        .module("NetNewsApp")
        .controller("HomeController", homeController);

    function homeController($location, $routeParams, NewsService, $rootScope) {
        var vm = this;
        vm.home = home;

        function init() {

        }

        init();

        function home() {
            $location.url("/home/");
            NewsService.findWorldNews("home", function (response) {
                $rootScope.data = response;
                console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/home/');
                }
            });
        }
    }
})();
