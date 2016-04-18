module.exports = function(app, newsModel, NewsUserModel) {
    app.post("/api/project/user/:userId/news/:newsId", userLikesArticle);
    app.get("/api/project/news/:newsId/user", findUserLikes);
    app.post("/api/user/:userId/news/:newsId", userCommentsArticle);
    app.get("/api/news/:newsId/user", findUserComments);

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

    function userCommentsArticle(req, res){
        var news  = req.body;
        var userId = req.params.userId;
        var newsId = req.params.newsId;
        var article;
        console.log("---------userCommentsArticle---");
        newsModel
            .userCommentsArticle(userId, news)
            .then(
                function (article) {
                    console.log("----MODEL results-----");
                    console.log(article);
                    return NewsUserModel.userCommentsArticle(userId, article);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    console.log("second then");
                    console.log(user);
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserComments (req, res) {
        var newsId = req.params.newsId;
        var news = null;
        newsId = newsId.replace(/_/g,'/');
        newsModel.findNewsByNewsId(newsId)
            .then(function (doc) {
                    news = doc;
                    if(doc){
                        console.log("----findUserComments---");
                        return NewsUserModel.findUsersByIds(news.comments);
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
                    console.log("before insitializing userComments")
                    console.log(users);
                    news.userComments = users;
                    res.json(news);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}