(function(){
    angular
        .module("NetNewsApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findUserByUserId: findUserByUserId,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            logout: logout

        };
        return api;

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserByUserId(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function deleteUserById(userId, callback) {
            return $http.delete("/api/project/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }
    }
})();