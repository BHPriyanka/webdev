(function(){
    angular
        .module("NetNewsApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $location, UserService, $rootScope){
        $scope.location = $location;
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.userName) {
                $scope.message = "Please provide a username";
                return;
            }

            if (!user.firstName) {
                $scope.message = "Please provide Firstname";
                return;
            }

            if (!user.lastName) {
                $scope.message = "Please provide Lastname";
                return;
            }

            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            if(!user.email) {
                $scope.message = "Please provide Email ID";
            }
            var user1 = UserService.findUserByUsername(user.userName);
            if (user1 != null) {
                $scope.message = "User already exists";
                return;
            }

            UserService.createUser($scope.user, function(response){
                var newUser = response;
                if(newUser) {
                    $rootScope.currentUser =
                    {
                        "_id":newUser._id,
                        "firstName":newUser.firstName,
                        "lastName":newUser.lastName,
                        "userName":newUser.userName,
                        "password":newUser.password,
                        "email": newUser.email,
                        "roles": newUser.roles
                    };

                    UserService.setCurrentUser(newUser);

                    $scope.message = " Registration Successful";
                    $location.url('/profile');
                }

                else {
                    $scope.message = "Registration Unsuccessful";
                }
            });
        }
    }
})();