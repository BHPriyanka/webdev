(function(){
    angular
        .module("NetNewsApp")
        .factory("TechService", techService);

    function techService($http, $templateCache) {
        var api = {
            findTechNews: findTechNews
        };
        return api;

        function findTechNews(title, callback){
            console.log("inside findTechNews" + title);
            $http({
                method: 'JSONP',
                url: "http://content.guardianapis.com/search?format=json&tag=technology/technology,science/science&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(title),
                cache: $templateCache,
            })
                .success(callback);
        }
    }
})();