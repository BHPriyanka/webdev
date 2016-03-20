"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService, $rootScope){
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init(){

        }
        init();

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
                return;
            }

            var user1 = UserService.findUserByUsername(user.userName);
            if (user1 != null) {
                $scope.message = "User already exists";
                return;
            }

            UserService.createUser(user)
                .then(function(response){
                    var newUser = response.data;
                        if(newUser!=null) {
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