(function(){
    angular
        .module("NetNewsApp")
        .factory("UKService", ukService);

    function ukService($http, $templateCache) {
        var api = {
            findUKNews: findUKNews
        };
        return api;

        function findUKNews(title, callback){
            console.log("inside findUKNews" + title);
            $http({
                method: 'JSONP',
                url: "http://content.guardianapis.com/search?format=json&tag=uk/uk&use-date=last-modified&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(title),
                cache: $templateCache,
            })
                .success(callback);
        }
    }
})();