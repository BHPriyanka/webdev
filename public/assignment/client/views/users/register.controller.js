/*jslint node: true */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService, $rootScope) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            console.log(user.userName);
            vm.message = null;

            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.userName) {
                vm.message = "Please provide a username";
                return;
            }

            if (!user.firstName) {
                vm.message = "Please provide Firstname";
                return;
            }

            if (!user.lastName) {
                vm.message = "Please provide Lastname";
                return;
            }

            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }

            /*if (!user.email) {
                vm.message = "Please provide Email ID";
                return;
            }*/

            UserService.findUserByUsername(user.userName).then(
                function (response) {
                    if (response.data !== null) {
                        vm.message = "User already exists";
                        return;
                    }
                    else {
                        user.emails = user.emails.trim().split(",");
                        UserService.createUser(user)
                            .then(function (response) {
                                var currentUser = response.data;
                                UserService.setCurrentUser(currentUser);
                                $location.url('/profile');
                            });

                    }
                });
        }
    }
})();