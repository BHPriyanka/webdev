(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url('/home');
        }

        $scope.update = update;

        function update(user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;
            var success = null;
            UserService.updateUser(user._id, user, function (response) {
                success = response;

                if (success) {
                    $rootScope.currentUser = {"_id":success._id, "firstName":success.firstName, "lastName":success.lastName,
                        "userName":success.userName, "password":success.password, "email": success.email, "roles": success.roles};

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