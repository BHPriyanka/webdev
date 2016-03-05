(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user;
            UserService.findUserByCredentials(user.username, user.password, function(response){
                user = response;
                console.log(user);
                if(user){
                   // $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
                else {
                    alert("User not present");
                }
            });

        }
    }


})();