
(function(){
    angular
        .module("NetNewsApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
                {
                    "_id": 123,
                    "firstName": "Alice",
                    "lastName": "Wonderland",
                    "userName": "alice",
                    "password": "alice",
                    "email": "alice@redff.com",
                    "roles": ["user"]
                },
                {
                    "_id": 234,
                    "firstName": "Bob",
                    "lastName": "Hope",
                    "userName": "bob",
                    "password": "bob",
                    "email": "bob@rediff.com",
                    "roles": ["admin"]
                },
                {
                    "_id": 345,
                    "firstName": "Charlie",
                    "lastName": "Brown",
                    "userName": "charlie",
                    "password": "charlie",
                    "email": "charlie@rediff.com",
                    "roles": ["user"]
                },
                {
                    "_id": 456,
                    "firstName": "Dan",
                    "lastName": "Craig",
                    "userName": "dan",
                    "password": "dan",
                    "email": "dan@rediff.com",
                    "roles": ["user", "admin"]
                },
                {
                    "_id": 567,
                    "firstName": "Edward",
                    "lastName": "Norton",
                    "userName": "ed",
                    "password": "ed",
                    "email": "ed@rediff.com",
                    "roles": ["user"]
                }],

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findUserByUserId:findUserByUserId,
            findUserByUsername : findUserByUsername,
            createUser: createUser

        };
        return model;

        function createUser (user, callback) {
            var user = {
                _id: (new Date()).getTime(),
                userName: user.userName,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: []
            };
            model.users.push(user);
            callback(user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].userName === username &&
                    model.users[u].password === password) {
                    user = model.users[u];
                    console.log(user);
                    break;
                }
            }
            callback(user);
        }
        function updateUser (userId, currentUser, callback) {
            var user = model.findUserByUserId (userId);

            if (user != null) {
                user.firstName = currentUser.firstName;
                user.password =currentUser.password;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                user.email = currentUser.email;
            }
            callback(user);
        }

        function findUserByUserId(userId){
            var user = null;
            for (var u in model.users){
                if(model.users[u]._id == userId){
                    user = model.users[u];
                    break;
                }
            }
            return user;
        }

        function findUserByUsername (username) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].userName == username) {
                    user = model.users[u];
                    break;
                }
            }
            return user;
        }
    }

})();