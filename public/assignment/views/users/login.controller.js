(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user;
            var callback = function(response){
                $rootScope.currentUser =
            }
            UserService.findUserByCredentials(user.username, user.password, callback);

            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }


})();