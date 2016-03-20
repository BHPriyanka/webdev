/*jslint node: true */
"use strict";

var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    //take instance object, add to collection and return the collection
    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
        /*var user = {
         _id: (new Date()).getTime(),
         userName: user.userName,
         password: user.password,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         roles: []
         };
         mock.push(user);
         return user;*/
    }

    //return the corresponding collection
    function findAllUsers() {
        return mock;
    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    function findUserById(userId) {
        var user = null;
        for (var u in mock) {
             if (mock[u]._id == userId) {
                user = mock[u];
            }
         }
         return user;
    }

    //take ID and object instance,find object instance in collection wwith ID match, update the object instance values
    function updateUser(userId, currentUser) {
        var user = findUserById (userId);
        if (user != null) {
            user.firstName = currentUser.firstName;
            user.password =currentUser.password;
            user.lastName = currentUser.lastName;
            user.password = currentUser.password;
            user.email = currentUser.email;
         }
        return user;
    }

    //accept ID, and remove based on ID
    function deleteUser(userId) {
        for(var u in mock){
            if(mock[u]._id == userId){
                mock.splice(u,1);
                break;
            }
        }
        return mock;
    }

    //returns single user whose username matches,otherwise null
    function findUserByUsername(username) {
        var user = null;
         for (var u in mock) {
            if (mock[u].userName == username) {
                user = mock[u];
            }
         }
         return user;

    }

    //credentials has username and password,returns user whose credentials match, null otherwise
    function findUserByCredentials(username, password) {
        console.log("inside user model");
        var user = null;
        for (var u in mock) {
            if (mock[u].userName === username &&
                mock[u].password === password) {
                user = mock[u];
                console.log(user);
            }
        }
        return user;
    }
};