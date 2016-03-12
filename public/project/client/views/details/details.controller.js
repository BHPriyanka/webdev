(function(){
    angular
        .module("NetNewsApp"),
        .controller("DetailsController",detailsController);

    function detailsController(#scope, $location){
        $scope.location = $location;
    }
})();
