(function() {
    angular
        .module("NetNewsApp")
        .factory("ArticleService", articleService);

    function articleService($http) {
        var api = {
            userLikesArticle: userLikesArticle,
            findUserLikes: findUserLikes,
            userCommentsArticle: userCommentsArticle,
            findUserComments : findUserComments
        };
        return api;

        function userLikesArticle(userId, newsId, news){
            newsId = newsId.replace(/\//g,'_');
            return $http.post("/api/project/user/" + userId +"/news/"+newsId, news);
        }

        function findUserLikes (newsId) {
            newsId = newsId.replace(/\//g,'_');
            return $http.get("/api/project/news/"+newsId+"/user");
        }

        function userCommentsArticle(userId, userReview, newsId, news){
            newsId = newsId.replace(/\//g,'_');
            return $http.post("/api/user/" + userId + "/news/" + newsId +"/review/"+ userReview, news);
        }

        function findUserComments (newsId) {
            newsId = newsId.replace(/\//g,'_');
            return $http.get("/api/news/"+newsId+"/user");
        }

    }
})();