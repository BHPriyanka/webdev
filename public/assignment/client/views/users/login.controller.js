/*jslint node: true */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope) {
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
                    if (response.data.username != null) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    }
                    else{
                        $location.url('/login');
                    }
                });
        }
    }
})();
                /*user1 = response;
                if(user1){
                    $rootScope.currentUser =
                    {
                        "_id":user1._id,
                        "firstName":user1.firstName,
                        "lastName":user1.lastName,
                        "userName":user1.userName,
                        "password":user1.password,
                        "email": user1.email,
                        "roles": user1.roles
                    };

                    UserService.setCurrentUser(user1);

                    for(var role in user1.roles) {
                        if (user1.roles[role] == "admin"){
                            console.log($rootScope.isadmin);
                            $location.url('/admin');
                            break;
                        }
                    }
                    $location.url('/profile');
                }

                else {
                    alert("User not present");
                }
            });

        }
    }
})();*/