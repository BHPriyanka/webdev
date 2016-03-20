/*jslint node: true */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

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
                    if (response.data.userName != null) {
                        vm.currentUser = response.data;
                        /*{
                            "_id":response.data._id,
                            "firstName":response.data.firstName,
                            "lastName":response.data.lastName,
                            "userName":res+ponse.data.userName,
                            "password":response.data.password,
                            "email": response.data.email,
                            "roles": response.data.roles
                        };*/
                        console.log(vm.currentUser);
                        UserService.setCurrentUser(vm.currentUser);
                        for(var role in response.data.roles) {
                            if (vm.currentUser.roles[role] == "admin"){
                                console.log(vm.currentUser.roles[role]);
                                $location.url('/admin');
                                break;
                            }
                        }
                        $location.url('/profile');
                    }
                    else{
                        $location.url('/login');
                    }
                });
        }
    }
})();
