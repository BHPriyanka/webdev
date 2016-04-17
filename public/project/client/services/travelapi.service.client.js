(function(){
    angular
        .module("NetNewsApp")
        .factory("TravelService", travelService);

    function travelService($http, $templateCache) {
        var api = {
            findTravelNews: findTravelNews
        };
        return api;

        function findTravelNews(title){
           return $http.jsonp("http://content.guardianapis.com/search?format=json&tag=travel/travel&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&q="+title+"&callback=JSON_CALLBACK");
        }
    }
})();