(function() {
    angular
        .module("NetNewsApp")
        .controller("TravelController", travelController);

    function travelController($location, TravelService, $sce, $rootScope) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;
        vm.prev = prev;
        vm.next = next;

        function init() {
            TravelService.findTravelNews("travel" ,1 , function (response) {
                    for (var i in response.response.results) {
                        var id = response.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.response.results[i].id = id;
                    }
                    $rootScope.countOfPages = response.response.pages;
                    $rootScope.currentPage = response.response.currentPage;
                    $rootScope.data = response;
                    $location.url('/travel');
                });
        }

        init();

        function prev(page){

            if(page != 0){
                page = page - 1;
            }

            TravelService.findTravelNews("travel", page, function (response) {
                    for (var i in response.response.results) {
                        var id = response.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.response.results[i].id = id;
                    }
                    $rootScope.countOfPages = response.response.pages;
                    $rootScope.currentPage = response.response.currentPage;
                    $rootScope.data = response;
                    $location.url('/travel');
                });
        }

        function next(page){
            page = page + 1;

            TravelService.findTravelNews("travel", page, function (response) {
                    for (var i in response.response.results) {
                        var id = response.response.results[i].id;
                        id = id.replace(/\//g, '_');
                        response.response.results[i].id = id;
                    }
                    $rootScope.countOfPages = response.response.pages;
                    $rootScope.currentPage = response.response.currentPage;
                    $rootScope.data = response;
                    $location.url('/travel');
                });
        }

    }
})();
