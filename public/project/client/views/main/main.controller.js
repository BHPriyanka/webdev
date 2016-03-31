(function(){
    angular
        .module("NetNewsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location)
    {
        var vm = this;
        function init() {
            vm.location = $location;
        }
        init();

    }
})();