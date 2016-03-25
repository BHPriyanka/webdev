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
            })

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
                    if (response.data) {
                        var currentUser = response.data;
                            UserService.setCurrentUser(currentUser);

                        vm.message = "User updated successfully";
                        $location.url('/profile');
                    }
                    else {
                        vm.message = "Unable to update the user";
                    }
            });
        }
    }
})();