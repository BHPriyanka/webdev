(function() {
    angular
        .module("NetNewsApp")
        .controller("EntertainmentController", entertainmentController);

    function entertainmentController($location, $rootScope, EntertainmentService, $sce) {
        var vm = this;
        vm.trustAsHtml = $sce.trustAsHtml;
        vm.prev = prev;
        vm.next = next;

        function init() {
            EntertainmentService.findEntertainmentNews("culture%20and%20fashion", 1, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                console.log($rootScope.data);
                if(!$rootScope.data){
                    $location.url('/entertainment');
                }
            });
        }

        init();


        function prev(page){

            if(page != 0){
                page = page - 1;
            }

            EntertainmentService.findEntertainmentNews("culture%20and%20fashion", page, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                console.log($rootScope.data);
                if(!$rootScope.data){
                    $location.url('/entertainment');
                }
            });
        }

        function next(page){
            page = page + 1;

            EntertainmentService.findEntertainmentNews("culture%20and%20fashion", page, function (response) {
                for (var i in response.response.results) {
                    var id = response.response.results[i].id;
                    id = id.replace(/\//g, '_');
                    response.response.results[i].id = id;
                }
                $rootScope.countOfPages = response.response.pages;
                $rootScope.currentPage = response.response.currentPage;
                $rootScope.data = response;
                console.log($rootScope.data);
                if(!$rootScope.data){
                    $location.url('/entertainment');
                }
            });
        }
    }
})();
