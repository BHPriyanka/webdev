
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
                {
                    "_id": 123,
                    "firstName": "Alice",
                    "lastName": "Wonderland",
                    "username": "alice",
                    "password": "alice",
                    "email": "alice@redff.com",
                    "roles": ["student"]
                },
                {
                    "_id": 234,
                    "firstName": "Bob",
                    "lastName": "Hope",
                    "username": "bob",
                    "password": "bob",
                    "email": "bob@rediff.com",
                    "roles": ["admin"]
                },
                {
                    "_id": 345,
                    "firstName": "Charlie",
                    "lastName": "Brown",
                    "username": "charlie",
                    "password": "charlie",
                    "email": "charlie@rediff.com",
                    "roles": ["faculty"]
                },
                {
                    "_id": 456,
                    "firstName": "Dan",
                    "lastName": "Craig",
                    "username": "dan",
                    "password": "dan",
                    "email": "dan@rediff.com",
                    "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567,
                    "firstName": "Edward",
                    "lastName": "Norton",
                    "username": "ed",
                    "password": "ed",
                    "email": "ed@rediff.com",
                    "roles": ["student"]
                }],

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function createUser (user, callback) {
            var user = {
                _id: user._id,
                username: user.username,
                password: user.password
            };
            model.users.push(user);
            callback(user);
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        function findUserByCredentials(username, password1, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password1) {
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        function updateUser (userId, currentUser, callback) {
            var user = model.findUserByUsername (currentUser.username);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                callback(user);
            } else {
                callback(null);
            }
        }

        function deleteUserById(userId, callback){
            for (var u in model.users) {
                if (model.users[u]._id === userId) {

                }
            }
            callback(model.users);
        }

        function findAllUsers(callback){
            callback(model.users);
        }
    }
})();