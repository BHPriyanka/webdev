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
            logout: logout,
            login: login,
            register: register,
            getProfile: getProfile

        };
        return api;

        function createUser(user) {
            return $http.post("/api/project/admin/user", user);
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
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function findUserByUserId(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function login(credentials) {
            return $http.get("/api/project/login",
                {
                    params: {
                        'username': credentials.userName,
                        'password': credentials.password
                    }
                });
        }


        function getProfile() {
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }
    }

})();