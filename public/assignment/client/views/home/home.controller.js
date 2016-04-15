/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, $rootScope){
        $scope.location = $location;
        $scope.username = $rootScope.userName;
    }
})();
