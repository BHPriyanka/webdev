/*jslint node: true */
"use strict";

var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        var user = {
            _id: (new Date()).getTime(),
            userName: user.userName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: []
        };
        mock.push(user);
        return user;
    }

    function findUserByCredentials(username, password) {
        console.log("mOdEl-credentials");
        var user = null;
        for (var u in mock) {
            if (mock[u].userName == username &&
                mock[u].password == password) {
                user = mock[u];
                console.log(user);
            }
        }
        console.log(user);
        return user;
    }

    function updateUser(userId, user) {
        console.log("MODEL");
        console.log(userId);
        console.log(user);
        for (var i in mock) {
            console.log(mock[i]._id);
            if(mock[i]._id == userId) {

                mock[i] = user;
                break;
            }
        }
        return mock;
    }

    function findUserByUsername(username) {
        var user = null;
        for (var u in mock) {
            if (mock[u].userName == username) {
                user = mock[u];
            }
        }
        return user;
    }


    function deleteUserById(userId) {
        for(var u in mock){
            if(mock[u]._id == userId){
                mock.splice(u,1);
                break;
            }
        }
        return mock;
    }

    function findAllUsers() {
     return mock;
    }
}