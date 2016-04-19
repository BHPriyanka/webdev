(function(){
    angular
        .module("NetNewsApp")
        .controller("DetailsController",detailsController);

    function detailsController($location, $routeParams, ArticleService, NewsService, $rootScope, $sce) {
        var vm = this;
        vm.id = $routeParams.id;
        vm.favorite = favorite;
        vm.addReview = addReview;
        var currentUser = $rootScope.currentUser;

        function init() {
            vm.id = vm.id.replace(/_/g, '/');
            NewsService.findNewsById(vm.id)
                .then(function (response) {
                    vm.data = response.data;
                    vm.customBody = $sce.trustAsHtml(vm.data.response.content.fields.body);
                    vm.customHead = $sce.trustAsHtml(vm.data.response.content.fields.headline);
                    vm.customstandFirst = $sce.trustAsHtml(vm.data.response.content.fields.standfirst);
                });
            ArticleService.findUserLikes(vm.id)
                .then(function (response) {
                    var article = response.data;
                    vm.userLikes = article.userLikes;
                });
            ArticleService.findUserComments(vm.id)
                .then(function (response) {
                    var article = response.data;
                    vm.userComments = article.userComments;
                });
        }

        init();

        function favorite(newsId, news) {
            if (currentUser) {
                ArticleService.userLikesArticle(currentUser._id, newsId, news)
                    .then(function (response) {
                            var article = response.data;
                            if (article != null) {
                                ArticleService.findUserLikes(newsId)
                                    .then(function (response) {
                                        vm.article = response.data;
                                    })
                                $location.url('#/details');
                            }
                            else {
                                $location.url('/login');
                            }
                        },
                        function (err) {
                            vm.error = err;
                        }
                    );
            }
            else{
                $location.url('/login');
            }
        }

        function addReview(newsId, news) {
            var placeholder = "New Field";
            var ops = [];

            var comment = {
                "label": "New Comment", "type": "text", "value": "TEXTAREA",
                "placeholder": placeholder, "options": ops
            };
            if (currentUser) {
                console.log("INSIDE addReview");
                console.log([currentUser.userName, newsId]);
                ArticleService.userCommentsArticle(currentUser._id, newsId, news)
                    .then(function (response) {
                        var article = response.data;
                        console.log("DETAILS CONTROLLER FIRST CALL RESULTS");
                            if (article != null) {
                                console.log(article);
                                ArticleService.findUserComments(newsId)
                                    .then(function (response) {
                                        vm.article = response.data;
                                    })
                                $location.url('#/details');
                            }
                            else {
                                $location.url('/login');
                            }
                        },
                        function (err) {
                            vm.error = err;
                        }
                    );
            }else{
                $location.url('/login');
            }
        }
    }
})();
