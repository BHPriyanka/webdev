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
            return $http.post("/api/project/logout");
        }


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            console.log("inside user client service");
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/register", user);
        }


        function deleteUserById(userId) {
            /*var user = model.findUserByUserId (userId);
             if(user!=null){

             }*/
            return $http.delete("/api/assignment/user/" + userId);
        }


        function updateUser(userId, currentUser) {
            return $http.put("/api/assignment/user" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/user?username=" + $rootScope.currentUser);
        }


        function findUserByUserId(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }
    }
})();