(function(){
    angular
        .module("NetNewsApp")
        .controller("DetailsController",detailsController);

    function detailsController($location){
        var vm = this;
        function init() {
            vm.location = $location;
        }
        init();
    }
})();
