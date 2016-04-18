"use strict";

module.exports = function(app, newsModel, NewsUserModel){
    app.post("/api/project/admin/user", createUser);
    app.post("/api/project/register", register);
    app.get("/api/project/user", findUserByUsername);
    app.get("/api/project/admin/user", findUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/admin/user/:userId", updateUser);
    app.delete("/api/project/admin/user/:userId", deleteUser);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/login", login);
    app.get("/api/project/profile/:userId", profile);


    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        NewsUserModel.findUserById(userId)
            .then(
                function (doc) {
                    user = doc;
                    return newsModel.findNewsByNewsIds(user.likes);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (articles) {
                    user.likesArticles = articles;
                    return newsModel.findNewsByNewsIds(user.comments);
             //       res.json(user);
                },

                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(articles){
                    user.commentsArticles = articles;
                    res.json(user);
                },
                function(err){
                    res.status(400).sedn(err);
                }
            )
                    /*newsModel.findNewsByNewsIds(user.likes)
                        .then(
                            function (articles) {
                                console.log("user.likes THEN");
                                user.likesArticles = articles;
                                res.json(user);
                            },

                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                    newsModel.findNewsByNewsIds(user.comments)
                        .then(
                            function (result) {
                                console.log("user.comments THEN");
                                console.log(result);
                                user.commentsArticles = result;
                                res.json(user);
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                },

                function (err) {
                    res.status(400).send(err);
                }
            );*/
    }


    function createUser(req, res) {
        var user = NewsUserModel.createUser(req.body);
        req.session.currentUser = user;
        res.json(user);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        NewsUserModel
            .findUserByUsername(newUser.userName)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return NewsUserModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if (user) {
                        res.json(user);
                    }
                },
                function(err){
                   res.status(400).send(err);
              }
            );
    }

    function login(req, res) {
        NewsUserModel.findUserByCredentials(req.query.username, req.query.password)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req,res){
        var user1 = NewsUserModel.findUserByUsername(req.query.username);
        req.session.currentUser = user1;
        res.json(user1);
    }

    function findUsers(req, res) {
        if (isAdmin(req.user)) {
            NewsUserModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        var mock = NewsUserModel.deleteUser(req.params._id);
        res.json(mock);

    }

    function findUserById(req, res){
        var userId = req.params.id;
        var user = NewsUserModel.findUserById(userId);
        res.json(user);
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body;
        NewsUserModel.updateUser(userId, user);
        res.json(200);
    }

    function logout(req, res) {
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
}

