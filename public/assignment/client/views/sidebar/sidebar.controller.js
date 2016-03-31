"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location){
        var vm = this;

        vm.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };

    }
})();
