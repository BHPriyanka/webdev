(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user1;

            UserService.findUserByCredentials(user.userName, user.password, function(response){
                user1 = response;
                if(user1){
                    $rootScope.currentUser =
                    {
                        "_id":user1._id,
                        "firstName":user1.firstName,
                        "lastName":user1.lastName,
                        "userName":user1.userName,
                        "password":user1.password,
                        "email": user1.email,
                        "roles": user1.roles
                    };

                    UserService.setCurrentUser(user1);

                    for(role in user1.roles) {
                        if (user1.roles[role] == "admin"){
                            console.log($rootScope.isadmin);
                            break;
                        }
                    }
                    $location.url('/profile');
                }

                else {
                    alert("User not present");
                }
            });

        }
    }
})();