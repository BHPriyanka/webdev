/*jslint node: true */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init(){

        }
        init();


        var currentUser = UserService.getCurrentUser();
        if (!currentUser) {
            $location.url('/home');
        }

        function update(user) {
            $scope.error = null;
            $scope.message = null;
            var success = null;

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

            if (!user.password){
                $scope.message = "Please provide a password";
                return;
            }

            if(!user.email) {
                $scope.message = "Please provide Email ID";
                return;
            }

            UserService.updateUser(user._id, user, function (response) {
                success = response;

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

                    $scope.message = "User updated successfully";
                    $location.url('/profile');
                }
                else {
                    $scope.message = "Unable to update the user";
                }
            });
        }
    }
}) ();