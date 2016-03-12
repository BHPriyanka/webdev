(function(){
    angular
        .module("NetNewsApp")
        .controller("RegionalController", regionalController);

    function regionalController($scope, $location){
        $scope.location = $location;
    }
})();