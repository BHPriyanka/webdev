
(function(){
    angular
        .module("NetNewsApp")
        .factory("NewsService", newsService);

    function newsService($http, $templateCache) {
        var api = {
            findWorldNews: findWorldNews
        };
        return api;

        function findWorldNews(title, callback){
            $http({
                method: 'JSONP',
                //url: "https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&output=json&callback=JSON_CALLBACK&rsz=8&q=".concat(title),
                url: "http://content.guardianapis.com/search?format=json&tag=world/world&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(title),
                cache: $templateCache
            })
                .success(callback);
        }

        function findNewsByTitle(title, callback){
            $http({
                method: 'JSONP',
                //url: "https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&output=json&callback=JSON_CALLBACK&rsz=8&q=".concat(title),
                url: "http://content.guardianapis.com/search?format=json&tag=world/world&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(title),
                cache: $templateCache
            })
                .success(callback);
        }
    }
})();