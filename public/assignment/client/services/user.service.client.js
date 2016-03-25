/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            findUserByUserId: findUserByUserId
                    };
        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }


        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }


        function updateUser(userId, currentUser) {
            return $http.put("/api/assignment/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }


        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function findUserByUserId(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }
    }
})();