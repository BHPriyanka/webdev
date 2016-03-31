(function(){
    angular
        .module("NetNewsApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.isadmin = false;

        function init(){

        }
        init();

        function login (user) {
            if(!user) {
                return;
            }

            UserService
                .findUserByCredentials(
                    user.userName,
                    user.password
                )
                .then(function (response) {
                    if (response.data != null) {
                        var user = response.data;
                        for(var role in response.data.roles) {
                            if (user.roles[role] == "admin"){
                                $rootScope.isadmin = true;
                                break;
                            }
                        }
                        UserService.setCurrentUser(user);
                        $location.url('/profile');
                    }
                    else{
                        $location.url('/login');
                    }
                });
        }
    }
})();
