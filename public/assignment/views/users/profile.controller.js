(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserSevice, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.update(user);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
}) ();