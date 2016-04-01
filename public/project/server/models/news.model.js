/*jslint node: true */
"use strict";

module.exports = function() {
    var api = {
        findNewsByTopic: findNewsByTopic
    }

    return api;

    function findNewsByTopic(topic){
       return $http({
            method: 'JSONP',
            url: "http://content.guardianapis.com/search?format=json&tag=travel/travel&use-date=published&show-tags=contributor&show-fields=all&show-refinements=all&order-by=newest&api-key=617dcc89-35bf-4ae2-bf4d-c4c968ceb7a0&callback=JSON_CALLBACK&q=".concat(topic)
            //cache: $templateCache
        });
    }
}