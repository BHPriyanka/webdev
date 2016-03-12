(function(){
    angular
        .module("NetNewsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location)
    {
        $scope.location = $location;
    }
})();