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

        /*UserService.getCurrentUser()
         .then(function (response) {*/
        function init(){
            vm.currentUser = {
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            userName: $rootScope.currentUser.userName,
            password: $rootScope.currentUser.password,
            roles: $rootScope.currentUser.roles,
            email: $rootScope.currentUser.email,
            _id: $rootScope.currentUser._id
        };
        if (!vm.currentUser) {
            $location.url("/home");
        }
    }
        init();

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

            UserService.updateUser($rootScope.currentUser._id, user)
                .then(function (response) {
                    if (response) {
                        UserService.findUserByUserId($rootScope.currentUser._id).then (function (updatedUser) {
                            console.log(updatedUser.data);
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