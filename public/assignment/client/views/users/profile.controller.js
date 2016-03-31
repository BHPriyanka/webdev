/*jslint node: true */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;

        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;
        UserService.getCurrentUser()
            .then(function (response) {
                console.log(response.data.firstName);
                console.log(response.data.lastName);
                console.log(response.data.userName);
                console.log(response.data.password);
                console.log(response.data.roles);
                vm.currentUser = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userName: response.data.userName,
                    password: response.data.password,
                    roles: response.data.roles,
                    email: response.data.email,
                    _id: response.data._id
                };
                if (!vm.currentUser) {
                    $location.url("/home");
                }
            });

        function update(user) {
            vm.error = null;
            vm.message = null;
            var success = null;

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

            if (!user.password){
                vm.message = "Please provide a password";
                return;
            }

            if(!user.email) {
                vm.message = "Please provide Email ID";
                return;
            }

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    if (response) {
                        //console.log("response" + response);
                        UserService.findUserByUserId(user._id).then (function (updatedUser) {
                            console.log("response " + updatedUser.data.userName);
                            vm.currentUser.password = updatedUser.data.password;
                            vm.currentUser.userName = updatedUser.data.userName;
                            vm.currentUser.firstName = updatedUser.data.firstName;
                            vm.currentUser.lastName = updatedUser.data.lastName;
                            vm.currentUser.email = updatedUser.data.email;

                            UserService.setCurrentUser(updatedUser.data);

                        vm.message = "User updated successfully";
                        $location.url('/profile');
                        });
                    }
                    else {
                        vm.message = "Unable to update the user";
                    }
                });
        }
    }
})();