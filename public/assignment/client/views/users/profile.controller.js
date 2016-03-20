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

        function init(){
            var currentUser = UserService.getCurrentUser();
            if (!currentUser) {
                $location.url('/home');
            }
            else{
                vm.currentUser = {
                    _id: currentUser._id,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    email: currentUser.email,
                    roles: currentUser.roles,
                    password: currentUser.password
                };
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

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    success = response.data;

                    if (success) {
                        $rootScope.currentUser =
                        {
                            "_id":success._id,
                            "firstName":success.firstName,
                            "lastName":success.lastName,
                            "userName":success.userName,
                            "password":success.password,
                            "email": success.email,
                            "roles": success.roles
                        };

                        UserService.setCurrentUser(success);

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