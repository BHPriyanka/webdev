module.exports = function(app, newsModel, NewsUserModel) {
    app.post("/api/user/:userId/news/:newsId", userCommentsArticle);
    app.post("/api/project/user/:userId/news/:newsId", userLikesArticle);
    app.get("/api/project/news/:newsId/user", findUserLikes);

    function userLikesArticle(req, res) {
        var news  = req.body;
        var userId = req.params.userId;
        var newsId = req.params.newsId;
        var article;

        newsModel
            .userLikesArticle(userId, news)
            .then(
                function (article) {
                    return NewsUserModel.userLikesArticle(userId, article);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserLikes (req, res) {
        var newsId = req.params.newsId;
        var news = null;
        newsId = newsId.replace(/_/g,'/');
        newsModel.findNewsByNewsId(newsId)
            .then(function (doc) {
                news = doc;
                if(doc){
                    return NewsUserModel.findUsersByIds(news.likes);
                } else {
                    res.json ({});
                }
            },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    news.userLikes = users;
                    res.json(news);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userCommentsArticle(req,res){
        var news  = req.body;
        var userId = req.params.userId;
        var newsId = req.params.newsId;
        var article;
        console.log("-------Server userCommentsArticle---");
        console.log(news);
        console.log(userId);
        console.log(newsId);
    }
}