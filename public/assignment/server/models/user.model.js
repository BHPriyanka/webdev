/*jslint node: true */
"use strict";

/*var mock = require("./user.mock.json");*/
var q = require("q");

module.exports = function(db, mongoose) {
    //create User Schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create UserModel using UserSchema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        //findIndex: findIndex,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById
    };
    return api;

    //take instance object, add to collection and return the collection
    function createUser(user) {
         /*var user = {
         _id: (new Date()).getTime(),
         userName: user.userName,
         password: user.password,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         roles: ['student']
         };
        mock.push(user);
        return user;*/

        // use q to defer the response
        var deferred = q.defer();

        //create user using mongoose model
        UserModel.create(user, function(err, doc){
            if(err){
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //return the corresponding collection
    function findAllUsers() {
        //return mock;
        var deferred = q.refer();
        UserModel.find(function (err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    /*function findIndex(username) {
        var user = null;
        var u;
        for (u in mock) {
             if (mock[u].userName == username) {
                user = mock[u];
            }
         }
         return user;
    }*/

    //take ID and object instance,find object instance in collection with ID match, update the object instance values
    function updateUser(userId, user) {
        /*console.log(user);
        for (var i in mock) {
            if(mock[i]._id == userId) {
                mock[i] = user;
                break;
            }
        }
        return mock;*/
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, user,
            function (err, doc)
            {
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //accept ID, and remove based on ID
    function deleteUser(userId) {
        /*for(var u in mock){
            if(mock[u]._id == userId){
                mock.splice(u,1);
                break;
            }
        }
        return mock;*/
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId,
            function(err, doc)
            {
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //returns single user whose username matches,otherwise null
    function findUserByUsername(username) {
        /*var user = null;
         for (var u in mock) {
            if (mock[u].userName == username) {
                user = mock[u];
            }
         }
         return user;*/
        var deferred = q.defer();
        UserModel.findOne(
            {
                username: username
            },
            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;

    }

    function findUserById(userId){
        /*var user = null;
        for( var u in mock){
            if(mock[u]._id == userId){
                user=mock[u];
            }
        }
        return user;*/
        // use q to defer the response
        var deferred = q.defer();

        //find user using mongoose model
        UserModel.findById(userId, function(err, doc){
            if(err){
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //credentials has username and password,returns user whose credentials match, null otherwise
    function findUserByCredentials(username, password) {
        /*var user = null;
        for (var u in mock) {
            if (mock[u].userName === username &&
                mock[u].password === password) {
                user = mock[u];
            }
        }
        return user;*/
        var deferred = q.defer();

        UserModel.findOne(
            {
                userName: username,
                password: password
            },
            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }
};