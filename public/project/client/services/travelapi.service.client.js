(function(){
    angular
        .module("NetNewsApp")
        .factory("TravelService", travelService);

    function travelService($http, $templateCache) {
        var api = {
            findTravelNews: findTravelNews
        };
        return api;

        function findTravelNews(title, callback){
            console.log("inside findTravelNews" + title);
            $http({
                method: 'JSONP',
                url: "http://content.guardianapis.com/search?format=json&tag=travel/travel&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(title),
                cache: $templateCache,
            })
                .success(callback);
        }
    }
})();