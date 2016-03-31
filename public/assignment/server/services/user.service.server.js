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
        var user = userModel.createUser(req.body);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUser(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                var user = userModel.findUserByCredentials(req.query.username, req.query.password);
                 req.session.currentUser = user;
                res.json(user);
            }
            else {
                var user1 = userModel.findUserByUsername(req.query.username);
                req.session.currentUser = user1;
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
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user);
        res.json(200);
    }

    function logout(req, res) {
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
}

