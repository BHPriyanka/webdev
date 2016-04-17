/*jslint node: true */
"use strict";

(function () {
    angular
        .module("NetNewsApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init(){
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    if(vm.profile.likesArticles) {
                        for (var article in vm.profile.likesArticles) {
                            vm.profile.likesArticles[article].newsId = vm.profile.likesArticles[article].newsId.replace(/\//g, '_');
                        }
                    }
                });
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

            if(!user.emails) {
                vm.message = "Please provide Email ID";
                return;
            }

            if(!user.phones) {
                vm.message = "Please provide Phone";
                return;
            }

            var user_without_id = {
                userName: user.userName,
                lastName: user.lastName,
                firstName: user.firstName,
                password:  user.password,
                emails: user.emails,
                phones: user.phones
            }
            UserService.updateUser($rootScope.currentUser._id, user_without_id)
                .then(function (response) {
                    if (response) {
                        UserService.findUserByUserId($rootScope.currentUser._id)
                            .then (function (updatedUser) {
                                vm.currentUser.password = updatedUser.data.password;
                                vm.currentUser.userName = updatedUser.data.userName;
                                vm.currentUser.firstName = updatedUser.data.firstName;
                                vm.currentUser.lastName = updatedUser.data.lastName;
                                vm.currentUser.emails = updatedUser.data.emails.join(",");
                                vm.currentUser.phones = updatedUser.data.phones.join(",");
                                vm.currentUser.likes = updatedUser.data.likes;
                                vm.currentUser.likesArticles = updatedUser.data.likesArticles;
                                vm.currentUser.thumbnail = updatedUser.data.thumbnail;

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