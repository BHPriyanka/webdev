/*jslint node: true */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;
        $rootScope.isadmin = false;
        function init() {

        }

        init();

        function login(user) {
            console.log("inside login controller");
            console.log(user);
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
                        console.log(user);
                        for(var role in response.data.roles) {
                            if (user.roles[role] == "admin"){
                                console.log(user.roles[role]);
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
