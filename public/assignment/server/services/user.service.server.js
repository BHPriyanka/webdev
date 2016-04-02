/*jslint node: true */
"use strict";

module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);

    function createUser(req, res) {
        /*var user = userModel.createUser(req.body);
        req.session.currentUser = user;
        res.json(user);*/
        var user = req.body;
        user = userModel.createUser(user)
            .then(
                //login if user promise resolved
                function( doc){
                    req.session.currentUser = doc;
                    res.json(user);
                },
                //send error if promise rejected
                function( err){
                    res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                var user = userModel.findUserByCredentials(req.query.username, req.query.password)
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
            else {
                var user1 = userModel.findUserByUsername(req.query.username)
                    .then(
                        function (doc) {
                            req.session.currentUser = doc;
                            res.json(doc);
                        },
                        function (err) {
                            res.status(400).send(err);
                        });
            }
        }
        else {
            var users = userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err){
                        res.status(400).send(err);
                    });
        }
    }

    function deleteUser(req, res) {
        var mock = userModel.deleteUser(req.params._id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res){
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
                function (doc){
                res.json(doc);
            },
            function (err){
                res.status(400).send(err);
            });
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res) {
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
}

