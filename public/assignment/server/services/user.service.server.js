/*global describe:true*/
//var userModel = require("../models/user.model.js")();

module.exports = function(app, userModel){
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    //app.get("/api/assignment/user/loggedin", loggedin);
    //app.post("/api/assignment/user/logout", logout);
    //app.post("/api/assignment/user/register", register);
    //app.get("/api/assignment/user/profile/:userId", profile);

    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.get("/api/assignment/user?username=username", loggedin);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

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

    function findUserByCredentials(req, res) {
        console.log("Inside login server service");
        var username = req.query.username;
        var password = req.query.password;
        var user = userModel.findUserByCredentials(username, password);
            /*.then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )*/
        res.json(user);
    }

    function deleteUser(req, res) {
        var mock = userModel.deleteUser(req.params._id);
        res.json(mock);

    }

    function loggedin(req, res){
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
            /*.then(function ( doc ) {
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

    function findAllUsers(req, res){
        var users = userModel.findAllUsers();
            /*.then(function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(users);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )*/
        res.json(users);
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
}