"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService, $rootScope) {
        var vm = this;

        vm.$location = $location;
        vm.logout = logout;

        function init(){


        }
        init();

        function logout() {
            UserService.setCurrentUser(null);
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();
