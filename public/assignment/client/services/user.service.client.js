/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {

            findUserByUsername: findUserByUsername,
            login: login,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            findUserByUserId: findUserByUserId,
            register: register
        };
        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function login(credentials) {
            return $http.get("/api/assignment/login",
                {
                    params: {
                        'username': credentials.userName,
                        'password': credentials.password
                    }
                });
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function createUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }


        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
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