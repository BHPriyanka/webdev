/*jslint node: true */
"use strict";

/*var mock = require("./user.mock.json");*/
var q = require("q");

module.exports = function(db, mongoose) {
    //create User Schema
    var userSchema = require("./user.schema.server.js")(mongoose);

    //create UserModel using UserSchema
    var userModel = mongoose.model('User', userSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById
    };
    return api;

    //take instance object, add to collection and return the collection
    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        //create user using mongoose model
        userModel.create(user, function(err, doc){
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
        var deferred = q.defer();
        userModel.find(function (err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //take ID and object instance,find object instance in collection with ID match, update the object instance values
    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set :user},
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
        var deferred = q.defer();
        userModel.remove({_id : userId}, function(err, doc){
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
        var deferred = q.defer();
        userModel.findOne(
            {
                userName: username
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
        // use q to defer the response
        var deferred = q.defer();

        //find user using mongoose model
        userModel.findById(userId, function(err, doc){
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
        var deferred = q.defer();

        userModel.findOne(
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