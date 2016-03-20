/*jslint node: true */
"use strict";

module.exports = function (app, userModel) {
    app.get("/api/assignment/user?username=username&password=password", findUser);
    app.get("/api/assignment/user?username=username", findUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/user/logout", logout);

    function createUser(req, res) {
        //var user = req.body;

        var user = userModel.createUser(req.query.user);
            // handle model promise
            /*.then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );*/
        res.json(user);
    }

    function findUser(req, res) {
        console.log("Inside login server service");
        if (req.query.username) {
            if (req.query.password) {
                var user = userModel.findUserByCredentials(req.query.username, req.query.password);
                res.json(user);
            }
            else {
                var user1 = userModel.findUserByUsername(req.query.username);
                res.json(user1);
            }
        }
        else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function deleteUser(req, res) {
        var mock = userModel.deleteUser(req.params._id);
        res.json(mock);

    }

    function findUserById(req, res){
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
            /*.then(
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )*/
        res.json(user);
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var user = req.params.userName;
        userModel.updateUser(userId, user);
            /*.then(function(doc) {
                req.session.currentUser = doc;
                res.json(user);
            },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )*/
        res.json(user);
    }

    function logout(req, res) {
        console.log("server service logout");
        req.session.destroy();
        res.send(200);
    }
}

